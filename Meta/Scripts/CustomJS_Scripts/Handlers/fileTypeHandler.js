
class fileTypeHandler {
    constructor() {
        this.registry = Object.create(null);
        this.createNewObject_fieldMap = null;
        this.updateObject_fieldMap = null;
        this.groupTypeFilter_fieldMap = null;
        this.formMapSource = null;
        this.EB = window.customJS?.createerrorBusInstance?.();
    }

    /**
   * Initialize handler registry for a given run mode.
   * @param {FILE_CLASS_REGISTRY} FCR - instance published by bootstrap
   * @param {"create"|"update"} formType
   */
    init(FCR, formType) {
        //Guards
        if(!FCR?.getAll) {
            const e = this.EB?.err?.(this.EB.TYPE.RUNTIME, "MISSING_ENV",
                { where: "fileTYpeHandler.init", missing: "FILE_CLASS_REGISTRY "},
                { domain: this.EB.DOMAIN.FORMS }
            );
            this.EB?.toast?.(e, { level: "warn", console: true });
            throw (e || new Error("[fileTypeHandler] Missing FILE_CLASS_REGISTRY"));
        }

        const mode = String(formType || "").toLowerCase();
        if(mode !== "create" && mode !== "update") {
            const e = this.EB?.err?.(this.EB.TYPE.VALIDATION, "INVALID_TYPE",
                { where: "fileTypeHandler.init", field: "formType", expected: "'create' | 'update'", got: formType },
                { domain: this.EB.DOMAIN.FORMS }
            );
            this.EB?.toast?.(e, { ui: true, console: true });
            throw (e || new Error(`[fileTypeHandler] Invalid formType: ${formType}`));
        }

        //Resolve map sources (via factories set in bootstrap)
        this.createNewObject_fieldMap = window.customJS.createcreateNewObject_fieldMapInstance?.();
        this.updateObject_fieldMap = window.customJS.createupdateObject_fieldMapInstance?.();
        this.groupTypeFilter_fieldMap = window.customJS.creategroupTypeFilter_fieldMapInstance?.();

        switch(formType){
            case "create":
                this.formMapSource = this.createNewObject_fieldMap;
                break;

            case "update":
                this.formMapSource = this.updateObject_fieldMap;
                break;
        }

        //Build quick FILE_CLASS enum (KEY -> KEY)
        const FC_VALUE = FCR.getAll();
        const FILE_CLASS = Object.freeze(Object.fromEntries(Object.keys(FC_VALUE).map(k => [k,k])));

        //Helper to compose a handler safely
        const makeHandler = (key, {folder, template, naming, extra = {} }) => {
            const modalFormMap = this.formMapSource?.getFieldMap?.(key); // { mdlFormName, mdlForm_fieldMap } expected
            const groupTypeFilter = this.groupTypeFilter_fieldMap?.getFieldMap?.(key) || null;
            if(!modalFormMap?.mdlForm_fieldMap) {
                const e = this.EB?.err?.(this.EB.TYPE.LOOKUP, "NOT_FOUND",
                    { where: "fileTypeHandler.makeHandler", what: `mdlForm_fieldMap for '${key}'`},
                    { domain: this.EB.DOMAIN.FORMS }
                );
                this.EB?.toast?.(e, { level: "warn", console: true });
            }

            if(!template) {
                const e = this.EB?.err?.(this.EB.TYPE.IO, "TEMPLATE_NOT_FOUND",
                    { where: "fileTypeHandler.makeHandler", templateFile: String(template || "(unset)") },
                    { domain: this.EB.DOMAIN.OBSIDIAN }
                );
                this.EB?.toast?.(e, { level: "warn", console: true });
                //Do not throw; allow reading maps without IO targets in dev
            }

            return Object.freeze({ fileClass: key, folder, template, naming, formType: mode, modalFormMap, groupTypeFilter, ...extra });
        };

        // ---- Registry definition (enable types as you go) ----------------------
        // TRADE_OFF — maps defined in create/update maps with expected shape
        // create map shape example: mdlFormName + mdlForm_fieldMap present
        // update map shape example with keys matching form → fm keys
        const tradeOffHandler = makeHandler(FILE_CLASS.TRADE_OFF, {
            folder:   "ME/🏛️ Foundations/⚖️Trade-Offs",
            template: "Meta/Templates/me/Foundations/TradeOff Template.md",
            naming: function (baseName) {
                // `this` is ModalFormUtils (has formatUtils) when invoked
                return this.formatUtils.formatTitleCase(baseName || "Untitled Trade-Off");
            },
            extra: {
                // set to true if you later want filename counters for this type
                countTracking: false
            }
            });

            // Add more handlers here as you migrate file types…
            // const practiceSession = makeHandler(FILE_CLASS.PRACTICE_SESSION, {...})

            // ---- Finalize registry (immutable) -------------------------------------
            this.registry = Object.freeze({
            [FILE_CLASS.TRADE_OFF]: tradeOffHandler
            });

            return this; // fluent
        }

/*ADD 'COUNTTRACKING: TRUE TO THE OBJECTS THAT NEED TO LOOP THROUGH THE FOLDER AND GET A COUNT VALUE WHICH IS INCLUDED IN THE OBJECT'S TITLE, PRACTICE SESSION, LIVE REHEARSAL, COACHING. EXAMPLE IN PRACTICE SESSION*****************************************************************************************************************************************************************************************
        this.registry = {
            TEST: "TRADE_OFF",
             //#region ME OBJECTS
            /*INNER_CHECKIN: "inner_checkin",
            CAPTURED_MOMENT: "capturedMoment",
            OBSERVATION: "observation",
            INTEGRATION_JOURNAL: "emotional_growth_journal",
            REFLECTION_JOURNAL: "emotional_growth_journal ",*/

