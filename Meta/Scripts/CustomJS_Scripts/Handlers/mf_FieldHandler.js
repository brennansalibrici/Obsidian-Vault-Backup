class FieldHandler {
  constructor() {
    this.format = window.customJS.createFormatUtilsInstance();
    this.EB = window.customJS?.createerrorBusInstance?.();
    this.cache = null; //Cache for built registry
  }

  pass() {
    const id = ({ value, ctx }) => ({ value, ctx });
    return Object.freeze({
      preprocess: id,
      validate:   id,
      transform:  id,
      serialize:  id,
      postprocess:id
    });
  }

  //Safe wrappers for formatUtils; fallback to identity if missing
  F() {
    const F = this.format || {};
    const id = v => v;

    return Object.freeze({
      wrapStringIntoLink: typeof F.wrapStringIntoLink === "function" ? F.wrapStringIntoLink : id,
      db_formatDateOnly:  typeof F.db_formatDateOnly  === "function" ? F.db_formatDateOnly  : id,
      db_formatDateTime:  typeof F.db_formatDateTime  === "function" ? F.db_formatDateTime  : id,
      formatTimeOnly:     typeof F.formatTimeOnly     === "function" ? F.formatTimeOnly     : id,
    });
  }

  //Build the immutable handler registry
  buildRegistry() {
    const EB = this.EB;
    const pass = this.pass();
    const F = this.F();

    //tiny helpers (local only)
    const coerceArray = v => (Array.isArray(v) ? v : (v == null || v === "" ? [] : [v]));
    const toString = v => (v == null ? "" : String(v).trim());
    const toStringArray = v => coerceArray(v).map(x => toString(x)).filter(Boolean);

    /*
     F = this.format;
     pass = (typeof this.pass === "function") ? this.pass() : {
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
    */

    //Text-ish
    const TextBase = ({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => {
        try {
          if (ctx?.meta?.isLink === true && value) return { value: F.wrapStringIntoLink(value), ctx };
        } catch (err) {
          EB?.toast?.(err, { ui: true, console: true });
        }
          return { value, ctx };
      },
    });

    const TextAreaBase = TextBase;
    const NoteBase = TextBase;

    //Numbers / Toggles
    const NumberBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => {
        if (value === "" || value == null) return { value: null, ctx };
        const n = Number(value);
        return { value: Number.isFinite(n) ? n : null, ctx };
      },
    });

    const ToggleBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: Boolean(value), ctx }),
    });

    //Selects
    const SingleSelectBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toStringArray(value)[0] ?? "", ctx }),
      serialize: ({ value, ctx }) => {
        try {
          if (ctx?.meta?.isLink === true && value) return { value: F.wrapStringIntoLink(value), ctx };
        } catch (err) {
          EB?.toast?.(err, { ui: true, console: true });
        }
          return { value, ctx };
      },
    });

    const MultiSelectBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toStringArray(value), ctx }),
      serialize: ({ value, ctx }) => {
        try{
          if (ctx?.meta?.isLink === true && Array.isArray(value)) return { value: value.map(v => F.wrapStringIntoLink(v)), ctx };
        } catch (err) {
          EB?.toast?.(err, {ui: true, console: true });
        }
        return { value, ctx };
      },
    });

    //Dates / Times
    const DateBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => {
        try {
          return { value: F.db_formatDateOnly(value), ctx };
        } catch (err) {
          EB?.toast?.(err, { ui: true, console: true });
          return { value, ctx };
        }
      },
    });

    const TimeBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => {
        try {
          return { value: F.formatTimeOnly(value), ctx }
        } catch (err) {
          EB?.toast?.(err, { ui: true, console: true });
          return { value, ctx };
        }
      },
    });

    const DateTimeBase = Object.freeze({
      ...pass,
      transform: ({ value, ctx }) => ({ value: toString(value), ctx }),
      serialize: ({ value, ctx }) => {
        try {
          return {value: F.db_formatDateTime(value), ctx };
        } catch (err) {
          EB?.toast?.(err, { ui: true, console: true });
          return { value, ctx };
        }
      },
    });

    //Misc simple aliases
    const TagsBase    = MultiSelectBase; // tags as array of strings
    const EmailBase   = TextBase;
    const PhoneBase   = TextBase;
    const FolderBase  = TextBase;
    const SliderBase  = NumberBase;

    //Blocks / Files (pass-thru for now)
    const DataviewBase     = pass;
    const DocumentBlockBase= pass;
    const MarkdownBlockBase= pass;
    const ImageBase        = pass;
    const FileBase         = pass;

    //Return full registry keyed by FieldType strings
    const registry = Object.freeze ({
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
    });
    return registry;
  }

  getHandlers() {
    if (!this.cache) {
      try {
        this.cache = this.buildRegistry();
      } catch (err) {
        this.EB?.toast?.(err, { ui: true, console: true });
        throw err;
      }
    }
    return this.cache;
  }
}
