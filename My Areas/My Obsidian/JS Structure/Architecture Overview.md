---
---

## High‑Level Flow
---

**Create/Update Path (happy path):**

1. **UI Trigger** (button/command) → calls `ModalForms` → returns `formData`.
2. **Orchestrator** (`modalFormUtils`) → resolves target `fileType`, action (`create` | `update`).
3. **FieldMap Loader** → loads the correct `fieldMap` + `fieldTypeRegistry`.
4. **Validator** → schema + cross‑field rules; returns `validatedData` or `ValidationError[]`.
5. **Handler** (per fileType) → maps `validatedData` → frontmatter/body ops.
6. **Writer** → writes file/frontmatter safely (atomic write + backup).
7. **Logger/Telemetry** → success + timings.
8. **Error Layer** (any step) → normalize → user message + recovery suggestion.

## Folder & File Layout
---

```
/.obsidian/plugins/custom-lib
  /core
    modalFormUtils.js            # Orchestrator only (no business rules)
    errorBus.js                  # Centralized error normalization & messages
    logger.js                    # Structured logs (level, context, timings)
    fileWriter.js                # Atomic writes, backups, merge helpers
    frontmatterIO.js             # Read/Write frontmatter, YAML helpers

  /registry
    fieldTypeRegistry.js         # All field types + parse/save/validate
    fileTypeRegistry.js          # Maps fileType → handler

  /validators
    schemaValidator.js           # Zod/Yup-style schemas per fileType
    crossFieldRules.js           # Multi-field logic (e.g., requires A if B)

  /fieldMaps
    practice_session.map.js
    live_rehearsal.map.js
    captured_moment.map.js
    ... (one per fileType)

  /handlers
    baseHandler.js               # Shared helpers; extend in per-type handlers
    practiceSessionHandler.js
    liveRehearsalHandler.js
    capturedMomentHandler.js

  /utils
    naming.js                    # filename rules, slugs, counters
    dates.js                     # date parsing/formatting
    links.js                     # string ↔ [[WikiLink]] helpers
    yamlSafe.js                  # YAML escape/quote utilities

/docs
  naming-conventions.md
  contribution-guide.md
  error-catalog.md
  fieldtype-contracts.md
```
