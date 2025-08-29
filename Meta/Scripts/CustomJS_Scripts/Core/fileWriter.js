// I/O Layer – fileWriter + frontmatterIO (v1 draft)
// Purpose: Safe, atomic file writes and single-authority YAML frontmatter R/W for Obsidian
// Notes:
// - Zero business logic. I/O concerns only.
// - Uses per-path mutex to prevent concurrent clobbers.
// - Implements dry-run, backup on overwrite, limited retries with jitter.
// - frontmatterIO centralizes YAML parse/serialize and multi-select normalization.
// - Factories published on window.customJS in Bootstrap (see usage note at end).

/* ====================================================================== *
 * Utilities (local)
 * ====================================================================== */
const _nowISO = () => new Date().toISOString().replace(/[:.]/g, "-");
const _sleep = (ms) => new Promise(res => setTimeout(res, ms));
const _rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/* ====================================================================== *
 * fileWriter.js (module)
 * Contract (v1):
 *   new FileWriter(app, opts?)
 *   await writer.writeString(path, content, options?)
 *   await writer.ensureFolder(path)
 *   await writer.exists(path) => boolean
 *
 * options:
 *   { backup: true, retries: 2, jitterMs: [40,120], dryRun: bool, encoding: 'utf8' }
 * ====================================================================== */
export class FileWriter {
  constructor(app, opts = {}) {
    this.app = app;
    const factory = window?.customJS?.createErrorBusInstance || window?.customJS?.createerrorBusInstance;
    this.EB = typeof factory === "function" ? factory({ module: "FileWriter" }) : null;
    this.logger = window.customJS?.logger || console; // optional structured logger

    // per-path mutex map: key -> Promise (tail)
    this.mutex = new Map();

    // defaults
    this.defaults = Object.freeze({
      backup: true,
      retries: 2,
      jitterMs: [40, 120],
      dryRun: !!(window.customJS?.state?.MF_DRY_RUN),
      encoding: "utf8",
    });
  }

  #emit(level, msg, meta = {}) {
    try {
      const L = this.logger || console;
      if (typeof L[level] === "function") L[level](msg, meta);
      else L.log(msg, meta);
    } catch { /* no-op */ }
  }

  async exists(path) {
    try {
      const stat = await this.app.vault.adapter.stat(path);
      return !!stat;
    } catch {
      return false;
    }
  }

  async ensureFolder(filePath) {
    const parts = filePath.split("/");
    parts.pop(); // remove filename
    if (!parts.length) return true;
    const folderPath = parts.join("/");
    try {
      await this.app.vault.adapter.mkdir(folderPath);
      return true;
    } catch (e) {
      // mkdir is idempotent on Obsidian; errors here usually mean already exists
      return true;
    }
  }

  #withMutex(key, task) {
    const tail = this.mutex.get(key) || Promise.resolve();
    const next = tail.then(() => task()).finally(() => {
      // release only if the queue hasn't been extended
      if (this.mutex.get(key) === next) this.mutex.delete(key);
    });
    this.mutex.set(key, next);
    return next;
  }

  async #atomicWrite(path, content, { backup, encoding }) {
    const adapter = this.app.vault.adapter;
    const dir = path.split("/").slice(0, -1).join("/");
    const base = path.split("/").pop();
    const tmp = `${dir}/.__tmp__${base}.${Date.now()}`;

    // 1) write to temp (same folder to keep adapter semantics/case)
    await adapter.write(tmp, content, { encoding });

    // 2) optional backup existing
    if (backup && await this.exists(path)) {
      const bak = `${path}.bak.${_nowISO()}`;
      try { await adapter.copy(path, bak); }
      catch (e) { this.#emit("warn", "Backup copy failed", { path, error: String(e) }); }
    }

    // 3) move temp -> final (rename within same folder)
    // Prefer rename; fallback to copy+remove when rename not supported
    try {
      if (typeof adapter.rename === "function") {
        await adapter.rename(tmp, path);
      } else {
        await adapter.copy(tmp, path);
        await adapter.remove(tmp);
      }
    } catch (e) {
      // attempt cleanup
      try { await adapter.remove(tmp); } catch { /* ignore */ }
      throw e;
    }
  }

  async writeString(path, content, opts = {}) {
    const cfg = { ...this.defaults, ...opts };
    const run = async () => {
      await this.ensureFolder(path);
      if (cfg.dryRun) {
        this.#emit("info", "[Dry-Run] writeString planned", { path, bytes: content?.length ?? 0, cfg });
        return { ok: true, dryRun: true };
      }
      await this.#atomicWrite(path, content, cfg);
      return { ok: true, dryRun: false };
    };

    // mutex to serialize writes per-path
    return this.#withMutex(path, async () => {
      for (let attempt = 0; attempt <= cfg.retries; attempt++) {
        try {
          const out = await run();
          this.#emit("info", "writeString success", { path, attempt });
          return out;
        } catch (err) {
          const last = attempt === cfg.retries;
          this.#emit("warn", "writeString failed", { path, attempt, error: String(err?.message || err) });
          if (last) {
            // route to error bus if available
            try {
              const EB = this.EB;
              const e = EB?.err?.(EB.TYPE.IO, "WRITE_FAILED", { where: "FileWriter.writeString", path, cause: String(err?.message || err) }, { domain: EB?.DOMAIN?.OBSIDIAN });
              EB?.toast?.(e, { ui: true, console: true });
            } catch { /* no-op */ }
            throw err;
          }
          const [min, max] = cfg.jitterMs;
          await _sleep(_rand(min, max));
        }
      }
    });
  }
}

