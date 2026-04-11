---
id:          CONTEXT_WRITING
type:        TEMPLATE
subsystem:   WRITING
version:     1.3
status:      ACTIVE
created:     2026-02-21
updated:     2026-04-11
owner_chat:  writing-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.3 | 2026-04-11 | JM | Sprint 3: full RAMA POST inventory added (10 prompts + 5 support artifacts). WRITING_CONTEXT and POST_SEED added as canonical artifacts. DL entries 015–020 and 023 added. Work active section updated with Sprint 3 tasks and implementation notes. |
| v1.2 | 2026-02-22 | JM | Added DL entry format with filename convention and subsystem code |
| v1.1 | 2026-02-21 | JM | Added explicit filename naming rule — no version in filename, Git manages history |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES

inputs: [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls: []

## DESCRIPTION

Documento de contexto para el chat de desarrollo del subsistema WRITING. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: WRITING — DEVELOPMENT CHAT

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

* **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
* **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**

* Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
* Naming convention: sin versión en nombre de archivo en GitHub — Git gestiona el historial
* Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
* Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol

Writing produce el texto final — libro o post — a partir de la investigación (Research) y la identidad del autor (Editorial Profile). Es el subsistema con mayor número de prompts y el de mayor complejidad de proceso.

### Bifurcación Book / Post

El editor decide al entrar al WORKFLOW_WRITING si produce un libro o un post. La decisión ocurre antes de invocar cualquier prompt. Los prompts de cada rama son completamente distintos (0% compartidos entre ramas, salvo PROMPT_WRITE_POST que vive en /writing/shared/).

### Artefactos canónicos de la RAMA POST

**WRITING_CONTEXT** — combinación reutilizable de EDITOR_PROFILE + PUBLICATION_PROFILE + tipo de texto. Es el artefacto de configuración del workflow POST. PROMPT_POST_BRIEF lo carga si existe y lo crea si no. Incluye campo `default` para el contexto habitual del editor.

**POST_SEED** — artefacto canónico que unifica la interfaz de PROMPT_WRITE_POST independientemente del camino de entrada (RAMA POST autónomo o Activation). Combina el contenido procesado con la voz posicionada del editor. Contiene: pregunta central, movimiento narrativo, estructura de secciones con presupuesto, INVENTARIO_IDEAS, fuentes verificadas y WRITING_CONTEXT activo.

### Límites — qué NO gestiona este subsistema

* No hace la investigación — recibe RESEARCH_REPORTs o RESEARCH_DEEP_DIVE de Research
* No define la voz del autor — recibe EDITOR_PROFILE de Editorial Profile
* No evalúa calidad del texto producido — invoca evaluadores de Evaluation
* No define el PUBLICATION_PROFILE — lo crea como parte del WRITING_CONTEXT si no existe
* No gestiona el mecanismo de actualización del EDITOR_PROFILE por aprendizaje — eso es Sprint 4 (writing-dev + editorial-profile-dev + evaluation-dev)

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| RESEARCH_REPORT(s) | Research | Input principal RAMA BOOK |
| RESEARCH_DEEP_DIVE | Research | Input alternativo RAMA BOOK |
| EDITOR_PROFILE | Editorial Profile | Voz, estilo y restricciones del autor |
| WRITING_CONTEXT | Propio (si existe) | Configuración reutilizable del workflow POST |
| POST_PLAN | Activation (opcional) | Plan de post procedente de campaña de activación |
| BOOK_BRIEF | Activation (opcional) | Orienta el índice cuando el libro viene propuesto por Activation |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| Libro completo | Activation | Input para campaña de contenido |
| POST_SEED | PROMPT_WRITE_POST | Input canónico de escritura (RAMA POST) |
| Post publicable | Publicación directa | Output final de RAMA POST |
| LEARNING_SIGNALS | Futura actualización EDITOR_PROFILE | Señales capturadas en Q&A, correcciones y delta borrador/publicado |

### Prompts shared — owned by Writing, invocados por Activation

Estos prompts viven en `/writing/shared/`. Writing los desarrolla y versiona. Cuando se modifican, se notifica a activation-dev via DL entry.

| Prompt | Invocado también por | Criterio de evolución |
|---|---|---|
| PROMPT_WRITE_POST | Activation | Calidad de escritura: voz, estructura, registro |
| PROMPT_CREATE_TIMELINE | Activation | Síntesis cronológica y criterios literarios |
| PROMPT_CREATE_CAST | Activation | Caracterización y descripción de personajes |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### RAMA BOOK — artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_CREATE_BOOK_INDEX | v1.0 | ACTIVE | Crea el índice estructurado del libro |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | ACTIVE | Escribe el capítulo de muestra para validar voz |
| PROMPT_WRITE_CHAPTER | v1.3 | ACTIVE | Escribe cada capítulo del libro |
| PROMPT_WRITE_INTRODUCTION | v1.0 | ACTIVE | Escribe la introducción |
| PROMPT_WRITE_PROLOGUE | v1.0 | ACTIVE | Escribe el prólogo |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | ACTIVE | Consolida y formatea la bibliografía |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | ACTIVE | Genera la ficha técnica del libro |

### RAMA POST — artefactos Sprint 3 (todos en desarrollo)

**Secuencia del workflow:**

```
PROMPT_POST_BRIEF
      ↓
PROMPT_POST_EXPLORE     ← solo cuando el input es escaso
      ↓
PROMPT_SUMMARIZE_REF
      ↓
PROMPT_VERIFY_RESEARCH
      ↓
PROMPT_QA_IDEAS         ← siempre, salvo skip explícito del editor
      ↓
PROMPT_POST_ANGLES      ← siempre, trabaja sobre material completo post-Q&A
      ↓
PROMPT_PLAN_POST
      ↓
PROMPT_WRITE_POST       ← shared, en /writing/shared/
      ↓
PROMPT_EVALUATE_POST    ← owner: evaluation-dev
      +
PROMPT_SPLIT_POST       ← invocable en cualquier fase
```

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| PROMPT_POST_BRIEF | v1.0 | PENDING | Punto de entrada. Carga/crea WRITING_CONTEXT. Detecta texto previo. Gestiona skip de Q&A con aviso. |
| PROMPT_POST_EXPLORE | v1.0 | PENDING | Exploración cuando el input es escaso. Propone ángulos, hace research inicial. |
| PROMPT_SUMMARIZE_REF | v1.0 | PENDING | Procesa fuentes. Distingue fuente-de-ejemplo vs fuente-de-argumento. Marca material personal del editor como intocable. |
| PROMPT_VERIFY_RESEARCH | v1.0 | PENDING | Verifica puntualmente afirmaciones del editor. Produce mapa de estado visible. |
| PROMPT_QA_IDEAS | v1.0 | PENDING | Q&A secuencial. Siempre activo salvo skip. Marca 🔴 MATERIAL PARA EL POST y 📘 SEÑAL DE APRENDIZAJE. Produce INVENTARIO_IDEAS. |
| PROMPT_POST_ANGLES | v1.0 | PENDING | Propone enfoques, ángulos y narrative seeds sobre material completo post-Q&A. |
| PROMPT_PLAN_POST | v1.0 | PENDING | Fija arquitectura del post: pregunta central, movimiento narrativo, secciones, presupuesto de palabras. |
| PROMPT_WRITE_POST | v2.0 | NEEDS UPDATE | Input canónico cambia a POST_SEED. Modo híbrido por declaración explícita. Usa formulaciones literales sin modificación. |
| PROMPT_SPLIT_POST | v1.0 | PENDING | Divide post en dos. Identifica corte natural según WRITING_CONTEXT y EDITOR_PROFILE. |

### Recursos y templates — Sprint 3

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| RESOURCE_WRITING_CONTEXT | v1.0 | PENDING | Esquema canónico: EDITOR_PROFILE + PUBLICATION_PROFILE + tipo de texto. Campo default. |
| RESOURCE_PUBLICATION_PROFILE | v1.0 | PENDING | Entidad independiente del EDITOR_PROFILE. Identificador único por publicación. |
| TEMPLATE_POST_SEED | v1.0 | PENDING | Estructura canónica del POST_SEED — input unificado de PROMPT_WRITE_POST. |
| TEMPLATE_POST_BRIEFING | v1.0 | PENDING | Briefing de continuación: fijado / abierto / en riesgo. |
| SPEC_LEARNING_SIGNALS | v1.0 | PENDING | Especificación de las tres señales de aprendizaje del EDITOR_PROFILE. Prerequisito Sprint 4. |

### Shared — owned by Writing

| Artefacto | Versión | Status | Invocado por |
|---|---|---|---|
| PROMPT_WRITE_POST | v1.0 → v2.0 | NEEDS UPDATE | Writing (Post), Activation |
| PROMPT_CREATE_TIMELINE | v1.0 | ACTIVE | Writing (Book), Activation |
| PROMPT_CREATE_CAST | v1.0 | ACTIVE | Writing (Book), Activation |

### Workflow

| Artefacto | Versión actual | Versión objetivo | Status |
|---|---|---|---|
| WORKFLOW_WRITING | v1.7 | v2.0 | NEEDS REFACTOR — Sprint 3 |

---

## SECCIÓN 4: FLUJO INTERNO

### RAMA BOOK

```
Inputs: RESEARCH_REPORT(s) + EDITOR_PROFILE + [BOOK_BRIEF opcional]
         ↓
CREATE_BOOK_INDEX → BOOK_INDEX
         ↓
WRITE_SAMPLE_CHAPTER → SAMPLE_CHAPTER
         ↓
[Checkpoint: editor aprueba voz y estructura]
         ↓
WRITE_CHAPTER × N → CHAPTER_01_FINAL ... CHAPTER_N_FINAL
         ↓
WRITE_INTRODUCTION + WRITE_PROLOGUE
         ↓
CREATE_TIMELINE [shared] + CREATE_CAST [shared]
         ↓
CONSOLIDATE_REFERENCES → BIBLIOGRAPHY_FINAL
         ↓
[EVALUATE_BOOK_STYLE — invoca Evaluation]
[EVALUATE_BOOK_CONTENT — invoca Evaluation]
         ↓
CREATE_BOOK_SHEET → BOOK_SHEET
         ↓
Output: libro completo → Activation
```

### RAMA POST

```
Inputs: WRITING_CONTEXT (cargado o creado) + material del editor
         ↓
PROMPT_POST_BRIEF         [configura contexto, declara suposiciones]
         ↓
PROMPT_POST_EXPLORE       [solo si input escaso]
         ↓
PROMPT_SUMMARIZE_REF      [mapea fuentes disponibles]
         ↓
PROMPT_VERIFY_RESEARCH    [verifica afirmaciones]
         ↓
PROMPT_QA_IDEAS           [siempre activo; extrae voz del editor]
         ↓
PROMPT_POST_ANGLES        [propone ángulos y narrative seeds]
         ↓
PROMPT_PLAN_POST          [fija arquitectura → POST_SEED]
         ↓
PROMPT_WRITE_POST         [shared; escribe desde POST_SEED]
         ↓
[EVALUATE_POST — invoca Evaluation]
         ↓
Output: post publicable + LEARNING_SIGNALS + POST_BRIEFING
```

---

## SECCIÓN 5: TRABAJO ACTIVO — SPRINT 3

### Orden de ejecución recomendado

El orden importa — hay dependencias entre artefactos.

**Paso 1 — Recursos y templates (prerequisitos):**
- `RESOURCE_WRITING_CONTEXT` v1.0
- `RESOURCE_PUBLICATION_PROFILE` v1.0
- `TEMPLATE_POST_SEED` v1.0
- `TEMPLATE_POST_BRIEFING` v1.0

**Paso 2 — Workflow (desbloquea toda la cadena):**
- `WORKFLOW_WRITING` v2.0

**Paso 3 — Prompts en orden de workflow:**
- `PROMPT_POST_BRIEF` v1.0
- `PROMPT_POST_EXPLORE` v1.0
- `PROMPT_SUMMARIZE_REF` v1.0
- `PROMPT_VERIFY_RESEARCH` v1.0
- `PROMPT_QA_IDEAS` v1.0
- `PROMPT_POST_ANGLES` v1.0
- `PROMPT_PLAN_POST` v1.0
- `PROMPT_WRITE_POST` v2.0 (actualización)
- `PROMPT_SPLIT_POST` v1.0

**Paso 4 — Cierre:**
- `SPEC_LEARNING_SIGNALS` v1.0
- `CONTEXT_WRITING` v1.3 (este documento — ya actualizado)

### Tareas del MASTER_PLAN

| ID | Artefacto | Prioridad |
|---|---|---|
| S3-01 | RESOURCE_WRITING_CONTEXT v1.0 | 🔴 Alta — prerequisito |
| S3-02 | RESOURCE_PUBLICATION_PROFILE v1.0 | 🔴 Alta — prerequisito |
| S3-03 | TEMPLATE_POST_SEED v1.0 | 🔴 Alta — prerequisito |
| S3-04 | TEMPLATE_POST_BRIEFING v1.0 | 🔴 Alta |
| S3-05 | WORKFLOW_WRITING v2.0 | 🔴 Alta — bloquea prompts |
| S3-06 a S3-14 | Prompts RAMA POST (9 prompts) | 🔴 Alta |
| S3-13 | PROMPT_WRITE_POST v2.0 | 🔴 Alta |
| S3-16 | SPEC_LEARNING_SIGNALS v1.0 | 🟠 Media |
| S3-20 | CONTEXT_WRITING v1.3 | 🟠 Media — cierre |

### DECISION_LOG entries pendientes de integrar

| DL-ID | Decisión | Acción requerida en este chat |
|---|---|---|
| DL_20260411_WRITING_015 | Q&A siempre activo salvo skip explícito | Implementar en PROMPT_POST_BRIEF (gestión skip) y PROMPT_QA_IDEAS (sin lógica condicional) |
| DL_20260411_WRITING_016 | POST_SEED como artefacto canónico | Crear TEMPLATE_POST_SEED; actualizar PROMPT_WRITE_POST v2.0 para recibir POST_SEED |
| DL_20260411_WRITING_017 | WRITING_CONTEXT como artefacto canónico | Crear RESOURCE_WRITING_CONTEXT; implementar en PROMPT_POST_BRIEF |
| DL_20260411_WRITING_018 | PUBLICATION_PROFILE como entidad independiente | Crear RESOURCE_PUBLICATION_PROFILE sin herencia del EDITOR_PROFILE |
| DL_20260411_WRITING_019 | PROMPT_SPLIT_POST como prompt independiente | Crear PROMPT_SPLIT_POST en /writing/post/ |
| DL_20260411_WRITING_020 | Modo híbrido por declaración explícita | Implementar en PROMPT_POST_BRIEF (detección + pregunta) y PROMPT_WRITE_POST v2.0 |
| DL_20260411_SYSTEM_021 | Enriquecimiento EDITOR_PROFILE por aprendizaje | Crear SPEC_LEARNING_SIGNALS; implementar marcado en PROMPT_QA_IDEAS y captura en PROMPT_EVALUATE_POST (coordination con evaluation-dev) |
| DL_20260411_WRITING_023 | PROMPT_POST_ANGLES después del Q&A | Crear PROMPT_POST_ANGLES; posicionar correctamente en WORKFLOW_WRITING v2.0 |

---

## SECCIÓN 6: NOTAS DE IMPLEMENTACIÓN

Extraídas del DEVELOPER_NOTES_RAMA_POST. Críticas para la especificación de los prompts.

### PROMPT_POST_BRIEF
- No es un cuestionario. Es inferencia con declaración de suposiciones.
- Único bloqueo real: editor sin ningún input. En ese caso, una sola pregunta antes de continuar.
- Skip de Q&A: aviso de una línea ("Q&A omitido. El borrador puede resultar menos posicionado y con menor presencia de la voz del editor.") + registro en estado del post.
- Texto con estructura de borrador: preguntar al editor qué rol tiene antes de procesarlo. Sin confirmación → tratar como notas.

### PROMPT_SUMMARIZE_REF
- Distinguir explícitamente fuente-de-ejemplo (aparece en el texto) vs fuente-de-argumento (background del editor, no citable).
- Material personal del editor (anécdotas, experiencias propias): categoría separada con instrucción explícita — no reinterpretar, no reubicar, solo usar según indicación del editor.
- Detectar atribuciones incorrectas y hacerlas visibles antes de planificar.

### PROMPT_QA_IDEAS
- Presentar inventario completo de ideas antes de empezar. El editor puede descartar antes de que empiecen las preguntas.
- Secuencial: una idea a la vez, 1-3 preguntas relacionadas. No avanzar hasta respuesta o descarte explícito.
- Ideas no contestadas: permanecen en INVENTARIO_IDEAS como "pendiente". Solo se eliminan si el editor lo declara explícitamente o edita el documento.
- Formulaciones con precisión y ritmo publicable: marcar `🔴 MATERIAL PARA EL POST` en el momento y registrar en INVENTARIO_IDEAS con estatus "citable literal".
- Patrones estructurales generalizables: marcar `📘 SEÑAL DE APRENDIZAJE`.

### PROMPT_PLAN_POST
- Extraer explícitamente: (1) pregunta o tensión central, (2) movimiento narrativo, (3) orden de llegada de argumentos.
- Estos tres elementos visibles y confirmados por el editor antes de escribir.
- Gancho de apertura puede quedar como decisión abierta no bloqueante.
- Si el material excede el formato definido en WRITING_CONTEXT: proponer invocar PROMPT_SPLIT_POST antes de planificar.
- Si el material es insuficiente para el formato: recomendar volver a PROMPT_POST_EXPLORE.

### PROMPT_WRITE_POST
- Estado del post (secciones escritas / en progreso / pendientes) es parámetro explícito, no inferencia de contexto.
- Material marcado como "citable literal" en INVENTARIO_IDEAS: usar sin modificación. Solo puede añadirse frase de transición.
- Si el post es de serie: leer post anterior publicado para detectar promesas hechas al lector que este post debe cumplir.
- Rol de escritor, no asistente. Audiencia primaria es el lector del post. Coherente con PROMPT_WRITE_CHAPTER.

### PROMPT_SPLIT_POST
- Determinar punto de corte natural según WRITING_CONTEXT (longitud del medio) y EDITOR_PROFILE (longitud habitual del editor).
- El primer post debe quedar autónomo: apertura propia, desarrollo suficiente, cierre que no parezca cortado.
- Si el post es de serie: el primer post puede cerrar con promesa explícita de continuación.
- Output: post 1 ajustado + POST_BRIEFING del post 2.

---

## SECCIÓN 7: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión

1. Confirmar con el editor el objetivo de la sesión.
2. Si se trabaja en prompts de RAMA POST: leer RESOURCE_WRITING_CONTEXT y TEMPLATE_POST_SEED como referencia de interfaces.
3. Verificar si hay nuevas DL entries que afecten a Writing.
4. Antes de crear cualquier DL entry, consultar último número usado en `/_system/decisions/README.md`.

### Al finalizar cada sesión

1. Si se modificaron prompts shared: crear DL entry notificando a activation-dev.
2. Listar artefactos creados o modificados con su versión.
3. Producir mensaje de commit para cada artefacto subido a GitHub.

### Regla de naming de archivos

**Ningún archivo del sistema incluye versión en el nombre.** Git gestiona el historial.

* ✅ Correcto: `PROMPT_WRITE_POST.md`, `RESOURCE_WRITING_CONTEXT.md`
* ❌ Incorrecto: `PROMPT_WRITE_POST_v2_0.md`

### Formato de commits a GitHub

```
[WRITING] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore

Ejemplos:
[WRITING] feat: add POST branch to WORKFLOW_WRITING v2.0
[WRITING] feat: create PROMPT_POST_BRIEF v1.0
[WRITING] feat: create RESOURCE_WRITING_CONTEXT v1.0
[WRITING] feat: update PROMPT_WRITE_POST v1.0 → v2.0
```

### Formato de DL entries

```
DL_YYYYMMDD_WRITING_[NNN].md
```

Último número usado en el sistema: **023**. Próxima entrada de writing-dev: **024**.

### Cuándo crear una DL entry

* Cuando se modifica cualquier prompt de /writing/shared/ (notificar a activation-dev)
* Cuando cambia el formato del POST_SEED (afecta a Activation que también lo genera)
* Cuando cambia el WRITING_CONTEXT (afecta a todos los prompts que lo consumen)
* Cuando se añaden o eliminan prompts de RAMA POST

---

**FIN DEL DOCUMENTO**
