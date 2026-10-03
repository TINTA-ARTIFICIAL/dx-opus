---
id: S10-02
title: new-project registra el proyecto creado en EDITOR_CONFIG.md
type: fix
subsystem: SYSTEM
sprint: 10
status: TODO
priority: P1
depends_on: []
blocks: [S10-03]
assignee: null
started: null
completed: null
branch: null
---

# S10-02 — `new-project` registra el proyecto creado en `EDITOR_CONFIG.md`

## Contexto

Bug detectado en uso real (editor Marco Laucelli, 2026-10-03, v0.4.0): tras crear dos proyectos (`AB40AGENDA`, `AI_CANON`), la sección "PROYECTOS ACTIVOS" de su `EDITOR_CONFIG.md` sigue con los placeholders (`total_projects: [N]`, `last_project_created: [YYYY-MM-DD]`, filas `[COD]`/`[ejemplo]`).

**Verificado en el repo:** `_system/templates/TEMPLATE_EDITOR_CONFIG.md` asigna explícitamente esa actualización a `TOOL_CREATE_PROJECT` ("Quién lo actualiza", línea ~44; "ACCIONES AUTOMÁTICAS: Updates Automáticos (manejados por TOOL_CREATE_PROJECT)" — añadir proyecto a la tabla, actualizar contador total, actualizar fecha del último proyecto). `new-project` (S6-02) sustituyó a ese script Apps Script pero no heredó este paso; y `setup` (PASO 4, regla 3) da por hecho que "otras skills, ej. `new-project`, actualizan la tabla de proyectos". Es un hueco de la migración, no una regresión reciente.

## Interfaces

`skills/new-project/SKILL.md`: nuevo paso entre el PASO 4 (generar `PROJECT_CONFIG.md`) y el checkpoint de cierre, que edite **solo** la sección "PROYECTOS ACTIVOS" de `_editor/config/EDITOR_CONFIG.md`:

1. Dashboard de Proyectos: `total_projects` (+1), `active_projects` (+1), `last_project_created` (= hoy). `completed_projects` no se toca.
2. Lista de Proyectos: añadir una fila (`Código | Nombre | Estado=activo | Workflow=— (aún sin definir; lo fija el discovery) | Última sesión=hoy | última columna`). Sustituir las filas de placeholder del template (`[COD]`, `[ejemplo]`) si siguen presentes.
3. No tocar ninguna otra sección (Información Personal, Estadísticas, etc.).

`_system/templates/TEMPLATE_EDITOR_CONFIG.md`: la última columna de la tabla se llama "Drive URL", herencia del modelo Apps Script que ya no existe. Renombrarla a "Ruta del proyecto" y usar `projects/{project_code}_{project_name}/` como valor. Los `EDITOR_CONFIG.md` ya generados conservarán la cabecera vieja: el paso debe escribir la ruta en la última columna aunque la cabecera diga "Drive URL" (no migrar archivos ajenos en silencio).

## Estructuras de datos

La fila de proyecto y los 3 contadores descritos arriba. Ninguna estructura nueva.

## Decisiones de diseño

- **Idempotencia:** si el código del proyecto ya figura en la tabla, no duplicar la fila ni volver a incrementar contadores (actualizar a lo sumo `Última sesión`).
- **Fallo no bloqueante:** el proyecto ya está creado cuando se llega a este paso. Si `EDITOR_CONFIG.md` no existe o no se puede editar, no marcar la creación como fallida: informar del error exacto y mostrar en el chat la fila a pegar a mano (mismo criterio que `ERROR_HANDLING` de `AUTO_SAVE_CONFIG.yaml`; nunca fallback silencioso).
- **Edición mínima:** conservar el resto del archivo byte a byte (mismo principio que `setup` PASO 1.3).
- El checkpoint de cierre de `new-project` no cambia; solo se añade una línea al resumen ("Proyecto registrado en tu configuración de editor").

## Fuera de scope

- Registrar los proyectos **ya existentes** (S10-03).
- Mantener `Estado`/`Workflow`/`Última sesión` actualizados en sesiones posteriores (otras skills).
- Estadísticas de uso (`total_sessions`, `total_artifacts_saved`, etc.).

## Casos de test obligatorios

1. `EDITOR_CONFIG.md` con placeholders: tras crear un proyecto, la tabla tiene exactamente 1 fila real (placeholders retirados), `total_projects: 1`, `active_projects: 1`, `last_project_created` = hoy.
2. Segundo proyecto: tabla con 2 filas, contadores a 2.
3. Repetir la creación del mismo código → sin fila duplicada ni contadores inflados.
4. `EDITOR_CONFIG.md` ausente → el proyecto sigue creado; mensaje de error exacto + fila para pegar a mano; no se crea `EDITOR_CONFIG.md` por la puerta de atrás.
5. `diff` del `EDITOR_CONFIG.md` antes/después: solo cambian líneas de la sección "PROYECTOS ACTIVOS".
6. Plantilla actualizada: cabecera "Ruta del proyecto" en `TEMPLATE_EDITOR_CONFIG.md`.

## Estado de revisión

PENDIENTE — esperando confirmación del editor (en particular: renombrar la columna "Drive URL" y tratar el fallo de edición como no bloqueante).
