---
id:          TEMPLATE_EDITOR_CONFIG
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
| v1.0 | 2026-05-04 | system-architecture | Initial creation. Formal template for EDITOR_CONFIG.md - the artifact that documents editor's initial D-X-OPUS setup and tracks active projects. |

## DEPENDENCIES

inputs:  [SETUP_INICIAL_D_X_OPUS (proceso), EDITOR_PROFILE, Google Apps Script setup]
outputs: [EDITOR_CONFIG.md (artefacto de configuración personal)]
calls:   []

## DESCRIPTION

Template del EDITOR_CONFIG.md: el artefacto personal que documenta la configuración completa de D-X-OPUS para un editor específico. Se crea al completar SETUP_INICIAL_D_X_OPUS y se actualiza automáticamente con cada proyecto nuevo.

---

# TEMPLATE: EDITOR_CONFIG

## Sistema D-X-OPUS — Configuración Personal del Editor

---

## INSTRUCCIONES DE USO

Este template se rellena **durante el proceso SETUP_INICIAL_D_X_OPUS** y se actualiza **automáticamente** cada vez que se crea un proyecto nuevo o se cambia configuración.

**Ubicación:** `D-X-OPUS/_editor/config/EDITOR_CONFIG.md`

**Quién lo actualiza:**
- Editor (manualmente): datos personales, preferencias  
- TOOL_CREATE_PROJECT (automáticamente): lista de proyectos activos
- Sistema (automáticamente): últimos usos, estadísticas

**Función:** Punto de referencia único de la configuración D-X-OPUS del editor.

---

# EDITOR_CONFIG :: [NOMBRE_EDITOR]

---

## INFORMACIÓN PERSONAL

```
editor_name:             [Nombre completo del editor]
setup_completed:         [YYYY-MM-DD]
system_version:          [R1 | R2 | etc.]
last_config_update:      [YYYY-MM-DD HH:mm]
config_version:          1.0
```

---

## CONFIGURACIÓN TÉCNICA

### Google Drive
```
drive_root_folder:       [URL completa de la carpeta D-X-OPUS/]
drive_folder_id:         [ID de la carpeta para APIs]
structure_validated:     [true | false]
last_backup:             [YYYY-MM-DD]
```

### Google Apps Script
```
script_url:              [URL del proyecto Google Apps Script]
script_id:               [ID del script para referencias]
permissions_granted:     [true | false]
last_test_execution:     [YYYY-MM-DD]
```

### Claude.ai
```
template_project_url:    [URL del proyecto template Claude]
template_project_id:     [ID del template si disponible]
default_instructions:    [configuradas | pendientes]
```

---

## CONFIGURACIÓN EDITORIAL

### EDITOR_PROFILE Principal
```
main_profile:            [EDITOR_PROFILE_[nombre].md]
profile_version:         [vX.Y]
profile_location:        [_editor/profiles/]
last_profile_update:     [YYYY-MM-DD]
```

### Perfiles Adicionales
```
# Si el editor tiene múltiples perfiles (personal/profesional/etc.)
additional_profiles:
  - name: [nombre]
    file: [archivo.md]
    use_case: [cuándo se usa]
```

### WRITING_CONTEXTS Configurados
```
default_context:         [ID del contexto default o 'pendiente']
available_contexts:
  - context_id: [ID]
    publication: [nombre]
    format: [tipo]
    last_used: [fecha]
```

---

## BIBLIOTECA PERSONAL

### Configuración Activation
```
library_configured:      [true | false]
library_location:        [_editor/library/]
content_inventory:
  books: [N archivos]
  articles: [N archivos] 
  posts: [N archivos]
  notes: [N archivos]
last_library_scan:       [YYYY-MM-DD]
```

### Corpus Disponible
```
# Resumen del material disponible para Activation
books_count:             [N libros completos]
articles_count:          [N artículos]
total_content_pieces:    [N total]
ready_for_activation:    [true | false]
```

---

## PROYECTOS ACTIVOS

### Dashboard de Proyectos
```
total_projects:          [N]
active_projects:         [N]
completed_projects:      [N]
last_project_created:    [YYYY-MM-DD]
```

### Lista de Proyectos

