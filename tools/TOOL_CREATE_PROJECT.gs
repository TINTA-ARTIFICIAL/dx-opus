/**
 * TOOL_CREATE_PROJECT.gs
 * D-X-OPUS Enhanced Project Setup
 * Version: 1.1.0 (fix: flat folder structure compatibility)
 *
 * DESCRIPTION:
 *   Creates a complete D-X-OPUS project in Google Drive with:
 *   - Folder structure under D-X-OPUS/projects/
 *   - PROJECT_README.md (pre-filled)
 *   - PROMPTS_PACKAGE.md (for Claude project knowledge)
 *   - PROJECT_CONFIG.md (project-specific config)
 *
 * USAGE:
 *   createProject("TA", "Bottom Up")
 *
 * PREREQUISITES:
 *   Run TOOL_SETUP_EDITOR_ENVIRONMENT.gs first (creates D-X-OPUS/ flat structure).
 *
 * CHANGELOG:
 *   v1.1.0 - Fix: adapted to flat folder structure (prompts/, templates/, resources/, tools/)
 *            Fix: ESSENTIAL_PROMPTS updated to match installed package files
 *            Fix: validateSetup() uses flat structure checks
 *            Fix: generatePromptsPackage() reads from flat prompts/ folder
 *            Fix: syntax error in generateProjectReadme() (unclosed string)
 *            Fix: EDITOR_PROFILE handling made optional (not required for project creation)
 */

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  // Root folder name in Drive (created by TOOL_SETUP_EDITOR_ENVIRONMENT)
  DRIVE_ROOT: "D-X-OPUS",
  
  // Projects subfolder
  PROJECTS_FOLDER: "projects",
  
  // Default EDITOR_PROFILE filename (optional – set to null if not yet created)
  DEFAULT_EDITOR_PROFILE: "EDITOR_PROFILE_MARCO_LAUCELLI.md",
  
  // System version
  SYSTEM_VERSION: "R1",
  
  // Prompts to include in PROMPTS_PACKAGE.md
  // Must match files actually installed by TOOL_SETUP_EDITOR_ENVIRONMENT
  ESSENTIAL_PROMPTS: [
    "PROMPT_PROJECT_DISCOVERY.md",
    "PROMPT_SUMMARIZE_REFERENCES.md",
    "PROMPT_CREATE_RESEARCH_PLAN.md",
    "PROMPT_WRITE_POST.md",
    "PROMPT_WRITE_CHAPTER.md",
    "PROMPT_CREATE_BOOK_INDEX.md",
    "PROMPT_CREATE_BOOK_BRIEF.md",
    "PROMPT_WRITE_SAMPLE_CHAPTER.md",
    "PROMPT_WRITE_INTRODUCTION.md",
    "PROMPT_EVALUATE_BOOK_STYLE.md",
    "PROMPT_EVALUATE_BOOK_CONTENT.md",
    "PROMPT_EVALUATE_POST.md"
  ]
};

// ═══════════════════════════════════════════════════════════════
// MAIN FUNCTION: CREATE PROJECT
// ═══════════════════════════════════════════════════════════════

/**
 * Creates a complete project structure.
 * @param {string} projectCode   - Short code e.g. "TA", "ML"
 * @param {string} projectName   - Full name e.g. "Bottom Up"
 * @param {string} editorProfile - EDITOR_PROFILE filename (optional)
 */
