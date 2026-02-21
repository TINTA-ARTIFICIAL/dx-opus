# ANÁLISIS DE NAMING CONVENTION — SISTEMA D-X-OPUS

**Versión:** 1.2  
**Fecha:** 21 febrero 2026  
**Autor:** Prompt Engineer / AI Architect  
**Scope:** Todos los elementos del sistema: prompts, workflows, recursos, guías, plantillas, schemas y herramientas

**Changelog v1.2:**
- Añadido tipo TOOL como séptimo tipo válido de artefacto (herramientas operativas)
- Actualizada tabla de tipos con TOOL y ejemplo (setup_project.gs)

**Changelog v1.1:**
- Añadido RESOURCE_RESEARCH_FOCUS_TYPES como nuevo recurso pendiente de creación
- Actualizado WORKFLOW_WRITING_BOOKS → WORKFLOW_WRITING_BOOK (singular, solo libros)
- Añadido WORKFLOW_WRITING_POST como workflow pendiente de creación
- Actualizado ejemplo de sortabilidad con el nuevo inventario completo
- Añadida nota sobre decisión de separación POST/BOOK en workflows de escritura

---

## PARTE 1: INVENTARIO DE CONVENCIONES ACTUALES

Antes de proponer nada, hay que entender qué está pasando realmente. El sistema usa diferentes patrones según el tipo de elemento, y dentro de cada tipo hay variaciones. A continuación el inventario exhaustivo.

---

### 1.1 Prompts — Archivos del sistema

**Patrón dominante (correcto):**
```
PROMPT_[VERBO]_[OBJETO]_v[X_Y].md
```

**Inventario completo:**

| Archivo | Patrón | ¿Correcto? |
|---|---|---|
| PROMPT_SUMMARIZE_REFERENCES_v4_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_UPDATE_VALIDATION_CHECKLIST_v3_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_RESEARCH_DEEP_DIVE_v1_1.md | PROMPT_NOUN_MODIFIER_vX_Y | ⚠️ No verbo |
| PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md | PROMPT_VERB_OBJECT_vX_Y_Z | ⚠️ Versión a 3 niveles |
| PROMPT_EXECUTE_RESEARCH_PLAN_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_EVALUATE_RESEARCH_REPORT_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_WRITE_CHAPTER_v1_3.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_WRITE_INTRODUCTION_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_WRITE_PROLOGO_v1_0.md | PROMPT_VERB_OBJECT_SPANISH_vX_Y | ⚠️ Mezcla idioma |
| PROMPT_WRITE_SAMPLE_CHAPTER_v1_0.md | PROMPT_VERB_ADJ_OBJECT_vX_Y | ✅ |
| PROMPT_CREATE_BOOK_INDEX_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_CREATE_CAST_v1_0_.md | PROMPT_VERB_OBJECT_vX_Y_ | ❌ Trailing underscore |
| PROMPT_CREATE_EDITOR_PROFILE_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | PROMPT_VERB_SPANISH_OBJECT_vX_Y | ⚠️ Mezcla idioma |
| PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md | PROMPT_VERB_OBJECT_vX_Y_Z | ⚠️ Versión a 3 niveles |
| PROMPT_CREATE_TIMELINE_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_EVALUATE_BOOK_CONTENT_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_EVALUATE_BOOK_STYLE_v1_0.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |
| PROMPT_CONSOLIDATE_REFERENCES_v1_1.md | PROMPT_VERB_OBJECT_vX_Y | ✅ |

**Problemas detectados en archivos de prompts:**
- 1 typo de trailing underscore (CAST)
- 2 mezclas de idioma en objeto (PROLOGO, FICHA_TECNICA)
- 1 anomalía de versión a 3 niveles (CREATE_RESEARCH_PLAN v2.1.2)
- 1 ausencia de verbo en nombre (RESEARCH_DEEP_DIVE no es verbo+objeto)

---

### 1.2 Workflows — Archivos del sistema

**Patrón dominante:**
```
WORKFLOW_[NOMBRE]_SISTEMA_TINTA_ARTIFICIAL_v[X_Y].md
```

| Archivo | Observación |
|---|---|
| WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL_v3_1.md | ⚠️ Muy verboso |
| WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md | ⚠️ Muy verboso + nombre plural incorrecto |
| WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md | ⚠️ Muy verboso |
| WORKFLOW_WRITING_POST | ❌ No existe — pendiente de creación |

El sufijo `_SISTEMA_TINTA_ARTIFICIAL` se repite en los tres archivos. Es redundante: si todos los archivos del proyecto son del sistema Tinta Artificial, el nombre del sistema en cada archivo no añade información diferenciadora — solo longitud.

