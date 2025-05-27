---
---

```button
name QuickAdd: 📍 Create New Site
type command
action QuickAdd: 📍 Create New Site
```

```dataview
table customer as "Customer", siteAddress as "Address"
from "Work/📍 Sites"
where file.name != "📍 Sites"
sort file.name asc

```

