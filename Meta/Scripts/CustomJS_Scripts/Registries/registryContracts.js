/* registryContracts.js (no imports/exports; exposes factories on window.customJS)
   Provides: window.customJS.getRegistryContracts() → contracts + helpers
*/
(function initRegistryContracts(){
  const regNS = (globalThis.window?.customJS ||= {});
  if (regNS.getRegistryContracts) return; // idempotent

  // ---- tiny type guards
  const isFn  = v => typeof v === "function";
  const isStr = v => typeof v === "string" && v.trim().length > 0;
  const isArr = Array.isArray;
  const isBool= v => v === true || v === false;
  const isObj = v => v && typeof v === "object" && !isArr(v);

  const ok    = (warnings=[]) => ({ ok: true, warnings, errors: [] });
  const fail  = (errors=[])    => ({ ok: false, errors, warnings: [] });
  const err   = (message, path="", hint="") => ({ message, path, hint });

  // ---- helpers that peek at enums published by bootstrap (tolerate aliases)
  function getFieldTypeEnum() {
    const e = regNS.FIELD_TYPE || regNS.FIELD_TYPE_ENUM || {};
    // Accept either labels (e.g., "Text") or keys ("TEXT") depending on caller.
    // Our maps currently store labels (from FIELD_TYPE), so we accept any value of the enum.
    return new Set(Object.values(e));
  }
  function getIntentEnum() {
    const i = regNS.INTENT || {}; // e.g., { TITLE:"title", ... }
    return new Set(Object.values(i));
  }

  // ---------------- Registry entry contracts ----------------

  // FieldType handlers registry (your FieldHandler builds these; optional here)
  const fieldTypeHandlerContract = {
    validate(entry) {
      // shape: { id:"TEXT", preprocess, validate, transform, serialize, postprocess }
      const errors = [];
      if (!isStr(entry?.id)) errors.push(err("Missing id", "id"));
      // stages are optional; when present must be functions
      ["preprocess","validate","transform","serialize","postprocess"].forEach(k=>{
        if (entry[k] !== undefined && !isFn(entry[k])) errors.push(err(`${k} must be function`, k));
      });
      return errors.length ? fail(errors) : ok();
    }
  };

  // Intent registry entries (post-type semantics)
  const intentContract = {
    validate(entry) {
      // shape: { id:"title", preprocess?, validate?, transform?, serialize?, postprocess? }
      const errors = [];
      if (!isStr(entry?.id)) errors.push(err("Missing id", "id"));
      ["preprocess","validate","transform","serialize","postprocess"].forEach(k=>{
        if (entry[k] !== undefined && !isFn(entry[k])) errors.push(err(`${k} must be function`, k));
      });
      return errors.length ? fail(errors) : ok();
    }
  };

  // FileClass registry entries
  const fileClassContract = {
    // shape: { id:"TRADE_OFF", folder, template, naming(fn), modalFormMap:{mdlFormName, mdlForm_fieldMap}, groupTypeFilter? }
    validate(entry) {
      const errors = [];
      if (!isStr(entry?.fileClass ?? entry?.id)) errors.push(err("Missing fileClass/id", "fileClass"));
      if (entry?.folder && !isStr(entry.folder)) errors.push(err("folder must be string", "folder"));
      if (entry?.template && !isStr(entry.template)) errors.push(err("template must be string", "template"));
      if (entry?.naming && !isFn(entry.naming)) errors.push(err("naming must be function", "naming"));
      // modalFormMap presence is validated elsewhere at bootstrap
      return errors.length ? fail(errors) : ok();
    }
  };

  // ---------------- Field-map contracts ----------------
  // We accept either:
  //  A) string shorthand: "modalKey"
  //  B) object with any of:
  //     key?: string                 (frontmatter key; defaults to container's fmKey)
  //     modalKey?: string            (name from form)
  //     resolver?: function(formData, ctx, fmt) -> value
  //     from?: "frontmatter"|"file"  (if "file", modalKey/resolver not required)
  //     groupFilter?: string         (must exist in groupTypeFilter map)
  //     fieldType?: string           (must be in FIELD_TYPE enum)
  //     intent?: string              (must be in INTENT enum)
  //     isLink?: boolean
  //     singleSelect?: boolean
  //     multiSelect?: boolean
  const fieldMapEntryContract = {
    validate(entry, { fmKey, enums } = {}) {
      if (typeof entry === "string") {
        // shorthand → modalKey only
        return isStr(entry) ? ok() : fail([err("Shorthand must be string modalKey", "", "Use object form if more options are needed.")]);
      }
      const errors = [];
      if (!isObj(entry)) return fail([err("Entry must be string or object", "", "Got " + typeof entry)]);

      const { key, modalKey, resolver, from, groupFilter, fieldType, intent, isLink, singleSelect, multiSelect } = entry;
      // key optional (defaults to fmKey); but if present must be string
      if (key !== undefined && !isStr(key)) errors.push(err("key must be string", "key"));
      // modalKey optional; when present must be string
      if (modalKey !== undefined && !isStr(modalKey)) errors.push(err("modalKey must be string", "modalKey"));
      // resolver optional; when present must be fn
      if (resolver !== undefined && !isFn(resolver)) errors.push(err("resolver must be function", "resolver"));
      // from optional; if present must be "file" or "frontmatter"
      if (from !== undefined && !(from === "file" || from === "frontmatter")) errors.push(err("from must be 'file'|'frontmatter'", "from"));

      // require at least one value source unless from:"file"
      if (from !== "file" && !modalKey && !isFn(resolver)) {
        errors.push(err("entry requires modalKey or resolver (unless from:'file')", "", "Add modalKey:'formField' or resolver(fn)"));
      }

      // Booleans
      if (isLink !== undefined && !isBool(isLink)) errors.push(err("isLink must be boolean", "isLink"));
      if (singleSelect !== undefined && !isBool(singleSelect)) errors.push(err("singleSelect must be boolean", "singleSelect"));
      if (multiSelect !== undefined && !isBool(multiSelect)) errors.push(err("multiSelect must be boolean", "multiSelect"));

      // Enums (defer lookup to runtime enums published by bootstrap)
      if (fieldType !== undefined) {
        const validTypes = enums?.fieldTypes || getFieldTypeEnum();
        if (!validTypes.has(fieldType)) errors.push(err(`Unknown fieldType '${fieldType}'`, "fieldType", "Use a value from FIELD_TYPE"));
      }
      if (intent !== undefined) {
        const validIntents = enums?.intents || getIntentEnum();
        if (!validIntents.has(intent)) errors.push(err(`Unknown intent '${intent}'`, "intent", "Use a value from INTENT"));
      }

      // groupFilter is validated structurally here; existence will be cross-checked at bootstrap
      if (groupFilter !== undefined && !isStr(groupFilter)) errors.push(err("groupFilter must be string", "groupFilter"));

      return errors.length ? fail(errors) : ok();
    }
  };

  const fieldMapContract = {
    // map shape: { mdlFormName: string, mdlForm_fieldMap: { [fmKey]: string|object } }
    validate(container, { enums } = {}) {
      const errors = [];
      if (!isObj(container)) return fail([err("FieldMap container must be object", "$")]);
      if (!isStr(container?.mdlFormName)) errors.push(err("Missing mdlFormName (string)", "mdlFormName"));
      if (!isObj(container?.mdlForm_fieldMap)) errors.push(err("Missing mdlForm_fieldMap (object)", "mdlForm_fieldMap"));

      const seen = new Set();
      for (const [fmKey, mapping] of Object.entries(container.mdlForm_fieldMap || {})) {
        if (!isStr(fmKey)) errors.push(err("frontmatter key must be string", "mdlForm_fieldMap"));
        if (seen.has(fmKey)) errors.push(err(`Duplicate fmKey '${fmKey}'`, `mdlForm_fieldMap.${fmKey}`));
        seen.add(fmKey);

        const res = fieldMapEntryContract.validate(mapping, { fmKey, enums });
        if (!res.ok) res.errors.forEach(e => errors.push({ ...e, path: `mdlForm_fieldMap.${fmKey}${e.path ? "." + e.path : ""}` }));
      }

      return errors.length ? fail(errors) : ok();
    }
  };

  regNS.getRegistryContracts = function () {
    return Object.freeze({
      // helpers
      ok, fail, err, isFn, isStr, isArr, isObj, isBool,
      // contracts
      fieldTypeHandlerContract,
      intentContract,
      fileClassContract,
      fieldMapEntryContract,
      fieldMapContract,
    });
  };
})();
