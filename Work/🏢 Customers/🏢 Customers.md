---
---

```button
name QuickAdd: 🏢 Create New Customer
type command
action QuickAdd: 🏢 Create New Customer
```

```dataview
table file.name as "Customer", customer_status as "Status"
from "Work/🏢 Customers"
where file.name != "🏢 Customers"
sort file.name asc

```

## Notes
---
🟩 = active and in good standing
🟨 = active, in good standing, but did not have certain contracts renewed
🟧 = active, not in good standing
🟥 = inactive, not in good standing
⬛️ = job completed