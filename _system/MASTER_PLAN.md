---
id:          MASTER_PLAN
type:        SCHEMA
subsystem:   SYSTEM
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-16
owner_chat:  system-architecture
---

# MASTER PLAN — SISTEMA D-X-OPUS

## Consolidación de decisiones y trabajo pendiente

**Versión:** 1.4
**Fecha:** 16 abril 2026
**Scope:** Estado real del sistema al cierre de Release 1 (Sprints 0–3 + Sprint cierre R1)

**Changelog v1.4:**

* Añadida DECISIÓN-16: Scope flujo POST en Activation para R1 (DL_20260416_SYSTEM_025)
* Añadida DECISIÓN-17: Ubicación WORKFLOW_WRITING (DL_20260416_SYSTEM_026)
* Actualizado DECISIÓN-03: EVALUATE_BOOK_STYLE v1.1 y EVALUATE_POST v1.0 completados
* PARTE 2: N-04, N-06, N-08 marcados como completados; N-05, N-07 aún pendientes
* PARTE 3.1: añadidos artefactos Sprint 3 (RAMA POST, PROMPT_EVALUATE_POST, DL entries)
* PARTE 3.2: actualizado estado de evaluadores y workflows post Sprint 3
* PARTE 4.3: todos los CONTEXT docs actualizados a versiones Sprint 3
* PARTE 5: FASE 1, 3 y 4 actualizadas con completados de Sprint 3 y Sprint cierre R1
* PARTE 6: reemplazado backlog Sprint 2 con backlog Sprint cierre R1
* PARTE 7: GAP-R06 marcado como resuelto (GUIDE_ANNOTATION_PHASE3 verificado en repo)

**Changelog v1.3:**

* Añadida DECISIÓN-15: GitHub MCP no disponible en Plan Pro — flujo manual asistido
* Actualizado estado de artefactos en PARTE 2: N-01, N-02, N-03, N-09, N-10, N-11, N-12, N-13 completados
* Actualizado estado en PARTE 3.2: F2-01 a F2-04 completados, F3-02 parcialmente completado
* Actualizado estado en PARTE 4: repositorio creado, CONTEXT docs completados
* Actualizado PARTE 5: FASE 0 y FASE 2 completadas, FASE 1 parcial, FASE 3 parcial
* Añadida PARTE 6: backlog real del Sprint 2

**Changelog v1.2:**

* Actualizada DECISIÓN-07: prompts compartidos en `/writing/shared/` (Writing es owner explícito)
* Añadida regla de ownership basada en criterio de desarrollo, no en frecuencia de uso

**Changelog v1.1:**

* Añadida DECISIÓN-14: herramientas operativas (TOOLING) pertenecen a SYSTEM
* Añadido tipo TOOL como séptimo tipo válido de artefacto
* Añadidos N-12 (TOOL_SETUP_PROJECT) y N-13 (TOOL_GITHUB_REPO_STRUCTURE) a artefactos nuevos
* Actualizado subsistema 0 para incluir responsabilidad de TOOLING
* Actualizada RESOURCE_ARTIFACT_HEADER_STANDARD para incluir tipo TOOL

---

## PARTE 1: DECISIONES TOMADAS

---

### 1.1 Arquitectura de Subsistemas

**DECISIÓN-01:** El sistema D-X-OPUS se organiza en 8 subsistemas con chats de desarrollo independientes.

| # | Subsistema | Rol | Estado |
|---|---|---|---|
| 0 | SYSTEM | Arquitectura, estándares, decisiones globales, herramientas operativas (TOOLING). Owner: este chat. | ✅ Activo |
| 1 | KNOWLEDGE BASE | Recursos globales acumulativos (SAH, CVC, Focus Types) + UPDATE_VALIDATION_CHECKLIST | ✅ Definido |
| 2 | RESEARCH | Investigación: desde referencias brutas hasta RESEARCH_REPORTs | ✅ Definido |
| 3 | EDITORIAL PROFILE | Perfil del autor, estilo editorial, tipos de libro | ✅ Definido |
| 4 | WRITING | Escritura unificada (Book + Post) con bifurcación editorial | ✅ Definido |
| 5 | EVALUATION | Evaluadores independientes + contrato de evaluación | ✅ Definido |
| 6 | ACTIVATION | Campaña de contenido desde libros + generación de BOOK_BRIEF | ✅ Definido |
| 7 | DOCS | Documentación del sistema: diseño, implementación, manuales | ✅ Definido |