**Decisión arquitectónica (21/02/2026):** Los workflows de escritura se separan en dos archivos independientes sin workflow padre. `WORKFLOW_WRITING_BOOKS` pasa a `WORKFLOW_WRITING_BOOK` (singular, solo libros); se crea `WORKFLOW_WRITING_POST` para posts standalone. Los procesos son lo suficientemente distintos (0% prompts compartidos, inputs y outputs completamente diferentes) para justificar la separación. El elemento de cohesión es el `SCHEMA_SYSTEM_OVERVIEW`, no un meta-workflow.

---

### 1.3 Recursos globales — Archivos del sistema

**Sin patrón consistente. Mezclan nombre propio, idioma y sufijo de marca:**

| Archivo | Patrón | Observación |
|---|---|---|
| SOURCE_AUTHORITY_HIERARCHY_v2_0.md | NOUN_NOUN_NOUN_vX_Y | Sin prefijo de tipo |
| CLAIM_VALIDATION_CRITERIA_v1_0.md | NOUN_NOUN_NOUN_vX_Y | Sin prefijo de tipo |
| ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md | SPANISH_NOUN_MARCA_vX_Y | Idioma español + marca |
| TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md | SPANISH_NOUN_MARCA_vX_Y | Idioma español + marca |
| RESOURCE_RESEARCH_FOCUS_TYPES_v1_0.md | — | ❌ No existe aún — pendiente crear |

Problema: No hay prefijo que identifique que estos son recursos globales del sistema frente a artefactos de proyecto.

**Nota sobre RESOURCE_RESEARCH_FOCUS_TYPES:** Este recurso nace ya con la convención correcta (`RESOURCE_` prefix). Al crearlo se convierte automáticamente en el modelo de referencia para renombrar los recursos existentes.

---

### 1.4 Documentación del sistema

**Sin patrón alguno:**

| Archivo | Patrón | Observación |
|---|---|---|
| DESCRIPCION_SISTEMA_DX_OPUS_2000_PALABRAS.md | SPANISH_NOUN_INFO_EXTRA | Sin versión, info extraña en nombre |
| PLAN_ACTIVACION_CONTENIDO_v1.md | SPANISH_NOUN_NOUN_vX | Solo versión mayor (vX sin minor) |
| ARQUITECTURA_VISUAL_ACTIVACION_v1.md | SPANISH_ADJ_NOUN_vX | Solo versión mayor |
| ARQUITECTURA_VISUAL_ACTIVACION_v2.md | Same | Coexisten v1 y v2 sin indicar cuál es canónica |
| GUIA_NOTAS_DEL_EDITOR.md | SPANISH_NOUN_SIN_VERSION | Sin versión |
| TEMPLATE_NOTAS_DEL_EDITOR.md | ENGLISH_TYPE_SPANISH_CONTENT | Mix de idioma en tipo vs contenido |
| EDITOR_PROFILE_TEMPLATE.md | CONTENT_ENGLISH_TYPE | Tipo al final (invertido) |

Aquí hay tres inconsistencias simultáneas: idioma, posición del tipo y presencia de versión.

---

### 1.5 Títulos internos de los prompts (cabecera H1 dentro del archivo)

Este es el naming que la IA ve y usa para auto-referenciarse. También es inconsistente:

| Archivo | Título interno H1 | Observación |
|---|---|---|
| PROMPT_SUMMARIZE_REFERENCES_v4_0.md | `PROMPT FOR INITIAL REFERENCE ANALYSIS` | Descriptivo, no coincide con nombre |
| PROMPT_UPDATE_VALIDATION_CHECKLIST_v3_0.md | Usa `SBSTK_PROMPT_UPDATE_VALIDATION_SYSTEM` en metadata | Prefijo antiguo + nombre diferente al archivo |
| PROMPT_RESEARCH_DEEP_DIVE_v1_1.md | `RESEARCH_DEEP_DIVE: INVESTIGACIÓN PROFUNDA...` | Sin PROMPT prefix |
| PROMPT_WRITE_CHAPTER_v1_3.md | `WRITE_CHAPTER v1.3` | Sin PROMPT prefix |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | `CREATE_FICHA_TECNICA v1.1` | Sin PROMPT prefix |
| PROMPT_EVALUATE_BOOK_CONTENT_v1_0.md | `EVALUATE_BOOK_CONTENT v1.0` | Sin PROMPT prefix |
| PROMPT_EVALUATE_RESEARCH_REPORT_v1_0.md | `EVALUATE_RESEARCH_REPORT v1.0` | Sin PROMPT prefix |
| PROMPT_EXECUTE_RESEARCH_PLAN_v1_0.md | `EXECUTE_RESEARCH_PLAN: DEEP RESEARCH...` | Sin PROMPT prefix |
| PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md | `CREATE_RESEARCH_PLAN: DEEP RESEARCH PLANNING` | Sin PROMPT prefix |

El prefijo `SBSTK_` es un vestigio de una convención anterior ("Substacks"?) que no se completó la migración.

