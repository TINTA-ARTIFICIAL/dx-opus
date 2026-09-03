---
id: S6-01
title: Manifest del plugin (plugin.json)
type: infra
subsystem: SYSTEM
sprint: 6
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: 2026-09-03
branch: feat/s6-01-plugin-manifest
---

# S6-01 — Manifest del plugin (`plugin.json`)

## Contexto

Primer artefacto del pivote a plugin de Cowork (ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` y `_system/decisions/DL_20260903_SYSTEM_041.md`). Sin este manifest no hay plugin — es el archivo que declara que este repositorio es instalable como plugin de Cowork.

## Interfaces

Crear `.claude-plugin/plugin.json` en la **raíz del repo** (no en una subcarpeta nueva — ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` §8, "el root del plugin es el root del repo").

Contenido mínimo:

```json
{
  "name": "dx-opus",
  "version": "0.1.0",
  "description": "Sistema modular de escritura no-ficción asistida por IA — investigación, perfil editorial, escritura de libros y posts, evaluación y activación de contenido.",
  "author": {
    "name": "TINTA-ARTIFICIAL"
  }
}
```

`description` puede ajustarse en redacción, pero debe transmitir el propósito real del sistema (ver `README.md` del repo para la descripción canónica actual) — no un texto genérico.

## Estructuras de datos

El propio `plugin.json` es la estructura de datos de este ticket. No hay otros artefactos de datos.

## Decisiones de diseño

- `name`: `dx-opus`, kebab-case, coincide con el nombre del repositorio.
- `version`: arranca en `0.1.0` — este plugin no ha tenido ninguna versión publicada todavía.
- No se declaran rutas custom de componentes (`commands`, `agents`, `hooks`, `mcpServers`) en este ticket — los directorios estándar (`skills/`, `hooks/hooks.json`) se auto-descubren. Si S6-04 necesita declarar `hooks` explícitamente en el manifest, hazlo ahí, no aquí — no adivines el contenido del ticket de otro.
- No se enumeran skills dentro de `plugin.json` — se auto-descubren por la presencia de `skills/{nombre}/SKILL.md`.

## Fuera de scope

- No crear ninguna carpeta `skills/` ni `hooks/` en este ticket — son responsabilidad de S6-02, S6-03, S6-04.
- No mover, copiar ni modificar ningún archivo existente del repo (`research/`, `writing/`, etc.).
- No crear un `README.md` de plugin separado del `README.md` del repo — no es parte de este ticket.
- No configurar MCP servers (Drive u otros) — diferido explícitamente (ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` §6).

## Casos de test obligatorios

1. `.claude-plugin/plugin.json` existe en la raíz del repo.
2. Es JSON válido — pega en la entrega el comando exacto usado para comprobarlo y su salida (ej. `python3 -m json.tool .claude-plugin/plugin.json` o equivalente disponible en el entorno).
3. Contiene como mínimo el campo `name`, en kebab-case, con valor `dx-opus`.
4. Ningún archivo existente del repo fue movido, renombrado ni modificado — confirmar con `git status`/`git diff` que el único cambio es la creación de `.claude-plugin/plugin.json`.

## Estado de revisión

Aprobado: 2026-09-03
