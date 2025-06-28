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

```dataview
table phone.phone_number as "Phone", email.email_address as "Email", status as "Verified"
from "Personal/👤 People"
where file.name != "👤 People"
sort file.name asc

```

