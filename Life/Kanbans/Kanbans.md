---
Links:
  - "[[Home]]"
  - "[[Projects]]"
Created: 2023-05-07T11:51:16
fileClass: view
---

See [[Kanban Plugin]] for how to use!

```button
name Create Kanban
type command
action QuickAdd: 📌 Create Kanban
```

## All

```dataview
table file.mtime as "Last Modified"
from !"Hidden"
where kanban-plugin = "basic"
sort file.mtime desc
```
