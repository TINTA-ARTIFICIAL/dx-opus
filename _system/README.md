# _system/

Directorio raíz del subsistema SYSTEM. Contiene los artefactos fundacionales que hacen posible el desarrollo coherente del resto del sistema D-X-OPUS: arquitectura, estándares, decisiones globales y herramientas operativas.

**Owner:** system-architecture chat  
**Referencia principal:** `MASTER_PLAN.md`  
**Estado:** R1 completamente implementado. Sprint 4: Package System operacional. Hotfix v1.4.1 aplicado.

---

## Artefactos Core

| Artefacto | Versión | Tipo | Descripción |
|---|---|---|---|
| **MASTER_PLAN.md** | **v1.6** | SCHEMA | **Estado completo del sistema: R1 implementado al 100% sin gaps pendientes** |
| SCHEMA_SYSTEM_ARCHITECTURE.md | v1.3 | SCHEMA | Mapa completo del sistema: 8 subsistemas, interfaces, flujos, prompts compartidos |
| SCHEMA_DECISION_LOG.md | v2.1 | SCHEMA | Formato estándar de entradas DL. Define naming, campos, ciclo de vida |
| RESOURCE_ARTIFACT_HEADER_STANDARD.md | v1.0 | RESOURCE | Estándar de cabecera YAML obligatoria en todos los artefactos |
| TEMPLATE_SUBSYSTEM_CONTEXT.md | v1.0 | TEMPLATE | Template para crear documentos de contexto de desarrollo |
| NAMING_CONVENTION_ANALYSIS.md | v1.2 | SCHEMA | Convención de naming unificada para GitHub y Google Drive |

---

## Artefactos R1 Implementation

| Artefacto | Versión | Tipo | Descripción |
|---|---|---|---|
| **PROMPT_PROJECT_DISCOVERY.md** | **v1.0** | **PROMPT** | **Guidance inteligente para primera sesión — material assessment y workflow selection** |
| **ARQUITECTURA_AUTO_SAVE_GENERICA.md** | **v1.0** | **SCHEMA** | **Especificación técnica del auto-save universal implementado** |

---

## Artefactos Sprint 4 — Package System

| Artefacto | Versión | Tipo | Descripción |
|---|---|---|---|
| **SPEC_PACKAGE_SYSTEM.md** | **v1.0** | **SPEC** | **Especificación técnica completa del sistema de release packages** |

---

## Subcarpetas

### `decisions/`

**Status:** 36 Decision Log entries — última: DL_20260506_SYSTEM_036

Registro completo de decisiones arquitectónicas del sistema. Formato: `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`.

**R1 Implementation Decisions (Mayo 2026):**
- **DL_20260504_SYSTEM_028:** Auto-save genérico universal
- **DL_20260504_SYSTEM_029:** TOOL_CREATE_PROJECT renaming/enhancement
- **DL_20260504_SYSTEM_030:** TEMPLATE_EDITOR_CONFIG formal
- **DL_20260504_SYSTEM_031:** Templates PROJECT estandarizados
- **DL_20260504_SYSTEM_032:** PROMPT_PROJECT_DISCOVERY implementation
- **DL_20260504_SYSTEM_033:** TOOL_SETUP_EDITOR_ENVIRONMENT — Gap R1 cerrado

**Sprint 4 Decisions:**
- **DL_20260505_SYSTEM_035:** Package system implementation — setup 45-60 min → 5-10 min

**Sprint 4 Hotfix:**
- **DL_20260506_SYSTEM_036:** Hotfix v1.4.1 — 5 bugs E2E test TC-3.1 corregidos

Ver `decisions/README.md` para inventario completo.

### `templates/`

**Status:** R1 template system operational

Sistema formal de templates con variable substitution para auto-generación de artefactos.

| Template | Versión | Descripción |
|---|---|---|
| **TEMPLATE_EDITOR_CONFIG.md** | **v1.0** | Personal configuration template con auto-tracking |
| **TEMPLATE_PROJECT_README.md** | **v1.0** | Auto-generated project documentation |
| **TEMPLATE_PROJECT_INSTRUCTIONS.md** | **v1.0** | Personalized Claude.ai project instructions |

