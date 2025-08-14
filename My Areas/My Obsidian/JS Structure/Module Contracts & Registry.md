---
---

## Module Responsibilities (Contracts)

### Orchestrator: `modalFormUtils`
---
- **Inputs:** `formId`, `action`, `context` (current file path, vault)
- **Does:**
    - Gets `formData` from ModalForms
    - Resolves `fileType` + loads `fieldMap`
    - Runs `schemaValidator` + `crossFieldRules`
    - Calls `handler.create()` or `handler.update()` with sanitized data
    - Emits structured logs; routes errors to `errorBus`
- **Does NOT:** contain field rules, fieldMap logic, or YAML details

### FieldType Registry: `fieldTypeRegistry.js`
---
- **Goal:** one authoritative place to handle **every** field type (even unused yet)
- **Contract (per type):**
    
    ```
    export const FIELD_TYPES = {
      text: {
        parse: (raw) => string,
        save: (val) => string,                 // for YAML
        validate: (val) => ValidationResult,
      },
      textarea: { ... },
      single_select: { ... },
      multi_select: { ... },
      date: { ... },
      file_link: { parse, save, validate },    // "[[File]]" or path → normalized
      multi_file_link: { ... },
      number: { ... },
      boolean: { ... },
      enum: { options: [...], parse, validate },
      json: { parseToObj, saveToYamlString, validateSchema },
    }
    ```

### FieldMaps (per fileType)
---
- **Purpose:** declaratively map ModalForms fields → frontmatter keys, with type info and transforms.
- **Shape:**
    
    ```
    export const PRACTICE_SESSION_FIELD_MAP = {
      title: { key: 'title', type: 'text', required: true },
      core_skill_focus: { key: 'core_skill_focus', type: 'multi_select' },
      meta_skill_focus: { key: 'meta_skill_focus', type: 'multi_select' },
      linked_resources: { key: 'linked_resources', type: 'multi_file_link' },
      priority: { key: 'priority', type: 'enum', options: ['🔴 High','🟠 Medium','🟢 Low','⚪ None'] },
      created: { key: 'created', type: 'date', default: () => nowISO() },
      id: { key: 'id', type: 'number', default: () => Date.now() },
      // ...etc
    }
    ```

### Validators
---
- `schemaValidator`: enforces required fields, enums, formats per fileType.
- `crossFieldRules`: e.g., if `status === 'complete'` then `grade` required.

### Handlers (per fileType)
---
- **Create:** build filename via `naming.js` → compose frontmatter → `fileWriter.create()`
- **Update:** merge strategy (replace, merge-unique arrays, preserve unknowns) → `fileWriter.update()`
- **Special cases:** any per‑type body content rules

### Writer & IO
---
- `frontmatterIO`: idempotent YAML read/write, preserves order where possible
- `fileWriter`: atomic writes, timestamped backups on change, conflict detection

### Error Bus
---
- Normalize errors to `{ code, where, hint, details }`
- Map to user‑friendly toasts; log full diagnostics to `logger`