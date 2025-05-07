---
tags:
  - reviews/quarterly
Created: 2025-05-05T12:07:44
Parent: "[[My Calendar/My Yearly Notes/Invalid date|Invalid date]]"
---

[[My Calendar/My Quarterly Notes/Invalid date|Invalid date]] ⬅️ [[My Calendar/My Yearly Notes/Invalid date|Invalid date]] ➡️ [[My Calendar/My Quarterly Notes/Invalid date|Invalid date]]

> “Your decisions about allocating your personal time, energy, and talent ultimately shape your life’s strategy.”

> [!TIP]+ Follow my workflow
> Go to my published notes for my updated workflow https://publish.obsidian.md/johnmavrick/My+quarterly+review+workflow

## Plan

- [ ] Revisit the higher-order review to remember your long-term goals and vision #hidden

### Action Items

All the uncompleted tasks from last review:

```dataview
task
where file.name = "Invalid date" AND !completed
```

### Goals

> [!DANGER]+ Plan at least 3 goals you want to achieve this quarter 🎯

```meta-bind-button
label: Create Goal Note 🎯
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: command
    command: quickadd:choice:0468ea18-5c37-4079-a9ef-25a64cb20934

```

```dataview
table list("🎯 " + Description, "💡 " + Why) as "Details"
FROM #goal AND !"Hidden"
WHERE contains(file.frontmatter.Timeframe, this.file.name)
SORT Order, file.name asc
```

## Recap
### Months
````datacorejsx
const { PeriodicRecap } = await dc.require("Hidden/Datacore/Views/PeriodicRecap.jsx");

function View() {
return <PeriodicRecap/>
}
return View
````

### Key Metrics

#### Energy

```tracker
searchType: frontmatter
searchTarget: Physical, Mental, Emotional, Spiritual
folder: /My Calendar/My Daily Notes
startDate: Invalid date
endDate: Invalid date
summary:
    template: "AVERAGES\nPhysical: {{average(dataset(0))}}\nMental: {{average(dataset(1))}}\nEmotional: {{average(dataset(2))}}\nSpiritual: {{average(dataset(3))}}\n"
```

##### Reflection
Are you happy or surprised with the results? What can you consciously work on for the future?
#### Wheel of Life
````datacorejsx
const { PeriodicReviewWheelOfLifeChart } = await dc.require("Hidden/Datacore/Views/WheelOfLife.jsx");

function View() {
return <PeriodicReviewWheelOfLifeChart/>
}
return View
````

`INPUT[textArea(placeholder(Insert Total Here)):Total]`

##### Reflection
Are you happy or surprised with the results? What can you consciously work on for the future?

## Reflection

> [!TODO] Make your reflection actionable!
> Whenever something insightful comes from your reflection that you want to consider for the next period's planning, turn it into a checkbox! It will automatically be added to your `Action Items` in your next review 🤩

### Summary
`INPUT[textArea():Summary]`
### Biggest Personal Achievement
`INPUT[textArea():Personal]`
### Biggest Career Achievement
`INPUT[textArea():Career]`
### Productivity
**Did you complete what you set out to do in the previous review? Are you content with the journey and the outcome?**
- 

**What was the completion rate of my goals and projects? Was the workload manageable or was it overwhelming?**
- 
### My Wins
I managed to...
- 
### Gratitude
Some moments and things I'm grateful for are:
- 
### Obstacles
I struggled with...
- 

Next time I'll overcome it by...
- 
### My Learnings
**The main topics I learned about were:**
- 

**What is one valuable lesson?**
- 

**What can I improve on in the future timeframe?
- 

**What should I start doing?**
- 

**What should I stop doing?**
- 

**What should I continue doing?**
- 
