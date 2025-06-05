<% "---" %>
# CLASS DEFINITION:
fileClass: practice_log

# **INHERITS FROM GLOBAL TEMPLATE:
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
title: <% tp.file.title %>

# STATUS & WORKFLOW FIELDS
status: []
type: []
tags: []
category: note
entered: true
archived: false
priority: [⚪ None]
visibility: 🔒 private

# PRACTICE SESSION DEFINITION:
session_summary: []
skill_level: []
meta_skill_focus: []
core_skill_focus: []
emotions_in_play: []
triggers: []
needs_activated: []
emotional_wounds: []
protective_strategies: []
steps_targeted: []
grade: []
linked_resources: []
live_rehearsals: []
key_miss: []
export_to_inputs: false

notes: []
related: []
media: []
attachments: []


<%*
//Open the modal form and it's api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Practice Log");

// Extract raw scenario name (as a string)
const scenarioName = result.data.scenario || "Untitled Scenario";

//Turn the plain string into a wikilink for frontmatter
const scenarioLink = `[[${scenarioName}]]`;

//Replace original with proper wikilink in frontmatter
result.data.scenario = scenarioLink;

//Format date
const dateStr = tp.date.now("YYYYMMDD");

//Get folder reference
const practiceFolderPath = "ME/🧪 Practice Lab/🎬 Practice Logs";
const practiceFolder = app.vault.getAbstractFileByPath(practiceFolderPath);

let matchingLogs = 0;

if(practiceFolder && practiceFolder.children){
  for (const file of practiceFolder.children){
    console.log("File Names", file.name);
    if(file.name.includes(scenarioName)){
    matchingLogs++;
    console.log("Matches", matchingLogs);
    }
  }
}
const takeNumber = matchingLogs + 1;

//Compose final filename and rename
const filename = `${scenarioName}, Session-${takeNumber}`;
await tp.file.rename(filename)
result.data.title = filename;

//Define New Rehearsal file name
const liveRehearsalFileName = `${filename}_Live Rehearsal, Take-${takeNumber}`;
result.data.live_rehearsals = `[[${liveRehearsalFileName}]]`;

//Add to frontmatter
tR += result.asFrontmatterString();
//Shared fields to pass into dependent notes
const sharedFields = {scenario: scenarioLink, practice_log: filename, take: takeNumber};

//Define New Rehearsal file name
//const liveFileName = `${filename}_Live Rehearsal, Take-${takeNumber}`;

//find template file
const liveFolderPath = "ME/🧪 Practice Lab/🎙️ Live Rehearsals";
const fullLivePath = `${liveFolderPath}/${liveRehearsalFileName}.md`;
const lv_template = tp.file.find_tfile("Modal Live Rehearsal Template");
await tp.file.create_new(lv_template, liveRehearsalFileName, false, liveFolderPath);

//Create the Live Rehearsal file (empty for now)
//await app.vault.create(fullLivePath,"");

//Get reference to the new file and switch the active pane
const newLiveFile = app.vault.getAbstractFileByPath(fullLivePath);
await app.workspace.getLeaf().openFile(newLiveFile);
await app.fileManager.processFrontMatter(newLiveFile, (fm) => {
  fm["scenario"] = scenarioLink;
  fm["practice_log"] = `[[${filename}]]`;
  fm["take"] = takeNumber;
  fm["export_to_inputs"] = false;
  fm["people"] = result.data.people;

});

// Attach the newly created live rehearsal file to the Practice Session object
//const practiceFile = app.vault.getAbstractFileByPath(`${fullFileName}.md`);
//await app.workspace.getLeaf().openFile(practiceFile);
//console.log("Reopen File", fullFileName);
//await app.fileManager.processFrontMatter(practiceFile, (fm) => {
  
  //fm["live_rehearsals"] = `[[${liveRehearsalFileName}]]`;
//});

//console.log("New File",tR);
//console.log("New File 2:",tp);




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
