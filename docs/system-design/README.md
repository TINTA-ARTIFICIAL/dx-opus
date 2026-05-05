# System Design Docs

**Directory:** `docs/system-design/`  
**Purpose:** Architectural documentation — decisions, rationale, system evolution  
**Audience:** System architects and decision-makers  
**Updated:** May 2026 (Sprint 4)

---

## What Goes Here

System design docs answer: **"Why is the system designed this way?"**

- Architectural decisions with rationale
- Interfaces between subsystems
- Evolution history of the design
- Technical specifications for major components

They are distinct from subsystem docs (which explain *how* a subsystem works) and editor manuals (which explain *how to use* the system).

---

## Document Inventory

| Document | Version | Type | Description |
|---|---|---|---|
| **RELEASE_NOTES_R1.md** | v1.0 | RELEASE_NOTES | Complete R1 release documentation — what was built, decisions made, state at closure |
| **PACKAGE_SYSTEM_IMPLEMENTATION_SUMMARY.md** | v1.0 | GUIDE | Package system implementation — architecture, fixes applied, sprint integration guide |

---

## RELEASE_NOTES_R1.md

Complete documentation of the R1 release (April 2026).

**Covers:**
- All subsystems delivered in R1
- Key architectural decisions made
- Known gaps and Sprint 4 backlog
- System state at R1 closure

---

## PACKAGE_SYSTEM_IMPLEMENTATION_SUMMARY.md

Implementation guide for the automated release package system (Sprint 4).

**Covers:**
- What was built: `create-release-package.sh` + `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` v1.1
- Architecture: package-first install with individual file fallback
- 5 bugs found and fixed during implementation
- Sprint 4 closure sequence (step-by-step)
- Sprint 5+ integration (zero-overhead process)
- Versioning reference table

**Key outcome:** Setup time reduced from 45–60 min to 5–10 min.

---

## Naming Convention

Files in this directory follow the general system naming standard:

```
[TYPE]_[DESCRIPTIVE_NAME].md

Examples:
RELEASE_NOTES_R1.md
PACKAGE_SYSTEM_IMPLEMENTATION_SUMMARY.md
ARCHITECTURE_DECISION_[TOPIC].md
```

No version in filename — version lives in YAML header and git history.

---

## Adding New Documents

Create a system design doc when:
- A major architectural decision is made that affects multiple subsystems
- A new component is designed and needs specification
- A release milestone is reached and needs documentation
- A significant refactor changes how the system works

**Before adding:** Create a DL entry documenting the decision. The system design doc expands on that entry.

---

*System design docs are the long-term memory of architectural decisions. Keep them accurate and up to date.*
