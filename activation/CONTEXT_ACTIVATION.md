---
id: CONTEXT_ACTIVATION
type: TEMPLATE
subsystem: ACTIVATION
version: 1.3
status: ACTIVE
created: 2026-02-21
updated: 2026-04-16
owner_chat: activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---|---|---|---|
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

Activation genera valor a partir de libros ya escritos: campañas de contenido para publicación inmediata, y propuestas de nuevos libros (BOOK_BRIEF) que relanzan el ciclo completo del sistema. Es el último subsistema en ejecutarse en el flujo lineal, pero también el que cierra el loop del sistema al generar inputs para un nuevo ciclo de Research.

### El loop del sistema

```
Research → Writing Book → ACTIVATION → BOOK_BRIEF
                                            ↓
                              Research (nuevo ciclo, orientado por el brief)
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
| Posts / artículos / threads | Publicación directa | Contenido de campaña listo para publicar |
| BOOK_BRIEF | Research | 3-4 propuestas de nuevo libro — input orientador opcional |

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
| WORKFLOW_ACTIVATION | v1.5 | ACTIVE | Workflow completo del proceso de activación |
| PROMPT_CREATE_BOOK_BRIEF | v1.0 | ACTIVE | Genera BOOK_BRIEF a partir de colección de libros para iniciar nuevo ciclo de Research |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK (evaluation-dev) |

---

## SECCIÓN 4: DISEÑO DE PROMPT_CREATE_BOOK_BRIEF

`PROMPT_CREATE_BOOK_BRIEF v1.0` ha sido creado en el cierre de Release 1. Ver `activation/PROMPT_CREATE_BOOK_BRIEF.md` para la especificación completa.

Los criterios de diseño originales documentados aquí se mantienen como referencia histórica:

**Input:**

* Colección de libros ya escritos (resúmenes o fichas técnicas)
* EDITOR_PROFILE (voz y áreas de expertise del autor)
* Tendencias del mercado editorial (opcional)

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

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-005 | BOOK_BRIEF orienta Research sin sustituirlo | ✅ Implementado en PROMPT_CREATE_BOOK_BRIEF v1.0: el output es orientador, no un plan de investigación completo |
| DL-20260221-006 | Prompts shared en /writing/shared/ — Writing es owner | No proponer cambios directos a WRITE_POST, CREATE_TIMELINE, CREATE_CAST — canalizarlos a writing-dev |
| DL-20260221-003 | Contrato de evaluación estándar | Cuando RESOURCE_EVALUATION_FRAMEWORK esté disponible, diseñar EVALUATE_ACTIVATION con ese output |
| DL_20260416_SYSTEM_025 | Flujo POST completo no compartido con Activation en R1 | ✅ Documentado en SECCIÓN 2 y en WORKFLOW_ACTIVATION v1.5. POST_SEED y WRITING_CONTEXT añadidos como artefactos que Activation debe preparar. |

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
* `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
* Antes de crear una entrada, consulta el último número usado en `/_system/decisions/` para continuar la secuencia

Ejemplo: `DL_20260222_RESEARCH_014.md`

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry

* Cuando se define el formato del BOOK_BRIEF (afecta a Research — debe saber cómo consumirlo)
* Cuando se identifica una necesidad de cambio en un prompt de /writing/shared/ (notificar a writing-dev)
* Cuando se añade o modifica cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
