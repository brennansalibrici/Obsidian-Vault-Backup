---
---

# Executive summary (what’s missing / needs shoring up)

## A. Must‑have foundations (do these first)

1. Dedicated I/O layer (atomic, safe, observable)  
    Right now the orchestrator touches `app.vault` directly and assembles file paths/names itself. For scale and safety you want two thin modules you already spec’d in your docs but haven’t implemented in code yet:

- **`fileWriter`**: atomic write (temp file → fs rename), backup/rollback on failure, limited retries with jitter, and a **per‑path mutex** to prevent concurrent clobbers.
    
- **`frontmatterIO`**: single authority for YAML parse/serialize, quoting/escaping rules, multi‑select normalization, and wiki‑link stringify.  
    This removes file race conditions, centralizes YAML quirks, and keeps business logic out of the orchestrator/handlers.

2. Error bus as a first‑class singleton (and make its factory canonical)  
    Multiple modules try to access `window.customJS.createerrorBusInstance` / `createErrorBusInstance` (note the naming drift). Publish **exactly one** factory name in bootstrap (e.g., `createErrorBusInstance`) and consume that everywhere. Also add:

- `.with({domain, module})` to pre‑bind context.
    
- Stable **error codes** → **user messages** mapping + a `toToast()` adapter (UI) and `toLog()` (structured log) so presentation is decoupled.

3. Structured logger + request/trace IDs  
    Add a tiny `logger` with levels (debug/info/warn/error), a `requestId` per orchestrated run, and timing spans (parse/validate/write). Emit JSON lines to console and optionally a rotating file/note. This unlocks profiling at scale and post‑mortems without digging through ad‑hoc `console.log`s.
    
4. Vault indexing & caches (kill O(n) folder scans)  
    Functions like unique filename checks currently iterate `folder.children`. On big folders that becomes expensive. Introduce a **VaultIndex** service that:

- Caches folder → `Set(basename)` for O(1) name existence checks.
    
- Subscribes to vault events to keep the index hot and correct.
    
- Exposes helpers like `nextCounter(prefix)` so count‑tracking types don’t rescan on every create.  
    This is the main lever to stay snappy at 10k+ files.

5. Registry immutability + memoization  
    Your registries (field types, field handlers, intents) should be **built once in bootstrap**, frozen, and accessed via getters that return the same object (no re‑building per call). Memoize the field‑type pipeline’s handler lookup. This cuts start‑up churn and removes a whole class of “registry not ready” race conditions.
    
6. Formal schema/contracts for field maps  
    Codify the field‑map shape (e.g., Zod/TypeScript type) so each entry must be one of:

- `{ modalKey: string, key?: string, fieldType?: TYPE, intent?: INTENT, isLink?: boolean }`
    
- `{ resolver: (formData, ctx, fmt) => value, key: string, fieldType?: TYPE, ... }`  
    Then **validate maps at bootstrap** and refuse to run if a map is malformed. That prevents “silent nothing happened” bugs on form changes.

## B. High‑value enhancements (soon after)

7. Intent stage as a true post‑type pipeline  
    You already separated field‑type normalization from “meaning” (title, filename, slug, deadline). Finish the loop by:

- Letting the **Intent** stage read and rewrite dependent fields (e.g., `title` → recompute `slug`) in a predictable order.
    
- Emitting **derived‑field diffs** so handlers know what changed.

8. Cross‑field rules module (not just per‑field validation)  
    Add a `crossFieldRules` registry where rules are declarative (`requires:A if B`, `oneOf[A,B]`, `mutuallyExclusive`, `implies`) and run after type normalization but before write. Surface violations through the error bus with clear fixes.
    
9. Event hooks bus  
    Emit **domain events**: `onCreate(fileClass, path, fm, ctx)`, `onUpdate(...)`. Keep it in‑proc (simple pub/sub). This enables secondary effects (e.g., backlink maintenance, daily note rolls, task sync) without entangling the core write path.
    
