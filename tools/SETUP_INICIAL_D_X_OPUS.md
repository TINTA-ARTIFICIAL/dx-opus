# SETUP INICIAL D-X-OPUS v1.1 - GUÍA DEL EDITOR

**Sistema:** D-X-OPUS R1  
**Propósito:** Configuración inicial del entorno de escritura (una sola vez)  
**Tiempo estimado:** 45-60 minutos  
**Resultado:** D-X-OPUS listo + EDITOR_CONFIG.md personal

---

## CAMBIOS EN v1.1

- ✅ **EDITOR_CONFIG.md formalizado:** Template oficial para configuración personal
- ✅ **Auto-save integrado:** EDITOR_CONFIG se actualiza automáticamente  
- ✅ **Tracking de proyectos:** Lista automática de proyectos activos
- ✅ **Estadísticas de uso:** Métricas automáticas de actividad

---

## PRERREQUISITOS

Antes de empezar, asegúrate de tener:

- [ ] Cuenta de Google Drive con espacio disponible (5GB recomendado)
- [ ] Cuenta de Claude.ai Pro (necesaria para project knowledge)
- [ ] Acceso al repositorio GitHub de D-X-OPUS (o paquete descargable)
- [ ] Tiempo sin interrupciones para completar el setup

---

## PASO 1: CONFIGURACIÓN DE GOOGLE DRIVE

### 1.1 Crear estructura raíz de D-X-OPUS

En tu Google Drive, crea esta estructura:

```
D-X-OPUS/
├── _system/
│   ├── prompts/
│   ├── templates/
│   ├── resources/
│   └── tools/
├── _editor/
│   ├── profiles/
│   ├── contexts/
│   ├── library/
│   └── config/          ← NUEVO: aquí va EDITOR_CONFIG.md
└── projects/
```

**Función actualizada:**
- `_editor/config/`: Configuración personal del editor (NUEVO)
- `_editor/profiles/`: Perfiles editoriales (EDITOR_PROFILE)
- `_editor/contexts/`: Contextos de escritura reutilizables
- `_editor/library/`: Biblioteca personal para Activation

### 1.2 Copiar URL del folder raíz

Copia el link de la carpeta `D-X-OPUS/` — lo necesitarás para configurar tu EDITOR_CONFIG.

---

## PASO 2: DESCARGA E INSTALACIÓN DEL SISTEMA

### 2.1 Descargar paquete D-X-OPUS

**Opción A - Desde GitHub:**
1. Ve a: https://github.com/[usuario]/d-x-opus/releases/latest
2. Descarga `D-X-OPUS-R1-complete-package.zip`
3. Extrae el contenido

**Opción B - Paquete proporcionado:**
1. Extrae el contenido del archivo proporcionado

### 2.2 Subir archivos del sistema a Drive

Copia todo el contenido de la carpeta `system/` del paquete a `D-X-OPUS/_system/` en Drive:

```
_system/
├── prompts/ (todos los .md de prompts)
├── templates/ (todos los templates + TEMPLATE_EDITOR_CONFIG.md)
├── resources/ (todos los recursos + AUTO_SAVE_CONFIG.yaml)
└── tools/ (scripts de Google Apps Script)
```

### 2.3 Instalar herramientas de Google Apps Script

1. Ve a: https://script.google.com
2. Nuevo proyecto → pegar contenido de `TOOL_CREATE_PROJECT.gs`
3. Guardar como "D-X-OPUS Tools"
4. Autorizar permisos de Google Drive
5. Ejecutar función `testConnection()` para validar

---

## PASO 3: CREAR TU EDITOR_PROFILE

### 3.1 Ejecutar prompt de creación

En una nueva conversación de Claude:

1. Cargar `PROMPT_CREATE_EDITOR_PROFILE.md` desde `_system/prompts/`
2. Ejecutar el prompt completo
3. Seguir el Q&A para definir tu voz y estilo

### 3.2 Guardar el perfil

Guardar el `EDITOR_PROFILE_[tu_nombre].md` resultante en:
`D-X-OPUS/_editor/profiles/`

**Archivo de ejemplo resultante:**
```
EDITOR_PROFILE_MARCO_LAUCELLI.md
EDITOR_PROFILE_ANA_TORRES.md
```

---

## PASO 4: CREAR TU EDITOR_CONFIG (NUEVO)

### 4.1 Crear configuración personal usando template

1. **Copiar template:** Desde `_system/templates/TEMPLATE_EDITOR_CONFIG.md`
2. **Ubicación:** `D-X-OPUS/_editor/config/EDITOR_CONFIG.md`
3. **Rellenar datos básicos:**

