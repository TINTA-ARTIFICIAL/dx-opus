#!/bin/bash
#
# create-release-package.sh
# D-X-OPUS Release Package Creation Script v1.1
#
# Usage:   ./create-release-package.sh sprint-4
#          ./create-release-package.sh sprint-4 --dry-run     (validate only, no publish)
#          ./create-release-package.sh sprint-4 --no-release  (create zip, skip GitHub)
#
# Output:  dx-opus-system-v1.X.0.zip + GitHub release
#
# Requirements:
#   - Clean git repository (all changes committed)
#   - GitHub CLI installed and authenticated
#   - Standard Unix tools: zip, sha256sum, find, grep

set -euo pipefail   # Exit on error, undefined vars, pipe failures
IFS=$'\n\t'

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

REPO_NAME="dx-opus"
REPO_OWNER="TINTA-ARTIFICIAL"
BASE_URL="https://github.com/${REPO_OWNER}/${REPO_NAME}"

# Package source → destination mapping
# Format: "source_dir:file_pattern:destination"
declare -a FILE_MAPPINGS=(
    "research:PROMPT_*.md:prompts"
    "writing/book:PROMPT_*.md:prompts"
    "writing/shared:PROMPT_*.md:prompts"
    "evaluation:PROMPT_*.md:prompts"
    "activation:PROMPT_*.md:prompts"
    "_system:PROMPT_*.md:prompts"
    "_system/templates:TEMPLATE_*.md:templates"
    "_system/resources:*.yaml:resources"
    "_system/resources:*.yml:resources"
    "_system/resources:*.json:resources"
    "knowledge-base:RESOURCE_*.md:resources"
    "tools:TOOL_*.gs:tools"
)

# Flags
DRY_RUN=false
SKIP_RELEASE=false

# ═══════════════════════════════════════════════════════════════
# LOGGING UTILITIES
# ═══════════════════════════════════════════════════════════════

log()     { echo "$(date '+%H:%M:%S') ℹ️  $1"; }
success() { echo "$(date '+%H:%M:%S') ✅ $1"; }
warn()    { echo "$(date '+%H:%M:%S') ⚠️  $1" >&2; }
error()   { echo "$(date '+%H:%M:%S') ❌ ERROR: $1" >&2; exit 1; }
header()  { echo ""; echo "═══════════════════════════════════════════"; echo "  $1"; echo "═══════════════════════════════════════════"; }

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

if [ $# -lt 1 ]; then
    error "Usage: $0 <sprint-identifier> [--dry-run] [--no-release]\n  Example: $0 sprint-4"
fi

SPRINT_ID="$1"
shift

while [[ $# -gt 0 ]]; do
    case "$1" in
        --dry-run)     DRY_RUN=true ;;
        --no-release)  SKIP_RELEASE=true ;;
        *) error "Unknown option: $1" ;;
    esac
    shift
done

# ═══════════════════════════════════════════════════════════════
# VERSION CALCULATION
# ═══════════════════════════════════════════════════════════════

DATE=$(date +%Y%m%d)
TIMESTAMP=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

SPRINT_NUM=$(echo "$SPRINT_ID" | grep -oE '[0-9]+' | head -1)
[ -z "$SPRINT_NUM" ] && error "Cannot extract sprint number from '${SPRINT_ID}'. Use format: sprint-4"

VERSION="v1.${SPRINT_NUM}.0"
PACKAGE_NAME="dx-opus-system-${VERSION}"
ZIP_FILE="${PACKAGE_NAME}.zip"

header "D-X-OPUS PACKAGE CREATION"
log "Sprint:   ${SPRINT_ID}"
log "Version:  ${VERSION}"
log "Package:  ${PACKAGE_NAME}"
log "Dry run:  ${DRY_RUN}"
echo ""

# ═══════════════════════════════════════════════════════════════
# PRE-FLIGHT VALIDATION
# ═══════════════════════════════════════════════════════════════

header "PRE-FLIGHT CHECKS"

