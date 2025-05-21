---
# CLASS DEFINITION
fileClass: customer

# INHERITS FROM GLOBAL TEMPLATE
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
priority: ⚪ None
visibility: 🔒 private

# CONTENT & RELATIONSHIPS:
notes: "{{VALUE:Notes}}"
related: []

# SOURCE BLOCK:
source:
  - descriptor: ""
    link: ""

# MEDIA BLOCK:
media:
  - media type: ""
    media link: ""

# CUSTOMER DEFINITION
customer status: "🟩"
name: "{{VALUE:Name}}"
site Rules: []
---

## Notes
---


