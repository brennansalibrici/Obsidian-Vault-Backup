---
searchTerm: ""
---

```meta-bind-button
label: Create New 📢 Internal Voice
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
    templateFile: Meta/Templates/me/Foundations/Modal Internal Voice Template.md

```

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/📢 Internal Voices"
where status = null and file.name != "📢 Internal Voices"
sort file.name asc 
```

#### Search By Title:
`INPUT[text:searchTerm]`

### Completed File List
```dataview
table voice_type As "Type", voice_style as "Style", tone as "Tone", recurring_phrase as "Phrase", status as "Status"
from "ME/🏛️ Foundations/📢 Internal Voices"
where file.name != "📢 Internal Voices" and status != null and icontains(title,this.searchTerm)
sort file.name asc 

```
