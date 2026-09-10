---
id: S8-08
title: Prefijar con ${CLAUDE_PLUGIN_ROOT} toda ruta fuera de la carpeta de la skill
type: fix
subsystem: SYSTEM
sprint: 8
status: DONE
priority: P0
depends_on: []
blocks: []
assignee: null
started: 2026-09-09
completed: 2026-09-10
branch: null
---

# S8-08 — Prefijar con `${CLAUDE_PLUGIN_ROOT}` toda ruta fuera de la carpeta de la skill

## Contexto

Hallazgo bloqueante de la instalación real del plugin en Cowork (Sprint 8, sesión de validación humana del 2026-09-09/10). Tras descartar metódicamente contenido del paquete, manifiesto, caché por nombre de archivo y estado de sesión (ver `_system/test-records/TEST_PLUGIN_20260910.md`), la causa raíz confirmada fue: los 10 `SKILL.md` referencian archivos de otras carpetas del plugin (`research/`, `writing/`, `activation/`, `editorial-profile/`, `knowledge-base/`, `evaluation/`, partes de `_system/`) con rutas relativas planas (p. ej. `` `research/WORKFLOW_RESEARCH.md` ``), sin el prefijo `${CLAUDE_PLUGIN_ROOT}/`.

En un plugin instalado, esas rutas se resuelven contra el directorio de trabajo de la sesión del editor (donde esos archivos no existen), no contra la raíz real del plugin — aunque el contenido esté correctamente empaquetado y verificado en el `.plugin`. Confirmado contra la documentación oficial de Claude Code (`skills.md`, sección "Available string substitutions"): `${CLAUDE_PLUGIN_ROOT}` se sustituye tanto en el cuerpo markdown de un `SKILL.md` como en `hooks/hooks.json` — antes de este fix solo lo usábamos en el segundo caso.

## Interfaces

Ninguna nueva — fix de contenido sobre archivos existentes:
- Los 10 `skills/*/SKILL.md`.
- `activation/WORKFLOW_ACTIVATION.md` (única referencia cruzada fuera de `skills/` a otro subsistema en tiempo de ejecución: `writing/post/`, `writing/shared/`).
- `docs/DEV_STANDARDS.md` §4 — regla nueva documentada para que no se regrese a rutas planas en skills futuras.

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- El prefijo se aplica solo a rutas que apuntan a contenido realmente empaquetado en el `.plugin` instalable (`research/`, `writing/`, `activation/`, `editorial-profile/`, `knowledge-base/`, `evaluation/`, y dentro de `_system/` solo `resources/`, `templates/` y `PROMPT_PROJECT_DISCOVERY.md`).
- Las citas a documentación de desarrollo no empaquetada (`_system/SPEC_PLUGIN_ARCHITECTURE.md`, `_system/SCHEMA_SYSTEM_ARCHITECTURE.md`) quedan **sin** prefijo a propósito — no son instrucciones de lectura en tiempo de ejecución (el archivo ni siquiera existe en el paquete instalado), son referencias de contexto para quien desarrolla el sistema.
- Transformación mecánica (mismo patrón en los 11 archivos), aplicada con `sed` y verificada por grep — sin doble-prefijado, sin tocar las citas dev-only.

## Fuera de scope

- Cualquier otro hallazgo de la sesión de validación (routing por lenguaje natural inconsistente, hook `SessionStart` no confirmado, gap de `editorial-profile` al importar un perfil existente) — cada uno con su propio ticket o nota, no se mezclan aquí.
- Rediseñar la arquitectura de "plugin root = root del repo" — este fix la mantiene intacta, solo corrige cómo se referencian las rutas dentro de ella.

## Casos de test obligatorios

1. Ningún `` `research/...`` ``, `` `writing/...`` ``, `` `activation/...`` ``, `` `editorial-profile/...`` ``, `` `knowledge-base/...`` ``, `` `evaluation/...`` `` queda sin el prefijo `${CLAUDE_PLUGIN_ROOT}/` en los 10 `SKILL.md` ni en `activation/WORKFLOW_ACTIVATION.md` (verificado por grep, sin coincidencias).
2. Las citas a `_system/SPEC_PLUGIN_ARCHITECTURE.md` y `_system/SCHEMA_SYSTEM_ARCHITECTURE.md` siguen sin prefijo (verificado — no son parte del paquete instalable).
3. Sin doble-prefijado (`${CLAUDE_PLUGIN_ROOT}/${CLAUDE_PLUGIN_ROOT}/...`) en ningún archivo tocado.
4. Reempaquetado (`tools/create-plugin-package.sh`) y reinstalación real en Cowork: una skill invocada consigue leer su archivo de referencia fuera de `skills/` sin reportar que el archivo "no está presente" — pendiente de confirmación humana tras publicar la siguiente versión del `.plugin`.

## Estado de revisión

Aprobado: 2026-09-10 (fix directo durante sesión de validación en vivo, dado el carácter bloqueante y la necesidad de iterar con el editor probando en tiempo real — no pasó por el flujo D-dispatcher/D-developer estándar).
