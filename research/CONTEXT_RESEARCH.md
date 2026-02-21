---
id:          CONTEXT_RESEARCH
type:        TEMPLATE
subsystem:   RESEARCH
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  research-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2, RESEARCH_COMPONENT_AUDIT_v1.1]
outputs: []
calls:   []

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
- **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables entre proyectos
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
- Naming convention: `PROMPT_[ACCION_OBJETO]_v[X.Y].md` (ver `NAMING_CONVENTION_ANALYSIS_v1.2`)
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Research transforma referencias brutas aportadas por el editor en conocimiento validado y estructurado. Es el primer subsistema en ejecutarse en cualquier proyecto nuevo y su output (RESEARCH_REPORT o RESEARCH_DEEP_DIVE) es el input principal del subsistema Writing.

### Límites — qué NO gestiona este subsistema
- No evalúa si el texto escrito es fiel a la investigación — eso es Evaluation (EVALUATE_BOOK_CONTENT)
- No mantiene SAH ni CVC — los usa pero los actualiza vía UPDATE_VALIDATION_CHECKLIST; el esquema canónico lo define Knowledge Base
- No gestiona el perfil del editor — eso es Editorial Profile
- No decide si el libro se escribe o no — eso es decisión del editor en el checkpoint post-Research

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Referencias brutas | Editor | PDFs, URLs, notas — input inicial del proceso |
| RESOURCE_SOURCE_AUTHORITY (SAH) | Knowledge Base | Jerarquía de autoridad de fuentes por tema |
| RESOURCE_CLAIM_VALIDATION (CVC) | Knowledge Base | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | Knowledge Base | 7 tipos de focus con sus configuraciones [PENDIENTE] |
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
| WORKFLOW_RESEARCH | v3.1 | v3.2 | NEEDS UPDATE | Workflow completo del proceso de investigación |
| PROMPT_SUMMARIZE_REFERENCES | v4.0 | v4.1 | NEEDS UPDATE | Genera REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE |
| PROMPT_RESEARCH_DEEP_DIVE | v1.1 | v1.1 | ACTIVE | Investigación rápida RAMA A |
| PROMPT_CREATE_RESEARCH_PLAN | v2.1.2 | v3.0 | NEEDS REFACTOR | Planificación detallada RAMA B |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | v1.0 | ACTIVE | Ejecución del plan de investigación |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.0 | v1.1 | NEEDS UPDATE | Evaluación del research report |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.0 | v3.1 | NEEDS UPDATE | Actualiza SAH y CVC con cada proyecto |

**Nota sobre UPDATE_VALIDATION_CHECKLIST:** Este prompt pertenece a Research (lo invoca y desarrolla) pero Knowledge Base define el esquema canónico de SAH y CVC. Si cambia el esquema, Knowledge Base notifica a Research.

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por | Chat responsable |
|---|---|---|---|
| GUIDE_ANNOTATION_PHASE3_v1.0 | 🟠 Media | — | research-dev |

**Nota:** RESOURCE_RESEARCH_FOCUS_TYPES lo crea knowledge-base-dev, no research-dev. Research lo consume en CREATE_RESEARCH_PLAN v3.0.

---

## SECCIÓN 4: FLUJO INTERNO

```
FASE 0: Editor recopila referencias
         ↓ [input opcional: BOOK_BRIEF de Activation]
FASE 1: PROMPT_SUMMARIZE_REFERENCES v4.0
         → REFERENCE_SUMMARY
         → RESEARCH_PLAN (orientativo)
         → NARRATIVE_BRIDGE
         ↓
CHECKPOINT 1: Editor revisa y aprueba
         ↓
FASE 2: PROMPT_UPDATE_VALIDATION_CHECKLIST v3.0
         inputs: REFERENCE_SUMMARY + RESEARCH_PLAN + SAH + CVC
         → SAH actualizado
         → CVC actualizado
         → VALIDATION_REPORT
         ↓
CHECKPOINT 2: Editor revisa cambios en SAH y CVC
         ↓
FASE 3: Editor anota manualmente [SIN PROMPT IA]
         → ANNOTATED_REFERENCE_SUMMARY
         → ANNOTATED_RESEARCH_PLAN
         ↓
FASE 4: Decisión editorial
    ┌──────────────────────┬──────────────────────────────┐
    ↓                                                     ↓
 RAMA A                                               RAMA B
 PROMPT_RESEARCH_DEEP_DIVE v1.1          PROMPT_CREATE_RESEARCH_PLAN v3.0
    ↓                                        ↑ lee RESOURCE_RESEARCH_FOCUS_TYPES
 RESEARCH_DEEP_DIVE doc                              ↓
                                    RESEARCH_PLAN_DETAILED + WRITING_INSTRUCTIONS
                                                     ↓
                                       PROMPT_EXECUTE_RESEARCH_PLAN v1.0
                                                     ↓
                                             RESEARCH_REPORT(s)
         ↓                                           ↓
FASE 5: PROMPT_EVALUATE_RESEARCH_REPORT v1.0
         → EVALUATION_RESULT (GREEN / YELLOW / RED)
         ↓
    Writing (WORKFLOW_WRITING)
```

