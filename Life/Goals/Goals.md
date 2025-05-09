---
Links:
  - "[[Home]]"
Created: 2024-01-04T04:07:26
cssclasses:
  - cards
  - cards-cols-3
fileClass: note
---

## By Status

### Backlog 🟥

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
FROM #goal AND !"Hidden"
WHERE contains(Status, "🟥")
sort file.mtime desc
``` -->

### Active 🟨

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Timeframe, Area
FROM #goal AND !"Hidden"
WHERE contains(Status, "🟨")
sort file.mtime desc
``` -->

### Finished 🟩

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
FROM #goal AND !"Hidden"
WHERE contains(Status, "🟩")
sort file.mtime desc
``` -->

### Archived ⬛️

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
FROM #goal AND !"Hidden"
WHERE contains(Status, "⬛️")
sort Created desc
``` -->

### No Status

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
FROM #goal AND !"Hidden"
WHERE !Status
sort Created desc
``` -->

## By Timeframe

### Yearly

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
from #goal AND !"Hidden"
where file.frontmatter.Timeframe AND !icontains(file.frontmatter.Timeframe, "Q") AND !icontains(file.frontmatter.Timeframe, "M")
sort Created desc
``` -->

### Quarterly

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
from #goal AND !"Hidden"
where icontains(file.frontmatter.Timeframe, "Q")
sort Created desc
``` -->

### Monthly

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details", Area
from #goal AND !"Hidden"
where icontains(file.frontmatter.Timeframe, "M")
sort Created desc
``` -->
