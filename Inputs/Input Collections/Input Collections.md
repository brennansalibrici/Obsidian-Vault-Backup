---
Links:
  - "[[Home]]"
Created: 2023-09-06T08:16:07
fileClass: view
---

```button
name QuickAdd: 🗄️ Create Input Collection Note
type command
action QuickAdd: 🗄️ Create Input Collection Note
```

## By Type

_Turn into their own notes when they get bigger_

### None

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
TABLE Status, tags, Links
from #inputCollection AND !"Hidden"
where !contains(file.tags, "/")
sort Created desc
``` -->

### Courses
`#inputCollection/course`
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
TABLE Status, tags, Links
from #inputCollection/course AND !"Hidden"
sort Created desc
``` -->

### Series
`#inputCollection/series`
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
TABLE Status, tags, Links
from #inputCollection/series AND !"Hidden"
sort Created desc
``` -->

### Podcasts
`#inputCollection/podcast`
<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
TABLE Status, tags, Links
from #inputCollection/podcast AND !"Hidden"
sort Created desc
``` -->

## By Date

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
TABLE Status, tags, Links
from #inputCollection AND !"Hidden"
sort Created desc
``` -->
