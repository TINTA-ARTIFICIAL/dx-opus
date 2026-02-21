---
id:          CONTEXT_EVALUATION
type:        TEMPLATE
subsystem:   EVALUATION
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  evaluation-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2]
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
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS_v1.2`
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Evaluation puede cambiar el método de evaluación — el scoring, las dimensiones, los umbrales — sin que los workflows que lo invocan necesiten modificarse. Esto es posible gracias al **contrato de evaluación**: una interfaz estable entre evaluadores y workflows que define el formato de output pero no la lógica interna. El valor del subsistema está en esta separación: los workflows solo leen `status` y `decision_guidance`; la lógica de cómo se llega a ese status es responsabilidad exclusiva de Evaluation.

### Límites — qué NO gestiona este subsistema
- No evalúa adherencia a la voz del autor — eso es EVALUATE_BOOK_STYLE de Editorial Profile
- No decide si el proyecto continúa o se detiene — eso es el editor, ayudado por `decision_guidance`
- No produce texto ni investigación — solo evalúa artefactos producidos por otros subsistemas
- No mantiene histórico de evaluaciones — cada evaluación es independiente

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| RESEARCH_REPORT o RESEARCH_DEEP_DIVE | Research | Input de EVALUATE_RESEARCH_REPORT |
| Capítulo o libro completo | Writing | Input de EVALUATE_BOOK_CONTENT |
| Post o artículo | Writing | Input de EVALUATE_POST [pendiente] |
| Campaña de contenido | Activation | Input de EVALUATE_ACTIVATION [pendiente] |

### Interfaces de salida

Todos los evaluadores producen el mismo formato de output (contrato de evaluación):

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [qué debe hacer el editor]
  blocking_issues:   [...] (solo en RED)
  improvement_areas: [...] (en YELLOW)
  strengths:         [...] (siempre)
```

Los workflows que invocan evaluadores **solo leen `status` y `decision_guidance`**. Si se cambia el método de scoring interno pero se mantiene este output, los workflows no necesitan tocarse.

### Nota sobre EVALUATE_BOOK_STYLE
Este evaluador pertenece a **Editorial Profile**, no a Evaluation. Evalúa adherencia al perfil del autor (¿suena como él?), no calidad objetiva. Requiere conocer el EDITOR_PROFILE activo para funcionar. Cuando evaluation-dev actualiza el contrato de evaluación, debe notificar a editorial-profile-dev para que EVALUATE_BOOK_STYLE adopte el mismo formato de output.

### Prompts compartidos que usa
Evaluation no invoca prompts de otros subsistemas.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.0 | v1.1 | NEEDS UPDATE | Evalúa RESEARCH_REPORTs y RESEARCH_DEEP_DIVE (RAMA A y B) |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.0 | v1.1 | NEEDS UPDATE | Evalúa rigor de fuentes y claims en el texto del libro |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| RESOURCE_EVALUATION_FRAMEWORK_v1.0 | 🔴 Alta | — (este chat lo crea primero) |
| PROMPT_EVALUATE_POST_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK + diseño RAMA POST (writing-dev) |
| PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK |

---

## SECCIÓN 4: TAREA FUNDACIONAL — RESOURCE_EVALUATION_FRAMEWORK v1.0

**Esta es la primera tarea de este chat y desbloquea trabajo en Research, Writing y Editorial Profile.**

El RESOURCE_EVALUATION_FRAMEWORK define el contrato de evaluación. Debe especificar:

### 4.1 Output canónico de cualquier evaluador

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [instrucción concreta para el editor]
  blocking_issues:   [...] (obligatorio en RED, vacío en GREEN/YELLOW)
  improvement_areas: [...] (obligatorio en YELLOW, vacío en GREEN)
  strengths:         [...] (siempre presente)
