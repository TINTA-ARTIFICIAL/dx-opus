---
id:          DEV_STANDARDS
type:        SCHEMA
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-09-03
updated:     2026-09-03
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-09-03 | system-architecture | Creación inicial — estándar vinculante para D-dispatcher/D-developer al implementar el backlog de `docs/backlog/`. |

---

# DEV_STANDARDS — D-X-OPUS

Este documento es la autoridad de estilo para cualquier `D-developer` que implemente un ticket de `docs/backlog/`. `D-dispatcher` debe pasarlo como contexto a cada subagente que lance, y comprobarlo al validar cada entrega.

No sustituye a los estándares ya existentes del sistema — los referencia. No dupliques contenido de los documentos citados aquí; si necesitas el detalle, léelos.

---

## 1. Dos sistemas de metadata distintos — no los confundas

- **Artefactos del sistema DX-OPUS** (prompts, workflows, resources, templates, schemas — el contenido que consumen los editores) usan la cabecera YAML de `_system/RESOURCE_ARTIFACT_HEADER_STANDARD.md` (`id, type, subsystem, version, status, created, updated, owner_chat`).
- **Tickets de backlog** (`docs/backlog/ISSUE_*.md`) usan un frontmatter distinto, propio del contrato D-team (`id, title, type, subsystem, sprint, status, priority, depends_on, blocks, assignee, started, completed, branch` — ver `docs/backlog/README.md`). Aquí `type` no es el mismo enum que en artefactos del sistema (PROMPT/WORKFLOW/...) — en un ticket describe la naturaleza del trabajo (`infra`, `skill`, `hook`, `content`).

No mezcles ambos esquemas en un mismo archivo.

## 2. Naming de archivos

Sigue `_system/NAMING_CONVENTION_ANALYSIS.md`. Regla crítica que ya aplica a todo este repo: **sin versión en el nombre de archivo** — la versión vive en la cabecera YAML y en el CHANGELOG interno.

## 3. Fuente única de verdad — la regla que más ha costado en este repo

Sprint 5 completo se fue en gran parte en arreglar registros duplicados que se desincronizaron sin que nadie se diera cuenta: `AUTO_SAVE_CONFIG.yaml` tenía una copia embebida y obsoleta en `ARQUITECTURA_AUTO_SAVE_GENERICA.md`, y otra tercera copia, también obsoleta, hardcodeada en `TOOL_CREATE_PROJECT.gs`.

**Regla:** si el dato que vas a escribir ya existe en otro archivo del repo, no lo copies — referencia el archivo original por su ruta. Esto aplica en particular a:

- Rutas y naming de artefactos → `_system/resources/AUTO_SAVE_CONFIG.yaml` es la única fuente
- Estructura de subsistemas → `_system/SCHEMA_SYSTEM_ARCHITECTURE.md`
- Decisiones arquitectónicas → `_system/decisions/` (una DL por decisión, nunca reescritas en prosa en otro sitio)

Si tu ticket te pide crear una skill que necesita ese dato, el `SKILL.md` debe decir "lee `_system/resources/AUTO_SAVE_CONFIG.yaml`", nunca reproducir su contenido.

## 4. Dónde vive el plugin — no dupliques contenido en `skills/*/references/`

Ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` §8 para el razonamiento completo. Regla operativa:

- El root del plugin es el root de este repo. `research/`, `writing/`, `evaluation/`, `activation/`, `editorial-profile/`, `knowledge-base/` **no se mueven ni se copian**.
- Un `SKILL.md` es un archivo nuevo y corto: metadata (`name`, `description` con frases disparadoras concretas en tercera persona) + instrucciones de cuándo usar cada prompt existente **por su ruta real** (`research/PROMPT_CREATE_RESEARCH_PLAN.md`, no una copia en `skills/research/references/PROMPT_CREATE_RESEARCH_PLAN.md`).
- Si un ticket de skill te pide crear una carpeta `references/` con contenido copiado de otro sitio del repo, es una señal de que el ticket está mal escrito — para y pregunta antes de duplicar.

## 5. Formato de skill (Cowork plugin)

Cada skill sigue el schema estándar de Cowork:

```
skills/{nombre}/
└── SKILL.md
```

Frontmatter obligatorio:
```yaml
---
name: nombre-en-kebab-case
description: >
  Descripción en tercera persona, con frases disparadoras concretas entre
  comillas — "esto se activa cuando el usuario dice X", no una frase vaga.
