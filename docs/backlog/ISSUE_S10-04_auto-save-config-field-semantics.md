---
id: S10-04
title: Documentar la semántica de template/prefix en AUTO_SAVE_CONFIG.yaml
type: docs
subsystem: SYSTEM
sprint: 10
status: TODO
priority: P3
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S10-04 — Documentar la semántica de `template`/`prefix` en `AUTO_SAVE_CONFIG.yaml`

## Contexto

El reporte de uso real del 2026-10-03 señalaba dos puntos sobre `PROJECT_NOTES`. Tras verificarlos en el repo, ninguno es lo que parecía, pero ambos nacen de la misma ambigüedad documental. **Este ticket existe también para dejar constancia del diagnóstico correcto y evitar que alguien "arregle" el síntoma equivocado.**

1. *"Falta la plantilla `PROJECT_NOTES.md`"* — **diagnóstico erróneo.** En `AUTO_SAVE_CONFIG.yaml` el campo `template:` es el **patrón de nombre del archivo guardado** (`{project_code}_R_REF_SUM_v{version}.md`, `EDITOR_PROFILE_{editor_name}.md`…), no una referencia a un archivo de `_system/templates/`. `template: "PROJECT_NOTES.md"` solo significa "el archivo se llama `PROJECT_NOTES.md`". La estructura del artefacto está definida inline en `_system/PROMPT_PROJECT_DISCOVERY.md` PASO 5A, y `TEMPLATE_PROJECT_README.md` lo dice explícitamente ("❌ Se crea con PROMPT_PROJECT_DISCOVERY"). No falta ningún archivo.
2. *"`prefix: NOTES` contradice la ruta fija `_discovery/PROJECT_NOTES.md`"* — **cierto solo a medias.** Verificado por grep sobre todo el repo (skills, prompts, plantillas, `tools/`): **nada consume `prefix:`** en ninguna entrada del YAML, no solo en `PROJECT_NOTES`. Manda `folder` + `template` — que sí coinciden con `_discovery/PROJECT_NOTES.md`. `prefix` es metadato residual del modelo Apps Script.

La causa común: el nombre `template:` choca con la carpeta `_system/templates/`, y el YAML no explica qué significa cada campo.

## Interfaces

`_system/resources/AUTO_SAVE_CONFIG.yaml`, solo comentarios de cabecera: bloque "SEMÁNTICA DE CAMPOS" que defina `folder`, `template` (= patrón de nombre del archivo de salida; **no** apunta a `_system/templates/`), `prefix` (informativo, no consumido por ningún proceso a esta fecha; si hay discrepancia manda `template`), `unique`, `scope`, `metadata_level`. Subir `config_version` a 1.4 (cambio documental, sin cambios de claves ni valores).

## Estructuras de datos

Ninguna. No se añaden, quitan ni modifican claves ni valores.

## Decisiones de diseño

- **Documentar, no eliminar `prefix`:** quitar ~30 campos es churn y el riesgo de que algo externo los lea no es cero; documentarlo como informativo resuelve la ambigüedad sin riesgo. Retirarlos, si se quiere, es un ticket aparte con su propia verificación.
- No crear ningún `PROJECT_NOTES.md` en `_system/templates/`: duplicaría la estructura que ya vive en el discovery y reintroduciría el problema de fuente única que `docs/DEV_STANDARDS.md` §3 prohíbe.
- Deuda conocida de S9-04: las copias ya sembradas en la carpeta de trabajo de los editores (v1.3) no se actualizan solas con este cambio. Al ser solo comentarios, el impacto funcional es nulo; anotarlo en la entrega.

## Fuera de scope

- Eliminar `prefix` o renombrar `template`.
- El mecanismo de actualización de copias sembradas (deuda de S9-04).

## Casos de test obligatorios

1. `ruby -ryaml` parsea el YAML sin error.
2. El diff contra la versión anterior contiene solo líneas de comentario y el cambio de `config_version`/`updated` — verificado por diff.
3. `grep -rn "prefix"` sobre skills/prompts/tools sigue sin encontrar consumidores (la afirmación de "no consumido" sigue siendo cierta en la fecha de la entrega).
4. El bloque nombra explícitamente que `template:` no es un archivo de `_system/templates/`.

## Estado de revisión

PENDIENTE — esperando confirmación del editor (documentar vs. eliminar `prefix`).
