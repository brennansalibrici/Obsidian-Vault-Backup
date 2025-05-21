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
        "1": mobile
        "2": work
        "3": direct
        "4": home
        "5": other
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
        "1": personal
        "2": work
        "3": other
    path: tDtjqv
    id: iISp3Y
  - name: email_address
    type: Input
    options: {}
    path: tDtjqv
    id: 1DARUS
version: "2.55"
limit: 100
filesPaths:
  - Personal/People
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
