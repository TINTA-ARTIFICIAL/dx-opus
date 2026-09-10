---
id: S9-02
title: writing-book/writing-post/activation/research invocan evaluation y knowledge-base como skill, no por ruta
type: refactor
subsystem: SYSTEM
sprint: 9
status: DONE
priority: P0
depends_on: [S9-01]
blocks: []
assignee: D-developer
started: 2026-09-10
completed: 2026-09-10
branch: feat/s9-02-delegate-evaluation-knowledge-base
---

# S9-02 — Invocar `evaluation`/`knowledge-base` como skill en vez de leer sus prompts por ruta

## Contexto

Ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.c. `evaluation` y `knowledge-base` ya son skills propias. Hoy, `writing-book`, `writing-post` y `activation` referencian directamente `evaluation/PROMPT_EVALUATE_*.md` por ruta (`${CLAUDE_PLUGIN_ROOT}/evaluation/...`), y `research` hace lo mismo con `knowledge-base/RESOURCE_*.md`. Esto es exactamente la misma dependencia cruzada de `${CLAUDE_PLUGIN_ROOT}` que S9-01 elimina para contenido exclusivo — pero aquí no se puede resolver moviendo archivos (son compartidos), sino cambiando **quién ejecuta la lectura**: la propia skill dueña del contenido, invocada por la que la necesita.

## Interfaces

Mover el contenido de `evaluation/*` a `skills/evaluation/` y de `knowledge-base/*` a `skills/knowledge-base/` (mismo patrón que S9-01, pero aquí porque pasan a ser autocontenidas, no porque sean exclusivas de una sola skill).

Editar `skills/writing-book/SKILL.md`, `skills/writing-post/SKILL.md`, `skills/activation/SKILL.md`: sustituir toda instrucción de "lee `evaluation/PROMPT_EVALUATE_X.md`" por "invoca la skill `evaluation` (herramienta `Skill`) pidiéndole la función `EVALUATE_X`, pasándole el artefacto a evaluar". `evaluation/SKILL.md` debe documentar qué funciones ofrece (una por prompt que ya envuelve) y aceptar ese parámetro — mismo patrón que `shared-writing/SKILL.md` ya usa para sus 4 funciones (`WRITE_POST`, `CREATE_TIMELINE`, `CREATE_CAST`, `QA_IDEAS`).

Editar `skills/research/SKILL.md`: sustituir la lectura directa de `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md`/`RESOURCE_CLAIM_VALIDATION.md` por invocación de la skill `knowledge-base`.

## Estructuras de datos

Ninguna nueva. La invocación de skill a skill pasa los mismos artefactos que hoy se leían por ruta (el artefacto a evaluar, o la afirmación a validar) como input de la llamada, no como archivo.

## Decisiones de diseño

- No se duplica ningún prompt — sigue habiendo un único dueño físico por capacidad (`evaluation`, `knowledge-base`), invocado, no copiado.
- `evaluation`/`knowledge-base` mantienen su comportamiento actual (soft/no bloqueante para evaluation, según `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4) — este ticket cambia el mecanismo de invocación, no la lógica de negocio.
- Misma nota de riesgo que S9-01: la invocación de skill a skill vía herramienta `Skill` ya se confirmó funcionando en cloud hoy (a diferencia de la lectura de archivo cruzado) — es la parte del hallazgo de hoy con más confianza detrás.

## Fuera de scope

- Cambiar el contenido o la metodología de ninguno de los prompts de evaluación o de knowledge-base — solo cómo se accede a ellos.
- `writing/shared/`, `editorial-profile/` — cubierto por S9-03.

## Casos de test obligatorios

1. `writing-book`, `writing-post`, `activation` ya no tienen ninguna referencia por ruta a `evaluation/` en su `SKILL.md` — verificado por grep.
2. `research` ya no tiene ninguna referencia por ruta a `knowledge-base/` en su `SKILL.md`.
3. Ejecución real (local como mínimo) de una evaluación desde `writing-book` confirma que la invocación por skill produce el mismo `EVALUATION_RESULT` que antes.
4. Contraprueba en sesión cloud (con la misma consideración de "segundo mensaje" que S9-01) — documentar resultado.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
