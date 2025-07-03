---
last_chatted: 
full_name: 
person_type: 
phone:
email:
practice_lab: 
---

---
---

```button
name QuickAdd: 👤 Create New Person
type command
action QuickAdd: 👤 Create Person Note
```

### To Review
```dataview
table status as "Status"
from "Personal/👤 People"
where status = null and file.name != "👤 People"
sort file.name asc

```

### Completed File List
```dataview
table phone.phone_number as "Phone", email.email_address as "Email", status as "Status"
from "Personal/👤 People"
where status != null and file.name != "👤 People"
sort file.name asc

```

