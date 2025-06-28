---
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

```dataview
table voice_type As "Type", voice_style as "Style", tone as "Tone", recurring_phrase as "Phrase"
from "ME/🏛️ Foundations/📢 Internal Voices"
where file.name != "📢 Internal Voices"
sort file.name asc 

```