# Must run from repo root
[ ! -d ".git" ] && error "Must run from repository root directory (no .git found)"
success "Repository root confirmed"

# Clean working tree
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    error "Repository has uncommitted changes.\n       Commit or stash all changes before creating package.\n       Run: git status"
fi
success "Repository is clean (all changes committed)"

# Capture commit info
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_FULL=$(git rev-parse HEAD)
COMMIT_MSG=$(git log -1 --pretty=format:"%s")
BRANCH=$(git rev-parse --abbrev-ref HEAD)
success "Commit: ${COMMIT_HASH} (${BRANCH}) — ${COMMIT_MSG}"

# Check zip available
command -v zip &>/dev/null || error "zip not found. Install with: apt-get install zip"
success "zip available"

# Check sha256sum available
SHASUM_CMD=""
if   command -v sha256sum &>/dev/null; then SHASUM_CMD="sha256sum"
elif command -v shasum     &>/dev/null; then SHASUM_CMD="shasum -a 256"
else warn "sha256sum not found — checksums will be skipped"
fi
[ -n "$SHASUM_CMD" ] && success "Checksum tool: ${SHASUM_CMD}"

# Check GitHub CLI only if not skipping release
if [ "$SKIP_RELEASE" = false ] && [ "$DRY_RUN" = false ]; then
    command -v gh &>/dev/null || error "GitHub CLI (gh) not found.\n       Install: https://cli.github.com/\n       Or use --no-release to skip GitHub step"
    gh auth status &>/dev/null || error "GitHub CLI not authenticated.\n       Run: gh auth login"
    success "GitHub CLI authenticated"
fi

# ═══════════════════════════════════════════════════════════════
# PACKAGE DIRECTORY SETUP
# ═══════════════════════════════════════════════════════════════

header "BUILDING PACKAGE STRUCTURE"

# Clean previous artifacts
rm -rf "${PACKAGE_NAME}" "${ZIP_FILE}" 2>/dev/null || true

# Create directory structure
mkdir -p "${PACKAGE_NAME}"/{prompts,templates,resources,tools}
success "Package directory structure created"

# ═══════════════════════════════════════════════════════════════
# FILE COPYING — Using mapping table
# ═══════════════════════════════════════════════════════════════

COUNT_PROMPTS=0
COUNT_TEMPLATES=0
COUNT_RESOURCES=0
COUNT_TOOLS=0

for mapping in "${FILE_MAPPINGS[@]}"; do
    IFS=':' read -r src_dir pattern dest <<< "$mapping"
    
    if [ ! -d "$src_dir" ]; then
        warn "Source dir not found: ${src_dir} (skipping)"
        continue
    fi

    while IFS= read -r -d '' file; do
        dest_file="${PACKAGE_NAME}/${dest}/$(basename "$file")"
        
        # Detect duplicates — keep the first encountered
        if [ -f "$dest_file" ]; then
            warn "Duplicate: $(basename "$file") already in ${dest}/ — keeping first copy"
            continue
        fi

        cp "$file" "$dest_file"
        case "$dest" in
            prompts)   COUNT_PROMPTS=$((COUNT_PROMPTS + 1)) ;;
            templates) COUNT_TEMPLATES=$((COUNT_TEMPLATES + 1)) ;;
            resources) COUNT_RESOURCES=$((COUNT_RESOURCES + 1)) ;;
            tools)     COUNT_TOOLS=$((COUNT_TOOLS + 1)) ;;
        esac
    done < <(find "$src_dir" -maxdepth 1 -name "$pattern" -print0 2>/dev/null)
done

TOTAL_FILES=$((COUNT_PROMPTS + COUNT_TEMPLATES + COUNT_RESOURCES + COUNT_TOOLS))
success "$(printf '%-10s' "prompts/"):   ${COUNT_PROMPTS} files"
success "$(printf '%-10s' "templates/"): ${COUNT_TEMPLATES} files"
success "$(printf '%-10s' "resources/"): ${COUNT_RESOURCES} files"
success "$(printf '%-10s' "tools/"):     ${COUNT_TOOLS} files"
echo ""
log "Total files collected: ${TOTAL_FILES}"

