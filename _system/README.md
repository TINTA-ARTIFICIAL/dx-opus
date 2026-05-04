# D-X-OPUS System Core

**Subsystem:** SYSTEM  
**Updated:** May 2026 (R1 Complete Implementation)  
**Status:** Operational

---

## Overview

This directory contains the core system components of D-X-OPUS: architectural schemas, decision logs, system prompts, templates, and central configuration.

---

## Directory Structure

```
_system/
├── README.md                           # This file
├── SCHEMA_SYSTEM_ARCHITECTURE.md       # Complete system architecture
├── SCHEMA_DECISION_LOG.md              # Format for decision logging
├── MASTER_PLAN.md                      # Overall system roadmap
├── decisions/                          # All architectural decisions
│   ├── README.md                       # Decision log index
│   └── DL_YYYYMMDD_SUBSYSTEM_NNN.md    # Individual decisions
├── prompts/                            # System-level prompts
├── templates/                          # Standard templates (R1)
├── resources/                          # System configuration (R1)
└── tools/                              # Development utilities
```

---

## System Prompts

**Core system prompts that don't belong to specific workflows:**

| Prompt | Purpose | Version | Status |
|--------|---------|---------|--------|
| **PROMPT_PROJECT_DISCOVERY.md** | First session guidance and workflow selection | 1.0 | ✅ Active |

### Usage
- `PROMPT_PROJECT_DISCOVERY`: Automatically invoked when PROJECT_NOTES doesn't exist
- Determines appropriate workflow based on editor's material and objectives
- Produces PROJECT_NOTES for subsequent session guidance

---

## Templates (R1 Implementation)

**Standardized templates for auto-generation of project artifacts:**

| Template | Purpose | Used By | Status |
|----------|---------|---------|--------|
| **TEMPLATE_EDITOR_CONFIG.md** | Editor personal configuration | Setup process | ✅ Active |
| **TEMPLATE_PROJECT_README.md** | Project status documentation | TOOL_CREATE_PROJECT | ✅ Active |
| **TEMPLATE_PROJECT_INSTRUCTIONS.md** | Claude.ai project instructions | TOOL_CREATE_PROJECT | ✅ Active |

### Usage
- Templates enable standardized, multi-editor setup automation
- Variables automatically substituted during project creation
- Maintain consistency across all projects and editors

---

## System Resources (R1 Implementation)

**Central configuration and system-wide settings:**

| Resource | Purpose | Scope | Status |
|----------|---------|-------|--------|
| **AUTO_SAVE_CONFIG.yaml** | Universal auto-save configuration | All workflows | ✅ Active |
| **ARQUITECTURA_AUTO_SAVE_GENERICA.md** | Auto-save technical specification | Development | ✅ Active |

### Configuration Details

#### AUTO_SAVE_CONFIG.yaml
- Defines all artifact types across all workflows
- Standardized naming patterns: `{PROJECT_CODE}_{WORKFLOW}_{TYPE}_{identifier}_v{version}.md`
- Metadata levels: standard (basic) vs extended (detailed)
- Error handling and fallback procedures

#### ARQUITECTURA_AUTO_SAVE_GENERICA.md
- Complete technical specification for auto-save system
- Integration patterns for prompts
- Function definitions and usage examples
- Troubleshooting and maintenance guidelines

---

## Architectural Schemas

**Core system design documentation:**

| Schema | Purpose | Audience | Last Updated |
|--------|---------|----------|--------------|
| **SCHEMA_SYSTEM_ARCHITECTURE.md** | Complete system architecture | Developers | Ongoing |
| **SCHEMA_DECISION_LOG.md** | Decision documentation format | All subsystems | v2.2 |
| **MASTER_PLAN.md** | Development roadmap | Architects | Ongoing |

### Key Changes in R1
- **Two-tier architecture:** Editor setup (LEVEL 1) vs Project setup (LEVEL 2)
- **Universal auto-save:** All workflows integrated
- **Multi-editor support:** Standardized templates and configuration
- **Automated first session:** PROJECT_DISCOVERY handles material classification

