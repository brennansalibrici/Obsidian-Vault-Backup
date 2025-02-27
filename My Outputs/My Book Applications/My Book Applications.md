---
tags: "view/note"
Links: "[[My Books]]"
Created: 2023-05-08T01:12:27
---

```button
name QuickAdd: 💪 Create Book Application Note
type command
action QuickAdd: 💪 Create Book Application Note
```

## By Status

### No Status

```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort file.mtime desc
```

### Backlog 🟥

```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟥")
sort file.mtime desc
```

### Active 🟨

```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟨")
sort file.mtime desc
```

### Finished 🟩

```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "🟩")
sort file.mtime desc
```

### Archived ⬛️

```dataview
table Created
FROM #output/bookapplications AND !"Hidden"
WHERE contains(Status, "⬛️")
sort file.mtime desc
```
