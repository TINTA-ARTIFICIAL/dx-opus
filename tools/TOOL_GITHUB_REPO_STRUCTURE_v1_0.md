---
id:          TOOL_GITHUB_REPO_STRUCTURE
type:        TOOL
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE]
outputs: [Estructura de carpetas en repositorio GitHub dx-opus]
calls:   []

## DESCRIPTION
Especificación completa de la estructura del repositorio GitHub dx-opus, con el contenido de cada README y las instrucciones de inicialización. Una vez configurado el GitHub MCP, este documento es la referencia para crear el repositorio desde un chat de Claude.

---

# TOOL: GITHUB REPOSITORY STRUCTURE
## Repositorio dx-opus — Especificación de Inicialización

---

## PARTE 1: SETUP PREVIO (acción del editor)

Antes de poder inicializar el repositorio desde un chat de Claude, el editor debe completar estos pasos:

**Paso 1 — Crear el repositorio en GitHub:**
1. Ir a github.com → New repository
2. Nombre: `dx-opus`
3. Visibilidad: Private
4. NO inicializar con README (se creará desde el chat)
5. Crear repositorio

**Paso 2 — Crear Personal Access Token:**
1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Nombre: `claude-dx-opus`
3. Permisos necesarios: `repo` (acceso completo al repositorio privado)
4. Guardar el token de forma segura

**Paso 3 — Configurar GitHub MCP en Claude.ai:**
1. Claude.ai → Settings → Integrations
2. Buscar GitHub MCP Server
3. Introducir el Personal Access Token
4. Verificar que el MCP aparece como activo

**Paso 4 — Test de integración:**
En un chat de Claude con el MCP activo, ejecutar:
```
"Lista los repositorios a los que tienes acceso"
```
Debe aparecer `dx-opus` en la lista.

---

## PARTE 2: ESTRUCTURA DE CARPETAS

```
dx-opus/
│
├── README.md                              ← Entrada principal del sistema
│
├── _system/                               ← Subsistema 0: SYSTEM
│   ├── README.md
│   ├── RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0.md
│   ├── SCHEMA_SYSTEM_ARCHITECTURE_v1.0.md
│   ├── SCHEMA_DECISION_LOG_v1.0.md
│   ├── TEMPLATE_SUBSYSTEM_CONTEXT_v1.0.md
│   ├── NAMING_CONVENTION_ANALYSIS_v1.2.md
│   ├── MASTER_PLAN_v1.1.md
│   │
│   ├── decisions/                         ← DECISION_LOG entries
│   │   └── README.md
│   │
│   └── audits/                            ← Auditorías del sistema
│       ├── README.md
│       └── RESEARCH_COMPONENT_AUDIT_v1.1.md
│
├── tools/                                 ← TOOLING (owned by SYSTEM)
│   ├── README.md
│   ├── TOOL_SETUP_PROJECT_v1.0.gs
│   └── TOOL_GITHUB_REPO_STRUCTURE_v1.0.md
│
├── knowledge-base/                        ← Subsistema 1: KNOWLEDGE BASE
│   ├── README.md
│   ├── RESOURCE_SOURCE_AUTHORITY_v2.0.md
│   ├── RESOURCE_CLAIM_VALIDATION_v1.0.md
│   └── RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md    [PENDIENTE]
│       + PROMPT_UPDATE_VALIDATION_CHECKLIST_v3.1.md [PENDIENTE v3.1]
│
├── research/                              ← Subsistema 2: RESEARCH
│   ├── README.md
│   ├── WORKFLOW_RESEARCH_v3.2.md              [PENDIENTE v3.2]
│   ├── PROMPT_SUMMARIZE_REFERENCES_v4.1.md    [PENDIENTE v4.1]
│   ├── PROMPT_RESEARCH_DEEP_DIVE_v1.1.md
│   ├── PROMPT_CREATE_RESEARCH_PLAN_v3.0.md    [PENDIENTE v3.0]
│   └── PROMPT_EXECUTE_RESEARCH_PLAN_v1.0.md
│
├── editorial-profile/                     ← Subsistema 3: EDITORIAL PROFILE
│   ├── README.md
│   ├── PROMPT_CREATE_EDITOR_PROFILE_v1.0.md
│   ├── PROMPT_EVALUATE_BOOK_STYLE_v1.1.md     [PENDIENTE v1.1]
│   ├── RESOURCE_EDITORIAL_STYLE_v1.0.md
│   └── RESOURCE_BOOK_TYPES_v1.2.md
│
├── writing/                               ← Subsistema 4: WRITING
│   ├── README.md
│   ├── WORKFLOW_WRITING_v2.0.md               [PENDIENTE v2.0]
│   │
│   ├── book/
│   │   ├── README.md
│   │   ├── PROMPT_CREATE_BOOK_INDEX_v1.0.md
│   │   ├── PROMPT_WRITE_SAMPLE_CHAPTER_v1.0.md
│   │   ├── PROMPT_WRITE_CHAPTER_v1.3.md
│   │   ├── PROMPT_WRITE_INTRODUCTION_v1.0.md
│   │   ├── PROMPT_WRITE_PROLOGUE_v1.0.md
│   │   ├── PROMPT_CONSOLIDATE_REFERENCES_v1.1.md
│   │   └── PROMPT_CREATE_BOOK_SHEET_v1.1.md
│   │
│   └── post/                                  [PENDIENTE diseño]
│       └── README.md
│
├── evaluation/                            ← Subsistema 5: EVALUATION
│   ├── README.md
│   ├── RESOURCE_EVALUATION_FRAMEWORK_v1.0.md  [PENDIENTE]
│   ├── PROMPT_EVALUATE_RESEARCH_REPORT_v1.1.md [PENDIENTE v1.1]
│   └── PROMPT_EVALUATE_BOOK_CONTENT_v1.1.md   [PENDIENTE v1.1]
│
├── activation/                            ← Subsistema 6: ACTIVATION
│   ├── README.md
│   ├── WORKFLOW_ACTIVATION_v1.4.md
│   └── PROMPT_CREATE_BOOK_BRIEF_v1.0.md       [PENDIENTE]
│
├── shared/                                ← Prompts compartidos
│   ├── README.md
│   ├── PROMPT_WRITE_POST_v1.0.md
│   ├── PROMPT_CREATE_TIMELINE_v1.0.md
│   └── PROMPT_CREATE_CAST_v1.0.md
│
└── docs/                                  ← Subsistema 7: DOCS
    ├── README.md
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

## PARTE 3: CONTENIDO DE LOS README

### README.md (raíz)

```markdown
# D-X-OPUS — AI-Assisted Non-Fiction Writing System

