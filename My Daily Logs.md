---
Status: 
tags: view/custom
Links:
  - "[[My Daily Notes]]"
Created: 2024-04-22T20:18:11
---

> [!INFO] 
> To see a log show up here, 

## Types
[[My Obstacles]]
## All Logs
````datacorejsx
const { DailyLogsWithTags } = await dc.require("Hidden/Datacore/Views/DailyLogs.jsx");

const tags = ["#log"];

function View() {
return <DailyLogsWithTags tags={tags}/>
}
return View
````
