
https://chatgpt.com/share/68a92aff-b380-8004-b9e8-c289fd3be78e

SAY THIS TO START - ''Use Build Plan: Brennan‑ObsSys v1. Open Conversation N: …" 
					"Open Conversation Line..."

# Conversation plan (revised to include body‑content insertion)

Below are tightly scoped “threads.” To open any one, copy the **Say this to start** line. I’ll auto‑load this plan and your uploaded files (registries, modalFormUtils, etc.) as the source of truth (e.g., filename scans and maps in `modalFormUtils`, handlers/registries in your current code).

---

## 1) ErrorBus factory + structured Logger (bootstrap first)

**Goal:** Canonicalize `createErrorBusInstance` (remove naming drift), add `.with({ domain, module })`, and a lightweight JSON logger with `requestId` + timing spans. Wire both into bootstrap.  
**Deliverables:**

- `errorBus` factory normalization + helpers (`err`, `toast`, `toLog`, `with`)
    
- `logger.js` (levels, requestId, spans, console JSON lines)
    
- Bootstrap registration + usage examples  
    **Natural questions:** output format (JSON vs pretty), where logs live (console vs rotating note), default domains.  
    **Say this to start:** **Open Conversation 1: ErrorBus + Logger.**
    

---

## 2) Dedicated I/O layer: `fileWriter` + `frontmatterIO`

**Goal:** Atomic writes, per‑path mutex, retries; single YAML authority (parse/serialize, arrays, wiki‑links). This removes race conditions and centralizes YAML quirks.  
**Deliverables:**

- `fileWriter.js`: `withLock(path, fn)`, `atomicWrite`, `backup(path, rotate=3)`, `retry`
    
- `frontmatterIO.js`: `read(path) -> { fm, body }`, `write(path, { fm, body }, { mergeStrategy })`
    
- Integration points in orchestrator/handlers (no more direct `app.vault` writes)  
    **Natural questions:** merge strategies you want, backup rotation count, dry‑run location.  
    **Say this to start:** **Open Conversation 2: I/O layer (fileWriter + frontmatterIO).**
    

---

## 3) VaultIndex (kill O(n) folder scans)

**Goal:** Cache `folder → Set(basenames)`, subscribe to vault events, expose `exists`, `nextCounter(prefix)`. Replace `ensureUniqueFilename`’s scan.  
**Deliverables:** `VaultIndex.js` + drop‑in changes in `modalFormUtils`.  
**Natural questions:** persistence across sessions, invalidation policy, large‑folder memory footprint.  
**Say this to start:** **Open Conversation 3: VaultIndex.**

Don't forget to:
- **Contracts**: We can codify a `fieldMapContract` (likely in `validationBus.js`) so malformed maps throw `SCHEMA_MISMATCH`.
---

## 4) Registry hardening (immutability + memoization)

**Goal:** Build registries once at bootstrap, freeze them, memoize lookups; remove “registry not ready” races. Validate field maps at startup.  
**Deliverables:**

- Bootstrap changes to publish canonical enums (`window.customJS.FIELD_TYPE_ENUM`, `INTENT`)
    
- Freeze registries; memoize handler lookups in the field pipeline
    
- Fail‑fast map validation report via ErrorBus  
    **Natural questions:** strict fail vs soft warn, migration path for legacy symbols.  
    **Say this to start:** **Open Conversation 4: Registry hardening + map validation.**
    

---

## 5) Formal schema/contracts for FieldMaps

**Goal:** Enforce map shapes to avoid silent failures. Validate all maps at bootstrap.  
**Deliverables:**

- Schema (Zod or lite validator) covering `{modalKey|resolver}`, `key`, `fieldType`, optional `intent`, `isLink`
    
- Lints for unknown/unused fields  
    **Natural questions:** Zod vs hand‑rolled, legacy map compatibility.  
    **Say this to start:** **Open Conversation 5: FieldMap schema/contracts.**
    

---

## 6) **Body content insertion (NEW): long‑text → subheader sections**

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

## 7) Intent stage as a true post‑type pipeline

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