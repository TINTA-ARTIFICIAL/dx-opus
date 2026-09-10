---
id:          SPEC_CLOUD_COMPATIBILITY
type:        SPEC
subsystem:   SYSTEM
version:     0.1
status:      DRAFT
created:     2026-09-10
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Autor | Resumen |
|---------|------|-------|---------|
| v0.1 | 2026-09-10 | system-architecture | Creación inicial, a partir de la primera validación humana real de instalación de Sprint 8 (ver `_system/test-records/TEST_PLUGIN_20260910.md` y ticket S8-08). |

---

# SPEC: Compatibilidad cloud del plugin D-X-OPUS

## 1. Qué problema resuelve este documento

La primera instalación real del plugin (Sprint 8, 2026-09-09/10) reveló que **el plugin funciona de forma fiable en sesiones locales de Claude Desktop, pero no en sesiones cloud/híbridas de Cowork** — con dos síntomas distintos, de causas distintas, que no hay que confundir:

1. Las skills a veces no se invocan en absoluto (routing por lenguaje natural inconsistente, comandos `/plugin:skill` inexistentes por diseño de Cowork — no hay carpeta `commands/`).
2. Cuando SÍ se invocan, no encuentran sus propios archivos de referencia (`research/WORKFLOW_RESEARCH.md`, etc.) en sesiones cloud, aunque el contenido está correctamente empaquetado e instalado — confirmado mirando directamente el disco.

Este documento separa ambos problemas, aporta evidencia externa (issues de GitHub verificados, no solo observación propia) y propone qué corregir en el propio repo frente a qué queda fuera de nuestro control.

## 2. Modelo mental correcto (verificado hoy, no asumido)

Hay **dos rutas de archivos completamente distintas** en el plugin, con comportamiento distinto en cloud:

### 2.a Carpeta de trabajo del editor (`_editor/`, `projects/`)

- Vive en la carpeta que el usuario conecta (hoy: una carpeta de Google Drive sincronizada localmente).
- **Funciona correctamente tanto en local como en cloud.** Confirmado por la documentación oficial de Cowork (`Claude Cowork Architecture Overview`, soporte de Anthropic): una sesión cloud accede a archivos del dispositivo del usuario a través de una conexión intermediada por la app de escritorio, limitada a carpetas que el usuario haya conectado explícitamente. No es acceso directo a filesystem, pero es fiable — y de hecho, en la sesión de validación de hoy, cada artefacto que las skills debían escribir ahí (`EDITOR_CONFIG.md`, `PROJECT_CONFIG.md`, el documento de research) se escribió correctamente, en todas las pruebas, sin importar el modo de sesión.
- **No hace falta rediseñar esta parte.**

### 2.b Contenido propio del plugin (`research/`, `writing/`, `_system/resources/`, etc., referenciado vía `${CLAUDE_PLUGIN_ROOT}`)

- Vive en la caché de plugin, sincronizada por un mecanismo **distinto e independiente** del anterior:
  - Local: `~/Library/Application Support/Claude/local-agent-mode-sessions/{session}/{id}/{cache-dir}/plugin_{ID}/` — verificado hoy directamente en disco, contenido completo y actualizado (v0.3.0).
  - Cloud: `/root/.claude/plugins/synced/{ids}/{plugin-name}/` — confirmado por una sesión cloud que sí resolvió `${CLAUDE_PLUGIN_ROOT}` correctamente.
- **Este es el mecanismo que falla de forma inconsistente en cloud.** No es que el contenido no esté sincronizado (lo hemos visto sincronizado y correcto); es que la sustitución de `${CLAUDE_PLUGIN_ROOT}` y la activación de las skills no son fiables en ese entorno.

## 3. Evidencia externa (bugs conocidos, no exclusivos de este plugin)

Verificado directamente contra GitHub (no solo referido por un agente de investigación):

