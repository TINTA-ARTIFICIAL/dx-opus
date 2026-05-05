/**
 * TOOL_SETUP_EDITOR_ENVIRONMENT.gs
 * D-X-OPUS Editor Environment Setup Tool
 * Version: 1.1.0
 *
 * DESCRIPTION:
 *   Automated Google Drive environment setup for D-X-OPUS.
 *   Supports both fast package installation (v1.1+) and
 *   individual file fallback.
 *
 * USAGE:
 *   1. Open Google Apps Script (script.google.com)
 *   2. Paste this entire file
 *   3. Run setupEditorEnvironment()
 *   4. Authorize permissions when prompted
 *
 * SETUP TIME:
 *   Package install:  5–10 minutes
 *   Fallback install: 45–60 minutes
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Repository config
  REPO_OWNER:    "TINTA-ARTIFICIAL",
  REPO_NAME:     "dx-opus",
  
  // Package config — update VERSION on each sprint release
  LATEST_VERSION: "v1.4.0",
  
  // Target Google Drive folder structure
  FOLDERS: {
    ROOT:      "D-X-OPUS",
    PROMPTS:   "D-X-OPUS/prompts",
    TEMPLATES: "D-X-OPUS/templates",
    RESOURCES: "D-X-OPUS/resources",
    TOOLS:     "D-X-OPUS/tools",
    PROJECTS:  "D-X-OPUS/projects"
  },

  // Fallback: individual raw file URLs (GitHub raw)
  RAW_BASE: "https://raw.githubusercontent.com/TINTA-ARTIFICIAL/dx-opus/main",

  // Installation settings
  MAX_RETRIES:       3,
  TIMEOUT_MS:        30000,
  PROGRESS_LOG:      true
};

// ═══════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════

/**
 * Main setup function. Run this to install D-X-OPUS.
 * Called manually from Apps Script editor.
 */
function setupEditorEnvironment() {
  const ui = SpreadsheetApp.getUi ? SpreadsheetApp.getUi() : null;
  
  log_("═══════════════════════════════════════════════════");
  log_("  D-X-OPUS ENVIRONMENT SETUP");
  log_("  Version: " + CONFIG.LATEST_VERSION);
  log_("  " + new Date().toISOString());
  log_("═══════════════════════════════════════════════════");

  try {
    // Step 1 — Detect existing installation
    const existingVersion = detectExistingInstallation_();
    if (existingVersion) {
      log_("📦 Existing installation detected: " + existingVersion);
      log_("   Target version: " + CONFIG.LATEST_VERSION);
      
      if (existingVersion === CONFIG.LATEST_VERSION) {
        log_("✅ Already up to date. No action needed.");
        return buildResult_(true, "Already up to date", existingVersion, "none", 0);
      }
      log_("🔄 Upgrading " + existingVersion + " → " + CONFIG.LATEST_VERSION);
    }

    // Step 2 — Create/verify Drive folder structure
    log_("\n📁 Setting up folder structure...");
    const folders = createFolderStructure_();
    log_("✅ Folders ready");

    // Step 3 — Install system components
    log_("\n📦 Installing system components...");
    const result = installSystemComponents_(folders);

    // Step 4 — Write version marker
    writeVersionMarker_(folders.root, CONFIG.LATEST_VERSION);

    // Step 5 — Verify installation
    log_("\n🔍 Verifying installation...");
    const verification = verifyInstallation_(folders);

    // Final summary
    summarizeSetup_(result, verification);
    return result;

  } catch (err) {
    log_("❌ SETUP FAILED: " + err.message);
    log_("   Stack: " + err.stack);
    throw err;
  }
}

// ═══════════════════════════════════════════════════════════════
// INSTALLATION ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Tries package install first; falls back to individual files.
 * @param {Object} folders - Map of folder name → Drive Folder object
 * @returns {Object} Installation result
 */
