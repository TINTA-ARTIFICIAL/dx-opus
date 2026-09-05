---
id:          SCHEMA_SYSTEM_ARCHITECTURE
type:        SCHEMA
subsystem:   SYSTEM
version:     1.5
status:      ACTIVE
created:     2026-02-21
updated:     2026-09-03
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.5 | 2026-09-03 | system-architecture | Corrección sobre v1.4: la afirmación de que el plugin "solo instala .claude-plugin/, skills/ y hooks/" era incorrecta — los SKILL.md referencian contenido fuera de esas carpetas por diseño (root del plugin = root del repo). Movidos los 6 CONTEXT_*.md de subsistema a `{subsistema}/dev/` (issue #77, reabierto y corregido) para que la exclusión de contenido de desarrollo del paquete instalable sea estructural (carpeta), no un patrón de nombre a recordar. PARTE 8 actualizada con el límite de empaquetado real. |
| v1.4 | 2026-09-03 | system-architecture | Añadida PARTE 8: arquitectura de plugin (Sprint 6-7 — 9 skills, 3 hooks). PARTE 4 actualizada: PROMPT_QA_IDEAS añadido como prompt compartido (ya formalizado por DL_022, expuesto por la skill `shared-writing`). PARTE 6 (árbol del repo) refrescada: `.claude-plugin/`, `skills/`, `hooks/`, `docs/backlog/`, `docs/DEV_STANDARDS.md` añadidos; marcadores `[pendiente]` obsoletos limpiados (GUIDE_ANNOTATION_PHASE3, WORKFLOW_WRITING v2.0, writing/post/, PROMPT_EVALUATE_BOOK_STYLE v1.1, PROMPT_CREATE_BOOK_BRIEF ya existen). |
| v1.3 | 2026-03-30 | JM | EVALUATE_BOOK_STYLE moved from Editorial Profile to Evaluation (DL_20260330_SYSTEM_004). Updated subsystem descriptions and evaluator map. |
| v1.2 | 2026-02-21 | JM | Removed versions from all filenames in repo tree |
| v1.1 | 2026-02-21 | JM | Moved shared prompts to /writing/shared/ — Writing is owner |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  []
outputs: []
calls:   []

## DESCRIPTION
Mapa completo del sistema D-X-OPUS: 8 subsistemas, sus componentes, interfaces entre subsistemas, flujos principales y artefactos compartidos.

---

# SCHEMA: SYSTEM ARCHITECTURE
## D-X-OPUS — Arquitectura del Sistema

---

## PARTE 1: VISIÓN GENERAL

D-X-OPUS es un sistema de escritura no-ficción asistida por IA. Cubre el proceso completo desde la investigación de un tema hasta la publicación de contenido derivado, incluyendo libros, posts y propuestas de nuevos proyectos.

**Filosofía de diseño:**
- Modular: cada subsistema evoluciona de forma independiente
- Orientado al editor: la IA asiste, el editor decide en cada checkpoint
- Basado en evidencia: todo claim tiene fuente verificada
- Reproducible: el mismo proceso produce resultados consistentes entre proyectos

**Dos espacios de trabajo:**
- **Sistema** (GitHub `dx-opus`): prompts, workflows, recursos, guías — reutilizables entre proyectos
- **Proyecto** (Google Drive `[COD]_[Nombre]`): artefactos de producción — específicos de cada libro

---

## PARTE 2: MAPA DE SUBSISTEMAS

```
╔══════════════════════════════════════════════════════════════════════╗
║  SUBSISTEMA 0: SYSTEM                                                ║
║  Arquitectura · Estándares · Naming · Decisiones · TOOLING           ║
║  Owner: system-architecture chat                                     ║
╚══════════════════════╦═══════════════════════════════════════════════╝
                       ║ define contratos y estándares para todos
        ╔══════════════╬══════════════════╗
        ▼              ▼                  ▼
╔═══════════════╗ ╔══════════════╗ ╔═════════════════════╗
║  SUB 1:       ║ ║  SUB 5:      ║ ║  SUB 3:             ║
║  KNOWLEDGE    ║ ║  EVALUATION  ║ ║  EDITORIAL PROFILE  ║
║  BASE         ║ ║              ║ ║                     ║
║               ║ ║  Contrato de ║ ║  EDITOR_PROFILE     ║
║  SAH · CVC    ║ ║  evaluación  ║ ║  EDITORIAL_STYLE    ║
║  FOCUS_TYPES  ║ ║              ║ ║  BOOK_TYPES         ║
║               ║ ║  EVAL_RSRCH  ║ ║                     ║
║  UPDATE_      ║ ║  EVAL_BOOK_C ║ ║  Output:            ║
║  VALIDATION   ║ ║  EVAL_BOOK_S ║ ║  EDITOR_PROFILE     ║
║               ║ ║  EVAL_POST*  ║ ║  activo             ║
║  Output:      ║ ║  EVAL_ACT*   ║ ╚═════════════════════╝
║  SAH+CVC      ║ ╚══════════════╝         ║
║  versionados  ║        ║ contrato        ║ perfil activo
╚═══════════════╝        ║                 ║
        ║ recursos       ║                 ║
        ▼                ▼                 ▼
╔══════════════════════════════════════════════════════╗
║  SUBSISTEMA 2: RESEARCH                              ║
║                                                      ║
║  SUMMARIZE_REFERENCES                                ║
║  RESEARCH_DEEP_DIVE                ← RAMA A          ║
║  CREATE_RESEARCH_PLAN  ─► reads FOCUS_TYPES          ║
║  EXECUTE_RESEARCH_PLAN             ← RAMA B          ║
║  ← calls EVAL_RESEARCH (Sub 5)                       ║
║  ← calls UPDATE_VALIDATION (Sub 1)                   ║
║                                                      ║
║  Input opcional: BOOK_BRIEF (de Sub 6)               ║
║  Output: RESEARCH_REPORT(s) | RESEARCH_DEEP_DIVE     ║
╚══════════════════════════════════════════════════════╝
        ║ research outputs
        ▼
╔══════════════════════════════════════════════════════╗
║  SUBSISTEMA 4: WRITING                               ║
║                                                      ║
║  [Decisión editor: BOOK | POST]                      ║
║                                                      ║
║  RAMA BOOK:                                          ║
║    CREATE_BOOK_INDEX · WRITE_SAMPLE_CHAPTER          ║
║    WRITE_CHAPTER · WRITE_INTRODUCTION                ║
║    WRITE_PROLOGUE · CREATE_BOOK_SHEET                ║
║    CONSOLIDATE_REFERENCES                            ║
║    CREATE_TIMELINE* · CREATE_CAST*  ← shared        ║
║    ← calls EVAL_BOOK_STYLE (Sub 5)                   ║
║    ← calls EVAL_BOOK_CONTENT (Sub 5)                 ║
║                                                      ║
║  RAMA POST (pendiente diseño):                       ║
║    PLAN_POST · WRITE_POST*          ← shared         ║
║    ← calls EVAL_POST (Sub 5)                         ║
║                                                      ║
║  Output: libro completo | post publicable            ║
╚══════════════════════════════════════════════════════╝
        ║ libro/textos producidos
        ▼
╔══════════════════════════════════════════════════════╗
║  SUBSISTEMA 6: ACTIVATION                            ║
║                                                      ║
║  ANALYZE_COLLECTION                                  ║
║  CREATE_CONTENT_STRATEGY                             ║
║  CREATE_POST_PLAN · WRITE_POST*     ← shared         ║
║  CREATE_BOOK_BRIEF  ─────────────────► Research      ║
║  ← calls EVAL_ACTIVATION (Sub 5)                     ║
║                                                      ║
║  Output: campaña de contenido | BOOK_BRIEF           ║
╚══════════════════════════════════════════════════════╝

* Prompts compartidos — ver Parte 4
```

---

## PARTE 3: DESCRIPCIÓN DE CADA SUBSISTEMA

### Subsistema 0: SYSTEM
**Chat:** system-architecture
**Rol:** Define y mantiene los estándares del sistema. No produce prompts para el editor — produce los artefactos que hacen posible el desarrollo coherente del resto.

**Responsabilidades:**
- Arquitectura y diseño de subsistemas
- Naming convention y estándares de artefactos
- Cabecera YAML estándar
- Registro de decisiones (DECISION_LOG)
- Herramientas operativas (TOOLING): setup de proyectos en Drive, estructura del repo GitHub

**Artefactos propios:**
- RESOURCE_ARTIFACT_HEADER_STANDARD
- SCHEMA_SYSTEM_ARCHITECTURE (este documento)
- SCHEMA_DECISION_LOG
- TEMPLATE_SUBSYSTEM_CONTEXT
- TOOL_SETUP_PROJECT
- TOOL_GITHUB_REPO_STRUCTURE

---

### Subsistema 1: KNOWLEDGE BASE
**Chat:** knowledge-base-dev
**Rol:** Mantiene los recursos globales que acumulan conocimiento entre proyectos. Es el único subsistema cuyos outputs crecen con cada proyecto ejecutado.

**Responsabilidades:**
- Definir y versionar el esquema canónico de SAH y CVC
- Desarrollar y mantener UPDATE_VALIDATION_CHECKLIST
- Mantener RESOURCE_RESEARCH_FOCUS_TYPES

**Interfaces:**
- Output → Research: SAH, CVC, FOCUS_TYPES como inputs de Fase 1, 2 y 4B
- Recibe de Research: outputs actualizados de UPDATE_VALIDATION_CHECKLIST

---

### Subsistema 2: RESEARCH
**Chat:** research-dev
**Rol:** Transforma referencias brutas en conocimiento validado y estructurado.

**Flujo interno:**
```
Referencias → SUMMARIZE_REFERENCES → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
           → UPDATE_VALIDATION_CHECKLIST → SAH/CVC actualizados
           → [Editor anota — sin IA]
           → [Decisión: RAMA A | RAMA B]
RAMA A:    → RESEARCH_DEEP_DIVE → RESEARCH_DEEP_DIVE doc
RAMA B:    → CREATE_RESEARCH_PLAN → RESEARCH_PLAN_DETAILED
           → EXECUTE_RESEARCH_PLAN → RESEARCH_REPORT(s)
           → EVALUATE_RESEARCH_REPORT → EVALUATION_RESULT
```

**Input opcional:** BOOK_BRIEF de Activation (orienta la investigación sin sustituir el proceso).

---

### Subsistema 3: EDITORIAL PROFILE
**Chat:** editorial-profile-dev
**Rol:** Captura y representa la identidad del autor como comunicador. Es el único subsistema que modela al humano, no al proceso.

**Responsabilidades:**
- Crear y mantener el EDITOR_PROFILE activo
- Definir RESOURCE_EDITORIAL_STYLE (estilos disponibles en el sistema)
- Definir RESOURCE_BOOK_TYPES (tipos de libros que el sistema soporta)

**Límite explícito:** Este subsistema no evalúa textos. La evaluación de adherencia al perfil editorial (EVALUATE_BOOK_STYLE) pertenece al Subsistema 5: EVALUATION. El ownership de un evaluador lo determina su función, no sus inputs. Ver DL_20260330_SYSTEM_004.

**Output principal:** EDITOR_PROFILE activo — consumido por Writing, Activation y Evaluation.

---

### Subsistema 4: WRITING
**Chat:** writing-dev
**Rol:** Produce el texto final (libro o post) a partir de la investigación y el perfil editorial.

**Bifurcación:** El editor decide al entrar si produce un libro o un post. La decisión ocurre en el WORKFLOW_WRITING antes de invocar cualquier prompt.

**RAMA BOOK:** proceso completo de 12 prompts, desde el índice hasta la ficha técnica.
**RAMA POST:** proceso ligero de 3-5 prompts (pendiente de diseño).

---

### Subsistema 5: EVALUATION
**Chat:** evaluation-dev
**Rol:** Es el subsistema único responsable de toda evaluación de calidad en el sistema. Puede cambiar el método de evaluación sin modificar los workflows que lo invocan.

**Principio de ownership:** El ownership de un evaluador lo determina su función (evaluar), no sus inputs. Que un evaluador necesite EDITOR_PROFILE, SAH o CVC como input no lo convierte en propiedad de otro subsistema.

**Contrato de evaluación:** Todos los evaluadores producen el mismo formato de output (EVALUATION_RESULT con status GREEN/YELLOW/RED). Los workflows solo leen el status y el decision_guidance.

**Inventario de evaluadores:**

| Evaluador | Versión | Status | Artefacto evaluado |
|---|---|---|---|
| EVALUATE_RESEARCH_REPORT | v1.1 | ACTIVE | RESEARCH_REPORT / RESEARCH_DEEP_DIVE |
| EVALUATE_BOOK_CONTENT | v1.1 | ACTIVE | Capítulo o libro completo |
| EVALUATE_BOOK_STYLE | v1.0 | NEEDS UPDATE v1.1 | Adherencia al perfil editorial (necesita EDITOR_PROFILE) |
| EVALUATE_POST | — | PENDING | Post o artículo (pendiente diseño) |
| EVALUATE_ACTIVATION | — | PENDING | Campaña de contenido (pendiente diseño) |

---

### Subsistema 6: ACTIVATION
**Chat:** activation-dev
**Rol:** Genera contenido derivado a partir de libros o colecciones ya escritas. Puede producir posts para publicación inmediata o propuestas de nuevos libros (BOOK_BRIEF).

**Loop con Research:** El BOOK_BRIEF producido por Activation alimenta opcionalmente el inicio de un nuevo ciclo de Research, creando el bucle: Research → Writing → Activation → Research...

---

### Subsistema 7: DOCS
**Chat:** docs-dev
**Rol:** Mantiene toda la documentación del sistema actualizada. Consume DECISION_LOG entries de todos los subsistemas y produce documentación estructurada por audiencia.

**Cuatro tipos de documentación:**
1. System Design Docs (arquitectos y decisores)
2. Subsystem Implementation Docs (desarrolladores del subsistema)
3. Editor Manuals (usuarios del sistema)
4. Developer Manuals (nuevos desarrolladores que se incorporan)

---

## PARTE 4: PROMPTS COMPARTIDOS

Prompts desarrollados y mantenidos por Writing pero invocados también por Activation. Viven en `/writing/shared/` del repositorio.

| Prompt | Owner | Usado por |
|---|---|---|
| WRITE_POST | writing-dev | Writing (Rama Post), Activation |
| CREATE_TIMELINE | writing-dev | Writing Book, Activation |
| CREATE_CAST | writing-dev | Writing Book, Activation |
| QA_IDEAS | writing-dev | Writing (Rama Post), Activation |

**Regla:** writing-dev desarrolla y versiona estos prompts. Cuando hace un cambio, notifica a activation-dev via DECISION_LOG entry antes de mergear a main.

**Nota (v1.4):** `QA_IDEAS` se formalizó como compartido en `DL_20260411_ACTIVATION_022` (INTEGRATED) — quedó fuera de esta tabla por un vacío de coordinación entre DLs, corregido en `DL_20260416_SYSTEM_025` (ver nota "CORRECCIÓN 2026-09-03" en ese archivo). Su archivo físico sigue en `writing/post/`, no en `writing/shared/` — deuda técnica de ubicación, no de scope. En la arquitectura de plugin (PARTE 8), los cuatro prompts de esta tabla se exponen a través de la skill `shared-writing`.

---

## PARTE 5: INTERFACES ENTRE SUBSISTEMAS

| Origen | Destino | Artefacto | Tipo de relación |
|---|---|---|---|
| SYSTEM | Todos | RESOURCE_ARTIFACT_HEADER_STANDARD | Estándar aplicado |
| KNOWLEDGE_BASE | RESEARCH | SAH, CVC, FOCUS_TYPES | Input de proceso |
| RESEARCH | KNOWLEDGE_BASE | SAH/CVC actualizados | Output de UPDATE_VALIDATION |
| RESEARCH | WRITING | RESEARCH_REPORT(s) | Input principal |
| RESEARCH | WRITING | RESEARCH_DEEP_DIVE | Input alternativo (RAMA A) |
| EDITORIAL_PROFILE | WRITING | EDITOR_PROFILE | Input de contexto |
| EDITORIAL_PROFILE | ACTIVATION | EDITOR_PROFILE | Input de contexto |
| EDITORIAL_PROFILE | EVALUATION | EDITOR_PROFILE | Input de EVALUATE_BOOK_STYLE y EVALUATE_POST |
| WRITING | ACTIVATION | Libro(s) completo(s) | Input de análisis |
| ACTIVATION | RESEARCH | BOOK_BRIEF | Input orientador opcional |
| EVALUATION | Todos | EVALUATION_RESULT | Output de evaluación |
| Todos | DOCS | DECISION_LOG entries | Input de documentación |

---

## PARTE 6: ESTRUCTURA DEL REPOSITORIO GITHUB

```
dx-opus/
├── README.md
├── .claude-plugin/
│   └── plugin.json                    # manifest del plugin — root del plugin = root del repo (SPEC_PLUGIN_ARCHITECTURE §8)
├── skills/                            # 10 skills — ver PARTE 8
│   ├── project-setup/SKILL.md
│   ├── editor-onboarding/SKILL.md
│   ├── knowledge-base/SKILL.md
│   ├── research/SKILL.md
│   ├── editorial-profile/SKILL.md
│   ├── shared-writing/SKILL.md
│   ├── writing-book/SKILL.md
│   ├── writing-post/SKILL.md
│   ├── evaluation/SKILL.md
│   └── activation/SKILL.md
├── hooks/
│   └── hooks.json                     # 3 hooks — ver PARTE 8
│
├── _system/
│   ├── RESOURCE_ARTIFACT_HEADER_STANDARD.md
│   ├── SCHEMA_SYSTEM_ARCHITECTURE.md
│   ├── SCHEMA_DECISION_LOG.md
│   ├── SPEC_PLUGIN_ARCHITECTURE.md
│   ├── TEMPLATE_SUBSYSTEM_CONTEXT.md
│   ├── NAMING_CONVENTION_ANALYSIS.md
│   ├── MASTER_PLAN.md
│   ├── resources/
│   │   └── AUTO_SAVE_CONFIG.yaml      # fuente única de rutas/naming de artefactos
│   ├── templates/
│   │   └── TEMPLATE_EDITOR_CONFIG.md
│   ├── decisions/
│   │   └── [DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md]
│   └── audits/
│       └── RESEARCH_COMPONENT_AUDIT.md
│
├── docs/
│   ├── DEV_STANDARDS.md               # estándar vinculante para D-dispatcher/D-developer
│   ├── backlog/                       # contrato de tickets D-team
│   │   ├── README.md
│   │   └── ISSUE_{ID}_{slug}.md
│   ├── CONTEXT_DOCS.md
│   ├── system-design/
│   ├── subsystem-docs/
│   ├── editor-manuals/
│   └── developer-manuals/
│
├── tools/
│   ├── TOOL_CREATE_PROJECT.gs         # [Apps Script — retirar en Sprint 8]
│   ├── TOOL_SETUP_EDITOR_ENVIRONMENT.gs   # [Apps Script — retirar en Sprint 8]
│   ├── create-release-package.sh      # [retirar en Sprint 8]
│   └── TOOL_GITHUB_REPO_STRUCTURE.md
│
├── knowledge-base/
│   ├── dev/
│   │   └── CONTEXT_KNOWLEDGE_BASE.md  # dev-only, excluido del paquete instalable (PARTE 8)
│   ├── RESOURCE_SOURCE_AUTHORITY.md
│   ├── RESOURCE_CLAIM_VALIDATION.md
│   └── RESOURCE_RESEARCH_FOCUS_TYPES.md
│
├── research/
│   ├── dev/
│   │   └── CONTEXT_RESEARCH.md        # dev-only
│   ├── WORKFLOW_RESEARCH.md
│   ├── PROMPT_SUMMARIZE_REFERENCES.md
│   ├── PROMPT_RESEARCH_DEEP_DIVE.md
│   ├── PROMPT_CREATE_RESEARCH_PLAN.md
│   ├── PROMPT_EXECUTE_RESEARCH_PLAN.md
│   ├── PROMPT_UPDATE_VALIDATION_CHECKLIST.md
│   └── GUIDE_ANNOTATION_PHASE3.md
│
├── editorial-profile/
│   ├── dev/
│   │   └── CONTEXT_EDITORIAL_PROFILE.md   # dev-only
│   ├── PROMPT_CREATE_EDITOR_PROFILE.md
│   ├── RESOURCE_EDITORIAL_STYLE.md
│   ├── RESOURCE_BOOK_TYPES.md
│   ├── TEMPLATE_EDITOR_PROFILE.md
│   ├── TEMPLATE_EDITOR_NOTES.md
│   └── GUIDE_EDITOR_NOTES.md
│
├── writing/
│   ├── dev/
│   │   └── CONTEXT_WRITING.md         # dev-only
│   ├── WORKFLOW_WRITING.md
│   ├── book/
│   │   ├── PROMPT_CREATE_BOOK_INDEX.md
│   │   ├── PROMPT_WRITE_SAMPLE_CHAPTER.md
│   │   ├── PROMPT_WRITE_CHAPTER.md
│   │   ├── PROMPT_WRITE_INTRODUCTION.md
│   │   ├── PROMPT_WRITE_PROLOGUE.md
│   │   ├── PROMPT_CONSOLIDATE_REFERENCES.md
│   │   └── PROMPT_CREATE_BOOK_SHEET.md
│   ├── post/
│   │   ├── PROMPT_POST_BRIEF.md
│   │   ├── PROMPT_POST_EXPLORE.md
│   │   ├── PROMPT_SUMMARIZE_REF.md
│   │   ├── PROMPT_VERIFY_RESEARCH.md
│   │   ├── PROMPT_QA_IDEAS.md         # compartido — ver PARTE 4
│   │   ├── PROMPT_POST_ANGLES.md
│   │   ├── PROMPT_PLAN_POST.md
│   │   ├── PROMPT_SPLIT_POST.md
│   │   └── [RESOURCE_/TEMPLATE_/SPEC_ de apoyo]
│   └── shared/
│       ├── PROMPT_WRITE_POST.md
│       ├── PROMPT_CREATE_TIMELINE.md
│       └── PROMPT_CREATE_CAST.md
│
├── evaluation/
│   ├── dev/
│   │   └── CONTEXT_EVALUATION.md      # dev-only
│   ├── RESOURCE_EVALUATION_FRAMEWORK.md
│   ├── PROMPT_EVALUATE_RESEARCH_REPORT.md
│   ├── PROMPT_EVALUATE_BOOK_CONTENT.md
│   ├── PROMPT_EVALUATE_BOOK_STYLE.md
│   ├── PROMPT_EVALUATE_POST.md
│   └── PROMPT_EVALUATE_ACTIVATION.md
│
└── activation/
    ├── dev/
    │   └── CONTEXT_ACTIVATION.md      # dev-only
    ├── WORKFLOW_ACTIVATION.md
    ├── PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md
    ├── PROMPT_IDENTIFY_NARRATIVE_SEEDS.md
    └── PROMPT_CREATE_BOOK_BRIEF.md
```

---

## PARTE 7: FLUJO COMPLETO DEL SISTEMA

```
[EDITOR] aporta referencias sobre un tema
         │
         ▼
[RESEARCH]
  Fase 1: SUMMARIZE_REFERENCES
         → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
  Fase 2: UPDATE_VALIDATION_CHECKLIST
         → SAH/CVC actualizados
  Fase 3: Editor anota manualmente
         → ANNOTATED_REFERENCE_SUMMARY + ANNOTATED_RESEARCH_PLAN
  Fase 4: [Decisión: RAMA A o B]
    RAMA B: CREATE_RESEARCH_PLAN → EXECUTE_RESEARCH_PLAN
         → RESEARCH_REPORT(s)
  Fase 5: EVALUATE_RESEARCH_REPORT
         → EVALUATION_RESULT (GREEN → continuar)
         │
         ▼
[WRITING] [Decisión: BOOK o POST]
  BOOK:
    CREATE_BOOK_INDEX → WRITE_SAMPLE_CHAPTER → WRITE_CHAPTER (×N)
    → WRITE_INTRODUCTION → WRITE_PROLOGUE
    → CREATE_TIMELINE → CREATE_CAST
    → CONSOLIDATE_REFERENCES → CREATE_BOOK_SHEET
    → EVALUATE_BOOK_CONTENT + EVALUATE_BOOK_STYLE
         → libro completo
         │
         ▼
[ACTIVATION]
    ANALYZE_COLLECTION → CREATE_CONTENT_STRATEGY
    → CREATE_POST_PLAN → WRITE_POST (×N)
         → campaña de contenido publicable

    CREATE_BOOK_BRIEF
         → BOOK_BRIEF (3-4 ideas para nuevo libro)
         │
         └──► [RESEARCH] nuevo ciclo orientado por el brief
```

---

## PARTE 8: ARQUITECTURA DE PLUGIN (Sprint 6-7)

Detalle completo de decisiones y mapa de dependencias: `_system/SPEC_PLUGIN_ARCHITECTURE.md`. Esta sección resume el resultado ya construido, en `main`.

### Principio base

El root del plugin es el root de este repositorio. Ningún subsistema (`research/`, `writing/`, `evaluation/`...) se mueve ni se duplica dentro de una skill — cada `SKILL.md` es un archivo nuevo y ligero que instruye a Claude a leer los prompts reales por su ruta existente. Evita recrear la clase de bug de registros duplicados y desincronizados que se corrigió en Sprint 5 (`AUTO_SAVE_CONFIG.yaml` como única fuente de verdad de rutas/naming).

**Corrección (v1.5, issue #77):** que el root del plugin sea el root del repo significa que quien instale/empaquete el plugin se lleva potencialmente *todo* lo que hay en ese árbol — no solo `.claude-plugin/`, `skills/` y `hooks/`. Hace falta un límite explícito entre lo instalable (lo que un editor necesita para usar el plugin) y lo que es solo de desarrollo (decisiones, specs, backlog, estándares). Ese límite es estructural, no una lista mantenida a mano:

- **Se incluye:** `.claude-plugin/`, `skills/`, `hooks/`, el contenido de producción de cada subsistema (`research/`, `writing/`, `evaluation/`, `activation/`, `editorial-profile/`, `knowledge-base/` — todo excepto sus subcarpetas `dev/`), y `_system/resources/` + `_system/templates/` (referenciados directamente por `project-setup`/`editor-onboarding`).
- **Se excluye:** cualquier ruta que contenga `/dev/` (los `CONTEXT_*.md` de cada subsistema viven ahí desde esta versión), el resto de `_system/` (`decisions/`, `audits/`, `MASTER_PLAN.md`, `SPEC_*.md`, `SCHEMA_*.md`, `NAMING_CONVENTION_ANALYSIS.md`), todo `docs/`, todo `tools/`, y los `README.md`.

No existe todavía un mecanismo automatizado que aplique este límite al generar el `.plugin` instalable — es trabajo de Sprint 8.

### Las 10 skills

| Skill | Sustituye a / cubre | Sprint |
|---|---|---|
| `project-setup` | `TOOL_CREATE_PROJECT.gs` — crea la estructura de carpetas de un proyecto nuevo, determinista (sin búsqueda de carpeta por nombre) | 6 |
| `editor-onboarding` | `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` — setup único por editor, genera `EDITOR_CONFIG` | 6 |
| `knowledge-base` | Subsistema KNOWLEDGE_BASE — SAH/CVC/FOCUS_TYPES, con hook de gobernanza | 6 |
| `research` | Subsistema RESEARCH completo | 7 |
| `editorial-profile` | Subsistema EDITORIAL_PROFILE completo | 7 |
| `shared-writing` | Los 4 prompts compartidos de PARTE 4 (WRITE_POST, CREATE_TIMELINE, CREATE_CAST, QA_IDEAS) — invocada por `writing-post` y `activation`, no disparada directamente por el editor | 7 |
| `writing-book` | RAMA BOOK de WRITING | 7 |
| `writing-post` | RAMA POST de WRITING, con hook de prerequisito de investigación | 7 |
| `evaluation` | Subsistema EVALUATION completo (5 evaluadores, incluido `PROMPT_EVALUATE_ACTIVATION` nuevo) | 7 |
| `activation` | Subsistema ACTIVATION completo | 7 |

DOCS y SYSTEM no son skills — son documentación de desarrollo del propio plugin, no capacidades que el editor invoque directamente.

### Los 3 hooks (`hooks/hooks.json`)

| # | Protege | Tipo | Decisión que aplica |
|---|---|---|---|
| 1 | Escrituras a `RESOURCE_SOURCE_AUTHORITY.md`/`RESOURCE_CLAIM_VALIDATION.md` | `PreToolUse`, prompt-based | No modificar autónomamente secciones del Universal Framework — misma clase de riesgo que el bug #66 |
| 2 | Producción de `RESEARCH_REPORT` vía `PROMPT_EXECUTE_RESEARCH_PLAN` | `PreToolUse`, prompt-based | Exige evidencia de aprobación editorial explícita del `RESEARCH_PLAN_DETAILED`, no solo que el archivo exista |
| 3 | Producción del `POST_DRAFT` final vía `PROMPT_WRITE_POST` | `PreToolUse`, prompt-based | Exige investigación previa (compartida o propia del post) o skip explícito registrado — cierra issue #63 a nivel estructural, complementario al checkpoint ya aplicado en `PROMPT_POST_BRIEF.md` v1.1 |

**Criterio de diseño:** los gates de *calidad/evaluación* (un resultado RED de cualquier evaluador) se quedan como instrucción soft, nunca hook — es confianza editorial por diseño (`RESOURCE_EVALUATION_FRAMEWORK.md`). Solo los gates de *integridad de datos/autorización* se convirtieron en hooks.

### Pendiente (Sprint 8)

Validar en paralelo con editores reales; retirar `tools/TOOL_CREATE_PROJECT.gs`, `tools/TOOL_SETUP_EDITOR_ENVIRONMENT.gs` y `tools/create-release-package.sh` — marcados `[Apps Script — retirar en Sprint 8]` en el árbol de PARTE 6; y construir el mecanismo real de empaquetado que aplique el límite instalable/desarrollo descrito arriba (issue #77).

---

**FIN DEL DOCUMENTO**