function createProject(projectCode, projectName, editorProfile) {
  projectCode   = projectCode   || "TEST";
  projectName   = projectName   || "Test Project";
  editorProfile = editorProfile || null;

  try {
    Logger.log("🚀 Iniciando creación de proyecto " + projectCode + " - " + projectName);
    
    // Validate setup
    const validation = validateSetup();
    if (!validation.valid) {
      throw new Error("Setup incompleto: " + validation.error);
    }
    
    // Create folder structure in Drive
    const driveResult = createProjectStructure(projectCode, projectName);
    Logger.log("✅ Estructura Drive creada: " + driveResult.url);
    
    // Generate PROJECT_README
    const readmeContent = generateProjectReadme(projectCode, projectName, editorProfile);
    createProjectFile(driveResult.folder, "PROJECT_README.md", readmeContent);
    Logger.log("✅ PROJECT_README generado");
    
    // Generate PROMPTS_PACKAGE for Claude knowledge
    const promptsPackage = generatePromptsPackage(projectCode, projectName, editorProfile);
    createProjectFile(driveResult.folder, "PROMPTS_PACKAGE.md", promptsPackage);
    Logger.log("✅ PROMPTS_PACKAGE generado");
    
    // Generate PROJECT_CONFIG
    const projectConfig = generateProjectConfig(projectCode, projectName, editorProfile, driveResult);
    createProjectFile(driveResult.folder, "PROJECT_CONFIG.md", projectConfig);
    Logger.log("✅ PROJECT_CONFIG generado");
    
    // Final result
    const result = {
      success:      true,
      projectCode:  projectCode,
      projectName:  projectName,
      driveUrl:     driveResult.url,
      driveId:      driveResult.id,
      promptsReady: true,
      configReady:  true,
      nextSteps:    generateNextSteps(driveResult.url, projectCode)
    };
    
    Logger.log("🎉 PROYECTO CREADO EXITOSAMENTE");
    Logger.log("📁 Drive: " + result.driveUrl);
    Logger.log("🔗 ID: " + result.driveId);
    Logger.log("📋 Carga PROMPTS_PACKAGE.md en el Project Knowledge de Claude");
    
    return result;
    
  } catch (error) {
    Logger.log("❌ Error creando proyecto: " + error.toString());
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════
// SETUP VALIDATION
// ═══════════════════════════════════════════════════════════════

/**
 * Validates that TOOL_SETUP_EDITOR_ENVIRONMENT has been run first.
 * Checks for flat folder structure: D-X-OPUS/prompts/, D-X-OPUS/projects/
 */
function validateSetup() {
  try {
    // Check root folder exists
    const rootFolders = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT);
    if (!rootFolders.hasNext()) {
      return { valid: false, error: "Carpeta " + CONFIG.DRIVE_ROOT + " no encontrada en Drive. Ejecuta TOOL_SETUP_EDITOR_ENVIRONMENT primero." };
    }
    const rootFolder = rootFolders.next();
    
    // Check flat prompts/ folder (created by TOOL_SETUP_EDITOR_ENVIRONMENT v1.1+)
    const promptsFolder = getSubfolder(rootFolder, "prompts");
    if (!promptsFolder) {
      return { valid: false, error: "Carpeta 'prompts' no encontrada en " + CONFIG.DRIVE_ROOT + ". Ejecuta TOOL_SETUP_EDITOR_ENVIRONMENT primero." };
    }
    
    // Check PROMPT_PROJECT_DISCOVERY exists (critical prompt)
    const discoveryFiles = promptsFolder.getFilesByName("PROMPT_PROJECT_DISCOVERY.md");
    if (!discoveryFiles.hasNext()) {
      return { valid: false, error: "PROMPT_PROJECT_DISCOVERY.md no encontrado en prompts/. Reinstala con TOOL_SETUP_EDITOR_ENVIRONMENT." };
    }
    
    Logger.log("✅ Validación del setup completada exitosamente");
    return { valid: true };
    
  } catch (error) {
    return { valid: false, error: "Error en validación: " + error.toString() };
  }
}

// ═══════════════════════════════════════════════════════════════
// DRIVE STRUCTURE CREATION
// ═══════════════════════════════════════════════════════════════

function createProjectStructure(projectCode, projectName) {
  const rootFolder = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
  let projectsFolder = getSubfolder(rootFolder, CONFIG.PROJECTS_FOLDER);
  
  if (!projectsFolder) {
    projectsFolder = rootFolder.createFolder(CONFIG.PROJECTS_FOLDER);
    Logger.log("📁 Carpeta projects creada");
  }
  
  const projectFolderName = projectCode + "_" + projectName.replace(/[^a-zA-Z0-9]/g, "_");
  const projectFolder     = projectsFolder.createFolder(projectFolderName);
  
  const subfolders = [
    "_discovery",
    "R_research",
    "WB_writing_book",
    "WP_writing_post",
    "A_activation",
    "config"
  ];
  
  subfolders.forEach(function(folderName) {
    projectFolder.createFolder(folderName);
  });
  
  Logger.log("📁 Estructura creada: " + projectFolderName);
  
  return {
    folder: projectFolder,
    id:     projectFolder.getId(),
    url:    "https://drive.google.com/drive/folders/" + projectFolder.getId(),
    name:   projectFolderName
  };
}

// ═══════════════════════════════════════════════════════════════
// ARTIFACT GENERATION
// ═══════════════════════════════════════════════════════════════

function generateProjectReadme(projectCode, projectName, editorProfile) {
  const today       = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const profileName = editorProfile || CONFIG.DEFAULT_EDITOR_PROFILE || "no_definido";
  
  return [
    "# PROJECT_README :: " + projectCode + " – " + projectName,
    "",
    "---",
    "project_code:     " + projectCode,
    "project_name:     " + projectName,
    "start_date:       " + today,
    "editor_profile:   " + profileName.replace(".md", ""),
    "last_updated:     " + today,
    "system_version:   " + CONFIG.SYSTEM_VERSION,
    "---",
    "",
    "## ENTORNO DEL EDITOR",
    "",
    "| Artefacto | Ubicación | Estado |",
    "|---|---|---|",
    "| " + profileName + " | Claude project knowledge | ✅ Cargado |",
    "| PROMPTS_PACKAGE | Claude project knowledge | ✅ Cargado |",
    "| WRITING_CONTEXT | config/ | ❌ Se crea en primera sesión POST |",
    "| PROJECT_NOTES | _discovery/ | ❌ Se crea con PROMPT_PROJECT_DISCOVERY |",
    "",
    "## ESTADO DE WORKFLOWS",
    "",
    "| Workflow | Estado | Último artefacto | Última sesión | Próxima tarea |",
    "|---|---|---|---|---|",
    "| Research | `no_iniciado` | - | - | Aportar referencias → `PROMPT_SUMMARIZE_REFERENCES` |",
    "| Writing Book | `no_iniciado` | - | - | Requiere RESEARCH_REPORT previo |",
    "| Writing Post | `no_iniciado` | - | - | Abrir sesión → `PROMPT_POST_BRIEF` |",
    "| Activation | `no_iniciado` | - | - | Requiere corpus definido previo |",
    "",
    "## ESTRUCTURA EN DRIVE",
    "",
    "```",
    projectCode + "_" + projectName.replace(/[^a-zA-Z0-9]/g, "_") + "/",
    "├── _discovery/          # Material pre-workflow",
    "├── R_research/",
    "├── WB_writing_book/",
    "├── WP_writing_post/",
    "├── A_activation/",
    "├── config/",
    "└── PROJECT_README.md",
    "```",
    "",
    "## CÓMO ACTUALIZAR ESTE DOCUMENTO",
    "",
    "Actualizar la tabla de workflows al cierre de cada sesión significativa:",
    "",
    "1. Cambiar el estado del workflow activo",
    "2. Anotar el último artefacto producido y su versión",
    "3. Actualizar `last_updated` en la cabecera",
    "4. Anotar la próxima tarea recomendada",
    "",
    "---",
    "",
    "*PROJECT_README generado automáticamente el " + today + " por D-X-OPUS " + CONFIG.SYSTEM_VERSION + "*"
  ].join("\n");
}

/**
 * Generates PROMPTS_PACKAGE.md by reading all essential prompts
 * from the flat D-X-OPUS/prompts/ folder.
 */
function generatePromptsPackage(projectCode, projectName, editorProfile) {
  const header = [
    "# PROMPTS PACKAGE - D-X-OPUS " + CONFIG.SYSTEM_VERSION,
    "",
    "**Proyecto:** " + (projectCode || "") + " — " + (projectName || ""),
    "**Sistema:** D-X-OPUS " + CONFIG.SYSTEM_VERSION,
    "",
    "Este documento contiene todos los prompts esenciales del sistema D-X-OPUS.",
    "**INSTRUCCIONES:** Cargar este documento completo en el Project Knowledge del proyecto Claude.",
    "",
    "---",
    ""
  ];
  
  let packageLines = header.slice();
  
  // Read from flat D-X-OPUS/prompts/ folder
  const rootFolder    = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
  const promptsFolder = getSubfolder(rootFolder, "prompts");
  
  if (!promptsFolder) {
    Logger.log("❌ Carpeta prompts/ no encontrada - package generado sin prompts");
    return packageLines.join("\n");
  }
  
  CONFIG.ESSENTIAL_PROMPTS.forEach(function(promptName) {
    try {
      const promptFiles = promptsFolder.getFilesByName(promptName);
      if (promptFiles.hasNext()) {
        const file    = promptFiles.next();
        const content = file.getBlob().getDataAsString();
        
        packageLines.push("## " + promptName);
        packageLines.push("");
        packageLines.push(content);
        packageLines.push("");
        packageLines.push("---");
        packageLines.push("");
        
        Logger.log("📄 Prompt añadido al package: " + promptName);
      } else {
        Logger.log("⚠️ Prompt no encontrado (omitido): " + promptName);
      }
    } catch (error) {
      Logger.log("❌ Error leyendo prompt " + promptName + ": " + error.toString());
    }
  });
  
  // Optionally include EDITOR_PROFILE if it exists in prompts/
  const profileName = editorProfile || CONFIG.DEFAULT_EDITOR_PROFILE;
  if (profileName) {
    try {
      const profileFiles = promptsFolder.getFilesByName(profileName);
      if (profileFiles.hasNext()) {
        const profileFile    = profileFiles.next();
        const profileContent = profileFile.getBlob().getDataAsString();
        
        packageLines.push("## " + profileName);
        packageLines.push("");
        packageLines.push(profileContent);
        packageLines.push("");
        packageLines.push("---");
        packageLines.push("");
        
        Logger.log("📄 EDITOR_PROFILE añadido al package");
      } else {
        Logger.log("⚠️ EDITOR_PROFILE no encontrado en prompts/ (omitido del package). Cárgalo manualmente si lo tienes.");
      }
    } catch (error) {
      Logger.log("⚠️ No se pudo leer EDITOR_PROFILE: " + error.toString());
    }
  }
  
  return packageLines.join("\n");
}

function generateProjectConfig(projectCode, projectName, editorProfile, driveResult) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  
  return [
    "# PROJECT_CONFIG :: " + projectCode + " – " + projectName,
    "",
    "**Generado:** " + today,
    "**Sistema:** D-X-OPUS " + CONFIG.SYSTEM_VERSION,
    "",
    "## INFORMACIÓN DEL PROYECTO",
    "",
    "```yaml",
    "project_code: " + projectCode,
    "project_name: " + projectName,
    "created_date: " + today,
    "drive_url: " + driveResult.url,
    "drive_id: " + driveResult.id,
    "editor_profile: " + (editorProfile || CONFIG.DEFAULT_EDITOR_PROFILE || "no_definido"),
    "```",
    "",
    "## CONFIGURACIÓN DE AUTO-SAVE",
    "",
    "| Artefacto | Ubicación | Naming pattern |",
    "|---|---|---|",
    "| POST_SEED | WP_writing_post/ | POST_SEED_[nombre]_v[X.Y].md |",
    "| WRITING_CONTEXT | config/ | WRITING_CONTEXT_[id].md |",
    "| PROJECT_NOTES | _discovery/ | PROJECT_NOTES.md |",
    "| RESEARCH_REPORT | R_research/ | " + projectCode + "_R_REPORT_[tipo]_v[X.Y].md |",
    "",
    "## ENLACES RÁPIDOS",
    "",
    "- **Carpeta principal:** " + driveResult.url,
    "- **Discovery:** navegar a _discovery/",
    "- **Writing Post:** navegar a WP_writing_post/",
    "- **Research:** navegar a R_research/",
    "",
    "## ESTADO INICIAL",
    "",
    "- [ ] PROMPT_PROJECT_DISCOVERY ejecutado",
    "- [ ] WRITING_CONTEXT creado",
    "- [ ] Primer workflow iniciado",
    "",
    "---",
    "",
    "*Configuración generada automáticamente por D-X-OPUS*"
  ].join("\n");
}

