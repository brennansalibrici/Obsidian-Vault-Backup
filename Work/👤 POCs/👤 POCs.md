---
---

```button
name QuickAdd: 👤 Create New POC
type command
action QuickAdd: 👤 Create New POC
```

```dataview
table company as "Company", role as "Position", phone.phone_number as "Phone", email.email_address as "Email", status as "Verified"
from "Work/👤 POCs"
where file.name != "👤 POCs"
sort file.name asc

```
