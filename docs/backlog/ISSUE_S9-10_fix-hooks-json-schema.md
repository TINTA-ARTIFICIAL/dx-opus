---
id: S9-10
title: Envolver hooks.json en el objeto "hooks" que exige el esquema real
type: fix
subsystem: SYSTEM
sprint: 9
status: DONE
priority: P0
depends_on: []
blocks: []
assignee: D-dispatcher
started: 2026-09-10
completed: 2026-09-10
branch: null
---

# S9-10 — Envolver `hooks.json` en el objeto `"hooks"` que exige el esquema real

## Contexto

Hallazgo del `D-developer` de S9-05 al usar por primera vez el validador oficial real (`claude plugin validate`, no trazado estático): `hooks/hooks.json` declaraba `PreToolUse` y `SessionStart` como claves de nivel superior del archivo, sin el envoltorio `"hooks": {...}` que exige el esquema real de Claude Code — confirmado contra `plugins-reference.md` (ejemplo oficial: `{"hooks": {"PostToolUse": [...]}}`). Este error existía desde la creación del archivo en S6-04 y ha estado presente en todos los sprints posteriores sin que ningún ticket lo detectara, porque hasta hoy ningún `D-developer` había ejecutado el validador real del CLI — solo verificación de JSON válido (que no comprueba el esquema, solo la sintaxis).

Es potencialmente la explicación de por qué el hook `SessionStart` nunca se confirmó disparado en ninguna prueba de instalación real de hoy (Sprint 8), y de si los hooks `PreToolUse` de gobernanza/aprobación llegaron a estar activos alguna vez en una instalación real.

## Interfaces

`hooks/hooks.json`: mismo contenido de los 3 hooks `PreToolUse` y 1 `SessionStart`, ahora anidados dentro de `{"hooks": {...}}`.

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- Fix mínimo y quirúrgico — mover contenido, no reescribir ninguna lógica de los 4 hooks existentes.
- Aplicado directamente por el dispatcher (no despachado a un `D-developer` nuevo) por: (a) ser mecánico y sin ambigüedad — el esquema correcto está documentado explícitamente con ejemplo oficial; (b) ningún ticket en curso de Sprint 9 tocaba `hooks.json`, sin riesgo de conflicto; (c) severidad alta — podía estar bloqueando el `SessionStart` de todo el plugin desde S6-04.
- No se corrige aquí la referencia ya obsoleta a `writing/post/PROMPT_POST_BRIEF.md` dentro del prompt del tercer hook (quedará desactualizada tras S9-01/S9-03) — fuera de scope de este fix puntual, se resuelve cuando se despachen esos tickets.

## Fuera de scope

- Actualizar rutas internas mencionadas en el texto de los prompts de los hooks (fuera de scope, ver nota arriba).
- Cualquier cambio de lógica de los 4 hooks existentes.

## Casos de test obligatorios

1. `hooks/hooks.json` sigue siendo JSON válido (`ruby -rjson`).
2. `claude plugin validate . --strict --json` reporta `"success": true` sin errores en `hooks/hooks.json` (antes: `PreToolUse/PermissionRequest is declared at the top level...`).
3. El contenido semántico de los 3 hooks `PreToolUse` y 1 `SessionStart` es idéntico al de antes del fix — verificado comparando el JSON parseado (no el texto) antes/después.

## Estado de revisión

Aprobado: 2026-09-10 (fix directo del dispatcher durante el despacho de Sprint 9, por severidad y hallazgo en vivo — no pasó por el flujo estándar de ticket previo a la implementación)
