---
id:          MASTER_PLAN
type:        SCHEMA
subsystem:   SYSTEM
version:     1.2
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

# MASTER PLAN — SISTEMA D-X-OPUS
## Consolidación de decisiones y trabajo pendiente

**Versión:** 1.2  
**Fecha:** 21 febrero 2026  
**Scope:** Todas las decisiones arquitectónicas tomadas en el chat de diseño del sistema

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

Registro de todas las decisiones arquitectónicas confirmadas en esta sesión.
Ordenadas por área, no por orden cronológico.

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
El editor decide al entrar al workflow si produce un libro o un post. A partir de ahí los prompts son completamente distintos (0% compartidos entre ramas).

**Ramas:**
- RAMA BOOK: 12 prompts existentes
- RAMA POST: 4-5 prompts pendientes de diseño

**Motivo:** Con un desarrollador es más manejable. La modularidad interna permite separar en chats distintos en el futuro sin reescribir nada.

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

Los workflows referencian evaluadores por nombre. No conocen su implementación interna. Si cambia el método de evaluación, los workflows no se tocan — solo el evaluador y el RESOURCE_EVALUATION_FRAMEWORK.

**Evaluadores existentes** (a migrar al contrato):
- PROMPT_EVALUATE_RESEARCH_REPORT v1.0
- PROMPT_EVALUATE_BOOK_STYLE v1.0
- PROMPT_EVALUATE_BOOK_CONTENT v1.0

**Evaluadores pendientes de diseño:**
- PROMPT_EVALUATE_POST
- PROMPT_EVALUATE_ACTIVATION

---

### 1.4 Decisiones sobre Knowledge Base

**DECISIÓN-04:** UPDATE_VALIDATION_CHECKLIST pertenece al subsistema RESEARCH (lo invoca, lo desarrolla), pero KNOWLEDGE BASE define el esquema canónico de SAH y CVC. Si cambia el esquema, Knowledge Base notifica a Research.

**DECISIÓN-05:** Los focus types de Research se extraen de CREATE_RESEARCH_PLAN a un recurso independiente: RESOURCE_RESEARCH_FOCUS_TYPES_v1.0. CREATE_RESEARCH_PLAN pasa a v3.0.

**Motivo:** 17% del prompt (270 líneas) son configuración de focus. El 83% restante es proceso compartido. Extraer permite añadir un Focus H sin tocar la lógica del prompt.

---

### 1.5 Decisiones sobre Activation → Book

**DECISIÓN-06:** Activation puede proponer 3-4 ideas para un nuevo libro (BOOK_BRIEF). El BOOK_BRIEF no sustituye al Research — lo orienta. El flujo es:

```
ACTIVATION → BOOK_BRIEF
                 ↓
           [editor decide]
                 ↓
           RESEARCH (orientado por el brief como input opcional en Fase 0)
                 ↓
           WRITING BOOK
```

**Pendiente de diseño:** El prompt PROMPT_CREATE_BOOK_BRIEF y la integración del BOOK_BRIEF como input opcional en el workflow de Research.

---

### 1.6 Decisiones sobre prompts compartidos

**DECISIÓN-07:** Los prompts usados por más de un subsistema son propiedad del subsistema que tiene criterio para desarrollarlos. Viven en `/[subsistema_owner]/shared/` del repositorio.

**Prompts compartidos identificados y su ubicación:**
- `WRITE_POST` — `/writing/shared/` — owner: writing-dev — invocado por: Writing (Post), Activation
- `CREATE_TIMELINE` — `/writing/shared/` — owner: writing-dev — invocado por: Writing Book, Activation
- `CREATE_CAST` — `/writing/shared/` — owner: writing-dev — invocado por: Writing Book, Activation

**Regla de ownership:** Writing los desarrolla porque tiene criterio para mejorarlos (calidad de escritura, voz, estructura literaria). Activation los invoca pero no los desarrolla. Cuando writing-dev hace un cambio, notifica a activation-dev via DECISION_LOG entry antes de mergear.

