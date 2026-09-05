---
id: S8-02
title: Mecanismo real de empaquetado del plugin (issue #77)
type: infra
subsystem: SYSTEM
sprint: 8
status: DONE
priority: P1
depends_on: []
blocks: [S8-03]
assignee: D-developer
started: 2026-09-03
completed: 2026-09-04
branch: feat/s8-02-packaging-mechanism
---

# S8-02 — Mecanismo real de empaquetado del plugin

## Contexto

Implementa el límite instalable/desarrollo diseñado en `_system/SCHEMA_SYSTEM_ARCHITECTURE.md` PARTE 8 (v1.5) y `_system/SPEC_PLUGIN_ARCHITECTURE.md` §8 (v0.6), y cierra el issue #77 (reabierto — el cierre anterior fue un error: el plugin instala más que `.claude-plugin/`+`skills/`+`hooks/`, porque cada `SKILL.md` referencia contenido de producción del resto del repo).

Los 6 `CONTEXT_*.md` de subsistema ya se movieron a `{subsistema}/dev/` en un commit previo — este ticket construye el script/proceso que produce el `.plugin` instalable respetando esa frontera, no la frontera en sí.

## Interfaces

Crear `tools/create-plugin-package.sh` (o el nombre que sigas, pero debe quedar documentado en `tools/README.md` — ver S8-03).

El script debe producir un archivo `dx-opus.plugin` (zip) conteniendo únicamente:

**Incluido:**
- `.claude-plugin/`
- `skills/`
- `hooks/`
- Contenido de producción de cada subsistema (`research/`, `writing/`, `evaluation/`, `activation/`, `editorial-profile/`, `knowledge-base/`) **excepto** sus subcarpetas `dev/`
- `_system/resources/`
- `_system/templates/`

**Excluido:**
- Cualquier ruta que contenga `/dev/`
- El resto de `_system/` (`decisions/`, `audits/`, `MASTER_PLAN.md`, `SPEC_*.md`, `SCHEMA_*.md`, `NAMING_CONVENTION_ANALYSIS.md`, `DEV_INSTRUCTIONS_ALL.md`, `PROMPT_PROJECT_DISCOVERY.md`, `README.md`)
- `docs/` completo
- `tools/` completo
- Todos los `README.md`
- `.git/`, `.DS_Store`

## Estructuras de datos

Ninguna nueva — el propio `.plugin` (zip) es el artefacto de salida, siguiendo el formato ya usado en la skill `create-cowork-plugin` (`zip -r nombre.plugin . -x "patrones..."` desde el directorio del plugin).

## Decisiones de diseño

- El filtro debe ser estructural (por ruta/patrón de carpeta), no una lista de archivos individuales mantenida a mano — es la lección repetida de toda la Sprint 5 (fuente única de verdad, `docs/DEV_STANDARDS.md` §3). Si mañana se añade un séptimo subsistema o una nueva skill, el script no debería necesitar tocarse.
- El script no depende de `create-release-package.sh` (Apps Script/Drive) ni lo reemplaza en su forma — es un mecanismo nuevo para un modelo de distribución distinto. No reutilices su lógica de `FILE_MAPPINGS`.
- Verificar, tras generar el `.plugin`, que ningún archivo bajo `/dev/` ni de las rutas excluidas quedó dentro del zip — esto es lo que hace que el mecanismo sea confiable, no solo "funciona en este intento".

## Fuera de scope

- Retirar `tools/TOOL_CREATE_PROJECT.gs`, `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`, `create-release-package.sh` — es S8-01, y no debe ejecutarse hasta que el editor confirme la validación real del plugin (fuera del alcance de cualquier ticket D-team).
- Actualizar `README.md`/`tools/README.md` para documentar este mecanismo — es S8-03, depende de este ticket.
- Publicar o distribuir el `.plugin` generado — este ticket solo construye la herramienta que lo genera.

## Casos de test obligatorios

1. Ejecutar el script sobre el estado actual del repo y confirmar que genera `dx-opus.plugin` sin error.
2. Descomprimir el `.plugin` generado (en una ruta temporal, no en el repo) y confirmar con `find`/`grep` que no contiene ningún archivo bajo una ruta `/dev/`, ni nada de `docs/`, `tools/`, `_system/decisions/`, `_system/audits/`, ni ningún `README.md`.
3. Confirmar que sí contiene los 9 `SKILL.md`, `hooks/hooks.json`, `.claude-plugin/plugin.json`, y el contenido de producción real de los 6 subsistemas (al menos un `PROMPT_*.md` de cada uno).
4. Confirmar que `_system/resources/AUTO_SAVE_CONFIG.yaml` y `_system/templates/TEMPLATE_EDITOR_CONFIG.md` sí están incluidos (los referencian `project-setup`/`editor-onboarding`).

## Estado de revisión

Aprobado: 2026-09-03
