---
---

```button
name QuickAdd: Create New Trip Unit
type command
action QuickAdd: Create New TripUnit
```

```dataview
table tu_manufacturer as "Manufacturer",tu_model as "Model"
from ""
where contains(file.path, "Trip Units") and file.name != "Trip Unit Template" and file.name != "Trip Units"
sort file.name asc

```
