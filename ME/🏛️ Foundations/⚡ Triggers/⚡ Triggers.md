---
---

```meta-bind-button
label: Create New⚡Trigger
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
    templateFile: Meta/Templates/me/Foundations/Modal Trigger Template.md

```

```dataview
table trigger_type As "Type", trigger_origin as "Origin", trigger_flags as "Flags"
from "ME/🏛️ Foundations/⚡ Triggers"
where file.name != "⚡ Triggers"
sort file.name asc 

```
