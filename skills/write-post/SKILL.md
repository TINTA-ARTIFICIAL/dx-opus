---
name: write-post
description: >
  This skill should be used when the user wants to write a standalone post
  or a post series — trigger phrases like "quiero escribir un post sobre X",
  "empezar una serie de posts", "continuar mi post", "necesito el brief de
  este post", "sigamos con este post", "vamos a escribir el siguiente post
  de la serie", "ayúdame a terminar este post", "retomemos el post donde
  lo dejamos".
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

1. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_POST_BRIEF.md` — entry point of every POST session.
   Loads or creates the `WRITING_CONTEXT`, inventories the editor's material,
   and declares the session's starting state. **This prompt already includes
   (v1.1) PASO 3B — the mandatory research-prerequisite checkpoint — and the
   Q&A skip checkpoint. Do not repeat, summarize or weaken either checkpoint
   here; follow the prompt exactly as written.**
2. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_POST_EXPLORE.md` — used only when the editor's input
   is scarce, to develop the topic before processing sources.
3. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_SUMMARIZE_REF.md` — processes sources, distinguishing
   example-sources from argument-sources and protecting the editor's own
   material.
4. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_VERIFY_RESEARCH.md` — verifies claims, data and
   attributions flagged in the SOURCE_MAP.
5. **`QA_IDEAS`** — sequential positioning Q&A, always active unless explicitly
   skipped. Do not read `PROMPT_QA_IDEAS.md` directly — invoke the
   `shared-writing` skill (S9-03) and ask it for its `QA_IDEAS` function, the
   same delegation pattern used below for the final draft. `shared-writing`
   owns this prompt and is the single point of access to it.
6. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_POST_ANGLES.md` — proposes angles and narrative seeds
   over the full post-Q&A material.
7. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_PLAN_POST.md` — fixes the post's architecture and
   produces the `POST_SEED`, the canonical input for the final draft.
8. `${CLAUDE_PLUGIN_ROOT}/skills/write-post/PROMPT_SPLIT_POST.md` — invocable at any phase of the
   workflow to split a post into two autonomous units.

## Final draft — delegate, do not reimplement

Once a `POST_SEED` exists, invoke the `shared-writing` skill (S7-03) to
produce the final draft — do not reimplement `PROMPT_WRITE_POST.md`
(now in `${CLAUDE_PLUGIN_ROOT}/skills/shared-writing/`, per S9-03) here. Ask `shared-writing`
for its `WRITE_POST` function, passing the `POST_SEED`.

## Reusable data structures

No new structures.

- `TEMPLATE_POST_SEED.md` (canonical structure of the `POST_SEED`) and
  `TEMPLATE_POST_BRIEFING.md` (cross-session continuation template) now live
  in `${CLAUDE_PLUGIN_ROOT}/skills/shared-writing/` (S9-03) — read them there.
- `RESOURCE_WRITING_CONTEXT.md` (schema of the `WRITING_CONTEXT` artifact) and
  `RESOURCE_PUBLICATION_PROFILE.md` (schema of the publication profile) remain
  in `${CLAUDE_PLUGIN_ROOT}/writing/post/` — `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.c only
  lists `PROMPT_QA_IDEAS.md`, `TEMPLATE_POST_SEED.md` and `TEMPLATE_POST_BRIEFING.md` for
  the S9-03 move into `shared-writing`; these two were intentionally left out of that list
  and were not moved.

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

- Modifying the content of any prompt in `${CLAUDE_PLUGIN_ROOT}/skills/write-post/`
  (this skill's own folder) or of any of the four prompts wrapped by
  `shared-writing` (S9-03).
- The `shared-writing` skill (S7-03) — only invoked here, not built here.
- `SPEC_LEARNING_SIGNALS.md` — the `EDITOR_PROFILE`'s progressive learning
  mechanism, out of scope for all of Sprint 7, not just this ticket.
