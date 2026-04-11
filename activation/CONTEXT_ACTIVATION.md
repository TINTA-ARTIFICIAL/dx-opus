---
id:          CONTEXT_ACTIVATION
type:        TEMPLATE
subsystem:   ACTIVATION
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-11
owner_chat:  activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-04-11 | JM | Sprint 3: DL_20260411_ACTIVATION_022 added. WORKFLOW_ACTIVATION status updated to v1.5 pending. POST_SEED and WRITING_CONTEXT documented as interfaces. Q&A de posicionamiento documented in Fase 4 flow. |
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

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
* Naming convention: sin versión en nombre de archivo en GitHub
* Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Activation genera valor a partir de libros ya escritos: campañas de contenido para publicación inmediata, y propuestas de nuevos libros (BOOK_BRIEF) que relanzan el ciclo completo del sistema.

### El loop del sistema

```
Research → Writing Book → ACTIVATION → BOOK_BRIEF
                                            ↓
                              Research (nuevo ciclo, orientado por el brief)
```

### Integración con la RAMA POST de Writing — Sprint 3

**Cambio importante (DL_20260411_ACTIVATION_022):** El flujo de producción de posts en Activation (Fase 4) incorpora un paso de Q&A de posicionamiento del editor antes de la escritura. Esto garantiza que los posts de activación contienen tanto el contenido del libro como la voz posicionada del editor.

El flujo actualizado en Fase 4 es:

```
POST_PLAN (de Fase 3)
      ↓
WRITING_CONTEXT (cargar o crear — define editor, publicación, formato)
      ↓
PROMPT_QA_IDEAS [shared con RAMA POST — owner: writing-dev]
      ↓ (genera voz posicionada del editor sobre el contenido)
POST_SEED (artefacto canónico = contenido del libro + voz del editor)
      ↓
PROMPT_WRITE_POST [shared — owner: writing-dev]
      ↓
PROMPT_EVALUATE_POST [owner: evaluation-dev]
```

El editor puede declarar skip del Q&A. En ese caso el sistema emite un aviso y continúa.

**WRITING_CONTEXT** — la nueva interfaz de configuración. Define qué editor escribe, en qué publicación y en qué formato. Activation debe cargarlo si existe o crearlo al inicio de Fase 4. Vive en `/writing/post/RESOURCE_WRITING_CONTEXT.md` (owner: writing-dev).

**POST_SEED** — el artefacto canónico que unifica la interfaz de PROMPT_WRITE_POST. Activation no lo crea directamente — emerge del proceso WRITING_CONTEXT + Q&A + POST_PLAN. PROMPT_WRITE_POST siempre recibe un POST_SEED, sea cual sea el camino.

### Límites — qué NO gestiona este subsistema

* No escribe los posts directamente — invoca PROMPT_WRITE_POST de `/writing/shared/`
* No investiga nuevos temas — produce el BOOK_BRIEF que orienta a Research
* No define la voz del autor — recibe EDITOR_PROFILE de Editorial Profile
* No gestiona el WRITING_CONTEXT ni el POST_SEED — son artefactos de Writing
* No gestiona la publicación en plataformas

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Libro(s) completo(s) | Writing | Input principal del análisis de colección |
| EDITOR_PROFILE | Editorial Profile | Voz y estilo para el contenido de activación |
| WRITING_CONTEXT | Writing (si existe) | Configuración editor + publicación + formato para posts |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| Posts / artículos | Publicación directa | Contenido de campaña listo para publicar |
| BOOK_BRIEF | Research | 3-4 propuestas de nuevo libro — input orientador opcional |

### Prompts de `/writing/shared/` que usa

Activation invoca estos prompts pero no los desarrolla ni los versiona. Si necesita un cambio, lo canaliza a writing-dev via DL entry.

