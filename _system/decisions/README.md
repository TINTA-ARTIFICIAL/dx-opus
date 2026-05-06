# Decision Log Index — D-X-OPUS

**Directory:** `_system/decisions/`  
**Purpose:** All architectural and functional decisions  
**Updated:** May 2026 (Sprint 4 Hotfix — E2E Test Bugs)  
**Last DL Number:** 036

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
| **SYSTEM** | **036** | Hotfix v1.4.1 — 5 bugs from E2E test TC-3.1 | 2026-05-06 |
| KB | 003 | CANONICAL UPDATE SCHEMA for SAH/CVC | 2026-02-22 |
| RESEARCH | — | (No DL entries yet) | — |
| WRITING | 015 | Q&A always active in POST workflow | 2026-04-11 |
| EVALUATION | — | (No DL entries yet) | — |
| ACTIVATION | — | (No DL entries yet) | — |
| EDITORIAL | — | (No DL entries yet) | — |
| DOCS | — | (No DL entries yet) | — |

### Total Decisions Logged
**36 total DL entries** across all subsystems

---

## Recent Decisions

### Sprint 4 Hotfix (May 2026)

**Bugs found and fixed during first E2E test of TA_Bottom_Up (TC-3.1):**

| DL ID | Decision | Status |
|-------|----------|---------|
| DL_20260506_SYSTEM_036 | Hotfix v1.4.1 — 5 compatibility bugs between TOOL_SETUP_EDITOR_ENVIRONMENT and TOOL_CREATE_PROJECT | INTEGRATED |

### Sprint 4 — Package System (May 2026)

**Complete setup architecture implementation:**

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
| **INTEGRATED** | 34 | Implemented and operational |
| **OPEN** | 0 | Approved but not yet implemented |
| **SUPERSEDED** | 2 | Replaced by newer decisions |

### By Subsystem

| Subsystem | Total | Integrated | Open | Superseded |
|-----------|-------|------------|------|------------|
| **SYSTEM** | **29** | **27** | **0** | **2** |
| KB | 3 | 3 | 0 | 0 |
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

- **In commits:** Reference DL ID (e.g., "implements DL_036")
- **In discussions:** Use full DL ID for clarity
- **In code comments:** Reference relevant architectural decisions
- **In documentation:** Link to specific DL entries for context

---

**Next DL Numbers:**
- **SYSTEM:** DL_YYYYMMDD_SYSTEM_037
- **KB:** DL_YYYYMMDD_KB_004
- **WRITING:** DL_YYYYMMDD_WRITING_016
- **Other subsystems:** DL_YYYYMMDD_[SUBSYSTEM]_001

---

**This index is maintained automatically as part of the development process.**
