---
id: S9-11
title: Auditar prompts/skills — hablar con el editor en tarea, no en nombre de artefacto
type: content
subsystem: SYSTEM
sprint: 9
status: IN_PROGRESS
priority: P2
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-10
completed: null
branch: feat/s9-11-editor-facing-language
---

# S9-11 — Auditar prompts/skills: hablar con el editor en tarea, no en nombre de artefacto

## Contexto

Feedback directo del editor tras la primera instalación real funcionando de punta a punta (Sprint 9, v0.4.0, 2026-09-10). El sistema, al explicarle al editor qué falta o qué va a hacer, tiende a nombrar el identificador interno del artefacto (`WRITING_CONTEXT`, `POST_SEED`, `PROJECT_NOTES`, etc.) como si fuera autoexplicativo, en vez de describir la tarea en lenguaje llano. Ejemplos reales señalados:

- "No veo que tengas todavía un `WRITING_CONTEXT`" → debería ser algo como "Necesitamos definir el contexto de lo que vamos a escribir".
- "Arrancamos el primer `POST_SEED`" → "Arrancamos definiendo las ideas básicas del post".
- "Ya tengo bastante para armar el `PROJECT_NOTES`" → "Ya tengo bastante para empezar a tomar notas sobre el proyecto".

Ya se documentó como regla vinculante en `docs/DEV_STANDARDS.md` §6 (v1.3) para que ninguna skill nueva regrese a este hábito. Este ticket es el trabajo de auditar y corregir lo que ya existe.

## Interfaces

Revisar la prosa dirigida al editor (resúmenes de cierre, preguntas de checkpoint, mensajes de "esto es lo que voy a hacer ahora") en los 10 `SKILL.md` y en los `PROMPT_*.md`/`WORKFLOW_*.md` que cada uno referencia — no hace falta tocar absolutamente todo el repo de una vez; prioriza los puntos de contacto más frecuentes con el editor primero:

1. Los checkpoints obligatorios (`docs/DEV_STANDARDS.md` §7) de cada skill — son el punto donde el sistema más le habla directamente al editor.
2. Los mensajes de "no encuentro X" / "falta Y" que orientan al editor sobre qué hacer a continuación.
3. Los resúmenes de cierre de fase.

No toques las referencias técnicas internas a esos mismos nombres (rutas de archivo, instrucciones para Claude sobre qué leer/escribir) — la regla es solo sobre la prosa dirigida al editor, no sobre cómo el sistema se refiere a sus propios artefactos internamente.

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- No es una reescritura de la lógica de ningún workflow — solo de cómo se comunica al editor lo que ya está pasando.
- Si un nombre de artefacto aparece en una pregunta que el editor tiene que responder con ese mismo término técnico (poco probable, pero posible), no lo elimines a ciegas — usa criterio: la regla es sobre claridad para el editor, no sobre borrar todo nombre en mayúsculas sin excepción.

## Fuera de scope

- Cambiar el naming interno de los artefactos (`WRITING_CONTEXT`, `POST_SEED`, etc.) — siguen siendo la referencia técnica correcta dentro del sistema, solo cambia cómo se presentan al editor.
- Rediseñar ningún workflow o checkpoint — solo su redacción.

## Casos de test obligatorios

1. Los 3 ejemplos citados en el contexto (o su equivalente exacto si el texto actual difiere) quedan reescritos en lenguaje de tarea, no de nombre de artefacto.
2. Al menos un checkpoint obligatorio por cada uno de los 10 `SKILL.md` revisado explícitamente — documentar en la entrega cuáles se tocaron y cuáles ya estaban bien.
3. Ninguna referencia técnica interna (rutas, nombres de archivo) se vio afectada — verificado por diff, no solo por lectura.

## Estado de revisión

Aprobado: 2026-09-10
