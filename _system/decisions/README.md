# Decision Log Entries

Registro de decisiones arquitectónicas del sistema D-X-OPUS.
Una entrada por decisión. Formato definido en `SCHEMA_DECISION_LOG.md`.

## Convención de naming

```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

Donde:

* `YYYYMMDD` — fecha de la decisión
* `SUBSYSTEM` — subsistema de origen: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS
* `NNN` — número secuencial global de 3 dígitos (continuo entre todos los subsistemas)

Ejemplos:

```
DL_20260222_EVAL_001.md
DL_20260222_KB_002.md
DL_20260222_KB_003.md
DL_20260330_SYSTEM_004.md
```

## Nota sobre numeración global

El contador `NNN` es global y secuencial entre todos los subsistemas. No reinicia por subsistema ni por fecha. Las decisiones fundacionales del sistema (listadas abajo como pendientes de crear archivo individual) tienen IDs provisionales en el rango SYSTEM_001–SYSTEM_013. Los archivos reales en el repo mantienen numeración global continua independientemente del subsistema.

**Nota sobre gap en numeración (Sprint cierre R1):** el número 024 no fue asignado. Los DL entries del Sprint cierre R1 son 025 y 026.

## Entradas activas — archivos existentes en repo

| DL ID | Fecha | Subsistema | Decisión | Status |
|---|---|---|---|---|
| DL_20260222_EVAL_001 | 2026-02-22 | EVALUATION | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | INTEGRATED |
| DL_20260222_KB_002 | 2026-02-22 | KNOWLEDGE_BASE | Creación RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | INTEGRATED |
| DL_20260222_KB_003 | 2026-02-22 | KNOWLEDGE_BASE | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | INTEGRATED |
| DL_20260330_SYSTEM_004 | 2026-03-30 | SYSTEM | EVALUATE_BOOK_STYLE ownership → Evaluation (no Editorial Profile) | INTEGRATED |
| DL_20260411_WRITING_015 | 2026-04-11 | WRITING | Q&A siempre activo en workflow POST salvo skip explícito del editor | OPEN |
| DL_20260411_WRITING_016 | 2026-04-11 | WRITING | POST_SEED como artefacto canónico — input unificado de PROMPT_WRITE_POST | OPEN |
| DL_20260411_WRITING_017 | 2026-04-11 | WRITING | WRITING_CONTEXT como artefacto canónico de configuración del workflow POST | OPEN |
| DL_20260411_WRITING_018 | 2026-04-11 | WRITING | PUBLICATION_PROFILE como entidad independiente del EDITOR_PROFILE | OPEN |
| DL_20260411_WRITING_019 | 2026-04-11 | WRITING | PROMPT_SPLIT_POST como prompt independiente invocable en cualquier fase | OPEN |
| DL_20260411_WRITING_020 | 2026-04-11 | WRITING | Modo híbrido de PROMPT_WRITE_POST activado solo por declaración explícita | OPEN |
| DL_20260411_SYSTEM_021 | 2026-04-11 | SYSTEM | Enriquecimiento del EDITOR_PROFILE por aprendizaje del sistema — Sprint 4 | OPEN |
| DL_20260411_ACTIVATION_022 | 2026-04-11 | ACTIVATION | WORKFLOW_ACTIVATION v1.5 incorpora Q&A de posicionamiento antes de escritura | OPEN |
| DL_20260411_WRITING_023 | 2026-04-11 | WRITING | PROMPT_POST_ANGLES posicionado después del Q&A, antes de PROMPT_PLAN_POST | OPEN |
| DL_20260416_SYSTEM_025 | 2026-04-16 | SYSTEM | Scope flujo POST en Activation: solo WRITE_POST shared para R1 | OPEN |
| DL_20260416_SYSTEM_026 | 2026-04-16 | SYSTEM | Ubicación WORKFLOW_WRITING: mover a writing/ raíz como WORKFLOW_WRITING.md | OPEN |

**Nota:** el número 024 no fue asignado (Sprint cierre R1).

## Decisiones fundacionales — archivos individuales pendientes de crear

Estas decisiones tienen ID provisional y están documentadas en MASTER_PLAN y SCHEMA_DECISION_LOG. Pendientes de crear como archivos `.md` individuales en esta carpeta. Cuando se creen, recibirán nuevos números globales a partir del próximo disponible (ver abajo).

| DL ID provisional | Decisión |
|---|---|
| DL_20260221_SYSTEM_001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES |
| DL_20260221_SYSTEM_002 | Writing unificado con bifurcación editorial Book/Post |
| DL_20260221_SYSTEM_003 | Evaluation como subsistema independiente con contrato de evaluación |
| DL_20260221_SYSTEM_004 | UPDATE_VALIDATION_CHECKLIST owned by Research; KB define esquema canónico |
| DL_20260221_SYSTEM_005 | BOOK_BRIEF de Activation orienta Research sin sustituirlo |
| DL_20260221_SYSTEM_006 | Prompts compartidos en /writing/shared/ — Writing es owner |
| DL_20260221_SYSTEM_007 | Naming convention: sin versión en nombre de archivo en GitHub |
| DL_20260221_SYSTEM_008 | Cabecera YAML estándar obligatoria en todos los artefactos |
| DL_20260221_SYSTEM_009 | GitHub para sistema, Drive para proyectos de producción |
| DL_20260221_SYSTEM_010 | DOCS como subsistema activo con DECISION_LOG como mecanismo de sync |
| DL_20260221_SYSTEM_011 | TOOLING en SYSTEM mientras menos de 3 herramientas activas |
| DL_20260221_SYSTEM_012 | Subsistema 3 se llama EDITORIAL PROFILE |
| DL_20260221_SYSTEM_013 | DL entries con formato DL_YYYYMMDD_[SUBSYSTEM]_[NNN] y numeración global |
| DL_20260330_SYSTEM_015 | GitHub MCP no disponible en Plan Pro — flujo manual asistido |

## Próximo número disponible

**027** — usar para la siguiente DL entry que se cree en cualquier subsistema.
