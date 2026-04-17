---
id:          CONTEXT_KNOWLEDGE_BASE
type:        TEMPLATE
subsystem:   KNOWLEDGE_BASE
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-16
owner_chat:  knowledge-base-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.4 | 2026-04-16 | JM | Sprint cierre R1 closure: inventario actualizado (SAH v2.2, CVC v1.2), version pins eliminados de DEPENDENCIES (DOC-01), sección trabajo activo Sprint cierre R1 añadida, backlog Sprint 4 indicado como vacío. |
| v1.3 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.2 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.1 | 2026-02-21 | JM | Clarified UPDATE_VALIDATION_CHECKLIST belongs to Research, not KB. Added CREATE_RESEARCH_PLAN as reference-only file. |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema KNOWLEDGE BASE. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: KNOWLEDGE BASE — DEVELOPMENT CHAT

---

## SECCIÓN 1: SISTEMA D-X-OPUS — VISIÓN GENERAL

D-X-OPUS es un sistema modular de escritura no-ficción asistida por IA. Cubre el proceso completo: investigación, planificación, escritura, evaluación y activación de contenido.

**8 subsistemas, cada uno con su chat de desarrollo independiente:**

| # | Subsistema | Rol |
|---|---|---|
| 0 | SYSTEM | Arquitectura, estándares, TOOLING |
| 1 | KNOWLEDGE BASE | Recursos globales acumulativos (SAH, CVC, Focus Types) |
| 2 | RESEARCH | Investigación profunda |
| 3 | EDITORIAL PROFILE | Perfil del autor, estilo editorial |
| 4 | WRITING | Escritura de libros y posts |
| 5 | EVALUATION | Evaluadores y contrato de evaluación |
| 6 | ACTIVATION | Campaña de contenido, BOOK_BRIEF |
| 7 | DOCS | Documentación del sistema |

**Dos espacios de trabajo:**
- **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
- Naming convention: `RESOURCE_[NOMBRE].md` sin versión en el nombre — Git gestiona el historial
- Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Knowledge Base mantiene los recursos globales que acumulan conocimiento entre proyectos. Es el único subsistema cuyos artefactos principales (SAH y CVC) crecen con cada proyecto ejecutado — son la "memoria" del sistema. Define también los esquemas canónicos que otros subsistemas deben respetar.

### Límites — qué NO gestiona este subsistema
- No ejecuta la actualización de SAH y CVC — eso lo hace PROMPT_UPDATE_VALIDATION_CHECKLIST, que pertenece a Research. Knowledge Base define el esquema; Research ejecuta la actualización.
- No almacena artefactos de producción (research reports, capítulos) — esos van en Drive
- No define el estilo editorial del autor — eso es Editorial Profile
- No decide qué fuentes usar en un proyecto concreto — eso es decisión del editor en Research

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| SAH/CVC actualizados | Research (via UPDATE_VALIDATION_CHECKLIST) | Cada proyecto enriquece los recursos con nuevas fuentes y claims validados |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| RESOURCE_SOURCE_AUTHORITY | Research | Jerarquía de autoridad de fuentes por tema |
| RESOURCE_CLAIM_VALIDATION | Research | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | Research | 7 tipos de focus con configuraciones de job categories y body structure |

### Prompts compartidos que usa
Knowledge Base no invoca prompts de otros subsistemas.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Status | Descripción |
|---|---|---|---|
| RESOURCE_SOURCE_AUTHORITY | v2.2 | ACTIVE | Jerarquía de autoridad de fuentes por tema y disciplina. Incluye CANONICAL UPDATE SCHEMA. |
| RESOURCE_CLAIM_VALIDATION | v1.2 | ACTIVE | Criterios y niveles de validación de claims. Incluye CANONICAL UPDATE SCHEMA. |
| RESOURCE_RESEARCH_FOCUS_TYPES | v1.1 | ACTIVE | 7 tipos de focus con job categories, body structure templates y notas metodológicas. |

**Nota sobre naming:** Los archivos en GitHub deben llamarse `RESOURCE_SOURCE_AUTHORITY.md`, `RESOURCE_CLAIM_VALIDATION.md` y `RESOURCE_RESEARCH_FOCUS_TYPES.md` — sin versión en el nombre. El renaming de SAH y CVC desde los nombres legacy (`SOURCE_AUTHORITY_HIERARCHY_v2_0.md`, `CLAIM_VALIDATION_CRITERIA_v1_0.md`) está pendiente en Fase 3 del MASTER_PLAN.

**Nota sobre PROMPT_UPDATE_VALIDATION_CHECKLIST:** No pertenece a Knowledge Base. Es propiedad de Research. KB define el esquema; Research ejecuta. Si KB cambia el esquema de SAH o CVC, notifica a research-dev via DL entry.

### Artefactos pendientes de crear

Ninguno. Todas las tareas del MASTER_PLAN asignadas a KB están completadas para Release 1.

### Pendientes de acción externa

