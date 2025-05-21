---
fields:
  - name: current_rating
    type: Input
    options: {}
    path: ""
    id: Em2rnB
  - name: voltage_rating
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 120V
        "2": 208V
        "3": 240V
        "4": 277V
        "5": 480V
        "6": 600V
    path: ""
    id: Er6uKj
  - name: class
    type: Input
    options: {}
    path: ""
    id: uLUBuU
  - name: fuse_manufacturer
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Meta/fileClass/work/electricalequipment/ocpd/fuse manufacturer list.md
    path: ""
    id: NKDIJ6
  - name: fuse_model
    type: Input
    options: {}
    path: ""
    id: Y0jyDi
version: "2.11"
limit: 20
mapWithTag: false
icon: package
tagNames: 
filesPaths:
  - Work/⚡Electric Equipment/Fuses
bookmarksGroups: 
excludes: 
extends: work/electricalequipment/equipment/equipment
savedViews: []
favoriteView: 
fieldsOrder:
  - NKDIJ6
  - Y0jyDi
  - Er6uKj
  - Em2rnB
  - uLUBuU
---
