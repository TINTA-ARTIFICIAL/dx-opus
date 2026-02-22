---
id:          CONTEXT_EDITORIAL_PROFILE
type:        TEMPLATE
subsystem:   EDITORIAL_PROFILE
version:     1.2
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  editorial-profile-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |

| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema EDITORIAL PROFILE. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: EDITORIAL PROFILE — DEVELOPMENT CHAT

---

## SECCIÓN 1: SISTEMA D-X-OPUS — VISIÓN GENERAL

D-X-OPUS es un sistema modular de escritura no-ficción asistida por IA. Cubre el proceso completo: investigación, planificación, escritura, evaluación y activación de contenido.

**8 subsistemas, cada uno con su chat de desarrollo independiente:**

| # | Subsistema | Rol |
|---|---|---|
| 0 | SYSTEM | Arquitectura, estándares, TOOLING |
| 1 | KNOWLEDGE BASE | Recursos globales acumulativos (SAH, CVC, Focus Types) |
| 2 | RESEARCH | Investigación profunda |
| 3 | EDITORIAL PROFILE | Perfil del autor, estilo editorial |
| 4 | WRITING | Escritura de libros y posts |
| 5 | EVALUATION | Evaluadores y contrato de evaluación |
| 6 | ACTIVATION | Campaña de contenido, BOOK_BRIEF |
| 7 | DOCS | Documentación del sistema |

**Dos espacios de trabajo:**
- **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS_v1.2`
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Editorial Profile es el único subsistema que modela al humano, no al proceso. Captura quién es el autor como comunicador — su voz, registro, estilo, recursos literarios y restricciones — y proporciona ese conocimiento como contexto activo a Writing y Activation. Sin un EDITOR_PROFILE activo, los textos producidos por el sistema carecen de identidad autoral.

### Límites — qué NO gestiona este subsistema
- No evalúa la calidad objetiva del texto — eso es Evaluation (EVALUATE_BOOK_CONTENT)
- No define el tema del libro ni la investigación — eso es Research
- No gestiona los recursos globales del sistema (SAH, CVC) — eso es Knowledge Base
- No produce texto final — produce el perfil que permite a Writing producir texto con la voz correcta

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Información del autor | Editor | Voz, estilo, ejemplos de textos previos, preferencias |
| RESOURCE_BOOK_TYPES | Este subsistema | Tipos de libros disponibles — referencia para el perfil |
| RESOURCE_EDITORIAL_STYLE | Este subsistema | Estilos editoriales disponibles — referencia para el perfil |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| EDITOR_PROFILE | Writing | Contexto de voz y estilo para escritura de libro o post |
| EDITOR_PROFILE | Activation | Contexto de voz y estilo para contenido derivado |

### Nota sobre EVALUATE_BOOK_STYLE
Este prompt pertenece a Editorial Profile, no a Evaluation. Evalúa **adherencia al perfil** (¿el texto suena como el autor?), no calidad objetiva. Requiere conocer el EDITOR_PROFILE para funcionar, por eso su ownership natural es este subsistema.

### Prompts compartidos que usa
Editorial Profile no invoca prompts de `/writing/shared/`.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| PROMPT_CREATE_EDITOR_PROFILE | v1.0 | v1.0 | ACTIVE | Crea el perfil editorial completo del autor |
| PROMPT_EVALUATE_BOOK_STYLE | v1.0 | v1.1 | NEEDS UPDATE | Evalúa si el texto es fiel a la voz del autor |
| RESOURCE_EDITORIAL_STYLE | v1.0 | v1.0 | ACTIVE | Catálogo de estilos editoriales disponibles en el sistema |
| RESOURCE_BOOK_TYPES | v1.2 | v1.2 | ACTIVE | Tipos de libros que el sistema soporta |

**Nota sobre naming:** `ESTILO_EDITORIAL_TINTA_ARTIFICIAL_v1_0.md` → `RESOURCE_EDITORIAL_STYLE_v1.0.md` y `TIPOS_LIBROS_TINTA_ARTIFICIAL_v1_2.md` → `RESOURCE_BOOK_TYPES_v1.2.md`. El renaming se hace en la Fase 3 del MASTER_PLAN.

### Artefactos pendientes de crear
Ninguno en este momento. El subsistema está completo en artefactos — solo necesita actualizaciones.

---

## SECCIÓN 4: TRABAJO ACTIVO

### Tarea principal: actualizar EVALUATE_BOOK_STYLE v1.1

EVALUATE_BOOK_STYLE necesita adoptar el **contrato de evaluación estándar** definido en `RESOURCE_EVALUATION_FRAMEWORK_v1.0` (lo crea evaluation-dev).

**Contrato de evaluación — output canónico que debe producir:**
```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [qué debe hacer el editor]
  blocking_issues:   [...] (solo en RED)
  improvement_areas: [...] (en YELLOW)
  strengths:         [...] (siempre)
```

**Esta tarea está bloqueada** hasta que evaluation-dev cree RESOURCE_EVALUATION_FRAMEWORK_v1.0.

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad | Bloqueado por |
|---|---|---|---|
| F3-02 | Adoptar contrato de evaluación en EVALUATE_BOOK_STYLE | 🟠 Media | RESOURCE_EVALUATION_FRAMEWORK (evaluation-dev) |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-003 | Evaluation como subsistema independiente con contrato estándar | Actualizar EVALUATE_BOOK_STYLE para adoptar output canónico cuando RESOURCE_EVALUATION_FRAMEWORK esté disponible |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor la tarea objetivo
2. Verificar si evaluation-dev ha publicado RESOURCE_EVALUATION_FRAMEWORK (desbloquea F3-02)
3. Verificar si hay nuevas DL entries que afecten a Editorial Profile

### Al finalizar cada sesión
1. Producir DL entries si se tomaron decisiones que afectan a Writing o Activation
2. Listar artefactos modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_WRITE_CHAPTER.md`, `RESOURCE_EVALUATION_FRAMEWORK.md`
- ❌ Incorrecto: `PROMPT_WRITE_CHAPTER_v1_3.md`, `RESOURCE_EVALUATION_FRAMEWORK_v1_0.md`

La versión se documenta únicamente en:
1. La cabecera YAML: `version: 1.1`
2. El CHANGELOG interno del archivo
3. El mensaje de commit: `[SUBSISTEMA] feat: create PROMPT_X (v1.0)`

### Formato de commits a GitHub
```
[EDITORIAL] tipo: descripción corta

Ejemplos:
[EDITORIAL] fix: adopt evaluation contract in EVALUATE_BOOK_STYLE v1.1
[EDITORIAL] feat: add new style category to RESOURCE_EDITORIAL_STYLE v1.1
```

### Formato de DL entries

Cada DL entry es un archivo independiente en GitHub `/_system/decisions/` con este nombre:
```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

- `SUBSYSTEM` para este chat: `EDITORIAL`
- `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
- Antes de crear una entrada, consulta el último número usado en `/_system/decisions/` para continuar la secuencia

Ejemplo: `DL_20260222_RESEARCH_014.md`

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

### Cuándo crear una DL entry
- Cuando cambia el formato del EDITOR_PROFILE (afecta a Writing y Activation)
- Cuando cambia el output de EVALUATE_BOOK_STYLE (afecta a WORKFLOW_WRITING)
- Cuando se añade un nuevo tipo de libro a RESOURCE_BOOK_TYPES (puede afectar a Writing)

---

**FIN DEL DOCUMENTO**
