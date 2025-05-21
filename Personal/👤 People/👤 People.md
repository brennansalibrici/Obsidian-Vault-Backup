---
Links: 
Created: 2023-05-13T03:55:06
fileClass: view
---

```button
name QuickAdd: 👤 Create Person Note
type command
action QuickAdd: 👤 Create Person Note
```

```dataview
table full_name As "Name"
from ""
where contains(file.path, "People") and file.name != "👤 POCs" and file.name != "👤 People"
sort file.name asc

```

## By Relationship
### None
<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE MBTI, Sentence
from #person AND !"Hidden"
where !contains(file.tags, "/")
sort file.ctime desc
``` -->

### Family

<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE MBTI, Sentence
from #person/family AND !"Hidden"
sort file.name asc
``` -->

### Work

<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE MBTI, Sentence
from #person/work AND !"Hidden"
sort file.name asc
``` -->

### Friend

<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE MBTI, Sentence
from #person/friend AND !"Hidden"
sort file.name asc
``` -->

## Keep In Touch

### Catch up with

For people I haven't talked to in over a month 🤯

<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE LastChatted, date(today) - date(LastChatted) as "Days"
from #person
where KeepInTouch and (date(today) - date(LastChatted) >= dur(1 month))
sort LastChatted asc
``` -->

## All
### By Alphabetical Order

<!-- Deprecated query: #person tag being removed. Replace with field:: type = "person"
```dataview
TABLE MBTI, Sentence
from #person AND !"Hidden"
sort file.name
``` -->
