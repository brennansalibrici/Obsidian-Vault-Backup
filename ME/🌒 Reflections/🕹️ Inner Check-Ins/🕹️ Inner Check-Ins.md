---
---

```meta-bind-button
label: Create New 🕹️ Inner Check-In
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
    templateFile: Meta/Templates/me/Modal Inner CheckIn Template.md

```

### Inner Check-Ins
``` dataview
table id as "ID", importance as "Importance", people as "People", created as "Date/Time", status as "Status"
from "ME/🌒 Reflections/🕹️ Inner Check-Ins"
where contains(status, "review")
sort file.name asc 

```

