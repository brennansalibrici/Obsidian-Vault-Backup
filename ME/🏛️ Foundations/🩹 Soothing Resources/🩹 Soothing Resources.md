---
searchTerm: ""
---

```meta-bind-button
label: Create New 🩹 Soothing Resource
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
    templateFile: Meta/Templates/me/Foundations/Modal Soothing Resource Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🩹 Soothing Resources"
where status = null and file.name != "🩹 Soothing Resources"
sort file.name asc
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table resource_type as "Type", access_mode as "Access Mode", regulation_zone as "Regulation Zone", soothing_effects as "Effects", status as "Status"
from "ME/🏛️ Foundations/🩹 Soothing Resources"
where status != null and file.name != "🩹 Soothing Resources" and icontains(title,this.searchTerm)
sort file.name asc
```

