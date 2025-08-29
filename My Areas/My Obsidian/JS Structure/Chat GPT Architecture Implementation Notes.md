---
---

https://chatgpt.com/share/68a92aff-b380-8004-b9e8-c289fd3be78e

SAY THIS TO START - ''Use Build Plan: Brennan‑ObsSys v1. Open Conversation N: …" 
					"Open Conversation Line..."

# Conversation plan (revised to include body‑content insertion)

Below are tightly scoped “threads.” To open any one, copy the **Say this to start** line. I’ll auto‑load this plan and your uploaded files (registries, modalFormUtils, etc.) as the source of truth (e.g., filename scans and maps in `modalFormUtils`, handlers/registries in your current code).

---

## 1) ✅ ErrorBus factory + structured Logger (bootstrap first)

**Goal:** Canonicalize `createErrorBusInstance` (remove naming drift), add `.with({ domain, module })`, and a lightweight JSON logger with `requestId` + timing spans. Wire both into bootstrap.  
**Deliverables:**

- `errorBus` factory normalization + helpers (`err`, `toast`, `toLog`, `with`)
    
- `logger.js` (levels, requestId, spans, console JSON lines)
    
- Bootstrap registration + usage examples  
    **Natural questions:** output format (JSON vs pretty), where logs live (console vs rotating note), default domains.  
    **Say this to start:** **Open Conversation 1: ErrorBus + Logger.**

---

## 2) ✅ Dedicated I/O layer: `fileWriter` + `frontmatterIO`

**Goal:** Atomic writes, per‑path mutex, retries; single YAML authority (parse/serialize, arrays, wiki‑links). This removes race conditions and centralizes YAML quirks.  
**Deliverables:**

- `fileWriter.js`: `withLock(path, fn)`, `atomicWrite`, `backup(path, rotate=3)`, `retry`
    
- `frontmatterIO.js`: `read(path) -> { fm, body }`, `write(path, { fm, body }, { mergeStrategy })`
    
- Integration points in orchestrator/handlers (no more direct `app.vault` writes)  
    **Natural questions:** merge strategies you want, backup rotation count, dry‑run location.  
    **Say this to start:** **Open Conversation 2: I/O layer (fileWriter + frontmatterIO).**

---

## 3) ✅ VaultIndex (kill O(n) folder scans)

**Goal:** Cache `folder → Set(basenames)`, subscribe to vault events, expose `exists`, `nextCounter(prefix)`. Replace `ensureUniqueFilename`’s scan.  
**Deliverables:** `VaultIndex.js` + drop‑in changes in `modalFormUtils`.  
**Natural questions:** persistence across sessions, invalidation policy, large‑folder memory footprint.  
**Say this to start:** **Open Conversation 3: VaultIndex.**

Don't forget to:
- **Contracts**: We can codify a `fieldMapContract` (likely in `validationBus.js`) so malformed maps throw `SCHEMA_MISMATCH`.
---

## 4) ✅ Registry hardening (immutability + memoization)

**Goal:** Build registries once at bootstrap, freeze them, memoize lookups; remove “registry not ready” races. Validate field maps at startup.  
**Deliverables:**

- Bootstrap changes to publish canonical enums (`window.customJS.FIELD_TYPE_ENUM`, `INTENT`)
    
- Freeze registries; memoize handler lookups in the field pipeline
    
- Fail‑fast map validation report via ErrorBus  
    **Natural questions:** strict fail vs soft warn, migration path for legacy symbols.  
    **Say this to start:** **Open Conversation 4: Registry hardening + map validation.**

---

## 5) ✅ Formal schema/contracts for FieldMaps

**Goal:** Enforce map shapes to avoid silent failures. Validate all maps at bootstrap.  
**Deliverables:**

- Schema (Zod or lite validator) covering `{modalKey|resolver}`, `key`, `fieldType`, optional `intent`, `isLink`
    
- Lints for unknown/unused fields  
    **Natural questions:** Zod vs hand‑rolled, legacy map compatibility.  
    **Say this to start:** **Open Conversation 5: FieldMap schema/contracts.**

---

## 6) 🔄 **Body content insertion (NEW): long‑text → subheader sections**

**Goal:** From ModalForms, take one or more long text fields and insert them into a specific subheader in the note body (create header if missing; insert idempotently). Keep FM separate from body editing.  
**Where it fits:** After I/O layer exists. We’ll add a focused, safe body editor that leverages `frontmatterIO.read/write` for body round‑trip and uses simple Markdown section ops.  
**Deliverables:**

- `noteBodyIO.js` (or `contentEditor.js`) with:
    
    - `upsertSection({ path, header, content, position="after", createIfMissing=true, delimiterMode="atx" })`
        
    - Idempotence guards (hash markers or fence comments)
        
    - Helpers to find/normalize headers, preserve surrounding content
        