---

### 1.7 Decisiones sobre nomenclatura

**DECISIÓN-08:** Convención de naming unificada aprobada. Ver NAMING_CONVENTION_ANALYSIS_v1.1 para el detalle completo.

**Resumen de reglas:**
```
Archivos del sistema:   [TIPO]_[ACCION_OBJETO]_v[X.Y].md
Artefactos de proyecto: [COD]_[WF]_[TIPO]_[VARIANTE]_v[X.Y].md
```

**Tipos de archivo del sistema:** PROMPT, WORKFLOW, RESOURCE, GUIDE, TEMPLATE, SCHEMA

**Workflows definitivos:**
- WORKFLOW_RESEARCH_v3.1 (existente, renombrar)
- WORKFLOW_WRITING_v1.7 (existente, renombrar + bifurcación interna)
- WORKFLOW_ACTIVATION_v1.4 (existente, renombrar)

**Nota:** Se elimina el sufijo `_SISTEMA_TINTA_ARTIFICIAL` de todos los workflows.
**Nota:** `WORKFLOW_WRITING_BOOKS` pasa a `WORKFLOW_WRITING` (unificado, con bifurcación interna).

---

### 1.8 Decisiones sobre cabecera estándar de artefactos

**DECISIÓN-09:** Todos los artefactos del sistema incluyen cabecera YAML estándar.

```yaml
---
id:          [NOMBRE_SIN_VERSION]
type:        PROMPT | WORKFLOW | RESOURCE | GUIDE | TEMPLATE | SCHEMA
subsystem:   SYSTEM | KNOWLEDGE_BASE | RESEARCH | EDITORIAL_PROFILE | 
             WRITING | EVALUATION | ACTIVATION | DOCS | SHARED
version:     X.Y
status:      DRAFT | ACTIVE | DEPRECATED
created:     YYYY-MM-DD
updated:     YYYY-MM-DD
owner_chat:  [nombre-del-chat-de-desarrollo]
---

## CHANGELOG
| Version | Date | Author | Summary |
...

## DEPENDENCIES
inputs:  [lista de artefactos que necesita como entrada]
outputs: [lista de artefactos que produce]
calls:   [lista de prompts que invoca durante ejecución]

## DESCRIPTION
[Una línea describiendo función y cuándo usar]
```

---

### 1.9 Decisiones sobre almacenamiento

**DECISIÓN-10:** GitHub para el sistema, Google Drive para los proyectos de escritura.

- **GitHub `dx-opus`:** Todos los artefactos del sistema (prompts, workflows, recursos, guías, templates, schemas). Repositorio privado.
- **Google Drive:** Artefactos de producción por proyecto (RESEARCH_REPORTs, capítulos, posts). Estructura de carpetas estandarizada por proyecto.

**DECISIÓN-11:** Integración con GitHub vía MCP Server oficial. Claude puede leer, modificar, hacer commit y crear PRs directamente desde el chat. El usuario aprueba los merges.

**DECISIÓN-12:** Setup de proyectos en Drive mediante Google Apps Script almacenado en GitHub (`/tools/setup_project.gs`). El editor ejecuta el script una vez por proyecto con el código de proyecto como parámetro.

---

### 1.10 Decisiones sobre DOCS

**DECISIÓN-13:** DOCS es un subsistema activo, no un repositorio pasivo.

**Mecanismo de sincronización:** DECISION_LOG entries. Cada chat de desarrollo produce entradas con el formato:
```
fecha:              YYYY-MM-DD
subsistema_afectado:
decision:
rationale:          (una línea)
impacto_en_docs:    [qué sección de qué manual necesita actualización]
estado:             PENDIENTE | INTEGRADO
```

**Cuatro tipos de documentación:**
1. System Design Docs (audiencia: arquitectos) — pull desde SYSTEM
2. Subsystem Implementation Docs (audiencia: desarrolladores del subsistema) — pull desde cada subsistema
3. Editor Manuals (audiencia: usuarios del sistema) — push desde DOCS
4. Developer Manuals (audiencia: nuevos desarrolladores) — push desde DOCS

