---
id:          SCHEMA_DECISION_LOG
type:        SCHEMA
subsystem:   SYSTEM
version:     2.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-22
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v2.0 | 2026-02-22 | JM | New filename format: DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md with global sequential numbering. Updated dl_id format accordingly. |
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
**Dónde viven:** `/_system/decisions/DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`

---

## PARTE 2: NAMING DEL ARCHIVO

### Formato
```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

### Campos
- `YYYYMMDD` — fecha en que se toma la decisión
- `SUBSYSTEM` — subsistema de origen (ver tabla)
- `NNN` — número secuencial **global**, de 3 dígitos, continuo entre todos los subsistemas

### Valores válidos de SUBSYSTEM

| Valor | Subsistema |
|---|---|
| `SYSTEM` | system-architecture |
| `KB` | knowledge-base-dev |
| `RESEARCH` | research-dev |
| `EDITORIAL` | editorial-profile-dev |
| `WRITING` | writing-dev |
| `EVAL` | evaluation-dev |
| `ACTIVATION` | activation-dev |
| `DOCS` | docs-dev |

### Numeración global
El número NNN es secuencial a nivel de sistema — no se reinicia por subsistema ni por fecha. La primera entrada es `001`, la segunda es `002`, independientemente de qué subsistema la produzca o en qué fecha.

Esto garantiza que cada DL entry tiene un identificador único en todo el sistema y puede referenciarse sin ambigüedad: "ver DL_003" identifica una única entrada.

### Ejemplos
```
DL_20260221_SYSTEM_001.md    ← primera decisión del sistema
DL_20260221_RESEARCH_002.md  ← segunda decisión del sistema (mismo día, otro subsistema)
DL_20260222_EVAL_003.md      ← tercera decisión del sistema (otro día)
DL_20260222_KB_004.md        ← cuarta decisión del sistema
```

---

## PARTE 3: FORMATO DEL CONTENIDO

Cada entrada es un archivo markdown independiente con el siguiente contenido:

```markdown
---
dl_id:       DL_YYYYMMDD_[SUBSYSTEM]_[NNN]
date:        YYYY-MM-DD
author:      [iniciales]
origin_chat: [nombre-del-chat]
status:      OPEN | NOTIFIED | INTEGRATED
---

# DECISION LOG ENTRY: DL_YYYYMMDD_[SUBSYSTEM]_[NNN]

## DECISION
[Una o dos frases describiendo exactamente qué se decidió.]

## RATIONALE
[Una o dos frases explicando por qué. No el análisis completo — solo la razón clave.]

## AFFECTED SUBSYSTEMS
[Lista de subsistemas que necesitan saber de esta decisión.]
- SUBSYSTEM_NAME: [qué cambia para ellos]

## ARTIFACTS AFFECTED

| Artifact | Action | Notes |
|----------|--------|-------|
| PROMPT_X | MODIFY v1.0 → v1.1 | Descripción del cambio |
| RESOURCE_Y | CREATE v1.0 | Nuevo recurso a crear |
| PROMPT_Z | NONE | Se referencia pero no cambia |

## DOCS IMPACT

| Doc Type | Document | Section | Action |
|----------|----------|---------|--------|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte X | Descripción |
| Subsystem Doc | SUBSYSTEM_DOC_X | Sección Y | Descripción |
| Editor Manual | EDITOR_MANUAL | Capítulo Z | Descripción |
| Developer Manual | DEV_MANUAL | Capítulo Z | Descripción |

## OPEN QUESTIONS
[Preguntas que quedan pendientes. Vacío si ninguna.]

## INTEGRATION NOTES
[Completar cuando status cambia a INTEGRATED. Qué cambios exactos se hicieron y cuándo.]
```

---

## PARTE 4: CAMPOS EXPLICADOS

### `dl_id`
Identificador único. Mismo formato que el nombre del archivo sin extensión.
Ejemplo: `DL_20260221_RESEARCH_002`

### `status`
- `OPEN` — decisión tomada, pendiente de notificar a chats afectados e integrar en docs
- `NOTIFIED` — los chats afectados han sido informados (vía contexto de su próxima sesión)
- `INTEGRATED` — DOCS ha actualizado todos los documentos listados en DOCS IMPACT

### `AFFECTED SUBSYSTEMS`
Lista solo los subsistemas que necesitan actuar. Si la decisión es interna al subsistema y no afecta a otros, escribir `None`.

### `ARTIFACTS AFFECTED`
Para cada artefacto, indicar la acción:
- `CREATE` — nuevo artefacto a crear, con versión inicial
- `MODIFY vX.Y → vZ.W` — versión actual y versión resultado del cambio
- `DEPRECATE` — artefacto que deja de usarse
- `RENAME` — cambio de nombre, indicar nombre anterior y nuevo
- `NONE` — el artefacto existe y se referencia en la decisión pero no cambia

### `DOCS IMPACT`
Los cuatro tipos de documentación en DOCS:
- `System Design` — documentos de arquitectura (audiencia: arquitectos)
- `Subsystem Doc` — documentación de implementación del subsistema (audiencia: desarrolladores)
- `Editor Manual` — guías para el usuario del sistema (audiencia: editores)
- `Developer Manual` — guías para nuevos desarrolladores (audiencia: incorporaciones)

---

## PARTE 5: CICLO DE VIDA DE UNA ENTRADA

```
Chat toma una decisión relevante
        │
        ▼
