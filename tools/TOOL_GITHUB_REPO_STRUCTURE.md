---
id:          TOOL_GITHUB_REPO_STRUCTURE
type:        TOOL
subsystem:   SYSTEM
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-30
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-03-30 | JM | Removed versions from all filenames in repo tree. Replaced MCP setup with manual upload flow (DECISIÓN-15). Fixed shared prompts location to /writing/shared/. Added current repo state. |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, NAMING_CONVENTION_ANALYSIS]
outputs: [Estructura de carpetas en repositorio GitHub dx-opus]
calls:   []

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
   - Interfaz web de GitHub (arrastrar y soltar por carpeta)
   - GitHub Desktop
   - Git CLI

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
│   │   └── DL_20260222_KB_003.md
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
│   ├── PROMPT_RESEARCH_DEEP_DIVE.md
│   ├── PROMPT_CREATE_RESEARCH_PLAN.md
│   ├── PROMPT_EXECUTE_RESEARCH_PLAN.md
│   ├── PROMPT_UPDATE_VALIDATION_CHECKLIST.md
│   └── GUIDE_ANNOTATION_PHASE3.md        ← pendiente crear
│
├── editorial-profile/                     ← Subsistema 3: EDITORIAL PROFILE
│   ├── README.md
│   ├── CONTEXT_EDITORIAL_PROFILE.md
│   ├── PROMPT_CREATE_EDITOR_PROFILE.md
│   ├── PROMPT_EVALUATE_BOOK_STYLE.md
│   ├── RESOURCE_EDITORIAL_STYLE.md
│   └── RESOURCE_BOOK_TYPES.md
│
├── writing/                               ← Subsistema 4: WRITING
│   ├── README.md
│   ├── CONTEXT_WRITING.md
│   ├── WORKFLOW_WRITING.md               ← pendiente v2.0
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
│   ├── post/                              ← pendiente diseño
│   │   └── README.md
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
│   └── PROMPT_EVALUATE_BOOK_CONTENT.md
│
├── activation/                            ← Subsistema 6: ACTIVATION
│   ├── README.md
│   ├── CONTEXT_ACTIVATION.md
│   ├── WORKFLOW_ACTIVATION.md
│   └── PROMPT_CREATE_BOOK_BRIEF.md       ← pendiente crear
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

Artefactos ya subidos al repositorio `TINTA-ARTIFICIAL/dx-opus` (verificar antes de re-subir):

### Confirmados en repo

| Carpeta | Artefactos |
|---|---|
| `_system/` | MASTER_PLAN, SCHEMA_SYSTEM_ARCHITECTURE, SCHEMA_DECISION_LOG, RESOURCE_ARTIFACT_HEADER_STANDARD, TEMPLATE_SUBSYSTEM_CONTEXT, NAMING_CONVENTION_ANALYSIS |
| `_system/decisions/` | DL_20260222_EVAL_001, DL_20260222_KB_002, DL_20260222_KB_003, README |
| `_system/audits/` | README |
| `tools/` | TOOL_SETUP_PROJECT.gs, TOOL_GITHUB_REPO_STRUCTURE.md, README |
| `knowledge-base/` | CONTEXT_KNOWLEDGE_BASE, RESOURCE_SOURCE_AUTHORITY, RESOURCE_CLAIM_VALIDATION, RESOURCE_RESEARCH_FOCUS_TYPES, README |
| `research/` | CONTEXT_RESEARCH, WORKFLOW_RESEARCH, PROMPT_SUMMARIZE_REFERENCES, PROMPT_CREATE_RESEARCH_PLAN, PROMPT_UPDATE_VALIDATION_CHECKLIST, README |
| `editorial-profile/` | CONTEXT_EDITORIAL_PROFILE, README |
| `writing/` | CONTEXT_WRITING, README + subcarpetas book/, post/, shared/ con READMEs |
| `evaluation/` | CONTEXT_EVALUATION, RESOURCE_EVALUATION_FRAMEWORK, PROMPT_EVALUATE_RESEARCH_REPORT, PROMPT_EVALUATE_BOOK_CONTENT, README |
| `activation/` | CONTEXT_ACTIVATION, README |
| `docs/` | CONTEXT_DOCS, README + subcarpetas |
| raíz | README.md |

### Pendientes de subir (paquete Sprint 2)

| Archivo | Destino en repo | Origen |
|---|---|---|
| MASTER_PLAN.md (v1.3) | `/_system/` | Producido Sprint 2 |
| decisions/README.md (corregido) | `/_system/decisions/` | Producido Sprint 2 |
| TOOL_GITHUB_REPO_STRUCTURE.md (v1.1) | `/tools/` | Producido Sprint 2 |
| READMEs actualizados | múltiples carpetas | Producido Sprint 2 |
| GUIDE_ANNOTATION_PHASE3.md | `/research/` | Pendiente producir |
| PROMPT_CREATE_RESEARCH_PLAN.md (v3.0) | `/research/` | Pendiente producir |
| PROMPT_EVALUATE_BOOK_STYLE.md (v1.1) | `/editorial-profile/` | Pendiente producir |

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
[SYSTEM] chore: update MASTER_PLAN to v1.3
[RESEARCH] feat: create GUIDE_ANNOTATION_PHASE3 v1.0
[RESEARCH] refactor: externalize focus types in CREATE_RESEARCH_PLAN v3.0
[EVAL] fix: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
```

---

**FIN DEL DOCUMENTO**
