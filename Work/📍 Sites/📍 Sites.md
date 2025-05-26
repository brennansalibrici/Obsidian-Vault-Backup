---
---

```button
name QuickAdd: 📍 Create New Site
type command
action QuickAdd: 📍 Create New Site
```

```dataview
table customer as "Customer", switchgear as "Switchgear"
from "Work/📍 Sites"
where file.name != "📍 Sites"
sort file.name asc

```