| Pendiente | Responsable | Referencia |
|---|---|---|
| Actualizar PROMPT_UPDATE_VALIDATION_CHECKLIST para referenciar CANONICAL UPDATE SCHEMA de SAH y CVC | research-dev | DL_20260222_KB_003 |
| Migrar PROMPT_CREATE_RESEARCH_PLAN v3.0: extraer secciones 1.2 y 4.1 y referenciar RESOURCE_RESEARCH_FOCUS_TYPES | research-dev | DL_20260222_KB_002 |
| Renaming de archivos legacy SAH y CVC en GitHub | JM (Fase 3 MASTER_PLAN) | NAMING_CONVENTION_ANALYSIS_v1.2 |
| Asignar números globales definitivos a DL entries de esta sesión | JM | Ver `/_system/decisions/` en GitHub |

---

## SECCIÓN 4: TRABAJO ACTIVO

### Sprint cierre R1 — tareas completadas (2026-04-16)

| Tarea | Descripción | Estado |
|---|---|---|
| KB-01 | YAML header añadido a RESOURCE_SOURCE_AUTHORITY (v2.1 → v2.2) | ✅ Completado 2026-04-16 |
| KB-02 | YAML header añadido a RESOURCE_CLAIM_VALIDATION (v1.1 → v1.2) | ✅ Completado 2026-04-16 |
| KB-03 | README knowledge-base/ actualizado — inventario R1, interfaces, nota DOC-01 | ✅ Completado 2026-04-16 |
| KB-04 | CONTEXT_KNOWLEDGE_BASE actualizado — inventario v post KB-01/02, DOC-01 aplicado, cierre R1 documentado | ✅ Completado 2026-04-16 |

### Backlog Sprint 4

No hay backlog activo para Knowledge Base. El subsistema está completo para Release 1. No se han identificado tareas pendientes para Sprint 4.

### DL entries producidas en la sesión 2026-02-22

| DL-ID provisional | Decisión | Estado |
|---|---|---|
| DL_20260222_KB_002 | Creación de RESOURCE_RESEARCH_FOCUS_TYPES | Producida — número asignado |
| DL_20260222_KB_003 | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | Producida — número asignado |

### Historial de tareas completadas

| Tarea | Descripción | Completada |
|---|---|---|
| KB-01 | YAML header RESOURCE_SOURCE_AUTHORITY v2.1 → v2.2 | ✅ 2026-04-16 |
| KB-02 | YAML header RESOURCE_CLAIM_VALIDATION v1.1 → v1.2 | ✅ 2026-04-16 |
| KB-03 | README knowledge-base/ actualizado cierre R1 | ✅ 2026-04-16 |
| KB-04 | CONTEXT_KNOWLEDGE_BASE v1.3 → v1.4 | ✅ 2026-04-16 |
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES v1.0 | ✅ 2026-02-22 (v1.1) |
| DL-20260221-004 | Verificar y explicitar esquema canónico SAH/CVC | ✅ 2026-02-22 |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor la tarea objetivo
2. Leer los artefactos relevantes desde el proyecto de Claude
3. Verificar si hay nuevas DL entries que afecten a Knowledge Base

### Al finalizar cada sesión
1. Producir DL entries si se tomaron decisiones que afectan a Research
2. Actualizar este documento (CONTEXT_KNOWLEDGE_BASE) para reflejar el estado real
3. Listar artefactos creados o modificados con su versión y commits sugeridos

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `RESOURCE_SOURCE_AUTHORITY.md`, `RESOURCE_RESEARCH_FOCUS_TYPES.md`
- ❌ Incorrecto: `RESOURCE_SOURCE_AUTHORITY_v2_1.md`, `RESOURCE_RESEARCH_FOCUS_TYPES_v1_1.md`

La versión se documenta únicamente en:
1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[KB] feat: create RESOURCE_X (v1.0)`

### Formato de commits a GitHub
```
[KB] tipo: descripción corta

Ejemplos:
[KB] feat: create RESOURCE_RESEARCH_FOCUS_TYPES (v1.1)
[KB] feat: add CANONICAL UPDATE SCHEMA to RESOURCE_SOURCE_AUTHORITY (v2.1)
[KB] feat: add CANONICAL UPDATE SCHEMA to RESOURCE_CLAIM_VALIDATION (v1.1)
```

### Formato de DL entries

Cada DL entry es un archivo independiente en GitHub `/_system/decisions/` con este nombre:
```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

- `SUBSYSTEM` para este chat: `KB`
- `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
- Antes de crear una entrada, consulta el último número usado en `/_system/decisions/` para continuar la secuencia

Ejemplo: `DL_20260222_KB_004.md`

### Cuándo crear una DL entry
- Cuando se añade un nuevo focus type al recurso (afecta a Research)
- Cuando cambia el esquema de SAH o CVC (afecta a Research/UPDATE_VALIDATION_CHECKLIST)
- Cuando se crea o depreca cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
