/**
 * D-X-OPUS ENHANCED PROJECT SETUP
 * 
 * Google Apps Script para creación automática de proyectos con:
 * - Estructura de carpetas en Drive
 * - Auto-carga de prompts desde repositorio del sistema
 * - Configuración de PROJECT_README pre-completado
 * - Linking automático con configuración del editor
 * 
 * Versión: 1.0 Enhanced
 * Fecha: 2026-05-04
 * Uso: Una vez completado el setup inicial del editor
 */

// ============================================================
// CONFIGURACIÓN GLOBAL
// ============================================================

/**
 * Configuración principal del sistema.
 * IMPORTANTE: Actualizar estas rutas según tu setup personal.
 */
const CONFIG = {
  // Carpeta raíz de D-X-OPUS en tu Drive
  DRIVE_ROOT: "D-X-OPUS",
  
  // Subcarpetas del sistema
  SYSTEM_FOLDER: "_system",
  EDITOR_FOLDER: "_editor", 
  PROJECTS_FOLDER: "projects",
  
  // Tu EDITOR_PROFILE principal (cambiar por el tuyo)
  DEFAULT_EDITOR_PROFILE: "EDITOR_PROFILE_MARCO_LAUCELLI.md",
  
  // Versión del sistema
  SYSTEM_VERSION: "R1",
  
  // Prompts esenciales que se cargan en cada proyecto
  ESSENTIAL_PROMPTS: [
    "PROMPT_WRITE_POST.md",
    "PROMPT_POST_BRIEF.md", 
    "PROMPT_QA_IDEAS.md",
    "PROMPT_PLAN_POST.md",
    "PROMPT_SUMMARIZE_REFERENCES.md",
    "TEMPLATE_POST_SEED.md",
    "RESOURCE_WRITING_CONTEXT.md",
    "RESOURCE_PUBLICATION_PROFILE.md"
  ]
};

// ============================================================
// FUNCIÓN PRINCIPAL: CREAR PROYECTO
// ============================================================

/**
 * Función principal para crear un proyecto completo.
 * 
 * @param {string} projectCode - Código del proyecto (ej. "TA", "ML", "BOOK01")
 * @param {string} projectName - Nombre del proyecto (ej. "Bottom Up", "Machine Learning")
 * @param {string} editorProfile - EDITOR_PROFILE a usar (opcional, usa default si no se especifica)
 */
function createProject(projectCode = "TEST", projectName = "Test Project", editorProfile = null) {
  try {
    Logger.log("🚀 Iniciando creación de proyecto " + projectCode + " - " + projectName);
    
    // Validar configuración
    const validation = validateSetup();
    if (!validation.valid) {
      throw new Error("Setup incompleto: " + validation.error);
    }
    
    // Crear estructura en Drive
    const driveResult = createProjectStructure(projectCode, projectName);
    Logger.log("✅ Estructura Drive creada: " + driveResult.url);
    
    // Crear PROJECT_README
    const readmeContent = generateProjectReadme(projectCode, projectName, editorProfile);
    createProjectFile(driveResult.folder, "PROJECT_README.md", readmeContent);
    Logger.log("✅ PROJECT_README generado");
    
    // Crear package de prompts para Claude
    const promptsPackage = generatePromptsPackage();
    const packageInfo = createProjectFile(driveResult.folder, "PROMPTS_PACKAGE.md", promptsPackage);
    Logger.log("✅ Package de prompts generado");
    
    // Crear configuración de proyecto
    const projectConfig = generateProjectConfig(projectCode, projectName, editorProfile, driveResult);
    createProjectFile(driveResult.folder, "PROJECT_CONFIG.md", projectConfig);
    Logger.log("✅ Configuración de proyecto generada");
    
    // Actualizar EDITOR_CONFIG con el nuevo proyecto
    const configUpdateResult = updateEditorConfig(projectCode, projectName, driveResult);
    Logger.log("✅ EDITOR_CONFIG actualizado");
    
    // Resultado final
    const result = {
      success: true,
      projectCode: projectCode,
      projectName: projectName,
      driveUrl: driveResult.url,
      driveId: driveResult.id,
      promptsReady: true,
      configReady: true,
      editorConfigUpdated: configUpdateResult.success,
      nextSteps: generateNextSteps(driveResult.url, projectCode)
    };
    
    Logger.log("🎉 PROYECTO CREADO EXITOSAMENTE");
    Logger.log("📁 Drive: " + result.driveUrl);
    Logger.log("🔗 ID: " + result.driveId);
    Logger.log("🔧 EDITOR_CONFIG: " + (configUpdateResult.success ? "actualizado" : "error"));
    
    return result;
    
  } catch (error) {
    Logger.log("❌ Error creando proyecto: " + error.toString());
    throw error;
  }
}

