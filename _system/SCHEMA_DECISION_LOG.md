---
id:          SCHEMA_DECISION_LOG
type:        SCHEMA
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  []
outputs: []
calls:   []

## DESCRIPTION
Define el formato estándar de las entradas del DECISION_LOG. Todos los chats de desarrollo producen entradas en este formato cuando toman decisiones arquitectónicas o funcionales relevantes.

---

# SCHEMA: DECISION LOG
## D-X-OPUS — Formato de Registro de Decisiones

---

## PARTE 1: PROPÓSITO

El DECISION_LOG es el mecanismo que mantiene el sistema coherente entre chats de desarrollo independientes. Cada vez que un chat toma una decisión que afecta a otros subsistemas o a la documentación del sistema, produce una entrada en este formato.

**Quién produce entradas:** Cualquier chat de desarrollo, incluyendo SYSTEM.  
**Quién consume entradas:** DOCS (para actualizar documentación) y cualquier chat afectado por la decisión.  
**Dónde viven:** `/dx-opus/_system/decisions/DL_YYYYMMDD_[ID].md`

---

## PARTE 2: FORMATO DE UNA ENTRADA

Cada entrada es un archivo markdown independiente con el siguiente contenido:

```markdown
---
dl_id:       DL-[YYYYMMDD]-[NNN]
date:        YYYY-MM-DD
author:      [iniciales]
origin_chat: [nombre-del-chat]
status:      OPEN | NOTIFIED | INTEGRATED
---

# DECISION LOG ENTRY: [DL-ID]

## DECISION
[Una o dos frases describiendo exactamente qué se decidió.]

## RATIONALE
[Una o dos frases explicando por qué. No el análisis completo — solo la razón clave.]

## AFFECTED SUBSYSTEMS
[Lista de subsistemas que necesitan saber de esta decisión.]
- SUBSYSTEM_NAME: [qué cambia para ellos]

## ARTIFACTS AFFECTED
[Lista de artefactos que deben crearse, modificarse o deprecarse.]

| Artifact | Action | Notes |
|----------|--------|-------|
| PROMPT_X | MODIFY v1.0 → v1.1 | Add new input field |
| RESOURCE_Y | CREATE v1.0 | New resource extracted from PROMPT_X |
| PROMPT_Z | NONE | References RESOURCE_Y but logic unchanged |

## DOCS IMPACT
[Qué sección de qué documento de DOCS necesita actualización.]

| Doc Type | Document | Section | Action |
|----------|----------|---------|--------|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte 3: Sub 1 | Update inventory |
| Developer Manual | DEV_MANUAL_RESEARCH | Capítulo 2 | Add new resource |

## OPEN QUESTIONS
[Preguntas que quedan pendientes de respuesta. Vacío si ninguna.]
- [Pregunta 1]

## INTEGRATION NOTES
[Completar cuando status cambia a INTEGRATED. Qué cambios exactos se hicieron.]
```

---

## PARTE 3: CAMPOS EXPLICADOS

### `dl_id`
Identificador único. Formato: `DL-[YYYYMMDD]-[NNN]` donde NNN es número secuencial del día.  
Ejemplo: `DL-20260221-001` es la primera decisión del 21 de febrero de 2026.

### `status`
- `OPEN`: decisión tomada, pendiente de notificar a chats afectados e integrar en docs
- `NOTIFIED`: los chats afectados han sido informados (vía contexto de su próxima sesión)
- `INTEGRATED`: DOCS ha actualizado todos los documentos afectados

### `AFFECTED SUBSYSTEMS`
Lista solo los subsistemas que necesitan actuar. Si la decisión es solo de SYSTEM y no afecta a otros chats, escribir `None`.

### `ARTIFACTS AFFECTED`
Para cada artefacto, indicar la acción:
- `CREATE`: nuevo artefacto a crear, con versión inicial
- `MODIFY vX.Y → vZ.W`: versión actual y versión resultado del cambio
- `DEPRECATE`: artefacto que deja de usarse
- `RENAME`: cambio de nombre, indicar nombre anterior y nuevo
- `NONE`: el artefacto existe y se referencia en la decisión pero no cambia

### `DOCS IMPACT`
Los cuatro tipos de documentación en DOCS:
- `System Design`: documentos de arquitectura (audiencia: arquitectos)
- `Subsystem Doc`: documentación de implementación del subsistema (audiencia: desarrolladores)
- `Editor Manual`: guías para el usuario del sistema (audiencia: editores)
- `Developer Manual`: guías para nuevos desarrolladores (audiencia: incorporaciones)

---

## PARTE 4: CICLO DE VIDA DE UNA ENTRADA

```
Chat toma decisión
      │
      ▼
Produce DL entry con status: OPEN
Guarda en /decisions/DL_YYYYMMDD_NNN.md
      │
      ▼
Notifica a chats afectados
(incluyendo la DL entry en el contexto de la próxima sesión de cada chat)
Cambia status: NOTIFIED
      │
      ▼
DOCS procesa la entrada
Actualiza todos los documentos listados en DOCS IMPACT
Cambia status: INTEGRATED
```

---