- Orchestrator hook in `modalFormUtils` to route specific long fields to body insertion based on FieldMap metadata, e.g. `{ key: 'analysis', fieldType: TEXTAREA, body: { header: '## Analysis' } }`  
    **Natural questions:**
    
- Exact header semantics (ATX `##` vs Setext), single vs multiple inserts, content fencing, update vs append behavior, ordering relative to template blocks.  
    **Say this to start:** **Open Conversation 6: Body content insertion (long‑text → subheaders).**

---

## 7) ✅ Intent stage as a true post‑type pipeline

**Goal:** Let intent handlers (title/filename/slug/deadline) read/update dependent fields and emit diffs.  
**Deliverables:** deterministic intent order + diff object for handlers.  
**Say this to start:** **Open Conversation 7: Intent pipeline.**

---

## 8) Cross‑field rules module

**Goal:** Declarative `requires/oneOf/mutuallyExclusive/implies` rules after type normalization, before write; surface via ErrorBus.  
**Deliverables:** `crossFieldRules.js` registry + wiring in orchestrator.  
**Say this to start:** **Open Conversation 8: Cross‑field rules.**

---

## 9) Event hooks bus

**Goal:** In‑proc pub/sub for `onCreate/onUpdate` so extensions don’t entangle core write path.  
**Deliverables:** tiny event bus + sample subscribers (e.g., backlink maintenance).  
**Say this to start:** **Open Conversation 9: Event hooks.**

---

## 10) Dry‑run, quarantine, migrations

**Goal:** Safe rollouts and recovery: log diffs only, quarantine parse failures, run schemaVersion migrations.  
**Deliverables:** flags in orchestrator; quarantine folder; migration runner.  
**Say this to start:** **Open Conversation 10: Dry‑run + migrations.**

---

## 11) Batch jobs + progress UI

**Goal:** Chunked processing with backpressure and progress reporting for large edits.  
**Deliverables:** `JobRunner` + progress emitter.  
**Say this to start:** **Open Conversation 11: Batch jobs + progress UI.**

---

## 12) TypeScript boundaries (.d.ts), 13) Config/flags, 14) Test scaffolding

We’ll add these after core paths stabilize.

---

## How to keep me “locked” to this plan

- Start any thread with:  
    **“Use Build Plan: Brennan‑ObsSys v1. Open Conversation N: …”**  
    (That phrase is my reminder to reference this plan + your uploaded code every time.)
    
- If a thread drifts, say:  
    **“Refocus to Brennan‑ObsSys v1, Conversation N.”**
---

# Modal Forms Upgrade Plan:
---
This is going to include adding bodycontent to be inserted from a modalForm along with tiered subheaders and the ability to add a 'listener' and possibly manipulate forms during runtime/data entry time. We may have to do it by setting a listener or an observer when the original form opens and then we could possiblly call functions that would build the form programtically or build a different form and overlay it on top of the original one... Not sure how exactly it will play out yet, but that's whats involved in this next ModalFormsUpgrade project outlined below:

<u>Say this to start</u>: 'Unpause Body Content Pipeline work — resume where we left off with the single pipeline + separate schema contracts (frontmatter vs body).'

We've got 2 things to paste back into ChatGpt as a reminder of where to start from:
- [[Outline for Body Content Contract & Unified Pipeline (Parking Draft)]]
- [[Objectives Based on our outline + current codebase:]]

# Outline for Body Content Contract & Unified Pipeline (Parking Draft)

## Status

- **Decision**: Keep a **single orchestrated pipeline** with two stage groups (Frontmatter → Body Content).
    
- **Contracts**: Maintain **separate schema contracts** for frontmatter vs. body content.
    
- **Action**: **Document now**, implement after V1 Step 7 is complete.

## Design Principles

- Separation of concerns: YAML vs. body edits are versioned and validated independently.
    
- Deterministic order: Frontmatter stages always run before body stages.
    
- Single unit-of-work: Both stage groups write via the **same writeQueue** for atomicity.
    
- Extensible, registry‑driven: New operations plug in without touching orchestration.

## Contracts

### Frontmatter Schema Contract (existing)

- **Scope**: YAML fields/types/defaults, normalization, validation, merge strategy.
    
- **Registry**: `frontmatterContractRegistry`
    
- **Output**: Enqueued YAML writes.

### Body Content Contract (new – to implement post V1)

- **ID**: `bodyContent.v1`
    
- **Bindings**
    
    - `source`: where the text comes from (e.g., `{ type: "field", name: "Notes" }`, or `concat:[...]`).
        
    - `target`:
        
        - `notePath`: explicit or resolver (`active`, field ref, etc.).
            
        - `section`: `{ name, level, createIfMissing }`.
            
        - `operation`: `{ strategy: append|prepend|replace }`.
            
    - Optional `format` (V1.1): callouts, timestamps, wrappers.
        
