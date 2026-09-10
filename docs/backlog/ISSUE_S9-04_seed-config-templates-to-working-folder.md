---
id: S9-04
title: Copiar AUTO_SAVE_CONFIG.yaml y templates a la carpeta de trabajo en el primer arranque
type: feature
subsystem: SYSTEM
sprint: 9
status: TODO
priority: P0
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S9-04 — Copiar `AUTO_SAVE_CONFIG.yaml` y templates a la carpeta de trabajo en el primer arranque

## Contexto

Ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.d, opción 2 (confirmada por el editor). `_system/resources/AUTO_SAVE_CONFIG.yaml` y `_system/templates/*` son datos de referencia puros (no lógica, no lo bastante "capacidad" para justificar convertirlos en skill como S9-02) usados por prácticamente todas las skills. No encajan en el patrón de delegación de S9-02/S9-03.

La carpeta de trabajo del editor (`_editor/`, `projects/`) está confirmada fiable en cloud (acceso vía el puente de la app de escritorio a carpetas conectadas — ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §2.a), a diferencia del contenido propio del plugin. Copiar estos archivos ahí en el primer arranque los saca de la dependencia de `${CLAUDE_PLUGIN_ROOT}` para siempre, a costa de una única copia inicial (no duplicación continua — no hay una segunda fuente de verdad que mantener sincronizada a mano, es una copia de arranque).

## Interfaces

`editor-onboarding`/`setup` (según renombre de S9-08) es el lugar natural: ya es la skill que crea `_editor/config/EDITOR_CONFIG.md` en el primer uso. Extender su PASO de cierre para que, si no existe ya, copie:
- `${CLAUDE_PLUGIN_ROOT}/_system/resources/AUTO_SAVE_CONFIG.yaml` → `_system/resources/AUTO_SAVE_CONFIG.yaml` (relativo a la carpeta de trabajo)
- `${CLAUDE_PLUGIN_ROOT}/_system/templates/*` → `_system/templates/*` (relativo a la carpeta de trabajo)

Todas las skills que hoy leen `${CLAUDE_PLUGIN_ROOT}/_system/resources/AUTO_SAVE_CONFIG.yaml` o `${CLAUDE_PLUGIN_ROOT}/_system/templates/...` pasan a leer la ruta relativa a la carpeta de trabajo (`_system/resources/AUTO_SAVE_CONFIG.yaml`, sin prefijo — mismo patrón ya usado para `_editor/config/EDITOR_CONFIG.md`, `projects/...`).

## Estructuras de datos

Ninguna nueva. Mismo contenido, nueva ubicación.

## Decisiones de diseño

- Es una copia de arranque, no una sincronización continua — si `AUTO_SAVE_CONFIG.yaml` cambia de versión en el plugin, hace falta un mecanismo de "detectar versión desactualizada y ofrecer actualizar" (no diseñado aquí — anotar como deuda si no se resuelve en este ticket).
- Si la copia falla (permisos, carpeta no accesible), seguir el mismo `ERROR_HANDLING` que el resto del sistema — nunca fallback silencioso, informar y dar contenido/ruta exacta al editor.
- Cada skill sigue tratando `AUTO_SAVE_CONFIG.yaml` como fuente única de verdad — solo cambia su ubicación física, no su rol.

## Fuera de scope

- Mecanismo de detección/actualización de versión desactualizada de la copia local — deuda a registrar si no se cubre aquí.
- El resto del contenido de `_system/` (`SPEC_*.md`, `SCHEMA_*.md`, etc.) — no se copia, sigue siendo dev-only, no instalable.

## Casos de test obligatorios

1. Primer arranque sin `_system/resources/`/`_system/templates/` en la carpeta de trabajo: `setup` los crea con el contenido correcto.
2. Segundo arranque con esos archivos ya presentes: no los sobrescribe en silencio (mismo criterio que `EDITOR_CONFIG.md`).
3. Todas las skills que antes leían `${CLAUDE_PLUGIN_ROOT}/_system/resources/AUTO_SAVE_CONFIG.yaml` ahora leen la ruta de la carpeta de trabajo — verificado por grep, cero referencias `${CLAUDE_PLUGIN_ROOT}/_system/` restantes salvo `_system/PROMPT_PROJECT_DISCOVERY.md` (fuera de scope de este ticket).
4. Prueba real en sesión cloud: `project-setup`/`new-project` crea correctamente subcarpetas usando la copia local del YAML, sin depender de `${CLAUDE_PLUGIN_ROOT}`.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
