---
searchTerm: ""
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

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/⚡ Triggers"
where (status = null or status = "-") and file.name != "⚡ Triggers" and icontains(file.name,this.searchTerm)
sort file.name asc 

```

### Completed File List
```dataview
table trigger_type As "Type", trigger_origin as "Origin", trigger_flags as "Flags", status as "Status"
from "ME/🏛️ Foundations/⚡ Triggers"
where file.name != "⚡ Triggers" and status != null and icontains(title,this.searchTerm)
sort file.name asc 

```
