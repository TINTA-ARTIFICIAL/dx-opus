---
name: evaluation
description: >
  This skill should be used when the user wants quality feedback on
  research, a book, a post, or activation content — trigger phrases like
  "evalúa este capítulo", "revisa el estilo de este post", "¿esta
  investigación es sólida?", "dame feedback de calidad".
metadata:
  version: "0.1.0"
---

# Evaluation

## When to use this skill

Use this skill whenever the editor wants quality feedback on an artifact
already produced by another subsystem — a research report, book prose,
a book's adherence to editorial style, a post, or an activation planning
artifact. This skill orchestrates the EVALUATION subsystem; it does not
contain evaluation logic of its own — all scoring, dimensions and
thresholds live in the five evaluator prompts referenced below.

## Canonical contract — read before invoking any evaluator

Read `evaluation/RESOURCE_EVALUATION_FRAMEWORK.md` in full before invoking
any evaluator — it is the single source of truth for the `EVALUATION_RESULT`
output contract (`status`, `score`, `decision_guidance`, `blocking_issues`,
`improvement_areas`, `strengths`) that all five evaluators below implement.
Do not reproduce that schema here — always read the file itself, since the
contract can be versioned independently of this skill.

## Evaluators and when to use each

Read the evaluator directly, by its real path, once you know which artifact
the editor wants evaluated — do not copy, summarize, or cache their content
into this file:

- `evaluation/PROMPT_EVALUATE_RESEARCH_REPORT.md` — evaluates a
  RESEARCH_REPORT or RESEARCH_DEEP_DIVE, pre-writing (before the editor
  starts drafting from it). Central question: is the investigation solid?
- `evaluation/PROMPT_EVALUATE_BOOK_CONTENT.md` — evaluates the already-written
  text of a book or chapter, post-writing / pre-publication. Central
  question: does the text cite well and avoid overclaiming beyond its
  sources?
- `evaluation/PROMPT_EVALUATE_BOOK_STYLE.md` — evaluates a book or chapter's
  adherence to the editor's editorial profile (voice, tone, patterns). Does
  not apply to posts, articles, or research reports — see its own
  "NO aplicable a" list.
- `evaluation/PROMPT_EVALUATE_POST.md` — evaluates a post or article ready
  for publication: narrative core, structure, editorial voice, rigor of
  claims, editorial completeness.
- `evaluation/PROMPT_EVALUATE_ACTIVATION.md` — evaluates activation
  *planning* artifacts (ACTIVATION_CONTEXT, BOOK_BRIEF, CONTENT_STRATEGY)
  produced before any publishable content exists. Does not evaluate
  finished pieces of content.

## Choosing the right evaluator

Each evaluator prompt above already documents its own selection criteria —
read the relevant section before asking the editor to clarify, do not invent
a new selection criterion here:

- `PROMPT_EVALUATE_RESEARCH_REPORT.md`, section "When to Use This Prompt"
  ("No uses cuando").
- `PROMPT_EVALUATE_BOOK_CONTENT.md`, sections "Diferencia con
  EVALUATE_RESEARCH_REPORT" and "Cuándo usar este prompt" ("No usar
  cuando").
- `PROMPT_EVALUATE_BOOK_STYLE.md`, section "PROPÓSITO" ("Aplicable a" /
  "NO aplicable a").
- `PROMPT_EVALUATE_POST.md`, section "ROL Y ALCANCE" ("Lo que NO evalúas").
- `PROMPT_EVALUATE_ACTIVATION.md`, sections "ROL Y ALCANCE" ("Lo que NO
  evalúas") and "SECCIÓN 5: DIFERENCIA CON LOS OTROS EVALUADORES".

If the editor's request is ambiguous between two evaluators (for example,
book content vs. book style, or activation vs. post), read the sections
listed above before proceeding.

## Editorial confidence by design — no blocking gate

A `RED` result from any evaluator does not block the editor from
continuing. This is a deliberate design decision of
`RESOURCE_EVALUATION_FRAMEWORK.md` (see its "SECCIÓN 5: FILOSOFÍA DE
EVALUACIÓN", also cited in `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4):
evaluators inform the editor's decision, they do not enforce it. This
skill must not implement — and must not add — any gate, hook, or check
that prevents the editor from proceeding after a RED. Show
`decision_guidance` and `blocking_issues` to the editor and let them
decide.

## Out of scope

- Modifying the content of any of the five evaluator prompts or of
  `evaluation/RESOURCE_EVALUATION_FRAMEWORK.md`.
- Building `evaluation/PROMPT_EVALUATE_ACTIVATION.md` — already built in
  S7-05, not part of this skill.
- Any hook — evaluation gates stay as soft instruction, not structural
  enforcement (see "Editorial confidence by design" above).
