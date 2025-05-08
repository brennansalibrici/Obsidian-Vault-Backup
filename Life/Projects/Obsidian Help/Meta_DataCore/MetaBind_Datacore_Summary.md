## 🧠 Summary: How MetaBind, Datacore, fileClass, and Templater Work Together

This section explains how Obsidian’s metadata tools interact when you're building structured workflows like meetings, people, and projects.

---

### ✅ Core Roles and Functions

| Layer       | Description |
|-------------|-------------|
| `fileClass` | Acts like a blueprint or object definition. It defines what fields exist on a note type (e.g., person, meeting, project) and how MetaBind should render them. |
| **MetaBind** | The UI renderer. It turns metadata into editable dropdowns, checkboxes, date pickers, and text inputs in Preview Mode. It reads from `fileClass` to know how to behave. |
| **Datacore** | The indexing engine. It keeps track of all metadata across your vault, allowing you to filter, group, and query notes using relationships and property values. |
| **Templater** | The automation layer. It controls what information is inserted into a new note at creation time. It uses logic like `MetaBind_Datacore_Summary` and supports conditionals and dynamic content. |

---

### 🛠 When You Add Metadata to a Note

You can:
- Add any field manually in the frontmatter (it will be stored even if not rendered)
- Use a Templater template to insert predefined fields and values
- Use MetaBind to interactively edit those fields in the note itself

---

### 📦 Field Behavior Clarification

- Fields in the `fileClass` don’t auto-populate in new notes — they only define what MetaBind *can* render.
- If you want fields to appear automatically when a note is created, use a Templater template or QuickAdd macro.
- MetaBind fields are ordered using internal IDs (e.g., `94vGHG`) listed in `fieldsOrder`.

---

### 🟨 Markdown Templates vs Templater

| Template Type | Description |
|----------------|-------------|
| **Markdown Template (Core Plugin)** | Basic, supports `{{title}}`, `{{date}}`, and inserts static content only. |
| **Templater Plugin** | Powerful logic engine supporting JS-like syntax. Use `2025-04-22`, conditionals, and more. Required for dynamic metadata, like injecting the file title as a date. |

---

This system allows you to model real-world relationships like:
- People who attended a meeting
- Projects involving specific notes
- Tasks completed on a given day

You don’t need to master everything at once — but now you have a clear map of how it all fits together.
