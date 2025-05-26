---
# CLASS DEFINITION:
fileClass: customer

# **INHERITS FROM GLOBAL TEMPLATE:
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
title: <% tp.file.title %>

# STATUS & WORKFLOW FIELDS
status: [🟩 complete]
type: []
tags: []
category: note
entered: true
archived: false
priority: [⚪ None]
visibility: 🔒 private

# CUSTOMER DEFINITION:
name: "{{VALUE:Name}}"
customer_status: 🟩
site_rules: []

notes: "{{VALUE:Notes}}"
related: []
media: []
attachments: []
---

## Notes
---


