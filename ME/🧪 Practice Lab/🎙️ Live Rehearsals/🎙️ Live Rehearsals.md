---
---

```button
name QuickAdd: 🎙️New Rehearsal
type command
action QuickAdd: 🎙️New Rehearsal
```

```meta-bind-button
label: Create New 🎙️ Live Rehearsal
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
    templateFile: Meta/Templates/me/Practice Lab/Modal StandAlone Live Rehearsal Template.md
    folderPath: ME/🧪 Practice Lab/🎙️ Live Rehearsals
    fileName: New Live Rehearsal
    openNote: true
    openIfAlreadyExists: false

```

### Live Rehearsals
```dataview
table scenario as "Scenario", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🎙️ Live Rehearsals"
where file.name != "🎙️ Live Rehearsals"
sort file.name asc 

```
