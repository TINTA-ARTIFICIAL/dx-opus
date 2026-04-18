# _system/

Directorio raíz del subsistema SYSTEM. Contiene los artefactos fundacionales que hacen posible el desarrollo coherente del resto del sistema D-X-OPUS: arquitectura, estándares, decisiones globales y herramientas operativas.

**Owner:** system-architecture chat
**Referencia principal:** `MASTER_PLAN.md`

---

## Artefactos

| Artefacto | Versión | Tipo | Descripción |
|---|---|---|---|
| `MASTER_PLAN.md` | v1.4 | SCHEMA | Estado completo del sistema: decisiones, artefactos, plan de ejecución, backlog de sprints |
| `SCHEMA_SYSTEM_ARCHITECTURE.md` | v1.3 | SCHEMA | Mapa completo del sistema: 8 subsistemas, interfaces, flujos, prompts compartidos, estructura del repo |
| `SCHEMA_DECISION_LOG.md` | v2.1 | SCHEMA | Formato estándar de las entradas del DECISION_LOG. Define naming, campos, ciclo de vida y registro de decisiones fundacionales |
| `RESOURCE_ARTIFACT_HEADER_STANDARD.md` | v1.0 | RESOURCE | Estándar de cabecera YAML obligatoria en todos los artefactos del sistema |
| `TEMPLATE_SUBSYSTEM_CONTEXT.md` | v1.0 | TEMPLATE | Plantilla para crear documentos de contexto de desarrollo de cada subsistema |
| `NAMING_CONVENTION_ANALYSIS.md` | v1.2 | SCHEMA | Convención de naming unificada para artefactos en GitHub y Google Drive |

**Nota SC-01:** el archivo `SCHEMA_DECISION_LOG.md` tiene el nombre roto en el repositorio (`SCHEMA_DECISION_LOG md` con espacio en lugar de punto). Requiere rename manual en GitHub. Ver tarea SC-01 en MASTER_PLAN.

---

## Subcarpetas

### `decisions/`

Registro de decisiones arquitectónicas del sistema. Una entrada por decisión, en formato `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`. Ver `decisions/README.md` para el inventario completo y el próximo número disponible.

**Entradas activas al cierre de R1:** 15 archivos (001–004 de Sprints 0-2, 015–023 de Sprint 3, 025–026 de Sprint cierre R1).

**Próximo número disponible:** 027

### `audits/`

Auditorías de subsistemas producidas por system-architecture. Verifican presencia, versión, cabecera YAML y coherencia de artefactos en el repositorio.

| Artefacto | Versión | Descripción |
|---|---|---|
| `RESEARCH_COMPONENT_AUDIT.md` | v1.0 | Auditoría del subsistema Research — Sprint cierre R1 (16/04/2026) |

---

## Estado al cierre de Release 1

**Sprint cierre R1 completado:** 16 abril 2026

Tareas ejecutadas en esta sesión:

| Tarea | Resultado |
|---|---|
| SC-01 | Rename `SCHEMA_DECISION_LOG md` → `SCHEMA_DECISION_LOG.md` — **pendiente acción manual del editor** |
| SC-02 | Nota de numeración global documentada en SCHEMA_DECISION_LOG v2.1 |
| SC-03 | TOOL_GITHUB_REPO_STRUCTURE actualizado a v1.2 |
| SC-04 | MASTER_PLAN actualizado a v1.4 |
| SC-05 | RESEARCH_COMPONENT_AUDIT.md v1.0 creado |
| SC-06 | 13 decisiones fundacionales actualizadas a INTEGRATED en SCHEMA_DECISION_LOG |
| SC-07 | decisions/README.md actualizado con inventario completo |

---

## Backlog Sprint 4

| Tarea | Descripción |
|---|---|
| POST-R1-01 | Crear `GUIDE_DEV_PROTOCOL.md` v1.0 — protocolo estándar de desarrollo |
| SC-01 | Completar rename manual de SCHEMA_DECISION_LOG en GitHub |
| DL fundacionales | Crear archivos individuales para las 14 decisiones fundacionales pendientes |
