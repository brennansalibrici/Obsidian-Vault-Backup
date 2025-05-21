---
---

```button
name QuickAdd: Create New Breaker
type command
action QuickAdd: Create New Breaker
```

```dataview
table breaker_manufacturer as "Manufacturer", breaker_model as "Model", frame_size as "Frame Size", current_rating As "Max Current Rating", shunt as "Shunt Trips"
from ""
where contains(file.path, "Breakers") and file.name != "Breaker Template" and file.name != "Breakers"
sort file.name asc

```

