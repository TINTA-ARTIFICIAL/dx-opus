---
id:          TEST_PLUGIN_E2E
type:        TEST_DOCUMENTATION
subsystem:   SYSTEM
version:     1.0
status:      TEMPLATE
created:     2026-09-04
sprint:      sprint-8
---

# TEST DOCUMENTATION: D-X-OPUS Plugin — End-to-End

**Purpose:** Guión de validación end-to-end del plugin D-X-OPUS (las 10 skills en `skills/*/SKILL.md` y los 3 hooks en `hooks/hooks.json`), para que lo ejecute un editor real durante Sprint 8 (`_system/MASTER_PLAN.md` PARTE 10, "validar en paralelo con 1-2 editores reales").
**Scope:** Un recorrido completo por el plugin — no cubre el mecanismo de empaquetado/instalación (S8-02, se asume que ya funciona) ni la retirada de Apps Script (S8-01).
**Run before:** Aprobar el uso del sistema nuevo con editores reales, y de nuevo tras cualquier cambio relevante en una skill, un prompt del workflow, o un hook.

---

## ANTES DE EMPEZAR

Este documento está escrito **para ti, el editor** que va a validar el plugin — no es un prompt para Claude, es tu guión de trabajo. Sigue cada caso de test (TC) en orden, en una conversación real con Claude con el plugin D-X-OPUS instalado. No te saltes pasos aunque "sepas" el resultado esperado: el objetivo de este guión es comprobar que el sistema se comporta como se describe, no dar por hecho que lo hace.

### Checklist de prerrequisitos

Antes de arrancar el TEST SUITE 1, confirma:

- [ ] El plugin D-X-OPUS está instalado en tu entorno de Claude (las 10 skills de `skills/` son visibles/invocables y `hooks/hooks.json` está cargado). El mecanismo de instalación en sí es responsabilidad de S8-02 — este guión asume que ya funciona, no lo valida.
- [ ] No existe todavía `_editor/config/EDITOR_CONFIG.md` en tu entorno. Si ya existe de una prueba anterior, muévelo o renómbralo fuera del repo antes de empezar, para poder validar el flujo "desde cero" en TC-1.1.
- [ ] No existe todavía ninguna carpeta en `projects/` con los códigos de proyecto que vas a usar en este guión (`E2ETESTBK` para el libro, `E2ETESTPS` para la serie de posts — ver TC-1.2/TC-1.3). Si existen de una prueba anterior, elimínalas o sustitúyelas por otros códigos en todo el guión.
- [ ] Tienes a mano 2-3 referencias reales (artículos, notas, enlaces) sobre un mismo tema, para usarlas como material de investigación en TEST SUITE 2 y TEST SUITE 4.

### Convención de resultado

Cada TC tiene una casilla de resultado que marcas tú mismo al terminarlo — mismo criterio de casillas que `_system/test-records/TEST_PACKAGE_SYSTEM_E2E.md` (una línea `**Resultado:**` con casillas `[ ]` por TC), con los tres símbolos ya en uso en ese mismo precedente (`✅`/`❌` en su convención de naming de test runs, `✅`/`⚠️`/`❌` en su Sign-off Record):

```
Resultado: [ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL
```

- **✅ PASS** — el sistema hizo exactamente lo descrito en "Qué debería pasar".
- **❌ FAIL** — el sistema no hizo lo descrito (avanzó cuando debía parar, no bloqueó cuando debía bloquear, produjo algo distinto de lo esperado).
- **⚠️ PARCIAL** — el sistema hizo lo correcto pero con fricción, un mensaje confuso, o un paso intermedio no descrito aquí; anótalo en "Notas".

Marca una sola casilla por TC. Si un TC falla, no continúes asumiendo el resto — anota el fallo en "Notas" y decide si tiene sentido seguir con el resto del guión o parar ahí para reportarlo.

---

## TEST SUITE 1: SETUP — `editor-onboarding`, `project-setup`

### TC-1.1 — `editor-onboarding`: crear `EDITOR_CONFIG` desde cero
**Cubre:** Interfaces punto 1.

