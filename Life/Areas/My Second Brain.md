---
Links:
  - "[[Areas]]"
Created: 2023-05-07T11:51:13
Group: ME
areaGroup: Second Brain
fileClass: area
---

## Tasks

```meta-bind-button
label: Add New Task
hidden: false
id: ""
style: default
actions:
  - type: command
    command: quickadd:choice:6bb9f26c-69d2-4711-978e-5325f7b4f1c5
```

%% Tasks Start %%

## ToDoist Tasks
![[ToDoist Add Task Button Addon#^ToDoist-Add-Task-Button]]
```todoist
filter: /Second Brain
sort: dateDescending
```
## Notes
This is where you can create notes for your own personal understanding and customizations for this vault beyond the ones I suggest in [[My published notes]] :)
## Productivity

### Goals

<!-- Deprecated query: #goal tag being removed. Replace with field:: type = "goal"
```dataview
table Status
FROM #goal AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
``` -->

### Projects

<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table Status
FROM #project AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
``` -->

### Habits

<!-- Deprecated query: #habit tag being removed. Replace with field:: type = "habit"
```dataview
table Status, Frequency, HabitGroup, Goal
FROM #habitNote AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
``` -->

## Knowledge

### Inputs

<!-- Deprecated query: #input tag being removed. Replace with field:: type = "input"
```dataview
table Status, Author
FROM  #input AND [[]] AND !"Hidden"
SORT file.mtime desc
``` -->

### Other Notes

<!-- Deprecated query: #project tag being removed. Replace with field:: type = "project"
```dataview
table Created
FROM [[]] AND !#project AND !#input AND !"Hidden"
SORT file.mtime desc
``` -->
