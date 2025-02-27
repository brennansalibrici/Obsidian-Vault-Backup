---
tags: "view/note"
Links: "[[My Inputs]]"
Created: 2023-05-08T06:51:29
---

## By Status

### No Status

```dataview
table Created, Links, Source
FROM  #input/videos AND !"Hidden"
WHERE !Status OR contains(Status, "No Status")
sort Created desc
```

### Not Started 🟥

```dataview
table Created, Links, Source
FROM  #input/videos
WHERE contains(Status, "🟥")
sort Created desc
```

### Consuming Media 🟧

```dataview
table Created, Links, Source
FROM  #input/videos
WHERE contains(Status, "🟧")
sort Created desc
```

### Implementation 🟨

```dataview
table Created, Links, Source
FROM  #input/videos
WHERE contains(Status, "🟨")
sort Created desc
```

### Finished 🟩

```dataview
table Created, Links, Source
FROM  #input/videos
WHERE contains(Status, "🟩")
sort Created desc
```

### Archived ⬛️

```dataview
table Created, Links, Source
FROM  #input/videos
WHERE contains(Status, "🟩")
sort Created desc
```
