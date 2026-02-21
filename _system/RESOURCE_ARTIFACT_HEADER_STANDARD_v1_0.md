---
id:          RESOURCE_ARTIFACT_HEADER_STANDARD
type:        RESOURCE
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  []
outputs: [Cabecera estándar aplicada a todos los artefactos del sistema]
calls:   []

## DESCRIPTION
Especificación formal de la cabecera YAML obligatoria para todos los artefactos del sistema D-X-OPUS. Define campos, valores válidos, reglas de aplicación y ejemplos por tipo de artefacto.

---

# RESOURCE: ARTIFACT HEADER STANDARD
## Sistema D-X-OPUS — Especificación de Cabecera Estándar

---

## PARTE 1: PROPÓSITO

Todos los artefactos del sistema D-X-OPUS incluyen una cabecera YAML estandarizada al inicio del archivo. Esta cabecera cumple tres funciones simultáneas:

1. **Para la IA:** Auto-referencia correcta, conocimiento de dependencias, identificación de versión activa
2. **Para el desarrollador:** Estado del artefacto de un vistazo sin abrirlo
3. **Para DOCS:** Extracción automática de metadatos para mantener el inventario del sistema

La cabecera es **obligatoria** en todos los artefactos del sistema. Los artefactos de proyecto (RESEARCH_REPORTs, capítulos, posts en Drive) tienen su propia convención de naming pero no requieren esta cabecera.

---

## PARTE 2: ESTRUCTURA COMPLETA

```yaml
---
id:          [NOMBRE_CANÓNICO_SIN_VERSION]
type:        [VER TIPOS VÁLIDOS]
subsystem:   [VER SUBSISTEMAS VÁLIDOS]
version:     X.Y
status:      [DRAFT | ACTIVE | DEPRECATED]
created:     YYYY-MM-DD
updated:     YYYY-MM-DD
owner_chat:  [nombre-del-chat-de-desarrollo]
---
```

Seguido inmediatamente (sin línea en blanco) por:

```markdown
## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | YYYY-MM-DD | [iniciales] | Initial version |

## DEPENDENCIES
inputs:  [lista de IDs de artefactos necesarios como entrada, o [] si ninguno]
outputs: [lista de IDs de artefactos que produce, o [] si ninguno]
calls:   [lista de IDs de prompts que invoca durante ejecución, o [] si ninguno]

## DESCRIPTION
[Una sola línea: qué hace este artefacto y cuándo se usa]
```

A continuación comienza el contenido del artefacto con un separador `---` y un título H1.

---

## PARTE 3: CAMPOS Y VALORES VÁLIDOS

### 3.1 Campo `id`

Nombre canónico del artefacto **sin versión** y **sin extensión**.

```
PROMPT_WRITE_CHAPTER
RESOURCE_SOURCE_AUTHORITY
WORKFLOW_RESEARCH
TOOL_SETUP_PROJECT
```

Reglas:
- SCREAMING_SNAKE_CASE
- Coincide con el nombre del archivo eliminando `_vX_Y.md`
- Estable entre versiones — no cambia cuando sube la versión

---

### 3.2 Campo `type`

| Valor | Descripción | Extensión |
|---|---|---|
| `PROMPT` | Instrucción ejecutable para IA. Motor del sistema. | .md |
| `WORKFLOW` | Documentación de proceso. Cómo se encadenan los prompts. | .md |
| `RESOURCE` | Recurso global acumulativo. SAH, CVC, estilos, tipos. | .md |
| `GUIDE` | Guía de referencia para el editor. Cómo hacer algo. | .md |
| `TEMPLATE` | Plantilla en blanco. Documento starter para el editor o desarrollador. | .md |
| `SCHEMA` | Documentación arquitectónica o estructural. Diseño del sistema. | .md |
| `TOOL` | Herramienta operativa. Scripts, automatizaciones, infraestructura. | .gs / .py / .sh / .md |

---

### 3.3 Campo `subsystem`

| Valor | Subsistema | Chat de desarrollo |
|---|---|---|
| `SYSTEM` | Arquitectura, estándares, TOOLING | system-architecture |
| `KNOWLEDGE_BASE` | SAH, CVC, Focus Types | knowledge-base-dev |
| `RESEARCH` | Investigación profunda | research-dev |
| `EDITORIAL_PROFILE` | Perfil del autor, estilo editorial | editorial-profile-dev |
| `WRITING` | Escritura de libros y posts | writing-dev |
| `EVALUATION` | Evaluadores y contrato de evaluación | evaluation-dev |
| `ACTIVATION` | Campaña de contenido, BOOK_BRIEF | activation-dev |
| `DOCS` | Documentación del sistema | docs-dev |
| `SHARED` | Prompts compartidos entre subsistemas | [owner principal] |

---

### 3.4 Campo `version`

Formato: `X.Y` — siempre dos niveles, separados por punto.

| Cambio | Nivel | Ejemplo |
|---|---|---|
| Rediseño incompatible, cambio arquitectónico | MAJOR (X) | v1.0 → v2.0 |
| Mejoras funcionales, nuevas secciones, corrección de gaps | MINOR (Y) | v1.0 → v1.1 |

Reglas adicionales:
- Nunca tres niveles (~~v2.1.2~~)
- Nunca un solo nivel (~~v1~~)
- El nombre del archivo usa underscore: `_v1_0.md`
- Las referencias en texto usan punto: `v1.0`

