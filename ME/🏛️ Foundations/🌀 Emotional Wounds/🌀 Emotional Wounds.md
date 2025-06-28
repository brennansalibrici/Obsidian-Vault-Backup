---
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

```dataview
table wound_type as "Type", origin_context as "Origin/Context", visible_patterns as "Visible Patterns"
from "ME/🏛️ Foundations/🌀 Emotional Wounds"
where file.name != "🌀 Emotional Wounds"
sort file asc
```

