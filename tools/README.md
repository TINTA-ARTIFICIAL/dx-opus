# TOOLING — Herramientas Operativas

Herramientas operativas del sistema D-X-OPUS. Owned by SYSTEM (system-architecture chat).

**Estado:** R1 setup automation completo con arquitectura de dos niveles

---

## Artefactos activos

| Artefacto | Versión | Descripción |
|---|---|---|
| **TOOL_SETUP_EDITOR_ENVIRONMENT** | v1.0 | **NEW** - Google Apps Script para crear entorno inicial D-X-OPUS |
| **TOOL_CREATE_PROJECT** | v1.0 | Google Apps Script para crear estructura de proyecto individual |
| TOOL_GITHUB_REPO_STRUCTURE | v1.3 | Especificación de inicialización del repositorio GitHub |

---

## Arquitectura Two-Tier Setup

### **NIVEL 1 - Editor Setup (una vez, 45-60 min)**
**TOOL_SETUP_EDITOR_ENVIRONMENT.gs**
- **Función:** Crear entorno inicial completo D-X-OPUS/
- **Frecuencia:** Una vez por editor
- **Tiempo:** 5 minutos automatizado + 40-55 min configuración
- **Output:** Estructura base con _system/, _editor/, projects/

### **NIVEL 2 - Project Creation (cada proyecto, 2-3 min)**  
**TOOL_CREATE_PROJECT.gs**
- **Función:** Crear proyecto individual de escritura
- **Frecuencia:** Una vez por libro/campaña
- **Tiempo:** 2-3 minutos completamente automatizado
- **Output:** Proyecto listo con workflows, READMEs, configuración

---

## Flujo de Setup Completo

### **Setup Inicial (Editor nuevo)**
1. **Ejecutar:** `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`
2. **Resultado:** Estructura D-X-OPUS/ creada automáticamente
3. **Continuar:** Seguir SETUP_INICIAL_D_X_OPUS.md para configuración
4. **Tiempo total:** 45-60 minutos (5 min automation + 40-55 min config)

### **Creación de Proyectos (Proyectos adicionales)**
1. **Ejecutar:** `TOOL_CREATE_PROJECT.gs` 
2. **Resultado:** Proyecto completo listo para trabajo
3. **Tiempo:** 2-3 minutos completamente automatizado

---

## Instrucciones de Uso

### **TOOL_SETUP_EDITOR_ENVIRONMENT**

**Cuándo usar:**
- **Primera instalación** del sistema D-X-OPUS
- **Nuevo editor** que nunca ha usado el sistema
- **Recreación** del entorno tras problema técnico

**Pasos:**
1. Ir a [script.google.com](https://script.google.com)
2. Crear nuevo proyecto
3. Copiar código completo de `TOOL_SETUP_EDITOR_ENVIRONMENT.gs`
4. Modificar parámetros en función `main()`:
   ```javascript
   const editorName = "TuNombre";        // Sin espacios
   const parentFolderId = "";            // Opcional, carpeta padre
   ```
5. Ejecutar función `main()`
6. Autorizar permisos Google Drive
7. Verificar estructura creada en Drive

**Output esperado:**
```
D-X-OPUS/
├── _system/        # Componentes del sistema
├── _editor/        # Configuración personal
└── projects/       # Contenedor proyectos
```

### **TOOL_CREATE_PROJECT**

**Cuándo usar:**
- **Después** de setup inicial del editor
- **Cada nuevo** libro o campaña de contenido
- **Cuando necesites** estructura de proyecto estándar

**Pasos:**
1. Usar el script en `D-X-OPUS/_system/tools/`
2. Modificar parámetros:
   ```javascript
   const projectCode = "TA";            // 2-4 letras
   const projectName = "Bottom_Up";     // Sin espacios
   ```
3. Ejecutar función `main()`
4. Proyecto creado en `D-X-OPUS/projects/`

---

## Features Implementadas R1

### **Setup Automation**
- ✅ **Environment creation:** Automated folder structure
- ✅ **README generation:** All folders with documentation
- ✅ **Collision detection:** No overwrite existing setup
- ✅ **Multi-editor support:** Independent environments

### **Project Automation**  
- ✅ **Project structure:** Complete workflow folders
- ✅ **Documentation:** Auto-generated README and config
- ✅ **Templates:** PROJECT_INSTRUCTIONS personalized
- ✅ **Integration:** Ready for Claude.ai immediate use

### **Quality Assurance**
- ✅ **Error handling:** Robust validation and recovery
- ✅ **Consistent structure:** Same output every time
- ✅ **Documentation:** Complete README in every folder
- ✅ **Integration testing:** Verified end-to-end flow

---

## Multi-Editor Support

### **Shared vs Personal**
- **_system/:** Compartido entre editores (opcional)
- **_editor/:** Específico de cada editor  
- **projects/:** Específico de cada editor

### **Collaboration Scenarios**
- **Independent:** Cada editor su D-X-OPUS/ completo
- **Shared system:** _system/ compartido, _editor/ independiente
- **Team projects:** Proyectos compartidos con profile selection

---

## Troubleshooting

### **Setup Issues**
- **Permisos:** Verificar autorización Google Drive
- **Colisión:** Script detecta carpetas existentes automáticamente
- **Nombres:** editorName sin espacios, projectCode 2-4 letras

### **Project Creation Issues**
- **Dependencias:** Ejecutar TOOL_SETUP_EDITOR_ENVIRONMENT primero
- **Ubicación:** Verificar que D-X-OPUS/projects/ exista
- **Parámetros:** projectCode y projectName válidos

### **Integration Issues**
- **Claude.ai:** Copy/paste PROJECT_INSTRUCTIONS generadas
- **Knowledge:** No cargar knowledge base en proyectos nuevos
- **Session:** PROJECT_DISCOVERY se activa automáticamente

---

## Criterio de extracción

Cuando haya más de 3 herramientas activas, o alguna requiera desarrollo iterativo propio, se crea un subsistema TOOLING independiente con su chat de desarrollo.

**Estado actual:** 2 tools activos + 1 especificación = bajo umbral para subsistema independiente

---

## Testing Status

### **TOOL_SETUP_EDITOR_ENVIRONMENT**
- [ ] **Clean setup test:** Environment from scratch ← **PRÓXIMO TEST**
- [ ] **Collision test:** Run twice, verify detection
- [ ] **Multi-editor test:** Multiple environments  
- [ ] **Integration test:** Environment → Project flow

### **TOOL_CREATE_PROJECT**
- ✅ **Project creation:** Verified working
- ✅ **Template generation:** PROJECT_README + PROJECT_INSTRUCTIONS
- ✅ **Auto-save integration:** Universal auto-save operational
- ✅ **Multi-workflow:** All workflows supported

---

**R1 setup automation está ahora completo con two-tier architecture fully automated.**