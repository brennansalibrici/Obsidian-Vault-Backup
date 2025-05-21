---
Status: 
Links: 
Created: 2025-04-27T08:22:20
fileClass: note
---

```button
name QuickAdd: 🛠 Create New Job
type command
action QuickAdd: 🛠 Create New Job
```

```dataview
table job_type as "Job Type", job_status as "Status"
from ""
where contains(file.path, "My Jobs") and file.name != "🛠 My Jobs" and file.name != "My Jobs Template"
sort file.name asc

```
