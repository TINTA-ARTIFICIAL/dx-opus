# docs/editor-manuals/

**Directory:** `docs/editor-manuals/`  
**Purpose:** Guides and manuals for editors who use D-X-OPUS to write  
**Owner:** docs-dev chat  
**Updated:** May 2026 (R1 — first manual)  
**Audience:** Editors (writers using the system)

---

## Overview

This directory contains practical guides for editors who use D-X-OPUS. Documents in this directory answer the question: *how do I use this system to write?*

These are **push documents** — produced actively by the DOCS subsystem, not derived from technical decisions. They are written in plain language, avoiding system jargon, and follow the BRAND_DOC_SYSTEM visual identity.

---

## Documents

| Document | Version | Format | Description |
|---|---|---|---|
| **SETUP_GUIDE.html** | **v1.1** | HTML | Step-by-step installation guide for new editors. Covers Fase 1 (system install), Fase 2 (project creation) and Fase 3 (Claude.ai configuration). ~15 minutes total. |

---

## Document Standards

All documents in this directory must:

- Follow **BRAND_DOC_SYSTEM v1.0** visual identity (`docs/BRAND_DOC_SYSTEM_v1_0.html`)
- Use **plain editorial language** — no system jargon, no prompt names, no technical IDs
- Include a **cover** with version, date and audience metadata
- Be **self-contained** — a reader should be able to follow the guide without needing other documents
- Reflect the **current installed version** of the system

---

## Planned Documents (Sprint 5+)

| Document | Description | Priority |
|---|---|---|
| WORKFLOW_GUIDE_POST.html | How to write a post using the D-X-OPUS workflow | Sprint 5 |
| WORKFLOW_GUIDE_RESEARCH.html | How to run a research workflow | Sprint 5 |
| EDITOR_PROFILE_GUIDE.html | How to create and use an editor profile | Sprint 5 |
| QUICK_REFERENCE.html | One-page cheat sheet of all available prompts | Sprint 6 |

---

## Maintenance

Update `SETUP_GUIDE.html` whenever:
- A new system version is released (update version number and package URL)
- The installation process changes
- New troubleshooting cases are identified in E2E testing

---

*Editor Manuals — D-X-OPUS R1 · docs-dev subsystem*
