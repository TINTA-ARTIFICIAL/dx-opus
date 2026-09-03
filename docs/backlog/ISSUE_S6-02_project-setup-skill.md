---
id: S6-02
title: Skill project-setup
type: skill
subsystem: SYSTEM
sprint: 6
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: 2026-09-03
branch: feat/s6-02-project-setup-skill
---

# S6-02 — Skill `project-setup`

## Contexto

Reemplaza `tools/TOOL_CREATE_PROJECT.gs` (Apps Script) para proyectos creados a través del plugin. Esta skill es la que cierra por construcción los issues de GitHub **#49** (auto-save crea subcarpetas duplicadas), **#50** (PROJECT_CONFIG sin IDs de subcarpeta) y una parte de **#65** (pérdida silenciosa de datos): al crear las carpetas directamente (no vía Apps Script buscando por nombre), no hay ambigüedad de qué carpeta es cuál.

No se toca `tools/TOOL_CREATE_PROJECT.gs` en este ticket — sigue existiendo para el flujo antiguo hasta Sprint 8 (deprecación formal). Ver `_system/MASTER_PLAN.md` v2.0 para la causa raíz documentada en ese script, por si sirve de referencia de qué NO repetir.

## Interfaces

Crear `skills/project-setup/SKILL.md`.

Frontmatter:
```yaml
---
name: project-setup
description: >
  This skill should be used when the user wants to start a new writing
  project — trigger phrases like "crear un proyecto nuevo", "empezar un
  libro sobre X", "quiero escribir una serie de posts sobre Y", "arrancar
  un proyecto".
metadata:
  version: "0.1.0"
---
```

El cuerpo del `SKILL.md` debe instruir a Claude a:

1. Determinar `project_code` (código corto, mayúsculas, `A-Z0-9_`, máx. 10 caracteres — ver `NAMING_RULES.project_code` en `_system/resources/AUTO_SAVE_CONFIG.yaml`) y `project_name`, preguntando al editor si no los da.
2. Crear la estructura de carpetas del proyecto en `projects/{project_code}_{project_name}/`, con las 6 subcarpetas estándar: `_discovery/`, `R_research/`, `WB_writing_book/`, `WP_writing_post/`, `A_activation/`, `config/` — los nombres exactos deben leerse de `_system/resources/AUTO_SAVE_CONFIG.yaml`, **no hardcodearse de nuevo** (regla de fuente única, `docs/DEV_STANDARDS.md` §3).
3. Generar un `PROJECT_CONFIG.md` equivalente al que producía `TOOL_CREATE_PROJECT.gs`, pero **sin la tabla de auto-save hardcodeada que tenía el original** — en su lugar, una referencia a `_system/resources/AUTO_SAVE_CONFIG.yaml` como fuente de rutas/naming.
4. No pre-crear subcarpetas dinámicas (`Post{N}_{post_name}` dentro de `WP_writing_post/`) — se crean solo cuando se guarda el primer artefacto de un post nuevo, según quedó decidido en el diseño de estructura de carpetas (`_system/resources/AUTO_SAVE_CONFIG.yaml`, sección `WRITING_POST`, comentario "ESTRUCTURA POR POST").

## Estructuras de datos

- Estructura de carpetas del proyecto: definida en `_system/resources/AUTO_SAVE_CONFIG.yaml` (carpetas top-level) y en su sección `NAMING_RULES.post_folder` (subcarpetas dinámicas de post). No reinventar.
- `PROJECT_CONFIG.md`: usar como referencia de forma el `generateProjectConfig()` de `tools/TOOL_CREATE_PROJECT.gs` (líneas ~353-400) **quitando** la tabla "CONFIGURACIÓN DE AUTO-SAVE" hardcodeada — esa tabla es exactamente el problema de duplicación que se corrigió en Sprint 5.

## Decisiones de diseño

- **Almacenamiento local, no Drive** — decisión ya tomada en la planificación de Sprint 5: "el mecanismo de colaboración/Drive se revisa más adelante". Esta skill crea directorios reales en el sistema de archivos del entorno del plugin, no llama a la API de Drive.
- Debe soportar el alcance dual de investigación (compartida en `R_research/` vs. propia de un post en `WP_writing_post/{post_folder}/`) tal como quedó definido en `AUTO_SAVE_CONFIG.yaml` v1.2 y `_system/SPEC_PLUGIN_ARCHITECTURE.md` §5.3 punto 2 — no reintroducir el modelo "toda la investigación es compartida" que se corrigió.
- El mecanismo de detección de errores (carpeta no encontrada → crear antes de escribir, nunca reutilizar/adivinar una carpeta parecida; fallo de permisos → nunca fallback silencioso a la carpeta raíz) debe reflejar `ERROR_HANDLING` de `AUTO_SAVE_CONFIG.yaml` v1.3.

## Fuera de scope

- Sincronización o colaboración vía Google Drive — diferido.
- Migración de proyectos existentes creados con `TOOL_CREATE_PROJECT.gs` al nuevo formato — no es parte de este ticket.
- Lógica de `editor-onboarding` (S6-03) — esta skill puede asumir que existe un `EDITOR_CONFIG` según `_system/templates/TEMPLATE_EDITOR_CONFIG.md`, pero no lo crea ni lo valida en profundidad.
- Contenido de `knowledge-base` (S6-04) — no copiar ni referenciar SAH/CVC en detalle aquí.

## Casos de test obligatorios

1. `skills/project-setup/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas en tercera persona.
2. Ejecución manual: simular la creación de un proyecto de prueba (ej. `project_code: TEST`, `project_name: "Proyecto Piloto"`) y confirmar que se crean exactamente las 6 subcarpetas, con los nombres tomados de `AUTO_SAVE_CONFIG.yaml` (no hardcodeados de nuevo en el `SKILL.md`).
3. Confirmar por lectura del `SKILL.md` que no hay ninguna tabla de rutas/naming duplicada — debe referenciar `AUTO_SAVE_CONFIG.yaml`, no reproducirlo.
4. Confirmar que las instrucciones NO pre-crean subcarpetas de post — solo se crean al guardar el primer artefacto de un post.
5. Confirmar que las instrucciones de manejo de errores coinciden con `ERROR_HANDLING` de `AUTO_SAVE_CONFIG.yaml` v1.3 (nunca fallback silencioso a la carpeta raíz del proyecto).

## Estado de revisión

Aprobado: 2026-09-03
