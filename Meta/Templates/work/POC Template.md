---
# CLASS DEFINITION:
fileClass: poc

# **INHERITS FROM GLOBAL TEMPLATE**
# CORE IDENTITY FIELDS:
id: 1751291326489
created: 2025-06-30 08:48
last_modified: 2025-06-30 08:48
title: POC Template

#STATUS & WORKFLOW FIELDS:
status: [🟨 review]
type: []
tags: []
category: note
entered: false
archived: false
priority: [⚪ None]
visibility: 🔒 private

# POC DEFINITION
full_name: "{{VALUE:Full Name}}"
company: "{{VALUE:Company}}"
sites: "{{VALUE:Site}}"
role: "{{VALUE:OM,SSE,Journeyman,Apprentice,Foreman,General Foreman,Project Manager}}"
person_type: POC
phone:
  - phone_label: "Mobile"
    phone_number: "{{VALUE:Phone Number}}"
email:
  - email_label: "Work"
    email_address: "{{VALUE:Email Address}}"
last_chatted: 

# CONTENT AND RELATIONSHIPS:
notes: "{{VALUE:Notes}}"
related: []
media: []
attachments: []
---

## Notes