# Warn if unexpectedly low counts
[ "${COUNT_PROMPTS}" -lt 5 ]   && warn "Prompts count seems low (${COUNT_PROMPTS}). Check repository structure."
[ "${COUNT_TEMPLATES}" -lt 1 ] && warn "No templates found. Check _system/templates/"

# ═══════════════════════════════════════════════════════════════
# GENERATE PACKAGE_INFO.md
# ═══════════════════════════════════════════════════════════════

header "GENERATING METADATA"

# Collect recent git log (last 10 commits, filtered for meaningful entries)
RECENT_CHANGES=$(git log --oneline -10 --no-merges 2>/dev/null \
    | sed 's/^[a-f0-9]* //' \
    | sed 's/^/- /' \
    || echo "- Sprint work completed")

# Build prompts list
PROMPT_LIST=$(find "${PACKAGE_NAME}/prompts"    -name "*.md"  -exec basename {} \; | sort | sed 's/^/- /' 2>/dev/null || echo "- (none)")
TMPL_LIST=$(find   "${PACKAGE_NAME}/templates"  -name "*.md"  -exec basename {} \; | sort | sed 's/^/- /' 2>/dev/null || echo "- (none)")
RES_LIST=$(find    "${PACKAGE_NAME}/resources"  -type f       -exec basename {} \; | sort | sed 's/^/- /' 2>/dev/null || echo "- (none)")
TOOL_LIST=$(find   "${PACKAGE_NAME}/tools"      -name "*.gs"  -exec basename {} \; | sort | sed 's/^/- /' 2>/dev/null || echo "- (none)")

