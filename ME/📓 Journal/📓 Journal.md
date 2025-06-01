---
---

```button
name QuickAdd: 🪞 New Reflection Journal Entry
type command
action QuickAdd: 🪞 New Reflection Journal Entry
```

```button
name QuickAdd: 🔁 New Integration Journal Entry
type command
action QuickAdd: 🔁 New Integration Journal Entry
```

### Reflection Journal Entries
```dataview
table summary as "Summary", created as "Date/Time"
from "ME/📓 Journal"
where journal_type = "Reflection"
sort file.name asc 

```

### Integration Journal Entries
```dataview
table summary as "Summary", created as "Date/Time"
from "ME/📓 Journal"
where journal_type = "Integration"
sort file.name asc 

```

