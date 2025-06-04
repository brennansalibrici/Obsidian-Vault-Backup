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
session_summary:
skill_level:
meta_skill_focus: []
core_skill_focus: []
emotions_in_play: []
triggers: []
needs_activated: []
emotional_wounds: []
protective_strategies: []
steps_targeted: []
grade:
linked_resources: []
live_rehearsals: []
key_miss: 
export_to_inputs: false

notes: []
related: []
media: []
attachments: []


<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Practice Log");

console.log("Modal values:", result);
console.log("Is this right?",result.data.scenario);

// Extract raw scenario name (as a string)
const scenarioName = result.data.scenario || "Untitled Scenario";

//Turn the plain string into a wikilink for frontmatter
const scenarioLink = `[[${scenarioName}]]`;

//Replace original with proper wikilink in frontmatter
result.data.scenario = scenarioLink;

//Add to frontmatter
tR += result.asFrontmatterString();

//Format date
const dateStr = tp.date.now("YYYYMMDD");

//Get folder reference
const practiceFolder = app.vault.getAbstractFileByPath("ME/🧪 Practice Lab/🎬 Practice Logs");

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
const filename = `${scenarioName}, Take-${takeNumber}`;
await tp.file.rename(filename)

//Shared fields to pass into dependent notes
const sharedFields = {scenario: scenarioLink, practice_log: filename, take: takeNumber};

//find template file
const liveFileName = "Tester Test";
const liveFolderPath = "ME/🧪 Practice Lab/🎙️ Live Rehearsals";
const fullLivePath = `${liveFolderPath}/${liveFileName}.md`;
const lv_template = tp.file.find_tfile("Modal Live Rehearsal Template");
await tp.file.create_new(lv_template, liveFileName, false, liveFolderPath);

//Create the Live Rehearsal file (empty for now)
//await app.vault.create(fullLivePath,"");

//Get reference to the new file and switch the active pane
const newLiveFile = app.vault.getAbstractFileByPath(fullLivePath);
await app.workspace.getLeaf().openFile(newLiveFile);
await app.fileManager.processFrontMatter(newLiveFile, (fm) => {
  fm["scenario"] = scenarioLink;
  fm["practice_log"] = `[[${tp.file.title}]]`;
  fm["take"] = takeNumber;
  fm["exmport_to_inputs"] = false;
  fm["people"] = result.data.people;

});


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
