---
id:          CONTEXT_KNOWLEDGE_BASE
type:        TEMPLATE
subsystem:   KNOWLEDGE_BASE
version:     1.2
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  knowledge-base-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.2 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.1 | 2026-02-21 | JM | Clarified UPDATE_VALIDATION_CHECKLIST belongs to Research, not KB. Added CREATE_RESEARCH_PLAN as reference-only file. |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2]
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
- Naming convention: `RESOURCE_[NOMBRE]_v[X.Y].md` (ver `NAMING_CONVENTION_ANALYSIS_v1.2`)
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
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
| RESOURCE_SOURCE_AUTHORITY (SAH) | Research | Jerarquía de autoridad de fuentes por tema |
| RESOURCE_CLAIM_VALIDATION (CVC) | Research | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | Research | 7 tipos de focus con configuraciones de job categories y body structure |

### Prompts compartidos que usa
Knowledge Base no invoca prompts de otros subsistemas.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| RESOURCE_SOURCE_AUTHORITY | v2.0 | v2.0 | ACTIVE | Jerarquía de autoridad de fuentes por tema y disciplina |
| RESOURCE_CLAIM_VALIDATION | v1.0 | v1.0 | ACTIVE | Criterios y niveles de validación de claims |

**Nota importante sobre PROMPT_UPDATE_VALIDATION_CHECKLIST:** Este prompt **no pertenece a Knowledge Base**. Es propiedad de Research (research-dev lo desarrolla y versiona). Knowledge Base define el esquema canónico de SAH y CVC; Research ejecuta la actualización. Si Knowledge Base necesita cambiar el esquema de output de SAH o CVC, crea una DL entry notificando a research-dev para que actualice el prompt.

**Nota sobre naming:** Los nombres actuales son `SOURCE_AUTHORITY_HIERARCHY_v2_0.md` y `CLAIM_VALIDATION_CRITERIA_v1_0.md`. Los nombres objetivo son `RESOURCE_SOURCE_AUTHORITY_v2.0.md` y `RESOURCE_CLAIM_VALIDATION_v1.0.md`. El renaming se hace en la Fase 3 del MASTER_PLAN.

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| RESOURCE_RESEARCH_FOCUS_TYPES_v1.0 | 🔴 Alta | — (este chat lo crea) |

### Referencia de trabajo (no artefacto propio)

| Artefacto | Origen | Para qué se usa en este chat |
|---|---|---|
| PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md | Research | Leer y extraer secciones 1.2 y 4.1 para crear RESOURCE_RESEARCH_FOCUS_TYPES. Una vez creado el resource, este archivo puede retirarse del proyecto. |

---

## SECCIÓN 4: TRABAJO ACTIVO

### Tarea principal: crear RESOURCE_RESEARCH_FOCUS_TYPES v1.0

Esta es la única tarea activa de Knowledge Base y desbloquea el Sprint 2 de Research (CREATE_RESEARCH_PLAN v3.0).

**Qué debe contener el recurso:**

Para cada uno de los 7 focus types (A-G), definir:
1. **Nombre canónico** del focus
2. **Pregunta clave editorial** que responde este tipo de investigación
3. **Distribución de job categories** (% por tipo: Foundational, Historical, Convergent, etc.)
4. **Body structure template** — secciones del RESEARCH_REPORT para este focus
5. **Notas específicas** del focus (consideraciones metodológicas)

**Dónde están los 7 focus types actualmente:**
Embebidos en `PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md`, disponible en el proyecto de Claude:
- Sección 1.2 (~70 líneas): distribuciones de job categories por focus
- Sección 4.1 (~200 líneas): body structure templates por focus

El trabajo de este chat es extraer esas secciones, estructurarlas como recurso independiente con cabecera YAML estándar, y producir `RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md`.

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad |
|---|---|---|
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES_v1.0 | 🔴 Alta |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-001 | Focus types extraídos de CREATE_RESEARCH_PLAN | Crear RESOURCE_RESEARCH_FOCUS_TYPES_v1.0 |
| DL-20260221-004 | KB define esquema canónico de SAH/CVC; Research ejecuta la actualización | Verificar que el esquema canónico de SAH y CVC está suficientemente explícito en los recursos actuales. Si no, añadir sección de especificación de esquema. |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor la tarea objetivo
2. Si la tarea es crear RESOURCE_RESEARCH_FOCUS_TYPES: leer PROMPT_CREATE_RESEARCH_PLAN desde el proyecto de Claude para extraer los focus types
3. Verificar si hay nuevas DL entries que afecten a Knowledge Base

### Al finalizar cada sesión
1. Producir DL entries si se tomaron decisiones que afectan a Research (el consumidor principal)
2. Listar artefactos creados o modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_WRITE_CHAPTER.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
- ❌ Incorrecto: `PROMPT_WRITE_CHAPTER_v1_3.md`, `RESOURCE_EVALUATION_FRAMEWORK_v1_0.md`

La versión se documenta únicamente en:
1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[SUBSISTEMA] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub
```
[KB] tipo: descripción corta

Ejemplos:
[KB] feat: create RESOURCE_RESEARCH_FOCUS_TYPES v1.0
[KB] fix: update canonical schema in RESOURCE_SOURCE_AUTHORITY v2.1
```

### Cuándo crear una DL entry
- Cuando se añade un nuevo focus type al recurso (afecta a Research)
- Cuando cambia el esquema de SAH o CVC (afecta a Research/UPDATE_VALIDATION_CHECKLIST)
- Cuando se crea o depreca cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
