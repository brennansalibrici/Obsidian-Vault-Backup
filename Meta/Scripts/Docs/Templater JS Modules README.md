---
title: Templater JS Modules README
status: complete
type: documentation
category: note
priority: ⚪ None
visibility: 🔒 private
---

# 🧩 Templater JS Modules – README  
---

## 📦 Purpose  
This folder contains reusable JavaScript helper files for use in Templater templates. These files serve as modular building blocks for automation across the vault — especially for forms, file management, dynamic frontmatter, and utility processing.

---

## 📁 Folder Structure  
---

```
Templater JS Modules/
│
├── Utility Functions/
│   ├── fileFunctions.md        ← File and path utilities
│   ├── stringHelpers.md        ← String parsing, cleanup, formatting
│   └── dateUtils.md            ← Timestamp, formatting, parsing
│
├── Modal Forms/
│   └── inputHandlers.md        ← Normalize and validate modal form input
│
└── README.md                   ← This file
```

---

## 🧑‍💻 Usage in Templates  
---

To use any utility file inside a Templater-enabled `.md` template:

```js
<%* const utils = tp.user.load("templater-js-modules/utility-functions/fileFunctions"); %>

// Then call a function:
const fileCount = utils.getFileCount("ME/Practice Logs");
%>
```

---

## 🔤 Naming Conventions  
---

### 📄 File Naming  
- Use **camelCase** or **kebab-case** (avoid spaces)
- Keep all files lowercase for consistency
- Example: `fileFunctions.md`, `string-utils.md`

### 🔧 Function Naming  
- Use **camelCase** for function names  
- Functions should start with a **verb** (e.g., `get`, `set`, `create`, `build`)  
- Group related functions together in appropriate utility files

---

## 🚫 Gotchas  
---

- Paths are case-sensitive in some environments  
- All files must have `.md` extension  
- `tp.user.load()` cannot resolve links with spaces — always use kebab or camel case  
- Functions must be wrapped in `<%* %>` code blocks, not `<% %>`

---

## 🌱 Future Expansion Ideas  
---

- `noteParser.md` for analyzing metadata across the vault  
- `vaultStats.md` for summarizing file counts, size, and usage  
- `emotionalTags.md` for use with practice lab filtering

---

Let me know if you'd like an onboarding checklist for this system or a snippet you can drop into a new utility file as a starter. Happy modular coding!
