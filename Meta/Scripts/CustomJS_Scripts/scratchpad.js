/*
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
