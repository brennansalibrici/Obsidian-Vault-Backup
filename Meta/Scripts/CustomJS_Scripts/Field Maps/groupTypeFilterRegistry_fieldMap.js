class groupTypeFilter_fieldMap {
    constructor() {
        this.EB = window.customJS?.createerrorBusInstance?.();

        this.fieldMap = {
            "TRADE_OFF": {
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
                        "Closeness vs. Independence": "type_connection",
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
            }
        };

        //Freeze & index for normalized lookups
        this.#deepFreeze(this.fieldMap);
        this._index = this.#buildIndex(this.fieldMap);
    }

    //#region PRIVATE FUNCTIONS
    #deepFreeze(obj) {
        if(!obj || typeof obj !== "object") return obj;
        Object.freeze(obj);
        for (const k of Object.keys(obj)) {
            const v = obj[k];
            if(v && typeof v === "object" && !Object.isFrozen(v)) this.#deepFreeze(v);
        }
        return obj;
    }

    #norm(s) {
        return String(s ?? "")
            .toLowerCase()
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "") // strip accents
      .replace(/[’‘‚‛']/g, "'").replace(/[“”„‟"]/g, '"') // unify quotes
      .replace(/&/g, "and")
      .replace(/\s+/g, " ")
      .trim();
    }

    #buildIndex(map) {
        const idx = {};
            for (const [fc, filters] of Object.entries(map || {})) {
                idx[fc] = {};
                for (const [filterKey, reg] of Object.entries(filters || {})) {
                    const normByGroup = {};
                    const validSubKeys = new Set(Object.values(reg?.subFieldsByGroup || {}));

                    for (const [label, key] of Object.entries(reg?.subFieldsByGroup || {})) {
                        normByGroup[this.#norm(label)] = key;
                    }

                const normReverse = {};
                for (const [label, ref] of Object.entries(reg?.reverseLookupMap || {})) {
                    const subKey = (typeof ref === "string") ? ref : ref?.key;
                    if (subKey) normReverse[this.#norm(label)] = subKey;

                    if (subKey && !validSubKeys.has(subKey)) {
                    const e = this.EB?.err?.(
                        this.EB.TYPE.VALIDATION, "INVALID_TYPE",
                        { where: "groupTypeFilter_fieldMap.validate",
                        field: `reverseLookup['${label}']`,
                        expected: `one of ${[...validSubKeys].join(", ")}`,
                        got: subKey },
                        { domain: this.EB?.DOMAIN?.FORMS }
                    );
                    this.EB?.toast?.(e || `[groupTypeFilter] Invalid reverse ref '${subKey}'`, { level: "warn", console: true });
                    }
                }

                idx[fc][filterKey] = Object.freeze({
                    groupField: reg?.groupField || null, normByGroup, normReverse, validSubKeys
                });
            }
        }
        return idx;
    }

    //#endregion

    //#region PUBLIC API (kept compatible)
        getAll() { return this.fieldMap; }
        getFieldMap(FILE_CLASS) { return this.fieldMap[FILE_CLASS] || null; } // used by fileTypeHandler → modalFormUtils
        has(FILE_CLASS) { return !!this.fieldMap[FILE_CLASS]; }

        //Convenience helpers
        getFilter(FILE_CLASS, filterKey) { return this.fieldMap?.[FILE_CLASS]?.[filterKey]; }
        hasFilter(FILE_CLASS, filterKey) { return !!this.fieldMap?.[FILE_CLASS]?.[filterKey]; }

        /** Given a group label (e.g., "Connection vs. Autonomy") return the subfield key ("type_connection"). */
        resolveSubField(FILE_CLASS, filterKey, groupValue) {
            const reg = this.getFilter(FILE_CLASS, filterKey);
            if (!reg) return null;
            // exact match first
            const direct = reg.subFieldsByGroup?.[groupValue];
            if (direct) return direct;
            // normalized fallback
            const n = this._index?.[FILE_CLASS]?.[filterKey]?.normByGroup;
            return n ? n[this.#norm(groupValue)] || null : null;
        }

        /** Reverse lookup: from label/synonym → subfield key. Returns { subFieldKey, groupField } or null. */
        reverseLookup(FILE_CLASS, filterKey, label) {
            const reg = this.getFilter(FILE_CLASS, filterKey);
            if (!reg) return null;
            // exact match in authored map
            const raw = reg.reverseLookupMap?.[label];
            const subFieldKey = (typeof raw === "string") ? raw : raw?.key;
            if (subFieldKey) return { subFieldKey, groupField: reg.groupField };

            // normalized fallback
            const n = this._index?.[FILE_CLASS]?.[filterKey]?.normReverse;
            const sub2 = n ? n[this.#norm(label)] : null;
            return sub2 ? { subFieldKey: sub2, groupField: reg.groupField } : null;
        }

        /** List filter keys available for a file class. */
        getFilters(FILE_CLASS) { return Object.keys(this.fieldMap?.[FILE_CLASS] || {}); }

    //#endregion
}


/*
export const groupTypeFilterRegistry = {
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
