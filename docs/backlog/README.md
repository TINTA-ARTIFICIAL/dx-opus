# Backlog — D-X-OPUS

Backlog de implementación gestionado bajo el contrato de tickets D-team, orquestado por `D-dispatcher` (subagentes `D-developer`).

**Contexto completo:**
- Arquitectura y decisiones del pivote a plugin: `_system/SPEC_PLUGIN_ARCHITECTURE.md`
- Roadmap de sprints (Sprint 6, 7, 8): `_system/MASTER_PLAN.md`, PARTE 9
- Estándar de desarrollo vinculante para todo ticket: `docs/DEV_STANDARDS.md`

**Estado de aprobación:** los 4 tickets de Sprint 6 fueron aprobados por el editor el 2026-09-03 (`Aprobado: 2026-09-03` en cada ticket) — listos para que `D-dispatcher` los despache.

---

## Sprint 6 — Fundamentos del plugin

Objetivo: validar el patrón de skill/hook con el menor riesgo posible antes de migrar los 6 subsistemas con workflow propio (Sprint 7). Cierra por construcción los issues de GitHub #49, #50 y #65 para cualquier proyecto creado con el plugin (no se parchea el Apps Script existente — ver decisión en `_system/MASTER_PLAN.md` v2.0).

| ID | Título | Prioridad | Status | Depende de |
|---|---|---|---|---|
| S6-01 | Manifest del plugin (`plugin.json`) | P1 | DONE | — |
| S6-02 | Skill `project-setup` | P1 | DONE | — |
| S6-03 | Skill `editor-onboarding` | P1 | DONE | — |
| S6-04 | Skill `knowledge-base` + hook de gobernanza | P1 | DONE | — |

**Sprint 6 completado (2026-09-03).** S6-01 necesitó un reintento: el primer despacho falló por un conflicto de aislamiento entre el mecanismo automático de worktree del subagente y el worktree que el dispatcher había pre-creado (el agente no escribió nada, se relanzó y el segundo intento sí operó correctamente en la ruta indicada — parece haber sido intermitente, S6-02/03/04 no lo sufrieron con las mismas instrucciones).

**Grafo de dependencias:** ninguno de los cuatro depende de otro — cada uno toca rutas de archivo distintas (`​.claude-plugin/plugin.json`, `skills/project-setup/`, `skills/editor-onboarding/`, `skills/knowledge-base/` + `hooks/hooks.json`) y las interfaces compartidas que necesitan ya existen (`_system/templates/TEMPLATE_EDITOR_CONFIG.md`, `_system/resources/AUTO_SAVE_CONFIG.yaml`). Los cuatro pueden despacharse en paralelo.

---

## Sprints 7 y 8

Todavía no desglosados en tickets — se preparan cuando Sprint 6 esté cerrado y validado. Ver `_system/MASTER_PLAN.md` PARTE 9 para el alcance de cada uno a alto nivel.
