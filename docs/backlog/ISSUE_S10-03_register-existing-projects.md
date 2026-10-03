---
id: S10-03
title: Mecanismo para registrar en EDITOR_CONFIG los proyectos ya existentes
type: feature
subsystem: SYSTEM
sprint: 10
status: TODO
priority: P2
depends_on: [S10-02]
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S10-03 — Registrar en `EDITOR_CONFIG.md` los proyectos ya existentes

## Contexto

Consecuencia de S10-02: arreglar `new-project` solo registra los proyectos **futuros**. El editor que reportó el bug (2026-10-03) ya tiene dos proyectos sin registrar (`AB40AGENDA`, `AI_CANON`), y cualquier editor que haya usado v0.1–v0.4 estará igual. El reporte lo pedía como "valorar".

## Interfaces

Propuesta (a confirmar): un paso de **reconciliación** en la skill `setup`, ofrecido cuando ya existe `EDITOR_CONFIG.md` y el editor entra a revisarla (PASO 1, rama "revisar/actualizar"):

1. Listar las carpetas `projects/*/config/PROJECT_CONFIG.md` de la carpeta de trabajo y leer de cada una `project_code`, `project_name`, `created_date`, `project_path`.
2. Comparar con la tabla "Lista de Proyectos".
3. Presentar al editor los que faltan y **preguntar** antes de añadirlos (checkpoint obligatorio, `docs/DEV_STANDARDS.md` §7).
4. Si confirma, añadir las filas con el mismo formato y reglas de edición mínima que S10-02, y recalcular `total_projects`/`active_projects`/`last_project_created` a partir de la tabla resultante.

Alternativa a valorar al diseñar: un comando explícito (`/sync-projects`) en lugar de colgarlo de `setup`.

## Estructuras de datos

Reutiliza el formato de fila de S10-02; la fuente de verdad de los proyectos es cada `PROJECT_CONFIG.md`, no el `EDITOR_CONFIG.md`.

## Decisiones de diseño

- Idempotente: ejecutarlo dos veces no duplica filas.
- Nunca borra ni modifica filas existentes (aunque su estado/workflow difiera del que ve en disco) — solo añade las ausentes.
- `Estado` de los proyectos recuperados: `activo` por defecto, el editor puede corregirlo (no hay forma fiable de inferirlo del disco).

## Fuera de scope

- Detectar proyectos fuera de `projects/` o con estructura no estándar.
- Eliminar de la tabla proyectos cuya carpeta ya no existe (decisión del editor, no automática).

## Casos de test obligatorios

1. Carpeta de trabajo con 2 proyectos y tabla vacía → propone los 2, tras confirmación los añade, contadores = 2.
2. Segunda ejecución → "nada que reconciliar", sin cambios.
3. Tabla con 1 de 2 proyectos → propone solo el que falta.
4. Respuesta ambigua del editor ("vale", "lo que veas") → no escribe nada, vuelve a preguntar.
5. `PROJECT_CONFIG.md` ilegible o con campos ausentes → lo omite, lo reporta, no aborta el resto.

## Estado de revisión

PENDIENTE — depende de S10-02 y de que el editor elija dónde vive el mecanismo (paso de `setup` vs comando propio).
