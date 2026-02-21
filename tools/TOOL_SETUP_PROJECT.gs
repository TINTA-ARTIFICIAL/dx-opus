/*
---
id:          TOOL_SETUP_PROJECT
type:        TOOL
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

CHANGELOG:
v1.0 | 2026-02-21 | JM | Initial version

DEPENDENCIES:
inputs:  projectCode (string), projectName (string), parentFolderId (string, optional)
outputs: Estructura de carpetas en Google Drive

DESCRIPTION:
Google Apps Script que crea la estructura estándar de carpetas para un
proyecto de escritura D-X-OPUS en Google Drive. Ejecutar una vez por
proyecto nuevo desde Google Apps Script (script.google.com).

INSTRUCCIONES DE USO:
1. Ir a script.google.com
2. Crear nuevo proyecto
3. Pegar este código completo
4. Modificar los parámetros en la función main() al final del archivo
5. Ejecutar la función main()
6. Autorizar permisos de Google Drive cuando se solicite
7. Verificar la estructura creada en Drive
*/

// ============================================================
// CONFIGURACIÓN DE ESTRUCTURA
// Modifica esta sección si la estructura estándar cambia.
// ============================================================

const PROJECT_STRUCTURE = {
  "R_research": {
    description: "Workflow de Research — artefactos de investigación",
    subfolders: [
      "01_references",        // Referencias originales aportadas por el editor
      "02_summaries",         // REFERENCE_SUMMARY, RESEARCH_PLAN, NARRATIVE_BRIDGE
      "03_annotated",         // ANNOTATED_REFERENCE_SUMMARY, ANNOTATED_RESEARCH_PLAN
      "04_reports",           // RESEARCH_REPORT(s), RESEARCH_DEEP_DIVE
      "05_evaluations"        // EVALUATION_REPORTs de Research
    ]
  },
  "WB_writing_book": {
    description: "Workflow de Writing Book — artefactos del libro",
    subfolders: [
      "01_index",             // BOOK_INDEX, BOOK_BRIEF (si viene de Activation)
      "02_sample",            // SAMPLE_CHAPTER
      "03_chapters",          // CHAPTER_xx drafts y finales
      "04_specials",          // INTRODUCTION, PROLOGUE, TIMELINE, CAST, REFERENCES
      "05_final"              // Libro completo ensamblado, BOOK_SHEET
    ]
  },
  "WP_writing_post": {
    description: "Workflow de Writing Post — artefactos de posts standalone",
    subfolders: [
      "01_plans",             // POST_PLAN
      "02_drafts",            // POST_DRAFT
      "03_final"              // POST_FINAL, ARTICLE_FINAL, THREAD_FINAL
    ]
  },
  "A_activation": {
    description: "Workflow de Activation — contenido derivado del libro",
    subfolders: [
      "00_context",           // ACTIVATION_CONTEXT, análisis de la colección
      "01_analysis",          // COLLECTION_ANALYSIS
      "02_strategy",          // CONTENT_STRATEGY
      "03_plans",             // POST_PLANs de activación
      "04_content"            // Posts, artículos, threads publicables
    ]
  }
};

// ============================================================
// FUNCIONES PRINCIPALES
// ============================================================

/**
 * Crea la estructura estándar de carpetas para un proyecto D-X-OPUS.
 * 
 * @param {string} projectCode - Código corto del proyecto (ej: "SB", "IA", "ML")
 * @param {string} projectName - Nombre descriptivo del proyecto (ej: "SmartBuildings")
 * @param {string} [parentFolderId] - ID de la carpeta padre en Drive (opcional).
 *                                    Si se omite, se crea en la raíz de Mi unidad.
 * @returns {object} - Objeto con el ID y URL de la carpeta del proyecto creada.
 */
