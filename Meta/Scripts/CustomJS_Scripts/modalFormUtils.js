class ModalFormUtils {

//#region CONSTRUCTOR, ENUMS AND PROPERTY DEFINITIONS
    /*simulated enum used as an init() function parameter to identify the type of file coming in which will determine specific attributes about it, namely how to create
    the newly created file's name. The intention is that as you use this class for more and more similar types of modal form file creation, you continue adding to this enum
    and continuing adding 'cases' to the switch statement. You will also have to update the normalizeFileType() function to convert the function's incoming string to an
    actual enum value*/

    static filetype = {
        PRACTICE_SESSION: "practice session",
        LIVE_REHEARSAL: "live rehearsal",
        COACHING_SESSION: "coaching session"
    };

    static skipLinkFields = [
    "rehearsal_mode",
    "status",
    "type",
    "visibility",
    "last_modified",
    "created",
    "export_to_inputs",
    "driver",
    "motive",
    "response_alignment",
    "event_date_time",
    "context"
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
        this.fileCreatingTemplate = "";
        this.newLiveFile = "";
    }

//#endregion

//#region CLASS UTILITY FUNCTIONS
    //defines a config object that handles the naming, folder and template resolution functions for creating new files
    static fileTypeHandlers = {
        "practice session": {
            folder: "ME/🧪 Practice Lab/🎬 Practice Logs",
            template: "Meta/Templates/me/Practice Lab/Practice Session Template",
            naming: (baseName, count) => `${baseName}_Session-${count}`
        },
        "live rehearsal": {
            folder: "ME/🧪 Practice Lab/🎙️ Live Rehearsals",
            template: "Meta/Templates/me/Practice Lab/Live Rehearsal Template",
            naming: (baseName, count) => `${baseName}_Live Rehearsal_Take-${count}`
        },
        "coaching session": {
            folder: "ME/🧪 Practice Lab/🧠 Coaching",
            template: "Meta/Templates/me/Practice Lab/Coaching Session Template",
            naming: (baseName, count) => `${baseName}_Coaching Session-${count}`
        },
        "inner check-in": {
            folder: "ME/🌒 Reflections/🕹️ Inner Check-Ins",
            template: "Meta/Templates/me/Inner_CheckIn_Template",
            naming: (context, count) => context
        }
    };


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

        const handler = ModalFormUtils.fileTypeHandlers[fileType];
        if (!handler) throw new Error(`❌ Unknown fileType: ${fileType}`);

        this.app = app;
        this.tp = tp;
        this.fileType = fileType;

        this.folderPath = handler.folder;
        this.folder = app.vault.getAbstractFileByPath(this.folderPath);
        this.templateFile = handler.template;
        this.strField1 = context1;
        this.lnkField1 = useContextAsLink ? this.string2Link(context1) : context1;

        //loops through the specificed folder and returns the number of files that contains a specified phrase in the title
         if(this.folder && this.folder.children){
            for(const file of this.folder.children){
                if(file.name.includes(this.strField1)){
                    this.fileMatch++;
                }
            }
        }

        //Automatically create filename, path and links
        this.createNewFileName();
    }

    //switch statement provides the ability to create individualized dynamic filename templates based on the init() filetype parameter
    /*********************the loop that assigns the fileMatch value returns the number of files that match. For the new filename we need to increase that value by one.
    creates both a stringname and a link for the newly created file***********************************/
    createNewFileName(strName = ""){
        if(strName) this.strField2 = strName;

        const handler = ModalFormUtils.fileTypeHandlers[this.fileType];
        if (!handler || !handler.naming) throw new Error(`❌ No naming logic for fileType: ${this.fileType}`);

        //Check for exsiting filenames and increment if needed
        const baseName = this.strField1;
        let counter = 1;
        let finalName = handler.naming(baseName, counter);

        const existingNames = new Set(this.folder?.children?.map(file => file.name.replace(/\.md$/, "")) || []);
        while (existingNames.has(finalName)) {
            finalName = `${baseName}-${counter}`;
            counter++;
        }

        this.newCreatedFileName = finalName;
        this.newCreatedFileLink = this.string2Link(finalName);
        this.newFileFullPath = `${this.folderPath}/${finalName}.md`;

        return this.newCreatedFileName;
    }

    async createFileWithFrontmatter(fieldMap = {}) {
    const file = await this.createNewFileFromTemplate();
    if (file) {
        await this.updateFrontMatter(file, fieldMap);
    }
    return file;
    }

    //When called, this function creates a new and seperate file (from an existing template) which is called from a modal form's logic but it completely seperate from the template and/or the fileclass calling the function.
    async createNewFileFromTemplate() {
    try {

        console.log("🧪 DEBUG: templateFile =", this.templateFile);
        console.log("🧪 DEBUG: Available files in vault:");
        this.app.vault.getFiles().forEach(file => {
        console.log(" -", file.path);
        });

        console.log("🔍 Looking for template file:", this.templateFile);
        const files = this.app.vault.getFiles().map(f => f.path);
        console.log("📁 All available files:", files);

        // Find the template file
        this.fileCreatingTemplate = this.tp.file.find_tfile(this.templateFile);
        if (!this.fileCreatingTemplate) {
        throw new Error(`❌ Could not find template file: ${this.templateFile}`);
        }

        // Create the new file
        await this.tp.file.create_new(this.fileCreatingTemplate, this.newCreatedFileName, false, this.folderPath);

        // Wait a bit to ensure file is created
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get reference to the new file
        this.newCreatedFile = this.app.vault.getAbstractFileByPath(this.newFileFullPath);
        if (!this.newCreatedFile) {
        new Notice(`❌ Could not find created file at: ${this.newFileFullPath}`);
        throw new Error("File creation failed");
        }

        // Open the file in a new leaf
        await this.app.workspace.getLeaf().openFile(this.newCreatedFile);

        console.log("✅ File created and opened:", this.newCreatedFile.path);
        return this.newCreatedFile;
        }
    catch (err) {
            console.error("❌ Error in createNewFileFromTemplate:", err);
            new Notice("Error creating file from template. See console.");
            return null;
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
                    if (ModalFormUtils.skipLinkFields.includes(key)) return v;
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
    const now = window.moment();
    const formattedNow = now.format("YYYY-MM-DD HH:mm");

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