/* ====================================================================== *
 * frontmatterIO.js (module)
 * Contract (v1):
 *   new FrontmatterIO(app, opts?)
 *   await fmIO.read(path) -> { frontmatter: obj, body: string, raw: string }
 *   await fmIO.write(path, { frontmatter, body? }, options?)
 *   await fmIO.upsert(path, patchObj, { merge: 'set'|'append_unique' })
 *
 * Options for write/upsert:
 *   { dryRun, backup, retries, jitterMs, encoding }
 * ====================================================================== */
export class FrontmatterIO {
  constructor(app, opts = {}) {
    this.app = app;
    const factory = window?.customJS?.createErrorBusInstance || window?.customJS?.createerrorBusInstance;
    this.EB = typeof factory === "function" ? factory({ module: "FrontmatterIO" }) : null;
    this.logger = window.customJS?.logger || console;
    this.writer = new FileWriter(app, opts);

    // YAML provider: prefer window.jsyaml; fallback to minimal serializer
    this.yaml = window.jsyaml || null;
  }

  #emit(level, msg, meta = {}) { try { (this.logger[level] || this.logger.log)(msg, meta); } catch { /* */ } }

  /* ------------------------ YAML helpers ------------------------ */
  #splitBlocks(raw) {
    if (!raw || typeof raw !== "string") return { fm: null, body: "" };
    // frontmatter delimited by --- on its own line at the top
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { fm: null, body: raw };
    return { fm: m[1] || "", body: m[2] || "" };
  }

  #parseYAML(str) {
    if (!str) return {};
    try { if (this.yaml?.load) return this.yaml.load(str) || {}; } catch (e) {
      this.#emit("warn", "js-yaml load failed; falling back", { error: String(e) });
    }
    // minimal parser (key: value, arrays as [a,b], booleans/numbers best-effort)
    const out = {};
    for (const line of str.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf(":");
      if (idx < 0) continue;
      const k = trimmed.slice(0, idx).trim();
      let v = trimmed.slice(idx + 1).trim();
      // arrays [a, b]
      if (/^\[.*\]$/.test(v)) {
        v = v.slice(1, -1).split(",").map(s => s.trim()).filter(Boolean);
      } else if (/^(true|false)$/i.test(v)) {
        v = /^true$/i.test(v);
      } else if (/^-?\d+(\.\d+)?$/.test(v)) {
        v = Number(v);
      } else if (/^".*"$|^'.*'$/.test(v)) {
        v = v.slice(1, -1);
      }
      out[k] = v;
    }
    return out;
  }

  #dumpYAML(obj) {
    try { if (this.yaml?.dump) return this.yaml.dump(obj, { lineWidth: 120 }); } catch (e) {
      this.#emit("warn", "js-yaml dump failed; using minimal serializer", { error: String(e) });
    }
    // minimal serializer (scalars, arrays, no nested objects beyond 1 level list)
    const esc = (s) => {
      if (s == null) return "";
      const str = String(s);
      // quote if contains problematic chars
      return /[:\-[\]{}#~,\n]/.test(str) ? JSON.stringify(str) : str;
    };
    const lines = [];
    for (const [k, v] of Object.entries(obj || {})) {
      if (Array.isArray(v)) {
        lines.push(`${k}: [${v.map(esc).join(", ")}]`);
      } else if (typeof v === "object" && v !== null) {
        // shallow object – emit block
        lines.push(`${k}:`);
        for (const [sk, sv] of Object.entries(v)) lines.push(`  ${sk}: ${esc(sv)}`);
      } else {
        lines.push(`${k}: ${esc(v)}`);
      }
    }
    return lines.join("\n");
  }

  #normalizeMulti(val) {
    if (Array.isArray(val)) return val.filter(v => v != null && String(v).trim() !== "");
    if (val == null || val === "") return [];
    return [String(val)];
  }

  /* ------------------------- Public API ------------------------- */
  async read(path) {
    try {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (!file) throw new Error(`File not found: ${path}`);
      const raw = await this.app.vault.read(file);
      const { fm, body } = this.#splitBlocks(raw);
      const frontmatter = this.#parseYAML(fm);
      return { frontmatter, body, raw };
    } catch (err) {
      try {
        const EB = this.EB;
        const e = EB?.err?.(EB.TYPE.IO, "READ_FAILED", { where: "FrontmatterIO.read", path, cause: String(err?.message || err) }, { domain: EB?.DOMAIN?.OBSIDIAN });
        EB?.toast?.(e, { ui: true, console: true });
      } catch { /* */ }
      throw err;
    }
  }

  async write(path, { frontmatter = {}, body = "" } = {}, opts = {}) {
    const cfg = { ...this.writer.defaults, ...opts };
    const yaml = this.#dumpYAML(frontmatter || {});
    const content = `---\n${yaml}\n---\n${body || ""}`;
    return this.writer.writeString(path, content, cfg);
  }

  /** Upsert selective keys into existing frontmatter, preserving body */
  async upsert(path, patch = {}, opts = {}) {
    const cfg = { ...this.writer.defaults, ...opts };
    const { frontmatter, body } = await this.read(path);

    const merged = { ...frontmatter };
    for (const [k, v] of Object.entries(patch || {})) {
      const incoming = v;
      const current = merged[k];
      // merge modes
      const mode = (opts.merge || "set");
      if (mode === "append_unique") {
        const arr = new Set([...(this.#normalizeMulti(current)), ...(this.#normalizeMulti(incoming))]);
        merged[k] = Array.from(arr);
      } else {
        merged[k] = incoming;
      }
    }

    return this.write(path, { frontmatter: merged, body }, cfg);
  }
}

/* ====================================================================== *
 * Usage & Bootstrap wiring
 * ====================================================================== */
// In zz_Bootstrap.js (add after other factory publications):
//   window.customJS.createFileWriterInstance     = () => new FileWriter(app);
//   window.customJS.createFrontmatterIOInstance  = () => new FrontmatterIO(app);
// Where `app` is Obsidian's app instance available in the userscript/plugin scope.

// Example (inside modalFormUtils after create):
//   const fmIO = window.customJS.createFrontmatterIOInstance?.();
//   await fmIO.write(newPath, { frontmatter: fmData, body: templateBody });
//   // or to update existing frontmatter only:
//   await fmIO.upsert(existingPath, { status: "🟠 Medium", tags: ["foo","bar"] }, { merge: "append_unique" });
