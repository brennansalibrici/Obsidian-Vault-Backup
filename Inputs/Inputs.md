---
Links:
  - "[[Home]]"
Created: 2023-05-07T11:51:13
fileClass: view
---
Refer to [[My Inputs Workflow]]

```button
name QuickAdd: 📥 Add General Input
type command
action QuickAdd: 📥 Add General Input
```

## By Status
### No Status

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, tags as Tag, Links, Source
FROM  #input AND !"Hidden"
WHERE !Status
SORT tags desc
``` -->

### Backlog 🟥

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input AND !"Hidden"
WHERE contains(Status, "🟥")
SORT Created desc
``` -->

### Note Taking 🟧

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input AND !"Hidden"
WHERE contains(Status, "🟧")
SORT Created desc
``` -->

### Processing 🟨

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input AND !"Hidden"
WHERE contains(Status, "🟨")
SORT Created desc
``` -->

### Finished 🟩

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input AND !"Hidden"
WHERE contains(Status, "🟩")
SORT Created desc
``` -->

### Archived ⬛️

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input AND !"Hidden"
WHERE contains(Status, "⬛️")
SORT Created desc
``` -->
