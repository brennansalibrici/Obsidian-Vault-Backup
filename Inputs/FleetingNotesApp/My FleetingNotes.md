---
Status: 
tags:
  - note
Links: 
Created: 2025-03-26T21:02:47
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

```dataviewjs
const notes = dv.pages('"FleetingNotesApp"')
	.where(p => p.file.name !== "My FleetingNotes")
	.sort(p => p.file.ctime, 'desc');

dv.table(["Title", "Status", "Created"],
	notes.map(p => [
		p.file.link,
		p.fn_status,
		p.file.ctime.toFormat("yyyy-MM-dd HH:mm")
	])
);
```