**Pasos:**
1. En una conversación nueva, escribe algo equivalente a: *"Es la primera vez que uso D-X-OPUS, quiero configurar mi entorno."*
2. Deja que la skill te pida los datos mínimos (nombre, versión del sistema, fecha de setup).
3. Responde con tus datos reales.

**Qué debería pasar:**
- Claude detecta que no existe `_editor/config/EDITOR_CONFIG.md` y pasa directamente a recoger tus datos — no pregunta si quieres sobrescribir nada (esa pregunta solo aplica si ya existiera un `EDITOR_CONFIG.md`).
- Solo pide los campos que `_system/templates/TEMPLATE_EDITOR_CONFIG.md` requiere en su sección "INFORMACIÓN PERSONAL" — no inventa ni pide campos fuera de ese template.
- Genera `_editor/config/EDITOR_CONFIG.md` con la estructura completa del template (todas sus secciones), con "Información Personal" rellena con tus datos y el resto en placeholder.
- Al terminar, presenta un resumen y **para** — no arranca `project-setup` por su cuenta. Te pregunta explícitamente cómo quieres continuar.

**Qué comprobar:**
- [ ] `_editor/config/EDITOR_CONFIG.md` existe y contiene todas las secciones de `TEMPLATE_EDITOR_CONFIG.md`.
- [ ] La sección "Información Personal" tiene tus datos reales; el resto de secciones está en placeholder, sin inventar contenido.
- [ ] Claude se detiene tras el resumen y pregunta cómo continuar — no invoca `project-setup` por iniciativa propia.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

### TC-1.2 — `project-setup`: proyecto de tipo libro
**Cubre:** Interfaces punto 2 (rama libro).

**Pasos:**
1. Pide: *"Quiero crear un proyecto nuevo para un libro. Código: E2ETESTBK, nombre: libro-prueba-e2e."*
2. Si la skill te pide confirmar `project_code`/`project_name` igualmente, confírmalos.

**Qué debería pasar:**
- Crea `projects/E2ETESTBK_libro-prueba-e2e/` en el sistema de archivos local del plugin (no en Google Drive).
- Dentro, crea el conjunto de subcarpetas que resulta de leer, en el momento de ejecutar, `_system/resources/AUTO_SAVE_CONFIG.yaml` (PASO 3 de la skill) — no una lista fija de nombres.
- Genera `PROJECT_CONFIG.md` en la subcarpeta que corresponde a `SYSTEM.PROJECT_CONFIG.folder`, sin ninguna tabla de rutas/naming embebida (esas rutas viven solo en `AUTO_SAVE_CONFIG.yaml`).
- No pre-crea ninguna subcarpeta de post individual dentro de la subcarpeta de posts.
- Al terminar, presenta un resumen (código, nombre, ruta, subcarpetas creadas) y **para** — te pregunta explícitamente cómo continuar (a/b/c), no ejecuta `PROMPT_PROJECT_DISCOVERY` ni ningún workflow por su cuenta.

**Qué comprobar:**
- [ ] `projects/E2ETESTBK_libro-prueba-e2e/` existe con subcarpetas.
- [ ] Las subcarpetas creadas coinciden con el conjunto de valores `folder` distintos para artefactos de proyecto en `_system/resources/AUTO_SAVE_CONFIG.yaml` (ábrelo tú mismo y compáralo — no lo copies de otro sitio).
- [ ] `PROJECT_CONFIG.md` existe, sin tabla de auto-save embebida.
- [ ] Claude se detiene y pregunta cómo continuar, con las 3 opciones descritas en `skills/project-setup/SKILL.md` (o equivalentes).

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

### TC-1.3 — `project-setup`: proyecto de tipo serie de posts
**Cubre:** Interfaces punto 2 (rama serie de posts — proyecto independiente para no mezclar con TC-1.2 en las suites posteriores).

**Pasos:**
1. En una conversación nueva (o tras cerrar el contexto del proyecto anterior), pide: *"Quiero crear un proyecto nuevo para una serie de posts. Código: E2ETESTPS, nombre: posts-prueba-e2e."*

**Qué debería pasar:** Igual que TC-1.2, aplicado a este segundo proyecto — mismo skill, mismo comportamiento, sin distinción especial de "tipo libro" vs "tipo posts" en la estructura de carpetas que crea (`project-setup` crea siempre el mismo conjunto de subcarpetas estándar; la diferencia libro/posts la determinan las skills de escritura que se usen después, no esta).

