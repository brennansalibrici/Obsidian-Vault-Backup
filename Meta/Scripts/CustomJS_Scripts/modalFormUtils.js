class ModalFormUtils {

//PURPOSE: TO HANDLE ALL FUNCTIONALITY THAT GETS DATA FROM ANY MODAL FORM AND COMPLETES WHATEVER PROCESSES NECESSARY TO HAVE THAT DATA REFLECTED APPROPRIATELY IN OBSIDIAN

//#region CONSTRUCTOR, ENUMS AND PROPERTY DEFINITIONS
    /*simulated enum used as an init() function parameter to identify the type of file coming in which will determine specific attributes about it, namely how to create
    the newly created file's name. The intention is that as you use this class for more and more similar types of modal form file creation, you continue adding to this enum
    and continuing adding 'cases' to the switch statement. You will also have to update the normalizeFileType() function to convert the function's incoming string to an
    actual enum value*/

    static filetype = {
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
        ATTACHMENT_NEED: "attachment need"
    };

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
  "attachment_style_link"
];


    //Constructor and define class properties
    constructor(){
        this.app = null;
        this.tp = null;
        this.fileType = "";
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

    }

//#endregion

//#region CLASS UTILITY FUNCTIONS
    //defines a config object that handles the naming, folder and template resolution functions for creating new files
    static fileTypeHandlers = {
        "practice session": {
            folder: "ME/🧪 Practice Lab/🎬 Practice Logs",
            template: "Meta/Templates/me/Practice Lab/Practice Session Template.md",
            naming: (baseName, count) => `${baseName}_Session-${count}`
        },
        "live rehearsal": {
            folder: "ME/🧪 Practice Lab/🎙️ Live Rehearsals",
            template: "Meta/Templates/me/Practice Lab/Live Rehearsal Template.md",
            naming: (baseName, count) => `${baseName}_Live Rehearsal_Take-${count}`
        },
        "coaching session": {
            folder: "ME/🧪 Practice Lab/🧠 Coaching",
            template: "Meta/Templates/me/Practice Lab/Coaching Session Template.md",
            naming: (baseName, count) => `${baseName}_Coaching Session-${count}`
        },
        "inner check-in": {
            folder: "ME/🌒 Reflections/🕹️ Inner Check-Ins",
            template: "Meta/Templates/me/Inner_CheckIn_Template.md",
            naming: (context, count) => context
        },
        "scenario": {
            folder: "ME/🧪 Practice Lab/🎲 Scenarios",
            template:"Meta/Templates/me/Practice Lab/Scenario Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            }
        },
        "captured moment": {
            folder: "ME/📝 Captured Moments",
            template: "Meta/Templates/me/Captured Moment Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            }
        },
        "observation": {
            folder: "ME/👀 Observations",
            template: "Meta/Templates/me/Observation Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            }
        },
        "integration journal": {
            folder: "ME/📓 Journal",
            template: "Meta/Templates/me/Emotional Growth Journal/Integration Journal Template.md",
            naming: function () {
                const now = new Date();
                const datePart = this.formatUtils.db_formatDateOnly(now); // e.g., 2025-06-19
                const timePart = this.formatUtils.formatTimeOnly(now).replace(":", ""); // e.g., 1430
                return `🔁 Integration Journal Entry ${datePart} @ ${timePart}`;
            }
        },
        "reflection journal": {
            folder: "ME/📓 Journal",
            template: "Meta/Templates/me/Emotional Growth Journal/Reflection Journal Template.md",
            naming: function () {
                const now = new Date();
                const datePart = this.formatUtils.db_formatDateOnly(now); // e.g., 2025-06-19
                const timePart = this.formatUtils.formatTimeOnly(now).replace(":", ""); // e.g., 1430
                return `🪞 Reflection Journal Entry ${datePart} @ ${timePart}`;
            }
        },
        "trigger": {
            folder: "ME/🏛️ Foundations/⚡ Triggers",
            template: "Meta/Templates/me/Foundations/Trigger Template.md",
            naming: function (baseName) {
                return this.formatUtils.formatTitleCase(baseName);
            }
        },
        "internal voice": {
            folder: "ME/🏛️ Foundations/📢 Internal Voices",
            template: "Meta/Templates/me/Foundations/Internal Voice Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Internal Voice");
          }
        },
        "soothing resource": {
            folder: "ME/🏛️ Foundations/🩹 Soothing Resources",
            template: "Meta/Templates/me/Foundations/Soothing Resource Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Soothing Resource");
            }
        },
        "emotional wound": {
            folder: "ME/🏛️ Foundations/🌀 Emotional Wounds",
            template: "Meta/Templates/me/Foundations/Emotional Wound Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Wound");
            }
        },
        "behavior function": {
            folder: "ME/🏛️ Foundations/🐾 Behavior Functions",
            template: "Meta/Templates/me/Foundations/Behavior Function Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Behavior Function");
            }
        },
        "emotional need": {
            folder: "ME/🏛️ Foundations/🛡️ Emotional Needs",
            template: "Meta/Templates/me/Foundations/Emotional Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Emotional Need");
            }
        },
        "protective strategy": {
            folder: "ME/🏛️ Foundations/🪖 Protective Strategies",
            template: "Meta/Templates/me/Foundations/Protective Strategy Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Protective Strategy");
            }
        },
        "attachment need": {
            folder: "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs",
            template: "Meta/Templates/me/Foundations/Attachment/Attachment Need Template.md",
            naming: function(baseName) {
                return this.formatUtils.formatTitleCase(baseName || "Untitled Attachment Need");
            }
        }






    };

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
        const handler = ModalFormUtils.fileTypeHandlers[this.fileType];
        if (!handler || typeof handler.naming !== "function") {
            throw new Error(`❌ No valid naming function found for fileType: ${this.fileType}`);
        }

        // Call the naming function with the correct context (`this`) so formatUtils is available
        return count !== null
            ? handler.naming.call(this, baseName, count)
            : handler.naming.call(this, baseName);
    }

    //accepts a string and returns an Obsidian link of the same string
    string2Link(stringInput){
        return `[[${stringInput}]]`;
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
    init(config = {}) {
        const {
            app,
            tp,
            fileType,
            context1 = "",
            context2 = "",
            useContextAsLink = true
        } = config;

        // Normalize fileType input (e.g., "Trigger" → "trigger")
        const normalizedTypeKey = this.normalizeFileType(fileType);
        if (!normalizedTypeKey) {
            throw new Error(`❌ Unknown or invalid fileType provided: "${fileType}"`);
        }

        // Use the normalized value to fetch fileType string and handler
        this.fileType = ModalFormUtils.filetype[normalizedTypeKey];
        const handler = ModalFormUtils.fileTypeHandlers[this.fileType];

        if (!handler) {
            throw new Error(`❌ No fileTypeHandler found for: "${this.fileType}"`);
        }

        this.app = app;
        this.tp = tp;
        this.folderPath = handler.folder;
        this.folder = app.vault.getAbstractFileByPath(this.folderPath);
        this.templateFile = handler.template;
        this.strField1 = context1;
        this.lnkField1 = useContextAsLink ? this.string2Link(context1) : context1;

        if (!this.templateFile) {
            throw new Error(`❌ Template file path was not set for fileType: "${this.fileType}"`);
        }

        console.log("🛠️ ModalFormUtils initialized with:");
        console.log("📂 folderPath:", this.folderPath);
        console.log("📄 templateFile:", this.templateFile);
        console.log("🔖 fileType:", this.fileType);
        console.log("🧩 context1:", this.strField1);

        // Count matches in folder for naming logic
        if (this.folder && this.folder.children) {
            for (const file of this.folder.children) {
                if (file.name.includes(this.strField1)) {
                    this.fileMatch++;
                }
            }
        }
    }


    /*********************the loop that assigns the fileMatch value returns the number of files that match. For the new filename we need to increase that value by one.
    creates both a stringname and a link for the newly created file***********************************/
    createNewFileName(strName = "") {
        if (strName) this.strField2 = strName;

        const handler = ModalFormUtils.fileTypeHandlers[this.fileType];
        if (!handler || !handler.naming) throw new Error(`❌ No naming logic for fileType: ${this.fileType}`);

        const baseName = this.strField1;

        // 🔁 Special case for count-tracking file types
        if (["practice session", "live rehearsal", "coaching session"].includes(this.fileType)) {
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

    //combines createNewFileFromTemplate() and updateFrontMatter() into a single method
    async createFileWithFrontmatter(fieldMap = {}) {
        try {
            //Just-in-time filename generation
            this.createNewFileName();

            const file = await this.createNewFileFromTemplate();
            console.log("New file object received", file);
            if (file) {
                await this.updateFrontMatter(file, fieldMap);
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


//#endregion

//#region FRONTMATTER FUNCTIONS
 //updates the frontmatter with defined results from any modal form and inserts them into the frontmatter of any specified file
    async updateFrontMatter(file, fieldMap = {}) {
    try {
        await this.app.fileManager.processFrontMatter(file, (fm) => {
            for (const [key, value] of Object.entries(fieldMap)) {
                if (value === undefined || value === null) continue;

                    const existing = fm[key];

                    const toLink = (v, key) => {
                    if (!ModalFormUtils.linkFields.includes(key)) return v;
                    if (typeof v !== "string") return v;
                    return v.startsWith("[[") ? v : `[[${v}]]`;
                    };

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
                    }
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

    //retrieves the full frontmatter map from the specified file
    getFrontMatterMap(file){
        const cache = this.app.metadataCache.getFileCache(file);
        return cache?.frontmatter || {};
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


//#endregion

}

