---
searchTerm: ""
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

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🎭 Emotions"
where status = null and file.name != "🎭 Emotions"
sort file.name asc 
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table emotion_group as "Group", emotion_type as "Type", energy_mood as "Energy/Mood", status as "Status"
from "ME/🏛️ Foundations/🎭 Emotions"
where status != null and file.name != "🎭 Emotions" and emotion_group != null and icontains(title,this.searchTerm)
sort file.name asc 

```