---

### 1.6 Nomenclatura de artefactos de proyecto (outputs)

Los artefactos son los documentos que se producen al ejecutar los prompts en un proyecto concreto. Aquí hay **dos convenciones distintas en conflicto** dentro del propio sistema:

**Convención A — Definida en WORKFLOW_RESEARCH:**
```
[FASE]_[TIPO]_[PROYECTO]_[VERSION].md

Ejemplos:
PHASE1_REFERENCE_SUMMARY_SmartBuildings_v1.0.md
PHASE3_ANNOTATED_REFERENCE_SUMMARY_SmartBuildings.md
PHASE4_RESEARCH_REPORT_SmartBuildings_StateOfArt_v1.0.md
PHASE5_EVALUATION_REPORT_SmartBuildings_20260125.md
```

**Convención B — Definida dentro de EVALUATE_RESEARCH_REPORT:**
```
RESEARCH_REPORT_[TOPIC]_[FOCUS]_v[X.Y].md
RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS]_[DATE].md
RESEARCH_EVALUATION_REPORT_[TOPIC]_COLLECTION_[DATE].md
```

Las diferencias críticas:
- A incluye PHASE prefix, B no lo incluye
- A usa PROJECT (nombre corto), B usa TOPIC (descripción larga)
- A mezcla versión y fecha en la misma posición, B los usa en elementos diferentes
- Los nombres en A usan CamelCase para el proyecto (`SmartBuildings`), B usa SCREAMING_SNAKE_CASE

---

### 1.7 Versionado — Análisis de consistencia

**En nombres de archivo:**

| Formato | Ejemplos | Uso |
|---|---|---|
| `_vX_Y` | v1_0, v3_1, v2_0 | Mayoritario en prompts y recursos |
| `_vX_Y_Z` | v2_1_2 | Solo en CREATE_RESEARCH_PLAN (único caso) |
| `_vX` | v1, v2 | Documentación/arquitectura |
| Sin versión | — | Guías y templates |

**En referencias dentro de los textos:**

| Formato | Ejemplos | Uso |
|---|---|---|
| `vX.Y` | v1.0, v3.1, v4.0 | Estándar en referencias de texto |
| `vX.Y.Z` | v2.1.2 | Solo CREATE_RESEARCH_PLAN |
| `vX` | v1, v2 | Raramente en texto |

La separación underscore (en archivo) vs punto (en texto) es consistente y correcta. El problema es la inconsistencia en el número de niveles.

---

## PARTE 2: DIAGNÓSTICO CONSOLIDADO

### 2.1 Resumen de problemas por categoría

| Categoría | Problema | Severidad |
|---|---|---|
| Prompts — archivos | 1 typo (trailing underscore en CAST) | 🔴 Corregir ya |
| Prompts — archivos | 2 mezclas de idioma (PROLOGO, FICHA_TECNICA) | 🟡 Menor |
| Prompts — títulos internos | Prefijo SBSTK vestigial en 2 archivos | 🟠 Confuso para IA |
| Prompts — títulos internos | Inconsistencia general (con/sin PROMPT prefix) | 🟡 Menor |
| Workflows | Sufijo SISTEMA_TINTA_ARTIFICIAL redundante | 🟡 Ruido |
| Recursos globales | Sin prefijo de tipo que los identifique | 🟠 Confuso |
| Documentación | Sin patrón: idioma, tipo, versión inconsistentes | 🟠 Confuso |
| Artefactos | Dos convenciones en conflicto (WORKFLOW vs prompt) | 🔴 Ambigüedad operativa |
| Versionado | Un caso con 3 niveles (v2.1.2) vs estándar a 2 niveles | 🟡 Menor |
| Templates | Tipo al final en uno, al inicio en otro | 🟡 Menor |

### 2.2 Raíz común de los problemas

El sistema creció de forma orgánica en paralelo a su desarrollo, sin un estándar previo definido. Cada área (research, writing, activation) desarrolló sus convenciones de forma independiente. El resultado es un sistema que es mayoritariamente correcto en el área de prompts pero inconsistente en el resto.

---

## PARTE 3: PROPUESTA DE CONVENCIÓN UNIFICADA

### 3.1 Principios de diseño

Antes de las reglas concretas, los principios que guían la propuesta:

1. **Legibilidad inmediata** — El nombre debe decir qué es el archivo sin abrirlo
2. **Tipo siempre primero** — El prefijo de tipo permite ordenar y filtrar visualmente
3. **Jerarquía de lo general a lo específico** — `TIPO_VERBO_OBJETO_VARIANTE_VERSION`
4. **Un solo idioma por namespace** — Inglés para elementos técnicos del sistema; español solo en nombres propios inevitables
5. **Versionado consistente** — Siempre `vX.Y` (dos niveles), nunca más ni menos
6. **Sin redundancias** — El proyecto es el repositorio; no hay que repetir el nombre del sistema en cada archivo
7. **Separador único** — Underscore `_` en nombres de archivo; punto `.` en versiones dentro del texto

