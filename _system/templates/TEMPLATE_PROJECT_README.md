---
id:          TEMPLATE_PROJECT_README
type:        TEMPLATE
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-05-04
updated:     2026-05-04
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-05-04 | system-architecture | Initial creation. Unified template for PROJECT_README.md generated automatically by TOOL_CREATE_PROJECT. Supports auto-updates of workflow status. |

## DEPENDENCIES

inputs:  [project_code, project_name, editor_profile, TOOL_CREATE_PROJECT]
outputs: [PROJECT_README.md (auto-generated in project root)]
calls:   []

## DESCRIPTION

Template canónico del PROJECT_README.md que documenta el estado y configuración de cada proyecto D-X-OPUS. Generado automáticamente por TOOL_CREATE_PROJECT y actualizable por el editor.

---

# TEMPLATE: PROJECT_README

## Sistema D-X-OPUS — Estado del Proyecto

---

## INSTRUCCIONES DE USO

Este template lo utiliza **TOOL_CREATE_PROJECT** para generar automáticamente el PROJECT_README.md de cada proyecto. El archivo resultante se puede actualizar manualmente por el editor según avance el proyecto.

**Variables que el script sustituye automáticamente:**
- `{PROJECT_CODE}` → código del proyecto (ej. "TA")
- `{PROJECT_NAME}` → nombre del proyecto (ej. "Bottom Up")  
- `{EDITOR_PROFILE}` → perfil del editor principal
- `{START_DATE}` → fecha de creación del proyecto
- `{SYSTEM_VERSION}` → versión de D-X-OPUS (R1, R2, etc.)

**Secciones dinámicas:**
- **Estado de workflows:** tabla que el editor actualiza manualmente
- **Entorno del editor:** se genera automáticamente según configuración
- **Estructura en Drive:** se genera según carpetas creadas

---

# PROJECT_README :: {PROJECT_CODE} — {PROJECT_NAME}

---

```
project_code:     {PROJECT_CODE}
project_name:     {PROJECT_NAME}
start_date:       {START_DATE}
editor_profile:   {EDITOR_PROFILE}
last_updated:     {START_DATE}
system_version:   {SYSTEM_VERSION}
```

---

## ENTORNO DEL EDITOR

| Artefacto | Ubicación | Estado |
|---|---|---|
| {EDITOR_PROFILE}.md | Drive + Claude project knowledge | ✅ Cargado |
| PROMPTS_PACKAGE | Claude project knowledge | ✅ Cargado |
| WRITING_CONTEXT | config/ | ❌ Se crea en primera sesión POST |
| PROJECT_NOTES | _discovery/ | ❌ Se crea con PROMPT_PROJECT_DISCOVERY |

---

## ESTADO DE WORKFLOWS

| Workflow | Estado | Último artefacto | Última sesión | Próxima tarea |
|---|---|---|---|---|
| Research | `no_iniciado` | - | - | Aportar referencias → `PROMPT_SUMMARIZE_REFERENCES` |
| Writing Book | `no_iniciado` | - | - | Requiere RESEARCH_REPORT previo |
| Writing Post | `no_iniciado` | - | - | Abrir sesión → `PROMPT_POST_BRIEF` |
| Activation | `no_iniciado` | - | - | Requiere corpus definido previo |

### Estados posibles por workflow:

- **Research:** `no_iniciado` · `en_curso` · `completado`
- **Writing Book:** `no_iniciado` · `índice_aprobado` · `muestra_aprobada` · `en_escritura` · `completado`
- **Writing Post:** `no_iniciado` · `activo` · `serie_en_curso` · `completado`
- **Activation:** `no_iniciado` · `en_curso` · `completado`

---

## ESTRUCTURA EN DRIVE

```
{PROJECT_CODE}_{PROJECT_NAME_CLEAN}/
├── _discovery/          # Material pre-workflow
├── R_research/          # Investigación
├── WB_writing_book/     # Escritura de libro
├── WP_writing_post/     # Escritura de posts
├── A_activation/        # Activación de contenido
├── config/              # Configuración del proyecto
└── PROJECT_README.md    # Este archivo
```

**Enlaces directos:**
- **Carpeta principal:** {DRIVE_URL}
- **Discovery:** {DRIVE_URL}/_discovery/
- **Research:** {DRIVE_URL}/R_research/
- **Writing Post:** {DRIVE_URL}/WP_writing_post/
- **Config:** {DRIVE_URL}/config/

---