# Capitalize sprint ID for display  
SPRINT_DISPLAY=$(echo "$SPRINT_ID" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

cat > "${PACKAGE_NAME}/PACKAGE_INFO.md" << EOF
---
package:     ${PACKAGE_NAME}
version:     ${VERSION}
sprint:      ${SPRINT_ID}
created:     ${DATE}
commit:      ${COMMIT_FULL}
commit_short: ${COMMIT_HASH}
branch:      ${BRANCH}
total_files: ${TOTAL_FILES}
---

# D-X-OPUS System Package ${VERSION}

**Sprint:** ${SPRINT_DISPLAY}  
**Created:** ${DATE}  
**Repository Commit:** [\`${COMMIT_HASH}\`](${BASE_URL}/commit/${COMMIT_FULL})  
**Compatibility:** TOOL_SETUP_EDITOR_ENVIRONMENT v1.1+  
**Download:** [${ZIP_FILE}](${BASE_URL}/releases/tag/${VERSION})

---

## What's New in This Release

### Recent Changes:
${RECENT_CHANGES}

---

## Installation Instructions

### Option A — Automated (Recommended)
1. Download this package: \`${ZIP_FILE}\`
2. Open Google Apps Script with \`TOOL_SETUP_EDITOR_ENVIRONMENT.gs\` v1.1+
3. Run \`setupEditorEnvironment()\` — package is auto-detected and installed
4. **Total setup time: 5–10 minutes**

### Option B — Manual Fallback
1. Download individual files from: ${BASE_URL}
2. Follow \`SETUP_INICIAL_D_X_OPUS.md\` instructions
3. **Total setup time: 45–60 minutes**

---

## System Requirements

| Requirement | Details |
|---|---|
| Google Drive | File creation permissions required |
| Google Apps Script | Execution permissions required |
| Claude.ai | Pro account for project usage |
| Network | Required for initial package download |

---

## File Inventory

| Category | Count | Description |
|---|---|---|
| **Prompts** | ${COUNT_PROMPTS} | All D-X-OPUS workflow prompts |
| **Templates** | ${COUNT_TEMPLATES} | Project generation templates |
| **Resources** | ${COUNT_RESOURCES} | Configuration + knowledge base |
| **Tools** | ${COUNT_TOOLS} | Google Apps Script automation |
| **Total** | **${TOTAL_FILES}** | |

### Prompts Included:
${PROMPT_LIST}

### Templates Included:
${TMPL_LIST}

### Resources Included:
${RES_LIST}

### Tools Included:
${TOOL_LIST}

---

## Package Structure

\`\`\`
${PACKAGE_NAME}/
├── prompts/           # ${COUNT_PROMPTS} workflow prompts
├── templates/         # ${COUNT_TEMPLATES} project templates
├── resources/         # ${COUNT_RESOURCES} config + knowledge base files
├── tools/             # ${COUNT_TOOLS} automation scripts
├── PACKAGE_INFO.md    # This file
└── MANIFEST.txt       # Complete file listing with checksums
\`\`\`

---

## Upgrade Instructions

To upgrade from a previous package version:
1. Download this package (\`${ZIP_FILE}\`)
2. Run \`TOOL_SETUP_EDITOR_ENVIRONMENT.gs\` — upgrade is auto-detected
3. Existing projects remain fully compatible
4. New features available immediately for new projects

---

## Support

- **Setup issues:** See \`SETUP_INICIAL_D_X_OPUS.md\`
- **Bug reports:** [Create issue](${BASE_URL}/issues)
- **Feature requests:** [Discussions](${BASE_URL}/discussions)

---

*D-X-OPUS ${VERSION} — AI-assisted non-fiction writing system*  
*Repository: ${BASE_URL}*
EOF

success "PACKAGE_INFO.md generated"

# ═══════════════════════════════════════════════════════════════
# GENERATE MANIFEST.txt WITH CHECKSUMS
# ═══════════════════════════════════════════════════════════════

cat > "${PACKAGE_NAME}/MANIFEST.txt" << EOF
D-X-OPUS System Package ${VERSION}
Created:    ${TIMESTAMP}
Repository: ${BASE_URL}
Commit:     ${COMMIT_FULL}
Branch:     ${BRANCH}
Sprint:     ${SPRINT_ID}
Total:      ${TOTAL_FILES} files

═══════════════════════════════════════
PACKAGE CONTENTS
═══════════════════════════════════════

prompts/ (${COUNT_PROMPTS} files):
$(find "${PACKAGE_NAME}/prompts"   -name "*.md" -exec basename {} \; | sort | sed 's/^/  /')

templates/ (${COUNT_TEMPLATES} files):
$(find "${PACKAGE_NAME}/templates" -name "*.md" -exec basename {} \; | sort | sed 's/^/  /')

resources/ (${COUNT_RESOURCES} files):
$(find "${PACKAGE_NAME}/resources" -type f      -exec basename {} \; | sort | sed 's/^/  /')

tools/ (${COUNT_TOOLS} files):
$(find "${PACKAGE_NAME}/tools"     -name "*.gs" -exec basename {} \; | sort | sed 's/^/  /')

EOF

# Append checksums if tool available
if [ -n "$SHASUM_CMD" ]; then
    echo "═══════════════════════════════════════" >> "${PACKAGE_NAME}/MANIFEST.txt"
    echo "SHA256 CHECKSUMS" >> "${PACKAGE_NAME}/MANIFEST.txt"
    echo "═══════════════════════════════════════" >> "${PACKAGE_NAME}/MANIFEST.txt"
    
    find "${PACKAGE_NAME}" -type f \
        ! -name "MANIFEST.txt" \
        -exec $SHASUM_CMD {} \; 2>/dev/null \
        | sed "s|${PACKAGE_NAME}/||" \
        | sort >> "${PACKAGE_NAME}/MANIFEST.txt"
    
    success "MANIFEST.txt generated (with SHA256 checksums)"
else
    success "MANIFEST.txt generated (no checksums — sha256sum not available)"
fi

# ═══════════════════════════════════════════════════════════════
# CREATE ZIP ARCHIVE
# ═══════════════════════════════════════════════════════════════

header "CREATING ZIP ARCHIVE"

if [ "$DRY_RUN" = true ]; then
    log "DRY RUN — Skipping zip creation"
    log "Would create: ${ZIP_FILE}"
else
    zip -r "${ZIP_FILE}" "${PACKAGE_NAME}/" > /dev/null
    ZIP_SIZE=$(du -sh "${ZIP_FILE}" | cut -f1)
    ZIP_SIZE_BYTES=$(wc -c < "${ZIP_FILE}")
    success "ZIP created: ${ZIP_FILE} (${ZIP_SIZE})"
    
    # Verify ZIP integrity
    if zip -T "${ZIP_FILE}" > /dev/null 2>&1; then
        success "ZIP integrity verified"
    else
        error "ZIP file failed integrity check"
    fi
fi

# ═══════════════════════════════════════════════════════════════
# GITHUB RELEASE
# ═══════════════════════════════════════════════════════════════

header "PUBLISHING GITHUB RELEASE"

if [ "$DRY_RUN" = true ] || [ "$SKIP_RELEASE" = true ]; then
    log "Skipping GitHub release (dry-run=${DRY_RUN}, skip-release=${SKIP_RELEASE})"
else
    RELEASE_NOTES="## D-X-OPUS System Package ${VERSION}

Complete automated installation package for **${SPRINT_DISPLAY}** closure.

### Included Components
| Category | Count |
|---|---|
| Prompts | ${COUNT_PROMPTS} |
| Templates | ${COUNT_TEMPLATES} |
| Resources | ${COUNT_RESOURCES} |
| Tools | ${COUNT_TOOLS} |
| **Total** | **${TOTAL_FILES}** |

### Installation
Use with \`TOOL_SETUP_EDITOR_ENVIRONMENT.gs\` v1.1+ for automated 5–10 minute setup.

### Commit
\`${COMMIT_HASH}\` — ${COMMIT_MSG}

---
See \`PACKAGE_INFO.md\` inside download for complete details and upgrade instructions."

    if gh release create "${VERSION}" "${ZIP_FILE}" \
        --title "D-X-OPUS ${VERSION} — ${SPRINT_DISPLAY} Package" \
        --notes "${RELEASE_NOTES}" \
        --repo "${REPO_OWNER}/${REPO_NAME}"; then
        success "GitHub release published: ${BASE_URL}/releases/tag/${VERSION}"
    else
        error "GitHub release creation failed. Check gh auth status and repository permissions."
    fi
fi

# ═══════════════════════════════════════════════════════════════
# CLEANUP
# ═══════════════════════════════════════════════════════════════

rm -rf "${PACKAGE_NAME}"
success "Temporary package directory cleaned up"

# ═══════════════════════════════════════════════════════════════
# FINAL SUMMARY
# ═══════════════════════════════════════════════════════════════

header "PACKAGE CREATION COMPLETE"

echo ""
echo "  📦 Package:   ${ZIP_FILE}"
echo "  🏷️  Version:   ${VERSION}"
echo "  📍 Commit:    ${COMMIT_HASH} (${BRANCH})"
if [ "$DRY_RUN" = false ] && [ -f "${ZIP_FILE}" ]; then
echo "  💾 Size:      ${ZIP_SIZE}"
fi
echo "  📊 Files:     ${TOTAL_FILES} total"
echo "               ${COUNT_PROMPTS} prompts | ${COUNT_TEMPLATES} templates | ${COUNT_RESOURCES} resources | ${COUNT_TOOLS} tools"
if [ "$DRY_RUN" = false ] && [ "$SKIP_RELEASE" = false ]; then
echo "  🔗 Release:   ${BASE_URL}/releases/tag/${VERSION}"
fi
echo ""
echo "  📋 NEXT STEPS:"
echo "     1. Test package installation in clean environment"
echo "     2. Verify TOOL_SETUP_EDITOR_ENVIRONMENT.gs detects new package"
echo "     3. Update MASTER_PLAN.md with version ${VERSION}"
echo "     4. Create DL entry documenting sprint closure"
echo "     5. Announce ${VERSION} availability"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "  ⚠️  DRY RUN COMPLETE — No files were published"
    echo ""
fi

exit 0
