---
id:          CONTEXT_EVALUATION
type:        TEMPLATE
subsystem:   EVALUATION
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-11
owner_chat:  evaluation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.4 | 2026-04-11 | JM | Sprint 3: PROMPT_EVALUATE_POST added to active Sprint 3 work. DL entries 015 and 016 added. Inventory and work active updated. PROMPT_EVALUATE_POST criteria and outputs documented. |
| v1.3 | 2026-03-30 | JM | EVALUATE_BOOK_STYLE incorporated as owned artifact (DL_20260330_SYSTEM_004). Updated inventory, interfaces, and execution order. Clarified principle: ownership determined by function, not by inputs. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

inputs: [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls: []

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
* Naming convention: sin versión en nombre de archivo en GitHub
* Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Evaluation es el subsistema único responsable de toda evaluación de calidad en el sistema D-X-OPUS. Puede cambiar el método de evaluación sin que los workflows que lo invocan necesiten modificarse, gracias al contrato de evaluación estable.

### Principio de ownership

El ownership de un evaluador lo determina su **función** (evaluar), no sus **inputs**. Que un evaluador necesite EDITOR_PROFILE, SAH, CVC o PUBLICATION_PROFILE como input no lo convierte en propiedad del subsistema que gestiona esos recursos. Evaluation desarrolla y versiona todos los evaluadores del sistema.

### Límites — qué NO gestiona este subsistema

* No define el EDITOR_PROFILE ni el PUBLICATION_PROFILE — solo los consume como inputs
* No define SAH ni CVC — eso es Knowledge Base
* No decide si el proyecto continúa — eso es el editor, ayudado por `decision_guidance`
* No produce texto ni investigación — solo evalúa artefactos producidos por otros subsistemas

### Interfaces de entrada

| Artefacto | Origen | Usado por |
|---|---|---|
| RESEARCH_REPORT o RESEARCH_DEEP_DIVE | Research | EVALUATE_RESEARCH_REPORT |
| Capítulo o libro completo | Writing | EVALUATE_BOOK_CONTENT |
| EDITOR_PROFILE | Editorial Profile | EVALUATE_BOOK_STYLE, EVALUATE_POST |
| PUBLICATION_PROFILE | Writing (vía WRITING_CONTEXT) | EVALUATE_POST |
| POST_SEED o post borrador | Writing | EVALUATE_POST |
| SAH, CVC | Knowledge Base | EVALUATE_RESEARCH_REPORT |

### Interfaces de salida

Todos los evaluadores producen el mismo formato (contrato de evaluación):

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [instrucción concreta para el editor]
  blocking_issues:   [...] (obligatorio en RED; vacío en GREEN y YELLOW)
  improvement_areas: [...] (obligatorio en YELLOW; vacío en GREEN)
  strengths:         [...] (siempre presente, mínimo 2 items)
```

Los workflows que invocan evaluadores **solo leen `status` y `decision_guidance`**.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_EVALUATION_FRAMEWORK | v1.0 | ACTIVE | Contrato canónico: output, protocolo de invocación, filosofía |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | Evalúa RESEARCH_REPORT y RESEARCH_DEEP_DIVE (RAMA A y RAMA B) |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.1 | ACTIVE | Evalúa rigor de fuentes y claims en el texto del libro |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 | NEEDS UPDATE | Evalúa adherencia al perfil editorial. Requiere adoptar contrato canónico → v1.1 |

### Artefactos Sprint 3 — en desarrollo

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_EVALUATE_POST | v1.0 | PENDING | Evalúa posts con contrato canónico + criterios específicos POST. Ver especificación en Sección 4. |

### Artefactos pendientes Sprint 4+

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_EVALUATE_ACTIVATION | 🟡 Baja | — |

---

## SECCIÓN 4: ESPECIFICACIÓN PROMPT_EVALUATE_POST v1.0

### Inputs requeridos

* Post o borrador a evaluar
* WRITING_CONTEXT activo (incluye PUBLICATION_PROFILE y tipo de texto)
* EDITOR_PROFILE del autor
* INVENTARIO_IDEAS del post (para verificar argumentos esenciales)
* Posts anteriores de la serie (si es serie) — para detectar referencias delegadas

### Output

**EVALUATION_RESULT** canónico con status GREEN/YELLOW/RED.

**Criterios específicos POST** (adicionales al contrato general):

* **Continuidad entre párrafos:** detección del patrón párrafo-tesis sin conexión semántica con el párrafo anterior. El primer término del párrafo debe conectar con el último del párrafo anterior.
* **Desarrollo de argumentos esenciales:** los argumentos marcados como esenciales en el INVENTARIO_IDEAS deben tener desarrollo suficiente para ser comprensibles — independientemente del número de palabras.
* **Coherencia de la promesa narrativa:** la pregunta central, el movimiento narrativo y las respuestas prometidas al lector deben estar presentes y cumplidas.
* **Criterios de medio:** aplicar criterios del PUBLICATION_PROFILE (CTA, longitud, formato de cierre). Si no hay PUBLICATION_PROFILE disponible, declararlo explícitamente y no aplicar criterios de medio.
* **Gestión de referencias en series:** distinguir entre referencia ausente (cita sin ninguna fuente → señal de riesgo real) y referencia delegada a post anterior de la misma serie (práctica editorial válida → no penalizar).

**LEARNING_SIGNALS** — bloque secundario con las tres señales de aprendizaje del EDITOR_PROFILE:
* Material del Q&A marcado como `📘 SEÑAL DE APRENDIZAJE`
* Correcciones manuales del editor si la versión FINAL_EDITED está disponible
* Delta borrador/publicado si el editor proporciona el texto publicado

**POST_BRIEFING** — briefing de continuación:
* Lo fijado (estructura aprobada, referencias verificadas, formulaciones confirmadas)
* Lo abierto (decisiones pendientes del editor)
* Lo en riesgo (referencias sin verificar, ideas sin fuente)
* Si es serie: tabla de referencias ya establecidas en posts anteriores

---

## SECCIÓN 5: TRABAJO ACTIVO — SPRINT 3

### Orden de ejecución

**Tarea 1 — Deuda técnica (prioridad alta):**
`PROMPT_EVALUATE_BOOK_STYLE` v1.0 → v1.1
- Adoptar output canónico del contrato (EVALUATION_RESULT)
- El archivo ya existe en `/evaluation/` — solo actualizar contenido

**Tarea 2 — Nueva (prioridad alta):**
`PROMPT_EVALUATE_POST` v1.0
- Adoptar contrato canónico
- Implementar criterios específicos POST (ver Sección 4)
- Prerequisito: `TEMPLATE_POST_SEED` debe estar disponible antes de especificarlo (writing-dev)

### Tareas del MASTER_PLAN

| Tarea | Descripción | Estado |
|---|---|---|
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | ✅ v1.0 |
| F3-02 | Adoptar contrato en evaluadores existentes | ✅ EVALUATE_RESEARCH_REPORT + EVALUATE_BOOK_CONTENT / 🔄 EVALUATE_BOOK_STYLE v1.1 Sprint 3 |
| F3-03 | Clarificar cobertura RAMA A en EVALUATE_RESEARCH_REPORT | ✅ Incluido en v1.1 |
| S3-15 | Crear PROMPT_EVALUATE_POST v1.0 | 🔄 Sprint 3 |
| S3-18 | Actualizar PROMPT_EVALUATE_BOOK_STYLE v1.1 | 🔄 Sprint 3 |
| F4-08 | Diseñar PROMPT_EVALUATE_ACTIVATION v1.0 | ❌ Pendiente Sprint 4+ |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260222_EVAL_001 | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | ✅ Integrado |
| DL_20260330_SYSTEM_004 | EVALUATE_BOOK_STYLE movido a Evaluation | Actualizar v1.0 → v1.1 adoptando contrato canónico |
| DL_20260411_WRITING_015 | Q&A siempre activo salvo skip explícito | PROMPT_EVALUATE_POST debe registrar en output si el Q&A fue ejecutado o saltado |
| DL_20260411_WRITING_016 | POST_SEED como artefacto canónico | PROMPT_EVALUATE_POST recibe POST_SEED como input de contexto |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el objetivo de la sesión.
2. Si se trabaja en PROMPT_EVALUATE_POST: verificar que TEMPLATE_POST_SEED está disponible (writing-dev).
3. Verificar si hay nuevas DL entries que afecten a Evaluation.

### Al finalizar cada sesión

1. Si se publicó o modificó un evaluador: crear DL entry notificando a los subsistemas que lo invocan.
2. Listar artefactos creados o modificados con su versión.
3. Producir mensaje de commit.

### Regla de naming de archivos

* ✅ Correcto: `PROMPT_EVALUATE_POST.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
* ❌ Incorrecto: `PROMPT_EVALUATE_POST_v1_0.md`

### Formato de commits a GitHub

```
[EVAL] tipo: descripción corta

Ejemplos:
[EVAL] fix: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
[EVAL] feat: create PROMPT_EVALUATE_POST v1.0
```

### Formato de DL entries

```
DL_YYYYMMDD_EVAL_[NNN].md
```

Último número usado en el sistema: **023**. Próxima entrada de evaluation-dev: **024**.

### Cuándo crear una DL entry

* Cuando se publica o modifica un evaluador (afecta al subsistema que lo invoca)
* Cuando cambia el contrato de evaluación (afecta a todos los subsistemas)
* Cuando se añade o elimina un evaluador del inventario

---

**FIN DEL DOCUMENTO**
