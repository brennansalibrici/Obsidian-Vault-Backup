---
---

```meta-bind-button
label: Create New 🐾 Behavior Function
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
    templateFile: Meta/Templates/me/Foundations/Modal Behavior Function Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🐾 Behavior Functions"
where status = null and file.name != "🐾 Behavior Functions"
sort file asc
```

### Completed File List
```dataview
table function_group as "Group", function_type as "Type", status as "Status"
from "ME/🏛️ Foundations/🐾 Behavior Functions"
where file.name != "🐾 Behavior Functions" and status != null
sort file asc
```
