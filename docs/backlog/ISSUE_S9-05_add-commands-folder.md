---
id: S9-05
title: Añadir carpeta commands/ para invocación explícita /comando
type: feature
subsystem: SYSTEM
sprint: 9
status: TODO
priority: P1
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
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

Pendiente de la investigación inicial del formato — no adivinar la estructura del archivo de comando.

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
