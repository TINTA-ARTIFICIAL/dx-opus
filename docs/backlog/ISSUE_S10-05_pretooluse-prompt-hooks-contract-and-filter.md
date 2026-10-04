---
id: S10-05
title: Hooks PreToolUse de tipo prompt — respetar el contrato de respuesta real y filtrar por ruta
type: fix
subsystem: SYSTEM
sprint: 10
status: TODO
priority: P0
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S10-05 — Hooks `PreToolUse` de tipo `prompt`: contrato de respuesta real y filtro por ruta

## Contexto

Bug detectado en uso real (editor Marco Laucelli, 2026-10-04, v0.4.0): al escribir `_discovery/PROJECT_NOTES.md`, el hook de `RESEARCH_REPORT` razonó que "approval should be granted" y aun así bloqueó la escritura y detuvo el turno. Además, los tres hooks se evalúan en **cada** `Write`/`Edit` de cualquier archivo aunque solo apliquen a tres artefactos. `PROJECT_NOTES.md` es el primer artefacto de todo proyecto: el fallo afecta a cualquier editor desde el primer proyecto.

**Causa raíz verificada contra la documentación oficial de Claude Code** (`hooks-guide.md`, sección "Prompt-based hooks", 2026-10-04) — el reporte acertó en el síntoma pero la causa no es el razonamiento del modelo, sino que los tres hooks nunca respetaron el contrato:

1. **Formato de respuesta.** Un hook `type: "prompt"` solo puede devolver JSON: `{"ok": true}` o `{"ok": false, "reason": "..."}`. Los tres prompts de `hooks/hooks.json` piden las palabras sueltas `approve` / `ask_user` y no mencionan JSON ni `ok` (comprobado). `approve` y `ask_user` no existen en el contrato; una respuesta no conforme no equivale a `ok: true`, y por eso un razonamiento correcto ("debería aprobarse") termina en bloqueo. *Inferencia razonada, no probada en vivo:* la doc no detalla cómo se trata una respuesta no conforme; hay que confirmarlo en el caso de test 1.
2. **`ok: false` en `PreToolUse` deniega la herramienta y, por defecto, termina el turno** (la `reason` aparece como aviso en el chat). Explica "detuvo la escritura". Existe `continueOnBlock: true`, que devuelve la `reason` a Claude como error de herramienta para que ajuste y siga. Ese es el comportamiento que pretendía `ask_user`: parar, preguntar al editor, reintentar.
3. **Placeholder.** La doc define `$ARGUMENTS` como marcador del JSON de entrada del hook. Los prompts usan `$TOOL_INPUT`, que la doc no menciona (la entrada se envía igualmente al modelo, pero el marcador probablemente llega como texto literal).
4. **Filtrado.** Todos los hooks con el mismo `matcher` corren en paralelo y `matcher` solo filtra por nombre de herramienta. La doc ofrece el campo `if` ("sintaxis de reglas de permisos", p. ej. `Edit(*.ts)`) **a nivel de cada handler y para todos los tipos de hook**: el hook solo se ejecuta si la llamada coincide con el patrón.

**Por qué esto no se vio antes:** hasta S9-10 (`hooks.json` sin el envoltorio `"hooks"`), estos hooks **nunca se cargaron** en ninguna instalación real. Se activaron por primera vez en v0.4.0 y es la primera vez que se exponen al contrato real. Los escribimos (S6-04, S7-01, S7-07) y `docs/DEV_STANDARDS.md` §8 los prescribe en términos de `approve`/`ask_user`, sin haberlos ejecutado nunca contra el runtime.

## Interfaces

`hooks/hooks.json`, para cada uno de los 3 hooks `PreToolUse`:

1. **Contrato.** Reescribir cada prompt para responder únicamente `{"ok": true}` o `{"ok": false, "reason": "<mensaje al editor en lenguaje de tarea, DEV_STANDARDS §6>"}`. Sustituir `approve` → `{"ok": true}` y `ask_user` → `{"ok": false, "reason": ...}`. Sustituir `$TOOL_INPUT` por `$ARGUMENTS`.
2. **`continueOnBlock: true`** en los tres, de modo que un bloqueo devuelva la `reason` a Claude como error de herramienta y este pregunte al editor en vez de terminar el turno (verificar que el campo existe en la versión de Claude Code objetivo; la doc lo sitúa desde v2.1.210).
3. **Filtro por ruta con `if`**, de modo que el modelo solo se invoque para los artefactos afectados (patrones derivados de `_system/resources/AUTO_SAVE_CONFIG.yaml`, no inventados):
   - Hook 1 (gobernanza SAH/CVC): `RESOURCE_SOURCE_AUTHORITY.md` y `RESOURCE_CLAIM_VALIDATION.md`.
   - Hook 2 (aprobación previa a `RESEARCH_REPORT`): archivos `*_R_REPORT_*` (en `R_research/` y, con scope de post, dentro de `WP_writing_post/`).
   - Hook 3 (prerrequisito de investigación del `POST_DRAFT`): archivos `*_WP_POST_*`.
   Un hook con `if` por patrón por handler (dos entradas si el patrón no admite alternativas). Con esto el prompt de cada hook deja de necesitar su guarda "si no es X, responde approve inmediatamente".
4. **`docs/DEV_STANDARDS.md` §8 (Hooks)**: reemplazar la regla de `approve`/`ask_user` por el contrato real (`ok`/`reason`, `continueOnBlock`, `if`, `$ARGUMENTS`) y añadir que un hook no se da por bueno hasta ejecutarse contra el runtime real.

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

- **Alternativa del reporte (hook `command` que filtra por ruta y deja el prompt solo para los afectados): descartada a favor de `if`.** El resultado es el mismo (el modelo solo se invoca para los archivos afectados) sin añadir un script, sin un tercer hook por cada uno y sin lógica de rutas duplicada en shell. Se recupera como plan B solo si el test 5 muestra que `if` no casa con las rutas de la carpeta de trabajo en Cowork; en ese caso, un hook `command` puede decidir de forma determinista (`permissionDecision` `allow`/`ask`/`deny`) y lanzar el juicio solo cuando proceda.
- Los hooks 2 y 3 siguen siendo `prompt` porque deciden con evidencia de la conversación ("¿aprobó el editor el plan?"), que no es determinista. El hook 1 también (decide si una edición toca contenido protegido).
- Las `reason` se redactan en lenguaje de tarea (DEV_STANDARDS §6): lo lee el editor, no un desarrollador.
- **Pregunta abierta, no se resuelve aquí:** el hook 1 vigila `skills/knowledge-base/RESOURCE_*.md`, que en una instalación real viven en la caché de solo lectura del plugin, no en la carpeta de trabajo; en la práctica solo protege el repo de desarrollo. Decidir en este ticket si se conserva (guardia de desarrollo) o se mueve fuera del paquete instalable.
- **Mitigación inmediata disponible:** como estos hooks nunca estuvieron activos antes de v0.4.0, retirarlos temporalmente (dejando solo `SessionStart`) en una v0.4.1 restituye el comportamiento efectivo anterior mientras se hace el arreglo completo.

## Fuera de scope

- Rediseñar qué comprueba cada hook (su lógica de negocio: aprobación del plan, investigación previa, protección SAH/CVC).
- Cambiar el hook `SessionStart` (S10-01).

## Casos de test obligatorios

El sandbox de desarrollo no tiene sesión autenticada, así que los hooks `prompt` no se pueden ejecutar aquí; los casos 1-5 son pruebas **humanas en sesión real** y deben quedar registradas en `_system/test-records/`. Lo verificable en el sandbox: casos 6-7.

1. Escribir `_discovery/PROJECT_NOTES.md` → no se ejecuta ningún hook, escritura aplicada, turno intacto (caso del reporte).
2. Escribir un `*_R_REPORT_*` sin aprobación previa del plan → `ok: false`; Claude recibe la `reason`, pregunta al editor y el turno **no termina**.
3. Lo mismo con aprobación explícita en la conversación → `ok: true`, escritura aplicada sin preguntas.
4. Escribir un `*_WP_POST_*` sin investigación ni `research_skipped` registrado → pregunta; con investigación o skip registrado → pasa.
5. Confirmar que `if` casa con las rutas reales de la carpeta de trabajo en Cowork (Drive); si no, activar el plan B.
6. `claude plugin validate . --strict` pasa con los nuevos campos (`if`, `continueOnBlock`).
7. `grep -n "approve\|ask_user\|TOOL_INPUT" hooks/hooks.json` → sin coincidencias.

## Estado de revisión

PENDIENTE — esperando confirmación del editor sobre: `continueOnBlock` + `reason` al editor como sustituto de `ask_user`, `if` en lugar del hook `command` propuesto, y si se publica una v0.4.1 que retire los hooks mientras tanto.
