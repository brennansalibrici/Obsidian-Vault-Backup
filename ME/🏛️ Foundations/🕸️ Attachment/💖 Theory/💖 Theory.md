---
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

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory"
where status = null and file.name != "💖 Theory"
sort file asc
```

### Completed File List
```dataview
table styles as "Attachment Style", core_fears as "Core Fears", relational_effects as "Relational Effects", growth_path as "Growth Path", status as "Status"
from "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory"
where file.name != "💖 Theory" and status != null
sort file asc
```