                //#region FOUNDATION OBJECTS
                /*TRIGGER: "trigger",
                INTERNAL_VOICE: "internal_voice",
                SOOTHING_RESOURCE: "soothing_resource",
                EMOTIONAL_WOUND: "emotional_wound",
                BEHAVIOR_FUNCTION: "behavior_function",
                EMOTIONAL_NEED: "emotional_need",
                PROTECTIVE_STRATEGY: "protective_strategy",
                ATTACHMENT_NEED: "attachment_need",
                ATTACHMENT_STYLE: "attachment_style",
                ATTACHMENT_THEORY: "attachment_theory",
                //#endregion
                TRADE_OFF: {
                    fileClass: "TRADE_OFF",
                    folder: "ME/🏛️ Foundations/⚖️Trade-Offs",
                    template: "Meta/Templates/me/Foundations/TradeOff Template.md",
                    naming: function(baseName) {
                        return this.formatUtils.formatTitleCase(baseName || "Untitled Trade-Off");
                    },
                    formType: formType,
                    modalFormMap: this.formMapSource.getFieldMap("TRADE_OFF"),
                    groupTypeFilter: this.groupTypeFilter_fieldMap.getFieldMap("TRADE_OFF")
                }

                //EMOTION: "emotion",


                //#region PRACTICE LAB OBJECTS
                /*PRACTICE_SESSION: "practice_session",
                LIVE_REHEARSAL: "live_rehearsal",
                COACHING_SESSION: "coaching",
                SCENARIO: "scenario",*/
                //#endregion

            //#endregion

            //#region PERSONAL
            //PERSON: "person",
            //#endregion

            //#region WORK OBJECTS
            /*SWITCHGEAR: "switchgear",
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



    };
    */

    getAll() { return this.registry; }
    getHandler(FILE_CLASS) { return this.registry[FILE_CLASS] || null; }
    has(FILE_CLASS){ return !!this.registry[FILE_CLASS]; }