function setupProject(projectCode, projectName, parentFolderId) {
  
  // Validar parámetros
  if (!projectCode || projectCode.length < 2 || projectCode.length > 4) {
    throw new Error("projectCode debe tener entre 2 y 4 caracteres. Ejemplo: 'SB', 'IA'");
  }
  if (!projectName || projectName.length === 0) {
    throw new Error("projectName no puede estar vacío. Ejemplo: 'SmartBuildings'");
  }
  
  // Normalizar código a mayúsculas
  projectCode = projectCode.toUpperCase();
  
  // Nombre de la carpeta raíz del proyecto
  const projectFolderName = projectCode + "_" + projectName;
  
  // Determinar carpeta padre
  let parentFolder;
  if (parentFolderId) {
    try {
      parentFolder = DriveApp.getFolderById(parentFolderId);
    } catch (e) {
      throw new Error("No se pudo acceder a la carpeta padre con ID: " + parentFolderId + ". Verifica el ID.");
    }
  } else {
    parentFolder = DriveApp.getRootFolder();
  }
  
  // Verificar que el proyecto no existe ya
  const existingFolders = parentFolder.getFoldersByName(projectFolderName);
  if (existingFolders.hasNext()) {
    const existing = existingFolders.next();
    Logger.log("⚠️  Ya existe una carpeta con el nombre: " + projectFolderName);
    Logger.log("URL: " + existing.getUrl());
    return { id: existing.getId(), url: existing.getUrl(), created: false };
  }
  
  // Crear carpeta raíz del proyecto
  const projectFolder = parentFolder.createFolder(projectFolderName);
  Logger.log("✅ Creada carpeta raíz: " + projectFolderName);
  
  // Crear README del proyecto
  const readmeContent = createProjectReadme(projectCode, projectName);
  const readmeBlob = Utilities.newBlob(readmeContent, 'text/plain', 'README.md');
  projectFolder.createFile(readmeBlob);
  Logger.log("✅ Creado README.md");
  
  // Crear estructura de subcarpetas
  for (const [workflowFolder, config] of Object.entries(PROJECT_STRUCTURE)) {
    // Crear carpeta de workflow
    const wfFolder = projectFolder.createFolder(workflowFolder);
    Logger.log("  📁 " + workflowFolder + " — " + config.description);
    
    // Crear README de workflow
    const wfReadme = createWorkflowReadme(workflowFolder, config.description, projectCode, projectName);
    const wfReadmeBlob = Utilities.newBlob(wfReadme, 'text/plain', 'README.md');
    wfFolder.createFile(wfReadmeBlob);
    
    // Crear subcarpetas
    for (const subfolder of config.subfolders) {
      wfFolder.createFolder(subfolder);
      Logger.log("    📂 " + subfolder);
    }
  }
  
  const projectUrl = projectFolder.getUrl();
  Logger.log("\n✅ Proyecto creado correctamente.");
  Logger.log("📁 Nombre: " + projectFolderName);
  Logger.log("🔗 URL: " + projectUrl);
  Logger.log("🆔 ID: " + projectFolder.getId());
  
  return {
    id: projectFolder.getId(),
    url: projectUrl,
    name: projectFolderName,
    created: true
  };
}

// ============================================================
// FUNCIONES DE CONTENIDO
// ============================================================

/**
 * Genera el contenido del README para la carpeta raíz del proyecto.
 */
function createProjectReadme(projectCode, projectName) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  return [
    "# Proyecto: " + projectCode + " — " + projectName,
    "",
    "**Sistema:** D-X-OPUS",
    "**Código:** " + projectCode,
    "**Creado:** " + today,
    "",
    "## Estructura de carpetas",
    "",
    "| Carpeta | Workflow | Contenido |",
    "|---------|----------|-----------|",
    "| R_research/ | Research | Investigación: referencias, summaries, reports |",
    "| WB_writing_book/ | Writing Book | Libro: índice, capítulos, textos especiales |",
    "| WP_writing_post/ | Writing Post | Posts standalone: planes, borradores, finales |",
    "| A_activation/ | Activation | Contenido derivado: análisis, estrategia, posts |",
    "",
    "## Naming convention de artefactos",
    "",
    "```",
    "[COD]_[WF]_[TIPO]_[VARIANTE]_v[X.Y].md",
    "",
    "Ejemplos:",
    projectCode + "_R_REF_SUM_v1.0.md",
    projectCode + "_R_RES_REPORT_HIST_v1.0.md",
    projectCode + "_WB_CHAPTER_CH03_FINAL.md",
    projectCode + "_A_POST_PLAN_v1.0.md",
    "```",
    "",
    "## Códigos de workflow",
    "",
    "| Código | Workflow |",
    "|--------|----------|",
    "| R | Research |",
    "| WB | Writing Book |",
    "| WP | Writing Post |",
    "| A | Activation |",
  ].join("\n");
}

