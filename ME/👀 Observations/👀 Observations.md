---
---

```button
name QuickAdd: 👀 Create New Observation
type command
action QuickAdd: 👀 Create New Observation
```

### Observations To Review
---
```dataview
table created as "Date/Time"
from "ME/👀 Observations"
where contains(status, "review")
sort file.name asc 

```

### All Observations
```dataview
table created as "Date/Time"
from "ME/👀 Observations"
where file.name != "👀 Observations" and file.name != "👀 Observations" and !contains(status, "review")
sort file.name asc 

```

