---
id:          MASTER_PLAN
type:        SCHEMA
subsystem:   SYSTEM
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-30
owner_chat:  system-architecture
---

# MASTER PLAN — SISTEMA D-X-OPUS
## Consolidación de decisiones y trabajo pendiente

**Versión:** 1.3
**Fecha:** 30 marzo 2026
**Scope:** Estado real del sistema tras Sprint 1 y Sprint 2 parcial

**Changelog v1.3:**
- Añadida DECISIÓN-15: GitHub MCP no disponible en Plan Pro — flujo manual asistido
- Actualizado estado de artefactos en PARTE 2: N-01, N-02, N-03, N-09, N-10, N-11, N-12, N-13 completados
- Actualizado estado en PARTE 3.2: F2-01 a F2-04 completados, F3-02 parcialmente completado
- Actualizado estado en PARTE 4: repositorio creado, CONTEXT docs completados
- Actualizado PARTE 5: FASE 0 y FASE 2 completadas, FASE 1 parcial, FASE 3 parcial
- Añadida PARTE 6: backlog real del Sprint 2

**Changelog v1.2:**
- Actualizada DECISIÓN-07: prompts compartidos en `/writing/shared/` (Writing es owner explícito)
- Añadida regla de ownership basada en criterio de desarrollo, no en frecuencia de uso

**Changelog v1.1:**
- Añadida DECISIÓN-14: herramientas operativas (TOOLING) pertenecen a SYSTEM
- Añadido tipo TOOL como séptimo tipo válido de artefacto
- Añadidos N-12 (TOOL_SETUP_PROJECT) y N-13 (TOOL_GITHUB_REPO_STRUCTURE) a artefactos nuevos
- Actualizado subsistema 0 para incluir responsabilidad de TOOLING
- Actualizada RESOURCE_ARTIFACT_HEADER_STANDARD para incluir tipo TOOL

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
- RAMA BOOK: 12 prompts existentes
- RAMA POST: 4-5 prompts pendientes de diseño

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
- PROMPT_EVALUATE_RESEARCH_REPORT v1.1 ✅
- PROMPT_EVALUATE_BOOK_CONTENT v1.1 ✅

**Evaluadores pendientes:**
- PROMPT_EVALUATE_BOOK_STYLE v1.1 (adoptar contrato — owner: Editorial Profile)
- PROMPT_EVALUATE_POST v1.0 (diseñar)
- PROMPT_EVALUATE_ACTIVATION v1.0 (diseñar)

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
- `WRITE_POST` — owner: writing-dev — invocado por: Writing (Post), Activation
- `CREATE_TIMELINE` — owner: writing-dev — invocado por: Writing Book, Activation
- `CREATE_CAST` — owner: writing-dev — invocado por: Writing Book, Activation

---

### 1.7 Decisiones sobre nomenclatura

**DECISIÓN-08:** Naming convention unificada. Ver NAMING_CONVENTION_ANALYSIS para detalle.

**Regla crítica por espacio de trabajo:**
- **GitHub:** Sin versión en el nombre de archivo. Git gestiona el historial. La versión vive solo en la cabecera YAML y en el CHANGELOG interno.
- **Google Drive:** Con versión en el nombre (`_v1.0.md`). Drive no tiene control de versiones nativo.

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

**DECISIÓN-15 (nueva — 30/03/2026):** El GitHub MCP Server no está disponible en el Plan Pro de Claude.ai. La integración directa Claude → GitHub no es posible en este contexto.

**Flujo de trabajo adoptado — manual asistido:**
- Claude produce artefactos en el Project Knowledge (este proyecto de Claude)
- El editor descarga los archivos y los sube manualmente al repositorio `TINTA-ARTIFICIAL/dx-opus` via interfaz web de GitHub o GitHub Desktop
- Claude prepara los archivos con el naming correcto y la ruta de destino especificada

**Impacto en tareas G-02 y G-03 del MASTER_PLAN:**
- G-02 (configurar MCP): conectado via OAuth pero sin herramientas funcionales en Plan Pro — tarea cerrada como no ejecutable en este plan
- G-03 (test de integración): no aplica

**Revisión futura:** Reevaluar si Anthropic habilita MCP en Plan Pro o si se migra a un plan Team/Enterprise.

---

## PARTE 2: ARTEFACTOS A CREAR

Estado actualizado al 30/03/2026.

