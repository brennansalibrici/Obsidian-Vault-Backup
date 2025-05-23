---
# CLASS DEFINITION:
fileClass: switchgear

# **INHERITS FROM GLOBAL TEMPLATE**
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
title: <% tp.file.title %>

# STATUS & WORKFLOW FIELDS:
status: [🟧 in progress]
type: []
tags: []
category: note
entered: false
archived: false
priority: [⚪ None]
visibility: 🔒 private

# SWITCHGEAR DEFINITION:
customer: "{{VALUE:Customer}}"
site: "{{VALUE:Site}}"
switchgear_type: "{{VALUE:Main Breaker,Bolted Pressure Switch,Main Breaker _Remote Distribution,Main_Tie_Main}}"
ocpd_type: "{{VALUE:Breaker,Fuses}}"
ocpd: "{{VALUE:OCPD}}"
trip_unit: "{{VALUE:Trip Unit}}"
plug_size: "{{VALUE:Plug Size}}"
relays: "{{VALUE: Relays}}"
em_power_nearby: "{{VALUE:true,false}}"

# CONTENT & RELATIONSHIPS:
notes: notes
related: []
media: "{{VALUE:Pics/Folder Links}}"
attachments: []
---

## Notes