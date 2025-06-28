---
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

```dataview
table need_type as "Need", developmental_origin as "Origin", threatened_by as "Threatened By", unmet_effects as "Unmet Effects", definition as "Definition"
from "ME/🏛️ Foundations/🛡️ Emotional Needs"
where file.name != "🛡️ Emotional Needs"
sort file asc
```
