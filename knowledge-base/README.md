# Subsistema 1: KNOWLEDGE BASE

Recursos globales acumulativos que crecen con cada proyecto ejecutado.
Son la "memoria" del sistema entre proyectos.

**Chat de desarrollo:** knowledge-base-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_SOURCE_AUTHORITY | v2.1 | ACTIVE | Jerarquía de fuentes por tema + CANONICAL UPDATE SCHEMA |
| RESOURCE_CLAIM_VALIDATION | v1.1 | ACTIVE | Criterios de validación de claims + CANONICAL UPDATE SCHEMA |
| RESOURCE_RESEARCH_FOCUS_TYPES | v1.1 | ACTIVE | 7 tipos de focus de investigación (A–G) |

## Nota sobre PROMPT_UPDATE_VALIDATION_CHECKLIST

Este prompt **no pertenece a Knowledge Base**. Es propiedad de Research (research-dev).
KB define el esquema canónico de SAH y CVC; Research ejecuta la actualización.
Si KB cambia el esquema, notifica a research-dev via DL entry.

## Interfaces

**Entrega a:** Research (SAH, CVC, FOCUS_TYPES como inputs de proceso)
**Recibe de:** Research (SAH/CVC actualizados via UPDATE_VALIDATION_CHECKLIST)

## Tareas activas

Ninguna. Todas las tareas del MASTER_PLAN asignadas a KB en la fase actual están completadas.

## DL entries producidas

| DL ID | Decisión | Status |
|---|---|---|
| DL_20260222_KB_002 | Creación de RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | OPEN |
| DL_20260222_KB_003 | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | OPEN |
