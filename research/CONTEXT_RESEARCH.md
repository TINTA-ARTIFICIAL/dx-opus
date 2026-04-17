| id | CONTEXT_RESEARCH |
| type | TEMPLATE |
| subsystem | RESEARCH |
| version | 1.4 |
| status | ACTIVE |
| created | 2026-02-21 |
| updated | 2026-04-16 |
| owner_chat | research-dev |

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.4 | 2026-04-16 | JM | Sprint cierre R1 completed: YAML headers added to 6 legacy artefacts; PROMPT_RESEARCH_DEEP_DIVE v1.1 and PROMPT_EXECUTE_RESEARCH_PLAN v1.0 uploaded to repo; PROMPT_CREATE_RESEARCH_PLAN v3.0 uploaded; stale ref in WORKFLOW_RESEARCH changelog fixed (v2.1.2 → v2.2); README and CONTEXT updated; DEPENDENCIES version suffixes removed |
| v1.3 | 2026-03-31 | JM | Sprint 2 completed: GUIDE_ANNOTATION_PHASE3 v1.0 added (GAP-R06 resolved); CREATE_RESEARCH_PLAN updated to v3.0 (GAP-R11 resolved); EVALUATE_RESEARCH_REPORT updated to v1.1 (GAP-R07 resolved by evaluation-dev); RESOURCE_RESEARCH_FOCUS_TYPES marked ACTIVE; Sprint 2 tasks marked completed |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

inputs: [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN, RESEARCH_COMPONENT_AUDIT]
outputs: []
calls: []

## DESCRIPTION

Documento de contexto para el chat de desarrollo del subsistema RESEARCH. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: RESEARCH — DEVELOPMENT CHAT

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

* **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables entre proyectos
* **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
* Naming convention: `PROMPT_[ACCION_OBJETO]_v[X.Y].md` (ver `NAMING_CONVENTION_ANALYSIS_v1.2`)
* Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Research transforma referencias brutas aportadas por el editor en conocimiento validado y estructurado. Es el primer subsistema en ejecutarse en cualquier proyecto nuevo y su output (RESEARCH_REPORT o RESEARCH_DEEP_DIVE) es el input principal del subsistema Writing.

### Límites — qué NO gestiona este subsistema

* No evalúa si el texto escrito es fiel a la investigación — eso es Evaluation (EVALUATE_BOOK_CONTENT)
* No mantiene SAH ni CVC — los usa pero los actualiza vía UPDATE_VALIDATION_CHECKLIST; el esquema canónico lo define Knowledge Base
* No gestiona el perfil del editor — eso es Editorial Profile
* No decide si el libro se escribe o no — eso es decisión del editor en el checkpoint post-Research

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Referencias brutas | Editor | PDFs, URLs, notas — input inicial del proceso |
| RESOURCE_SOURCE_AUTHORITY (SAH) | Knowledge Base | Jerarquía de autoridad de fuentes por tema |
| RESOURCE_CLAIM_VALIDATION (CVC) | Knowledge Base | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | Knowledge Base | 7 tipos de focus con sus configuraciones — ACTIVE |
| BOOK_BRIEF | Activation | Input opcional que orienta la investigación |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| RESEARCH_DEEP_DIVE | Writing | Output de RAMA A — investigación rápida |
| RESEARCH_REPORT(s) | Writing | Output de RAMA B — investigación profunda estructurada |
| SAH/CVC actualizados | Knowledge Base | Via UPDATE_VALIDATION_CHECKLIST |

### Prompts compartidos que usa

Research no invoca prompts de `/writing/shared/`. Todos sus prompts son propios.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| WORKFLOW_RESEARCH | v3.2 | v3.2 | ACTIVE | Workflow completo del proceso de investigación |
| PROMPT_SUMMARIZE_REFERENCES | v4.1 | v4.1 | ACTIVE | Genera REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE |
| PROMPT_RESEARCH_DEEP_DIVE | v1.1 | v1.1 | ACTIVE | Investigación rápida RAMA A |
| PROMPT_CREATE_RESEARCH_PLAN | v3.0 | v3.0 | ACTIVE | Planificación detallada RAMA B — focus types externalizados a resource |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | v1.0 | ACTIVE | Ejecución del plan de investigación |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | v1.1 | ACTIVE | Evaluación del research report (RAMA A y RAMA B) |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.1 | v3.1 | ACTIVE | Actualiza SAH y CVC con cada proyecto |
| GUIDE_ANNOTATION_PHASE3 | v1.0 | v1.0 | ACTIVE | Guía editorial para anotación manual en Fase 3 |

