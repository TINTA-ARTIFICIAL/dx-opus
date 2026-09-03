---
id: S6-03
title: Skill editor-onboarding
type: skill
subsystem: SYSTEM
sprint: 6
status: IN_PROGRESS
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: null
branch: feat/s6-03-editor-onboarding-skill
---

# S6-03 — Skill `editor-onboarding`

## Contexto

Reemplaza `tools/TOOL_SETUP_EDITOR_ENVIRONMENT.gs` (Apps Script) para el setup inicial de un editor nuevo en el modelo de plugin. Es un paso único por editor, no por proyecto (eso es `project-setup`, S6-02).

## Interfaces

Crear `skills/editor-onboarding/SKILL.md`.

Frontmatter:
```yaml
---
name: editor-onboarding
description: >
  This skill should be used the first time an editor sets up D-X-OPUS, or
  when they explicitly want to review/update their personal configuration —
  trigger phrases like "configurar mi entorno", "primera vez que uso esto",
  "quiero cambiar mi configuración de editor".
metadata:
  version: "0.1.0"
---
```

El cuerpo del `SKILL.md` debe instruir a Claude a:

1. Detectar si ya existe un `EDITOR_CONFIG` (según `_system/templates/TEMPLATE_EDITOR_CONFIG.md`) — si existe, confirmar con el editor si quiere revisar/actualizar en vez de crear uno nuevo.
2. Si no existe: recoger la información personal mínima del template (`editor_name`, `system_version`, fecha de setup) y generar `EDITOR_CONFIG.md` siguiendo exactamente la estructura de `_system/templates/TEMPLATE_EDITOR_CONFIG.md` — no inventar un formato nuevo.
3. Comprobar si existe ya un `EDITOR_PROFILE` para ese editor. Si no existe, **no lo crea esta skill** — informa al editor de que puede definirlo cuando quiera invocando la skill `editorial-profile` (Sprint 7, todavía no construida en este ticket) y continúa sin bloquear el resto del setup.
4. Dejar claro al editor, al terminar, que el siguiente paso natural es crear su primer proyecto con la skill `project-setup`.

## Estructuras de datos

- `EDITOR_CONFIG.md`: estructura exacta en `_system/templates/TEMPLATE_EDITOR_CONFIG.md` — reutilizar el template, no reescribirlo.
- Ubicación: en el sistema anterior era `D-X-OPUS/_editor/config/EDITOR_CONFIG.md` (ver el propio template, sección "Ubicación"). En el modelo de plugin, decidir la ruta equivalente en el entorno local y documentarla explícitamente en el `SKILL.md` — si no es evidente cuál es la ruta correcta, es una decisión de diseño que hay que declarar en la sección de abajo de este mismo ticket al completarlo, no una que se pueda dejar implícita.

## Decisiones de diseño

- Almacenamiento local (mismo criterio que S6-02) — no Drive.
- Un editor, un `EDITOR_CONFIG` — igual que en el sistema actual (`unique: true` en `AUTO_SAVE_CONFIG.yaml` para este tipo de artefacto, aunque el registro actual solo cubre el `EDITOR_CONFIG` del modelo Apps Script/Drive; si hace falta una entrada equivalente para el modelo de plugin, señalarlo como hallazgo en la entrega, no improvisar una ruta sin dejar constancia).

## Fuera de scope

- Creación real de `EDITOR_PROFILE` (voz, estilo editorial) — es la skill `editorial-profile`, Sprint 7. Esta skill solo detecta si existe y orienta al editor.
- Soporte multi-editor (cambiar entre configuraciones de distintos editores en la misma instalación) — no es parte de este ticket.
- Sincronización con Drive.

## Casos de test obligatorios

1. `skills/editor-onboarding/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Ejecución manual: simular un onboarding desde cero y confirmar que el `EDITOR_CONFIG.md` generado sigue la estructura de `TEMPLATE_EDITOR_CONFIG.md` sin campos inventados fuera del template.
3. Ejecución manual: simular una segunda invocación con `EDITOR_CONFIG` ya existente y confirmar que la skill lo detecta y pregunta antes de sobrescribir (no lo regenera en silencio — mismo principio de checkpoint que `docs/DEV_STANDARDS.md` §6).
4. Confirmar que la skill no intenta generar contenido de `EDITOR_PROFILE` — solo detecta su ausencia y orienta.

## Estado de revisión

Aprobado: 2026-09-03