| Issue | Título | Estado |
|---|---|---|
| [#59713](https://github.com/anthropics/claude-code/issues/59713) | Plugin hooks: CLAUDE_PLUGIN_ROOT not injected into hook subprocess environment | Cerrado por inactividad (`NOT_PLANNED`) — nunca arreglado |
| [#43380](https://github.com/anthropics/claude-code/issues/43380) | Plugin hooks fail: CLAUDE_PLUGIN_ROOT not injected at hook execution time | Cerrado por inactividad |
| [#66557](https://github.com/anthropics/claude-code/issues/66557) | Stop hook: $CLAUDE_PLUGIN_ROOT not injected when running plugin hooks | Cerrado por inactividad |
| [#24529](https://github.com/anthropics/claude-code/issues/24529) | Hook executor doesn't set CLAUDE_PLUGIN_ROOT environment variable | Cerrado por inactividad |
| [#63028](https://github.com/anthropics/claude-code/issues/63028) | Claude Code on the web: declared plugins inactive on first session, require restart to fully load | Cerrado por inactividad |
| [#47179](https://github.com/anthropics/claude-code/issues/47179) | [FEATURE] Add a persistent default output folder setting for Cowork sessions | Cerrado |

Todos cerrados por un bot de inactividad (`NOT_PLANNED`), no porque Anthropic los resolviera — es decir, son bugs reales, reportados por la comunidad, nunca arreglados ni descartados explícitamente.

Dato más útil encontrado en los comentarios de #63028 (usuario `jlgolson`, verificado en una sesión real de claude.ai/code): **en sesión cloud, un plugin declarado se activa, pero solo a partir del segundo mensaje de la conversación — sus skills están ausentes en el primer mensaje.** Pendiente de que el editor lo confirme en nuestro propio entorno (barato de probar: primer mensaje trivial, segundo mensaje el real).

## 4. Qué NO tiene arreglo desde este repo

- No existe ningún campo de manifiesto (`plugin.json`) ni configuración de proyecto para forzar que un plugin concreto se ejecute solo en local — confirmado contra la referencia oficial de plugins. La única palanca es una opción global de la app que desactivaría la nube para todas las sesiones, no solo para DXOPUS.
- No hay forma documentada de que un `SKILL.md` o un hook detecte en tiempo de ejecución si está corriendo en local o en cloud, para al menos degradar con un aviso en vez de fallar en silencio.
- La inyección de `${CLAUDE_PLUGIN_ROOT}` en hooks (vía subproceso de shell) es, según los issues de arriba, un bug de la propia herramienta — no depende de cómo escribamos `hooks/hooks.json`.

## 5. Qué SÍ podemos arreglar en el repo

### 5.a Ya hecho (S8-08, v0.3.0)

Prefijo `${CLAUDE_PLUGIN_ROOT}/` en toda referencia cruzada de carpeta dentro de los `SKILL.md` — es el patrón documentado y correcto; funciona en local (demostrado); en cloud sigue expuesto al bug de arriba mientras Anthropic no lo resuelva.

### 5.b Restructuración de contenido exclusivo (sin coste, sin duplicación)

Mover el contenido que **solo usa una skill** dentro de la carpeta de esa skill, eliminando la necesidad de `${CLAUDE_PLUGIN_ROOT}` para ese contenido (queda relativo a la propia skill, no a la raíz del plugin):

| Carpeta origen | Uso exclusivo de | Destino |
|---|---|---|
| `research/*` | `research` | `skills/research/` |
| `writing/book/*` | `writing-book` | `skills/writing-book/` |
| `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md`, `PROMPT_IDENTIFY_NARRATIVE_SEEDS.md`, `PROMPT_CREATE_BOOK_BRIEF.md`, `WORKFLOW_ACTIVATION.md` | `activation` | `skills/activation/` |
| `writing/post/PROMPT_POST_BRIEF.md`, `PROMPT_POST_EXPLORE.md`, `PROMPT_SUMMARIZE_REF.md`, `PROMPT_VERIFY_RESEARCH.md`, `PROMPT_POST_ANGLES.md`, `PROMPT_PLAN_POST.md`, `PROMPT_SPLIT_POST.md` | `writing-post` | `skills/writing-post/` |

### 5.c Contenido compartido → delegación por skill, no por ruta (sin duplicación)

`evaluation` y `knowledge-base` ya son skills propias. En vez de que `writing-book`, `writing-post` y `activation` lean sus prompts por ruta directa, deben invocarlas con la herramienta `Skill` (mecanismo que sí funciona en cloud, confirmado hoy) y dejar que cada una gestione su propio contenido, ahora auto-contenido dentro de su propia carpeta:

| Carpeta origen | Se convierte en contenido interno de | Quién deja de leerla por ruta directa |
|---|---|---|
| `evaluation/*` | `skills/evaluation/` | `writing-book`, `writing-post`, `activation` (pasan a invocar la skill) |
| `knowledge-base/*` | `skills/knowledge-base/` | `research` (pasa a invocar la skill) |
| `writing/shared/*`, `writing/post/PROMPT_QA_IDEAS.md`, `writing/post/TEMPLATE_POST_SEED.md`, `writing/post/TEMPLATE_POST_BRIEFING.md` | `skills/shared-writing/` | `writing-post`, `activation` (ya la invocan por nombre — confirmar que sea invocación real de skill, no lectura de archivo) |
| `editorial-profile/*` (a confirmar) | `skills/editorial-profile/` | `writing-book` (a confirmar el patrón exacto de su referencia) |

**Nota de diseño:** esto reintroduce, a propósito, un único punto de verdad por capacidad compartida — no es duplicación, es que quien necesita "evaluar" o "consultar autoridad de fuentes" se lo pide a quien lo sabe hacer, en vez de leer sus apuntes por encima del hombro.

### 5.d Config y templates puramente de datos (`_system/resources/`, `_system/templates/`)

No encajan en el patrón "invocar una skill" (no son una capacidad, son datos de referencia). Tres opciones sobre la mesa, pendientes de decidir en el kickoff del sprint:

1. Aceptar exposición al bug en cloud hasta que Anthropic lo resuelva (funcionan en local).
2. Copiarlos a la carpeta de trabajo del editor en el primer arranque (vía `editor-onboarding`/`project-setup`, que ya escriben ahí) — aprovecha que 2.a sí es fiable en cloud. Riesgo bajo de desincronización porque son datos, no lógica versionada con frecuencia.
3. Convertirlos en su propia skill mínima invocable — mismo patrón que 5.c, pero pesado para una simple consulta de configuración.

### 5.e Carpeta `commands/` para invocación `/comando` explícita

Gap de producto real, independiente del bug de cloud: hoy no existe `commands/` en el plugin, así que `/research` como comando tecleado nunca ha sido soportado — solo invocación por lenguaje natural o por la herramienta `Skill`. Diseñar `commands/*.md` que mapeen cada comando a su skill.

## 6. Fuera de scope de este documento

- Retirar Apps Script (S8-01) — depende de que el plugin funcione de forma fiable en producción, este documento es un prerrequisito, no un sustituto.
- El hallazgo de `WORKFLOW_ACTIVATION.md` sin `CHECKPOINT DE ROUTING` (S8-07) — no relacionado con compatibilidad cloud.
- El gap de importación de `EDITOR_PROFILE` existente en `editorial-profile` — no relacionado.
