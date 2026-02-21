# Subsistema 6: ACTIVATION

Genera contenido derivado a partir de libros o colecciones ya escritas.
Puede producir posts para publicación inmediata o propuestas de nuevos libros (BOOK_BRIEF).

**Chat de desarrollo:** activation-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_ACTIVATION | v1.4 | ACTIVE | Workflow completo de activación |
| PROMPT_CREATE_BOOK_BRIEF | v1.0 | PENDING | Genera 3-4 propuestas de nuevo libro |

## Loop con Research

El BOOK_BRIEF producido por Activation alimenta opcionalmente el inicio
de un nuevo ciclo de Research:
```
ACTIVATION → BOOK_BRIEF → RESEARCH (orientado) → WRITING BOOK → ACTIVATION...
```

## Interfaces

**Recibe de:** Writing (libro completo), Editorial Profile (EDITOR_PROFILE)  
**Entrega a:** Research (BOOK_BRIEF — opcional), publicación directa (posts)  
**Usa de Writing/shared:** PROMPT_WRITE_POST, PROMPT_CREATE_TIMELINE, PROMPT_CREATE_CAST
