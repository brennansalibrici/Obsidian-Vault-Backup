class ModalFormsBootstrap {
    constructor() {
        this.flagKey = "modalFormsBootstrapped_v1";
    }

    async invoke() {
        console.log("🚀 Bootstrap file loaded successfully!");
        new Notice("🚀 Bootstrap file loaded successfully!");

        //Idempotency: don't double-run on script reloads
        window.customJS.state = window.customJS.state || {};
        if (window.customJS.state.modalFormsBootstrapped_v1) return;
        window.customJS.state.modalFormsBootstrapped_v1 = true;

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

        // Prefer new name; fall back to legacy symbol if still loaded
        const FieldTypeCtor     = ctor(c.FIELD_TYPE_REGISTRY) || ctor(c.FieldType);
        const FieldHandlerCtor  = ctor(c.FieldHandler);
        const FieldPipelineCtor = ctor(c.FieldPipeline);

        // ---- Canonical factories
        window.customJS.createFormatUtilsInstance              = () => new FormatCtor();
        window.customJS.createValidationBusInstance            = () => new ValidationCtor();
        window.customJS.createfileTypeHandlerInstance          = () => new FileTypeHandlerCtor();   // keep this exact case for callers
        window.customJS.createcreateNewObject_fieldMapInstance = () => new CreateMapCtor();
        window.customJS.createupdateObject_fieldMapInstance    = () => new UpdateMapCtor();
        window.customJS.creategroupTypeFilter_fieldMapInstance = () => new GroupMapCtor();

        if (FieldHandlerCtor) { window.customJS.createFieldHandlerInstance = () => new FieldHandlerCtor(); }
        if (FieldPipelineCtor) { window.customJS.createFieldPipelineInstance = () => new FieldPipelineCtor(); }

        // ---- FILE_CLASS registry (factory + enum convenience)
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

        // ---- FIELD_TYPE registry (factory + enum convenience)
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

        // ---- ErrorBus passthrough: FIX scope to window.customJS
        window.customJS.createerrorBusInstance = () => errorBus;  // <-- previously set on 'c', not usable by callers
        errorBus.mode = "console";                                // your FormatUtils etc. read it via window.customJS
        console.log("✅ ModalForms bootstrap complete.");
        new Notice("✅ ModalForms bootstrap complete.");

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
    }

    //Optional: Clean up if you attach events elsewhere
    deconstructor() {}
}
