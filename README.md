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

- Arquitectura del sistema: `/_system/SCHEMA_SYSTEM_ARCHITECTURE_v1.1.md`
- Naming convention: `/_system/NAMING_CONVENTION_ANALYSIS_v1.2.md`
- Plan de trabajo: `/_system/MASTER_PLAN_v1.2.md`
- Estándar de cabecera: `/_system/RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0.md`

## Setup de proyectos de escritura

Los artefactos de producción (research reports, capítulos, posts) viven en Google Drive,
no en este repositorio. Para crear la estructura de carpetas de un nuevo proyecto:
`/tools/TOOL_SETUP_PROJECT_v1.0.gs`

## Convención de commits
```
[SUBSISTEMA] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore
Subsistemas: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS
```