**Nota sobre UPDATE_VALIDATION_CHECKLIST:** Este prompt pertenece a Research (lo invoca y desarrolla) pero Knowledge Base define el esquema canónico de SAH y CVC. Si cambia el esquema, Knowledge Base notifica a Research.

**Nota sobre PROMPT_EVALUATE_RESEARCH_REPORT:** Desarrollado y versionado por Evaluation (evaluation-dev). Research lo invoca pero no lo mantiene.

### Artefactos pendientes de crear

Ninguno en el scope actual. Los próximos artefactos dependen de decisiones de Sprint 3.

---

## SECCIÓN 4: FLUJO INTERNO

```
FASE 0: Editor recopila referencias
         ↓ [input opcional: BOOK_BRIEF de Activation]
FASE 1: PROMPT_SUMMARIZE_REFERENCES v4.1
         → REFERENCE_SUMMARY
         → RESEARCH_PLAN (orientativo)
         → NARRATIVE_BRIDGE
         ↓
CHECKPOINT 1: Editor revisa y aprueba
         ↓
FASE 2: PROMPT_UPDATE_VALIDATION_CHECKLIST v3.1
         inputs: REFERENCE_SUMMARY + RESEARCH_PLAN + SAH + CVC
         → SAH actualizado
         → CVC actualizado
         → VALIDATION_REPORT
         ↓
CHECKPOINT 2: Editor revisa cambios en SAH y CVC
         ↓
FASE 3: Editor anota manualmente [SIN PROMPT IA]
         Guía: GUIDE_ANNOTATION_PHASE3 v1.0
         → ANNOTATED_REFERENCE_SUMMARY
         → ANNOTATED_RESEARCH_PLAN
         ↓
FASE 4: Decisión editorial
    ┌──────────────────────┬──────────────────────────────┐
    ↓                                                     ↓
 RAMA A                                               RAMA B
 PROMPT_RESEARCH_DEEP_DIVE v1.1          PROMPT_CREATE_RESEARCH_PLAN v3.0
    ↓                                        ↑ lee RESOURCE_RESEARCH_FOCUS_TYPES v1.1
 RESEARCH_DEEP_DIVE doc                              ↓
                                    RESEARCH_PLAN_DETAILED + WRITING_INSTRUCTIONS
                                                     ↓
                                       PROMPT_EXECUTE_RESEARCH_PLAN v1.0
                                                     ↓
                                             RESEARCH_REPORT(s)
         ↓                                           ↓
FASE 5: PROMPT_EVALUATE_RESEARCH_REPORT v1.1
         → EVALUATION_RESULT (GREEN / YELLOW / RED)
         ↓
    Writing (WORKFLOW_WRITING)
```

---

## SECCIÓN 5: GAPS ABIERTOS

Auditoría completa: `/_system/audits/RESEARCH_COMPONENT_AUDIT_v1.1.md`

### Gaps críticos (rompen o degradan el flujo)

Todos los gaps críticos han sido resueltos en Sprint 1.

| GAP ID | Descripción | Status |
|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: inconsistencia entre WORKFLOW y PROMPT | ✅ RESOLVED — Sprint 1 |
| GAP-R02 | Estructura RESEARCH_PLAN: inconsistencia entre WORKFLOW y PROMPT | ✅ RESOLVED — Sprint 1 |
| GAP-R04 | SUMMARIZE_REFERENCES no mencionaba SAH ni CVC como inputs | ✅ RESOLVED — Sprint 1 |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referenciaba sección inexistente | ✅ RESOLVED — Sprint 1 |

### Gaps importantes (resueltos en Sprint 2)

| GAP ID | Descripción | Status |
|---|---|---|
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia entre WORKFLOW (4 secciones) y PROMPT (6 secciones) | ✅ RESOLVED — Sprint 1 (parcial; secciones 4-6 pendientes de decisión en Sprint 3) |
| GAP-R06 | Fase 3 (Anotación del editor) sin guía estructurada | ✅ RESOLVED — GUIDE_ANNOTATION_PHASE3 v1.0 (Sprint 2) |
| GAP-R07 | EVALUATE_RESEARCH_REPORT no cubría explícitamente RESEARCH_DEEP_DIVE (RAMA A) | ✅ RESOLVED — PROMPT_EVALUATE_RESEARCH_REPORT v1.1 (evaluation-dev, Sprint 2) |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN (17% del prompt) | ✅ RESOLVED — PROMPT_CREATE_RESEARCH_PLAN v3.0 (Sprint 2) |

