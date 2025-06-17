---
---

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
  - type: runTemplaterFile
    templateFile: Meta/Templates/me/Practice Lab/Modal Live Rehearsal Template.md

```

### Live Rehearsals
```dataview
table scenario as "Scenario", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🎙️ Live Rehearsals"
where file.name != "🎙️ Live Rehearsals"
sort file.name asc 

```