// ============================================================
// VALIDACIÓN DEL SETUP
// ============================================================

/**
 * Valida que el setup inicial esté completo.
 */
function validateSetup() {
  try {
    // Verificar carpeta raíz
    const rootFolders = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT);
    if (!rootFolders.hasNext()) {
      return { valid: false, error: "Carpeta " + CONFIG.DRIVE_ROOT + " no encontrada en Drive" };
    }
    
    const rootFolder = rootFolders.next();
    
    // Verificar subcarpetas esenciales
    const systemFolder = getSubfolder(rootFolder, CONFIG.SYSTEM_FOLDER);
    if (!systemFolder) {
      return { valid: false, error: "Carpeta " + CONFIG.SYSTEM_FOLDER + " no encontrada" };
    }
    
    const editorFolder = getSubfolder(rootFolder, CONFIG.EDITOR_FOLDER);
    if (!editorFolder) {
      return { valid: false, error: "Carpeta " + CONFIG.EDITOR_FOLDER + " no encontrada" };
    }
    
    // Verificar EDITOR_PROFILE
    const profilesFolder = getSubfolder(editorFolder, "profiles");
    if (!profilesFolder) {
      return { valid: false, error: "Carpeta profiles no encontrada en " + CONFIG.EDITOR_FOLDER };
    }
    
    const profileFiles = profilesFolder.getFilesByName(CONFIG.DEFAULT_EDITOR_PROFILE);
    if (!profileFiles.hasNext()) {
      return { valid: false, error: "EDITOR_PROFILE " + CONFIG.DEFAULT_EDITOR_PROFILE + " no encontrado" };
    }
    
    // Verificar prompts esenciales
    const promptsFolder = getSubfolder(systemFolder, "prompts");
    if (!promptsFolder) {
      return { valid: false, error: "Carpeta prompts no encontrada en " + CONFIG.SYSTEM_FOLDER };
    }
    
    let missingPrompts = [];
    CONFIG.ESSENTIAL_PROMPTS.forEach(function(promptName) {
      const promptFiles = promptsFolder.getFilesByName(promptName);
      if (!promptFiles.hasNext()) {
        missingPrompts.push(promptName);
      }
    });
    
    if (missingPrompts.length > 0) {
      return { valid: false, error: "Prompts faltantes: " + missingPrompts.join(", ") };
    }
    
    Logger.log("✅ Validación del setup completada exitosamente");
    return { valid: true };
    
  } catch (error) {
    return { valid: false, error: "Error en validación: " + error.toString() };
  }
}

// ============================================================
// CREACIÓN DE ESTRUCTURA EN DRIVE
// ============================================================

/**
 * Crea la estructura de carpetas del proyecto en Drive.
 */
function createProjectStructure(projectCode, projectName) {
  // Obtener carpeta de proyectos
  const rootFolder = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
  let projectsFolder = getSubfolder(rootFolder, CONFIG.PROJECTS_FOLDER);
  
  if (!projectsFolder) {
    projectsFolder = rootFolder.createFolder(CONFIG.PROJECTS_FOLDER);
    Logger.log("📁 Carpeta projects creada");
  }
  
  // Crear carpeta del proyecto
  const projectFolderName = projectCode + "_" + projectName.replace(/[^a-zA-Z0-9]/g, "_");
  const projectFolder = projectsFolder.createFolder(projectFolderName);
  
  // Crear subcarpetas de workflow
  const subfolders = [
    "_discovery",       // Nueva: material pre-workflow
    "R_research", 
    "WB_writing_book", 
    "WP_writing_post", 
    "A_activation",
    "config"           // Configuración específica del proyecto
  ];
  
  subfolders.forEach(function(folderName) {
    projectFolder.createFolder(folderName);
  });
  
  Logger.log("📁 Estructura creada: " + projectFolderName);
  
  return {
    folder: projectFolder,
    id: projectFolder.getId(),
    url: "https://drive.google.com/drive/folders/" + projectFolder.getId(),
    name: projectFolderName
  };
}

