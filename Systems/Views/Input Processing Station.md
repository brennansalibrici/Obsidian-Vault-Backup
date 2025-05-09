---
Links:
  - "[[Home]]"
Created: 2024-04-01T03:24:34
Description: All notes that still need to be processed
fileClass: view
---
To keep track of all notes that are still in progress.

For notes in progress of being developed:
## Inputs
[[Inputs]]
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table Created, rating, source
FROM  #input AND !"Hidden"
WHERE contains(Status, "🟧") OR contains(Status, "🟨")
SORT Created desc
``` -->
## Meetings
[[Meetings]]
<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE Attendees, Summary
FROM #meeting AND !"Hidden"
WHERE contains(Status, "🟨")
SORT Created DESC
``` -->
## Evergreen Notes
[[Personal/Greenhouse/Greenhouse]]
```dataview
table Created
from !"Hidden"
where contains(Status, "🌱") OR contains(Status, "🌿") 
sort Created desc
```