---

### 1.11 Decisiones sobre TOOLING

**DECISIÓN-14:** Las herramientas operativas (scripts, automatizaciones, infraestructura) son propiedad de SYSTEM mientras sean pocas y simples. No justifican un subsistema propio en este momento.

**Artefactos de TOOLING** viven en SYSTEM bajo una sección "Operational Tools" explícita:
- `setup_project.gs` — script para crear estructura de proyecto en Drive
- Estructura del repositorio GitHub (carpetas + READMEs)
- Futuros scripts de automatización

**Criterio de extracción:** Cuando haya más de 3 herramientas activas, o cuando alguna requiera desarrollo iterativo propio, se crea un subsistema TOOLING independiente con su chat de desarrollo. Este criterio queda registrado para que sea evaluado en revisiones futuras del sistema.

**Tipo de artefacto para herramientas operativas:** `TOOL` — añadido como séptimo tipo válido junto a PROMPT, WORKFLOW, RESOURCE, GUIDE, TEMPLATE, SCHEMA.

```yaml
# Ejemplo de cabecera para herramienta operativa
id:       TOOL_SETUP_PROJECT
type:     TOOL
subsystem: SYSTEM
```

---

## PARTE 2: ARTEFACTOS A CREAR

Nuevos artefactos que no existen y deben crearse.

| # | Artefacto | Tipo | Subsistema | Prioridad | Descripción |
|---|---|---|---|---|---|
| N-01 | RESOURCE_RESEARCH_FOCUS_TYPES_v1.0 | RESOURCE | KNOWLEDGE_BASE | 🔴 Alta | 7 focus types extraídos de CREATE_RESEARCH_PLAN |
| N-02 | RESOURCE_EVALUATION_FRAMEWORK_v1.0 | RESOURCE | EVALUATION | 🔴 Alta | Contrato de evaluación: output canónico + protocolo de invocación |
| N-03 | RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0 | RESOURCE | SYSTEM | 🔴 Alta | Especificación formal de la cabecera YAML incluyendo tipo TOOL |
| N-04 | GUIDE_ANNOTATION_PHASE3_v1.0 | GUIDE | RESEARCH | 🟠 Media | Guía específica de anotación Fase 3 (TASK/LINE/COMMENT) |
| N-05 | PROMPT_CREATE_BOOK_BRIEF_v1.0 | PROMPT | ACTIVATION | 🟡 Baja | Genera 3-4 propuestas de libro desde colección existente |
| N-06 | PROMPT_EVALUATE_POST_v1.0 | PROMPT | EVALUATION | 🟡 Baja | Evaluador de posts según contrato de evaluación |
| N-07 | PROMPT_EVALUATE_ACTIVATION_v1.0 | PROMPT | EVALUATION | 🟡 Baja | Evaluador de campañas de activación |
| N-08 | WORKFLOW_WRITING_v1.0* | WORKFLOW | WRITING | 🟠 Media | Workflow unificado Book+Post con bifurcación editorial |
| N-09 | SCHEMA_SYSTEM_ARCHITECTURE_v1.0 | SCHEMA | SYSTEM | 🟠 Media | Mapa completo del sistema con 8 subsistemas y sus interfaces |
| N-10 | SCHEMA_DECISION_LOG_v1.0 | SCHEMA | SYSTEM | 🟠 Media | Formato estándar de DECISION_LOG entries |
| N-11 | TEMPLATE_SUBSYSTEM_CONTEXT_v1.0 | TEMPLATE | SYSTEM | 🟠 Media | Plantilla para documentos de contexto de chats de desarrollo |
| N-12 | TOOL_SETUP_PROJECT_v1.0 | TOOL | SYSTEM | 🟠 Media | Google Apps Script para crear estructura de proyecto en Drive |
| N-13 | TOOL_GITHUB_REPO_STRUCTURE_v1.0 | TOOL | SYSTEM | 🟠 Media | Árbol de carpetas + README por subsistema para inicializar el repo |

