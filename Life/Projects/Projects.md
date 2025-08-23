---
Links: ["[[Home]]"]
Created: 2023-05-07T11:51:16
cssclasses: [cards, cards-cols-3]
fileClass: note
---

```button
name QuickAdd: 🚧 Create Project Note
type command
action QuickAdd: 🚧 Create Project Note
```

## By Status
### No Status
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE !Status
SORT Deadline asc
``` -->
### Elaboration 🟥
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE contains(Status, "🟥")
SORT Deadline asc
``` -->
### Upcoming 🟧
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE contains(Status, "🟧")
SORT Deadline asc
``` -->
### Active 🟨
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE contains(Status, "🟨")
SORT Deadline asc
``` -->
### Finished 🟩
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE contains(Status, "🟩")
SORT Deadline asc
``` -->
### Archived ⬛
<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Deadline, Goal, Area
FROM #project AND !"Hidden"
WHERE contains(Status, "⬛️")
SORT file.name asc
``` -->
