---
searchTerm: ""
---

```meta-bind-button
label: Create New 🛡️ Emotional Need
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
    templateFile: Meta/Templates/me/Foundations/Modal Emotional Need Template.md

```

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🛡️ Emotional Needs"
where (status = null or status = "-") and file.name != "🛡️ Emotional Needs" and icontains(file.name,this.searchTerm)
sort file.name asc
```

### Completed File List
```dataview
table need_type as "Need", developmental_origin as "Origin", threatened_by as "Threatened By", unmet_effects as "Unmet Effects", definition as "Definition", status as "Status"
from "ME/🏛️ Foundations/🛡️ Emotional Needs"
where status != null and file.name != "🛡️ Emotional Needs" and icontains(title,this.searchTerm)
sort file.name asc
```
