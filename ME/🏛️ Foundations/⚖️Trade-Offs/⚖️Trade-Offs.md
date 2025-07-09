---
searchTerm: avoiding
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

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/⚖️Trade-Offs"
where (status = null or status = "-") and file.name != "⚖️Trade-Offs" and icontains(file.name,this.searchTerm)
sort file asc
```

### Completed File List
```dataview
table tradeoff_type as "Type", applies_to as "Applies To", dominant_pole as "Dominant Pole", conflicted_part as "Conflict Part", resolved_by as "Resolved By", status as "Status"
from "ME/🏛️ Foundations/⚖️Trade-Offs"
where file.name != "⚖️Trade-Offs" and status != null and icontains(title,this.searchTerm)
sort file asc
```
