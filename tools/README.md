# D-X-OPUS Setup Tools

**Directory:** tools/  
**Purpose:** Automation tools for editor setup, project creation, and release management  
**Updated:** May 2026 (Sprint 4 — Package System | Hotfix v1.1.1)  
**Status:** Operational

---

## Overview

This directory contains the automation tools that enable D-X-OPUS setup and operation. These tools implement a three-tier architecture: **LEVEL 0** (release packaging, per sprint), **LEVEL 1** (editor setup, once), and **LEVEL 2** (project creation, per project).

---

## Setup Architecture

### LEVEL 0: Release Packaging (Per Sprint)

**Purpose:** Create versioned ZIP packages from the repository at sprint closure  
**Time:** ~5 minutes (automated)  
**Result:** `dx-opus-system-vX.Y.0.zip` published to GitHub releases

### LEVEL 1: Editor Setup (One Time)

**Purpose:** Install and configure D-X-OPUS in the editor's Google Drive environment  
**Time:** 5–10 minutes with package (was 45–60 min manual)  
**Result:** System ready to create projects in 2–3 minutes each

### LEVEL 2: Project Creation (Per Project)

**Purpose:** Create specific projects ready for immediate use  
**Time:** 2–3 minutes per project  
**Result:** Project with full automation and prompts loaded

---

## Tools Inventory

| Tool | Level | Version | Type | Purpose |
|---|---|---|---|---|
| **create-release-package.sh** | 0 | — | Shell script | Automated ZIP package creation + GitHub release at sprint closure |
| **TOOL_SETUP_EDITOR_ENVIRONMENT.gs** | 1 | v1.1.1 | Apps Script | Automated editor environment setup via package download |
| **TOOL_CREATE_PROJECT.gs** | 2 | v1.1.0 | Apps Script | Automated project creation in Google Drive |
| **TOOL_SETUP_PROJECT.gs** | 1→2 | legacy | Apps Script | Legacy project setup (pre-R1) |
| **TOOL_GITHUB_REPO_STRUCTURE.md** | — | — | Documentation | Repository structure specification and upload workflow |

---

## create-release-package.sh

**Automated release package creation integrated into sprint closure workflow.**

### Usage

```bash
# Validate only — no publishing (always run first)
./tools/create-release-package.sh sprint-4 --dry-run

# Create ZIP, skip GitHub release (for local testing)
./tools/create-release-package.sh sprint-4 --no-release

# Full release — create ZIP and publish to GitHub
./tools/create-release-package.sh sprint-4
```

### What It Does

1. Validates repository is clean (all changes committed)
2. Creates package directory structure (`prompts/`, `templates/`, `resources/`, `tools/`)
3. Copies all system files using source → destination mapping
4. Generates `PACKAGE_INFO.md` with sprint metadata and file inventory
5. Generates `MANIFEST.txt` with SHA256 checksums
6. Creates and verifies ZIP archive
7. Publishes GitHub release with ZIP attached

### Version Format

```
vMAJOR.SPRINT.PATCH
v1.4.0 = Sprint 4 release
v1.4.1 = Sprint 4 hotfix (bug fixes from first-run testing)
v1.5.0 = Sprint 5 release
v2.0.0 = R2 major release
```

### Requirements

- Clean git repository (all changes committed)
- `zip` installed
- GitHub CLI (`gh`) authenticated — only for full release, not for `--no-release`

### Sprint Integration

Add to sprint closure checklist:
```bash
./tools/create-release-package.sh sprint-N
```

---

## TOOL_SETUP_EDITOR_ENVIRONMENT.gs

**Google Apps Script for automated D-X-OPUS environment setup. v1.1.1**

### Installation

