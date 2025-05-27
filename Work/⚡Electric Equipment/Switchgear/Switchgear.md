---
---

```button
name QuickAdd: ⚡Create New Switchgear
type command
action QuickAdd: ⚡Create New Switchgear
```

```dataview
table site as "Site", ocpd as "OCPD", trip_unit as "Trip Unit", plug_size As "Plugged At", relays as "Relay", em_power_nearby as "EM 120V", status as "Record"
from "Work/⚡Electric Equipment/Switchgear"
where contains(file.path, "Switchgear") and file.name != "Switchgear Template" and file.name != "Switchgear"
sort file.name asc

```
