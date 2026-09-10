---
id: S9-03
title: Confirmar y aplicar el patrón de delegación a shared-writing y editorial-profile
type: refactor
subsystem: SYSTEM
sprint: 9
status: TODO
priority: P1
depends_on: [S9-01]
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S9-03 — Confirmar y aplicar el patrón de delegación a `shared-writing` y `editorial-profile`

## Contexto

Ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.c. `shared-writing` ya está diseñada para ser invocada por nombre desde `writing-post` y `activation` (su propio `SKILL.md` lo dice explícitamente) — pero antes de aplicar el mismo movimiento de contenido que S9-02, hay que confirmar que la invocación real hoy pasa por la herramienta `Skill` y no por lectura directa de `writing/shared/PROMPT_WRITE_POST.md` etc. camuflada de "invocación".

`editorial-profile` es el caso no confirmado: `writing-book/SKILL.md` referencia `editorial-profile/TEMPLATE_EDITOR_PROFILE.md` y `PROMPT_CREATE_EDITOR_PROFILE.md` directamente. Falta decidir si esto encaja en el patrón de delegación (invocar la skill `editorial-profile`) o si es un caso distinto — `writing-book` no necesita "crear un perfil editorial", necesita leer uno ya existente (`_editor/profiles/EDITOR_PROFILE_{nombre}.md`, que vive en la carpeta de trabajo del editor, no en el plugin) para usarlo como contexto de estilo. Si el propósito real es solo entender la forma del artefacto (la plantilla), puede que ni siquiera haga falta leer `TEMPLATE_EDITOR_PROFILE.md` en tiempo de ejecución.

## Interfaces

1. Auditar `skills/shared-writing/SKILL.md` y confirmar (o corregir) que `writing-post`/`activation` la invocan de verdad por `Skill`, no por lectura de archivo.
2. Mover `writing/shared/*`, `writing/post/PROMPT_QA_IDEAS.md`, `writing/post/TEMPLATE_POST_SEED.md`, `writing/post/TEMPLATE_POST_BRIEFING.md` a `skills/shared-writing/` (mismo patrón que S9-02).
3. Decidir y documentar el caso `editorial-profile` en este mismo ticket antes de tocar código — no asumir la solución de S9-02 sin verificar que aplica.

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

Pendiente de precisar durante la implementación (punto 3 de Interfaces) — este ticket incluye explícitamente la investigación, no solo la ejecución mecánica.

## Fuera de scope

- Mover `writing/post/PROMPT_POST_BRIEF.md` y el resto de prompts exclusivos de `writing-post` — eso es S9-01, no este ticket.
- `_system/resources/`, `_system/templates/` — S9-04.

## Casos de test obligatorios

1. Confirmado (con evidencia, no solo lectura del `SKILL.md`) si `shared-writing` se invoca hoy por `Skill` o por ruta — documentado en las notas del ticket antes de cerrar.
2. Tras el movimiento, ningún `SKILL.md` de `writing-post`/`activation` referencia `writing/shared/` ni las entradas movidas de `writing/post/` por ruta directa.
3. Decisión documentada y aplicada para `editorial-profile` — con razonamiento explícito de por qué se eligió esa opción.
4. Ejecución real (local) de `WRITE_POST` vía `shared-writing` tras el movimiento, sin regresión.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
