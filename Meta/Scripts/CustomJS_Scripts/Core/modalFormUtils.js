class ModalFormUtils {
//PURPOSE: TO HANDLE ALL FUNCTIONALITY THAT TAKES DATA FROM ANY MODAL FORMS FORM AND REFLECTS IT IN OBSIDIAN FILES (NAMING, TEMPLATING, FRONTMATTER, I/O, UI, ETC)

    //#region DEFINE ERRORBUS
    //Quick accessor for the static error bus (constructor returned by factory)
    get EB() { return window.customJS.createerrorBusInstance?.(); }
    //#endregion

    //#region CONSTRUCTOR & STATE
        constructor(){
            //EXTERNAL ENV
            this.app = null;
            this.tp = null;

            //FILE & TEMPLATES
            this.folderPath = "";
            this.folder = "";
            this.templateFile = "";

            //NAMING OUTPUTS
            this.createdFile = "";
            this.newCreatedFileName = "";
            this.newCreatedFileLink = "";
            this.newCreatedFile = "";
            this.newFileFullPath = "";

            //SEED FIELDS
            this.strField1 = "";
            this.lnkField1 = "";
            this.strField2 = "";


            //Counters
            this.fileMatch = 0;

            //Dependencies
            this.formatUtils = window.customJS.createFormatUtilsInstance();
            this.fileClassRegistry = window.customJS.createFILE_CLASS_REGISTRYInstance();
            this.fileTypeHandler = window.customJS.createfileTypeHandlerInstance();

            //Resovled fileClass & handler
            this.fileClass = "";
            this.handler = {};

            //Form Mapping
            this.modalFormName = "";

            //Misc
            this.callingFormType = "";
            this.formData = {};

            //UI
            this.ui = { dynamicTitleEnabled: true, titleTimeoutMs: 4000, }; //flip to false to keep the static form title defined in the manage forms window safety timeout for the observer


            /*this.fieldTypeFormatHooks = {                       //Eventually this should migrate to the formatting class
                "date":     this.formatUtils.db_formatDateOnly,
                "time":     this.formatUtils.formatTimeOnly,
                "date_time":this.formatUtils.db_formatDateTime,
                "link":     this.formatUtils.wrapStringIntoLink
            };*/

            /*this.ui = { dynamicTitleEnabled: true,  /
                        titleTimeoutMs: 4000        //


            //Unused?
            //this.lnkField2 = "";
            //this.newLiveFile = "";
            //this.lnkDailyNote = "";
            //this.frontmatter = "";
            //this.modalFormFieldMap = "";
            //this.modalFormFieldMap_Values = {};



            } */

        }

    //#endregion

    //#region STATIC ENUMS
        static FORM_TYPE = Object.freeze({
            CREATE: "create",
            UPDATE: "update"
        });

    //#endregion

    //#region LIFECYCLE/INIT()
        /**
         * Pseudo-constructor: sets env, resolves fileClass handler, and preps naming
         * @param {Object} config
         */
        async init(config = {}) {
            const { app, tp, fileClass, formType, file = null, context1 = "", context2 = "", useContextAsLink = true } = config;

            // ---- soft-fail guard ----
           const EB = this.EB;
           if(!app || !tp) {
            const missing = !app && !tp ? "app & tp" : (!app ? "app" : "tp");
            const e = EB.err(EB.TYPE.RUNTIME, "MISSING_ENV",
                { where: "ModalFormUtils.init", missing },
                { domain: EB.DOMAIN.OBSIDIAN }
            );
            EB.toast(e, { level: "warn", ui: false, console: true});
            return null;
           }

            this.app = app;
            this.tp = tp;

            //Form Type Specific Logic & Branching
            switch (formType.toLowerCase()){
                case "create":
                    this.callingFormType = ModalFormUtils.FORM_TYPE.CREATE;
                    break;

                case "update":
                    this.callingFormType = ModalFormUtils.FORM_TYPE.UPDATE;
                    break;

                default: {
                    const e = EB.err(EB.TYPE.VALIDATION, "INVALID_TYPE",
                        { where:"ModalFormUtils.init", field:"formType", expected:"'create' | 'update'", got: formType },
                        { domain: EB.DOMAIN.FORMS }
                    );
                    EB.toast(e, { ui: true, console: true });
                    throw e;
                }
            }

            //fileClass handler
            const FCR = this.fileClassRegistry;
            const raw = fileClass || (tp?.frontmatter?.fileClass ?? "");
            const resolvedKey = FCR.resolveKey(raw);

            if(!resolvedKey) {
                const e = EB.err(EB.TYPE.VALIDATION, "MISSING_FIELD",
                    { where:"ModalFormUtils.init", field:"fileClass", got: raw },
                    { domain: EB.DOMAIN.FORMS }
                );
                EB.toast(e, { ui: true, console: true });
                throw e;
            }

            this.fileClass = resolvedKey;
            this.fileTypeHandler.init(FCR, this.callingFormType);
            this.handler = this.fileTypeHandler.getHandler(this.fileClass);

            if (!this.handler) {
                const e = EB.err(EB.TYPE.LOOKUP, "NO_HANDLER",
                    { where:"ModalFormUtils.init", fileClass: this.fileClass },
                    { domain: EB.DOMAIN.PIPELINE }
                );
                EB.toast(e, { ui: true, console: true });
                throw e;
            }

            //Context & paths
            this.strField1 = context1;
            this.lnkField1 = useContextAsLink ? this.formatUtils.wrapStringIntoLink(context1) : context1;
            this.folderPath = this.handler.folder;
            this.folder = app.vault.getAbstractFileByPath(this.folderPath);
            this.templateFile = this.handler.template;

            if (!this.templateFile) {
                const e = EB.err(EB.TYPE.IO, "TEMPLATE_NOT_FOUND",
                    { where:"ModalFormUtils.init", templateFile: String(this.templateFile || "(unset)") },
                    { domain: EB.DOMAIN.OBSIDIAN }
                );
                EB.toast(e, { ui: true, console: true });
                throw e;
            }

            //Form Name
            this.modalFormName = this.handler.modalFormMap?.mdlFormName;
            if (!this.modalFormName) {
                const e = this.EB.err(
                    this.EB.TYPE.LOOKUP, "NOT_FOUND",
                    { where: "ModalFormUtils.init", what: `modal form for fileClass '${this.fileClass}'` },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, { level: "warn", ui: true, console: true });
                return null;
            }

            // Count matches in folder for naming logic
            if (this.folder && this.folder.children) {
                for (const file of this.folder.children) {
                    if (file.name.includes(this.strField1)) {
                        this.fileMatch++;
                    }
                }
            }
            return this; //fluent
        }

    //#endregion

    //#region FILE NAMING
        //checks to see if the filename created already exists in the target folder and if so, appends '-1', '-2', etc.
        ensureUniqueFilename(base) {
            const baseName = this.formatUtils.sanitizeForFilename(base);
            const existingNames = new Set(this.folder?.children?.map(file => file.name.replace(/\.md$/, "")) || []);
            if (!existingNames.has(baseName)) return baseName;
            let counter = 1;
            let uniqueName = `${baseName}-${counter}`;
            while (existingNames.has(uniqueName)) { counter++; uniqueName = `${baseName}-${counter}`; }
            return uniqueName;
        }

        //Delegate to fileType handler naming
        getFinalFileName(baseName, count = null) {
            if (!this.handler || typeof this.handler.naming !== "function") {
                const e = this.EB.err(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
                    { where:"ModalFormUtils.getFinalFileName", fileClass: this.fileClass },
                    { domain: this.EB.DOMAIN.PIPELINE }
                );
                this.EB.toast(e, { ui: true, console: true });
                throw e;
            }

            // Call the naming function with the correct context (`this`) so formatUtils is available
            const clean = this.formatUtils.sanitizeForFilename(baseName);
            return count !== null ? this.handler.naming.call(this, clean, count) : this.handler.naming.call(this, clean);
        }


        //Compute + set this.newCreatedFileName/link/path
        createNewFileName(strName = "") {
            if (strName) this.strField2 = strName;
            if (!this.handler?.naming) {
                const e = this.EB.err(
                    this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
                    { where: "ModalFormUtils.createNewFileName", fileClass: this.fileClass },
                    { domain: this.EB.DOMAIN.PIPELINE }
                );
                this.EB.toast(e, { ui: true, console: true });
                throw e;
            }

            //Prefer a filename that is passed into the function if available
            const baseName = this.strField2 || this.strField1 || "Untitled";

            //Special case for count-tracking file types
            if (this.handler?.countTracking) {
                const existingNames = this.folder?.children?.map(file => file.name.replace(/\.md$/, "")) || [];
                const prefix = this.formatUtils.sanitizeForFilename(baseName);
                const pattern = new RegExp(`^${prefix}.*?(\\d+)$`);
                let maxCount = 0;
                for (const name of existingNames) { const match = name.match(pattern); if (match) { const count = parseInt(match[1], 10); if (!isNaN(count) && count > maxCount) maxCount = count; } }
                const nextCount = maxCount + 1;
                const finalName = this.getFinalFileName(baseName, nextCount);
                this.newCreatedFileName = finalName;
                this.newCreatedFileLink = this.formatUtils.wrapStringIntoLink(finalName);
                this.newFileFullPath = `${this.folderPath}/${finalName}.md`;
                return finalName;
            }

            //Default fallback for non-counted types. Use safety check to avoid overwriting existing files
            const initialName = this.getFinalFileName(baseName);
            const safeName = this.ensureUniqueFilename(initialName);
            if (safeName !== initialName) {
                this.EB.info(`Filename "{initial}" already exists. Renamed to "{safe}".`,
                    { initial: initialName, safe: safeName },
                    { domain: this.EB.DOMAIN.OBSIDIAN, ui: true, console: true }
                );
           }
            this.newCreatedFileName = safeName;
            this.newCreatedFileLink = this.formatUtils.wrapStringIntoLink(safeName);
            this.newFileFullPath = `${this.folderPath}/${safeName}.md`;
            return safeName;
        }

        getCreateTitleFromMap(formData) {
            const mapContainer = (typeof this.handler.modalFormMap === "function")
                ? this.handler.modalFormMap()
                : this.handler.modalFormMap;

            const map = mapContainer?.mdlForm_fieldMap || {};
            // Prefer a mapping whose *frontmatter key* looks like a title
            const candidates = ["title", "tradeoff_name"];
            let chosen = null;

            for (const [fmKey, mappingRaw] of Object.entries(map)) {
                const m = (mappingRaw && typeof mappingRaw === "object")
                ? mappingRaw
                : (typeof mappingRaw === "function") ? { key: fmKey, resolver: mappingRaw }
                : (typeof mappingRaw === "string")   ? { key: fmKey, modalKey: mappingRaw }
                : null;
                if (!m) continue;

                const key = m.key || fmKey;
                if (candidates.includes(key)) { chosen = m; break; }
            }

            if (!chosen) return formData?.title || this.strField2 || this.strField1 || "Untitled";

            if (typeof chosen.resolver === "function") {
                return chosen.resolver(formData, this, this.formatUtils);
            }
            if (typeof chosen.modalKey === "string") {
                return formData[chosen.modalKey] ?? "";
            }
            return "";
        }
    //#endregion

    //#region FILE CREATION/UPDATE (PUBLIC)
        //Create file from template and write frontmatter based on formData
        async createFileWithFrontmatter(formData) {
            try {
                this.formData = formData;
                const titleValue = this.getCreateTitleFromMap(this.formData);
                this.createNewFileName(titleValue);
                const file = await this.createNewFileFromTemplate();
                if (file) await this.writeFrontMatter_fromCreateForm(file);
                if (file) this.EB.success("Created file '{name}' from template.", { name: this.newCreatedFileName }, { domain: this.EB.DOMAIN.OBSIDIAN, ui: true, console: false });
                return file;
            } catch (err) {
                const e = this.EB.err(
                    this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
                    { where: "ModalFormUtils.createFileWithFrontmatter", cause: err?.message },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, { ui: true, console: true });
                return null;
            }
        }

        //Create new file from template path
        async createNewFileFromTemplate() {
            try {
                const templateFile = this.app.vault.getAbstractFileByPath(this.templateFile);
                if(!templateFile) {
                    const e = this.EB.err(this.EB.TYPE.IO, "TEMPLATE_NOT_FOUND",
                        { where:"ModalFormUtils.createNewFileFromTemplate", templateFile: this.templateFile },
                        { domain: this.EB.DOMAIN.OBSIDIAN }
                    );
                    this.EB.toast(e);
                    throw e;
                }
                const templateContent = await this.app.vault.read(templateFile);
                const filePath = `${this.folderPath}/${this.newCreatedFileName}.md`;
                this.newCreatedFile = await this.app.vault.create(filePath, templateContent);
                this.newCreatedFileLink = `[[${this.newCreatedFileName}]]`;
                return this.newCreatedFile;
            } catch (err) {
                const e = this.EB.err(
                    this.EB.TYPE.IO, "WRITE_FAILED",
                    { where: "ModalFormUtils.createNewFileFromTemplate", path: `${this.folderPath}/${this.newCreatedFileName}.md`, cause: err?.message },
                    { domain: this.EB.DOMAIN.OBSIDIAN }
                );
                this.EB.toast(e, { ui: true, console: true });
            }
        }

        //Updates an existing file's frontmatter with values from the current modal form
        async updateFileWithFrontmatter(file, formData){
            try {
                // 1) resolve raw values from UPDATE map
                const updatesRaw = this.resolveFrontmatterUpdate(formData);

                // 2) run through Field Type Pipeline (same as create)
                const mapContainer = (typeof this.handler.modalFormMap === "function")
                ? this.handler.modalFormMap()
                : this.handler.modalFormMap;

                const processed = await this.applyFieldTypePipeline(
                updatesRaw,
                mapContainer,
                { app: this.app, tp: this.tp, fileType: this.fileClass, filePath: file?.path }
                );

                // 3) write
                await this.app.fileManager.processFrontMatter(file, (fm) => {
                for (const [k, v] of Object.entries(processed)) fm[k] = v;
                fm["last_modified"] = this.formatUtils.db_formatDateTime(new Date());
                });
                this.EB.success("Updated frontmatter for '{path}'.", { path: file?.path || "(unknown)" }, { domain: this.EB.DOMAIN.FORMS, ui: true, console: false } );
            } catch (err) {
                const e = this.EB.err(this.EB.TYPE.IO, "WRITE_FAILED",
                { where:"ModalFormUtils.updateFileWithFrontmatter", path: file?.path, cause: err?.message },
                { domain: this.EB.DOMAIN.OBSIDIAN }
                );
                this.EB.toast(e, { ui: true, console: true });
            }
        }

    //#endregion

    //#region FRONTMATTER MAP RESOLUTION
        //Convenience router (used by callers that don't know mode)
        resolveAllFrontmatter(formData) {
            switch (this.callingFormType) {
                case ModalFormUtils.FORM_TYPE.CREATE:
                    return this.resolveFrontmatterCreate(formData);

                case ModalFormUtils.FORM_TYPE.UPDATE:
                    return this.resolveFrontmatterUpdate(formData);

                default: {
                    const e = this.EB.err(this.EB.TYPE.RUNTIME, "UNEXPECTED_STATE",
                        { where: "ModalFormUtils.resolveAllFrontmatter", mode: this.callingFormType },
                        { domain: this.EB.DOMAIN.PIPELINE }
                    );
                    this.EB.toast(e, { ui: true, console: true });
                    throw e;
                }
            }
        }

        //Build frontmatter for CREATE from mapping
        resolveFrontmatterCreate(formData) {
        const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;
        const map = mapContainer?.mdlForm_fieldMap;
        if (!map) {
            const note = this.EB.err(
                this.EB.TYPE.LOOKUP, "NOT_FOUND",
                { where: "ModalFormUtils.resolveFrontmatterCreate", what: `fieldMap for '${this.fileClass}'` },
                { domain: this.EB.DOMAIN.FORMS }
            );
            this.EB.toast(note, { level: "warn", ui: false, console: true });
            return {};
        }

        const frontmatter = {};
            for (const [fmKey, mappingRaw] of Object.entries(map)) {
                const m = (mappingRaw && typeof mappingRaw === "object")
                    ? mappingRaw
                    : (typeof mappingRaw === "function") ? { key: fmKey, resolver: mappingRaw }
                    : (typeof mappingRaw === "string")   ? { key: fmKey, modalKey: mappingRaw }
                    : null;
                if (!m) {
                    const note = this.EB.err(
                        this.EB.TYPE.VALIDATION, "INVALID_TYPE",
                        { where: "ModalFormUtils.resolveFrontmatterCreate", field: fmKey, expected: "mapping object|string|function", got: typeof mappingRaw },
                        { domain: this.EB.DOMAIN.FORMS }
                    );
                    this.EB.toast(note, { level: "warn", ui: false, console: true });
                    continue;
                }
                if (!m.key) m.key = fmKey;
                let value;
                if (typeof m.resolver === "function") value = m.resolver(formData, this, this.formatUtils);
                else if (typeof m.modalKey === "string") value = formData[m.modalKey];
                else {
                    const note = this.EB.err(
                        this.EB.TYPE.VALIDATION, "MISSING_FIELD",
                        { where: "ModalFormUtils.resolveFrontmatterCreate", field: "resolver|modalKey", got: "none" },
                        { domain: this.EB.DOMAIN.FORMS }
                    );
                    this.EB.toast(note, { level: "warn", ui: false, console: true });
                }
                if (value !== undefined && value !== null) frontmatter[m.key] = value;
            }
            return frontmatter;
        }

        //Build raw updates for UPDATE from mapping (no formatting/typing; pipeline will handle)
        resolveFrontmatterUpdate(formData) {
            const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;
            const map = mapContainer?.mdlForm_fieldMap;
            if(!map) {
                const note = this.EB.err(
                    this.EB.TYPE.LOOKUP, "NOT_FOUND",
                    { where: "ModalFormUtils.resolveFrontmatterUpdate", what: `fieldMap for '${this.fileClass}'` },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(note, { level: "warn", ui: false, console: true });
                return {};
            }

            const groupReg = (typeof this.handler.groupTypeFilter === "function") ? this.handler.groupTypeFilter() : this.handler.groupTypeFilter || {};
            const updates = {};

            //Shape to YAML per explicit only declration rule and link wrapping
            const shapeForYaml = (val, {isLinkField, singleSelect, multiSelect}) => {
                const wantsArray = multiSelect === true;
                const arr = this.formatUtils.toYamlList(val, { link: isLinkField }); // link decisions handled in pipeline by fieldType
                return wantsArray ? arr : (arr[0] ?? "");
            };

            for(const [formField, mapping] of Object.entries(map)) {
                const m = (typeof mapping === "object") ? mapping : { key: mapping} ;
                const { key, from = "frontmatter", singleSelect = false, multiSelect = false, isLink = false, groupFilter = null, type = null } = m;
                if(!key) continue;
                if(from === "file") continue;

                //GROUP FILTER PATH: visible subfield resolves back to a single frontmatter key
                if(groupFilter && groupReg[groupFilter]) {
                    const reg = groupReg[groupFilter]; //{ groupField, subFieldsByGroup}
                    const groupField = reg.groupField;
                    const groupValue = formData[groupField];
                    if(groupField && groupValue != null) updates[groupField] = groupValue; // persist the selector itself
                    if(groupField && groupValue && reg.subFieldsByGroup) {
                        const subFieldKey = reg.subFieldsByGroup[groupValue];
                        if(subFieldKey){
                            let /*const*/ subval = formData[subFieldKey];

                            //shape for YAML (arrays only if multiSelect: true)
                            updates[key] = shapeForYaml(subval, { //singleSelect, multiSelect });
                                isLinkField: !!m.isLink, //***NEED TO GET RID OF LINK FIELDS AND DEFINE IT IN THE FIELD MAPS
                                singleSelect,
                                multiSelect
                            });
                        }
                    }
                    continue;
                }

                //NON-GROUP field: get value from the form by the form field name
                let val = formData[formField];

                //shape for YAML (eplicit-only multiSelect)
                updates[key] = shapeForYaml(val, { //singleSelect, multiSelect });
                    isLinkField: !!m.isLink,
                    singleSelect,
                    multiSelect
                });

            }

            return updates;
        }

    //#endregion

    //#region FRONTMATTER WRITE (CREATE)
        async writeFrontMatter_fromCreateForm(file) {
            try {
                // 1) resolve raw values from the create map (object entries)
                const fieldMapRaw  = this.resolveFrontmatterCreate(this.formData);

                // 2) run field-type/format pipeline
                const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;
                const processed = await this.applyFieldTypePipeline(fieldMapRaw, mapContainer, { app: this.app, tp: this.tp, fileType: this.fileClass, filePath: this.newFileFullPath });

                // 3) write to YAML
                const mapObj = mapContainer?.mdlForm_fieldMap || {};
                await this.app.fileManager.processFrontMatter(file, (fm) => {
                    for (const [key, value] of Object.entries(processed)) {
                        if (value === undefined || value === null) continue;
                        const mapping = (typeof mapObj[key] === "object") ? mapObj[key] : {};
                        const isArrayField = mapping?.multiSelect === true;
                        if (Array.isArray(value)) fm[key] = value;
                        else fm[key] = isArrayField ? [value] : value;
                    }
                });
                await this.updateLastModified(file);
            } catch (err) {
                const e = this.EB.err(this.EB.TYPE.IO, "WRITE_FAILED",
                    { where:"ModalFormUtils.writeFrontMatter_fromCreateForm", path: this.newFileFullPath, cause: err?.message },
                    { domain: this.EB.DOMAIN.OBSIDIAN }
                );
                this.EB.toast(e, { ui: true, console: true });
            }
        }

        async updateLastModified(file) {
            try {
                const formattedNow = this.formatUtils.db_formatDateTime(window.moment());
                await this.app.fileManager.processFrontMatter(file, (fm) => { fm["last_modified"] = formattedNow; });
            } catch (err) {
                const e = this.EB.err(this.EB.TYPE.IO, "WRITE_FAILED",
                    { where:"ModalFormUtils.updateLastModified", path: file?.path, cause: err?.message },
                    { domain: this.EB.DOMAIN.OBSIDIAN }
                );
                this.EB.toast(e, { level:"warn", ui: true, console: true });
            }
        }

    //#endregion

    //#region FIELD PIPELINE BRIDGE
        //Apply Field Type Pipeline for formatting/typing; shared by create/update
        async applyFieldTypePipeline(frontmatterObj, mapContainer, env = {}) {
            const mc   = (typeof mapContainer === "function") ? mapContainer() : mapContainer;
            const map  = mc?.mdlForm_fieldMap || {};
            const Types = window.customJS.FIELD_TYPE || window.customJS.FIELD_TYPE_ENUM; //backwards compatible
            const pipeline = window.customJS.createFieldPipelineInstance();

            const out = { ...frontmatterObj };
            for (const [fmKey, mappingRaw] of Object.entries(map)) {
                const m = (typeof mappingRaw === "object") ? mappingRaw
                        : (typeof mappingRaw === "function") ? { key: fmKey, resolver: mappingRaw }
                        : (typeof mappingRaw === "string")   ? { key: fmKey, modalKey: mappingRaw }
                        : null;
                if (!m) continue;
                const fieldType = m.fieldType || Types.TEXT;
                const key = m.key || fmKey;
                if (typeof out[key] === "undefined") continue; //not set by resolver

                const ctx = { fieldKey: key, modalKey: m.modalKey || fmKey, type: fieldType, raw: out[key], current: undefined, meta: m || {}, env };
                out[key] = await pipeline.process(ctx);
            }
            return out;
        }

    //#endregion

    //#region UI HELPERS - MODAL TITLES
        /**
         * Ensure a visible modal title equals `titleText` while the modal lives.
         * Returns a cleanup function you can call to stop observing.
         */
        ensureDynamicTitle(titleText, { className = "mf-dynamic-title" /* set this as “Custom class name” in the form*/, timeout   = this.ui?.titleTimeoutMs ?? 6000 } = {}) {
            let guard = null, unmount = null, stopped = false;
                //try {
            const selector = `.modal-container.${className}, .${className} .modal-container, .${className}`;
            // First shot: if the modal is already in DOM, set immediately
            const applyNow = () => {
                const container = document.querySelector(selector);
                const titleEl = container?.querySelector?.(".modal-title");
                if(!titleEl) return false;
                titleEl.textContent = titleText;
                //keep it stable against re-renders
                guard = new MutationObserver(() => { if(titleEl.textContent !== titleText) titleEl.textContent = titleText; });
                guard.observe(titleEl, {childList:true, characterData: true, subtree: true });
                //stop when modal removed
                unmount = new MutationObserver(() => {
                    if(!document.body.contains(container)) cleanup();
                });
                unmount.observe(document.body, {childList: true, subtree: true });
                return true;
            };

            const cleanup = () => {
                if(stopped) return; stopped = true;
                try { guard?.disconnect(); } catch {}
                try { unmount?.disconnect(); } catch {}
            }

            if (applyNow()) return cleanup;

            // Otherwise, observe until it appears (or timed out)
            const obs = new MutationObserver(() => { if (applyNow()) obs.disconnect(); });
            obs.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => obs.disconnect(), timeout);
        }

        //Open a saved form by name and override its UI title using observer
        async openNamedUpdateFormWithDynamicTitle(file, { title = `Update — ${file?.basename || "Untitled"}`, className = "mf-dynamic-title", timeoutMs = this.ui?.titleTimeoutMs ?? 6000, values    = null } = {}) {
            const mf = this.app?.plugins?.plugins?.modalforms?.api;
            if (!mf?.openForm) {
                const e = this.EB.err(
                    this.EB.TYPE.RUNTIME, "MISSING_ENV",
                    { where: "ModalFormUtils.openNamedUpdateFormWithDynamicTitle", missing: "Modal Forms API" },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, { level: "warn", ui: false, console: true });
                return null;
            }
            const stop = title ? this.ensureDynamicTitle(title, { className, timeout: timeoutMs }) : null;
            try {
                const prefill = values ?? (typeof this.buildFormValuesFromFrontmatter === "function" ? this.buildFormValuesFromFrontmatter(file) : {});
                const result = await mf.openForm(this.modalFormName, { values: prefill });
                return result;
            } finally { stop?.(); }
        }

        //Preferred: open udate form inline, overriding only UI title
        async openUpdateFormWithDynamicTitle(file, { title = `Update Frontmatter — ${file?.basename || "Untitled"}`, values = null, fallbackObserve = false, className = "mf-dynamic-title", timeoutMs = this.ui?.titleTimeoutMs ?? 6000 } = {}) {
            const mf = this.app?.plugins?.plugins?.modalforms?.api;
            if (!mf?.plugin?.settings?.formDefinitions) {
                const e = this.EB.err(
                    this.EB.TYPE.RUNTIME, "MISSING_ENV",
                    { where: "ModalFormUtils.openUpdateFormWithDynamicTitle", missing: "ModalForms formDefinitions" },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, { level: "warn", ui: false, console: true });
                return null;
            }

            const baseFormName = this.modalFormName;
            if (!baseFormName) {
                const e = this.EB.err(this.EB.TYPE.LOOKUP, "NOT_FOUND",
                    { where: "ModalFormUtils.openUpdateFormWithDynamicTitle", what: "modalFormName" },
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, {ui: true, console: true });
                throw e;
            }

            const def = mf.plugin.settings.formDefinitions.find(f => f?.name === baseFormName);
            if (!def) {
                const e = this.EB.err(this.EB.TYPE.LOOKUP, "NOT_FOUND",
                    { where: "ModalFormUtils.openUpdateFormWithDynamicTitle", what: `form definition '${baseFormName}'` },
                    {domain: this.EB.DOMAIN.FORMS }
                );
                this.EB.toast(e, { ui: true, console: true });
                throw e;
            }

            const inline = JSON.parse(JSON.stringify(def));
            inline.title = String(title || "").trim() || `Update — ${file?.basename || "Untitled"}`;
            if (fallbackObserve) this.ensureDynamicTitle(inline.title, { className, timeout: timeoutMs });

            const prefill = values ?? (typeof this.buildFormValuesFromFrontmatter === "function" ? this.buildFormValuesFromFrontmatter(file) : {});
            return mf.openForm(inline, { values: prefill });
        }

    //#endregion

    //#region FORM PREFILL, VALUE BUILDERS
        buildFormValuesFromFrontmatter(file) {
            const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;
            const mapObj = mapContainer?.mdlForm_fieldMap || {};
            const groupReg = (typeof this.handler.groupTypeFilter === "function") ? this.handler.groupTypeFilter() : this.handler.groupTypeFilter || {};
            const fm = this.tp.frontmatter || {};
            const values = {};

            for (const [formField, mapping] of Object.entries(mapObj)) {
                const m = (typeof mapping === "object") ? mapping : { key: mapping };
                const { key, from = "frontmatter", singleSelect = false, isLink = false, groupFilter = null } = m;

                if (from === "file") { values[formField] = file?.basename || ""; continue; }

                if (groupFilter && groupReg[groupFilter]) {
                    const reg = groupReg[groupFilter]; // { groupField, subFieldsByGroup }
                    const groupField = reg.groupField;
                    if (groupField && fm[groupField] != null) values[groupField] = fm[groupField];
                    const raw = fm[key];
                    const arr = this.formatUtils.toFormList(raw, { stripLinks: !!m.isLink });
                    if (groupField && values[groupField] && reg.subFieldsByGroup) {const subFieldKey = reg.subFieldsByGroup[ values[groupField] ];
                        if (subFieldKey) values[subFieldKey] = singleSelect ? (arr[0] ?? null) : arr;

                    }
                continue;
                }

                const raw = fm[key];
                const arr = this.formatUtils.toFormList(raw, { stripLinks: !!m.isLink });
                values[formField] = singleSelect ? (arr[0] ?? null) : arr;
            }

            return values;
        }

        //Convenience title builder for update dialog headers
        concatUpdateFormTitle(file) {
            const name = file?.basename || "Untitled";
            return "Update Frontmatter - " + name;
        }

    //#endregion

    //#region MISC UTILITIES
        //generate a hook that can be linked to a DailyNote
        generateDailyNoteLink() { const today = this.formatUtils.db_formatDateOnly(new Date()); return `[[${today}]]`; }

        //known issue with Templater update is that it inserts the template path name on the first line after the frontmatter if you create a new file programmatically with fronmatter. This function removes it.
        async cleanTemplatePathFromBody(file) {
            const fileContent = await this.app.vault.read(file);
            const lines = fileContent.split("\n");
            let fmEndIndex = lines.findIndex((line, i) => line.trim() === "---" && i > 0);
            if (fmEndIndex === -1 || fmEndIndex + 1 >= lines.length) return;
            const suspiciousLine = lines[fmEndIndex + 1].trim();
            if (suspiciousLine === this.templateFile.trim()) {
                lines.splice(fmEndIndex + 1, 1); // Remove that one line
                await this.app.vault.modify(file, lines.join("\n"));
            }
        }

    //#endregion

    //#region LEGACY FUNCTIONS/ COMPAT (KEEP ONLY IF NEEDED)
    /*
        // TODO(DEPRECATE?): openForm (generic) — prefer openUpdateFormWithDynamicTitle or openNamedUpdateFormWithDynamicTitle
        async openForm(modalApi, formName, options = {}) {
            if (!modalApi?.openForm) {
                console.warn("[ModalFormUtils] Modal Forms plugin API is not available");
                return null;
            }
            // Open the form
            const result = await modalApi.openForm(formName, options);

            // Optional: set dynamic title after open (if you added that helper)
            if (options?.title) {
                await this.#setDynamicModalTitle(options.title); // your private DOM patcher
            }

            return result;
        }

        // TODO(DEPRECATE?): openFormWithDynamicTitle — replaced by openUpdateFormWithDynamicTitle
        // Opens a saved ModalForms form as an inline object with a runtime title. Returns the same result shape you currently use (prefers .data, falls back to .getData()).
        async openFormWithDynamicTitle({ file, values = {} }) {
            const mf = this.app?.plugins?.plugins?.modalforms;
            if (!mf?.api?.plugin?.settings?.formDefinitions) {
                throw new Error("ModalForms API or form definitions not available");
            }

            // Resolve the canonical form name from your handler map
            const mapContainer = (typeof this.handler.modalFormMap === "function")
                ? this.handler.modalFormMap()
                : this.handler.modalFormMap;

            const baseFormName =
                (typeof mapContainer?.mdlFormName === "function")
                ? mapContainer.mdlFormName({ file, handler: this.handler })
                : mapContainer?.mdlFormName || this.modalFormName;

            if (!baseFormName) throw new Error("No modal form name defined for this fileClass");

            // Find the saved definition by name (what you saw under plugin.settings.formDefinitions)
            const def = mf.api.plugin.settings.formDefinitions
                .find(f => f?.name === baseFormName);

            if (!def) throw new Error(`Form definition not found: ${baseFormName}`);

            // Clone → override only the display title
            const inline = JSON.parse(JSON.stringify(def));
            inline.title = `Update – ${file?.basename ?? "Untitled"}`;

            // Open as inline form; keep your default values path unchanged
            const result = await mf.api.openForm(inline, { values });

            // Normalize the return (ModalForms result is either {data:…} or exposes getData())
            const data = result?.data ?? (typeof result?.getData === "function" ? result.getData() : result);
            return data || {};
        }

        // TODO(DEPRECATE?): resolveGroupedValue — newer paths use groupTypeFilter in maps
        resolveGroupedValue(formData, groupFilterKey, {multiSelect = false} = {}) {
            const registry = this.handler.groupTypeFilter?.[groupFilterKey];
            if(!registry || !registry.groupField || !registry.subFieldsByGroup) {
                console.warn(`GroupFilter '${groupFilterKey}' is not registered.`);
                return multiSelect ? []: null;
            }

            const groupValue = formData[registry.groupField];
            if(!groupValue || !registry.subFieldsByGroup[groupValue]) {
                console.warn(`No subfield match for group '${groupValue}' in '${groupFilterKey}'`);
                return multiSelect ? [] : null;
            }

            const subField = registry.subFieldsByGroup[groupValue];
            const value = formData[subField];

            if(multiSelect) {
                return Array.isArray(value) ? value : value ? [value] : [];
            }

            return Array.isArray(value) ? value[0] : value || null;
        }
        */

    //#endregion

    //#region OLD

    /*
    // ✅ add inside class (e.g., near other helpers)
    getCreateTitleFromMap(formData) {
    const mapContainer = (typeof this.handler.modalFormMap === "function")
        ? this.handler.modalFormMap()
        : this.handler.modalFormMap;

    const map = mapContainer?.mdlForm_fieldMap || {};
    // Prefer a mapping whose *frontmatter key* looks like a title
    const candidates = ["title", "tradeoff_name"];
    let chosen = null;

    for (const [fmKey, mappingRaw] of Object.entries(map)) {
        const m = (mappingRaw && typeof mappingRaw === "object")
        ? mappingRaw
        : (typeof mappingRaw === "function") ? { key: fmKey, resolver: mappingRaw }
        : (typeof mappingRaw === "string")   ? { key: fmKey, modalKey: mappingRaw }
        : null;
        if (!m) continue;

        const key = m.key || fmKey;
        if (candidates.includes(key)) { chosen = m; break; }
    }

    if (!chosen) return formData?.title || this.strField2 || this.strField1 || "Untitled";

    if (typeof chosen.resolver === "function") {
        return chosen.resolver(formData, this, this.formatUtils);
    }
    if (typeof chosen.modalKey === "string") {
        return formData[chosen.modalKey] ?? "";
    }
    return "";
    }






    //from within an open form, opens a new form and creates the new forms object and pushes the newly created object into the current form
    async openAndLinkNewItem({formName, linkField, targetArray}) {
        const modalForm = app.plugins.plugins.modalforms.api;
        const result = await modalForm.openForm(formName);
        const newItem = `[[${result?.data?.title || "Unnamed"}]]`;
        this.debug && console.log("Created new item:", newItem);
        this.resultData[targetArray] = [...(this.resultData[targetArray] || []), newItem];
    }






//updates the frontmatter with defined results from any modal form and inserts them into the frontmatter of any specified file


#setDynamicModalTitle(containerEl, titleText) {
  try {
    if (!containerEl || !titleText) return;
    // Try common title selectors used by Modal Forms / Obsidian
    const header =
      containerEl.querySelector(".modal-title") ||
      containerEl.querySelector("h3, h2, .setting-item-name");
    if (header) header.textContent = titleText;
  } catch (e) {
    console.warn("[ModalFormUtils] setDynamicModalTitle failed:", e);
  }
}

async #setDynamicModalTitle_old(desiredTitle, { className = null, timeoutMs = 2000 } = {}) {
  if (!desiredTitle) return false;

  const deadline = Date.now() + timeoutMs;
  const selectors = [];

  // Narrow scope if the form has a custom class (Form editor → "Custom class name")
  if (className) {
    selectors.push(
      `.modal.${className} .modal-title`,
      `.modals-container .modal.${className} .modal-title`
    );
  }

  // General fallbacks for Obsidian modals
  selectors.push(
    `.modal.mod-visible .modal-title`,
    `.modals-container .modal.mod-visible .modal-title`
  );

  const findTitleEl = () => {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  };

  // First quick try (sometimes the node is already there)
  let titleEl = findTitleEl();
  if (titleEl) { titleEl.textContent = desiredTitle; return true; }

  // MutationObserver fallback for when the modal builds after we call openForm
  return new Promise((resolve) => {
    const container = document.querySelector('.modals-container') || document.body;
    const obs = new MutationObserver(() => {
      const el = findTitleEl();
      if (el) {
        el.textContent = desiredTitle;
        obs.disconnect();
        resolve(true);
      } else if (Date.now() > deadline) {
        obs.disconnect();
        console.warn("[ModalFormUtils] Could not locate modal title element to set dynamically.");
        resolve(false);
      }
    });

    obs.observe(container, { childList: true, subtree: true });

    // last-resort timeout in case no mutations fire
    setTimeout(() => {
      const el = findTitleEl();
      if (el) el.textContent = desiredTitle;
      obs.disconnect();
      resolve(!!el);
    }, timeoutMs);
  });
}

async setDynamicFormTitle(newTitle, { className = "mf-dynamic-title", timeout = 6000 } = {}) {
    //wait until the modal with out custom class becomes visible
    const modal = await this.#waitForModal(`.${className}`, timeout);
    if(!modal) {
        console.warn("[ModaFormUtils] Dynamic title: modal not found");
        return;
    }

    const titleEl = modal.querySelector(".modal-title");
    if(!titleEl) {
        console.warn("[ModalFormUtils] Dynamic title: .modal-title not found.");
        return;
    }

    //Set once...
    titleEl.textContent = newTitle;

    //...and keep it set while the modal lives (plugin re-renders can revery it)
    const observer = new MutationObserver(() => {
        if(titleEl.textContent !== newTitle) titleEl.textContent = newTitle;
    });
    observer.observe(titleEl, { characterData: true, childList: true, subtree: true });

    //stop observing when the modal closes
    const closer = new MutationObserver(() => {
        if(!document.body.contains(modal)) observer.disconnect();
    });
    closer.observe(document.body, { childList:true, subtree: true });
}

#waitForModal(selector, timeoutMS = 6000) {
  return new Promise(resolve => {
    const start = Date.now();
    const tick = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) { clearInterval(tick); resolve(el); return; }
      if (Date.now() - start > timeoutMS) { clearInterval(tick); resolve(null); }
    }, 50);
  });
}


async openFormWithTitle(options = {}, ui = {}) {
    const modalForm = this.app?.plugins?.modalforms?.api;
    if(!modalForm) {
        console.warn("[ModalFormUtils] Modal Forms plugin API is not available");
        return null;
    }

    const dynamicAllowed = ui.dynamic ?? this.ui.dynamicTitleEnabled;
    const title = ui.title;

    let stopWatching = null;
    if(dynamicAllowed && title) {
        stopWatching = this.#setDynamicModalTitle(title, { timeoutMS: ui.timeoutMS ?? this.ui.titleTimeoutMs });
    }

    try {
        //Call the actual plugin API
        const result = await modalForm.openForm(this.modalFormName, options);
        return result;
    } finally {
        //Always cleanup the observer
        if(stopWatching) stopWatching();
    }
}


// Public helper: scoped observer to keep the title updated
// Use when you open a saved form by *name* (not inline object) and want to override its title.

//Fire-and-forget watcher: waits for a moadl with 'className', sets/guards its title.
ensureDynamicTitle_old(newTitle, { className = "mf-dynamic-title", timeout = 8000 } = {}) {
    //start immediately - don't await this from the caller
    const start = Date.now();

    const findModal = () => document.querySelector(`.${className}`);
    const trySet = (modal) => {
        const titleEl = modal?.querySelector?.(".modal-title");
        if(!titleEl) return false;
        titleEl.textContent = newTitle;

        //keep title if plugin re-renders
        const guard = new MutationObserver(() => {
            if(titleEl.textContent !== newTitle) titleEl.textContent = newTitle;
        });
        guard.observe(titleEl, { childList: true, characterData: true, subtree: true });

        //stop when modal is removed
        const unmount = new MutationObserver(() => {
            if(!document.body.contains(modal)) {
                guard.disconnect();
                unmount.disconnect();
            }
        });
        unmount.observe(document.body, { childList: true, subtree: true });
        return true;
    }

    //poll until modal shows or timeout
    const tick = () => {
        const ok = trySet(findModal());
        if (ok) return;
        if (Date.now() - start > timeout) return;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

}



// =====================================
//  PREFERRED: INLINE‑FORM OPEN (UPDATE)
// =====================================
// Opens the resolved Update form as an inline object, overriding only its UI title.
// Works for all fileClasses that define an Update form (via your handler maps).

// =====================================
//  PREFERRED: INLINE‑FORM OPEN (UPDATE)
// =====================================
// TEMPLATER CONTROLLER CODE (INLINE-FORM)
/*
<%*
const utils = window.customJS.createModalFormUtilsInstance();
const file  = app.workspace.getActiveFile();
await utils.init({ app, tp, fileClass: tp.frontmatter.fileClass, formType: "update" });

const res = await utils.openUpdateFormWithDynamicTitle(file);
if (!res || res.status === "cancelled") return;

const data = res.data ?? (typeof res.getData === "function" ? res.getData() : res);
await utils.updateFileWithFrontmatter(file, data);
%>
*/

// ======================================================
//  COMPAT: OPEN‑BY‑NAME + DYNAMIC TITLE (uses observer)
// ======================================================
// Use this only if you intentionally want to keep opening the saved form *by name*.
// The observer will rewrite the title as soon as the modal renders.


// ======================================================
//  COMPAT: OPEN‑BY‑NAME + DYNAMIC TITLE (uses observer)
// ======================================================
// TEMPLATER CONTROLLER CODE (OPEN BY SAVED NAME & OBSERVER)
/*
<%*
const utils = window.customJS.createModalFormUtilsInstance();
const file  = app.workspace.getActiveFile();
await utils.init({ app, tp, fileClass: tp.frontmatter.fileClass, formType: "update" });

const res = await utils.openNamedUpdateFormWithDynamicTitle(file, {
  title: `Update — ${file?.basename || "Untitled"}`,
  className: "mf-dynamic-title"  // set this in the form’s “Custom class name”
});
if (!res || res.status === "cancelled") return;

const data = res.data ?? (typeof res.getData === "function" ? res.getData() : res);
await utils.updateFileWithFrontmatter(file, data);
%>
*/

//#endregion

}
