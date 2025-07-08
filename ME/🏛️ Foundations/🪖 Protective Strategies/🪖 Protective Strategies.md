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

#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🪖 Protective Strategies"
where (status = null or status = "-") and file.name != "🪖 Protective Strategies" and icontains(file.name,this.searchTerm)
sort file asc
```

### Completed File List
```dataview
table strategy_type as "Type", functions as "Functions", tradeoffs as "Trade-Offs", adaptive_alternatives as "Adaptations", narrative as "Narrative", status as "Status"
from "ME/🏛️ Foundations/🪖 Protective Strategies"
where status != null and file.name != "🪖 Protective Strategies" and icontains(file.name,this.searchTerm)
sort file asc
```
