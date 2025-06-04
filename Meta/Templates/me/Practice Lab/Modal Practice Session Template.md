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