**Qué comprobar:**
- [ ] `projects/E2ETESTPS_posts-prueba-e2e/` existe con el mismo conjunto de subcarpetas que TC-1.2.
- [ ] `PROJECT_CONFIG.md` de este proyecto es independiente del de TC-1.2 (dos proyectos separados, sin mezclar datos).
- [ ] Claude vuelve a detenerse y preguntar cómo continuar, igual que en TC-1.2.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 1B: EDITORIAL PROFILE — `editorial-profile`

### TC-1.4 — `editorial-profile`: crear `EDITOR_PROFILE` desde cero
**Cubre:** skill `editorial-profile` (no listada en las 9 interfaces originales del ticket S8-04 — vacío de cobertura detectado al revisar este guión, corregido aquí antes de dar el ticket por completo).

**Pasos:**
1. Tras TC-1.1, si `editor-onboarding` te señaló que no tienes `EDITOR_PROFILE`, pide: *"Quiero definir mi perfil editorial."*
2. Responde a las preguntas sobre tu voz/estilo con datos reales o plausibles.

**Qué debería pasar:**
- Claude usa `editorial-profile/PROMPT_CREATE_EDITOR_PROFILE.md` y rellena `editorial-profile/TEMPLATE_EDITOR_PROFILE.md` completo — sin inventar secciones fuera del template.
- Genera `_editor/profiles/EDITOR_PROFILE_{tu_nombre}.md`.
- Al terminar, presenta un resumen y **para** — no arranca `project-setup` ni ningún workflow por su cuenta.

**Qué comprobar:**
- [ ] `_editor/profiles/EDITOR_PROFILE_{tu_nombre}.md` existe con la estructura completa del template.
- [ ] Claude se detiene tras el resumen y pregunta cómo continuar.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 2: RESEARCH — `research`, hook de aprobación de `EXECUTE_RESEARCH_PLAN`

### TC-2.1 — `research`: flujo completo hasta el checkpoint obligatorio
**Cubre:** Interfaces punto 3.

**Pasos:**
1. Dentro del proyecto `E2ETESTBK` (TC-1.2), pide: *"Quiero investigar sobre [elige un tema real] para mi libro. Aquí tienes mis referencias: [pega tus 2-3 referencias]."*
2. Deja que Claude invoque la skill `research`, que a su vez lee y ejecuta `research/PROMPT_SUMMARIZE_REFERENCES.md`.
3. Observa el proceso hasta que declare generados los tres artefactos de Fase 1.

**Qué debería pasar:**
- Genera y auto-guarda `REFERENCE_SUMMARY`, `RESEARCH_PLAN` y `NARRATIVE_BRIDGE` en la subcarpeta de research del proyecto.
- Al terminar de generarlos, **PARA** — no continúa solo hacia Fase 2 (`PROMPT_UPDATE_VALIDATION_CHECKLIST`), Fase 3 (anotación manual) ni Fase 4 (deep dive o plan detallado). Presenta las opciones de cierre del propio prompt (CHECKPOINT OBLIGATORIO v4.3) y espera tu respuesta.
- Si respondes de forma ambigua (p.ej. *"sigue", "lo que tú veas"*), no lo interpreta como autorización para avanzar de fase — te pide que confirmes una opción concreta.

**Qué comprobar:**
- [ ] Los tres artefactos existen en la carpeta de research del proyecto.
- [ ] Claude se detiene tras generarlos y presenta opciones explícitas, sin avanzar de fase por su cuenta.
- [ ] Al responder con un "sigue" ambiguo, Claude vuelve a pedir que elijas una opción concreta en vez de avanzar.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

### TC-2.2 — HOOK: aprobación editorial antes de `EXECUTE_RESEARCH_PLAN` (hook 2 de 3)
**Cubre:** Interfaces punto 3 (checkpoint del plan de investigación), Decisiones de diseño (tercer hook explícito).

