// intents/intentRegistry.js
// Purpose: central place for semantic “meaning” rules (filename, title, slug, deadline, etc.)
// Contract: MF Pipeline calls this AFTER type handlers. Handlers here are tiny post-type semantics.
// API parity w/ your registries: factory via bootstrap; enum exported on window.customJS.INTENT.

class INTENT_REGISTRY {
    constructor() {
        this.Format = window.customJS.createFormatUtilsInstance();

        //default no-op stages
        const pass = {
            preprocess:  ({ value, ctx }) => ({ value, ctx }),
            validate:    ({ value, ctx }) => ({ value, ctx }),
            transform:   ({ value, ctx }) => ({ value, ctx }),
            serialize:   ({ value, ctx }) => ({ value, ctx }),
            postprocess: ({ value, ctx }) => ({ value, ctx }),
        };

        //helpers
        const toStr     = (v) => (v == null ? "" : String(v).trim());
        const firstOrStr= (v) => Array.isArray(v) ? toStr(v[0]) : toStr(v);

        //Built-in intent handlers
        //Keep them minimal; ValidationBus should do 'hard' rules. These are semantic transforms

        const filename = {
            ...pass,
            transform: ({value, cts }) => {
                const s = firstOrStr(value);
                return { value: this.Format.sanitizeForFilename(s), cts };
            },
        };

        const title = {
            ...pass,
            transform: ({ value, cts }) => {
                const s = firstOrStr(value);
                return { value: this.Format.formatTitleCase(s), cts };
            },
        };

        const slug = {
            ...pass,
            transform: ({ value, ctx }) => {
                const s = firstOrStr(value)
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
                return { value: s, ctx };
            },
        };

        const deadline = {
            ...pass,
            // Types already normalized the string (Date/DateTime handler). Keep this semantic step tiny for now.
            transform: ({ value, ctx }) => ({ value, ctx }),
        };

        // Electrical domain will grow (examples you can add later):
        // - lockout_tagout, arc_flash_category, conductor_id, panel_schedule_slot, etc.

        // Registry of handlers keyed by the “value” label
        this.handlers = {
            filename,
            title,
            slug,
            deadline,
        };
    }

    //ENUM KEY-> LABELS
    static INTENT = Object.freeze({
        FILENAME: "filename",
        TITLE: "title",
        SLUG: "slug",
        DEADLINE: "deadline",
        // ELECTRICAL: add here as you formalize: e.g., "LOCKOUT_TAGOUT": "lockout_tagout"
    });

    //Instance API
    getAll()        { return { ...this.handlers }; }
    has(label)      { return !!this.handlers[label]; }
    hasKey(key)     { return !!INTENT_REGISTRY.INTENT[key]; }
    hasValue(value) { return Object.values(INTENT_REGISTRY.INTENT).includes(String(value ?? "").trim()); }
    get(label)      { return this.handlers[label] || null; }
    use(label, h)   { this.handlers[label] = h; return this ; }

    //Process a value through a named intent's stages

    async apply(label, payload /* {value, ctx } */) {
        const h = this.get(label);
        if(!h) return payload;

        const stages = ["preprocess", "validate", "transform", "serialize", "postprocess"];
        let cursor = payload;
        for (const s of stages) if (typeof h[s] === "function") cursor = (await h[s](cursor)) ?? cursor;
        return cursor;
    }

}
