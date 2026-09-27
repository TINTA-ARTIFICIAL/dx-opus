---
id: S9-12
title: Spike — plantilla de maquetación para artefactos valiosos del proceso
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

# S9-12 — Spike: plantilla de maquetación para artefactos valiosos del proceso

## Contexto

Feedback directo del editor (2026-09-10): los artefactos que producen los distintos flujos de D-X-OPUS — notas, borradores, informes de investigación, y en general cualquier subproducto que el sistema ya identifica como "artefacto a guardar" (con `folder`/`template` propios en `_system/resources/AUTO_SAVE_CONFIG.yaml`) — son valiosos para el editor y merecen cuidado en cómo se presentan, no solo en cómo se guardan. Primera petición concreta: una plantilla de maquetación para que, cuando estos artefactos se generen, se le muestren al editor de forma sencilla y legible, no como un volcado técnico.

Este ticket es un **spike de diseño**, no una implementación directa — el alcance real depende de decisiones que todavía no están tomadas.

## Interfaces

Preguntas a resolver antes de poder escribir un ticket de implementación:

1. **Qué significa "maquetado" aquí.** ¿Una guía de estilo Markdown consistente (jerarquía de encabezados, énfasis, listas, tablas) que ya se aplique al generar el contenido? ¿Algo más visual, renderizado fuera del chat? Depende en parte de la línea de investigación de S9-13 (Claude Docs) — si el editor va a interactuar con estos artefactos ahí, la maquetación podría resolverse por ese camino en vez de (o además de) una plantilla propia.
2. **Qué artefactos entran.** ¿Todos los que `AUTO_SAVE_CONFIG.yaml` ya trata como artefacto con nombre propio, o solo un subconjunto (los que el editor lee/revisa directamente, no los intermedios de uso interno entre skills)?
3. **Dónde vive la plantilla.** Si es una guía de estilo, ¿un nuevo recurso en `_system/resources/` o `_system/templates/`, referenciado por cada `PROMPT_*.md` que genera un artefacto? Si son varias plantillas por tipo de artefacto, ¿una por artefacto o una genérica con variaciones?

## Estructuras de datos

Ninguna todavía — es lo que este spike tiene que definir.

## Decisiones de diseño

Pendientes — este ticket es la investigación, no la decisión.

## Fuera de scope

- Cambiar el contenido o la metodología de ningún prompt existente — eso, si corresponde, sería un ticket de implementación posterior.
- Resolver esto acoplado a S9-13 (Claude Docs) de forma forzosa — pueden acabar siendo la misma solución o dos independientes; el spike debe evaluar ambas posibilidades, no asumir una.

## Casos de test obligatorios

N/A — este ticket entrega una propuesta de diseño (documento o sección de spec), no código verificable. El criterio de cierre es que el editor apruebe la propuesta antes de que se convierta en ticket(s) de implementación.

## Estado de revisión

Aprobado: 2026-09-10 (como spike — su resultado necesita aprobación propia antes de implementar)
