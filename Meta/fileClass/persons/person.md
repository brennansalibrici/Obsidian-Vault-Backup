---
tags: 
mapWithTag: true
fields:
  - name: LastChatted
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 03eVs6
  - name: Summary
    type: Input
    options: {}
    path: ""
    id: zj3X3F
  - name: Full Name
    type: Input
    options: {}
    path: ""
    id: k4woZR
  - name: Type
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
  - name: Phone
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: H91N40
  - name: Label
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": mobile
        "2": work
        "3": direct
        "4": home
        "5": other
    path: H91N40
    id: shuiGd
  - name: Phone
    type: Input
    options: {}
    path: H91N40
    id: LAZlva
  - name: Email
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: tDtjqv
  - name: Label
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": personal
        "2": work
        "3": other
    path: tDtjqv
    id: iISp3Y
  - name: Email
    type: Input
    options: {}
    path: tDtjqv
    id: 1DARUS
version: "2.35"
limit: 100
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - tDtjqv
  - 1DARUS
  - iISp3Y
  - H91N40
  - shuiGd
  - LAZlva
  - kUNAvn
  - k4woZR
  - 03eVs6
  - zj3X3F
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