**Pasos:**
1. **Sin** haber ejecutado de verdad `PROMPT_CREATE_RESEARCH_PLAN.md` ni haber aprobado explícitamente un `RESEARCH_PLAN_DETAILED` y unas `WRITING_INSTRUCTIONS_ADAPTED` en esta conversación, pide directamente: *"Ejecuta el plan de investigación y escribe el RESEARCH_REPORT."* — forzando que Claude intente producir un `RESEARCH_REPORT` vía `PROMPT_EXECUTE_RESEARCH_PLAN.md`.

**Qué debería pasar:**
- Antes de que la escritura del `RESEARCH_REPORT` se aplique, el segundo hook `PreToolUse` de `hooks/hooks.json` intercepta: comprueba si en la conversación hay evidencia de que aprobaste explícitamente ambos documentos de planificación. Como no la hay, responde `ask_user` — Claude te pregunta por esa aprobación en vez de escribir el archivo directamente.

**Qué comprobar:**
- [ ] La escritura del `RESEARCH_REPORT` no se aplica en silencio.
- [ ] Claude se detiene y pregunta explícitamente por la aprobación de `RESEARCH_PLAN_DETAILED`/`WRITING_INSTRUCTIONS_ADAPTED` en vez de asumir que existe.
- [ ] **Contraprueba:** ejecuta de verdad `PROMPT_CREATE_RESEARCH_PLAN.md` (o simula su output) y declara explícitamente en el chat que apruebas ambos documentos. Repite la petición de escribir el `RESEARCH_REPORT` y confirma que esta vez el hook responde `approve` y la escritura se aplica sin preguntas adicionales.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 3: KNOWLEDGE BASE — hook de gobernanza SAH/CVC

### TC-3.1 — HOOK: gobernanza de ediciones a `RESOURCE_SOURCE_AUTHORITY.md`/`RESOURCE_CLAIM_VALIDATION.md` (hook 1 de 3)
**Cubre:** Interfaces punto 4, Decisiones de diseño (primer hook explícito).

**Pasos — Parte A (edición a contenido protegido):**
1. Pide a Claude: *"Edita `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md` y cambia la definición de la sección 'TIER CLASSIFICATION SYSTEM' para añadir un Tier 4."*

**Pasos — Parte B (edición aditiva legítima, contraprueba):**
2. Pide: *"Añade una nueva fuente Tier 2 al Topic 1 (Digitalization & Digital Transformation) de `RESOURCE_SOURCE_AUTHORITY.md`, siguiendo el procedimiento de su CANONICAL UPDATE SCHEMA para añadir una fuente."*

**Pasos — Parte C (alcance del hook, contraprueba):**
3. Pide una edición cualquiera a un archivo que no sea ninguno de los dos protegidos — por ejemplo, edita `PROJECT_CONFIG.md` de tu proyecto de prueba para añadir una nota.

**Qué debería pasar:**
- **Parte A:** el primer hook `PreToolUse` de `hooks/hooks.json` reconoce que el archivo objetivo es `RESOURCE_SOURCE_AUTHORITY.md`, lee su `CANONICAL UPDATE SCHEMA`, identifica que "TIER CLASSIFICATION SYSTEM" es contenido protegido/universal (no un procedimiento A-D de contenido de topic), y responde `ask_user`, explicando qué sección detectó como protegida y por qué. Claude no aplica la edición directamente.
- **Parte B:** el hook reconoce que es una actualización aditiva de contenido de topic que sigue el schema y sus procedimientos documentados, y responde `approve` — la edición se aplica sin fricción.
- **Parte C:** el hook aprueba de inmediato, sin ningún análisis ni pregunta relacionada con SAH/CVC — este hook no aplica a ningún otro archivo del sistema.

**Qué comprobar:**
- [ ] La edición de la Parte A no se aplica sin preguntar; Claude explica qué sección detectó como protegida.
- [ ] La edición aditiva de la Parte B se aplica sin bloqueo ni pregunta innecesaria.
- [ ] La edición de la Parte C (archivo ajeno a SAH/CVC) no dispara ninguna pregunta relacionada con este hook.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 4: WRITING POST — `writing-post`, `shared-writing`, hook de prerequisito de investigación, `evaluation`

### TC-4.1 — HOOK: prerequisito de investigación antes del `POST_DRAFT` (hook 3 de 3)
**Cubre:** Interfaces punto 5, Decisiones de diseño (segundo hook explícito).

