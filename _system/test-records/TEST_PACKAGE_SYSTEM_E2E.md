---
id:          TEST_PACKAGE_SYSTEM_E2E
type:        TEST_DOCUMENTATION
subsystem:   SYSTEM
version:     1.0
status:      TEMPLATE
created:     2026-05-05
sprint:      sprint-4
---

# TEST DOCUMENTATION: D-X-OPUS Package System — End-to-End

**Purpose:** Validation protocol for package creation, installation, and integration  
**Scope:** Sprint 4 release — Package v1.4.0  
**Run before:** Every GitHub release publication

---

## TEST ENVIRONMENT SETUP

### Prerequisites Checklist
Before running any tests, verify:

- [ ] Local repository: `git status` shows clean working tree
- [ ] GitHub CLI: `gh auth status` returns authenticated
- [ ] `zip` installed: `zip --version`
- [ ] `sha256sum` or `shasum` available
- [ ] Google Drive account accessible (test account preferred — not production)
- [ ] Google Apps Script project created and ready

### Test Environment Naming Convention
```
Test runs:  TEST-[YYYYMMDD]-[T1..T4]
Pass:       ✅ PASS
Fail:       ❌ FAIL [reason]
Skip:       ⏭️  SKIP [reason]
```

---

## TEST SUITE 1: PACKAGE CREATION

### TC-1.1 — Dry Run Validation
**Purpose:** Verify script runs without errors before publishing  
**Command:**
```bash
chmod +x create-release-package.sh
./create-release-package.sh sprint-4 --dry-run
```

**Expected output:**
```
✅ Repository root confirmed
✅ Repository is clean (all changes committed)
✅ Commit: [hash] (main) — [commit message]
✅ zip available
✅ Package directory structure created
✅ prompts/  : [N] files
✅ templates/: [N] files
✅ resources/: [N] files
✅ tools/    : [N] files
✅ PACKAGE_INFO.md generated
✅ MANIFEST.txt generated (with SHA256 checksums)
   DRY RUN — No files were published
```

**Validation criteria:**
- [ ] Exit code: `0`
- [ ] No ERROR lines in output
- [ ] All four folder counts ≥ expected minimums (prompts≥5, templates≥1)
- [ ] PACKAGE_INFO.md generated (inspect contents)
- [ ] MANIFEST.txt generated (inspect SHA256 section)
- [ ] No ZIP file created (dry-run should skip)

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

### TC-1.2 — File Count Validation
**Purpose:** Confirm all repository files are detected and mapped correctly  
**Command:**
```bash
./create-release-package.sh sprint-4 --dry-run 2>&1 | grep -E "prompts|templates|resources|tools"
```

**Expected minimums (update per sprint):**

| Category | Minimum | Sprint 4 Target |
|---|---|---|
| prompts | 5 | 52 |
| templates | 1 | 8 |
| resources | 1 | 5 |
| tools | 1 | 2 |

**Validation criteria:**
- [ ] Prompts count matches repo: `find . -name "PROMPT_*.md" | wc -l`
- [ ] Templates count matches: `find _system/templates -name "TEMPLATE_*.md" | wc -l`
- [ ] No duplicate file warnings (check output for "Duplicate:")
- [ ] No "Source dir not found" warnings for expected directories

**Result:** `[ ] PASS  [ ] FAIL`  
**Actual counts:** prompts=___ templates=___ resources=___ tools=___  
**Notes:** _______________________________________________

---

### TC-1.3 — Full Package Creation (No GitHub)
**Purpose:** Create ZIP without publishing to GitHub  
**Command:**
```bash
./create-release-package.sh sprint-4 --no-release
```

**Validation criteria:**
- [ ] Exit code: `0`
- [ ] ZIP file created: `ls -la dx-opus-system-v1.4.0.zip`
- [ ] ZIP integrity: `zip -T dx-opus-system-v1.4.0.zip`
- [ ] ZIP contents correct: `unzip -l dx-opus-system-v1.4.0.zip | head -30`
- [ ] PACKAGE_INFO.md inside ZIP is readable and complete
- [ ] MANIFEST.txt inside ZIP contains SHA256 checksums
- [ ] All four subdirectories present in ZIP

