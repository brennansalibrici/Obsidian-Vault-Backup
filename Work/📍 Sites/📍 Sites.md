---
Status: 
Links: 
Created: 2025-04-27T08:20:59
fileClass: note
---

```button
name QuickAdd: 📍 Create New Site
type command
action QuickAdd: 📍 Create New Site
```

```dataview
table file.name as "Sites", status as "Data Entry"
from ""
where contains(file.path, "📍 Sites") and file.name != "📍 Sites"
sort file.name asc

```
