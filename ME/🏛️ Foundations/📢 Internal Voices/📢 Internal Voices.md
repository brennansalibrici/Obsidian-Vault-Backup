---
searchTerm: unlovable
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

---
#### Search By Title:
`INPUT[text:searchTerm]`

### To Review
```dataview
table status as "Status"
from "ME/🏛️ Foundations/📢 Internal Voices"
where (status = null or status = "-") and file.name != "📢 Internal Voices" and icontains(file.name,this.searchTerm)
sort file.name asc 
```

### Completed File List
```dataview
table voice_type As "Type", voice_style as "Style", tone as "Tone", recurring_phrase as "Phrase", status as "Status"
from "ME/🏛️ Foundations/📢 Internal Voices"
where file.name != "📢 Internal Voices" and status != null and icontains(title,this.searchTerm)
sort file.name asc 

```
