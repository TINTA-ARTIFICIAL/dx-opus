---
id: S9-01
title: Mover contenido exclusivo de subsistema dentro de su carpeta de skill
type: refactor
subsystem: SYSTEM
sprint: 9
status: IN_PROGRESS
priority: P0
depends_on: [S9-08]
blocks: [S9-02, S9-03]
assignee: D-developer
started: 2026-09-10
completed: null
branch: feat/s9-01-move-exclusive-content
---

# S9-01 — Mover contenido exclusivo de subsistema dentro de su carpeta de skill

## Contexto

Ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.b. Contenido usado por una sola skill vive hoy en una carpeta hermana de nivel superior (`research/`, `writing/book/`, parte de `activation/`, parte de `writing/post/`), referenciada con `${CLAUDE_PLUGIN_ROOT}/...`. Moverlo dentro de la propia carpeta de skill elimina la dependencia de esa sustitución para este contenido — sin duplicar nada, porque nadie más lo usa.

**Nota de riesgo, no ocultar:** no está confirmado que esto por sí solo arregle el fallo en sesiones cloud. La evidencia de hoy (issue #63028) apunta a que el plugin entero puede tardar en activarse en cloud (ausente en el primer mensaje, presente en el segundo) — si esa es la causa real, mover archivos de sitio no cambia nada, porque el problema sería de *timing* de carga del plugin, no de qué carpeta cruza. Este ticket es correcto y de bajo riesgo de todas formas (mejor localidad, sin duplicación), pero **la validación real en cloud tras este cambio debe controlar la variable del "segundo mensaje"** antes de concluir si ayudó.

## Interfaces

Mover (git mv, preservando historia):
- `research/*.md` → `skills/research/`
- `writing/book/*.md` → `skills/writing-book/` (o `skills/write-book/` si S9-08 ya se aplicó primero — coordinar orden con S9-08)
- `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md`, `PROMPT_IDENTIFY_NARRATIVE_SEEDS.md`, `PROMPT_CREATE_BOOK_BRIEF.md`, `WORKFLOW_ACTIVATION.md` → `skills/activation/`
- `writing/post/PROMPT_POST_BRIEF.md`, `PROMPT_POST_EXPLORE.md`, `PROMPT_SUMMARIZE_REF.md`, `PROMPT_VERIFY_RESEARCH.md`, `PROMPT_POST_ANGLES.md`, `PROMPT_PLAN_POST.md`, `PROMPT_SPLIT_POST.md` → `skills/writing-post/`

Actualizar en cada `SKILL.md` afectado (`research`, `writing-book`, `activation`, `writing-post`) las rutas de estos archivos movidos — siguen usando `${CLAUDE_PLUGIN_ROOT}/skills/{nombre}/{archivo}.md` (no ruta bare sin prefijo — mantener el único patrón confirmado que funciona en local, ver `docs/DEV_STANDARDS.md` §4).

Actualizar `tools/create-plugin-package.sh` (`INCLUDE_PATHS`): las carpetas `research/`, `writing/book/`, y las entradas sueltas de `activation/`/`writing/post/` movidas dejan de existir como rutas de nivel superior — confirmar que el contenido sigue empaquetándose (ya lo estaría, vía `skills/`).

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

- Se usa `git mv`, no copiar+borrar, para conservar el historial de cada archivo.
- Los archivos que NO son exclusivos (compartidos con otra skill) no se tocan aquí — eso es S9-02/S9-03.
- Tras mover, verificar con el mismo método de hoy (grep de rutas cruzadas) que no queda ninguna referencia rota a la carpeta vieja.

## Fuera de scope

- `evaluation/`, `knowledge-base/`, `writing/shared/`, `editorial-profile/`, `_system/resources/`, `_system/templates/` — contenido compartido, cubierto por S9-02/S9-03/S9-04.
- Renombrar las skills (S9-08) — coordinar orden, no mezclar en el mismo commit si se despachan en paralelo.

## Casos de test obligatorios

1. `tools/create-plugin-package.sh` genera el paquete sin errores tras el `git mv`.
2. Verificación por grep: ningún `SKILL.md` referencia ya `research/`, `writing/book/`, ni las entradas movidas de `activation/`/`writing/post/` fuera de su propia carpeta de skill.
3. Instalación real (local, como mínimo) y ejecución de `research` confirma que `WORKFLOW_RESEARCH.md` se lee desde su nueva ubicación.
4. Contraprueba de cloud: probar en sesión cloud controlando la variable de "primer vs segundo mensaje" (mandar un mensaje trivial antes del real) — documentar el resultado en `_system/test-records/`, sea cual sea.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
