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
            transform: ({ value, ctx }) => {
                const s = firstOrStr(value);
                const out = orID(F.sanitizeForFilename)(s);
                return { value: out, ctx }; // filename is downstream of title/slug
            },
            });

            const title = Object.freeze({
            ...pass,
            transform: ({ value, ctx }) => {
                const s = firstOrStr(value);
                const out = orID(F.formatTitleCase)(s);

                // propose dependent fields
                const slugFromTitle = out
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

                const fname = orID(F.sanitizeForFilename)(slugFromTitle);

                return { value: out, ctx, set: { slug: slugFromTitle, filename: fname } };
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
                const fname = orID(F.sanitizeForFilename)(s);
                return { value: s, ctx, set: { filename: fname } };
            },
            });

            const deadline = Object.freeze({
            ...pass,
            transform: ({ value, ctx }) => ({ value, ctx }),
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


// Diff shape (kept lightweight and serializable)
/// IntentDiff = {
///   intent: string,               // e.g., "title"
///   field: string,                // ctx.fieldKey of the *primary* field when applicable
///   before: any,                  // primary field value before this intent (if applicable)
///   after: any,                   // primary field value after this intent
///   updates: { [fmKey]: { before:any, after:any } } // cross-field mutations
/// }

  // Deterministic default order. You can override by passing an array into runAll().
  static DEFAULT_ORDER = Object.freeze([
    INTENT_REGISTRY.INTENT.TITLE,
    INTENT_REGISTRY.INTENT.SLUG,
    INTENT_REGISTRY.INTENT.FILENAME,
    INTENT_REGISTRY.INTENT.DEADLINE,
  ]);

  /**
   * Normalizes handler return into { value, ctx, set?, meta? }.
   * Handlers may return:
   *  - { value, ctx }                        -> no cross-field updates
   *  - { value, ctx, set: {fmKey: newVal} }  -> cross-field updates (dependent fields)
   */
  static _normalizeHandlerResult(out, fallback) {
    const base = (out && typeof out === "object") ? out : {};
    const value = (base.hasOwnProperty("value") ? base.value : fallback.value);
    const ctx   = (base.hasOwnProperty("ctx")   ? base.ctx   : fallback.ctx);
    const set   = (base && typeof base.set === "object") ? base.set : undefined;
    const meta  = (base && typeof base.meta === "object") ? base.meta : undefined;
    return { value, ctx, set, meta };
  }

  /**
   * Apply a single intent WITH state & diff support.
   * payload: { value, ctx, state } where state is a mutable map of fmKey->value
   * returns: { value, ctx, state, diff: IntentDiff }
   */
  async applyWithState(label, payload) {
    const h = this.get(label);
    const state = payload?.state || {};
    const field = payload?.ctx?.fieldKey || payload?.ctx?.key || null;

    if (!h) return { ...payload, diff: null }; // preserve current behavior on missing

    const stages = ["preprocess", "validate", "transform", "serialize", "postprocess"];
    let cursor = { value: payload.value, ctx: payload.ctx };

    // Track primary before/after for diff
    const primaryBefore = cursor.value;
    let primaryAfter = cursor.value;

    for (const s of stages) {
      const fn = h[s];
      if (typeof fn !== "function") continue;
      try {
        const next = await fn(cursor);
        const norm = INTENT_REGISTRY._normalizeHandlerResult(next ?? {}, cursor);
        cursor = { value: norm.value, ctx: norm.ctx };

        // If a stage proposes cross-field updates, apply to state immediately
        if (norm.set && typeof norm.set === "object") {
          for (const [k, v] of Object.entries(norm.set)) {
            state[k] = v; // mutate shared state so downstream intents see the change
          }
        }
      } catch (err) {
        this.EB?.toast?.(
          this.EB.err?.(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
            { where: `INTENT.${s}`, cause: err?.message },
            { domain: this.EB.DOMAIN.PIPELINE }) || err,
          { ui: true, console: true }
        );
        throw err;
      }
    }

    primaryAfter = cursor.value;

    // Build a diff by comparing any state keys the handler changed.
    // Convention: handlers place proposed updates in stage returns via { set: { fmKey: val } }.
    const updates = {};
    // To collect stage-driven updates, we rely on a transient snapshot technique:
    // The caller provides a "before snapshot" and we diff after each intent. See runAll().
    // For single-call applyWithState, we include at least the primary field change:
    if (field) {
      updates[field] = { before: primaryBefore, after: primaryAfter };
    }

    return { value: primaryAfter, ctx: payload.ctx, state, diff: {
      intent: label,
      field,
      before: primaryBefore,
      after: primaryAfter,
      updates
    }};
  }

  /**
   * Run multiple intents in a deterministic order over a shared state.
   * @param {object} params
   *   - state: { [fmKey]: any }  // complete, type-normalized form state (mutable)
   *   - order?: string[]         // intent labels; defaults to DEFAULT_ORDER
   *   - focus?: string[]         // optional subset: only run intents whose labels are in this list
   *   - fieldMap?: { [intentLabel]: fmKey } // optional mapping intent->primary field for nicer diffs
   * @returns {{ state: object, diffs: IntentDiff[] }}
   */
  async runAll({ state = {}, order, focus, fieldMap } = {}) {
    const seq = Array.isArray(order) && order.length ? order : INTENT_REGISTRY.DEFAULT_ORDER;
    const want = focus && Array.isArray(focus) && focus.length ? new Set(focus) : null;

    const diffs = [];
    // Snapshot helper for cross-field diffs by intent
    const snapshot = () => JSON.parse(JSON.stringify(state));

    for (const label of seq) {
      if (want && !want.has(label)) continue;
      if (!this.has(label)) continue;

      const before = snapshot();

      // Build a minimal ctx allowing the intent to know its primary field (optional)
      const ctx = { fieldKey: fieldMap?.[label] || fieldMap?.[label?.toLowerCase?.()] || null, meta: { intent: label } };

      const res = await this.applyWithState(label, { value: state[ctx.fieldKey], ctx, state });

      const after = state; // mutated in-place
      // Build cross-field updates diff by comparing before vs after
      const updates = {};
      for (const k of Object.keys(after)) {
        const b = before[k];
        const a = after[k];
        const changed = (Array.isArray(b) || Array.isArray(a)) ? JSON.stringify(b) !== JSON.stringify(a) : b !== a;
        if (changed) updates[k] = { before: b, after: a };
      }

      // Merge a richer diff: prefer computed cross-field updates, ensure primary field captured
      const merged = {
        intent: label,
        field: res.diff?.field || ctx.fieldKey || null,
        before: res.diff?.before,
        after: res.diff?.after,
        updates
      };
      diffs.push(merged);
    }

    return { state, diffs };
  }

}





