/* registryFactory.js (no imports/exports; attaches factory on window.customJS)
   Usage:
     const { createRegistry } = window.customJS.createRegistryFactory();
     const myReg = createRegistry({ name:"IntentRegistry", contract: intentContract, idKey:"id" });
     myReg.register({ id:"title", run: fn });
     myReg.lock();
*/

(function initRegistryFactory(){
  const regNS = (globalThis.window?.customJS ||= {});
  if (regNS.createRegistryFactory) return; // idempotent

  // Resolve buses lazily so this file can load before bootstrap
  function getEB() {
    const make = regNS.createErrorBusInstance || regNS.createerrorBusInstance;
    try { return typeof make === "function" ? make({ module: "registryFactory" }) : null; } catch { return null; }
  }
  function getVB() {
    const make = regNS.createValidationBusInstance || regNS.createvalidationBusInstance;
    try { return typeof make === "function" ? make() : null; } catch { return null; }
  }

  function deepFreeze(obj) {
    if (!obj || typeof obj !== "object") return obj;
    Object.freeze(obj);
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === "object" && !Object.isFrozen(v)) deepFreeze(v);
    }
    return obj;
  }

  function createRegistry({
    name = "Registry",
    contract = null,            // { validate(entry): { ok, errors?, warnings? } }
    idKey = "id",
    allowReplace = false,
    devUnlock = false,
    reporter = null,            // { info(code, ctx), warn(code, ctx), error(code, ctx) }
  } = {}) {
    const _map = new Map();
    let _locked = false;
    const EB = getEB();
    const VB = getVB();

    function report(level, code, ctx) {
      try {
        if (reporter && typeof reporter[level] === "function") return reporter[level](code, { registry: name, ...ctx });
        // Default fallback to buses
        if (level === "error") EB?.toast?.(EB.err?.(EB.TYPE.RUNTIME, code || "REGISTRY", { registry: name, ...ctx }, { domain: EB.DOMAIN.GENERAL }));
        else if (level === "warn") VB?.info?.({ code: code || "REGISTRY_WARN", registry: name, ...ctx });
        else VB?.info?.({ code: code || "REGISTRY_INFO", registry: name, ...ctx });
      } catch {/*no-op*/}
    }

    function ensureUnlocked() {
      if (_locked) {
        const msg = `${name}: registry is locked`;
        report("error", "REGISTRY_LOCKED", { msg });
        throw new Error(msg);
      }
    }

    function validateEntry(entry) {
      if (!contract || typeof contract.validate !== "function") return { ok: true, warnings: [] };
      const res = contract.validate(entry) || { ok: true };
      if (!res.ok) {
        const errs = res.errors || [{ message: "Contract validation failed" }];
        report("error", "CONTRACT_INVALID", { id: entry?.[idKey], errors: errs });
        const e = new Error(`${name}: invalid entry ${String(entry?.[idKey] ?? "<unknown>")}`);
        e.details = errs;
        throw e;
      }
      (res.warnings || []).forEach(w => report("warn", "CONTRACT_WARNING", { id: entry?.[idKey], warning: w }));
      return res;
    }

    function register(entry) {
      ensureUnlocked();
      if (!entry || typeof entry !== "object") {
        report("error", "ENTRY_NOT_OBJECT", { entry });
        throw new Error(`${name}: entry must be an object`);
      }
      const id = entry[idKey];
      if (!id) {
        report("error", "ENTRY_MISSING_ID", { idKey, entry });
        throw new Error(`${name}: missing ${idKey}`);
      }

      validateEntry(entry);

      if (_map.has(id) && !allowReplace) {
        report("error", "ENTRY_DUPLICATE", { id });
        throw new Error(`${name}: duplicate ${idKey} "${id}"`);
      }
      if (_map.has(id) && allowReplace) report("warn", "ENTRY_REPLACED", { id });

      const frozen = deepFreeze({ ...entry });
      _map.set(id, frozen);
      report("info", "ENTRY_REGISTERED", { id });
      return frozen;
    }

    function get(id)   { return _map.get(id); }
    function has(id)   { return _map.has(id); }
    function list()    { return Array.from(_map.values()); }
    function keys()    { return Array.from(_map.keys()); }
    function size()    { return _map.size; }
    function lock()    { _locked = true; return true; }
    function unlock()  { if (!devUnlock) throw new Error(`${name}: unlock disabled`); _locked = false; return true; }
    function unregister(id) {
      ensureUnlocked();
      if (!devUnlock) throw new Error(`${name}: unregister disabled`);
      return _map.delete(id);
    }
    function validateAll() {
      const out = [];
      for (const e of _map.values()) {
        try {
          const r = validateEntry(e);
          out.push({ id: e[idKey], ok: true, warnings: r.warnings || [] });
        } catch (err) {
          out.push({ id: e[idKey], ok: false, errors: err?.details || [String(err?.message || err)] });
        }
      }
      return out;
    }

    return Object.freeze({ name, register, get, has, list, keys, size, lock, unlock, unregister, validateAll });
  }

  regNS.createRegistryFactory = function() {
    return Object.freeze({ createRegistry });
  };
})();
