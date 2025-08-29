class FieldMapRegistry {
  /**
   * Internal store: Map<fileClass, Map<formType, FieldMapSet>>
   * Stored as plain objects for CustomJS friendliness.
   */
  static _store = {};

  /**
   * @param {string} fileClass
   * @param {string} formType
   * @param {import('./fieldMap.contracts.class').FieldMapContracts.FieldMapSet} set
   * @param {{mutable?:boolean}=} opts
   */
  static registerSet(fileClass, formType, set, opts) {
    const { mutable = false } = opts || {};
    if (!FieldMapContracts.isFieldMapSet(set)) {
      throw new Error(`[FieldMapRegistry.registerSet] Invalid FieldMapSet for ${fileClass}/${formType}`);
    }
    const finalSet = mutable ? set : FieldMapContracts.freezeFieldMapSet(set);
    if (!FieldMapRegistry._store[fileClass]) FieldMapRegistry._store[fileClass] = {};
    FieldMapRegistry._store[fileClass][formType] = finalSet;
  }

  /** @param {string} fileClass @param {string} formType */
  static getSet(fileClass, formType) {
    const byClass = FieldMapRegistry._store[fileClass] || {};
    return byClass[formType] || undefined;
  }

  /** (debug/inspection) */
  static keys() {
    return Object.keys(FieldMapRegistry._store);
  }
}
