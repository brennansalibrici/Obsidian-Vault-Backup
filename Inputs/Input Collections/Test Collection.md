---
Status: 
Links: 
Created: 2023-09-08T03:34:56
Author: 
Finished: 
Rating: 
Source: 
fileClass: inputCollection
---
## All Inputs
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Status, Created
from [[]] and #inputCollection
where contains(Collection, [[]])
Sort Created desc
``` -->
## By Status
### No Status
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, source
FROM  [[]] and #input AND !"Hidden"
where !Status AND contains(Collection, [[]])
SORT Created desc
``` -->

### Not Started 🟥
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, source
FROM  [[]] and #input AND !"Hidden"
where contains(Collection, [[]]) AND contains(Status, "🟥")
SORT Created desc
``` -->
### Consuming Media 🟧
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, source
FROM  [[]] and #input AND !"Hidden"
where contains(Collection, [[]]) AND contains(Status, "🟧")
SORT Created desc
``` -->
### Implementation 🟨
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, Links, source
FROM  [[]] and #input AND !"Hidden"
where contains(Collection, [[]])  AND contains(Status, "🟨")
SORT Created desc
``` -->
### Finished 🟩
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table finished, rating, source
FROM  [[]] and #input AND !"Hidden"
where contains(Collection, [[]])  AND contains(Status, "🟩")
SORT Created desc
``` -->
### Archived ⬛️
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table finished, rating, source
FROM  [[]] and #input AND !"Hidden"
where contains(Collection, [[]]) AND contains(Status, "⬛️")
SORT Created desc
``` -->