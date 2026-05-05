/*
---
id:          TOOL_SETUP_EDITOR_ENVIRONMENT
type:        TOOL
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-05-04
updated:     2026-05-04
owner_chat:  system-architecture
---

CHANGELOG:
v1.0 | 2026-05-04 | JM | Initial version - creates D-X-OPUS editor environment

DEPENDENCIES:
inputs:  editorName (string), parentFolderId (string, optional)
outputs: Complete D-X-OPUS editor environment structure in Google Drive

DESCRIPTION:
Google Apps Script que crea la estructura completa del entorno D-X-OPUS
para un editor. Se ejecuta UNA SOLA VEZ al instalar el sistema.
Implementa la arquitectura de dos niveles: NIVEL 1 (Editor setup) + NIVEL 2 (Project creation).

INSTRUCCIONES DE USO:
1. Ir a script.google.com
2. Crear nuevo proyecto
3. Pegar este código completo
4. Modificar los parámetros en la función main() al final del archivo
5. Ejecutar la función main()
6. Autorizar permisos de Google Drive cuando se solicite
7. Verificar la estructura creada en Drive
8. Seguir SETUP_INICIAL_D_X_OPUS.md para completar configuración
*/

// ============================================================
// CONFIGURACIÓN DE ESTRUCTURA D-X-OPUS
// ============================================================

const EDITOR_ENVIRONMENT_STRUCTURE = {
  "_system": {
    description: "Componentes del sistema D-X-OPUS",
    subfolders: [
      "prompts",         // Todos los prompts del sistema
      "templates",       // Templates formales para auto-generación
      "resources",       // Archivos de configuración (AUTO_SAVE_CONFIG.yaml, etc.)
      "tools",          // Scripts de automatización
      "decisions"       // Decision Log entries locales
    ],
    readme_content: `# _system - Componentes D-X-OPUS

Componentes core del sistema D-X-OPUS. Esta carpeta contiene todos los artefactos
reutilizables entre proyectos.

## Subcarpetas

- **prompts/** — Todos los prompts operativos del sistema
- **templates/** — Templates formales para auto-generación de artefactos
- **resources/** — Archivos de configuración (AUTO_SAVE_CONFIG.yaml, etc.)
- **tools/** — Scripts de automatización y herramientas
- **decisions/** — Copias locales de Decision Log entries

## Uso

Los artefactos en _system/ son la base operativa del sistema. Se cargan en 
Claude.ai projects según sea necesario y se mantienen sincronizados con el
repositorio GitHub dx-opus.

## Mantenimiento

- Actualizar periódicamente desde repositorio GitHub
- No modificar directamente - usar chats de desarrollo apropiados
- Backup automático en GitHub
`
  },
  
  "_editor": {
    description: "Configuración personal del editor",
    subfolders: [
      "profiles",       // EDITOR_PROFILE files
      "contexts",       // WRITING_CONTEXT reutilizables 
      "library",        // Biblioteca personal del editor
      "config"          // EDITOR_CONFIG.md y configuración técnica
    ],
    readme_content: `# _editor - Configuración Personal

Configuración específica del editor. Esta carpeta contiene todos los artefactos
personalizados y la biblioteca de contenido del editor.

## Subcarpetas

- **profiles/** — EDITOR_PROFILE files (voz, estilo, preferencias)
- **contexts/** — WRITING_CONTEXT reutilizables para diferentes audiencias
- **library/** — Biblioteca personal de contenido para Activation workflow
- **config/** — EDITOR_CONFIG.md y configuración técnica del sistema

## Multi-editor Support

Este sistema soporta múltiples editores. Cada editor puede tener:
- Múltiples EDITOR_PROFILE para diferentes voces/contextos
- WRITING_CONTEXT específicos para diferentes audiencias
- Biblioteca personal independiente

## Uso

- EDITOR_PROFILE se activa al inicio de cada sesión
- WRITING_CONTEXT se carga según el tipo de contenido
- Library se usa en Activation workflow para generar contenido derivado
`
  },

  "projects": {
    description: "Contenedor de todos los proyectos de escritura",
    subfolders: [],
    readme_content: `# projects - Contenedor de Proyectos

Contenedor para todos los proyectos de escritura del editor.
Cada proyecto se crea automáticamente usando TOOL_CREATE_PROJECT.gs.

## Estructura de Proyecto Típica

Cada proyecto sigue esta estructura estándar:

\`\`\`
[CODIGO]_[Nombre]/
├── _discovery/          # Material pre-workflow
├── R_research/          # Research workflow artifacts  
├── WB_writing_book/     # Book writing workflow artifacts
├── WP_writing_post/     # Post writing workflow artifacts
├── A_activation/        # Activation workflow artifacts
├── PROJECT_README.md    # Documentación del proyecto
└── PROJECT_CONFIG.md    # Configuración técnica
\`\`\`

## Creación de Proyectos

1. Usar TOOL_CREATE_PROJECT.gs para crear nuevos proyectos
2. El script está en _system/tools/
3. Tiempo de creación: 2-3 minutos por proyecto
4. Estructura completa generada automáticamente

## Gestión

- Un proyecto por libro/campaña de contenido
- Naming: CÓDIGO_Nombre (ej: TA_Bottom_Up)
- Auto-save universal en todos los workflows
`
  }
};