function installSystemComponents_(folders) {
  // Attempt 1: Package install (fast)
  log_("  Attempting package installation...");
  const packageResult = tryPackageInstall_(folders);
  
  if (packageResult.success) {
    log_("✅ Package installation complete");
    log_("   Version:  " + packageResult.version);
    log_("   Files:    " + packageResult.filesInstalled);
    log_("   Method:   package (ZIP)");
    return packageResult;
  }

  // Attempt 2: Individual files (fallback)
  log_("⚠️  Package install failed: " + packageResult.error);
  log_("   Falling back to individual file download...");
  log_("   (This will take longer — 45-60 minutes estimated)");
  
  const fallbackResult = installIndividualFiles_(folders);
  
  if (fallbackResult.success) {
    log_("✅ Fallback installation complete");
    log_("   Files: " + fallbackResult.filesInstalled);
    return fallbackResult;
  }

  throw new Error("Both package and fallback installation failed.\n" +
    "Package error: " + packageResult.error + "\n" +
    "Fallback error: " + fallbackResult.error);
}

// ═══════════════════════════════════════════════════════════════
// PACKAGE INSTALLATION (Primary Method)
// ═══════════════════════════════════════════════════════════════

/**
 * Downloads and extracts the latest release ZIP package.
 * @returns {Object} {success, version, filesInstalled, error}
 */
