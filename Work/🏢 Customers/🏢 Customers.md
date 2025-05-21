---
Status: 
Links: 
Created: 2025-04-27T08:18:49
fileClass: note
---

```button
name QuickAdd: 🏢 Create New Customer
type command
action QuickAdd: 🏢 Create New Customer
```

```dataview
table file.name as "Customer"
from ""
where contains(file.path, "Customers") and file.name != "🏢 Customers"
sort file.name asc

```
