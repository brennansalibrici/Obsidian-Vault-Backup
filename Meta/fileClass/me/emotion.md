---
fields:
  - name: energy_mood
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": High Energy Pleasant
        "2": High Energy Unpleasant
        "3": Low Energy Pleasant
        "4": Low Energy Unpleasant
    path: ""
    id: GHUsCk
  - name: definition
    type: Input
    options: {}
    path: ""
    id: bw8PiN
  - name: emotion_type
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList:
        "1": Test
      valuesListNotePath: Meta/fileClass/me/emotion type list.md
    path: ""
    id: 7at9HT
  - name: emotion_category
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Meta/fileClass/me/emotion category list.md
    path: ""
    id: plkN0N
  - name: triggered_by
    type: Input
    options: {}
    path: ""
    id: 9EvYbW
  - name: needs_behind_it
    type: Input
    options: {}
    path: ""
    id: tuQNWC
  - name: opposite
    type: MultiFile
    options: {}
    path: ""
    id: XnPUHF
version: "2.37"
limit: 20
mapWithTag: false
icon: package
tagNames: 
filesPaths:
  - ME/🎭 Emotions
bookmarksGroups: 
excludes: 
extends: global/global
savedViews: []
favoriteView: 
fieldsOrder:
  - XnPUHF
  - GHUsCk
  - plkN0N
  - 7at9HT
  - 9EvYbW
  - tuQNWC
  - bw8PiN
---
