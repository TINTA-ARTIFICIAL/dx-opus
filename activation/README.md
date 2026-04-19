# Subsistema 6: ACTIVATION

Genera valor a partir de libros o colecciones ya escritas mediante **dos rutas paralelas**:

- **Ruta P (POST):** contenido inmediato publicable — posts, artículos, threads
- **Ruta L (LIBRO):** BOOK_BRIEF que orienta un nuevo ciclo de Research

La bifurcación ocurre en el **CHECKPOINT DE ROUTING** (post-FASE 1), donde el editor clasifica cada seed como [P], [L] o [P+L] (ambas rutas simultáneas).

**Chat de desarrollo:** activation-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_ACTIVATION | v1.6 | ACTIVE | Workflow completo — arquitectura dual-output (Ruta P + Ruta L) |
| ANALYZE_COLLECTION_FOR_ACTIVATION | v1.5 | ACTIVE | Análisis de colección → ACTIVATION_CONTEXT y nichos narrativos (FASE 0) |
| IDENTIFY_NARRATIVE_SEEDS | v2.0 | ACTIVE | Análisis profundo del libro → seeds activables (FASE 1) |
| PROMPT_CREATE_BOOK_BRIEF | v1.0 | ACTIVE | Genera BOOK_BRIEF — Ruta L, FASE 2B, paralela a Ruta P |

## Loop con Research

```
ACTIVATION
    ↓
[CHECKPOINT DE ROUTING]
    ╱               ╲
RUTA P          RUTA L
(posts)        (BOOK_BRIEF)
                    ↓
              RESEARCH (orientado)
                    ↓
              WRITING BOOK
                    ↓
              ACTIVATION...
```

La Ruta P y la Ruta L pueden ejecutarse simultáneamente si hay seeds [P+L].

## Interfaces

**Recibe de:** Writing (libro completo), Editorial Profile (EDITOR_PROFILE)  
**Entrega a:** Research (BOOK_BRIEF — opcional, Ruta L), publicación directa (posts, Ruta P)  
**Usa de Writing/shared:** PROMPT_QA_IDEAS, PROMPT_WRITE_POST, PROMPT_CREATE_TIMELINE, PROMPT_CREATE_CAST
