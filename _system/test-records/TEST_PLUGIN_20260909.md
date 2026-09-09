---
id:          TEST_PLUGIN_20260909
type:        TEST_DOCUMENTATION
subsystem:   SYSTEM
version:     1.0
status:      COMPLETED
created:     2026-09-09
sprint:      sprint-8
---

# TEST DOCUMENTATION: D-X-OPUS Plugin — End-to-End (ejecución 2026-09-09)

**⚠️ NOTA SOBRE EL TIPO DE EJECUCIÓN — leer antes de usar este documento como aprobación:**

Esta no es la ejecución humana que `_system/test-records/TEST_PLUGIN_E2E.md` pide ("Ejecutar este guión con un editor real... es trabajo humano fuera del contrato D-team"). Es un **trazado estático** hecho por el dispatcher: para cada TC, se leyó el contenido real y completo de las skills/hooks/prompts involucrados y se verificó si sus instrucciones, seguidas literalmente, producirían el comportamiento descrito en "Qué debería pasar" — el mismo método de verificación usado para validar cada ticket de Sprint 6-8 antes de mergear, no una conversación real con el plugin instalado.

**Qué sí demuestra:** que las skills y hooks están internamente consistentes entre sí y no tienen una contradicción o hueco obvio.
**Qué NO demuestra:** cómo se comporta un LLM real ejecutando estas instrucciones en una conversación real, con toda la variabilidad que eso implica (interpretación de lenguaje ambiguo, orden real de tool calls, latencia de hooks, etc.).

**Recomendación:** la ejecución humana real sigue siendo necesaria antes de dar Sprint 8 por completamente cerrado (S8-01) — este trazado da alta confianza de que esa ejecución debería ir bien, y ya adelanta el único hallazgo real (TC-6.1).

---

## TEST SUITE 1: SETUP

### TC-1.1 — `editor-onboarding`: crear `EDITOR_CONFIG` desde cero
**Resultado:** ✅ PASS
**Notas:** `skills/editor-onboarding/SKILL.md` PASO 1→5 traza exactamente lo descrito: detecta ausencia de `EDITOR_CONFIG`, pide solo los 3 campos mínimos de `TEMPLATE_EDITOR_CONFIG.md`, copia la estructura completa del template (Información Personal rellena, resto en placeholder), y el CHECKPOINT del PASO 5 impide que se ejecute `project-setup` por su cuenta.

### TC-1.2 — `project-setup`: proyecto de tipo libro
**Resultado:** ✅ PASS
**Notas:** PASO 0 (nuevo, S8-06) verifica `EDITOR_CONFIG` antes de continuar. PASO 3 deriva las 6 subcarpetas leyendo `AUTO_SAVE_CONFIG.yaml` en el momento (`_discovery`, `R_research`, `WB_writing_book`, `WP_writing_post`, `A_activation`, `config`) — confirmado por lectura directa del YAML, no de memoria. `PROJECT_CONFIG.md` (PASO 4) no reproduce ninguna tabla de auto-save. El CHECKPOINT final ofrece las 3 opciones a/b/c sin ejecutar ninguna por su cuenta.

### TC-1.3 — `project-setup`: proyecto de tipo serie de posts
**Resultado:** ✅ PASS
**Notas:** Misma skill, mismo PASO 0-5 — no hay lógica especial de "tipo libro" vs "tipo posts" en `project-setup` (correcto, la distinción la hacen las skills de escritura después).

---

## TEST SUITE 1B: EDITORIAL PROFILE

### TC-1.4 — `editorial-profile`: crear `EDITOR_PROFILE` desde cero
**Resultado:** ✅ PASS
**Notas:** PASO 1 toma `editor_name` de `EDITOR_CONFIG` (creado en TC-1.1). PASO 3 remite a `PROMPT_CREATE_EDITOR_PROFILE.md` + `TEMPLATE_EDITOR_PROFILE.md` sin reproducir su metodología. PASO 5 para y no encadena `project-setup`.

---

## TEST SUITE 2: RESEARCH

### TC-2.1 — `research`: flujo completo hasta el checkpoint obligatorio
**Resultado:** ✅ PASS
**Notas:** `research/PROMPT_SUMMARIZE_REFERENCES.md` v4.3 tiene la sección "CHECKPOINT OBLIGATORIO — NO AVANZAR SIN CONFIRMACIÓN" con las 4 reglas exactas que pide el TC, incluida la regla 4 ("si el editor responde con algo ambiguo... pide que confirme una de las 4 opciones"). `skills/research/SKILL.md` señala explícitamente que no debe repetir ni debilitar ese checkpoint.

