// intents/intentRegistry.js
// Purpose: central place for semantic “meaning” rules (filename, title, slug, deadline, etc.)
// Contract: MF Pipeline calls this AFTER type handlers. Handlers here are tiny post-type semantics.
// API parity w/ your registries: factory via bootstrap; enum exported on window.customJS.INTENT.

class INTENT_REGISTRY {
    constructor() {
        this.Format = window.customJS?.createFormatUtilsInstance?.();
        this.EB = window.customJS?.createerrorBusInstance?.();

        //default no-op stage set
        const id = ({ value, ctx }) => ({ value, ctx });
        const pass = Object.freeze({
            preprocess:  id,
            validate:    id,
            transform:   id,
            serialize:   id,
            postprocess: id
        });

        //helpers
        const toStr     = (v) => (v == null ? "" : String(v).trim());
        const firstOrStr= (v) => Array.isArray(v) ? toStr(v[0]) : toStr(v);
        const F         = this.Format || {};
        const orID      = (fn, fallback = (x)=>x) => (typeof fn === "function" ? fn : fallback);

        //Built-in intent handlers
        //Keep them minimal; ValidationBus should do 'hard' rules. These are semantic transforms

        const filename = Object.freeze({
            ...pass,
            transform: ({value, cts }) => {
                const s = firstOrStr(value);
                const out = orID(F.sanitizeForFilename)(s);
                return { value: out, cts };
            },
        });

        const title = Object.freeze({
            ...pass,
            transform: ({ value, cts }) => {
                const s = firstOrStr(value);
                const out = orID(F.formatTitleCase)(s);
                return { value: out, cts };
            },
        });

        const slug = Object.freeze({
            ...pass,
            transform: ({ value, ctx }) => {
                const s = firstOrStr(value)
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
                return { value: s, ctx };
            },
        });

        const deadline = Object.freeze({
            ...pass,
            // Types already normalized the string (Date/DateTime handler). Keep this semantic step tiny for now.
            transform: ({ value, ctx }) => ({ value, ctx }), //reservced for later semantic rules
        });

        // Electrical domain will grow (examples you can add later):
        // - lockout_tagout, arc_flash_category, conductor_id, panel_schedule_slot, etc.

        // Registry of handlers keyed by the “value” label
        this.handlers = Object.freeze({ filename, title, slug, deadline, });
    }

    //ENUM KEY-> LABELS
    static INTENT = Object.freeze({ FILENAME: "filename", TITLE: "title", SLUG: "slug", DEADLINE: "deadline", /* ELECTRICAL: add here as you formalize: e.g., "LOCKOUT_TAGOUT": "lockout_tagout"*/ });

    //Instance API
    getAll()        { return { ...this.handlers }; }
    has(label)      { return !!this.handlers[label]; }
    hasKey(key)     { return !!INTENT_REGISTRY.INTENT[key]; }
    hasValue(value) { return Object.values(INTENT_REGISTRY.INTENT).includes(String(value ?? "").trim()); }
    get(label)      { return this.handlers[label] || null; }
    use(label, h)   { this.handlers[label] = h; return this ; }

    /**
   * Run a payload through a named intent.
   * @param {string} label - intent label, e.g. "title"
   * @param {{value:any, ctx:object}} payload
   * @returns {{value:any, ctx:object}}
   */
    async apply(label, payload /* {value, ctx } */) {
        const h = this.get(label);
        if(!h) {
            this.EB?.toast?.(
                this.EB.err?.(this.EB.TYPE.LOOKUP, "NOT_FOUND",
                { where: "INTENT.apply", what: `intent '${label}'` },
                {domain: this.EB.DOMAIN.FORMS }) || `Intent not found: ${label}`, { level: "warn", console: true }
            );
            return payload;
        }

        const stages = ["preprocess", "validate", "transform", "serialize", "postprocess"];
        let cursor = payload;
        for (const s of stages) {
            const fn = h[s];
            if (typeof h[s] === "function")
                try {
                    cursor = (await h[s](cursor)) ?? cursor;
                } catch (err) {
                    this.EB?.toast?.(
                    this.EB.err?.(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE", { where: `INTENT.${s}`, cause: err?.message }, { domain: this.EB.DOMAIN.PIPELINE }) || err,
                    { ui: true , console: true }
                );
                throw err;
            }
        }
        return cursor;
    }
}
