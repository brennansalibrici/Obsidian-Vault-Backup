---
Created: 2025-04-25T07:26:54
limit: 100
mapWithTag: false
icon: package
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: work/electricalequipment/equipment/equipment
savedViews: []
favoriteView: 
fieldsOrder:
  - ioAQL8
  - 2h4UcW
  - t5YLXU
  - LNOWE4
  - MJFdtq
  - 2GK4LU
  - L0t8f6
  - Yj6dG7
  - Z8n7fl
  - rWpuQL
  - wVAVzo
  - xnDHj6
  - 6ax55d
version: "2.29"
fields:
  - name: Switchgear Type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Main Breaker
        "2": Bolted Pressure Switch
        "3": Main Breaker _Remote Distribution
        "4": Main_Tie_Main
    path: ""
    id: wVAVzo
  - name: OCPD Type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Breaker
        "2": Fuses
    path: ""
    id: xnDHj6
  - name: EM Power Nearby
    type: Boolean
    options: {}
    path: ""
    id: 6ax55d
  - name: OCPD Manufacturer
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList:
        "1": ABB
        "2": Eaton
        "3": GE
        "4": Seimens
        "5": SqaureD
      valuesListNotePath: Hidden/fileClass/work/electricalequipment/ocpd/ocpdmanufacturer_list.md
    path: ""
    id: rWpuQL
  - name: OCPD Rating
    type: Input
    options: {}
    path: ""
    id: Z8n7fl
  - name: TripUnit
    type: Input
    options: {}
    path: ""
    id: Yj6dG7
  - name: GF Relay Manufacturer
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Hidden/fileClass/work/electricalequipment/ocpd/ocpdmanufacturer_list.md
    path: ""
    id: L0t8f6
  - name: PL Relay Manufacturer
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Hidden/fileClass/work/electricalequipment/ocpd/ocpdmanufacturer_list.md
    path: ""
    id: 2GK4LU
  - name: GF Relay
    type: Boolean
    options: {}
    path: ""
    id: MJFdtq
  - name: PL Relay
    type: Boolean
    options: {}
    path: ""
    id: LNOWE4
  - name: Site
    type: File
    options: {}
    path: ""
    id: t5YLXU
  - name: Breaker Type
    type: Input
    options: {}
    path: ""
    id: 2h4UcW
  - name: TripUnit Model
    type: Input
    options: {}
    path: ""
    id: ioAQL8
---
