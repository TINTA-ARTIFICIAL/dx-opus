---
id: S9-05
title: Añadir carpeta commands/ para invocación explícita /comando
type: feature
subsystem: SYSTEM
sprint: 9
status: IN_PROGRESS
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-10
completed: null
branch: feat/s9-05-add-commands-folder
---

# S9-05 — Añadir carpeta `commands/` para invocación explícita `/comando`

## Contexto

Confirmado hoy (real, no hipótesis): escribir `/dxopus:research` nunca ha funcionado porque el plugin no tiene carpeta `commands/` — las skills se invocan por lenguaje natural (descripción) o por la herramienta `Skill`, no por comando tecleado, salvo que el plugin declare comandos explícitos. Es un gap de producto real e independiente del bug de `${CLAUDE_PLUGIN_ROOT}` en cloud — mereció su propio ticket porque el editor lo señaló como "muy natural de usar" y hoy no existe en absoluto.

## Interfaces

Crear `commands/` con un archivo de comando por cada skill que el editor invoca directamente (no las internas: `knowledge-base`, `shared-writing`, `evaluation` — quedan solo accesibles por delegación o lenguaje natural, no necesitan comando propio salvo que se decida lo contrario). Investigar primero el formato exacto que Claude Code espera para un archivo de `commands/*.md` (no asumirlo — mismo criterio que todo lo investigado hoy, confirmar contra la documentación oficial antes de escribir el primero, y usarlo como plantilla para el resto).

Comandos mínimos a cubrir: `research`, `setup` (si se aplica el renombre de S9-08), `new-project` (idem), `editorial-profile`, `write-book`, `write-post`, `activation`.

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

Formato confirmado contra la documentación oficial de Claude Code (no inventado), consultada en vivo el 2026-09-10:

- `code.claude.com/docs/en/slash-commands` ("Extend Claude with skills" — la página de slash-commands se fusionó en la de skills), sección "Reserved name" / "Command files": "a Markdown file in `.claude/commands/` is the older format and still works. It supports the same frontmatter except `name` and `paths`, and you invoke it by its file name."
- `code.claude.com/docs/en/plugins-reference`, sección "Skills" y "Standard plugin layout": para un **plugin** (no un proyecto `.claude/`), la ubicación es `commands/` en la raíz del plugin, como archivos `.md` planos (no directorios), descubiertos automáticamente junto con `skills/` sin necesidad de declarar un campo `commands` en el manifiesto. Ejemplo oficial: `commands/status.md`, `commands/logs.md`. La misma referencia advierte "Skills as flat Markdown files. Use `skills/` for new plugins" — es decir, la vía recomendada por defecto para plugins nuevos es `skills/`; `commands/` es el formato heredado, pero sigue siendo la vía documentada, soportada y funcional para conseguir `/nombre` como comando tecleado, y es la que este ticket usa a propósito porque el problema confirmado es de invocación en Cowork, no de crear una skill nueva.
- Nombre del comando: viene del nombre de archivo sin extensión, namespaced por el plugin (`/dxopus:nombre-archivo`), según la tabla "How a skill gets its command name" de la misma referencia.

Cada `commands/*.md` creado apunta, por ruta real con el prefijo `${CLAUDE_PLUGIN_ROOT}/` (regla de `docs/DEV_STANDARDS.md` §4), al `SKILL.md` existente correspondiente — no duplica su contenido (regla `docs/DEV_STANDARDS.md` §3/4). Esto significa que el comando siempre ejecuta la misma lógica que ya sigue el routing por lenguaje natural, sin una segunda copia que se pueda desincronizar.

**Nota de coordinación con S9-08 (no resuelta por este ticket):** en el momento de esta implementación, S9-08 (renombre `editor-onboarding`→`setup`, `project-setup`→`new-project`, `writing-book`→`write-book`, `writing-post`→`write-post`) no estaba aplicado en este worktree — las carpetas de skill seguían con su nombre viejo. Siguiendo el nombre final que este mismo ticket pide probar ("el nombre final tras S9-08"), los archivos de comando se crearon ya con el nombre de archivo objetivo (`commands/setup.md`, `commands/new-project.md`, `commands/write-book.md`, `commands/write-post.md`), pero su cuerpo apunta today a la ruta de skill *actual* (`skills/editor-onboarding/SKILL.md`, `skills/project-setup/SKILL.md`, `skills/writing-book/SKILL.md`, `skills/writing-post/SKILL.md`) porque es la que existe de verdad hoy. Si S9-08 se mergea por separado, quien resuelva el merge (o un fix de seguimiento) debe actualizar esas 4 rutas para que apunten a las carpetas ya renombradas — de lo contrario esos 4 comandos seguirían funcionando (la skill sigue existiendo, solo que con el nombre viejo), pero la ruta citada quedaría desalineada con `docs/DEV_STANDARDS.md` §3 (fuente única de verdad ya obsoleta).

## Fuera de scope

- Comandos para skills de uso interno (`knowledge-base`, `shared-writing`, `evaluation`) salvo que se decida explícitamente lo contrario durante la implementación.
- Cambiar el contenido de ningún `SKILL.md` — los comandos son una capa de invocación adicional, no sustituyen el routing por lenguaje natural.

## Casos de test obligatorios

1. El formato de `commands/*.md` usado está confirmado contra la documentación oficial, no inventado — citar la fuente en el propio ticket al completarlo.
2. Instalación real y prueba de al menos `/research` (o el nombre final tras S9-08) como comando tecleado, confirmando que ya no da "Unknown command".
3. El resto de comandos mínimos listados arriba, probados igual.
4. El routing por lenguaje natural (sin comando) sigue funcionando igual que antes — este ticket no debe degradar esa vía.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