10. Dry‑run, quarantine, and migrations  
    Wire up the “**dry‑run**” flag so every planned write logs a diff without touching disk. When frontmatter parse fails, write the whole file to `/_quarantine` and surface a fix‑it message. Add a tiny **schemaVersion** in frontmatter and a **migration runner** so future field or enum changes get handled safely.
    
11. Batch jobs + progress UI  
    For large‑scale edits (migrating a field across a folder): a `JobRunner` that processes files in chunks with backpressure and emits progress (successes, skips, errors). This keeps the UI responsive and prevents long‑running locks.

## C. Quality & maintainability (nice‑to‑have but worth it)

12. TypeScript boundaries  
    Keep Obsidian/runtime JS if you want, but define **.d.ts** types for: `FieldMap`, `PipelineCtx`, `Handler`, `ValidationResult`, `ErrorToken`. Compile‑time guardrails pay off as maps and handlers multiply.
    
13. Config & feature flags  
    Centralize config (paths, template locations, merge strategies) in one place with environment overrides. Use a tiny feature‑flag helper so new behaviors ship dark and can be toggled per‑vault.
    
14. Test scaffolding

- **Unit**: field‑type handlers, intent transforms, error formatting.
    
- **Integration**: orchestrator happy path (create/update), I/O failure injection, map validation.
    
- **Fixtures**: sample `formData` for each file type with edge cases.

# Concrete “add this” blueprint

Below are the minimum slices to implement so you lock in safety and speed:

## 1) `frontmatterIO` (single authority for YAML)

- `read(path): { fm: object, body: string } | throws`
    
- `write(path, { fm, body }, { mergeStrategy }): void | throws`
    
- `mergeStrategy`: `set | append_unique | prepend | custom(fn)`
    
- Normalizes wiki‑links, arrays vs scalars, booleans, and dates consistently.

## 2) `fileWriter` (atomic, with locks & backups)

- `withLock(path, fn)`: queue per path, prevents concurrent writes.
    
- `atomicWrite(path, content)`: write to `path.tmp`, fsync, then rename.
    
- `backup(path)`: copy `path` → `path.bak` (rotate N=3).
    
- `retry(fn, {times, backoff})`: use for transient I/O errors.
    
- Emits structured events to `logger` and errors to `errorBus`.

## 3) Canonical `errorBus` factory

- Bootstrap publishes **one**: `window.customJS.createErrorBusInstance = () => new ErrorBusCtor()`
    
- Provide helpers: `err(type, code, ctx, {domain})`, `toast(token, {ui, console, level})`, `log(token)`
    
- Pre‑bind module context: `const EB = ErrorBus.with({ module: 'ModalFormUtils' })`

## 4) `VaultIndex`

- Builds on start: folder → `Set(basenames)` and path → metadata cache.
    
- Subscribes to create/rename/delete to keep hot.
    
- API: `exists(folder, base)`, `nextCounter(prefix, folder)`, `list(folder, {limit, filter})`
    
- Drop this into filename uniqueness and any “count tracking” title logic.

## 5) Registry bootstrap hardening

- Build `FIELD_TYPE_REGISTRY`, `FieldHandler` registry, `INTENT_REGISTRY` **once**, freeze, and expose:
    
    - `window.customJS.FIELD_TYPE_ENUM` (canonical enum)
        
    - `window.customJS.INTENT` (labels)
        
- Validate **all field maps** at bootstrap and refuse to start if any are invalid (clear report via errorBus).

# Why these matter for 10k+ files

- **Performance**: Indexes remove hot‑path folder scans; memoized registries avoid rebuilds; batched jobs keep the UI responsive.
    
- **Correctness**: Atomic writes + locks = no torn writes; centralized YAML handling avoids “one field serialized differently here vs there”.
    
- **Maintainability**: Clear contracts (maps/types/intents), frozen registries, and a single error/logger surface mean new file types are “additive,” not “surgery.”
    
- **Observability**: With request IDs + timings, you can spot slow handlers, pathological maps, and I/O hotspots immediately.

