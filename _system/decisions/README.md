# Decision Log Index — D-X-OPUS

**Directory:** `_system/decisions/`  
**Purpose:** All architectural and functional decisions  
**Updated:** 2026-09-03 (Sprint 5 Planning + Plugin Architecture Spike)  
**Last DL Number:** 041

---

## Overview

This directory contains all decisions that affect the D-X-OPUS system architecture, workflows, interfaces, or development process. Each decision is documented according to `SCHEMA_DECISION_LOG.md`.

**Format:** `DL_YYYYMMDD_SUBSYSTEM_NNN.md`  
**Numbering:** Sequential per subsystem (see SCHEMA_DECISION_LOG v2.2)

---

## Current Status

### Latest Numbers by Subsystem

| Subsystem | Latest DL# | Last Decision | Date |
|-----------|------------|---------------|------|
| **SYSTEM** | **041** | Plugin architecture spike — DX-OPUS as Cowork plugin (9 skills), replaces Apps Script + Drive setup | 2026-09-03 |
| KB | 004 | SAH/CVC propagation governance — editor-approved, dedicated step, blocked by #49 | 2026-09-03 |
| RESEARCH | — | (No DL entries yet) | — |
| WRITING | 015 | Q&A always active in POST workflow | 2026-04-11 |
| EVALUATION | — | (No DL entries yet) | — |
| ACTIVATION | — | (No DL entries yet) | — |
| EDITORIAL | — | (No DL entries yet) | — |
| DOCS | — | (No DL entries yet) | — |

### Total Decisions Logged
**42 total DL entries** across all subsystems

---

## Recent Decisions

### Sprint 5 Planning (September 2026)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260903_KB_004 | SAH/CVC propagation governance (issue #70) — editor-approved, dedicated step (not a side effect of PROMPT_UPDATE_VALIDATION_CHECKLIST). Design only; implementation blocked by issue #49 (S5-03) | OPEN |
| DL_20260903_SYSTEM_041 | Plugin architecture spike — DX-OPUS migrates to a Cowork plugin (9 skills, replaces TOOL_CREATE_PROJECT.gs + TOOL_SETUP_EDITOR_ENVIRONMENT.gs). Design only (S5-12/13/14); build deferred to Sprint 6+. See SPEC_PLUGIN_ARCHITECTURE.md v0.2 | OPEN |

### Sprint 5 Design (May 2026)

