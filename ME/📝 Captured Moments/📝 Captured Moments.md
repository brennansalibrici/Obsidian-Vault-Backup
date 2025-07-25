---
---

```meta-bind-button
label: Capture 📝 New Moment
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
    templateFile: Meta/Templates/me/Modal Captured Moment Template.md

```

### Captured Moments To Review
```dataview
table id as "ID", importance as "Importance", people as "People", type as "Type", created as "Date/Time", status as "Status"
from "ME/📝 Captured Moments"
where contains(status, "review") or contains(status, "in progress")
sort file.name asc 

```

### All Captured Moments
```dataview
table created as "Date/Time"
from "ME/📝 Captured Moments"
where file.name != "📝 Captured Moments" and file.name != "📝 Captured Moments" and !contains(status, "review")
sort file.name asc 

```

