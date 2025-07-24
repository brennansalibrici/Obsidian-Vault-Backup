---
---

Brainstorms for future tweaks, plugin combos, or workflows.

## My 2nd Brain Plans

### Immediate 'To-Do'
- [x] FleetingNotes
- [x] Work
- [x] Tighten up queries so it doesn't search the entire vault
- [x] Emotions
- [ ] Tasks reset and re-organized
- [ ] Web Clipper
- [ ] Create Modal Forms to update files
- [ ] Create Modal Forms for Work Items
- [x] Update the global.type value source list and update that variable in all data we've entered to date
- [x] Update all templates to populate the correct global.type value each time a new note is generated
- [ ] Create value source list(s) for index value fields and update all current entries existing in Obsidian 
- [ ] Buildout the 'Inputs' section
- [ ] Buildouts DailyNotes
- [ ] 

### Global fileClass Structre
- status
- raw (processed/unprocessed)
- Created date/time
- priority
- type
### Short Term
#### File Management
- Save attachements to an external cloud based location and only store links to them in the actual Obsidian vault. The only exception are attachments that we know we will want available when reception/WIFI is unavailable or at least unreliable (jobsites, airplanes, etc)
- Inputs will be classified as either raw or reviewed (or something along those lines). We basically want a means to show whether it is unprocessed or processed and rather than doing this via folders, we will do it with yaml frontmatter. This is a single suggestion of the important things to capture:
	- fileClass: input
	- sourceType: article       # or book, podcast, video, etc.
	- status: raw               # or reviewed
	- sourceLink: ""            # optional, URL or file path
	- captured:: 2025-05-08     # optional, date captured

#### Features to Use/Create
- FleetingNotes Sync
- Obsidian Web Clipper
- Tasks
- ToDoist Tasks

### Medium Term
#### Features to Use/Create
- Home Page
- Dashboards
- Bookmarks & Workspaces

- [ ] Deleting a FleetingNote from Obsidian does not delete any associated attachments, pictures, etc. 
### Long Term
#### File Management
- Have a set of  Internal & External Archive folders and we will write javascript and/or powershell scripts to move folders/files where they need to go whether inside or outside of the vault. 

#### Contacts
It would be pretty slick to be able to share a contact card and have Obsidian be able to take it in and instantly create a 'person' or a 'poc' from it