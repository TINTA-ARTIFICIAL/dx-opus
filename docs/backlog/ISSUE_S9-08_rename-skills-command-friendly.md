---
id: S9-08
title: Renombrar skills a forma de comando (writing-book, writing-post, editor-onboarding, project-setup)
type: refactor
subsystem: SYSTEM
sprint: 9
status: IN_PROGRESS
priority: P2
depends_on: []
blocks: [S9-01]
assignee: D-developer
started: 2026-09-10
completed: null
branch: feat/s9-08-rename-skills-command-friendly
---

# S9-08 — Renombrar skills a forma de comando

## Contexto

Confirmado por el editor: los nombres de skill deben leerse como una orden corta, no como una etiqueta descriptiva, porque son el identificador real del comando (`/{nombre}`) una vez exista `commands/` (S9-05). Renombres confirmados:

| Actual | Nuevo |
|---|---|
| `writing-book` | `write-book` |
| `writing-post` | `write-post` |
| `editor-onboarding` | `setup` |
| `project-setup` | `new-project` |

`editorial-profile`, `research`, `evaluation`, `activation` se mantienen. `knowledge-base` y `shared-writing` se mantienen (uso interno, no importa el nombre para invocación directa).

## Interfaces

`git mv skills/{nombre-viejo}/ skills/{nombre-nuevo}/`. Actualizar en cada `SKILL.md` renombrado el campo `name:` del frontmatter. Buscar y actualizar **todas** las referencias cruzadas al nombre viejo en el resto del repo — no solo dentro de la propia skill:
- Otros `SKILL.md` que mencionen la skill por nombre (`writing-book`, `project-setup`, `editor-onboarding`, `writing-post` aparecen citados en varios sitios: `activation`, `evaluation`, `writing-post`, etc.).
- `docs/backlog/README.md`, `_system/MASTER_PLAN.md`, `_system/SCHEMA_SYSTEM_ARCHITECTURE.md`, `_system/SPEC_PLUGIN_ARCHITECTURE.md` — todos citan los 10 nombres de skill en tablas.
- `tools/create-plugin-package.sh` si referencia nombres de carpeta directamente (hoy no debería, pero confirmar).

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- Coordinar el orden con S9-01/S9-02/S9-03 si se despachan en la misma tanda — todos tocan las carpetas `skills/writing-book/` y `skills/writing-post/` (entre otras). Recomendado: aplicar S9-08 primero, y que S9-01/02/03 ya trabajen sobre los nombres nuevos, para no duplicar el `git mv`.
- No se renombra `knowledge-base` ni `shared-writing` — no hay problema de "adivinar el comando" porque no se invocan directamente.

## Fuera de scope

- `commands/` en sí (S9-05) — este ticket solo prepara los nombres, no crea los archivos de comando.

## Casos de test obligatorios

1. `grep -r` de cada nombre viejo (`writing-book`, `writing-post`, `editor-onboarding`, `project-setup`) en todo el repo (excluyendo `.git/`) devuelve cero resultados fuera de `docs/backlog/` (histórico de tickets ya cerrados, que no se reescribe).
2. `tools/create-plugin-package.sh` genera el paquete sin errores tras el renombrado.
3. Instalación real: las 4 skills renombradas aparecen con su nuevo nombre en el picker/listado de skills.
4. Invocación por lenguaje natural de cada una de las 4 sigue funcionando igual que antes del renombrado.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
