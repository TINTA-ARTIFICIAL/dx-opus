# Subsistema 5: EVALUATION

Evalúa la calidad de los artefactos producidos por otros subsistemas.
Puede cambiar el método de evaluación sin modificar los workflows que lo invocan.

**Chat de desarrollo:** evaluation-dev

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_EVALUATION_FRAMEWORK | v1.0 | ACTIVE | Contrato de evaluación: output canónico + protocolo |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | Evalúa reports de investigación (RAMA A y RAMA B) |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.1 | ACTIVE | Evalúa rigor de fuentes y claims en el texto del libro |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 | NEEDS UPDATE | Evalúa adherencia al perfil editorial del autor — pendiente adoptar contrato canónico (Sprint 2, tarea S2-C) |

## Artefactos pendientes de crear

| Artefacto | Prioridad | Descripción |
|---|---|---|
| PROMPT_EVALUATE_POST | 🟡 Baja | Evalúa posts (pendiente diseño RAMA POST en Writing) |
| PROMPT_EVALUATE_ACTIVATION | 🟡 Baja | Evalúa campañas de activación (pendiente Fase 4) |

## Contrato de evaluación

Todo evaluador produce un EVALUATION_RESULT con:
- `status`: GREEN | YELLOW | RED
- `score`: X/100
- `decision_guidance`
- `blocking_issues` (solo RED)
- `improvement_areas` (YELLOW)
- `strengths` (siempre)

## Nota sobre inputs externos

Algunos evaluadores necesitan inputs de otros subsistemas para funcionar:
- EVALUATE_BOOK_STYLE y EVALUATE_POST requieren EDITOR_PROFILE (de Editorial Profile)
- EVALUATE_RESEARCH_REPORT requiere SAH y CVC (de Knowledge Base)

Esto no afecta al ownership: Evaluation desarrolla y versiona todos los evaluadores,
independientemente de qué inputs necesite cada uno. El ownership lo determina la función
(evaluar), no los inputs. Ver DL_20260330_SYSTEM_004.

## Interfaces

**Invocado por:** Research, Writing, Activation
**Entrega a:** El subsistema que lo invoca (EVALUATION_RESULT)
