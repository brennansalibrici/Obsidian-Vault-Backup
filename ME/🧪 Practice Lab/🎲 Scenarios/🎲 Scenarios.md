---
---

```button
name QuickAdd: 🎲 New Scenario
type command
action QuickAdd: 🎲 New Scenario
```

### Scenarios
```dataview
table id as "ID", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🎲 Scenarios"
where file.name != "🎲 Scenarios"
sort file.name asc 

```
