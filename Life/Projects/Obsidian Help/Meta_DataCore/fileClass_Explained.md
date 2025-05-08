# 🧠 Understanding `fileClass` and How It Works

The `fileClass` system is a way to define **blueprints for note types** (like people, meetings, or projects) in Obsidian using the **Metadata Menu** plugin. These blueprints let you standardize the fields a note should have and integrate cleanly with MetaBind, Datacore, and Templater.

---

## ✅ What is `fileClass`?

The `fileClass` is a YAML property like this:

```yaml
fileClass: person
```

This tells Obsidian (via the Metadata Menu plugin) that the note follows the structure defined in:

```
.fileclasses/person.md
```

That file defines what fields this type of note should include, such as:

```yaml
KeepInTouch::
LastChatted::
MBTI::
Summary::
```

---

## 🧩 How Plugins Interact with `fileClass`

| Plugin         | Role |
|----------------|------|
| **Metadata Menu** | Lets you define `fileClass` types and assign them to notes |
| **MetaBind**       | Renders the fields visually using dropdowns, checkboxes, etc. based on fileClass |
| **Datacore**       | Indexes all metadata across your vault for fast, relational querying |
| **Templater**      | Inserts the correct fields into a new note when it’s created |

---

## 🛠 How to Use It

1. Create a file in `.fileclasses/` like `Meeting.md` or `Person.md`
2. List the fields you want it to track
3. In your note (like `2025-04-22 Meeting with Lori`), include:
   ```yaml
   fileClass: meeting
   ```
4. MetaBind will now render these fields as editable elements
5. Datacore will recognize these fields and let you query them

---

## 🧠 Summary

- `fileClass` = note structure
- `MetaBind` = how it looks
- `Datacore` = how it's queried
- `Templater` = how it's created

Together, these tools turn your notes into powerful, structured objects.
