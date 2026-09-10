---
id: S9-07
title: Ampliar las frases disparadoras de description en los 10 SKILL.md
type: content
subsystem: SYSTEM
sprint: 9
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-10
completed: 2026-09-10
branch: feat/s9-07-broaden-trigger-descriptions
---

# S9-07 — Ampliar las frases disparadoras de `description` en los 10 `SKILL.md`

## Contexto

Hallazgo real de la sesión de validación de hoy: el routing por lenguaje natural es poco fiable cuando el mensaje del editor no se parece de cerca a una de las 3-4 frases de ejemplo que hoy tiene cada `description`. Se observó fallar con frases razonables ("vamos a trabajar en el proyecto X", "quiero investigar sobre X" en mitad de una conversación ya iniciada). Esto es una red de seguridad complementaria a `commands/` (S9-05) — un editor que no sabe el nombre exacto del comando debería poder enganchar igual por descripción.

## Interfaces

Para cada uno de los 10 `SKILL.md`, revisar y ampliar la sección `description` del frontmatter con más variedad de frases disparadoras reales — cubriendo formas más indirectas/conversacionales, no solo la forma "de manual" ya presente. Mantener el formato ya establecido (tercera persona, frases entre comillas) y el límite razonable de longitud de un frontmatter YAML (no convertirlo en una lista interminable).

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- No es una reescritura de la lógica de cada skill, solo de su superficie de activación.
- Priorizar las skills que más ha costado activar hoy en pruebas reales: `research`, `project-setup`/`new-project`, `editorial-profile`.

## Fuera de scope

- Cambiar el cuerpo/instrucciones de ningún `SKILL.md`, solo el `description`.
- El renombrado de skills (S9-08) — coordinar, no competir por el mismo archivo en paralelo.

## Casos de test obligatorios

1. Cada uno de los 10 `SKILL.md` tiene una `description` revisada, con frontmatter YAML válido.
2. Prueba real (local, y cloud si es posible) con al menos 3 frases nuevas por skill que antes no habrían enganchado — confirmar que ahora sí.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
