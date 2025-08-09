class updateObject_fieldMap {
    constructor() {
        this.fieldMap = {
            "TRADE_OFF": {
                mdlFormName: "Update Trade-Off",
                mdlForm_fieldMap: {
                   "filename": {key: "filename", from: "file"},
                    "tradeoff_name": "title",
                    "tradeoff_group": {key: "tradeoff_group", singleSelect: true},
                    "pole_group": {key: "dominant_pole_group", singleSelect: true},
                    "applies_to": {key: "applies_to", singleSelect: true},
                    "conflicted_part": {key: "conflicted_part", isLink: true, multiSelect: true},
                    "resolved_by_group": {key: "resolved_by_group", singleSelect: true},
                    "reviewed": "entered",
                    "status": {key: "status", singleSelect: true},
                    "tradeoff_type": {key: "tradeoff_type", groupFilter: "tradeoff_type", singleSelect: true},
                    "dominant_pole": {key: "dominant_pole", groupFilter: "pole_type", singleSelect: true},
                    "resolved_by": {key: "resolved_by", groupFilter: "resolved_by_type", multiSelect: true},
                }
            }
        };
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

    static register(customJS) {
        customJS.updateObject_fieldMap = new updateObject_fieldMap();
    }
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
