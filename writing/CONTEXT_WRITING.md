---
id:          CONTEXT_WRITING
type:        TEMPLATE
subsystem:   WRITING
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-31
owner_chat:  writing-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-03-31 | JM | Cabecera actualizada a v1.3, dependencias sin versión en nombre, formato DL corregido, F3-02 desbloqueado (RESOURCE_EVALUATION_FRAMEWORK ya disponible v1.0), artefactos pendientes sin versión en nombre, DL entries fundacionales actualizadas |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema WRITING. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: WRITING — DEVELOPMENT CHAT

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
Writing produce el texto final — libro o post — a partir de la investigación (Research) y la identidad del autor (Editorial Profile). Es el subsistema con mayor número de prompts y el de mayor complejidad de proceso, especialmente en la RAMA BOOK donde gestiona 10-12 capítulos con coherencia narrativa a lo largo del tiempo.

### Bifurcación Book / Post
El editor decide al entrar al WORKFLOW_WRITING si produce un libro o un post. La decisión ocurre antes de invocar cualquier prompt. A partir de ahí los prompts son completamente distintos (0% compartidos entre ramas).

### Límites — qué NO gestiona este subsistema
- No hace la investigación — recibe RESEARCH_REPORTs o RESEARCH_DEEP_DIVE de Research
- No define la voz del autor — recibe EDITOR_PROFILE de Editorial Profile
- No evalúa calidad objetiva del texto producido — invoca EVALUATE_BOOK_CONTENT de Evaluation
- No evalúa adherencia al perfil editorial — invoca EVALUATE_BOOK_STYLE de Evaluation
- No genera contenido de activación (posts de campaña) — eso es Activation. Aunque Activation usa WRITE_POST, el prompt es de Writing.

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| RESEARCH_REPORT(s) | Research | Input principal RAMA BOOK |
| RESEARCH_DEEP_DIVE | Research | Input alternativo RAMA BOOK (investigación rápida) |
| EDITOR_PROFILE | Editorial Profile | Voz, estilo y restricciones del autor |
| BOOK_BRIEF | Activation (opcional) | Orienta el índice cuando el libro viene propuesto por Activation |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| Libro completo | Activation | Input para campaña de contenido |
| Post publicable | Publicación directa | Output final de RAMA POST |

### Prompts shared — owned by Writing, invocados por Activation
Estos prompts viven en `/writing/shared/` del repositorio. Writing los desarrolla y versiona. Cuando se modifican, se notifica a activation-dev via DL entry.

| Prompt | Invocado también por | Criterio de evolución |
|---|---|---|
| PROMPT_WRITE_POST | Activation | Calidad de escritura: voz, estructura, registro |
| PROMPT_CREATE_TIMELINE | Activation | Síntesis cronológica y criterios literarios |
| PROMPT_CREATE_CAST | Activation | Caracterización y descripción de personajes |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### RAMA BOOK — artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_CREATE_BOOK_INDEX | v1.0 | ACTIVE | Crea el índice estructurado del libro |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | ACTIVE | Escribe el capítulo de muestra para validar voz |
| PROMPT_WRITE_CHAPTER | v1.3 | ACTIVE | Escribe cada capítulo del libro |
| PROMPT_WRITE_INTRODUCTION | v1.0 | ACTIVE | Escribe la introducción |
| PROMPT_WRITE_PROLOGUE | v1.0 | ACTIVE | Escribe el prólogo |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | ACTIVE | Consolida y formatea la bibliografía |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | ACTIVE | Genera la ficha técnica del libro |

### Shared — owned by Writing

| Artefacto | Versión | Status | Invocado por |
|---|---|---|---|
| PROMPT_WRITE_POST | v1.0 | ACTIVE | Writing (Post), Activation |
| PROMPT_CREATE_TIMELINE | v1.0 | ACTIVE | Writing (Book), Activation |
| PROMPT_CREATE_CAST | v1.0 | ACTIVE | Writing (Book), Activation |

### RAMA POST — pendiente de diseño

| Artefacto | Status | Descripción |
|---|---|---|
| PROMPT_PLAN_POST | PENDING | Planifica la estructura del post |
| PROMPT_WRITE_ARTICLE | PENDING | Escribe artículos de formato largo |
| PROMPT_WRITE_THREAD | PENDING | Escribe threads para redes sociales |

### Workflow

| Artefacto | Versión actual | Versión objetivo | Status |
|---|---|---|---|
| WORKFLOW_WRITING | v1.7 (legacy) | v2.0 | NEEDS REFACTOR |

**Nota sobre el workflow actual:** El archivo en GitHub tiene nombre legacy (`WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md`). La versión objetivo (v2.0) añade la bifurcación Book/Post y adopta naming estándar. Pendiente Fase 4.

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_PLAN_POST | 🟠 Media | WORKFLOW_WRITING v2.0 |
| PROMPT_WRITE_ARTICLE | 🟠 Media | WORKFLOW_WRITING v2.0 |
| PROMPT_WRITE_THREAD | 🟠 Media | WORKFLOW_WRITING v2.0 |
| WORKFLOW_WRITING | 🟠 Media (v2.0) | — |

