---
Links:
  - "[[Inputs]]"
Created: 2023-05-08T06:52:03
fileClass: view
---

## By Status

### No Status

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort Created desc
``` -->

### Not Started 🟥

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts
WHERE contains(Status, "🟥")
sort Created desc
``` -->

### Consuming Media 🟧

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts
WHERE contains(Status, "🟧")
sort Created desc
``` -->

### Implementation 🟨

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts
WHERE contains(Status, "🟨")
sort Created desc
``` -->

### Finished 🟩

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts
WHERE contains(Status, "🟩")
sort Created desc
``` -->

### Archived ⬛️

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, Source
FROM  #input/podcasts
WHERE contains(Status, "🟩")
sort Created desc
``` -->