---

### 3.2 Taxonomía de elementos del sistema

El sistema tiene **dos namespaces distintos** que requieren convenciones diferentes:

**Namespace A: Archivos del sistema** (residen en el repositorio, son reutilizables)
```
[TIPO]_[ACCIÓN]_[OBJETO]_v[X.Y].md
```

**Namespace B: Artefactos de proyecto** (se producen al ejecutar el sistema en un proyecto concreto)
```
[COD_PROYECTO]_[WORKFLOW]_[TIPO]_[VARIANTE]_v[X.Y].md
```

---

### 3.3 Reglas: Namespace A — Archivos del sistema

#### Tipos disponibles y sus prefijos

| Prefijo | Tipo | Descripción | Ejemplos actuales |
|---|---|---|---|
| `PROMPT` | Instrucción ejecutable para IA | El motor del sistema | PROMPT_WRITE_CHAPTER |
| `WORKFLOW` | Documentación de proceso | Cómo se encadenan los prompts | WORKFLOW_RESEARCH |
| `RESOURCE` | Recurso global acumulativo | SAH, CVC, estilos, tipos | SOURCE_AUTHORITY_HIERARCHY |
| `GUIDE` | Guía de referencia para el editor | Cómo hacer algo | GUIA_NOTAS_DEL_EDITOR |
| `TEMPLATE` | Plantilla en blanco para el editor | Documento starter | TEMPLATE_NOTAS_DEL_EDITOR |
| `SCHEMA` | Documentación arquitectónica/estructural | Diseño del sistema | ARQUITECTURA_VISUAL |
| `TOOL` | Herramienta operativa (scripts, automatizaciones) | Infraestructura del sistema | setup_project.gs |

#### Regla de construcción

```
[TIPO]_[ACCIÓN_OBJETO]_v[MAJOR.MINOR].md

Donde:
- TIPO: uno de los 6 prefijos anteriores
- ACCIÓN_OBJETO: SCREAMING_SNAKE_CASE, siempre en inglés
- Versión: siempre 2 niveles (vX.Y), separados por punto en texto y underscore en archivo
```

#### Aplicación a los archivos actuales

**Prompts — cambios mínimos:**

| Actual | Propuesto | Cambio |
|---|---|---|
| PROMPT_SUMMARIZE_REFERENCES_v4_0.md | PROMPT_SUMMARIZE_REFERENCES_v4.0.md | Sin cambio de nombre (separador en texto) |
| PROMPT_RESEARCH_DEEP_DIVE_v1_1.md | PROMPT_DEEP_DIVE_RESEARCH_v1.1.md | Verbo primero: DEEP_DIVE → verbo implícito; reordenar |
| PROMPT_WRITE_PROLOGO_v1_0.md | PROMPT_WRITE_PROLOGUE_v1.0.md | Traducir a inglés |
| PROMPT_CREATE_FICHA_TECNICA_v1_1.md | PROMPT_CREATE_BOOK_SHEET_v1.1.md | Traducir "ficha técnica" |
| PROMPT_CREATE_CAST_v1_0_.md | PROMPT_CREATE_CAST_v1.0.md | Eliminar trailing underscore |
| PROMPT_CREATE_RESEARCH_PLAN_v2_1_2.md | PROMPT_CREATE_RESEARCH_PLAN_v2.1.md | Colapsar a 2 niveles |

**Recursos — añadir prefijo RESOURCE:**

| Actual | Propuesto | Cambio |
|---|---|---|
| SOURCE_AUTHORITY_HIERARCHY_v2_0.md | RESOURCE_SOURCE_AUTHORITY_v2.0.md | Añadir prefijo + simplificar nombre |
| CLAIM_VALIDATION_CRITERIA_v1_0.md | RESOURCE_CLAIM_VALIDATION_v1.0.md | Añadir prefijo + simplificar nombre |
| ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md | RESOURCE_EDITORIAL_STYLE_v1.0.md | Añadir prefijo + traducir + eliminar marca |
| TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md | RESOURCE_BOOK_TYPES_v1.2.md | Añadir prefijo + traducir + eliminar marca |
| *(no existe)* | RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md | **Nuevo** — creado con convención correcta desde el inicio |

**Workflows — simplificar sufijo y aplicar decisión POST/BOOK:**

| Actual | Propuesto | Cambio |
|---|---|---|
| WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL_v3_1.md | WORKFLOW_RESEARCH_v3.1.md | Eliminar sufijo redundante |
| WORKFLOW_WRITING_BOOKS_SISTEMA_TINTA_ARTIFICIAL_v1_7.md | WORKFLOW_WRITING_BOOK_v1.7.md | Eliminar sufijo + singular (solo libros) |
| WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md | WORKFLOW_ACTIVATION_v1.4.md | Eliminar sufijo redundante |
| *(no existe)* | WORKFLOW_WRITING_POST_v1.0.md | **Nuevo** — posts standalone; a diseñar |