/**
 * Genera el contenido del README para una carpeta de workflow.
 */
function createWorkflowReadme(workflowFolder, description, projectCode, projectName) {
  const workflowCode = workflowFolder.split("_")[0]; // "R", "WB", "WP", "A"
  
  const subfoldersInfo = {
    "R_research": [
      "01_references/ — Referencias originales aportadas por el editor",
      "02_summaries/ — REFERENCE_SUMMARY, RESEARCH_PLAN, NARRATIVE_BRIDGE",
      "03_annotated/ — Versiones anotadas por el editor",
      "04_reports/ — RESEARCH_REPORT(s), RESEARCH_DEEP_DIVE",
      "05_evaluations/ — EVALUATION_REPORTs"
    ],
    "WB_writing_book": [
      "01_index/ — BOOK_INDEX, BOOK_BRIEF de Activation (si aplica)",
      "02_sample/ — SAMPLE_CHAPTER",
      "03_chapters/ — Capítulos: drafts y versiones finales",
      "04_specials/ — Introducción, prólogo, timeline, cast, referencias consolidadas",
      "05_final/ — Libro ensamblado, BOOK_SHEET"
    ],
    "WP_writing_post": [
      "01_plans/ — POST_PLAN",
      "02_drafts/ — POST_DRAFT, ARTICLE_DRAFT, THREAD_DRAFT",
      "03_final/ — Versiones finales publicables"
    ],
    "A_activation": [
      "00_context/ — ACTIVATION_CONTEXT, briefing inicial",
      "01_analysis/ — COLLECTION_ANALYSIS",
      "02_strategy/ — CONTENT_STRATEGY",
      "03_plans/ — POST_PLANs de activación",
      "04_content/ — Posts, artículos, threads finales"
    ]
  };
  
  const lines = [
    "# " + workflowFolder,
    "",
    "**Proyecto:** " + projectCode + " — " + projectName,
    "**Workflow:** " + description,
    "",
    "## Subcarpetas",
    ""
  ];
  
  const subfolders = subfoldersInfo[workflowFolder] || [];
  subfolders.forEach(sf => lines.push("- " + sf));
  
  return lines.join("\n");
}

// ============================================================
// PUNTO DE ENTRADA — MODIFICAR AQUÍ
// ============================================================

/**
 * Función principal. Modifica los parámetros y ejecuta esta función.
 * 
 * PARÁMETROS:
 *   projectCode:    2-4 letras mayúsculas. Identifica el proyecto en los artefactos.
 *   projectName:    Nombre descriptivo sin espacios. Aparece en el nombre de la carpeta.
 *   parentFolderId: (opcional) ID de la carpeta de Drive donde crear el proyecto.
 *                   Para obtener el ID: abrir la carpeta en Drive, el ID es la parte
 *                   final de la URL: drive.google.com/drive/folders/[ID_AQUÍ]
 *                   Si se deja vacío (""), se crea en Mi unidad (raíz).
 */
function main() {
  const projectCode    = "SB";                // ← MODIFICAR
  const projectName    = "SmartBuildings";    // ← MODIFICAR  
  const parentFolderId = "";                  // ← MODIFICAR u omitir
  
  const result = setupProject(projectCode, projectName, parentFolderId || undefined);
  
  if (result.created) {
    Logger.log("\n🎉 Setup completado. Abre el proyecto en Drive:");
    Logger.log(result.url);
  } else {
    Logger.log("\n⚠️  El proyecto ya existía. No se hicieron cambios.");
    Logger.log(result.url);
  }
}
