---
id:          TOOL_GITHUB_REPO_STRUCTURE
type:        TOOL
subsystem:   SYSTEM
version:     1.2
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-16
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.2 | 2026-04-16 | JM | Sprint cierre R1: tree updated to reflect actual repo state. writing/post/ populated with 14 Sprint 3 artefacts. PROMPT_EVALUATE_BOOK_STYLE and PROMPT_EVALUATE_POST added to evaluation/. PROMPT_EVALUATE_BOOK_STYLE removed from editorial-profile/ (moved per DL_20260330_SYSTEM_004). RESEARCH_COMPONENT_AUDIT.md added to audits/. WORKFLOW_WRITING.md location per DL_20260416_SYSTEM_026. Estado actual section updated to R1 closure state. |
| v1.1 | 2026-03-30 | JM | Removed versions from all filenames in repo tree. Replaced MCP setup with manual upload flow (DECISIÓN-15). Fixed shared prompts location to /writing/shared/. Added current repo state. |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

```
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, NAMING_CONVENTION_ANALYSIS]
outputs: [Estructura de carpetas en repositorio GitHub dx-opus]
calls:   []
```

## DESCRIPTION

Especificación completa de la estructura del repositorio GitHub dx-opus y el flujo de trabajo para subir artefactos. El MCP de GitHub no está disponible en Plan Pro — se usa flujo manual asistido.

---

# TOOL: GITHUB REPOSITORY STRUCTURE

## Repositorio TINTA-ARTIFICIAL/dx-opus

---

## PARTE 1: FLUJO DE TRABAJO (manual asistido)

El GitHub MCP no está disponible en el Plan Pro de Claude.ai (DECISIÓN-15). El flujo de trabajo es:

1. **Claude produce** los artefactos en el Project Knowledge con el naming correcto
2. **Claude prepara** el paquete de subida: lista de archivos con su ruta exacta de destino
3. **El editor sube** los archivos al repositorio via:
   * Interfaz web de GitHub (arrastrar y soltar por carpeta)
   * GitHub Desktop
   * Git CLI

**Regla de naming en GitHub:** Ningún archivo incluye versión en el nombre. La versión vive en la cabecera YAML y en el historial de commits.

```
✅ CORRECTO:   PROMPT_WRITE_CHAPTER.md
❌ INCORRECTO: PROMPT_WRITE_CHAPTER_v1_3.md
```

---

## PARTE 2: ESTRUCTURA DE CARPETAS

