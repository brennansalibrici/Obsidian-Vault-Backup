---
searchTerm: ""
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

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🪖 Protective Strategies"
where status = null and file.name != "🪖 Protective Strategies"
sort file asc
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table strategy_type as "Type", functions as "Functions", tradeoffs as "Trade-Offs", adaptive_alternatives as "Adaptations", narrative as "Narrative", status as "Status"
from "ME/🏛️ Foundations/🪖 Protective Strategies"
where status != null and file.name != "🪖 Protective Strategies" and icontains(title,this.searchTerm)
sort file asc
```
