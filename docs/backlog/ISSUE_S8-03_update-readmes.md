---
id: S8-03
title: Actualizar READMEs para reflejar el plugin como único camino
type: content
subsystem: SYSTEM
sprint: 8
status: TODO
priority: P2
depends_on: [S8-01, S8-02]
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S8-03 — Actualizar READMEs para reflejar el plugin como único camino

## Contexto

Último paso del corte a plugin. Depende de S8-01 (Apps Script ya retirado) y S8-02 (mecanismo de empaquetado ya existente) para poder documentar el estado final real, no uno intermedio.

## Interfaces

Actualizar (todos ya existen, no crear ninguno nuevo):

- `README.md` (raíz) — sección de instalación/setup: reemplazar cualquier referencia a Apps Script/Drive por el flujo de plugin (instalar `.plugin` generado por S8-02).
- `tools/README.md` — documentar `tools/create-plugin-package.sh` (S8-02); eliminar referencias a los 3 archivos retirados en S8-01.
- `_system/README.md` — si referencia el flujo de setup antiguo, actualizar.
- READMEs de subsistema (`research/README.md`, `writing/README.md`, etc.) — solo si mencionan explícitamente Apps Script/Drive/PROMPTS_PACKAGE; la mayoría probablemente no necesita cambios, no toques los que ya están correctos.

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- No reescribas READMEs que no mencionan el flujo de instalación antiguo — cambios mínimos, no una reescritura general.
- Si algún README referencia un archivo que S8-01 retiró, corrige la referencia; no la borres sin más si el contexto sigue siendo útil (redirige a lo que lo sustituye).

## Fuera de scope

- Cualquier cambio de contenido no relacionado con la migración a plugin.
- Los `CONTEXT_*.md` movidos a `dev/` — no son READMEs, no son parte de este ticket.

## Casos de test obligatorios

1. Confirmar por lectura que `README.md` (raíz) y `tools/README.md` ya no mencionan `TOOL_CREATE_PROJECT.gs`/`TOOL_SETUP_EDITOR_ENVIRONMENT.gs`/`create-release-package.sh` salvo como referencia histórica explícita (si aplica).
2. Confirmar que el flujo de instalación descrito en `README.md` (raíz) coincide con el mecanismo real construido en S8-02.
3. `grep -rn` de los 3 nombres de archivo retirados en todo `*.md` del repo fuera de `_system/decisions/` y `_system/audits/` (donde es correcto que sigan apareciendo como registro histórico) — no debería haber resultados sueltos sin contexto de que fueron retirados.

## Estado de revisión

Aprobado: 2026-09-03