# Suggested implementation order (fastest ROI)

1. ErrorBus factory + Logger (1 day): unify naming and start emitting structured logs.
    
2. FrontmatterIO + FileWriter (2–3 days): shift all disk/YAML touches behind this API.
    
3. VaultIndex (1 day): drop into filename logic and any count‑based titles.
    
4. Registry freeze + Map validation (0.5–1 day): stabilize startup; fail fast on map mistakes.
    
5. Cross‑field rules + Event hooks (1–2 days): unlock clean growth for new objects and integrations.

## 'Will this system also support 100s of thousands of notes? '

Short answer: **yes—your current design can grow to hundreds of thousands of notes** with a few targeted upgrades. The core patterns you already use (frozen registries + bootstrap, orchestration separated from handlers, typed validation, error bus) are fundamentally scale-friendly. What will limit you at 100k+ are a handful of O(n) filesystem walks, lack of a centralized write queue, and missing “always-on” observability. Here’s the concrete punch-list to make it lifetime-proof.

---

### What already scales well

- **Singleton registries via bootstrap + frozen enums.** You build FILE_CLASS/FIELD_TYPE/INTENT at startup and expose stable factories and enums; that avoids per-interaction churn and keeps lookups O(1).
    
- **Validation gates before I/O.** ValidationBus enforces “handler exists”, “template exists”, and basic map sanity; these fail fast and prevent expensive I/O retries.
    
- **Clear layered flow with a dedicated Writer stage.** Your architecture doc already calls for a Writer that does atomic writes + backup and a Logger/Telemetry step. Implementing those solidifies durability and visibility.
    
- **Immutability on map registries.** The groupTypeFilter registry is deep-frozen and indexed, which is perfect for read-heavy, long-running sessions.

---

### Bottlenecks that will bite at 100k+ (and fixes)

1. **Folder scans on hot paths (O(n) per create).**
    
    - Today you enumerate `folder.children` to count matches and to ensure unique filenames / “next counter”. That’s fine at hundreds—**not** fine at tens of thousands in a single folder. Also for countTracking you sweep all names to find max.  
        **Fix:** introduce an **IndexService** (per-folder set of basenames + lightweight counters) maintained by vault event hooks. Then `ensureUniqueFilename` and “next count” become O(1).
        
2. **No centralized write queue / backpressure.**
    
    - Multiple concurrent creates/updates can thrash the vault (and Obsidian’s UI). You already separate “Writer” in the plan, but it’s not implemented.  
        **Fix:** a **WriteQueue** (global concurrency=1–2, per-path mutex) that batches and de-duplicates writes and serializes frontmatter mutations.
        
3. **I/O is synchronous in places and can block UI.**
    
    - Frontmatter writes and template reads are direct calls from UI actions.  
        **Fix:** route all file reads/writes through the Writer with small async chunks (yield via microtasks) and optional idle batching for non-interactive operations.
        
4. **Observability not yet wired.**
    
    - You plan Logger/Telemetry + Profiler hooks; implementing them is key at scale to spot hot folders and slow handlers.  
        **Fix:** structured NDJSON log (one line per op with timings, fileClass, bytes, cache hits) and a cheap in-vault `/logs/` writer or plugin data file.
        
5. **Durability & recovery policy needs to be real, not aspirational.**
    
    - The error strategy and quarantine folder are specified; ensure the Writer actually **atomically** writes and backs up before mutate.  
        **Fix:** write temp → fsync (where available) → rename; fallback to `/_quarantine` on parse/merge failures.
        
6. **Schema/version migrations.**
    
    - Validation covers presence/shape, but nothing tracks versions per fileClass.  
        **Fix:** add `schema_version` in frontmatter; keep small migration fns per fileClass in a `migrations/` registry. Run opportunistically during update.
        
7. **Memory caps for caches.**
    
    - Registries are fine; **runtime** caches (index, counters) need explicit bounds.  
        **Fix:** size-bounded LRU for rarely used folders; persist index to plugin data and reload lazily.