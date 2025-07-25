class FormatUtils {

  // PURPOSE: Centralized source for formatting variable types across Obsidian

  //#region DATE & TIME FORMATS

      db_formatDateTime(dateObj) {
        const momentObj = window.moment(dateObj ?? new Date());
        return momentObj.format("YYYY-MM-DD HH:mm");
      }

      db_formatDateOnly(dateObj) {
        const momentObj = window.moment(dateObj ?? new Date());
        return momentObj.format("YYYY-MM-DD");
      }

      formatTimeOnly(dateObj) {
        const momentObj = window.moment(dateObj ?? new Date());
        return momentObj.format("HH:mm");
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

      //strips brackets from a string link
      stripLinkBrackets(str){
        if(typeof str !== "string") return str;
        return str.startsWith("[[") && str.endsWith("]]") ? str.slice(2, -2) : str;
      }

    //#endregion COLLECTION OF MODULAR METHODS THAT CAN BE USED EITHER ON THEIR OWN OR COMBINED IN ANY COMBINATION TO ACHIEVE A PARTICULAR OUTCOME

  //#endregion STRING FORMATS

  test(){
    console.log("FormatUtils Test","Test, test");
  }
}

