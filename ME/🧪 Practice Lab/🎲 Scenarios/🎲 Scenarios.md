---
---

```meta-bind-button
label: Create New 🎲 Scenario
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
    templateFile: Meta/Templates/me/Practice Lab/Modal Scenario Template.md

```

### Scenarios
```dataview
table id as "ID", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🎲 Scenarios"
where file.name != "🎲 Scenarios"
sort file.name asc 

```
