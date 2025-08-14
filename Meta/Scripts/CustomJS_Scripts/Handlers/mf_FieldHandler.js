class FieldHandler {
  constructor() {
    this.format = window.customJS.createFormatUtilsInstance();
  }

  _pass() {
    return {
      preprocess: ({ value, ctx }) => ({ value, ctx }),
      validate:   ({ value, ctx }) => ({ value, ctx }),
      transform:  ({ value, ctx }) => ({ value, ctx }),
      serialize:  ({ value, ctx }) => ({ value, ctx }),
      postprocess:({ value, ctx }) => ({ value, ctx })
    };
  }

  _helpers() {
    return {
      asArray: v => (Array.isArray(v) ? v : (v == null || v === "" ? [] : [v])),
      trim: v => (typeof v === "string" ? v.trim() : v),
    };
  }

  _buildRegistry() {
    const H = this._helpers();
    const pass = this._pass();
    const F = this.format;

    const TextBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: H.trim(value), ctx }),
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true) {
          const w = Array.isArray(value) ? value.map(v => F.wrapStringIntoLink(v)) : F.wrapStringIntoLink(value);
          return { value: w, ctx };
        }
        return { value, ctx };
      }
    };

    const NumberBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const n = (typeof value === "number") ? value : Number(String(value ?? "").trim());
        return { value: Number.isFinite(n) ? n : null, ctx };
      }
    };

    const TagsBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const arr = H.asArray(value).map(v => String(v ?? "").trim()).filter(Boolean);
        return { value: arr, ctx };
      }
    };

    const ToggleBase = { ...pass, transform: ({ value, ctx }) => ({ value: Boolean(value), ctx }) };

    const SingleSelectBase = {
      ...pass,
      transform: ({ value, ctx }) => ({ value: value == null ? "" : String(value).trim(), ctx }),
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true) return { value: F.wrapStringIntoLink(value), ctx };
        return { value, ctx };
      }
    };

    const MultiSelectBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const arr = H.asArray(value).map(v => String(v ?? "").trim()).filter(Boolean);
        return { value: arr, ctx };
      },
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true) return { value: value.map(v => F.wrapStringIntoLink(v)), ctx };
        return { value, ctx };
      }
    };

    const NoteBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const s = String(value ?? "").trim().replace(/^\[\[|\]\]$/g, "");
        return { value: s, ctx };
      },
      serialize: ({ value, ctx }) => {
        if (ctx?.meta?.isLink === true) {
          const arr = Array.isArray(value) ? value : [value];
          const wrapped = arr.map(v => F.wrapStringIntoLink(v));
          return { value: Array.isArray(value) ? wrapped : wrapped[0], ctx };
        }
        return { value, ctx };
      }
    };

    const DateLikeBase = { ...pass, transform: ({ value, ctx }) => ({ value: String(value ?? "").trim(), ctx }) };

    const TextAreaBase = TextBase;
    const FolderBase = TextBase;
    const SliderBase = NumberBase;
    const DataviewBase = TextBase;
    const MarkdownBlockBase = TextAreaBase;
    const DocumentBlockBase = TextAreaBase;

    const ImageBase = {
      ...pass,
      transform: ({ value, ctx }) => {
        const arr = H.asArray(value).map(v => String(v ?? "").trim()).filter(Boolean);
        return { value: arr, ctx };
      }
    };
    const FileBase = ImageBase;

    return {
      TEXT: TextBase,
      NUMBER: NumberBase,
      TAGS: TagsBase,
      EMAIL: TextBase,
      PHONE: TextBase,
      DATE: DateLikeBase,
      TIME: DateLikeBase,
      DATETIME: DateLikeBase,
      TEXTAREA: TextAreaBase,
      TOGGLE: ToggleBase,
      NOTE: NoteBase,
      FOLDER: FolderBase,
      SLIDER: SliderBase,
      SINGLESELECT: SingleSelectBase,
      MULTISELECT: MultiSelectBase,
      DATAVIEW: DataviewBase,
      DOCUMENTBLOCK: DocumentBlockBase,
      MARKDOWNBLOCK: MarkdownBlockBase,
      IMAGE: ImageBase,
      FILE: FileBase,
      __default: TextBase
    };
  }

  getHandlers() {
    if (!this._cache) this._cache = this._buildRegistry();
    return this._cache;
  }
}
