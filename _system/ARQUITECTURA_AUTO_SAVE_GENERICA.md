# ARQUITECTURA GENÉRICA AUTO-SAVE D-X-OPUS R1

**Sistema:** D-X-OPUS  
**Componente:** Auto-save genérico para todos los artefactos  
**Versión:** 1.0  
**Alcance:** Todos los workflows de R1

---

## PROPÓSITO

Definir una arquitectura genérica de auto-save que cualquier prompt de D-X-OPUS pueda usar para guardar automáticamente sus artefactos en la estructura de Drive del proyecto con naming estándar y metadatos completos.

**Principio:** Separar la lógica de auto-save de la lógica específica de cada prompt. El auto-save es un servicio que se invoca, no código que se duplica.

---

## COMPONENTES DE LA ARQUITECTURA

### 1. REGISTRO DE TIPOS DE ARTEFACTO

```yaml
# ARTIFACT_TYPES_REGISTRY.yaml
# Configuración central de todos los artefactos del sistema

RESEARCH:
  REFERENCE_SUMMARY:
    folder: "R_research"
    prefix: "REF_SUM"
    template: "[COD]_R_REF_SUM_v[VER].md"
    metadata_level: "standard"
    
  RESEARCH_PLAN:
    folder: "R_research"
    prefix: "PLAN"
    template: "[COD]_R_PLAN_v[VER].md"
    metadata_level: "standard"
    
  RESEARCH_DEEP_DIVE:
    folder: "R_research"
    prefix: "DEEP_DIVE"
    template: "[COD]_R_DEEP_DIVE_v[VER].md"
    metadata_level: "extended"
    
  RESEARCH_REPORT:
    folder: "R_research"
    prefix: "REPORT"
    template: "[COD]_R_REPORT_[SUBTYPE]_v[VER].md"
    metadata_level: "extended"
    subtypes: ["HIST", "ECON", "TECH", "SOCIAL", "CUSTOM"]
    
  NARRATIVE_BRIDGE:
    folder: "R_research"
    prefix: "BRIDGE"
    template: "[COD]_R_BRIDGE_v[VER].md"
    metadata_level: "standard"

WRITING_BOOK:
  BOOK_INDEX:
    folder: "WB_writing_book"
    prefix: "INDEX"
    template: "[COD]_WB_INDEX_v[VER].md"
    metadata_level: "standard"
    
  SAMPLE_CHAPTER:
    folder: "WB_writing_book"
    prefix: "SAMPLE"
    template: "[COD]_WB_SAMPLE_CH[N]_v[VER].md"
    metadata_level: "extended"
    
  CHAPTER_DRAFT:
    folder: "WB_writing_book"
    prefix: "CHAPTER"
    template: "[COD]_WB_CHAPTER_CH[N]_v[VER].md"
    metadata_level: "extended"
    
  INTRODUCTION:
    folder: "WB_writing_book"
    prefix: "INTRO"
    template: "[COD]_WB_INTRO_v[VER].md"
    metadata_level: "extended"
    
  PROLOGUE:
    folder: "WB_writing_book"
    prefix: "PROLOGUE"
    template: "[COD]_WB_PROLOGUE_v[VER].md"
    metadata_level: "extended"
    
  BOOK_SHEET:
    folder: "WB_writing_book"
    prefix: "SHEET"
    template: "[COD]_WB_SHEET_v[VER].md"
    metadata_level: "standard"

WRITING_POST:
  POST_SEED:
    folder: "WP_writing_post"
    prefix: "SEED"
    template: "[COD]_WP_SEED_[NAME]_v[VER].md"
    metadata_level: "standard"
    
  POST_DRAFT:
    folder: "WP_writing_post"
    prefix: "POST"
    template: "[COD]_WP_POST_[NAME]_v[VER].md"
    metadata_level: "extended"
    
  INVENTARIO_IDEAS:
    folder: "WP_writing_post"
    prefix: "IDEAS"
    template: "[COD]_WP_IDEAS_[NAME]_v[VER].md"
    metadata_level: "standard"
    
  SOURCE_MAP:
    folder: "WP_writing_post"
    prefix: "SOURCES"
    template: "[COD]_WP_SOURCES_[NAME]_v[VER].md"
    metadata_level: "standard"
    
  POST_BRIEFING:
    folder: "WP_writing_post"
    prefix: "BRIEFING"
    template: "[COD]_WP_BRIEFING_[NAME]_v[VER].md"
    metadata_level: "standard"

ACTIVATION:
  ACTIVATION_CONTEXT:
    folder: "A_activation"
    prefix: "CONTEXT"
    template: "[COD]_A_CONTEXT_v[VER].md"
    metadata_level: "extended"
    
  BOOK_BRIEF:
    folder: "A_activation"
    prefix: "BRIEF"
    template: "[COD]_A_BRIEF_v[VER].md"
    metadata_level: "standard"
    
  POST_PLAN:
    folder: "A_activation"
    prefix: "POST_PLAN"
    template: "[COD]_A_POST_PLAN_[N]_v[VER].md"
    metadata_level: "standard"

EVALUATION:
  EVALUATION_RESULT:
    folder: "[WORKFLOW_FOLDER]"  # Dinámico según el workflow que evalúa
    prefix: "EVAL"
    template: "[COD]_EVAL_[TARGET_TYPE]_v[VER].md"
    metadata_level: "standard"
    target_types: ["RESEARCH", "BOOK", "POST", "ACTIVATION"]

SYSTEM:
  PROJECT_NOTES:
    folder: "_discovery"
    prefix: "NOTES"
    template: "PROJECT_NOTES.md"  # Único por proyecto
    metadata_level: "standard"
    
  WRITING_CONTEXT:
    folder: "config"
    prefix: "CONTEXT"
    template: "WRITING_CONTEXT_[ID].md"
    metadata_level: "standard"
```

