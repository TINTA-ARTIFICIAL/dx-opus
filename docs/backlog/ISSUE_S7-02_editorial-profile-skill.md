---
id: S7-02
title: Skill editorial-profile
type: skill
subsystem: SYSTEM
sprint: 7
status: TODO
priority: P2
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S7-02 — Skill `editorial-profile`

## Contexto

Migra el subsistema EDITORIAL PROFILE. `skills/editor-onboarding` (S6-03, ya en `main`) detecta si un `EDITOR_PROFILE` existe y, si no, orienta al editor hacia esta skill — esta skill es la que efectivamente lo crea. No hay dependencia de bloqueo entre ambas (esta skill no necesita que `editor-onboarding` se ejecute primero en la misma sesión), pero sí una relación de referencia que debe quedar documentada.

## Interfaces

Crear `skills/editorial-profile/SKILL.md`.

Frontmatter:
```yaml
---
name: editorial-profile
description: >
  This skill should be used when an editor wants to define or update their
  editorial voice and style — trigger phrases like "quiero definir mi perfil
  editorial", "crear mi EDITOR_PROFILE", "actualizar mi estilo editorial".
metadata:
  version: "0.1.0"
---
```

El cuerpo orienta hacia (todos en `editorial-profile/`, léelos por su ruta real, no dupliques):

- `PROMPT_CREATE_EDITOR_PROFILE.md` — el prompt que genera el perfil
- `TEMPLATE_EDITOR_PROFILE.md` — estructura que ese prompt rellena
- `RESOURCE_EDITORIAL_STYLE.md`, `RESOURCE_BOOK_TYPES.md` — recursos que informan el perfil
- `GUIDE_EDITOR_NOTES.md`, `TEMPLATE_EDITOR_NOTES.md` — mecanismo de notas del editor durante producción

## Estructuras de datos

Ninguna nueva. El `EDITOR_PROFILE` resultante sigue la ruta y naming ya registrados en `_system/resources/AUTO_SAVE_CONFIG.yaml` (`EDITOR.EDITOR_PROFILE`, `folder: "_editor/profiles"`) — igual que `editor-onboarding` (S6-03) resolvió `_editor/config` como relativo a la raíz del plugin, aplica el mismo criterio aquí para `_editor/profiles` y documéntalo igual de explícito si no es evidente.

## Decisiones de diseño

- No dupliques contenido de `PROMPT_CREATE_EDITOR_PROFILE.md` ni de `TEMPLATE_EDITOR_PROFILE.md`.
- Aplica el patrón de checkpoint obligatorio (`docs/DEV_STANDARDS.md` §6) al finalizar: no continúes automáticamente hacia `project-setup` ni ningún workflow — presenta el resultado y pregunta cómo continuar, mismo criterio que `editor-onboarding` (S6-03) ya aplicó.

## Fuera de scope

- Modificar el contenido de `PROMPT_CREATE_EDITOR_PROFILE.md` o los recursos que consume.
- Soporte multi-perfil (varios EDITOR_PROFILE por editor) — no está definido en el sistema actual, no lo inventes aquí.
- Cualquier lógica de `editor-onboarding` (S6-03) — ya construida, solo se referencia.

## Casos de test obligatorios

1. `skills/editorial-profile/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que no se duplica contenido de `PROMPT_CREATE_EDITOR_PROFILE.md`/`TEMPLATE_EDITOR_PROFILE.md`.
3. Verificación manual: simular la creación de un EDITOR_PROFILE de prueba siguiendo las instrucciones del `SKILL.md` y confirmar que el resultado respeta la estructura de `TEMPLATE_EDITOR_PROFILE.md` sin campos inventados.
4. Confirmar que la skill incluye el checkpoint de cierre (no avanza sola a otro workflow).

## Estado de revisión

Aprobado: 2026-09-03