## PARTE 5: EJEMPLO COMPLETO

```markdown
---
dl_id:       DL-20260221-001
date:        2026-02-21
author:      JM
origin_chat: system-architecture
status:      OPEN
---

# DECISION LOG ENTRY: DL-20260221-001

## DECISION
Los 7 tipos de Research Focus (A-G) se extraen de PROMPT_CREATE_RESEARCH_PLAN
a un nuevo recurso independiente: RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.

## RATIONALE
El 17% del prompt son configuraciones de focus. Embebidos en el prompt,
añadir un nuevo focus requiere editar 1.620 líneas. Extraídos a un recurso,
solo se añade una entrada al recurso sin tocar la lógica del proceso.

## AFFECTED SUBSYSTEMS
- KNOWLEDGE_BASE: nuevo recurso a crear y mantener (RESOURCE_RESEARCH_FOCUS_TYPES)
- RESEARCH: CREATE_RESEARCH_PLAN debe leer el recurso en Step 0 (actualizar a v3.0)

## ARTIFACTS AFFECTED

| Artifact | Action | Notes |
|----------|--------|-------|
| RESOURCE_RESEARCH_FOCUS_TYPES | CREATE v1.0 | Extraer de secciones 1.2 y 4.1 de CREATE_RESEARCH_PLAN |
| PROMPT_CREATE_RESEARCH_PLAN | MODIFY v2.2 → v3.0 | Step 0: leer RESOURCE_RESEARCH_FOCUS_TYPES. Eliminar secciones 1.2 y 4.1 hardcodeadas |
| PROMPT_EXECUTE_RESEARCH_PLAN | NONE | No cambia — es agnóstico al focus |

## DOCS IMPACT

| Doc Type | Document | Section | Action |
|----------|----------|---------|--------|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte 3: Sub 1 | Añadir RESOURCE_RESEARCH_FOCUS_TYPES al inventario de Knowledge Base |
| Subsystem Doc | SUBSYSTEM_DOC_RESEARCH | Sección inputs | Añadir RESOURCE_RESEARCH_FOCUS_TYPES como input de Fase 4B |
| Subsystem Doc | SUBSYSTEM_DOC_KNOWLEDGE_BASE | Sección recursos | Añadir nuevo recurso con descripción |

## OPEN QUESTIONS
- None

## INTEGRATION NOTES
[pendiente]
```

---

## PARTE 6: DECISIONES YA REGISTRADAS (SESIÓN FUNDACIONAL)

Las siguientes decisiones se tomaron en el chat de system-architecture el 21/02/2026. Se documentan aquí como registro histórico. Todas tienen status OPEN hasta que DOCS las integre.

| DL-ID | Decisión | Artefactos principales |
|---|---|---|
| DL-20260221-001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES | RESOURCE_RESEARCH_FOCUS_TYPES (CREATE), PROMPT_CREATE_RESEARCH_PLAN v3.0 (MODIFY) |
| DL-20260221-002 | Writing unificado con bifurcación editorial (Book/Post) | WORKFLOW_WRITING v2.0 (MODIFY) |
| DL-20260221-003 | Evaluation como subsistema independiente con contrato de evaluación | RESOURCE_EVALUATION_FRAMEWORK v1.0 (CREATE), EVALUATE_* v1.1 (MODIFY ×3) |
| DL-20260221-004 | UPDATE_VALIDATION_CHECKLIST en Research, esquema canónico en Knowledge Base | PROMPT_UPDATE_VALIDATION_CHECKLIST ownership definido |
| DL-20260221-005 | BOOK_BRIEF de Activation orienta Research sin sustituirlo | PROMPT_CREATE_BOOK_BRIEF v1.0 (CREATE), WORKFLOW_RESEARCH v3.2 (MODIFY input opcional) |
| DL-20260221-006 | Prompts compartidos en /shared/ con owner principal y obligación de notificar | WRITE_POST, CREATE_TIMELINE, CREATE_CAST movidos a /shared/ |
| DL-20260221-007 | Naming convention unificada: 7 tipos, 2 namespaces | Todos los artefactos (RENAME gradual) |
| DL-20260221-008 | Cabecera YAML estándar obligatoria en todos los artefactos | RESOURCE_ARTIFACT_HEADER_STANDARD v1.0 (CREATE) |
| DL-20260221-009 | GitHub para sistema, Drive para proyectos | TOOL_SETUP_PROJECT v1.0 (CREATE), TOOL_GITHUB_REPO_STRUCTURE v1.0 (CREATE) |
| DL-20260221-010 | DOCS como subsistema activo con DECISION_LOG como mecanismo de sync | SCHEMA_DECISION_LOG v1.0 (CREATE) |
| DL-20260221-011 | TOOLING en SYSTEM mientras <3 herramientas activas. Tipo TOOL añadido. | RESOURCE_ARTIFACT_HEADER_STANDARD actualizado |
| DL-20260221-012 | Subsistema 3 se llama EDITORIAL PROFILE (no Editor Identity ni Editorial Management) | SCHEMA_SYSTEM_ARCHITECTURE actualizado |

---

**FIN DEL DOCUMENTO**
