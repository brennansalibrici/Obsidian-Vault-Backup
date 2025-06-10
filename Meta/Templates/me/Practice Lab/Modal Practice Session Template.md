<% "---" %>
# CLASS DEFINITION:
fileClass: practice_log

# **INHERITS FROM GLOBAL TEMPLATE:
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>



# STATUS & WORKFLOW FIELDS
status: []
type: []
tags: []
category: [note]
entered: true
archived: false
priority: [⚪ None]
visibility: [🔒 private]

# PRACTICE SESSION DEFINITION:
session_summary: ""
skill_level: []
meta_skill_focus: []
core_skill_focus: []
emotions_in_play: []
triggers: []
needs_activated: []
emotional_wounds: []
protective_strategies: []
steps_targeted: []
grade: ""
linked_resources: []

key_miss: ""
export_to_inputs: false
coaching_session: []
notes: ""
related: []
media: []
attachments: []




<%*
//GENERAL --------------------------------------------------------------------------------------------------------------------------------

//Open the modal form and it's api; get the modalFormUtilities class and general defs
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Practice Log");

//Create the Practice Session Object
const practiceSession = window.customJS.createModalFormUtilsInstance();

practiceSession.init(app,tp,"PRACTICE_SESSION","ME/🧪 Practice Lab/🎬 Practice Logs","Modal Live Rehearsal Template",result.data.scenario);
practiceSession.createNewFileName();

//Create the LiveRehearsal Object
const liveRehearsal = window.customJS.createModalFormUtilsInstance();
liveRehearsal.init(app,tp,"LIVE_REHEARSAL","ME/🧪 Practice Lab/🎙️ Live Rehearsals","Modal Live Rehearsal Template",practiceSession.newCreatedFileName);
liveRehearsal.createNewFileName();

//Create the Coaching Session Object
const coachingSession = window.customJS.createModalFormUtilsInstance();
coachingSession.init(app,tp,"COACHING_SESSION","ME/🧪 Practice Lab/🧠 Coaching","Modal Coaching Template",practiceSession.newCreatedFileName);
coachingSession.createNewFileName();

//Insert data into results object from the modal form
result.data.scenario = practiceSession.newCreatedFileLink;
await tp.file.rename(practiceSession.newCreatedFileName);
result.data.title = practiceSession.newCreatedFileName;