| Prompt | Owner | Cómo solicitar cambios |
|---|---|---|
| PROMPT_WRITE_POST | writing-dev | Crear DL entry describiendo el cambio necesario |
| PROMPT_QA_IDEAS | writing-dev | Crear DL entry describiendo el cambio necesario |
| PROMPT_CREATE_TIMELINE | writing-dev | Idem |
| PROMPT_CREATE_CAST | writing-dev | Idem |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| WORKFLOW_ACTIVATION | v1.4 | v1.5 | NEEDS UPDATE — Sprint 3 | Workflow completo del proceso de activación |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_CREATE_BOOK_BRIEF v1.0 | 🟡 Baja — Sprint 4 | — |
| PROMPT_EVALUATE_ACTIVATION v1.0 | 🟡 Baja — Sprint 4+ | RESOURCE_EVALUATION_FRAMEWORK (evaluation-dev) |

---

## SECCIÓN 4: TRABAJO ACTIVO — SPRINT 3

### Única tarea del sprint

**WORKFLOW_ACTIVATION v1.4 → v1.5**

Incorporar en Fase 4 (Producción de Contenido):

1. Paso de carga/creación del WRITING_CONTEXT al inicio de Fase 4.
2. Paso de Q&A de posicionamiento (PROMPT_QA_IDEAS) antes de PROMPT_WRITE_POST.
3. Documentar que el editor puede declarar skip del Q&A con aviso.
4. Actualizar la referencia de PROMPT_WRITE_POST para indicar que recibe POST_SEED (no POST_PLAN directamente).
5. Actualizar naming del archivo: de `WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md` a `WORKFLOW_ACTIVATION.md`.
6. Añadir cabecera YAML estándar.

### Tareas del MASTER_PLAN

| Tarea | Descripción | Estado |
|---|---|---|
| S3-17 | WORKFLOW_ACTIVATION v1.4 → v1.5 | 🔄 Sprint 3 |
| F4-07 | PROMPT_CREATE_BOOK_BRIEF v1.0 | ❌ Pendiente Sprint 4 |
| F4-08 | PROMPT_EVALUATE_ACTIVATION v1.0 | ❌ Pendiente Sprint 4+ |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260221_SYSTEM_005 | BOOK_BRIEF orienta Research sin sustituirlo | Implementar en PROMPT_CREATE_BOOK_BRIEF: output orientador, no plan de investigación completo |
| DL_20260221_SYSTEM_006 | Prompts shared en /writing/shared/ — Writing es owner | No proponer cambios directos a shared prompts — canalizarlos a writing-dev |
| DL_20260411_ACTIVATION_022 | WORKFLOW_ACTIVATION v1.5 incorpora Q&A de posicionamiento | Actualizar WORKFLOW_ACTIVATION añadiendo WRITING_CONTEXT + Q&A en Fase 4 |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el objetivo de la sesión.
2. Si se trabaja en el workflow: leer `WORKFLOW_ACTIVATION.md` desde el repositorio.
3. Verificar si hay nuevas DL entries de writing-dev que afecten a Activation (cambios en shared prompts).
4. Antes de crear cualquier DL entry, consultar último número usado en `/_system/decisions/README.md`.

### Al finalizar cada sesión

1. Producir DL entries si se tomaron decisiones que afectan a Research (interfaz BOOK_BRIEF) o Writing (uso de shared prompts).
2. Listar artefactos creados o modificados con su versión.
3. Producir mensaje de commit.

### Regla de naming de archivos

* ✅ Correcto: `WORKFLOW_ACTIVATION.md`, `PROMPT_CREATE_BOOK_BRIEF.md`
* ❌ Incorrecto: `WORKFLOW_ACTIVATION_v1_5.md`

### Formato de commits a GitHub

```
[ACTIVATION] tipo: descripción corta

Ejemplos:
[ACTIVATION] feat: update WORKFLOW_ACTIVATION v1.4 → v1.5
[ACTIVATION] feat: create PROMPT_CREATE_BOOK_BRIEF v1.0
```

### Formato de DL entries

```
DL_YYYYMMDD_ACTIVATION_[NNN].md
```

Último número usado en el sistema: **023**. Próxima entrada de activation-dev: **024**.

### Cuándo crear una DL entry

* Cuando se define el formato del BOOK_BRIEF (afecta a Research)
* Cuando se identifica una necesidad de cambio en un prompt de /writing/shared/ (notificar a writing-dev)
* Cuando se añade o modifica cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
