---
id:          CONTEXT_DOCS
type:        TEMPLATE
subsystem:   DOCS
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  docs-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2, SCHEMA_DECISION_LOG_v1.0]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema DOCS. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: DOCS — DEVELOPMENT CHAT

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
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS_v1.2`
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
DOCS mantiene toda la documentación del sistema actualizada y accesible. No es un repositorio pasivo — es un subsistema activo que consume DECISION_LOG entries de todos los chats y produce documentación estructurada por audiencia. Sin DOCS, el conocimiento del sistema existe solo en los chats de desarrollo y en los prompts, no en documentación consultable.

### Mecanismo de sincronización: DECISION_LOG
Cada chat de desarrollo produce entradas en el formato `DL-YYYYMMDD-NNN.md` cuando toma decisiones relevantes. Cada entrada incluye un campo `DOCS IMPACT` que especifica qué documentos necesitan actualización. DOCS consume las entradas con status `OPEN` o `NOTIFIED`, actualiza la documentación y cambia el status a `INTEGRATED`.

### Cuatro tipos de documentación y su mecanismo

| Tipo | Audiencia | Mecanismo | Carpeta |
|---|---|---|---|
| System Design Docs | Arquitectos, decisores | Pull desde SYSTEM via DL entries | `/docs/system-design/` |
| Subsystem Implementation Docs | Desarrolladores de cada subsistema | Pull desde cada subsistema via DL entries | `/docs/subsystem-docs/` |
| Editor Manuals | Usuarios del sistema | Push desde DOCS — DOCS los genera activamente | `/docs/editor-manuals/` |
| Developer Manuals | Nuevos desarrolladores | Push desde DOCS — DOCS los genera activamente | `/docs/developer-manuals/` |

### Límites — qué NO gestiona este subsistema
- No toma decisiones arquitectónicas — eso es SYSTEM
- No desarrolla prompts ni workflows — documenta los que otros desarrollan
- No gestiona versiones de artefactos — documenta el estado actual del inventario
- No aprueba PRs — eso es el editor

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| DECISION_LOG entries (DL-*) | Todos los chats | Decisiones que requieren actualización de documentación |
| Artefactos del sistema | Todos los subsistemas | Para documentar su función e implementación |
| SCHEMA_SYSTEM_ARCHITECTURE | SYSTEM | Fuente de verdad sobre la arquitectura |
| MASTER_PLAN | SYSTEM | Estado actual del trabajo y gaps pendientes |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| System Design Docs | Arquitectos | Documentación de arquitectura y decisiones |
| Subsystem Implementation Docs | Desarrolladores | Cómo funciona cada subsistema |
| Editor Manuals | Editores | Cómo usar el sistema para escribir |
| Developer Manuals | Nuevos desarrolladores | Cómo incorporarse al desarrollo del sistema |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos de documentación existentes

Actualmente los documentos de diseño del sistema viven en `/_system/` (producidos por SYSTEM). DOCS los referencia pero no los genera — los genera SYSTEM.

Lo que DOCS produce de forma propia son los documentos de las cuatro categorías en `/docs/`:

| Tipo | Status | Notas |
|---|---|---|
| System Design Docs | PENDING | Por crear — basarse en artefactos de `/_system/` |
| Subsystem Implementation Docs | PENDING | Por crear — uno por subsistema |
| Editor Manuals | PENDING | Por crear — audiencia: editores que usan el sistema |
| Developer Manuals | PENDING | Por crear — audiencia: nuevos desarrolladores |

### Primera prioridad: procesar las DL entries fundacionales

Hay 12 DECISION_LOG entries de la sesión fundacional (DL-20260221-001 a DL-20260221-012) con status OPEN. El primer trabajo de DOCS es procesarlas y producir los primeros documentos de System Design.

---

## SECCIÓN 4: TRABAJO ACTIVO

### Tarea de arranque: System Design Overview

El primer documento que debe producir DOCS es un **System Design Overview** que consolide las 12 decisiones fundacionales en un documento legible para cualquier arquitecto o desarrollador que se incorpore al proyecto.

**Inputs disponibles:**
- `/_system/SCHEMA_SYSTEM_ARCHITECTURE_v1.1.md`
- `/_system/SCHEMA_DECISION_LOG_v1.0.md` (con las 12 DL entries fundacionales)
- `/_system/MASTER_PLAN_v1.2.md`
- Los 7 documentos de contexto de los chats de desarrollo

**Output esperado:**
`/docs/system-design/SYSTEM_DESIGN_OVERVIEW_v1.0.md`

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad |
|---|---|---|
| F4-06 | Diseñar estructura de DOCS y primeros documentos | 🟡 Baja |

### DECISION_LOG entries fundacionales pendientes de integrar

Todas las siguientes tienen status OPEN y requieren acción de DOCS:

| DL-ID | Decisión | Documento afectado |
|---|---|---|
| DL-20260221-001 | Focus types extraídos a resource | System Design Overview, Subsystem Doc KB, Subsystem Doc Research |
| DL-20260221-002 | Writing unificado con bifurcación | System Design Overview, Subsystem Doc Writing |
| DL-20260221-003 | Evaluation independiente con contrato | System Design Overview, Subsystem Doc Evaluation |
| DL-20260221-004 | UPDATE_VALIDATION ownership | Subsystem Doc Research, Subsystem Doc KB |
| DL-20260221-005 | BOOK_BRIEF orienta Research | System Design Overview, Subsystem Doc Activation |
| DL-20260221-006 | Shared prompts en /writing/shared/ | Subsystem Doc Writing, Subsystem Doc Activation |
| DL-20260221-007 | Naming convention unificada | Developer Manual (guía de naming) |
| DL-20260221-008 | Cabecera YAML estándar | Developer Manual (guía de artefactos) |
| DL-20260221-009 | GitHub + Drive como espacios de trabajo | Developer Manual (setup del entorno) |
| DL-20260221-010 | DOCS activo con DECISION_LOG | System Design Overview (este mismo subsistema) |
| DL-20260221-011 | TOOLING en SYSTEM | Subsystem Doc System |
| DL-20260221-012 | Nombre EDITORIAL PROFILE | System Design Overview |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Revisar DL entries con status OPEN o NOTIFIED en `/_system/decisions/`
2. Confirmar con el editor qué tipo de documentación es prioritaria en esta sesión
3. Verificar si hay nuevos artefactos creados en otros subsistemas que necesiten documentación

### Al finalizar cada sesión
1. Marcar como INTEGRATED las DL entries procesadas
2. Listar documentos creados o actualizados con su versión

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
[DOCS] tipo: descripción corta

Ejemplos:
[DOCS] feat: create SYSTEM_DESIGN_OVERVIEW v1.0
[DOCS] feat: create SUBSYSTEM_DOC_RESEARCH v1.0
[DOCS] fix: update EDITOR_MANUAL with new workflow bifurcation
[DOCS] chore: mark DL-20260221-001 through 012 as INTEGRATED
```

