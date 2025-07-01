---
---

```meta-bind-button
label: Create New ⚖️Trade-Off
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
    templateFile: Meta/Templates/me/Foundations/Modal TradeOff Template.md

```

```dataview
table tradeoff_type as "Type", applies_to as "Applies To", dominant_pole as "Dominant Pole", conflicted_part as "Conflict Part", resolved_by as "Resolved By"
from "ME/🏛️ Foundations/⚖️Trade-Offs"
where file.name != "⚖️Trade-Offs"
sort file asc
```
