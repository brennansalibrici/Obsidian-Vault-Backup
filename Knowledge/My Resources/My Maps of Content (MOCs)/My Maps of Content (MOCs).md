---
Links:
  - "[[Home]]"
Created: 2023-05-08T08:31:55
fileClass: view
---

```button
name QuickAdd: 🗺️ Create MOC Note
type command
action QuickAdd: 🗺️ Create MOC Note
```

## Manually Organized
%% Type them out here for your own hierarchical directory %%

## By Last Modified

<!-- Deprecated query: #moc  tag being removed. Replace with field:: type = "moc"
```dataview
table file.mday
from #moc and !outgoing([[]]) and !"Hidden"
sort file.mday desc
limit 10
``` -->

## By Alphabetical

<!-- Deprecated query: #moc  tag being removed. Replace with field:: type = "moc"
```dataview
list
from #moc and !outgoing([[]]) and !"Hidden"
sort file.name asc
``` -->

## By Amount of Links

<!-- Deprecated query: #moc  tag being removed. Replace with field:: type = "moc"
```dataview
TABLE length(file.outlinks) + length(file.inlinks) as "Total Links", length(file.outlinks) as Outgoing, length(file.inlinks) as Backlinks FROM #moc AND !"Hidden" SORT length(file.outlinks) + length(file.inlinks) desc
``` -->
