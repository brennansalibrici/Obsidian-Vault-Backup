---
# CLASS DEFINITION
fileClass: person

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

# PERSON DEFINITION
full_name: "{{VALUE:Full Name}}"
person_type: "{{VALUE:Family,Friend,Work,Other,POC}}"
phone:
  - phone_label: "Mobile"
    phone_number: "{{VALUE:Phone Number}}"
email:
  - email_label: "Personal"
    email_address: "{{VALUE:Email Address}}"
last_chatted: null

# CONTENT & RELATIONSHIPS:
notes: "{{VALUE:Notes}}"
related: []
media: []
attachments: []


---

## Details
---

## Events
---

## Conversations
---
Query in here


## Thoughts
---
Query in here


## Questions To Ask
---
Query in here
