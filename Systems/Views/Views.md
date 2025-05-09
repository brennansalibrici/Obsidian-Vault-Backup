---
Links:
  - "[[Home]]"
Created: 2024-04-01T07:15:04
fileClass: view
---
To manually organize them beyond just queries you can just modify [[Home]]
## By Type
### Custom
Views that facilitate workflows or are a mix of note types.
<!-- Deprecated query: #view tag being removed. Replace with field:: type = "view"
```dataview
list Description
from #view/custom
sort file.name
``` -->
### Note Type
Views that organize a note type.
For descriptions, see `USV Glossary` [[My published notes]]
<!-- Deprecated query: #view tag being removed. Replace with field:: type = "view"
```dataview
list
from #view/note and !"Hidden"
sort file.name
``` -->
### Fields
<!-- Deprecated query: #view tag being removed. Replace with field:: type = "view"
```dataview
list Description
from #view/field and !"Hidden"
sort file.name
``` -->
### Rest
<!-- Deprecated query: #view tag being removed. Replace with field:: type = "view"
```dataview
table Description
from #view
where !contains(file.tags, "/")
sort file.name
``` -->