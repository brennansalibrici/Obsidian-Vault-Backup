class ModalFormUtils {

//PURPOSE: TO HANDLE ALL FUNCTIONALITY THAT GETS DATA FROM ANY MODAL FORM AND COMPLETES WHATEVER PROCESSES NECESSARY TO HAVE THAT DATA REFLECTED APPROPRIATELY IN OBSIDIAN

//#region CONSTRUCTOR, ENUMS, PROPERTY & CLASS DEFINITIONS
    /*simulated enum used as an init() function parameter to identify the type of file coming in which will determine specific attributes about it, namely how to create
    the newly created file's name. The intention is that as you use this class for more and more similar types of modal form file creation, you continue adding to this enum
    and continuing adding 'cases' to the switch statement. You will also have to update the normalizeFileType() function to convert the function's incoming string to an
    actual enum value*/

/*    static filetype = {
        PRACTICE_SESSION: "practice session",
        LIVE_REHEARSAL: "live rehearsal",
        COACHING_SESSION: "coaching session",
        INNER_CHECKIN: "inner check-in",
        SCENARIO: "scenario",
        CAPTURED_MOMENT: "captured moment",
        OBSERVATION: "observation",
        INTEGRATION_JOURNAL: "integration journal",
        REFLECTION_JOURNAL: "reflection journal",
        TRIGGER: "trigger",
        INTERNAL_VOICE: "internal voice",
        SOOTHING_RESOURCE: "soothing resource",
        EMOTIONAL_WOUND: "emotional wound",
        BEHAVIOR_FUNCTION: "behavior function",
        EMOTIONAL_NEED: "emotional need",
        PROTECTIVE_STRATEGY: "protective strategy",
        ATTACHMENT_NEED: "attachment need",
        ATTACHMENT_STYLE: "attachment style",
        ATTACHMENT_THEORY: "attachment theory",
        TRADE_OFF: "tradeoff",
        EMOTION: "emotion"
    };*/

    static linkFields = [
  "linked_wounds",
  "associated_emotions",
  "healing_resources",
  "healing_pathways",
  "protective_strategies",
  "triggered_by",
  "needs_behind_it",
  "related",
  "media",
  "attachments",
  "linked_resources",
  "linked_log",
  "source_daily_note",
  "emotions",
  "threatened_by",
  "earned_security_supports",
  "attachment_style_link",
  "strategies",
  "conflicted_part",
  "internal_voices",
  "soothing_resources",
  "opposite",
  "associated_thoughts",
  "functions",
  "tradeoffs"
];


    //Constructor and define class properties
    constructor(){
        this.app = null;
        this.tp = null;
        //this.fileType = "";
        this.folderPath = "";
        this.folder = "";
        this.templateFile = "";
        this.createdFile = "";
        this.strField1 = "";
        this.lnkField1 = "";
        this.strField2 = "";
        this.lnkField2 = "";
        this.fileMatch = 0;
        this.newCreatedFileName = "";
        this.newCreatedFileLink = "";
        this.newCreatedFile = "";
        this.newFileFullPath = "";
        this.newLiveFile = "";
        this.lnkDailyNote = "";
        this.formatUtils = window.customJS.createFormatUtilsInstance();
        this.fileClass = "";
        this.handler = {};
        this.frontmatter = "";
        this.modalFormName = "";
        this.modalFormFieldMap = "";
        this.modalFormFieldMap_Values = {};
        this.fieldTypeFormatHooks = {                       //Eventually this should migrate to the formatting class
            "date":     this.formatUtils.db_formatDateOnly,
            "time":     this.formatUtils.formatTimeOnly,
            "date_time":this.formatUtils.db_formatDateTime,
            "link":     this.string2Link
        };
        this.fileClassRegistry = window.customJS.createFILE_CLASS_REGISTRYInstance();
        this.fileTypeHandler = window.customJS.createfileTypeHandlerInstance();
        this.callingFormType = "";
        this.formData = {};

    }


    static FORM_TYPE = {
        CREATE: "create",
        UPDATE: "update"
    }
//#endregion

//#region CLASS UTILITY FUNCTIONS
    //defines a config object that handles the naming, folder and template resolution functions for creating new files
    /*
   static fileTypeHandlers = {
        "practice session": {
            folder: "ME/🧪 Practice Lab/🎬 Practice Logs",
            template: "Meta/Templates/me/Practice Lab/Practice Session Template.md",
            countTracking: true,
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
            fileClass: "practice_log"
        },
        "live rehearsal": {
            folder: "ME/🧪 Practice Lab/🎙️ Live Rehearsals",
            template: "Meta/Templates/me/Practice Lab/Live Rehearsal Template.md",
            countTracking: true,
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
            fileClass: "live_rehearsal"
        },
        "coaching session": {
            folder: "ME/🧪 Practice Lab/🧠 Coaching",
            template: "Meta/Templates/me/Practice Lab/Coaching Session Template.md",
            countTracking: true,
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
            fileClass: "coaching"
        },
        "inner check-in": {
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
            fileClass: "inner_checkin"
        },
        "scenario": {
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
            fileClass: "scenario"
        },
        "captured moment": {
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
            fileClass: "capturedMoment"
        },
        "observation": {
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
            fileClass: "observation"
        },
        "integration journal": {
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
            fileClass: "emotional_growth_journal"
        },
        "reflection journal": {
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
            fileClass: "emotional_growth_journal"
        },
        "trigger": {
            folder: "ME/🏛️ Foundations/⚡ Triggers",
            template: "Meta/Templates/me/Foundations/Trigger Template.md",
            naming: function (baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            },
            mdlFormName_Update1: "",
            fileClass: "trigger"
        },
        "internal voice": {
            folder: "ME/🏛️ Foundations/📢 Internal Voices",
            template: "Meta/Templates/me/Foundations/Internal Voice Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Internal Voice");
            },
            mdlFormName_Update1: "",
            fileClass: "internal_voice"
        },
        "soothing resource": {
            folder: "ME/🏛️ Foundations/🩹 Soothing Resources",
            template: "Meta/Templates/me/Foundations/Soothing Resource Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Soothing Resource");
            },
            mdlFormName_Update1: "",
            fileClass: "soothing_resource"
        },
        "emotional wound": {
            folder: "ME/🏛️ Foundations/🌀 Emotional Wounds",
            template: "Meta/Templates/me/Foundations/Emotional Wound Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Wound");
            },
            mdlFormName_Update1: "",
            fileClass: "emotional_wound"
        },
        "behavior function": {
            folder: "ME/🏛️ Foundations/🐾 Behavior Functions",
            template: "Meta/Templates/me/Foundations/Behavior Function Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Behavior Function");
            },
            mdlFormName_Update1: "",
            fileClass: "behavior_function"
        },
        "emotional need": {
            folder: "ME/🏛️ Foundations/🛡️ Emotional Needs",
            template: "Meta/Templates/me/Foundations/Emotional Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Need");
            },
            mdlFormName_Update1: "",
            fileClass: "emotional_need"
        },
        "protective strategy": {
            folder: "ME/🏛️ Foundations/🪖 Protective Strategies",
            template: "Meta/Templates/me/Foundations/Protective Strategy Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Protective Strategy");
            },
            mdlFormName_Update1: "",
            fileClass: "protective_strategy"
        },
        "attachment need": {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Need");
            },
            mdlFormName_Update1: "",
            fileClass: "attachment_need"
        },
        "attachment style": {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Style Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Style");
            },
            mdlFormName_Update1: "",
            fileClass: "attachment_style"
        },
        "attachment theory": {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Theory Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Theory");
            },
            mdlFormName_Update1: "",
            fileClass: "attachment_theory"
        },
        "tradeoff": {
            folder: "ME/🏛️ Foundations/⚖️Trade-Offs",
            template: "Meta/Templates/me/Foundations/TradeOff Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Trade-Off");
            },
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
            },
            fileClass: "tradeoff"
        },
        "emotion": {
            folder: "ME/🏛️ Foundations/🎭 Emotions",
            template: "Meta/Templates/me/Foundations/Emotion Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotion");
            },
            mdlFormName_Update1: "",
            fileClass: "emotion"
        }

    };

    static groupFilterRegistry = {
        //Trade-Offs
        tradeoff_type: {
            groupField: "tradeoff_group",
                subFieldsByGroup: {
                    "Connection vs. Autonomy": "type_connection",
                    "Safety vs. Authenticity": "type_safety",
                    "Control vs. Vulnerability": "type_control",
                    "Short-Term Relief vs. Long-Term Growth": "type_shortterm",
                    "Self-Image vs. Emotional Honesty": "type_self",
                    "Avoidance vs. Engagement": "type_avoidance",
                    "Familiarity vs. Change": "type_familiarity",
                    "Power vs. Intimacy": "type_power",
                    "Belonging vs. Integrity": "type_belonging"
                },
                reverseLookupMap: {
                    "Closeness vs. Independence": {key: "type_connection", singleSelect: true},
                    "Distance vs. Closeness": "type_connection",
                    "Trust vs. Control": "type_connection",
                    "Honesty vs. Acceptance": "type_safety",
                    "Compliance vs. Authenticity": "type_safety",
                    "Conflict Avoidance vs. Emotional Honesty": "type_safety",
                    "Keeping Peace vs. Naming Needs": "type_safety",
                    "Guardedness vs. Openness": "type_safety",
                    "Stability vs. Authenticity": "type_safety",
                    "Fitting In vs. Being Real": "type_safety",
                    "Being Known vs. Being in Control": "type_control",
                    "Self-Protection vs. Vulnerability": "type_control",
                    "Avoiding Discomfort vs. Resolving the Real Issue": "type_control",
                    "Not Rocking the Boat vs. Being Fully Alive": "type_control",
                    "Comfort vs. Growth": "type_shortterm",
                    "Short-Term Safety vs. Long-Term Connection": "type_shortterm",
                    "Staying Numb vs. Staying Present": "type_shortterm",
                    "Security vs. Growth": "type_shortterm",
                    "Old Safety vs. New Possibility": "type_shortterm",
                    "Truth vs. Protection": "type_self",
                    "Validation vs. Truth-Telling": "type_self",
                    "Approval vs. Truth": "type_self",
                    "Avoiding Pain vs. Doing What’s Needed": "type_avoidance",
                    "Avoiding Discomfort vs. Resolving the Real Issue": "type_avoidance",
                    "Not Rocking the Boat vs. Being Fully Alive": "type_avoidance",
                    "Predictability vs. Healing": "type_familiarity",
                    "Reinforcing Old Roles vs. Becoming Whole": "type_familiarity",
                    "Power vs. Intimacy": "type_power",
                    "Pleasing Others vs. Staying True to Self": "type_belonging",
                    "Survival vs. Self-Actualization": "type_belonging"
                }
        },
        pole_type: {
            groupField: "pole_group",
                subFieldsByGroup: {
                    "Safety & Protection": "ptype_safety",
                    "Connection & Belonging": "ptype_connection",
                    "Truth & Authenticity": "ptype_truth",
                    "Regulation & Avoidance": "ptype_regulation",
                    "Identity & Role Maintenance": "ptype_identity",
                    "Growth & Change": "ptype_growth"
                },
                reverseLookupMap: {
                    "Safety": "ptype_safety",
                    "Security": "ptype_safety",
                    "Protection": "ptype_safety",
                    "Self-Protection": "ptype_safety",
                    "Short-Term Safety": "ptype_safety",
                    "Old Safety": "ptype_safety",
                    "Guardedness": "ptype_safety",
                    "Familiarity": "ptype_safety",
                    "Predictability": "ptype_safety",
                    "Stability": "ptype_safety",
                    "Survival": "ptype_safety",
                    "Comfort": "ptype_safety",
                    "Closeness": "ptype_connection",
                    "Intimacy": "ptype_connection",
                    "Emotional Intimacy": "ptype_connection",
                    "Being Seen": "ptype_connection",
                    "Being Real": "ptype_connection",
                    "Being in Control (as a means to secure closeness)": "ptype_connection",
                    "Fitting In": "ptype_connection",
                    "Validation": "ptype_connection",
                    "Acceptance": "ptype_connection",
                    "Approval": "ptype_connection",
                    "Power (when used to keep connection on one’s terms)": "ptype_connection",
                    "Honesty": "ptype_truth",
                    "Truth": "ptype_truth",
                    "Authenticity": "ptype_truth",
                    "Naming Needs": "ptype_truth",
                    "Emotional Honesty": "ptype_truth",
                    "Staying True to Self": "ptype_truth",
                    "Being Real": "ptype_truth",
                    "Openness": "ptype_truth",
                    "Vulnerability": "ptype_truth",
                    "Staying Numb": "ptype_regulation",
                    "Staying Present": "ptype_regulation",
                    "Short-Term Relief": "ptype_regulation",
                    "Not Rocking the Boat": "ptype_regulation",
                    "Keeping Peace": "ptype_regulation",
                    "Conflict Avoidance": "ptype_regulation",
                    "Distance": "ptype_regulation",
                    "Reassurance": "ptype_regulation",
                    "Distraction": "ptype_regulation",
                    "Avoidance (generalized)": "ptype_regulation",
                    "Reinforcing Old Roles": "ptype_identity",
                    "Compliance": "ptype_identity",
                    "Control": "ptype_identity",
                    "Being in Control": "ptype_identity",
                    "Power": "ptype_identity",
                    "Self-Image": "ptype_identity",
                    "Validation": "ptype_identity",
                    "Familiarity (again, in identity terms)": "ptype_identity",
                    "Growth": "ptype_growth",
                    "Healing": "ptype_growth",
                    "Long-Term Connection": "ptype_growth",
                    "Resolution": "ptype_growth",
                    "Change": "ptype_growth",
                    "Becoming Whole": "ptype_growth",
                    "Self-Actualization": "ptype_growth"
                }
        },
        resolved_by_type: {
            groupField: "resolved_by_group",
                subFieldsByGroup: {
                    "Internal Integration": "rinternal_group",
                    "Relational Mirroring & Externalization": "rrelational_group",
                    "Cognitive & Emotional Reframing": "rcognitive_group",
                    "Practice & Embodiment": "rpractice_group"
            },
                reverseLookupMap:{
                    "Naming both needs clearly": "rinternal_group",
                    "Allowing both feelings to coexist": "rinternal_group",
                    "Shifting from binary thinking to “both/and”": "rinternal_group",
                    "Giving each part a turn to lead": "rinternal_group",
                    "Welcoming contradiction as part of wholeness": "rinternal_group",
                    "Practicing internal listening without rushing a fix": "rinternal_group",
                    "Emotion tolerance": "rinternal_group",
                    "Meaning-based action": "rinternal_group",
                    "Internal boundary repair": "rinternal_group",
                    "Mirroring the fears behind each side": "rrelational_group",
                    "Getting external support for the overwhelmed part": "rrelational_group",
                    "Letting the protective voice feel seen": "rrelational_group",
                    "Inviting a deeper core need to speak": "rrelational_group",
                    "Reframing vulnerability as strength": "rcognitive_group",
                    "Recognizing the role of trauma or conditioning": "rcognitive_group",
                    "Naming protective strategies for what they are": "rcognitive_group",
                    "Slowing down decisions until alignment emerges": "rpractice_group",
                    "Creating a container for experimentation": "rpractice_group",
                    "Journal dialoguing between parts": "rpractice_group",
                    "Embodied grounding to regulate intensity": "rpractice_group"
            }
        }
    };
*/
    //checks to see if the filename created already exists in the folder and if so, appends '-1', '-2', etc.
    ensureUniqueFilename(baseName) {
        const existingNames = new Set(this.folder?.children?.map(file => file.name.replace(/\.md$/, "")) || []);
        if (!existingNames.has(baseName)) return baseName;

        let counter = 1;
        let uniqueName = `${baseName}-${counter}`;
        while (existingNames.has(uniqueName)) {
            counter++;
            uniqueName = `${baseName}-${counter}`;
        }
        return uniqueName;
    }

    //encapsulates the conversion between the static fileTypeHandler and other complexities between a dedicated method and instanced functions
    getFinalFileName(baseName, count = null) {
        //const handler = ModalFormUtils.fileTypeHandlers[this.fileType];
        if (!this.handler || typeof this.handler.naming !== "function") {
            throw new Error(`❌ No valid naming function found for fileType: ${this.fileType}`);
        }

        // Call the naming function with the correct context (`this`) so formatUtils is available
        return count !== null
            ? this.handler.naming.call(this, baseName, count)
            : this.handler.naming.call(this, baseName);
    }

    //accepts a string and returns an Obsidian link of the same string
    string2Link(stringInput){
        if(typeof stringInput !== "string") return stringInput;

        //If it's already a wililink, return it as-is
        if(stringInput.trim().startsWith("[[")) {
            return stringInput;
        }
        //Otherwise, wrap it in [[...]]
        return `[[${stringInput.trim()}]]`;
    }

    //converts incoming string value to the enum value
    normalizeFileType(input){
        for (const key in ModalFormUtils.filetype){
            if(ModalFormUtils.filetype[key] === input){
                return key;
            }
        }
        return null;
    }





//#endregion

//#region FILE GENERATION AND MANIPULATION FUNCTIONS
    //script classes used with the CustomJS plugin do not accept constructor arguments. The init() is intended as a sort of pseudo constructor
    async init(config = {}) {
        const {
            app,
            tp,
            fileType,
            formType,
            file = null,
            context1 = "",
            context2 = "",
            useContextAsLink = true
        } = config;

        //Shared Setup Steps - ALWAYS NEEDED Regardless of which form type is chosen!
        this.app = app;
        this.tp = tp;

        //Form Type Specific Logic & Branching
        switch (formType.toLowerCase()){
            case "create":
                this.callingFormType = ModalFormUtils.FORM_TYPE.CREATE;
                break;

            case "update":
                this.callingFormType = ModalFormUtils.FORM_TYPE.UPDATE;
                //resolveAllFrontMatter(FORM_TYPE.UPDATE); goes here?
                //updateFrontMatterFromForm();
                break;

            default:
                throw new Error(`❌ Unsupported formType: ${formType}`);
        }

        this.fileClass = this.fileClassRegistry.getKeyFromValue(fileType);
        this.fileTypeHandler.init(this.fileClassRegistry, this.callingFormType);
        this.handler = this.fileTypeHandler.getHandler(this.fileClass);

        if (!this.handler) {
            throw new Error(`❌ No fileTypeHandler found for: "${this.fileClass}"`);
        }

        this.strField1 = context1;
        this.lnkField1 = useContextAsLink ? this.string2Link(context1) : context1;
        this.folderPath = this.handler.folder;
        this.folder = app.vault.getAbstractFileByPath(this.folderPath);
        this.templateFile = this.handler.template;

        if (!this.templateFile) {
            throw new Error(`❌ Template file path was not set for fileType: "${this.fileClass}"`);
        }

        this.modalFormName = this.handler.modalFormMap?.mdlFormName;
        if (!this.modalFormName) {
            new Notice("❌ No modal form defined for this object type.");
            return;
        }

        // Count matches in folder for naming logic
        if (this.folder && this.folder.children) {
            for (const file of this.folder.children) {
                if (file.name.includes(this.strField1)) {
                    this.fileMatch++;
                }
            }
        }

    }

    createNewFileName(strName = "") {
        if (strName) this.strField2 = strName;

        if (!this.handler?.naming) {
            throw new Error(`❌ No naming logic available for fileType: ${this.fileClass}`);
        }

        //prefer a filename that is passed into the function if available
        const baseName = this.strField2 || this.strField1 || "Untitled";
 /***The loop that assigns the fileMatch value returns the number of files that match. For the new filename we need to increase that value by one. Creates both a stringname and a link for the newly created file***/
        // 🔁 Special case for count-tracking file types
        if (this.handler?.countTracking) {
            const prefix = baseName;
            const pattern = new RegExp(`^${prefix}.*?(\\d+)$`);
            let maxCount = 0;

            const existingNames = this.folder?.children?.map(file => file.name.replace(/\.md$/, "")) || [];
            for (const name of existingNames) {
            const match = name.match(pattern);
            if (match) {
                const count = parseInt(match[1], 10);
                if (!isNaN(count) && count > maxCount) maxCount = count;
            }
            }

            const nextCount = maxCount + 1;
            const finalName = this.getFinalFileName(baseName, nextCount);

            this.newCreatedFileName = finalName;
            this.newCreatedFileLink = this.string2Link(finalName);
            this.newFileFullPath = `${this.folderPath}/${finalName}.md`;

            return this.newCreatedFileName;
        }

        // ⚙️ Default fallback for non-counted types
        // Use safety check to avoid overwriting existing files
        const initialName = this.getFinalFileName(baseName);
        const safeName = this.ensureUniqueFilename(initialName);

        if (safeName !== initialName) {
            new Notice(`📛 Filename "${initialName}" already exists. Renamed to "${safeName}" to avoid naming conflicts.`);
        }

        this.newCreatedFileName = safeName;
        this.newCreatedFileLink = this.string2Link(safeName);
        this.newFileFullPath = `${this.folderPath}/${safeName}.md`;

        return this.newCreatedFileName;

    }


    //combines createNewFileFromTemplate() and _writeFrontMatterCreate() into a single method
    async createFileWithFrontmatter(formData) {
        try {
            this.formData = formData;
            const titleValue = this.handler.modalFormMap?.mdlForm_fieldMap.title;
            this.createNewFileName(this.formData[titleValue]);

            const file = await this.createNewFileFromTemplate();

            console.log("New file object received", file);
            if (file) {
                await this._writeFrontMatterCreate(file);
            }

            return file;

        } catch (err) {
            console.error("❌ Failed in createFileWithFrontmatter:", err);
            new Notice("Error during file creation. See console.");
            return null;
        }
    }

    //When called, this function creates a new and seperate file (from an existing template) which is called from a modal form's logic but it completely seperate from the template and/or the fileclass calling the function.
    async createNewFileFromTemplate() {
        try {
            const templateFile = this.app.vault.getAbstractFileByPath(this.templateFile);
            if (!templateFile) {
            throw new Error(`❌ Template file not found at path: ${this.templateFile}`);
            }

            const templateContent = await this.app.vault.read(templateFile);

            //console.log("🧾 Template Content Preview:", templateContent);

            const filePath = `${this.folderPath}/${this.newCreatedFileName}.md`;
            this.newCreatedFile = await this.app.vault.create(filePath, templateContent);
            this.newCreatedFileLink = `[[${this.newCreatedFileName}]]`;

            console.log(`✅ File created at: ${filePath}`);
            return this.newCreatedFile;
        } catch (err) {
            console.error("❌ Error creating file from template:", err);
            new Notice("❌ Failed to create file from template. Check console for details.");
        }
    }

/**********OLD******************************************************************************************************************************************************************************************************* */


/****WOULD THIS BE BETTER PLACED IN FORMATUTILS?  */
    //generate a hook that can be linked to a DailyNote
    generateDailyNoteLink() {
        const today = this.formatUtils.db_formatDateOnly(new Date());
        return `[[${today}]]`;

    }

    //from within an open form, opens a new form and creates the new forms object and pushes the newly created object into the current form
    async openAndLinkNewItem({formName, linkField, targetArray}) {
        const modalForm = app.plugins.plugins.modalforms.api;
        const result = await modalForm.openForm(formName);
        const newItem = `[[${result?.data?.title || "Unnamed"}]]`;
        this.debug && console.log("Created new item:", newItem);
        this.resultData[targetArray] = [...(this.resultData[targetArray] || []), newItem];
    }

    //known issue with Templater update is that it inserts the template path name on the first line after the frontmatter if you create a new file programmatically with fronmatter. This function removes it.
    async cleanTemplatePathFromBody(file) {
        const fileContent = await this.app.vault.read(file);
        const lines = fileContent.split("\n");

        // Find where frontmatter ends
        let fmEndIndex = lines.findIndex((line, i) => line.trim() === "---" && i > 0);
        if (fmEndIndex === -1 || fmEndIndex + 1 >= lines.length) return;

        const suspiciousLine = lines[fmEndIndex + 1].trim();
        if (suspiciousLine === this.templateFile.trim()) {
            lines.splice(fmEndIndex + 1, 1); // Remove that one line
            await this.app.vault.modify(file, lines.join("\n"));
            console.log(`🧼 Cleaned template path from line ${fmEndIndex + 2} of ${file.path}`);
        }
    }

/*    static lookupFileClass(fileTYpe) {
        if(!fileType || typeof fileType !== "string") {
            throw new Error(`Invalid fileType for fileClass lookup: ${fileTYpe}`);
        }

        const fileClass = fileClassRegistry[fileType];
        if(!fileClass) {
            throw new Error(`No fileClass registered for fileType: "${fileType}`);
        }

        return fileClass;
    }
*/

//#endregion

//#region FRONTMATTER FUNCTIONS

resolveAllFrontmatter(formData) {
    switch (this.callingFormType) {
        case ModalFormUtils.FORM_TYPE.CREATE:
            return this._resolveFrontmatterCreate(formData);

        case ModalFormUtils.FORM_TYPE.UPDATE:
            return this.resolveFrontMatterUpdate(formData);

        default:
            throw new Error(`❌ Unsupported frontmatter resolution mode: ${this.callingFormType}`);
    }
}

_resolveFrontmatterCreate(formData) {
    //Works whether modalFormMap is a function or an object:
    const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;

    const map = mapContainer?.mdlForm_fieldMap;
    if(!map) {
        console.warn(`No fieldMap defined for fileType: ${this.fileClass}`);
        return {};
    }

    const frontmatter = {};

    for (const [key, resolver] of Object.entries(map)) {
        if(typeof resolver === "function") {
        const val = resolver(formData, this, this.formatUtils);
        if(val !== undefined && val !== null) frontmatter[key] = val;
        //frontmatter[key] = (val !== undefined && val !== null) ? String(val) : ""; *********** REMOVE THIS LINE AFTER YOU'VE TESTED THAT THE NEW STRUCTURE WORKS *******************
        } else if (typeof resolver === "string") {
        const val = formData[resolver];
        if(val !== undefined && val !== null) frontmatter[key] = val;
        } else {
            console.warn(`Invalid resolver for field ${key}`);
        }
    }
    return frontmatter; // raw values (strings/arrays), including created/last_modified from format
}

_resolveFrontmatterUpdate(formData) {
     const map = this.handler.modalFormMap.mdlForm_fieldMap;
 if (!map) {
        console.warn(`⚠️ No fieldMap defined for fileClass: ${this.fileClass}`);
        return {};
    }

    const frontmatter = {};
    // ... rest of the loop

    return frontmatter;
}


 //updates the frontmatter with defined results from any modal form and inserts them into the frontmatter of any specified file
    async _writeFrontMatterCreate(file) {
    try {
        debugger;
        const fieldMap = this.resolveAllFrontmatter(this.formData); //Automatically resolves based on form type (updated resolver)
        const mapContainer = (typeof this.handler.modalFormMap === "function") ? this.handler.modalFormMap() : this.handler.modalFormMap;
        const mapObj = mapContainer?.mdlForm_fieldMap || {};
debugger;
        await this.app.fileManager.processFrontMatter(file, (fm) => {
            for (const [key, value] of Object.entries(fieldMap)) {
                if (value === undefined || value === null) continue;

                    //const existing = fm[key];

                    const toLink = (v, key) => {
                    if (!ModalFormUtils.linkFields.includes(key)) return v; //Eventually this list of fields needs to be trasfered to the fieldMap and the formatting portion needs to be transfered to the formatting class
                    if (typeof v !== "string") return v;
                    return v.trim().startsWith("[[") ? v.trim() : `[[${v.trim()}]]`;
                    };

                    //look up per-field flags if you've set them in your mapObj
                    const mapping = typeof mapObj[key] === "object" ? mapObj[key] : {};
                    const isArrayField = mapping?.multiSelect === true;

                    //CREATE PATH: no merging. Just write normalized value.
                    if(Array.isArray(value)) {
                        fm[key] = value.map(v => toLink(v, key));     //write YAML array
                    } else {
                        //If the field is explicitily multiSelect but a single value came in, make it a single item array
                        fm[key] = isArrayField ? [toLink(value,key)] : toLink(value, key);
                    }

                    /*
                    // If the existing field is an array, merge and dedupe
                    if (Array.isArray(existing)) {
                    const incoming = Array.isArray(value) ? value : [value];
                    const formatted = incoming.map((v) => toLink(v, key));
                    const unique = new Set([...existing, ...formatted]);
                    fm[key] = Array.from(unique);
                    }

                    // If the field exists but is a string, convert both to array and merge
                    else if (existing && typeof existing === "string") {
                    const formatted = toLink(value, key);
                    fm[key] = Array.from(new Set([toLink(existing, key), formatted]));
                    }

                    // If it doesn’t exist yet, assign directly
                    else {
                    fm[key] = Array.isArray(value)
                        ? value.map((v) => toLink(v, key))
                        : toLink(value, key);
                    }*/
                }
            });

            // Update 'last_modified' unless it's a new file where created === last_modified
            await this.updateLastModified(file);

            console.log("✅ Frontmatter updated successfully:", file.path);
        }
    catch (err) {
            console.error("❌ Failed to update frontmatter:", err);
            new Notice("❌ Error updating frontmatter. Check console for details.");
        }
    }

/*
    //retrieves the full frontmatter map from the specified file
    getFrontMatterMap(file){
        const cache = app.metadataCache.getFileCache(file);
        if (!cache || !cache.frontmatter) return {};
        return cache.frontmatter;
    }

    //retrieves a single value from the frontmatter of a specified file
    getFrontMatterValue(file, key){
        const frontmatter = this.getFrontMatterMap(file);

        if(!(key in frontmatter)) {
            const errMsg = `❌ Frontmatter key "${key}" not found in file: ${file?.path || '[unknown file]'}`;
            console.error(errMsg, frontmatter);
            throw new Error(errMsg);
        }

        return frontmatter[key];
    }
*/
    //accepts a 'target' file and will update the global property 'last_modified' to the current date/time
    async updateLastModified(file) {
        try {
            const formattedNow = this.formatUtils.db_formatDateTime(window.moment());

            await this.app.fileManager.processFrontMatter(file, (fm) => {
            fm["last_modified"] = formattedNow;
            });

            console.log(`🕒 last_modified updated to ${formattedNow} for ${file.path}`);
        } catch (err) {
            console.error("❌ Failed to update last_modified field:", err);
            new Notice("Error updating last_modified. See console.");
        }
    }
/**********OLD****************************************************************************************************************************************************************************************** */


//#endregion

//#region RETRIEVE SPECIFIED FILE PROPERTIES
    // accepts a fileClass value in order to retrieve the appropriate form to open. It also accepts the tp and app object in preparation for other actions once the form is opened like populating form fields and updating data fields
 /*   async getUpdateFormFromFileClass(app, tp, file) {
   // this.app = app;
    //this.tp = tp;
    this.frontmatter = this.getFrontMatterMap(file);
    this.modalFormFieldMap_Values = {}; // Make sure it's reset

    //Dynamically load fileTypeHandler & fileClassRegistry if not already loaded
    if (!this.fileTypeHandler) {
        const { fileTypeHandler } = await import("C:/.../fileTypeHandler.js");
        this.fileTypeHandler = fileTypeHandler;
    }

    if (!this.fileClassRegistry) {
        const { fileClass } = await import("C:/.../fileClassRegistry.js");
        this.fileClassRegistry = fileClass;
    }

    // 🛑 Safety check
    if (!this.frontmatter || Object.keys(this.frontmatter).length === 0) {
        new Notice("Could not read frontmatter.");
        return;
    }

    // 🔍 Find handler for this fileClass
    const handler = this.fileTypeHandler?.[this.frontmatter.fileClass];

    if (!handler || !handler.mdlFormName_Update1) {
    new Notice(`No update form defined for fileClass "${this.frontmatter.fileClass}"`);
    return null;
}

    this.modalFormName = handler.mdlFormName_Update1;
    this.modalFormFieldMap = handler.mdlFormName_Update1_fieldMap;

    if (this.modalFormFieldMap) {
        for (const [formField, frontmatterKey] of Object.entries(this.modalFormFieldMap)) {
            const {
                key,
                singleSelect = false,
                from = "frontmatter",
                isLink = false,
                groupFilter = null
            } = typeof frontmatterKey === "object"
                ? frontmatterKey
                : { key: frontmatterKey };

            let value;
            let targetField = formField; // 👈 Default assignment target

            if (from === "file") {
                value = file.basename;
            } else {
                // 🟡 Handle groupFilter if defined
                let resolvedFilter = null;
                if (groupFilter) {
                    resolvedFilter = typeof groupFilter === "string"
                        ? this.constructor.groupFilterRegistry?.[groupFilter]
                        : groupFilter;

                    if (resolvedFilter && resolvedFilter.groupField) {
                        const groupField = resolvedFilter.groupField;
                        const groupValue =
                            this.modalFormFieldMap_Values[groupField] ?? this.frontmatter[groupField];

                        const subFieldKey = resolvedFilter.subFieldsByGroup?.[groupValue];

                        if (subFieldKey) {
                            targetField = subFieldKey; // ✅ Use actual visible field name
                            value = this.frontmatter[subFieldKey] ?? this.frontmatter[key];
                        }
                    }
                }

                // 🟢 Fallback to direct frontmatter key
                if (value === undefined) {
                    value = this.frontmatter[key];
                }

                // 📌 Flatten singleSelect arrays
                if (singleSelect && Array.isArray(value) && value.length === 1) {
                    value = value[0];
                }

                // 📌 Normalize multiSelect from strings
                if (!singleSelect && typeof value === "string") {
                    value = [value];
                }

                // 📎 Strip [[ ]] from link fields
                if (isLink) {
                    const strip = (v) =>
                        typeof v === "string" ? v.replace(/^\[\[|\]\]$/g, "") : v;
                    value = Array.isArray(value) ? value.map(strip) : strip(value);
                }
            }

            // ✅ Assign to the correct field (original or resolved subField)
            this.modalFormFieldMap_Values[targetField] = value;
        }
    }
    console.log("Form Values:", this.modalFormFieldMap_Values);

}*/
    // ****UPDATE THIS FUNCTION NEXT******
    updateFrontMatterFromForm(file, result) {
    if (!result.data || Object.keys(result.data).length === 0) {
        new Notice("No data returned from form");
        return;
    }

    const formattedNow = this.formatUtils.db_formatDateTime(window.moment());

    const fileClass = this.frontmatter.fileClass;
    const handler = Object.values(this.constructor.fileTypeHandlers).find(
        entry => entry.fileClass === fileClass
    );

    const fieldMap = handler?.mdlFormName_Update1_fieldMap;

    app.fileManager.processFrontMatter(file, (frontmatter) => {
        frontmatter["last_modified"] = formattedNow;

        for (const [formField, mapping] of Object.entries(this.modalFormFieldMap)) {
            let frontmatterKey = formField;
            let fieldType = null;
            let isLink = false;
            let groupFilter = null;
            let multiSelect = false;

            if (typeof mapping === "string") {
                frontmatterKey = mapping;
            } else if (typeof mapping === "object") {
                frontmatterKey = mapping.key || formField;
                fieldType = mapping.type || null;
                isLink = mapping.isLink || false;
                groupFilter = mapping.groupFilter || null;
                multiSelect = mapping.multiSelect || false;
            }

            let finalValue = result.data[formField]; // Default fallback
            let sourceField = formField; // Track actual input field

            // ✅ Pull value from resolved groupFilter subfield if defined
            if (groupFilter) {
                const resolvedFilter = this.constructor.groupFilterRegistry?.[groupFilter];
                if (resolvedFilter?.groupField) {
                    const groupValue = result.data[resolvedFilter.groupField];
                    const subFieldKey = resolvedFilter.subFieldsByGroup?.[groupValue];

                    if (subFieldKey && result.data[subFieldKey] !== undefined) {
                        finalValue = result.data[subFieldKey];
                        sourceField = subFieldKey;
                    }
                }
            }

            // ✅ Apply field formatting if applicable
            if (fieldType && this.fieldTypeFormatHooks?.[fieldType]) {
                const formatter = this.fieldTypeFormatHooks[fieldType];
                finalValue = Array.isArray(finalValue)
                    ? finalValue.map(item => formatter(item, result, sourceField))
                    : formatter(finalValue, result, sourceField);
            }

            // 📎 Wrap [[links]] if needed
            if (isLink) {
                const wrap = (v) => typeof v === "string" && !v.startsWith("[[") ? `[[${v}]]` : v;
                finalValue = Array.isArray(finalValue)
                    ? finalValue.map(wrap)
                    : wrap(finalValue);
            }

            // ✅ Final write: if multiSelect, ensure array format
            let valueToWrite;
            if (multiSelect && !Array.isArray(finalValue)) {
                valueToWrite = [finalValue];
            } else {
                valueToWrite = finalValue;
            }

            // ✅ Write value to the *main* frontmatter field
            if (valueToWrite !== undefined) {
                frontmatter[frontmatterKey] = valueToWrite;
            }
        }

        // ✅ Handle special case: reviewed === true
        if (result.data.hasOwnProperty("reviewed") && result.data.reviewed === true) {
            frontmatter["status"] = "🟩 complete";
            frontmatter["entered"] = true;
        }
    });

    new Notice("Frontmatter Updated!");
}

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



//#endregion

}

