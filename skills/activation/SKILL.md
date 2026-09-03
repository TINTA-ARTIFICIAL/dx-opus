---
name: activation
description: >
  This skill should be used when the user wants to turn a finished book (or
  a collection of posts) into a content campaign — trigger phrases like
  "quiero activar mi libro", "generar posts a partir de este libro",
  "proponer ideas para un nuevo libro desde este material".
metadata:
  version: "0.1.0"
---

# Activation

## When to use this skill

Use this skill when the editor wants to turn one or more finished books (or
a collection of posts) into a content activation campaign — from corpus
analysis through narrative seeds to, in parallel, either a content strategy
for posts (Ruta P) or a brief for a new book (Ruta L, `BOOK_BRIEF`). This
skill orchestrates the ACTIVATION subsystem; it does not contain workflow
logic of its own.

## Canonical sequence

Read `activation/WORKFLOW_ACTIVATION.md` in full before orienting the
editor — it is the single source of truth for the phase sequence (Fase 0 to
Fase 5), the dual-output architecture (Ruta P vs Ruta L, and the
CHECKPOINT DE ROUTING that splits them), phase inputs/outputs, and
checkpoints. Do not reproduce its diagrams or phase descriptions here —
always read the file itself, since it may be updated independently of this
skill.

## Artifacts and when to use each

Read each artifact directly, by its real path, at the point in the workflow
where `WORKFLOW_ACTIVATION.md` calls for it — do not copy, summarize, or
cache their content into this file:

- `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md` — Fase 0, the
  entry point. Analyzes the book(s)/corpus and produces the
  `ACTIVATION_CONTEXT`, with or without existing `RESEARCH_REPORT`(s) as
  enrichment.
- `activation/PROMPT_IDENTIFY_NARRATIVE_SEEDS.md` — Fase 1. Exhaustive
  mining of narrative seeds from `ACTIVATION_CONTEXT`, timeline, cast and
  editor profile. Feeds the routing checkpoint that classifies seeds into
  Ruta P / Ruta L / Ruta P+L.
- `activation/PROMPT_CREATE_BOOK_BRIEF.md` — Fase 2B (Ruta L), parallel to
  the post-production phases of Ruta P. Produces the `BOOK_BRIEF`, a set of
  structured proposals for a new book — the closing step of the
  Activation → Research loop.

## Delegate to shared-writing — do not reimplement

For timeline, cast of characters, the editor's positioning Q&A, and the
final drafting of a piece of content, invoke the `shared-writing` skill
(S7-03) — do not reimplement any of `PROMPT_CREATE_TIMELINE.md`,
`PROMPT_CREATE_CAST.md`, `PROMPT_QA_IDEAS.md` or `PROMPT_WRITE_POST.md`
here. Ask `shared-writing` for the specific function needed
(`CREATE_TIMELINE`, `CREATE_CAST`, `QA_IDEAS`, `WRITE_POST`), passing the
activation-specific inputs (`ACTIVATION_CONTEXT`, `BOOK_BRIEF`,
`POST_PLAN`, selected editor profile) that `WORKFLOW_ACTIVATION.md`
specifies for that step.

## Evaluate activation content — soft, non-blocking

To evaluate activation content (posts, articles, threads produced through
this workflow, or a `BOOK_BRIEF`), invoke the `evaluation` skill (S7-06),
which routes to `evaluation/PROMPT_EVALUATE_ACTIVATION.md` (S7-05). This
invocation is soft and non-blocking, the same criterion used across the
rest of the system: a `RED` evaluation result never prevents the editor
from continuing — it is feedback, not a gate. Do not add any gate or hook
here that would block on the evaluation result.

## Known documentation inconsistency — do not fix here

`activation/WORKFLOW_ACTIVATION.md` still tags `PROMPT_QA_IDEAS` as
`[Writing/shared]` in several places (its `DEPENDENCIES` block, the Fase 4
header, and older changelog entries), which is inconsistent with the
artifact's real path, `writing/post/PROMPT_QA_IDEAS.md`. This has already
been resolved conceptually in `_system/SPEC_PLUGIN_ARCHITECTURE.md` §5.2 —
`PROMPT_QA_IDEAS` is shared by design (`DL_20260411_ACTIVATION_022`,
correction applied to `DL_20260416_SYSTEM_025`) and is exposed through the
`shared-writing` skill — but the physical-location tag inside
`WORKFLOW_ACTIVATION.md` itself has not been corrected as of this writing.
This skill does not rewrite `WORKFLOW_ACTIVATION.md` to fix that tag — out
of scope for this ticket (S7-08). When orienting the editor to that prompt,
always use its real path via `shared-writing`
(`writing/post/PROMPT_QA_IDEAS.md`), not the `[Writing/shared]` tag as
currently written in the workflow document.

## Reusable data structures

No new structures. `ACTIVATION_CONTEXT`, `BOOK_BRIEF`, `POST_PLAN` and
`CONTENT_STRATEGY` already have their path and naming defined in
`_system/resources/AUTO_SAVE_CONFIG.yaml`, section `ACTIVATION` — read that
file, do not reproduce its naming rules here.

## Out of scope

- Modifying the content of any prompt in `activation/`, or of
  `WORKFLOW_ACTIVATION.md` — including the `PROMPT_QA_IDEAS` location tag
  described above.
- The `shared-writing` skill (S7-03) and the `evaluation` skill (S7-06) —
  only invoked here, not built here.
- Fase 2A (`CREATE_CONTENT_STRATEGY`), Fase 3 (`DESIGN_POST_PLAN`) and
  Fase 5 (`EVALUATE_ACTIVATION_CONTENT` as a dedicated workflow step) —
  `WORKFLOW_ACTIVATION.md` still marks their tools as `[DISEÑAR]`
  (pending design); this skill orients toward the workflow document for
  their current status, it does not design them.
