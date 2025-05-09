---
Links:
  - "[[Inputs]]"
Created: 2023-05-08T12:55:10
fileClass: view
---

## By Status

### No Status

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE !Status
SORT started desc
``` -->

### Not Started 🟥

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE contains(Status, "🟥")
SORT started desc
``` -->

### Consuming Media 🟧

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE contains(Status, "🟧")
SORT started desc
``` -->

### Implementation 🟨

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE contains(Status, "🟨")
SORT started desc
``` -->

### Finished 🟩

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE contains(Status, "🟩")
SORT started desc
``` -->

### Archived ⬛

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/articles AND !"Hidden"
WHERE contains(Status, "⬛️")
SORT started desc
``` -->
