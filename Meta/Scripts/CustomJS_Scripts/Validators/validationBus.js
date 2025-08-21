class ValidationBus {
  constructor() {
    const factory = window?.customJS.createerrorBusInstance /*(published by bootstrap*/ || window?.customJS.createErrorBusInstance; /*accomdates newer name*/
    if (typeof factory !== "function") {
      //constructors may throw if no bus available yet
      throw new Error("[ValidationBus] errorBus factory not found on window.customJS");
    }
    this.ErrorBus   = factory; // class with static API
    this.format     = window.customJS.createFormatUtilsInstance();
    this.rules = {
      _common_init: [
        // handler present
        ({ handler, fileClass }) => {
          if (!handler) throw this.ErrorBus.err("LOOKUP", "NO_HANDLER", { where: fileClass });
        },
        // template present
        ({ handler, fileClass }) => {
          if (!handler?.template) {
            throw this.ErrorBus.err(
              this.ErrorBus.TYPE.LOOKUP, "NOT_FOUND",
              { what: `template for fileClass '${fileClass}'`, where: "ValidationBus._common_init" },
              { domain: this.ErrorBus.DOMAIN.PIPELINE }
            );
          }
        }
      ],
      _common_create: [
        // title present
        ({ formData, handler }) => {
          const titleKey = handler?.modalFormMap?.mdlForm_fieldMap?.title;
          const titleVal = titleKey && formData?.[titleKey];
          if (!titleVal || (typeof titleVal === "string" && !titleVal.trim())) {
            throw this.ErrorBus.err(
              this.ErrorBus.TYPE.VALIDATION, "MISSING_FIELD",
              { field: "title", got: String(titleVal ?? "") },
              { domain: this.ErrorBus.DOMAIN.FORMS }
            );
          }
        },
      ],
      _common_fieldMap: [
        // basic map sanity (objects/strings only)
        ({ map }) => {
          if (!map || typeof map !== "object") {
            throw this.ErrorBus.err(
              this.ErrorBus.TYPE.VALIDATION, "INVALID_TYPE",
              { field: "fieldMap", expected: "object", got: typeof map },
              { domain: this.ErrorBus.DOMAIN.PIPELINE }
            );
          }
          for (const [formField, mapping] of Object.entries(map)) {
            const t = typeof mapping;
            if (!(t === "string" || t === "object")) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.VALIDATION, "INVALID_TYPE",
                { field: `mapping for '${formField}'`, expected: "string|object", got: t },
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
        // verify fieldType exists in registry (if provided)
        ({ map }) => {
          const Types = window.customJS.FIELD_TYPE || window.customJS.FIELD_TYPE_ENUM || {};
          const valid = new Set(Object.values(Types));
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : undefined;
            if (m?.fieldType && !valid.has(m.fieldType)) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.VALIDATION, "INVALID_TYPE",
                { field: `mapping '${formField}'.fieldType`, expected: "valid FIELD_TYPE", got: String(m.fieldType) },
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
        // verify mapping must have one of { key | modalKey | resolver } unless { from: "file" }
        ({ map }) => {
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : { modalKey: mappingRaw };
            if (m.from === "file") continue;
            const hasKey = !!m.key;
            const hasModalKey = typeof m.modalKey === "string";
            const hasResolver = typeof m.resolver === "function";
            if (!hasKey && !hasModalKey && !hasResolver) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.VALIDATION, "MISSING_FIELD",
                { field: `mapping '${formField}' requires key|modalKey|resolver`, got: "none" },
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
        // groupFilter coherence
        ({ map, groupReg }) => {
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : { key: mappingRaw };
            if (!m.groupFilter) continue;
            const reg = groupReg?.[m.groupFilter];
            if (!reg?.groupField || !reg?.subFieldsByGroup) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.LOOKUP, "NOT_FOUND",
                { what: `groupFilter '${m.groupFilter}'`, where: `mapping '${formField}'`},
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
      ],
      _common_update: [
        // filename must come from file if present
        ({ map, formData, file }) => {
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : { key: mappingRaw };
            if (m.from === "file") {
              const expected = file?.basename || "";
              const provided = formData?.[formField];
              if (provided && provided !== expected) {
                throw this.ErrorBus.err(
                  this.ErrorBus.TYPE.VALIDATION, "INVALID_TYPE",
                  { field: formField, expected, got: provided },
                  { domain: this.ErrorBus.DOMAIN.FORMS }
                );
              }
            }
          }
        },
      ],
      // Per-fileClass hooks go here later:
      // [FILE_CLASS.TRADE_OFF]: [ (ctx) => { ... } ],
    };
  }

  use(fileClass, ...fns) {
    this.rules[fileClass] = (this.rules[fileClass] || []).concat(fns);
  }

  runInit({ fileClass, handler }) {
    this._run([...this.rules._common_init], { fileClass, handler });
  }

  runCreate({ fileClass, handler, formData }) {
    const map      = (typeof handler.modalFormMap === "function" ? handler.modalFormMap() : handler.modalFormMap)?.mdlForm_fieldMap || {};
    const groupReg = (typeof handler.groupTypeFilter === "function" ? handler.groupTypeFilter() : handler.groupTypeFilter) || {};
    this._run([...this.rules._common_init, ...this.rules._common_fieldMap, ...this.rules._common_create, ...(this.rules[fileClass]||[])],
      { fileClass, handler, formData, map, groupReg });
  }

  runUpdate({ fileClass, handler, formData, file }) {
    const map      = (typeof handler.modalFormMap === "function" ? handler.modalFormMap() : handler.modalFormMap)?.mdlForm_fieldMap || {};
    const groupReg = (typeof handler.groupTypeFilter === "function" ? handler.groupTypeFilter() : handler.groupTypeFilter) || {};
    this._run([...this.rules._common_init, ...this.rules._common_fieldMap, ...this.rules._common_update, ...(this.rules[fileClass]||[])],
      { fileClass, handler, formData, map, groupReg, file });
  }

  _run(fns, ctx) {
    try {
      for (const fn of fns) fn(ctx);
      return true;
    } catch (e) {
      //If already a buss error (has type/code), rethrow as-is
      if(e && e.type && e.code) throw e;
      //Otherwise, normalize to a typed runtime error
      const EB = this.ErrorBus;
      const wrapped = EB.err(
        EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
        { where: "ValidationBus._run", cause: e?.message || String(e) },
        { domain: EB.DOMAIN.PIPELINE }
      );
      throw wrapped;
    }
  }

  static register(customJS) { customJS.validationBus = new ValidationBus(); }
}
