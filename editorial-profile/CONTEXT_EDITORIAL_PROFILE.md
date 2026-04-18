---
id:          CONTEXT_EDITORIAL_PROFILE
type:        TEMPLATE
subsystem:   EDITORIAL_PROFILE
version:     1.4
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-16
owner_chat:  editorial-profile-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
| --- | --- | --- | --- |
| v1.4 | 2026-04-16 | JM | Sprint cierre R1. Añadidos TEMPLATE\_EDITOR\_PROFILE, TEMPLATE\_EDITOR\_NOTES, GUIDE\_EDITOR\_NOTES al inventario. Actualizado PROMPT\_CREATE\_EDITOR\_PROFILE a v1.1 y RESOURCE\_BOOK\_TYPES a v1.3 (EP-03). Añadida sección trabajo activo Sprint cierre R1 con EP-01 a EP-05 completadas. Añadido backlog Sprint 4 con issue #3. |
| v1.3 | 2026-03-30 | JM | EVALUATE\_BOOK\_STYLE moved to EVALUATION subsystem (DL\_20260330\_SYSTEM\_004). Updated inventory, limits, and interfaces. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

inputs: [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls: []

## DESCRIPTION

Documento de contexto para el chat de desarrollo del subsistema EDITORIAL PROFILE. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: EDITORIAL PROFILE — DEVELOPMENT CHAT

---

## SECCIÓN 1: SISTEMA D-X-OPUS — VISIÓN GENERAL

D-X-OPUS es un sistema modular de escritura no-ficción asistida por IA. Cubre el proceso completo: investigación, planificación, escritura, evaluación y activación de contenido.

**8 subsistemas, cada uno con su chat de desarrollo independiente:**

| # | Subsistema | Rol |
| --- | --- | --- |
| 0 | SYSTEM | Arquitectura, estándares, TOOLING |
| 1 | KNOWLEDGE BASE | Recursos globales acumulativos (SAH, CVC, Focus Types) |
| 2 | RESEARCH | Investigación profunda |
| 3 | EDITORIAL PROFILE | Perfil del autor, estilo editorial |
| 4 | WRITING | Escritura de libros y posts |
| 5 | EVALUATION | Evaluadores y contrato de evaluación |
| 6 | ACTIVATION | Campaña de contenido, BOOK\_BRIEF |
| 7 | DOCS | Documentación del sistema |

**Dos espacios de trabajo:**

* **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
* **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
* Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
* Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Editorial Profile es el único subsistema que modela al humano, no al proceso. Captura quién es el autor como comunicador — su voz, registro, estilo, recursos literarios y restricciones — y proporciona ese conocimiento como contexto activo a Writing, Activation y Evaluation. Sin un EDITOR\_PROFILE activo, los textos producidos por el sistema carecen de identidad autoral.

### Límites — qué NO gestiona este subsistema

* **No evalúa textos.** La evaluación de adherencia al perfil editorial (EVALUATE\_BOOK\_STYLE, EVALUATE\_POST) pertenece al subsistema EVALUATION. El ownership de un evaluador lo determina su función, no sus inputs. Ver DL\_20260330\_SYSTEM\_004.
* No define el tema del libro ni la investigación — eso es Research
* No gestiona los recursos globales del sistema (SAH, CVC) — eso es Knowledge Base
* No produce texto final — produce el perfil que permite a Writing producir texto con la voz correcta

### Interfaces de entrada

| Artefacto | Origen | Descripción |
| --- | --- | --- |
| Información del autor | Editor | Voz, estilo, ejemplos de textos previos, preferencias |
| RESOURCE\_BOOK\_TYPES | Este subsistema | Tipos de libros disponibles — referencia para el perfil |
| RESOURCE\_EDITORIAL\_STYLE | Este subsistema | Estilos editoriales disponibles — referencia para el perfil |

### Interfaces de salida

| Artefacto | Destino | Descripción |
| --- | --- | --- |
| EDITOR\_PROFILE | Writing | Contexto de voz y estilo para escritura de libro o post |
| EDITOR\_PROFILE | Activation | Contexto de voz y estilo para contenido derivado |
| EDITOR\_PROFILE | Evaluation | Input necesario para EVALUATE\_BOOK\_STYLE y EVALUATE\_POST |

### Prompts compartidos que usa

Editorial Profile no invoca prompts de otros subsistemas.

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión | Status | Descripción |
| --- | --- | --- | --- |
| PROMPT\_CREATE\_EDITOR\_PROFILE | v1.1 | ACTIVE | Crea el perfil editorial completo del autor |
| RESOURCE\_EDITORIAL\_STYLE | v1.0 | ACTIVE | Catálogo de estilos editoriales disponibles en el sistema |
| RESOURCE\_BOOK\_TYPES | v1.3 | ACTIVE | Tipos de libros que el sistema soporta |
| TEMPLATE\_EDITOR\_PROFILE | v1.0 | ACTIVE | Template para crear perfiles de editor |
| TEMPLATE\_EDITOR\_NOTES | v1.0 | ACTIVE | Template ligero para notas del editor durante un proyecto |
| GUIDE\_EDITOR\_NOTES | v1.0 | ACTIVE | Guía completa de uso para las notas del editor |

### Artefactos pendientes de crear

Ninguno en este momento. El subsistema está completo en artefactos.

### Nota sobre EVALUATE\_BOOK\_STYLE

Este evaluador fue trasladado al subsistema EVALUATION en la sesión del 30/03/2026 (DL\_20260330\_SYSTEM\_004). Editorial Profile provee el EDITOR\_PROFILE como input, pero evaluation-dev es el owner del prompt.

---

## SECCIÓN 4: TRABAJO ACTIVO

### Sprint cierre R1 — completado (2026-04-16)

| ID | Tarea | Estado |
| --- | --- | --- |
| EP-01 | Migrar RESOURCE\_EDITORIAL\_STYLE desde Drive | ✅ Completado |
| EP-02 | Migrar TEMPLATE\_EDITOR\_PROFILE, TEMPLATE\_EDITOR\_NOTES, GUIDE\_EDITOR\_NOTES | ✅ Completado |
| EP-03 | Verificar y estandarizar PROMPT\_CREATE\_EDITOR\_PROFILE y RESOURCE\_BOOK\_TYPES | ✅ Completado — v1.1 y v1.3 respectivamente |
| EP-04 | README editorial-profile/ actualizado al cierre R1 | ✅ Completado |
| EP-05 | CONTEXT\_EDITORIAL\_PROFILE v1.3 → v1.4 | ✅ Este documento |

### Backlog Sprint 4

| Issue | Descripción | Tipo |
| --- | --- | --- |
| #3 | Editor profile a partir de post Notes — explorar si el proceso de creación del EDITOR\_PROFILE puede enriquecerse con las notas del editor acumuladas durante producción de posts | Work futuro |

### DECISION\_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
| --- | --- | --- |
| DL\_20260330\_SYSTEM\_004 | EVALUATE\_BOOK\_STYLE movido a Evaluation | ✅ Integrado en v1.3 |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor la tarea objetivo
2. Verificar si hay nuevas DL entries que afecten a Editorial Profile
3. Si se trabaja en RESOURCE\_EDITORIAL\_STYLE o RESOURCE\_BOOK\_TYPES: leer el artefacto actual desde el proyecto de Claude

### Al finalizar cada sesión

1. Producir DL entries si se tomaron decisiones que afectan a Writing, Activation o Evaluation
2. Listar artefactos modificados con su versión

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial completo.

* ✅ Correcto: `PROMPT_CREATE_EDITOR_PROFILE.md`, `RESOURCE_EDITORIAL_STYLE.md`
* ❌ Incorrecto: `PROMPT_CREATE_EDITOR_PROFILE_v1_0.md`

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

* Cuando cambia el formato del EDITOR\_PROFILE (afecta a Writing, Activation y Evaluation)
* Cuando se añade un nuevo tipo de libro a RESOURCE\_BOOK\_TYPES (puede afectar a Writing)
* Cuando se añade o elimina cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
