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
DL_20260221_SYSTEM_001.md
DL_20260222_KB_002.md
DL_20260222_KB_003.md
DL_20260222_EVAL_001.md
```

## Entradas activas

| DL ID | Subsistema | Decisión | Status |
| --- | --- | --- | --- |
| DL_20260222_EVAL_001 | EVALUATION | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | OPEN |
| DL_20260222_KB_002 | KNOWLEDGE_BASE | Creación RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | OPEN |
| DL_20260222_KB_003 | KNOWLEDGE_BASE | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | OPEN |
| DL_20260411_WRITING_015 | WRITING | Q&A siempre activo en workflow POST salvo skip explícito del editor | OPEN |
| DL_20260411_WRITING_016 | WRITING | POST_SEED como artefacto canónico — input unificado de PROMPT_WRITE_POST | OPEN |
| DL_20260411_WRITING_017 | WRITING | WRITING_CONTEXT como artefacto canónico de configuración del workflow POST | OPEN |
| DL_20260411_WRITING_018 | WRITING | PUBLICATION_PROFILE como entidad independiente del EDITOR_PROFILE | OPEN |
| DL_20260411_WRITING_019 | WRITING | PROMPT_SPLIT_POST como prompt independiente invocable en cualquier fase | OPEN |
| DL_20260411_WRITING_020 | WRITING | Modo híbrido de PROMPT_WRITE_POST activado solo por declaración explícita | OPEN |
| DL_20260411_SYSTEM_021 | SYSTEM | Enriquecimiento del EDITOR_PROFILE por aprendizaje del sistema — Sprint 4 | OPEN |
| DL_20260411_ACTIVATION_022 | ACTIVATION | WORKFLOW_ACTIVATION v1.5 incorpora Q&A de posicionamiento antes de escritura | OPEN |
| DL_20260411_WRITING_023 | WRITING | PROMPT_POST_ANGLES posicionado después del Q&A, antes de PROMPT_PLAN_POST | OPEN |

## Decisiones fundacionales pendientes de crear como archivos individuales

| DL ID | Decisión |
| --- | --- |
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
| DL_20260330_SYSTEM_014 | GitHub MCP no disponible en Plan Pro — flujo manual asistido (DECISIÓN-15) |

## Último número usado

**023** — próxima entrada: 024
