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

- Arquitectura del sistema: `/_system/SCHEMA_SYSTEM_ARCHITECTURE.md`
- Naming convention: `/_system/NAMING_CONVENTION_ANALYSIS.md`
- Plan de trabajo: `/_system/MASTER_PLAN.md`
- Estándar de cabecera: `/_system/RESOURCE_ARTIFACT_HEADER_STANDARD.md`

## Regla de naming en este repositorio

**Ningún archivo incluye versión en el nombre.** Git gestiona el historial completo.
La versión vive en la cabecera YAML de cada archivo (`version: X.Y`) y en el CHANGELOG interno.

```
✅ PROMPT_WRITE_CHAPTER.md
❌ PROMPT_WRITE_CHAPTER_v1_3.md
```

## Setup de proyectos de escritura

Los artefactos de producción (research reports, capítulos, posts) viven en Google Drive,
no en este repositorio. Para crear la estructura de carpetas de un nuevo proyecto:
`/tools/TOOL_SETUP_PROJECT.gs`

## Convención de commits

```
[SUBSISTEMA] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore
Subsistemas: SYSTEM | KB | RESEARCH | EDITORIAL | WRITING | EVAL | ACTIVATION | DOCS
```