// ============================================================
// GENERACIÓN DE ARTEFACTOS
// ============================================================

/**
 * Genera el PROJECT_README específico del proyecto.
 */
function generateProjectReadme(projectCode, projectName, editorProfile) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const profileName = editorProfile || CONFIG.DEFAULT_EDITOR_PROFILE;
  
  return [
    "# PROJECT_README :: " + projectCode + " — " + projectName,
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
    "| " + profileName + " | Drive + Claude project knowledge | ✅ Cargado |",
    "| PROMPTS_PACKAGE | Claude project knowledge | ✅ Cargado |",
    "| WRITING_CONTEXT | config/ | ❌ Se crea en primera sesión POST |",
    "| PROJECT_NOTES | _discovery/ | ❌ Se crea con PROMPT_PROJECT_DISCOVERY |",
    "",
    "## ESTADO DE WORKFLOWS",
    "",
    "| Workflow | Estado | Último artefacto | Última sesión | Próxima tarea |",
    "|---|---|---|---|---|
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
    "Estados posibles por workflow:",
    "",
    "- **Research:** `no_iniciado` · `en_curso` · `completado`",
    "- **Writing Book:** `no_iniciado` · `índice_aprobado` · `muestra_aprobada` · `en_escritura` · `completado`",
    "- **Writing Post:** `no_iniciado` · `activo`",
    "- **Activation:** `no_iniciado` · `en_curso` · `completado`",
    "",
    "---",
    "",
    "*PROJECT_README generado automáticamente el " + today + " por D-X-OPUS " + CONFIG.SYSTEM_VERSION + "*"
  ].join("\n");
}

/**
 * Genera el package completo de prompts para cargar en Claude.
 */
function generatePromptsPackage() {
  let package = [
    "# PROMPTS PACKAGE - D-X-OPUS R1",
    "",
    "Este documento contiene todos los prompts esenciales del sistema D-X-OPUS.",
    "**INSTRUCCIONES:** Cargar este documento completo en el Project Knowledge del proyecto Claude.",
    "",
    "---",
    ""
  ];
  
  // Obtener carpeta de prompts
  const rootFolder = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
  const systemFolder = getSubfolder(rootFolder, CONFIG.SYSTEM_FOLDER);
  const promptsFolder = getSubfolder(systemFolder, "prompts");
  
  // Leer cada prompt esencial
  CONFIG.ESSENTIAL_PROMPTS.forEach(function(promptName) {
    try {
      const promptFiles = promptsFolder.getFilesByName(promptName);
      if (promptFiles.hasNext()) {
        const file = promptFiles.next();
        const content = file.getBlob().getDataAsString();
        
        package.push("## " + promptName);
        package.push("");
        package.push(content);
        package.push("");
        package.push("---");
        package.push("");
        
        Logger.log("📄 Prompt añadido al package: " + promptName);
      } else {
        Logger.log("⚠️ Prompt no encontrado: " + promptName);
      }
    } catch (error) {
      Logger.log("❌ Error leyendo prompt " + promptName + ": " + error.toString());
    }
  });
  
  // Añadir EDITOR_PROFILE
  try {
    const editorFolder = getSubfolder(rootFolder, CONFIG.EDITOR_FOLDER);
    const profilesFolder = getSubfolder(editorFolder, "profiles");
    const profileFiles = profilesFolder.getFilesByName(CONFIG.DEFAULT_EDITOR_PROFILE);
    
    if (profileFiles.hasNext()) {
      const profileFile = profileFiles.next();
      const profileContent = profileFile.getBlob().getDataAsString();
      
      package.push("## " + CONFIG.DEFAULT_EDITOR_PROFILE);
      package.push("");
      package.push(profileContent);
      package.push("");
      package.push("---");
      package.push("");
      
      Logger.log("📄 EDITOR_PROFILE añadido al package");
    }
  } catch (error) {
    Logger.log("❌ Error añadiendo EDITOR_PROFILE: " + error.toString());
  }
  
  return package.join("\n");
}

