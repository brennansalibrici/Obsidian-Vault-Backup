---
searchTerm: ""
---

```meta-bind-button
label: Create New 🌀 Emotional Wound
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
    templateFile: Meta/Templates/me/Foundations/Modal Emotional Wound Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🌀 Emotional Wounds"
where file.name != "🌀 Emotional Wounds" and status = null
sort file asc
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table wound_type as "Type", origin_context as "Origin/Context", visible_patterns as "Visible Patterns", status as "Status"
from "ME/🏛️ Foundations/🌀 Emotional Wounds"
where file.name != "🌀 Emotional Wounds" and status != null and icontains(title,this.searchTerm)
sort file.name asc
```

