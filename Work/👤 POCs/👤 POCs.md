---
Status: 
Links: 
Created: 2025-04-27T08:48:21
fileClass: note
---

```button
name QuickAdd: 👤 Create New POC
type command
action QuickAdd: 👤 Create New POC
```

```dataview
table company as "Company",position as "Position", phone.phone_number as "Phone", email.email_address as "Email"
from ""
where contains(file.path, "POCs") and file.name != "👤 POCs"
sort file.name asc

```
