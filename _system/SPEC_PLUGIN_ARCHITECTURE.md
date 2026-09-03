---
id:          SPEC_PLUGIN_ARCHITECTURE
type:        SPEC
subsystem:   SYSTEM
version:     0.4
status:      DRAFT
created:     2026-09-03
updated:     2026-09-03
owner_chat:  system-architecture
---

# SPEC — Arquitectura de plugin DX-OPUS (Cowork)

## CHANGELOG

* v0.4 (2026-09-03) — Corrección: la investigación no es *solo* compartida — un post puede tener research propia además de la compartida del proyecto. `R_research/` sigue siendo la ruta por defecto (scope compartido); research específica de un post pasa a vivir en su propia carpeta de `WP_writing_post/` (`AUTO_SAVE_CONFIG.yaml` v1.2). Actualizado §5.3 item 2 en consecuencia.
* v0.3 (2026-09-03) — Aclarado el alcance del hook de prerequisito de research (§5.3, item 2): la investigación es compartida a nivel de proyecto, no por post — confirma por qué `R_research/` se queda con naming plano mientras `WP_writing_post/` sí necesitó subcarpetas por post (issue #74).
* v0.2 (2026-09-03) — Resueltas las dos preguntas abiertas de v0.1: `PROMPT_QA_IDEAS` confirmado como shared (ver DL_20260416_SYSTEM_025, sección "CORRECCIÓN"), `shared-writing` confirmada como skill dedicada. Estado sigue en DRAFT — falta convertirse en DL formal (S5-14).
* v0.1 (2026-09-03) — Primer borrador. Spike de diseño Sprint 5 (S5-12/S5-13/S5-14). Mapeo completo de dependencias entre los ~55 artefactos del sistema, producido leyendo cada prompt/workflow/resource completo (no solo grep). Estado: DRAFT — pendiente de validación con el editor antes de convertirse en DL formal y en implementación (Sprint 6+).

---

## 1. Objetivo y alcance

Definir cómo DX-OPUS se reorganiza como plugin de Claude Cowork, sustituyendo el modelo actual (prompts distribuidos vía copia manual a Project Knowledge + Apps Script/Drive para la gestión de carpetas) por skills nativas del plugin.

**Alcance de este documento:** decisión de arquitectura y mapeo de dependencias. **No incluye implementación** — eso es Sprint 6+, según lo acordado en la planificación del Sprint 5.

**Decisión de storage ya tomada** (conversación de planificación 2026-09-03): los artefactos de producción viven localmente en el plugin por defecto. El mecanismo de colaboración/Drive se revisa más adelante — no es parte de este documento.

---

## 2. Cómo se hizo el mapeo

Se leyeron completos los ~55 artefactos del sistema (todos los `PROMPT_*`, `WORKFLOW_*`, `RESOURCE_*`, `GUIDE_*`, `TEMPLATE_*`, `SPEC_*`, `CONTEXT_*` de los 8 subsistemas) y se extrajo cada referencia explícita de un artefacto a otro, clasificada como:

- **INPUT** — la salida del referenciado es un input requerido
- **PREREQUISITE** — exige que el referenciado ya se haya ejecutado antes
- **INVOKES** — lo invoca/delega directamente en medio de su flujo
- **SHARED** — ambos usan el referenciado como componente común
- **REFERENCE_ONLY** — lo menciona por contexto, sin dependencia funcional

El detalle completo (tabla artefacto por artefacto, ~150 filas) vive en el registro de la sesión de planificación; este documento consolida solo lo que importa para decidir arquitectura: **las dependencias que cruzan subsistemas**, porque las dependencias internas a un subsistema quedan resueltas por construcción (todas caen dentro de la misma skill).

---

## 3. Mapeo propuesto: subsistema → skill

| Subsistema/función | Skill propuesta | Naturaleza |
|---|---|---|
| RESEARCH | `research` | Workflow completo, con KB embebido como referencia de lectura |
| EDITORIAL PROFILE | `editorial-profile` | Workflow de onboarding + recurso de config por editor |
| WRITING (book) | `writing-book` | Workflow |
| WRITING (post) | `writing-post` | Workflow |
| WRITING (shared: WRITE_POST, CREATE_TIMELINE, CREATE_CAST, PROMPT_QA_IDEAS, TEMPLATE_POST_SEED, TEMPLATE_POST_BRIEFING) | `shared-writing` | Skill dedicada (fuente única), invocada por `writing-post` y `activation` — no diseñada para triggering directo del usuario |
| EVALUATION | `evaluation` | Workflow invocable, un skill con las 4 (pronto 5) evaluaciones |
| ACTIVATION | `activation` | Workflow |
| KNOWLEDGE BASE (SAH, CVC, FOCUS_TYPES) | `knowledge-base` | **Nueva decisión** (ver sección 5.1): promovida a skill propia en vez de duplicarse dentro de `research` |
| Setup de proyecto (reemplaza `TOOL_CREATE_PROJECT.gs` + `PROMPT_PROJECT_DISCOVERY`) | `project-setup` | Acción iniciada por el usuario/sistema al arrancar un proyecto |
| Onboarding de editor (reemplaza `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`) | `editor-onboarding` | Acción única por editor |

**Total: 9 skills.** DOCS y SYSTEM no se convierten en skills — son documentación de desarrollo del propio plugin, no capacidades que el editor invoque.

---

## 4. Marco de decisión: qué mecanismo usa cada tipo de dependencia cruzada

| Tipo de dependencia encontrada | Mecanismo en el plugin | Por qué |
|---|---|---|
| INPUT/OUTPUT no declarado como obligatorio | Ninguno especial | El skill de destino busca el artefacto si existe; no hay riesgo si falta |
| INVOKES declarado "obligatorio" pero es un **gate de calidad/evaluación** | Instrucción soft en el SKILL.md, sin hook | `RESOURCE_EVALUATION_FRAMEWORK` ya documenta que un resultado RED **no bloquea físicamente** continuar — la obligatoriedad es de confianza editorial por diseño. Convertirlo en hook cambiaría el comportamiento actual, no solo lo migraría |
| PREREQUISITE declarado "obligatorio" cuya omisión causa **daño real** (dato perdido, integridad rota, contenido publicado sin validar) | **HOOK `PreToolUse`** — bloquea o pide confirmación (`ask_user`) | Ver lista priorizada en 5.3 |
| INVOKES opcional/sugerido dentro del flujo conversacional (ej. "¿Quieres que ejecute EVALUATE_POST?") | Skill-calls-skill vía instrucción en el SKILL.md — el editor decide | No hay riesgo en que el modelo lo sugiera y el editor decline |
| SHARED — mismo contenido/lógica usado por 2+ skills, y es sustancial o cambia seguido | Skill dedicada (`shared-writing`), invocada explícitamente por las que lo consumen | Evita tener dos fuentes de verdad del mismo prompt (ej. `PROMPT_WRITE_POST` v2.1 con auto-save) |
| SHARED — mismo contenido pero pequeño y estable | Duplicar en `references/` de cada skill consumidora | Simplicidad; el coste de mantener sincronía manual es bajo si cambia poco |
| SHARED — **datos de runtime específicos del editor** (perfil editorial, config) | No se duplica ni convierte en skill de contenido — cada skill lee el archivo de datos real (`EDITOR_CONFIG`) en tiempo de ejecución | Es información del editor, no lógica del sistema — distinto problema al de contenido compartido |
| Contradictorio / declarado pero roto en la práctica hoy | **No se migra tal cual** — requiere decisión explícita antes de construir la skill (ver 5.2) | Migrar un bug documentado al plugin lo perpetúa con más fricción para corregirlo después |
| Referencia a un artefacto que no existe formalmente (dependencia fantasma) | Se resuelve por construcción al implementar la skill correspondiente | Ej. `PROJECT_CONFIG.md`/`TOOL_CREATE_PROJECT` que hoy no existen como artefactos formales quedan cubiertos nativamente por `project-setup` |
| Bloqueado por un artefacto del backlog aún no creado | No requiere nueva decisión — ya está en Sprint 5 (PARTE 9 de MASTER_PLAN) | Ej. `PROMPT_EVALUATE_ACTIVATION` (S5-18) |

---

## 5. Hallazgos que preceden a la decisión de plugin

Estos no son problemas del *diseño* del plugin — son problemas *ya presentes* en el sistema actual que el mapeo hizo visibles. Migrarlos sin corregirlos los perpetúa.

### 5.1 Knowledge Base pasa de "recurso embebido" a skill propia

Decisión revisada respecto a la propuesta original (donde KB vivía como `references/` dentro de `research`): `RESOURCE_SOURCE_AUTHORITY` y `RESOURCE_CLAIM_VALIDATION` tienen una relación de **gobernanza cruzada** — KB define el esquema canónico, pero es `research` (vía `PROMPT_UPDATE_VALIDATION_CHECKLIST`) quien escribe actualizaciones de vuelta. Ambos recursos declaran explícitamente secciones que "Research must NOT modify... autonomously" — la misma clase de riesgo que el bug #66 (RESEARCH_PLAN editado sin autorización). Si KB fuera solo contenido duplicado dentro de `research`, no hay frontera técnica que proteja esas secciones.

**Decisión: KB es su propia skill**, con un hook `PreToolUse` que bloquea/pide confirmación antes de escribir en las secciones protegidas del framework universal. `evaluation` la lee también (input de `PROMPT_EVALUATE_RESEARCH_REPORT`).

### 5.2 Dependencias contradictorias que necesitan decisión explícita, no migración automática

| Caso | Problema | Resolución |
|---|---|---|
| `WORKFLOW_ACTIVATION` invoca `PROMPT_QA_IDEAS` como si fuera compartido | **RESUELTO (2026-09-03).** No era una contradicción de diseño sino un vacío de coordinación entre dos DLs: `DL_20260411_ACTIVATION_022` (status INTEGRATED, 11/04) ya había decidido que QA_IDEAS es shared, y `CONTEXT_ACTIVATION` v1.3 lo integró el 12/04. `DL_20260416_SYSTEM_025` (16/04, status OPEN) reabrió la misma pregunta como "pendiente Sprint 4" sin cruzar referencia con `DL_022`. Corrección aplicada en `DL_025` (ver nota "CORRECCIÓN 2026-09-03" en ese archivo): `DL_022` es la decisión vigente, QA_IDEAS es shared y entra en la skill `shared-writing` desde el diseño inicial. Deuda técnica separada: el archivo sigue físicamente en `writing/post/`, no en `writing/shared/` — pendiente de mover (relacionado con issue #77) |
| Numeración de DL entries | `SCHEMA_DECISION_LOG` v2.2 dice numeración **por subsistema** (decisión tomada en `DL_027`), pero `TEMPLATE_SUBSYSTEM_CONTEXT`, `CONTEXT_RESEARCH` y `CONTEXT_KNOWLEDGE_BASE` siguen diciendo **global** — el cambio de `DL_027` nunca se propagó a esos tres documentos | No es decisión — es corrección directa. Se puede resolver ya, fuera de este spike (ticket aparte) |
| `RESOURCE_BOOK_TYPES` (A–G) vs `RESOURCE_RESEARCH_FOCUS_TYPES` (A–G) | Taxonomías paralelas mantenidas de forma independiente, sin importación formal. La tabla de compatibilidad de `RESOURCE_BOOK_TYPES` omite el Tipo G, y una tabla interna usa 6 tipos donde otra usa 7 | Corrección de contenido, no de arquitectura — candidato a ticket independiente |
| `PROMPT_EVALUATE_BOOK_STYLE` vs `PROMPT_WRITE_PROLOGUE` | El evaluador de estilo valida adherencia al `STYLE_GUIDE_LIBRO`, pero `PROMPT_WRITE_PROLOGUE` declara explícitamente que el prólogo **no debe** seguir el `STYLE_GUIDE_LIBRO` (voz 100% del editor) — criterios en tensión directa | Corrección de contenido en uno de los dos prompts |

### 5.3 Candidatos a hook, priorizados por riesgo real

1. **Gobernanza de KB** (5.1) — evita reescritura no autorizada del framework universal. Directamente relacionado con #66.
2. **`RESEARCH_DEEP_DIVE` como prerequisito antes de escribir POST** — issue #63, ya en el backlog de Sprint 5 (S5-06). El hook vive naturalmente en `writing-post`. **Alcance del check aclarado (2026-09-03):** la investigación tiene dos alcances posibles — compartida a nivel de proyecto (una serie de N posts se alimenta de un único `RESEARCH_DEEP_DIVE`/`RESEARCH_REPORT` en `R_research/`, caso por defecto) o específica de un post (un post concreto necesita profundizar por su cuenta, y ese artefacto vive dentro de la carpeta de ese post en `WP_writing_post/`, no en `R_research/` — ver `AUTO_SAVE_CONFIG.yaml` v1.2). El hook debe verificar que exista *al menos un* artefacto de research válido para ese post, ya sea el compartido del proyecto o uno propio del post.
3. **Aprobación editorial antes de `PROMPT_EXECUTE_RESEARCH_PLAN`** — hoy es un checklist de prosa ("Do not proceed without approved planning documents") sin verificación real de que el editor aprobó, solo de que el archivo existe.
4. **Aprobación editorial antes de reescribir un artefacto ya aprobado** — forma general del bug #66, aplica potencialmente a cualquier skill que reescriba un artefacto existente.
5. **Verificación de escritura exitosa en `project-setup`** (relacionado con #49/#50/#65) — no es exactamente una dependencia cruzada, pero es la misma familia de problema: un `PostToolUse` que confirme que la escritura ocurrió donde debía, en vez de fallar en silencio.

### 5.4 Nombres confusamente parecidos (consolidado)

1. `PROMPT_SUMMARIZE_REF` (writing/post) vs `PROMPT_SUMMARIZE_REFERENCES` (research) — issue #62 confirmado; el radio se amplía porque `PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION` se autodescribe como "hermano conceptual" del mismo prompt
2. `TEMPLATE_EDITOR_NOTES` vs `GUIDE_EDITOR_NOTES` — mismo tema, mismo día de creación, distinguibles solo por el prefijo de tipo
3. `TEMPLATE_EDITOR_PROFILE` / `PROMPT_CREATE_EDITOR_PROFILE` / instancia final `EDITOR_PROFILE_[NOMBRE]` — tres nombres para un mismo clúster funcional
4. `PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION` vs nombre fantasma `ANALYZE_BOOK_FOR_ACTIVATION` (prompt ya reemplazado pero sigue mencionado en changelogs)
5. `PROMPT_EVALUATE_BOOK_CONTENT` vs `PROMPT_EVALUATE_BOOK_STYLE` — mismo objeto evaluado, invocados en el mismo punto exacto del workflow
6. Mención a `"EVALUATE_POST_CONTENT"` en `PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION` — no corresponde a ningún ID real, parece fusión accidental
7. `PROMPT_POST_BRIEF` / `TEMPLATE_POST_BRIEFING` / `PROMPT_CREATE_BOOK_BRIEF` — raíz "BRIEF" repartida entre WRITING y ACTIVATION con significados distintos
8. Nombres legacy conviviendo con los canónicos sin actualizar: `ESTILO_EDITORIAL_TINTA_ARTIFICIAL`/`TIPOS_LIBROS_TINTA_ARTIFICIAL` siguen citados en `PROMPT_CREATE_BOOK_INDEX`, `PROMPT_CREATE_BOOK_SHEET`, `PROMPT_WRITE_INTRODUCTION`, `PROMPT_WRITE_SAMPLE_CHAPTER`, `PROMPT_CREATE_TIMELINE`, `PROMPT_CREATE_CAST`, en vez de `RESOURCE_EDITORIAL_STYLE`/`RESOURCE_BOOK_TYPES`

Al construir las skills, cada uno de estos pares vive en un archivo físicamente distinto dentro de una skill distinta — reduce la confusión estructuralmente, pero no la elimina; siguen valiendo un renombrado de contenido.

### 5.5 Dependencia fantasma

`PROMPT_WRITE_POST` v2.1 declara el auto-save como funcionalidad central, dependiente de detectar `PROJECT_CONFIG.md` y de `TOOL_CREATE_PROJECT` — **ninguno de los dos existe como artefacto formal del sistema** (no tienen `id` YAML, no están en ningún inventario). El propio prompt admite un fallback silencioso ("AUTO-SAVE NO DISPONIBLE en esta sesión") — la misma raíz que el bug de pérdida de datos #65. Se resuelve por construcción: `project-setup` asume esta responsabilidad de forma nativa y verificable.

---

## 6. Preguntas abiertas

Ambas preguntas de la v0.1 quedaron resueltas en la sesión de planificación (2026-09-03):

1. ~~`WORKFLOW_ACTIVATION` ↔ `PROMPT_QA_IDEAS`~~ — resuelto, ver sección 5.2. `DL_022` manda, QA_IDEAS es shared.
2. ~~Contenido de `shared-writing`: skill dedicada vs. duplicar~~ — resuelto: **skill dedicada**, una sola fuente de verdad.

Quedan solo las notas para el futuro, sin decisión pendiente en este spike:

- **Interfaz propia del plugin**: fuera de scope. Cualquier decisión de skill boundary aquí debe ser compatible con exponer eventualmente una interfaz dedicada en vez de depender solo de Cowork.
- **Colaboración/Drive**: diferido explícitamente — no se resuelve en este documento.

---

## 7. Siguiente paso

Con las respuestas a la sección 6, este documento pasa a DL formal (S5-14) y a `MASTER_PLAN.md`. La implementación (crear los `.claude-plugin/`, `skills/*/SKILL.md`, hooks) es Sprint 6+, no este sprint.
