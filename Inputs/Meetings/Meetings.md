---
Links:
  - "[[Home]]"
Created: 2023-05-13T04:12:50
fileClass: note
---

```button
name QuickAdd: 🗣 Create Meeting Note
type command
action QuickAdd: 🗣 Create Meeting Note
```

## By Status

### Not Started 🟥
<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE Attendees, Summary
FROM #meeting AND !"Hidden"
WHERE contains(Status, "🟥")
SORT Created DESC
``` -->

### Processing 🟨
<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE Attendees, Summary
FROM #meeting AND !"Hidden"
WHERE contains(Status, "🟨")
SORT Created DESC
``` -->

### Completed 🟩

<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE Attendees, Summary
FROM #meeting AND !"Hidden"
WHERE contains(Status, "🟩")
SORT Created DESC
``` -->

### Archived ⬛️
<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE Attendees, Summary
FROM #meeting AND !"Hidden"
WHERE contains(Status, "⬛️")
SORT Created DESC
``` -->
## By Date

<!-- Deprecated query: #meeting tag being removed. Replace with field:: type = "meeting"
```dataview
TABLE MeetingDate, Attendees, Summary
from #meeting AND !"Hidden"
sort MeetingDate desc
``` -->
