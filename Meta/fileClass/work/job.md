---
tags: 
Created: 2025-04-25T11:32:01
mapWithTag: false
icon: hammer
fields:
  - name: start_date
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: iX9dUw
  - name: scope_of_work
    type: Multi
    options:
      sourceType: ValuesList
      valuesList:
        "1": ATS
        "2": Generator
        "3": GFR
        "4": GHUPS
        "5": IR
        "6": LVPM
        "7": MVPM
        "8": Data Collection
    path: ""
    id: ayxX8h
  - name: site_poc
    type: MultiFile
    options: {}
    path: ""
    id: pecJ4D
  - name: bid_number_of_days
    type: Number
    options: {}
    path: ""
    id: pBtxhH
  - name: pk_pm
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": "[[Walldo Deluna]]"
        "2": "[[Brad Weber]]"
        "3": "[[Zack Braack]]"
        "4": "[[Brock Schilling]]"
        "5": "[[Patrick Hanson]]"
        "6": "[[Austin St. Louis]]"
    path: ""
    id: gy74zz
  - name: deficiencies
    type: Input
    options: {}
    path: ""
    id: zhyVU5
  - name: job_name
    type: Input
    options: {}
    path: ""
    id: Yz8INR
  - name: job_number
    type: Input
    options: {}
    path: ""
    id: nwPxBZ
  - name: sub_poc
    type: MultiFile
    options: {}
    path: ""
    id: v8u0vk
  - name: site
    type: File
    options: {}
    path: ""
    id: ZEuVUs
  - name: total_hrs_worked
    type: Formula
    options:
      autoUpdate: false
      formula: Number(current.HrsDay1) + Number(current.HrsDay2) + Number(current.HrsDay3) + Number(current.HrsDay4) + Number(current.HrsDay5) + Number(current.HrsDay6) + Number(current.HrsDay7) +  Number(current.HrsDay8) + Number(current.HrsDay9) + Number(current.HrsDay10)
    path: ""
    id: hR71Zl
    command:
      id: insert__work/job__total_hrs_worked
      icon: list-plus
      label: Insert total_hrs_worked field
  - name: subcontractor
    type: File
    options: {}
    path: ""
    id: 1LvC0D
  - name: pk_guys_onSite
    type: MultiFile
    options: {}
    path: ""
    id: sG7qdi
  - name: hrs_worked
    type: ObjectList
    options:
      displayTemplate: ""
      itemDisplayTemplate: ""
    path: ""
    id: XgK3Ol
  - name: day_number
    type: Number
    options:
      step: 1
      min: 1
    path: XgK3Ol
    id: ZGfIXT
  - name: hours
    type: Number
    options: {}
    path: XgK3Ol
    id: 81dsQv
version: "2.288"
limit: 100
tagNames: 
filesPaths:
  - Work/🛠 My Jobs
bookmarksGroups: 
excludes: 
extends: global/global
savedViews: []
favoriteView: 
fieldsOrder:
  - Yz8INR
  - ZEuVUs
  - nwPxBZ
  - gy74zz
  - ayxX8h
  - iX9dUw
  - pBtxhH
  - sG7qdi
  - pecJ4D
  - 1LvC0D
  - v8u0vk
  - zhyVU5
  - XgK3Ol
  - ZGfIXT
  - 81dsQv
  - hR71Zl
---
