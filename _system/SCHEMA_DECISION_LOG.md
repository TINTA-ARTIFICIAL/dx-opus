---
id:          SCHEMA_DECISION_LOG
type:        SCHEMA
subsystem:   SYSTEM
version:     2.2
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-18
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v2.2 | 2026-04-18 | JM | DL-NUM audit fix: changed NNN from global to per-subsystem. Updated PARTE 2 numbering rule and examples. Updated PARTE 7 to mark DL_013 as superseded by DL_20260418_SYSTEM_027. |
| v2.1 | 2026-04-16 | JM | SC-06: Update status of 13 foundational entries in PARTE 7 from OPEN to INTEGRATED. SC-02: Add numbering clarification note in PARTE 7. |
| v2.0 | 2026-02-22 | JM | New filename format: DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md. Updated dl_id format accordingly. |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

```
inputs:  []
outputs: []
calls:   []
```

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
- `NNN` — número secuencial de 3 dígitos, **único por subsistema**

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

### Numeración por subsistema

El número NNN es secuencial dentro del namespace de cada subsistema — no es global. Cada subsistema mantiene su propio contador independiente que empieza en 001.

El identificador único canónico de una decisión es el **nombre completo del archivo**: `DL_YYYYMMDD_SUBSYSTEM_NNN`. Dos subsistemas pueden compartir el mismo NNN sin colisión porque el identificador completo siempre es único.

Antes de crear una nueva entrada, consultar `/_system/decisions/README.md` para ver el próximo número disponible del subsistema correspondiente.

**Referencia:** DL_20260418_SYSTEM_027

### Ejemplos

```
DL_20260221_SYSTEM_001.md    ← primera decisión del subsistema SYSTEM
DL_20260222_KB_002.md        ← segunda decisión del subsistema KB
DL_20260222_KB_003.md        ← tercera decisión del subsistema KB
DL_20260331_RESEARCH_015.md  ← décimoquinta decisión del subsistema RESEARCH
DL_20260411_WRITING_015.md   ← décimoquinta decisión del subsistema WRITING (sin colisión)
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

---

## PARTE 5: CICLO DE VIDA DE UNA ENTRADA

```
Chat toma decisión
        ↓
Crea DL_YYYYMMDD_[SUB]_[NNN].md  (status: OPEN)
        ↓
Notifica a chats afectados vía contexto de sesión  (status: NOTIFIED)
        ↓
DOCS actualiza documentación afectada  (status: INTEGRATED)
```

El chat que produce la entrada es responsable de:
1. Crear el archivo con el formato correcto
2. Incluir todos los artefactos y docs afectados
3. Notificar a los chats afectados en su próxima sesión

DOCS es responsable de:
1. Detectar entradas en status OPEN o NOTIFIED
2. Actualizar los documentos listados en DOCS IMPACT
3. Cambiar status a INTEGRATED

---

## PARTE 6: CUÁNDO CREAR UNA ENTRADA

**Sí crear una entrada cuando:**
- Se cambia el formato de un artefacto que otros subsistemas consumen (e.g., EDITOR_PROFILE, SAH, POST_SEED)
- Se mueve un artefacto de un subsistema a otro (cambia el ownership)
- Se añade o elimina un prompt de `/writing/shared/`
- Se toma una decisión de arquitectura que afecta a más de un subsistema
- Se depreca un artefacto que otros subsistemas referenciaban

**No crear una entrada cuando:**
- El cambio es interno al subsistema y no afecta a otros (e.g., mejorar la lógica interna de un prompt sin cambiar su interfaz)
- Es una corrección menor de documentación sin impacto en otros chats

---

## PARTE 7: REGISTRO DE DECISIONES FUNDACIONALES

Decisiones tomadas en Sprint 0 (2026-02-21) que configuran el sistema base.
Todas tienen status INTEGRATED — llevan operativas desde Sprint 0.

| DL ID | Decisión | Status |
|---|---|---|
| DL_20260221_SYSTEM_001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES | INTEGRATED |
| DL_20260221_SYSTEM_002 | Writing unificado con bifurcación editorial Book/Post | INTEGRATED |
| DL_20260221_SYSTEM_003 | Evaluation como subsistema independiente con contrato de evaluación | INTEGRATED |
| DL_20260221_SYSTEM_004 | UPDATE_VALIDATION_CHECKLIST owned by Research; KB define esquema canónico | INTEGRATED |
| DL_20260221_SYSTEM_005 | BOOK_BRIEF de Activation orienta Research sin sustituirlo | INTEGRATED |
| DL_20260221_SYSTEM_006 | Prompts compartidos en /writing/shared/ — Writing es owner | INTEGRATED |
| DL_20260221_SYSTEM_007 | Naming convention: sin versión en nombre de archivo en GitHub | INTEGRATED |
| DL_20260221_SYSTEM_008 | Cabecera YAML estándar obligatoria en todos los artefactos | INTEGRATED |
| DL_20260221_SYSTEM_009 | GitHub para sistema, Drive para proyectos de producción | INTEGRATED |
| DL_20260221_SYSTEM_010 | DOCS como subsistema activo con DECISION_LOG como mecanismo de sync | INTEGRATED |
| DL_20260221_SYSTEM_011 | TOOLING en SYSTEM mientras menos de 3 herramientas activas | INTEGRATED |
| DL_20260221_SYSTEM_012 | Subsistema 3 se llama EDITORIAL PROFILE | INTEGRATED |
| DL_20260221_SYSTEM_013 | ~~DL entries con numeración global~~ — SUPERSEDIDA por DL_20260418_SYSTEM_027 | SUPERSEDED |
| DL_20260418_SYSTEM_027 | NNN secuencial por subsistema (no global). Identificador canónico = nombre completo del archivo | OPEN |

---

**FIN DEL DOCUMENTO**
