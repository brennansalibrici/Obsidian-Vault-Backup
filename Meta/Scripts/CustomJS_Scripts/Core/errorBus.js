// errorBus.js
class errorBus {
  // 1) Axes (enums)
  static TYPE = Object.freeze({
    VALIDATION:       "VALIDATION",
    RUNTIME:          "RUNTIME",
    LOOKUP:           "LOOKUP",
    IO:               "IO",
    SCHEMA_MISMATCH:  "SCHEMA_MISMATCH",
    FIELD_MAP:        "FIELD_MAP",
    LINK_RESOLVE:     "LINK_RESOLVE"
  });

  static DOMAIN = Object.freeze({
    GENERAL:    "GENERAL",     // default
    ELECTRICAL: "ELECTRICAL",  // work/electrical specifics
    OBSIDIAN:   "OBSIDIAN",    // plugin/app layer
    FORMS:      "FORMS",       // modal forms
    PIPELINE:   "PIPELINE",    // field pipeline
    // add more as you need
  });

  // 2) Prefix styles for consistency (emoji + label)
  static TYPE_PREFIX = Object.freeze({
    VALIDATION:       "🧪 Validation",
    RUNTIME:          "🛠️ Runtime",
    LOOKUP:           "🔎 Lookup",
    IO:               "📁 I/O",
    SCHEMA_MISMATCH:  "📐 Schema",
    FIELD_MAP:        "🗺️ FieldMap",
    LINK_RESOLVE:     "🔗 Link",
  });

  static DOMAIN_PREFIX = Object.freeze({
    GENERAL:    "• General",
    ELECTRICAL: "• ⚡ Electrical",
    OBSIDIAN:   "• 📔 Obsidian",
    FORMS:      "• 🧾 Forms",
    PIPELINE:   "• 🔧 Pipeline",
  });

  // 3) Base catalog (global, domain-agnostic)
  static CATALOG = {
    VALIDATION: {
      MISSING_FIELD:       "Missing '{field}' (got: {got}).",
      INVALID_TYPE:        "'{field}' must be {expected}; got {got}.",
    },
    LOOKUP: {
      NO_HANDLER:          "No handler for fileClass '{fileClass}'.",
      NOT_FOUND:           "Could not find '{what}'.",
    },
    RUNTIME: {
      MISSING_ENV:         "Missing runtime dependency: {missing}.",
      UNEXPECTED_STATE:    "Unexpected state in {where}.",
    },
    IO: {
      TEMPLATE_NOT_FOUND:  "Template not found at path: {templateFile}.",
      READ_FAILED:         "Failed reading '{path}'.",
      WRITE_FAILED:        "Failed writing '{path}'.",
    },
    SCHEMA_MISMATCH: {
      BAD_SHAPE: "Schema mismatch at '{where}': {detail}.",
    },
    FIELD_MAP: {
      BAD_ENTRY: "Field map entry '{field}' is invalid ({detail}).",
      MISSING_KEY: "Field map '{field}' is missing {missing}.",
    },
    LINK_RESOLVE: {
      FAILED: "Could not resolve link for '{value}'.",
      FALLBACK: "Link resolve failed; fell back to plain string for '{value}'.",
    },
  };

  // 4) Domain catalog (overrides or adds codes per domain)
  //    Structure: DOMAIN_CATALOG[DOMAIN][TYPE][CODE] = "template"
  static DOMAIN_CATALOG = {
    ELECTRICAL: {
      VALIDATION: {
        PANEL_SLOT_TAKEN:  "Panel '{panel}' slot {slot} already occupied by '{by}'.",
        CONDUCTOR_ID_BAD:  "Conductor id '{id}' invalid for standard '{std}'.",
      },
    },
    // add FORMS/PIPELINE/OBSIDIAN overrides here as needed
  };

  // 5) Registration APIs
  static register(type, codesObj) {
    const T = String(type || "").toUpperCase();
    this.CATALOG[T] = { ...(this.CATALOG[T] || {}), ...(codesObj || {}) };
  }

