// core/indexService.js
class IndexService {
    constructor() {
        this.app = null;
        this.byFolder = new Map();     // folderPath -> Set(basenames)
        this.counters = new Map();     // folderPath#prefix -> maxInt
        this.ready = false;
    }

    async init(app) {
        if(this.ready) return this;
        this.app = app;
        this.#wireEvents();
        this.ready = true;
        return this;
    }

  //#region PRIVATE FUNCTIONS
    #wireEvents() {
        const v = this.app?.vault;
        if (!v) return;

        v.on("create", (f) => {
        if (f?.extension !== "md") return;
        const folder = f.parent?.path || "";
        this._ensureFolder(folder).add(f.basename);
        });

        v.on("delete", (f) => {
        if (f?.extension !== "md") return;
        const folder = f.parent?.path || "";
        this.byFolder.get(folder)?.delete(f.basename);
        });

        v.on("rename", (f, oldPath) => {
        if (f?.extension !== "md") return;
        const oldFolder = (oldPath?.split("/") || []).slice(0, -1).join("/") || "";
        const oldBase = (oldPath?.split("/")?.pop() || "").replace(/\.md$/, "");
        this.byFolder.get(oldFolder)?.delete(oldBase);
        const folder = f.parent?.path || "";
        this._ensureFolder(folder).add(f.basename);
        });
    }

    #ensureFolder(folderPath) {
        let set = this.byFolder.get(folderPath);
        if (!set) {
        set = new Set();
        this.byFolder.set(folderPath, set);
        // lazy bootstrap from current disk state
        const folder = this.app?.vault?.getAbstractFileByPath(folderPath);
        const children = folder?.children || [];
        for (const f of children) if (f.extension === "md") set.add(f.basename);
        }
        return set;
    }

  //#endregion

  //#region PUBLIC FUCNTIONS

    // O(1) uniqueness
    ensureUnique(folderPath, desiredBase) {
        const set = this._ensureFolder(folderPath);
        if (!set.has(desiredBase)) return desiredBase;
        let i = 1;
        while (set.has(`${desiredBase}-${i}`)) i++;
        return `${desiredBase}-${i}`;
    }

    // O(1) “next count” for tracked types (prefix strategy)
    nextCountSync(folderPath, prefix) {
        const set = this.#ensureFolder(folderPath);
        const key = `${folderPath}#${prefix}`;
        let max = this.counters.get(key);

        // One-time O(n) scan the first time we see this (folder,prefix)
        if (max == null) {
            max = 0;
            for (const name of set) {
            if (!name.startsWith(prefix)) continue;
            const m = name.match(/(\d+)$|-(\d+)$/); // "prefix-12" or "...12"
            if (m) max = Math.max(max, parseInt(m[1] || m[2], 10) || 0);
            }
        }

        // Advance and store the new max so subsequent calls increase
        const next = (max || 0) + 1;
        this.counters.set(key, next);
        return next;
    }

    recordCreate(folderPath, base) {
        this.#ensureFolder(folderPath).add(base);

        // If we already track some prefixes for this folder, bump their max if 'base' matches.
        const prefixKeyStart = `${folderPath}#`;
        for (const k of this.counters.keys()) {
            if (!k.startsWith(prefixKeyStart)) continue;
            const prefix = k.slice(prefixKeyStart.length);
            if (!base.startsWith(prefix)) continue;

            const m = base.match(/(\d+)$|-(\d+)$/);
            if (!m) continue;
            const n = parseInt(m[1] || m[2], 10);
            if (!Number.isFinite(n)) continue;

            const cur = this.counters.get(k) || 0;
            if (n > cur) this.counters.set(k, n);
        }
    }


    // Returns true if 'baseName' already exists in the folder (no .md)
    hasNameInFolder(folderPath, baseName) {
        const set = this._ensureFolder(folderPath); // or your own getter
        return set.has(baseName);
    }
  //#endregion
}
