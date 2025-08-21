// mf_FieldTypeRegistry.js
class FIELD_TYPE_REGISTRY {
  constructor() {
    this.registry = Object.freeze({
      TEXT: "Text",
      NUMBER: "Number",
      TAGS: "Tags",
      EMAIL: "Email",
      PHONE: "Phone",
      DATE: "Date",
      TIME: "Time",
      DATETIME: "DateTime",
      TEXTAREA: "TextArea",
      TOGGLE: "Toggle",
      NOTE: "Note",
      FOLDER: "Folder",
      SLIDER: "Slider",
      SINGLESELECT: "SingleSelect",
      MULTISELECT: "MultiSelect",
      DATAVIEW: "Dataview",
      DOCUMENTBLOCK: "DocumentBlock",
      MARKDOWNBLOCK: "MarkdownBlock",
      IMAGE: "Image",
      FILE: "File"
    });

    // Immutable tables
    this.registry = Object.freeze({ ...REG });
    this._keys    = Object.freeze(Object.keys(this.registry));                // ["TEXT","NUMBER",...]
    this._labels  = Object.freeze(Object.values(this.registry));              // ["Text","Number",...]
    // Reverse: label → KEY  (e.g., "Text" → "TEXT")
    this._byLabel = Object.freeze(
      Object.fromEntries(this._keys.map(k => [this.registry[k], k]))
    );
  }

  // ---- Instance API (parity with FILE_CLASS_REGISTRY) ----
  getAll()            { return this.registry; }
  keys()              { return this._keys; }
  labels()            { return this._labels; }
  hasKey(key)         { return !!this.registry?.[key]; }
  hasValue(value)     { return !!this._byLabel[String(value ?? "").trim()]; }
  getType(key)        { return this.registry?.[key] || null; } //KEY -> Label
  getKeyFromValue(v)  { return this._byLabel[String(v ?? "").trim()] || null; } //Label -> KEY

  /**
   * Normalize KEY-or-Label → KEY (e.g., "Text" or "TEXT" → "TEXT")
   */
  resolveKey(input) {
    const s = String(input ?? "").trim();
    if (this.registry[s]) return s;               // already a key
    const k = this._byLabel[s] || null;            // maybe a value
  }

  /**
   * Normalize KEY-or-Label → Label (e.g., "TEXT" or "Text" → "Text")
   */
  resolveLabel(input) {
    const s = String(input ?? "").trim();
    return this.registry[s] || (this._labels.includes(s) ? s : null);
  }

  // ---- Static mirrors (back‑compat for code reading constructor.TYPE/TYPES) ----
  static TYPE  = Object.freeze({                 // keep static constant available
    TEXT: "Text", NUMBER: "Number", TAGS: "Tags", EMAIL: "Email", PHONE: "Phone",
    DATE: "Date", TIME: "Time", DATETIME: "DateTime", TEXTAREA: "TextArea",
    TOGGLE: "Toggle", NOTE: "Note", FOLDER: "Folder", SLIDER: "Slider",
    SINGLESELECT: "SingleSelect", MULTISELECT: "MultiSelect", DATAVIEW: "Dataview",
    DOCUMENTBLOCK: "DocumentBlock", MARKDOWNBLOCK: "MarkdownBlock", IMAGE: "Image", FILE: "File"
  });
  static TYPES = FIELD_TYPE_REGISTRY.TYPE;       // legacy accessor
  static getAll() { return this.TYPE; }          // legacy accessor used in older code
}

// (Optional) legacy alias if any late code still imports FieldType by name:
// class FieldType extends FIELD_TYPE_REGISTRY {}
