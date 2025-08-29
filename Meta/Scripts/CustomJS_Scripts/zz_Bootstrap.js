class ModalFormsBootstrap {
    constructor() {
        this.flagKey = "modalFormsBootstrapped_v1";
    }

    async invoke() {
        console.log("🚀 Bootstrap file loaded successfully!");
        new Notice("🚀 Bootstrap file loaded successfully!");

        //Idempotency: don't double-run on script reloads
        window.customJS.state = window.customJS.state || {};
        if (window.customJS.state[this.flagKey]) return;
        window.customJS.state[this.flagKey] = true;

        // Get the fully initialized customJS object
        const c = await cJS(); // ensures all classes are loaded & instantiated

        // pull constructors safely from cJS(), if it's already a class/function, use it; if it's an instance, use its constructor
        const ctor = (x) => (typeof x === "function" ? x : x?.constructor);

        const FormatCtor          = ctor(c.FormatUtils);
        const ValidationCtor      = ctor(c.ValidationBus);
        const FileTypeHandlerCtor = ctor(c.fileTypeHandler);
        const CreateMapCtor       = ctor(c.createNewObject_fieldMap);
        const UpdateMapCtor       = ctor(c.updateObject_fieldMap);
        const GroupMapCtor        = ctor(c.groupTypeFilter_fieldMap);
        const FieldMapShaperCtor  = ctor(c.FieldMapShaper) || (typeof FieldMapShaper === "function" ? FieldMapShaper : null);

        // Prefer new name; fall back to legacy symbol if still loaded
        const FieldTypeCtor     = ctor(c.FIELD_TYPE_REGISTRY) || ctor(c.FieldType);
        const IndexSvcCtor      = ctor(c.IndexService)   || ctor(c.indexService);
        const WriteQueueCtor    = ctor(c.WriteQueue)     || ctor(c.writeQueue);
        const FieldHandlerCtor  = ctor(c.FieldHandler);
        const FieldPipelineCtor = ctor(c.FieldPipeline);
        const IntentCtor        = ctor(c.INTENT_REGISTRY);

        //ErrorBus
        const ErrorBusCtor = ctor(c.errorBus) || ctor(c.ErrorBus); // tolerate class name variant
        if (ErrorBusCtor) {
            const make = (preset) => ErrorBusCtor.with?.(preset) ?? ErrorBusCtor; // prefer .with
            window.customJS.createErrorBusInstance  = (preset) => make(preset);
        }

        //Logger. Publish factory & a root singleton
        const LoggerCtor = ctor(c.Logger) || globalThis.Logger;
        if(!LoggerCtor) {
            console.warn("[Bootstrap] Logger class not found; skipping logger setup.");
        } else {
            //Factories
            window.customJS.createLoggerInstance = (opts={}) => new LoggerCtor(opts);
            window.customJS.getRootLogger = () => { const st = (window.customJS.state ||= {}); return (st._rootLogger ||= new LoggerCtor({ source: "root" }).addSink("console", LoggerCtor.consoleSink())); }
        }

        window.customJS.createLoggerInstance = (opts={}) => new LoggerCtor(opts);
        window.customJS.getRootLogger = () => { const st = (window.customJS.state ||= {}); return (st._rootLogger ||= new LoggerCtor({ source: "root" }).addSink("console", LoggerCtor.consoleSink())); };

        // Install ErrorBus → Logger bridge (structured)
        const EBctor = ctor(c.errorBus) || ctor(c.ErrorBus);
        if (EBctor && LoggerCtor) {
            const rootLog = window.customJS.getRootLogger?.() || new LoggerCtor({ source: "root" }).addSink("console", LoggerCtor.consoleSink());
            EBctor.setCustomSink((obj) => rootLog.errorObj(obj, "error"));
            window.customJS.loggerFor = (source, ctx={}) => rootLog.child({ source, context: ctx });
        }

        // ---- Canonical factories
        window.customJS.createFormatUtilsInstance              = () => new FormatCtor();
        window.customJS.createValidationBusInstance            = () => new ValidationCtor();
        window.customJS.createfileTypeHandlerInstance          = () => new FileTypeHandlerCtor();   // keep this exact case for callers
        window.customJS.createcreateNewObject_fieldMapInstance = () => new CreateMapCtor();
        window.customJS.createupdateObject_fieldMapInstance    = () => new UpdateMapCtor();
        window.customJS.creategroupTypeFilter_fieldMapInstance = () => new GroupMapCtor();

        if (!window.customJS.FieldMapShaper && typeof FieldMapShaper === "function") { window.customJS.FieldMapShaper = FieldMapShaper; }
        if (!window.customJS.ModalFormAdapter && typeof ModalFormAdapter === "function") { window.customJS.ModalFormAdapter = ModalFormAdapter; }

        // Singletons stored in customJS.state (so hot reloads don't duplicate)
        const appRef = (window && window.app) ? window.app : (typeof app !== "undefined" ? app : null); // Obsidian 'app' is global; window.app for safety

        if (FieldHandlerCtor)   { window.customJS.createFieldHandlerInstance = () => new FieldHandlerCtor(); }
        if (FieldPipelineCtor)  { window.customJS.createFieldPipelineInstance = () => new FieldPipelineCtor(); }
        if (IntentCtor)         {
            window.customJS.createIntentRegistryInstance    = () => new IntentCtor();
            window.customJS.createINTENT_REGISTRYInstance   = () => new IntentCtor(); //optional alias (class-name style)
        }

        if (IndexSvcCtor) {
            window.customJS.createIndexServiceInstance = () => {
                const key = "_indexServiceSingleton";
                const st = window.customJS.state;
                if (!st[key]) { st[key] = new IndexSvcCtor(); st[key].init(appRef); }
                return st[key];
            };
        }

        if (WriteQueueCtor) {
            window.customJS.createWriteQueueInstance = () => {
                const key = "_writeQueueSingleton";
                const st = window.customJS.state;
                if (!st[key]) { st[key] = new WriteQueueCtor({ concurrency: 1 }); }
                return st[key];
            };
        }

        // ---- FILE_CLASS registry (factory & enum convenience)
        window.customJS.createFILE_CLASS_REGISTRYInstance = () => c.FILE_CLASS_REGISTRY;
        // Build a frozen FILE_CLASS { KEY: "KEY" } enum once for convenience
        (() => {
            try {
                const fcr = window.customJS.createFILE_CLASS_REGISTRYInstance?.();
                const keys = Object.keys(fcr?.getAll?.() || {});
                window.customJS.FILE_CLASS = Object.freeze(Object.fromEntries(keys.map(k => [k, k])));
            } catch (e) {
                console.warn("[Bootstrap] FILE_CLASS enum init skipped:", e);
            }
        })();

        // ---- FIELD_TYPE registry (factory & enum convenience)
        (() => {
        try {
            // Use the fully-initialized instance that cJS loaded
            const ftrInst = c.FIELD_TYPE_REGISTRY; // instance
            if (!ftrInst) throw new Error("FIELD_TYPE_REGISTRY instance not found");

            // Canonical factory (returns the singleton)
            window.customJS.createFIELD_TYPE_REGISTRYInstance = () => ftrInst;

            // Visible-label enum (what your maps use, e.g. "Text","Number",...)
            const LABELS = ftrInst.constructor.TYPE || ftrInst.constructor.TYPES || {};
            window.customJS.FIELD_TYPE = Object.freeze({ ...LABELS });

            // Optional: keys enum (e.g. "TEXT","NUMBER",...) if you ever need it
            const KEYS = Object.freeze(Object.fromEntries(Object.keys(ftrInst.getAll()).map(k => [k, k])));
            window.customJS.FIELD_TYPE_KEYS = KEYS;

            // Back-compat aliases used by existing code
            window.customJS.FIELD_TYPE_ENUM = window.customJS.FIELD_TYPE;                 // old name your maps read
            window.customJS.createFieldTypesCJSInstance = window.customJS.createFIELD_TYPE_REGISTRYInstance; // legacy caller in modalFormUtils
        } catch (e) {
            console.warn("[Bootstrap] FIELD_TYPE enum init skipped:", e);
        }
        })();

        // ---- INTENT registry (factory & enum convenience)
        (() => {
        try {
            const inst = window.customJS.createIntentRegistryInstance?.()
                    || window.customJS.createINTENT_REGISTRYInstance?.();
            if (inst?.constructor?.INTENT) {
                window.customJS.INTENT = Object.freeze({ ...inst.constructor.INTENT });
                window.customJS.INTENT_KEYS = Object.freeze(
                    Object.fromEntries(Object.keys(inst.constructor.INTENT).map(k => [k, k]))
                );
                }
            } catch (e) {
                console.warn("[Bootstrap] INTENT enum init skipped:", e);
            }
        })();

        const EB  = window.customJS.createErrorBusInstance?.({ module: "bootstrap" });
        const CFR = CrossFieldRules.createInstance();

        // publish factory for back-compat
        (window.customJS ||= {}).createCrossFieldRulesInstance = () => CFR;

        // extend error codes
        EB.register(EB.TYPE.VALIDATION, {
        CROSS_FIELD_FAILED: "Cross-field validation failed ({count}).",
        FIELDS_MUTUALLY_EXCLUSIVE: "'{a}' and '{b}' cannot both be provided.",
        AT_LEAST_ONE_REQUIRED: "Provide at least one of the required fields.",
        IMPLIES_MISSING: "Field implied by another is missing.",
        });

        // register defaults
        CFR.register(CrossFieldRules.helpers.implies({ a: "winner", b: "loser" }));
        CFR.register(CrossFieldRules.helpers.mutuallyExclusive("deadline", "no_deadline"));
        CFR.register(CrossFieldRules.helpers.oneOf(["summary", "notes", "decision"], { atLeast: 1 }));

        // === Field-map validation pass (contract + cross-checks) =====================
        (() => {
        try {
            const EB = window.customJS.createErrorBusInstance?.({ module: "bootstrap:mapValidation" })
                || window.customJS.createerrorBusInstance?.({ module: "bootstrap:mapValidation" });

            const vb = window.customJS.createValidationBusInstance?.();
            const contractsLoaded = typeof window.customJS.getRegistryContracts === "function";
            if (!vb) { console.warn("[Bootstrap] ValidationBus not available; skipping map validation."); return; }
            if (!contractsLoaded) { console.warn("[Bootstrap] registryContracts not loaded; skipping strict validation."); return; }

            // Build instances via your canonical factories
            const createMap = window.customJS.createcreateNewObject_fieldMapInstance?.();
            const updateMap = window.customJS.createupdateObject_fieldMapInstance?.();
            const groupMap  = window.customJS.creategroupTypeFilter_fieldMapInstance?.();

            // If any are missing, we can't do much
            if (!createMap || !updateMap || !groupMap) {
            console.warn("[Bootstrap] Map instances missing; skipping validation.");
            return;
            }

            // Determine which file-classes actually have map containers
            const createAll = createMap.getAll?.() || {};
            const updateAll = updateMap.getAll?.() || {};
            const fileClasses = new Set([
            ...Object.keys(createAll),
            ...Object.keys(updateAll)
            ]);

            const results = [];
            for (const fc of fileClasses) {
            const cContainer = createMap.getFieldMap?.(fc);
            const uContainer = updateMap.getFieldMap?.(fc);
            const gContainer = groupMap.getFieldMap?.(fc) || {};

            if (cContainer) results.push({ fc, type: "create", res: vb.validateFieldMapContainer(cContainer, { name: `create.${fc}`, groupFilterMap: gContainer }) });
            if (uContainer) results.push({ fc, type: "update", res: vb.validateFieldMapContainer(uContainer, { name: `update.${fc}`, groupFilterMap: gContainer }) });
            }

            const failures = results.filter(r => r.res && r.res.ok === false);
            const warns    = results.flatMap(r => r.res?.warnings || []);

            // Console summary (nice to have)
            try {
            console.table(results.map(r => ({ map: r.type + "." + r.fc, ok: r.res.ok, errors: (r.res.errors||[]).length, warnings: (r.res.warnings||[]).length })));
            } catch {}

            if (warns.length) {
            EB?.toast?.(EB.info?.("Field map validation produced warnings ({count})", { count: String(warns.length) }, { domain: EB.DOMAIN.PIPELINE }) || "Map validation warnings", { level: "warn", console: true });
            }

            if (failures.length) {
            const first = failures[0];
            const msg = `Invalid field map(s): ${failures.map(f => `${f.type}.${f.fc}`).join(", ")}`;
            const e = EB?.err?.(EB.TYPE.FIELD_MAP, "BAD_ENTRY", { where: "Bootstrap.mapValidation", detail: msg }, { domain: EB.DOMAIN.PIPELINE });
            EB?.toast?.(e || msg, { console: true, ui: true });
            // Fail fast: throw so consumers don't run with broken maps
            throw (e || new Error(msg));
            }

            // If we reach here, everything is valid
            EB?.success?.("All field maps passed validation.", {}, { domain: EB.DOMAIN.PIPELINE, console: true, ui: true });

        } catch (err) {
            // Re-throw so the bootstrap caller can decide what to do (usually abort)
            throw err;
        }
        })();


        // Single clean sanity check
        (() => {
            const hasFCR = !!window.customJS.createFILE_CLASS_REGISTRYInstance;
            const hasFTR = !!window.customJS.createFIELD_TYPE_REGISTRYInstance;
            const ftr = window.customJS.createFIELD_TYPE_REGISTRYInstance?.();
            const fcr = window.customJS.createFILE_CLASS_REGISTRYInstance?.();
            console.table({
                hasFCR, hasFTR,
                TYPE_static_ok: !!ftr?.constructor?.TYPE,
                TYPES_static_ok: !!ftr?.constructor?.TYPES,
                fcr_getAll_ok: typeof fcr?.getAll === "function",
                FILE_CLASS_enum: !!window.customJS.FILE_CLASS
            });
        })();

        // === Handler-backed map validation (mirrors real runtime) ====================
        (() => {
        try {
            const EB = window.customJS.createErrorBusInstance?.({ module: "bootstrap:handlerValidation" })
                || window.customJS.createerrorBusInstance?.({ module: "bootstrap:handlerValidation" });
            const vb = window.customJS.createValidationBusInstance?.();
            if (!vb) { console.warn("[Bootstrap] ValidationBus not available; skipping handler validation."); return; }

            // Try to obtain handlers from your fileTypeHandler / pipeline
            const fh = window.customJS.createFieldHandlerInstance?.();
            const fp = window.customJS.createFieldPipelineInstance?.();

            // Collect potential sources of handlers (different shapes supported)
            const candidates = [
            fh?.handlers,                 // e.g. { TRADE_OFF: handler, ... }
            fh?.getAll?.(),               // if your class exposes a getter
            fp?.handlers,                 // if pipeline holds them
            fp?.getAll?.(),
            ].filter(Boolean);

            if (!candidates.length) {
            console.warn("[Bootstrap] No handler collection found; skipped handler-backed validation.");
            return;
            }

            // Validate the first non-empty collection found
            const first = candidates.find(c => (Array.isArray(c) ? c.length : Object.keys(c).length));
            if (!first) {
            console.warn("[Bootstrap] Handler collection empty; skipped handler-backed validation.");
            return;
            }

            const summary = vb.validateHandlersCollection(first);

            // Log a neat console table
            try {
            console.table(summary.map(r => ({
                handler: r.fc, ok: r.ok, errors: r.errors, warnings: r.warnings
            })));
            } catch {}

            const bad = summary.filter(s => !s.ok);
            const warns = summary.filter(s => s.warnings > 0);

            if (warns.length) {
            EB?.toast?.(EB.info?.("Handler validation warnings ({count})", { count: String(warns.length) }, { domain: EB.DOMAIN.PIPELINE }) || "Handler map warnings", { level: "warn", console: true });
            }
            if (bad.length) {
            const msg = `Invalid handler map(s): ${bad.map(b => b.fc).join(", ")}`;
            const e = EB?.err?.(EB.TYPE.FIELD_MAP, "BAD_ENTRY", { where: "Bootstrap.handlerValidation", detail: msg }, { domain: EB.DOMAIN.PIPELINE });
            EB?.toast?.(e || msg, { console: true, ui: true });
            throw (e || new Error(msg));
            }
        } catch (err) {
            throw err;
        }
        })();


        // === I/O layer factories (FileWriter, FrontmatterIO) =====================
        // Requires: FileWriter and FrontmatterIO classes already loaded in the workspace
        // (e.g., via a JS file you include with your other CustomJS modules).
        // No top-level side effects: only factory definitions.

        (function bootstrapIOLayerFactories(){
        // Ensure customJS namespace
        if (!window.customJS) window.customJS = {};
        const reg = window.customJS;

        // Normalize the error-bus factory name (prefer createErrorBusInstance)
        if (!reg.createErrorBusInstance && reg.createerrorBusInstance) {
            reg.createErrorBusInstance = reg.createerrorBusInstance;
        }

        // Publish factories (defer instantiation to call time)
        reg.createFileWriterInstance = reg.createFileWriterInstance || function () {
            try { return new FileWriter(app); }
            catch (e) { console.error("FileWriter factory failed", e); return null; }
        };

        reg.createFrontmatterIOInstance = reg.createFrontmatterIOInstance || function () {
            try { return new FrontmatterIO(app); }
            catch (e) { console.error("FrontmatterIO factory failed", e); return null; }
        };

        // Optional: expose constructors for testing/DI
        reg.FileWriter = reg.FileWriter || FileWriter;
        reg.FrontmatterIO = reg.FrontmatterIO || FrontmatterIO;
        })();

        console.log("✅ ModalForms bootstrap complete.");
        new Notice("✅ ModalForms bootstrap complete.");

    }

    //Optional: Clean up if you attach events elsewhere
    deconstructor() {}
}
