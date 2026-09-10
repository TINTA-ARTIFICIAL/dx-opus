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
| S6-02 | Skill `new-project` (nombre original: `project-setup`, renombrada en S9-08) | P1 | DONE | — |
| S6-03 | Skill `setup` (nombre original: `editor-onboarding`, renombrada en S9-08) | P1 | DONE | — |
| S6-04 | Skill `knowledge-base` + hook de gobernanza | P1 | DONE | — |

**Sprint 6 completado (2026-09-03).** S6-01 necesitó un reintento: el primer despacho falló por un conflicto de aislamiento entre el mecanismo automático de worktree del subagente y el worktree que el dispatcher había pre-creado (el agente no escribió nada, se relanzó y el segundo intento sí operó correctamente en la ruta indicada — parece haber sido intermitente, S6-02/03/04 no lo sufrieron con las mismas instrucciones).

**Grafo de dependencias:** ninguno de los cuatro depende de otro — cada uno toca rutas de archivo distintas (`​.claude-plugin/plugin.json`, `skills/new-project/`, `skills/setup/`, `skills/knowledge-base/` + `hooks/hooks.json`) y las interfaces compartidas que necesitan ya existen (`_system/templates/TEMPLATE_EDITOR_CONFIG.md`, `_system/resources/AUTO_SAVE_CONFIG.yaml`). Los cuatro pueden despacharse en paralelo.

---

## Sprint 7 — Skills de workflow

Objetivo: migrar los 7 skills restantes (los 6 subsistemas con workflow propio, más `shared-writing` como skill de soporte dedicada) y cerrar la deuda de `PROMPT_EVALUATE_ACTIVATION` arrastrada desde Sprint 4.

| ID | Título | Prioridad | Status | Depende de |
|---|---|---|---|---|
| S7-01 | Skill `research` (+ hook aprobación EXECUTE_RESEARCH_PLAN) | P1 | DONE | — |
| S7-02 | Skill `editorial-profile` | P2 | DONE | — |
| S7-03 | Skill `shared-writing` | P1 | DONE | — |
| S7-04 | Skill `write-book` (nombre original: `writing-book`, renombrada en S9-08) | P1 | DONE | — |
| S7-05 | Crear `PROMPT_EVALUATE_ACTIVATION` (contenido, no skill) | P1 | DONE | — |
| S7-06 | Skill `evaluation` | P1 | DONE | S7-05 |
| S7-07 | Skill `write-post` (nombre original: `writing-post`, renombrada en S9-08) (+ hook prerequisito de investigación) | P1 | DONE | — |
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
| S8-05 | Hook de bienvenida `SessionStart` + trigger phrases de `setup` (nombre original: `editor-onboarding`, renombrada en S9-08) | P1 | DONE | — |
| S8-06 | `new-project` (nombre original: `project-setup`, renombrada en S9-08) verifica `EDITOR_CONFIG` antes de crear proyecto | P1 | DONE | — |
| S8-07 | Añadir `CHECKPOINT DE ROUTING` a `WORKFLOW_ACTIVATION.md` | P2 | TODO | — |
| S8-08 | Prefijar con `${CLAUDE_PLUGIN_ROOT}` toda ruta fuera de la skill | P0 | DONE | — |

**Nota de seguimiento (S8-06):** el `D-developer` señaló, sin corregirlo por estar fuera del scope literal del ticket, que la sección "FUERA DE SCOPE DE ESTE SKILL" del propio `new-project/SKILL.md` (entonces `project-setup/SKILL.md`) seguía diciendo que la skill "puede asumir que existe" `EDITOR_CONFIG` — contradicho por el PASO 0 nuevo. El dispatcher lo corrigió como parte de la validación antes de mergear (un cambio de una frase para mantener el archivo internamente consistente, no una ampliación de scope).

**Nota especial sobre S8-01:** a diferencia de todos los tickets anteriores, este no se despacha solo porque esté `TODO` y sin `depends_on` técnico pendiente — depende de una confirmación humana (validación con editor real usando el guión de S8-04) que no se puede codificar como dependencia entre tickets. `D-dispatcher` debe excluirlo del conjunto listo hasta que el editor lo autorice explícitamente.

**S8-02 y S8-04 completados (2026-09-04).** Ambos agentes originales se interrumpieron por límite de sesión antes de reportar — el dispatcher verificó directamente en cada worktree qué había quedado escrito (S8-02: nada, se relanzó desde cero; S8-04: el documento ya estaba escrito, solo faltaba el commit) en vez de asumir que el trabajo se había perdido. Al revisar S8-04 antes de darlo por bueno, se encontró que el propio ticket había omitido la skill `editorial-profile` de su lista de 9 interfaces — corregido a 10 skills, añadida la Suite 1B que faltaba. **S8-03 queda listo para despachar** (una vez S8-01 se autorice).

