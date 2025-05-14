---
Links: ["[[Home]]"]
Created: 2023-05-07T11:51:13
fileClass: view
---

```button
name QuickAdd: 📚 Add Book Input
type command
action QuickAdd: 📚 Add Book Input
```

To make the most of your books, see [[Input Applications]]
## By Status

### No Status

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort Created desc
``` -->

### Not Started 🟥

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟥")
sort Created desc
``` -->

### Consuming Media 🟧

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟧")
sort Created desc
``` -->

### Implementation 🟨

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟨")
sort Created desc
``` -->

### Finished 🟩

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟩")
sort Created desc
``` -->

### Archived ⬛️

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "⬛️")
sort Created desc
``` -->
