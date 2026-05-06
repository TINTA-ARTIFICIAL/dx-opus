/**
 * TOOL_SETUP_EDITOR_ENVIRONMENT.gs
 * D-X-OPUS Editor Environment Setup Tool
 * Version: 1.1.1 (fix: SpreadsheetApp.getUi standalone error)
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
 *
 * CHANGELOG:
 *   v1.1.1 - Fix: removed SpreadsheetApp.getUi() call (fails in standalone projects)
 *   v1.1.0 - Package installation support (ZIP from GitHub releases)
 *   v1.0.0 - Initial version (individual file fallback only)
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Repository config
  REPO_OWNER:    "TINTA-ARTIFICIAL",
  REPO_NAME:     "dx-opus",
  
  // Package config – update VERSION on each sprint release
  LATEST_VERSION: "v1.4.1",
  
  // Target Google Drive folder structure (flat)
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
  MAX_RETRIES:   3,
  TIMEOUT_MS:    30000,
  PROGRESS_LOG:  true
};

// ═══════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════

/**
 * Main setup function. Run this to install D-X-OPUS.
 * Called manually from Apps Script editor.
 */
function setupEditorEnvironment() {
  // FIX v1.1.1: Do not call SpreadsheetApp.getUi() – fails in standalone projects
  const ui = null;
  
  log_("═══════════════════════════════════════════════════");
  log_("  D-X-OPUS ENVIRONMENT SETUP");
  log_("  Version: " + CONFIG.LATEST_VERSION);
  log_("  " + new Date().toISOString());
  log_("═══════════════════════════════════════════════════");

  try {
    // Step 1 – Detect existing installation
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

    // Step 2 – Create/verify Drive folder structure
    log_("\n📁 Setting up folder structure...");
    const folders = createFolderStructure_();
    log_("✅ Folders ready");

    // Step 3 – Install system components
    log_("\n📦 Installing system components...");
    const result = installSystemComponents_(folders);

    // Step 4 – Write version marker
    writeVersionMarker_(folders.root, CONFIG.LATEST_VERSION);

    // Step 5 – Verify installation
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
 */
function installSystemComponents_(folders) {
  log_("  Attempting package installation...");
  const packageResult = tryPackageInstall_(folders);
  
  if (packageResult.success) {
    log_("✅ Package installation complete");
    log_("   Version:  " + packageResult.version);
    log_("   Files:    " + packageResult.filesInstalled);
    log_("   Method:   package (ZIP)");
    return packageResult;
  }

  log_("⚠️  Package install failed: " + packageResult.error);
  log_("   Falling back to individual file download...");
  log_("   (This will take longer – 45-60 minutes estimated)");
  
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

function tryPackageInstall_(folders) {
  try {
    const version  = CONFIG.LATEST_VERSION;
    const pkgName  = "dx-opus-system-" + version;
    const zipUrl   = buildReleaseUrl_(version, pkgName + ".zip");

    log_("  📥 Downloading: " + zipUrl);

    const zipBlob = fetchWithRetry_(zipUrl, CONFIG.MAX_RETRIES);
    if (!zipBlob) {
      return { success: false, error: "Failed to download package from " + zipUrl };
    }
    log_("  ✅ Downloaded (" + formatBytes_(zipBlob.getBytes().length) + ")");

    log_("  📂 Extracting package...");
    let unzipped;
    try {
      unzipped = Utilities.unzip(zipBlob);
    } catch (e) {
      return { success: false, error: "ZIP extraction failed: " + e.message };
    }
    log_("  ✅ Extracted " + unzipped.length + " files");

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

function installFilesFromPackage_(files, folders, pkgPrefix) {
  let installed = 0, skipped = 0, errors = 0;

  const DEST_MAP = {
    "prompts":   folders.prompts,
    "templates": folders.templates,
    "resources": folders.resources,
    "tools":     folders.tools
  };

  files.forEach(function(blob) {
    const fullName = blob.getName();
    const relativePath = fullName.replace(pkgPrefix + "/", "").replace(pkgPrefix, "");
    
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

    const parts    = relativePath.split("/");
    const subdir   = parts[0];
    const filename = parts[parts.length - 1];
    const destFolder = DEST_MAP[subdir];

    if (!destFolder) {
      log_("  ⚠️  Unknown package subdir '" + subdir + "' for: " + relativePath);
      skipped++;
      return;
    }

    if (!filename || filename === "") {
      skipped++;
      return;
    }

    try {
      upsertFile_(destFolder, filename, blob);
      installed++;
      if (CONFIG.PROGRESS_LOG) {
        log_("  📄 " + subdir + "/" + filename);
      }
    } catch (e) {
      log_("  ❌ Failed: " + relativePath + " – " + e.message);
      errors++;
    }
  });

  return { installed: installed, skipped: skipped, errors: errors };
}

// ═══════════════════════════════════════════════════════════════
// INDIVIDUAL FILE FALLBACK
// ═══════════════════════════════════════════════════════════════

function installIndividualFiles_(folders) {
  const FILES = getIndividualFileManifest_();
  let installed = 0, errors = 0;
  const total = FILES.length;

  FILES.forEach(function(file, index) {
    const url        = CONFIG.RAW_BASE + "/" + file.src;
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

    if (index > 0 && index % 10 === 0) {
      Utilities.sleep(1000);
    }
  });

  return {
    success:        errors < FILES.length,
    filesInstalled: installed,
    errors:         errors,
    method:         "individual"
  };
}

function getIndividualFileManifest_() {
  return [
    // ── Prompts ──────────────────────────────────────────────
    { name: "PROMPT_PROJECT_DISCOVERY.md",         src: "activation/PROMPT_PROJECT_DISCOVERY.md",          dest: "prompts" },
    { name: "PROMPT_SUMMARIZE_REFERENCES.md",       src: "research/PROMPT_SUMMARIZE_REFERENCES.md",          dest: "prompts" },
    { name: "PROMPT_CREATE_RESEARCH_PLAN.md",       src: "research/PROMPT_CREATE_RESEARCH_PLAN.md",          dest: "prompts" },
    { name: "PROMPT_WRITE_POST.md",                 src: "writing/book/PROMPT_WRITE_POST.md",                dest: "prompts" },
    { name: "PROMPT_WRITE_CHAPTER.md",              src: "writing/book/PROMPT_WRITE_CHAPTER.md",             dest: "prompts" },
    { name: "PROMPT_CREATE_BOOK_BRIEF.md",          src: "writing/book/PROMPT_CREATE_BOOK_BRIEF.md",         dest: "prompts" },
    { name: "PROMPT_CREATE_BOOK_INDEX.md",          src: "writing/book/PROMPT_CREATE_BOOK_INDEX.md",         dest: "prompts" },
    { name: "PROMPT_EVALUATE_BOOK_STYLE.md",        src: "evaluation/PROMPT_EVALUATE_BOOK_STYLE.md",         dest: "prompts" },
    { name: "PROMPT_EVALUATE_BOOK_CONTENT.md",      src: "evaluation/PROMPT_EVALUATE_BOOK_CONTENT.md",       dest: "prompts" },
    { name: "PROMPT_EVALUATE_POST.md",              src: "evaluation/PROMPT_EVALUATE_POST.md",               dest: "prompts" },
    // ── Templates ────────────────────────────────────────────
    { name: "TEMPLATE_PROJECT_README.md",           src: "_system/templates/TEMPLATE_PROJECT_README.md",     dest: "templates" },
    { name: "TEMPLATE_PROJECT_INSTRUCTIONS.md",     src: "_system/templates/TEMPLATE_PROJECT_INSTRUCTIONS.md", dest: "templates" },
    { name: "TEMPLATE_EDITOR_CONFIG.md",            src: "_system/templates/TEMPLATE_EDITOR_CONFIG.md",      dest: "templates" },
    // ── Resources ────────────────────────────────────────────
    { name: "AUTO_SAVE_CONFIG.yaml",                src: "_system/resources/AUTO_SAVE_CONFIG.yaml",          dest: "resources" },
    { name: "RESOURCE_SOURCE_AUTHORITY.md",         src: "knowledge-base/RESOURCE_SOURCE_AUTHORITY.md",      dest: "resources" },
    { name: "RESOURCE_CLAIM_VALIDATION.md",         src: "knowledge-base/RESOURCE_CLAIM_VALIDATION.md",      dest: "resources" },
    // ── Tools ────────────────────────────────────────────────
    { name: "TOOL_CREATE_PROJECT.gs",               src: "tools/TOOL_CREATE_PROJECT.gs",                     dest: "tools"    }
  ];
}

// ═══════════════════════════════════════════════════════════════
// GOOGLE DRIVE UTILITIES
// ═══════════════════════════════════════════════════════════════

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

function getOrCreateFolder_(parent, name) {
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) {
    return existing.next();
  }
  return parent.createFolder(name);
}

function upsertFile_(folder, filename, blob) {
  const existing = folder.getFilesByName(filename);
  while (existing.hasNext()) {
    existing.next().setTrashed(true);
  }
  const mimeType = detectMimeType_(filename);
  blob.setName(filename);
  if (mimeType) blob.setContentType(mimeType);
  folder.createFile(blob);
}

function getDestFolder_(destKey, folders) {
  return folders[destKey] || null;
}

// ═══════════════════════════════════════════════════════════════
// VERSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════

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

function writeVersionMarker_(rootFolder, version) {
  const content = [
    "# D-X-OPUS Version Marker",
    "# Do not edit this file manually",
    "version: " + version,
    "installed: " + new Date().toISOString(),
    "package: dx-opus-system-" + version + ".zip"
  ].join("\n");

  const blob = Utilities.newBlob(content, "text/plain", ".dx-opus-version");
  
  const existing = rootFolder.getFilesByName(".dx-opus-version");
  while (existing.hasNext()) existing.next().setTrashed(true);
  
  rootFolder.createFile(blob);
  log_("📍 Version marker written: " + version);
}

// ═══════════════════════════════════════════════════════════════
// VERIFICATION
// ═══════════════════════════════════════════════════════════════

function verifyInstallation_(folders) {
  const checks = {
    prompts:   { folder: folders.prompts,   required: ["PROMPT_PROJECT_DISCOVERY.md"] },
    templates: { folder: folders.templates, required: ["TEMPLATE_PROJECT_README.md"]  },
    resources: { folder: folders.resources, required: ["AUTO_SAVE_CONFIG.yaml"]       },
    tools:     { folder: folders.tools,     required: ["TOOL_CREATE_PROJECT.gs"]      }
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

  const counts = {};
  Object.keys(folders).forEach(function(key) {
    if (key === "root") return;
    try { counts[key] = countFiles_(folders[key]); } catch(e) { counts[key] = "?"; }
  });

  return { passed: passed, failed: failed, issues: issues, counts: counts, healthy: failed === 0 };
}

function countFiles_(folder) {
  let count = 0;
  const files = folder.getFiles();
  while (files.hasNext()) { files.next(); count++; }
  return count;
}

// ═══════════════════════════════════════════════════════════════
// NETWORK UTILITIES
// ═══════════════════════════════════════════════════════════════

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
        return null;
      }

      lastError = "HTTP " + code;
      log_("  ⚠️  Attempt " + attempt + " failed (" + lastError + "), retrying...");
      Utilities.sleep(1000 * attempt);

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
  if (bytes < 1024)           return bytes + " B";
  if (bytes < 1024 * 1024)   return (bytes / 1024).toFixed(1) + " KB";
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
  log_("     1. Run TOOL_CREATE_PROJECT.gs → createProject('CODE', 'Name')");
  log_("     2. Open Claude.ai → New Project");
  log_("     3. Upload PROMPTS_PACKAGE.md to Project Knowledge");
  log_("     4. Start session with PROMPT_PROJECT_DISCOVERY");
  log_("═══════════════════════════════════════════════════");
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS (callable standalone)
// ═══════════════════════════════════════════════════════════════

/**
 * Check installation status without modifying anything.
 */
function checkInstallationStatus() {
  log_("D-X-OPUS Installation Status Check");
  log_("=================================================");
  
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
 * Force reinstall – replaces existing files and installs fresh.
 */
function forceReinstall() {
  log_("⚠️  Force reinstall initiated...");
  log_("   Existing files will be replaced.");
  setupEditorEnvironment();
}