---

## SECCIÓN 4: FLUJO INTERNO

### RAMA BOOK

```
Inputs: RESEARCH_REPORT(s) + EDITOR_PROFILE + [BOOK_BRIEF opcional]
         ↓
CREATE_BOOK_INDEX
         → BOOK_INDEX (estructura completa del libro)
         ↓
WRITE_SAMPLE_CHAPTER
         → SAMPLE_CHAPTER (capítulo de muestra)
         ↓
[Checkpoint: editor aprueba voz y estructura]
[EVALUATE_BOOK_STYLE — invoca Evaluation]
         ↓
WRITE_CHAPTER × N (un prompt por capítulo)
         → CHAPTER_01_FINAL ... CHAPTER_N_FINAL
         ↓
WRITE_INTRODUCTION
WRITE_PROLOGUE
         ↓
CREATE_TIMELINE  [shared]
CREATE_CAST      [shared]
         ↓
CONSOLIDATE_REFERENCES
         → BIBLIOGRAPHY_FINAL
         ↓
[EVALUATE_BOOK_CONTENT — invoca Evaluation]
         ↓
CREATE_BOOK_SHEET
         → BOOK_SHEET (ficha técnica)
         ↓
Output: libro completo → Activation
```

### RAMA POST (pendiente de diseño)

```
Inputs: RESEARCH_DEEP_DIVE + EDITOR_PROFILE
         ↓
PLAN_POST → POST_PLAN
         ↓
WRITE_POST [shared] → POST_FINAL
         ↓
[EVALUATE_POST — invoca Evaluation]
         ↓
Output: post publicable
```

---

## SECCIÓN 5: TRABAJO ACTIVO

### Tarea principal: WORKFLOW_WRITING v2.0

El workflow actual solo cubre la RAMA BOOK. La versión 2.0 debe:

1. Añadir la bifurcación editorial al inicio (decisión Book vs Post)
2. Documentar la RAMA BOOK existente con la nomenclatura actualizada
3. Añadir la RAMA POST (pendiente de diseño de los prompts)
4. Adoptar naming estándar (sin sufijo legacy ni versión en el nombre)
5. Añadir cabecera YAML estándar

**Orden recomendado:** Diseñar primero el WORKFLOW_WRITING v2.0 con la bifurcación, luego diseñar los prompts de RAMA POST basándose en la estructura del workflow.

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad | Estado |
|---|---|---|---|
| F4-01 | Diseñar WORKFLOW_WRITING v2.0 con bifurcación | 🟠 Media | ❌ Pendiente Fase 4 |
| F4-02 | Diseñar prompts Rama Post | 🟠 Media | ❌ Pendiente — bloqueado por F4-01 |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260221_SYSTEM_002 | Writing unificado con bifurcación Book/Post | Diseñar WORKFLOW_WRITING v2.0 (Fase 4) |
| DL_20260221_SYSTEM_006 | Prompts compartidos en /writing/shared/ | Los 3 shared prompts ya están — mantener al desarrollarlos |
| DL_20260221_SYSTEM_003 | Contrato de evaluación estándar | RESOURCE_EVALUATION_FRAMEWORK v1.0 ya disponible — verificar que los workflows invocan evaluadores con la firma correcta al desarrollar v2.0 |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el objetivo: ¿WORKFLOW v2.0, diseño RAMA POST, o mejora de un prompt existente?
2. Si se trabaja en prompts de RAMA BOOK: leer el artefacto actual desde el proyecto de Claude
3. Verificar si hay nuevas DL entries que afecten a Writing

### Al finalizar cada sesión
1. Si se modificaron prompts shared: crear DL entry notificando a activation-dev
2. Listar artefactos creados o modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_WRITE_CHAPTER.md`, `WORKFLOW_WRITING.md`
- ❌ Incorrecto: `PROMPT_WRITE_CHAPTER_v1_3.md`, `WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md`

La versión se documenta únicamente en:
1. La cabecera YAML: `version: 1.3`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[WRITING] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub
```
[WRITING] tipo: descripción corta

Ejemplos:
[WRITING] feat: add POST branch to WORKFLOW_WRITING v2.0
[WRITING] feat: create PROMPT_PLAN_POST v1.0
[WRITING] fix: update evaluation invocation in WORKFLOW_WRITING
```

### Formato de DL entries

```
DL_YYYYMMDD_WRITING_[NNN].md
```

- `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
- Antes de crear una entrada, consulta el último número usado en `/_system/decisions/` para continuar la secuencia

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry
- Cuando se modifica cualquier prompt de `/writing/shared/` (notificar a activation-dev)
- Cuando cambia el formato de output de cualquier prompt (puede afectar a Activation o Docs)
- Cuando se añaden o eliminan prompts de RAMA POST (afecta a WORKFLOW_WRITING)

---

**FIN DEL DOCUMENTO**