---

## Decision Logs

**All architectural and functional decisions documented:**

### Recent R1 Implementation Decisions
| DL ID | Decision | Status |
|-------|----------|--------|
| DL_20260504_SYSTEM_028 | Auto-save genérico universal | INTEGRATED |
| DL_20260504_SYSTEM_029 | TOOL_CREATE_PROJECT renaming | INTEGRATED |
| DL_20260504_SYSTEM_030 | TEMPLATE_EDITOR_CONFIG formal | INTEGRATED |
| DL_20260504_SYSTEM_031 | Templates PROJECT estandarizados | INTEGRATED |
| DL_20260504_SYSTEM_032 | PROMPT_PROJECT_DISCOVERY añadido | INTEGRATED |

### Process
- All decisions follow `SCHEMA_DECISION_LOG.md` format
- Sequential numbering per subsystem
- Status tracking: OPEN → INTEGRATED → SUPERSEDED
- Complete rationale and impact analysis documented

---

## Development Guidelines

### Adding System Components

**New Prompts:**
1. Must serve system-wide function (not workflow-specific)
2. Follow standard prompt format with YAML headers
3. Create corresponding DL entry if architectural impact
4. Update this README with new entry

**New Templates:**
1. Add to `_system/templates/`
2. Document variable substitution patterns
3. Update `AUTO_SAVE_CONFIG.yaml` if new artifact types
4. Test auto-generation functionality

**New Resources:**
1. Add to `_system/resources/`
2. Update dependent systems (typically all workflows)
3. Document configuration format and usage
4. Create migration path if replacing existing resource

### Modification Guidelines

**Before modifying system components:**
1. Check impact on all workflows
2. Create DL entry documenting change rationale
3. Update version in YAML header
4. Test with multiple workflows
5. Update this README if inventory changes

### Naming Conventions

**Files:** No version in filename (Git manages history)
- ✅ `TEMPLATE_EDITOR_CONFIG.md`
- ❌ `TEMPLATE_EDITOR_CONFIG_v1.0.md`

**Versions:** Documented in YAML header only
```yaml
version: 1.0
```

---

## Integration Points

### With Workflows
- **Research:** Uses auto-save configuration for all research artifacts
- **Writing:** Uses auto-save + PROJECT_DISCOVERY for session management  
- **Activation:** Uses templates for project setup
- **Evaluation:** Uses auto-save for evaluation results

### With Tools
- **TOOL_CREATE_PROJECT:** Uses all templates for auto-generation
- **Setup Process:** Uses TEMPLATE_EDITOR_CONFIG for personal configuration
- **Session Openers:** Use PROJECT_DISCOVERY for first session guidance

---

## Maintenance

### Regular Tasks
- **Decision Log:** Review and update status of decisions
- **Auto-save Config:** Add new artifact types as workflows evolve
- **Templates:** Update variable patterns as project structure evolves
- **Architecture Schema:** Keep current with system evolution

### Monitoring
- **Template Usage:** Track auto-generation success rates
- **Auto-save Performance:** Monitor artifact save success
- **Decision Integration:** Verify decisions marked as INTEGRATED are actually implemented

### Troubleshooting
- **Auto-save Issues:** Check `AUTO_SAVE_CONFIG.yaml` configuration
- **Template Errors:** Verify variable substitution patterns
- **Project Creation:** Validate `TOOL_CREATE_PROJECT` has access to all templates

---

## R1 Implementation Status

### ✅ Completed (May 2026)
- Universal auto-save architecture
- Standardized template system  
- Multi-editor support infrastructure
- Automated first session (PROJECT_DISCOVERY)
- Complete setup automation

### 🔧 Maintenance Items
- Monitor auto-save performance across workflows
- Gather usage analytics from multiple editors
- Optimize template generation performance
- Expand troubleshooting documentation based on real usage

---

**For detailed technical documentation of any component, see the individual files in their respective subdirectories.**