### 2. NIVELES DE METADATA

```yaml
METADATA_LEVELS:

  standard:
    fields: [id, type, project, version, created, status, prompt_used]
    
  extended:
    fields: [id, type, project, version, created, updated, status, prompt_used, 
             word_count, processing_time, source_artifacts, quality_metrics]
```

---

## 3. FUNCIÓN AUTO-SAVE GENÉRICA

```markdown
### AUTO_SAVE_ARTIFACT()

**Input parameters:**
- artifact_type: string (ej. "POST_DRAFT", "RESEARCH_REPORT")
- content: string (contenido completo del artefacto)
- project_config: object (configuración del proyecto)
- artifact_params: object (parámetros específicos: name, subtype, chapter_number, etc.)
- prompt_info: object (prompt que genera el artefacto, versión, timestamp)

**Process:**
1. VALIDATE_INPUTS
2. DETECT_PROJECT_CONFIG
3. LOOKUP_ARTIFACT_TYPE 
4. GENERATE_FILENAME
5. GENERATE_METADATA
6. CONSTRUCT_FULL_DOCUMENT
7. SAVE_TO_DRIVE
8. CONFIRM_SAVED

**Output:**
- success: boolean
- file_path: string
- file_url: string  
- metadata: object
```

---

## 4. IMPLEMENTACIÓN EN PROMPTS

### Template de integración

Cualquier prompt que produzca un artefacto debe incluir esta sección:

```markdown
## AUTO-SAVE INTEGRATION

**Artefacto producido:** [TIPO_ARTEFACTO]

**Al finalizar el proceso principal:**

```
PASO FINAL: AUTO-SAVE

AUTO_SAVE_ARTIFACT({
  artifact_type: "[TIPO_ARTEFACTO]",
  content: [contenido_generado],
  project_config: [detectado_automaticamente],
  artifact_params: {
    name: [si_aplica],
    subtype: [si_aplica], 
    chapter_number: [si_aplica]
  },
  prompt_info: {
    prompt_id: "[ID_PROMPT]",
    version: "[VERSION]",
    generated_at: [timestamp]
  }
})

¿Auto-save exitoso?
├─ SÍ → CONFIRMAR ubicación y continuar
└─ NO → PRESENTAR contenido para copia manual + explicar error
```

**Comunicación al editor:**
```
✅ [ARTEFACTO] GUARDADO AUTOMÁTICAMENTE

📄 **Archivo:** [nombre_generado]
📁 **Ubicación:** [carpeta]/
🔗 **Link:** [URL_directo]
📊 **Metadata:** [info_relevante]
```

### Ejemplo: PROMPT_SUMMARIZE_REFERENCES modificado

```markdown
[... proceso normal del prompt ...]

## AUTO-SAVE INTEGRATION

**Artefactos producidos:** REFERENCE_SUMMARY, RESEARCH_PLAN, NARRATIVE_BRIDGE

**Al finalizar:**

```
AUTO-SAVE MÚLTIPLE:

1. AUTO_SAVE_ARTIFACT({
     artifact_type: "REFERENCE_SUMMARY",
     content: [summary_generado],
     project_config: [auto],
     artifact_params: {},
     prompt_info: { prompt_id: "PROMPT_SUMMARIZE_REFERENCES", version: "v4.1" }
   })

2. AUTO_SAVE_ARTIFACT({
     artifact_type: "RESEARCH_PLAN", 
     content: [plan_generado],
     project_config: [auto],
     artifact_params: {},
     prompt_info: { prompt_id: "PROMPT_SUMMARIZE_REFERENCES", version: "v4.1" }
   })

3. AUTO_SAVE_ARTIFACT({
     artifact_type: "NARRATIVE_BRIDGE",
     content: [bridge_generado], 
     project_config: [auto],
     artifact_params: {},
     prompt_info: { prompt_id: "PROMPT_SUMMARIZE_REFERENCES", version: "v4.1" }
   })
```