function generateNextSteps(driveUrl, projectCode) {
  return [
    "PRÓXIMOS PASOS PARA ACTIVAR EL PROYECTO:",
    "",
    "1. **Claude Project Setup:**",
    "   - Crear nuevo proyecto Claude: '" + projectCode + " - Writing Project'",
    "   - Cargar PROMPTS_PACKAGE.md en Project Knowledge",
    "   - Si tienes EDITOR_PROFILE, cargarlo también",
    "",
    "2. **Primera sesión:**",
    "   - Ejecutar PROMPT_PROJECT_DISCOVERY",
    "   - Definir tipo de proyecto y workflow inicial",
    "",
    "3. **Drive:** " + driveUrl,
    "",
    "PROYECTO LISTO EN 2-3 MINUTOS."
  ].join("\n");
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function getSubfolder(parentFolder, subfolderName) {
  const subfolders = parentFolder.getFoldersByName(subfolderName);
  return subfolders.hasNext() ? subfolders.next() : null;
}

function createProjectFile(folder, filename, content) {
  const blob = Utilities.newBlob(content, 'text/plain', filename);
  const file = folder.createFile(blob);
  return { file: file, id: file.getId(), url: file.getUrl() };
}

// ═══════════════════════════════════════════════════════════════
// TEST & UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function testSetup() {
  Logger.log("🧪 Iniciando test del setup...");
  const validation = validateSetup();
  if (validation.valid) {
    Logger.log("✅ Setup válido - listo para crear proyectos");
    return true;
  } else {
    Logger.log("❌ Setup incompleto: " + validation.error);
    return false;
  }
}

function testConnection() {
  try {
    const folders = DriveApp.getFolders();
    Logger.log("✅ Conexión a Google Drive exitosa");
    Logger.log("📁 Carpetas accesibles: " + (folders.hasNext() ? "Sí" : "No"));
    return true;
  } catch (error) {
    Logger.log("❌ Error de conexión: " + error.toString());
    return false;
  }
}

/**
 * Entry point for creating the TA_Bottom_Up project.
 * Run this function from the Apps Script editor.
 */
function runCreateProject() {
  createProject("TA", "Bottom Up");
}
