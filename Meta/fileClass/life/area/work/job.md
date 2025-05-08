---
tags: 
Created: 2025-04-25T11:32:01
mapWithTag: false
icon: package
fields:
  - name: Start Date
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: iX9dUw
  - name: Scope Of Work
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
  - name: Site POC
    type: MultiFile
    options: {}
    path: ""
    id: pecJ4D
  - name: Number of Days
    type: Number
    options: {}
    path: ""
    id: pBtxhH
  - name: ProKey PM
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": "[[Walldo Deluna]]"
        "2": "[[Brad Weber]]"
        "3": "[[Zack Braack]]"
        "4": "[[Brock Schilling]]"
        "5": "[[Patrick Hanson]]"
    path: ""
    id: gy74zz
  - name: Deficiencies
    type: Input
    options: {}
    path: ""
    id: zhyVU5
  - name: Job Notes
    type: Input
    options: {}
    path: ""
    id: oUNmrO
  - name: Job Note Links
    type: MultiFile
    options: {}
    path: ""
    id: OdtukF
  - name: Job Name
    type: Input
    options: {}
    path: ""
    id: Yz8INR
  - name: Job Number
    type: Input
    options: {}
    path: ""
    id: nwPxBZ
  - name: HrsDay1
    type: Number
    options: {}
    path: ""
    id: nLpXZV
  - name: HrsDay2
    type: Number
    options: {}
    path: ""
    id: qzfdTY
  - name: HrsDay3
    type: Number
    options: {}
    path: ""
    id: VhkERl
  - name: HrsDay4
    type: Number
    options: {}
    path: ""
    id: iEnWAH
  - name: HrsDay5
    type: Number
    options: {}
    path: ""
    id: nQ11B4
  - name: HrsDay6
    type: Number
    options: {}
    path: ""
    id: jYNy6b
  - name: HrsDay7
    type: Number
    options: {}
    path: ""
    id: yQ2Tii
  - name: HrsDay8
    type: Number
    options: {}
    path: ""
    id: EfT9ic
  - name: HrsDay9
    type: Number
    options: {}
    path: ""
    id: xAEvnL
  - name: HrsDay10
    type: Number
    options: {}
    path: ""
    id: iq3dde
  - name: Sub POC
    type: MultiFile
    options: {}
    path: ""
    id: v8u0vk
  - name: Site
    type: File
    options: {}
    path: ""
    id: ZEuVUs
  - name: Total Hrs Worked
    type: Formula
    options:
      autoUpdate: false
      formula: Number(current.HrsDay1) + Number(current.HrsDay2) + Number(current.HrsDay3) + Number(current.HrsDay4) + Number(current.HrsDay5) + Number(current.HrsDay6) + Number(current.HrsDay7) +  Number(current.HrsDay8) + Number(current.HrsDay9) + Number(current.HrsDay10)
    path: ""
    id: hR71Zl
    command:
      id: insert__hR71Zl
      icon: list-plus
      label: Insert Total Hrs Worked field
  - name: Subcontractor
    type: File
    options: {}
    path: ""
    id: 1LvC0D
  - name: ProKey Guys OnSite
    type: MultiFile
    options: {}
    path: ""
    id: sG7qdi
version: "2.105"
limit: 100
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - sG7qdi
  - 1LvC0D
  - hR71Zl
  - ZEuVUs
  - v8u0vk
  - iq3dde
  - xAEvnL
  - EfT9ic
  - yQ2Tii
  - jYNy6b
  - nQ11B4
  - iEnWAH
  - VhkERl
  - qzfdTY
  - nLpXZV
  - nwPxBZ
  - Yz8INR
  - OdtukF
  - oUNmrO
  - zhyVU5
  - gy74zz
  - pBtxhH
  - pecJ4D
  - ayxX8h
  - iX9dUw
---