### Gaps menores (pendientes — backlog Sprint 4)

| GAP ID | Descripción |
|---|---|
| GAP-R08 | "Practical Applications" (sección 5 del REFERENCE_SUMMARY) sin consumidor definido en prompts downstream |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor definido — decisión pendiente Sprint 3 |
| GAP-R10 | Título interno de SUMMARIZE_REFERENCES usa prefijo `SBSTK_` no estándar |

---

## SECCIÓN 6: TRABAJO ACTIVO

### Sprint 1 — Alineación estructural ✅ COMPLETADO

| Tarea | Artefacto resultante | GAP resuelto | Status |
|---|---|---|---|
| F2-01 | WORKFLOW_RESEARCH v3.2 | R01, R02, R03 | ✅ DONE |
| F2-02 | PROMPT_UPDATE_VALIDATION_CHECKLIST v3.1 | R05 | ✅ DONE |
| F2-03 | PROMPT_CREATE_RESEARCH_PLAN v2.2 | R01, R02 | ✅ DONE |
| F2-04 | PROMPT_SUMMARIZE_REFERENCES v4.1 | R04 | ✅ DONE |

### Sprint 2 — Refactors arquitectónicos ✅ COMPLETADO

| Tarea | Descripción | Artefacto resultante | GAP resuelto | Status |
|---|---|---|---|---|
| S2-A | Crear guía de anotación para Fase 3 | GUIDE_ANNOTATION_PHASE3 v1.0 | R06 | ✅ DONE |
| S2-B | Externalizar focus types de CREATE_RESEARCH_PLAN al resource | PROMPT_CREATE_RESEARCH_PLAN v3.0 | R11 | ✅ DONE |
| F3-02 | Adoptar contrato de evaluación en EVALUATE_RESEARCH_REPORT | PROMPT_EVALUATE_RESEARCH_REPORT v1.1 | R07 | ✅ DONE — completado por evaluation-dev |

### Sprint cierre R1 — Cierre de Release 1 ✅ COMPLETADO

| Tarea | Descripción | Artefacto resultante | Status |
|---|---|---|---|
| RE-01 | Subir PROMPT_RESEARCH_DEEP_DIVE v1.1 al repo | PROMPT_RESEARCH_DEEP_DIVE.md | ✅ DONE |
| RE-01 | Subir PROMPT_EXECUTE_RESEARCH_PLAN v1.0 al repo | PROMPT_EXECUTE_RESEARCH_PLAN.md | ✅ DONE |
| RE-02 | Subir PROMPT_CREATE_RESEARCH_PLAN v3.0 con YAML header y DEPENDENCIES | PROMPT_CREATE_RESEARCH_PLAN.md | ✅ DONE |
| RE-03 | Añadir YAML header a WORKFLOW_RESEARCH v3.2 | WORKFLOW_RESEARCH.md | ✅ DONE |
| RE-03 | Añadir YAML header a PROMPT_SUMMARIZE_REFERENCES v4.1 | PROMPT_SUMMARIZE_REFERENCES.md | ✅ DONE |
| RE-03 | Añadir YAML header a PROMPT_UPDATE_VALIDATION_CHECKLIST v3.1 | PROMPT_UPDATE_VALIDATION_CHECKLIST.md | ✅ DONE |
| RE-04 | Corregir stale ref en WORKFLOW_RESEARCH changelog (v2.1.2 → v2.2) | WORKFLOW_RESEARCH.md | ✅ DONE |
| RE-05 | Actualizar README del subsistema al cierre de R1 | README.md | ✅ DONE |
| RE-06 | Actualizar CONTEXT_RESEARCH al cierre de R1 | CONTEXT_RESEARCH.md (este archivo) | ✅ DONE |

### Sprint 3 — Decisiones editoriales pendientes

| Tarea | Descripción | Artefacto resultante | Bloqueado por |
|---|---|---|---|
| F5-01 | Decidir si mantener secciones 4-6 del NARRATIVE_BRIDGE | PROMPT_SUMMARIZE_REFERENCES (si se reducen) | Decisión editorial |

### Backlog Sprint 4

| GAP | Descripción | Tarea pendiente |
|---|---|---|
| GAP-R08 | "Practical Applications" sin consumidor definido | Decidir uso downstream o eliminar sección |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor definido | Decisión editorial — Sprint 3 primero |
| GAP-R10 | Prefijo `SBSTK_` no estándar en SUMMARIZE_REFERENCES | Renombrar título interno del prompt |