---

### 3.5 Campo `status`

| Valor | Descripción |
|---|---|
| `DRAFT` | En desarrollo, no usar en producción |
| `ACTIVE` | Versión en uso activo |
| `DEPRECATED` | Reemplazado por versión posterior, no usar |

Solo puede haber **una versión ACTIVE** de cada artefacto por ID. Cuando se publica v1.1, v1.0 pasa a DEPRECATED.

---

### 3.6 Campo `owner_chat`

Nombre del chat de Claude responsable del desarrollo y evolución del artefacto. Usa kebab-case.

```
system-architecture
knowledge-base-dev
research-dev
editorial-profile-dev
writing-dev
evaluation-dev
activation-dev
docs-dev
```

---

### 3.7 Bloque CHANGELOG

Registro cronológico inverso (última versión primero) de todos los cambios.

```markdown
## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.2 | 2026-03-15 | JM | Added focus type H: Longitudinal Analysis |
| v1.1 | 2026-02-28 | JM | Corrected section references (GAP-R01) |
| v1.0 | 2026-02-21 | JM | Initial version |
```

- `Author`: iniciales del desarrollador
- `Summary`: descripción concisa del cambio en 5-10 palabras
- Obligatorio para todas las versiones, incluida v1.0

---

### 3.8 Bloque DEPENDENCIES

Tres listas separadas según el tipo de relación:

```markdown
## DEPENDENCIES
inputs:  [RESOURCE_SOURCE_AUTHORITY, RESOURCE_CLAIM_VALIDATION, EDITOR_PROFILE]
outputs: [RESEARCH_PLAN_DETAILED, WRITING_INSTRUCTIONS_ADAPTED]
calls:   [PROMPT_EVALUATE_RESEARCH_REPORT]
```

- `inputs`: artefactos que este artefacto **necesita recibir** para ejecutarse
- `outputs`: artefactos que este artefacto **produce** al ejecutarse
- `calls`: otros prompts que este artefacto **invoca durante su ejecución**

La distinción entre `inputs` y `calls` es importante:
- `inputs` son documentos/datos de entrada
- `calls` son prompts activos invocados (permite trazar el grafo de llamadas entre prompts)

Usar `[]` cuando la lista está vacía. No omitir el campo.

---

### 3.9 Bloque DESCRIPTION

Una sola línea. Responde: ¿qué hace este artefacto y cuándo se usa?

```markdown
## DESCRIPTION
Guía el proceso de planificación detallada de una investigación profunda. Se usa después de SUMMARIZE_REFERENCES cuando el editor elige RAMA B.
```

---

## PARTE 4: REGLAS DE APLICACIÓN

### 4.1 Artefactos nuevos

Todo artefacto creado a partir de la publicación de este estándar incluye la cabecera completa desde su v1.0.

### 4.2 Artefactos existentes

La cabecera se añade progresivamente, priorizando los artefactos que se modifican por otros motivos (no se hace una pasada de actualización masiva solo para añadir cabeceras). Cuando se toca un artefacto existente por cualquier razón, se añade la cabecera en ese momento.

### 4.3 Herramientas (type: TOOL)

Los scripts en lenguajes como `.gs`, `.py`, o `.sh` incluyen la cabecera como comentario al inicio del archivo:

```javascript
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

DESCRIPTION:
Google Apps Script para crear la estructura estándar de carpetas
de un proyecto de escritura en Google Drive.
*/
```

### 4.4 Ubicación en el archivo

La cabecera es **siempre el primer contenido del archivo**, antes de cualquier título o texto. El `---` de apertura está en la línea 1.

---

## PARTE 5: EJEMPLO COMPLETO

```markdown
---
id:          PROMPT_CREATE_RESEARCH_PLAN
type:        PROMPT
subsystem:   RESEARCH
version:     3.0
status:      ACTIVE
created:     2026-01-25
updated:     2026-02-21
owner_chat:  research-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v3.0 | 2026-02-21 | JM | Externalized focus types to RESOURCE_RESEARCH_FOCUS_TYPES |
| v2.2 | 2026-02-21 | JM | Corrected section references (GAP-R01, GAP-R02) |
| v2.1 | 2026-01-25 | JM | Added Research Focus 7: Seminal Concept Analysis |
| v2.0 | 2026-01-20 | JM | Complete redesign with research jobs structure |
| v1.0 | 2026-01-10 | JM | Initial version |

## DEPENDENCIES
inputs:  [REFERENCE_SUMMARY, ANNOTATED_REFERENCE_SUMMARY, RESEARCH_PLAN,
          ANNOTATED_RESEARCH_PLAN, NARRATIVE_BRIDGE, RESOURCE_SOURCE_AUTHORITY,
          RESOURCE_CLAIM_VALIDATION, RESOURCE_RESEARCH_FOCUS_TYPES,
          WRITING_INSTRUCTIONS_STANDARD]
outputs: [RESEARCH_PLAN_DETAILED, WRITING_INSTRUCTIONS_ADAPTED]
calls:   []

## DESCRIPTION
Guía la planificación detallada de una investigación profunda (RAMA B). Se usa después de que el editor ha anotado el REFERENCE_SUMMARY y el RESEARCH_PLAN orientativo.

---

# CREATE_RESEARCH_PLAN: DEEP RESEARCH PLANNING SYSTEM

[contenido del prompt...]
```

---

**FIN DEL DOCUMENTO**
