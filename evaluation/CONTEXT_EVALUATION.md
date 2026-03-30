---
id:          CONTEXT_EVALUATION
type:        TEMPLATE
subsystem:   EVALUATION
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-30
owner_chat:  evaluation-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-03-30 | JM | EVALUATE_BOOK_STYLE incorporated as owned artifact (DL_20260330_SYSTEM_004). Updated inventory, interfaces, and execution order. Clarified principle: ownership determined by function, not by inputs. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls:   []

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
- **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
- Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Evaluation es el subsistema único responsable de toda evaluación de calidad en el sistema D-X-OPUS. Puede cambiar el método de evaluación — scoring, dimensiones, umbrales — sin que los workflows que lo invocan necesiten modificarse. Esto es posible gracias al contrato de evaluación: una interfaz estable que define el formato de output pero no la lógica interna.

### Principio de ownership
El ownership de un evaluador lo determina su **función** (evaluar), no sus **inputs**. Que un evaluador necesite EDITOR_PROFILE, SAH o CVC como input no lo convierte en propiedad del subsistema que gestiona esos recursos. Evaluation desarrolla y versiona todos los evaluadores del sistema.

### Límites — qué NO gestiona este subsistema
- No define el EDITOR_PROFILE — eso es Editorial Profile. Solo lo consume como input.
- No define SAH ni CVC — eso es Knowledge Base. Solo los consume como inputs.
- No decide si el proyecto continúa o se detiene — eso es el editor, ayudado por `decision_guidance`
- No produce texto ni investigación — solo evalúa artefactos producidos por otros subsistemas

### Interfaces de entrada

| Artefacto | Origen | Usado por |
|---|---|---|
| RESEARCH_REPORT o RESEARCH_DEEP_DIVE | Research | EVALUATE_RESEARCH_REPORT |
| Capítulo o libro completo | Writing | EVALUATE_BOOK_CONTENT |
| EDITOR_PROFILE | Editorial Profile | EVALUATE_BOOK_STYLE, EVALUATE_POST |
| Post o artículo | Writing | EVALUATE_POST (pendiente) |
| Campaña de contenido | Activation | EVALUATE_ACTIVATION (pendiente) |
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
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 | NEEDS UPDATE | Evalúa adherencia al perfil editorial del autor. Requiere adoptar contrato canónico → v1.1 |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_EVALUATE_POST | 🟡 Baja | Diseño RAMA POST (writing-dev) |
| PROMPT_EVALUATE_ACTIVATION | 🟡 Baja | — |

### Nota sobre EVALUATE_BOOK_STYLE
Incorporado a este subsistema el 30/03/2026 (DL_20260330_SYSTEM_004). El prompt venía de Editorial Profile — el archivo existe pero necesita:
1. Moverse físicamente de `/editorial-profile/` a `/evaluation/` en el repositorio
2. Actualizarse a v1.1 adoptando el contrato canónico del RESOURCE_EVALUATION_FRAMEWORK

---

## SECCIÓN 4: TRABAJO ACTIVO

### Orden de ejecución recomendado

**Paso 1 — Ya completado:** RESOURCE_EVALUATION_FRAMEWORK v1.0 ✅

**Paso 2 — Ya completado:** EVALUATE_RESEARCH_REPORT v1.1 ✅

**Paso 3 — Ya completado:** EVALUATE_BOOK_CONTENT v1.1 ✅

**Paso 4 — Pendiente Sprint 2:** EVALUATE_BOOK_STYLE v1.0 → v1.1
- Mover archivo de `/editorial-profile/` a `/evaluation/`
- Adoptar output canónico del contrato (EVALUATION_RESULT)
- El prompt evalúa si el texto es fiel a la voz del autor según EDITOR_PROFILE
- Input requerido: texto a evaluar + EDITOR_PROFILE activo

**Paso 5 — Pendiente Fase 4:** EVALUATE_POST v1.0 (cuando esté diseñada RAMA POST)

**Paso 6 — Pendiente Fase 4:** EVALUATE_ACTIVATION v1.0

### Tareas del MASTER_PLAN

| Tarea | Descripción | Estado |
|---|---|---|
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | ✅ v1.0 |
| F3-02 | Adoptar contrato en evaluadores existentes | ✅ EVALUATE_RESEARCH_REPORT + EVALUATE_BOOK_CONTENT / ❌ EVALUATE_BOOK_STYLE v1.1 pendiente |
| F3-03 | Clarificar cobertura RAMA A en EVALUATE_RESEARCH_REPORT | ✅ Incluido en v1.1 |
| F4-04 | Diseñar EVALUATE_POST | ❌ Pendiente Fase 4 |
| F4-05 | Diseñar EVALUATE_ACTIVATION | ❌ Pendiente Fase 4 |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260222_EVAL_001 | Publicación RESOURCE_EVALUATION_FRAMEWORK v1.0 | Notificar a Editorial Profile para EVALUATE_BOOK_STYLE — en curso |
| DL_20260330_SYSTEM_004 | EVALUATE_BOOK_STYLE movido a Evaluation | Actualizar v1.0 → v1.1 adoptando contrato canónico |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el objetivo
2. Leer los artefactos relevantes desde el proyecto de Claude
3. Verificar si hay nuevas DL entries que afecten a Evaluation

### Al finalizar cada sesión
1. Si se publicó o modificó un evaluador: crear DL entry notificando a los subsistemas que lo invocan
2. Listar artefactos creados o modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_EVALUATE_BOOK_STYLE.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
- ❌ Incorrecto: `PROMPT_EVALUATE_BOOK_STYLE_v1_1.md`

### Formato de commits a GitHub
```
[EVAL] tipo: descripción corta

Ejemplos:
[EVAL] feat: move and update EVALUATE_BOOK_STYLE v1.1 (from editorial-profile)
[EVAL] feat: create PROMPT_EVALUATE_POST v1.0
[EVAL] fix: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
```

### Formato de DL entries

```
DL_YYYYMMDD_EVAL_[NNN].md
```

### Cuándo crear una DL entry
- Cuando se publica o modifica un evaluador (afecta al subsistema que lo invoca)
- Cuando cambia el contrato de evaluación (afecta a todos los subsistemas)
- Cuando se añade o elimina un evaluador del inventario

---

**FIN DEL DOCUMENTO**