```bash
# Quick validation commands:
zip -T dx-opus-system-v1.4.0.zip && echo "ZIP OK"
unzip -l dx-opus-system-v1.4.0.zip | grep -c "\.md" 
unzip -p dx-opus-system-v1.4.0.zip dx-opus-system-v1.4.0/PACKAGE_INFO.md | head -20
```

**Result:** `[ ] PASS  [ ] FAIL`  
**ZIP size:** _______  **File count:** _______  
**Notes:** _______________________________________________

---

### TC-1.4 — PACKAGE_INFO.md Content Validation
**Purpose:** Verify metadata document is correctly generated

**Extract and inspect:**
```bash
unzip -p dx-opus-system-v1.4.0.zip dx-opus-system-v1.4.0/PACKAGE_INFO.md
```

**Validation criteria:**
- [ ] Version header: `# D-X-OPUS System Package v1.4.0`
- [ ] Correct commit hash (matches `git rev-parse --short HEAD`)
- [ ] Correct date (today's date)
- [ ] File inventory table has correct counts
- [ ] Prompts list is populated
- [ ] Download URL points to correct GitHub releases URL
- [ ] Installation instructions are present

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

### TC-1.5 — Full Release Publication
**Purpose:** Full end-to-end package creation with GitHub release  
**⚠️ Run only when ready for official release**  
**Command:**
```bash
./create-release-package.sh sprint-4
```

**Validation criteria:**
- [ ] Exit code: `0`
- [ ] GitHub release created: `gh release view v1.4.0`
- [ ] ZIP attached to release
- [ ] Release title: "D-X-OPUS v1.4.0 — Sprint 4 Package"
- [ ] Release notes contain file counts
- [ ] Public download URL works:
  ```bash
  curl -LI "https://github.com/TINTA-ARTIFICIAL/dx-opus/releases/download/v1.4.0/dx-opus-system-v1.4.0.zip"
  # Expected: HTTP/2 200
  ```

**Result:** `[ ] PASS  [ ] FAIL`  
**Release URL:** _______________________________________________  
**Notes:** _______________________________________________

---

## TEST SUITE 2: PACKAGE INSTALLATION (Apps Script)

### TC-2.1 — Package Download & Extraction
**Purpose:** Verify ZIP downloads and extracts in Apps Script environment

**Test script (run in Apps Script):**
```javascript
function testPackageDownload() {
  const url = "https://github.com/TINTA-ARTIFICIAL/dx-opus/releases/download/v1.4.0/dx-opus-system-v1.4.0.zip";
  
  Logger.log("Fetching: " + url);
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  Logger.log("Status: " + response.getResponseCode());
  Logger.log("Size: " + response.getBlob().getBytes().length + " bytes");
  
  const unzipped = Utilities.unzip(response.getBlob());
  Logger.log("Files extracted: " + unzipped.length);
  
  unzipped.slice(0, 5).forEach(function(f) {
    Logger.log("  " + f.getName());
  });
}
```

**Validation criteria:**
- [ ] HTTP response: 200
- [ ] ZIP size > 10KB
- [ ] Extraction succeeds without error
- [ ] File count matches MANIFEST.txt total
- [ ] File names include expected patterns (PROMPT_*.md, etc.)

**Result:** `[ ] PASS  [ ] FAIL`  
**Extracted file count:** _______  
**Notes:** _______________________________________________

---

### TC-2.2 — Fresh Installation (Clean Drive)
**Purpose:** Verify complete installation on clean Google Drive  
**Environment:** Use test Google account with empty Drive

**Steps:**
1. Open Google Apps Script
2. Paste `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`
3. Run `setupEditorEnvironment()`
4. Authorize permissions
5. Monitor execution log

**Validation criteria:**
- [ ] Function completes without fatal error
- [ ] Drive folders created: `D-X-OPUS/{prompts,templates,resources,tools,projects}`
- [ ] prompts/ contains ≥5 PROMPT_*.md files
- [ ] templates/ contains ≥1 TEMPLATE_*.md files
- [ ] resources/ contains AUTO_SAVE_CONFIG.yaml
- [ ] tools/ contains TOOL_CREATE_PROJECT.gs
- [ ] `.dx-opus-version` marker file present in root `D-X-OPUS/`
- [ ] Version marker contains `version: v1.4.0`
- [ ] Log shows method: "package" (not "individual")
- [ ] Total setup time: ≤ 10 minutes

**Result:** `[ ] PASS  [ ] FAIL`  
**Setup time:** _______  **Files installed:** _______  
**Notes:** _______________________________________________

---

### TC-2.3 — Version Detection (Existing Installation)
**Purpose:** Verify upgrade detection works correctly

**Steps:**
1. Run `checkInstallationStatus()` after TC-2.2

**Validation criteria:**
- [ ] Reports `✅ Installed version: v1.4.0`
- [ ] Reports `✅ Up to date` (not "update available")
- [ ] Does not trigger re-installation

**Simulate older version:**
1. Edit `.dx-opus-version` file manually, change to `v1.3.0`
2. Run `checkInstallationStatus()`

**Validation criteria:**
- [ ] Reports detected version: `v1.3.0`
- [ ] Reports update available: `v1.3.0 → v1.4.0`
- [ ] Suggests running `setupEditorEnvironment()`

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

### TC-2.4 — Upgrade Installation (Existing → New Version)
**Purpose:** Verify upgrade preserves projects and updates system files

**Pre-conditions:** TC-2.2 completed (v1.4.0 installed)  
**Simulate:** Change `CONFIG.LATEST_VERSION` to `"v1.5.0"` and re-run

**Validation criteria:**
- [ ] Setup detects existing installation
- [ ] Log shows: "Upgrading v1.4.0 → v1.5.0"
- [ ] System files replaced/updated
- [ ] `projects/` folder untouched
- [ ] Version marker updated to `v1.5.0`
- [ ] No duplicate files created

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

### TC-2.5 — Package Failure Fallback
**Purpose:** Verify fallback to individual files when package unavailable

**Setup:** Temporarily modify `CONFIG.LATEST_VERSION` to `"v0.0.0"` (non-existent release)

**Steps:**
1. Modify version to trigger 404
2. Run `setupEditorEnvironment()`

**Validation criteria:**
- [ ] Package download attempt logged (with URL)
- [ ] 404 or failure detected and logged
- [ ] Log shows: "Falling back to individual file download..."
- [ ] Individual file download begins
- [ ] ≥1 files successfully installed via fallback
- [ ] Setup does NOT fail with unhandled exception
- [ ] User receives clear feedback about fallback method used

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

## TEST SUITE 3: END-TO-END WORKFLOW

### TC-3.1 — Complete New User Journey
**Purpose:** Simulate real user onboarding from zero to first D-X-OPUS session

**Sequence:**
1. Clean Google Drive (no D-X-OPUS folder)
2. Run `setupEditorEnvironment()` — wait for completion
3. Open Claude.ai → Create new project "D-X-OPUS Test"
4. Upload all files from Drive `D-X-OPUS/prompts/` to project knowledge
5. Start new chat in the project
6. Paste content of `PROMPT_PROJECT_DISCOVERY.md`
7. Verify Claude responds with D-X-OPUS activation

**Validation criteria:**
- [ ] Setup completes in ≤ 10 minutes
- [ ] All prompts accessible in Drive
- [ ] Claude project accepts all uploaded prompts
- [ ] PROMPT_PROJECT_DISCOVERY activates correctly
- [ ] Claude identifies as D-X-OPUS and requests project context
- [ ] Auto-save configuration recognized

**Result:** `[ ] PASS  [ ] FAIL`  
**Total onboarding time:** _______  
**Notes:** _______________________________________________

---

### TC-3.2 — Package Integrity Check
**Purpose:** Verify no file corruption during package zip/download/unzip cycle

**Steps:**
```bash
# 1. Create package
./create-release-package.sh sprint-4 --no-release

# 2. Extract and compare
mkdir /tmp/pkg-test
unzip dx-opus-system-v1.4.0.zip -d /tmp/pkg-test

# 3. Compare sample file against repo original
diff activation/PROMPT_PROJECT_DISCOVERY.md /tmp/pkg-test/dx-opus-system-v1.4.0/prompts/PROMPT_PROJECT_DISCOVERY.md

# 4. Verify checksums
cd /tmp/pkg-test
sha256sum -c dx-opus-system-v1.4.0/MANIFEST.txt 2>&1 | grep -v "OK"
```

**Validation criteria:**
- [ ] `diff` shows no differences for sampled files
- [ ] Checksum verification passes for all files
- [ ] No "FAILED" lines in checksum output
- [ ] File permissions and encoding preserved

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

### TC-3.3 — Performance Benchmark
**Purpose:** Confirm 90% setup time reduction target is met

| Method | Target Time | Actual Time | Pass? |
|---|---|---|---|
| Package installation | ≤ 10 minutes | _______ | `[ ]` |
| Individual fallback | 45–60 minutes | _______ | (baseline) |
| Package creation script | ≤ 5 minutes | _______ | `[ ]` |

**Timing instructions:**
```bash
# Time the package creation:
time ./create-release-package.sh sprint-4 --no-release
```

For installation: Record time from first log line to final summary in Apps Script.

**Result:** `[ ] PASS  [ ] FAIL`  
**Notes:** _______________________________________________

---

## TEST SUITE 4: ERROR HANDLING

### TC-4.1 — Dirty Repository Guard
**Command:**
```bash
echo "test" >> README.md
./create-release-package.sh sprint-4 --dry-run
```

**Expected:** Script exits with error message about uncommitted changes  
**Result:** `[ ] PASS  [ ] FAIL`  

---

### TC-4.2 — Missing Sprint Argument
**Command:**
```bash
./create-release-package.sh
```

**Expected:** Script exits with usage instructions  
**Result:** `[ ] PASS  [ ] FAIL`  

---

### TC-4.3 — Invalid Sprint Format
**Command:**
```bash
./create-release-package.sh my-release --dry-run
```

**Expected:** Error: "Cannot extract sprint number"  
**Result:** `[ ] PASS  [ ] FAIL`  

---

### TC-4.4 — Unknown CLI Flag
**Command:**
```bash
./create-release-package.sh sprint-4 --unknown-flag
```

**Expected:** Error: "Unknown option: --unknown-flag"  
**Result:** `[ ] PASS  [ ] FAIL`  

---

## SIGN-OFF RECORD

### Sprint 4 Package Release v1.4.0

| Test Suite | Tests | Passed | Failed | Skipped |
|---|---|---|---|---|
| TC-1: Package Creation | 5 | ___ | ___ | ___ |
| TC-2: Installation | 5 | ___ | ___ | ___ |
| TC-3: End-to-End | 3 | ___ | ___ | ___ |
| TC-4: Error Handling | 4 | ___ | ___ | ___ |
| **Total** | **17** | **___** | **___** | **___** |

**Tester:** ___________________________  
**Date:**   ___________________________  
**Repo commit at test time:** ___________________________  
**Release URL:** https://github.com/TINTA-ARTIFICIAL/dx-opus/releases/tag/v1.4.0

### Release Decision
- [ ] ✅ **APPROVED FOR RELEASE** — All critical tests passed
- [ ] ⚠️  **CONDITIONAL RELEASE** — Minor issues documented, acceptable for release
- [ ] ❌ **BLOCKED** — Critical failures must be resolved before release

**Sign-off notes:**
___________________________________________________________________
___________________________________________________________________

---

## KNOWN LIMITATIONS & WORKAROUNDS

### Google Apps Script ZIP Limitations
- **Issue:** `Utilities.unzip()` has a 50MB size limit
- **Workaround:** Package is designed to stay well under 5MB (text files only)
- **Monitor:** If package grows beyond 10MB, consider splitting

### Apps Script Execution Time
- **Issue:** Apps Script has a 6-minute execution limit
- **Workaround:** Package install completes in ~2 minutes; individual fallback may timeout for large installations
- **If timeout:** Run `forceReinstall()` which resumes from last state

### GitHub Rate Limiting
- **Issue:** Apps Script IP may hit GitHub rate limits (60 req/hr unauthenticated)
- **Workaround:** Package install uses 1 request (ZIP download) vs 60+ for individual files — this is primary motivation for package system

---

*This test document should be completed and archived as part of each sprint closure.*  
*Store completed copies in: `_system/test-records/TEST_PACKAGE_[VERSION].md`*
