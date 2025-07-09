---
---

```button
name QuickAdd: 🎬 New Practice Session
type command
action QuickAdd: 🎬 New Practice Session
```

### Scenarios
```dataview
table id as "ID", scenario as "Scenario", created as "Date/Time"
from "ME/🧪 Practice Lab/🎲 Scenarios"
where file.name != "🎲 Scenarios"
sort file.name asc 

```

### Practice Log
```dataview
table id as "ID", scenario as "Scenario", created as "Date/Time"
from "ME/🧪 Practice Lab/🎬 Practice Logs"
where file.name != "🎬 Practice Logs"
sort file.name asc 

```

### Live Rehearsals
```dataview
table id as "ID", scenario as "Scenario", created as "Date/Time"
from "ME/🧪 Practice Lab/🎙️ Live Rehearsals"
where file.name != "🎙️ Live Rehearsals"
sort file.name asc 

```

### Work Flow
---
- Any scenario can be selected or created to practice with.
- Once a scenario has been chosen you can begin a new Practice Session which will be added to the Practice Log. 
- In each practice session, you can practice with as many conversation rehearsals as you want or need. There is no limit. 
- Each conversation rehearsal does not need to have the same parameters. For example you can practice a few times on a particular scenario with the intent to work on [[ME/🧪 Practice Lab/🗺️ Skill Maps/🗣️ Core Skills/Validation]] skills and on the next run through you can work on [[Holding Discomfort]] skills. 
- When finished, each conversation becomes a 'Live Rehearsal' which gets imported from the web browser (phone app, wherever you practiced) and attached to the Practice Session and added to the Practice Log. 
- If you discover specific things or want take notes or journal anything about any of your practicing, the Reflections Journal is where you should track those things because this journal is specifically tailored to track with the Practice Lab. 
- You can also keep track of your progress on the Practice Lab Dashboard

- [x] Double Check all fileClasses and templates
- [ ] Wire up a New Practice Session
- [ ] Change the formula fields in the global object to multi list and update all fields and object
- [ ] Replace object list for hours on MyJobs and replace with multilists
- [ ] Create the Reflections journal 
- [ ] Create the metrics and other means to track these metrics to keep tabs on your progress
- [ ] Clean up Indexed Value Entries for all fields
- [ ] Complete Entering All Emotions
- [ ] Complete Entering All Needs
- [ ] Go through and check that all links between emotions and needs are live and functional