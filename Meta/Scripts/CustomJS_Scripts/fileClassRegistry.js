class FILE_CLASS_REGISTRY {
    constructor() {
        this.registry = {
            //#region ME OBJECTS
            INNER_CHECKIN: "inner_checkin",
            CAPTURED_MOMENT: "capturedMoment",
            OBSERVATION: "observation",
            INTEGRATION_JOURNAL: "emotional_growth_journal",
            REFLECTION_JOURNAL: "emotional_growth_journal ",

                //#region FOUNDATION OBJECTS
                TRIGGER: "trigger",
                INTERNAL_VOICE: "internal_voice",
                SOOTHING_RESOURCE: "soothing_resource",
                EMOTIONAL_WOUND: "emotional_wound",
                BEHAVIOR_FUNCTION: "behavior_function",
                EMOTIONAL_NEED: "emotional_need",
                PROTECTIVE_STRATEGY: "protective_strategy",
                ATTACHMENT_NEED: "attachment_need",
                ATTACHMENT_STYLE: "attachment_style",
                ATTACHMENT_THEORY: "attachment_theory",
                TRADE_OFF: "tradeoff",
                EMOTION: "emotion",
                //#endregion

                //#region PRACTICE LAB OBJECTS
                PRACTICE_SESSION: "practice_session",
                LIVE_REHEARSAL: "live_rehearsal",
                COACHING_SESSION: "coaching",
                SCENARIO: "scenario",
                //#endregion

            //#endregion

            //#region PERSONAL
            PERSON: "person",
            //#endregion

            //#region WORK OBJECTS
            SWITCHGEAR: "switchgear",
            BREAKER: "breaker",
            FUSE: "fuse",
            RELAY: "relay",
            TRIP_UNIT: "tripunit",
            CUSTOMER: "customer",
            JOB: "job",
            SITE: "site",
            SUBCONTRACTOR: "subcontractor",
            POC: "poc"

            //#endregion
        };
    }

    getAll() {
        return this.registry;
    }

    getFileClass(fileClass){
        return this.registry[fileClass] || null;
    }

    hasKey(key) {
        return !!this.registry[key];
    }

    getKeyFromValue(value){
        for(const [key,val] of Object.entries(this.registry)){
            if(val === value.trim()) return key;
        }
        return null;
    }

    hasValue(value) {
        return Object.value(this.registry).includes(value.trim());
    }

    static register(customJS) {
        customJS.FILE_CLASS_REGISTRY = new FILE_CLASS_REGISTRY();
    }
}
