---
---

```button
name QuickAdd: 🛠 Create New Job
type command
action QuickAdd: 🛠 Create New Job
```

```dataview
table scope_of_work as "Job Type", site.customer as "Customer", site_poc as "Site POC", subcontractor as "Sub", sub_poc as "Sub Contact"
from "Work/🛠 My Jobs"
where contains(file.path, "My Jobs") and file.name != "🛠 My Jobs" and file.name != "My Jobs Template"
sort file.name asc

```
