---
id: S8-07
title: Añadir sección CHECKPOINT DE ROUTING a WORKFLOW_ACTIVATION.md
type: content
subsystem: SYSTEM
sprint: 8
status: TODO
priority: P2
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S8-07 — Añadir sección `CHECKPOINT DE ROUTING` a `WORKFLOW_ACTIVATION.md`

## Contexto

Hallazgo de la validación end-to-end del plugin (`_system/test-records/TEST_PLUGIN_20260909.md`, TC-6.1, resultado ⚠️ PARCIAL). `skills/activation/SKILL.md` remite correctamente a `activation/WORKFLOW_ACTIVATION.md` como fuente única de verdad del "CHECKPOINT DE ROUTING" (la decisión del editor entre Ruta P / Ruta L / Ruta P+L, tras la Fase 1) — pero ese checkpoint no tiene sección propia en el documento, a diferencia de los otros 11 checkpoints que sí la tienen (`CHECKPOINT 0.1` a `0.5`, `CHECKPOINT FINAL 0`, `CHECKPOINT 2`, `3`, `4`, `N`, `5`). Hoy solo existe como una línea dentro de un diagrama ASCII, y el changelog del propio documento admite "mecanismo de clasificación pendiente Sprint 4" — pendiente que nunca se retomó.

No es un bug de la skill (que hace lo correcto: no inventa lógica de routing propia) — es contenido preexistente de `WORKFLOW_ACTIVATION.md` que quedó menos desarrollado que el resto del documento.

## Interfaces

Añadir a `activation/WORKFLOW_ACTIVATION.md` una sección `## CHECKPOINT DE ROUTING`, ubicada donde el diagrama actual la marca (tras completar la Fase 1, antes de las Fases 2A/2B), con el mismo nivel de detalle que los checkpoints ya existentes del documento — usa `CHECKPOINT 2: SELECCIÓN DE TEMAS` o `CHECKPOINT 4: REVISIÓN DE PLANES` como plantilla de formato/detalle, no los reinventes desde cero.

Debe cubrir como mínimo:

1. Qué se presenta al editor (las seeds narrativas identificadas en Fase 1, clasificadas o sin clasificar).
2. Cómo se le pregunta explícitamente por su elección — Ruta P (contenido inmediato), Ruta L (nuevo libro vía `BOOK_BRIEF`), o P+L (ambas en paralelo) — con un formato de pregunta concreto (a/b/c o equivalente), no una descripción vaga de "el editor elige".
3. Qué pasa con cada clasificación: cómo se generan `SEEDS_RUTA_P.md`/`SEEDS_RUTA_L.md`/ambos según la elección.
4. El mismo criterio de no-inferencia que el resto del sistema: si el editor responde de forma ambigua, no asumir una ruta — volver a preguntar.

## Estructuras de datos

Ninguna nueva. `SEEDS_RUTA_P.md` y `SEEDS_RUTA_L.md` ya están mencionados como outputs en la cabecera `DEPENDENCIES` del documento — no inventes un formato de archivo distinto, solo especifica el proceso que los produce.

## Decisiones de diseño

- Sigue el patrón de checkpoint ya establecido en todo el sistema (parar, presentar, preguntar explícitamente, no interpretar ambigüedad como autorización) — mismo criterio que `docs/DEV_STANDARDS.md` §6.
- No es una skill nueva ni un hook — es contenido de un `WORKFLOW_*.md` ya existente. `skills/activation/SKILL.md` no necesita cambios: ya remite correctamente al documento, solo el documento necesita completarse.

## Fuera de scope

- Modificar `skills/activation/SKILL.md` — ya está correctamente escrito, remite al workflow sin inventar su propia lógica.
- Diseñar el mecanismo de clasificación automática de seeds (si el sistema algún día sugiere una ruta) — este ticket solo formaliza que la decisión la toma el editor, explícitamente, no la automatiza.
- Cualquier otra fase de `WORKFLOW_ACTIVATION.md` marcada `[DISEÑAR]` (Fase 2A `CREATE_CONTENT_STRATEGY`, Fase 3 `DESIGN_POST_PLAN`, Fase 5 `EVALUATE_ACTIVATION_CONTENT`) — fuera de scope, no las diseñes de paso.

## Casos de test obligatorios

1. La sección `## CHECKPOINT DE ROUTING` existe en `activation/WORKFLOW_ACTIVATION.md`, con el mismo nivel de detalle que un checkpoint existente comparable (cita cuál usaste como referencia).
2. Confirmar por lectura que el checkpoint pregunta explícitamente por la ruta (formato de opciones concreto), no delega la decisión al modelo.
3. Confirmar que incluye la regla de no-inferencia ante respuesta ambigua.
4. Verificación manual: trazar el flujo completo de Fase 1 → este checkpoint → Fase 2A/2B para cada una de las 3 elecciones (P, L, P+L) y confirmar que las instrucciones son suficientes para producir `SEEDS_RUTA_P.md`/`SEEDS_RUTA_L.md` según corresponda, sin ambigüedad.
5. Confirmar que no se tocó `skills/activation/SKILL.md` ni ninguna otra fase marcada `[DISEÑAR]`.

## Estado de revisión

Aprobado: 2026-09-09
