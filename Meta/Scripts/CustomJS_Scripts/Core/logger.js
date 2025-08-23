// Foundation logger: levels, sinks, child context, requestIds, spans, and ErrorBus adapter.
// CustomJS constraint: NO top-level code that mutates global state. Everything is opt-in via methods.

class Logger {
  //#region Static constants / helpers (no side effects)
  static LEVEL = Object.freeze({ debug: 10, info: 20, warn: 30, error: 40, fatal: 50 });
  static LEVEL_NAME = Object.freeze({ 10: "debug", 20: "info", 30: "warn", 40: "error", 50: "fatal" });

  static #iso() { return new Date().toISOString(); }
  static #id(prefix = "r") { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  static #coalesce(...vals) { for (const v of vals) if (v !== undefined) return v; return undefined; }
  //#endregion

  /**
   * Create a logger instance.
   * @param {Object} [opts]
   * @param {string} [opts.source]   - module/component name (e.g., "ModalFormUtils")
   * @param {object} [opts.context]  - default metadata merged into every entry
   * @param {string} [opts.requestId]- sticky id for a single run/flow
   * @param {number} [opts.minLevel] - numeric min level (default info)
   * @param {Object} [opts.sinks]    - sink map (name -> fn(entry)), see addSink()
   */
  constructor(opts = {}) {
    this.source    = opts.source || "root";
    this.context   = { ...(opts.context || {}) };
    this.requestId = opts.requestId || null;
    this.minLevel  = Number.isFinite(opts.minLevel) ? opts.minLevel : Logger.LEVEL.info;

    // sink registry (local to the instance)
    this.sinks = Object.create(null);
    if (opts.sinks && typeof opts.sinks === "object") {
      for (const [k, fn] of Object.entries(opts.sinks)) {
        if (typeof fn === "function") this.sinks[k] = fn;
      }
    }
  }

  //#region Sinks
  /**
   * Register/replace a sink.
   * @param {string} name
   * @param {(entry:Object)=>void} fn - must NEVER throw
   */
  addSink(name, fn) {
    if (typeof fn === "function" && name) this.sinks[name] = fn;
    return this;
  }

  /** Remove a sink by name. */
  removeSink(name) {
    delete this.sinks[name];
    return this;
  }

  /** Built-in console sink factory you can add at bootstrap time. */
  static consoleSink() {
    return (e) => {
      // Keep console usage minimal and resilient
      const line = `[${e.ts}] ${e.level.toUpperCase()}${e.source ? `(${e.source})` : ""}${e.requestId ? ` ${e.requestId}` : ""} — ${e.message}`;
      const meta = { code: e.code, ctx: e.context, tags: e.tags, corr: e.correlationId, span: e.span };
      try {
        if (e.level === "debug") globalThis.console?.debug?.(line, meta);
        else if (e.level === "info") globalThis.console?.info?.(line, meta);
        else if (e.level === "warn") globalThis.console?.warn?.(line, meta);
        else globalThis.console?.error?.(line, meta);
      } catch {} // never throw
    };
  }
  //#endregion

  //#region Core logging
  /** Set the minimum level (accepts string or number). */
  setLevel(level) {
    if (typeof level === "string" && Logger.LEVEL[level] != null) this.minLevel = Logger.LEVEL[level];
    if (Number.isFinite(level)) this.minLevel = level;
    return this;
  }

  /** Is the given level enabled? (string or number). */
  isLevelEnabled(level) {
    const n = typeof level === "string" ? Logger.LEVEL[level] : level;
    return Number.isFinite(n) ? n >= this.minLevel : true;
    // NOTE: higher number == more severe
  }

  /** Normalize a log entry. */
  #entry(level, message, meta = {}) {
    const lvl = typeof level === "string" ? level : (Logger.LEVEL_NAME[level] || "info");
    const ctx = meta.context ? { ...this.context, ...meta.context } : { ...this.context };

    return {
      ts: Logger.#iso(),
      level: lvl,
      message: String(message ?? ""),
      source: Logger.#coalesce(meta.source, this.source),
      code: meta.code || undefined,
      tags: meta.tags || undefined,
      context: Object.keys(ctx).length ? ctx : undefined,
      correlationId: meta.correlationId || undefined, // stitch across modules (pair with ErrorBus correlation later if you add it)
      requestId: meta.requestId || this.requestId || undefined,
      span: meta.span || undefined,    // { id, name, startTs, endTs, durationMs }
      // passthrough escape hatch
      extra: meta.extra || undefined,
    };
  }

  /** Emit to all sinks (guarded). */
  #emit(entry) {
    for (const fn of Object.values(this.sinks)) {
      try { fn(entry); } catch {}
    }
  }

  log(level, message, meta = {}) {
    const n = typeof level === "string" ? Logger.LEVEL[level] : level;
    if (!this.isLevelEnabled(n)) return;
    this.#emit(this.#entry(level, message, meta));
  }

  debug(m, meta) { this.log("debug", m, meta); }
  info(m, meta)  { this.log("info",  m, meta); }
  warn(m, meta)  { this.log("warn",  m, meta); }
  error(m, meta) { this.log("error", m, meta); }
  fatal(m, meta) { this.log("fatal", m, meta); }
  //#endregion

  //#region Children / context
  /**
   * Create a child logger that inherits context/source/requestId and merges extras.
   * @param {Object} extra - { source?, context?, requestId?, minLevel?, sinks? }
   */
  child(extra = {}) {
    const kid = new Logger({
      source: extra.source || this.source,
      context: { ...(this.context || {}), ...(extra.context || {}) },
      requestId: extra.requestId || this.requestId,
      minLevel: Number.isFinite(extra.minLevel) ? extra.minLevel : this.minLevel,
      sinks: { ...this.sinks, ...(extra.sinks || {}) },
    });
    return kid;
  }
  //#endregion

  //#region Spans (timing blocks)
  /**
   * Start a span for timing (returns { end(msg?,meta?) }).
   * @param {string} name - e.g., "validate", "writeFrontmatter"
   * @param {Object} [meta] - extra context for the start event
   */
  startSpan(name, meta = {}) {
    const id = Logger.#id("s");
    const start = performance && performance.now ? performance.now() : Date.now();
    const startIso = Logger.#iso();

    // emit start (as debug)
    this.debug(`▶️ ${name} — start`, { ...meta, span: { id, name, startTs: startIso } });

    return {
      end: (msg = `⏹️ ${name} — end`, endMeta = {}) => {
        const end = performance && performance.now ? performance.now() : Date.now();
        const durationMs = Math.max(0, end - start);
        const endIso = Logger.#iso();
        this.info(msg, { ...endMeta, span: { id, name, startTs: startIso, endTs: endIso, durationMs: Math.round(durationMs) } });
        return durationMs;
      }
    };
  }
  //#endregion

  //#region ErrorBus adapter
  /**
   * Log a structured ErrorBus event object produced by errorBus.toLog(e).
   * @param {Object} errObj - usually errorBus.toLog(e, extra)
   * @param {"debug"|"info"|"warn"|"error"|"fatal"} [level="error"]
   */
  errorObj(errObj, level = "error") {
    if (!errObj) return;
    const message = errObj.message || `${errObj.type || "ERR"}/${errObj.code || "UNKNOWN"}`;
    const meta = {
      source: errObj.domain || this.source,
      code: errObj.code,
      context: { ...(errObj.details || {}), ...(this.context || {}) },
      tags: errObj.tags || undefined,
      correlationId: errObj.correlationId || undefined,
      requestId: this.requestId || undefined,
    };
    this.log(level, message, meta);
  }
  //#endregion
}