### DECISION_LOG entries producidas

| DL-ID | Decisión | Sesión |
|---|---|---|
| DL-20260221-001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES | Sprint 1 |
| DL-20260221-004 | UPDATE_VALIDATION_CHECKLIST pertenece a Research; KB define esquema | Sprint 1 |
| DL-20260221-005 | BOOK_BRIEF de Activation es input opcional en Fase 0 | Sprint 1 |
| DL-20260222-004 | [Ver archivo en /_system/decisions/] | Sprint 1 |
| DL-20260331-015 | GUIDE_ANNOTATION_PHASE3 creada como nuevo artefacto RESEARCH | Sprint 2 |
| DL-20260331-016 | CREATE_RESEARCH_PLAN v3.0 — dependencia dura sobre RESOURCE_RESEARCH_FOCUS_TYPES ≥ v1.1 | Sprint 2 |

---

## SECCIÓN 7: ESTRUCTURAS CANÓNICAS DE REFERENCIA

Una vez resueltos los gaps críticos, todos los prompts downstream deben referenciar estas estructuras.

### REFERENCE_SUMMARY (canónica — basada en PROMPT v4.1)

```
0. METADATA + Reference Table
1. Executive Synthesis (400-600 palabras)
2. Thematic Architecture (1,200-1,800 palabras)
3. Convergence and Divergence Analysis (1,200-1,500 palabras)
4. Historical Perspective (800-1,000 palabras)
5. Practical Applications (800-1,200 palabras)
6. Critical Assessment (600-800 palabras)
7. Key Actors (400-600 palabras)
8. Synthesis and Implications (400-600 palabras)
9. Complete Reference List
```

### RESEARCH_PLAN (canónica — basada en PROMPT v4.1)

```
0. METADATA
1. Foundation Assessment (600-800 palabras)
2. Gap Analysis (1,200-1,500 palabras)
3. Field Context (400-600 palabras)
4. Proposed Research Directions / Lines of Investigation (1,200-1,600 palabras)
5. Supplementary Source Recommendations (400-600 palabras)
6. Strategic Recommendations (200-400 palabras)
```

### NARRATIVE_BRIDGE (canónica — a confirmar en Sprint 3)

```
0. METADATA
1. Story Arcs Identified (500-700 palabras) ← consumida por CREATE_RESEARCH_PLAN
2. Editorial Angles (400-600 palabras)
3. Unexpected Connections (300-400 palabras) ← consumida por CREATE_RESEARCH_PLAN
[Decisión pendiente Sprint 3: mantener o eliminar secciones 4-6]
```

### EVALUATION_RESULT (canónico — definido por Evaluation)

```
status: GREEN | YELLOW | RED
score: X/100
decision_guidance: [texto]
blocking_issues: [solo RED]
improvement_areas: [YELLOW]
strengths: [siempre]
```

---

## SECCIÓN 8: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el sprint y tarea objetivo de la sesión
2. Leer los artefactos de referencia desde GitHub (URLs directas)
3. Verificar si hay nuevas DL entries que afecten a Research

### Al finalizar cada sesión

1. Producir DL entries por cada decisión tomada que afecte a otros subsistemas
2. Listar artefactos modificados con su nueva versión
3. Indicar qué tareas del sprint han quedado completadas

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
[RESEARCH] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore

Ejemplos:
[RESEARCH] feat: create GUIDE_ANNOTATION_PHASE3 (v1.0) — resolves GAP-R06
[RESEARCH] refactor: externalize focus types to resource in CREATE_RESEARCH_PLAN (v3.0) — resolves GAP-R11
[RESEARCH] docs: update CONTEXT_RESEARCH to v1.4 — R1 closure
```

### Formato de DL entries

Cada DL entry es un archivo independiente en GitHub `/_system/decisions/` con este nombre:

```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

* `SUBSYSTEM` para este chat: `RESEARCH`
* `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
* Próximo número disponible: **017**

Ejemplo: `DL_20260331_RESEARCH_016.md`

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry

* Cuando se decide cuál es la estructura canónica del NARRATIVE_BRIDGE (afecta a Writing)
* Cuando se cambia el formato de EVALUATION_RESULT en EVALUATE_RESEARCH_REPORT (afecta a Evaluation)
* Cuando se añade o elimina cualquier artefacto del subsistema
* Cuando un prompt adquiere dependencia dura sobre un resource de otro subsistema

---

**FIN DEL DOCUMENTO**