| # | Artefacto | Tipo | Subsistema | Estado | Versión |
|---|---|---|---|---|---|
| N-01 | RESOURCE_RESEARCH_FOCUS_TYPES | RESOURCE | KNOWLEDGE_BASE | ✅ Completado | v1.1 |
| N-02 | RESOURCE_EVALUATION_FRAMEWORK | RESOURCE | EVALUATION | ✅ Completado | v1.0 |
| N-03 | RESOURCE_ARTIFACT_HEADER_STANDARD | RESOURCE | SYSTEM | ✅ Completado | v1.0 |
| N-04 | GUIDE_ANNOTATION_PHASE3 | GUIDE | RESEARCH | ❌ Pendiente | — |
| N-05 | PROMPT_CREATE_BOOK_BRIEF | PROMPT | ACTIVATION | ❌ Pendiente | — |
| N-06 | PROMPT_EVALUATE_POST | PROMPT | EVALUATION | ❌ Pendiente | — |
| N-07 | PROMPT_EVALUATE_ACTIVATION | PROMPT | EVALUATION | ❌ Pendiente | — |
| N-08 | WORKFLOW_WRITING | WORKFLOW | WRITING | ❌ Pendiente | — |
| N-09 | SCHEMA_SYSTEM_ARCHITECTURE | SCHEMA | SYSTEM | ✅ Completado | v1.2 |
| N-10 | SCHEMA_DECISION_LOG | SCHEMA | SYSTEM | ✅ Completado | v2.0 |
| N-11 | TEMPLATE_SUBSYSTEM_CONTEXT | TEMPLATE | SYSTEM | ✅ Completado | v1.0 |
| N-12 | TOOL_SETUP_PROJECT | TOOL | SYSTEM | ✅ Completado | v1.0 |
| N-13 | TOOL_GITHUB_REPO_STRUCTURE | TOOL | SYSTEM | ⚠️ Actualización pendiente | v1.0 → v1.1 |

---

## PARTE 3: ARTEFACTOS A MODIFICAR

### 3.1 Cambios de naming

Pendientes de ejecutar cuando los archivos se suban al repositorio GitHub. Los archivos en Drive conservan la versión en el nombre; en GitHub se suben sin versión.

| Archivo legacy (Drive) | Nombre en GitHub | Estado |
|---|---|---|
| WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL_v3_1.md | WORKFLOW_RESEARCH.md | ✅ Subir versión v3.2 |
| WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md | WORKFLOW_WRITING.md | ❌ Pendiente v2.0 |
| WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md | WORKFLOW_ACTIVATION.md | ❌ Pendiente subir |
| SOURCE_AUTHORITY_HIERARCHY_v2_0.md | RESOURCE_SOURCE_AUTHORITY.md | ✅ Subir versión v2.1 |
| CLAIM_VALIDATION_CRITERIA_v1_0.md | RESOURCE_CLAIM_VALIDATION.md | ✅ Subir versión v1.1 |
| ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md | RESOURCE_EDITORIAL_STYLE.md | ❌ Pendiente subir |
| TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md | RESOURCE_BOOK_TYPES.md | ❌ Pendiente subir |
| GUIA_NOTAS_DEL_EDITOR.md | GUIDE_EDITOR_NOTES.md | ❌ Pendiente subir |
| TEMPLATE_NOTAS_DEL_EDITOR.md | TEMPLATE_EDITOR_NOTES.md | ❌ Pendiente subir |
| EDITOR_PROFILE_TEMPLATE.md | TEMPLATE_EDITOR_PROFILE.md | ❌ Pendiente subir |
| PROMPT_CREATE_CAST_v1_0_.md | PROMPT_CREATE_CAST.md | ❌ Pendiente subir |
| PROMPT_WRITE_PROLOGO_v1_0.md | PROMPT_WRITE_PROLOGUE.md | ❌ Pendiente subir |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | PROMPT_CREATE_BOOK_SHEET.md | ❌ Pendiente subir |

### 3.2 Cambios de contenido

