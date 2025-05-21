---
fields:
  - name: id
    type: Input
    options: {}
    path: ""
    id: 3HN2Ss
  - name: archived
    type: Boolean
    options: {}
    path: ""
    id: QfM78Q
  - name: title
    type: Input
    options: {}
    path: ""
    id: GA3zqI
  - name: notes
    type: Input
    options: {}
    path: ""
    id: a9vDBu
  - name: created
    type: DateTime
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD HH:mm
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: ai940O
  - name: last_modified
    type: DateTime
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD HH:mm
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: tGAYij
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🟥 draft
        "2": 🟧 in progress
        "3": 🟨 review
        "4": 🟩 complete
        "5": 🟦 archived
        "6": ⬛️ blocked
    path: ""
    id: 4GPS9S
  - name: source
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: lOArsn
  - name: descriptor
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Observed
        "2": Website
        "3": Email
        "4": Cloud Drive
    path: lOArsn
    id: 8BGZNn
  - name: link
    type: File
    options: {}
    path: lOArsn
    id: r1UBS1
  - name: media
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: vWDsj1
  - name: media type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": picture
        "2": video
        "3": audio
    path: vWDsj1
    id: ppPovD
  - name: media link
    type: Media
    options:
      embed: false
      folders: []
      display: card
      thumbnailSize: "100"
    path: vWDsj1
    id: Ci0lcd
  - name: type
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Meta/fileClass/_global/global type value list.md
    path: ""
    id: a2W2LQ
  - name: entered
    type: Boolean
    options: {}
    path: ""
    id: jNIT0q
  - name: tags
    type: Multi
    options:
      sourceType: ValuesList
      valuesList: {}
    path: ""
    id: s8ymuU
  - name: related
    type: MultiFile
    options: {}
    path: ""
    id: UnkJCH
  - name: category
    type: Select
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: Meta/fileClass/_global/global category values.md
    path: ""
    id: SdRHic
  - name: priority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🔴 High
        "2": 🟠 Medium
        "3": 🟢 Low
        "4": ⚪ None
    path: ""
    id: 3loPAo
  - name: visibility
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🔒 private
        "2": 👁️ internal
        "3": 🌐 external
    path: ""
    id: ChIQSc
version: "2.125"
limit: 20
icon: package
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - 3HN2Ss
  - ai940O
  - tGAYij
  - GA3zqI
  - 4GPS9S
  - a2W2LQ
  - s8ymuU
  - SdRHic
  - jNIT0q
  - QfM78Q
  - 3loPAo
  - ChIQSc
  - a9vDBu
  - UnkJCH
  - lOArsn
  - 8BGZNn
  - r1UBS1
  - vWDsj1
  - ppPovD
  - Ci0lcd
mapWithTag: false
---
