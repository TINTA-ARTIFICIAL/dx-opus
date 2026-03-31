---
id:          CONTEXT_RESEARCH
type:        TEMPLATE
subsystem:   RESEARCH
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-31
owner_chat:  research-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-03-31 | JM | Sprint 1 completado: inventario actualizado a versiones reales, gaps críticos marcados como resueltos, Sprint 2 desbloqueado, DL entries obsoletas eliminadas, formato DL corregido, referencias a versiones en nombres de archivo eliminadas |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN, RESEARCH_COMPONENT_AUDIT]
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
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
- Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
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
| RESOURCE_RESEARCH_FOCUS_TYPES | Knowledge Base | 7 tipos de focus con sus configuraciones ✅ disponible v1.1 |
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
| PROMPT_CREATE_RESEARCH_PLAN | v2.2 | v3.0 | NEEDS REFACTOR | Planificación detallada RAMA B — externalizar focus types pendiente Sprint 2 |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | v1.0 | ACTIVE | Ejecución del plan de investigación |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | v1.1 | ACTIVE | Evaluación del research report — cubre RAMA A y RAMA B |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.1 | v3.1 | ACTIVE | Actualiza SAH y CVC con cada proyecto |

**Nota sobre UPDATE_VALIDATION_CHECKLIST:** Este prompt pertenece a Research (lo invoca y desarrolla) pero Knowledge Base define el esquema canónico de SAH y CVC. Si cambia el esquema, Knowledge Base notifica a Research via DL entry.

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por | Chat responsable |
|---|---|---|---|
| GUIDE_ANNOTATION_PHASE3 | 🟠 Media | — | research-dev |

**Nota:** RESOURCE_RESEARCH_FOCUS_TYPES pertenece a knowledge-base-dev y ya está disponible (v1.1). Research lo consume en CREATE_RESEARCH_PLAN v3.0.

---

## SECCIÓN 4: FLUJO INTERNO