  static registerDomain(domain, type, codesObj) {
    const D = String(domain || "").toUpperCase();
    const T = String(type || "").toUpperCase();
    const d = (this.DOMAIN_CATALOG[D] ||= {});
    d[T] = { ...(d[T] || {}), ...(codesObj || {}) };
  }

  // 6) Token formatting
  static #fmt(template, ctx = {}) {
    return String(template || "").replace(/\{(\w+)\}/g, (_, k) =>
      ctx[k] == null ? "" : String(ctx[k])
    );
  }

  // 7) Build structured error (type + domain)
  //    Usage:
  //      errorBus.err(TYPE.VALIDATION, "PANEL_SLOT_TAKEN", {panel, slot, by}, {domain: DOMAIN.ELECTRICAL})
  static err(type, code, ctx = {}, opts = {}) {
    const T = String(type || "").toUpperCase();
    const C = String(code || "").toUpperCase();
    const D = String(opts?.domain || this.DOMAIN.GENERAL).toUpperCase();

    const domainTmpl = this.DOMAIN_CATALOG?.[D]?.[T]?.[C];
    const baseTmpl   = this.CATALOG?.[T]?.[C];
    const tmpl       = domainTmpl || baseTmpl || "Unknown error.";

    const left  = this.TYPE_PREFIX[T] || "⚠️";
    const right = this.DOMAIN_PREFIX[D] || "";
    const message = `${left} ${right}: ${this.#fmt(tmpl, ctx)}`.trim();

    const e = new Error(message);
    e.type    = T;
    e.domain  = D;
    e.code    = C;
    e.details = ctx;
    e.where   = ctx.where || undefined;
    return e;
  }

  static with(preset = {}) {
    const EB = this;
    const defaults = {
      domain: EB.DOMAIN.GENERAL,
      module: undefined, // not used by err(), but we’ll add it to details
      level: "error",
      ui: undefined,     // inherit EB.mode
      console: undefined // inherit EB.mode
    };
    const ctx = { ...defaults, ...preset };

    const bindErr = (type, code, details = {}, opts = {}) => {
      const e = EB.err(type, code, { ...details, module: ctx.module }, { domain: opts.domain ?? ctx.domain });
      return e;
    };

    return Object.freeze({
      TYPE: EB.TYPE,
      DOMAIN: EB.DOMAIN,
      err: bindErr,
      toast: (e, opts = {}) => EB.toast(e, { level: ctx.level, ui: ctx.ui, console: ctx.console, ...opts }),
      msg: (t, c = {}, o = {}) => EB.msg(t, c, { ui: ctx.ui, console: ctx.console, ...o }),
      success: (t, c = {}, o = {}) => EB.success(t, c, { ui: ctx.ui, console: ctx.console, ...o }),
      info:    (t, c = {}, o = {}) => EB.info(t, c, { ui: ctx.ui, console: ctx.console, ...o }),
      warn:    (t, c = {}, o = {}) => EB.warn(t, c, { ui: ctx.ui, console: ctx.console, ...o }),
    });
  }


  // 8) Output
  // default mode: how to behave if caller doesn't pass ui/console flags
  // "both" | "console" | "ui" | "silent"
  static mode = "both";

  static toast(e, opts = {}) {
    // Back-compat: callers may pass only { level, sticky }
    const {
      level = "error",     // "error" | "warn" | "info" | "log"
      sticky = false,
      ui,                  // true/false/undefined
      console,             // true/false/undefined
    } = opts;

    // Resolve booleans from explicit opts OR global mode
    const mode = this.mode;
    const wantUI = (ui != null) ? ui : (mode === "ui" || mode === "both");
    const wantConsole = (console != null) ? console : (mode === "console" || mode === "both");
    const msg = e?.message || String(e);

    if (wantUI) { try { new Notice(msg, sticky ? 10000 : 4000); } catch {} }
    if (wantConsole) {
      const tag = `${e?.type || "ERR"}/${e?.domain || "GENERAL"}/${e?.code || "UNKNOWN"}`;
      const fn = (level === "warn") ? globalThis.console.warn
              : (level === "info") ? globalThis.console.info
              : (level === "log")  ? globalThis.console.log
              : globalThis.console?.error;
      try { fn?.(`[${tag}]`, e); } catch {}
    }
    try { this.sinks?.custom?.(this.toLog(e)); } catch {}
  }

  static toLog(e, extra = {}) {
    return {
      ts: Date.now(),
      type: e?.type || "ERR",
      domain: e?.domain || "GENERAL",
      code: e?.code || "UNKNOWN",
      message: e?.message || String(e),
      where: e?.where || e?.details?.where,
      details: e?.details || {},
      ...extra,
    };
  }

  static sinks = {
    ui:   (msg, { sticky }) => { try { new Notice(msg, sticky ? 10000 : 4000); } catch {} },
    console: (tag, e, level="error") => {
      const fn = level === "warn" ? globalThis.console?.warn
              : level === "info" ? globalThis.console?.info
              : level === "log"  ? globalThis.console?.log
              : globalThis.console?.error;
      fn?.(`[${tag}]`, e);
    },
    // opt-in extension point:
    custom: null, // set to (logObj)=>{} if you add a structured logger
  };

  static setCustomSink(fn /* or null */) { this.sinks.custom = typeof fn === "function" ? fn : null; }

  // 9) Non-error messages (success/info/warn) without building an Error
  static LEVEL_PREFIX = Object.freeze({
    success: "✅ Success",
    info:    "ℹ️ Info",
    warn:    "⚠️ Warning",
    log:     "•",
  });

  /**
   * Show a non-error message. No Error object; just a formatted Notice/console line.
   * @param {string} template - e.g. "Renamed '{from}' → '{to}'."
   * @param {object} ctx - tokens for {from}, {to}, etc.
   * @param {object} opts - { level="info", domain=DOMAIN.GENERAL, ui=true, console=false, sticky=false }
   */
  static msg(template, ctx = {}, opts = {}) {
    const {
      level   = "info",      // "success" | "info" | "warn" | "log"
      sticky  = false,
      ui,                    // true/false/undefined -> falls back to global mode
      console // true/false/undefined -> falls back to global mode
    } = opts;

    const D = String(opts?.domain || this.DOMAIN.GENERAL).toUpperCase();
    const left  = this.LEVEL_PREFIX[level] || this.LEVEL_PREFIX.info;
    const right = this.DOMAIN_PREFIX[D] || "";
    const message = `${left} ${right}: ${this.#fmt(template, ctx)}`.trim();

    // Resolve UI/console from opts or global mode
    const mode = this.mode;
    const wantUI      = (ui != null)      ? ui      : (mode === "ui" || mode === "both");
    const wantConsole = (console != null) ? console : (mode === "console" || mode === "both");

    if (wantUI)      { try { new Notice(message, sticky ? 10000 : 4000); } catch {} }
    if (wantConsole) { globalThis.console?.log?.(`[MSG/${D}/${level}]`, message); }

    return message;
  }

  // ErrorBus domain extensions (optional, improves specificity)
   static {
    // Base FIELD_MAP codes (apply across domains unless overridden)
    this.register("FIELD_MAP", {
      INVALID_INTENT:      "Unknown intent '{intent}' (field '{field}').",
      INVALID_FIELD_TYPE:  "Unknown fieldType '{fieldType}' (field '{field}').",
      BAD_GROUP_FILTER:    "Unknown or malformed groupFilter '{groupFilter}' (field '{field}').",
      CONTRACT_FAIL:       "Field map contract failed at '{where}': {detail}.",
    });

    //Domain-specific overrides for PIPELINE
    this.registerDomain("PIPELINE", "FIELD_MAP", {
      CONTRACT_FAIL: "Field map contract failed in pipeline at '{where}': {detail}.",
    });
  }





  // Sugar helpers
  static success(t, c = {}, o = {}) { return this.msg(t, c, { ...o, level: "success" }); }
  static info(t, c = {}, o = {})    { return this.msg(t, c, { ...o, level: "info" }); }
  static warn(t, c = {}, o = {})    { return this.msg(t, c, { ...o, level: "warn" }); }

}
