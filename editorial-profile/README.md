# Subsistema 3: EDITORIAL PROFILE

Captura y representa la identidad del autor como comunicador.
Es el único subsistema que modela al humano, no al proceso.

**Chat de desarrollo:** editorial-profile-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_CREATE_EDITOR_PROFILE | v1.0 | ACTIVE | Crea el perfil editorial del autor |
| RESOURCE_EDITORIAL_STYLE | v1.0 | ACTIVE | Estilos editoriales disponibles en el sistema |
| RESOURCE_BOOK_TYPES | v1.2 | ACTIVE | Tipos de libros que el sistema soporta |

## Límites

Este subsistema modela al autor — no evalúa textos. La evaluación de
adherencia al perfil editorial (EVALUATE_BOOK_STYLE) pertenece al
subsistema EVALUATION (DL_20260330_SYSTEM_004).

## Interfaces

**Entrega a:** Writing (EDITOR_PROFILE como input de contexto),
Activation (EDITOR_PROFILE como input de contexto),
Evaluation (EDITOR_PROFILE como input de EVALUATE_BOOK_STYLE y EVALUATE_POST)
