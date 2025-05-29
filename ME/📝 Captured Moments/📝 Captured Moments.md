---
---

```button
name QuickAdd: 📝 Capture New Moment
type command
action QuickAdd: 📝 Capture New Moment
```

### Captured Moments To Review
```dataview
table created as "Date/Time"
from "ME/📝 Captured Moments"
where contains(status, "review")
sort file.name asc 

```

### All Captured Moments
```dataview
table created as "Date/Time"
from "ME/📝 Captured Moments"
where file.name != "📝 Captured Moments" and file.name != "📝 Captured Moments" and !contains(status, "review")
sort file.name asc 

```

