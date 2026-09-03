---
id: S7-07
title: Skill writing-post
type: skill
subsystem: SYSTEM
sprint: 7
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: 2026-09-03
branch: feat/s7-07-writing-post-skill
---

# S7-07 — Skill `writing-post`

## Contexto

Migra la RAMA POST del subsistema WRITING. Es la skill más sensible de Sprint 7 en términos de integridad: issue #63 (POST se escribía sin investigación previa) ya se corrigió a nivel de prompt en `writing/post/PROMPT_POST_BRIEF.md` v1.1 (PASO 3B, checkpoint obligatorio con confirmación explícita del editor para saltarse investigación). Este ticket añade la capa estructural equivalente (hook) que ese fix de Sprint 5 no podía dar por sí solo — mismo criterio que llevó a construir el hook de `knowledge-base` en vez de confiar solo en prosa.

## Interfaces

Crear `skills/writing-post/SKILL.md`.

Frontmatter:
```yaml
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
```

El cuerpo orienta hacia (todos en `writing/post/`, léelos por su ruta real, no dupliques):

- `writing/post/PROMPT_POST_BRIEF.md` — entrada del workflow. **Ya incluye (v1.1) el PASO 3B de verificación de investigación previa y el checkpoint de skip de Q&A — no los repitas ni los debilites al envolver el prompt.**
- `PROMPT_POST_EXPLORE.md`, `PROMPT_SUMMARIZE_REF.md`, `PROMPT_VERIFY_RESEARCH.md`, `PROMPT_QA_IDEAS.md` (este último también expuesto por `skills/shared-writing` — S7-03; referencia el mismo archivo real, no una copia), `PROMPT_POST_ANGLES.md`, `PROMPT_PLAN_POST.md`, `PROMPT_SPLIT_POST.md`
- Para la redacción final del post: invoca la skill `shared-writing` (S7-03) — no dupliques `PROMPT_WRITE_POST.md` aquí.

### Hook: prerequisito de investigación antes de escribir el borrador final del post

Añade una entrada nueva a `hooks/hooks.json` (el archivo ya tiene entradas de S6-04 y, si se mergeó antes, de S7-01 — añade la tuya al array `PreToolUse`, nunca sobrescribas las existentes):

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "prompt",
      "prompt": "Si esta escritura/edición ($TOOL_INPUT) no es un POST_DRAFT (el borrador final de un post, vía PROMPT_WRITE_POST): responde approve inmediatamente. Si SÍ lo es: comprueba si existe evidencia de investigación para este post — un RESEARCH_DEEP_DIVE/RESEARCH_REPORT compartido del proyecto en R_research/, o uno propio del post dentro de su carpeta en WP_writing_post/ (ver AUTO_SAVE_CONFIG.yaml v1.2 para el alcance dual). Si existe cualquiera de los dos: responde approve. Si NO existe ninguno, comprueba si en la conversación el editor ya confirmó explícitamente saltarse la investigación (registrado como research_skipped: true con una razón, según PROMPT_POST_BRIEF.md PASO 3B). Si esa confirmación explícita existe: responde approve. Si no existe investigación NI confirmación explícita de skip: responde ask_user explicando que falta investigación y no hay constancia de que el editor haya decidido conscientemente prescindir de ella.",
      "timeout": 30
    }
  ]
}
```

Ajusta la redacción si hace falta, pero conserva los tres comportamientos: no interferir con nada que no sea el borrador final del post, aprobar si hay investigación (compartida o propia) o skip explícito ya registrado, y preguntar — nunca aprobar en silencio — si no hay ninguna de las dos cosas.

## Estructuras de datos

Ninguna nueva. Reutiliza `TEMPLATE_POST_SEED.md`, `TEMPLATE_POST_BRIEFING.md`, `RESOURCE_WRITING_CONTEXT.md`, `RESOURCE_PUBLICATION_PROFILE.md` (todos en `writing/post/`) tal cual.

## Decisiones de diseño

- El hook de este ticket es la capa estructural del mismo problema que `PROMPT_POST_BRIEF.md` v1.1 ya mitiga a nivel de prompt — son complementarios, no redundantes: el prompt guía la conversación, el hook es la última línea de defensa si algo se salta esa guía.
- `PROMPT_QA_IDEAS.md` se referencia aquí y también desde `shared-writing` (S7-03) — es el mismo archivo real en ambos casos, no hay conflicto por referenciarlo dos veces desde skills distintas.

## Fuera de scope

- Modificar el contenido de cualquier prompt de `writing/post/`.
- La skill `shared-writing` (S7-03) — solo se invoca, no se construye aquí.
- `SPEC_LEARNING_SIGNALS.md` — mecanismo de aprendizaje progresivo del `EDITOR_PROFILE`, fuera de scope de Sprint 7 completo, no solo de este ticket.

## Casos de test obligatorios

1. `skills/writing-post/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que no se duplica contenido de ningún prompt de `writing/post/`, y que la redacción del post se delega a `shared-writing` en vez de reimplementarse.
3. `hooks/hooks.json` sigue siendo JSON válido tras añadir la entrada nueva, y las entradas previas (S6-04, y S7-01 si ya está mergeado) siguen intactas — pega el diff exacto.
4. Verificación manual (documentar pasos, trazando el prompt del hook): simular un `POST_DRAFT` con investigación compartida existente → `approve`. Simular uno con investigación propia del post → `approve`. Simular uno con skip explícito ya registrado → `approve`. Simular uno sin investigación ni skip registrado → `ask_user`. Simular una escritura no relacionada (ej. `INVENTARIO_IDEAS`) → `approve` inmediato sin análisis.

## Estado de revisión

Aprobado: 2026-09-03
