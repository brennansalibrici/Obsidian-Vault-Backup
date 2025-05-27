---
---

```button
name QuickAdd: Create New Fuse
type command
action QuickAdd: Create New Fuse
```

```dataview
table fuse_manufacturer as "Manufacturer", fuse_model as "Model", voltage_rating as "Voltage Rating", current_rating As "Current Rating", class as "Class"
from "Work/⚡Electric Equipment/Fuses"
where contains(file.path, "Fuses") and file.name != "Fuse Template" and file.name != "Fuses"
sort file.name asc

```