### TC-2.2 — HOOK: aprobación editorial antes de `EXECUTE_RESEARCH_PLAN`
**Resultado:** ✅ PASS
**Notas:** Segunda entrada de `hooks/hooks.json` (`PreToolUse`): aprueba de inmediato si no es un `RESEARCH_REPORT` vía `EXECUTE_RESEARCH_PLAN`; si lo es, exige evidencia de aprobación explícita en la conversación, `ask_user` si no la hay, `approve` si la hay. Lógica sin ambigüedad.

---

## TEST SUITE 3: KNOWLEDGE BASE

### TC-3.1 — HOOK: gobernanza SAH/CVC
**Resultado:** ✅ PASS
**Notas:** Primera entrada de `hooks/hooks.json`: aprueba de inmediato cualquier archivo que no sea exactamente uno de los dos protegidos (Parte C ✅). Para Partes A/B, verificado el mecanismo real:
- `RESOURCE_CLAIM_VALIDATION.md` marca explícitamente "Universal Framework... KB-dev only... must NOT modify autonomously" — coincidencia directa con "protegido/universal" tal como lo nombra el hook.
- `RESOURCE_SOURCE_AUTHORITY.md` **no tiene una sección "protegida" nombrada así** — su `CANONICAL UPDATE SCHEMA` solo define Procedimientos A-D (todos aditivos, sobre entradas de fuente). El ejemplo del TC (editar la definición de "TIER CLASSIFICATION SYSTEM") no es protegido *por nombre* en este archivo, pero tampoco es un procedimiento A-D documentado — y el hook tiene una condición OR exactamente para este caso: "si toca contenido protegido/universal, **O** no es claramente una actualización aditiva siguiendo un procedimiento documentado: `ask_user`". Por la segunda rama, el resultado sigue siendo `ask_user` — el hook funciona, pero por una vía distinta a la que el TC describe literalmente para este archivo. Anotado como matiz, no como fallo — el comportamiento final (no aplicar el cambio en silencio) es el correcto.

---

## TEST SUITE 4: WRITING POST

### TC-4.1 — HOOK: prerequisito de investigación antes del `POST_DRAFT`
**Resultado:** ✅ PASS
**Notas:** `writing/post/PROMPT_POST_BRIEF.md` PASO 3B (v1.1) verificado literal: menú a/b/c real, y si se elige (b) registra `research_skipped: true` + `research_skip_reason`. Tercera entrada de `hooks/hooks.json` solo actúa sobre `POST_DRAFT` (no sobre `INVENTARIO_IDEAS` ni otros artefactos intermedios), comprueba investigación compartida o propia del post, y cae a `ask_user` solo si no hay ninguna de las dos ni un skip explícito registrado.

### TC-4.2 — `writing-post` + `shared-writing`: producir el `POST_DRAFT`
**Resultado:** ✅ PASS
**Notas:** `skills/writing-post/SKILL.md` delega explícitamente la redacción final a `shared-writing` (función `WRITE_POST`) — no reimplementa `PROMPT_WRITE_POST.md`. `skills/shared-writing/SKILL.md` confirma que ejecuta el prompt real tal cual, sin añadir/quitar pasos.

### TC-4.3 — `evaluation`: invocar sobre el post producido
**Resultado:** ✅ PASS
**Notas:** `skills/evaluation/SKILL.md` diferencia sin ambigüedad los 5 evaluadores por "pregunta central"; para un post apunta exactamente a `PROMPT_EVALUATE_POST.md`. La sección "Editorial confidence by design" prohíbe explícitamente cualquier gate que bloquee tras un resultado no verde.

---

## TEST SUITE 5: WRITING BOOK

### TC-5.1 — `writing-book`: índice → muestra → capítulo, con auto-evaluación soft
**Resultado:** ✅ PASS
**Notas:** `skills/writing-book/SKILL.md` secuencia índice → muestra/`STYLE_GUIDE_LIBRO` → capítulos, con CHECKPOINT obligatorio entre cada fase. Verificado que `writing/book/PROMPT_WRITE_CHAPTER.md` tiene un PASO 5 real ("Auto-Evaluación con EVALUATE_BOOK_STYLE") — la referencia de la skill no es especulativa.

