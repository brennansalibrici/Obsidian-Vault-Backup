---
searchTerm: ""
---

```meta-bind-button
label: Create New 🗝️ Attachment Need
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
    templateFile: Meta/Templates/me/Foundations/Attachment/Modal Attachment Need Template.md

```

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs"
where (status = null or status = "-") and file.name != "🗝️ Needs" and icontains(file.name,this.searchTerm)
sort file asc
```

### Completed File List
```dataview
table attachment_style_link as "Attachment Styles", rupture_effects as "Rupture Effects", partner_attunement_cue as "Attunement Cue", status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs"
where status != null and file.name != "🗝️ Needs" and icontains(title,this.searchTerm)
sort file asc
```

