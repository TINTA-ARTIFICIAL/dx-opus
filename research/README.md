# Subsistema 2: RESEARCH

Transforma referencias brutas en conocimiento validado y estructurado.

**Chat de desarrollo:** research-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| WORKFLOW_RESEARCH | v3.2 | PENDING | Workflow completo de investigación |
| PROMPT_SUMMARIZE_REFERENCES | v4.1 | PENDING | Genera REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE |
| PROMPT_RESEARCH_DEEP_DIVE | v1.1 | ACTIVE | Investigación rápida RAMA A |
| PROMPT_CREATE_RESEARCH_PLAN | v3.0 | PENDING | Planificación detallada RAMA B |
| PROMPT_EXECUTE_RESEARCH_PLAN | v1.0 | ACTIVE | Ejecución del plan de investigación |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | PENDING | Evaluación del research report |

## Flujo interno
```
Referencias → SUMMARIZE_REFERENCES → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
           → UPDATE_VALIDATION_CHECKLIST (KB) → SAH/CVC actualizados
           → [Editor anota — sin IA]
           → [RAMA A] RESEARCH_DEEP_DIVE
           → [RAMA B] CREATE_RESEARCH_PLAN → EXECUTE_RESEARCH_PLAN → RESEARCH_REPORT(s)
           → EVALUATE_RESEARCH_REPORT (EVAL)
```

## Interfaces

**Recibe de:** Knowledge Base (SAH, CVC, FOCUS_TYPES), Activation (BOOK_BRIEF — opcional)  
**Entrega a:** Writing (RESEARCH_REPORT(s) o RESEARCH_DEEP_DIVE)

## Gaps abiertos

Ver: `/_system/audits/RESEARCH_COMPONENT_AUDIT_v1.1.md`