```
dx-opus/
│
├── README.md
│
├── _system/                               ← Subsistema 0: SYSTEM
│   ├── README.md
│   ├── MASTER_PLAN.md
│   ├── NAMING_CONVENTION_ANALYSIS.md
│   ├── RESOURCE_ARTIFACT_HEADER_STANDARD.md
│   ├── SCHEMA_SYSTEM_ARCHITECTURE.md
│   ├── SCHEMA_DECISION_LOG.md
│   ├── TEMPLATE_SUBSYSTEM_CONTEXT.md
│   │
│   ├── decisions/
│   │   ├── README.md
│   │   ├── DL_20260222_EVAL_001.md
│   │   ├── DL_20260222_KB_002.md
│   │   ├── DL_20260222_KB_003.md
│   │   ├── DL_20260330_SYSTEM_004.md
│   │   ├── DL_20260416_SYSTEM_025.md
│   │   └── DL_20260416_SYSTEM_026.md
│   │
│   └── audits/
│       ├── README.md
│       └── RESEARCH_COMPONENT_AUDIT.md
│
├── tools/                                 ← TOOLING (owned by SYSTEM)
│   ├── README.md
│   ├── TOOL_SETUP_PROJECT.gs
│   └── TOOL_GITHUB_REPO_STRUCTURE.md
│
├── knowledge-base/                        ← Subsistema 1: KNOWLEDGE BASE
│   ├── README.md
│   ├── CONTEXT_KNOWLEDGE_BASE.md
│   ├── RESOURCE_SOURCE_AUTHORITY.md
│   ├── RESOURCE_CLAIM_VALIDATION.md
│   └── RESOURCE_RESEARCH_FOCUS_TYPES.md
│
├── research/                              ← Subsistema 2: RESEARCH
│   ├── README.md
│   ├── CONTEXT_RESEARCH.md
│   ├── WORKFLOW_RESEARCH.md
│   ├── PROMPT_SUMMARIZE_REFERENCES.md
│   ├── PROMPT_RESEARCH_DEEP_DIVE.md       ← pendiente subir desde Drive (RE-01)
│   ├── PROMPT_CREATE_RESEARCH_PLAN.md
│   ├── PROMPT_EXECUTE_RESEARCH_PLAN.md    ← pendiente subir desde Drive (RE-01)
│   ├── PROMPT_UPDATE_VALIDATION_CHECKLIST.md
│   └── GUIDE_ANNOTATION_PHASE3.md
│
├── editorial-profile/                     ← Subsistema 3: EDITORIAL PROFILE
│   ├── README.md
│   ├── CONTEXT_EDITORIAL_PROFILE.md
│   ├── PROMPT_CREATE_EDITOR_PROFILE.md
│   ├── RESOURCE_EDITORIAL_STYLE.md        ← pendiente subir desde Drive (EP-01)
│   ├── RESOURCE_BOOK_TYPES.md             ← pendiente subir desde Drive (EP-02)
│   ├── TEMPLATE_EDITOR_PROFILE.md         ← pendiente subir desde Drive (EP-02)
│   ├── TEMPLATE_EDITOR_NOTES.md           ← pendiente subir desde Drive (EP-02)
│   └── GUIDE_EDITOR_NOTES.md              ← pendiente subir desde Drive (EP-02)
│
├── writing/                               ← Subsistema 4: WRITING
│   ├── README.md
│   ├── CONTEXT_WRITING.md
│   ├── WORKFLOW_WRITING.md                ← mover desde writing/book/ (DL_20260416_SYSTEM_026)
│   │
│   ├── book/
│   │   ├── README.md
│   │   ├── PROMPT_CREATE_BOOK_INDEX.md
│   │   ├── PROMPT_WRITE_SAMPLE_CHAPTER.md
│   │   ├── PROMPT_WRITE_CHAPTER.md
│   │   ├── PROMPT_WRITE_INTRODUCTION.md
│   │   ├── PROMPT_WRITE_PROLOGUE.md
│   │   ├── PROMPT_CONSOLIDATE_REFERENCES.md
│   │   └── PROMPT_CREATE_BOOK_SHEET.md
│   │
│   ├── post/                              ← RAMA POST completa (Sprint 3)
│   │   ├── README.md
│   │   ├── PROMPT_POST_BRIEF.md
│   │   ├── PROMPT_POST_EXPLORE.md
│   │   ├── PROMPT_SUMMARIZE_REF.md
│   │   ├── PROMPT_VERIFY_RESEARCH.md
│   │   ├── PROMPT_QA_IDEAS.md
│   │   ├── PROMPT_POST_ANGLES.md
│   │   ├── PROMPT_PLAN_POST.md
│   │   ├── PROMPT_SPLIT_POST.md
│   │   ├── RESOURCE_WRITING_CONTEXT.md
│   │   ├── RESOURCE_PUBLICATION_PROFILE.md
│   │   ├── SPEC_LEARNING_SIGNALS.md
│   │   ├── TEMPLATE_POST_SEED.md
│   │   └── TEMPLATE_POST_BRIEFING.md
│   │
│   └── shared/                            ← owned by Writing, invocado por Activation
│       ├── README.md
│       ├── PROMPT_WRITE_POST.md
│       ├── PROMPT_CREATE_TIMELINE.md
│       └── PROMPT_CREATE_CAST.md
│
├── evaluation/                            ← Subsistema 5: EVALUATION
│   ├── README.md
│   ├── CONTEXT_EVALUATION.md
│   ├── RESOURCE_EVALUATION_FRAMEWORK.md
│   ├── PROMPT_EVALUATE_RESEARCH_REPORT.md
│   ├── PROMPT_EVALUATE_BOOK_CONTENT.md
│   ├── PROMPT_EVALUATE_BOOK_STYLE.md
│   └── PROMPT_EVALUATE_POST.md
│
├── activation/                            ← Subsistema 6: ACTIVATION
│   ├── README.md
│   ├── CONTEXT_ACTIVATION.md
│   ├── WORKFLOW_ACTIVATION.md
│   └── PROMPT_CREATE_BOOK_BRIEF.md        ← pendiente crear (AC-03)
│
└── docs/                                  ← Subsistema 7: DOCS
    ├── README.md
    ├── CONTEXT_DOCS.md
    ├── system-design/
    │   └── README.md
    ├── subsystem-docs/
    │   └── README.md
    ├── editor-manuals/
    │   └── README.md
    └── developer-manuals/
        └── README.md
```

---

## PARTE 3: ESTADO ACTUAL DEL REPOSITORIO

Estado al cierre de Release 1 (Sprint cierre R1, 16/04/2026).

### Confirmados en repo

