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
table event_date_time as "Date/Time", people as "People", driver as "Driver", motive as "Motive", response_alignment as "Response"
from "ME/🌒 Reflections/🕹️ Inner Check-Ins"
where file.name != "🕹️ Inner Check-Ins"
sort file.name asc 

```

