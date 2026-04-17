# Subsistema 2: RESEARCH

Transforma referencias brutas en conocimiento validado y estructurado. Es el primer subsistema en ejecutarse en cualquier proyecto nuevo. Sus outputs (RESEARCH_REPORT o RESEARCH_DEEP_DIVE) son el input principal del subsistema Writing.

**Chat de desarrollo:** research-dev

---

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_RESEARCH | v3.2 | ACTIVE | Workflow completo del proceso de investigación |
| PROMPT_SUMMARIZE_REFERENCES | v4.1 | ACTIVE | Genera REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE |
| PROMPT_RESEARCH_DEEP_DIVE | v1.1 | ACTIVE | Investigación profunda orientada a post (RAMA A) |
| PROMPT_CREATE_RESEARCH_PLAN | v3.0 | ACTIVE | Planificación detallada RAMA B — focus types externalizados a RESOURCE_RESEARCH_FOCUS_TYPES |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | ACTIVE | Ejecución del plan de investigación (RAMA B) |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.1 | ACTIVE | Actualiza SAH y CVC con cada proyecto |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | Evaluación del research report — RAMA A y RAMA B (owner: EVALUATION) |
| GUIDE_ANNOTATION_PHASE3 | v1.0 | ACTIVE | Guía editorial para la anotación manual del editor en Fase 3 |

---

## Flujo interno

```
RAMA COMÚN
Referencias brutas
  → SUMMARIZE_REFERENCES     → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
  → UPDATE_VALIDATION_CHECKLIST (KB) → SAH/CVC actualizados
  → [Editor anota — sin IA, guía: GUIDE_ANNOTATION_PHASE3]

        ┌─────────────────────────────────────────────┐
        ↓ RAMA A                       RAMA B ↓       │
RESEARCH_DEEP_DIVE           CREATE_RESEARCH_PLAN     │
        ↓                      ↑ lee RESOURCE_RESEARCH_FOCUS_TYPES
RESEARCH_DEEP_DIVE doc      RESEARCH_PLAN_DETAILED + WRITING_INSTRUCTIONS
                              → EXECUTE_RESEARCH_PLAN
                              → RESEARCH_REPORT(s)
        └─────────────────────────────────────────────┘
                        ↓
           EVALUATE_RESEARCH_REPORT (EVAL)
                        ↓
               Writing (WORKFLOW_WRITING)
```

---

## Dependencias externas

**Recibe de:**

| Artefacto | Origen | Uso |
|---|---|---|
| RESOURCE_SOURCE_AUTHORITY (SAH) | Knowledge Base | Evaluación y clasificación de fuentes (Tier 1–3) |
| RESOURCE_CLAIM_VALIDATION (CVC) | Knowledge Base | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | Knowledge Base | 7 tipos de focus — consumido por CREATE_RESEARCH_PLAN v3.0+ |
| BOOK_BRIEF | Activation | Input opcional que orienta la investigación en Fase 0 |

**Entrega a:**

| Artefacto | Destino |
|---|---|
| RESEARCH_DEEP_DIVE | Writing |
| RESEARCH_REPORT(s) | Writing |
| SAH / CVC actualizados | Knowledge Base (vía UPDATE_VALIDATION_CHECKLIST) |

**Nota:** PROMPT_EVALUATE_RESEARCH_REPORT es desarrollado y versionado por Evaluation (evaluation-dev). Research lo invoca pero no lo mantiene.

---

## Artefactos pendientes

Ninguno en el scope de Release 1. Los próximos artefactos dependen de decisiones de Sprint 3.

---

## Deuda técnica activa — backlog Sprint 4

| GAP | Descripción | Estado |
|---|---|---|
| GAP-R08 | "Practical Applications" (sección 5 REFERENCE_SUMMARY) sin consumidor definido en prompts downstream | 🟡 Menor — decisión editorial pendiente |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4–6 sin consumidor definido | 🟡 Menor — decisión editorial pendiente (Sprint 3) |
| GAP-R10 | Título interno de SUMMARIZE_REFERENCES usa prefijo `SBSTK_` no estándar | 🟡 Menor |

Gaps R01–R07, R11 resueltos. Ver `/_system/audits/RESEARCH_COMPONENT_AUDIT.md`
