---
tags: 
mapWithTag: true
fields:
  - name: last_chatted
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 03eVs6
  - name: full_name
    type: Input
    options: {}
    path: ""
    id: k4woZR
  - name: person_type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Family
        "2": Friend
        "3": Work
        "4": Other
        "5": POC
    path: ""
    id: kUNAvn
  - name: phone
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: H91N40
  - name: phone_label
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Mobile
        "2": Work
        "3": Direct
        "4": Home
        "5": Other
    path: H91N40
    id: shuiGd
  - name: phone_number
    type: Input
    options: {}
    path: H91N40
    id: LAZlva
  - name: email
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: tDtjqv
  - name: email_label
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": Personal
        "2": Work
        "3": Other
    path: tDtjqv
    id: iISp3Y
  - name: email_address
    type: Input
    options: {}
    path: tDtjqv
    id: 1DARUS
  - name: practice_lab
    type: Boolean
    options: {}
    path: ""
    id: v3JAxr
version: "2.62"
limit: 100
filesPaths:
  - Personal/👤 People
bookmarksGroups: 
excludes: 
extends: _global/global
savedViews: []
favoriteView: 
fieldsOrder:
  - k4woZR
  - kUNAvn
  - tDtjqv
  - iISp3Y
  - 1DARUS
  - H91N40
  - shuiGd
  - LAZlva
  - 03eVs6
type: 
position: 
site: 
customer: 
status: 
email: 
phone: 
icon: package
tagNames: 
---
