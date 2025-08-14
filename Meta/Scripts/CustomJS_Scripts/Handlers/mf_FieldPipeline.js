class FieldPipeline {
  constructor() {
    this.handlers = window.customJS.createFieldHandlerInstance();
    this.format   = window.customJS.createFormatUtilsInstance();
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
    return cursor.value;
  }
}