const EDITOR_LIBRARY_STRUCTURE = {
  "own_books": {
    description: "Libros propios del editor (para Activation)",
    readme_content: `# own_books - Libros Propios

Biblioteca de libros escritos por el editor. Usada por el workflow
de Activation para generar contenido derivado.

## Contenido

- Libros completos en PDF o texto
- Versiones finales publicadas
- Material fuente para campañas de activación

## Uso en Activation

El workflow de Activation analiza estos libros para:
1. Generar COLLECTION_ANALYSIS
2. Crear CONTENT_STRATEGY
3. Proponer POST_PLAN derivados
4. Generar contenido específico para redes sociales

## Organización

- Un archivo por libro
- Formato preferido: PDF o Markdown
- Naming: [TITULO]_[AÑO].[ext]
`
  },
  
  "own_posts": {
    description: "Posts y artículos propios (para Activation)",
    readme_content: `# own_posts - Posts y Artículos Propios

Biblioteca de posts y artículos escritos por el editor.
Complementa own_books/ para Activation workflow.

## Contenido

- Posts de blog publicados
- Artículos en medios
- Threads de Twitter/LinkedIn exitosos
- Contenido en redes sociales destacado

## Uso

- Análisis de voz y estilo para posts nuevos
- Material de referencia para Activation
- Banco de ideas y enfoques probados

## Organización

- Por tipo: posts/, articles/, threads/
- Formato: Markdown preferido
- Incluir métricas si están disponibles
`
  },
  
  "reference_books": {
    description: "Libros de referencia para investigación",
    readme_content: `# reference_books - Biblioteca de Referencia

Libros de referencia del editor para workflows de Research.
No son contenido propio sino fuentes de investigación.

## Contenido

- Libros académicos y técnicos
- Fuentes de referencia por disciplina
- Material de investigación permanente

## Uso

- Input para Research workflows
- Fuentes para REFERENCE_SUMMARY
- Background research para proyectos

## Organización

- Por disciplina o tema
- Incluir metadata (autor, año, relevancia)
- Formato: PDF preferido
`
  },
  
  "data": {
    description: "Datos y datasets para análisis",
    readme_content: `# data - Datos y Datasets

Datos estructurados del editor para análisis y Research.

## Contenido

- Datasets personales
- Datos de investigación
- Estadísticas y métricas propias
- Información cuantitativa para proyectos

## Formato

- CSV para datos tabulares
- JSON para datos estructurados
- Excel para datos complejos con análisis

## Uso

- Input para Research workflows cuantitativos
- Soporte para argumentos basados en datos
- Material para visualizaciones y gráficos
`
  }
};

// ============================================================
// FUNCIONES PRINCIPALES
// ============================================================

/**
 * Crea la estructura completa del entorno D-X-OPUS para un editor.
 * 
 * @param {string} editorName - Nombre del editor (sin espacios, ej: "MarcoLaucelli")
 * @param {string} [parentFolderId] - ID de la carpeta padre en Drive (opcional).
 *                                    Si se omite, se crea en la raíz de Mi unidad.
 * @returns {object} - Objeto con el ID y URL de la carpeta D-X-OPUS creada.
 */
