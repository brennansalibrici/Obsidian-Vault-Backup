class FieldMapContracts {
  /**
   * ModalForms-compatible primitive types.
   * Keep in sync with mf_FieldTypeRegistry.
   * @typedef {(
   *  'text'|'textarea'|'number'|'date'|'time'|'datetime'|
   *  'toggle'|'select'|'multiselect'|'tags'|'link'|'file'
   * )} MFFieldType
   */

  /** @typedef {(value:any, ctx:Object)=>{ok:true,value:any}|{ok:false,errors:string[]}} ValidatorFn */
  /** @typedef {(value:any, ctx:Object)=>any} TransformFn */
  /** @typedef {(raw:any, ctx:Object)=>any} DeserializeFn */
  /** @typedef {(value:any, ctx:Object)=>any} SerializeFn */

  /**
   * @typedef UIOptions
   * @property {FieldMapContracts.MFFieldType} type
   * @property {string} label
   * @property {string=} placeholder
   * @property {boolean=} required
   * @property {Array<{label:string,value:any}>=} options
   * @property {number=} rows
   * @property {Object<string,any>=} extra
   */

  /**
   * @typedef IOMap
   * @property {'frontmatter'|'body'|'both'} location
   * @property {string} key
   * @property {FieldMapContracts.DeserializeFn=} fromNote
   * @property {FieldMapContracts.SerializeFn=} toNote
   */

  /**
   * @typedef IndexHint
   * @property {boolean=} index
   * @property {('keyword'|'text'|'number'|'date')=} as
   * @property {string=} path
   */

  /**
   * @typedef FieldPipeline
   * @property {FieldMapContracts.TransformFn[]=} preValidate
   * @property {FieldMapContracts.ValidatorFn[]=} validate
   * @property {FieldMapContracts.TransformFn[]=} postValidate
   * @property {FieldMapContracts.TransformFn[]=} prePersist
   * @property {FieldMapContracts.TransformFn[]=} preRender
   */

  /**
   * @typedef FieldMap
   * @property {string} fieldId               // modal form field name
   * @property {FieldMapContracts.UIOptions=} ui
   * @property {FieldMapContracts.IOMap} io
   * @property {FieldMapContracts.FieldPipeline=} pipe
   * @property {FieldMapContracts.IndexHint=} index
   * @property {any=} defaults
   */

  /** @typedef {Record<string, FieldMapContracts.FieldMap>} FieldMapSet */

  /** @param {any} fm */
  static isFieldMap(fm) {
    return !!fm && typeof fm === 'object'
      && typeof fm.fieldId === 'string'
      && fm.io && typeof fm.io === 'object'
      && typeof fm.io.location === 'string'
      && typeof fm.io.key === 'string';
  }

  /** @param {any} set */
  static isFieldMapSet(set) {
    if (!set || typeof set !== 'object') return false;
    const values = Object.values(set);
    for (let i = 0; i < values.length; i++) {
      if (!FieldMapContracts.isFieldMap(values[i])) return false;
    }
    return true;
  }

  /** @param {FieldMapContracts.FieldMapSet} set */
  static freezeFieldMapSet(set) {
    Object.values(set).forEach(Object.freeze);
    return Object.freeze(set);
  }
}
