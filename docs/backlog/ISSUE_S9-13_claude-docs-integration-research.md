---
id: S9-13
title: Spike — evaluar integración con Claude Docs para anotación de artefactos
type: spike
subsystem: SYSTEM
sprint: 9
status: TODO
priority: P3
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S9-13 — Spike: evaluar integración con Claude Docs para anotación de artefactos

## Contexto

Petición directa del editor (2026-09-10 / continuada 2026-09-27): varios procesos de D-X-OPUS requieren que el editor anote o revise un artefacto antes de que el sistema continúe (research, borradores, planes). Hoy eso pasa en el propio chat o editando el Markdown a mano. El editor pregunta si "Claude Docs" — la función de documentos colaborativos de Anthropic — podría servir como superficie de anotación para estos procesos, y además pide que los artefactos que el sistema ya guarda como archivo también se puedan guardar como Claude Doc.

## Interfaces

Investigación ya realizada (2026-09-27), verificada contra fuente oficial antes de escribir este ticket:

- **Confirmado** (blog oficial de Anthropic, `claude.com/blog/cowork-is-now-claude`, 16 sept. 2026, verificado directamente por fetch, no solo citado por un agente): Claude Docs es una función real de escritura colaborativa de documentos ("Ask for a document, and you and Claude write it together"), en beta, disponible en planes de pago (Pro/Max/Team/Enterprise), con Cowork fusionado en la experiencia general de Claude a partir de esa misma fecha.
- **No confirmado por fuente oficial, solo por blogs de terceros** (`eesel.ai`, `animaapp.com` — tratar con escepticismo, no como hecho): que Docs soporte comentarios/anotaciones de colaboradores de forma que Claude pueda leerlos y actuar sobre ellos.
- **Confirmado como ausente**: no existe, en la documentación pública de la API de Claude ni en la referencia de plugins de Claude Code, ningún endpoint o conector documentado para que una skill de un plugin (como las de este repo) cree o lea programáticamente un Claude Doc — ni su contenido ni sus comentarios — desde sus propias instrucciones. Existe un skill `anthropic-skills:docs` disponible en algunos entornos de Claude (confirmado: apareció en el listado de skills de esta misma sesión), pero es una capacidad del entorno de Claude Code/Cowork en el que corre una sesión, no algo que una skill de `dx-opus` pueda invocar por sí misma de forma documentada.

**Conclusión de la investigación: la pieza que haría falta para construir esto (una API o conector documentado, invocable desde una skill) no existe públicamente todavía.** Esto no descarta la idea — la marca como "vigilar y revisar", no como "construir ahora".

## Estructuras de datos

Ninguna — pendiente de que exista una vía programática documentada.

## Decisiones de diseño

Pendientes de una futura revisión cuando (si) Anthropic documente una vía de integración. Mientras tanto, dos preguntas quedan abiertas para cuando se retome:

1. Si llega una API/conector: ¿sustituye el guardado como archivo Markdown, o lo complementa (el sistema sigue guardando el archivo como fuente de verdad, y opcionalmente también crea un Doc para la revisión del editor)?
2. Relación con S9-12 (plantilla de maquetación) — si Docs termina siendo la superficie de anotación, puede que resuelva también la necesidad de maquetación de S9-12 sin una plantilla Markdown propia.

## Fuera de scope

- Cualquier implementación real de creación/lectura de Claude Docs desde una skill — no hay vía documentada para hacerlo todavía.
- Diseñar el flujo de anotación específico para cada proceso (research, borradores, planes) — eso viene después de que exista la vía programática, no antes.

## Casos de test obligatorios

N/A — spike de investigación. Criterio de cierre: revisar periódicamente (p. ej. al inicio de cada sprint) si Anthropic ha publicado documentación de una API/conector para Claude Docs desde plugins; cuando exista, este ticket se cierra y se abre uno de diseño/implementación real.

## Estado de revisión

Aprobado: 2026-09-27 (como spike de vigilancia, no de implementación — su resultado depende de algo fuera de nuestro control)