function setupEditorEnvironment(editorName, parentFolderId) {
  
  // Validar parámetros
  if (!editorName || editorName.length === 0) {
    throw new Error("editorName no puede estar vacío. Ejemplo: 'MarcoLaucelli'");
  }
  
  // Verificar que no tenga espacios
  if (editorName.includes(" ")) {
    throw new Error("editorName no debe contener espacios. Ejemplo: 'MarcoLaucelli' (no 'Marco Laucelli')");
  }
  
  // Nombre de la carpeta raíz del entorno
  const environmentFolderName = "D-X-OPUS";
  
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
  
  // Verificar si la carpeta ya existe
  const existingFolders = parentFolder.getFoldersByName(environmentFolderName);
  if (existingFolders.hasNext()) {
    const existingFolder = existingFolders.next();
    Logger.log("⚠️  La carpeta " + environmentFolderName + " ya existe. No se realizaron cambios.");
    return {
      created: false,
      folderId: existingFolder.getId(),
      url: existingFolder.getUrl(),
      name: environmentFolderName
    };
  }
  
  // Crear carpeta raíz D-X-OPUS
  Logger.log("📁 Creando carpeta D-X-OPUS...");
  const mainFolder = parentFolder.createFolder(environmentFolderName);
  
  // Crear README principal
  const mainReadmeContent = createMainReadme(editorName);
  mainFolder.createFile(DriveApp.newBlob(mainReadmeContent, "text/plain", "README.md"));
  
  // Crear estructura principal
  Object.keys(EDITOR_ENVIRONMENT_STRUCTURE).forEach(folderName => {
    Logger.log("📁 Creando " + folderName + "/...");
    const folderInfo = EDITOR_ENVIRONMENT_STRUCTURE[folderName];
    const folder = mainFolder.createFolder(folderName);
    
    // Crear subcarpetas
    folderInfo.subfolders.forEach(subfolderName => {
      Logger.log("  📁 Creando " + folderName + "/" + subfolderName + "/");
      const subfolder = folder.createFolder(subfolderName);
      
      // Crear README para library subfolders
      if (folderName === "_editor" && subfolderName === "library") {
        createLibraryStructure(subfolder);
      }
    });
    
    // Crear README de carpeta principal
    const readmeContent = folderInfo.readme_content;
    folder.createFile(DriveApp.newBlob(readmeContent, "text/plain", "README.md"));
  });
  
  Logger.log("✅ Estructura D-X-OPUS creada exitosamente.");
  return {
    created: true,
    folderId: mainFolder.getId(),
    url: mainFolder.getUrl(),
    name: environmentFolderName
  };
}

/**
 * Crea la estructura de la biblioteca del editor (_editor/library/)
 */
function createLibraryStructure(libraryFolder) {
  Object.keys(EDITOR_LIBRARY_STRUCTURE).forEach(libFolderName => {
    Logger.log("    📁 Creando library/" + libFolderName + "/");
    const libFolder = libraryFolder.createFolder(libFolderName);
    const libInfo = EDITOR_LIBRARY_STRUCTURE[libFolderName];
    
    // Crear README para cada subcarpeta de library
    libFolder.createFile(DriveApp.newBlob(libInfo.readme_content, "text/plain", "README.md"));
  });
  
  // README principal de library
  const libraryReadmeContent = `# library - Biblioteca Personal del Editor

Biblioteca de contenido personal del editor para el workflow de Activation.

## Subcarpetas

- **own_books/** — Libros propios del editor (fuente para Activation)
- **own_posts/** — Posts y artículos propios publicados
- **reference_books/** — Biblioteca de referencia para Research
- **data/** — Datos y datasets para análisis cuantitativo

## Uso en Workflows

### Activation Workflow
- **own_books/** y **own_posts/** son analizados para COLLECTION_ANALYSIS
- Se usa para generar CONTENT_STRATEGY personalizada
- Base para POST_PLAN derivados y contenido de redes sociales

### Research Workflow  
- **reference_books/** como fuente para REFERENCE_SUMMARY
- **data/** para análisis cuantitativo y evidencia empírica

## Mantenimiento

- Actualizar con nuevo contenido publicado
- Organizar por relevancia y calidad
- Incluir metadata cuando sea posible
- Backup periódico recomendado
`;
  
  libraryFolder.createFile(DriveApp.newBlob(libraryReadmeContent, "text/plain", "README.md"));
}

/**
 * Crea el README principal de D-X-OPUS
 */
