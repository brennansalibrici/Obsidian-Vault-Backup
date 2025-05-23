---
# CLASS DEFINITION:
fileClass: breaker

# **INHERITS FROM GLOBAL TEMPLATE**
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

# BREAKER DEFINITION
equipment_name: "{{VALUE:Name}}"
equipment_type: Breaker
breaker_manufacturer: "{{VALUE:ABB,GE,Eaton,Siemens,SquareD}}"
breaker_model: "{{VALUE:Model}}"
frame_size: "{{VALUE:Frame Size}}"
current_rating: "{{VALUE:Current Rating}}"
shunt: false

# CONTENT & RELATIONSHIPS
notes: notes
related: []
media: "{{VALUE:Pics/Folder Links}}"
attachments: []
---

## Notes
---

