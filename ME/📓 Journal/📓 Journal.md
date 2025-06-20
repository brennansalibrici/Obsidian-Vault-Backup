---
---

```meta-bind-button
label: New Integration 🔁 Journal Entry
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
    templateFile: Meta/Templates/me/Emotional Growth Journal/Modal Integration Journal Template.md

```

```meta-bind-button
label: New Reflection 🪞 Journal Entry
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
    templateFile: Meta/Templates/me/Emotional Growth Journal/Modal Reflection Journal Template.md

```

### Integration Journal Entries
```dataview
table summary as "Summary", created as "Date/Time"
from "ME/📓 Journal"
where journal_type = "Integration"
sort file.name asc 

```

### Reflection Journal Entries
```dataview
table summary as "Summary", created as "Date/Time"
from "ME/📓 Journal"
where journal_type = "Reflection"
sort file.name asc 

```