Produce DL entry con status: OPEN
Nombre: DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
Sube a GitHub /_system/decisions/
        │
        ▼
Notifica a chats afectados
(incluye la DL entry al inicio de la próxima sesión de cada chat)
Actualiza status: NOTIFIED
        │
        ▼
DOCS procesa la entrada
Actualiza todos los documentos listados en DOCS IMPACT
Actualiza status: INTEGRATED
```

### ¿Cuándo produce una DL entry un chat?
- Cuando cambia el formato de output de un artefacto (afecta a quien lo consume)
- Cuando cambia el ownership de un artefacto
- Cuando se crea o depreca un artefacto del sistema
- Cuando se toma una decisión arquitectónica que afecta a más de un subsistema
- Cuando se resuelve un gap identificado en una auditoría

### ¿Cuándo NO produce una DL entry?
- Mejoras internas de un prompt que no cambian su interfaz (inputs/outputs)
- Correcciones de redacción o estilo dentro de un artefacto
- Decisiones de proceso interno del chat que no afectan a otros subsistemas

---

## PARTE 6: EJEMPLO COMPLETO

```markdown
---
dl_id:       DL_20260221_SYSTEM_001
date:        2026-02-21
author:      JM
origin_chat: system-architecture
status:      OPEN
---

# DECISION LOG ENTRY: DL_20260221_SYSTEM_001

## DECISION
Los 7 tipos de Research Focus (A-G) se extraen de PROMPT_CREATE_RESEARCH_PLAN
a un nuevo recurso independiente: RESOURCE_RESEARCH_FOCUS_TYPES.

## RATIONALE
El 17% del prompt son configuraciones de focus. Embebidos en el prompt,
añadir un nuevo focus requiere editar 1.620 líneas. Extraídos a un recurso,
solo se añade una entrada al recurso sin tocar la lógica del proceso.

## AFFECTED SUBSYSTEMS
- KNOWLEDGE_BASE: nuevo recurso a crear y mantener (RESOURCE_RESEARCH_FOCUS_TYPES)
- RESEARCH: PROMPT_CREATE_RESEARCH_PLAN debe leer el recurso en Step 0

## ARTIFACTS AFFECTED

| Artifact | Action | Notes |
|----------|--------|-------|
| RESOURCE_RESEARCH_FOCUS_TYPES | CREATE v1.0 | Extraer de secciones 1.2 y 4.1 de PROMPT_CREATE_RESEARCH_PLAN |
| PROMPT_CREATE_RESEARCH_PLAN | MODIFY v2.2 → v3.0 | Step 0: leer RESOURCE_RESEARCH_FOCUS_TYPES. Eliminar secciones 1.2 y 4.1 hardcodeadas |
| PROMPT_EXECUTE_RESEARCH_PLAN | NONE | Agnóstico al focus — no cambia |

## DOCS IMPACT

| Doc Type | Document | Section | Action |
|----------|----------|---------|--------|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte 3: KB | Añadir RESOURCE_RESEARCH_FOCUS_TYPES al inventario |
| Subsystem Doc | SUBSYSTEM_DOC_RESEARCH | Sección inputs | Añadir RESOURCE_RESEARCH_FOCUS_TYPES como input de Fase 4B |
| Subsystem Doc | SUBSYSTEM_DOC_KNOWLEDGE_BASE | Sección recursos | Añadir nuevo recurso con descripción |

## OPEN QUESTIONS
- None

## INTEGRATION NOTES
[pendiente]
```

---

## PARTE 7: REGISTRO DE DECISIONES FUNDACIONALES

Decisiones tomadas en la sesión fundacional (21/02/2026) en system-architecture. Pendientes de crear como archivos individuales en `/_system/decisions/`.

| DL ID | Decisión | Status |
|---|---|---|
| DL_20260221_SYSTEM_001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES | OPEN |
| DL_20260221_SYSTEM_002 | Writing unificado con bifurcación editorial Book/Post | OPEN |
| DL_20260221_SYSTEM_003 | Evaluation como subsistema independiente con contrato de evaluación | OPEN |
| DL_20260221_SYSTEM_004 | UPDATE_VALIDATION_CHECKLIST owned by Research; KB define esquema canónico | OPEN |
| DL_20260221_SYSTEM_005 | BOOK_BRIEF de Activation orienta Research sin sustituirlo | OPEN |
| DL_20260221_SYSTEM_006 | Prompts compartidos en /writing/shared/ — Writing es owner | OPEN |
| DL_20260221_SYSTEM_007 | Naming convention: sin versión en nombre de archivo — Git gestiona historial | OPEN |
| DL_20260221_SYSTEM_008 | Cabecera YAML estándar obligatoria en todos los artefactos | OPEN |
| DL_20260221_SYSTEM_009 | GitHub para sistema, Drive para proyectos de producción | OPEN |
| DL_20260221_SYSTEM_010 | DOCS como subsistema activo con DECISION_LOG como mecanismo de sync | OPEN |
| DL_20260221_SYSTEM_011 | TOOLING en SYSTEM mientras menos de 3 herramientas activas | OPEN |
| DL_20260221_SYSTEM_012 | Subsistema 3 se llama EDITORIAL PROFILE | OPEN |
| DL_20260221_SYSTEM_013 | DL entries con formato DL_YYYYMMDD_[SUBSYSTEM]_[NNN] y numeración global | OPEN |

---

**FIN DEL DOCUMENTO**
