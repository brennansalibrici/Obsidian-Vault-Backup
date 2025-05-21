---
# CLASS DEFINITION
fileClass: person

# CORE IDENTITY FIELDS:
id: '<% tp.date.now("x") %>'
created: '<% tp.date.now("YYYY-MM-DD HH:mm") %>'
last_modified: '<% tp.date.now("YYYY-MM-DD HH:mm") %>'
title: <% tp.file.title() %>

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
notes: ""
related: []

# SOURCE BLOCK:
source:
  - descriptor: ""
    link: ""

# MEDIA BLOCK:
media:
  - media type: ""
    media link: ""

# PERSON DEFINITION
full_name: "James Salibrici"
person_type: "Family" 
phone: []
email: []
last_chatted: null
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

## Old Details
## Events
## Conversations
%% Feel free to just make a link to this header if you had a quick conversation with someone that you logged in the `Conversations` part of your daily template %%
<!-- Deprecated query: #conversation tag being removed. Replace with field:: type = "conversation"
```dataview
table file.link as "Conversation"
from ""
where contains(text, "Nate Kinney") and contains(text, "#Conversations")
sort file.ctime desc
``` -->
## Thoughts
<!-- Deprecated query: #thought tag being removed. Replace with field:: type = "thought"
```dataview
TABLE Created, tags
FROM [[]] AND #thought AND !"Hidden"
SORT Created desc
``` -->
## Questions To Ask
%% For next time you chat with them %%: