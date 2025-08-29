class ModalFormAdapter {
  /**
   * Build MF field configs from FieldMapSet (used before open).
   * @param {import('./fieldMap.contracts.class').FieldMapContracts.FieldMapSet} set
   * @param {Object} ctx
   * @returns {Array<Object>} modal form fields
   */
  static toFormFields(set, ctx) {
    const fields = [];
    for (const fm of Object.values(set)) {
      const ui = fm.ui || /** @type{any} */({});
      const value = typeof fm.defaults === 'function' ? fm.defaults(ctx) : fm.defaults;
      fields.push({
        id: fm.fieldId,
        type: ui.type,
        label: ui.label || fm.fieldId,
        placeholder: ui.placeholder,
        required: ui.required,
        options: ui.options,
        value,
        extra: ui.extra
      });
    }
    return fields;
  }

  /**
   * Populate initial values on open (Update flow).
   * @param {import('./fieldMap.contracts.class').FieldMapContracts.FieldMapSet} set
   * @param {{frontmatter:Object, body:string, ctx:Object}} src
   * @returns {Record<string, any>} initialValues keyed by fieldId
   */
  static populateOnOpen(set, src) {
    const out = {};
    for (const fm of Object.values(set)) {
      const { location, key, fromNote } = fm.io;
      const raw = location === 'frontmatter'
        ? (src.frontmatter ? src.frontmatter[key] : undefined)
        : location === 'body'
          ? src.body
          : { fm: src.frontmatter ? src.frontmatter[key] : undefined, body: src.body };
      out[fm.fieldId] = fromNote ? fromNote(raw, src.ctx) : raw;
    }
    return out;
  }

  /**
   * Validate + serialize for write on submit (Create/Update).
   * Returns array of { location, key, raw } for writer.
   * @param {import('./fieldMap.contracts.class').FieldMapContracts.FieldMapSet} set
   * @param {Record<string, any>} formValues
   * @param {Object} ctx
   */
  static serializeOnSubmit(set, formValues, ctx) {
    const writes = [];
    for (const fm of Object.values(set)) {
      const value = formValues[fm.fieldId];
      const finalValue = ModalFormAdapter._runPipeline(fm, value, ctx);
      if (finalValue.__bad) {
        // You can hook errorBus here if desired
        throw new Error(`[serializeOnSubmit] Validation failed for ${fm.fieldId}: ${finalValue.errors && finalValue.errors.join(', ')}`);
      }
      const raw = (fm.io.toNote) ? fm.io.toNote(finalValue, ctx) : finalValue;
      writes.push({ location: fm.io.location, key: fm.io.key, raw });
    }
    return writes;
  }

  /** @private */
  static _runPipeline(fm, value, ctx) {
    const pipe = fm.pipe || {};
    const step = (list, v) => {
      if (!list) return v;
      let acc = v;
      for (const fn of list) acc = fn(acc, ctx);
      return acc;
    };
    const v1 = step(pipe.preValidate, value);
    if (pipe.validate && pipe.validate.length) {
      for (const v of pipe.validate) {
        const r = v(v1, ctx);
        if (r && r.ok === false) return { __bad: true, errors: r.errors || ['Validation error'] };
      }
    }
    const v2 = step(pipe.postValidate, v1);
    const v3 = step(pipe.prePersist, v2);
    return v3;
  }
}
