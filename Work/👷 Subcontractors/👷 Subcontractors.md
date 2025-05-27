---
---

```button
name QuickAdd: 👷 Create New Subcontractor
type command
action QuickAdd: 👷 Create New Sub
```

```dataview
table file.name as "Sub",sub_status as "Sub Status"
from "Work/👷 Subcontractors"
where contains(file.path, "Sub") and file.name != "👷 Subcontractors" and file.name != "Subcontractor Template"
sort file.name asc

```

## Notes
🟩 = active and in good standing
🟨 = active, in good standing, but did not have certain contracts renewed
🟧 = active, not in good standing
🟥 = inactive, not in good standing
