class ValidationBus {
  constructor() {
    // Canonical EB factory (keep alias for back-compat)
    const ebFactory =
      window?.customJS.createErrorBusInstance ||
      window?.customJS.createerrorBusInstance;

    if (typeof ebFactory !== "function") {
      throw new Error("[ValidationBus] errorBus factory not found on window.customJS");
    }

    this.ErrorBus = ebFactory;                     // class with static API
    this.format   = window.customJS.createFormatUtilsInstance();

    // Preload contracts (safe if not loaded yet; we guard in use)
    this._contractsGetter =
      (typeof window?.customJS?.getRegistryContracts === "function"
        ? window.customJS.getRegistryContracts
        : null);

    // Cross-field rules instance (factory is bound in bootstrap)
    try {
      this._cross = window.customJS.createCrossFieldRulesInstance?.();
    } catch {
      this._cross = null;
    }

    // ===== Rule sets (unchanged from your version, kept verbatim where possible) =====
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
                this.ErrorBus.TYPE.FIELD_MAP, "INVALID_FIELD_TYPE",
                { field: formField, fieldType: String(m.fieldType) },
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
        ({ map }) => {
          const INTENT = window.customJS.INTENT || {};
          const valid = new Set(Object.values(INTENT));
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : undefined;
            if (m?.intent && !valid.has(m.intent)) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.FIELD_MAP, "INVALID_INTENT",
                { field: formField, intent: String(m.intent) },
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
                this.ErrorBus.TYPE.FIELD_MAP, "MISSING_KEY",
                { field: formField, missing: "key|modalKey|resolver" },
                { domain: this.ErrorBus.DOMAIN.PIPELINE }
              );
            }
          }
        },
        // groupFilter coherence (exists & internally consistent)
        ({ map, groupReg }) => {
          for (const [formField, mappingRaw] of Object.entries(map)) {
            const m = (typeof mappingRaw === "object") ? mappingRaw : { key: mappingRaw };
            if (!m.groupFilter) continue;
            const reg = groupReg?.[m.groupFilter];
            if (!reg?.groupField || !reg?.subFieldsByGroup) {
              throw this.ErrorBus.err(
                this.ErrorBus.TYPE.FIELD_MAP, "BAD_GROUP_FILTER",
                { field: formField, groupFilter: String(m.groupFilter) },
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
      // Hooks per fileClass can be added later via .use(fileClass, ...fns)
    };
  }

  // ===== Public API to attach per-fileClass rules =====
  use(fileClass, ...fns) {
    this.rules[fileClass] = (this.rules[fileClass] || []).concat(fns);
  }

  // ===== Core runners (unchanged behavior) =====
  runInit({ fileClass, handler }) {
    this.#run([...this.rules._common_init], { fileClass, handler });
  }

  runCreate({ fileClass, handler, formData }) {
    const map      = (typeof handler.modalFormMap === "function" ? handler.modalFormMap() : handler.modalFormMap)?.mdlForm_fieldMap || {};
    const groupReg = (typeof handler.groupTypeFilter === "function" ? handler.groupTypeFilter() : handler.groupTypeFilter) || {};
    this.#run(
      [...this.rules._common_init, ...this.rules._common_fieldMap, ...this.rules._common_create, ...(this.rules[fileClass]||[])],
      { fileClass, handler, formData, map, groupReg }
    );
  }

  runUpdate({ fileClass, handler, formData, file }) {
    const map      = (typeof handler.modalFormMap === "function" ? handler.modalFormMap() : handler.modalFormMap)?.mdlForm_fieldMap || {};
    const groupReg = (typeof handler.groupTypeFilter === "function" ? handler.groupTypeFilter() : handler.groupTypeFilter) || {};
    this.#run(
      [...this.rules._common_init, ...this.rules._common_fieldMap, ...this.rules._common_update, ...(this.rules[fileClass]||[])],
      { fileClass, handler, formData, map, groupReg, file }
    );
  }

  // ===== New: contract-driven field-map validation (for bootstrap and diagnostics) =====

  /**
   * Validate a single map container with contracts and cross-refs.
   * @param {object} container - { mdlFormName, mdlForm_fieldMap }
   * @param {object} options   - { name, groupFilterMap }
   * @returns {{ ok:boolean, errors:[], warnings:[] }}
   */
  validateFieldMapContainer(container, { name = "(unnamed map)", groupFilterMap = {} } = {}) {
    const EB = this.ErrorBus;
    const contracts = this._contractsGetter?.();
    if (!contracts) {
      // Contracts not loaded yet — treat as pass but warn to console
      globalThis.console?.warn?.("[ValidationBus] registryContracts not loaded; skipping strict map validation for", name);
      return { ok: true, errors: [], warnings: [{ message: "Contracts not loaded; skipped", map: name }] };
    }

    const enums = {
      fieldTypes: new Set(Object.values(window.customJS.FIELD_TYPE || window.customJS.FIELD_TYPE_ENUM || {})),
      intents:    new Set(Object.values(window.customJS.INTENT || {})),
    };

    const base = contracts.fieldMapContract.validate(container, { enums });
    const errors = [...(base.errors || [])];
    const warnings = [...(base.warnings || [])];

    // Cross-check groupFilter keys against provided groupFilter map
    const fm = container?.mdlForm_fieldMap || {};
    for (const [fmKey, mappingRaw] of Object.entries(fm)) {
      const m = (typeof mappingRaw === "object") ? mappingRaw : { modalKey: mappingRaw };
      if (m.groupFilter) {
        const gf = groupFilterMap?.[m.groupFilter];
        if (!gf || !gf.groupField || !gf.subFieldsByGroup) {
          errors.push({
            message: `Unknown or incomplete groupFilter '${m.groupFilter}'`,
            path: `mdlForm_fieldMap.${fmKey}.groupFilter`,
            hint: "Ensure groupTypeFilter_fieldMap provides this key with groupField and subFieldsByGroup"
          });
        }
      }
    }

    const ok = errors.length === 0;
    // Emit a single bus event summarizing container state
    try {
      if (ok) {
        EB.info?.("Field map valid: {name}", { name }, { domain: EB.DOMAIN.PIPELINE, console: true });
      } else {
        const e = EB.err?.(EB.TYPE.FIELD_MAP, "BAD_ENTRY", { where: `ValidationBus.validateFieldMapContainer(${name})`, detail: JSON.stringify(errors.slice(0, 5)) }, { domain: EB.DOMAIN.PIPELINE });
        EB.toast?.(e || `Field map invalid: ${name}`, { console: true });
      }
    } catch {}

    return { ok, errors, warnings };
  }

  /**
   * Validate all known maps via a handler-like object:
   * expects { fileClass, modalFormMap, groupTypeFilter } similar to fileTypeHandler entries.
   */
  validateMapsFromHandler(handler, { name = "(handler)" } = {}) {
    const mapContainer =
      (typeof handler.modalFormMap === "function" ? handler.modalFormMap() : handler.modalFormMap) || {};
    const group = (typeof handler.groupTypeFilter === "function" ? handler.groupTypeFilter() : handler.groupTypeFilter) || {};
    return this.validateFieldMapContainer(mapContainer, { name, groupFilterMap: group });
  }

  /**
   * Validate an array or map of handlers that expose modalFormMap()/groupTypeFilter().
   * Accepts: Array<handler> OR { [fileClass]: handler }
   * Returns a compact summary you can log/table.
   */
  validateHandlersCollection(handlersLike) {
    const items = Array.isArray(handlersLike) ? handlersLike : Object.values(handlersLike || {});
    const out = [];
    for (const h of items) {
      //Try to get fileClass label for friendler output
      const fc = h?.fileClass || h?.id || "(unknown)";
      const res = this.validateMapsFromHandler(h, { name: fc });
      out.push({ fc, ok: res.ok, errors: (res.errors || []).length, warnings: (res.warnings || []).length, details: res });
    }
    return out;
  }

  /**
   * Validate a create operation:
   *  - runs existing rule sets (init + fieldMap + create)
   *  - then runs CrossFieldRules against the "normalized" (typed) object
   */
  async validateCreate({ fileClass, handler, formData, normalized, context }) {
    // 1) Existing per-map/per-form checks
    this.runCreate({ fileClass, handler, formData });

    // 2) Cross-field pass (after per-field normalization)
    if (this._cross && normalized && typeof normalized === "object") {
      const { ok, issues } = this._cross.run({
        data: normalized,
        ctx: { fileClass, action: "create", handler, context }
      });

      if (!ok) {
        for (const it of issues) {
          const e = this.ErrorBus.err(
            this.ErrorBus.TYPE.VALIDATION,
            (it.code || "CROSS_FIELD_FAILED"),
            {
              where: `ValidationBus.crossField.${fileClass}`,
              detail: it.message,
              path: it.path?.join?.("."),
              ...it.meta
            },
            { domain: this.ErrorBus.DOMAIN.PIPELINE }
          );
          this.ErrorBus.toast(e, { ui: true, console: true });
        }
        throw this.ErrorBus.err(
          this.ErrorBus.TYPE.VALIDATION,
          "CROSS_FIELD_FAILED",
          { count: issues.length, where: "ValidationBus.validateCreate" },
          { domain: this.ErrorBus.DOMAIN.PIPELINE }
        );
      }
    }
    return true;
  }

  /**
   * Validate an update operation:
   *  - runs existing rule sets (init + fieldMap + update)
   *  - then runs CrossFieldRules against the "normalized" (typed) object
   */
  async validateUpdate({ fileClass, handler, formData, file, normalized, context }) {
    // 1) Existing per-map/per-form checks
    this.runUpdate({ fileClass, handler, formData, file });

    // 2) Cross-field pass (after per-field normalization)
    if (this._cross && normalized && typeof normalized === "object") {
      const { ok, issues } = this._cross.run({
        data: normalized,
        ctx: { fileClass, action: "update", handler, context }
      });

      if (!ok) {
        for (const it of issues) {
          const e = this.ErrorBus.err(
            this.ErrorBus.TYPE.VALIDATION,
            (it.code || "CROSS_FIELD_FAILED"),
            {
              where: `ValidationBus.crossField.${fileClass}`,
              detail: it.message,
              path: it.path?.join?.("."),
              ...it.meta
            },
            { domain: this.ErrorBus.DOMAIN.PIPELINE }
          );
          this.ErrorBus.toast(e, { ui: true, console: true });
        }
        throw this.ErrorBus.err(
          this.ErrorBus.TYPE.VALIDATION,
          "CROSS_FIELD_FAILED",
          { count: issues.length, where: "ValidationBus.validateUpdate" },
          { domain: this.ErrorBus.DOMAIN.PIPELINE }
        );
      }
    }
    return true;
  }

  // ===== Private core runner =====
  #run(fns, ctx) {
    try {
      for (const fn of fns) fn(ctx);
      return true;
    } catch (e) {
      // If already an ErrorBus error (has type/code), rethrow as-is
      if (e && e.type && e.code) throw e;
      // Otherwise, normalize to a typed runtime error
      const EB = this.ErrorBus;
      const wrapped = EB.err(
        EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
        { where: "ValidationBus._run", cause: e?.message || String(e) },
        { domain: EB.DOMAIN.PIPELINE }
      );
      throw wrapped;
    }
  }

  // ===== Factory hook for CustomJS bootstrap (unchanged) =====
  static register(customJS) { customJS.validationBus = new ValidationBus(); }
}
