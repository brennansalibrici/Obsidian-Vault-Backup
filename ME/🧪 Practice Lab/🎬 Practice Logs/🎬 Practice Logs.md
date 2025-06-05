---
---

```button
name QuickAdd: 🎬 New Practice Session
type command
action QuickAdd: 🎬 New Practice Session
```

```meta-bind-button
label: Create New 🎬 Practice Log
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: ""
hidden: false
actions:
  - type: templaterCreateNote
    templateFile: Meta/Templates/me/Practice Lab/Modal Practice Session Template.md
    folderPath: ME/🧪 Practice Lab/🎬 Practice Logs
    fileName: Test Log
    openNote: true
    openIfAlreadyExists: false

```

### Practice Log
```dataview
table id as "ID", scenario as "Scenario", created as "Date/Time"
from "ME/🧪 Practice Lab/🎬 Practice Logs"
where file.name != "🎬 Practice Logs"
sort file.name asc 

```

### Work Flow
---
- Begin by creating a new Practice Session
- Choose the Scenario you want to work on
- Choose the people involved. The people field allows for multiple people to be stored but the input wizard only allows for one person to be entered from there. 
- Choose the Meta Skills that will be in play. You can only enter 3 from the input wizard, but you can enter as many more as you want once the file has been created via the frontmatter
- Choose the Core Skills that will be in play. Again, you can only enter 3 from the input wizard, but you can enter as many more as you want once the file has been created via the frontmatter
- Enter a linked resource if one exists. 
- This will create the new session. Take a screenshot or copy/paste the file to Elia and begin practicing the conversation in the chat. 
- During the conversation you will identify the meta & core skills in play as well as the emotional foundation elements. You will be scored on how accurate your choices were and the final entries will be the correct answers. 
- When the conversation is complete, you will import the entire conversation into a new 'Live Rehearsal' file and you will receive a grade and values for the various metrics to be updated in the Practice Session. 
- This is when values like grade, key_miss, session_summary, last_modified, etc will be updated and the correct values for the scenarios emotional foundation items will be applied.  
- Any entries you want to make in the Reflections Journal would be done at this point. This would be things like noting emotional responses, unexpected insights, or shifts in internal posture that occurred during the rehearsal.
- Your Practice Session is complete