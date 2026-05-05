# D-X-OPUS Setup Tools

**Directory:** tools/  
**Purpose:** Automation tools for editor setup, project creation, and release management  
**Updated:** May 2026 (Sprint 4 — Package System)  
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

| Tool | Level | Type | Purpose |
|---|---|---|---|
| **create-release-package.sh** | 0 | Shell script | Automated ZIP package creation + GitHub release at sprint closure |
| **TOOL_SETUP_EDITOR_ENVIRONMENT.gs** | 1 | Apps Script | Automated editor environment setup via package download |
| **TOOL_CREATE_PROJECT.gs** | 2 | Apps Script | Automated project creation in Google Drive |
| **TOOL_SETUP_PROJECT.gs** | 1→2 | Apps Script | Legacy project setup (pre-R1) |
| **TOOL_GITHUB_REPO_STRUCTURE.md** | — | Documentation | Repository structure specification and upload workflow |

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

**Google Apps Script for automated D-X-OPUS environment setup. v1.1**

### Installation

1. Go to [script.google.com](https://script.google.com)
2. New Project → paste `TOOL_SETUP_EDITOR_ENVIRONMENT.gs` content
3. Run `setupEditorEnvironment()`
4. Authorize Google Drive permissions

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
LATEST_VERSION: "v1.5.0",  // ← update per sprint
```

---

## TOOL_CREATE_PROJECT.gs

**Google Apps Script for automated project creation in Google Drive.**

### Core Functions

#### `createProject(projectCode, projectName)`

Main function. Creates complete project structure in Drive.

**Parameters:**
- `projectCode`: Short code (e.g., `"TA"`, `"ML"`)
- `projectName`: Full name (e.g., `"Bottom Up"`, `"Machine Learning"`)

**What It Does:**
1. Validates LEVEL 1 setup is complete
2. Creates folder structure in Drive
3. Generates `PROJECT_README` from `TEMPLATE_PROJECT_README`
4. Creates prompts package for Claude.ai
5. Generates project configuration with auto-save settings
6. Updates `EDITOR_CONFIG` with new project tracking

**Example:**
```javascript
createProject("TA", "Bottom Up");
```

#### Supporting Functions

| Function | Purpose |
|---|---|
| `testSetup()` | Validates LEVEL 1 setup is complete |
| `testConnection()` | Tests Google Drive API connectivity |
| `getEditorStats()` | Reports editor's project statistics |

### Output Structure

```
[CODE]_[Project_Name]/
├── _discovery/           # Pre-workflow material
├── R_research/           # Research artifacts
├── WB_writing_book/      # Book writing artifacts
├── WP_writing_post/      # Post writing artifacts
├── A_activation/         # Activation artifacts
├── config/               # Project configuration
├── PROJECT_README.md     # Project documentation
└── PROJECT_CONFIG.md     # Technical configuration
```

---

## Setup Process Flow

```
New Editor
    ↓
Download dx-opus-system-vX.Y.0.zip from GitHub releases
    ↓
Run TOOL_SETUP_EDITOR_ENVIRONMENT.gs → setupEditorEnvironment()
    ↓
LEVEL 1: Editor Setup Complete (5-10 min)
    ↓
Run TOOL_CREATE_PROJECT.gs → createProject("CODE", "Name")
    ↓
LEVEL 2: Project Created (2-3 min)
    ↓
Load project in Claude.ai → Ready to Work
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
- **"Setup not complete":** Run `checkInstallationStatus()` first
- **Invalid project code:** Use 2–4 alphanumeric characters only
- **Template errors:** Verify `_system/templates/` files are installed

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
- [ ] `setupEditorEnvironment()` completes in clean Drive
- [ ] `createProject()` succeeds end-to-end
- [ ] Fallback install works when package unavailable

---

**D-X-OPUS Tools — Sprint 4: Package system operational. Setup time 45-60 min → 5-10 min.**
