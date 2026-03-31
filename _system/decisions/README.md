# Decision Log Entries

Registro de decisiones arquitectónicas del sistema D-X-OPUS.
Una entrada por decisión. Formato definido en `SCHEMA_DECISION_LOG.md`.

## Convención de naming

```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

Donde:
- `YYYYMMDD` — fecha de la decisión
- `SUBSYSTEM` — subsistema de origen: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS
- `NNN` — número secuencial global de 3 dígitos (continuo entre todos los subsistemas)

Ejemplos:
```
DL_20260221_SYSTEM_001.md
DL_20260222_KB_002.md
DL_20260222_KB_003.md
DL_20260222_EVAL_004.md
DL_20260330_SYSTEM_004.md
```

## Entradas activas

| DL ID | Subsistema | Decisión | Status |
|---|---|---|---|
| DL_20260222_KB_002 | KNOWLEDGE_BASE | Creación RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | OPEN |
| DL_20260222_KB_003 | KNOWLEDGE_BASE | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | OPEN |
| DL_20260222_EVAL_004 | EVALUATION | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | OPEN |
| DL_20260330_SYSTEM_004 | SYSTEM | EVALUATE_BOOK_STYLE movido de Editorial Profile a Evaluation — ownership lo determina la función, no los inputs | OPEN |

**Nota sobre DL_20260222_EVAL_004:** El archivo en GitHub se llama `DL_20260222_EVAL_001.md`. Debe renombrarse a `DL_20260222_EVAL_004.md` para respetar la numeración secuencial global (001 ya está ocupado por DL_20260221_SYSTEM_001). Operación manual pendiente.

## Decisiones fundacionales pendientes de crear como archivos individuales

| DL ID | Decisión |
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
| DL_20260330_SYSTEM_014 | GitHub MCP no disponible en Plan Pro — flujo manual asistido (DECISIÓN-15) |

## Próximo número secuencial

**015** — usar para la siguiente DL entry que se cree en cualquier subsistema.