Sistema modular de escritura no-ficción asistida por IA. Cubre el proceso completo:
investigación profunda → planificación → escritura → evaluación → activación de contenido.

## Subsistemas

| # | Subsistema | Carpeta | Chat de desarrollo |
|---|---|---|---|
| 0 | SYSTEM | `/_system/` | system-architecture |
| 1 | KNOWLEDGE BASE | `/knowledge-base/` | knowledge-base-dev |
| 2 | RESEARCH | `/research/` | research-dev |
| 3 | EDITORIAL PROFILE | `/editorial-profile/` | editorial-profile-dev |
| 4 | WRITING | `/writing/` | writing-dev |
| 5 | EVALUATION | `/evaluation/` | evaluation-dev |
| 6 | ACTIVATION | `/activation/` | activation-dev |
| 7 | DOCS | `/docs/` | docs-dev |

## Documentación de referencia

- Arquitectura del sistema: `/_system/SCHEMA_SYSTEM_ARCHITECTURE_v1.0.md`
- Naming convention: `/_system/NAMING_CONVENTION_ANALYSIS_v1.2.md`
- Plan de trabajo: `/_system/MASTER_PLAN_v1.1.md`
- Estándar de cabecera: `/_system/RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0.md`

## Setup de proyectos de escritura

Los artefactos de producción (research reports, capítulos, posts) viven en Google Drive,
no en este repositorio. Para crear la estructura de carpetas de un nuevo proyecto:
`/tools/TOOL_SETUP_PROJECT_v1.0.gs`

## Convención de commits

```
[SUBSISTEMA] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore
Subsistemas: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS | SHARED
```
```

---

### _system/README.md

```markdown
# Subsistema 0: SYSTEM

Arquitectura, estándares, naming convention, decisiones globales y herramientas operativas (TOOLING).

**Chat de desarrollo:** system-architecture  
**Owner:** Este subsistema es propietario de sí mismo.

## Artefactos activos

| Artefacto | Versión | Descripción |
|---|---|---|
| RESOURCE_ARTIFACT_HEADER_STANDARD | v1.0 | Especificación de cabecera YAML |
| SCHEMA_SYSTEM_ARCHITECTURE | v1.0 | Mapa completo del sistema |
| SCHEMA_DECISION_LOG | v1.0 | Formato de registro de decisiones |
| TEMPLATE_SUBSYSTEM_CONTEXT | v1.0 | Plantilla para contextos de chats |
| NAMING_CONVENTION_ANALYSIS | v1.2 | Convención de naming del sistema |
| MASTER_PLAN | v1.1 | Plan completo de trabajo |