function tryPackageInstall_(folders) {
  try {
    // Build download URL
    const version   = CONFIG.LATEST_VERSION;
    const pkgName   = "dx-opus-system-" + version;
    const zipUrl    = buildReleaseUrl_(version, pkgName + ".zip");

    log_("  📥 Downloading: " + zipUrl);

    // Fetch ZIP with retry
    const zipBlob = fetchWithRetry_(zipUrl, CONFIG.MAX_RETRIES);
    if (!zipBlob) {
      return { success: false, error: "Failed to download package from " + zipUrl };
    }
    log_("  ✅ Downloaded (" + formatBytes_(zipBlob.getBytes().length) + ")");

    // Extract ZIP
    log_("  📂 Extracting package...");
    let unzipped;
    try {
      unzipped = Utilities.unzip(zipBlob);
    } catch (e) {
      return { success: false, error: "ZIP extraction failed: " + e.message };
    }
    log_("  ✅ Extracted " + unzipped.length + " files");

    // Install files from package to Drive folders
    log_("  📋 Installing files to Drive...");
    const installResult = installFilesFromPackage_(unzipped, folders, pkgName);

    if (installResult.errors > 0) {
      log_("  ⚠️  " + installResult.errors + " files had errors (installed " + installResult.installed + " successfully)");
    }

    return {
      success:        true,
      version:        version,
      filesInstalled: installResult.installed,
      filesSkipped:   installResult.skipped,
      errors:         installResult.errors,
      method:         "package",
      packageUrl:     zipUrl
    };

  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Routes extracted ZIP files to correct Drive folders.
 * @param {Blob[]} files      - Array of extracted file blobs
 * @param {Object} folders    - Drive folder map
 * @param {string} pkgPrefix  - Package directory prefix to strip
 * @returns {Object} {installed, skipped, errors}
 */
function installFilesFromPackage_(files, folders, pkgPrefix) {
  let installed = 0, skipped = 0, errors = 0;

  // Map package subdirectory → Drive folder
  const DEST_MAP = {
    "prompts":   folders.prompts,
    "templates": folders.templates,
    "resources": folders.resources,
    "tools":     folders.tools
  };

  files.forEach(function(blob) {
    const fullName = blob.getName();

    // Strip leading package directory prefix (e.g. "dx-opus-system-v1.4.0/")
    const relativePath = fullName.replace(pkgPrefix + "/", "").replace(pkgPrefix, "");
    
    // Skip metadata files (they go to root)
    if (relativePath === "PACKAGE_INFO.md" || relativePath === "MANIFEST.txt") {
      try {
        upsertFile_(folders.root, basename_(relativePath), blob);
        installed++;
      } catch(e) {
        log_("  ⚠️  Could not install " + relativePath + ": " + e.message);
        errors++;
      }
      return;
    }

    // Determine destination folder from first path segment
    const parts    = relativePath.split("/");
    const subdir   = parts[0];
    const filename = parts[parts.length - 1];
    const destFolder = DEST_MAP[subdir];

    if (!destFolder) {
      // Unknown directory — log and skip
      log_("  ⚠️  Unknown package subdir '" + subdir + "' for: " + relativePath);
      skipped++;
      return;
    }

    if (!filename || filename === "") {
      skipped++;  // Directory entry
      return;
    }

    try {
      upsertFile_(destFolder, filename, blob);
      installed++;
      if (CONFIG.PROGRESS_LOG) {
        log_("  📄 " + subdir + "/" + filename);
      }
    } catch (e) {
      log_("  ❌ Failed: " + relativePath + " — " + e.message);
      errors++;
    }
  });

  return { installed: installed, skipped: skipped, errors: errors };
}

// ═══════════════════════════════════════════════════════════════
// INDIVIDUAL FILE FALLBACK
// ═══════════════════════════════════════════════════════════════

/**
 * Downloads files individually from GitHub raw URLs.
 * Used when package download/extraction fails.
 * @returns {Object} Installation result
 */
function installIndividualFiles_(folders) {
  // This list should match the package contents exactly.
  // Update this list each sprint with new/changed files.
  const FILES = getIndividualFileManifest_();
  
  let installed = 0, errors = 0;
  const total = FILES.length;

  FILES.forEach(function(file, index) {
    const url       = CONFIG.RAW_BASE + "/" + file.src;
    const destFolder = getDestFolder_(file.dest, folders);

    if (!destFolder) {
      log_("  ⚠️  No folder for dest=" + file.dest + " file=" + file.name);
      errors++;
      return;
    }

    log_("  [" + (index+1) + "/" + total + "] " + file.name);

    const blob = fetchWithRetry_(url, CONFIG.MAX_RETRIES);
    if (!blob) {
      log_("  ❌ Failed to download: " + url);
      errors++;
      return;
    }

    try {
      upsertFile_(destFolder, file.name, blob);
      installed++;
    } catch(e) {
      log_("  ❌ Failed to save " + file.name + ": " + e.message);
      errors++;
    }

    // Pause to avoid rate limits on large installs
    if (index > 0 && index % 10 === 0) {
      Utilities.sleep(1000);
    }
  });

  return {
    success:        errors < FILES.length,  // partial success is ok
    filesInstalled: installed,
    errors:         errors,
    method:         "individual"
  };
}

/**
 * Returns manifest of individual files for fallback install.
 * Format: { name, src (repo path), dest (folder key) }
 * 
 * ⚠️  UPDATE THIS LIST each sprint alongside the package script.
 */
function getIndividualFileManifest_() {
  return [
    // ── Prompts ──────────────────────────────────────────────
    { name: "PROMPT_PROJECT_DISCOVERY.md",       src: "activation/PROMPT_PROJECT_DISCOVERY.md",         dest: "prompts" },
    { name: "PROMPT_SUMMARIZE_REFERENCES.md",    src: "research/PROMPT_SUMMARIZE_REFERENCES.md",        dest: "prompts" },
    { name: "PROMPT_CREATE_RESEARCH_PLAN.md",    src: "research/PROMPT_CREATE_RESEARCH_PLAN.md",        dest: "prompts" },
    { name: "PROMPT_EVALUATE_SOURCES.md",        src: "evaluation/PROMPT_EVALUATE_SOURCES.md",          dest: "prompts" },
    { name: "PROMPT_WRITE_POST.md",              src: "writing/book/PROMPT_WRITE_POST.md",               dest: "prompts" },
    { name: "PROMPT_WRITE_CHAPTER.md",           src: "writing/book/PROMPT_WRITE_CHAPTER.md",           dest: "prompts" },
    { name: "PROMPT_CREATE_BOOK_BRIEF.md",       src: "writing/book/PROMPT_CREATE_BOOK_BRIEF.md",       dest: "prompts" },
    { name: "PROMPT_EVALUATE_ACTIVATION.md",     src: "evaluation/PROMPT_EVALUATE_ACTIVATION.md",       dest: "prompts" },
    // Add all PROMPT_*.md files here — this is the minimum set
    
    // ── Templates ────────────────────────────────────────────
    { name: "TEMPLATE_PROJECT_README.md",        src: "_system/templates/TEMPLATE_PROJECT_README.md",   dest: "templates" },
    { name: "TEMPLATE_PROJECT_INSTRUCTIONS.md",  src: "_system/templates/TEMPLATE_PROJECT_INSTRUCTIONS.md", dest: "templates" },
    { name: "TEMPLATE_EDITOR_CONFIG.md",         src: "_system/templates/TEMPLATE_EDITOR_CONFIG.md",   dest: "templates" },

    // ── Resources ────────────────────────────────────────────
    { name: "AUTO_SAVE_CONFIG.yaml",             src: "_system/resources/AUTO_SAVE_CONFIG.yaml",        dest: "resources" },
    { name: "RESOURCE_SOURCE_AUTHORITY.md",      src: "knowledge-base/RESOURCE_SOURCE_AUTHORITY.md",   dest: "resources" },
    { name: "RESOURCE_CLAIM_VALIDATION.md",      src: "knowledge-base/RESOURCE_CLAIM_VALIDATION.md",   dest: "resources" },

    // ── Tools ────────────────────────────────────────────────
    { name: "TOOL_CREATE_PROJECT.gs",            src: "tools/TOOL_CREATE_PROJECT.gs",                   dest: "tools" }
  ];
}

// ═══════════════════════════════════════════════════════════════
// GOOGLE DRIVE UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Creates the full D-X-OPUS folder structure in My Drive.
 * Skips folders that already exist.
 * @returns {Object} Map of folder key → DriveFolder
 */
function createFolderStructure_() {
  const root = getOrCreateFolder_(DriveApp.getRootFolder(), CONFIG.FOLDERS.ROOT);
  log_("  📁 Root:      " + CONFIG.FOLDERS.ROOT + " [" + root.getId() + "]");

  const subfolders = {};
  ["prompts", "templates", "resources", "tools", "projects"].forEach(function(name) {
    subfolders[name] = getOrCreateFolder_(root, name);
    log_("  📁 Subfolder: " + name);
  });

  return Object.assign({ root: root }, subfolders);
}

/**
 * Gets an existing folder or creates it.
 * @param {DriveFolder} parent
 * @param {string}      name
 * @returns {DriveFolder}
 */
function getOrCreateFolder_(parent, name) {
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) {
    return existing.next();
  }
  return parent.createFolder(name);
}

/**
 * Creates or replaces a file in a Drive folder.
 * @param {DriveFolder} folder
 * @param {string}      filename
 * @param {Blob}        blob
 */
function upsertFile_(folder, filename, blob) {
  // Remove existing file with same name
  const existing = folder.getFilesByName(filename);
  while (existing.hasNext()) {
    existing.next().setTrashed(true);
  }

  // Detect MIME type
  const mimeType = detectMimeType_(filename);
  blob.setName(filename);
  if (mimeType) blob.setContentType(mimeType);

  folder.createFile(blob);
}

/**
 * Routes dest key to actual folder object.
 */
function getDestFolder_(destKey, folders) {
  return folders[destKey] || null;
}

// ═══════════════════════════════════════════════════════════════
// VERSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════

/**
 * Detects existing D-X-OPUS installation and returns version string.
 * @returns {string|null} Installed version or null if not found
 */
function detectExistingInstallation_() {
  try {
    const rootFolders = DriveApp.getRootFolder().getFoldersByName(CONFIG.FOLDERS.ROOT);
    if (!rootFolders.hasNext()) return null;

    const root = rootFolders.next();
    const markerFiles = root.getFilesByName(".dx-opus-version");
    if (!markerFiles.hasNext()) return null;

    const content = markerFiles.next().getBlob().getDataAsString();
    const match   = content.match(/version:\s*(v[\d.]+)/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

/**
 * Writes version marker file to root folder.
 */
function writeVersionMarker_(rootFolder, version) {
  const content = [
    "# D-X-OPUS Version Marker",
    "# Do not edit this file manually",
    "version: " + version,
    "installed: " + new Date().toISOString(),
    "package: dx-opus-system-" + version + ".zip"
  ].join("\n");

  const blob = Utilities.newBlob(content, "text/plain", ".dx-opus-version");
  
  // Remove old marker if exists
  const existing = rootFolder.getFilesByName(".dx-opus-version");
  while (existing.hasNext()) existing.next().setTrashed(true);
  
  rootFolder.createFile(blob);
  log_("📍 Version marker written: " + version);
}

// ═══════════════════════════════════════════════════════════════
// VERIFICATION
// ═══════════════════════════════════════════════════════════════

/**
 * Verifies installation completeness.
 * Checks for critical files in each folder.
 */
function verifyInstallation_(folders) {
  const checks = {
    prompts:   { folder: folders.prompts,   required: ["PROMPT_PROJECT_DISCOVERY.md"] },
    templates: { folder: folders.templates, required: ["TEMPLATE_PROJECT_README.md"] },
    resources: { folder: folders.resources, required: ["AUTO_SAVE_CONFIG.yaml"] },
    tools:     { folder: folders.tools,     required: ["TOOL_CREATE_PROJECT.gs"] }
  };

  let passed = 0, failed = 0;
  const issues = [];

  Object.keys(checks).forEach(function(key) {
    const check = checks[key];
    check.required.forEach(function(filename) {
      const files = check.folder.getFilesByName(filename);
      if (files.hasNext()) {
        passed++;
        log_("  ✅ " + key + "/" + filename);
      } else {
        failed++;
        issues.push(key + "/" + filename);
        log_("  ❌ MISSING: " + key + "/" + filename);
      }
    });
  });

  // Count total files per folder
  const counts = {};
  Object.keys(folders).forEach(function(key) {
    if (key === "root") return;
    try {
      counts[key] = countFiles_(folders[key]);
    } catch(e) {
      counts[key] = "?";
    }
  });

  return {
    passed:  passed,
    failed:  failed,
    issues:  issues,
    counts:  counts,
    healthy: failed === 0
  };
}

/**
 * Counts files in a Drive folder.
 */
function countFiles_(folder) {
  let count = 0;
  const files = folder.getFiles();
  while (files.hasNext()) { files.next(); count++; }
  return count;
}

// ═══════════════════════════════════════════════════════════════
// NETWORK UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Fetches a URL with retry on failure.
 * @returns {Blob|null}
 */
function fetchWithRetry_(url, maxRetries) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        followRedirects:    true
      });

      const code = response.getResponseCode();
      if (code === 200) {
        return response.getBlob();
      }
      
      if (code === 404) {
        log_("  ⚠️  Not found (404): " + url);
        return null;  // No point retrying 404
      }

      lastError = "HTTP " + code;
      log_("  ⚠️  Attempt " + attempt + " failed (" + lastError + "), retrying...");
      Utilities.sleep(1000 * attempt);  // Exponential backoff

    } catch (e) {
      lastError = e.message;
      if (attempt < maxRetries) {
        log_("  ⚠️  Attempt " + attempt + " error: " + e.message + ", retrying...");
        Utilities.sleep(1000 * attempt);
      }
    }
  }

  log_("  ❌ All " + maxRetries + " attempts failed. Last error: " + lastError);
  return null;
}