| Código | Nombre | Estado | Workflow | Última sesión | Drive URL |
|---|---|---|---|---|---|
| [COD] | [Nombre] | [activo/pausado/completado] | [research/writing/activation] | [YYYY-MM-DD] | [URL] |
| [ejemplo] | [ejemplo] | [estado] | [workflow] | [fecha] | [url] |

---

## ESTADÍSTICAS DE USO

### Actividad General
```
days_since_setup:        [N días]
total_sessions:          [N sesiones aprox]
most_used_workflow:      [research | writing | activation]
avg_projects_per_month:  [N proyectos]
```

### Auto-save Statistics
```
total_artifacts_saved:   [N artefactos]
auto_save_success_rate:  [XX%]
most_produced_artifact:  [tipo de artefacto]
total_words_produced:    [N palabras aprox]
```

### Workflow Preferences
```
preferred_starting_workflow: [research | writing_post | activation]
typical_project_duration:   [X semanas]
most_common_output:          [posts | books | activation_content]
```

---

## CONFIGURACIÓN AVANZADA

### Customizaciones
```
naming_preferences:
  project_codes: [estándar | personalizado]
  versioning: [automático | manual]
  folder_organization: [estándar | personalizada]

workflow_preferences:
  auto_discovery: [enabled | disabled]
  auto_save: [enabled | disabled]
  verbose_feedback: [enabled | disabled]
```

### Integrations (futuras)
```
# Placeholder para futuras integraciones
external_tools: []
api_connections: []
sync_services: []
```

---

## TROUBLESHOOTING LOG

### Problemas Conocidos
```
# Log de problemas y soluciones para referencia
last_error_date:         [YYYY-MM-DD]
last_error_type:         [descripción]
last_error_solution:     [qué se hizo]

common_issues:
  - issue: [descripción]
    solution: [solución]
    frequency: [raro | ocasional | frecuente]
```

### Configuración de Backup
```
auto_backup:             [enabled | disabled]
backup_frequency:        [semanal | mensual]
backup_location:         [Drive | local | otro]
last_backup_restore:     [never | YYYY-MM-DD]
```

---

## NOTAS PERSONALES

### Preferencias de Trabajo
```
# Campo libre para que el editor documente sus preferencias

Horarios preferidos: [mañana | tarde | noche]
Tipos de proyecto favoritos: [descripción]
Flujos que funcionan mejor: [descripción]
Áreas de mejora identificadas: [descripción]
```

### Objetivos y Planes
```
# Campo libre para planificación personal

Proyectos en pipeline: [lista o descripción]
Objetivos a 3 meses: [descripción]
Áreas de aprendizaje: [descripción]
Experimentación pendiente: [nuevos workflows, etc.]
```

---

## METADATOS DE CONFIGURACIÓN

### Control de Versiones
```
config_created:          [YYYY-MM-DD HH:mm]
last_manual_update:      [YYYY-MM-DD HH:mm]
last_auto_update:        [YYYY-MM-DD HH:mm]
update_frequency:        [diaria | semanal | según proyectos]
```

### Sistema
```
d_x_opus_version:        [R1 | R2]
config_template_version: [v1.0]
compatible_versions:     [lista]
migration_needed:        [false | true → versión]
```

---

## ACCIONES AUTOMÁTICAS

### Updates Automáticos (manejados por TOOL_CREATE_PROJECT)
- [ ] Añadir proyecto nuevo a tabla de proyectos activos
- [ ] Actualizar contador de proyectos totales  
- [ ] Actualizar fecha de último proyecto creado
- [ ] Actualizar estadísticas de uso

### Updates Manuales (editor)
- [ ] Cambiar configuraciones personales
- [ ] Añadir notas sobre preferencias
- [ ] Actualizar objetivos y planes
- [ ] Documentar problemas y soluciones

---

## PRÓXIMOS PASOS

### Setup Inicial Completado
- [ ] D-X-OPUS operativo
- [ ] Primer proyecto de prueba creado exitosamente
- [ ] Todos los componentes validados

### Uso Regular
- [ ] Crear proyecto real
- [ ] Definir WRITING_CONTEXT default
- [ ] Poblar biblioteca personal
- [ ] Optimizar flujo de trabajo personal

---

**FIN DEL TEMPLATE EDITOR_CONFIG**

*Este archivo documenta la configuración completa de D-X-OPUS para uso personal del editor. Se actualiza automáticamente con la actividad del sistema y manualmente con preferencias personales.*