1. Go to [script.google.com](https://script.google.com)
2. New Project → paste `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` content
3. Run `setupEditorEnvironment()`
4. Authorize Google Drive permissions

> ⚠️ **Note:** Create as a **standalone** Apps Script project (not linked to a Spreadsheet). The script does not require Google Sheets.

### Core Functions

#### `setupEditorEnvironment()`

Main entry point. Orchestrates complete installation:

1. Detects existing installation and version
2. Creates/verifies Drive folder structure (`D-X-OPUS/prompts`, `templates`, `resources`, `tools`, `projects`)
3. Installs system components via package (primary) or individual files (fallback)
4. Writes version marker `.dx-opus-version`
5. Verifies critical files are present

#### `checkInstallationStatus()`

Safe to run anytime. Reports installed version and whether an update is available.

#### `forceReinstall()`

Replaces all system files with latest package version.

### Installation Methods

| Method | Time | Trigger |
|---|---|---|
| Package (ZIP) | 5–10 min | Default — downloads `dx-opus-system-vX.Y.0.zip` |
| Individual files | 45–60 min | Fallback if package download fails |

### Version Management

After each sprint release, update `CONFIG.LATEST_VERSION` in the script:
```javascript
LATEST_VERSION: "v1.5.0", // ← update per sprint
```

### Changelog

| Version | Date | Changes |
|---|---|---|
| v1.1.1 | 2026-05-06 | Fix: removed `SpreadsheetApp.getUi()` call — fails in standalone Apps Script projects |
| v1.1.0 | 2026-05-04 | Package installation support (ZIP from GitHub releases) |
| v1.0.0 | 2026-04-19 | Initial version (individual file fallback only) |

---

## TOOL_CREATE_PROJECT.gs

**Google Apps Script for automated project creation in Google Drive. v1.1.0**

### Core Functions

#### `createProject(projectCode, projectName, editorProfile?)`

Main function. Creates complete project structure in Drive.

**Parameters:**
- `projectCode`: Short code (e.g., `"TA"`, `"ML"`)
- `projectName`: Full name (e.g., `"Bottom Up"`, `"Machine Learning"`)
- `editorProfile` *(optional)*: EDITOR_PROFILE filename — skipped gracefully if not provided

**What It Does:**
1. Validates LEVEL 1 setup is complete (flat folder structure)
2. Creates folder structure in `D-X-OPUS/projects/`
3. Generates `PROJECT_README.md`
4. Creates `PROMPTS_PACKAGE.md` for Claude.ai project knowledge (reads from `D-X-OPUS/prompts/`)
5. Generates `PROJECT_CONFIG.md` with auto-save settings

**Example:**
```javascript
createProject("TA", "Bottom Up");
```

#### `runCreateProject()`

Convenience wrapper — runs `createProject("TA", "Bottom Up")`. Select this function in the Apps Script editor to execute.

#### Supporting Functions

| Function | Purpose |
|---|---|
| `testSetup()` | Validates LEVEL 1 setup is complete |
| `testConnection()` | Tests Google Drive API connectivity |

### Output Structure

```
[CODE]_[Project_Name]/
├── _discovery/          # Pre-workflow material
├── R_research/          # Research artifacts
├── WB_writing_book/     # Book writing artifacts
├── WP_writing_post/     # Post writing artifacts
├── A_activation/        # Activation artifacts
├── config/              # Project configuration
├── PROJECT_README.md    # Project documentation
├── PROMPTS_PACKAGE.md   # Load into Claude.ai project knowledge
└── PROJECT_CONFIG.md    # Technical configuration
```

### Changelog

| Version | Date | Changes |
|---|---|---|
| v1.1.0 | 2026-05-06 | Fix: adapted to flat folder structure (`prompts/`, `templates/`, `resources/`, `tools/`) |
| | | Fix: `validateSetup()` no longer looks for `_system/` or `_editor/` folders |
| | | Fix: `ESSENTIAL_PROMPTS` updated to match files actually installed by v1.4.0 package |
| | | Fix: `generatePromptsPackage()` reads from flat `D-X-OPUS/prompts/` folder |
| | | Fix: syntax error in `generateProjectReadme()` (unclosed string literal, line 266) |
| | | Fix: `EDITOR_PROFILE` is now optional — project creation does not fail if not present |
| | | Added: `runCreateProject()` convenience entry point |
| v1.0.0 | 2026-05-04 | Initial version |

---

## Setup Process Flow

```
New Editor
 ↓
Run TOOL_SETUP_EDITOR_ENVIRONMENT.gs → setupEditorEnvironment()
 ↓
LEVEL 1: Editor Setup Complete (5-10 min)
 ↓  D-X-OPUS/prompts/ + templates/ + resources/ + tools/ + projects/
Run TOOL_CREATE_PROJECT.gs → runCreateProject()
 ↓
LEVEL 2: Project Created (2-3 min)
 ↓  D-X-OPUS/projects/[CODE]_[Name]/ + PROMPTS_PACKAGE.md
Load PROMPTS_PACKAGE.md in Claude.ai → New Project → Ready to Work
```

### Time Investment

| Phase | Time | Frequency |
|---|---|---|
| LEVEL 1 Setup (with package) | 5–10 min | Once per editor |
| LEVEL 1 Setup (fallback) | 45–60 min | If package fails |
| LEVEL 2 Project | 2–3 min | Per project |
| Claude.ai Config | 2 min | Per project |
| **Total for First Project** | **~15 min** | One time |
| Each Additional Project | ~5 min | Unlimited |

---

## Troubleshooting

### Package Installation Issues
- **404 error:** Check `CONFIG.LATEST_VERSION` matches a published GitHub release
- **ZIP extraction fails:** File may be corrupt — re-download from GitHub releases
- **Timeout:** Apps Script has 6-min limit — run `forceReinstall()` if interrupted

### Project Creation Errors
- **"Setup incompleto: Carpeta prompts no encontrada":** Run `setupEditorEnvironment()` first — the flat `D-X-OPUS/prompts/` folder must exist
- **"Cannot call SpreadsheetApp.getUi()":** Use v1.1.1+ of `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` (fix already applied)
- **"Setup incompleto: Carpeta _system no encontrada":** Use v1.1.0+ of `TOOL_CREATE_PROJECT.gs` (fix already applied)
- **Invalid project code:** Use 2–4 alphanumeric characters only
- **Prompts missing from PROMPTS_PACKAGE:** Check that `D-X-OPUS/prompts/` contains the expected `.md` files

### Script Permissions (macOS)
```bash
chmod +x tools/create-release-package.sh
git update-index --chmod=+x tools/create-release-package.sh
```

---

## Development

### Adding New Tools
1. Create DL entry documenting purpose and rationale
2. Follow naming convention: `TOOL_[NAME].gs` or `TOOL_[NAME].sh`
3. Add to `FILE_MAPPINGS` in `create-release-package.sh` if it should be packaged
4. Update this README and `TOOL_GITHUB_REPO_STRUCTURE.md`

### Testing Checklist
- [ ] `--dry-run` passes for `create-release-package.sh`
- [ ] `checkInstallationStatus()` reports correct version
- [ ] `setupEditorEnvironment()` completes in clean Drive (standalone project)
- [ ] `createProject()` succeeds end-to-end after clean setup
- [ ] Fallback install works when package unavailable

---

**D-X-OPUS Tools — Sprint 4 Hotfix: compatibility bugs fixed from first-run E2E testing.**
