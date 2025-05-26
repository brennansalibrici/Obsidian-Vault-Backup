---
# CLASS DEFINITION
fileClass: job

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
notes: notes
related: []
media: []
attachments: []

# JOB DEFINITION
job_name: "{{VALUE:Job Name}}"
site: "{{VALUE:Site}}"
job_number: "{{VALUE:Job Number}}"
pk_pm: "{{VALUE:Project Manager}}"
scope_of_work: "{{VALUE:ATS,Generator,GFR,GHUPS,IR,LVPM,MVPM,Data Collection}}"
start_date: "{{VALUE:Start Date}}"
bid_number_of_days: "{{VALUE: Bid # of Days}}"

# PEOPLE INVOLVED
pk_guys_onSite: "{{VALUE:ProKey Guys OnSite}}"
site_poc: "{{VALUE:Site POC}}"
subcontractor: "{{VALUE:Subcontractor}}"
sub_poc: "{{VALUE:Sub POC}}"

# JOB ATTRIBUTES
deficiencies: "{{VALUE:Deficiencies}}"
notes: "{{VALUE:Job Notes}}"
related: []
hrs_worked:
  - day_number: ""
    hours: ""
---

## Notes