| Artefacto | Versión anterior → actual | Estado | Versión objetivo |
|---|---|---|---|
| PROMPT_SUMMARIZE_REFERENCES | v4.0 → v4.1 | ✅ Completado | — |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.0 → v3.1 | ✅ Completado | — |
| PROMPT_CREATE_RESEARCH_PLAN | v2.1.2 → v2.2 | ✅ Completado | v3.0 pendiente (externalizar focus types) |
| WORKFLOW_RESEARCH | v3.1 → v3.2 | ✅ Completado | — |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.0 → v1.1 | ✅ Completado | — |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.0 → v1.1 | ✅ Completado | — |
| RESOURCE_SOURCE_AUTHORITY | v2.0 → v2.1 | ✅ Completado | — |
| RESOURCE_CLAIM_VALIDATION | v1.0 → v1.1 | ✅ Completado | — |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 | ❌ Pendiente | v1.1 (adoptar contrato evaluación) |
| WORKFLOW_WRITING | v1.7 | ❌ Pendiente | v2.0 (bifurcación Book/Post) |
| TOOL_GITHUB_REPO_STRUCTURE | v1.0 | ❌ Pendiente | v1.1 (corregir naming + flujo manual) |

---

## PARTE 4: SETUP TÉCNICO

### 4.1 GitHub

| # | Tarea | Estado |
|---|---|---|
| G-01 | Crear repositorio `dx-opus` (privado) en TINTA-ARTIFICIAL | ✅ Completado |
| G-02 | Configurar GitHub en Claude.ai | ✅ OAuth conectado — MCP no disponible en Plan Pro (DECISIÓN-15) |
| G-03 | Test de integración | ❌ No aplica (ver DECISIÓN-15) |
| G-04 | Crear estructura de carpetas del repositorio con READMEs | ⏳ Pendiente — subida manual (I-01) |
| G-05 | Subir artefactos existentes con naming correcto | ⏳ Pendiente — subida manual (I-01) |
| G-06 | Configurar branch protection en main | ❌ Pendiente — acción del editor |
| G-07 | Crear ramas de desarrollo por subsistema | ❌ Pendiente |

### 4.2 Google Drive

| # | Tarea | Estado |
|---|---|---|
| D-01 | Crear TOOL_SETUP_PROJECT | ✅ Completado |
| D-02 | Almacenar en GitHub bajo `/tools/` | ⏳ Pendiente (I-01) |
| D-03 | Test: ejecutar script en un proyecto real | ❌ Pendiente |

### 4.3 Documentos de contexto para chats de desarrollo

| Chat | Estado |
|---|---|
| CONTEXT_SYSTEM (este chat) | ✅ MASTER_PLAN como contexto implícito |
| CONTEXT_KNOWLEDGE_BASE | ✅ Completado v1.3 |
| CONTEXT_RESEARCH | ✅ Completado v1.2 |
| CONTEXT_EDITORIAL_PROFILE | ✅ Completado v1.2 |
| CONTEXT_WRITING | ✅ Completado v1.2 |
| CONTEXT_EVALUATION | ✅ Completado v1.2 |
| CONTEXT_ACTIVATION | ✅ Completado v1.2 |
| CONTEXT_DOCS | ✅ Completado v1.2 |

---

## PARTE 5: PLAN DE EJECUCIÓN

### FASE 0 — Fundamentos ✅ COMPLETADA

| # | Tarea | Estado |
|---|---|---|
| F0-01 | Crear RESOURCE_ARTIFACT_HEADER_STANDARD | ✅ v1.0 |
| F0-02 | Crear SCHEMA_SYSTEM_ARCHITECTURE | ✅ v1.2 |
| F0-03 | Crear SCHEMA_DECISION_LOG | ✅ v2.0 |
| F0-04 | Crear TEMPLATE_SUBSYSTEM_CONTEXT | ✅ v1.0 |
| F0-05 | Crear TOOL_SETUP_PROJECT | ✅ v1.0 |
| F0-06 | Crear TOOL_GITHUB_REPO_STRUCTURE | ✅ v1.0 (actualización a v1.1 pendiente) |
| F0-07 | Setup GitHub | ✅ Repositorio creado — MCP no disponible, flujo manual (DECISIÓN-15) |

---

### FASE 1 — Nuevos recursos del sistema ✅ COMPLETADA

| # | Tarea | Estado |
|---|---|---|
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES | ✅ v1.1 |
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | ✅ v1.0 |
| F1-03 | Crear GUIDE_ANNOTATION_PHASE3 | ❌ Pendiente Sprint 2 |
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

### FASE 3 — Refactors arquitectónicos 🔄 EN CURSO

