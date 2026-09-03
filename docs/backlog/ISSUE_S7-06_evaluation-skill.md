---
id: S7-06
title: Skill evaluation
type: skill
subsystem: SYSTEM
sprint: 7
status: IN_PROGRESS
priority: P1
depends_on: [S7-05]
blocks: []
assignee: D-developer
started: 2026-09-03
completed: null
branch: feat/s7-06-evaluation-skill
---

# S7-06 — Skill `evaluation`

## Contexto

Migra el subsistema EVALUATION completo, incluyendo el evaluador nuevo de Activation. **Depende de S7-05** — no puede considerarse completo (caso de test 3) hasta que `evaluation/PROMPT_EVALUATE_ACTIVATION.md` exista con contenido real, no un placeholder.

## Interfaces

Crear `skills/evaluation/SKILL.md`.

Frontmatter:
```yaml
---
name: evaluation
description: >
  This skill should be used when the user wants quality feedback on
  research, a book, a post, or activation content — trigger phrases like
  "evalúa este capítulo", "revisa el estilo de este post", "¿esta
  investigación es sólida?", "dame feedback de calidad".
metadata:
  version: "0.1.0"
---
```

El cuerpo debe:

1. Orientar hacia los 5 evaluadores reales (léelos por su ruta real, no dupliques): `evaluation/PROMPT_EVALUATE_RESEARCH_REPORT.md`, `PROMPT_EVALUATE_BOOK_CONTENT.md`, `PROMPT_EVALUATE_BOOK_STYLE.md`, `PROMPT_EVALUATE_POST.md`, `PROMPT_EVALUATE_ACTIVATION.md` (S7-05).
2. Ayudar a elegir el evaluador correcto según qué se quiere evaluar — usa las secciones "cuándo NO usar este evaluador" / "diferencia con..." que cada prompt ya documenta, no inventes un criterio de selección nuevo.
3. Referenciar `evaluation/RESOURCE_EVALUATION_FRAMEWORK.md` como el contrato canónico (`EVALUATION_RESULT`) que los 5 implementan.

## Estructuras de datos

Ninguna nueva. `EVALUATION_RESULT` ya está definido en `RESOURCE_EVALUATION_FRAMEWORK.md`.

## Decisiones de diseño

- Un resultado `RED` de cualquier evaluador **no bloquea** que el editor continúe — es confianza editorial por diseño (`RESOURCE_EVALUATION_FRAMEWORK.md`, ya citado en `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4). Esta skill no debe implementar ningún gate que impida continuar tras un RED.
- No dupliques contenido de ninguno de los 5 evaluadores ni del framework.

## Fuera de scope

- Modificar el contenido de cualquiera de los 5 evaluadores o del framework.
- Construir `PROMPT_EVALUATE_ACTIVATION.md` — es S7-05, prerequisito de este ticket, no parte de él.
- Cualquier hook — los gates de evaluación se quedan como instrucción soft, no hay hook que construir aquí (ver Decisiones de diseño).

## Casos de test obligatorios

1. `skills/evaluation/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que no se duplica contenido de ningún evaluador ni del framework.
3. Confirmar explícitamente que `evaluation/PROMPT_EVALUATE_ACTIVATION.md` existe y tiene contenido real (no placeholder) antes de dar este ticket por completo — si S7-05 no está mergeado en la base sobre la que trabajas, para y repórtalo, no generes tú mismo el contenido de ese prompt.
4. Verificación manual: para cada uno de los 5 tipos de contenido (research report, libro-contenido, libro-estilo, post, activación), confirmar que el `SKILL.md` dirige sin ambigüedad al evaluador correcto.

## Estado de revisión

Aprobado: 2026-09-03