**S8-05 y S8-06 (2026-09-09):** nacen de repasar la experiencia de instalación desde cero — cierran los huecos detectados: sin bienvenida automática al abrir sesión, sin red de seguridad para intención genérica, y `new-project` (entonces `project-setup`) no verificaba `EDITOR_CONFIG` antes de crear un proyecto. Un cuarto hueco (distribución del `.plugin`) no genera ticket — se confirmó que el catálogo de plugins de la organización existe pero está vacío (`ListPlugins`), y publicar ahí es una acción de administración fuera de este backlog; para instalación directa ya alcanza con `tools/create-plugin-package.sh` (S8-02).

**S8-07 (2026-09-09):** nace de la traza de validación E2E del plugin (`_system/test-records/TEST_PLUGIN_20260909.md`, TC-6.1 ⚠️ PARCIAL) — `WORKFLOW_ACTIVATION.md` tiene 11 checkpoints completamente desarrollados pero el "CHECKPOINT DE ROUTING" (elección de Ruta P/L/P+L) solo existe como una anotación en un diagrama, con un pendiente de Sprint 4 nunca resuelto. No bloquea la instalación de hoy — se despachará junto con S8-01/S8-03.

**S8-08 (2026-09-10) — bloqueante, resuelto en vivo:** primera validación humana real de instalación (no la traza estática de S8-04). Se agotaron y descartaron metódicamente: contenido del paquete, campo `skills` del manifiesto, caché de Cowork por nombre de archivo, y estado de sesión desactualizado — cada uno con su propio fix intermedio (ver commits `e0d3ad6`, `8d2bc1f`, `730027b`). La causa raíz real: los `SKILL.md` referencian archivos de otras carpetas del plugin con rutas planas, que en un plugin instalado se resuelven contra el directorio de trabajo del editor, no contra la raíz del plugin. Corregido con el prefijo `${CLAUDE_PLUGIN_ROOT}/` en los 10 `SKILL.md` y en `activation/WORKFLOW_ACTIVATION.md`, y documentado como regla vinculante en `docs/DEV_STANDARDS.md` §4 (v1.1). Confirmado funcionando en sesión local (2026-09-10) — sigue expuesto en sesiones cloud a un bug externo de la herramienta (ver Sprint 9).

---

## Sprint 9 — Compatibilidad cloud y ergonomía de invocación

Objetivo: cerrar la brecha entre "funciona en local" y "funciona en cloud" hallada en la validación de S8-08, y arreglar los gaps de invocación (comandos, frases disparadoras, nombres) detectados en la misma sesión. Diseño completo en `_system/SPEC_CLOUD_COMPATIBILITY.md`.

| ID | Título | Prioridad | Status | Depende de |
|---|---|---|---|---|
| S9-01 | Mover contenido exclusivo de subsistema dentro de su carpeta de skill | P0 | DONE | S9-08 |
| S9-02 | `evaluation`/`knowledge-base` invocadas por skill, no por ruta | P0 | DONE | S9-01 |
| S9-03 | Confirmar y aplicar el patrón a `shared-writing`/`editorial-profile` | P1 | IN_PROGRESS | S9-01 |
| S9-04 | Copiar `AUTO_SAVE_CONFIG.yaml`/templates a la carpeta de trabajo en el primer arranque | P0 | DONE | — |
| S9-05 | Carpeta `commands/` para invocación explícita `/comando` | P1 | DONE | — |
| S9-07 | Ampliar frases disparadoras de `description` en los 10 `SKILL.md` | P1 | DONE | — |
| S9-08 | Renombrar skills a forma de comando (`write-book`, `write-post`, `setup`, `new-project`) | P2 | DONE | — |
| S9-09 | Nota de limitación conocida (primer mensaje) en el hook de bienvenida | P2 | DONE | — |

**S9-06 — reportar a Anthropic el bug de `${CLAUDE_PLUGIN_ROOT}` en cloud — no es un ticket D-team** (acción externa, sin código que implementar ni tests que correr). Issues ya verificados uno a uno y citados en `_system/SPEC_CLOUD_COMPATIBILITY.md` §3: #59713, #43380, #66557, #24529, #63028, #47179, #61485 — todos cerrados por inactividad (`NOT_PLANNED`), nunca resueltos por Anthropic. Pendiente de que el editor decida el canal (`/feedback` dentro de la app, o reabrir alguno de los issues).

**Orden de despacho recomendado:** S9-08 primero (renombrado, toca las mismas carpetas que S9-01/02/03 y conviene no duplicar el `git mv`), luego S9-01, luego S9-02/S9-03 en paralelo (tocan archivos distintos entre sí), S9-04/S9-05/S9-07/S9-09 son independientes y pueden ir en paralelo con cualquiera de los anteriores.

**Hallazgo importante que motiva todo el sprint (2026-09-10):** la carpeta de trabajo del editor (Drive, `_editor/`, `projects/`) ya funciona de forma fiable en cloud — confirmado contra la documentación oficial de arquitectura de Cowork, no hace falta rediseñarla. El problema está acotado al mecanismo de sincronización del propio contenido del plugin (`${CLAUDE_PLUGIN_ROOT}`), que es un bug externo conocido y nunca resuelto por Anthropic, no un error de este repo.
