<% "---" %>
# CLASS DEFINITION:
fileClass: live_rehearsal

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

# LIVE REHEARSAL DEFINITION:
rehearsal_type: 
scenario: []
practice_log: []
people: []
rehearsal_summary:
skill_level:
meta_skills: []
core_skills: []
emotions_in_play: []
triggers: []
needs_activated: []
emotional_wounds: []
protective_strategies: []
steps_targeted: []
grade: []
key_miss:  []
rehearsal_resources: []
export_to_inputs: false

notes: []
related: []
media: []
attachments: []
take: []

<%*
//Open the modal form and it's api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Live Rehearsal")

//Extract the practice session and the scenario names as strings and convert to links
const sessionName = result.data.practice_log || "Untitled Practice Log";
const sessionLink = `[[${sessionName}]]`;
result.data.practice_log = sessionLink;

const sessionFile = app.vault.getAbstractFileByPath(`ME/🧪 Practice Lab/🎬 Practice Logs/${sessionName}.md`);
const cache = app.metadataCache.getFileCache(sessionFile);
const scenarioField = cache?.frontmatter?.scenario || "Unknown Scenario";
console.log("field check",scenarioField);
result.data.scenario = scenarioField;
tR += result.asFrontmatterString();

//Reference previous rehearsals to find the correct 'take' number
const rehearsalFolder = app.vault.getAbstractFileByPath("ME/🧪 Practice Lab/🎙️ Live Rehearsals");

let matchingRehearsals = 0;

if(rehearsalFolder && rehearsalFolder.children){
  for(const file of rehearsalFolder.children){
    console.log("File Names", file.name);
    if(file.name.includes(sessionName)){
      matchingRehearsals++;
      console.log("Matches", matchingRehearsals);
    }
  }
}

const takeNumber = matchingRehearsals + 1;

//Compose final filename and rename
const filename = `${sessionName}_Live Rehearsal Take -${takeNumber}`;
await tp.file.rename(filename);

//Append new take to practice log
// Get the reference to the original practice session file
const practiceFile = app.vault.getAbstractFileByPath(`ME/🧪 Practice Lab/🎬 Practice Logs/${sessionName}.md`);

if (practiceFile) {
  await app.fileManager.processFrontMatter(practiceFile, (fm) => {
    let current = fm["live_rehearsals"];

    // Ensure it's an array (even if previously a string or undefined)
    if (!Array.isArray(current)) {
      current = current ? [current] : [];
    }

    const newRehearsalLink = `[[${filename}]]`;

    // Add the new rehearsal if it doesn't already exist
    if (!current.includes(newRehearsalLink)) {
      current.push(newRehearsalLink);
    }

    // Reassign the cleaned array back to the field
    fm["live_rehearsals"] = current;
  });
}




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