metadata:
  version: "0.1.0"
---
```

Cuerpo: instrucciones **para Claude**, en imperativo/infinitivo ("Lee el archivo...", no "Deberías leer..."). No es documentación para que la lea un humano.

## 6. El patrón de checkpoint obligatorio

Cualquier skill o prompt que pueda decidir autónomamente "cuál es el siguiente paso" en nombre del editor debe pararse y preguntar, nunca inferir y ejecutar. Este patrón ya está implementado dos veces en el repo — úsalo como referencia exacta de tono y estructura, no reinventes el formato:

- `research/PROMPT_SUMMARIZE_REFERENCES.md` v4.3, sección "CHECKPOINT OBLIGATORIO — NO AVANZAR SIN CONFIRMACIÓN"
- `writing/post/PROMPT_POST_BRIEF.md` v1.1, PASO 3B

Si tu ticket implica que la skill podría continuar sola hacia otro paso del workflow, necesita este mismo tipo de bloque explícito.

## 7. Hooks

- Prefiere hooks **prompt-based** (`type: "prompt"`) cuando la decisión requiere juicio (¿esta edición toca una sección protegida?). Usa **command-based** (`type: "command"`) solo para checks deterministas que no requieren interpretación.
- Nunca hardcodees rutas absolutas — usa `${CLAUDE_PLUGIN_ROOT}`.
- Un hook `PreToolUse` con matcher `Write|Edit` se dispara para **cualquier** escritura de la sesión, no solo las relacionadas con tu ticket. El prompt del hook debe comprobar explícitamente la ruta del archivo objetivo (viene en `$TOOL_INPUT`) y solo bloquear/preguntar cuando corresponda — `approve` en cualquier otro caso. Un hook que bloquea de más es tan grave como uno que no protege nada.

## 8. Verificación (no hay suite de tests automatizada)

Este repo no tiene tests ejecutables tradicionales — es contenido en Markdown/YAML/JSON más lógica de skills. La verificación es manual, pero **no es opcional ni informal**. Por tipo de ticket:

- **Manifest / config (`plugin.json`, `hooks.json`, YAML)** → debe parsear sin error. Pega el comando exacto que usaste para comprobarlo (ej. `python3 -c "import json; json.load(open('...'))"`, o `ruby -ryaml -e "..."` si es YAML — este repo no tiene un `python3` de sistema fiable, usa `ruby` para YAML como se hizo en Sprint 5) y su salida en el ticket o en el reporte de la rama.
- **Skill (`SKILL.md`)** → verificación manual contra el checklist del validador de plugins: `.claude-plugin/plugin.json` existe y es JSON válido; `name` es kebab-case; cada subcarpeta de skill referenciada tiene su `SKILL.md`; el `SKILL.md` no duplica contenido que ya existe en otro sitio del repo (regla 3/4). Documenta explícitamente que hiciste esta comprobación, no la des por hecha.
- **Hook** → validar el JSON, y trazar manualmente el escenario que el hook debe capturar (ej.: simular una edición a una sección protegida y confirmar, leyendo el prompt del hook, que llevaría a `block` o `ask_user`).
- **Contenido de prompt** (cuando un ticket sea escribir/editar un `PROMPT_*.md`) → seguir tú mismo el proceso descrito paso a paso con un caso de ejemplo y confirmar que el resultado es el esperado.

## 9. Commits y ramas

- Rama por ticket: `feat/{id}-{slug}` (ej. `feat/s6-01-plugin-manifest`).
- Mensaje de commit sigue la convención ya activa en este repo (ver `README.md`):
  ```
  [SUBSISTEMA] tipo: descripción corta
  ```
  Tipos: `feat | fix | refactor | docs | chore`. Para tickets de Sprint 6, el subsistema es `SYSTEM`.

## 10. Cuándo hace falta una DL entry

Si tu implementación se desvía de lo que `_system/SPEC_PLUGIN_ARCHITECTURE.md` ya decidió — no solo lo completa, sino que lo contradice o añade una decisión nueva no prevista — no lo hagas en silencio. Repórtalo en tu entrega para que `D-dispatcher` lo escale; no crees tú mismo la DL entry sin que el editor la apruebe (ver `_system/SCHEMA_DECISION_LOG.md`).
