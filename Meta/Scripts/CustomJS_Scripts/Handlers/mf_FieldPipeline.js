class FieldPipeline {
  constructor() {
    this.handlers = window.customJS.createFieldHandlerInstance();
    this.format   = window.customJS.createFormatUtilsInstance();
    this.intents = window.customJS.createIntentRegistryInstance?.() || window.customJS.createINTENT_REGISTRY?.();
  }

  async process(ctx /* { fieldKey, modalKey, type, raw, current, meta, env } */) {
    const reg = this.handlers.getHandlers();
    const handler = reg[ctx?.type] || reg.__default;

    const stages = ["preprocess", "validate", "transform", "serialize", "postprocess"];
    let cursor = { value: ctx.raw, ctx };

    for (const s of stages) {
      if (typeof handler[s] === "function") {
        cursor = await handler[s](cursor) ?? cursor;
      }
    }

    //Post-type semantic intent (optional)
    const intent = ctx?.meta?.intent;
    if(intent && this.intents?.has?.(intent)) {
      const next = await this.intents.apply(intent, { value: cursor.value, ctx });
      if (next && typeof next.value !== "undefined") cursor = next;
    }

    return cursor.value;
  }
}
