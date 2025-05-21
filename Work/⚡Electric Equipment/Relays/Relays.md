---
---

```button
name QuickAdd: Create New Relay
type command
action QuickAdd: Create New Relay
```

```dataview
table relay_manufacturer as "Manufacturer", relay_model as "Model", relay_type as "Type", trip_type as "Tripping Means"
from ""
where contains(file.path, "Relays") and file.name != "Relay Template" and file.name != "Relays"
sort file.name asc

```

