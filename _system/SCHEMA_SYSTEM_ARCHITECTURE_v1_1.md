---
id:          SCHEMA_SYSTEM_ARCHITECTURE
type:        SCHEMA
subsystem:   SYSTEM
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
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
║  UPDATE_      ║ ║  EVAL_BOOK_S ║ ║  Output:            ║
║  VALIDATION   ║ ║  EVAL_BOOK_C ║ ║  EDITOR_PROFILE     ║
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
- Evaluar adherencia al perfil (EVALUATE_BOOK_STYLE)

**Nota:** EVALUATE_BOOK_STYLE pertenece a Editorial Profile, no a Evaluation, porque conoce el EDITOR_PROFILE y evalúa adherencia a él, no calidad objetiva.

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
**Rol:** Evalúa la calidad de los artefactos producidos por otros subsistemas. Puede cambiar el método de evaluación sin modificar los workflows que lo invocan.

**Contrato de evaluación:** Todos los evaluadores producen el mismo formato de output (EVALUATION_RESULT con status GREEN/YELLOW/RED). Los workflows solo leen el status y el decision_guidance.

**Evaluadores existentes:** EVALUATE_RESEARCH_REPORT, EVALUATE_BOOK_CONTENT  
**Evaluadores pendientes:** EVALUATE_POST, EVALUATE_ACTIVATION

**Nota:** EVALUATE_BOOK_STYLE pertenece a Editorial Profile (ver Sub 3).

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

Prompts desarrollados y mantenidos por Writing pero invocados también por Activation. Viven en `/writing/shared/` del repositorio — su ubicación refleja que Writing es el subsistema owner.

| Prompt | Owner | Usado por |
|---|---|---|
| WRITE_POST | writing-dev | Writing (Rama Post), Activation |
| CREATE_TIMELINE | writing-dev | Writing Book, Activation |
| CREATE_CAST | writing-dev | Writing Book, Activation |

**Regla:** writing-dev desarrolla y versiona estos prompts. Cuando hace un cambio, notifica a activation-dev via DECISION_LOG entry antes de mergear a main. activation-dev no propone cambios directamente — los canaliza a writing-dev.

---

## PARTE 5: INTERFACES ENTRE SUBSISTEMAS

Mapa de qué artefactos fluyen entre subsistemas.

| Origen | Destino | Artefacto | Tipo de relación |
|---|---|---|---|
| SYSTEM | Todos | RESOURCE_ARTIFACT_HEADER_STANDARD | Estándar aplicado |
| KNOWLEDGE_BASE | RESEARCH | SAH, CVC, FOCUS_TYPES | Input de proceso |
| RESEARCH | KNOWLEDGE_BASE | SAH/CVC actualizados | Output de UPDATE_VALIDATION |
| RESEARCH | WRITING | RESEARCH_REPORT(s) | Input principal |
| RESEARCH | WRITING | RESEARCH_DEEP_DIVE | Input alternativo (RAMA A) |
| EDITORIAL_PROFILE | WRITING | EDITOR_PROFILE | Input de contexto |
| EDITORIAL_PROFILE | ACTIVATION | EDITOR_PROFILE | Input de contexto |
| WRITING | ACTIVATION | Libro(s) completo(s) | Input de análisis |
| ACTIVATION | RESEARCH | BOOK_BRIEF | Input orientador opcional |
| EVALUATION | Todos | EVALUATION_RESULT | Output de evaluación |
| Todos | DOCS | DECISION_LOG entries | Input de documentación |

---

## PARTE 6: ESTRUCTURA DEL REPOSITORIO GITHUB

```
dx-opus/
├── README.md
├── _system/                    ← Subsistema 0
│   ├── RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0.md
│   ├── SCHEMA_SYSTEM_ARCHITECTURE_v1.0.md
│   ├── SCHEMA_DECISION_LOG_v1.0.md
│   ├── TEMPLATE_SUBSYSTEM_CONTEXT_v1.0.md
│   ├── NAMING_CONVENTION_ANALYSIS_v1.2.md
│   ├── MASTER_PLAN_v1.1.md
│   ├── decisions/
│   │   └── [DECISION_LOG entries por fecha]
│   └── audits/
│       ├── RESEARCH_COMPONENT_AUDIT_v1.1.md
│       └── [futuros audits]
│
├── tools/                      ← TOOLING (owned by SYSTEM)
│   ├── TOOL_SETUP_PROJECT_v1.0.gs
│   └── TOOL_GITHUB_REPO_STRUCTURE_v1.0.md
│
├── knowledge-base/             ← Subsistema 1
│   ├── RESOURCE_SOURCE_AUTHORITY_v2.0.md
│   ├── RESOURCE_CLAIM_VALIDATION_v1.0.md
│   └── RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md  [pendiente]
│       + PROMPT_UPDATE_VALIDATION_CHECKLIST_v3.1.md
│
├── research/                   ← Subsistema 2
│   ├── WORKFLOW_RESEARCH_v3.2.md
│   ├── PROMPT_SUMMARIZE_REFERENCES_v4.1.md
│   ├── PROMPT_RESEARCH_DEEP_DIVE_v1.1.md
│   ├── PROMPT_CREATE_RESEARCH_PLAN_v3.0.md
│   └── PROMPT_EXECUTE_RESEARCH_PLAN_v1.0.md
│
├── editorial-profile/          ← Subsistema 3
│   ├── PROMPT_CREATE_EDITOR_PROFILE_v1.0.md
│   ├── PROMPT_EVALUATE_BOOK_STYLE_v1.1.md
│   ├── RESOURCE_EDITORIAL_STYLE_v1.0.md
│   └── RESOURCE_BOOK_TYPES_v1.2.md
│
├── writing/                    ← Subsistema 4
│   ├── WORKFLOW_WRITING_v2.0.md
│   ├── book/
│   │   ├── PROMPT_CREATE_BOOK_INDEX_v1.0.md
│   │   ├── PROMPT_WRITE_SAMPLE_CHAPTER_v1.0.md
│   │   ├── PROMPT_WRITE_CHAPTER_v1.3.md
│   │   ├── PROMPT_WRITE_INTRODUCTION_v1.0.md
│   │   ├── PROMPT_WRITE_PROLOGUE_v1.0.md
│   │   ├── PROMPT_CONSOLIDATE_REFERENCES_v1.1.md
│   │   └── PROMPT_CREATE_BOOK_SHEET_v1.1.md
│   ├── post/                   [pendiente diseño]
│   └── shared/                 ← Owned by Writing, invoked by Activation
│       ├── PROMPT_WRITE_POST_v1.0.md
│       ├── PROMPT_CREATE_TIMELINE_v1.0.md
│       └── PROMPT_CREATE_CAST_v1.0.md
│
├── evaluation/                 ← Subsistema 5
│   ├── RESOURCE_EVALUATION_FRAMEWORK_v1.0.md  [pendiente]
│   ├── PROMPT_EVALUATE_RESEARCH_REPORT_v1.1.md
│   └── PROMPT_EVALUATE_BOOK_CONTENT_v1.1.md
│
├── activation/                 ← Subsistema 6
│   ├── WORKFLOW_ACTIVATION_v1.4.md
│   └── PROMPT_CREATE_BOOK_BRIEF_v1.0.md  [pendiente]
│
└── docs/                       ← Subsistema 7
    ├── system-design/
    ├── subsystem-docs/
    ├── editor-manuals/
    └── developer-manuals/
```

---

## PARTE 7: FLUJO COMPLETO DEL SISTEMA

El flujo más completo posible (Research → Writing Book → Activation → nuevo libro):

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

**FIN DEL DOCUMENTO**
