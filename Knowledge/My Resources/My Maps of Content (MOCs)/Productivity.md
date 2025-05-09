---
Status: 
tags: 
Links: 
Created: 2023-06-04T11:29:30
fileClass: moc
---

## Notes

## Queries

### Notes

<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
list from [[]] AND !outgoing([[]]) AND !#input AND !#thought AND !"Hidden"
sort file.mtime desc
``` -->

### Inputs

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
```dataview
table tags as Type, Links, Created
from [[]] AND #input AND !"Hidden"
sort file.mtime desc
``` -->

### Thoughts

<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
table Created
from [[]] AND #thought AND !"Hidden"
sort file.mtime desc
``` -->
