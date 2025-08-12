class errorBus {
  static ICONS = {
    VALIDATION: "🛑",
    LOOKUP:     "🔍",
    IO:         "💾",
    UNKNOWN:    "⚠️",
  };

  static CATALOG = {
    VALIDATION: {
      TITLE_REQUIRED: { msg: "🛑 Title is required.", hint: "Fill in the Title field and try again." },
      MISSING_FIELD:  { msg: "🛑 Required field is missing.", hint: "Check your form inputs." },
    },
    LOOKUP: {
      NO_HANDLER:  { msg: "🔍 No handler registered for this fileClass.", hint: "Check fileClassRegistry." },
      NO_TEMPLATE: { msg: "🔍 Template path not set.", hint: "Define handler.template for this fileClass." },
    },
    IO: {
      CREATE_FAILED: { msg: "💾 Couldn’t create the file.", hint: "Check path/permissions and retry." },
      WRITE_FAILED:  { msg: "💾 Couldn’t write frontmatter.", hint: "See console for details." },
    },
      UNKNOWN: {
      UNKNOWN: { msg: "⚠️ Something went wrong.", hint: "See console for details." }
    }
  };

  static mode = "console";

  static err(category, code, meta = {}) {
    const def = (this.CATALOG[category] && this.CATALOG[category][code]) || this.CATALOG.UNKNOWN.UNKNOWN;
    const e = new Error(def.msg);
    e.category = category;
    e.code = code;
    e.hint = def.hint;
    e.meta = meta;
    e.icon = this.ICONS[category] || this.ICONS.UNKNOWN;
    return e;
  }

  static toast(e) {
    const where = e?.meta?.where ? ` (${e.meta.where})` : "";
    const hint  = e?.hint ? ` — ${e.hint}` : "";
    const msg   = `${e.message}${where}${hint}`;

    const silent = e?.meta?.silent || this.mode === "console";
    if (silent) { console.warn("[ErrorBus]", msg, e); return; }

    new Notice(msg);
    console.error("[ErrorBus]", e);
  }

  static async guard(fn, opts = {}) {
    try { return await fn(); }
    catch (e) { this.toast(e, opts); throw e; }
  }


}

//window.customJS.createErrorBusInstance = () => ErrorBus;
