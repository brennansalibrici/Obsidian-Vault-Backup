---
---

```button
name QuickAdd: 👷 Create New Subcontractor
type command
action QuickAdd: 👷 Create New Sub
```

```dataview
table file.name as "Sub",sub_status as "Sub Status"
from ""
where contains(file.path, "Sub") and file.name != "👷 Subcontractors" and file.name != "Subcontractor Template"
sort file.name asc

```
