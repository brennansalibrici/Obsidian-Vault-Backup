class FILE_CLASS_REGISTRY {
    constructor() {
        this.registry = {
            //#region ME OBJECTS
            INNER_CHECKIN: "inner_checkin",
            CAPTURED_MOMENT: "capturedMoment",
            OBSERVATION: "observation",
            INTEGRATION_JOURNAL: "emotional_growth_journal",
            REFLECTION_JOURNAL: "emotional_growth_journal",

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

    getAll() { return this.registry; }
    hasKey(key) {return !!this.registry[key]; }
    hasValue(value) { return Object.values(this.registry).includes(value.trim()); }

    getFileClass(fileClass){ return this.registry[fileClass] || null; }

    getKeyFromValue(value){
        if(typeof value !== "string") return null;
        const needle = value.trim();
        for(const [key,val] of Object.entries(this.registry)){
            if(val === needle) return key;
        }
        return null;
    }

   /*Input parameter can be either the element's [key] or the element's [value] and will return the element's [key].
   For example you can pass either "TRADE_OFF" or "tradeoff" and will resolve and return the KEY => "TRADE_OFF" */
   resolveKey(input) {
    if(typeof input !== "string") return null;
    const s = input.trim();

    //already a key?
    if(this.registry[s]) return s;

    //maybe a value?
    const k = this.getKeyFromValue(s);
    return k;
   }
}
