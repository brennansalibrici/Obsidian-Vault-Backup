# MetaBind & Datacore — Overview + Use Guide

This guide explains how MetaBind and Datacore work together in Obsidian, how they're different from traditional markdown and tags, and how to use them effectively to create structured, interactive workflows.

---

## ✅ What Are MetaBind and Datacore?

### ✅ MetaBind = *A plugin for rendering and editing metadata*
- Turns frontmatter fields into interactive UI elements (dropdowns, date pickers, checkboxes).
- Renders fields from `fileClass` and provides form-style editing in preview.
- Uses your existing YAML metadata (no new format required).

### ✅ Datacore = *A background engine that indexes metadata*
- Scans your vault for structured fields and makes them queryable and filterable.
- Supports powerful typing, filtering, and relationships between notes.

---

## ✅ Comparison: MetaBind/Datacore vs Markdown/Tags

| Feature                          | Tags  | Markdown | MetaBind + Datacore |
|----------------------------------|-------|----------|----------------------|
| Stores structured data           | ❌ No | ✅ Some  | ✅✅ Full support     |
| Queryable by property            | ❌ No | ✅ With hacks | ✅ Native support |
| Supports dropdowns/checkboxes    | ❌ No | ❌ No    | ✅ Yes               |
| Typed relationships              | ❌ No | ✅ Manual | ✅ Semantic & linked |
| UI interaction                   | ❌ No | ❌ No    | ✅ Live UI in preview|

---

## ✅ Example Workflow: People + Meetings

### 📄 `Lori Kinney.md` (Person Note)
```yaml
fileClass: person
KeepInTouch: true
LastChatted: 2025-04-21
Summary: "Lori is my wife. Our relationship is complex and layered..."
```

Stored in `People/` folder. This is your atomic "contact card."

---

### 📄 `Meeting with Dan.md` (Meeting Note)
```yaml
fileClass: meeting
MeetingDate: 2025-04-22
attendees:
  - [[Lori Kinney]]
  - [[Dan (Therapist)]]
Summary: "Discussed emotional support and reconnection patterns"
```

MetaBind turns attendees into dropdown chips, date pickers, and lets you edit inline.

---

## ✅ Dataview Query Examples

**Meetings Lori attended:**
```dataview
table MeetingDate, Summary
from "Meetings"
where contains(attendees, [[Lori Kinney]])
```

**People contacted in last 14 days:**
```dataview
table LastChatted, Summary
from "People"
where date(LastChatted) >= date(today) - dur(14 days)
```

---

## ✅ Best Practices for What Goes Where

| Note Type | Folder    | fileClass | Track |
|-----------|-----------|-----------|-------|
| People    | `People/` | `person`  | `LastChatted`, `MBTI`, `KeepInTouch`, `tags` |
| Meetings  | `Meetings/` | `meeting` | `attendees`, `MeetingDate`, `Summary` |
| Projects  | `Projects/` | `project` | `goal`, `status`, `peopleInvolved` |

---

## ✅ How to Use It Day-to-Day

1. Create `fileClass` files for `person`, `meeting`, and `project` in `.fileclasses/`
2. Define expected properties like `attendees::`, `MeetingDate::`
3. Use QuickAdd + templates to generate structured notes
4. Let MetaBind render the values as UI widgets
5. Use Dataview to retrieve and organize information across your vault

---

This folder (`Meta_DataCore`) can become your living wiki as you keep adding knowledge. Would you like a visual map or field reference file next?