*WORKFLOW_WRITING v1.0 es una refactorización del WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1.7, no un rediseño completo.

---

## PARTE 3: ARTEFACTOS A MODIFICAR

Artefactos existentes que necesitan cambios.

### 3.1 Cambios de naming (renombrar + añadir cabecera YAML)

| Archivo actual | Archivo propuesto | Cambio adicional |
|---|---|---|
| WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL_v3_1.md | WORKFLOW_RESEARCH_v3.1.md | + cabecera YAML |
| WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md | WORKFLOW_WRITING_v1.7.md | + cabecera YAML + bifurcación interna |
| WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md | WORKFLOW_ACTIVATION_v1.4.md | + cabecera YAML |
| SOURCE_AUTHORITY_HIERARCHY_v2_0.md | RESOURCE_SOURCE_AUTHORITY_v2.0.md | + cabecera YAML |
| CLAIM_VALIDATION_CRITERIA_v1_0.md | RESOURCE_CLAIM_VALIDATION_v1.0.md | + cabecera YAML |
| ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md | RESOURCE_EDITORIAL_STYLE_v1.0.md | + cabecera YAML |
| TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md | RESOURCE_BOOK_TYPES_v1.2.md | + cabecera YAML |
| GUIA_NOTAS_DEL_EDITOR.md | GUIDE_EDITOR_NOTES_v1.0.md | + cabecera YAML + versión |
| TEMPLATE_NOTAS_DEL_EDITOR.md | TEMPLATE_EDITOR_NOTES_v1.0.md | + cabecera YAML + versión |
| EDITOR_PROFILE_TEMPLATE.md | TEMPLATE_EDITOR_PROFILE_v1.0.md | + cabecera YAML + versión |
| DESCRIPCION_SISTEMA_DX_OPUS_2000_PALABRAS.md | SCHEMA_SYSTEM_OVERVIEW_v1.0.md | + cabecera YAML |
| PROMPT_CREATE_CAST_v1_0_.md | PROMPT_CREATE_CAST_v1.0.md | Eliminar trailing underscore |
| PROMPT_WRITE_PROLOGO_v1_0.md | PROMPT_WRITE_PROLOGUE_v1.0.md | Traducir a inglés |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | PROMPT_CREATE_BOOK_SHEET_v1.1.md | Traducir "ficha técnica" |

**Todos los demás prompts** (los que no están en la tabla): añadir cabecera YAML sin cambio de nombre.

### 3.2 Cambios de contenido

| Artefacto | Versión actual → nueva | Cambios requeridos | Prioridad |
|---|---|---|---|
| PROMPT_CREATE_RESEARCH_PLAN | v2.1.2 → v3.0 | Externalizar focus types a RESOURCE_RESEARCH_FOCUS_TYPES. Leer el resource en Step 0. | 🔴 Alta |
| PROMPT_SUMMARIZE_REFERENCES | v4.0 → v4.1 | Añadir SAH y CVC como recursos del sistema en inputs. Corregir título interno (eliminar SBSTK_). | 🔴 Alta |
| PROMPT_UPDATE_VALIDATION_CHECKLIST | v3.0 → v3.1 | Corregir referencias a secciones erróneas (GAP-R01, GAP-R02, GAP-R05). | 🔴 Alta |
| WORKFLOW_RESEARCH | v3.1 → v3.2 | Adoptar estructuras canónicas de REFERENCE_SUMMARY y RESEARCH_PLAN (GAP-R01, GAP-R02). Añadir RESOURCE_RESEARCH_FOCUS_TYPES como input de Fase 4B. Añadir BOOK_BRIEF como input opcional de Fase 0. | 🔴 Alta |
| PROMPT_EVALUATE_RESEARCH_REPORT | v1.0 → v1.1 | Clarificar cobertura de RAMA A (GAP-R07). Adoptar contrato de evaluación. | 🟠 Media |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 → v1.1 | Adoptar contrato de evaluación. | 🟠 Media |
| PROMPT_EVALUATE_BOOK_CONTENT | v1.0 → v1.1 | Adoptar contrato de evaluación. | 🟠 Media |
| WORKFLOW_WRITING | v1.7 → v2.0* | Añadir bifurcación Book/Post. Añadir prompts Rama Post cuando estén diseñados. | 🟠 Media |

