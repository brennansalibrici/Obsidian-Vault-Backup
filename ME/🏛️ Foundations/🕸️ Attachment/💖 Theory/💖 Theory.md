---
searchTerm: ""
---

```meta-bind-button
label: Create New 💖 Attachment Theory
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
    templateFile: Meta/Templates/me/Foundations/Attachment/Modal Attachment Theory Template.md

```

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory"
where (status = null or status = "-") and file.name != "💖 Theory" and icontains(file.name,this.searchTerm)
sort file asc
```

### Completed File List
```dataview
table styles as "Attachment Style", core_fears as "Core Fears", relational_effects as "Relational Effects", growth_path as "Growth Path", status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory"
where file.name != "💖 Theory" and status != null and icontains(title,this.searchTerm)
sort file asc
```
