# Subsistema 5: EVALUATION

Evalúa la calidad de los artefactos producidos por otros subsistemas.
Puede cambiar el método de evaluación sin modificar los workflows que lo invocan.

**Chat de desarrollo:** evaluation-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_EVALUATION_FRAMEWORK | v1.0 | PENDING | Contrato de evaluación: output canónico + protocolo |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | PENDING | Evalúa reports de investigación |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.1 | PENDING | Evalúa contenido del libro |
| PROMPT_EVALUATE_POST | v1.0 | PENDING | Evalúa posts (pendiente diseño) |
| PROMPT_EVALUATE_ACTIVATION | v1.0 | PENDING | Evalúa campañas de activación (pendiente diseño) |

## Contrato de evaluación

Todo evaluador produce un EVALUATION_RESULT con:
- status: GREEN | YELLOW | RED
- score: X/100
- decision_guidance
- blocking_issues (solo RED)
- improvement_areas (YELLOW)
- strengths (siempre)

## Interfaces

**Invocado por:** Research, Writing, Activation  
**Entrega a:** El subsistema que lo invoca (EVALUATION_RESULT)