*El salto a v2.0 refleja cambio arquitectónico significativo (bifurcación unificada).

---

## PARTE 4: SETUP TÉCNICO PENDIENTE

Tareas de infraestructura necesarias antes o en paralelo al desarrollo.

### 4.1 GitHub

| # | Tarea | Dependencias | Responsable |
|---|---|---|---|
| G-01 | Crear cuenta/organización GitHub y repositorio `dx-opus` (privado) | — | Editor |
| G-02 | Configurar GitHub MCP Server en Claude.ai (Settings → Integrations → GitHub PAT) | G-01 | Editor |
| G-03 | Test de integración: desde un chat con MCP activo, leer y escribir un archivo | G-02 | Editor + Claude |
| G-04 | Crear estructura de carpetas del repositorio con README por subsistema | G-03 | Claude (ejecutable desde chat) |
| G-05 | Migrar artefactos actuales desde Drive a GitHub con naming corregido | G-04 | Claude + Editor |
| G-06 | Configurar branch protection en main (requiere PR para mergear) | G-04 | Editor |
| G-07 | Crear ramas iniciales por subsistema | G-06 | Claude |

### 4.2 Google Drive

| # | Tarea | Dependencias | Responsable |
|---|---|---|---|
| D-01 | Crear `setup_project.gs` en Google Apps Script | — | Claude (listo para entregar) |
| D-02 | Almacenar `setup_project.gs` en GitHub bajo `/tools/` | G-04 | Claude |
| D-03 | Test: ejecutar script en un proyecto real | D-01 | Editor |

### 4.3 Documentos de contexto para chats de desarrollo

| # | Chat | Estado |
|---|---|---|
| C-01 | SYSTEM (este chat) | Implícito — es este documento |
| C-02 | KNOWLEDGE BASE | ❌ Pendiente crear |
| C-03 | RESEARCH | ❌ Pendiente crear |
| C-04 | EDITORIAL PROFILE | ❌ Pendiente crear |
| C-05 | WRITING | ❌ Pendiente crear |
| C-06 | EVALUATION | ❌ Pendiente crear |
| C-07 | ACTIVATION | ❌ Pendiente crear |
| C-08 | DOCS | ❌ Pendiente crear |

Todos siguen la misma TEMPLATE_SUBSYSTEM_CONTEXT (artefacto N-11 pendiente de crear).

---

## PARTE 5: PLAN DE EJECUCIÓN

Secuencia recomendada que maximiza valor por unidad de esfuerzo y respeta dependencias.

### FASE 0 — Fundamentos (antes de tocar ningún prompt)
*Objetivo: tener los estándares y herramientas definidos antes de aplicarlos.*

| # | Tarea | Artefacto resultante | Bloqueado por |
|---|---|---|---|
| F0-01 | Crear RESOURCE_ARTIFACT_HEADER_STANDARD | N-03 | — |
| F0-02 | Crear SCHEMA_SYSTEM_ARCHITECTURE | N-09 | — |
| F0-03 | Crear SCHEMA_DECISION_LOG | N-10 | — |
| F0-04 | Crear TEMPLATE_SUBSYSTEM_CONTEXT | N-11 | N-09 |
| F0-05 | Crear TOOL_SETUP_PROJECT (Google Apps Script) | N-12 | — |
| F0-06 | Crear TOOL_GITHUB_REPO_STRUCTURE | N-13 | N-09 |
| F0-07 | Setup GitHub: crear repo + configurar MCP (tareas G-01 a G-03) | — | Editor |

