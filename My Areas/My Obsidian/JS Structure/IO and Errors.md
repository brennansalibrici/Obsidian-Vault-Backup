---
---

## Error Handling Strategy
---

- **Categories:** `VALIDATION`, `IO`, `SCHEMA_MISMATCH`, `FIELD_MAP`, `LINK_RESOLVE`, `UNKNOWN`.
- **Per-step guards:** each module throws typed errors; orchestrator catches → `errorBus`.
- **User messages:** short, actionable; include _where_ it failed and _how to fix_.
- **Recovery:**
    - auto‑create missing parent folders
    - auto‑escape YAML where possible
    - fallback to string if link resolve fails (with warning)
    - write to `/_quarantine` on irrecoverable parse

## Testing & Diagnostics
---

- **Dry‑run mode:** env flag to log planned writes without mutating files
- **Fixture tests:** sample `formData` per fileType covering edge cases
- **Lints:** fieldMap names vs frontmatter keys; unused/unknown fields
- **Profiler hooks:** log step timings (parse, validate, write)

## Expansion Hooks (Future‑Proofing)
---

- FieldType stubs: `relation`, `rollup`, `template_ref`, `computed`
- Handler lifecycle: `preValidate`, `preWrite`, `postWrite`
- Cross‑module events: `onCreate`, `onUpdate` (for Tasks/DailyNotes integrations)
- Configurable merge strategies per key (e.g., `set`, `append_unique`, `prepend`)

## Migration Plan (From Templater → ModalForms)
---

1. **Baseline:** ensure two fileTypes (e.g., `practice-session`, `live-rehearsal`) fully pass tests.
2. **Inventory:** list existing Templater forms + expected frontmatter.
3. **Map:** for each template → fieldMap entries; add missing fieldTypes to registry.
4. **Shadow Runs:** dry‑run conversions; compare YAML diffs.
5. **Flip:** replace buttons one folder at a time. Keep a rollback macro.

## Example Contracts (Snippets)
---

```
// core/modalFormUtils.js
export async function run(formId, action, context){
  const formData = await modalForms.openForm(formId);
  const fileType = resolveFileType(formId, formData, context);
  const fieldMap = await loadFieldMap(fileType);
  const data = coerceByFieldTypes(formData, fieldMap);
  await validateSchema(fileType, data);
  await validateCrossRules(fileType, data);
  const handler = getHandler(fileType);
  return action === 'create' ? handler.create(data, context) : handler.update(data, context);
}
```