**Documentación — añadir tipo + versión:**

| Actual | Propuesto | Tipo |
|---|---|---|
| DESCRIPCION_SISTEMA_DX_OPUS_2000_PALABRAS.md | SCHEMA_SYSTEM_OVERVIEW_v1.0.md | SCHEMA |
| PLAN_ACTIVACION_CONTENIDO_v1.md | SCHEMA_ACTIVATION_PLAN_v1.0.md | SCHEMA |
| ARQUITECTURA_VISUAL_ACTIVACION_v1.md | SCHEMA_ACTIVATION_ARCHITECTURE_v1.0.md | SCHEMA |
| ARQUITECTURA_VISUAL_ACTIVACION_v2.md | SCHEMA_ACTIVATION_ARCHITECTURE_v2.0.md | SCHEMA |
| GUIA_NOTAS_DEL_EDITOR.md | GUIDE_EDITOR_NOTES_v1.0.md | GUIDE |
| TEMPLATE_NOTAS_DEL_EDITOR.md | TEMPLATE_EDITOR_NOTES_v1.0.md | TEMPLATE |
| EDITOR_PROFILE_TEMPLATE.md | TEMPLATE_EDITOR_PROFILE_v1.0.md | TEMPLATE |

---

### 3.4 Reglas: Namespace B — Artefactos de proyecto

Los artefactos son outputs de ejecución. Son proyecto-específicos, viven en el repositorio del proyecto, no en el del sistema.

#### Estructura propuesta

```
[COD]_[WF]_[TIPO]_[VARIANTE]_[VERSION_O_FECHA].md

Donde:
- COD: Código de proyecto, 2-4 letras mayúsculas (ej: SB = SmartBuildings, IA = InversionAlgoritmica)
- WF: Workflow de origen — R (Research), W (Writing), A (Activation)
- TIPO: Tipo de artefacto en UPPERCASE (ver tabla)
- VARIANTE: Opcional — focus (HIST, ART, COMP...), capítulo (CH01), idioma, etc.
- Version o fecha: v1.0 si es documento versionable / YYYYMMDD si es snapshot
```

#### Tipos de artefacto y sus códigos

| Código | Nombre completo | Workflow | Fase |
|---|---|---|---|
| REF_SUM | Reference Summary | R | 1 |
| RES_PLAN | Research Plan | R | 1 |
| NAR_BRIDGE | Narrative Bridge | R | 1 |
| VAL_REPORT | Validation Report | R | 2 |
| ANN_REF_SUM | Annotated Reference Summary | R | 3 |
| ANN_RES_PLAN | Annotated Research Plan | R | 3 |
| DEEP_DIVE | Research Deep Dive | R | 4A |
| RES_PLAN_DET | Research Plan Detailed | R | 4B |
| WRITE_INST | Writing Instructions Adapted | R | 4B |
| RES_REPORT | Research Report | R | 4B |
| EVAL_REPORT | Evaluation Report | R | 5 |
| BOOK_INDEX | Book Index | W (Book) | 1 |
| SAMPLE_CH | Sample Chapter | W (Book) | 2 |
| CHAPTER | Chapter | W (Book) | 3 |
| INTRO | Introduction | W (Book) | 4 |
| PROLOGUE | Prologue | W (Book) | 4 |
| TIMELINE | Timeline | W (Book) | 5 |
| CAST | Cast of Characters | W (Book) | 5 |
| REFS | Consolidated References | W (Book) | 5 |
| BOOK_SHEET | Book Technical Sheet | W (Book) | 5 |
| POST_PLAN | Post Plan | W (Post) | 1 |
| POST_DRAFT | Post Draft | W (Post) | 2 |
| POST | Post Final | W (Post) | 3 |
| ACT_CONTEXT | Activation Context | A | 0 |
| ACT_POST_PLAN | Activation Post Plan | A | 3 |
| ACT_POST | Activation Post | A | 4 |

**Códigos de workflow en artefactos:**

| Código | Workflow | Archivo |
|---|---|---|
| R | Research | WORKFLOW_RESEARCH |
| WB | Writing Book | WORKFLOW_WRITING_BOOK |
| WP | Writing Post | WORKFLOW_WRITING_POST |
| A | Activation | WORKFLOW_ACTIVATION |

#### Ejemplos de artefactos nombrados con la nueva convención