function createMainReadme(editorName) {
  return `# D-X-OPUS - Sistema de Escritura No-Ficción Asistida por IA

**Editor:** ${editorName}
**Sistema:** R1 - Implementación completa
**Fecha de setup:** ${new Date().toISOString().split('T')[0]}

## Estructura del Entorno

\`\`\`
D-X-OPUS/
├── _system/             # Componentes del sistema D-X-OPUS
├── _editor/             # Configuración personal del editor  
└── projects/            # Contenedor de proyectos de escritura
\`\`\`

## Próximos Pasos

### 1. Completar Setup (NIVEL 1)
1. **Leer:** tools/SETUP_INICIAL_D_X_OPUS.md para guía completa
2. **Crear:** EDITOR_PROFILE en _editor/profiles/
3. **Configurar:** EDITOR_CONFIG en _editor/config/
4. **Cargar:** Sistema en _system/ desde repositorio GitHub
5. **Configurar:** TOOL_CREATE_PROJECT.gs en _system/tools/

### 2. Crear Primer Proyecto (NIVEL 2)  
1. **Ejecutar:** TOOL_CREATE_PROJECT.gs con código y nombre del proyecto
2. **Tiempo:** 2-3 minutos para estructura completa
3. **Resultado:** Proyecto listo para trabajo inmediato

### 3. Iniciar Escritura
1. **Abrir:** Nuevo chat de Claude.ai en proyecto específico
2. **Cargar:** PROJECT_INSTRUCTIONS generadas automáticamente
3. **Empezar:** Primera sesión activará PROJECT_DISCOVERY automáticamente

## Arquitectura Dos Niveles

- **NIVEL 1 (Editor Setup):** 45-60 minutos una sola vez
- **NIVEL 2 (Project Creation):** 2-3 minutos por proyecto

## Capacidades R1

- ✅ **Setup automatizado:** Creación de entorno y proyectos
- ✅ **Auto-save universal:** Todos los artefactos guardados automáticamente  
- ✅ **Multi-editor support:** Sistema escalable para múltiples editores
- ✅ **Intelligent first session:** PROJECT_DISCOVERY maneja cualquier material inicial
- ✅ **Template system:** Generación automática de documentación y configuración
- ✅ **Workflow integration:** Research, Writing (Book/Post), Activation completamente integrados

## Soporte

- **Documentación:** _system/tools/SETUP_INICIAL_D_X_OPUS.md
- **Templates:** _system/templates/ para referencias
- **Troubleshooting:** _system/resources/ para configuración

---

**D-X-OPUS R1 - Sistema operativo para escritura no-ficción asistida por IA**
`;
}

// ============================================================
// PUNTO DE ENTRADA — MODIFICAR AQUÍ
// ============================================================

/**
 * Función principal. Modifica los parámetros y ejecuta esta función.
 * 
 * PARÁMETROS:
 *   editorName:     Nombre del editor sin espacios. Aparece en documentación.
 *   parentFolderId: (opcional) ID de la carpeta de Drive donde crear D-X-OPUS.
 *                   Para obtener el ID: abrir la carpeta en Drive, el ID es la parte
 *                   final de la URL: drive.google.com/drive/folders/[ID_AQUÍ]
 *                   Si se deja vacío (""), se crea en Mi unidad (raíz).
 * 
 * IMPORTANTE: Ejecutar solo UNA VEZ por editor. Para proyectos adicionales,
 *            usar TOOL_CREATE_PROJECT.gs que estará en _system/tools/
 */
function main() {
  const editorName     = "MarcoLaucelli";     // ← MODIFICAR: Nombre del editor sin espacios
  const parentFolderId = "";                  // ← MODIFICAR si quieres carpeta específica
  
  try {
    Logger.log("🚀 Iniciando setup D-X-OPUS para " + editorName + "...");
    Logger.log("");
    
    const result = setupEditorEnvironment(editorName, parentFolderId || undefined);
    
    if (result.created) {
      Logger.log("");
      Logger.log("🎉 SETUP D-X-OPUS COMPLETADO");
      Logger.log("✅ Entorno creado exitosamente para: " + editorName);
      Logger.log("📁 Ubicación: " + result.url);
      Logger.log("");
      Logger.log("📋 PRÓXIMOS PASOS:");
      Logger.log("1. Abrir D-X-OPUS en Drive: " + result.url);
      Logger.log("2. Leer _system/tools/SETUP_INICIAL_D_X_OPUS.md");
      Logger.log("3. Completar configuración EDITOR_PROFILE");
      Logger.log("4. Cargar artefactos del sistema en _system/");
      Logger.log("5. Configurar TOOL_CREATE_PROJECT.gs para crear proyectos");
      Logger.log("");
      Logger.log("⏱️  Tiempo estimado para completar NIVEL 1: 45-60 minutos");
      Logger.log("🚀 Después: crear proyectos en 2-3 minutos cada uno");
    } else {
      Logger.log("");
      Logger.log("⚠️  SETUP YA EXISTÍA");
      Logger.log("📁 D-X-OPUS ya existe en: " + result.url);
      Logger.log("ℹ️  No se realizaron cambios para evitar sobreescribir configuración existente");
      Logger.log("");
      Logger.log("💡 Si necesitas recrear el entorno:");
      Logger.log("   1. Renombra o elimina la carpeta D-X-OPUS existente");
      Logger.log("   2. Ejecuta este script nuevamente");
    }
  } catch (error) {
    Logger.log("");
    Logger.log("❌ ERROR EN SETUP:");
    Logger.log(error.toString());
    Logger.log("");
    Logger.log("🔧 SOLUCIONES COMUNES:");
    Logger.log("1. Verificar permisos de Google Drive");
    Logger.log("2. Verificar que editorName no tenga espacios");
    Logger.log("3. Verificar parentFolderId si se especificó");
    Logger.log("4. Revisar mensajes de error específicos arriba");
  }
}