```
FASE 0: Editor recopila referencias
         ↓ [input opcional: BOOK_BRIEF de Activation]
FASE 1: PROMPT_SUMMARIZE_REFERENCES v4.1
         inputs: referencias + SAH + CVC
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
         [Ver GUIDE_ANNOTATION_PHASE3 — pendiente Sprint 2]
         → ANNOTATED_REFERENCE_SUMMARY
         → ANNOTATED_RESEARCH_PLAN
         ↓
FASE 4: Decisión editorial
    ┌──────────────────────┬──────────────────────────────┐
    ↓                                                     ↓
 RAMA A                                               RAMA B
 PROMPT_RESEARCH_DEEP_DIVE v1.1          PROMPT_CREATE_RESEARCH_PLAN v2.2 → v3.0
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

## SECCIÓN 5: GAPS — ESTADO ACTUALIZADO

Auditoría completa: `/_system/audits/RESEARCH_COMPONENT_AUDIT.md`

### Gaps resueltos en Sprint 1

| GAP ID | Descripción | Resolución |
|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: inconsistencia WORKFLOW vs PROMPT | ✅ WORKFLOW_RESEARCH v3.2 |
| GAP-R02 | Estructura RESEARCH_PLAN: inconsistencia WORKFLOW vs PROMPT | ✅ WORKFLOW_RESEARCH v3.2 |
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia WORKFLOW (4 secciones) vs PROMPT (6 secciones) | ✅ WORKFLOW_RESEARCH v3.2 |
| GAP-R04 | SUMMARIZE_REFERENCES no mencionaba SAH ni CVC como inputs | ✅ PROMPT_SUMMARIZE_REFERENCES v4.1 |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referenciaba "Section 6: Relevant Actors" inexistente | ✅ PROMPT_UPDATE_VALIDATION_CHECKLIST v3.1 |
| GAP-R07 | EVALUATE_RESEARCH_REPORT no cubría RESEARCH_DEEP_DIVE (RAMA A) | ✅ PROMPT_EVALUATE_RESEARCH_REPORT v1.1 |

### Gaps pendientes — Sprint 2

| GAP ID | Descripción | Tarea | Artefacto resultante |
|---|---|---|---|
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN (17% del prompt = ~270 líneas) | S2-B | PROMPT_CREATE_RESEARCH_PLAN v3.0 |
| GAP-R06 | Fase 3 (Anotación del editor) sin guía estructurada | S2-A | GUIDE_ANNOTATION_PHASE3 v1.0 |

### Gaps menores — Fase 5

| GAP ID | Descripción |
|---|---|
| GAP-R08 | "Practical Applications" (sección 5 del REFERENCE_SUMMARY) sin consumidor definido en prompts downstream |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor definido |
| GAP-R10 | Título interno de SUMMARIZE_REFERENCES usa prefijo `SBSTK_` no estándar |

---

## SECCIÓN 6: TRABAJO ACTIVO

### Sprint 1 — Alineación estructural ✅ COMPLETADO

| Tarea | Artefacto resultante | Estado |
|---|---|---|
| F2-01 | WORKFLOW_RESEARCH v3.2 | ✅ |
| F2-02 | PROMPT_UPDATE_VALIDATION_CHECKLIST v3.1 | ✅ |
| F2-03 | PROMPT_CREATE_RESEARCH_PLAN v2.2 | ✅ |
| F2-04 | PROMPT_SUMMARIZE_REFERENCES v4.1 | ✅ |

### Sprint 2 — Refactors arquitectónicos 🔄 ACTIVO

Bloqueantes resueltos: RESOURCE_RESEARCH_FOCUS_TYPES v1.1 ✅ | RESOURCE_EVALUATION_FRAMEWORK v1.0 ✅

| ID | Tarea | Descripción | Artefacto resultante | GAP resuelto |
|---|---|---|---|---|
| S2-A | F1-03 | Crear guía de anotación para Fase 3 | GUIDE_ANNOTATION_PHASE3 v1.0 | R06 |
| S2-B | F3-01 | Externalizar focus types de CREATE_RESEARCH_PLAN | PROMPT_CREATE_RESEARCH_PLAN v3.0 | R11 |

### Sprint 3 — Proceso del editor ❌ PENDIENTE

| Tarea | Descripción | Artefacto resultante |
|---|---|---|
| F5-01 | Decidir si mantener secciones 4-6 del NARRATIVE_BRIDGE | PROMPT_SUMMARIZE_REFERENCES (si se reducen) |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260222_KB_002 | Creación de RESOURCE_RESEARCH_FOCUS_TYPES v1.1 | Implementar en CREATE_RESEARCH_PLAN v3.0 (S2-B) |
| DL_20260222_KB_003 | CANONICAL UPDATE SCHEMA añadido a SAH y CVC | Verificar que UPDATE_VALIDATION_CHECKLIST v3.1 es compatible con el nuevo esquema |

---

## SECCIÓN 7: ESTRUCTURAS CANÓNICAS DE REFERENCIA

Todos los prompts del subsistema deben referenciar estas estructuras como canónicas.

### REFERENCE_SUMMARY (canónica — PROMPT_SUMMARIZE_REFERENCES v4.1)
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

### RESEARCH_PLAN (canónica — PROMPT_SUMMARIZE_REFERENCES v4.1)
```
0. METADATA
1. Foundation Assessment (600-800 palabras)
2. Gap Analysis (1,200-1,500 palabras)
3. Field Context (400-600 palabras)
4. Proposed Research Directions / Lines of Investigation (1,200-1,600 palabras)
5. Supplementary Source Recommendations (400-600 palabras)
6. Strategic Recommendations (200-400 palabras)
```

### NARRATIVE_BRIDGE (canónica — PROMPT_SUMMARIZE_REFERENCES v4.1)
```
0. METADATA
1. Story Arcs Identified (500-700 palabras)        ← consumida por CREATE_RESEARCH_PLAN
2. Editorial Angles (400-600 palabras)
3. Unexpected Connections (300-400 palabras)        ← consumida por CREATE_RESEARCH_PLAN
4. Audience Engagement Hooks (300-400 palabras)     [consumidor pendiente — GAP-R09, Fase 5]
5. Structural Considerations (200-300 palabras)     [consumidor pendiente — GAP-R09, Fase 5]
6. Risks and Opportunities (200-300 palabras)       [consumidor pendiente — GAP-R09, Fase 5]
```

---

## SECCIÓN 8: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el sprint y tarea objetivo de la sesión
2. Leer el artefacto a modificar desde el proyecto de Claude
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
3. El mensaje de commit: `[RESEARCH] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub
```
[RESEARCH] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore

Ejemplos:
[RESEARCH] feat: create GUIDE_ANNOTATION_PHASE3 v1.0
[RESEARCH] refactor: externalize focus types in CREATE_RESEARCH_PLAN v3.0
```

### Formato de DL entries

Cada DL entry es un archivo independiente en GitHub `/_system/decisions/` con este nombre:
```
DL_YYYYMMDD_RESEARCH_[NNN].md
```

- `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
- Antes de crear una entrada, consulta el último número usado en `/_system/decisions/` para continuar la secuencia

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry
- Cuando se decide cuál es el tratamiento definitivo de las secciones 4-6 del NARRATIVE_BRIDGE (afecta a Writing)
- Cuando se cambia el formato de EVALUATION_RESULT en EVALUATE_RESEARCH_REPORT (afecta a Evaluation)
- Cuando se añade o elimina cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