```

**Semántica del status:**
- `GREEN`: el artefacto cumple los estándares de calidad. El editor puede continuar.
- `YELLOW`: el artefacto tiene áreas de mejora pero no bloquea el avance. El editor decide si iterar o continuar.
- `RED`: el artefacto tiene problemas que bloquean el avance. Debe corregirse antes de continuar.

### 4.2 Protocolo de invocación estándar

Cómo los workflows invocan a los evaluadores. Firma estándar:
```
EVALUATE([artefacto_a_evaluar], [contexto_mínimo]) → EVALUATION_RESULT
```

El `contexto_mínimo` varía por evaluador (EVALUATE_RESEARCH_REPORT necesita el RESEARCH_PLAN; EVALUATE_BOOK_CONTENT necesita el BOOK_INDEX) pero el output siempre es el mismo formato.

### 4.3 Filosofía de evaluación del sistema

Criterios generales que todos los evaluadores deben aplicar:
- Basado en evidencia: los claims deben tener fuente
- Coherencia: el artefacto debe ser coherente internamente y con sus inputs
- Utilidad: el artefacto debe ser suficientemente bueno para su propósito
- Iterabilidad: el feedback debe ser accionable

---

## SECCIÓN 5: TRABAJO ACTIVO

### Orden de ejecución recomendado

**Paso 1** — Crear RESOURCE_EVALUATION_FRAMEWORK_v1.0 (desbloquea todo lo demás)

**Paso 2** — Actualizar EVALUATE_RESEARCH_REPORT a v1.1:
- Adoptar output canónico del contrato
- Clarificar que cubre tanto RAMA A (RESEARCH_DEEP_DIVE) como RAMA B (RESEARCH_REPORT) — actualmente solo cubre RAMA B explícitamente (GAP-R07)

**Paso 3** — Actualizar EVALUATE_BOOK_CONTENT a v1.1:
- Adoptar output canónico del contrato

**Paso 4** — Notificar a editorial-profile-dev para que EVALUATE_BOOK_STYLE adopte el mismo contrato.

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad |
|---|---|---|
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK_v1.0 | 🔴 Alta |
| F3-02 | Adoptar contrato en evaluadores existentes (×2) | 🟠 Media |
| F3-03 | Clarificar EVALUATE_RESEARCH_REPORT para RAMA A | 🟠 Media |
| F4-04 | Diseñar PROMPT_EVALUATE_POST_v1.0 | 🟡 Baja |
| F4-05 | Diseñar PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-003 | Evaluation independiente con contrato estable | Crear RESOURCE_EVALUATION_FRAMEWORK — es la implementación de esta decisión |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el objetivo: ¿crear el framework, actualizar un evaluador, o diseñar uno nuevo?
2. Si se trabaja en evaluadores existentes: leer el artefacto actual desde el proyecto de Claude
3. Verificar si hay nuevas DL entries que afecten a Evaluation

### Al finalizar cada sesión
1. Si se publicó RESOURCE_EVALUATION_FRAMEWORK: crear DL entry notificando a Research, Writing y Editorial Profile
2. Si se modificó un evaluador existente: crear DL entry indicando cambio de versión
3. Listar artefactos creados o modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_WRITE_CHAPTER.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
- ❌ Incorrecto: `PROMPT_WRITE_CHAPTER_v1_3.md`, `RESOURCE_EVALUATION_FRAMEWORK_v1_0.md`

La versión se documenta únicamente en:
1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[SUBSISTEMA] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub
```
[EVAL] tipo: descripción corta

Ejemplos:
[EVAL] feat: create RESOURCE_EVALUATION_FRAMEWORK v1.0
[EVAL] fix: adopt evaluation contract in EVALUATE_RESEARCH_REPORT v1.1
[EVAL] feat: create PROMPT_EVALUATE_POST v1.0
```

### Cuándo crear una DL entry
- Cuando se publica RESOURCE_EVALUATION_FRAMEWORK (afecta a Research, Writing, Editorial Profile)
- Cuando cambia el contrato de evaluación en una versión futura (afecta a todos los workflows)
- Cuando se añade un nuevo evaluador (afecta al subsistema que lo invocará)

---

**FIN DEL DOCUMENTO**
