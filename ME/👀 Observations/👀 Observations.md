---
---

```meta-bind-button
label: Create New 👀 Observation
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
    templateFile: Meta/Templates/me/Modal Observation Template.md

```

### Observations To Review
---
```dataview
table created as "Date/Time"
from "ME/👀 Observations"
where contains(status, "review")
sort file.name asc 

```

### All Observations
```dataview
table created as "Date/Time"
from "ME/👀 Observations"
where file.name != "👀 Observations" and file.name != "👀 Observations" and !contains(status, "review")
sort file.name asc 

```

