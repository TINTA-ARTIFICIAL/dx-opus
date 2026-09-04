---
id:          CONTEXT_ACTIVATION
type:        TEMPLATE
subsystem:   ACTIVATION
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-19
owner_chat:  activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---|---|---|---|
| v1.4 | 2026-04-19 | JM | Arquitectura dual-output documentada (Ruta P + Ruta L). Inventario actualizado: ANALYZE_COLLECTION v1.5 y IDENTIFY_NARRATIVE_SEEDS v2.0 añadidos. BOOK_BRIEF reposicionado como Ruta L FASE 2B. CHECKPOINT DE ROUTING añadido post-FASE 1. Backlog Sprint 4 actualizado. Numeración DL corregida a por-subsistema. Implementa DL_20260420_ACTIVATION_023–026. |
| v1.3 | 2026-04-16 | JM | R1 closure: WORKFLOW_ACTIVATION actualizado a v1.5, PROMPT_CREATE_BOOK_BRIEF añadido como ACTIVE, WRITING_CONTEXT y POST_SEED documentados en interfaces, nota de scope DL_20260416_SYSTEM_025 añadida, versiones eliminadas de campos DEPENDENCIES |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

inputs: [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls: []

## DESCRIPTION

Documento de contexto para el chat de desarrollo del subsistema ACTIVATION. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: ACTIVATION — DEVELOPMENT CHAT

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

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
* Naming convention: ver `NAMING_CONVENTION_ANALYSIS_v1.2`
* Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Activation genera valor a partir de libros ya escritos mediante **dos rutas paralelas**:

- **Ruta P (POST):** campaña de contenido inmediato — posts, artículos, threads publicables
- **Ruta L (LIBRO):** BOOK_BRIEF que orienta un nuevo ciclo de Research y Writing

Las dos rutas se bifurcan en el **CHECKPOINT DE ROUTING** (post-FASE 1), donde el editor clasifica cada seed identificada como [P] Ruta P, [L] Ruta L, o [P+L] ambas. Pueden ejecutarse en paralelo.

Activation es el último subsistema en ejecutarse en el flujo lineal, pero también el que cierra el loop del sistema al generar inputs para un nuevo ciclo de Research.

### El loop del sistema

```
Research → Writing Book → ACTIVATION
                                ↓
              [CHECKPOINT DE ROUTING]
             ╱                       ╲
         RUTA P                    RUTA L
        (posts)               (BOOK_BRIEF)
                                    ↓
                          Research (nuevo ciclo,
                          orientado por el brief)
```

El BOOK_BRIEF no sustituye al Research — lo orienta. El editor llega a Research ya sabiendo qué tipo de libro quiere escribir, lo que hace la investigación más dirigida.

### Límites — qué NO gestiona este subsistema

* No escribe los posts directamente — invoca WRITE_POST de `/writing/shared/`
* No investiga nuevos temas — produce el BOOK_BRIEF que orienta a Research, pero no hace Research
* No define la voz del autor — recibe EDITOR_PROFILE de Editorial Profile
* No gestiona la publicación en plataformas — produce el contenido listo para publicar

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Libro(s) completo(s) | Writing | Input principal del análisis de colección |
| EDITOR_PROFILE | Editorial Profile | Voz y estilo para el contenido de activación |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| Posts / artículos / threads (Ruta P) | Publicación directa | Contenido de campaña listo para publicar |
| BOOK_BRIEF (Ruta L) | Research | 3-4 propuestas de nuevo libro — input orientador opcional |
| SEEDS_RUTA_P.md | CHECKPOINT DE ROUTING | Seeds clasificadas para contenido inmediato |
| SEEDS_RUTA_L.md | CHECKPOINT DE ROUTING | Seeds clasificadas para propuesta de libro |

### Prompts de `/writing/shared/` que usa

Activation invoca estos prompts pero **no los desarrolla ni los versiona**. Si necesita un cambio en alguno de ellos, lo canaliza a writing-dev.

| Prompt | Owner | Cómo solicitar cambios |
|---|---|---|
| PROMPT_WRITE_POST | writing-dev | Crear DL entry describiendo el cambio necesario y notificar a writing-dev |
| PROMPT_CREATE_TIMELINE | writing-dev | Idem |
| PROMPT_CREATE_CAST | writing-dev | Idem |

### Artefactos que Activation debe preparar para invocar PROMPT_WRITE_POST v2.0

Para invocar correctamente `PROMPT_WRITE_POST v2.0` desde `/writing/shared/`, Activation debe preparar los siguientes artefactos:

| Artefacto | Definido en | Descripción |
|---|---|---|
| POST_SEED | Pendiente diseño (Sprint 4) | Input canónico de PROMPT_WRITE_POST v2.0. Activation lo prepara mediante su propio workflow interno o manualmente. El formato es idéntico al POST_SEED del flujo Writing. |
| WRITING_CONTEXT | `writing/post/RESOURCE_WRITING_CONTEXT.md` | Artefacto de configuración: combina EDITOR_PROFILE + publicación de destino + formato de texto. Activation lo prepara antes de iniciar la producción de posts, en el paso de Q&A de posicionamiento editorial. |

> **Nota de scope (DL_20260416_SYSTEM_025):** En R1, solo `PROMPT_WRITE_POST` es shared con Activation. El flujo completo de `/writing/post/` (Q&A de ideas, planificación, división de posts) **no se comparte** con Activation en esta release. Activation opera con material de un libro ya investigado y escrito — un caso de uso distinto que no requiere el flujo completo en R1. El diseño del flujo de generación de posts propio de Activation queda pendiente para Sprint 4.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Status | Descripción |
|---|---|---|---|
| WORKFLOW_ACTIVATION | v1.6 | ACTIVE | Workflow completo del proceso de activación — arquitectura dual-output (Ruta P + Ruta L) |
| ANALYZE_COLLECTION_FOR_ACTIVATION | v1.5 | ACTIVE | Análisis de colección para generar ACTIVATION_CONTEXT + identificar nichos narrativos |
| IDENTIFY_NARRATIVE_SEEDS | v2.0 | ACTIVE | Análisis profundo del libro para identificar seeds activables — reemplaza ANALYZE_BOOK_FOR_ACTIVATION |
| PROMPT_CREATE_BOOK_BRIEF | v1.0 | ACTIVE | Genera BOOK_BRIEF — Ruta L, FASE 2B, paralela a Ruta P |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK (evaluation-dev) |
| CREATE_CONTENT_STRATEGY v1.0 | 🟠 Media | Sprint 4 |
| DESIGN_POST_PLAN v1.0 | 🟠 Media | Sprint 4 |

---

## SECCIÓN 4: DISEÑO DE PROMPT_CREATE_BOOK_BRIEF

`PROMPT_CREATE_BOOK_BRIEF v1.0` ha sido creado en el cierre de Release 1 y reposicionado como FASE 2B (Ruta L) en la arquitectura dual-output. Ver `activation/PROMPT_CREATE_BOOK_BRIEF.md` para la especificación completa.

Los criterios de diseño originales documentados aquí se mantienen como referencia histórica:

**Input:**

* Colección de libros ya escritos (resúmenes o fichas técnicas)
* EDITOR_PROFILE (voz y áreas de expertise del autor)
* Tendencias del mercado editorial (opcional)
* **SEEDS_RUTA_L.md** (seeds clasificadas [L] o [P+L] del CHECKPOINT DE ROUTING)

**Output — BOOK_BRIEF con 3-4 propuestas, cada una con:**

* Título provisional
* Hipótesis central del libro
* Ángulo editorial diferenciador respecto a la colección existente
* Audiencia objetivo
* Tipo de investigación recomendada (focus type sugerido)
* Por qué este libro ahora (contexto de oportunidad)

**Interfaz con Research:**
El BOOK_BRIEF se entrega al editor, quien decide si lanzar un nuevo proyecto. Si lo lanza, el BOOK_BRIEF se usa como input opcional en la Fase 0 del WORKFLOW_RESEARCH — orienta qué investigar sin sustituir el proceso de investigación.

---

## SECCIÓN 5: TRABAJO ACTIVO

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad | Estado |
|---|---|---|---|
| F4-03 | Diseñar PROMPT_CREATE_BOOK_BRIEF_v1.0 | 🟡 Baja | ✅ Completado (R1 closure) |
| F4-05 | Diseñar PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | ❌ Pendiente — bloqueado por RESOURCE_EVALUATION_FRAMEWORK |

### Historial Release 1 — completado

| ID | Tarea | Resultado |
|---|---|---|
| ACT-R1-01 | Subir PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION v1.5 al repo | ✅ En `activation/` — ref stale corregida |
| ACT-R1-02 | Subir PROMPT_IDENTIFY_NARRATIVE_SEEDS v2.0 al repo | ✅ En `activation/` — reemplaza ANALYZE_BOOK_FOR_ACTIVATION |
| ACT-R1-03 | Diseñar arquitectura dual-output (Ruta P + Ruta L) | ✅ Implementada en WORKFLOW_ACTIVATION v1.6 |
| ACT-R1-04 | Reposicionar PROMPT_CREATE_BOOK_BRIEF como FASE 2B Ruta L | ✅ DL_20260420_ACTIVATION_024 |

### Backlog Sprint 4

| ID | Tarea | Prioridad | Notas |
|---|---|---|---|
| S4-ACT-01 | Diseñar mecanismo de clasificación CHECKPOINT DE ROUTING | 🔴 Alta | Decide semántica exacta [P]/[L]/[P+L]; puede ser prompt o template manual |
| S4-ACT-02 | Diseñar CREATE_CONTENT_STRATEGY v1.0 | 🟠 Media | FASE 2A (Ruta P); input: SEEDS_RUTA_P |
| S4-ACT-03 | Diseñar DESIGN_POST_PLAN v1.0 | 🟠 Media | FASE 3 (Ruta P); añadir soporte de serie de posts |
| S4-ACT-04 | Diseñar generación de POST_SEED propio de Activation | 🟠 Media | Pendiente definición Sprint 4; actualmente manual |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-005 | BOOK_BRIEF orienta Research sin sustituirlo | ✅ Implementado en PROMPT_CREATE_BOOK_BRIEF v1.0 |
| DL-20260221-006 | Prompts shared en /writing/shared/ — Writing es owner | No proponer cambios directos a WRITE_POST, CREATE_TIMELINE, CREATE_CAST — canalizarlos a writing-dev |
| DL-20260221-003 | Contrato de evaluación estándar | Cuando RESOURCE_EVALUATION_FRAMEWORK esté disponible, diseñar EVALUATE_ACTIVATION con ese output |
| DL_20260416_SYSTEM_025 | Flujo POST completo no compartido con Activation en R1 | ✅ Documentado en SECCIÓN 2 y en WORKFLOW_ACTIVATION v1.6 |
| DL_20260420_ACTIVATION_023 | Arquitectura dual-output | ✅ Implementada en WORKFLOW_ACTIVATION v1.6 |
| DL_20260420_ACTIVATION_024 | BOOK_BRIEF reposicionado como FASE 2B Ruta L | ✅ Implementado |
| DL_20260420_ACTIVATION_025 | CHECKPOINT DE ROUTING post-FASE 1 | ✅ Documentado en WORKFLOW; mecanismo pendiente Sprint 4 |
| DL_20260420_ACTIVATION_026 | Subida de prompts FASE 0 y FASE 1 al repo | ✅ Subidos |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el objetivo: ¿producción de campaña con el workflow, crear BOOK_BRIEF, o diseñar EVALUATE_ACTIVATION?
2. Si se trabaja en el workflow: leer `WORKFLOW_ACTIVATION.md` desde el proyecto de Claude
3. Verificar si evaluation-dev ha publicado RESOURCE_EVALUATION_FRAMEWORK (desbloquea EVALUATE_ACTIVATION)
4. Verificar si writing-dev ha modificado algún prompt de /writing/shared/ (via DL entries)

### Al finalizar cada sesión

1. Producir DL entries si se tomaron decisiones que afectan a Research (interfaz BOOK_BRIEF) o Writing (uso de shared prompts)
2. Listar artefactos creados o modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

* ✅ Correcto: `PROMPT_WRITE_CHAPTER.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
* ❌ Incorrecto: `PROMPT_WRITE_CHAPTER_v1_3.md`, `RESOURCE_EVALUATION_FRAMEWORK_v1_0.md`

La versión se documenta únicamente en:

1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[SUBSISTEMA] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub

```
[ACTIVATION] tipo: descripción corta

Ejemplos:
[ACTIVATION] feat: create PROMPT_CREATE_BOOK_BRIEF v1.0
[ACTIVATION] fix: adopt evaluation contract in EVALUATE_ACTIVATION v1.0
[ACTIVATION] docs: update WORKFLOW_ACTIVATION with book brief loop
```

### Formato de DL entries

Cada DL entry es un archivo independiente en GitHub `/_system/decisions/` con este nombre:

```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

* `SUBSYSTEM` para este chat: `ACTIVATION`
* `NNN` es numeración **por subsistema** — se reinicia en 001 por subsistema (ver DL_20260418_SYSTEM_027)
* Antes de crear una entrada, consultar el último número usado en `/_system/decisions/` para continuar la secuencia del subsistema correspondiente

Ejemplo: `DL_20260420_ACTIVATION_023.md`

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry

* Cuando se define el formato del BOOK_BRIEF (afecta a Research — debe saber cómo consumirlo)
* Cuando se identifica una necesidad de cambio en un prompt de /writing/shared/ (notificar a writing-dev)
* Cuando se añade o modifica cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
