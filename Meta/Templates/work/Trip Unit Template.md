---
# CLASS DEFINITION:
fileClass: tripunit

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

# TRIPUNIT DEFINITION:
equipment_name: "{{VALUE:Name}}"
equipment_type: TripUnit
tu_manufacturer: "{{VALUE:ABB,GE,SqaureD,Eaton,Seimens}}"
tu_model: "{{VALUE:Model}}"

# CONTENT & RELATIONSHIPS:
notes: notes
related: []
media: "{{VALUE:Pics/Folder Links}}"
attachments: []
---

## Notes
---


