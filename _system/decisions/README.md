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

El contador `NNN` es global y secuencial entre todos los subsistemas. No reinicia por subsistema. Las 14 decisiones fundacionales del sistema (listadas abajo como pendientes de crear archivo individual) tienen IDs reservados en el rango 001–014 del subsistema SYSTEM. Los archivos EVAL_001, KB_002 y KB_003 fueron los primeros en crearse como archivos individuales y mantienen sus números. Las decisiones SYSTEM_001–SYSTEM_013 (fundacionales del 21/02/2026) aún no tienen archivo individual creado — sus IDs están reservados pero el archivo físico está pendiente.

## Entradas activas — archivos existentes en repo

| DL ID | Fecha | Subsistema | Decisión | Status |
| --- | --- | --- | --- | --- |
| DL_20260222_EVAL_001 | 2026-02-22 | EVALUATION | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | INTEGRATED |
| DL_20260222_KB_002 | 2026-02-22 | KNOWLEDGE_BASE | Creación RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | INTEGRATED |
| DL_20260222_KB_003 | 2026-02-22 | KNOWLEDGE_BASE | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | INTEGRATED |
| DL_20260330_SYSTEM_004 | 2026-03-30 | SYSTEM | EVALUATE_BOOK_STYLE ownership → Evaluation (no Editorial Profile) | INTEGRATED |
| DL_20260416_SYSTEM_025 | 2026-04-16 | SYSTEM | Scope flujo POST en Activation: solo WRITE_POST shared para R1 | OPEN |
| DL_20260416_SYSTEM_026 | 2026-04-16 | SYSTEM | Ubicación WORKFLOW_WRITING: mover a writing/ raíz como WORKFLOW_WRITING.md | OPEN |

## Decisiones fundacionales — archivos individuales pendientes de crear

Estas decisiones tienen ID reservado y están documentadas en MASTER_PLAN. Pendientes de crear como archivos `.md` individuales en esta carpeta.

| DL ID reservado | Decisión |
| --- | --- |
| DL_20260221_SYSTEM_001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES |
| DL_20260221_SYSTEM_002 | Writing unificado con bifurcación editorial Book/Post |
| DL_20260221_SYSTEM_003 | Evaluation como subsistema independiente con contrato de evaluación |
| DL_20260221_SYSTEM_005 | UPDATE_VALIDATION_CHECKLIST owned by Research; KB define esquema canónico |
| DL_20260221_SYSTEM_006 | BOOK_BRIEF de Activation orienta Research sin sustituirlo |
| DL_20260221_SYSTEM_007 | Prompts compartidos en /writing/shared/ — Writing es owner |
| DL_20260221_SYSTEM_008 | Naming convention: sin versión en nombre de archivo en GitHub |
| DL_20260221_SYSTEM_009 | Cabecera YAML estándar obligatoria en todos los artefactos |
| DL_20260221_SYSTEM_010 | GitHub para sistema, Drive para proyectos de producción |
| DL_20260221_SYSTEM_011 | DOCS como subsistema activo con DECISION_LOG como mecanismo de sync |
| DL_20260221_SYSTEM_012 | TOOLING en SYSTEM mientras menos de 3 herramientas activas |
| DL_20260221_SYSTEM_013 | Subsistema 3 se llama EDITORIAL PROFILE |
| DL_20260221_SYSTEM_014 | DL entries con formato DL_YYYYMMDD_[SUBSYSTEM]_[NNN] y numeración global |
| DL_20260330_SYSTEM_015 | GitHub MCP no disponible en Plan Pro — flujo manual asistido |

## Próximo número disponible

**027** — usar para la siguiente DL entry que se cree en cualquier subsistema.
