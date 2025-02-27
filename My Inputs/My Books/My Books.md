---
tags: view/note
Links: "[[My Home]]"
Created: 2023-05-07T11:51:13
---

```button
name QuickAdd: 📚 Add Book Input
type command
action QuickAdd: 📚 Add Book Input
```

To make the most of your books, see [[My Book Applications]]
## By Status

### No Status

```dataview
table Created, Links, Source
FROM  #input/books AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort Created desc
```

### Not Started 🟥

```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟥")
sort Created desc
```

### Consuming Media 🟧

```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟧")
sort Created desc
```

### Implementation 🟨

```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟨")
sort Created desc
```

### Finished 🟩

```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "🟩")
sort Created desc
```

### Archived ⬛️

```dataview
table Created, Links, Source
FROM  #input/books
WHERE contains(Status, "⬛️")
sort Created desc
```
