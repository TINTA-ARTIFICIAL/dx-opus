---
id: S8-04
title: Guión de validación end-to-end del plugin
type: content
subsystem: SYSTEM
sprint: 8
status: TODO
priority: P1
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S8-04 — Guión de validación end-to-end del plugin

## Contexto

Sprint 8 exige "validar en paralelo con 1-2 editores reales" (`_system/MASTER_PLAN.md` PARTE 10) — eso es uso humano real, no algo que un `D-developer` pueda ejecutar. Este ticket prepara el guión/checklist que ese uso real va a seguir, y lo ejecuta él mismo una vez de forma simulada para verificar que el guión en sí no tiene huecos, siguiendo el precedente de `_system/test-records/TEST_PACKAGE_SYSTEM_E2E.md` (Sprint 4, mismo propósito para el sistema anterior).

## Interfaces

Crear `_system/test-records/TEST_PLUGIN_E2E.md`.

Debe cubrir, como mínimo, un recorrido completo:

1. `editor-onboarding` — crear `EDITOR_CONFIG` desde cero
2. `project-setup` — crear un proyecto de prueba (libro + serie de posts, para ejercitar ambas ramas)
3. `research` — flujo completo hasta el checkpoint obligatorio (confirmar que para y pregunta, no avanza solo)
4. `knowledge-base` — confirmar que el hook de gobernanza actúa (simular una edición a sección protegida de SAH/CVC)
5. `writing-post` — confirmar que el hook de prerequisito de investigación actúa (intentar el borrador final sin investigación registrada)
6. `shared-writing` — invocada desde `writing-post` para producir el `POST_DRAFT`
7. `evaluation` — invocar sobre el post producido
8. `writing-book` — flujo de índice → muestra → capítulo, con auto-evaluación soft
9. `activation` — análisis de colección → book brief, con evaluación soft de `PROMPT_EVALUATE_ACTIVATION`

Para cada paso: qué debería pasar, qué comprobar, y una casilla de resultado (✅/❌/⚠️) que el editor real vaya marcando.

## Estructuras de datos

Ninguna nueva — el propio documento de test es el artefacto.

## Decisiones de diseño

- El formato de casillas y estructura debe seguir el precedente de `_system/test-records/TEST_PACKAGE_SYSTEM_E2E.md` (mismo directorio, mismo propósito para un sistema anterior) — no inventar un formato nuevo si ya hay uno establecido en el repo.
- Este documento es para que lo ejecute un **humano** (el editor real de Sprint 8), no un agente — escribe las instrucciones para ese lector, no como instrucciones para Claude.
- Incluye explícitamente los 3 hooks del sistema (puntos 4 y 5 de Interfaces, más un tercero para el hook de aprobación de `EXECUTE_RESEARCH_PLAN` dentro del paso 3) como casos a validar — son la parte más nueva y más crítica del sistema, no deben quedar fuera de la validación solo por no ser "funcionalidad visible".

## Fuera de scope

- Ejecutar la validación con un editor real — es trabajo humano, fuera de este ticket y del contrato D-team.
- Construir el mecanismo de empaquetado (S8-02) — este guión asume que existe una forma de instalar el plugin, no la construye.
- Retirar Apps Script (S8-01) — este guión valida el sistema nuevo, no decide cuándo apagar el viejo.

## Casos de test obligatorios

1. `_system/test-records/TEST_PLUGIN_E2E.md` existe y cubre los 9 puntos de la sección Interfaces.
2. Recorre tú mismo el guión paso a paso (simulado, sin un editor real) siguiendo exactamente las instrucciones tal como están escritas — si en algún punto las instrucciones son ambiguas o insuficientes para saber qué hacer, corrígelas antes de entregar.
3. Confirma que los 3 hooks del sistema tienen un caso de validación explícito en el guión, no solo las 9 skills.
4. Confirma que el formato de casillas de resultado sigue el precedente de `TEST_PACKAGE_SYSTEM_E2E.md`.

## Estado de revisión

Aprobado: 2026-09-03
