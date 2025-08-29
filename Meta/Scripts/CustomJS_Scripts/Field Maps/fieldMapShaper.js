// FieldMapShaper.class.js
// Converts legacy { mdlForm_fieldMap } into standardized FieldMapSet
// No top-level execution. Attach this class in your bootstrap.

class FieldMapShaper {
  /**
   * @param {{ mdlForm_fieldMap: Record<string, any> }} legacy
   * @param {{ Types?: any, Intent?: any }=} env
   * @returns {Record<string, any>} FieldMapSet
   */
  static fromLegacyModalMap(legacy, env = {}) {
    const map = (legacy && legacy.mdlForm_fieldMap) || {};
    const Types  = env.Types  || (window.customJS?.FIELD_TYPE_ENUM || {});
    const Intent = env.Intent || (window.customJS?.INTENT || {});
    const out = {};

    for (const [fmKey, mappingRaw] of Object.entries(map)) {
      const m = (mappingRaw && typeof mappingRaw === "object")
        ? { ...mappingRaw }
        : (typeof mappingRaw === "string")
          ? { key: fmKey, modalKey: mappingRaw }
          : null;
      if (!m) continue;

      const fieldId  = m.modalKey || fmKey;                       // form field id
      const location = (m.from === "file") ? "frontmatter" : (m.location || "frontmatter");
      const key      = m.key || fmKey;                            // YAML key
      const uiType   = m.fieldType || m.type || Types.TEXT || "Text";

      out[fieldId] = {
        fieldId,
        ui: {
          type: uiType,
          label: m.label || fieldId,
          required: !!m.required,
          options: m.options,
          placeholder: m.placeholder,
          extra: m.extra
        },
        io: {
          location,
          key,
          fromNote: m.fromNote,
          toNote:   m.toNote
        },
        pipe: {
          preValidate:  m.preValidate  || [],
          validate:     m.validate     || [],
          postValidate: m.postValidate || [],
          prePersist:   m.prePersist   || [],
          preRender:    m.preRender    || []
        },
        intent:   m.intent ?? null,        // semantic hint (ties into INTENT_REGISTRY)
        isLink:   m.isLink === true,
        index:    m.index ?? null,
        defaults: m.defaults,
        // carry legacy-only hints so adapters can still access them
        _legacy: {
          groupFilter: m.groupFilter,
          resolver:    m.resolver
        }
      };
    }
    return out;
  }
}

// Optionally: tiny guard helpers (not strictly required)
/*
class FieldMapSpec {
  static isFieldMap(fm) {
    return !!fm && typeof fm === "object" &&
      typeof fm.fieldId === "string" &&
      fm.io && typeof fm.io.key === "string" &&
      typeof fm.io.location === "string";
  }
  static isFieldMapSet(set) {
    if (!set || typeof set !== "object") return false;
    for (const v of Object.values(set)) if (!FieldMapSpec.isFieldMap(v)) return false;
    return true;
  }
}
*/