*Estimación: F0-01 a F0-06 completables en este chat en una sesión. F0-07 requiere acción del editor.*

---

### FASE 1 — Nuevos recursos del sistema
*Objetivo: crear los recursos que desbloquean modificaciones en prompts existentes.*

| # | Tarea | Artefacto resultante | Bloqueado por |
|---|---|---|---|
| F1-01 | Crear RESOURCE_RESEARCH_FOCUS_TYPES | N-01 | F0-01 |
| F1-02 | Crear RESOURCE_EVALUATION_FRAMEWORK | N-02 | F0-01 |
| F1-03 | Crear GUIDE_ANNOTATION_PHASE3 | N-04 | F0-01 |
| F1-04 | Crear setup_project.gs | D-01 | — |

*Estos se desarrollan en sus chats de subsistema una vez creados los contextos (F0-04).*

---

### FASE 2 — Correcciones críticas en Research
*Objetivo: resolver los 4 GAPs críticos identificados en la auditoría.*

| # | Tarea | Artefacto resultante | Bloqueado por | GAP resuelto |
|---|---|---|---|---|
| F2-01 | Actualizar WORKFLOW_RESEARCH estructura canónica | WORKFLOW_RESEARCH_v3.2 | F0-01 | R01, R02 |
| F2-02 | Corregir referencias en UPDATE_VALIDATION_CHECKLIST | PROMPT_UPDATE_VALIDATION_CHECKLIST_v3.1 | F2-01 | R05 |
| F2-03 | Actualizar referencias en CREATE_RESEARCH_PLAN | PROMPT_CREATE_RESEARCH_PLAN_v2.2* | F2-01 | R01, R02 |
| F2-04 | Añadir SAH+CVC a SUMMARIZE_REFERENCES | PROMPT_SUMMARIZE_REFERENCES_v4.1 | F0-01 | R04 |

*F2-03 produce v2.2, no v3.0 — las correcciones de referencias son MINOR. La externalización de focus types (que sí es v3.0) va en Fase 3.*

---

### FASE 3 — Refactors arquitectónicos
*Objetivo: implementar las decisiones arquitectónicas que requieren crear antes de modificar.*

| # | Tarea | Artefacto resultante | Bloqueado por |
|---|---|---|---|
| F3-01 | Externalizar focus types de CREATE_RESEARCH_PLAN | PROMPT_CREATE_RESEARCH_PLAN_v3.0 | F1-01 |
| F3-02 | Adoptar contrato de evaluación en evaluadores existentes | EVALUATE_*_v1.1 (×3) | F1-02 |
| F3-03 | Clarificar EVALUATE_RESEARCH_REPORT para RAMA A | PROMPT_EVALUATE_RESEARCH_REPORT_v1.1 | F1-02 |
| F3-04 | Migrar artefactos a GitHub con naming corregido | — | G-04 |
| F3-05 | Crear documentos de contexto para 7 chats de desarrollo | C-02 a C-08 | N-11, N-09 |

---

### FASE 4 — Nuevos componentes
*Objetivo: diseñar los prompts y workflows pendientes.*

| # | Tarea | Artefacto resultante | Bloqueado por | Chat responsable |
|---|---|---|---|---|
| F4-01 | Diseñar WORKFLOW_WRITING con bifurcación | WORKFLOW_WRITING_v2.0 | F3-05 | writing-dev |
| F4-02 | Diseñar Rama Post de Writing | PROMPT_PLAN_POST, PROMPT_WRITE_POST_v1.0... | F4-01 | writing-dev |
| F4-03 | Diseñar PROMPT_CREATE_BOOK_BRIEF | N-05 | F3-05 | activation-dev |
| F4-04 | Diseñar PROMPT_EVALUATE_POST | N-06 | F1-02 | evaluation-dev |
| F4-05 | Diseñar PROMPT_EVALUATE_ACTIVATION | N-07 | F1-02 | evaluation-dev |
| F4-06 | Diseñar estructura de DOCS y primeros documentos | — | F3-05 | docs-dev |