---

### 1.2 Decisiones sobre Writing

**DECISIÓN-02:** Writing es un subsistema unificado con bifurcación editorial al inicio.

**Ramas:**

* RAMA BOOK: 12 prompts — ✅ Completada (Sprints 0-2)
* RAMA POST: 14 artefactos en `writing/post/` + 1 en `writing/shared/` — ✅ Completada (Sprint 3)

---

### 1.3 Decisiones sobre Evaluation

**DECISIÓN-03:** Evaluation es un subsistema independiente con contrato de evaluación estable.

**Contrato de evaluación (output canónico de cualquier evaluador):**

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [qué debe hacer el editor]
  blocking_issues:   [...] (solo en RED)
  improvement_areas: [...] (en YELLOW)
  strengths:         [...] (siempre)
```

**Evaluadores activos (adoptan el contrato):**

* PROMPT_EVALUATE_RESEARCH_REPORT v1.1 ✅
* PROMPT_EVALUATE_BOOK_CONTENT v1.1 ✅
* PROMPT_EVALUATE_BOOK_STYLE v1.1 ✅ (Sprint cierre R1 — ver DECISIÓN adoptada en Sprint 2, ejecutada en Sprint cierre R1)
* PROMPT_EVALUATE_POST v1.0 ✅ (Sprint 3, 12/04/2026)

**Evaluadores pendientes:**

* PROMPT_EVALUATE_ACTIVATION v1.0 (diseñar — Sprint 4)

---

### 1.4 Decisiones sobre Knowledge Base

**DECISIÓN-04:** UPDATE_VALIDATION_CHECKLIST pertenece al subsistema RESEARCH, pero KNOWLEDGE BASE define el esquema canónico de SAH y CVC.

**DECISIÓN-05:** Los focus types de Research se extraen de CREATE_RESEARCH_PLAN a un recurso independiente: RESOURCE_RESEARCH_FOCUS_TYPES. ✅ Completado (v1.1)

---

### 1.5 Decisiones sobre Activation → Book

**DECISIÓN-06:** Activation puede proponer 3-4 ideas para un nuevo libro (BOOK_BRIEF). El flujo es:

```
ACTIVATION → BOOK_BRIEF → [editor decide] → RESEARCH (input opcional en Fase 0) → WRITING BOOK
```

---

### 1.6 Decisiones sobre prompts compartidos

**DECISIÓN-07:** Los prompts usados por más de un subsistema viven en `/writing/shared/`. Owner: writing-dev.

**Prompts compartidos:**

* `WRITE_POST` — owner: writing-dev — invocado por: Writing (Post), Activation
* `CREATE_TIMELINE` — owner: writing-dev — invocado por: Writing Book, Activation
* `CREATE_CAST` — owner: writing-dev — invocado por: Writing Book, Activation

---

### 1.7 Decisiones sobre nomenclatura

**DECISIÓN-08:** Naming convention unificada. Ver NAMING_CONVENTION_ANALYSIS para detalle.

**Regla crítica por espacio de trabajo:**

* **GitHub:** Sin versión en el nombre de archivo. Git gestiona el historial. La versión vive solo en la cabecera YAML y en el CHANGELOG interno.
* **Google Drive:** Con versión en el nombre (`_v1.0.md`). Drive no tiene control de versiones nativo.

---

### 1.8 Decisiones sobre cabecera estándar de artefactos

**DECISIÓN-09:** Todos los artefactos del sistema incluyen cabecera YAML estándar. Ver RESOURCE_ARTIFACT_HEADER_STANDARD.

---

### 1.9 Decisiones sobre almacenamiento

**DECISIÓN-10:** GitHub para el sistema, Google Drive para los proyectos de escritura.

**DECISIÓN-11 (revisada por DECISIÓN-15):** ~~Integración con GitHub vía MCP Server oficial.~~ Ver DECISIÓN-15.

**DECISIÓN-12:** Setup de proyectos en Drive mediante Google Apps Script (`TOOL_SETUP_PROJECT`).

---

### 1.10 Decisiones sobre DOCS

**DECISIÓN-13:** DOCS es un subsistema activo con DECISION_LOG como mecanismo de sincronización.

---

### 1.11 Decisiones sobre TOOLING

**DECISIÓN-14:** Las herramientas operativas pertenecen a SYSTEM mientras sean menos de 3. Tipo de artefacto: `TOOL`.

---

### 1.12 Decisiones sobre integración con GitHub

**DECISIÓN-15 (30/03/2026):** El GitHub MCP Server no está disponible en el Plan Pro de Claude.ai. La integración directa Claude → GitHub no es posible en este contexto.

**Flujo de trabajo adoptado — manual asistido:**

* Claude produce artefactos en el Project Knowledge (este proyecto de Claude)
* El editor descarga los archivos y los sube manualmente al repositorio `TINTA-ARTIFICIAL/dx-opus` via interfaz web de GitHub o GitHub Desktop
* Claude prepara los archivos con el naming correcto y la ruta de destino especificada

**Impacto en tareas G-02 y G-03 del MASTER_PLAN:**

* G-02 (configurar MCP): conectado via OAuth pero sin herramientas funcionales en Plan Pro — tarea cerrada como no ejecutable en este plan
* G-03 (test de integración): no aplica

**Revisión futura:** Reevaluar si Anthropic habilita MCP en Plan Pro o si se migra a un plan Team/Enterprise.

---

### 1.13 Decisiones sobre scope del flujo POST en Activation

**DECISIÓN-16 (16/04/2026):** El flujo POST completo (`writing/post/`) no se comparte con Activation en Release 1. Activation invoca únicamente `PROMPT_WRITE_POST` desde `/writing/shared/`, llegando con un POST_SEED ya preparado por su propio workflow interno.

**Referencia:** DL_20260416_SYSTEM_025

**Nota de diseño futuro:** En Sprint 4 o posterior, cuando se diseñe el workflow de generación de posts de Activation, se deberá analizar explícitamente la sinergia con el flujo POST existente. Ver DL_025 para preguntas a responder en ese momento.

---

### 1.14 Decisiones sobre ubicación del WORKFLOW_WRITING

**DECISIÓN-17 (16/04/2026):** `WORKFLOW_WRITING_BOOK.md` se mueve de `writing/book/` a `writing/` (raíz) y se renombra a `WORKFLOW_WRITING.md`. El id interno `WORKFLOW_WRITING` y la versión v2.0 ya son correctos — solo cambian nombre de archivo y ubicación.

**Referencia:** DL_20260416_SYSTEM_026

**Nota de diseño futuro:** Evaluar en Sprint 4+ si la evolución divergente de las ramas Book y Post justifica separar en dos workflows independientes. Ver DL_026 para criterios de decisión.

---

## PARTE 2: ARTEFACTOS A CREAR

Estado actualizado al cierre de Release 1 (16/04/2026).

| # | Artefacto | Tipo | Subsistema | Estado | Versión |
|---|---|---|---|---|---|
| N-01 | RESOURCE_RESEARCH_FOCUS_TYPES | RESOURCE | KNOWLEDGE_BASE | ✅ Completado | v1.1 |
| N-02 | RESOURCE_EVALUATION_FRAMEWORK | RESOURCE | EVALUATION | ✅ Completado | v1.1 |
| N-03 | RESOURCE_ARTIFACT_HEADER_STANDARD | RESOURCE | SYSTEM | ✅ Completado | v1.0 |
| N-04 | GUIDE_ANNOTATION_PHASE3 | GUIDE | RESEARCH | ✅ Completado | v1.0 |
| N-05 | PROMPT_CREATE_BOOK_BRIEF | PROMPT | ACTIVATION | ❌ Pendiente Sprint cierre R1 | — |
| N-06 | PROMPT_EVALUATE_POST | PROMPT | EVALUATION | ✅ Completado Sprint 3 | v1.0 |
| N-07 | PROMPT_EVALUATE_ACTIVATION | PROMPT | EVALUATION | ❌ Pendiente Sprint 4 | — |
| N-08 | WORKFLOW_WRITING | WORKFLOW | WRITING | ✅ Existe como WORKFLOW_WRITING_BOOK.md v2.0 — rename pendiente (DL_026) | v2.0 |
| N-09 | SCHEMA_SYSTEM_ARCHITECTURE | SCHEMA | SYSTEM | ✅ Completado | v1.3 |
| N-10 | SCHEMA_DECISION_LOG | SCHEMA | SYSTEM | ✅ Completado | v2.0 (⚠️ nombre roto en repo — SC-01) |
| N-11 | TEMPLATE_SUBSYSTEM_CONTEXT | TEMPLATE | SYSTEM | ✅ Completado | v1.0 |
| N-12 | TOOL_SETUP_PROJECT | TOOL | SYSTEM | ✅ Completado | v1.0 |
| N-13 | TOOL_GITHUB_REPO_STRUCTURE | TOOL | SYSTEM | ✅ Actualizado | v1.2 |

---

## PARTE 3: ARTEFACTOS A MODIFICAR

### 3.1 Cambios de naming

Pendientes de ejecutar cuando los archivos se suban al repositorio GitHub. Los archivos en Drive conservan la versión en el nombre; en GitHub se suben sin versión.

| Archivo legacy (Drive) | Nombre en GitHub | Estado |
|---|---|---|
| WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL_v3_1.md | WORKFLOW_RESEARCH.md | ✅ v3.2 en repo |
| WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md | WORKFLOW_WRITING.md | ✅ Existe como WORKFLOW_WRITING_BOOK.md v2.0 — rename pendiente WR-02 |
| WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md | WORKFLOW_ACTIVATION.md | ⚠️ v1.4 en repo — requiere v1.5 (AC-01) |
| SOURCE_AUTHORITY_HIERARCHY_v2_0.md | RESOURCE_SOURCE_AUTHORITY.md | ✅ v2.1 en repo — YAML header pendiente KB-01 |
| CLAIM_VALIDATION_CRITERIA_v1_0.md | RESOURCE_CLAIM_VALIDATION.md | ✅ v1.1 en repo — YAML header pendiente KB-02 |
| ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md | RESOURCE_EDITORIAL_STYLE.md | ❌ Pendiente subir (EP-01) |
| TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md | RESOURCE_BOOK_TYPES.md | ❌ Pendiente subir (EP-02) |
| GUIA_NOTAS_DEL_EDITOR.md | GUIDE_EDITOR_NOTES.md | ❌ Pendiente subir (EP-02) |
| TEMPLATE_NOTAS_DEL_EDITOR.md | TEMPLATE_EDITOR_NOTES.md | ❌ Pendiente subir (EP-02) |
| EDITOR_PROFILE_TEMPLATE.md | TEMPLATE_EDITOR_PROFILE.md | ❌ Pendiente subir (EP-02) |
| PROMPT_CREATE_CAST_v1_0_.md | PROMPT_CREATE_CAST.md | ✅ En repo writing/shared/ |
| PROMPT_WRITE_PROLOGO_v1_0.md | PROMPT_WRITE_PROLOGUE.md | ✅ En repo writing/book/ |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | PROMPT_CREATE_BOOK_SHEET.md | ✅ En repo writing/book/ |
| PROMPT_RESEARCH_DEEP_DIVE_v1_1.md | PROMPT_RESEARCH_DEEP_DIVE.md | ❌ Pendiente subir (RE-01) |
| PROMPT_EXECUTE_RESEARCH_PLAN_v1_0.md | PROMPT_EXECUTE_RESEARCH_PLAN.md | ❌ Pendiente subir (RE-01) |

**Artefactos Sprint 3 ya en GitHub (naming correcto):**

| Artefacto | Ubicación | Estado |
|---|---|---|
| PROMPT_POST_BRIEF.md | writing/post/ | ✅ v1.0 |
| PROMPT_POST_EXPLORE.md | writing/post/ | ✅ v1.0 |
| PROMPT_SUMMARIZE_REF.md | writing/post/ | ✅ v1.0 |
| PROMPT_VERIFY_RESEARCH.md | writing/post/ | ✅ v1.0 |
| PROMPT_QA_IDEAS.md | writing/post/ | ✅ v1.0 |
| PROMPT_POST_ANGLES.md | writing/post/ | ✅ v1.0 |
| PROMPT_PLAN_POST.md | writing/post/ | ✅ v1.0 |
| PROMPT_SPLIT_POST.md | writing/post/ | ✅ v1.0 |
| RESOURCE_WRITING_CONTEXT.md | writing/post/ | ✅ v1.0 |
| RESOURCE_PUBLICATION_PROFILE.md | writing/post/ | ✅ v1.0 |
| SPEC_LEARNING_SIGNALS.md | writing/post/ | ✅ v1.0 |
| TEMPLATE_POST_SEED.md | writing/post/ | ✅ v1.0 |
| TEMPLATE_POST_BRIEFING.md | writing/post/ | ✅ v1.0 |
| PROMPT_WRITE_POST.md | writing/shared/ | ✅ v2.0 |
| PROMPT_EVALUATE_POST.md | evaluation/ | ✅ v1.0 |

### 3.2 Cambios de contenido

| Artefacto | Versión anterior → actual | Estado | Versión objetivo |
|---|---|---|---|
| PROMPT_SUMMARIZE_REFERENCES | v4.0 → v4.1 | ✅ Completado | — |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.0 → v3.1 | ✅ Completado | — |
| PROMPT_CREATE_RESEARCH_PLAN | v2.1.2 → v2.2 | ✅ Completado | v3.0 pendiente (RE-02) |
| WORKFLOW_RESEARCH | v3.1 → v3.2 | ✅ Completado | — |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.0 → v1.1 | ✅ Completado | — |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.0 → v1.1 | ✅ Completado | — |
| RESOURCE_SOURCE_AUTHORITY | v2.0 → v2.1 | ✅ Completado | v2.2 (añadir YAML header — KB-01) |
| RESOURCE_CLAIM_VALIDATION | v1.0 → v1.1 | ✅ Completado | v1.2 (añadir YAML header — KB-02) |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 → v1.1 | ✅ Completado Sprint cierre R1 | — |
| RESOURCE_EVALUATION_FRAMEWORK | v1.0 → v1.1 | ✅ Completado Sprint cierre R1 | — |
| CONTEXT_EVALUATION | v1.3 → v1.4 | ✅ Completado Sprint cierre R1 | — |
| WORKFLOW_WRITING | v1.7 → v2.0 | ✅ Completado Sprint 3 como WORKFLOW_WRITING_BOOK.md | Rename pendiente WR-02 |
| TOOL_GITHUB_REPO_STRUCTURE | v1.1 → v1.2 | ✅ Completado Sprint cierre R1 | — |
| CONTEXT_WRITING | v1.2 → v1.3 | ❌ Pendiente (WR-01) | v1.3 |
| WORKFLOW_ACTIVATION | v1.4 → v1.5 | ❌ Pendiente (AC-01) | v1.5 |
| CONTEXT_ACTIVATION | v1.2 → v1.3 | ❌ Pendiente (AC-02) | v1.3 |

---

## PARTE 4: SETUP TÉCNICO

### 4.1 GitHub

| # | Tarea | Estado |
|---|---|---|
| G-01 | Crear repositorio `dx-opus` (privado) en TINTA-ARTIFICIAL | ✅ Completado |
| G-02 | Configurar GitHub en Claude.ai | ✅ OAuth conectado — MCP no disponible en Plan Pro (DECISIÓN-15) |
| G-03 | Test de integración | ❌ No aplica (ver DECISIÓN-15) |
| G-04 | Crear estructura de carpetas del repositorio con READMEs | ✅ Completado |
| G-05 | Subir artefactos existentes con naming correcto | ⏳ En curso — ver PARTE 3 pendientes |
| G-06 | Configurar branch protection en main | ❌ Pendiente — acción del editor |
| G-07 | Crear ramas de desarrollo por subsistema | ❌ Pendiente |

### 4.2 Google Drive

| # | Tarea | Estado |
|---|---|---|
| D-01 | Crear TOOL_SETUP_PROJECT | ✅ Completado |
| D-02 | Almacenar en GitHub bajo `/tools/` | ✅ Completado |
| D-03 | Test: ejecutar script en un proyecto real | ❌ Pendiente |

### 4.3 Documentos de contexto para chats de desarrollo

| Chat | Versión | Estado |
|---|---|---|
| CONTEXT_SYSTEM (este chat) | — | ✅ MASTER_PLAN como contexto implícito |
| CONTEXT_KNOWLEDGE_BASE | v1.3 | ✅ Completado |
| CONTEXT_RESEARCH | v1.2 | ✅ Completado |
| CONTEXT_EDITORIAL_PROFILE | v1.3 | ✅ Completado |
| CONTEXT_WRITING | v1.2 | ⚠️ Requiere v1.3 (WR-01 pendiente) |
| CONTEXT_EVALUATION | v1.4 | ✅ Completado Sprint cierre R1 |
| CONTEXT_ACTIVATION | v1.2 | ⚠️ Requiere v1.3 (AC-02 pendiente) |
| CONTEXT_DOCS | v1.2 | ✅ Completado |

---

## PARTE 5: PLAN DE EJECUCIÓN

### FASE 0 — Fundamentos ✅ COMPLETADA

| # | Tarea | Estado |
|---|---|---|
| F0-01 | Crear RESOURCE_ARTIFACT_HEADER_STANDARD | ✅ v1.0 |
| F0-02 | Crear SCHEMA_SYSTEM_ARCHITECTURE | ✅ v1.3 |
| F0-03 | Crear SCHEMA_DECISION_LOG | ✅ v2.0 (⚠️ nombre roto en repo — SC-01 pendiente) |
| F0-04 | Crear TEMPLATE_SUBSYSTEM_CONTEXT | ✅ v1.0 |
| F0-05 | Crear TOOL_SETUP_PROJECT | ✅ v1.0 |
| F0-06 | Crear TOOL_GITHUB_REPO_STRUCTURE | ✅ v1.2 |
| F0-07 | Setup GitHub | ✅ Repositorio creado — MCP no disponible, flujo manual (DECISIÓN-15) |

---

### FASE 1 — Nuevos recursos del sistema ✅ COMPLETADA

| # | Tarea | Estado |
|---|---|---|
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES | ✅ v1.1 |
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | ✅ v1.1 |
| F1-03 | Crear GUIDE_ANNOTATION_PHASE3 | ✅ v1.0 (verificado en repo Sprint cierre R1) |
| F1-04 | Crear TOOL_SETUP_PROJECT | ✅ v1.0 |

---

### FASE 2 — Correcciones críticas en Research ✅ COMPLETADA

| # | Tarea | Estado | GAP resuelto |
|---|---|---|---|
| F2-01 | WORKFLOW_RESEARCH estructura canónica | ✅ v3.2 | R01, R02, R03 |
| F2-02 | Corregir UPDATE_VALIDATION_CHECKLIST | ✅ v3.1 | R05 |
| F2-03 | Actualizar CREATE_RESEARCH_PLAN referencias | ✅ v2.2 | R01, R02 |
| F2-04 | Añadir SAH+CVC a SUMMARIZE_REFERENCES | ✅ v4.1 | R04 |

---

### FASE 3 — Refactors arquitectónicos ✅ COMPLETADA (excepto F3-01)

| # | Tarea | Estado |
|---|---|---|
| F3-01 | Externalizar focus types → CREATE_RESEARCH_PLAN v3.0 | ⏳ Pendiente Sprint cierre R1 (RE-02) |
| F3-02 | Adoptar contrato de evaluación en evaluadores | ✅ EVALUATE_RESEARCH_REPORT v1.1, EVALUATE_BOOK_CONTENT v1.1, EVALUATE_BOOK_STYLE v1.1, EVALUATE_POST v1.0 |
| F3-03 | Clarificar EVALUATE_RESEARCH_REPORT para RAMA A | ✅ Incluido en v1.1 |
| F3-04 | Subir artefactos a GitHub con naming correcto | ⏳ En curso — ver pendientes PARTE 3 |
| F3-05 | Crear documentos de contexto para 7 chats | ✅ Todos completados |

---

### FASE 4 — Nuevos componentes ✅ COMPLETADA PARCIALMENTE (Sprint 3)

| # | Tarea | Estado | Sprint |
|---|---|---|---|
| F4-01 | WORKFLOW_WRITING v2.0 con bifurcación | ✅ Completado como WORKFLOW_WRITING_BOOK.md — rename pendiente WR-02 | Sprint 3 |
| F4-02 | Rama Post de Writing | ✅ 14 artefactos en writing/post/ + PROMPT_WRITE_POST v2.0 en shared/ | Sprint 3 |
| F4-03 | PROMPT_CREATE_BOOK_BRIEF | ❌ Pendiente Sprint cierre R1 (AC-03) | — |
| F4-04 | PROMPT_EVALUATE_POST | ✅ v1.0 | Sprint 3 |
| F4-05 | PROMPT_EVALUATE_ACTIVATION | ❌ Pendiente Sprint 4 | — |
| F4-06 | Estructura de DOCS y primeros documentos | ❌ Pendiente Sprint 4 | — |

---

### FASE 5 — Menor prioridad ❌ PENDIENTE

| # | Tarea |
|---|---|
| F5-01 | Decisión sobre secciones 4-6 de NARRATIVE_BRIDGE (GAP-R09) |
| F5-02 | Decisión sobre "Practical Applications" sin consumidor (GAP-R08) |
| F5-03 | Renaming global de prompts legacy en Drive |

---

## PARTE 6: BACKLOG SPRINT CIERRE R1 (activo al 16/04/2026)

### Fase 1 — Decisiones arquitectónicas ✅ COMPLETADA

| ID | Tarea | Estado |
|---|---|---|
| D1 | Scope flujo POST en Activation (issue #7) | ✅ DL_20260416_SYSTEM_025 |
| D2 | Ubicación WORKFLOW_WRITING | ✅ DL_20260416_SYSTEM_026 |

### Fase 2 — Correcciones por subsistema

| ID | Tarea | Artefacto | Estado | Chat |
|---|---|---|---|---|
| SC-01 | Renombrar SCHEMA_DECISION_LOG md → SCHEMA_DECISION_LOG.md | `_system/` | ❌ Pendiente (rename en GitHub) | system-architecture |
| SC-02+SC-06 | Regularizar DL entries + actualizar status 13 fundacionales | SCHEMA_DECISION_LOG + decisions/ | ❌ Bloqueado por SC-01 | system-architecture |
| SC-03 | TOOL_GITHUB_REPO_STRUCTURE v1.1 → v1.2 | `tools/` | ✅ Completado | system-architecture |
| SC-04 | MASTER_PLAN v1.3 → v1.4 | `_system/` | ✅ Este documento | system-architecture |
| SC-05 | Crear RESEARCH_COMPONENT_AUDIT.md v1.0 | `_system/audits/` | ✅ Completado | system-architecture |
| SC-07 | Corregir decisions/README.md | `_system/decisions/` | ✅ Completado | system-architecture |
| EV-01 | PROMPT_EVALUATE_BOOK_STYLE v1.0 → v1.1 | `evaluation/` | ✅ Completado | evaluation-dev |
| EV-02 | RESOURCE_EVALUATION_FRAMEWORK v1.0 → v1.1 | `evaluation/` | ✅ Completado | evaluation-dev |
| EV-03 | CONTEXT_EVALUATION v1.3 → v1.4 | `evaluation/` | ✅ Completado | evaluation-dev |
| AC-01 | WORKFLOW_ACTIVATION v1.4 → v1.5 | `activation/` | ❌ Pendiente | activation-dev |
| AC-02 | CONTEXT_ACTIVATION v1.2 → v1.3 | `activation/` | ❌ Pendiente | activation-dev |
| AC-03 | Crear PROMPT_CREATE_BOOK_BRIEF v1.0 | `activation/` | ❌ Pendiente | activation-dev |
| WR-01 | CONTEXT_WRITING v1.2 → v1.3 | `writing/` | ❌ Pendiente | writing-dev |
| WR-02 | Mover WORKFLOW_WRITING_BOOK → writing/WORKFLOW_WRITING.md | `writing/` | ❌ Pendiente | writing-dev |
| WR-03 | YAML headers en 9 prompts legacy (book/ y shared/) | `writing/book/`, `writing/shared/` | ❌ Pendiente | writing-dev |
| RE-01 | Subir PROMPT_RESEARCH_DEEP_DIVE y PROMPT_EXECUTE_RESEARCH_PLAN | `research/` | ❌ Pendiente | research-dev |
| RE-02 | PROMPT_CREATE_RESEARCH_PLAN v2.2 → v3.0 | `research/` | ❌ Pendiente | research-dev |
| RE-03 | YAML headers en 4 prompts legacy de research | `research/` | ❌ Pendiente | research-dev |
| RE-04 | Corregir stale reference WORKFLOW_RESEARCH changelog | `research/` | ❌ Pendiente | research-dev |
| KB-01 | YAML header RESOURCE_SOURCE_AUTHORITY (v2.1 → v2.2) | `knowledge-base/` | ❌ Pendiente | knowledge-base-dev |
| KB-02 | YAML header RESOURCE_CLAIM_VALIDATION (v1.1 → v1.2) | `knowledge-base/` | ❌ Pendiente | knowledge-base-dev |
| EP-01 | Migrar RESOURCE_EDITORIAL_STYLE desde Drive | `editorial-profile/` | ❌ Pendiente | editorial-profile-dev |
| EP-02 | Migrar TEMPLATE_EDITOR_PROFILE, TEMPLATE_EDITOR_NOTES, GUIDE_EDITOR_NOTES | `editorial-profile/` | ❌ Pendiente | editorial-profile-dev |
| EP-03 | Verificar PROMPT_CREATE_EDITOR_PROFILE y RESOURCE_BOOK_TYPES | `editorial-profile/` | ❌ Pendiente | editorial-profile-dev |

### Fase 3 — READMEs (issue #8)

| ID | Tarea | Estado |
|---|---|---|
| README-01 | README `_system/` actualizado | ❌ Pendiente |
| README-02 | README `research/` actualizado | ❌ Pendiente |
| README-03 | README `editorial-profile/` actualizado | ❌ Pendiente |
| README-04 | README `writing/` actualizado | ❌ Pendiente |
| README-05 | README `evaluation/` actualizado | ❌ Pendiente |
| README-06 | README `activation/` actualizado | ❌ Pendiente |

### Fase 4 — Nuevo artefacto (issue #9)

| ID | Tarea | Estado |
|---|---|---|
| SY-01 | Crear GUIDE_DEV_PROTOCOL.md v1.0 | ❌ Pendiente |

### Fase 5 — Correcciones transversales menores

| ID | Tarea | Estado |
|---|---|---|
| DOC-01 | Eliminar versiones de campos DEPENDENCIES en CONTEXT_KNOWLEDGE_BASE, CONTEXT_ACTIVATION, CONTEXT_RESEARCH | ❌ Pendiente |

### Fase 6 — Documentación de cierre R1

| ID | Tarea | Estado |
|---|---|---|
| RC-01 | RELEASE_NOTES_R1.md | ❌ Pendiente |
| RC-02 | Actualización CONTEXT docs de todos los subsistemas | ❌ Pendiente (parcial — EV-03 completado) |

---

## PARTE 7: RESUMEN DE GAPS DE RESEARCH

Estado actualizado al cierre de Release 1 (16/04/2026).

| ID | Descripción | Severidad | Estado |
|---|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: inconsistencia prompt/workflow | 🔴 CRÍTICO | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R02 | Estructura RESEARCH_PLAN: inconsistencia prompt/workflow | 🔴 CRÍTICO | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R04 | SUMMARIZE_REFERENCES sin SAH ni CVC | 🔴 CRÍTICO | ✅ Resuelto (v4.1) |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referencia sección inexistente | 🔴 CRÍTICO | ✅ Resuelto (v3.1) |
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia prompt/workflow | 🟠 IMPORTANTE | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R07 | EVALUATE no cubre RESEARCH_DEEP_DIVE (RAMA A) | 🟠 IMPORTANTE | ✅ Resuelto (EVALUATE v1.1) |
| GAP-R06 | Fase 3 sin soporte ni guía estructurada | 🟠 IMPORTANTE | ✅ Resuelto (GUIDE_ANNOTATION_PHASE3 v1.0) |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN | 🟠 IMPORTANTE | ⏳ Pendiente Sprint cierre R1 (RE-02) |
| GAP-R08 | "Practical Applications" sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R10 | Naming inconsistente SUMMARIZE_REFERENCES | 🟡 MENOR | ❌ Pendiente Fase 5 |

---

**FIN DEL DOCUMENTO**
