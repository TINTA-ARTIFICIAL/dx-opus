---
id:          ARQUITECTURA_AUTO_SAVE_GENERICA
type:        SCHEMA
subsystem:   SYSTEM
version:     1.1
status:      ACTIVE
created:     2026-05-04
updated:     2026-09-03
owner_chat:  system-architecture
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-09-03 | system-architecture | Eliminada la copia embebida del registro de artefactos y de niveles de metadata — habían quedado desincronizados de `_system/resources/AUTO_SAVE_CONFIG.yaml` (faltaban ANGLES_REPORT y VERIFICATION_MAP; sintaxis de placeholders distinta). Este documento ahora remite al YAML como fuente única. Añadida cabecera YAML estándar, ausente hasta ahora. Ver issue #74, DL pendiente de estructura de carpetas. |
| v1.0 | 2026-05-04 | system-architecture | Versión inicial |

# ARQUITECTURA GENÉRICA AUTO-SAVE D-X-OPUS R1

**Sistema:** D-X-OPUS  
**Componente:** Auto-save genérico para todos los artefactos  
**Alcance:** Todos los workflows de R1

---

## PROPÓSITO

Definir una arquitectura genérica de auto-save que cualquier prompt de D-X-OPUS pueda usar para guardar automáticamente sus artefactos en la estructura de Drive del proyecto con naming estándar y metadatos completos.

**Principio:** Separar la lógica de auto-save de la lógica específica de cada prompt. El auto-save es un servicio que se invoca, no código que se duplica.

---

## COMPONENTES DE LA ARQUITECTURA

### 1. REGISTRO DE TIPOS DE ARTEFACTO

**No se duplica aquí.** La configuración viva de rutas, prefijos, plantillas de nombre y niveles de metadata por tipo de artefacto vive exclusivamente en `_system/resources/AUTO_SAVE_CONFIG.yaml` — es la única fuente de verdad que cualquier prompt o herramienta debe consultar. Una copia embebida en este documento existió hasta v1.0 y quedó desincronizada del YAML real (le faltaban dos tipos de artefacto de WRITING_POST); se eliminó en v1.1 precisamente para que no vuelva a pasar.

### 2. NIVELES DE METADATA

Igual que el registro de artefactos: definidos en `AUTO_SAVE_CONFIG.yaml` bajo `METADATA_LEVELS`, no aquí.

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

Tampoco se duplica aquí — la tabla completa de tipos de error y su fallback (incluido el caso de carpeta destino inexistente, añadido en `AUTO_SAVE_CONFIG.yaml` v1.1 tras el bug de subcarpetas duplicadas) vive en `ERROR_HANDLING` dentro de `AUTO_SAVE_CONFIG.yaml`.

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
