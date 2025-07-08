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

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🩹 Soothing Resources"
where (status = null or status = "-") and file.name != "🩹 Soothing Resources" and icontains(file.name,this.searchTerm)
sort file.name asc
```

### Completed File List
```dataview
table resource_type as "Type", access_mode as "Access Mode", regulation_zone as "Regulation Zone", soothing_effects as "Effects", status as "Status"
from "ME/🏛️ Foundations/🩹 Soothing Resources"
where status != null and file.name != "🩹 Soothing Resources" and icontains(title,this.searchTerm)
sort file.name asc
```

