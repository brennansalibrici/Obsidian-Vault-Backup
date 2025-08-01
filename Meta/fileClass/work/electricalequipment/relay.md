---
fields:
  - name: relay_manufacturer
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Meta/fileClass/work/electricalequipment/equipment/relay manufacturer list.md
    path: ""
    id: MJKKSj
  - name: relay_model
    type: Input
    options: {}
    path: ""
    id: qZsiE4
  - name: relay_type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Ground Fault
        "2": Phase Loss
    path: ""
    id: ZWjFMD
  - name: trip_type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Residual
        "2": Capacitive TripUnit
        "3": Shunt
    path: ""
    id: FsiqhF
version: "2.28"
limit: 20
mapWithTag: false
icon: waypoints
tagNames: 
filesPaths:
  - Work/⚡Electric Equipment/Relays
bookmarksGroups: 
excludes: 
extends: work/electricalequipment/equipment/equipment
savedViews: []
favoriteView: 
fieldsOrder:
  - MJKKSj
  - qZsiE4
  - ZWjFMD
  - FsiqhF
---
