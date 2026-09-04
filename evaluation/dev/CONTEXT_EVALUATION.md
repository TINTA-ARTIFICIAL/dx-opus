---
id:          CONTEXT_EVALUATION
type:        TEMPLATE
subsystem:   EVALUATION
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-16
owner_chat:  evaluation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.4 | 2026-04-16 | JM | Sprint closure R1: EVALUATE_BOOK_STYLE updated to v1.1 ACTIVE. EVALUATE_POST v1.0 ACTIVE (created 2026-04-12). RESOURCE_EVALUATION_FRAMEWORK updated to v1.1. Inventory reflects current repo state. |
| v1.3 | 2026-03-30 | JM | EVALUATE_BOOK_STYLE incorporated as owned artifact (DL_20260330_SYSTEM_004). Updated inventory, interfaces, and execution order. Clarified principle: ownership determined by function, not by inputs. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

```
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls:   []
```

## DESCRIPTION

Documento de contexto para el chat de desarrollo del subsistema EVALUATION. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: EVALUATION — DEVELOPMENT CHAT

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

* **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
* **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
* Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
* Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Evaluation es el subsistema único responsable de toda evaluación de calidad en el sistema D-X-OPUS. Puede cambiar el método de evaluación — scoring, dimensiones, umbrales — sin que los workflows que lo invocan necesiten modificarse. Esto es posible gracias al contrato de evaluación: una interfaz estable que define el formato de output pero no la lógica interna.

### Principio de ownership

El ownership de un evaluador lo determina su **función** (evaluar), no sus **inputs**. Que un evaluador necesite EDITOR_PROFILE, SAH o CVC como input no lo convierte en propiedad del subsistema que gestiona esos recursos. Evaluation desarrolla y versiona todos los evaluadores del sistema.

### Límites — qué NO gestiona este subsistema

* No define el EDITOR_PROFILE — eso es Editorial Profile. Solo lo consume como input.
* No define SAH ni CVC — eso es Knowledge Base. Solo los consume como inputs.
* No decide si el proyecto continúa o se detiene — eso es el editor, ayudado por `decision_guidance`.
* No produce texto ni investigación — solo evalúa artefactos producidos por otros subsistemas.

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| EDITOR_PROFILE | Editorial Profile | Input de EVALUATE_BOOK_STYLE y EVALUATE_POST |
| RESOURCE_SOURCE_AUTHORITY (SAH) | Knowledge Base | Input de EVALUATE_RESEARCH_REPORT |
| RESOURCE_CLAIM_VALIDATION (CVC) | Knowledge Base | Input de EVALUATE_RESEARCH_REPORT |
| RESEARCH_REPORT / RESEARCH_DEEP_DIVE | Research | Artefacto evaluado por EVALUATE_RESEARCH_REPORT |
| Capítulos / libro completo | Writing | Artefacto evaluado por EVALUATE_BOOK_CONTENT y EVALUATE_BOOK_STYLE |
| Post / artículo | Writing | Artefacto evaluado por EVALUATE_POST |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| EVALUATION_RESULT | Todos los subsistemas | Output canónico de cualquier evaluador (GREEN/YELLOW/RED) |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_EVALUATION_FRAMEWORK | v1.1 | ACTIVE | Contrato de evaluación: formato EVALUATION_RESULT, protocolo de invocación, inventario de evaluadores |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | Evaluador de RESEARCH_REPORT y RESEARCH_DEEP_DIVE. 4 dimensiones: fuentes, claims, cobertura, metodología |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.1 | ACTIVE | Evaluador de contenido de libros. 2 dimensiones: fuentes y claims en prosa |
| PROMPT_EVALUATE_BOOK_STYLE | v1.1 | ACTIVE | Evaluador de adherencia al perfil editorial del autor. 9 dimensiones de estilo |
| PROMPT_EVALUATE_POST | v1.0 | ACTIVE | Evaluador de posts y artículos. 5 dimensiones: núcleo narrativo, estructura, voz, rigor, completitud editorial |
| CONTEXT_EVALUATION | v1.4 | ACTIVE | Este documento |

### Artefactos pendientes

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_EVALUATE_ACTIVATION | 🟡 Baja | — |

---

## SECCIÓN 4: CONTRATO DE EVALUACIÓN

Todos los evaluadores producen el mismo output canónico:

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [instrucción concreta para el editor]
  blocking_issues:   [...] (solo en RED)
  improvement_areas: [...] (solo en YELLOW)
  strengths:         [...] (siempre, mínimo 2 items)
```

**Los workflows solo leen `status` y `decision_guidance`.** El resto del output es para el editor.

Ver `RESOURCE_EVALUATION_FRAMEWORK` para especificación completa del contrato.

---

## SECCIÓN 5: TRABAJO ACTIVO

### Sprint cierre R1 — completado

| Tarea | Resultado | Fecha |
|---|---|---|
| EV-01: PROMPT_EVALUATE_BOOK_STYLE v1.1 | Contrato adoptado, YAML header, ownership correcto | 2026-04-16 |
| EV-02: RESOURCE_EVALUATION_FRAMEWORK v1.1 | EVALUATE_POST ACTIVE, ownership BOOK_STYLE corregido | 2026-04-16 |
| EV-03: CONTEXT_EVALUATION v1.4 | Inventario actualizado | 2026-04-16 |

### Sprint 4 — pendiente

| Tarea | Artefacto | Prioridad |
|---|---|---|
| Diseñar PROMPT_EVALUATE_ACTIVATION | v1.0 nuevo | 🟡 Baja |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el objetivo de la sesión
2. Leer el artefacto a trabajar desde el proyecto de Claude
3. Verificar si hay nuevas DL entries que afecten a Evaluation

### Al finalizar cada sesión

1. Si se publicó RESOURCE_EVALUATION_FRAMEWORK: crear DL entry notificando a Research, Writing y Editorial Profile
2. Si se modificó un evaluador existente: crear DL entry indicando cambio de versión
3. Listar artefactos creados o modificados con su versión
4. Producir el mensaje de commit para cada artefacto

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

* ✅ Correcto: `PROMPT_EVALUATE_BOOK_STYLE.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
* ❌ Incorrecto: `PROMPT_EVALUATE_BOOK_STYLE_v1_1.md`

La versión se documenta únicamente en:

1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[EVAL] feat: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1`

### Formato de commits a GitHub

```
[EVAL] tipo: descripción corta

Ejemplos:
[EVAL] feat: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
[EVAL] fix: update RESOURCE_EVALUATION_FRAMEWORK inventory v1.1
[EVAL] feat: create PROMPT_EVALUATE_ACTIVATION v1.0
```

### Formato de DL entries

```
DL_YYYYMMDD_EVAL_[NNN].md
```

* `NNN` es numeración **global y secuencial** en todo el sistema
* Antes de crear una entrada, consultar el último número usado en `/_system/decisions/`

### Cuándo crear una DL entry

* Cuando se publica RESOURCE_EVALUATION_FRAMEWORK (afecta a Research, Writing, Editorial Profile)
* Cuando cambia el contrato de evaluación (afecta a todos los workflows)
* Cuando se añade un nuevo evaluador (afecta al subsistema que lo invocará)

---

**FIN DEL DOCUMENTO**
