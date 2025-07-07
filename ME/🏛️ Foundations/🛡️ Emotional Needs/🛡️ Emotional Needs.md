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

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🛡️ Emotional Needs"
where status = null and file.name != "🛡️ Emotional Needs"
sort file asc
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table need_type as "Need", developmental_origin as "Origin", threatened_by as "Threatened By", unmet_effects as "Unmet Effects", definition as "Definition", status as "Status"
from "ME/🏛️ Foundations/🛡️ Emotional Needs"
where status != null and file.name != "🛡️ Emotional Needs" and icontains(title,this.searchTerm)
sort file asc
```