    //Reserved for future: e.g., surface from name directly from maps
    getFormName(FILE_CLASS){
        const h = this.getHandler(FILE_CLASS);
        return h?.modalFormMap?.mdlFormName || null;
    }

 }
        /*[FILE_CLASS.PRACTICE_SESSION]: {
            folder: "ME/🧪 Practice Lab/🎬 Practice Logs",
            template: "Meta/Templates/me/Practice Lab/Practice Session Template.md",
            naming: (baseName, count) => `${baseName}_Session-${count}`,
            mdlFormName_Update1: "Update Practice Log",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "scenario": {key:"scenario", isLink: true, singleSelect: true},
                "rehearsal_mode": {key: "rehearsal_mode", singleSelect: true},
                "live_rehearsals": {key: "live_rehearsals", isLink: true},
                "coaching_sessions": {key: "coaching_sessions", isLink: true},
                "people": {key:"people", isLink: true},
                "meta_skills": {key: "meta_skills", isLink: true},
                "core_skills": {key: "core_skills", isLink: true},
                "reviewed": "entered",
                "status": {key: "status", singleSelect: true}
            },
            fileClass: FILE_CLASS.PRACTICE_SESSION
        },
        [FILE_CLASS.LIVE_REHEARSAL]: {
            folder: "ME/🧪 Practice Lab/🎙️ Live Rehearsals",
            template: "Meta/Templates/me/Practice Lab/Live Rehearsal Template.md",
            naming: (baseName, count) => `${baseName}_Live Rehearsal_Take-${count}`,
            mdlFormName_Update1: "Update Live Rehearsal",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "rehearsal_mode": {key: "rehearsal_mode", singleSelect: true},
                "people": {key:"people", isLink: true},
                "reviewed": "entered",
                "status": {key: "status", singleSelect: true}
            },
            fileClass: FILE_CLASS.LIVE_REHEARSAL
        },
        [FILE_CLASS.COACHING_SESSION]: {
            folder: "ME/🧪 Practice Lab/🧠 Coaching",
            template: "Meta/Templates/me/Practice Lab/Coaching Session Template.md",
            naming: (baseName, count) => `${baseName}_Coaching Session-${count}`,
            mdlFormName_Update1: "Update Coaching Session",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "rehearsal_mode": {key: "rehearsal_mode", singleSelect: true},
                "coaching_sessions": {key: "coaching_sessions", isLink: true},
                "people": {key:"people", isLink: true},
                "meta_skills": {key: "meta_skills", isLink: true},
                "core_skills": {key: "core_skills", isLink: true},
                "reviewed": "entered",
                "status": {key: "status", singleSelect: true}
            },
            fileClass: FILE_CLASS.COACHING_SESSION
        },
        [FILE_CLASS.INNER_CHECKIN]: {
            folder: "ME/🌒 Reflections/🕹️ Inner Check-Ins",
            template: "Meta/Templates/me/Inner_CheckIn_Template.md",
            naming: (context, count) => context,
            mdlFormName_Update1: "Update Inner Check-In",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "date_time": {key: "event_date_time", type: "date_time"},
                "title": "title",
                "context": "context",
                "driver": "driver",
                "motive": "motive",
                "response_alignment": "response_alignment",
                "people": "people",
                "emotions": "emotions",
                "reviewed": "entered"
            },
            fileClass: FILE_CLASS.INNER_CHECKIN
        },
        [FILE_CLASS.SCENARIO]: {
            folder: "ME/🧪 Practice Lab/🎲 Scenarios",
            template:"Meta/Templates/me/Practice Lab/Scenario Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            },
            mdlFormName_Update1: "Update Scenario",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "type": {key: "type", singleSelect: true},
                "people": "people",
                "summary": "summary"
            },
            fileClass: FILE_CLASS.SCENARIO
        },
        [FILE_CLASS.CAPTURED_MOMENT]: {
            folder: "ME/📝 Captured Moments",
            template: "Meta/Templates/me/Captured Moment Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            },
            mdlFormName_Update1: "Update Captured Moment",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "importance": {key: "importance", singleSelect: true},
                "emotions": {key:"emotions", type: "link"},
                "people": "people",
                "summary": "summary",
                "status": {key: "status", singleSelect: true},
                "reviewed": "entered"
            },
            fileClass: FILE_CLASS.CAPTURED_MOMENT
        },
        [FILE_CLASS.OBSERVATION]: {
            folder: "ME/👀 Observations",
            template: "Meta/Templates/me/Observation Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            },
            mdlFormName_Update1: "Update Observation",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "importance": {key: "importance", singleSelect: true},
                "emotions": {key:"emotions", type: "link"},
                "people": "people",
                "summary": "summary",
                "status": {key: "status", singleSelect: true},
                "reviewed": "entered"
            },
            fileClass: FILE_CLASS.OBSERVATION
        },
        [FILE_CLASS.INTEGRATION_JOURNAL]: {
            folder: "ME/📓 Journal",
            template: "Meta/Templates/me/Emotional Growth Journal/Integration Journal Template.md",
            naming: function () {
                const now = new Date();
                const datePart = this.formatUtils.db_formatDateOnly(now); // e.g., 2025-06-19
                const timePart = this.formatUtils.formatTimeOnly(now).replace(":", ""); // e.g., 1430
                return `🔁 Integration Journal Entry ${datePart} @ ${timePart}`;
            },
            mdlFormName_Update1: "Update Integration Journal Entry",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "emotions": {key:"emotions", type: "link"},
                "people": "people",
                "summary": "summary",
                "status": {key: "status", singleSelect: true},
                "reviewed": "entered"
            },
            fileClass: FILE_CLASS.INTEGRATION_JOURNAL
        },
        [FILE_CLASS.REFLECTION_JOURNAL]: {
            folder: "ME/📓 Journal",
            template: "Meta/Templates/me/Emotional Growth Journal/Reflection Journal Template.md",
            naming: function () {
                const now = new Date();
                const datePart = this.formatUtils.db_formatDateOnly(now); // e.g., 2025-06-19
                const timePart = this.formatUtils.formatTimeOnly(now).replace(":", ""); // e.g., 1430
                return `🪞 Reflection Journal Entry ${datePart} @ ${timePart}`;
            },
            mdlFormName_Update1: "Update Reflection Journal Entry",
            mdlFormName_Update1_fieldMap: {
                "filename": {key: "filename", from: "file"},
                "title": "title",
                "emotions": {key:"emotions", type: "link"},
                "people": "people",
                "summary": "summary",
                "status": {key: "status", singleSelect: true},
                "reviewed": "entered"
            },
            fileClass: FILE_CLASS.REFLECTION_JOURNAL
        },
        [FILE_CLASS.TRIGGER]: {
            folder: "ME/🏛️ Foundations/⚡ Triggers",
            template: "Meta/Templates/me/Foundations/Trigger Template.md",
            naming: function (baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.TRIGGER
        },
        [FILE_CLASS.INTERNAL_VOICE]: {
            folder: "ME/🏛️ Foundations/📢 Internal Voices",
            template: "Meta/Templates/me/Foundations/Internal Voice Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Internal Voice");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.INTERNAL_VOICE
        },
        [FILE_CLASS.SOOTHING_RESOURCE]: {
            folder: "ME/🏛️ Foundations/🩹 Soothing Resources",
            template: "Meta/Templates/me/Foundations/Soothing Resource Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Soothing Resource");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.SOOTHING_RESOURCE
        },
        [FILE_CLASS.EMOTIONAL_WOUND]: {
            folder: "ME/🏛️ Foundations/🌀 Emotional Wounds",
            template: "Meta/Templates/me/Foundations/Emotional Wound Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Wound");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.EMOTIONAL_WOUND
        },
        [FILE_CLASS.BEHAVIOR_FUNCTION]: {
            folder: "ME/🏛️ Foundations/🐾 Behavior Functions",
            template: "Meta/Templates/me/Foundations/Behavior Function Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Behavior Function");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.BEHAVIOR_FUNCTION
        },
        [FILE_CLASS.EMOTIONAL_NEED]: {
            folder: "ME/🏛️ Foundations/🛡️ Emotional Needs",
            template: "Meta/Templates/me/Foundations/Emotional Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Need");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.EMOTIONAL_NEED
        },
        [FILE_CLASS.PROTECTIVE_STRATEGY]: {
            folder: "ME/🏛️ Foundations/🪖 Protective Strategies",
            template: "Meta/Templates/me/Foundations/Protective Strategy Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Protective Strategy");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.PROTECTIVE_STRATEGY
        },
        [FILE_CLASS.ATTACHMENT_NEED]: {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Need");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.ATTACHMENT_NEED
        },
        [FILE_CLASS.ATTACHMENT_STYLE]: {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Style Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Style");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.ATTACHMENT_STYLE
        },
        [FILE_CLASS.ATTACHMENT_THEORY]: {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Theory Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Theory");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.ATTACHMENT_THEORY
        },
        [FILE_CLASS.EMOTION]: {
            folder: "ME/🏛️ Foundations/🎭 Emotions",
            template: "Meta/Templates/me/Foundations/Emotion Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotion");
            },
            mdlFormName_Update1: "",
            fileClass: FILE_CLASS.EMOTION
        },
        [FILE_CLASS.TRADE_OFF]: {
            fileClass: FILE_CLASS.TRADE_OFF
            /*folder: "ME/🏛️ Foundations/⚖️Trade-Offs",
            template: "Meta/Templates/me/Foundations/TradeOff Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Trade-Off");
            },
            createNewObject: createNewObject_fieldMap.FILE_CLASS.TRADE_OFF,
            updateObject: updateObject_fieldMap.FILE_CLASS.TRADE_OFF,
            groupTypeFilterHandler: groupTypeFilterRegistry.FILE_CLASS.TRADE_OFF,
            mdlFormName_CreateNewObject: "Create New Trade-Off",
            mdlFormName_CreateNewObject_fieldMap: {
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
            },
            mdlFormName_Update1: "Update Trade-Off",
            mdlFormName_Update1_fieldMap: {
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
                "resolved_by": {key: "resolved_by", groupFilter: "resolved_by_type", multiSelect: true},
            }

        }
    };
 }*/




