---
---

```meta-bind-button
label: Create New 🎭 Emotion
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: ""
hidden: false
actions:
  - type: runTemplaterFile
    templateFile: Meta/Templates/me/Foundations/Modal Emotion Template.md

```

possible misspellings - needs behind it - 'protection'

```dataview
table emotion_group as "Group", emotion_type as "Type", energy_mood as "Energy/Mood"
from "ME/🏛️ Foundations/🎭 Emotions"
where file.name != "🎭 Emotions" and file.name != "🎭 Emotions"
sort file.name asc 

```