```markdown
# EDITOR_CONFIG :: [TU_NOMBRE]

## INFORMACIÓN PERSONAL
```
editor_name:             [Tu nombre completo]
setup_completed:         [Fecha de hoy]
system_version:          R1
last_config_update:      [Fecha y hora actual]
config_version:          1.0
```

## CONFIGURACIÓN TÉCNICA

### Google Drive
```
drive_root_folder:       [URL de tu carpeta D-X-OPUS]
structure_validated:     true
```

### EDITOR_PROFILE Principal
```
main_profile:            EDITOR_PROFILE_[tu_nombre].md
profile_location:        _editor/profiles/
```

[El resto se irá llenando automáticamente con el uso]
```

### 4.2 Validar configuración inicial

Verificar que tienes:
- [ ] `EDITOR_CONFIG.md` creado en `_editor/config/`
- [ ] Datos personales básicos rellenados
- [ ] URLs de Drive configuradas
- [ ] EDITOR_PROFILE referenciado

---

## PASO 5: CONFIGURAR BIBLIOTECA PERSONAL

### 5.1 Crear estructura de biblioteca

En `D-X-OPUS/_editor/library/` crear:

```
library/
├── books/ (libros que has escrito)
├── articles/ (artículos publicados)
├── posts/ (posts importantes)
├── notes/ (notas e ideas)
└── references/ (fuentes recurrentes)
```

### 5.2 Actualizar EDITOR_CONFIG con biblioteca

En tu `EDITOR_CONFIG.md`, actualizar:

```yaml
## BIBLIOTECA PERSONAL
library_configured:      true
library_location:        _editor/library/
content_inventory:
  books: [N archivos que subiste]
  articles: [N archivos]
  posts: [N archivos] 
  notes: [N archivos]
ready_for_activation:    [true si tienes contenido | false si está vacío]
```

---

## PASO 6: CONFIGURACIÓN DE CLAUDE PROJECT TEMPLATE

### 6.1 Crear proyecto template en Claude

1. En Claude.ai → New Project
2. Nombre: "D-X-OPUS-TEMPLATE-[tu_nombre]"
3. **No añadir knowledge todavía**

### 6.2 Actualizar EDITOR_CONFIG con template

En tu `EDITOR_CONFIG.md`:

```yaml
### Claude.ai
template_project_url:    [URL del proyecto template que acabas de crear]
default_instructions:    configuradas
```

### 6.3 Configurar project instructions template

Copiar estas instrucciones al campo "Project instructions":

```
Eres el asistente de escritura del proyecto [PROYECTO_NOMBRE], producido con el
sistema D-X-OPUS de Tinta Artificial.

## CONTEXTO DEL PROYECTO

**Proyecto:** [PROYECTO_CODIGO] — [PROYECTO_NOMBRE]
**Estado:** Ver PROJECT_README en el knowledge de este proyecto.
**Editor:** [TU_NOMBRE] (ver EDITOR_CONFIG.md para configuración completa)

---

## AL INICIO DE CADA CONVERSACIÓN

**Paso 1 — Identificar y activar el perfil de editor**

Revisa el knowledge de este proyecto y localiza todos los archivos
EDITOR_PROFILE disponibles.

- Si hay uno solo: actívalo automáticamente y confírmalo en una línea.
- Si hay más de uno: lista los disponibles y pregunta antes de continuar.

No continúes hasta tener el perfil activo confirmado.

**Paso 2 — Si el objetivo de la sesión es escribir un post:**
Verifica si existe un WRITING_CONTEXT cargado en el knowledge.
- Si existe con default: confírmalo en una línea.
- Si no existe: pregunta para qué publicación escribe.
Solo ejecuta este paso si el editor va a escribir un post.

**Paso 3 — Bifurcación según estado del proyecto:**

Si NO existe PROJECT_NOTES en el knowledge:
  → Primera sesión. Invocar PROMPT_PROJECT_DISCOVERY antes de cualquier workflow.

Si existe PROJECT_NOTES:
  → ¿Qué quieres hacer hoy?
    A) Investigar o procesar fuentes  →  PROMPT_SUMMARIZE_REFERENCES
    B) Escribir o continuar un post   →  PROMPT_POST_BRIEF
    C) Trabajar en el libro           →  PROMPT_CREATE_BOOK_INDEX / PROMPT_WRITE_CHAPTER
    D) Trabajar en la campaña         →  PROMPT_CREATE_BOOK_BRIEF
    E) Otra cosa — cuéntame

---

## REGLAS PERMANENTES

- El perfil activo elegido en el Paso 1 aplica a toda la sesión.
- Todos los artefactos producidos se guardan automáticamente en Drive.
- EDITOR_CONFIG.md se actualiza automáticamente con actividad del proyecto.
- Actualiza el PROJECT_README al cerrar sesiones significativas.
- Sé directo. No expliques lo que vas a hacer — hazlo.
```

---

## PASO 7: VALIDACIÓN DEL SETUP COMPLETO

### 7.1 Test de creación de proyecto

