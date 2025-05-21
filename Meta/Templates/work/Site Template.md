---
# CLASS DEFINITION
fileClass: site

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
customer: "{{VALUE:Customer}}"
siteName: "{{VALUE:Site Name}}"
siteStatus: "🟩"
siteAddress:
  streetAddress: "{{VALUE:Street Address}}"
  city: "{{VALUE:City}}"
  state: "{{VALUE:AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY}}"
  zip: "{{VALUE:Zip}}"
switchgear: []
jobs: []


---
## Notes