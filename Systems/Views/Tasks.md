---
tags:
  - view/custom
Links:
  - "[[Home]]"
Created: 2023-10-15T03:02:20
Description: Manage all your tasks
---

```dataviewjs
const today = window.moment().format("YYYY-MM-DD");
const backlink = dv.current().file.inlinks
  .find(link => link.path.includes("My Daily Notes/" + today));

if (backlink) {
  const sectionAnchor = "#evening"; // <-- change to your actual subheader anchor
  dv.paragraph(`🔙 Back to: [[${backlink.path}${sectionAnchor}]]`);
}
```

```meta-bind-button
label: Add New Task
hidden: false
id: ""
style: default
actions:
  - type: command
    command: quickadd:choice:6bb9f26c-69d2-4711-978e-5325f7b4f1c5
```
## By Due Date

### Overdue

```tasks
not done
(((due before today) OR (scheduled before today)) AND (tags does not include habit))
sort by priority
```

### Due Today

```tasks
not done
(due today) OR (scheduled today)
sort by priority
```

### Due In 7 Days

```tasks
not done
((due on or before in 7 days) OR (scheduled on or before in 7 days) AND (tags does not include habit))
sort by priority
```

## By Type

### Waiting For `#waiting`

```tasks
not done
tags include waiting
sort by priority
```

### Someday/Maybe `#someday`

```tasks
not done
tags include someday
sort by priority
```

## Completed

%% Last 20 completed tasks %%

```tasks
done
sort by done
limit 20
```

## Tasks
- [x] #task Another TEst Task 19 ➕ 2025-04-19 🛫 2025-04-19 ⏳ 2025-04-19 📅 2025-04-19 ✅ 2025-05-07

- [x] #task Another Test Task 17 ➕ 2025-04-19 🛫 2025-04-19 ⏳ 2025-04-19 📅 2025-04-19 ✅ 2025-05-07

- [ ] 

- [ ] 

%% Tasks with no due date %%
```tasks
not done
(no due date) AND (no scheduled date) AND (tags does not include habit)
sort by priority
```
- [x] #task Test Task ➕ 2025-04-18 🛫 2025-04-18 ⏳ 2025-04-18 📅 2025-04-18 ✅ 2025-04-18
- [x] #task Task 1 ➕ 2025-04-18 🛫 2025-04-18 ⏳ 2025-04-18 📅 2025-04-18 ✅ 2025-04-18
- [x] #task Test Task 1 🔺 ➕ 2025-04-18 🛫 2025-04-18 ⏳ 2025-04-18 📅 2025-04-18 ✅ 2025-04-21
- [x] #task Test Task 2 ⏫ ➕ 2025-04-18 🛫 2025-04-18 ⏳ 2025-04-19 📅 2025-04-21 ✅ 2025-05-07
- [x] #task Another Task 1 ➕ 2025-04-18 🛫 2025-04-18 ⏳ 2025-04-18 📅 2025-04-18 ✅ 2025-04-22
- [ ] 

- [ ] 

