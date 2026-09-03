---
id: S7-05
title: Crear PROMPT_EVALUATE_ACTIVATION
type: content
subsystem: SYSTEM
sprint: 7
status: DONE
priority: P1
depends_on: []
blocks: [S7-06]
assignee: D-developer
started: 2026-09-03
completed: 2026-09-03
branch: feat/s7-05-prompt-evaluate-activation
---

# S7-05 — Crear `PROMPT_EVALUATE_ACTIVATION`

## Contexto

Deuda arrastrada desde Sprint 4 (`POST-R1-06` en `_system/MASTER_PLAN.md`). `WORKFLOW_ACTIVATION.md` (línea ~3181) ya documenta este evaluador como "PENDIENTE DISEÑO (bloqueado por RESOURCE_EVALUATION_FRAMEWORK)" — ese bloqueo ya no existe, `RESOURCE_EVALUATION_FRAMEWORK` está en v1.1 desde R1. Este ticket es contenido nuevo de un artefacto DX-OPUS (no una skill) — sigue `_system/RESOURCE_ARTIFACT_HEADER_STANDARD.md`, no el formato de ticket de skill de los demás tickets de Sprint 7.

**Bloquea a S7-06** (skill `evaluation`): esa skill referencia los 5 evaluadores del sistema, incluido este, por su ruta real — necesita que el archivo exista con contenido real antes de poder darse por completa.

## Interfaces

Crear `evaluation/PROMPT_EVALUATE_ACTIVATION.md`.

Cabecera YAML según `_system/RESOURCE_ARTIFACT_HEADER_STANDARD.md`:
```yaml
---
id:          PROMPT_EVALUATE_ACTIVATION
type:        PROMPT
subsystem:   EVALUATION
version:     1.0
status:      ACTIVE
created:     2026-09-03
updated:     2026-09-03
owner_chat:  evaluation-dev
---
```

Contrato de salida — debe implementar el `EVALUATION_RESULT` canónico de `evaluation/RESOURCE_EVALUATION_FRAMEWORK.md` (`status: GREEN|YELLOW|RED`, `score: X/100`, `decision_guidance`, `blocking_issues`, `improvement_areas`, `strengths`), igual que los 4 evaluadores existentes.

**Antes de escribir contenido, lee como modelo estructural los 4 evaluadores ya existentes** (`evaluation/PROMPT_EVALUATE_RESEARCH_REPORT.md`, `PROMPT_EVALUATE_BOOK_CONTENT.md`, `PROMPT_EVALUATE_BOOK_STYLE.md`, `PROMPT_EVALUATE_POST.md`) — mismo patrón de secciones (inputs, criterios de evaluación, contrato de salida, "cuándo NO usar este evaluador" con diferenciación explícita frente a los otros 4), mismo tono.

**Qué evalúa:** el contenido producido por el workflow de Activation — `ACTIVATION_CONTEXT` (`activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md`), `BOOK_BRIEF` (`activation/PROMPT_CREATE_BOOK_BRIEF.md`), y/o el plan de campaña resultante de `activation/WORKFLOW_ACTIVATION.md`. Define los inputs obligatorios/opcionales exactos leyendo esos tres artefactos — no asumas cuáles sin comprobarlo.

## Estructuras de datos

Ninguna nueva más allá del propio prompt. Reutiliza el `EVALUATION_RESULT` de `RESOURCE_EVALUATION_FRAMEWORK.md` tal cual — no definas una variante propia.

## Decisiones de diseño

- Debe implementar exactamente el contrato canónico de `RESOURCE_EVALUATION_FRAMEWORK.md` v1.1 — si algo de ese contrato no encaja con el contenido de Activation, señálalo en tu entrega en vez de improvisar una desviación silenciosa (`docs/DEV_STANDARDS.md` §10).
- Incluye una sección "Diferencia con los otros evaluadores" (mismo patrón que ya usan `PROMPT_EVALUATE_BOOK_CONTENT.md`/`PROMPT_EVALUATE_POST.md`) — dado el hallazgo de nombres confusos en `_system/SPEC_PLUGIN_ARCHITECTURE.md` §5.4 (varios pares `EVALUATE_*` con objetos evaluados parecidos), sé explícito sobre qué NO evalúa este prompt.

## Fuera de scope

- La skill `evaluation` que lo envuelve — S7-06, ticket separado.
- Modificar `RESOURCE_EVALUATION_FRAMEWORK.md` o cualquiera de los 4 evaluadores existentes.
- Modificar `WORKFLOW_ACTIVATION.md` para declarar este evaluador como paso obligatorio — eso, si se decide, es un cambio de workflow con su propia DL, no parte de este ticket de contenido.

## Casos de test obligatorios

1. `evaluation/PROMPT_EVALUATE_ACTIVATION.md` existe, cabecera YAML válida según `RESOURCE_ARTIFACT_HEADER_STANDARD.md`.
2. Confirmar por lectura que el contrato de salida coincide campo a campo con `EVALUATION_RESULT` de `RESOURCE_EVALUATION_FRAMEWORK.md` — sin campos añadidos ni renombrados.
3. Confirmar que la sección "Diferencia con los otros evaluadores" existe y es específica (no genérica) frente a los 4 evaluadores reales.
4. Verificación manual: aplicar el prompt a un `BOOK_BRIEF` de ejemplo (puede ser uno inventado plausible) y confirmar que produce un `EVALUATION_RESULT` completo y coherente con los criterios documentados.

## Estado de revisión

Aprobado: 2026-09-03
