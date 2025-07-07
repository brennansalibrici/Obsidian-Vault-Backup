---
searchTerm: ""
---

```meta-bind-button
label: Create New 🔗 Attachment Style
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
    templateFile: Meta/Templates/me/Foundations/Attachment/Modal Attachment Style Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles"
where status = null and file.name != "🔗 Styles"
sort file asc
```
#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table style_type as "Type", style_subtype as "SubType", style_pattern as "Pattern", core_fears as "Core Fears", status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles"
	where status != null and file.name != "🔗 Styles" and icontains(title,this.searchTerm)
sort file asc
```

