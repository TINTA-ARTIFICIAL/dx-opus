# Subsistema 4: WRITING

Produce el texto final (libro o post) a partir de la investigación y el perfil editorial.
El editor decide al entrar si produce un libro o un post.

**Chat de desarrollo:** writing-dev

## Estructura

- `book/` — Prompts de escritura de libros
- `post/` — Prompts de escritura de posts
- `shared/` — Prompts owned by Writing, invocados también por Activation

## Artefactos activos

### Workflow

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_WRITING | v2.0 | ACTIVE | Workflow unificado Book+Post con bifurcación editorial |

### RAMA BOOK

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_CREATE_BOOK_INDEX | v1.0 | ACTIVE | Crea el índice del libro |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | ACTIVE | Escribe el capítulo de muestra |
| PROMPT_WRITE_CHAPTER | v1.3 | ACTIVE | Escribe cada capítulo |
| PROMPT_WRITE_INTRODUCTION | v1.0 | ACTIVE | Escribe la introducción |
| PROMPT_WRITE_PROLOGUE | v1.0 | ACTIVE | Escribe el prólogo |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | ACTIVE | Consolida referencias bibliográficas |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | ACTIVE | Genera la ficha técnica del libro |

### RAMA POST

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_POST_BRIEF | v1.0 | ACTIVE | Punto de entrada. Carga/crea WRITING_CONTEXT |
| PROMPT_POST_EXPLORE | v1.0 | ACTIVE | Exploración cuando el input es escaso |
| PROMPT_SUMMARIZE_REF | v1.0 | ACTIVE | Procesa fuentes |
| PROMPT_VERIFY_RESEARCH | v1.0 | ACTIVE | Verifica afirmaciones del editor |
| PROMPT_QA_IDEAS | v1.0 | ACTIVE | Q&A secuencial — extrae voz del editor |
| PROMPT_POST_ANGLES | v1.0 | ACTIVE | Propone ángulos y narrative seeds |
| PROMPT_PLAN_POST | v1.0 | ACTIVE | Fija arquitectura del post — produce POST_SEED |
| PROMPT_SPLIT_POST | v1.0 | ACTIVE | Divide post en dos |

### Shared — owned by Writing, invocados también por Activation

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_WRITE_POST | v2.0 | ACTIVE | Escribe posts — input canónico: POST_SEED |
| PROMPT_CREATE_TIMELINE | v1.0 | ACTIVE | Crea timeline |
| PROMPT_CREATE_CAST | v1.0 | ACTIVE | Crea el elenco |

### Recursos y templates — RAMA POST

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_WRITING_CONTEXT | v1.0 | ACTIVE | Esquema canónico: EDITOR_PROFILE + PUBLICATION_PROFILE + tipo de texto |
| RESOURCE_PUBLICATION_PROFILE | v1.0 | ACTIVE | Entidad independiente del EDITOR_PROFILE |
| TEMPLATE_POST_SEED | v1.0 | ACTIVE | Estructura canónica del POST_SEED |
| TEMPLATE_POST_BRIEFING | v1.0 | ACTIVE | Briefing de continuación de post |
| SPEC_LEARNING_SIGNALS | v1.0 | ACTIVE | Especificación de las tres señales de aprendizaje del EDITOR_PROFILE |

## Interfaces

**Recibe de:** Research (RESEARCH_REPORTs, RESEARCH_DEEP_DIVE), Editorial Profile (EDITOR_PROFILE), Activation (POST_PLAN opcional)  
**Entrega a:** Activation (libro completo), Publicación directa (post publicable)
