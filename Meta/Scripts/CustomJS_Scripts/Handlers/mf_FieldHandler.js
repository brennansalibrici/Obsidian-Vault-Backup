class FieldHandler {
  constructor() {
    this.format = window.customJS.createFormatUtilsInstance();
  }

  pass() {
    return {
      preprocess: ({ value, ctx }) => ({ value, ctx }),
      validate:   ({ value, ctx }) => ({ value, ctx }),
      transform:  ({ value, ctx }) => ({ value, ctx }),
      serialize:  ({ value, ctx }) => ({ value, ctx }),
      postprocess:({ value, ctx }) => ({ value, ctx })
    };
  }

  helpers() {
    return {
      asArray: v => (Array.isArray(v) ? v : (v == null || v === "" ? [] : [v])),
      trim: v => (typeof v === "string" ? v.trim() : v),
    };
  }

  buildRegistry() {
    const F = this.format;
    const pass = (typeof this.pass === "function") ? this.pass() : {
      preprocess:  ({ value, ctx }) => ({ value, ctx }),
      validate:    ({ value, ctx }) => ({ value, ctx }),
      transform:   ({ value, ctx }) => ({ value, ctx }),
      serialize:   ({ value, ctx }) => ({ value, ctx }),
      postprocess: ({ value, ctx }) => ({ value, ctx }),
    };

    // --- helpers
    const coerceArray = (v) => Array.isArray(v) ? v : (v == null ? [] : [v]);
    const toString = (v) => (v == null ? "" : String(v).trim());
    const toStringArray = (v) => coerceArray(v).map(x => toString(x)).filter(Boolean);

    // ---------- Text-ish ----------
    const TextBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true && value) {
          return { value: F.wrapStringIntoLink(value), ctx };
        }
        return { value, ctx };
      },
    };

    const TextAreaBase = TextBase;
    const NoteBase = TextBase;

    // ---------- Numbers / Toggles ----------
    const NumberBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        if (value === "" || value == null) return { value: null, ctx };
        const n = Number(value);
        return { value: Number.isFinite(n) ? n : null, ctx };
      },
    };

    const ToggleBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: Boolean(value), ctx }),
    };

    // ---------- Selects ----------
    const SingleSelectBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const first = toStringArray(value)[0] ?? "";
        return { value: first, ctx };
      },
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true && value) {
          return { value: F.wrapStringIntoLink(value), ctx };
        }
        return { value, ctx };
      },
    };

    const MultiSelectBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: toStringArray(value), ctx }),
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true) {
          return { value: (value || []).map(v => F.wrapStringIntoLink(v)), ctx };
        }
        return { value, ctx };
      },
    };

    // ---------- Dates / Times ----------
    // NOTE: This is where your old MFU "type hooks" now live.
    const DateBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => ({ value: F.db_formatDateOnly(value), ctx }),
    };

    const TimeBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => ({ value: F.formatTimeOnly(value), ctx }),
    };

    const DateTimeBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => ({ value: F.db_formatDateTime(value), ctx }),
    };

    // ---------- Misc simple aliases ----------
    const TagsBase    = MultiSelectBase; // tags as array of strings
    const EmailBase   = TextBase;
    const PhoneBase   = TextBase;
    const FolderBase  = TextBase;
    const SliderBase  = NumberBase;

    // ---------- Blocks / Files (pass-thru for now) ----------
    const DataviewBase     = pass;
    const DocumentBlockBase= pass;
    const MarkdownBlockBase= pass;
    const ImageBase        = pass;
    const FileBase         = pass;

    // ---------- Return full registry keyed by FieldType strings ----------
    return {
      Text:           TextBase,
      Number:         NumberBase,
      Tags:           TagsBase,
      Email:          EmailBase,
      Phone:          PhoneBase,
      Date:           DateBase,
      Time:           TimeBase,
      DateTime:       DateTimeBase,
      TextArea:       TextAreaBase,
      Toggle:         ToggleBase,
      Note:           NoteBase,
      Folder:         FolderBase,
      Slider:         SliderBase,
      SingleSelect:   SingleSelectBase,
      MultiSelect:    MultiSelectBase,
      Dataview:       DataviewBase,
      DocumentBlock:  DocumentBlockBase,
      MarkdownBlock:  MarkdownBlockBase,
      Image:          ImageBase,
      File:           FileBase,
      __default:      TextBase,
    };
  }

  getHandlers() {
    if (!this.cache) this.cache = this.buildRegistry();
    return this.cache;
  }
}
