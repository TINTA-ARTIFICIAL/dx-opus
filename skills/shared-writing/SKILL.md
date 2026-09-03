---
name: shared-writing
description: >
  This skill provides shared writing capabilities used by both the
  writing-post and activation skills — drafting a post from a POST_SEED,
  building a timeline or cast of characters, or running the editor
  positioning Q&A. It is typically invoked by those skills rather than
  triggered directly by the editor.
metadata:
  version: "0.1.0"
---

# Shared Writing

## When to use this skill

This skill has no workflow of its own that the editor typically triggers
directly. It exists so that `writing-post` and `activation` do not each
maintain their own copy of the same prompts — both invoke this skill by its
`name` (`shared-writing`) and tell it which of the four functions below they
need. The calling skill does not need to know the internal implementation,
only which function to request.

## Functions

This skill wraps four existing prompts. Read the prompt file in full at the
path given below whenever the function is invoked — do not copy, summarize,
or cache its instructions here. Each file is the single source of truth for
its own workflow and is versioned independently of this skill.

1. **`WRITE_POST`** — drafts a post from a `POST_SEED`.
   Read `writing/shared/PROMPT_WRITE_POST.md` and follow it as written. Its
   canonical input is a `POST_SEED` and, depending on the workflow stage, a
   `POST_BRIEFING` — see "Data structures consumed" below for where those are
   defined.

2. **`CREATE_TIMELINE`** — builds a chronology.
   Read `writing/shared/PROMPT_CREATE_TIMELINE.md` and follow it as written.

3. **`CREATE_CAST`** — builds a cast of characters.
   Read `writing/shared/PROMPT_CREATE_CAST.md` and follow it as written.

4. **`QA_IDEAS`** — runs the editor's positioning Q&A.
   Read `writing/post/PROMPT_QA_IDEAS.md` and follow it as written. **This
   file lives in `writing/post/`, not `writing/shared/`** — its physical
   location is known technical debt (flagged in the correction applied to
   `DL_20260416_SYSTEM_025`) that is out of scope for this skill to fix; the
   path above is where the file actually is today, not an assumption based
   on the other three functions. The prompt is already at v1.1 and includes
   PASO 6B (mandatory auto-save of the `INVENTARIO_IDEAS`) — follow it in
   full, including that step; do not skip it, summarize it, or re-implement
   a weaker version of it here.

## How to use this skill

1. Identify which of the four functions the calling skill requested
   (`WRITE_POST`, `CREATE_TIMELINE`, `CREATE_CAST`, or `QA_IDEAS`).
2. Read the corresponding prompt file in full, at the real path listed above.
3. Execute the prompt exactly as it is written — its own steps, checkpoints,
   and auto-save behavior (where present) are authoritative. This skill does
   not add, remove, or reorder any step of the wrapped prompts.
4. Return the prompt's output to the calling skill (`writing-post` or
   `activation`).

## Data structures consumed

No new data structures are defined by this skill. `WRITE_POST` reads and
produces the structures defined in `writing/post/TEMPLATE_POST_SEED.md` and
`writing/post/TEMPLATE_POST_BRIEFING.md` — read those files directly when
their structure is needed, do not copy their fields here.

## Out of scope

- Deciding when `writing-post` or `activation` should invoke each of the four
  functions — that logic belongs to those skills, not to this one.
- Moving `PROMPT_QA_IDEAS.md` into `writing/shared/` — that is separate,
  not-yet-scheduled technical debt.
- Modifying the content of any of the four wrapped prompts.
