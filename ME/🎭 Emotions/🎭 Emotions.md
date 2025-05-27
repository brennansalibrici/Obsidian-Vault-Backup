---
---

```button
name QuickAdd: 🎭 Create New Emotion
type command
action QuickAdd: 🎭 Create New Emotion
```

```dataview
table emotion_category as "Category", emotion_type as "Type", energy_mood as "Energy/Mood"
from "ME/🎭 Emotions"
where file.name != "🎭 Emotions" and file.name != "🎭 Emotions"
sort file.name asc

```