- **Validation**: non-empty `name`, `level ∈ 1..6` (warn on 1), `strategy` enum, resolvable `notePath`.
    
- **Errors**: `HeadingNotFound`, `AmbiguousHeading` (future), `SectionRangeComputeFailed`, `NoteResolveFailed`.

**Example (declarative body contract):**

```
{
  "contract": "bodyContent.v1",
  "bindings": [
    {
      "source": { "type": "field", "name": "Notes" },
      "target": {
        "notePath": "{{Target Note || active}}",
        "section": {
          "name": "{{Target Section || New Section Name}}",
          "level": "{{Heading Level || 2}}",
          "createIfMissing": true
        },
        "operation": { "strategy": "{{Insert Strategy || append}}" }
      }
    }
  ]
}
```

## Pipeline Orchestrator

- **Entry**: `runFormPipelines(ctx)` (single entrypoint).
    
- **Stage Groups**:
    
    1. `runFrontmatterStages(ctx)` → parse/validate/merge → enqueue YAML.
        
    2. `runBodyContentStages(ctx)` → resolve note → validate body contract → compute section range → enqueue body edits.
        
- **Shared infra**: `validationBus`, `errorBus`, `writeQueue`, `logger`.
    
- **Ordering**: Group 1 always precedes Group 2 if both contracts present.

## Modules (to add after V1 Step 7)

- `bodyContentContract.js` — registry + validate + normalize.
    
- `headingService.js` — read/ensure headings; compute section ranges.
    
- `bodyContentHandler.js` — apply strategies; enqueue writes.
    
- `contractBindings.js` (optional) — resolve `{{templated}}` values from `formResult`.

## Modal Form UX (runtime‑generated)

- For updates: single‑select of existing headings + free‑text **New Section Name**; level selector (default H2); strategy select; multiline input.
    
- For creates: template seeds initial sections → same selectors apply; body step runs after file creation.
    
- Duplicate headings: V1 picks first occurrence; V1.1 adds disambiguation (index/anchor).

## Test Plan (post V1)

- Append into existing H2; Prepend into new H3; Replace content range; Create flow with seeded sections; Duplicate headings; Large payloads; Cache refresh after heading creation.

## Migration Notes

- Remove any field‑local `applyToBody` usage in favor of a top‑level **body contract** block per form/intent.
    
- Keep frontmatter contract unchanged.

## Open Questions to Revisit

- Disambiguation UX for duplicate headings (indexing, paths like `H2 · Research › Experiments`).
    
- Multi‑section writes in one submission.
    
- Formatting helpers (callouts, timestamps, divider insertion).

## Next Action When Unpausing

1. Implement `bodyContentContract.js` + registry wiring.
    
2. Add `headingService` + `bodyContentHandler`.
    
3. Orchestrator: call `runBodyContentStages` after frontmatter.
    
4. Add validators + error mapping; write tests per plan.
---

# Objectives Based on our outline + current codebase:

## Pipelines
    
    - Keep **one shared `FieldPipeline`** (already in `mf_FieldPipeline.js`).
        
    - Add contract distinctions instead of building a separate pipeline.
        
    - This avoids duplicating preprocess/validate/transform logic.
        
## Schema Contracts
    
    - **Frontmatter schema contract** → current one (`registryContracts.fieldMapContract`).
        
    - **Body schema contract** → new contract, same pattern, but validates mappings for longtext + subheader insertion.
        
    - This contract would check:
        
        - fieldType: must be `TextArea` or `MarkdownBlock` (or similar).
            
        - requires a `subheader` selector property.
            
        - optional hierarchy (`level: 2 → ##`, `level: 3 → ###`, etc.).
            
## Registry Extension
    
    - Use `registryFactory` to create a `BodyContentRegistry` with its own contract.
        
    - Register “body fields” separately so ValidationBus can enforce correctness.
        
## Integration with ModalForms
    
    - `modalFormUtils` should:
        
        - Run the **frontmatter contract** for mapped fields.
            
        - Run the **body contract** for longtext → subheader mappings.
            
        - Then commit both via `FrontmatterIO.write(path, { frontmatter, body })`.
            
## Subheader Strategy
    
    - For **update** forms: populate a SingleSelect (or MultiSelect) with existing subheaders found in the note body.
        
    - For **create** forms: allow specifying subheaders in a MultiSelect; if not supported at runtime, fallback to a plain array input.
        
## ValidationBus Extension
    
    - Add `_common_bodyMap` rules, similar to `_common_fieldMap`:
        
        - Require `subheader` or `level`.
            
        - Ensure `fieldType` is body-compatible.