**Pasos:**
1. Dentro del proyecto `E2ETESTPS` (TC-1.3), sin haber generado ni cargado ningún `RESEARCH_DEEP_DIVE`/`RESEARCH_REPORT` (ni compartido del proyecto ni propio de este post) y sin haber confirmado explícitamente saltarte la investigación, arranca una sesión de post: *"Quiero escribir un post sobre [tema]."*
2. Cuando `PROMPT_POST_BRIEF` (PASO 3B) te pregunte cómo continuar al no encontrar investigación, **no respondas con la opción (b)** — responde de forma ambigua (p.ej. *"sigue nomás"*) o ignora la pregunta y pide directamente: *"Escribe ya el borrador final del post."*

**Qué debería pasar:**
- Primero, `PROMPT_POST_BRIEF` PASO 3B debería haberte parado y preguntado explícitamente (a/b/c) al no encontrar investigación — comprueba esto como parte del mismo TC.
- Si aun así se llega a un intento de escritura del `POST_DRAFT` sin evidencia de investigación ni un skip explícito registrado (`research_skipped: true`), el tercer hook `PreToolUse` de `hooks/hooks.json` intercepta esa escritura concreta (comprueba primero que el artefacto objetivo es realmente un `POST_DRAFT`, no cualquier otro artefacto del workflow POST) y responde `ask_user`, explicando que falta investigación previa y que no hay constancia de que decidieras conscientemente prescindir de ella.

**Qué comprobar:**
- [ ] `PROMPT_POST_BRIEF` PASO 3B te pregunta explícitamente (opciones a/b/c) al no encontrar investigación.
- [ ] Si fuerzas el borrador final sin confirmar (b) explícitamente, el hook detiene la escritura del `POST_DRAFT` y pregunta, en vez de guardarlo directamente.
- [ ] **Contraprueba:** responde ahora (b) con una razón explícita. Confirma que la decisión queda registrada (`research_skipped: true` + razón) y que una segunda petición de escribir el borrador ya no dispara el hook (responde `approve`).

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

### TC-4.2 — `writing-post` + `shared-writing`: producir el `POST_DRAFT` (con investigación)
**Cubre:** Interfaces puntos 5 y 6.

**Pasos:**
1. En una sesión nueva del mismo proyecto `E2ETESTPS`, procesa primero un mínimo de investigación para este post (usa la skill `research` sobre el mismo tema, o confirma que ya exista un `RESEARCH_DEEP_DIVE` compartido o propio del post).
2. Arranca la sesión de post de nuevo: *"Quiero escribir un post sobre [el mismo tema]."*
3. Recorre con normalidad el flujo que orienta `writing-post` (brief, fuentes si aplica, verificación, Q&A de posicionamiento o su skip explícito, ángulos, arquitectura) hasta obtener el `POST_SEED`.
4. Con el `POST_SEED` ya generado, pide explícitamente: *"Escribe ya el borrador final del post."*

**Qué debería pasar:**
- Esta vez, PASO 3B encuentra investigación y continúa con normalidad, sin preguntar por el skip.
- `writing-post` recorre el flujo delegando en la skill `shared-writing` (función `WRITE_POST`) para el borrador final — no reimplementa `PROMPT_WRITE_POST.md` por su cuenta.
- El hook de prerequisito de investigación (TC-4.1) responde `approve` esta vez, y el `POST_DRAFT` se guarda en la carpeta del post sin fricción.

**Qué comprobar:**
- [ ] El `POST_SEED` se genera antes de pedir el borrador final.
- [ ] El `POST_DRAFT` final existe en la carpeta del post dentro del proyecto.
- [ ] Es reconocible (explícito en la respuesta de Claude, o claro por el resultado) que la escritura final se delegó a `shared-writing`, no una reimplementación directa de `writing-post`.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

### TC-4.3 — `evaluation`: invocar sobre el post producido
**Cubre:** Interfaces punto 7.

**Pasos:**
1. Con el `POST_DRAFT` de TC-4.2 ya generado, pide: *"Evalúa este post"* o *"dame feedback de calidad de este post."*

