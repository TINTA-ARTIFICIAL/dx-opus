# Subsistema 4: WRITING

Produce el texto final (libro o post) a partir de la investigación y el perfil editorial.
El editor decide al entrar si produce un libro o un post.

**Chat de desarrollo:** writing-dev

## Estructura

- `book/` — Prompts de escritura de libros
- `post/` — Prompts de escritura de posts (pendiente diseño)
- `shared/` — Prompts owned by Writing, invocados también por Activation

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_WRITING | v2.0 | PENDING | Workflow unificado Book+Post con bifurcación editorial |
| PROMPT_CREATE_BOOK_INDEX | v1.0 | ACTIVE | Crea el índice del libro |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | ACTIVE | Escribe el capítulo de muestra |
| PROMPT_WRITE_CHAPTER | v1.3 | ACTIVE | Escribe cada capítulo |
| PROMPT_WRITE_INTRODUCTION | v1.0 | ACTIVE | Escribe la introducción |
| PROMPT_WRITE_PROLOGUE | v1.0 | ACTIVE | Escribe el prólogo |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | ACTIVE | Consolida referencias bibliográficas |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | ACTIVE | Genera la ficha técnica del libro |
| PROMPT_WRITE_POST | v1.0 | ACTIVE | Escribe posts (shared con Activation) |
| PROMPT_CREATE_TIMELINE | v1.0 | ACTIVE | Crea timeline (shared con Activation) |
| PROMPT_CREATE_CAST | v1.0 | ACTIVE | Crea el elenco (shared con Activation) |

## Interfaces

**Recibe de:** Research (RESEARCH_REPORTs), Editorial Profile (EDITOR_PROFILE)  
**Entrega a:** Activation (libro completo)
