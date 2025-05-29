---
# CLASS DEFINITION:
fileClass: capturedMoment

# **INHERITS FROM GLOBAL TEMPLATE:
# CORE IDENTITY FIELDS:
id: <% tp.date.now("x") %>
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <% tp.date.now("YYYY-MM-DD HH:mm") %>
title: <% tp.file.title %>

# STATUS & WORKFLOW FIELDS
status: [🟨 review]
type: []
tags: []
category: note
entered: true
archived: false
priority: [⚪ None]
visibility: 🔒 private

# CAPTURED MOMENT DEFINITION:
source_daily_note: [[<% tp.date.now("YYYY-MM-DD") %>]]
importance: "{{VALUE:Small Win,Big Milestone,Breakthrough,Deep Grief,Hopeful Shift,AHA Moment,Encouragement,Personal Truth,Relationship Guide,Pattern Shift,Triggering Event,Other}}"
feelings: "{{VALUE:Feelings}}"
people: "{{VALUE:People}}"
theme: "{{VALUE:Theme}}"
summary: "{{VALUE:Summary}}"

notes: []
related: []
media: []
attachments: []
---

## Context
---
{{VALUE:Context}}

## Reflection
---
{{VALUE:Reflection}}

## Notes 
---
{{VALUE:Captured Moment Notes}}

## Links
---


