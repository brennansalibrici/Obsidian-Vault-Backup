---
---

```button
name QuickAdd: 🎙️New Rehearsal
type command
action QuickAdd: 🎙️New Rehearsal
```

### Live Rehearsals
```dataview
table scenario as "Scenario", people as "People", created as "Date/Time"
from "ME/🧪 Practice Lab/🎙️ Live Rehearsals"
where file.name != "🎙️ Live Rehearsals"
sort file.name asc 

```
