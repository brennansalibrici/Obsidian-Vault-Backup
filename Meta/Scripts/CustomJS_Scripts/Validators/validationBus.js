class ValidationBus {
  constructor() {
    this.ErrorBus   = window.customJS.createerrorBusInstance(); // class with static API
    this.format     = window.customJS.createFormatUtilsInstance();
    this.rules = {
      _common_init: [
        // handler present
        ({ handler, fileClass }) => {
          if (!handler) throw this.ErrorBus.err("LOOKUP", "NO_HANDLER", { where: fileClass });
        },
        // template present
        ({ handler, fileClass }) => {
          if (!handler?.template) throw this.ErrorBus.err("LOOKUP", "NO_TEMPLATE", { where: fileClass });
        },
      ],
      _common_create: [
        // title present
        ({ formData, handler }) => {
          const titleKey = handler?.modalFormMap?.mdlForm_fieldMap?.title;
          const titleVal = titleKey && formData?.[titleKey];
          if (!titleVal || (typeof titleVal === "string" && !titleVal.trim())) {
            throw this.ErrorBus.err("VALIDATION", "TITLE_REQUIRED", { where: "create" });
          }
        },
      ],
      _common_fieldMap: [
        // basic map sanity (objects/strings only)
        ({ map }) => {
          if (!map || typeof map !== "object") {
            throw this.ErrorBus.err("UNKNOWN", "UNKNOWN", { where: "fieldMap missing/invalid" });
          }
          for (const [formField, mapping] of Object.entries(map)) {
            const t = typeof mapping;
            if (!(t === "string" || t === "object")) {
              throw this.ErrorBus.err("VALIDATION", "MISSING_FIELD", { where: `invalid mapping for '${formField}'` });
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
              throw this.ErrorBus.err("LOOKUP", "NO_HANDLER", { where: `groupFilter '${m.groupFilter}'` });
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
                throw this.ErrorBus.err("VALIDATION", "MISSING_FIELD", { where: `filename mismatch '${formField}'` });
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
    for (const fn of fns) fn(ctx);
    return true;
  }

  static register(customJS) { customJS.validationBus = new ValidationBus(); }
}
