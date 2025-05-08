---
tags:
  - area
  - software_development
Links: 
Created: 2025-03-20T20:16:04
areaGroup: Obsidian
Group: Misc
---
- [ ] #task Reset ChatGPT memory to udpate both an emotion and a Caputred Moment in the same memory location. ➕ 2025-05-07

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
- [ ] #task Fix tasks button? ➕ 2025-05-07
- [ ] #task Setup Weekly recurring CleanDailyNotes task ➕ 2025-05-07
- [ ] #task Import tasks from ToDoist ➕ 2025-05-07
- [ ] #task Create 'Home' Page Canvas that we can navigate anywhere from ➕ 2025-05-07
## ToDoist Tasks
![[ToDoist Add Task Button Addon#^ToDoist-Add-Task-Button]]
```todoist
filter: /Obsidian
sort: dateDescending
```

## My 2nd Brain Plans
### Short Term
#### File Management
- Save attachements to an external cloud based location and only store links to them in the actual Obsidian vault. The only exception are attachments that we know we will want available when reception/WIFI is unavailable or at least unreliable (jobsites, airplanes, etc)
- Inputs will be classified as either raw or reviewed (or something along those lines). We basically want a means to show whether it is unprocessed or processed and rather than doing this via folders, we will do it with yanl frontmatter. This is a single suggestion of the important things to capture:
	- fileClass: input
	- sourceType: article       # or book, podcast, video, etc.
	- status: raw               # or reviewed
	- sourceLink: ""            # optional, URL or file path
	- captured:: 2025-05-08     # optional, date captured

### Medium Term

### Long Term
#### File Management
- Have a set of  Internal & External Archive folders and we will write javascript and/or powershell scripts to move folders/files where they need to go whether inside or outside of the vault. 



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

```dataview
table Created
FROM [[]] AND !#project AND !#input AND !"Hidden"
SORT file.mtime desc
```
