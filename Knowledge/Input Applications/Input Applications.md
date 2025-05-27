---
Links: ["[[Inputs/My Books/Books]]"]
Created: 2023-05-08T01:12:27
fileClass: view
---

```button
name QuickAdd: 💪 Create Book Application Note
type command
action QuickAdd: 💪 Create Book Application Note
```

## By Status

### No Status

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort file.mtime desc
``` -->

### Backlog 🟥

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟥")
sort file.mtime desc
``` -->

### Active 🟨

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟨")
sort file.mtime desc
``` -->

### Finished 🟩

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟩")
sort file.mtime desc
``` -->

### Archived ⬛️

<!-- Deprecated query: #output  tag being removed. Replace with field:: type = "output"
```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "⬛️")
sort file.mtime desc
``` -->
