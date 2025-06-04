---
---

```button
name QuickAdd: 🧠 New Coaching Feedback
type command
action QuickAdd: 🧠 New Coaching Feedback
```

### Coaching Feedback
```dataview
table scenario as "Scenario", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🧠 Coaching"
where file.name != "🧠 Coaching"
sort file.name asc 

```

