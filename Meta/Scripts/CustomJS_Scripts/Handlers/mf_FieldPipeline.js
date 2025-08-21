class FieldPipeline {
  constructor() {
    this.handlers = window.customJS.createFieldHandlerInstance();
    this.intents = window.customJS.createIntentRegistryInstance?.() || window.customJS.createINTENT_REGISTRYInstance?.();
    this.EB = window.customJS?.createerrorBusInstance?.();
  }

  /**
   * Run a single field through the type pipeline.
   * ctx shape: { fieldKey, modalKey, type, raw, current, meta, env }
   * Returns the final scalar/array value (not the cursor object).
   */
  async process(ctx) {
    //Guards & Lookups
    if(!this.handlers?.getHandlers && !this.handlers?.registry) {
      const e = EB?.err?.(this.EB.TYPE.RUNTIME, "MISSING_ENV",
        { where: "FieldPipeline.process", missing: "FieldHandler registry" },
        { domain: EB?.DOMAIN?.PIPELINE }
      );
      EB?.toast?.(e, { level: "warn", ui: true, console: true });
      throw e || new Error("[FieldPipeline] Handler registry missing."); //Hard-fail: we cannot proceed with no registry
    }

    const reg = typeof this.handlers.getHandlers === "function" ? this.handlers.getHandlers() : this.handlers.registry;
    const handler = reg[ctx?.type] || reg.__default;

    if(!handler) {
      const e = EB?.err?.(this.EB.TYPE.LOOKUP, "NOT_FOUND",
        { where: "FieldPipeline.process", what: `handler for type '${ctx?.type || "(unset)"}'` },
        { domain: EB?.DOMAIN?.PIPELINE }
      );
      EB?.toast?.(e, {level: "warn", ui: true, console: true });
      //If absolutely nothing is available, pass the value through unchanged
      return ctx?.raw;
    }

    //Stage execution
    const stages = ["preprocess", "validate", "transform", "serialize", "postprocess"];
    let cursor = { value: ctx.raw, ctx };

    for (const s of stages) {
      const fn = handler[s];
      if (typeof fn !== "function") continue;

      try {
        const out = await fn(cursor);
        //Allow stage to be a no-op by returning undefined/null
        if(out && typeof out === "object" && "value" in out) {
          cursor = out;
        }
      } catch (err) {
        //Surface a structured message but do not swallow-bubble up to caller
        const e = EB?.err?.(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
          { where: `FieldPipleline.${s}`, cause: err?.message },
          { domain: EB?.DOMAIN?.PIPELINE }
        );
        EB?.toast?.(e || err, {ui: true, console: true });
        throw (e || err);
      }
    }

    //Post-type semantic intent (optional)
    try{
      const intent = ctx?.meta?.intent;
      if(intent && this.intents?.has?.(intent)) { const next = await this.intents.apply(intent, { value: cursor.value, ctx }); if (next && typeof next.value !== "undefined") cursor = next; }
    } catch (err) {
      const e = EB?.err?.(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
        { where: "FieldPipeline.intent", cause: err?.message },
        { domain: EB?.DOMAIN?.PIPELINE }
      );
      EB?.toast?.(e || err, { ui: true, console: true });
      throw (e || err);
    }
      return cursor.value;
    }
}
