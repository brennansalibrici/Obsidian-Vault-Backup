---
---

```meta-bind-button
label: Create New 🧠 Coaching Session
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
    templateFile: Meta/Templates/me/Practice Lab/Modal Coaching Session Template.md

```

### Coaching Feedback
```dataview
table scenario as "Scenario", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🧠 Coaching"
where file.name != "🧠 Coaching"
sort file.name asc 

```