---

### FASE 5 — Menor prioridad
*Objetivo: correcciones menores que no bloquean nada.*

| # | Tarea | Notas |
|---|---|---|
| F5-01 | Decisión sobre secciones 4-6 de NARRATIVE_BRIDGE (GAP-R09) | Mantener o eliminar — requiere decisión editorial |
| F5-02 | Decisión sobre "Practical Applications" sin consumidor (GAP-R08) | Requiere decisión editorial |
| F5-03 | Renombrar todos los prompts según naming convention | Fase 5 porque impacta más referencias cruzadas |

---

## PARTE 6: TRABAJO PREPARABLE EN ESTE CHAT HOY

Sin esperar setup de GitHub, los siguientes artefactos pueden producirse en esta sesión y descargarse para uso inmediato o subida manual:

| # | Artefacto | ID en Plan | Notas |
|---|---|---|---|
| H-01 | RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0 | N-03 | Define cabecera YAML incluyendo tipo TOOL |
| H-02 | SCHEMA_SYSTEM_ARCHITECTURE_v1.0 | N-09 | Mapa completo de 8 subsistemas e interfaces |
| H-03 | SCHEMA_DECISION_LOG_v1.0 | N-10 | Formato estándar para DECISION_LOG entries |
| H-04 | TEMPLATE_SUBSYSTEM_CONTEXT_v1.0 | N-11 | Plantilla para documentos de contexto de chats |
| H-05 | TOOL_SETUP_PROJECT_v1.0 | N-12 | Google Apps Script listo para usar |
| H-06 | TOOL_GITHUB_REPO_STRUCTURE_v1.0 | N-13 | Árbol de carpetas + README por subsistema |

---

## PARTE 7: RESUMEN DE GAPS DE RESEARCH PENDIENTES

Para referencia: estado de los 11 gaps identificados en la auditoría de Research.

| ID | Descripción | Severidad | Fase de resolución |
|---|---|---|---|
| GAP-R01 | Estructura REFERENCE_SUMMARY: prompt vs workflow | 🔴 CRÍTICO | Fase 2 (F2-01) |
| GAP-R02 | Estructura RESEARCH_PLAN: prompt vs workflow | 🔴 CRÍTICO | Fase 2 (F2-01) |
| GAP-R04 | SUMMARIZE_REFERENCES sin SAH ni CVC | 🔴 CRÍTICO | Fase 2 (F2-04) |
| GAP-R05 | UPDATE_VALIDATION_CHECKLIST referencia sección inexistente | 🔴 CRÍTICO | Fase 2 (F2-02) |
| GAP-R03 | Estructura NARRATIVE_BRIDGE: prompt vs workflow | 🟠 IMPORTANTE | Fase 2 (F2-01) |
| GAP-R06 | Fase 3 sin soporte ni guía estructurada | 🟠 IMPORTANTE | Fase 1 (F1-03) |
| GAP-R07 | EVALUATE no cubre RESEARCH_DEEP_DIVE | 🟠 IMPORTANTE | Fase 3 (F3-03) |
| GAP-R11 | Focus types embebidos en CREATE_RESEARCH_PLAN | 🟠 IMPORTANTE | Fase 3 (F3-01) |
| GAP-R08 | "Practical Applications" sin consumidor | 🟡 MENOR | Fase 5 (F5-02) |
| GAP-R09 | NB secciones 4-6 sin consumidor | 🟡 MENOR | Fase 5 (F5-01) |
| GAP-R10 | Naming inconsistente SUMMARIZE_REFERENCES | 🟡 MENOR | Fase 3 (F3-04, renaming global) |

---

**FIN DEL DOCUMENTO**

*Próxima acción recomendada: producir los artefactos de Parte 6 (H-01 a H-06) en esta sesión.*