## Subcarpetas

- `decisions/` — DECISION_LOG entries (una por decisión arquitectónica)
- `audits/` — Auditorías de componentes por subsistema
```

---

### knowledge-base/README.md

```markdown
# Subsistema 1: KNOWLEDGE BASE

Recursos globales acumulativos que crecen con cada proyecto ejecutado.
Son la "memoria" del sistema entre proyectos.

**Chat de desarrollo:** knowledge-base-dev

## Artefactos activos

| Artefacto | Versión | Descripción |
|---|---|---|
| RESOURCE_SOURCE_AUTHORITY | v2.0 | Jerarquía de fuentes por tema |
| RESOURCE_CLAIM_VALIDATION | v1.0 | Criterios de validación de claims |
| RESOURCE_RESEARCH_FOCUS_TYPES | v1.0 [PENDIENTE] | 7 tipos de focus de investigación |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.1 [PENDIENTE] | Actualiza SAH y CVC con cada proyecto |

## Interfaces

**Entrega a:** Research (SAH, CVC, FOCUS_TYPES como inputs)  
**Recibe de:** Research (outputs actualizados de UPDATE_VALIDATION_CHECKLIST)
```

---

### research/README.md

```markdown
# Subsistema 2: RESEARCH

Transforma referencias brutas en conocimiento validado y estructurado.

**Chat de desarrollo:** research-dev

## Flujo interno

```
Referencias → SUMMARIZE_REFERENCES → REFERENCE_SUMMARY + RESEARCH_PLAN + NARRATIVE_BRIDGE
           → UPDATE_VALIDATION_CHECKLIST (KB) → SAH/CVC actualizados
           → [Editor anota — sin IA]
           → [RAMA A] RESEARCH_DEEP_DIVE
           → [RAMA B] CREATE_RESEARCH_PLAN → EXECUTE_RESEARCH_PLAN → RESEARCH_REPORT(s)
           → EVALUATE_RESEARCH_REPORT (EVAL)
```

## Gaps abiertos

Ver: `/_system/audits/RESEARCH_COMPONENT_AUDIT_v1.1.md`

## Interfaces

**Recibe de:** Knowledge Base (SAH, CVC, FOCUS_TYPES), Activation (BOOK_BRIEF — opcional)  
**Entrega a:** Writing (RESEARCH_REPORT(s) o RESEARCH_DEEP_DIVE)
```

---

### shared/README.md

```markdown
# Prompts compartidos

Prompts usados por más de un subsistema. Owner principal indicado en cada artefacto.

| Prompt | Owner | Usado por |
|---|---|---|
| PROMPT_WRITE_POST | writing-dev | Writing (Post), Activation |
| PROMPT_CREATE_TIMELINE | writing-dev | Writing (Book), Activation |
| PROMPT_CREATE_CAST | writing-dev | Writing (Book), Activation |

**Regla de cambios:** El chat owner notifica a todos los subsistemas afectados via
DECISION_LOG entry antes de mergear cambios a main.
```

---

## PARTE 4: CONFIGURACIÓN DE BRANCHES

Una vez creado el repositorio con la estructura:

**Branch main:** Código de producción. Protegido — requiere PR para mergear.

**Branches de desarrollo** (crear cuando se activa cada chat):
```
kb/dev          ← knowledge-base-dev
research/dev    ← research-dev  
editorial/dev   ← editorial-profile-dev
writing/dev     ← writing-dev
evaluation/dev  ← evaluation-dev
activation/dev  ← activation-dev
docs/dev        ← docs-dev
```

**Flujo de trabajo:**
```
Chat trabaja en su branch → crea PR → editor revisa y aprueba → merge a main
```

Con un solo desarrollador activo, el editor puede optar por hacer merge directo a main para agilizar. Se recomienda mantener el flujo de PR cuando haya más de un desarrollador.

---

## PARTE 5: INSTRUCCIONES PARA INICIALIZAR DESDE CLAUDE

Una vez configurado el GitHub MCP, ejecutar en un chat de Claude:

```
"Usando el GitHub MCP, inicializa el repositorio dx-opus con la estructura 
definida en TOOL_GITHUB_REPO_STRUCTURE_v1.0.md. Crea todas las carpetas 
con sus README y sube los artefactos de Fase 0 que ya están preparados."
```

Claude ejecutará la secuencia:
1. Crear carpetas con `create_or_update_file` para cada README
2. Subir los 6 artefactos de Fase 0 a sus rutas correctas
3. Crear las branches de desarrollo
4. Confirmar estructura completa con `get_file_contents`

---

**FIN DEL DOCUMENTO**
