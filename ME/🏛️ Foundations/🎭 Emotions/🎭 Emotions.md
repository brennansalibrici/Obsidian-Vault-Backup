---
searchTerm: start
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

---
#### Search By Title:
`INPUT[text:searchTerm]`

possible misspellings - needs behind it - 'protection'

### New Ones To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/🎭 Emotions"
where (status = null or status = "-") and file.name != "🎭 Emotions" and icontains(file.name,this.searchTerm)
sort file.name asc 
```

### Completed File List
```dataview
table emotion_group as "Group", emotion_type as "Type", energy_mood as "Energy/Mood", status as "Status"
from "ME/🏛️ Foundations/🎭 Emotions"
where status != null and icontains(title,this.searchTerm) and file.name != "🎭 Emotions" and emotion_group
sort file.name asc 

```
### First Attempt Files
```dataview
table emotion_group as "Group", emotion_type as "Type", energy_mood as "Energy/Mood", status as "Status"
from "ME/🏛️ Foundations/🎭 Emotions"
where icontains(title,this.searchTerm) and file.name != "🎭 Emotions" and !emotion_group
sort file.name asc 
```
