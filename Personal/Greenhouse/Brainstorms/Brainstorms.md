---
Links:
  - "[[Home]]"
Created: 2023-05-08T07:19:51
fileClass: view
---

```button
name QuickAdd: 💡 Create Brainstorm Note
type command
action QuickAdd: 💡 Create Brainstorm Note
```

## By Status

### No Status

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created, Links
FROM #output/brainstorm AND !"Hidden"
WHERE !Status
sort file.mtime desc
```-->

### Backlog 🟥

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created, Links
FROM #output/brainstorm AND !"Hidden"
WHERE contains(Status, "🟥")
sort file.mtime desc
``` -->

### Active 🟨

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created, Links
FROM #output/brainstorm AND !"Hidden"
WHERE contains(Status, "🟨")
sort file.mtime desc
``` -->

### Finished 🟩

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created, Links
FROM #output/brainstorm AND !"Hidden"
WHERE contains(Status, "🟩")
sort file.mtime desc
``` -->

### Finished ⬛️

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created, Links
FROM #output/brainstorm AND !"Hidden"
WHERE contains(Status, "⬛️")
sort file.mtime desc
``` -->