```
SB_R_REF_SUM_v1.0.md                      ← SmartBuildings, Research, Reference Summary
SB_R_RES_REPORT_HIST_v1.0.md              ← SmartBuildings, Research, Research Report, Focus Histórico
SB_R_RES_REPORT_ART_v2.0.md               ← SmartBuildings, Research, Research Report, Estado del Arte
SB_R_EVAL_REPORT_20260125.md              ← SmartBuildings, Research, Evaluation Report, fecha
SB_W_CHAPTER_CH03_v1.0.md                ← SmartBuildings, Writing, Capítulo 3
SB_W_CHAPTER_CH03_FINAL.md               ← Versión final aprobada
SB_W_CHAPTER_CH03_FINAL_EDITED.md        ← Versión final editada por editor
SB_A_POST_PLAN_001_v1.0.md               ← SmartBuildings, Activation, Plan del Post #1
SB_A_POST_001_LINKEDIN_v1.0.md           ← SmartBuildings, Activation, Post #1 para LinkedIn
```

#### Estados de documento (para artefactos versionados)

Más allá de la versión numérica, los artefactos de escritura pueden tener estados:

```
_v1.0    → Primera versión generada por IA
_v1.1    → Iteración menor
_FINAL   → Aprobado por el editor
_FINAL_EDITED → Editado manualmente por el editor (versión canónica)
```

---

### 3.5 Reglas: Títulos internos (H1 dentro del archivo)

El título interno del archivo es lo que la IA lee. Debe ser:
1. Idéntico al nombre del archivo (sin extensión, con puntos en versión)
2. En el formato `TIPO_ACCION_OBJETO v[X.Y]`

**Ejemplos:**

```markdown
# PROMPT_SUMMARIZE_REFERENCES v4.0
# PROMPT_WRITE_CHAPTER v1.3
# RESOURCE_SOURCE_AUTHORITY v2.0
# WORKFLOW_RESEARCH v3.1
```

Esto elimina el vestigial `SBSTK_PROMPT_` y unifica la forma en que la IA se auto-referencia.

---

### 3.6 Reglas: Versionado unificado

| Nivel | Cuándo usar | Ejemplo |
|---|---|---|
| **MAJOR (X)** | Rediseño significativo; incompatibilidad con versión anterior | v1.0 → v2.0 |
| **MINOR (Y)** | Mejoras funcionales, nuevas secciones, correcciones de gaps | v1.0 → v1.1 |
| **Sin versión** | Nunca. Todo archivo del sistema tiene versión | — |
| **FINAL/FINAL_EDITED** | Solo para artefactos de proyecto (estado, no versión) | _FINAL |
| **Fecha YYYYMMDD** | Solo para snapshots/evaluaciones de un momento concreto | _20260221 |

**Regla de parche eliminada:** La versión `v2.1.2` (tres niveles) se elimina. Los cambios de ese nivel son MINOR y se colapsan a `v2.2`.

---

## PARTE 4: AUTOEVALUACIÓN DE LA PROPUESTA

Evalúo la propuesta según 9 criterios. Para cada uno, doy una puntuación de 1-5 y analizo honestamente los trade-offs.

---

### Criterio 1: Claridad — ¿Entiendes qué es el archivo sin abrirlo?

**Puntuación: 4/5**

Con la convención propuesta, `PROMPT_SUMMARIZE_REFERENCES_v4.0.md` dice exactamente qué es (un prompt), qué hace (resume referencias) y qué versión es. `SB_R_RES_REPORT_HIST_v1.0.md` dice de qué proyecto es (SB), de qué workflow (R=Research), qué tipo de artefacto (RES_REPORT), qué variante (HIST=Histórico) y versión.

**Dónde pierde un punto:** Los códigos de variante como `HIST`, `ART`, `COMP` para los Research Focus requieren que el usuario conozca el glosario. No son autoexplicativos para alguien externo al sistema.

---

### Criterio 2: Unicidad — ¿Puede haber dos archivos con el mismo nombre?

**Puntuación: 5/5**

En el namespace de sistema: el tipo + acción + objeto garantizan unicidad (no pueden existir dos prompts que hagan exactamente lo mismo con el mismo nombre).

En el namespace de artefactos: el código de proyecto + workflow + tipo + variante + versión/fecha garantizan unicidad incluso si hay múltiples iteraciones del mismo artefacto.

Sin colisiones posibles dentro de cada namespace.

---

### Criterio 3: Sortabilidad — ¿Se agrupan los archivos relacionados en un directorio?

**Puntuación: 4/5**