/**
 * Builds the GitHub release download URL.
 */
function buildReleaseUrl_(version, filename) {
  return "https://github.com/" +
    CONFIG.REPO_OWNER + "/" + CONFIG.REPO_NAME +
    "/releases/download/" + version + "/" + filename;
}

// ═══════════════════════════════════════════════════════════════
// STRING / FORMAT UTILITIES
// ═══════════════════════════════════════════════════════════════

function basename_(path) {
  return path.split("/").pop();
}

function formatBytes_(bytes) {
  if (bytes < 1024)             return bytes + " B";
  if (bytes < 1024 * 1024)     return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024*1024)).toFixed(1) + " MB";
}

function detectMimeType_(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  const map = {
    "md":   "text/markdown",
    "txt":  "text/plain",
    "yaml": "application/x-yaml",
    "yml":  "application/x-yaml",
    "json": "application/json",
    "gs":   "text/plain",
    "js":   "text/javascript",
    "html": "text/html"
  };
  return map[ext] || "text/plain";
}

// ═══════════════════════════════════════════════════════════════
// LOGGING & REPORTING
// ═══════════════════════════════════════════════════════════════

function log_(msg) {
  Logger.log(msg);
}

function buildResult_(success, message, version, method, filesInstalled) {
  return {
    success:        success,
    message:        message,
    version:        version,
    method:         method,
    filesInstalled: filesInstalled,
    timestamp:      new Date().toISOString()
  };
}

