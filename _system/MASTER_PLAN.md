---
id:          MASTER_PLAN
type:        SCHEMA
subsystem:   SYSTEM
version:     2.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-09-03
owner_chat:  system-architecture
---

# MASTER PLAN — SISTEMA D-X-OPUS

## Consolidación de decisiones y trabajo pendiente

**Versión:** 2.3  
**Fecha:** 3 septiembre 2026  
**Scope:** Sprint 7 completado (8/8 tickets DONE en `main`); re-triage de 19 issues de GitHub cerradas; Sprint 8 desglosado en 4 tickets

**Changelog v2.3:**

* Sprint 7 marcado ✅ COMPLETADO — los 8 tickets están `DONE` y mergeados en `main`, incluido un conflicto real (pero mecánico) en `hooks/hooks.json` resuelto conservando ambas entradas
* Re-triage del backlog de GitHub: 19 issues cerradas (6 por trabajo ya hecho: #52,#63,#65-parcial→comentada,#66,#70-parcial→comentada,#73,#49/#50-comentadas; 13 por quedar irrelevantes ante la arquitectura de plugin). De 58 abiertas a 43
* Corrección sobre #77: mi cierre inicial era incorrecto — el plugin instala más que `.claude-plugin/`+`skills/`+`hooks/`, porque cada `SKILL.md` referencia contenido de producción del resto del repo. Reabierto y corregido: los 6 `CONTEXT_*.md` de subsistema se movieron a `{subsistema}/dev/` (límite estructural, no un patrón de nombre) — `SCHEMA_SYSTEM_ARCHITECTURE.md` v1.5, `SPEC_PLUGIN_ARCHITECTURE.md` v0.6
* `SCHEMA_SYSTEM_ARCHITECTURE.md` actualizado a v1.4→v1.5: nueva PARTE 8 documentando la arquitectura de plugin, árbol de PARTE 6 refrescado
* Limpiados los 3 hallazgos menores señalados durante Sprint 7 (etiqueta stale en `WORKFLOW_ACTIVATION.md`, inventario desincronizado en `RESOURCE_EVALUATION_FRAMEWORK.md`)
* Sprint 8 desglosado en 4 tickets (`S8-01` a `S8-04`) — ver PARTE 10 y `docs/backlog/README.md`. `S8-01` (retiro de Apps Script) espera confirmación humana de validación real antes de despacharse

**Changelog v2.2:**

* Sprint 6 marcado ✅ COMPLETADO — los 4 tickets (`S6-01` a `S6-04`) están `DONE` y mergeados en `main`, validados de forma independiente (no solo por autoinforme del subagente)
* Sprint 7 desglosado en 8 tickets (`S7-01` a `S7-08`): las 7 skills de workflow restantes más `PROMPT_EVALUATE_ACTIVATION` como ticket de contenido independiente. Una única dependencia real (`S7-06` evaluation ← `S7-05` PROMPT_EVALUATE_ACTIVATION); el resto paralelizable — la interfaz pública de `shared-writing` (S7-03) se especificó en su propio ticket precisamente para no bloquear a `writing-post`/`activation`
* Dos hooks nuevos diseñados en los tickets de Sprint 7: aprobación editorial antes de `EXECUTE_RESEARCH_PLAN` (S7-01) e investigación previa antes de escribir el borrador final de un post (S7-07) — capa estructural complementaria a los checkpoints de prompt ya aplicados en Sprint 5

**Changelog v2.1:**

* Añadida PARTE 10: roadmap de migración a plugin en 3 sprints (6, 7, 8), con clasificación completa del backlog abierto de GitHub frente al pivote (irrelevante por construcción / efecto colateral / absorbido / fuera de scope / independiente)
* Sprint 6 desglosado en 4 tickets bajo el contrato D-team: `docs/backlog/README.md` + `ISSUE_S6-01` a `ISSUE_S6-04` — aprobados por el editor (`Aprobado: 2026-09-03`), listos para despachar
* Creado `docs/DEV_STANDARDS.md` — estándar vinculante para `D-dispatcher`/`D-developer`, consolida las reglas aprendidas en Sprint 5 (fuente única de verdad, patrón de checkpoint obligatorio, formato de skill)
* `_system/SPEC_PLUGIN_ARCHITECTURE.md` v0.5 — añadida sección 8: el root del plugin es el root del repo, ninguna skill duplica contenido existente

**Changelog v2.0:**

* S5-02 (#66) y S5-05 (#52) cerrados con un único fix compartido: `PROMPT_SUMMARIZE_REFERENCES` v4.3 añade un checkpoint obligatorio que impide que el sistema regenere artefactos o salte fases sin petición explícita del editor
* S5-06 (#63) cerrado: `PROMPT_POST_BRIEF` v1.1 verifica investigación previa (compartida o propia del post) antes de escribir
* S5-07 (#73) cerrado: `PROMPT_QA_IDEAS` v1.1 conecta el INVENTARIO_IDEAS al auto-save (el registro ya existía, el prompt nunca lo usaba)
* S5-01 (#65) parcial: contrato de error de `AUTO_SAVE_CONFIG.yaml` v1.3 prohíbe explícitamente el fallback silencioso a la carpeta raíz — la causa raíz completa sigue bloqueada por S5-03/S5-04
* S5-03 (#49) y S5-04 (#50) diferidos deliberadamente — requieren Apps Script (`TOOL_CREATE_PROJECT.gs`), y se decidió no invertir ahí pensando en Sprint 6+. Causa raíz ya localizada en el código para cuando se retome: `createProjectStructure()` descarta los IDs de subcarpeta que Drive devuelve
* Deuda pendiente por decisión explícita: S5-11 (propagación SAH/CVC) y la implementación completa de S5-01 quedan bloqueadas hasta que se retomen S5-03/S5-04

**Changelog v1.9:**

* S5-10 (#74) completado: `WP_writing_post/` con subcarpetas por post en `AUTO_SAVE_CONFIG.yaml` v1.1
* S5-11 (#70) diseño completado (`DL_20260903_KB_004`); implementación bloqueada por S5-03/#49 como el propio issue anticipaba
* S5-08 (#77) y S5-09 (#72) diferidos — el primero probablemente redundante con el plugin, el segundo acoplado al epic SESSION_ORCHESTRATOR fuera de scope
* Corregido un problema estructural encontrado de paso: `ARQUITECTURA_AUTO_SAVE_GENERICA.md` tenía una copia embebida y desincronizada del registro de rutas de `AUTO_SAVE_CONFIG.yaml` (le faltaban 2 tipos de artefacto). Eliminada — el YAML es ahora la única fuente de verdad
* Hallazgo para la siguiente fase (auto-save, S5-01/S5-02): `PROMPT_WRITE_POST` no referencia `AUTO_SAVE_CONFIG.yaml` en absoluto pese a declarar auto-save activo — candidato fuerte a causa raíz de #65

**Changelog v1.8:**

* Cerrado el spike de arquitectura de plugin: S5-12, S5-13, S5-14, S5-15 completados. Ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` v0.2 y `DL_20260903_SYSTEM_041`
* Corregida `DL_20260416_SYSTEM_025`: su pregunta abierta sobre `PROMPT_QA_IDEAS` ya estaba resuelta por `DL_20260411_ACTIVATION_022` (INTEGRATED) — vacío de coordinación entre DLs, no una decisión de producto pendiente

**Changelog v1.7:**

* Añadida PARTE 9: backlog Sprint 5, priorizado por severidad/impacto sobre las 49 issues abiertas (#40–#78) acumuladas sin triar desde el cierre del Sprint 4
* Corregido GAP-R11: marcado como resuelto (PROMPT_CREATE_RESEARCH_PLAN v3.0 ya en repo, contradecía el estado "pendiente" registrado)
* Nota de proceso: PARTE 3 (FASE 3) y PARTE 6 (Sprint 4) contenían varios ítems marcados "❌ Pendiente" que ya estaban completados en el repo (AC-01, AC-02, WR-01, RE-02) — verificado directamente contra los archivos, no corregido retroactivamente en esas tablas para preservar el histórico, pero el backlog de Sprint 5 en PARTE 9 parte del estado real verificado

**Changelog v1.6:**

* **PACKAGE SYSTEM OPERACIONAL:** create-release-package.sh + TOOL_SETUP_EDITOR_ENVIRONMENT v1.1 (DL-035)
* Añadida DECISIÓN-19: Sistema de release packages integrado en sprint workflow
* Actualizado DECISIÓN-18: NIVEL 0 añadido — setup time NIVEL 1 reducido de 45-60 min a 5-10 min
* Añadidos N-21 a N-25: artefactos Sprint 4 (package system)
* Actualizado N-13: TOOL_GITHUB_REPO_STRUCTURE v1.3 → v1.4
* Actualizado PARTE 6: backlog Sprint 4 con tareas completadas marcadas
* Añadido `latest_package: v1.4.0` en PARTE 8
* Actualizada PARTE 8: setup times reflejan package system

**Changelog v1.5:**

* **R1 COMPLETAMENTE IMPLEMENTADO:** Setup arquitectura implementada con DL entries 028-032  
* Añadida implementación completa de auto-save genérico universal (DL-028)   
* Añadido TOOL_CREATE_PROJECT (renombrado desde TOOL_SETUP_PROJECT_ENHANCED, DL-029)
* Añadido TEMPLATE_EDITOR_CONFIG formal (DL-030)
* Añadidos templates PROJECT estandarizados (DL-031)
* Añadido PROMPT_PROJECT_DISCOVERY para primera sesión (DL-032)
* **R1 STATUS:** Diseñado → **Implementado y Operativo**
* Actualizado inventario con 7 artefactos nuevos de implementación R1
* Actualizado PARTE 2 con artefactos implementados en mayo 2026
* Añadida PARTE 8: Implementación R1 Completa
* Actualizado backlog Sprint 4 con tareas post-implementación

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

---

## PARTE 1: DECISIONES TOMADAS

---

### 1.1 Arquitectura de Subsistemas

**DECISIÓN-01:** El sistema D-X-OPUS se organiza en 8 subsistemas con chats de desarrollo independientes.

| # | Subsistema | Rol | Estado |
|---|---|---|---|
| 0 | SYSTEM | Arquitectura, estándares, decisiones globales, herramientas operativas (TOOLING). Owner: este chat. | ✅ Operativo |
| 1 | KNOWLEDGE BASE | Recursos transversales: SAH, CVC, FOCUS_TYPES. Acumulación de conocimiento validado. | ✅ Operativo |
| 2 | RESEARCH | Investigación profunda de campo, análisis sistemático de fuentes. | ✅ Operativo |
| 3 | EDITORIAL PROFILE | Perfil editorial del escritor, voz, estilo, preferencias. | ✅ Operativo |
| 4 | WRITING | Escritura de libros y posts. | ✅ Operativo |
| 5 | EVALUATION | Contrato de evaluación. Evaluadores especializados por tipo de contenido. | ✅ Operativo |
| 6 | ACTIVATION | Libro completo → campaña de contenido. BOOK_BRIEF. | ⚠️ Operativo parcial |
| 7 | DOCS | Documentación del sistema: manuales de editor y desarrollador. | 🚧 En desarrollo |

---

### 1.2 Arquitectura de Setup (R1 + Sprint 4 Package System)

**DECISIÓN-18 (actualizada v1.6):** Setup de tres niveles completamente automatizado.

**NIVEL 0 — Release Packaging (cierre de sprint):**
- Tiempo: ~5 minutos (una vez por sprint)
- Herramienta: `create-release-package.sh`
- Resultado: `dx-opus-system-vX.Y.0.zip` publicado en GitHub releases
- Latest package: **v1.4.0** (Sprint 4, 2026-05-05)

**NIVEL 1 — Setup del Editor (una vez):**
- Tiempo: **5-10 minutos** (con package) / 45-60 min (fallback individual)
- Herramientas: `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` v1.1
- Resultado: EDITOR_CONFIG.md personal + sistema operativo para crear proyectos en 2-3 min

**NIVEL 2 — Setup del Proyecto (cada proyecto):**
- Tiempo: 2-3 minutos por proyecto (automático)
- Herramientas: `TOOL_CREATE_PROJECT.gs`
- Resultado: Proyecto completo listo para trabajar inmediatamente

**Componentes implementados:**
- ✅ Package system con versioning sprint-aligned (vMAJOR.SPRINT.PATCH)
- ✅ Auto-save genérico universal para todos los artefactos
- ✅ Templates estandarizados (EDITOR_CONFIG, PROJECT_README, PROJECT_INSTRUCTIONS)
- ✅ PROMPT_PROJECT_DISCOVERY para primera sesión automática
- ✅ Multi-editor support con configuración personalizada

---

### 1.3 Otras Decisiones Core

**DECISIÓN-02:** Focus types extraídos de prompts embebidos a RESOURCE_RESEARCH_FOCUS_TYPES centralizado.

**DECISIÓN-03:** Writing unificado con bifurcación editorial Book/Post.

**DECISIÓN-04:** Evaluation como subsistema independiente con contrato de evaluación.

**DECISIÓN-05:** UPDATE_VALIDATION_CHECKLIST es propiedad de Research; KB define esquema canónico de SAH y CVC.

**DECISIÓN-06:** BOOK_BRIEF de Activation orienta Research sin sustituirlo.

**DECISIÓN-07:** Prompts compartidos en /writing/shared/ — Writing es owner explícito.

**DECISIÓN-08:** Naming convention: sin versión en nombre de archivo en GitHub.

**DECISIÓN-09:** Cabecera YAML estándar obligatoria en todos los artefactos.

**DECISIÓN-10:** GitHub para sistema, Drive para proyectos de producción.

**DECISIÓN-11:** DOCS como subsistema activo con DECISION_LOG como mecanismo de sync.

**DECISIÓN-12:** TOOLING en SYSTEM mientras menos de 3 herramientas activas.

**DECISIÓN-13:** Subsistema 3 se llama EDITORIAL PROFILE.

**DECISIÓN-14:** Herramientas operativas (TOOLING) pertenecen a SYSTEM.

**DECISIÓN-15:** GitHub MCP no disponible en Plan Pro — flujo manual asistido.

**DECISIÓN-16:** Scope flujo POST en Activation (DL_20260416_SYSTEM_025).

**DECISIÓN-17:** Ubicación WORKFLOW_WRITING (DL_20260416_SYSTEM_026).

**DECISIÓN-19 (nueva v1.6):** Sistema de release packages integrado en sprint workflow (DL_20260505_SYSTEM_035). Versioning: `vMAJOR.SPRINT.PATCH`. Package-first installation con fallback individual. Ver SPEC_PACKAGE_SYSTEM.md.

---

## PARTE 2: ARTEFACTOS A CREAR

Estado actualizado con implementación R1 completa + Sprint 4 (05/05/2026).

| # | Artefacto | Tipo | Subsistema | Estado | Versión |
|---|---|---|---|---|---|
| N-01 | RESOURCE_RESEARCH_FOCUS_TYPES | RESOURCE | KNOWLEDGE_BASE | ✅ Completado | v1.1 |
| N-02 | RESOURCE_EVALUATION_FRAMEWORK | RESOURCE | EVALUATION | ✅ Completado | v1.1 |
| N-03 | RESOURCE_ARTIFACT_HEADER_STANDARD | RESOURCE | SYSTEM | ✅ Completado | v1.0 |
| N-04 | GUIDE_ANNOTATION_PHASE3 | GUIDE | RESEARCH | ✅ Completado | v1.0 |
| N-05 | PROMPT_CREATE_BOOK_BRIEF | PROMPT | ACTIVATION | ❌ Pendiente Sprint 5 | — |
| N-06 | PROMPT_EVALUATE_POST | PROMPT | EVALUATION | ✅ Completado Sprint 3 | v1.0 |
| N-07 | PROMPT_EVALUATE_ACTIVATION | PROMPT | EVALUATION | ❌ Pendiente Sprint 5 | — |
| N-08 | WORKFLOW_WRITING | WORKFLOW | WRITING | ✅ Existe como WORKFLOW_WRITING_BOOK.md v2.0 → rename pendiente (DL_026) | v2.0 |
| N-09 | SCHEMA_SYSTEM_ARCHITECTURE | SCHEMA | SYSTEM | ✅ Completado | v1.3 → v1.4 pendiente |
| N-10 | SCHEMA_DECISION_LOG | SCHEMA | SYSTEM | ✅ Completado | v2.1 |
| N-11 | TEMPLATE_SUBSYSTEM_CONTEXT | TEMPLATE | SYSTEM | ✅ Completado | v1.0 |
| N-12 | TOOL_SETUP_PROJECT | TOOL | SYSTEM | ✅ Completado → TOOL_CREATE_PROJECT.gs | v1.0 |
| N-13 | TOOL_GITHUB_REPO_STRUCTURE | TOOL | SYSTEM | ✅ Actualizado Sprint 4 | v1.4 |

### Nuevos artefactos R1 (Implementación mayo 2026)

| # | Artefacto | Tipo | Subsistema | Estado | Versión |
|---|---|---|---|---|---|
| N-14 | PROMPT_PROJECT_DISCOVERY | PROMPT | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-15 | ARQUITECTURA_AUTO_SAVE_GENERICA | SCHEMA | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-16 | AUTO_SAVE_CONFIG | RESOURCE | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-17 | TEMPLATE_EDITOR_CONFIG | TEMPLATE | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-18 | TEMPLATE_PROJECT_README | TEMPLATE | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-19 | TEMPLATE_PROJECT_INSTRUCTIONS | TEMPLATE | SYSTEM | ✅ Implementado mayo 2026 | v1.0 |
| N-20 | SETUP_INICIAL_D_X_OPUS | GUIDE | TOOLS | ✅ Implementado mayo 2026 | v1.1 |

### Nuevos artefactos Sprint 4 (Package System — 05/05/2026)

| # | Artefacto | Tipo | Subsistema | Estado | Versión |
|---|---|---|---|---|---|
| N-21 | create-release-package.sh | TOOL | SYSTEM | ✅ **Implementado Sprint 4** | v1.0 |
| N-22 | TOOL_SETUP_EDITOR_ENVIRONMENT | TOOL | SYSTEM | ✅ **Actualizado Sprint 4** | v1.0 → v1.1 |
| N-23 | SPEC_PACKAGE_SYSTEM | SPEC | SYSTEM | ✅ **Implementado Sprint 4** | v1.0 |
| N-24 | TEST_PACKAGE_SYSTEM_E2E | TEST | SYSTEM | ✅ **Implementado Sprint 4** | v1.0 |
| N-25 | PACKAGE_SYSTEM_IMPLEMENTATION_SUMMARY | GUIDE | SYSTEM | ✅ **Implementado Sprint 4** | v1.0 |

---

## PARTE 3: ARTEFACTOS MODIFICADOS R1

### Prompts actualizados con auto-save universal

| Prompt | Versión anterior | Versión R1 | Estado |
|---|---|---|---|
| PROMPT_WRITE_POST | v2.0 | v2.1 | ✅ Auto-save integrado |
| PROMPT_SUMMARIZE_REFERENCES | v4.1 | v4.2 | ✅ Auto-save integrado |

**Próximos a integrar auto-save:**
- Todos los prompts de RAMA BOOK (writing/)
- Todos los prompts de ACTIVATION
- PROMPT_EVALUATE_* (evaluation/)

---

## PARTE 4: SETUP TÉCNICO

### 4.1 GitHub

| # | Tarea | Estado |
|---|---|---|
| G-01 | Crear repositorio `dx-opus` (privado) en TINTA-ARTIFICIAL | ✅ Completado |
| G-02 | Configurar GitHub en Claude.ai | ✅ OAuth conectado — MCP no disponible en Plan Pro (DECISIÓN-15) |
| G-03 | Test de integración | ❌ No aplica (ver DECISIÓN-15) |
| G-04 | Crear estructura de carpetas del repositorio con READMEs | ✅ Completado |
| G-05 | Subir artefactos existentes con naming correcto | ✅ **R1 COMPLETADO mayo 2026** |
| G-06 | Configurar branch protection en main | ❌ Pendiente — acción del editor |
| G-07 | Crear ramas de desarrollo por subsistema | ❌ Pendiente |
| G-08 | Instalar GitHub CLI (`gh`) | ❌ Pendiente — `brew install gh` |

### 4.2 Google Drive - Setup Automation

| # | Tarea | Estado |
|---|---|---|
| D-01 | Crear TOOL_SETUP_PROJECT | ✅ Completado → TOOL_CREATE_PROJECT |
| D-02 | Almacenar en GitHub bajo `/tools/` | ✅ Completado |
| D-03 | Test: ejecutar script en un proyecto real | ✅ **R1 COMPLETADO mayo 2026** |
| D-04 | Setup inicial del editor automatizado | ✅ **R1 COMPLETADO mayo 2026** |
| D-05 | Multi-editor support | ✅ **R1 COMPLETADO mayo 2026** |
| D-06 | Package-based installation (5-10 min) | ✅ **Sprint 4 COMPLETADO** |

### 4.3 Documentos de contexto para chats de desarrollo

| Chat | Versión | Estado |
|---|---|---|
| CONTEXT_SYSTEM (este chat) | — | ✅ MASTER_PLAN como contexto implícito |
| CONTEXT_KNOWLEDGE_BASE | v1.4 | ✅ Completado Sprint cierre R1 |
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
| F0-03 | Crear SCHEMA_DECISION_LOG | ✅ v2.1 |
| F0-04 | Crear TEMPLATE_SUBSYSTEM_CONTEXT | ✅ v1.0 |
| F0-05 | Crear TOOL_SETUP_PROJECT | ✅ v1.0 → TOOL_CREATE_PROJECT |
| F0-06 | Crear TOOL_GITHUB_REPO_STRUCTURE | ✅ v1.4 |
| F0-07 | Setup GitHub | ✅ Repositorio creado — MCP no disponible, flujo manual (DECISIÓN-15) |

---

### FASE 1 — Nuevos recursos del sistema ✅ COMPLETADA

| # | Tarea | Estado |
|---|---|---|
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES | ✅ v1.1 |
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | ✅ v1.1 |
| F1-03 | Crear GUIDE_ANNOTATION_PHASE3 | ✅ v1.0 (verificado en repo Sprint cierre R1) |
| F1-04 | Crear PROMPT_EVALUATE_BOOK_STYLE, PROMPT_EVALUATE_BOOK_CONTENT, PROMPT_EVALUATE_POST | ✅ Completados |
| F1-05 | Crear subsistema post completo | ✅ Completado Sprint 3 |

---

### FASE 2 — Setup automation ✅ COMPLETADA (R1 Implementation)

| # | Tarea | Estado |
|---|---|---|
| F2-01 | Implementar auto-save genérico universal | ✅ **COMPLETADO mayo 2026** |
| F2-02 | Implementar TOOL_CREATE_PROJECT enhanced | ✅ **COMPLETADO mayo 2026** |
| F2-03 | Implementar templates system | ✅ **COMPLETADO mayo 2026** |
| F2-04 | Implementar PROMPT_PROJECT_DISCOVERY | ✅ **COMPLETADO mayo 2026** |
| F2-05 | Implementar setup inicial automatizado | ✅ **COMPLETADO mayo 2026** |
| F2-06 | Implementar package system | ✅ **COMPLETADO Sprint 4** |

---

### FASE 3 — Correcciones por subsistema ⚠️ PARCIALMENTE COMPLETADA

| ID | Tarea | Artefacto | Estado | Chat |
|---|---|---|---|---|
| SC-01 | Renombrar SCHEMA_DECISION_LOG md → SCHEMA_DECISION_LOG.md | `_system/` | ✅ **RESUELTO mayo 2026** | system-architecture |
| SC-02+SC-06 | Regularizar DL entries + actualizar status 13 fundacionales | SCHEMA_DECISION_LOG + decisions/ | ✅ **COMPLETADO mayo 2026** | system-architecture |
| SC-03 | TOOL_GITHUB_REPO_STRUCTURE v1.1 → v1.4 | `tools/` | ✅ Completado Sprint 4 | system-architecture |
| SC-04 | MASTER_PLAN v1.4 → v1.6 | `_system/` | ✅ **Este documento mayo 2026** | system-architecture |
| SC-05 | Crear RESEARCH_COMPONENT_AUDIT.md v1.0 | `_system/audits/` | ✅ Completado | system-architecture |
| SC-07 | Corregir decisions/README.md | `_system/decisions/` | ✅ **Actualizado mayo 2026** | system-architecture |
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

---

## PARTE 6: ESTADO SPRINT 4 — COMPLETADO

**Sprint 4 — Post R1 Implementation + Package System:**

| Prioridad | Tarea | Subsistema | Estado |
|---|---|---|---|
| 🔴 Alta | POST-R1-01 | SYSTEM | ❌ Crear `GUIDE_DEV_PROTOCOL.md` v1.0 — protocolo estándar de desarrollo |
| 🔴 Alta | POST-R1-02 | SYSTEM | ❌ Actualizar SCHEMA_SYSTEM_ARCHITECTURE v1.3 → v1.4 con nuevos componentes R1 |
| 🔴 Alta | POST-R1-03 | ACTIVATION | ❌ Completar AC-01, AC-02, AC-03 para operatividad total |
| 🟠 Media | POST-R1-04 | WRITING | ❌ Completar WR-01, WR-02, WR-03 para standards compliance |
| 🟠 Media | POST-R1-05 | RESEARCH | ❌ Completar RE-01, RE-02 para operatividad total |
| 🟠 Media | POST-R1-06 | EVALUATION | ❌ Crear PROMPT_EVALUATE_ACTIVATION v1.0 |
| 🟠 Media | POST-R1-07 | DOCS | ❌ Iniciar subsistema DOCS: primeros documentos de usuario |
| 🟡 Baja | POST-R1-08 | SYSTEM | ❌ Resolver GAP-R08, GAP-R09, GAP-R10 en Research |
| 🟡 Baja | POST-R1-09 | KNOWLEDGE BASE | ❌ Gestor de referencias (issue #2) |
| 🟡 Baja | POST-R1-10 | SYSTEM | ❌ Sistema de testing (issue #5) |
| ✅ Sprint 4 | **PACKAGE-01** | **SYSTEM** | ✅ **create-release-package.sh v1.0 — COMPLETADO** |
| ✅ Sprint 4 | **PACKAGE-02** | **SYSTEM** | ✅ **TOOL_SETUP_EDITOR_ENVIRONMENT v1.1 — COMPLETADO** |
| ✅ Sprint 4 | **PACKAGE-03** | **SYSTEM** | ✅ **Release v1.4.0 publicado — COMPLETADO** |
| ✅ Sprint 4 | **PACKAGE-04** | **SYSTEM** | ✅ **READMEs actualizados — COMPLETADO** |
| ✅ Sprint 4 | **PACKAGE-05** | **SYSTEM** | ✅ **DL_035 documentado — COMPLETADO** |

---

## PARTE 7: GAPS CONOCIDOS

### Gaps resueltos en R1

| GAP ID | Descripción | Estado |
|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: inconsistencia prompt/workflow | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R02 | Estructura RESEARCH_PLAN: inconsistencia prompt/workflow | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R04 | SUMMARIZE_REFERENCES sin SAH ni CVC | ✅ Resuelto (v4.2) |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referencia sección inexistente | ✅ Resuelto (v3.1) |
| GAP-R03 | Estructura NARRATIVE_BRIDGE: inconsistencia prompt/workflow | ✅ Resuelto (WORKFLOW v3.2) |
| GAP-R07 | EVALUATE no cubre RESEARCH_DEEP_DIVE (RAMA A) | ✅ Resuelto (EVALUATE v1.1) |
| GAP-R06 | Fase 3 sin soporte ni guía estructurada | ✅ Resuelto (GUIDE_ANNOTATION_PHASE3 v1.0) |

### Gaps activos (post R1)

| GAP ID | Descripción | Severidad | Estado |
|---|---|---|
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN | 🟠 IMPORTANTE | ✅ Resuelto (PROMPT_CREATE_RESEARCH_PLAN v3.0 en repo) |
| GAP-R08 | "Practical Applications" sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R09 | NARRATIVE_BRIDGE secciones 4-6 sin consumidor | 🟡 MENOR | ❌ Pendiente Fase 5 |
| GAP-R10 | Naming inconsistente SUMMARIZE_REFERENCES | 🟡 MENOR | ❌ Pendiente Fase 5 |

---

## PARTE 8: IMPLEMENTACIÓN R1 COMPLETA ✅ + SPRINT 4 PACKAGE SYSTEM ✅

**Estado:** R1 completamente implementado y operativo (mayo 2026)  
**Latest package:** `dx-opus-system-v1.4.0.zip` (Sprint 4, 2026-05-05, 33 archivos)

### Capacidades R1 implementadas

#### ✅ **Setup Architecture Completa**
- **NIVEL 0:** `create-release-package.sh` — Sprint package automation (Sprint 4)
- **NIVEL 1:** Setup inicial del editor **5-10 min** con package (era 45-60 min)
- **NIVEL 2:** Creación de proyectos 2-3 min, automático
- **Multi-editor:** Sistema escalable para múltiples editores
- **Templates:** Generación automática estandarizada

#### ✅ **Auto-save Universal**
- **Todos los workflows:** Research, Writing Book, Writing Post, Activation
- **Naming estándar:** `{PROJECT_CODE}_{WORKFLOW}_{TIPO}_{ID}_v{VERSION}.md`
- **Metadata automática:** Estándar y extendida según tipo
- **Error handling:** Robusto con fallbacks

#### ✅ **Intelligent First Session**
- **PROJECT_DISCOVERY:** Clasifica material automáticamente
- **Workflow selection:** Determina workflow apropiado
- **Auto-organization:** Material organizado en carpetas apropiadas

#### ✅ **Complete Tool Chain**
- **TOOL_CREATE_PROJECT.gs:** Creación automática de proyectos
- **TOOL_SETUP_EDITOR_ENVIRONMENT.gs v1.1:** Setup automatizado via package
- **create-release-package.sh:** Release automation integrada en sprint workflow
- **SETUP_INICIAL_D_X_OPUS.md:** Guía completa de setup inicial

### Tiempo de implementación

**Para editor nuevo:**
- Setup inicial: **5-10 minutos** (con package v1.4.0+)
- Primer proyecto: 2-3 minutos adicionales
- Proyectos adicionales: 2-3 minutos cada uno

**Para editor existente:**
- Migración a R1: ~30 minutos
- Beneficios inmediatos: auto-save + setup automático

### Validación de R1

| Test | Estado |
|---|---|
| Setup inicial desde cero | ✅ Validado |
| Creación automática de proyecto | ✅ Validado |
| Auto-save universal | ✅ Validado |
| Primera sesión con PROJECT_DISCOVERY | ✅ Validado |
| Multi-editor support | ✅ Validado |
| Template generation | ✅ Validado |
| Package installation (ZIP) | ✅ Validado Sprint 4 |
| Package creation script | ✅ Validado Sprint 4 |

**R1 está listo para producción. Package system v1.4.0 operacional.**

---

## PARTE 9: BACKLOG SPRINT 5 (planificación 2026-09-03)

**Contexto:** entre el cierre del Sprint 4 (05/05/2026) y esta planificación se acumularon 49 issues abiertas en GitHub (#40–#78, 06–20/05/2026) nunca triadas contra el MASTER_PLAN, producto de uso real del sistema en producción tras el package system. Esta sección las prioriza por severidad/impacto, no por subsistema.

**Objetivo del sprint:** cerrar los riesgos de pérdida/corrupción de datos detectados en producción, y abrir el spike de arquitectura para migrar el modelo de despliegue de "Apps Script + Drive" a un **Cowork plugin** — eliminando la ceremonia de setup actual (TOOL_SETUP_EDITOR_ENVIRONMENT.gs, TOOL_CREATE_PROJECT.gs, el propio package system del Sprint 4).

### 🔴 CRÍTICO — Integridad de datos y autorización del editor

| ID | Issue | Descripción | Estado |
|---|---|---|---|
| S5-01 | #65 | Auto-save falla por permisos y pierde datos en silencio | ⚠️ **Parcial** — contrato de error reescrito en `AUTO_SAVE_CONFIG.yaml` v1.3: prohibido el fallback silencioso a la carpeta raíz, nuevo tipo `folder_permission_denied` que exige presentar contenido + ruta manual exacta. La causa raíz completa (IDs de carpeta) sigue bloqueada por S5-03/S5-04, diferidos |
| S5-02 | #66 | El sistema modificó RESEARCH_PLAN sin autorización del editor | ✅ Cerrado — `PROMPT_SUMMARIZE_REFERENCES` v4.3 añade un checkpoint obligatorio que prohíbe regenerar/actualizar cualquier artefacto sin petición explícita del editor |
| S5-03 | #49 | Auto-save crea subcarpetas duplicadas en vez de usar la estructura existente | ⏸️ **Diferido** — requiere tocar `TOOL_CREATE_PROJECT.gs`; se decidió no invertir en Apps Script pensando en el pivote a plugin (Sprint 6+) |
| S5-04 | #50 | PROJECT_CONFIG debe incluir los Drive folder IDs de todos los subdirectorios | ⏸️ **Diferido**, misma razón que S5-03. Causa raíz confirmada en el código: `createProjectStructure()` en `TOOL_CREATE_PROJECT.gs` crea las subcarpetas y descarta el ID que Drive devuelve — no hace falta rediseñar nada, solo capturarlo, cuando se retome |

### 🔴 CRÍTICO — Correctitud de workflow

| ID | Issue | Descripción | Estado |
|---|---|---|---|
| S5-05 | #52 | Research workflow se salta la fase de anotación y pasa directo a escritura | ✅ Cerrado — mismo checkpoint de `PROMPT_SUMMARIZE_REFERENCES` v4.3 (comparte causa raíz con S5-02) |
| S5-06 | #63 | POST workflow debe exigir RESEARCH_DEEP_DIVE como prerequisito obligatorio antes de escribir | ✅ Cerrado — `PROMPT_POST_BRIEF` v1.1 añade PASO 3B: verifica investigación (compartida o propia del post) antes de continuar; skip solo con confirmación explícita del editor, igual que el skip de Q&A |
| S5-07 | #73 | INVENTARIO_IDEAS debe incluirse en auto-save config y guardarse en WP_writing_post/ | ✅ Cerrado — el registro ya existía desde R1; `PROMPT_QA_IDEAS` v1.1 añade PASO 6B que lo conecta de verdad al auto-save |

### 🟠 ALTO — Estructura de carpetas y organización del repo

Alimenta directamente el spike de plugin — entender qué estructura sobrevive a la migración.

| ID | Issue | Descripción |
|---|---|---|
| S5-08 | #77 | ⏸️ Diferido — probablemente redundante con la reorganización nativa que trae el plugin (Sprint 6+); referencia a "DL_..._SYSTEM_041" en el issue quedó obsoleta, el número correcto si se retoma es 042 |
| S5-09 | #72 | ⏸️ Diferido — acoplado al epic SESSION_ORCHESTRATOR, ya fuera de scope de Sprint 5 |
| S5-10 | #74 | ✅ **Completado** — `WP_writing_post/` con subcarpetas por post (`Post{N}_{post_name}`) implementado en `AUTO_SAVE_CONFIG.yaml` v1.1. De paso, se eliminó una copia duplicada y desincronizada del registro de rutas en `ARQUITECTURA_AUTO_SAVE_GENERICA.md` (le faltaban 2 tipos de artefacto) |
| S5-11 | #70 | ✅ Diseño completado (`DL_20260903_KB_004`) — propagación aprobada por el editor, paso dedicado, no efecto colateral de `PROMPT_UPDATE_VALIDATION_CHECKLIST`. ⏸️ Implementación bloqueada por S5-03 (#49), tal como el propio issue declaraba |

### 🟠 ALTO — Spike de arquitectura: DX-OPUS como Cowork plugin

Solo diseño en Sprint 5. La implementación se planifica en Sprint 6+.

| ID | Tarea |
|---|---|
| S5-12 | ✅ **Completado** — Investigado el formato de Cowork plugin y mapeadas las ~150 dependencias cruzadas entre los 55 artefactos del sistema. Ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` v0.2 |
| S5-13 | ✅ **Completado** — Diseño de 10 skills (`research`, `editorial-profile`, `writing-book`, `writing-post`, `shared-writing`, `evaluation`, `activation`, `knowledge-base`, `project-setup`, `editor-onboarding`), sin Apps Script ni Drive como almacenamiento primario |
| S5-14 | ✅ **Completado** — `DL_20260903_SYSTEM_041` documenta la decisión: alcance, qué se elimina (`TOOL_CREATE_PROJECT.gs`, `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`), roadmap Sprint 6+ para implementación |
| S5-15 | ✅ **Completado** — Nota de interfaz propia registrada como "Work futuro" sin fecha en `SPEC_PLUGIN_ARCHITECTURE.md` sección 6 |

**Nota:** el Package System (Sprint 4, PARTE 8) queda formalmente en producción durante el spike — no se desmantela hasta que S5-14 resuelva la migración.

### 🟡 MEDIO — Deuda de Sprint 4 arrastrada (si hay capacidad)

| ID | Ref. | Descripción |
|---|---|---|
| S5-16 | POST-R1-01 | Crear `GUIDE_DEV_PROTOCOL.md` v1.0 |
| S5-17 | POST-R1-02 | Actualizar `SCHEMA_SYSTEM_ARCHITECTURE` v1.3 → v1.4 |
| S5-18 | POST-R1-06 | Crear `PROMPT_EVALUATE_ACTIVATION` v1.0 |
| S5-19 | DL_20260520_SYSTEM_040 (Nivel 1) | Añadir protocolo de cierre de sesión a las Project Instructions de los chats de desarrollo — cambio de bajo coste ya diseñado, pendiente de aplicar |

### ⏸️ Explícitamente fuera de scope de Sprint 5

| Tema | Issues | Razón para diferir |
|---|---|---|
| Completitud del PROMPTS_PACKAGE | #42, #61, #62, #64, #67, #68, #69, #71 | Depende del resultado del spike de plugin (S5-12 a S5-15) — arreglarlo ahora es trabajo que se puede tirar si el paquete se sustituye |
| Epic EDITOR DIGITAL / SESSION_ORCHESTRATOR | #14, #46, #47, #48, #51, #54, #55, #56, #75, #76 | Grande (10 issues), y probablemente se rediseñe según cómo quede la arquitectura de plugin. Incluye DL_040 Nivel 2 (PROMPT_DEV_CLOSURE) |
| Optimización de tokens | #57, #58, #59, #60 | Depende de si cambia el modelo de distribución de prompts |
| UX de onboarding | #40, #41, #43, #44, #45 | El pivote a plugin redefine el onboarding completo — no vale la pena iterar sobre el modelo actual |
| Calidad de escritura en textos largos | #78 | Importante pero no relacionado con el tema de este sprint — candidato fuerte para Sprint 6 |

---

## PARTE 10: ROADMAP MIGRACIÓN A PLUGIN (Sprint 6–8, confirmado 2026-09-03)

Objetivo: llegar al modelo de plugin de Cowork sin construir versiones intermedias de Apps Script que se vayan a tirar. Casi todo el backlog abierto de GitHub deja de ser un problema por construcción en cuanto la skill correspondiente existe — no hace falta arreglarlo, hace falta dejar de necesitarlo.

### Clasificación del backlog abierto frente al pivote

| Categoría | Issues | Qué significa |
|---|---|---|
| **Irrelevantes por construcción** | #49, #50, #65 (parcial), #61, #64, #67, #68, #71, #40, #41, #42, #43, #44, #72, #77 | No son tickets — desaparecen cuando la skill correspondiente sustituye al mecanismo Apps Script/package que las causaba |
| **Se resuelven como efecto colateral, a verificar no a construir** | #57, #58, #59, #60 | La disclosure progresiva de skills (`SKILL.md` ligero + lectura bajo demanda de los prompts reales) ya es optimización de tokens por diseño |
| **Se absorben dentro de construir la skill, no como ticket aparte** | #45, #62, `PROMPT_EVALUATE_ACTIVATION` (S5-18) | Contenido que de todos modos hay que escribir al construir la skill — se escribe una vez, no dos |
| **Fuera del roadmap de migración, deliberadamente** | Epic EDITOR DIGITAL/SESSION_ORCHESTRATOR (#54,55,56,46,47,48,51,75,76,14) | No bloquea el corte; los hooks que el plugin deja construidos le dan mejor base que hoy — se planifica después |
| **Independiente del modelo de despliegue** | #78, #2, #3, #5, #6, y el resto de contenido de mejora en `PARTE 6`/`PARTE 7` | No gatea nada — entra cuando haya hueco, en paralelo o después |

### Los 3 sprints

| Sprint | Objetivo | Contenido |
|---|---|---|
| **6 — Fundamentos** ✅ COMPLETADO | Validar el patrón con el menor riesgo antes de construir las 10 skills | `plugin.json`, skill `project-setup` (cierra #49/#50/#65 por construcción), skill `editor-onboarding`, skill `knowledge-base` + hook de gobernanza. Prueba: crear un proyecto real sin tocar Apps Script. **4/4 tickets DONE y en `main`** (S6-01 a S6-04) — ver `docs/backlog/README.md` |
| **7 — Skills de workflow** | Migrar los 6 subsistemas con workflow propio + `shared-writing` | `research`, `editorial-profile`, `shared-writing`, `writing-book`, `writing-post`, `evaluation`, `activation` + hooks de prerequisito (aprobación antes de `EXECUTE_RESEARCH_PLAN`, investigación previa antes de escribir POST). Incluye escribir `PROMPT_EVALUATE_ACTIVATION` como ticket de contenido independiente. **8 tickets desglosados y aprobados:** `docs/backlog/README.md` (S7-01 a S7-08) — una sola dependencia real (S7-06 depende de S7-05), el resto paralelizable |
| **8 — Validación y corte** | Probar en uso real, luego apagar Apps Script | Mecanismo real de empaquetado del `.plugin` respetando el límite instalable/desarrollo (issue #77, reabierto — mi cierre anterior era incorrecto), guión de validación end-to-end, DL de deprecación + retiro de Apps Script, actualizar READMEs. **4 tickets desglosados:** `docs/backlog/README.md` (S8-01 a S8-04) — S8-02 y S8-04 despachables ya; S8-01 (retiro de Apps Script) y S8-03 (que depende de él) esperan confirmación humana de que la validación con editor real salió bien, no se despachan solo por estar `TODO` |

### Mecanismo de implementación

Desde Sprint 6, la implementación se gestiona con el contrato de tickets D-team (`docs/backlog/`), orquestado por `D-dispatcher` → subagentes `D-developer`. Estándar vinculante para toda implementación: `docs/DEV_STANDARDS.md`. Decisión de arquitectura base para escribir cualquier ticket de skill: `_system/SPEC_PLUGIN_ARCHITECTURE.md` §8 — el root del plugin es el root del repo, ninguna skill duplica contenido existente en su propia `references/`.

**Sprint 6:** 4/4 tickets `DONE`, mergeados en `main`. S6-01 necesitó un reintento por un fallo de aislamiento intermitente entre el subagente y el worktree pre-creado; sin escrituras erróneas, sin impacto en el resultado final.

**Sprint 7:** 8 tickets creados y aprobados (`Aprobado: 2026-09-03`) — listos para que `D-dispatcher` los despache.

---

**FIN DEL DOCUMENTO**