---

## SECCIÓN 5: GAPS ABIERTOS

Auditoría completa: `/_system/audits/RESEARCH_COMPONENT_AUDIT_v1.1.md`

### Gaps críticos (rompen o degradan el flujo)

| GAP ID | Descripción | Artefactos afectados |
|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: el WORKFLOW dice una cosa, el PROMPT produce otra | WORKFLOW_RESEARCH, todos los prompts downstream |
| GAP-R02 | Estructura RESEARCH_PLAN: misma inconsistencia entre WORKFLOW y PROMPT | WORKFLOW_RESEARCH, CREATE_RESEARCH_PLAN |
| GAP-R04 | SUMMARIZE_REFERENCES no menciona SAH ni CVC como inputs | PROMPT_SUMMARIZE_REFERENCES |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referencia "Section 6: Relevant Actors" que no existe | PROMPT_UPDATE_VALIDATION_CHECKLIST |

**Diagnóstico raíz:** El WORKFLOW_RESEARCH v3.1 describe estructuras de output desactualizadas. Los prompts están bien diseñados — el workflow no se actualizó cuando los prompts evolucionaron. La solución es adoptar las estructuras reales de los prompts como canónicas y actualizar el workflow y referencias cruzadas.

### Gaps importantes (generan fricción o riesgo)

| GAP ID | Descripción | Artefactos afectados |
|---|---|---|
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia entre WORKFLOW (4 secciones) y PROMPT (6 secciones) | WORKFLOW_RESEARCH |
| GAP-R06 | Fase 3 (Anotación del editor) sin guía estructurada | Gap de proceso — falta GUIDE_ANNOTATION_PHASE3 |
| GAP-R07 | EVALUATE_RESEARCH_REPORT no cubre explícitamente RESEARCH_DEEP_DIVE (RAMA A) | PROMPT_EVALUATE_RESEARCH_REPORT |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN (17% del prompt = 270 líneas) | PROMPT_CREATE_RESEARCH_PLAN |

### Gaps menores

| GAP ID | Descripción |
|---|---|
| GAP-R08 | "Practical Applications" (sección 5 del REFERENCE_SUMMARY) sin consumidor definido en prompts downstream |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor definido |
| GAP-R10 | Título interno de SUMMARIZE_REFERENCES usa prefijo `SBSTK_` no estándar |

---

## SECCIÓN 6: TRABAJO ACTIVO

### Sprint 1 — Alineación estructural (máxima prioridad)
*Objetivo: resolver los 4 gaps críticos. Máximo impacto con mínimo esfuerzo.*

| Tarea | Descripción | Artefacto resultante | GAP resuelto |
|---|---|---|---|
| F2-01 | Adoptar estructura canónica del PROMPT v4.0 en el WORKFLOW | WORKFLOW_RESEARCH_v3.2 | R01, R02, R03 |
| F2-02 | Corregir referencias de sección en UPDATE_VALIDATION_CHECKLIST | PROMPT_UPDATE_VALIDATION_CHECKLIST_v3.1 | R05 |
| F2-03 | Corregir referencias de sección en CREATE_RESEARCH_PLAN | PROMPT_CREATE_RESEARCH_PLAN_v2.2 | R01, R02 |
| F2-04 | Añadir SAH + CVC como inputs en SUMMARIZE_REFERENCES | PROMPT_SUMMARIZE_REFERENCES_v4.1 | R04 |

