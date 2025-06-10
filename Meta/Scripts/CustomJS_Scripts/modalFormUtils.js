class ModalFormUtils {
    /*simulated enum used as an init() function parameter to identify the type of file coming in which will determine specific attributes about it, namely how to create
    the newly created file's name. The intention is that as you use this class for more and more similar types of modal form file creation, you continue adding to this enum
    and continuing adding 'cases' to the switch statement. You will also have to update the normalizeFileType() function to convert the function's incoming string to an
    actual enum value*/

    static filetype = {
        PRACTICE_SESSION: "practice session",
        LIVE_REHEARSAL: "live rehearsal",
        COACHING_SESSION: "coaching session"
    };

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
    }

    //script classes used with the CustomJS plugin do not accept constructor arguments. The init() is intended as a sort of pseudo constructor
    init(app, tp, fileType = ModalFormUtils.filetype, folderPath, templateFileName, string2Link1="",string2Link2=""){
        this.app = app;
        this.tp = tp;
        this.fileType = fileType;
        this.folderPath = folderPath;
        this.folder = app.vault.getAbstractFileByPath(this.folderPath);
        this.templateFile = templateFileName;
        this.strField1 = string2Link1;
        this.lnkField1 = this.string2Link(string2Link1);

        //loops through the specificed folder and returns the number of files that contains a specified phrase in the title
         if(this.folder && this.folder.children){
            for(const file of this.folder.children){
                if(file.name.includes(this.strField1)){
                    this.fileMatch++;
                }
            }
        }


    }

    //switch statement provides the ability to create individualized dynamic filename templates based on the init() filetype parameter
    /*********************the loop that assigns the fileMatch value returns the number of files that match. For the new filename we need to increase that value by one.
    creates both a stringname and a link for the newly created file***********************************/
    createNewFileName(strName = ""){
        if(strName){
            this.strField2 = strName;
            //this.lnkField2 = string2Link(strName);
        }

        switch(this.fileType){
            case "PRACTICE_SESSION":
                this.newCreatedFileName = `${this.strField1}, Session-${this.fileMatch+1}`;
                this.newCreatedFileLink = `[[${this.newCreatedFileName}]]`;
                this.newFileFullPath = `${this.folderPath}/${this.newCreatedFileName}.md`;
                break;
            case "LIVE_REHEARSAL":
                this.newCreatedFileName = `${this.strField1}_Live Rehearsal, Take-${this.fileMatch+1}`;
                this.newCreatedFileLink = `[[${this.newCreatedFileName}]]`;
                this.newFileFullPath = `${this.folderPath}/${this.newCreatedFileName}.md`;

                break;
            case "COACHING_SESSION":
                this.newCreatedFileName = `${this.strField1}_Coaching Session ${this.fileMatch+1}`;
                this.newCreatedFileLink = `[[${this.newCreatedFileName}]]`;
                this.newFileFullPath = `${this.folderPath}/${this.newCreatedFileName}.md`;

                break;
            default:

                break;
        }
        return this.newCreatedFileName;
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


    //simple ping test to verify functionality
    test(){
        return `Test Complete`
    }
}
//Practice folder path
