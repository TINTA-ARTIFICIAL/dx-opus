---
id:          CONTEXT_ACTIVATION
type:        TEMPLATE
subsystem:   ACTIVATION
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  activation-dev
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE_v1.1, MASTER_PLAN_v1.2]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema ACTIVATION. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: ACTIVATION — DEVELOPMENT CHAT

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
Activation genera valor a partir de libros ya escritos: campañas de contenido para publicación inmediata, y propuestas de nuevos libros (BOOK_BRIEF) que relanzan el ciclo completo del sistema. Es el último subsistema en ejecutarse en el flujo lineal, pero también el que cierra el loop del sistema al generar inputs para un nuevo ciclo de Research.

### El loop del sistema

```
Research → Writing Book → ACTIVATION → BOOK_BRIEF
                                            ↓
                              Research (nuevo ciclo, orientado por el brief)
```

El BOOK_BRIEF no sustituye al Research — lo orienta. El editor llega a Research ya sabiendo qué tipo de libro quiere escribir, lo que hace la investigación más dirigida.

### Límites — qué NO gestiona este subsistema
- No escribe los posts directamente — invoca WRITE_POST de `/writing/shared/`
- No investiga nuevos temas — produce el BOOK_BRIEF que orienta a Research, pero no hace Research
- No define la voz del autor — recibe EDITOR_PROFILE de Editorial Profile
- No gestiona la publicación en plataformas — produce el contenido listo para publicar

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| Libro(s) completo(s) | Writing | Input principal del análisis de colección |
| EDITOR_PROFILE | Editorial Profile | Voz y estilo para el contenido de activación |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| Posts / artículos / threads | Publicación directa | Contenido de campaña listo para publicar |
| BOOK_BRIEF | Research | 3-4 propuestas de nuevo libro — input orientador opcional |

### Prompts de `/writing/shared/` que usa
Activation invoca estos prompts pero **no los desarrolla ni los versiona**. Si necesita un cambio en alguno de ellos, lo canaliza a writing-dev.

| Prompt | Owner | Cómo solicitar cambios |
|---|---|---|
| PROMPT_WRITE_POST | writing-dev | Crear DL entry describiendo el cambio necesario y notificar a writing-dev |
| PROMPT_CREATE_TIMELINE | writing-dev | Idem |
| PROMPT_CREATE_CAST | writing-dev | Idem |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión actual | Versión objetivo | Status | Descripción |
|---|---|---|---|---|
| WORKFLOW_ACTIVATION | v1.4 | v1.4 | ACTIVE | Workflow completo del proceso de activación |

**Nota sobre naming:** El archivo actual se llama `WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md`. El nombre objetivo es `WORKFLOW_ACTIVATION_v1.4.md`. El renaming se hace en la Fase 3 del MASTER_PLAN.

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| PROMPT_CREATE_BOOK_BRIEF_v1.0 | 🟡 Baja | — |
| PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK (evaluation-dev) |

---

## SECCIÓN 4: DISEÑO DE PROMPT_CREATE_BOOK_BRIEF

Este es el único prompt nuevo que debe crear este subsistema. Cuando se diseñe, debe contemplar:

**Input:**
- Colección de libros ya escritos (resúmenes o fichas técnicas)
- EDITOR_PROFILE (voz y áreas de expertise del autor)
- Tendencias del mercado editorial (opcional)

**Output — BOOK_BRIEF con 3-4 propuestas, cada una con:**
- Título provisional
- Hipótesis central del libro
- Ángulo editorial diferenciador respecto a la colección existente
- Audiencia objetivo
- Tipo de investigación recomendada (focus type sugerido)
- Por qué este libro ahora (contexto de oportunidad)

**Interfaz con Research:**
El BOOK_BRIEF se entrega al editor, quien decide si lanzar un nuevo proyecto. Si lo lanza, el BOOK_BRIEF se usa como input opcional en la Fase 0 del WORKFLOW_RESEARCH — orienta qué investigar sin sustituir el proceso de investigación.

---

## SECCIÓN 5: TRABAJO ACTIVO

### Tareas del MASTER_PLAN

| Tarea | Descripción | Prioridad | Bloqueado por |
|---|---|---|---|
| F4-03 | Diseñar PROMPT_CREATE_BOOK_BRIEF_v1.0 | 🟡 Baja | — |
| F4-05 | Diseñar PROMPT_EVALUATE_ACTIVATION_v1.0 | 🟡 Baja | RESOURCE_EVALUATION_FRAMEWORK |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL-20260221-005 | BOOK_BRIEF orienta Research sin sustituirlo | Implementar en PROMPT_CREATE_BOOK_BRIEF: el output debe ser orientador, no un plan de investigación completo |
| DL-20260221-006 | Prompts shared en /writing/shared/ — Writing es owner | No proponer cambios directos a WRITE_POST, CREATE_TIMELINE, CREATE_CAST — canalizarlos a writing-dev |
| DL-20260221-003 | Contrato de evaluación estándar | Cuando RESOURCE_EVALUATION_FRAMEWORK esté disponible, diseñar EVALUATE_ACTIVATION con ese output |

---

## SECCIÓN 6: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Confirmar con el editor el objetivo: ¿diseñar BOOK_BRIEF, revisar el workflow, o diseñar EVALUATE_ACTIVATION?
2. Si se trabaja en el workflow: leer `WORKFLOW_ACTIVATION_SISTEMA_TINTA_ARTIFICIAL_v1_4.md` desde el proyecto de Claude
3. Verificar si evaluation-dev ha publicado RESOURCE_EVALUATION_FRAMEWORK (desbloquea EVALUATE_ACTIVATION)
4. Verificar si writing-dev ha modificado algún prompt de /writing/shared/ (via DL entries)

### Al finalizar cada sesión
1. Producir DL entries si se tomaron decisiones que afectan a Research (interfaz BOOK_BRIEF) o Writing (uso de shared prompts)
2. Listar artefactos creados o modificados con su versión

### Formato de commits a GitHub
```
[ACTIVATION] tipo: descripción corta

Ejemplos:
[ACTIVATION] feat: create PROMPT_CREATE_BOOK_BRIEF v1.0
[ACTIVATION] fix: adopt evaluation contract in EVALUATE_ACTIVATION v1.0
[ACTIVATION] docs: update WORKFLOW_ACTIVATION with book brief loop
```

### Cuándo crear una DL entry
- Cuando se define el formato del BOOK_BRIEF (afecta a Research — debe saber cómo consumirlo)
- Cuando se identifica una necesidad de cambio en un prompt de /writing/shared/ (notificar a writing-dev)
- Cuando se añade o modifica cualquier artefacto del subsistema

---

**FIN DEL DOCUMENTO**