**Qué debería pasar:**
- Claude identifica que corresponde `evaluation/PROMPT_EVALUATE_POST.md` (no otro evaluador) y lo ejecuta.
- Devuelve un `EVALUATION_RESULT` con los campos de `evaluation/RESOURCE_EVALUATION_FRAMEWORK.md` (`status` GREEN/YELLOW/RED, `score`, `decision_guidance`, `blocking_issues`, `improvement_areas`, `strengths`).
- Si el resultado no es GREEN, Claude no bloquea ni impide que continúes — te muestra el feedback y la decisión sigue siendo tuya (filosofía "confianza editorial, no gate técnico").

**Qué comprobar:**
- [ ] Se usó `PROMPT_EVALUATE_POST.md` (no `PROMPT_EVALUATE_BOOK_CONTENT.md` ni otro evaluador).
- [ ] El resultado sigue el contrato `EVALUATION_RESULT` (los seis campos, `strengths` con al menos 2 items).
- [ ] Un resultado no verde no te impide seguir trabajando ni exige tu aprobación para continuar.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 5: WRITING BOOK — `writing-book`

### TC-5.1 — `writing-book`: índice → muestra → capítulo, con auto-evaluación soft
**Cubre:** Interfaces punto 8.

**Pasos:**
1. En el proyecto `E2ETESTBK` (TC-1.2), con la investigación de TC-2.1 ya disponible, pide: *"Quiero escribir un libro sobre [el tema investigado], créame el índice."*
2. Deja que `writing-book` ejecute `writing/book/PROMPT_CREATE_BOOK_INDEX.md` y produzca el `BOOK_INDEX`. Confirma que Claude para tras presentarlo y pregunta cómo seguir.
3. Aprueba el índice y pide el capítulo de muestra: *"Aprobado, dame el capítulo de muestra."*
4. Deja que ejecute `writing/book/PROMPT_WRITE_SAMPLE_CHAPTER.md` y produzca `SAMPLE_CHAPTER` + `STYLE_GUIDE_LIBRO`. Confirma que vuelve a parar.
5. Aprueba y pide el primer capítulo: *"Escribe el capítulo 1."*
6. Deja que ejecute `writing/book/PROMPT_WRITE_CHAPTER.md`.

**Qué debería pasar:**
- Cada fase respeta el checkpoint obligatorio de `writing-book` — presenta el output y para, sin encadenar automáticamente la fase siguiente, aunque respondas de forma ambigua.
- `PROMPT_WRITE_CHAPTER.md` invoca en su PASO 5 una auto-evaluación de estilo (referenciando `evaluation/PROMPT_EVALUATE_BOOK_STYLE.md`) como instrucción **soft, no bloqueante**: un resultado no positivo no te impide seguir o iterar.

**Qué comprobar:**
- [ ] `BOOK_INDEX` generado y aprobado antes de continuar con el capítulo de muestra.
- [ ] `SAMPLE_CHAPTER` + `STYLE_GUIDE_LIBRO` generados y aprobados antes de continuar con el capítulo 1.
- [ ] El capítulo 1 se genera con evidencia de que se invocó la auto-evaluación de estilo (soft) de su PASO 5.
- [ ] En ningún momento el sistema avanza de fase sin tu confirmación explícita.
- [ ] Un resultado de auto-evaluación no positivo no bloquea que continúes con el capítulo.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## TEST SUITE 6: ACTIVATION — `activation`

### TC-6.1 — `activation`: análisis de colección → book brief, con evaluación soft de `PROMPT_EVALUATE_ACTIVATION`
**Cubre:** Interfaces punto 9.

**Pasos:**
1. Con el material producido en TC-5.1 (o cualquier colección de prueba equivalente, p.ej. el `BOOK_INDEX` + capítulo 1), pide: *"Quiero activar este libro, dame ideas para posts o un nuevo libro a partir de él."*
2. Deja que `activation` ejecute `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md` (Fase 0) y produzca `ACTIVATION_CONTEXT`.
3. Deja que continúe con `activation/PROMPT_IDENTIFY_NARRATIVE_SEEDS.md` (Fase 1) hasta el checkpoint de routing.
4. En el checkpoint de routing, elige explícitamente Ruta L: *"Quiero explorar la ruta de un nuevo libro."*
5. Deja que ejecute `activation/PROMPT_CREATE_BOOK_BRIEF.md` y produzca el `BOOK_BRIEF`.
6. Pide una evaluación: *"Evalúa este book brief."*

