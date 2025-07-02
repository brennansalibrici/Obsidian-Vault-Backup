---
---

```meta-bind-button
label: Create New⚡Trigger
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
    templateFile: Meta/Templates/me/Foundations/Modal Trigger Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/⚡ Triggers"
where status = null and file.name != "⚡ Triggers"
sort file.name asc 

```

### Completed File List
```dataview
table trigger_type As "Type", trigger_origin as "Origin", trigger_flags as "Flags", status as "Status"
from "ME/🏛️ Foundations/⚡ Triggers"
where file.name != "⚡ Triggers" and status != null
sort file.name asc 

```
