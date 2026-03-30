---
id:          CONTEXT_EDITORIAL_PROFILE
type:        TEMPLATE
subsystem:   EDITORIAL_PROFILE
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-30
owner_chat:  editorial-profile-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-03-30 | JM | EVALUATE_BOOK_STYLE moved to EVALUATION subsystem (DL_20260330_SYSTEM_004). Updated inventory, limits, and interfaces. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
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
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
- Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
Editorial Profile es el único subsistema que modela al humano, no al proceso. Captura quién es el autor como comunicador — su voz, registro, estilo, recursos literarios y restricciones — y proporciona ese conocimiento como contexto activo a Writing, Activation y Evaluation. Sin un EDITOR_PROFILE activo, los textos producidos por el sistema carecen de identidad autoral.

### Límites — qué NO gestiona este subsistema
- **No evalúa textos.** La evaluación de adherencia al perfil editorial (EVALUATE_BOOK_STYLE, EVALUATE_POST) pertenece al subsistema EVALUATION. El ownership de un evaluador lo determina su función, no sus inputs. Ver DL_20260330_SYSTEM_004.
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
| EDITOR_PROFILE | Evaluation | Input necesario para EVALUATE_BOOK_STYLE y EVALUATE_POST |

### Prompts compartidos que usa
Editorial Profile no invoca prompts de otros subsistemas.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_CREATE_EDITOR_PROFILE | v1.0 | ACTIVE | Crea el perfil editorial completo del autor |
| RESOURCE_EDITORIAL_STYLE | v1.0 | ACTIVE | Catálogo de estilos editoriales disponibles en el sistema |
| RESOURCE_BOOK_TYPES | v1.2 | ACTIVE | Tipos de libros que el sistema soporta |

### Artefactos pendientes de crear
Ninguno en este momento. El subsistema está completo en artefactos.

### Nota sobre EVALUATE_BOOK_STYLE
Este evaluador fue trasladado al subsistema EVALUATION en la sesión del 30/03/2026 (DL_20260330_SYSTEM_004). Editorial Profile provee el EDITOR_PROFILE como input, pero evaluation-dev es el owner del prompt.

---

## SECCIÓN 4: TRABAJO ACTIVO

### Tareas del MASTER_PLAN

Ninguna tarea activa asignada a Editorial Profile en este momento.

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260330_SYSTEM_004 | EVALUATE_BOOK_STYLE movido a Evaluation | ✅ Integrado en esta versión del contexto |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor la tarea objetivo
2. Verificar si hay nuevas DL entries que afecten a Editorial Profile
3. Si se trabaja en RESOURCE_EDITORIAL_STYLE o RESOURCE_BOOK_TYPES: leer el artefacto actual desde el proyecto de Claude

### Al finalizar cada sesión
1. Producir DL entries si se tomaron decisiones que afectan a Writing, Activation o Evaluation
2. Listar artefactos modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

- ✅ Correcto: `PROMPT_CREATE_EDITOR_PROFILE.md`, `RESOURCE_EDITORIAL_STYLE.md`
- ❌ Incorrecto: `PROMPT_CREATE_EDITOR_PROFILE_v1_0.md`

### Formato de commits a GitHub
```
[EDITORIAL] tipo: descripción corta

Ejemplos:
[EDITORIAL] feat: add new style category to RESOURCE_EDITORIAL_STYLE v1.1
[EDITORIAL] fix: update EDITOR_PROFILE output format
```

### Formato de DL entries

```
DL_YYYYMMDD_EDITORIAL_[NNN].md
```

### Cuándo crear una DL entry
- Cuando cambia el formato del EDITOR_PROFILE (afecta a Writing, Activation y Evaluation)
- Cuando se añade un nuevo tipo de libro a RESOURCE_BOOK_TYPES (puede afectar a Writing)
- Cuando se añade o elimina cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