### Cuándo crear una DL entry
DOCS raramente genera DL entries — consume las que producen otros. Las excepciones son:
- Cuando se decide la estructura de un tipo de documentación nueva (afecta a qué información deben incluir las DL entries futuras)
- Cuando se identifica que un artefacto del sistema está mal documentado y necesita acción de otro chat

---

## SECCIÓN 6: GUÍA PARA LOS CUATRO TIPOS DE DOCUMENTACIÓN

### System Design Docs
Audiencia: arquitectos y decisores. Responden: ¿por qué el sistema está diseñado así?
- Decisiones arquitectónicas con rationale
- Interfaces entre subsistemas
- Evolución histórica del diseño
- Criterios de extracción de subsistemas futuros

### Subsystem Implementation Docs
Audiencia: el desarrollador que trabaja en ese subsistema. Responden: ¿cómo funciona este subsistema?
- Rol y límites
- Inventario completo de artefactos con versiones
- Flujo interno
- Dependencias y interfaces
- Gaps conocidos y trabajo pendiente

### Editor Manuals
Audiencia: el editor que usa el sistema para escribir un libro o post. Responden: ¿cómo uso esto?
- Cómo iniciar un proyecto nuevo en Drive
- Cuándo usar cada workflow
- Cómo interpretar los semáforos de evaluación
- Qué hacer en cada checkpoint del proceso
- Preguntas frecuentes

### Developer Manuals
Audiencia: un nuevo desarrollador que se incorpora al proyecto. Responden: ¿cómo me pongo al día?
- Setup del entorno (GitHub, Drive, Claude.ai)
- Naming convention y estándar de cabecera YAML
- Cómo funciona el DECISION_LOG
- Cómo abrir y trabajar en un chat de subsistema
- Cómo hacer un PR y qué incluir en el mensaje de commit

---

**FIN DEL DOCUMENTO**
