---
# CLASS DEFINITION:
fileClass: relay

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

# RELAY DEFINITION:
equipment_name: "{{VALUE:Name}}"
equipment_type: Relay
relay_manufacturer: "{{VALUE:SEL,GE,SquareD,BoltSwitch,HI-Z}}"
relay_model: "{{VALUE:Model}}"
relay_type: "{{VALUE:Ground Fault,Phase Loss}}"
trip_type: "{{VALUE:Residual,Capacitive TripUnit,Shunt}}"

# CONTENT & RELATIONSHIPS:
notes: notes
related: []
media: "{{VALUE:Pics/Folder Links}}"
attachments: []
---

## Notes
---


