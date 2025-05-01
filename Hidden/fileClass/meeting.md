---
limit: 100
mapWithTag: true

tagNames: 
excludes: 
extends: 
version: "2.2"
fields:
  - id: 94vGHG
    name: Attendees
    options:
      dvQueryString: |-
        dv.pages('#person')
        .filter(p => !p.file.path.includes('Hidden'))
    type: MultiFile
    path: ""
  - id: 8ZTA3T
    command:
      id: insert__presetField__meetingStatus
      icon: list-plus
      label: Insert Status field
    name: meetingStatus
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
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - 8ZTA3T
  - 94vGHG
---