**Resultado:**
```
✅ INVESTIGACIÓN INICIAL COMPLETADA Y GUARDADA

📄 **Reference Summary:** TA_R_REF_SUM_v1.0.md
📄 **Research Plan:** TA_R_PLAN_v1.0.md  
📄 **Narrative Bridge:** TA_R_BRIDGE_v1.0.md
📁 **Ubicación:** R_research/
⏰ **Procesamiento:** 3.2 minutos

Todos los artefactos están disponibles para la siguiente fase.
```
```

---

## 5. ESTRUCTURA DE ARCHIVO GUARDADO

### Formato estándar

```markdown
---
id:             [COD]_[WORKFLOW]_[TIPO]_[identificador]
type:           [TIPO_ARTEFACTO]  
project:        [COD] — [NOMBRE_PROYECTO]
workflow:       [WORKFLOW_ORIGEN]
version:        [VER]
created:        [timestamp_ISO]
updated:        [timestamp_ISO]  # Solo si es actualización
status:         draft | review | approved | final
generated_by:   [PROMPT_ID] v[PROMPT_VERSION]
---

# [TÍTULO DEL ARTEFACTO]

[CONTENIDO DEL ARTEFACTO]

---

## METADATA DE PRODUCCIÓN

**Generado por:** [PROMPT_ID] v[PROMPT_VERSION]  
**Fecha de creación:** [timestamp_legible]  
**Proyecto:** [COD] — [NOMBRE_PROYECTO]  
**Workflow:** [WORKFLOW_ORIGEN]  

[METADATA ESPECÍFICA SEGÚN NIVEL]

**Metadata estándar:**
- ID único del artefacto
- Prompt que lo generó
- Estado en el workflow

**Metadata extendida (para artefactos complejos):**
- Recuento de palabras
- Tiempo de procesamiento
- Artefactos fuente utilizados  
- Métricas de calidad automáticas
- Siguiente paso recomendado

---

## CONTROL DE VERSIONES AUTOMÁTICO

**Primera versión:** v1.0  
**Actualizaciones menores:** v1.1, v1.2, v1.3...  
**Actualizaciones mayores:** v2.0, v3.0...

**Criterio de versionado:**
- v1.X → ajustes, correcciones, añadidos menores
- vX.0 → reescritura significativa, cambio de estructura

**Detección automática:**
¿Existe archivo con el mismo nombre base?
├─ NO → v1.0
└─ SÍ → incrementar versión apropiadamente

---

## MANEJO DE ERRORES

### Error: No se puede conectar con Drive
**Fallback:** Presentar contenido completo para copia manual + instrucciones de guardado

### Error: Archivo ya existe con misma versión  
**Fallback:** Incrementar versión automáticamente (v1.0 → v1.1)

### Error: Configuración de proyecto incompleta
**Fallback:** Usar naming genérico + solicitar configuración manual

### Error: Tipo de artefacto no reconocido
**Fallback:** Usar configuración genérica + notificar para actualizar registry

---

## BENEFICIOS DE LA ARQUITECTURA GENÉRICA

### Para el editor
- ✅ **Cero copia manual:** todos los artefactos se guardan automáticamente
- ✅ **Naming consistente:** encuentra cualquier artefacto por convención
- ✅ **Versionado automático:** historial completo sin gestión manual
- ✅ **Metadata rica:** contexto de producción siempre disponible

### Para el sistema  
- ✅ **Escalabilidad:** añadir nuevos artefactos es modificar registry + integrar función
- ✅ **Mantenimiento:** lógica de auto-save centralizada, no duplicada
- ✅ **Consistencia:** todos los artefactos siguen el mismo patrón
- ✅ **Debugging:** metadata de producción facilita troubleshooting

### Para el desarrollo
- ✅ **Separación de responsabilidades:** prompts se enfocan en contenido, auto-save en persistencia
- ✅ **Testeable:** función auto-save se puede testear independientemente
- ✅ **Configurable:** cambios de naming o metadata no afectan prompts
- ✅ **Extensible:** añadir nuevos tipos de metadata es cambio de configuración

---

## IMPLEMENTACIÓN EN R1

### Fase 1: Core auto-save (inmediato)
- Implementar AUTO_SAVE_ARTIFACT()
- Configurar ARTIFACT_TYPES_REGISTRY básico
- Integrar en 3-4 prompts principales

### Fase 2: Rollout completo  
- Integrar en todos los prompts de R1
- Metadata extendida para artefactos complejos
- Validación y testing completo

### Fase 3: Optimización
- Cache de configuración de proyecto
- Batch save para prompts que generan múltiples artefactos
- Analytics de uso de auto-save

---

**ARQUITECTURA AUTO-SAVE GENÉRICA COMPLETA**

*Esta arquitectura permite que cualquier prompt de D-X-OPUS guarde automáticamente sus artefactos sin duplicar lógica de persistencia.*