//-------------------------------------------------------------------------------------------------------------------------------------
switch(result.data.rehearsal_mode){
  case "Live Rehearsal":
//LIVE REHEARSAL RELATED --------------------------------------------------------------------------------------------------------------

//Insert New Live Rehearsal into the Practice Session
	result.data.live_rehearsals = liveRehearsal.newCreatedFileLink;

// Find the template

const lv_template = tp.file.find_tfile(liveRehearsal.templateFile);
if (!lv_template) {
  throw new Error(`❌ Could not find template file: ${liveRehearsal.templateFile}`);
}

// Create the file from the template
await tp.file.create_new(lv_template, liveRehearsal.newCreatedFileName, false, liveRehearsal.folderPath);
tp.file.create

// Wait a little to ensure the file is fully committed to disk
await new Promise(resolve => setTimeout(resolve, 250));

console.log("🔍 Expected full file path:", liveRehearsal.newFileFullPath);
console.log("📁 Folder children:");
for (const child of liveRehearsal.folder.children) {
  console.log("-", child.path);
}


// Re-fetch the file reference
const newLiveFile = app.vault.getAbstractFileByPath("ME/🧪 Practice Lab/🎙️ Live Rehearsals/A Different Story, Session-1_Live Rehearsal, Take-1.md");
if (!newLiveFile) {
  new Notice(`❌ Could not find newly created file at: ${liveRehearsal.newFullFilePath}`);
  return;
}

await app.workspace.getLeaf().openFile(newLiveFile);

await app.fileManager.processFrontMatter(newLiveFile, (fm) => {
  fm["practice_log"] = `[[${practiceSession.newCreatedFileName}]]`;
  fm["scenario"] = practiceSession.newCreatedFileLink;
  fm["export_to_inputs"] = false;
  fm["people"] = result.data.people || [];
});





    break;
//--------------------------------------------------------------------------------------------------------------------------------------

//COACHING RELATED ---------------------------------------------------------------------------------------------------------------------
/*
  case "Coaching":
  console.log("Switch Test", "Coaching is Selected");
  //find template file
    
	const fullCoachPath = `${coachingFolderPath}/${coachingFileName}.md`;
	const coaching_template = tp.file.find_tfile("Modal Coaching Template");+
	await tp.file.create_new(coaching_template, coachingFileName, false, coachingFolderPath);+
	
	//Get reference to the new file and switch the active pane
	const newCoachingFile = app.vault.getAbstractFileByPath(fullCoachPath);
	const coachingFolderPath
	await app.workspace.getLeaf().openFile(newCoachingFile);

    //Get coaching file count
   

	
	if(coachingFolder && coachingFolder.childern){
	  for(const coach of coachingFolder.children){
	  console.log("Coaching File Names", coach.name);
		  if(coach.name.includes(strScenarioName)){
		  matchingCoachingLogs++;
		  console.log("Coaching Matches", matchingCoachingLogs);
		}
	  }
	}

	await app.fileManager.processFrontMatter(newCoachingFile, (fm) => {
	  fm["scenario"] = lnkScenario;
	  fm["practice_log"] = `[[${filename}]]`;
	  fm["take"] = takeNumber;
	  fm["export_to_inputs"] = false;
	  fm["people"] = result.data.people;
	
	});  

	//Get folder reference to find the correct coaching number
	const practiceFolderPath = "ME/🧪 Practice Lab/🧠 Coaching";
	const practiceFolder = app.vault.getAbstractFileByPath(practiceFolderPath);
	

	if(practiceFolder && practiceFolder.children){
	  for (const file of practiceFolder.children){
	    console.log("File Names", file.name);
	    if(file.name.includes(strScenarioName)){
	    matchingPracticeLogs++;
	    console.log("Matches", matchingPracticeLogs);
	    }
	  }
	}
	const takeNumber = matchingPracticeLogs + 1;

*/

  break;
  
 //--------------------------------------------------------------------------------------------------------------------------------------
 
//COACHING RELATED --------------------------------------------------------------------------------------------------------------------- 
   case "Live Rehearsal & Coaching":
  







  
  break;
//--------------------------------------------------------------------------------------------------------------------------------------

/*

//app.vault.getAbstractFileByPath(liveRehearsalFolderPath)
//app.vault.getAbstractFileByPath(coachingFolderPath)


//const {modalFormUtils} = await cJS();
//const liveRehearsal = modalFormUtils;
//liveRehearsal.init("ME/🧪 Practice Lab/🎙️ Live Rehearsals",app.vault.getAbstractFileByPath(liveRehearsalFolderPath),)
//Define folder objects
//Practice Logs
//const practiceFolder = app.vault.getAbstractFileByPath(practiceSession.folderPath);
//let matchingPracticeLogs = 0;
//console.log("Folder Path Test:",practiceSession.folderPath);
//Live Rehearsals
//const liveRehearsalFolderPath = "ME/🧪 Practice Lab/🎙️ Live Rehearsals";
//const liveRehearsalFolder = app.vault.getAbstractFileByPath(liveRehearsalFolderPath);
//let matchingRehearsalLogs = 0;

//Coaching
//const coachingFolderPath = "ME/🧪 Practice Lab/🧠 Coaching";
//const coachingFolder = app.vault.getAbstractFileByPath(coachingFolderPath);
//let matchingCoachingLogs = 0;

//Create New File Names


//console.log("Link Breakpoint",practiceSession.newCreatedFileName);



//console.log("Practice Session Filename", practiceSession.newCreatedFileName);



//LIVE REHEARSALS
//Get Count of Live Rehearsal Sessions with this Practice Session
//if(liveRehearsal.folder && liveRehearsal.folder.children){
//  for (const rehearsal of liveRehearsal.folder.children){
//    if(rehearsal.name.includes(practiceSession.newCreatedFileName)){
//    matchingRehearsalLogs++;
//    
//    }
//  }
//}
//const takeNumber = matchingRehearsalLogs + 1;
//const rehearsalFilename = `${practiceSession.newCreatedFileName}_Live Rehearsal, Take-${takeNumber}`;
//console.log("Obsidian - Live Rehearsal Filename", rehearsalFilename);

//console.log("JS Script - Live Rehearsal Filename", liveRehearsal.createNewFileName(practiceSession.newCreatedFileName));


//COACHING
//Get Count of Coaching Sessions with this Practice Session
//if(coachingSession.folder && coachingSession.folder.children){
//  for (const coach of coachingSession.folder.children){
//    if(coach.name.includes(practiceSession.newCreatedFileName)){
//    matchingCoachingLogs++;
//    }
//  }
//}
//const coachingNumber = matchingCoachingLogs + 1;
//const coachingFileName = `${practiceSession.newCreatedFileName}_Coaching Session ${coachingNumber}`;
//console.log("Obsidian - Coaching Filename",coachingFileName);

//console.log("JS Script - Coaching Filename", coachingSession.createNewFileName(practiceSession.newCreatedFileName));





//Add to frontmatter

//Shared fields to pass into dependent notes
//const sharedFields = {scenario: lnkScenario, practice_log: filename, take: takeNumber};

*/
  default:
    new Notice("Unknown rehearsal type selected.");
    break;
}

tR += result.asFrontmatterString();
-%>
<% "---" %>

## 📝 Session Summary  
---  


## 💡 Key Miss / Growth Edge  
---  


## 🧠 Core Skills Practiced  
---  

  
## 🧭 Meta Skills Engaged  
---  


## 🎯 Grade  
---  


## 📎 Linked Scenario  
---  


## 🔗 Supporting Resources  
---  