**Architectural decisions produced during E2E test analysis and session closure:**

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260520_SYSTEM_040 | Automated dev session closure — DLs, READMEs and all artifacts saved directly to repo via MCP Drive. Three levels: Project Instructions (immediate), PROMPT_DEV_CLOSURE (Sprint 5), Dev Agent (Phase 2) | OPEN |
| DL_20260509_SYSTEM_039 | Create D-X-OPUS/workflows/ as dedicated folder for workflow orchestration documents — prerequisite for SESSION_ORCHESTRATOR | OPEN |
| DL_20260508_SYSTEM_038 | EDITOR DIGITAL: SESSION_ORCHESTRATOR + WORKFLOW_STATE as central orchestration mechanism. Editor Digital adopts EDITORIAL_PROFILE. SESSION_ORCHESTRATOR is mandatory entry point. WORKFLOW_STATE via auto-save. Editorial language principle (issue #75). | OPEN |

### Sprint 4 Hotfix (May 2026)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260507_SYSTEM_037 | create-release-package.sh v1.2 — added --patch N flag for hotfix versions | INTEGRATED |
| DL_20260506_SYSTEM_036 | Hotfix v1.4.1 — 5 compatibility bugs between TOOL_SETUP_EDITOR_ENVIRONMENT and TOOL_CREATE_PROJECT | INTEGRATED |

### Sprint 4 — Package System (May 2026)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260505_SYSTEM_035 | Package system implementation — setup time 45-60 min → 5-10 min | INTEGRATED |
| DL_20260504_SYSTEM_034 | TOOL_SETUP_EDITOR_ENVIRONMENT — Gap R1 cerrado | INTEGRATED |
| DL_20260504_SYSTEM_033 | SPEC_PACKAGE_SYSTEM — especificación técnica del release system | INTEGRATED |
| DL_20260504_SYSTEM_032 | PROMPT_PROJECT_DISCOVERY para primera sesión automática | INTEGRATED |
| DL_20260504_SYSTEM_031 | Templates PROJECT estandarizados (README + INSTRUCTIONS) | INTEGRATED |
| DL_20260504_SYSTEM_030 | TEMPLATE_EDITOR_CONFIG formal para configuración personal | INTEGRATED |
| DL_20260504_SYSTEM_029 | TOOL_CREATE_PROJECT renaming (from TOOL_SETUP_PROJECT_ENHANCED) | INTEGRATED |
| DL_20260504_SYSTEM_028 | Auto-save genérico universal para todos los artefactos | INTEGRATED |

---

## Key Architectural Decisions

### Foundational (Sprint 0-1)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260221_SYSTEM_001 | 8 subsistemas con chats independientes | INTEGRATED |
| DL_20260221_SYSTEM_002 | Focus types → RESOURCE_RESEARCH_FOCUS_TYPES | INTEGRATED |
| DL_20260221_SYSTEM_003 | Writing unified con bifurcación Book/Post | INTEGRATED |
| DL_20260221_SYSTEM_004 | Evaluation como subsistema independiente | INTEGRATED |
| DL_20260221_SYSTEM_005 | UPDATE_VALIDATION_CHECKLIST owned by Research | INTEGRATED |
| DL_20260221_SYSTEM_006 | BOOK_BRIEF orienta Research sin sustituirlo | INTEGRATED |
| DL_20260221_SYSTEM_007 | Prompts compartidos en /writing/shared/ | INTEGRATED |
| DL_20260221_SYSTEM_008 | Naming: sin versión en archivo GitHub | INTEGRATED |
| DL_20260221_SYSTEM_009 | Cabecera YAML estándar obligatoria | INTEGRATED |
| DL_20260221_SYSTEM_010 | GitHub sistema, Drive producción | INTEGRATED |
| DL_20260221_SYSTEM_011 | DOCS como subsistema activo | INTEGRATED |
| DL_20260221_SYSTEM_012 | TOOLING en SYSTEM <3 herramientas | INTEGRATED |
| DL_20260221_SYSTEM_013 | Subsistema 3 = EDITORIAL PROFILE | INTEGRATED |

### Evolution (Sprint 2-3)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260418_SYSTEM_027 | DL numbering per-subsystem (not global) | INTEGRATED |
| DL_20260416_SYSTEM_025 | POST workflow scope en Activation | INTEGRATED |
| DL_20260416_SYSTEM_026 | WORKFLOW_WRITING ubicación final | INTEGRATED |

### R1 Implementation (May 2026)

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260504_SYSTEM_028 | Auto-save genérico universal | INTEGRATED |
| DL_20260504_SYSTEM_029 | TOOL_CREATE_PROJECT renaming | INTEGRATED |
| DL_20260504_SYSTEM_030 | TEMPLATE_EDITOR_CONFIG formal | INTEGRATED |
| DL_20260504_SYSTEM_031 | Templates PROJECT estandarizados | INTEGRATED |
| DL_20260504_SYSTEM_032 | PROMPT_PROJECT_DISCOVERY añadido | INTEGRATED |

---

## Decision Status Tracking

### By Status

| Status | Count | Description |
|--------|--------|-------------|
| **INTEGRATED** | 35 | Implemented and operational |
| **OPEN** | 5 | Approved, pending Sprint 5/6 implementation |
| **SUPERSEDED** | 2 | Replaced by newer decisions |

### By Subsystem

| Subsystem | Total | Integrated | Open | Superseded |
|-----------|-------|------------|------|------------|
| **SYSTEM** | **34** | **28** | **4** | **2** |
| KB | 4 | 3 | 1 | 0 |
| WRITING | 4 | 4 | 0 | 0 |
| RESEARCH | 0 | 0 | 0 | 0 |
| EVALUATION | 0 | 0 | 0 | 0 |
| ACTIVATION | 0 | 0 | 0 | 0 |
| EDITORIAL | 0 | 0 | 0 | 0 |
| DOCS | 0 | 0 | 0 | 0 |

---

## Usage Guidelines

### Creating New DL Entries

1. **Check latest number:** Use the table above for your subsystem
2. **Format:** `DL_YYYYMMDD_SUBSYSTEM_NNN.md`
3. **Content:** Follow `SCHEMA_DECISION_LOG.md` format exactly
4. **Status:** Start with `status: OPEN`
5. **Integration:** Mark as `status: INTEGRATED` when implemented

### When to Create DL Entries

**Mandatory for:**
- Changes affecting other subsystems
- New artifacts or artifact removal
- Interface format changes
- Architectural decisions
- Development process changes

**Not required for:**
- Version updates without format changes
- Bug fixes within single artifact
- Documentation updates
- Content additions within existing structure

### Review Process

1. **Create:** DL entry with rationale and impact analysis
2. **Review:** Affected subsystems validate impact
3. **Approve:** Change implementation plan
4. **Implement:** Execute according to DL plan
5. **Integrate:** Mark DL as `status: INTEGRATED`

---

## Maintenance

### Regular Tasks

- **Update this README** when new DL entries are created
- **Track status changes** from OPEN → INTEGRATED
- **Review SUPERSEDED** entries for cleanup opportunities
- **Archive old entries** when system evolves significantly

### Audit Points

- **Quarterly:** Verify all INTEGRATED decisions are actually operational
- **Before major releases:** Ensure all critical decisions are documented
- **Sprint closure:** Mark implemented decisions as INTEGRATED

---

## For Developers

### Reading DL Entries

- **Start with rationale:** Understand why decision was made
- **Check affected subsystems:** Understand impact scope
- **Review implementation plan:** Follow specified approach
- **Verify status:** Ensure decision is actually implemented

### Referencing Decisions

- **In commits:** Reference DL ID (e.g., "implements DL_040")
- **In discussions:** Use full DL ID for clarity
- **In code comments:** Reference relevant architectural decisions
- **In documentation:** Link to specific DL entries for context

---

**Next DL Numbers:**
- **SYSTEM:** DL_YYYYMMDD_SYSTEM_042
- **KB:** DL_YYYYMMDD_KB_005
- **WRITING:** DL_YYYYMMDD_WRITING_016
- **Other subsystems:** DL_YYYYMMDD_[SUBSYSTEM]_001

---

**This index is maintained automatically as part of the development process.**