**Integration:** Templates integrados con TOOL_CREATE_PROJECT.gs para auto-generación.

### `resources/`

**Status:** R1 resource system operational

Archivos de configuración y recursos técnicos del sistema.

| Resource | Versión | Descripción |
|---|---|---|
| **AUTO_SAVE_CONFIG.yaml** | **v1.0** | Universal auto-save configuration para todos los workflows |

**Coverage:** Auto-save config cubre Research, Writing Book, Writing Post, Activation workflows.

### `audits/`

**Status:** Component auditing system operational

Auditorías de subsistemas producidas por system-architecture para verificar consistencia.

| Auditoría | Versión | Subsistema Auditado |
|---|---|---|
| RESEARCH_COMPONENT_AUDIT.md | v1.0 | Research (April 2026) |

**Purpose:** Verifican presencia, versión, cabecera YAML y coherencia de artefactos.

### `test-records/`

**Status:** Sprint 4 — nuevo

Registros de testing de componentes del sistema. Documentan ejecución de casos de test y sign-off de releases.

| Documento | Versión | Descripción |
|---|---|---|
| **TEST_PACKAGE_SYSTEM_E2E.md** | **v1.0** | **17 casos de test para el package system — completar antes de cada release** |

**Uso:** Ejecutar y completar antes de publicar cada GitHub release. Archivar copia completada con el número de versión.

---

## Estado del Sistema (Mayo 2026)

### ✅ R1 IMPLEMENTATION COMPLETE

**No hay gaps pendientes en R1.** Todas las funcionalidades están implementadas.

#### Setup Architecture Complete
- ✅ **NIVEL 0:** create-release-package.sh — Sprint package automation
- ✅ **NIVEL 1:** TOOL_SETUP_EDITOR_ENVIRONMENT v1.1.1 — Package-based install (5-10 min)
- ✅ **NIVEL 2:** TOOL_CREATE_PROJECT v1.1.0 — Project automation (2-3 min)
- ✅ **Latest package:** v1.4.1 (Sprint 4 Hotfix)

#### Auto-save Universal
- ✅ All workflows: Research, Writing Book, Writing Post, Activation
- ✅ Naming standard: Consistent across all artifacts
- ✅ Configuration: AUTO_SAVE_CONFIG.yaml operational

#### Intelligent First Session
- ✅ PROJECT_DISCOVERY: Automatic material assessment
- ✅ Workflow selection: Smart recommendation based on content
- ✅ Pre-workflow organization: `_discovery/` folder management

#### Template System
- ✅ Auto-generation: PROJECT_README, PROJECT_INSTRUCTIONS, EDITOR_CONFIG
- ✅ Variable substitution: Dynamic personalization
- ✅ Multi-editor: Template system scales automatically

---

## Development Process

### Core Development Pattern
1. **Decision first:** Create DL entry before implementation
2. **Implementation:** Follow established patterns and standards
3. **Documentation:** Update all affected READMEs and specifications
4. **Integration:** Mark DL entry as INTEGRATED when complete

### Artifact Standards
- **YAML header:** Mandatory per RESOURCE_ARTIFACT_HEADER_STANDARD
- **Versioning:** vX.Y format (two levels)
- **Naming:** No version in filename (GitHub), with version in YAML header
- **Documentation:** README in every functional directory

### Sprint Closure Protocol
1. All sprint artifacts completed and tested
2. All DL entries created and marked INTEGRATED
3. All READMEs updated
4. Run: `./tools/create-release-package.sh sprint-N`
5. Update MASTER_PLAN with new package version

---

## Support

**For development questions:** Use system-architecture chat with MASTER_PLAN as context  
**For setup assistance:** Follow `tools/README.md` — run `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`  
**For technical issues:** Reference `_system/resources/` configuration files  
**For process questions:** Review `SCHEMA_DECISION_LOG.md` format and examples

---

**R1 System Status: Completely implemented and operational. Sprint 4 Hotfix v1.4.1: 5 E2E test bugs corrected.**
