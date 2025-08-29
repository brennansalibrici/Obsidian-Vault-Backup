class updateObject_fieldMap {
    constructor() {
        // Obtain the enum once and set on singular name; keep plural as alias for back-compat
        this.getTypes();
        this.getIntents();

        // Build the field map eagerly so lookups work immediately
        this.fieldMap = {
            "TRADE_OFF": {
                mdlFormName: "Update Trade-Off",
                mdlForm_fieldMap: {
                    "filename": { key: "filename", from: "file", fieldType: this.type.TEXT },
                    "tradeoff_name": { key: "title", fieldType: this.type.TEXT, intent: this.intent.TITLE },
                    "tradeoff_group": { key: "tradeoff_group", fieldType: this.type.SINGLESELECT },
                    "pole_group": { key: "dominant_pole_group", fieldType: this.type.SINGLESELECT },
                    "applies_to": { key: "applies_to", fieldType: this.type.SINGLESELECT },
                    "conflicted_part": { key: "conflicted_part", isLink: true, fieldType: this.type.MULTISELECT },
                    "resolved_by_group": { key: "resolved_by_group", fieldType: this.type.SINGLESELECT },
                    "reviewed": { key: "reviewed", fieldType: this.type.TOGGLE },
                    "entered": { key: "entered", fieldType: this.type.TOGGLE },
                    "status": { key: "status", fieldType: this.type.SINGLESELECT },
                    "tradeoff_type": { key: "tradeoff_type", groupFilter: "tradeoff_type", fieldType: this.type.SINGLESELECT },
                    "dominant_pole": { key: "dominant_pole", groupFilter: "pole_type", fieldType: this.type.SINGLESELECT },
                    "resolved_by": { key: "resolved_by", groupFilter: "resolved_by_type", fieldType: this.type.MULTISELECT }
                }
            }
        };
    }

    //#region ENUMS

        getTypes() {
            if (this.type) return this.type;

            //Prefer bootstraip-published constant (no instantiation required)
            const directEnum = window.customJS?.FIELD_TYPE_ENUM || null;

            // Canonical factory published by bootstrap
            const factory = window.customJS.createFIELD_TYPE_REGISTRYInstance;
            const inst = typeof factory === "function" ? factory() : null;
            const legacyEnum = inst?.constructor?.TYPE || inst?.constructor?.TYPES || null;

            // Accept either .TYPE or .TYPES on the constructor and store
            const enumObj = directEnum || legacyEnum;

            // Silent fallback to strings if enums aren’t ready (maps must remain pure)
            this.type = this.types = enumObj || {
                TEXT: "TEXT",
                TAGS: "TAGS",
                SINGLESELECT: "SINGLESELECT",
                MULTISELECT: "MULTISELECT",
                TOGGLE: "TOGGLE",
                DATE: "DATE",
                TIME: "TIME",
                DATETIME: "DATETIME"
            };
            return this.type;
        }

        getIntents() {
            if(this.intent) return this.intent;
            //authoritative source (bootstrap sets this)
            this.intent = window.customJS.INTENT || { TITLE:"title", FILENAME:"filename", SLUG:"slug", DEADLINE:"deadline" };
            this.intents = this.intent; //optional alias for  symmetry
            return this.intent;
        }

    //#endregion

    //#region API

    getAll() { return this.fieldMap; }
    getFieldMap(FILE_CLASS) { return this.fieldMap[FILE_CLASS] || null; }
    has(FILE_CLASS) { return !!this.fieldMap[FILE_CLASS]; }

    getFieldMapSet(FILE_CLASS) {
        const legacy = this.getFieldMap(FILE_CLASS);
        if (!legacy) return null;
        // Prefer a shared shaper attached by bootstrap
        const Shaper = window.customJS?.FieldMapShaper;
        if (Shaper && typeof Shaper.fromLegacyModalMap === "function") {
        return Shaper.fromLegacyModalMap(legacy, { Types: this.type, Intent: this.intent });
        }
        return this.#fromLegacyModalMap(legacy);
    }

    getAllFieldMapSets() {
        const out = {};
        const Shaper = window.customHS?.FieldMapShaper;
        for (const [cls, legacy] of Object.entries(this.fieldMap || {})) {
            out[cls] = (Shaper && typeof Shaper.fromLegacyModalMap === "function")
                ? Shaper.fromLegacyModalMap(legacy, { Types: this.type, Intent: this.intent })
                : this.#fromLegacyModalMap(legacy);
        }
        return out;
    }

    #fromLegacyModalMap(legacy) {
        const map = (legacy && legacy.mdlForm_fieldMap) || {};
        const out = {};
        for (const [fmKey, mappingRaw] of Object.entries(map)) {
        const m = (mappingRaw && typeof mappingRaw === "object")
            ? { ...mappingRaw }
            : (typeof mappingRaw === "string")
            ? { key: fmKey, modalKey: mappingRaw }
            : null;
        if (!m) continue;

        const fieldId = m.modalKey || fmKey; // modal field id
        const location = (m.from === "file") ? "frontmatter" : (m.location || "frontmatter");
        const key = m.key || fmKey;           // YAML key
        const uiType = m.fieldType || m.type || this.type.TEXT;

        const pipe = {
            preValidate: Array.isArray(m.preValidate) ? m.preValidate.slice() : [],
            validate:    Array.isArray(m.validate)    ? m.validate.slice()    : [],
            postValidate:Array.isArray(m.postValidate)? m.postValidate.slice(): [],
            prePersist:  Array.isArray(m.prePersist)  ? m.prePersist.slice()  : [],
            preRender:   Array.isArray(m.preRender)   ? m.preRender.slice()   : [],
        };

        out[fieldId] = {
            fieldId,
            ui: { type: uiType, label: m.label || fieldId, required: !!m.required, options: m.options, placeholder: m.placeholder, extra: m.extra },
            io: { location, key, fromNote: m.fromNote, toNote: m.toNote },
            pipe,
            intent: m.intent,
            isLink: m.isLink === true,
            index: m.index,
            defaults: m.defaults,
            _legacy: { groupFilter: m.groupFilter, resolver: m.resolver }
        };
        }
        return out;
    }

    //#endregion
}



