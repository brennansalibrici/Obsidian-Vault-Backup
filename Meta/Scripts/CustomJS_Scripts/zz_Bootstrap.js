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

        // Use the instance that CustomJS already created
        const FCR = c.FILE_CLASS_REGISTRY;             // <-- instance, not constructor
        if (!FCR) {
            console.error("FILE_CLASS_REGISTRY instance missing from customJS.");
            new Notice("❌ FILE_CLASS_REGISTRY not available.");
            return;
        }



        // 2) Freeze a global enum for definition-time usage in maps
        window.FILE_CLASS = Object.freeze(FCR.getAll());

        // 3) Factories (multi-instance)
        window.customJS.createFormatUtilsInstance               = () => new FormatUtils();
        window.customJS.createValidationBusInstance             = () => new ValidationBus();
        window.customJS.createfileTypeHandlerInstance           = () => new fileTypeHandler();
        window.customJS.createcreateNewObject_fieldMapInstance  = () => new createNewObject_fieldMap();
        window.customJS.createupdateObject_fieldMapInstance     = () => new updateObject_fieldMap();
        window.customJS.creategroupTypeFilter_fieldMapInstance  = () => new groupTypeFilter_fieldMap();

        //Convenience getter for the singleton registry
        //window.customJS.createFILE_CLASS_RESGISTRYInstance      = () => window.customJS.FILE_CLASS_REGISTRY;

        // 4) Static Class exposure
        // ErrorBus is all-static; expose the class (no instance)
        c.createerrorBusInstance = () => errorBus;
        errorBus.mode = "console";
        console.log("✅ ModalForms bootstrap complete.");
        new Notice("✅ ModalForms bootstrap complete.");
    }

    //Optional: Clean up if you attach events elsewhere
    deconstructor() {}
}