| Carpeta | Artefactos |
|---|---|
| `_system/` | MASTER_PLAN, SCHEMA_SYSTEM_ARCHITECTURE, SCHEMA_DECISION_LOG (⚠️ nombre roto — renombrar a SCHEMA_DECISION_LOG.md), RESOURCE_ARTIFACT_HEADER_STANDARD, TEMPLATE_SUBSYSTEM_CONTEXT, NAMING_CONVENTION_ANALYSIS |
| `_system/decisions/` | DL_20260222_EVAL_001, DL_20260222_KB_002, DL_20260222_KB_003, README |
| `_system/audits/` | README |
| `tools/` | TOOL_SETUP_PROJECT.gs, TOOL_GITHUB_REPO_STRUCTURE.md, README |
| `knowledge-base/` | CONTEXT_KNOWLEDGE_BASE, RESOURCE_SOURCE_AUTHORITY, RESOURCE_CLAIM_VALIDATION, RESOURCE_RESEARCH_FOCUS_TYPES, README |
| `research/` | CONTEXT_RESEARCH, WORKFLOW_RESEARCH, PROMPT_SUMMARIZE_REFERENCES, PROMPT_CREATE_RESEARCH_PLAN, PROMPT_UPDATE_VALIDATION_CHECKLIST, GUIDE_ANNOTATION_PHASE3, README |
| `editorial-profile/` | CONTEXT_EDITORIAL_PROFILE, PROMPT_CREATE_EDITOR_PROFILE, README |
| `writing/` | CONTEXT_WRITING, README |
| `writing/book/` | WORKFLOW_WRITING_BOOK (v2.0 — renombrar a WORKFLOW_WRITING.md en raíz writing/), todos los prompts de libro, README |
| `writing/post/` | 14 artefactos Sprint 3 (ver árbol Parte 2), README |
| `writing/shared/` | PROMPT_WRITE_POST (v2.0), PROMPT_CREATE_TIMELINE, PROMPT_CREATE_CAST, README |
| `evaluation/` | CONTEXT_EVALUATION, RESOURCE_EVALUATION_FRAMEWORK, PROMPT_EVALUATE_RESEARCH_REPORT, PROMPT_EVALUATE_BOOK_CONTENT, PROMPT_EVALUATE_BOOK_STYLE, PROMPT_EVALUATE_POST, README |
| `activation/` | CONTEXT_ACTIVATION, WORKFLOW_ACTIVATION, README |
| `docs/` | CONTEXT_DOCS, README + subcarpetas |
| raíz | README.md |

### Pendientes de subir — paquete Sprint cierre R1

| Archivo | Destino en repo | Tarea |
|---|---|---|
| DL_20260416_SYSTEM_025.md | `/_system/decisions/` | Fase 1 completada |
| DL_20260416_SYSTEM_026.md | `/_system/decisions/` | Fase 1 completada |
| PROMPT_EVALUATE_BOOK_STYLE.md (v1.1) | `/evaluation/` | EV-01 completada |
| RESOURCE_EVALUATION_FRAMEWORK.md (v1.1) | `/evaluation/` | EV-02 completada |
| CONTEXT_EVALUATION.md (v1.4) | `/evaluation/` | EV-03 completada |
| TOOL_GITHUB_REPO_STRUCTURE.md (v1.2) | `/tools/` | SC-03 — este archivo |
| MASTER_PLAN.md (v1.4) | `/_system/` | SC-04 completada |
| decisions/README.md (actualizado) | `/_system/decisions/` | SC-07 completada |
| RESEARCH_COMPONENT_AUDIT.md (v1.0) | `/_system/audits/` | SC-05 completada |
| WORKFLOW_WRITING_BOOK.md → WORKFLOW_WRITING.md | `/writing/` (raíz) | WR-02: mover y renombrar (DL_026) |
| CONTEXT_WRITING.md (v1.3) | `/writing/` | WR-01 pendiente |
| WORKFLOW_ACTIVATION.md (v1.5) | `/activation/` | AC-01 pendiente |
| CONTEXT_ACTIVATION.md (v1.3) | `/activation/` | AC-02 pendiente |
| PROMPT_RESEARCH_DEEP_DIVE.md (v1.1) | `/research/` | RE-01 pendiente |
| PROMPT_EXECUTE_RESEARCH_PLAN.md (v1.0) | `/research/` | RE-01 pendiente |
| RESOURCE_SOURCE_AUTHORITY.md (v2.2) | `/knowledge-base/` | KB-01 pendiente |
| RESOURCE_CLAIM_VALIDATION.md (v1.2) | `/knowledge-base/` | KB-02 pendiente |
| RESOURCE_EDITORIAL_STYLE.md | `/editorial-profile/` | EP-01 pendiente |
| TEMPLATE_EDITOR_PROFILE.md | `/editorial-profile/` | EP-02 pendiente |
| TEMPLATE_EDITOR_NOTES.md | `/editorial-profile/` | EP-02 pendiente |
| GUIDE_EDITOR_NOTES.md | `/editorial-profile/` | EP-02 pendiente |

---

## PARTE 4: CONFIGURACIÓN DE BRANCHES

**Branch main:** Producción. El editor aprueba los merges.

**Branches de desarrollo** (crear cuando se activa cada chat):

```
kb/dev
research/dev
editorial/dev
writing/dev
evaluation/dev
activation/dev
docs/dev
```

**Flujo:**

```
Chat trabaja en su branch → crea PR → editor aprueba → merge a main
```

Con un solo desarrollador activo, se puede hacer merge directo a main para agilizar.

---

## PARTE 5: CONVENCIÓN DE COMMITS

```
[SUBSISTEMA] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore
Subsistemas: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS

Ejemplos:
[SYSTEM] chore: update MASTER_PLAN to v1.4
[SYSTEM] docs: add DL_20260416_SYSTEM_025 — POST flow scope decision for R1
[RESEARCH] feat: upload PROMPT_RESEARCH_DEEP_DIVE v1.1
[RESEARCH] refactor: externalize focus types in CREATE_RESEARCH_PLAN v3.0
[EVAL] feat: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
[WRITING] chore: move WORKFLOW_WRITING_BOOK to writing/WORKFLOW_WRITING.md
```

---

**FIN DEL DOCUMENTO**
