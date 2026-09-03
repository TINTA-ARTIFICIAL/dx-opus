---
id: S7-08
title: Skill activation
type: skill
subsystem: SYSTEM
sprint: 7
status: DONE
priority: P2
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: 2026-09-03
branch: feat/s7-08-activation-skill
---

# S7-08 — Skill `activation`

## Contexto

Migra el subsistema ACTIVATION — el último de los 7 skills de workflow de Sprint 7. Su relación con `shared-writing` (S7-03) es la misma que la de `writing-post` (S7-07): invoca, no duplica.

## Interfaces

Crear `skills/activation/SKILL.md`.

Frontmatter:
```yaml
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
```

El cuerpo orienta hacia (todos en `activation/`, léelos por su ruta real, no dupliques):

- `activation/WORKFLOW_ACTIVATION.md` — secuencia canónica
- `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md` — Fase 0, análisis del corpus
- `activation/PROMPT_IDENTIFY_NARRATIVE_SEEDS.md` — Fase 1
- `activation/PROMPT_CREATE_BOOK_BRIEF.md` — Fase 2B, propuesta de nuevo libro
- Para timeline/cast/Q&A de posicionamiento/redacción del post: invoca la skill `shared-writing` (S7-03) — no dupliques esos prompts aquí.
- Para evaluar el contenido de activación: invoca la skill `evaluation` (S7-06), evaluador `PROMPT_EVALUATE_ACTIVATION.md` (S7-05) — invocación soft, no bloqueante, mismo criterio que el resto del sistema.

## Estructuras de datos

Ninguna nueva. `ACTIVATION_CONTEXT`, `BOOK_BRIEF`, `POST_PLAN`, `CONTENT_STRATEGY` ya tienen ruta y naming en `_system/resources/AUTO_SAVE_CONFIG.yaml`, sección `ACTIVATION`.

## Decisiones de diseño

- No dupliques contenido de ningún prompt de `activation/` ni de `WORKFLOW_ACTIVATION.md`.
- Si al escribir esta skill encuentras que `WORKFLOW_ACTIVATION.md` sigue describiendo `PROMPT_QA_IDEAS` como `[Writing/shared]` de forma inconsistente con su ubicación real (`writing/post/`) — ya señalado y corregido conceptualmente en `_system/SPEC_PLUGIN_ARCHITECTURE.md` §5.2 — no lo reescribas tú mismo en `WORKFLOW_ACTIVATION.md`; limítate a referenciar la ruta real desde el `SKILL.md` (a través de `shared-writing`, S7-03) y señala la inconsistencia del documento fuente en tu entrega si sigue sin corregirse.

## Fuera de scope

- Modificar el contenido de cualquier prompt de `activation/` o de `WORKFLOW_ACTIVATION.md`.
- Corregir la inconsistencia de ubicación de `PROMPT_QA_IDEAS` dentro de `WORKFLOW_ACTIVATION.md` — señalar, no corregir (ver Decisiones de diseño).
- Las skills `shared-writing` (S7-03) y `evaluation` (S7-06) — solo se invocan.

## Casos de test obligatorios

1. `skills/activation/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que no se duplica contenido de ningún prompt de `activation/`, y que timeline/cast/Q&A/redacción se delegan a `shared-writing`.
3. Confirmar que la invocación al evaluador de activación es soft (no bloqueante).
4. Verificación manual: trazar el flujo completo análisis de colección → semillas narrativas → book brief y confirmar que el `SKILL.md` da suficiente orientación de secuencia.

## Estado de revisión

Aprobado: 2026-09-03