| # | Tarea | Estado |
|---|---|---|
| F3-01 | Externalizar focus types → CREATE_RESEARCH_PLAN v3.0 | ❌ Pendiente Sprint 2 |
| F3-02 | Adoptar contrato de evaluación en evaluadores | ✅ EVALUATE_RESEARCH_REPORT v1.1, EVALUATE_BOOK_CONTENT v1.1 / ❌ EVALUATE_BOOK_STYLE v1.1 pendiente |
| F3-03 | Clarificar EVALUATE_RESEARCH_REPORT para RAMA A | ✅ Incluido en v1.1 |
| F3-04 | Subir artefactos a GitHub con naming correcto | ❌ Pendiente Sprint 2 (flujo manual) |
| F3-05 | Crear documentos de contexto para 7 chats | ✅ Todos completados v1.2 |

---

### FASE 4 — Nuevos componentes ❌ PENDIENTE

| # | Tarea | Bloqueado por |
|---|---|---|
| F4-01 | WORKFLOW_WRITING v2.0 con bifurcación | — |
| F4-02 | Rama Post de Writing | F4-01 |
| F4-03 | PROMPT_CREATE_BOOK_BRIEF | — |
| F4-04 | PROMPT_EVALUATE_POST | F4-02 |
| F4-05 | PROMPT_EVALUATE_ACTIVATION | — |
| F4-06 | Estructura de DOCS y primeros documentos | — |

---

### FASE 5 — Menor prioridad ❌ PENDIENTE

| # | Tarea |
|---|---|
| F5-01 | Decisión sobre secciones 4-6 de NARRATIVE_BRIDGE (GAP-R09) |
| F5-02 | Decisión sobre "Practical Applications" sin consumidor (GAP-R08) |
| F5-03 | Renaming global de prompts legacy en Drive |

---

## PARTE 6: BACKLOG SPRINT 2 (activo)

Estado del sprint en curso al 30/03/2026.

### Deuda técnica — prioridad máxima

| ID | Tarea | Artefacto | Estado |
|---|---|---|---|
| D-01 | Actualizar TOOL_GITHUB_REPO_STRUCTURE | v1.0 → v1.1 | ❌ En curso |
| D-02 | Actualizar READMEs desactualizados | múltiples subsistemas | ❌ Pendiente |
| D-03 | Corregir README de decisions (naming incorrecto) | _system/decisions/README.md | ❌ Pendiente |
| D-04 | Actualizar MASTER_PLAN | v1.2 → v1.3 | ✅ Este documento |

### Desarrollo pendiente

| ID | Tarea | Artefacto | Bloqueado por |
|---|---|---|---|
| S2-A | Crear GUIDE_ANNOTATION_PHASE3 | v1.0 nuevo | — |
| S2-B | Externalizar focus types | PROMPT_CREATE_RESEARCH_PLAN v2.2 → v3.0 | — (RESOURCE ya existe) |
| S2-C | Adoptar contrato evaluación | PROMPT_EVALUATE_BOOK_STYLE v1.0 → v1.1 | — (FRAMEWORK ya existe) |

### Infraestructura

| ID | Tarea | Estado |
|---|---|---|
| I-01 | Subir todos los artefactos al repositorio GitHub (manual asistido) | ❌ Pendiente final de sprint |

---

## PARTE 7: RESUMEN DE GAPS DE RESEARCH

Estado actualizado al 30/03/2026.

| ID | Descripción | Severidad | Estado |
|---|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: inconsistencia prompt/workflow | 🔴 CRÍTICO | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R02 | Estructura RESEARCH_PLAN: inconsistencia prompt/workflow | 🔴 CRÍTICO | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R04 | SUMMARIZE_REFERENCES sin SAH ni CVC | 🔴 CRÍTICO | ✅ Resuelto (v4.1) |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referencia sección inexistente | 🔴 CRÍTICO | ✅ Resuelto (v3.1) |
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia prompt/workflow | 🟠 IMPORTANTE | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R07 | EVALUATE no cubre RESEARCH_DEEP_DIVE (RAMA A) | 🟠 IMPORTANTE | ✅ Resuelto (EVALUATE v1.1) |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN | 🟠 IMPORTANTE | ⏳ Pendiente Sprint 2 (S2-B) |
| GAP-R06 | Fase 3 sin soporte ni guía estructurada | 🟠 IMPORTANTE | ⏳ Pendiente Sprint 2 (S2-A) |
| GAP-R08 | "Practical Applications" sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R10 | Naming inconsistente SUMMARIZE_REFERENCES | 🟡 MENOR | ❌ Pendiente Fase 5 |

---

**FIN DEL DOCUMENTO**