En el sistema, los archivos se ordenarían por tipo primero:
```
GUIDE_EDITOR_NOTES_v1.0.md
PROMPT_CONSOLIDATE_REFERENCES_v1.1.md
PROMPT_CREATE_BOOK_INDEX_v1.0.md
PROMPT_CREATE_CAST_v1.0.md
PROMPT_CREATE_EDITOR_PROFILE_v1.0.md
PROMPT_CREATE_RESEARCH_PLAN_v3.0.md       ← versión con focus types externalizados
...
RESOURCE_BOOK_TYPES_v1.2.md
RESOURCE_CLAIM_VALIDATION_v1.0.md
RESOURCE_EDITORIAL_STYLE_v1.0.md
RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md    ← nuevo
RESOURCE_SOURCE_AUTHORITY_v2.0.md
...
WORKFLOW_ACTIVATION_v1.4.md
WORKFLOW_RESEARCH_v3.1.md
WORKFLOW_WRITING_BOOK_v1.7.md             ← renombrado (singular)
WORKFLOW_WRITING_POST_v1.0.md             ← nuevo
```

Esto es una mejora significativa sobre la situación actual donde todos se mezclan.

**Dónde pierde un punto:** Todos los prompts se ordenan juntos, pero si hay muchos (ya hay 19), la lista de PROMPTs es larga. Solución alternativa sería sub-carpetas por tipo, pero eso es una decisión de estructura de repositorio, no de naming.

---

### Criterio 4: Completitud — ¿Cubre todos los elementos del sistema?

**Puntuación: 5/5**

La taxonomía de 6 tipos (PROMPT, WORKFLOW, RESOURCE, GUIDE, TEMPLATE, SCHEMA) cubre todos los elementos actuales del sistema sin forzar ninguno. Los artefactos de proyecto tienen su propio namespace separado con tipos específicos por workflow.

---

### Criterio 5: Brevedad — ¿Es conciso y practicable?

**Puntuación: 3/5**

Aquí hay una tensión real. Los artefactos de proyecto pueden quedar largos:
```
SB_R_RES_REPORT_HIST_v1.0.md    ← Aceptable (31 chars)
SB_W_CHAPTER_CH03_FINAL_EDITED.md  ← Algo largo (35 chars)
```

Los archivos de sistema quedan bien:
```
PROMPT_WRITE_CHAPTER_v1.3.md    ← Perfecto (28 chars)
RESOURCE_SOURCE_AUTHORITY_v2.0.md  ← Aceptable (34 chars)
```

**El principal trade-off de la propuesta:** Claridad vs brevedad. He priorizado claridad. Si la brevedad fuera crítica (ej.: sistemas con límites de path), habría que comprimir los tipos de artefacto.

---

### Criterio 6: Consistencia — ¿Las reglas son simples y uniformemente aplicables?

**Puntuación: 4/5**

Las reglas del namespace de sistema son simples y uniformes. Las del namespace de artefactos son algo más complejas por la variedad de contextos (Research Report tiene variantes de focus; Writing tiene números de capítulo; Activation tiene números de post).

**El punto débil:** Decidir si algo es `_FINAL` o `_v2.0` requiere juicio editorial. Podría generar inconsistencias en la práctica. Solución: documentar la regla de decisión claramente (FINAL = aprobado por editor, v2.0 = segunda iteración IA antes de aprobación).

---

### Criterio 7: Estabilidad — ¿Los nombres necesitan cambiar si el sistema evoluciona?

**Puntuación: 4/5**

Los nombres de sistema son estables porque están anclados a lo que hacen los prompts, no a cómo están organizados. Si se añade un nuevo workflow o un nuevo tipo de libro, no hay que renombrar nada existente.

**Riesgo identificado:** Si se añade un cuarto workflow (ej: DISTRIBUTION), habría que añadir un nuevo código de workflow (D) en los artefactos. Esto es controlable y predecible.

**Validación con decisiones recientes:** La separación WORKFLOW_WRITING_BOOK / WORKFLOW_WRITING_POST encaja limpiamente: cada uno tiene su propio nombre y código de workflow (W para book, P para post en artefactos). La creación de RESOURCE_RESEARCH_FOCUS_TYPES encaja igualmente: se crea directamente con la convención correcta, sin forzar nada.

---

### Criterio 8: Compatibilidad hacia atrás — ¿Cuán disruptiva es la migración?

**Puntuación: 2/5**

Este es el punto más débil de la propuesta. Migrar completamente requeriría:

1. **Renombrar ~28 archivos del sistema** — Posible con un script de bash, pero rompe todas las referencias cruzadas dentro de los prompts y workflows.
2. **Actualizar referencias internas** — Cada prompt que menciona `SOURCE_AUTHORITY_HIERARCHY` o `WORKFLOW_RESEARCH_SISTEMA_TINTA_ARTIFICIAL` requiere edición manual.
3. **Actualizar títulos internos H1** — Cada archivo de prompt requiere editar el encabezado.

**Propuesta de migración escalonada para mitigar el impacto:**
- Fase 0: Corregir typos y errores (0 impacto en referencias): trailing underscore, v2.1.2 → v2.1
- Fase 1: Estandarizar títulos internos H1 (impacto mínimo en flujo)
- Fase 2: Renombrar recursos globales (impacto medio, pocas referencias)
- Fase 3: Renombrar workflows (impacto medio)
- Fase 4: Estandarizar artefactos (solo afecta proyectos futuros)
- Fase 5: Renombrar prompts (máximo impacto, dejar para último)