1. Ejecutar Google Apps Script con código de prueba: `TEST`
2. Verificar que se crea estructura en `projects/TEST_[nombre]/`
3. Verificar que aparecen archivos automáticamente
4. **NUEVO:** Verificar que `EDITOR_CONFIG.md` se actualiza automáticamente

### 7.2 Test de auto-save de configuración

1. Crear el proyecto TEST
2. Verificar en tu `EDITOR_CONFIG.md` que aparece:
   ```yaml
   ### Lista de Proyectos
   | TEST | Test Project | activo | system | [fecha] | [URL] |
   
   ### Estadísticas de USO
   total_projects:          1
   ```

### 7.3 Test de carga de knowledge

1. Duplicar el proyecto template de Claude
2. Cambiar nombre a "TEST-PROJECT"
3. Cargar manualmente 3-4 prompts básicos al knowledge
4. Verificar que el session opener funciona

### 7.4 Test completo de flujo

1. En el proyecto TEST, ejecutar PROMPT_PROJECT_DISCOVERY
2. Verificar que se crea PROJECT_NOTES automáticamente
3. Verificar que tu EDITOR_CONFIG.md se actualiza con estadísticas
4. Confirmar que el auto-save genérico funciona

---

## PASO 8: LIMPIEZA Y FINALIZACIÓN

### 8.1 Eliminar proyecto de prueba

- Borrar proyecto TEST de Claude
- Borrar carpeta TEST de Drive
- **NUEVO:** Limpiar entrada TEST de tu EDITOR_CONFIG.md

### 8.2 Finalizar configuración personal

Actualizar tu `EDITOR_CONFIG.md` con:

```yaml
## CONFIGURACIÓN AVANZADA
### Setup Inicial Completado
- [✓] D-X-OPUS operativo
- [✓] Primer proyecto de prueba creado exitosamente  
- [✓] Todos los componentes validados
- [✓] EDITOR_CONFIG funcionando correctamente

## PRÓXIMOS PASOS
### Uso Regular
- [ ] Crear proyecto real
- [ ] Definir WRITING_CONTEXT default
- [ ] Poblar biblioteca personal
- [ ] Optimizar flujo de trabajo personal
```

---

## RESULTADO FINAL

Al completar este setup tendrás:

✅ **D-X-OPUS completamente operativo**  
✅ **Tu EDITOR_PROFILE creado y listo**  
✅ **EDITOR_CONFIG.md personal funcionando** (NUEVO)  
✅ **Biblioteca personal configurada**  
✅ **Herramientas de creación automática de proyectos**  
✅ **Sistema listo para crear el primer proyecto en segundos**  
✅ **Auto-save universal activado** (NUEVO)

---

## PRÓXIMOS PASOS

**Crear tu primer proyecto real:**

1. Ejecutar Google Apps Script con código real (ej. `TA` para "Tinta Artificial")
2. Tu EDITOR_CONFIG se actualiza automáticamente
3. Copiar URL del proyecto generado
4. Duplicar proyecto template de Claude y cargar knowledge automáticamente
5. ¡Empezar a escribir!

**Tiempo estimado para crear un proyecto:** 2-3 minutos.  
**Auto-tracking:** Tu EDITOR_CONFIG se mantiene actualizado automáticamente.

---

## NOVEDADES EN CONFIGURACIÓN PERSONAL

### Auto-updates de EDITOR_CONFIG

Tu archivo `EDITOR_CONFIG.md` se actualiza automáticamente cuando:

- ✅ **Creas un proyecto nuevo** → se añade a la tabla de proyectos
- ✅ **Completas un workflow** → se actualizan estadísticas de uso  
- ✅ **Produces artefactos** → se cuentan palabras y outputs
- ✅ **Usas el sistema** → se tracking actividad general

### Información siempre actualizada

Tu `EDITOR_CONFIG.md` siempre tendrá:

- 📊 **Lista actual de proyectos activos** (automática)
- 📈 **Estadísticas de uso del sistema** (automáticas)  
- 🎯 **Preferencias y configuración personal** (manual)
- 🔧 **Estado técnico del setup** (mixto automático/manual)

---

## TROUBLESHOOTING

### Error: EDITOR_CONFIG no se actualiza automáticamente
- Verificar permisos de escritura en `_editor/config/`
- Re-ejecutar `testConnection()` en Google Apps Script

### Error: Template no se carga correctamente
- Verificar que `TEMPLATE_EDITOR_CONFIG.md` está en `_system/templates/`
- Verificar formato YAML en las secciones de configuración

### Error: Auto-save no funciona
- Verificar que `AUTO_SAVE_CONFIG.yaml` está en `_system/resources/`
- Verificar configuración de EDITOR_CONFIG en la sección técnica

---

**SETUP COMPLETO v1.1 CON EDITOR_CONFIG PERSONAL**

*Tu configuración D-X-OPUS queda documentada y se mantiene actualizada automáticamente.*
