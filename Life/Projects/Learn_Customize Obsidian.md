---
Status:
  - 🟨
Created: 2025-01-04T10:49:34
Area: 
Goal: 
Deadline: 
Order: 
fileClass: project
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
	- [ ] Continue learning obsidian 🛫 2025-04-15 ⏳ 2025-04-14 📅 2025-04-14

- [ ] Logs based on queries of Tags (log) or properties (obstacle::) [[My Daily Logs]]. [[Logging Fields]]
	- [x] Can they be combined in the same query? 
	- [x] Develop use case for when to use one and opposed to the other
	- [x] Further Develop my Daily Log
	- [x] Put buttons in strategic places in the DailyNote to bring u back to the top
	- [ ] Possible new properties to add:
		- [ ] obstacle
		- [ ] conversation
		- [ ] feeling/emotion
		- [ ] note
		- [ ] goal
		- [ ] insight
		- [ ] action
		- [ ] identity
		- [ ] trigger
		- [ ] win
		- [ ] ream
- [ ] Change CSS style so subheaders are indented
- [x] Add a button (or link) at the top of my DailyNote which takes me to today’s #Story. The intent is to have a quick and easy way to write a quick paragraph about what just happened after a certain block of time or event of thing that occurred during the day. 
- [x] Add a button (or link) at the top of my DailyNote which takes me to today’s #Story. The intent is to have a quick and easy way to write a quick paragraph about what just happened after a certain block of time or event of thing that occurred during the day. 
- [ ] Create buttons to add new things on the DailyNote so you have the choice between adding it there or querying it like we did with tasks. 
- [ ] Finish setting up templates with a dropdown tag choice when you create it. Also include a backlink to the DailyNote & section where it came from. 
	- [ ] All Input Types
	- [ ] Input Collections
	- [ ] Thoughts
	- [ ] People - *make them an attendee*
	- [ ] Meetings
- [ ] Figure out how to make a 'Person' an Attendee (which is a field)
- [ ] Have Obsidian auto-remove Input toggles and replace with actual values automatically at the end of each day. 
- [x] Migrate Tasks to the Tasks Plugin and away from ToDoist
	- [x] obstacle:: DailyNotes (and other periodic notes)
	- [x]  obstacle:: My Tasks
	- [x]  obstacle:: My Vision Board
- [ ] Build a Dashboard homepage
- [ ] Topics to learn 
	- [ ] Kanbans
	- [ ] MOCs
	- [ ] Habits
	- [ ] Book notes (reference vid https://youtu.be/z2NW1iVlkp8)
	- [ ] Atomic Notes
	- [ ] Integrate AI

## Logs

````datacorejsx
const { ListWithTag } = await dc.require("Hidden/Datacore/index.jsx");

function View() {
	return <ListWithTag/>
}
return View
````

## Notes

### Related Notes
%% Add any non-connected notes or specific contexts here%%
[[Obsidian Performance Bottlenecks]]
[[Obsidian combo box]]
[MetaDataMenu tutorial](https://youtu.be/qi4Uz7TZLOM?si=Yus-EqcUWAZwzVbu)
[icon library](https://lucide.dev/icons/)

### Query
```dataview
list
from ([[]]) and !outgoing([[]]) and !"Hidden"
```
## Planning
### Objective
**What is the defintion of DONE?**
`INPUT[textArea(placeholder(Description)):Description]`

**Why is this project personally significant to me?**
`INPUT[textArea(placeholder(Why)):Why]`

**Envisioning success, what would it FEEL like to have completed this?**

### Key Results
**What are the measurable deliverables or statistics I am aiming for? How can I track progress to see my progression?

### Obstacles
**What are some obstacles I may face, and what are their solutions? How can I remember these solutions when these obstacles come up?**

## Weekly Progress
```meta-bind-button
label: Insert Project Weekly Addon
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: command
    command: quickadd:choice:b0f8231c-c25e-44db-9c4d-87c0583698c5

```
%% Weekly Progress Start %%
## Reflection
**What did I accomplish? Am I satisfied with my progress?**
- 

**What setbacks did I face? What did I learn from them?**
- 

**What are some possible improvements and solutions learned for the future?**
- 
