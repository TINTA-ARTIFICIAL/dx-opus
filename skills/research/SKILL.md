---
name: research
description: >
  This skill should be used when the user wants to research a topic for a
  book or post — trigger phrases like "quiero investigar sobre X", "necesito
  hacer research para mi libro", "procesa estas referencias", "profundiza en
  este tema".
metadata:
  version: "0.1.0"
---

# Research

## When to use this skill

Use this skill when the editor wants to start or continue investigating a
topic for a future book or post — from raw references all the way to a
validated RESEARCH_REPORT (book) or RESEARCH_DEEP_DIVE (post). This skill
orchestrates the RESEARCH subsystem; it does not contain workflow logic of
its own.

## Canonical sequence

Read `research/WORKFLOW_RESEARCH.md` in full before orienting the editor —
it is the single source of truth for the phase sequence (Fase 0 to Fase 5),
the RAMA A (post) vs RAMA B (libro) decision, phase inputs/outputs, and
checkpoints. Do not reproduce its diagram or phase descriptions here — always
read the file itself, since it may be updated independently of this skill.

## Artifacts and when to use each

Read each artifact directly, by its real path, at the point in the workflow
where `WORKFLOW_RESEARCH.md` calls for it — do not copy, summarize, or cache
their content into this file:

- `research/PROMPT_SUMMARIZE_REFERENCES.md` — Fase 1, the entry point of the
  workflow. Turns raw references into REFERENCE_SUMMARY, RESEARCH_PLAN and
  NARRATIVE_BRIDGE. **This prompt already includes (v4.3) a mandatory
  checkpoint that stops the process right after generating those three
  artifacts and forbids auto-advancing to any further phase without the
  editor's explicit instruction — that protection closes production bugs
  #52 and #66 and lives entirely inside the prompt itself. This skill must
  not repeat, summarize, or weaken that checkpoint, nor offer any shortcut
  around it.**
- `research/PROMPT_UPDATE_VALIDATION_CHECKLIST.md` — Fase 2. Updates
  `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md` and
  `knowledge-base/RESOURCE_CLAIM_VALIDATION.md` with sources and validation
  checks specific to the current topic. Writes to those two files are
  additionally governed by the `PreToolUse` hook declared in
  `hooks/hooks.json` (S6-04) — see the `knowledge-base` skill for details,
  this skill does not duplicate that logic.
- `research/GUIDE_ANNOTATION_PHASE3.md` — Fase 3. Guides the editor (manual,
  no AI execution) through annotating REFERENCE_SUMMARY and RESEARCH_PLAN
  with TASK/LINE/COMMENT flags before deep research begins.
- `research/PROMPT_RESEARCH_DEEP_DIVE.md` — Fase 4A, RAMA A. Neutral deep
  investigation oriented to a post (also useful as a complement for books).
- `research/PROMPT_CREATE_RESEARCH_PLAN.md` and
  `research/PROMPT_EXECUTE_RESEARCH_PLAN.md` — Fase 4B, RAMA B. Structured
  research for a book: `CREATE_RESEARCH_PLAN` produces
  RESEARCH_PLAN_DETAILED and WRITING_INSTRUCTIONS_ADAPTED for editor
  review and approval; `EXECUTE_RESEARCH_PLAN` then executes the research
  jobs and writes the RESEARCH_REPORT.

## Editorial approval before executing the research plan

`research/PROMPT_EXECUTE_RESEARCH_PLAN.md` section "1.2 Prerequisites"
states in prose that it must not proceed without editor-approved
RESEARCH_PLAN_DETAILED and WRITING_INSTRUCTIONS_ADAPTED. That prerequisite is
additionally enforced by a `PreToolUse` hook declared in `hooks/hooks.json`:
before any write/edit that produces a RESEARCH_REPORT via
`PROMPT_EXECUTE_RESEARCH_PLAN`, the hook checks the conversation for explicit
evidence that the editor already reviewed and approved both documents, and
asks the user (`ask_user`) if that evidence is missing, instead of assuming
consent. This skill does not duplicate that check — it only points to where
it lives.

## Out of scope

- Modifying the content of any `PROMPT_*.md`, `WORKFLOW_RESEARCH.md`, or
  `GUIDE_ANNOTATION_PHASE3.md` — this skill only orients toward them.
- The `knowledge-base` skill — already built (S6-04), only referenced above.
- Any logic in `writing-post`/`writing-book` about when to require prior
  research — that lives in those skills, not here.
