---
id: S8-06
title: project-setup verifica EDITOR_CONFIG antes de crear un proyecto
type: skill
subsystem: SYSTEM
sprint: 8
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-09
completed: 2026-09-09
branch: feat/s8-06-project-setup-prerequisite-check
---

# S8-06 — `project-setup` verifica `EDITOR_CONFIG` antes de crear un proyecto

## Contexto

Al repasar la experiencia de un editor nuevo, se detectó que `skills/project-setup/SKILL.md` puede crear un proyecto sin que exista nunca `EDITOR_CONFIG` — su propio ticket original (S6-02) ya decía explícitamente "puede asumir que existe... pero no lo crea ni lo valida en profundidad", y en la práctica no hay ningún PASO que lo compruebe. Un editor que dispare `project-setup` directamente (sin pasar por `editor-onboarding`) no recibe ningún aviso.

Se decidió limitar este checkpoint a `project-setup` — no replicarlo en las otras 6 skills de contenido — porque `project-setup` es la primera acción real de un editor nuevo, y el hook de bienvenida de S8-05 ya da contexto de onboarding a cualquier skill desde el inicio de la sesión.

## Interfaces

Añadir un **PASO 0** a `skills/project-setup/SKILL.md`, antes del PASO 1 actual ("Determinar `project_code` y `project_name`"):

```
## PASO 0: Verificar que existe EDITOR_CONFIG

Comprueba si existe _editor/config/EDITOR_CONFIG.md antes de continuar.

Si NO existe: para aquí. No crees el proyecto. Informa al editor de que
primero hace falta configurar su entorno, y ofrece iniciar la skill
editor-onboarding — no la ejecutes tú mismo ni asumas que el editor
quiere hacerlo ya.

Si existe: continúa con el PASO 1.
```

El tono y la estructura del checkpoint deben seguir el mismo patrón ya usado en el resto del sistema (`research/PROMPT_SUMMARIZE_REFERENCES.md` v4.3, `writing/post/PROMPT_POST_BRIEF.md` v1.1 PASO 3B) — parar, informar, ofrecer, no ejecutar por el editor.

## Estructuras de datos

Ninguna nueva. La ruta de `EDITOR_CONFIG.md` (`_editor/config/EDITOR_CONFIG.md`) ya está fijada en la sección "Decisión de diseño: ubicación de EDITOR_CONFIG.md" del propio `skills/editor-onboarding/SKILL.md` — reutilízala tal cual, no la redefinas.

## Decisiones de diseño

- Este checkpoint es una instrucción de prompt, no un hook — no es un riesgo de integridad de datos (no hay nada que se pueda corromper si se salta), es una guía de flujo. Sigue el criterio ya establecido en `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4: los gates de guía/completitud se quedan como instrucción soft.
- No repliques esta comprobación en `research`, `writing-book`, `writing-post`, `evaluation`, `activation` ni `editorial-profile` — está deliberadamente acotada a `project-setup` (ver Contexto).

## Fuera de scope

- El hook `SessionStart` de bienvenida — es S8-05, ticket separado, aunque relacionado.
- Cualquier cambio a `editor-onboarding` — no lo toques.
- Añadir esta misma comprobación a otras skills — explícitamente fuera de scope, ver Decisiones de diseño.

## Casos de test obligatorios

1. Confirmar por lectura que el PASO 0 existe, está antes del PASO 1 original, y sigue el patrón de checkpoint ya establecido (parar / informar / ofrecer, sin ejecutar `editor-onboarding` automáticamente).
2. Verificación manual: simular una invocación de `project-setup` sin `EDITOR_CONFIG.md` presente → confirmar que las instrucciones llevan a parar y ofrecer `editor-onboarding`, no a crear el proyecto.
3. Verificación manual: simular la misma invocación con `EDITOR_CONFIG.md` presente → confirmar que las instrucciones llevan directo al PASO 1 sin fricción añadida.
4. Confirmar que el resto del `SKILL.md` (PASOS 1 a 5 y el checkpoint de cierre ya existente) no se modificó más allá de renumerar si hiciera falta.

## Estado de revisión

Aprobado: 2026-09-09
