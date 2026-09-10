# Subsistema 1: KNOWLEDGE BASE

Recursos globales acumulativos que crecen con cada proyecto ejecutado.
Son la "memoria" del sistema entre proyectos. Es el único subsistema cuyos artefactos principales (SAH y CVC) crecen con cada nuevo proyecto ejecutado — cada ciclo de investigación los enriquece con nuevas fuentes y claims validados.

**Chat de desarrollo:** knowledge-base-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| CONTEXT_KNOWLEDGE_BASE | v1.4 | ACTIVE | Documento de contexto del chat de desarrollo |
| RESOURCE_SOURCE_AUTHORITY | v2.2 | ACTIVE | Jerarquía de fuentes por tema + CANONICAL UPDATE SCHEMA |
| RESOURCE_CLAIM_VALIDATION | v1.2 | ACTIVE | Criterios de validación de claims + CANONICAL UPDATE SCHEMA |
| RESOURCE_RESEARCH_FOCUS_TYPES | v1.1 | ACTIVE | 7 tipos de focus de investigación (A–G) |

## Rol del subsistema

Knowledge Base mantiene los recursos globales que acumulan conocimiento entre proyectos. Define los esquemas canónicos (CANONICAL UPDATE SCHEMA) que otros subsistemas deben respetar al actualizar dichos recursos. No almacena artefactos de producción ni ejecuta la actualización de SAH y CVC — esa ejecución corresponde a Research.

## Nota sobre PROMPT_UPDATE_VALIDATION_CHECKLIST

Este prompt **no pertenece a Knowledge Base**. Es propiedad de Research (research-dev).
KB define el esquema canónico de SAH y CVC; Research ejecuta la actualización.
Si KB cambia el esquema, notifica a research-dev via DL entry.

## Interfaces

**Recibe de:** Research — SAH y CVC actualizados via PROMPT_UPDATE_VALIDATION_CHECKLIST (outputs del proceso de investigación de cada proyecto)

**Entrega a:**
- Research — SAH, CVC y FOCUS_TYPES como inputs del proceso de investigación
- Evaluation — FOCUS_TYPES como referencia de tipos de focus disponibles

## Nota sobre CONTEXT_KNOWLEDGE_BASE — DOC-01 pendiente

Las versiones en los campos DEPENDENCIES del archivo `CONTEXT_KNOWLEDGE_BASE.md` deben eliminarse en la próxima actualización del archivo. Esta acción está registrada como **DOC-01** en el plan transversal del MASTER_PLAN.

Campos afectados: `SCHEMA_SYSTEM_ARCHITECTURE_v1.1` → `SCHEMA_SYSTEM_ARCHITECTURE` / `MASTER_PLAN_v1.2` → `MASTER_PLAN`

> **Actualización Sprint cierre R1:** DOC-01 ya ha sido aplicado en CONTEXT_KNOWLEDGE_BASE v1.4 (ver KB-04). Esta nota queda como referencia para otros subsistemas con el mismo pendiente (CONTEXT_ACTIVATION, CONTEXT_RESEARCH).

## Tareas activas

Ninguna. Todas las tareas del Sprint cierre R1 asignadas a Knowledge Base (KB-01 a KB-04) están completadas. El subsistema está completo para Release 1.

## DL entries producidas

| DL ID | Decisión | Status |
|---|---|---|
| DL_20260222_KB_002 | Creación de RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | OPEN |
| DL_20260222_KB_003 | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | OPEN |