---

## TEST SUITE 6: ACTIVATION

### TC-6.1 — `activation`: análisis de colección → book brief
**Resultado:** ⚠️ PARCIAL
**Notas:** **Hallazgo real, no relacionado con ningún hook.** `skills/activation/SKILL.md` remite correctamente a `activation/WORKFLOW_ACTIVATION.md` como fuente única del "CHECKPOINT DE ROUTING" (P/L/P+L) — pero ese checkpoint, a diferencia de los demás checkpoints del mismo documento (0.1 a 0.5, 2, 3, 4, N, 5 — todos con sección propia y detallada), **no tiene una sección dedicada**. Solo aparece como una línea dentro de un diagrama ASCII ("`[Editor clasifica seeds: [P] Ruta P / [L] Ruta L / [P+L] ambas]`"), y el propio changelog del documento admite: "mecanismo de clasificación pendiente Sprint 4" — que nunca se retomó. La skill hace lo correcto (no inventa su propia lógica de routing, remite al workflow), pero el workflow mismo no le da instrucciones tan robustas como al resto de fases. Riesgo: un editor real podría recibir una pregunta de routing menos estructurada que el resto de checkpoints del sistema, o en el peor caso que el modelo infiera la clasificación sin preguntar explícitamente (justo lo que el TC pide comprobar que NO pase). El resto del TC (ACTIVATION_CONTEXT, BOOK_BRIEF, evaluación soft con `PROMPT_EVALUATE_ACTIVATION.md`) traza correctamente.

**Recomendación:** candidato a ticket de seguimiento (Sprint 9 o antes) — añadir a `WORKFLOW_ACTIVATION.md` una sección "CHECKPOINT DE ROUTING" con el mismo nivel de detalle que los demás checkpoints del documento.

---

## SIGN-OFF RECORD

### Validación Sprint 8 — Plugin D-X-OPUS (trazado estático)

| Test Suite | TCs | Passed | Failed | Parcial |
|---|---|---|---|---|
| Suite 1: Setup | 3 | 3 | 0 | 0 |
| Suite 1B: Editorial Profile | 1 | 1 | 0 | 0 |
| Suite 2: Research | 2 | 2 | 0 | 0 |
| Suite 3: Knowledge Base | 1 | 1 | 0 | 0 |
| Suite 4: Writing Post | 3 | 3 | 0 | 0 |
| Suite 5: Writing Book | 1 | 1 | 0 | 0 |
| Suite 6: Activation | 1 | 0 | 0 | 1 |
| **Total** | **12** | **11** | **0** | **1** |

**Tester:** Claude (dispatcher, trazado estático — no sustituye la ejecución humana)
**Fecha:** 2026-09-09
**Commit del repo en el momento del test:** `0c1b0ee`
**Entorno de plugin usado:** ninguno instalado — verificación por lectura directa de `skills/*/SKILL.md`, `hooks/hooks.json` y los prompts referenciados.

### Decisión de validación

- [x] ⚠️ **APROBADO CONDICIONAL** — Los 3 hooks y las 10 skills trazan correctamente contra el comportamiento especificado. Un hallazgo menor no relacionado con integridad de datos (TC-6.1, routing de Activation subespecificado en `WORKFLOW_ACTIVATION.md`) queda documentado, no bloquea el uso por editores reales.

**Notas de cierre:**
Este trazado da alta confianza para proceder con la instalación y validación humana real (checklist de prerrequisitos de este mismo guión). El hallazgo de TC-6.1 no afecta a S8-01 (Apps Script) ni a ningún hook — es contenido de `WORKFLOW_ACTIVATION.md` preexistente, fuera del scope de Sprint 8. Recomiendo repetir la ejecución humana real de este guión (con un editor real, en una conversación real con el plugin instalado) antes de aprobar S8-01 definitivamente — este trazado estático reduce el riesgo pero no la sustituye.

---

## NOTAS DE ALCANCE

Idénticas a `TEST_PLUGIN_E2E.md` — este documento no valida S8-02 (empaquetado) ni decide S8-01 (retirada de Apps Script), solo el comportamiento de las skills/hooks tal como están especificados en `main` al commit `0c1b0ee`.

---

*Ejecución archivada — trazado estático por el dispatcher, 2026-09-09. Pendiente: ejecución humana real con el plugin instalado antes de aprobar S8-01.*