function summarizeSetup_(installResult, verification) {
  log_("\n═══════════════════════════════════════════════════");
  log_("  SETUP SUMMARY");
  log_("═══════════════════════════════════════════════════");
  log_("  Status:   " + (verification.healthy ? "✅ SUCCESS" : "⚠️  PARTIAL"));
  log_("  Version:  " + CONFIG.LATEST_VERSION);
  log_("  Method:   " + (installResult.method || "unknown"));
  log_("  Files:    " + (installResult.filesInstalled || 0) + " installed");
  log_("");
  log_("  Drive Folder Counts:");
  Object.keys(verification.counts).forEach(function(key) {
    log_("    " + key + ": " + verification.counts[key] + " files");
  });

  if (verification.issues.length > 0) {
    log_("");
    log_("  ⚠️  Missing critical files:");
    verification.issues.forEach(function(f) { log_("    - " + f); });
    log_("     Run setupEditorEnvironment() again to retry.");
  }

  log_("");
  log_("  📋 NEXT STEPS:");
  log_("     1. Open Claude.ai → Your projects → D-X-OPUS");
  log_("     2. Upload project files from Drive: D-X-OPUS/prompts/");
  log_("     3. Start new session with PROMPT_PROJECT_DISCOVERY.md");
  log_("     4. Follow activation workflow in documentation");
  log_("═══════════════════════════════════════════════════");
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS (callable standalone)
// ═══════════════════════════════════════════════════════════════

/**
 * Check installation status without modifying anything.
 * Run this to verify your current installation.
 */
function checkInstallationStatus() {
  log_("D-X-OPUS Installation Status Check");
  log_("====================================");
  
  const version = detectExistingInstallation_();
  if (!version) {
    log_("❌ No D-X-OPUS installation found in Google Drive.");
    log_("   Run setupEditorEnvironment() to install.");
    return;
  }
  
  log_("✅ Installed version: " + version);
  
  if (version !== CONFIG.LATEST_VERSION) {
    log_("⚠️  Update available: " + version + " → " + CONFIG.LATEST_VERSION);
    log_("   Run setupEditorEnvironment() to upgrade.");
  } else {
    log_("✅ Up to date (" + CONFIG.LATEST_VERSION + ")");
  }
}

/**
 * Force reinstall — removes existing files and installs fresh.
 * Use when installation is corrupt or incomplete.
 */
function forceReinstall() {
  log_("⚠️  Force reinstall initiated...");
  log_("   Existing files will be replaced.");
  setupEditorEnvironment();
}
