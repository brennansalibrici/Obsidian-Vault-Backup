---
---

```meta-bind-button
label: Create New 🪖 Protective Strategy
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
    templateFile: Meta/Templates/me/Foundations/Modal Protective Strategy Template.md

```

```dataview
table strategy_type as "Type", functions as "Functions", tradeoffs as "Trade-Offs", adaptive_alternatives as "Adaptations", narrative as "Narrative"
from "ME/🏛️ Foundations/🪖 Protective Strategies"
where file.name != "🪖 Protective Strategies"
sort file asc
```
