---
Links:
  - "[[Home]]"
Created: 2023-05-07T11:51:13
fileClass: view
---

```button
name QuickAdd: 💭 Create Thought Note
type command
action QuickAdd: 💭 Create Thought Note
```

## Categories
### None
<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created, Links
from #thought AND !"Hidden"
where !contains(file.tags, "/")
sort file.ctime desc
``` -->

### Memories 
`#thought/memories`
Anecdotes, stories and experiences
<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created, tags, Links
from #thought/memories AND !"Hidden"
sort Created desc
``` -->

### Reflections
`#thought/reflections`
Personal lessons and observations

<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created, tags, Links
from #thought/reflections AND !"Hidden"
sort Created desc
``` -->

### Musings
`#thought/musings`
Random shower ideas and observations

<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created, tags, Links
from #thought/musings AND !"Hidden"
sort Created desc
``` -->
## All
<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created, tags, Links
from #thought AND !"Hidden"
sort Created desc
``` -->
