---
# CLASS DEFINITION
fileClass: fuse

# **INHERITS FROM GLOBAL TEMPLATE**
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
title: <% tp.file.title %>

# STATUS & WORKFLOW FIELDS:
status: [🟩 complete]
type: []
tags: []
category: note
entered: true
archived: false
priority: [⚪ None]
visibility: 🔒 private

# FUSE DEFINITION:
equipment_name: "{{VALUE:Name}}"
equipment_type: Fuse
fuse_manufacturer: "{{VALUE:SquareD,Cutler Hammer,Siemens,Eaton,GE,Bussman,ITE,HI-CAP,Fusetron,Gould,Ferraz-Shawmut}}"
fuse_model: "{{VALUE:Model}}"
voltage_rating: "{{VALUE:Voltage Rating}}"
current_rating: "{{VALUE:Current Rating}}"
class: "{{VALUE:Class}}"

# CONTENT & RELATIONSHIPS
notes: notes
related: []
media: "{{VALUE:Pics/Folder Links}}"
attachments: []
---

## Notes
---