## CÓMO ACTUALIZAR ESTE DOCUMENTO

### Actualización automática (por el sistema)

El sistema actualiza automáticamente:
- Contador de artefactos producidos
- Enlaces a carpetas de Drive  
- Estado de carga de prompts
- Fecha de última actividad

### Actualización manual (por el editor)

Actualizar **tabla de workflows** al cierre de cada sesión significativa:

1. **Cambiar el estado del workflow activo** según progreso real
2. **Anotar el último artefacto producido** y su versión
3. **Actualizar `last_updated`** en la cabecera con la fecha actual
4. **Anotar la próxima tarea recomendada** para retomar el trabajo

### Tracking de progreso

**Para Research:**
- `no_iniciado` → `en_curso` cuando se ejecuta PROMPT_SUMMARIZE_REFERENCES
- `en_curso` → `completado` cuando se aprueba RESEARCH_REPORT final

**Para Writing Book:**
- `no_iniciado` → `índice_aprobado` cuando se aprueba BOOK_INDEX  
- `índice_aprobado` → `muestra_aprobada` cuando se aprueba SAMPLE_CHAPTER
- `muestra_aprobada` → `en_escritura` cuando se inicia escritura de capítulos
- `en_escritura` → `completado` cuando se finaliza BOOK_SHEET

**Para Writing Post:**
- `no_iniciado` → `activo` cuando se ejecuta PROMPT_POST_BRIEF
- `activo` → `serie_en_curso` si se desarrolla serie de posts
- `activo/serie_en_curso` → `completado` cuando se publican todos los posts

**Para Activation:**
- `no_iniciado` → `en_curso` cuando se define ACTIVATION_CONTEXT
- `en_curso` → `completado` cuando se ejecuta la campaña completa

---

## CONFIGURACIÓN ESPECÍFICA DEL PROYECTO

### Auto-save activo

Todos los artefactos se guardan automáticamente con naming estándar:

| Workflow | Patrón de archivos |
|---|---|
| Research | `{PROJECT_CODE}_R_[TIPO]_v[VER].md` |
| Writing Book | `{PROJECT_CODE}_WB_[TIPO]_v[VER].md` |
| Writing Post | `{PROJECT_CODE}_WP_[TIPO]_[NAME]_v[VER].md` |
| Activation | `{PROJECT_CODE}_A_[TIPO]_v[VER].md` |
| System | `PROJECT_NOTES.md`, `WRITING_CONTEXT_[ID].md` |

### EDITOR_CONFIG tracking

Este proyecto está registrado automáticamente en el `EDITOR_CONFIG.md` del editor con:
- Código y nombre del proyecto
- Estado actual del workflow  
- Fecha de última sesión
- Link directo a carpeta de Drive

---

## ESTADÍSTICAS DEL PROYECTO (auto-actualizadas)

```
# Estas estadísticas se actualizan automáticamente

created_date:            {START_DATE}
days_active:             [calculado automáticamente]
total_artifacts:         [contador automático]
total_words_produced:    [estimación automática]
most_used_workflow:      [detectado por actividad]
last_session:            [última modificación detectada]
```

---

## PRÓXIMOS PASOS RECOMENDADOS

### Para proyectos nuevos:
1. **Primera sesión:** Ejecutar PROMPT_PROJECT_DISCOVERY  
2. **Definir workflow principal** según material y objetivos
3. **Configurar WRITING_CONTEXT** si el objetivo incluye posts
4. **Comenzar con workflow elegido**

### Para proyectos en curso:
1. **Revisar estado actual** en la tabla de workflows
2. **Continuar desde "Próxima tarea"** indicada
3. **Actualizar tabla** al final de cada sesión
4. **Marcar como completado** cuando se alcancen los objetivos

---

## TROUBLESHOOTING

### Error: Auto-save no funciona
- Verificar que PROJECT_CONFIG.md existe en config/
- Verificar permisos de Drive
- Re-ejecutar setup si es necesario

### Error: Prompts no disponibles  
- Verificar que PROMPTS_PACKAGE.md está cargado en Claude project knowledge
- Recargar desde el paquete de setup si es necesario

### Error: EDITOR_CONFIG no se actualiza
- Verificar configuración en TOOL_CREATE_PROJECT
- Verificar permisos de escritura en _editor/config/

---

**PROJECT_README generado automáticamente por D-X-OPUS {SYSTEM_VERSION}**

*Este documento se actualiza automáticamente con la actividad del proyecto y manualmente con el progreso de workflows.*
