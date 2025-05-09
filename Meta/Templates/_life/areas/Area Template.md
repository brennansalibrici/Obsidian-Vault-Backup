---
Links: 
Created: 2025-05-05T12:07:43
areaGroup: 
Group: 
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

<!-- Deprecated query: #project  tag being removed. Replace with field:: type = "project"
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
