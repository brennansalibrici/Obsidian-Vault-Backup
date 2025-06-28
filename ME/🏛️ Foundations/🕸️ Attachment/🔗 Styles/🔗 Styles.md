---
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

```dataview
table style_type as "Type", style_subtype as "SubType", style_pattern as "Pattern", core_fears as "Core Fears"
from "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles"
where file.name != "🔗 Styles"
sort file asc
```
