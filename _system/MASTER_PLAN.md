---
id:          MASTER_PLAN
type:        SCHEMA
subsystem:   SYSTEM
version:     1.7
status:      ACTIVE
created:     2026-02-21
updated:     2026-09-03
owner_chat:  system-architecture
---

# MASTER PLAN — SISTEMA D-X-OPUS

## Consolidación de decisiones y trabajo pendiente

**Versión:** 1.7  
**Fecha:** 3 septiembre 2026  
**Scope:** Planificación Sprint 5 — hardening de integridad de datos + spike de arquitectura de despliegue (Cowork plugin)

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

| ID | Issue | Descripción | Acción propuesta |
|---|---|---|---|
| S5-01 | #65 | Auto-save falla por permisos y pierde datos en silencio | Manejo de error explícito: nunca fallar sin notificar al editor |
| S5-02 | #66 | El sistema modificó RESEARCH_PLAN sin autorización del editor | Gate de confirmación obligatorio antes de reescribir artefactos ya aprobados |
| S5-03 | #49 | Auto-save crea subcarpetas duplicadas en vez de usar la estructura existente | Corregir la lógica de resolución de carpetas |
| S5-04 | #50 | PROJECT_CONFIG debe incluir los Drive folder IDs de todos los subdirectorios | Prerequisito técnico de S5-03 |

### 🔴 CRÍTICO — Correctitud de workflow

| ID | Issue | Descripción |
|---|---|---|
| S5-05 | #52 | Research workflow se salta la fase de anotación y pasa directo a escritura |
| S5-06 | #63 | POST workflow debe exigir RESEARCH_DEEP_DIVE como prerequisito obligatorio antes de escribir |
| S5-07 | #73 | INVENTARIO_IDEAS debe incluirse en auto-save config y guardarse en WP_writing_post/ |

### 🟠 ALTO — Estructura de carpetas y organización del repo

Alimenta directamente el spike de plugin — entender qué estructura sobrevive a la migración.

| ID | Issue | Descripción |
|---|---|---|
| S5-08 | #77 | Refactor de estructura de repo: separar artefactos de desarrollo de artefactos de producción |
| S5-09 | #72 | Crear carpeta `workflows/` como ubicación dedicada para documentos de orquestación |
| S5-10 | #74 | `WP_writing_post/` debe usar subcarpetas por post en proyectos multi-post |
| S5-11 | #70 | Actualizaciones de SAH/CVC desde proyectos deben propagarse de vuelta a `D-X-OPUS/resources/` |

### 🟠 ALTO — Spike de arquitectura: DX-OPUS como Cowork plugin

Solo diseño en Sprint 5. La implementación se planifica en Sprint 6+.

| ID | Tarea |
|---|---|
| S5-12 | Investigar el formato de Cowork plugin (skills, connectors, manifest) y mapear qué partes del sistema actual encajan directo — prompts → skills, `TOOL_*.gs` → ¿hooks de setup o eliminados? |
| S5-13 | Diseñar cómo se gestiona la estructura de carpetas del proyecto sin Apps Script ni Drive como almacenamiento primario |
| S5-14 | Documentar la decisión como nueva DL entry (SYSTEM): alcance, qué se elimina (Apps Script + Drive setup flow + package system del Sprint 4), qué se mantiene, roadmap S6+ |
| S5-15 | Nota de diseño a futuro en la misma DL: se contempla una interfaz propia más adelante, fuera de scope de S5 (marcar como "Work futuro", no comprometer fecha) |

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

**FIN DEL DOCUMENTO**