/*export const updateObject_fieldMap = {
//#region ME OBJECTS
    [FILE_CLASS.INNER_CHECKIN]: {

    },
    [FILE_CLASS.CAPTURED_MOMENT]: {

    },
    [FILE_CLASS.OBSERVATION]: {

    },
    [FILE_CLASS.INTEGRATION_JOURNAL]: {

    },
    [FILE_CLASS.REFLECTION_JOURNAL]: {

    },

    //#region ME\FOUNDATION OBJECTS
    [FILE_CLASS.TRIGGER]: {

    },
    [FILE_CLASS.INTERNAL_VOICE]: {

    },
    [FILE_CLASS.SOOTHING_RESOURCE]: {

    },
    [FILE_CLASS.EMOTIONAL_WOUND]: {

    },
    [FILE_CLASS.BEHAVIOR_FUNCTION]: {

    },
    [FILE_CLASS.EMOTIONAL_NEED]: {

    },
    [FILE_CLASS.PROTECTIVE_STRATEGY]: {

    },
    [FILE_CLASS.ATTACHMENT_NEED]: {

    },
    [FILE_CLASS.ATTACHMENT_STYLE]: {

    },
    [FILE_CLASS.ATTACHMENT_THEORY]: {

    },
    [FILE_CLASS.TRADE_OFF]: {
        mdlFormName_FullUpdate: "Update Trade-Off",
        mdlFormName_FullUpdateFieldMap: {
            "filename": {key: "filename", from: "file"},
            "tradeoff_name": "title",
            "tradeoff_group": {key: "tradeoff_group", singleSelect: true},
            "pole_group": {key: "dominant_pole_group", singleSelect: true},
            "applies_to": {key: "applies_to", singleSelect: true},
            "conflicted_part": {key: "conflicted_part", isLink: true},
            "resolved_by_group": {key: "resolved_by_group", singleSelect: true},
            "reviewed": "entered",
            "status": {key: "status", singleSelect: true},
            "tradeoff_type": {key: "tradeoff_type", groupFilter: "tradeoff_type", singleSelect: true},
            "dominant_pole": {key: "dominant_pole", groupFilter: "pole_type", singleSelect: true},
            "resolved_by": {key: "resolved_by", groupFilter: "resolved_by_type", multiSelect: true}
        }
    },
    [FILE_CLASS.EMOTION]: {

    },
    //#endregion

    //#region ME\PRACTICE LAB OBJECTS
    [FILE_CLASS.PRACTICE_SESSION]: {

    },
    [FILE_CLASS.LIVE_REHEARSAL]: {

    },
    [FILE_CLASS.COACHING_SESSION]: {

    },
    [FILE_CLASS.SCENARIO]: {

    },
    //#endregion

    //#endregion

    //#region PERSONAL OBJECTS
    [FILE_CLASS.PERSON]: {

    },
    //#endregion

    //#region WORK OBJECTS
    [FILE_CLASS.SWITCHGEAR]: {

    },
    [FILE_CLASS.BREAKER]: {

    },
    [FILE_CLASS.FUSE]: {

    },
    [FILE_CLASS.RELAY]: {

    },
    [FILE_CLASS.TRIP_UNIT]: {

    },
    [FILE_CLASS.CUSTOMER]: {

    },
    [FILE_CLASS.JOB]: {

    },
    [FILE_CLASS.SITE]: {

    },
    [FILE_CLASS.SUBCONTRACTOR]: {

    },
    [FILE_CLASS.POC]: {

    }
    //#endregion
}*/