---

### Criterio 9: Compatibilidad con herramientas — ¿Funciona bien en sistemas de archivos, búsquedas, etc.?

**Puntuación: 5/5**

- Sin espacios: ✅
- Sin caracteres especiales: ✅
- Lowercase extension: ✅
- Compatible con grep/search por tipo: ✅ (`ls PROMPT_*` lista todos los prompts)
- Compatible con versión semántica: ✅
- Compatible con Git: ✅

---

### 4.1 Scorecard de la propuesta

| Criterio | Puntuación | Nota |
|---|---|---|
| Claridad | 4/5 | Códigos de variante requieren glosario |
| Unicidad | 5/5 | Sin colisiones posibles |
| Sortabilidad | 4/5 | Buena, mejoraría con subcarpetas |
| Completitud | 5/5 | Cubre todos los elementos |
| Brevedad | 3/5 | Prioriza claridad sobre brevedad |
| Consistencia | 4/5 | Reglas de artefactos más complejas |
| Estabilidad | 4/5 | Resiliente a evolución del sistema |
| Compatibilidad hacia atrás | 2/5 | Migración costosa |
| Compatibilidad con herramientas | 5/5 | Perfecta |
| **TOTAL** | **36/45 = 80%** | |

---

### 4.2 Alternativa más conservadora (si 80% no es suficiente)

Si la compatibilidad hacia atrás es la prioridad, existe una alternativa que requiere mínimos cambios:

**Variante B: Correcciones mínimas + convención de artefactos nueva**

Solo cambiar:
1. Corregir el typo del trailing underscore en CAST
2. Eliminar el prefijo `SBSTK_` de los títulos internos
3. Establecer la convención de artefactos para proyectos futuros (sin renombrar nada existente)
4. Añadir versión faltante a guías y templates

**Puntuación variante B:**
- Claridad: 3/5 (sin prefijo de tipo en recursos)
- Compatibilidad hacia atrás: 5/5 (cambios mínimos)
- Total estimado: ~72%

La diferencia entre propuesta principal y variante B es principalmente el añadir prefijos de tipo a recursos y simplificar los workflows. El coste es relativamente bajo si se hace como parte de una actualización mayor de los archivos (que de todas formas es necesaria para los gaps de estructura identificados en la auditoría).

---

## PARTE 5: RECOMENDACIÓN FINAL

La propuesta de convención unificada (80%) es la correcta a largo plazo. La incompatibilidad hacia atrás es el único coste real, y ese coste es manejable con un plan de migración escalonado.

**Recomendación concreta:**

Adoptar la convención propuesta como estándar para **todo lo que se cree de ahora en adelante** y ejecutar la migración de archivos existentes como parte del Sprint 1 de la auditoría de Research, aprovechando que ya hay que tocar esos archivos para resolver los gaps de estructura identificados.

El orden de prioridad para la migración es el inverso al impacto: empezar por los cambios más baratos y dejar los prompts (máximo impacto en referencias cruzadas) para cuando se hayan resuelto los gaps de contenido.

**Elementos que nacen ya con convención correcta (no requieren migración):**
- `RESOURCE_RESEARCH_FOCUS_TYPES_v1.0.md` — nuevo resource a crear
- `WORKFLOW_WRITING_POST_v1.0.md` — nuevo workflow a crear
- `PROMPT_CREATE_RESEARCH_PLAN_v3.0.md` — nueva versión que externaliza focus types

**Inventario final del sistema con convención aplicada:**

| Tipo | Archivos actuales | Archivos objetivo |
|---|---|---|
| PROMPT | 19 | 19 (mismos, con correcciones menores) |
| WORKFLOW | 3 → 4 | RESEARCH, WRITING (unificado), ACTIVATION, +(WRITING_POST pendiente) |
| RESOURCE | 4 → 6 | +RESEARCH_FOCUS_TYPES (nuevo) +EVALUATION_FRAMEWORK (nuevo) |
| GUIDE | 1 | GUIDE_EDITOR_NOTES |
| TEMPLATE | 2 → 3 | TEMPLATE_EDITOR_NOTES, TEMPLATE_EDITOR_PROFILE, +SUBSYSTEM_CONTEXT (nuevo) |
| SCHEMA | 4 → 6 | +SYSTEM_ARCHITECTURE (nuevo) +DECISION_LOG (nuevo) |
| TOOL | 0 → 2 | TOOL_SETUP_PROJECT (nuevo), TOOL_GITHUB_REPO_STRUCTURE (nuevo) |

---

**FIN DEL DOCUMENTO**

*Última actualización: v1.1 — 21 febrero 2026*
