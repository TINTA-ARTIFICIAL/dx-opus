---
name: knowledge-base
description: >
  This skill should be used when a research or evaluation task needs the
  system's authoritative source hierarchy or claim validation criteria —
  trigger phrases like "verificar la autoridad de esta fuente", "validar
  esta afirmación", or invoked internally by the research and evaluation
  skills rather than requested directly by the editor.
metadata:
  version: "0.1.0"
---

# Knowledge Base

## When to use this skill

Use this skill when a task needs to check the authority tier of a source, the
validation criteria for a claim, or the recommended research focus type for a
project. This skill has no workflow of its own that the editor typically
triggers directly — its main function is to serve as a reference consumed by
other skills (`research`, `evaluation` in Sprint 7) whenever they need the
system's canonical source hierarchy or claim validation criteria.

## What to read

Read these files directly, in full, whenever their content is needed. Do not
copy, summarize into this file, or cache their content elsewhere — they are
the single source of truth and are updated independently of this skill:

- `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md` — source authority hierarchy
  (Tier 1/2/3) organized by research topic, plus the `CANONICAL UPDATE SCHEMA`
  that governs how new sources and topics are added.
- `knowledge-base/RESOURCE_CLAIM_VALIDATION.md` — claim validation criteria
  (Universal Framework + Topic-Specific Criteria), plus its own
  `CANONICAL UPDATE SCHEMA`.
- `knowledge-base/RESOURCE_RESEARCH_FOCUS_TYPES.md` — the 7 research focus
  types (A–G) used to scope a research plan.

## How to use them

1. Identify which of the three resources answers the question at hand (source
   authority, claim validation, or research focus type) and read that file in
   full before answering — do not rely on prior summaries of its content.
2. If the calling skill (`research`, `evaluation`) needs to propose an update
   to `RESOURCE_SOURCE_AUTHORITY.md` or `RESOURCE_CLAIM_VALIDATION.md`, follow
   the procedures documented in that file's own `CANONICAL UPDATE SCHEMA`
   section — do not invent an update format here.
3. Writes to `RESOURCE_SOURCE_AUTHORITY.md` and `RESOURCE_CLAIM_VALIDATION.md`
   are additionally governed by the `PreToolUse` hook declared in
   `hooks/hooks.json`, which checks proposed edits against each file's
   `CANONICAL UPDATE SCHEMA` before they are applied. This skill does not
   duplicate that logic — it only points to where the schema and the
   enforcement mechanism live.

## Out of scope

- This skill does not implement propagation of SAH/CVC updates back into a
  shared knowledge base across projects (`DL_20260903_KB_004`) — that remains
  a separate, not-yet-implemented mechanism.
- This skill does not add new sources, topics, or criteria on its own — it
  only reads and points to the existing resources.
