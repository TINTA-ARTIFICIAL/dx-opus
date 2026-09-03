---
name: writing-post
description: >
  This skill should be used when the user wants to write a standalone post
  or a post series — trigger phrases like "quiero escribir un post sobre X",
  "empezar una serie de posts", "continuar mi post", "necesito el brief de
  este post".
metadata:
  version: "0.1.0"
---

# Writing Post

## When to use this skill

Use this skill whenever the editor wants to start, continue or plan a
standalone post or a post series (RAMA POST of the WRITING subsystem). It
covers the full workflow from session brief through research verification,
positioning Q&A, angle selection and post architecture — up to (but not
including) drafting the final text, which is delegated to `shared-writing`.

## Workflow — read each prompt by its real path when you reach that step

Do not copy, summarize into this file, or duplicate the content of any of
these prompts — read them directly, in full, at the point of the workflow
where they apply:

1. `writing/post/PROMPT_POST_BRIEF.md` — entry point of every POST session.
   Loads or creates the `WRITING_CONTEXT`, inventories the editor's material,
   and declares the session's starting state. **This prompt already includes
   (v1.1) PASO 3B — the mandatory research-prerequisite checkpoint — and the
   Q&A skip checkpoint. Do not repeat, summarize or weaken either checkpoint
   here; follow the prompt exactly as written.**
2. `writing/post/PROMPT_POST_EXPLORE.md` — used only when the editor's input
   is scarce, to develop the topic before processing sources.
3. `writing/post/PROMPT_SUMMARIZE_REF.md` — processes sources, distinguishing
   example-sources from argument-sources and protecting the editor's own
   material.
4. `writing/post/PROMPT_VERIFY_RESEARCH.md` — verifies claims, data and
   attributions flagged in the SOURCE_MAP.
5. `writing/post/PROMPT_QA_IDEAS.md` — sequential positioning Q&A, always
   active unless explicitly skipped. This same file is also exposed by
   `skills/shared-writing` (S7-03) — it is the same real artifact in both
   cases, referenced here by its actual path (`writing/post/`), not copied.
6. `writing/post/PROMPT_POST_ANGLES.md` — proposes angles and narrative seeds
   over the full post-Q&A material.
7. `writing/post/PROMPT_PLAN_POST.md` — fixes the post's architecture and
   produces the `POST_SEED`, the canonical input for the final draft.
8. `writing/post/PROMPT_SPLIT_POST.md` — invocable at any phase of the
   workflow to split a post into two autonomous units.

## Final draft — delegate, do not reimplement

Once a `POST_SEED` exists, invoke the `shared-writing` skill (S7-03) to
produce the final draft — do not reimplement `PROMPT_WRITE_POST.md`
(`writing/shared/`) here. Ask `shared-writing` for its `WRITE_POST` function,
passing the `POST_SEED`.

## Reusable data structures

No new structures. Reuse these as-is (all in `writing/post/`):

- `TEMPLATE_POST_SEED.md` — canonical structure of the `POST_SEED`.
- `TEMPLATE_POST_BRIEFING.md` — cross-session continuation template.
- `RESOURCE_WRITING_CONTEXT.md` — schema of the `WRITING_CONTEXT` artifact.
- `RESOURCE_PUBLICATION_PROFILE.md` — schema of the publication profile.

## Integrity hook — research prerequisite before the final draft

Writes/edits that produce a `POST_DRAFT` (the final post draft, via
`PROMPT_WRITE_POST`) are additionally governed by the `PreToolUse` hook
declared in `hooks/hooks.json`. That hook checks, before the write is
applied, whether research evidence exists (shared in `R_research/` or
post-specific in `WP_writing_post/` — see
`_system/resources/AUTO_SAVE_CONFIG.yaml` for the dual scope) or whether the
editor already gave an explicit, recorded skip decision (`research_skipped:
true`, per `PROMPT_POST_BRIEF.md` PASO 3B). This skill does not duplicate
that logic — it only points to where the checkpoint (PASO 3B) and its
structural enforcement (the hook) live. Both are complementary: the prompt
guides the conversation, the hook is the last line of defense if that
guidance gets bypassed.

## Out of scope

- Modifying the content of any prompt in `writing/post/`.
- The `shared-writing` skill (S7-03) — only invoked here, not built here.
- `SPEC_LEARNING_SIGNALS.md` — the `EDITOR_PROFILE`'s progressive learning
  mechanism, out of scope for all of Sprint 7, not just this ticket.
