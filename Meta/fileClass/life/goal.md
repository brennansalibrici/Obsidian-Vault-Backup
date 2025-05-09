---
limit: 100
mapWithTag: true

excludes: 
extends: 
version: "2.11"
fields:
  
  - id: rzS9AV
    name: Order
    options: {}
    type: Number
    path: ""
  - name: Description
    type: Input
    options: {}
    path: ""
    id: hmQTIn
  - name: Why
    type: Input
    options: {}
    path: ""
    id: 8Uaq3K
  - id: 7ascQf
    name: Status
    options:
      valuesList:
        "1": 🟥
        "2": 🟨
        "3": 🟩
        "4": ⬛️
      sourceType: ValuesListNotePath
      valuesListNotePath: Hidden/Utilities/Basic Status Values.md
      valuesFromDVQuery: ""
    type: Select
    path: ""
  
tagNames: 
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - 7ascQf
  - tT9vVU
  - hmQTIn
  - 8Uaq3K
  - QGiJjb
  - JaPuTU
  - rzS9AV
---
<!-- Deprecated query: #goal tag (and all other #tags) being removed from the frontmatter. Replace with field:: type = "goal"
- id: QGiJjb
    name: Timeframe
    options:
      dvQueryString: dv.pages("#reviews").filter(p => !p.file.path.includes('Hidden'))
    type: File
    path: ""
  - id: JaPuTU
    name: Area
    options:
      dvQueryString: dv.pages("#area").filter(p => !p.file.path.includes('Hidden'))
    type: File
    path: ""
  - - name: Parent
    type: File
    options:
      dvQueryString: dv.pages('#goal').filter(p => !p.file.path.includes('Hidden'))
    path: ""
    id: tT9vVU
-->