---
tags:
  - area
  - software_development
Links: 
Created: 2025-03-20T20:16:04
areaGroup: Obsidian
Group: Misc
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
filter: /Obsidian
sort: dateDescending
```

## Notes

## Productivity

### Goals

```dataview
table Status
FROM #goal AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
```

### Projects

```dataview
table Status
FROM #project AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
```

### Habits

```dataview
table Status, Frequency, HabitGroup, Goal
FROM #habitNote AND [[]] AND !"Hidden"
WHERE icontains(file.frontmatter.Area, this.file.name)
SORT Created asc
```

## Knowledge

### Inputs

```dataview
table Status, Author
FROM  #input AND [[]] AND !"Hidden"
SORT file.mtime desc
```

### Other Notes
[[Dataview Queries]]

```dataview
table Created
FROM [[]] AND !#project AND !#input AND !"Hidden"
SORT file.mtime desc
```