**Nota F2-03:** Produce v2.2, no v3.0. Las correcciones de referencias son MINOR. La externalización de focus types (que sí es v3.0) va en Sprint 2, bloqueada por RESOURCE_RESEARCH_FOCUS_TYPES.

### Sprint 2 — Refactors arquitectónicos
*Bloqueado por: RESOURCE_RESEARCH_FOCUS_TYPES (lo crea knowledge-base-dev)*

| Tarea | Descripción | Artefacto resultante | GAP resuelto |
|---|---|---|---|
| F3-01 | Externalizar focus types de CREATE_RESEARCH_PLAN al resource | PROMPT_CREATE_RESEARCH_PLAN_v3.0 | R11 |
| F3-02* | Adoptar contrato de evaluación en EVALUATE_RESEARCH_REPORT | PROMPT_EVALUATE_RESEARCH_REPORT_v1.1 | R07 |

*F3-02 bloqueado también por RESOURCE_EVALUATION_FRAMEWORK (lo crea evaluation-dev).

### Sprint 3 — Proceso del editor

| Tarea | Descripción | Artefacto resultante |
|---|---|---|
| F1-03 | Crear guía de anotación para Fase 3 | GUIDE_ANNOTATION_PHASE3_v1.0 |
| F5-01 | Decidir si mantener secciones 4-6 del NARRATIVE_BRIDGE | PROMPT_SUMMARIZE_REFERENCES (si se reducen) |

### DECISION_LOG entries pendientes de integrar en este chat

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-001 | Focus types extraídos a RESOURCE_RESEARCH_FOCUS_TYPES | Sprint 2: actualizar CREATE_RESEARCH_PLAN a v3.0 |
| DL-20260221-004 | UPDATE_VALIDATION_CHECKLIST pertenece a Research; KB define esquema | Conocer el límite: si KB cambia esquema de SAH/CVC, actualizar el prompt |
| DL-20260221-005 | BOOK_BRIEF de Activation es input opcional en Fase 0 | Sprint 1: añadir al WORKFLOW_RESEARCH v3.2 como input opcional |

---

## SECCIÓN 7: ESTRUCTURAS CANÓNICAS DE REFERENCIA

Una vez resueltos los gaps críticos, todos los prompts downstream deben referenciar estas estructuras.

### REFERENCE_SUMMARY (canónica — basada en PROMPT v4.0)
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

### RESEARCH_PLAN (canónica — basada en PROMPT v4.0)
```
0. METADATA
1. Foundation Assessment (600-800 palabras)
2. Gap Analysis (1,200-1,500 palabras)
3. Field Context (400-600 palabras)
4. Proposed Research Directions / Lines of Investigation (1,200-1,600 palabras)
5. Supplementary Source Recommendations (400-600 palabras)
6. Strategic Recommendations (200-400 palabras)
```

### NARRATIVE_BRIDGE (canónica — a confirmar en Sprint 1)
```
0. METADATA
1. Story Arcs Identified (500-700 palabras) ← consumida por CREATE_RESEARCH_PLAN
2. Editorial Angles (400-600 palabras)
3. Unexpected Connections (300-400 palabras) ← consumida por CREATE_RESEARCH_PLAN
[Decisión pendiente: mantener o eliminar secciones 4-6]
```

---

## SECCIÓN 8: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el sprint y tarea objetivo de la sesión
2. Leer el artefacto a modificar desde el proyecto de Claude (están disponibles como archivos del proyecto)
3. Verificar si hay nuevas DL entries que afecten a Research

### Al finalizar cada sesión
1. Producir DL entries por cada decisión tomada que afecte a otros subsistemas
2. Listar artefactos modificados con su nueva versión
3. Indicar qué tareas del sprint han quedado completadas

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
[RESEARCH] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore

Ejemplos:
[RESEARCH] fix: corrected section references in WORKFLOW_RESEARCH v3.2
[RESEARCH] fix: added SAH+CVC inputs to SUMMARIZE_REFERENCES v4.1
[RESEARCH] refactor: externalized focus types to resource in CREATE_RESEARCH_PLAN v3.0
```

### Cuándo crear una DL entry
- Cuando se decide cuál es la estructura canónica del NARRATIVE_BRIDGE (afecta a Writing)
- Cuando se cambia el formato de EVALUATION_RESULT en EVALUATE_RESEARCH_REPORT (afecta a Evaluation)
- Cuando se añade o elimina cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
