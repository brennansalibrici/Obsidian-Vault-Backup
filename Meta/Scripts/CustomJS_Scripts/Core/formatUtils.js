class FormatUtils {

  // PURPOSE: Centralized source for formatting variable types across Obsidian

  //#region CONSTANTS
  static WIKILINK_RE = /^\[\[[^\]]+\]\]$/;

  constructor() {
    const factory = window?.customJS?.createErrorBusInstance || window.customHS?.createerrorBusInstance;
    if(typeof factory !== "function") {
      throw new Error("[FormatUtils] errorBus factory not found on window.customJS");
    }
    this.errorBuss = factory({ module: "FormatUtils" });
  }

  emit(type, message, meta = {}) {
    const EB = this.errorBus;
    if(!EB) return; //silent if unavailalbe
    if(typeof EB[type] === "function") return EB[type](message, { module: "FormatUtils", ...meta });
    if(typeof EB.notify === "function") return EB.notify({ type, message, module: "FormatUtils", ...meta });
    if(typeof EB.emit === "function") return EB.emit(type, { message, module: "FormatUtils", ...meta });
    if(typeof EB.push === "function") return EB.push({ type, message, module: "FormatUtils", ...meta });
  }

  success(msg, meta) {this.emit("success", msg, meta); }
  error(msg, meta) {this.emit("error", msg, meta); }

  //#endregion

  //#region DATE & TIME FORMATS

      db_formatDateTime(dateObj) {
        try {
          const momentObj = window.moment(dateObj ?? new Date());
          return momentObj.format("YYYY-MM-DD HH:mm");
        } catch(e) {
          this.error("sb_formateDateTime failed", { error: String(e) });
          return "";
        }
      }

      db_formatDateOnly(dateObj) {
        try{
          const momentObj = window.moment(dateObj ?? new Date());
          return momentObj.format("YYYY-MM-DD");
        } catch (e) {
          this.error("db_formatDateOnly failed", { error: String(e) });
          return "";
        }
      }

      db_formatTimeOnly(dateObj) {
        try{
          const momentObj = window.moment(dateObj ?? new Date());
          return momentObj.format("HH:mm");
        } catch (e) {
          this.error("db_formatTimeOnly failed", { error: String(e) });
          return "";
        }
      }

  //#endregion DATE & TIME FORMATS

  //#region STRING FORMATS

    formatTitleCase(inputStr) {
      if (typeof inputStr !== "string") return inputStr;

      const words = inputStr.trim().split(/\s+/);

      return words
        .map((word, index) => {
          if (
            index === 0 ||
            index === words.length - 1 ||
            !this.isLowercaseLinkWord(word)
          ) {
            return this.preserveAcronymsInTitleCase(word);
          }
          return word.toLowerCase();
        })
        .join(" ");
    }

    //#region COLLECTION OF MODULAR METHODS THAT CAN BE USED EITHER ON THEIR OWN OR COMBINED IN ANY COMBINATION TO ACHIEVE A PARTICULAR OUTCOME

      //capitalizes the first letter of a word unless it's all-caps
      capitalizeWord(word) {
        if (!word) return word;
        if (word === word.toUpperCase() && word.length > 1) return word; // acronym
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      //used to detect small words typically not capitalized in titles
      isLowercaseLinkWord(word) {
        const lowercaseWords = new Set([
          "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor",
          "of", "on", "or", "so", "the", "to", "up", "yet"
        ]);
        return lowercaseWords.has(word.toLowerCase());
      }

      //sanitizes values for YAML multi-select compatibility
      replaceCommasWithUnderscores(inputStr) {
        if (typeof inputStr !== "string") return inputStr;
        return inputStr.replace(/,\s*/g, "_");
      }

      //strips characters that are disallowed in file names on most OSes (Windows-safe)
      stripIllegalFilenameChars(inputStr) {
        if (typeof inputStr !== "string") return inputStr;
        // Removes: / \ ? % * : | " < > and control characters
        return inputStr.replace(/[\/\\\?\%\*\:\|\"\<\>\x00-\x1F]/g, "").trim();
      }

      //checks if a word is probably an acronym (all uppercase, 2+ characters)
      isLikelyAcronym(word) {
        return word.length > 1 && word === word.toUpperCase() && /^[A-Z]+$/.test(word);
      }

      //keeps acronym casing if detected
      preserveAcronymsInTitleCase(word) {
        return this.isLikelyAcronym(word) ? word : this.capitalizeWord(word);
      }

      //DEPRECATED ALIAS: prefer unwrapLink
      stripLinkBrackets(str){
        return this.unwrapLink(str);
      }

    //#endregion COLLECTION OF MODULAR METHODS THAT CAN BE USED EITHER ON THEIR OWN OR COMBINED IN ANY COMBINATION TO ACHIEVE A PARTICULAR OUTCOME

  //#endregion STRING FORMATS

//#region FRONTMATTER/MODALFORM CONVERSIONS

  //#region CORE PRIMITIVES
      wrapStringIntoLink(str, { allowEmpty = false } = {}) {
        if (str == null) return str;     //null/undefined -> just pass it through
        if (Array.isArray(str)) return str.map(s => this.wrapStringIntoLink(s, { allowEmpty })); //array -> map each item

        if (typeof str !== "string") return str;
        const s = str.trim();
        if (!s && !allowEmpty) return s; //normalize empties

        //Already a link? Keep it exactly as is (covers alias, heading, blocks)
        if (FormatUtils.WIKILINK_RE.test(s)) return s;

        //Do not wrap image embeds like ![[...]]
        if (s.startsWith("![[") && s.endsWith("]]")) return s;

        //If the caller passed a bare heading anchor or block id, just wrap the whole thing, like "Note Name#Section", Note Name^abc123
        return `[[${s}]]`;
      }

      unwrapLink(str) {
        if(typeof str !== "string") return str;
        return str.replace(/^\s*\[\[|\]\]\s*$/g, "").trim();
      }

      ensureArray(val) {
        if(val == null) return [];
        return Array.isArray(val) ? val : [val];
      }

      uniqueClean(arr) {
        return Array.from(new Set((arr || []).filter(v => v != null && String(v).trim() !== "")));
      }

  //#endregion

  //#region DIRECTIONAL NORMALIZERS
      //Normalize value for writing to YAML Frontmatter (array or scalar), link wrapping optional
    toYamlList(value, { link = false } = {}) {
      const arr = this.ensureArray(value)
        .map(v => (typeof v === "string" ? v.trim() : v))
        .map(v => (link ? this.wrapStringIntoLink(v) : v));   // ✅ wrap when link=true
      return this.uniqueClean(arr);
    }

    mergeYamlLists(existing, incoming) {
      const left = this.ensureArray(existing);
      const right = this.ensureArray(incoming);
      return this.uniqueClean([...left, ...right]);
    }

    /**
     * Convert a frontmatter value (scalar or array) into a clean JS array for modal form prefill.
     * @param {string|string[]} value - The raw frontmatter value
     * @param {Object} opts
     * @param {boolean} [opts.stripLinks=false] - Remove [[ ]] from links
     * @returns {string[]} Clean array for form
     */
    toFormList(value, { stripLinks = false } = {}) {
      if (value == null) return [];
      const arr = Array.isArray(value) ? value : [value];
      if (!stripLinks) return arr;
      return arr.map(v => (typeof v === "string" ? this.unwrapLink(v) : v));
    }

  //#endregion

  //#region SELECT SEMANTICS HELPERS
      // Decide array vs scalar, then shape normalized array accordingly
      applySelectSemantics(normalizedArray, { singleSelect = false } = {}) {
        return singleSelect ? (normalizedArray[0] ?? "") : normalizedArray;
      }

      // One-stop normalizer using map flags & link rules
      normalizeForWrite({ value, existing = undefined, isLinkField = false, singleSelect = false, multiSelect = false, merge = true, /*merge arrays when updating*/ }) {
        // explicit-only: only multiSelect => array
        const wantsArray = multiSelect === true;

        // produce a cleaned array, wrapping links per item if needed
        const normalizedArr = this.toYamlList(value, { link: isLinkField });
        const shaped = wantsArray ? normalizedArr : this.applySelectSemantics(normalizedArr, { singleSelect });
        if (!merge) return shaped;
        return wantsArray ? this.mergeYamlLists(existing, shaped) : shaped;
      }


  //#endregion

  //#region NAMING RULES
      sanitizeForFilename(input) {
        if (typeof input !== "string") return "Untitled";
        // collapse underscores/commas to spaces
        const collapsed = input.replace(/[,_]+/g, " ").replace(/\s+/g, " ").trim();
        // remove illegal chars
        const safe = this.stripIllegalFilenameChars(collapsed);
        // Title Case but preserve acronyms
        const titled = this.formatTitleCase(safe);
        return titled || "Untitled";
      }

    //#endregion

  //#endregion

}

