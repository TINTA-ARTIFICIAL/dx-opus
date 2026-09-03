---
id: S7-04
title: Skill writing-book
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
branch: feat/s7-04-writing-book-skill
---

# S7-04 — Skill `writing-book`

## Contexto

Migra la RAMA BOOK del subsistema WRITING (7 prompts + workflow compartido con la rama post).

## Interfaces

Crear `skills/writing-book/SKILL.md`.

Frontmatter:
```yaml
---
name: writing-book
description: >
  This skill should be used when the user wants to write a non-fiction
  book — trigger phrases like "quiero escribir un libro sobre X", "crear
  el índice de mi libro", "escribir el capítulo N", "necesito un capítulo
  de muestra".
metadata:
  version: "0.1.0"
---
```

El cuerpo orienta hacia (léelos por su ruta real, no dupliques):

- `writing/WORKFLOW_WRITING.md` — secuencia canónica (comparte documento con la rama post — orienta solo hacia las fases de RAMA BOOK)
- `writing/book/PROMPT_CREATE_BOOK_INDEX.md` — índice
- `writing/book/PROMPT_WRITE_SAMPLE_CHAPTER.md` — capítulo de muestra (fija el `STYLE_GUIDE_LIBRO`)
- `writing/book/PROMPT_WRITE_CHAPTER.md` — capítulos (invoca auto-evaluación con la skill `evaluation` — S7-06 — en su PASO 5; esa invocación sigue siendo válida aunque S7-06 no esté `DONE` todavía, ya que hoy ya referencia el prompt real `PROMPT_EVALUATE_BOOK_STYLE.md`)
- `writing/book/PROMPT_WRITE_INTRODUCTION.md`, `writing/book/PROMPT_WRITE_PROLOGUE.md`
- `writing/book/PROMPT_CONSOLIDATE_REFERENCES.md`, `writing/book/PROMPT_CREATE_BOOK_SHEET.md` — cierre del libro

## Estructuras de datos

Ninguna nueva. Todos los artefactos que produce esta rama (`BOOK_INDEX`, `SAMPLE_CHAPTER`, `CHAPTER_DRAFT`, etc.) ya tienen ruta y naming en `_system/resources/AUTO_SAVE_CONFIG.yaml`, sección `WRITING_BOOK`.

## Decisiones de diseño

- No dupliques contenido de ningún prompt de `writing/book/` ni de `WORKFLOW_WRITING.md`.
- `PROMPT_EVALUATE_BOOK_CONTENT.md`/`PROMPT_EVALUATE_BOOK_STYLE.md` son invocaciones suaves (no bloqueantes) hacia la skill `evaluation` — según `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4, los gates de calidad/evaluación se quedan como instrucción soft, no hook, porque un resultado RED no bloquea físicamente por diseño del propio `RESOURCE_EVALUATION_FRAMEWORK`. No conviertas esto en un hook.

## Fuera de scope

- Modificar el contenido de cualquier prompt de `writing/book/` o de `WORKFLOW_WRITING.md`.
- La skill `evaluation` (S7-06) — solo se referencia, no se construye aquí.
- La skill `editorial-profile` (S7-02) — esta skill puede asumir que existe un `EDITOR_PROFILE` según el formato de `editorial-profile/TEMPLATE_EDITOR_PROFILE.md`, pero no lo crea ni lo valida.

## Casos de test obligatorios

1. `skills/writing-book/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que no se duplica contenido de ningún prompt de `writing/book/`.
3. Confirmar que las referencias a evaluación quedan como invocación soft (el editor puede declinar), no como gate bloqueante.
4. Verificación manual: trazar el flujo completo índice → muestra → capítulos → cierre y confirmar que el `SKILL.md` da suficiente orientación de secuencia sin necesidad de tener `WORKFLOW_WRITING.md` cargado aparte.

## Estado de revisión

Aprobado: 2026-09-03
