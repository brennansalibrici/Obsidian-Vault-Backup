---
Status: 
Links:
  - "[[Personal Knowledge Management]]"
Created: 2023-05-07T11:51:13
fileClass: moc
---

## Notes
- [[Obsidian Features]]
### Personal use cases
- [[My Plugins]]
- [[Obsidian Hotkeys]]

## Queries

### Notes

<!-- Deprecated query: #input or #inputCollection tag being removed. Replace with field:: type = "input" or "inputCollection"
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
## Supporting Docs
### Plugins
[QuickAdd](https://quickadd.obsidian.guide/docs/)
[ToDoist](https://jamiebrynes7.github.io/obsidian-todoist-plugin/docs/overview)
