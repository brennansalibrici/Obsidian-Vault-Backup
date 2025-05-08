---
Status: 
Links: 
Created: 2025-05-05T12:07:42
fileClass: moc
---
## Notes

## Queries
### To Develop

```dataview
list
from [[]] AND !"Hidden"
where contains(Links, this.file.link) and contains(file.frontmatter.Status, "🌱")
sort file.mtime desc
```

### Notes
```dataview
list from [[]] AND !outgoing([[]]) AND !#input AND !#thought AND !"Hidden"
sort file.mtime desc
```

### Inputs

```dataview
table tags as Type, Links, Created
from [[]] AND #input AND !"Hidden"
sort file.mtime desc
```

### Thoughts

```dataview
table Created
from [[]] AND #thought AND !"Hidden"
sort file.mtime desc
```
