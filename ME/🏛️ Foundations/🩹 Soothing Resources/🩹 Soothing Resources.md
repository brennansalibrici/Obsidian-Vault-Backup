---
---

```meta-bind-button
label: Create New 🩹 Soothing Resource
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
    templateFile: Meta/Templates/me/Foundations/Modal Soothing Resource Template.md

```

```dataview
table resource_type as "Type", access_mode as "Access Mode", regulation_zone as "Regulation Zone", soothing_effects as "Effects"
from "ME/🏛️ Foundations/🩹 Soothing Resources"
where file.name != "🩹 Soothing Resources"
sort file.name asc
```

