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

## Sprint 7 — Skills de workflow

Objetivo: migrar los 7 skills restantes (los 6 subsistemas con workflow propio, más `shared-writing` como skill de soporte dedicada) y cerrar la deuda de `PROMPT_EVALUATE_ACTIVATION` arrastrada desde Sprint 4.

| ID | Título | Prioridad | Status | Depende de |
|---|---|---|---|---|
| S7-01 | Skill `research` (+ hook aprobación EXECUTE_RESEARCH_PLAN) | P1 | DONE | — |
| S7-02 | Skill `editorial-profile` | P2 | DONE | — |
| S7-03 | Skill `shared-writing` | P1 | DONE | — |
| S7-04 | Skill `writing-book` | P1 | DONE | — |
| S7-05 | Crear `PROMPT_EVALUATE_ACTIVATION` (contenido, no skill) | P1 | DONE | — |
| S7-06 | Skill `evaluation` | P1 | DONE | S7-05 |
| S7-07 | Skill `writing-post` (+ hook prerequisito de investigación) | P1 | DONE | — |
| S7-08 | Skill `activation` | P2 | DONE | — |

**Sprint 7 completado (2026-09-03).** `S7-03` y `S7-08` necesitaron un reintento cada uno por el mismo fallo de aislamiento intermitente que S6-01 en Sprint 6 — ningún archivo escrito en el primer intento, el segundo operó correctamente. `S7-01` y `S7-07` mergearon con un conflicto real (pero mecánico y sin ambigüedad) en `hooks/hooks.json`: ambos añadían una entrada nueva al mismo array `PreToolUse` — resuelto conservando las tres entradas (knowledge-base de S6-04, EXECUTE_RESEARCH_PLAN de S7-01, prerequisito de investigación de S7-07), verificado con JSON válido y las 3 entradas presentes tras el merge.

**Grafo de dependencias:** una única dependencia real — S7-06 (`evaluation`) necesita que S7-05 (`PROMPT_EVALUATE_ACTIVATION`) exista con contenido real antes de poder darse por completa, porque referencia ese archivo directamente. El resto (S7-01, S7-02, S7-03, S7-04, S7-07, S7-08) son independientes entre sí y de S7-05/S7-06 — pueden despacharse en paralelo. `S7-03` (`shared-writing`) tiene su interfaz pública pre-especificada en el propio ticket precisamente para que `S7-07` y `S7-08` no necesiten esperar a que esté `DONE`.

Dos tickets (`S7-01`, `S7-07`) añaden entradas nuevas a `hooks/hooks.json` — el archivo ya existe desde `S6-04`. Si se despachan en paralelo con otros tickets que también tocan `hooks.json`, el dispatcher debe fusionar las entradas del array, nunca sobrescribir.

---

## Sprint 8 — Validación y corte

Objetivo: probar el plugin en uso real y retirar el sistema Apps Script/Drive.

| ID | Título | Prioridad | Status | Depende de |
|---|---|---|---|---|
| S8-01 | DL de deprecación y retiro de Apps Script | P1 | TODO — **no despachar** hasta confirmar validación real | — |
| S8-02 | Mecanismo real de empaquetado del plugin (issue #77) | P1 | DONE | — |
| S8-03 | Actualizar READMEs | P2 | TODO | S8-01, S8-02 |
| S8-04 | Guión de validación end-to-end del plugin | P1 | DONE | — |

**Nota especial sobre S8-01:** a diferencia de todos los tickets anteriores, este no se despacha solo porque esté `TODO` y sin `depends_on` técnico pendiente — depende de una confirmación humana (validación con editor real usando el guión de S8-04) que no se puede codificar como dependencia entre tickets. `D-dispatcher` debe excluirlo del conjunto listo hasta que el editor lo autorice explícitamente.

**S8-02 y S8-04 completados (2026-09-04).** Ambos agentes originales se interrumpieron por límite de sesión antes de reportar — el dispatcher verificó directamente en cada worktree qué había quedado escrito (S8-02: nada, se relanzó desde cero; S8-04: el documento ya estaba escrito, solo faltaba el commit) en vez de asumir que el trabajo se había perdido. Al revisar S8-04 antes de darlo por bueno, se encontró que el propio ticket había omitido la skill `editorial-profile` de su lista de 9 interfaces — corregido a 10 skills, añadida la Suite 1B que faltaba. **S8-03 queda listo para despachar.**