**Qué debería pasar:**
- `ACTIVATION_CONTEXT` y las semillas narrativas se generan antes del checkpoint de routing; Claude no decide la ruta (P/L/P+L) por su cuenta, te pregunta explícitamente.
- Al elegir Ruta L, se produce el `BOOK_BRIEF` vía `PROMPT_CREATE_BOOK_BRIEF.md`.
- La evaluación del `BOOK_BRIEF` usa `evaluation/PROMPT_EVALUATE_ACTIVATION.md` (no otro evaluador) y es una invocación soft — un resultado no GREEN no bloquea que sigas.

**Qué comprobar:**
- [ ] `ACTIVATION_CONTEXT` generado en la subcarpeta de activation del proyecto.
- [ ] El checkpoint de routing te pregunta explícitamente entre Ruta P / Ruta L / Ruta P+L, no lo decide solo.
- [ ] `BOOK_BRIEF` generado tras elegir Ruta L.
- [ ] La evaluación del `BOOK_BRIEF` usa `PROMPT_EVALUATE_ACTIVATION.md` y no bloquea continuar si el resultado no es GREEN.

**Resultado:** `[ ] ✅ PASS   [ ] ❌ FAIL   [ ] ⚠️ PARCIAL`
**Notas:** _______________________________________________

---

## SIGN-OFF RECORD

### Validación Sprint 8 — Plugin D-X-OPUS

| Test Suite | TCs | Passed | Failed | Parcial |
|---|---|---|---|---|
| Suite 1: Setup (editor-onboarding, project-setup) | 3 | ___ | ___ | ___ |
| Suite 1B: Editorial Profile (editorial-profile) | 1 | ___ | ___ | ___ |
| Suite 2: Research (research, hook EXECUTE_RESEARCH_PLAN) | 2 | ___ | ___ | ___ |
| Suite 3: Knowledge Base (hook gobernanza SAH/CVC) | 1 | ___ | ___ | ___ |
| Suite 4: Writing Post (writing-post, shared-writing, hook research, evaluation) | 3 | ___ | ___ | ___ |
| Suite 5: Writing Book (writing-book) | 1 | ___ | ___ | ___ |
| Suite 6: Activation (activation) | 1 | ___ | ___ | ___ |
| **Total** | **12** | **___** | **___** | **___** |

**Tester:** ___________________________
**Fecha:** ___________________________
**Commit del repo en el momento del test:** ___________________________
**Entorno de plugin usado (versión/paquete instalado):** ___________________________

### Decisión de validación

- [ ] ✅ **APROBADO** — Todos los TCs críticos (incluidos los 3 de hook) pasaron.
- [ ] ⚠️ **APROBADO CONDICIONAL** — Fallos menores documentados, no bloquean el uso por editores reales.
- [ ] ❌ **BLOQUEADO** — Fallos críticos (en particular, cualquier hook que no intercepta cuando debería, o que bloquea cuando no debería) deben resolverse antes de seguir con la validación humana.

**Notas de cierre:**
___________________________________________________________________
___________________________________________________________________

---

## NOTAS DE ALCANCE

- Este documento no valida el mecanismo de empaquetado/instalación del plugin (S8-02) — asume que el plugin ya está instalado y operativo.
- Este documento no decide si/cuándo se retira Apps Script (S8-01) — solo valida que el sistema nuevo funciona como está especificado.
- Ejecutar este guión con un editor real, y archivar la copia completada, es trabajo humano fuera del contrato D-team (ver ticket S8-04, "Fuera de scope"). Esta plantilla es el artefacto que ese trabajo humano usa, no un sustituto de él.
- Guarda la copia completada de cada ejecución como `_system/test-records/TEST_PLUGIN_[FECHA].md`, siguiendo el mismo criterio de archivo que `_system/test-records/TEST_PACKAGE_SYSTEM_E2E.md`.

---

*Este documento debe completarse y archivarse cada vez que se ejecute con un editor real durante Sprint 8.*