/**
 * Genera la configuración específica del proyecto.
 */
function generateProjectConfig(projectCode, projectName, editorProfile, driveResult) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  
  return [
    "# PROJECT_CONFIG :: " + projectCode + " — " + projectName,
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
    "editor_profile: " + (editorProfile || CONFIG.DEFAULT_EDITOR_PROFILE),
    "```",
    "",
    "## CONFIGURACIÓN DE AUTO-SAVE",
    "",
    "Artefactos que se guardan automáticamente:",
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
    "- **Discovery:** " + driveResult.url + " (navegar a _discovery/)",
    "- **Writing Post:** " + driveResult.url + " (navegar a WP_writing_post/)",
    "- **Research:** " + driveResult.url + " (navegar a R_research/)",
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

/**
 * Genera las instrucciones de siguientes pasos.
 */
function generateNextSteps(driveUrl, projectCode) {
  return [
    "PRÓXIMOS PASOS PARA ACTIVAR EL PROYECTO:",
    "",
    "1. **Claude Project Setup:**",
    "   - Crear nuevo proyecto Claude: '" + projectCode + " - Writing Project'",
    "   - Cargar PROMPTS_PACKAGE.md en Project Knowledge",
    "   - Copiar Project Instructions desde template",
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

// ============================================================
// UTILIDADES
// ============================================================

/**
 * Obtiene una subcarpeta por nombre.
 */
function getSubfolder(parentFolder, subfolderName) {
  const subfolders = parentFolder.getFoldersByName(subfolderName);
  return subfolders.hasNext() ? subfolders.next() : null;
}

/**
 * Crea un archivo en una carpeta.
 */
function createProjectFile(folder, filename, content) {
  const blob = Utilities.newBlob(content, 'text/plain', filename);
  const file = folder.createFile(blob);
  
  return {
    file: file,
    id: file.getId(),
    url: file.getUrl()
  };
}

/**
 * Función de test para validar el setup.
 */
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

/**
 * Función de test para crear proyecto de prueba.
 */
function testCreateProject() {
  try {
    const result = createProject("TEST", "Test Project");
    Logger.log("✅ Test exitoso: " + result.driveUrl);
    return result;
  } catch (error) {
    Logger.log("❌ Test falló: " + error.toString());
    return false;
  }
}

/**
 * Función de conexión simple para validar permisos.
 */
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

// ============================================================
// FUNCIONES DE CONFIGURACIÓN RÁPIDA
// ============================================================

/**
 * Configuración rápida para usuarios específicos.
 * Cambiar según el editor que esté configurando el sistema.
 */
function quickSetupMarco() {
  CONFIG.DEFAULT_EDITOR_PROFILE = "EDITOR_PROFILE_MARCO_LAUCELLI.md";
  Logger.log("⚙️ Configuración ajustada para Marco Laucelli");
}

function quickSetupAna() {
  CONFIG.DEFAULT_EDITOR_PROFILE = "EDITOR_PROFILE_ANA_TORRES.md";
  Logger.log("⚙️ Configuración ajustada para Ana Torres");
}

/**
 * Función para actualizar configuración personalizada.
 */
function updateConfig(newEditorProfile) {
  CONFIG.DEFAULT_EDITOR_PROFILE = newEditorProfile;
  Logger.log("⚙️ EDITOR_PROFILE actualizado a: " + newEditorProfile);
}

// ============================================================
// GESTIÓN DE EDITOR_CONFIG
// ============================================================

/**
 * Actualiza el EDITOR_CONFIG.md del editor con el nuevo proyecto creado.
 */
function updateEditorConfig(projectCode, projectName, driveResult) {
  try {
    Logger.log("🔧 Actualizando EDITOR_CONFIG...");
    
    // Obtener carpeta de configuración del editor
    const rootFolder = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
    const editorFolder = getSubfolder(rootFolder, CONFIG.EDITOR_FOLDER);
    const configFolder = getSubfolder(editorFolder, "config");
    
    if (!configFolder) {
      Logger.log("⚠️ Carpeta config no encontrada - EDITOR_CONFIG no se puede actualizar");
      return { success: false, error: "config folder not found" };
    }
    
    // Buscar archivo EDITOR_CONFIG.md
    const configFiles = configFolder.getFilesByName("EDITOR_CONFIG.md");
    if (!configFiles.hasNext()) {
      Logger.log("⚠️ EDITOR_CONFIG.md no encontrado - crear uno primero");
      return { success: false, error: "EDITOR_CONFIG.md not found" };
    }
    
    const configFile = configFiles.next();
    const currentContent = configFile.getBlob().getDataAsString();
    
    // Actualizar contenido
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    const projectFolderName = projectCode + "_" + projectName.replace(/[^a-zA-Z0-9]/g, "_");
    
    // Preparar nueva entrada de proyecto
    const newProjectEntry = `| ${projectCode} | ${projectName} | activo | system | ${today} | ${driveResult.url} |`;
    
    // Buscar y actualizar la tabla de proyectos
    let updatedContent = currentContent;
    
    // Actualizar last_config_update
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
    updatedContent = updatedContent.replace(
      /last_config_update:\s+.*/,
      `last_config_update:      ${timestamp}`
    );
    
    // Actualizar last_project_created
    updatedContent = updatedContent.replace(
      /last_project_created:\s+.*/,
      `last_project_created:    ${today}`
    );
    
    // Añadir proyecto a la tabla (buscar la línea de ejemplo y añadir después)
    const tableHeaderPattern = /\| Código \| Nombre \| Estado \| Workflow \| Última sesión \| Drive URL \|[\s\S]*?\|[\s-]+\|[\s-]+\|[\s-]+\|[\s-]+\|[\s-]+\|[\s-]+\|/;
    const tableMatch = updatedContent.match(tableHeaderPattern);
    
    if (tableMatch) {
      const insertionPoint = tableMatch.index + tableMatch[0].length;
      updatedContent = updatedContent.slice(0, insertionPoint) + 
                      '\n' + newProjectEntry + 
                      updatedContent.slice(insertionPoint);
    } else {
      Logger.log("⚠️ No se pudo encontrar tabla de proyectos para actualizar");
    }
    
    // Actualizar contador de proyectos
    const projectCountPattern = /total_projects:\s+(\d+)/;
    const countMatch = updatedContent.match(projectCountPattern);
    if (countMatch) {
      const currentCount = parseInt(countMatch[1]);
      updatedContent = updatedContent.replace(
        projectCountPattern,
        `total_projects:          ${currentCount + 1}`
      );
      
      // También actualizar active_projects
      updatedContent = updatedContent.replace(
        /active_projects:\s+(\d+)/,
        `active_projects:         ${currentCount + 1}`
      );
    }
    
    // Guardar contenido actualizado
    configFile.setContent(updatedContent);
    
    Logger.log("✅ EDITOR_CONFIG.md actualizado correctamente");
    return { 
      success: true, 
      projectAdded: projectCode,
      timestamp: timestamp
    };
    
  } catch (error) {
    Logger.log("❌ Error actualizando EDITOR_CONFIG: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Función para leer estadísticas del EDITOR_CONFIG (opcional para reportes).
 */
function getEditorStats() {
  try {
    const rootFolder = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT).next();
    const editorFolder = getSubfolder(rootFolder, CONFIG.EDITOR_FOLDER);
    const configFolder = getSubfolder(editorFolder, "config");
    const configFiles = configFolder.getFilesByName("EDITOR_CONFIG.md");
    
    if (!configFiles.hasNext()) {
      return { error: "EDITOR_CONFIG not found" };
    }
    
    const configFile = configFiles.next();
    const content = configFile.getBlob().getDataAsString();
    
    // Extraer estadísticas básicas
    const totalProjectsMatch = content.match(/total_projects:\s+(\d+)/);
    const activeProjectsMatch = content.match(/active_projects:\s+(\d+)/);
    const lastProjectMatch = content.match(/last_project_created:\s+(.+)/);
    
    return {
      totalProjects: totalProjectsMatch ? parseInt(totalProjectsMatch[1]) : 0,
      activeProjects: activeProjectsMatch ? parseInt(activeProjectsMatch[1]) : 0,
      lastProjectCreated: lastProjectMatch ? lastProjectMatch[1].trim() : "unknown",
      configExists: true
    };
    
  } catch (error) {
    return { error: error.toString() };
  }
}
