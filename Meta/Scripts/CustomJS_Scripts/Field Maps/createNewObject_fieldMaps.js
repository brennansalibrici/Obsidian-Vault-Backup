class createNewObject_fieldMap {
    constructor() {
        // Obtain the enum once and set on singular name; keep plural as alias for back-compat
        this.getTypes();
        this.getIntents();

        // Build the field map eagerly so lookups work immediately
        this.fieldMap = {
            "TRADE_OFF": {
                mdlFormName: "Create New Trade-Off",
                mdlForm_fieldMap: {
                    title: "tradeoff_name",
                    tradeoff_name: { key: "tradeoff_name", modalKey: "title", fieldType: this.type.TEXT, intent: this.intent.TITLE },
                    tradeoff_group: { key: "tradeoff_group", modalKey: "tradeoff_group", fieldType: this.type.SINGLESELECT },
                    tradeoff_type: {
                        key: "tradeoff_type",
                        groupFilter: "tradeoff_type",
                        resolver: (data, ctx /*, fmt*/) => {
                            const regFn = ctx?.handler?.groupTypeFilter;
                            const reg = (typeof regFn === "function" ? regFn() : regFn) || {};
                            const spec = reg["tradeoff_type]"];
                            if(!spec) return ""; //no config -> empty
                            const gf = spec.groupField;
                            const groupV = data?.[gf];
                            const subKey = spec.subFieldsByGroup?.[groupV];
                            const cal = subKey ? data?.[subKey] : undefined;
                            return Array.isArray(val) ? (val[0] ?? "") : (val ?? "");
                            },
                        fieldType: this.type.SINGLESELECT
                    },
                    applies_to: { key: "applies_to", modalKey: "applies_to", fieldType: this.type.SINGLESELECT },
                    example_behavior: { key: "example_behavior", modalKey: "example_behavior", fieldType: this.type.TEXTAREA },
                    dominant_pole_group: { key: "pole_group", modalKey: "pole_group", fieldType: this.type.SINGLESELECT },
                    dominant_pole: {
                        key: "dominant_pole",
                        groupFilter: "pole_type",
                        resolver: (data, ctx /*, fmt*/) => {
                            const regFn = ctx?.handler?.groupTypeFilter;
                            const reg = (typeof regFn === "function" ? regFn() : regFn) || {};
                            const spec = reg["pole_type"];
                            if(!spec) return "";
                            const gf = spec.groupField;
                            const groupV = data?.[gf];
                            subKey = spec.subFieldsByGroup?.[groupV];
                            const val = subKey ? data?.[subKey] : undefined;
                            return Array.isArray(val) ? (val[0] ?? "") : (val ?? "");
                        },
                        fieldType: this.type.SINGLESELECT
                    },
                    conflicted_part: { key: "conflicted_part", modalKey: "conflicted_part", fieldType: this.type.MULTISELECT, isLink: true },
                    resolved_by: {
                        key: "resolved_by",
                        groupFilter: "resolved_by_type",
                        resolver: (data, ctx/*, fmt*/) => {
                            const regFn = ctx?.handler?.groupFilter;
                            const reg = (typeof regFn === "function" ? regFn() : regFn) || {};
                            const spec = reg["resolved_by_type"];
                            if(!spec) return [];
                            const gf = spec.groupField;
                            const groupV = data?.[gf];
                            const subKey = spec.subFieldsByGroup?.[groupV];
                            const val = subKey ? data?.[subKey] : undefined;
                            const arr = Array.isArray(val) ? val : (val != null && val !== "" ? [val] : []);
                            return arr.filter(v => v !=null && String(v).trim() !=="");
                        },
                        fieldType: this.type.MULTISELECT
                    },
                    resolved_by_group: { key: "resolved_by_group", modalKey: "resolved_by_group", fieldType: this.type.SINGLESELECT },
                    created: { key: "created", resolver: (data, ctx, fmt) => fmt.db_formatDateTime(new Date()), fieldType: this.type.DATETIME },
                    last_modified: { key: "last_modified", resolver: (data, ctx, fmt) => fmt.db_formatDateTime(new Date()), fieldType: this.type.DATETIME },
                    status: { key: "status", resolver: () => "🟨 review", fieldType: this.type.SINGLESELECT },
                    entered: { key: "entered", resolver: () => false, fieldType: this.type.TOGGLE },
                    reviewed: { key: "reviewed", resolver: () => false, fieldType: this.type.TOGGLE },
                    export_to_inputs: { key: "export_to_inputs", resolver: () => false, fieldType: this.type.TOGGLE }
                }
            }
        };
    }

    getTypes() {
    if (this.type) return this.type;
    // one authoritative source, published by bootstrap
    this.type = window.customJS.FIELD_TYPE || window.customJS.FIELD_TYPE_ENUM || {
        // ultra-safe fallback (shouldn’t happen with the bootstrap in place)
        TEXT:"Text", NUMBER:"Number", TAGS:"Tags", EMAIL:"Email", PHONE:"Phone",
        DATE:"Date", TIME:"Time", DATETIME:"DateTime", TEXTAREA:"TextArea",
        TOGGLE:"Toggle", NOTE:"Note", FOLDER:"Folder", SLIDER:"Slider",
        SINGLESELECT:"SingleSelect", MULTISELECT:"MultiSelect", DATAVIEW:"Dataview",
        DOCUMENTBLOCK:"DocumentBlock", MARKDOWNBLOCK:"MarkdownBlock", IMAGE:"Image", FILE:"File"
    };
    this.types = this.type; // back-compat alias
    return this.type;
    }

    getIntents() {
        if(this.intent) return this.intent;
        //authoritative source (bootstrap sets this)
        this.intent = window.customJS.INTENT || { TITLE:"title", FILENAME:"filename", SLUG:"slug", DEADLINE:"deadline" };
        this.intents = this.intent; //optional alias for  symmetry
        return this.intent;
    }

    getAll() {
        return this.fieldMap;
    }

    getFieldMap(FILE_CLASS) {
        return this.fieldMap[FILE_CLASS] || null;
    }

    has(FILE_CLASS) {
        return !!this.fieldMap[FILE_CLASS];
    }
}




/*
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
        mdlFormName: "Create New Trade-Off",
        mdlFormFieldMap: {
            title: "tradeoff_name",
            tradeoff_group: "tradeoff_group",
            tradeoff_type: function(data) {return this.resolveGroupedValue(data, "tradeoff_type")},
            applies_to: "applies_to",
            example_behavior: "example_behavior",
            dominant_pole_group: "pole_group",
            dominant_pole: function(data) {return this.resolveGroupedValue(data, "pole_type")},
            conflicted_part: "conflicted_part",
            resolved_by: function(data) {return this.resolveGroupedValue(data, "resolved_by_type", {multiSelect: true} )},
            resolved_by_group: "resolved_by_group",
            created: function(data) {return this.formatUtils.db_formatDateTime(new Date()) },
            last_modified: function(data) {return this.formatUtils.db_formatDateTime(new Date()) },
            status: () => "🟨 review",
            entered: false,
            export_to_inputs: false
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
}
*/
