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
  }

  // ---- Instance API (parity with FILE_CLASS_REGISTRY) ----
  getAll()            { return this.registry; }
  hasKey(key)         { return !!this.registry?.[key]; }
  hasValue(value)     { return Object.values(this.registry).includes(String(value ?? "").trim()); }
  getType(key)        { return this.registry?.[key] || null; }
  getKeyFromValue(v)  {
    const needle = String(v ?? "").trim();
    for (const [k, val] of Object.entries(this.registry)) if (val === needle) return k;
    return null;
  }
  resolveKey(input) {
    const s = String(input ?? "").trim();
    if (this.registry[s]) return s;               // already a key
    const k = this.getKeyFromValue(s);            // maybe a value
    return k;
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
