# 📋 fileClass Field Map (People, Meetings, Projects)

This guide shows which properties are associated with each major note type in your vault and how they're typically used with MetaBind, Datacore, and Templater.

---

## 👤 `fileClass: person`

| Field         | Type       | Description |
|---------------|------------|-------------|
| `KeepInTouch` | Boolean    | Whether to stay in regular contact |
| `LastChatted` | Date       | When you last had meaningful interaction |
| `MBTI`        | Text       | Myers-Briggs personality type |
| `Summary`     | TextArea   | Overview of who this person is to you |
| `tags`        | TagList    | `#person`, `#family`, `#work`, etc. |

---

## 📝 `fileClass: meeting`

| Field         | Type        | Description |
|---------------|-------------|-------------|
| `attendees`   | MultiLink   | People who attended the meeting (linked notes) |
| `MeetingDate` | Date        | When the meeting occurred |
| `Summary`     | TextArea    | What was discussed or decided |
| `tags`        | TagList     | e.g., `#meeting`, `#review`, `#1on1` |

---

## 📁 `fileClass: project`

| Field           | Type       | Description |
|-----------------|------------|-------------|
| `status`        | Select     | e.g., `active`, `on hold`, `complete` |
| `nextAction`    | Text       | Immediate next step to move the project forward |
| `goal`          | TextArea   | Purpose or desired outcome of the project |
| `peopleInvolved`| MultiLink  | Notes linked to people connected to the project |
| `tags`          | TagList    | `#project`, `#priority/high`, etc. |

---

## 🔧 Notes

- Fields listed here are declared in each fileClass (in `.fileclasses/`)
- MetaBind uses these definitions to render the property UI
- You can expand or modify these fields over time
- Use Templater to insert any of these fields into new notes when they're created

---

Let me know if you want to define new classes like `journal`, `thought`, `resource`, or more. This map is designed to grow with your system.
