# Subsistema 2: RESEARCH

Transforma referencias brutas en conocimiento validado y estructurado.

**Chat de desarrollo:** research-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_RESEARCH | v3.2 | ACTIVE | Workflow completo de investigación |
| PROMPT_SUMMARIZE_REFERENCES | v4.1 | ACTIVE | Genera REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE |
| PROMPT_RESEARCH_DEEP_DIVE | v1.1 | ACTIVE | Investigación rápida RAMA A |
| PROMPT_CREATE_RESEARCH_PLAN | v2.2 | ACTIVE | Planificación detallada RAMA B |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | ACTIVE | Ejecución del plan de investigación |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.1 | ACTIVE | Actualiza SAH y CVC con cada proyecto |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | Evaluación del research report (owner: EVALUATION) |

## Artefactos pendientes

| Artefacto | Versión objetivo | Descripción |
|---|---|---|
| GUIDE_ANNOTATION_PHASE3 | v1.0 | Guía para la fase de anotación manual del editor (GAP-R06) |
| PROMPT_CREATE_RESEARCH_PLAN | v3.0 | Externalizar focus types a RESOURCE_RESEARCH_FOCUS_TYPES (GAP-R11) |

## Flujo interno

```
Referencias → SUMMARIZE_REFERENCES → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
           → UPDATE_VALIDATION_CHECKLIST (KB) → SAH/CVC actualizados
           → [Editor anota — sin IA] ← GUIDE_ANNOTATION_PHASE3
           → [RAMA A] RESEARCH_DEEP_DIVE
           → [RAMA B] CREATE_RESEARCH_PLAN → EXECUTE_RESEARCH_PLAN → RESEARCH_REPORT(s)
           → EVALUATE_RESEARCH_REPORT (EVAL)
```

## Interfaces

**Recibe de:** Knowledge Base (SAH, CVC, FOCUS_TYPES), Activation (BOOK_BRIEF — opcional)
**Entrega a:** Writing (RESEARCH_REPORT(s) o RESEARCH_DEEP_DIVE)

## Gaps abiertos

| GAP | Descripción | Estado |
|---|---|---|
| GAP-R06 | Fase 3 sin guía estructurada | ⏳ Pendiente GUIDE_ANNOTATION_PHASE3 |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN | ⏳ Pendiente v3.0 |
| GAP-R08 | "Practical Applications" sin consumidor | 🟡 Menor — decisión editorial pendiente |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor | 🟡 Menor — decisión editorial pendiente |

Gaps R01–R05, R07, R10 resueltos. Ver `/_system/audits/RESEARCH_COMPONENT_AUDIT.md`
