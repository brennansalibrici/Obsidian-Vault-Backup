---
Status: 
tags:
  - view/note
Links:
  - "[[My Home]]"
Created: 2024-01-13T03:46:36
---
For all things that use [[Obsidian Tracker Plugin]] but are not tracked in [[My Habits]]
## Trackers
### Energies
```tracker
searchType: frontmatter
searchTarget: Physical, Mental, Emotional, Spiritual
folder: /My Calendar/My Daily Notes
summary:
    template: "AVERAGES\nPhysical: {{average(dataset(0))}}\nMental: {{average(dataset(1))}}\nEmotional: {{average(dataset(2))}}\nSpiritual: {{average(dataset(3))}}\n"
```
``` tracker
searchType: frontmatter
searchTarget: Physical, Mental, Emotional, Spiritual
datasetName: Physical, Mental, Emotional, Spiritual
folder: /My Calendar/My Daily Notes
month:
    mode: annotation
    startWeekOn: 'Sun'
    threshold: 7, 7, 7, 7
    color: white
    dimNotInMonth: false
    annotation: 💪,🧠,😊,🙏
    showAnnotationOfAllTargets: true
```
