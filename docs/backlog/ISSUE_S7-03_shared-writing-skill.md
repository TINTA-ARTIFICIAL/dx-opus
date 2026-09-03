---
id: S7-03
title: Skill shared-writing
type: skill
subsystem: SYSTEM
sprint: 7
status: TODO
priority: P1
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S7-03 — Skill `shared-writing`

## Contexto

Contenido usado tanto por `writing-post` (S7-07) como por `activation` (S7-08) — ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` §3/§6, decisión confirmada de skill dedicada en vez de duplicar en cada consumidora. Incluye `PROMPT_QA_IDEAS`, cuyo estatus de "compartido" quedó formalizado en la corrección aplicada a `DL_20260416_SYSTEM_025`.

**Interfaz pública para otras tickets de Sprint 7 (S7-07, S7-08 pueden escribirse en paralelo con este contra el contrato de abajo, sin esperar a que este ticket esté `DONE`):** una skill llamada `shared-writing`, invocable para cuatro funciones — redactar un post desde un `POST_SEED` (`WRITE_POST`), construir una cronología (`CREATE_TIMELINE`), construir un reparto de personajes/actores (`CREATE_CAST`), y hacer el Q&A de posicionamiento del editor (`QA_IDEAS`). Los tickets que la invoquen deben referenciarla por su `name` (`shared-writing`) e indicar cuál de las cuatro funciones necesitan — no necesitan saber la implementación interna.

## Interfaces

Crear `skills/shared-writing/SKILL.md`.

Frontmatter:
```yaml
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
```

El cuerpo orienta hacia (léelos por su ruta real, no dupliques):

- `writing/shared/PROMPT_WRITE_POST.md` — redacción del post desde `POST_SEED`
- `writing/shared/PROMPT_CREATE_TIMELINE.md` — cronología
- `writing/shared/PROMPT_CREATE_CAST.md` — reparto de personajes
- `writing/post/PROMPT_QA_IDEAS.md` — Q&A de posicionamiento (compartido con Activation desde `DL_20260411_ACTIVATION_022`, INTEGRATED — ver la corrección aplicada a `DL_20260416_SYSTEM_025`). **Ya incluye (v1.1) el PASO 6B de auto-save del INVENTARIO_IDEAS — no lo repitas ni lo debilites al envolver el prompt.**

## Estructuras de datos

Ninguna nueva. `TEMPLATE_POST_SEED.md` y `TEMPLATE_POST_BRIEFING.md` (en `writing/post/`) son las estructuras de datos que `WRITE_POST` consume/produce — referéncialas, no las copies.

## Decisiones de diseño

- Esta skill no tiene por qué disparar directamente con una frase del editor en el uso típico — su `description` debe dejar claro que es mayormente invocada por otras skills, siguiendo el mismo patrón que `knowledge-base` (S6-04).
- `PROMPT_QA_IDEAS.md` sigue viviendo físicamente en `writing/post/`, no en `writing/shared/` — es deuda técnica de ubicación de archivo ya señalada (`DL_20260416_SYSTEM_025`, nota de corrección), no la resuelvas moviendo el archivo en este ticket; referencia la ruta real donde está hoy.

## Fuera de scope

- Mover `PROMPT_QA_IDEAS.md` a `writing/shared/` — deuda técnica separada, no forma parte de este ticket.
- Modificar el contenido de cualquiera de los cuatro prompts que envuelve.
- La lógica específica de cuándo `writing-post` o `activation` deciden invocar cada función — eso vive en esas skills (S7-07, S7-08).

## Casos de test obligatorios

1. `skills/shared-writing/SKILL.md` existe, frontmatter válido, `description` deja claro que es invocada por otras skills.
2. Confirmar por lectura que no se duplica contenido de ninguno de los 4 prompts que envuelve.
3. Confirmar que la ruta real de `PROMPT_QA_IDEAS.md` (`writing/post/`, no `writing/shared/`) está correctamente referenciada, no asumida por analogía con los otros tres.
4. Verificación manual: simular una invocación de cada una de las 4 funciones (aunque sea de forma abreviada) y confirmar que el `SKILL.md` da instrucciones suficientes para localizar y ejecutar el prompt correspondiente sin ambigüedad.

## Estado de revisión

Aprobado: 2026-09-03
