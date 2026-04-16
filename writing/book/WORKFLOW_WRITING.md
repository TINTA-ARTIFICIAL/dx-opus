---
id:          WORKFLOW_WRITING
type:        WORKFLOW
subsystem:   WRITING
version:     2.0
status:      ACTIVE
created:     2026-04-11
updated:     2026-04-11
owner_chat:  writing-dev
---

## CHANGELOG

| Versión | Fecha | Autor | Resumen |
|---------|-------|-------|---------|
| v2.0 | 2026-04-11 | writing-dev | Bifurcación Book/Post; nomenclatura actualizada; cabecera YAML; eliminado sufijo marca |
| v1.7 | 2026-01-31 | JM | CONSOLIDATE_REFERENCES; sistema completo al 100% |
| v1.6 | 2026-01-27 | JM | WRITE_INTRODUCTION, WRITE_PROLOGO, CREATE_TIMELINE, CREATE_CAST |
| v1.5 | 2026-01-27 | JM | Eliminado WRITING_INSTRUCTIONS_BOOKS |
| v1.4 | 2026-01-26 | JM | EVALUATE_BOOK_CONTENT; evaluación integrada |
| v1.3 | 2026-01-26 | JM | WRITE_CHAPTER v1.2; modos de invocación |
| v1.2 | 2026-01-26 | JM | EVALUATE_BOOK_STYLE integrado |
| v1.1 | 2026-01-26 | JM | CREATE_BOOK_INDEX v1.0 diseñado |
| v1.0 | 2026-01-26 | JM | Workflow inicial (solo RAMA BOOK) |

## DEPENDENCIES

inputs:  [EDITOR_PROFILE, RESEARCH_REPORT, RESEARCH_DEEP_DIVE, BOOK_BRIEF (opc.)]
outputs: [Libro completo → Activation, Post publicable → Publicación directa]
calls:   [EVALUATE_BOOK_STYLE (Editorial Profile), EVALUATE_BOOK_CONTENT (Evaluation), EVALUATE_POST (Evaluation)]

---

# WORKFLOW_WRITING_BOOK v2.0

---

## CONTENIDO

1. [Visión General](#1-visión-general)
2. [Bifurcación Book / Post](#2-bifurcación-book--post)
3. [RAMA BOOK — Flujo Completo](#3-rama-book--flujo-completo)
   - Fase 0: Preparación
   - Fase 1: Creación del Índice
   - Fase 2: Capítulo de Muestra y Fijación de Estilo
   - Fase 3: Escritura de Capítulos Centrales
   - Fase 4: Capítulos Especiales
   - Fase 5: Consolidación y Cierre
4. [RAMA POST — Flujo Completo](#4-rama-post--flujo-completo)
   - Fase 0: Preparación
   - Fase 1: Planificación del Post
   - Fase 2: Escritura
   - Fase 3: Evaluación y Publicación
5. [Inventario de Prompts](#5-inventario-de-prompts)
6. [Artefactos y Nomenclatura](#6-artefactos-y-nomenclatura)
7. [Métricas de Calidad](#7-métricas-de-calidad)

---

## 1. VISIÓN GENERAL

### 1.1 Filosofía del Método Centauro

El proceso de escritura combina:
- **IA como writing assistant** — redacción, síntesis, coherencia narrativa
- **Editor humano como director editorial** — visión, aprobación de estilo, validación de contenido
- **Iteración controlada** — unidad a unidad (capítulo o post), con validación antes de continuar
- **Estilo pulido y cuidado** — múltiples inputs de estilo convergen en voz única

### 1.2 Cambio de Rol de la IA respecto a Research

| Aspecto | Research | Writing |
|---------|----------|---------|
| Rol principal | Investigador, sintetizador | Escritor, narrador |
| Output | Research Reports | Capítulos / Posts |
| Enfoque | Exhaustividad, evidencia | Narrativa, legibilidad |
| Estilo | Académico, neutral | Editorial, con voz |
| Fuentes | Directas (papers, artículos) | Mediadas (via Research Reports) |
| Creatividad | Baja (síntesis fiel) | Alta (narrativa, ejemplos) |

### 1.3 Principios Operacionales

1. **Estilo como prioridad máxima** — el output debe ser una pieza literaria pulida, no un research report compilado
2. **Escritura secuencial** — una unidad a la vez, validada antes de continuar
3. **Coherencia narrativa** — cada unidad conoce las anteriores (evita repetición, mantiene hilo)
4. **Múltiples inputs de estilo** — Editorial + Tipo + Perfil del Editor = Voz única
5. **Separación clara de ramas** — la decisión Book vs Post ocurre antes de invocar cualquier prompt

---

## 2. BIFURCACIÓN BOOK / POST

La decisión de rama ocurre al inicio de cada proyecto, antes de invocar cualquier prompt.

```
EDITOR inicia proceso de escritura
              ↓
┌─────────────────────────────────────────┐
│  ¿Qué tipo de output produce este       │
│  proyecto?                              │
│                                         │
│  [A] LIBRO (10-12 caps, 20k-38k words)  │
│  [B] POST  (artículo / thread)          │
└─────────────────────────────────────────┘
         │                    │
         ↓                    ↓
   RAMA BOOK             RAMA POST
   (Sección 3)           (Sección 4)
```

### Criterios de decisión

| Criterio | RAMA BOOK | RAMA POST |
|----------|-----------|-----------|
| Extensión output | 20,000–38,000 palabras | 500–5,000 palabras |
| Input principal | RESEARCH_REPORT(s) | RESEARCH_DEEP_DIVE |
| Estructura | 10-12 capítulos + especiales | 1 unidad (artículo o thread) |
| Tiempo de producción | 86–207 horas | 2–6 horas |
| Destino | Activation (campaña) | Publicación directa |

### Nota sobre prompts compartidos

Tres prompts son owned por Writing pero también invocados por Activation. Viven en `/writing/shared/`:

| Prompt | Invocado por |
|--------|-------------|
| PROMPT_WRITE_POST | Writing (Rama Post), Activation |
| PROMPT_CREATE_TIMELINE | Writing (Rama Book), Activation |
| PROMPT_CREATE_CAST | Writing (Rama Book), Activation |

Cualquier modificación a estos prompts requiere una DL entry notificando a activation-dev.

---

## 3. RAMA BOOK — FLUJO COMPLETO

### Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│ FASE 0: PREPARACIÓN                                         │
│ Actor: Editor                                               │
└─────────────────────────────────────────────────────────────┘
                             ↓
        [Editor recopila fuentes y documentos de estilo]
        - Fuentes: PDFs, URLs, RESEARCH_REPORTs, RESEARCH_DEEP_DIVE
        - Estilo: EDITORIAL_STYLE, BOOK_TYPES, EDITOR_PROFILE
        - Narrativa: NARRATIVE_BRIDGE (o crear si no existe)
        - Opcional: BOOK_BRIEF (si el libro viene propuesto por Activation)
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 1: CREACIÓN DEL ÍNDICE                                 │
│ Prompt: PROMPT_CREATE_BOOK_INDEX v1.0                       │
│ Actor: IA propone → Editor valida y ajusta                  │
│ Tiempo: 2–4 horas                                           │
└─────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: BOOK_INDEX
                             ↓
                  [CHECKPOINT 1: Editor aprueba estructura]
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 2: CAPÍTULO DE MUESTRA Y FIJACIÓN DE ESTILO            │
│ Prompt: PROMPT_WRITE_SAMPLE_CHAPTER v1.0                    │
│ Actor: IA escribe → Editor corrige y anota                  │
│ Tiempo: 6–10 horas (IA) + 3–5 horas (Editor)               │
└─────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: SAMPLE_CHAPTER + STYLE_GUIDE_LIBRO
                             ↓
          [CHECKPOINT 2: Editor valida voz y estilo definitivo]
          ¿Aprobado? → SÍ: continuar / NO: iterar Fase 2
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 3: ESCRITURA DE CAPÍTULOS CENTRALES (SECUENCIAL)       │
│ Prompt: PROMPT_WRITE_CHAPTER v1.3                           │
│ Actor: IA escribe → Editor valida capítulo a capítulo       │
│ Tiempo: 6–10 horas por capítulo (IA) + 2–4 horas (Editor)  │
└─────────────────────────────────────────────────────────────┘
                             ↓
          [ITERACIÓN: Para cada capítulo N = 1 hasta 10–12]
                             ↓
                  OUTPUT: CHAPTER_N_FINAL (o FINAL_EDITED)
                             ↓
          [Capítulo N pasa a ser fuente para el Capítulo N+1]
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 4: CAPÍTULOS ESPECIALES                                │
│ Prompts: PROMPT_WRITE_INTRODUCTION v1.0                     │
│          PROMPT_WRITE_PROLOGUE v1.0                         │
│ Actor: IA + Editor (colaborativo)                           │
│ Tiempo: 4–8 horas                                           │
└─────────────────────────────────────────────────────────────┘
                             ↓
              ┌──────────────────────────┐
              ↓                          ↓
         PASO 4A: INTRODUCCIÓN      PASO 4B: PRÓLOGO
         PROMPT_WRITE_INTRODUCTION  PROMPT_WRITE_PROLOGUE
              ↓                          ↓
         OUTPUT:                    OUTPUT:
         INTRODUCTION_FINAL         PROLOGUE_FINAL_EDITED
              └──────────┬───────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ FASE 5: CONSOLIDACIÓN Y CIERRE                              │
│ Prompts: PROMPT_CREATE_TIMELINE v1.0                        │
│          PROMPT_CREATE_CAST v1.0                            │
│          PROMPT_CONSOLIDATE_REFERENCES v1.1                 │
│          [EVALUATE_BOOK_STYLE — invoca Editorial Profile]   │
│          [EVALUATE_BOOK_CONTENT — invoca Evaluation]        │
│          PROMPT_CREATE_BOOK_SHEET v1.1                      │
│ Actor: IA consolida → Editor valida                         │
│ Tiempo: 8–14 horas                                          │
└─────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: LIBRO COMPLETO → Activation
```

---

### FASE 0: PREPARACIÓN

#### Objetivo
Reunir todos los materiales necesarios antes de iniciar la escritura.

#### Actor
Editor

#### 0.1 Fuentes de contenido

1. **Fuentes originales** (siempre presentes): PDFs, artículos, URLs, notas del editor
2. **Fuentes de investigación** (frecuentes, opcionales):
   - RESEARCH_REPORT(s) — uno o múltiples
   - RESEARCH_DEEP_DIVE — si existe
   - REFERENCE_SUMMARY / ANNOTATED_REFERENCE_SUMMARY
3. **Capítulos ya escritos** — si el proceso es parcial o se retoma
4. **BOOK_BRIEF** (opcional) — si el libro viene propuesto por Activation

#### 0.2 Documentos de estilo requeridos

| Documento | Descripción |
|-----------|-------------|
| EDITORIAL_STYLE | Principios editoriales, voz de la editorial |
| BOOK_TYPES | Estructura y longitud según tipo (A–G) |
| EDITOR_PROFILE | Voz y estilo personal del editor (obligatorio) |

**Estructura mínima de EDITOR_PROFILE:**
```markdown
# EDITOR_PROFILE: [Nombre]
## Voz y Tono
## Preferencias Estilísticas
## Ejemplos de Escritura
## No-Gos (Evitar)
```

#### 0.3 NARRATIVE_BRIDGE

- Si existe: verificar vigencia y seleccionar narrative arc (o NEUTRAL)
- Si no existe: crear (proceso independiente o parte de SUMMARIZE_REFERENCES)

#### 0.4 Tipo de libro

Definir tipo A–G antes de iniciar. Determina longitud objetivo y estructura de capítulos:

| Tipo | Palabras objetivo | Enfoque |
|------|-------------------|---------|
| A | 25,000–35,000 | Ensayo analítico |
| B | 28,000–38,000 | Investigación narrativa |
| C | 20,000–30,000 | Divulgación temática |
| D | 18,000–25,000 | Guía práctica |
| E | 20,000–28,000 | Crónica / Reportaje |
| F | 20,000–28,000 | Híbrido narrativo-analítico |
| G | 25,000–35,000 | Obra de referencia |

#### 0.5 Checklist de Preparación

- [ ] Fuentes de contenido reunidas y accesibles
- [ ] EDITORIAL_STYLE disponible
- [ ] BOOK_TYPES disponible
- [ ] EDITOR_PROFILE creado y actualizado
- [ ] NARRATIVE_BRIDGE disponible (o decisión de no usarlo)
- [ ] Tipo de libro definido (A–G o custom)
- [ ] Número de capítulos decidido (default: 10–12)
- [ ] BOOK_BRIEF cargado si aplica (Activation)

---

### FASE 1: CREACIÓN DEL ÍNDICE

**Prompt:** `PROMPT_CREATE_BOOK_INDEX v1.0`

#### Proceso

```
INPUT:
- Todas las fuentes disponibles
- EDITORIAL_STYLE
- BOOK_TYPES
- NARRATIVE_BRIDGE (o indicación NEUTRAL)
- BOOK_BRIEF (si existe)
        ↓
[IA genera propuesta de índice]
- 10–12 capítulos centrales
- Títulos y subtítulos
- Sinopsis por capítulo (200–300 palabras)
- Fuentes asignadas por capítulo
- Arco narrativo global (inicio → desarrollo → clímax → cierre)
- Capítulos especiales: Prólogo, Introducción, Cronología, Cast, Referencias, Ficha
        ↓
OUTPUT: BOOK_INDEX v1.0
        ↓
[Editor revisa — puede iterar hasta BOOK_INDEX vX.final]
- Modificar títulos
- Reorganizar capítulos
- Ajustar número de capítulos
- Cambiar asignación de fuentes
        ↓
[CHECKPOINT 1: Editor aprueba BOOK_INDEX]
```

#### Output
`BOOK_INDEX_vX.final` — estructura definitiva del libro

---

### FASE 2: CAPÍTULO DE MUESTRA Y FIJACIÓN DE ESTILO

**Prompt:** `PROMPT_WRITE_SAMPLE_CHAPTER v1.0`

#### Objetivo
Escribir un capítulo representativo y derivar el STYLE_GUIDE_LIBRO que guiará toda la escritura posterior.

#### Proceso

```
INPUT:
- BOOK_INDEX
- EDITORIAL_STYLE
- BOOK_TYPES
- EDITOR_PROFILE
- Fuentes del capítulo seleccionado
        ↓
[IA escribe capítulo de muestra]
- Típicamente: Capítulo 1 o capítulo central representativo
- Longitud: según tipo de libro (2,000–3,500 palabras típico)
        ↓
OUTPUT: SAMPLE_CHAPTER v1.0
        ↓
[Editor revisa y anota con marcadores:]
- "STYLE: [comentario]"
- "TONE: [comentario]"
- "NARRATIVE: [comentario]"
        ↓
OUTPUT: SAMPLE_CHAPTER_ANNOTATED
        ↓
[IA integra feedback → genera estilo definitivo]
        ↓
OUTPUT:
- SAMPLE_CHAPTER v2.0 (corregido)
- STYLE_GUIDE_LIBRO (documento de estilo extraído)
        ↓
[CHECKPOINT 2: Editor valida estilo]
¿Aprobado? → SÍ: continuar / NO: iterar
```

#### Output
- `SAMPLE_CHAPTER_FINAL` (o `FINAL_EDITED`)
- `STYLE_GUIDE_LIBRO` — referencia canónica de estilo para el resto del libro

---

### FASE 3: ESCRITURA DE CAPÍTULOS CENTRALES

**Prompt:** `PROMPT_WRITE_CHAPTER v1.3`

#### Principios
- **Siempre secuencial:** un capítulo a la vez
- **Coherencia acumulativa:** cada capítulo lee los anteriores para evitar repetición
- **Jerarquía de versiones:** `FINAL_EDITED > FINAL > v2.0 > v1.0`
- **Los capítulos validados son fuente canónica** para los siguientes

#### Proceso por capítulo N

```
INPUT (Capítulo N):
- BOOK_INDEX
- STYLE_GUIDE_LIBRO
- EDITOR_PROFILE
- Fuentes asignadas al capítulo N
- CHAPTER_01_FINAL ... CHAPTER_(N-1)_FINAL (caps previos)
        ↓
[IA escribe CHAPTER_N]
- Lee capítulos previos para coherencia
- Evita repetición de contenido
- Aplica STYLE_GUIDE_LIBRO
- Cita fuentes apropiadamente
        ↓
OUTPUT: CHAPTER_N v1.0
        ↓
[Editor revisa]
        ↓
¿Correcciones mayores?
   │                │
  SÍ               NO
   │                │
   ↓                ↓
[Editor anota]   CHAPTER_N_FINAL
"CONTENT: ..."   (VALIDADO)
   ↓
[IA corrige]
   ↓
CHAPTER_N v2.0
   ↓
[Editor puede editar manualmente]
   ↓
CHAPTER_N_FINAL_EDITED
        ↓
[Pasar al Capítulo N+1]
```

#### Modos de invocación

| Modo | Descripción |
|------|-------------|
| `Write Book Chapters` | IA detecta qué capítulos faltan y propone el siguiente |
| `Write Book Chapter N` | Escribe directamente el capítulo N especificado |

#### Output
`CHAPTER_01_FINAL` … `CHAPTER_N_FINAL` (o `FINAL_EDITED`)

---

### FASE 4: CAPÍTULOS ESPECIALES

#### PASO 4A: INTRODUCCIÓN

**Prompt:** `PROMPT_WRITE_INTRODUCTION v1.0`

```
INPUT:
- Todos los capítulos validados
- BOOK_INDEX
- STYLE_GUIDE_LIBRO
- EDITOR_PROFILE
- Visión del editor (2–4 ideas clave)
        ↓
[IA propone 2–3 opciones de apertura]
        ↓
[Editor elige + IA escribe introducción completa]
        ↓
[Editor valida / edita]
        ↓
OUTPUT: INTRODUCTION_FINAL (o FINAL_EDITED)
```

**Características de la Introducción:**
- 2,000–3,000 palabras
- Voz del autor (80% estilo libro + 20% personal)
- Presenta contenido, estructura y promesa del libro
- Roadmap en prosa (nunca bullets)
- Se escribe DESPUÉS de los capítulos centrales

#### PASO 4B: PRÓLOGO

**Prompt:** `PROMPT_WRITE_PROLOGUE v1.0`

```
INPUT:
- NOTAS_DEL_EDITOR ⭐ (input principal)
- EDITOR_PROFILE
- BOOK_INDEX
- Algunos capítulos (opcional)
- STYLE_GUIDE_LIBRO (para contrastar, no para igualar)
        ↓
[IA propone 2–3 tipos de prólogo]
        ↓
[Editor elige + IA escribe prólogo]
        ↓
[Editor edita fuertemente — el prólogo es su voz personal]
        ↓
OUTPUT: PROLOGUE_FINAL_EDITED
```

**Características del Prólogo:**
- 1,000–2,000 palabras
- 100% voz personal del editor (primera persona)
- Historia del editor: proceso, motivación, descubrimientos
- Puede diferir del estilo del libro
- El editor debe editarlo fuertemente

#### Diferencia crítica Prólogo / Introducción

| | Prólogo | Introducción |
|---|---------|--------------|
| Voz | Personal del editor (yo, me, mi) | Voz del autor (el libro, este trabajo) |
| Contenido | Historia del proceso | Contenido del libro |
| Estilo | Puede diferir del libro | Consistente con el libro |
| Balance de voz | 100% personal | 80% libro + 20% personal |

---

### FASE 5: CONSOLIDACIÓN Y CIERRE

#### PASO 5A: CRONOLOGÍA

**Prompt:** `PROMPT_CREATE_TIMELINE v1.0`

```
INPUT: Todos los capítulos + RESEARCH_REPORTs (fuentes primarias en igualdad)
OUTPUT: TIMELINE_FINAL — lista cronológica con descripciones narrativas
```

**Nota sobre fuentes:** Los RESEARCH_REPORTs son fuente primaria con el mismo peso que los capítulos. El sistema verifica disponibilidad de ambos y avisa si falta alguno.

#### PASO 5B: ELENCO DE PERSONAJES

**Prompt:** `PROMPT_CREATE_CAST v1.0`

```
INPUT: Todos los capítulos + RESEARCH_REPORTs
OUTPUT: CAST_FINAL — perfiles híbridos (narrativa + datos estructurados)
Típico: 15–30 perfiles (10–20 autores + 5–10 instituciones)
```

**Balance de voz en Timeline y Cast:**
- Coherente con STYLE_GUIDE_LIBRO
- Voz del editor presente naturalmente (ni eliminada ni forzada)
- Balance orgánico entre coherencia e identidad editorial

#### PASO 5C: CONSOLIDACIÓN DE REFERENCIAS

**Prompt:** `PROMPT_CONSOLIDATE_REFERENCES v1.1`

```
INPUT: Todos los capítulos
PROCESO (9 pasos):
  1. Verificar completitud de fuentes disponibles
  2. Rastrear fuentes originales desde Research Reports
  3. Sustituir referencias a RRs por fuentes originales cuando sea posible
  4. Eliminar referencias cruzadas entre capítulos
  5. Eliminar duplicados
  6. Normalizar formato (IEEE / APA / Chicago)
  7. Mapear bidireccional: cada cita tiene referencia, cada referencia está citada
  8. Generar bibliografía final
  9. Generar reportes de verificación y limpieza
OUTPUT:
  - BIBLIOGRAPHY_FINAL
  - VERIFICATION_REPORT
  - CLEANUP_REPORT
```

#### PASO 5D: EVALUACIÓN

Estos prompts son owned por otros subsistemas. Writing los invoca como paso obligatorio antes de cerrar el libro.

| Evaluador | Subsistema propietario | Foco |
|-----------|------------------------|------|
| EVALUATE_BOOK_STYLE | Editorial Profile | Voz, tono, coherencia estilística |
| EVALUATE_BOOK_CONTENT | Evaluation | Contenido, argumentación, problemas típicos de IA |

El output de ambos evaluadores puede requerir revisiones en capítulos ya escritos antes de continuar al paso 5E.

#### PASO 5E: FICHA TÉCNICA

**Prompt:** `PROMPT_CREATE_BOOK_SHEET v1.1`

```
INPUT: Libro completo + metadata del proyecto
OUTPUT: BOOK_SHEET — ficha técnica del libro
```

**Incluye obligatoriamente:** declaración de producción asistida por IA (política de transparencia).

#### Output final de RAMA BOOK

```
LIBRO COMPLETO:
├── PROLOGUE_FINAL_EDITED
├── INTRODUCTION_FINAL
├── CHAPTER_01_FINAL … CHAPTER_N_FINAL
├── BIBLIOGRAPHY_FINAL
├── TIMELINE_FINAL
├── CAST_FINAL
└── BOOK_SHEET

→ Entrega a Activation para campaña de contenido
```

---

## 4. RAMA POST — FLUJO COMPLETO

> **Estado:** Los prompts PROMPT_PLAN_POST, PROMPT_WRITE_ARTICLE y PROMPT_WRITE_THREAD están en estado PENDING (F4-02). Este flujo documenta la arquitectura objetivo; los prompts se diseñarán en la siguiente tarea.

### Diagrama General

```
┌──────────────────────────────────────────────────────────────┐
│ FASE 0: PREPARACIÓN                                          │
│ Actor: Editor                                                │
└──────────────────────────────────────────────────────────────┘
                             ↓
        [Editor define tema, formato y reúne investigación]
        - Input: RESEARCH_DEEP_DIVE + EDITOR_PROFILE
        - Decisión: Artículo largo / Thread de red social
                             ↓
┌──────────────────────────────────────────────────────────────┐
│ FASE 1: PLANIFICACIÓN                                        │
│ Prompt: PROMPT_PLAN_POST v1.0 [PENDING]                      │
│ Actor: IA propone estructura → Editor ajusta                 │
│ Tiempo: 30–60 minutos                                        │
└──────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: POST_PLAN
                             ↓
                  [CHECKPOINT: Editor aprueba estructura]
                             ↓
┌──────────────────────────────────────────────────────────────┐
│ FASE 2: ESCRITURA                                            │
│ Prompts: PROMPT_WRITE_POST v1.0 [shared]                     │
│          PROMPT_WRITE_ARTICLE v1.0 [PENDING]                 │
│          PROMPT_WRITE_THREAD v1.0 [PENDING]                  │
│ Actor: IA escribe → Editor valida y edita                    │
│ Tiempo: 1–3 horas                                            │
└──────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: POST_DRAFT
                             ↓
┌──────────────────────────────────────────────────────────────┐
│ FASE 3: EVALUACIÓN Y PUBLICACIÓN                             │
│ Prompt: EVALUATE_POST (Evaluation subsystem)                 │
│ Actor: IA evalúa → Editor valida → Publicación directa       │
│ Tiempo: 30–60 minutos                                        │
└──────────────────────────────────────────────────────────────┘
                             ↓
                  OUTPUT: POST_FINAL → Publicación directa
```

---

### FASE 0: PREPARACIÓN (RAMA POST)

#### 0.1 Inputs requeridos

| Input | Descripción | Obligatorio |
|-------|-------------|-------------|
| RESEARCH_DEEP_DIVE | Investigación sobre el tema del post | Sí |
| EDITOR_PROFILE | Voz y estilo del editor | Sí |

#### 0.2 Decisión de formato

Antes de invocar PROMPT_PLAN_POST, el editor define el formato de salida:

| Formato | Prompt | Longitud típica |
|---------|--------|-----------------|
| Artículo largo | PROMPT_WRITE_ARTICLE | 1,500–5,000 palabras |
| Post estándar | PROMPT_WRITE_POST | 500–1,500 palabras |
| Thread | PROMPT_WRITE_THREAD | 10–25 tweets / posts |

#### 0.3 Checklist de Preparación

- [ ] RESEARCH_DEEP_DIVE disponible y completo
- [ ] EDITOR_PROFILE actualizado
- [ ] Formato de post definido (artículo / post / thread)
- [ ] Plataforma de publicación definida (si aplica)

---

### FASE 1: PLANIFICACIÓN DEL POST

**Prompt:** `PROMPT_PLAN_POST v1.0` [PENDING]

```
INPUT:
- RESEARCH_DEEP_DIVE
- EDITOR_PROFILE
- Formato objetivo (artículo / post / thread)
        ↓
[IA propone estructura del post]
- Ángulo narrativo
- Estructura de secciones
- Puntos clave a desarrollar
- Hook de apertura
        ↓
OUTPUT: POST_PLAN
        ↓
[Editor ajusta si necesario]
        ↓
[CHECKPOINT: Editor aprueba POST_PLAN]
```

---

### FASE 2: ESCRITURA (RAMA POST)

El prompt a usar depende del formato:

#### Post estándar / campaña

**Prompt:** `PROMPT_WRITE_POST v1.0` [shared — /writing/shared/]

```
INPUT: POST_PLAN + RESEARCH_DEEP_DIVE + EDITOR_PROFILE
OUTPUT: POST_DRAFT
```

#### Artículo largo

**Prompt:** `PROMPT_WRITE_ARTICLE v1.0` [PENDING]

```
INPUT: POST_PLAN + RESEARCH_DEEP_DIVE + EDITOR_PROFILE
OUTPUT: ARTICLE_DRAFT
```

#### Thread

**Prompt:** `PROMPT_WRITE_THREAD v1.0` [PENDING]

```
INPUT: POST_PLAN + RESEARCH_DEEP_DIVE + EDITOR_PROFILE + Plataforma objetivo
OUTPUT: THREAD_DRAFT
```

**Proceso común:**
```
[IA escribe borrador]
        ↓
OUTPUT: [FORMAT]_DRAFT
        ↓
[Editor revisa y edita]
        ↓
OUTPUT: [FORMAT]_FINAL
```

---

### FASE 3: EVALUACIÓN Y PUBLICACIÓN

**Evaluador:** `EVALUATE_POST` (subsistema Evaluation)

```
INPUT: [FORMAT]_FINAL
        ↓
[Evaluation evalúa: voz, estructura, registro, calidad editorial]
        ↓
OUTPUT: EVALUATION_REPORT
        ↓
[Editor decide: publicar / revisar]
        ↓
OUTPUT FINAL: POST_FINAL → Publicación directa
```

---

## 5. INVENTARIO DE PROMPTS

### RAMA BOOK — activos

| Prompt | Versión | Status | Fase |
|--------|---------|--------|------|
| PROMPT_CREATE_BOOK_INDEX | v1.0 | ACTIVE | Fase 1 |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | ACTIVE | Fase 2 |
| PROMPT_WRITE_CHAPTER | v1.3 | ACTIVE | Fase 3 |
| PROMPT_WRITE_INTRODUCTION | v1.0 | ACTIVE | Fase 4 |
| PROMPT_WRITE_PROLOGUE | v1.0 | ACTIVE | Fase 4 |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | ACTIVE | Fase 5 |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | ACTIVE | Fase 5 |

### Shared — owned by Writing

| Prompt | Versión | Status | Invocado por |
|--------|---------|--------|-------------|
| PROMPT_WRITE_POST | v1.0 | ACTIVE | Writing (Post), Activation |
| PROMPT_CREATE_TIMELINE | v1.0 | ACTIVE | Writing (Book), Activation |
| PROMPT_CREATE_CAST | v1.0 | ACTIVE | Writing (Book), Activation |

### Invocados externamente (no owned by Writing)

| Prompt | Subsistema propietario | Rama | Fase |
|--------|------------------------|------|------|
| EVALUATE_BOOK_STYLE | Editorial Profile | Book | Fase 5D |
| EVALUATE_BOOK_CONTENT | Evaluation | Book | Fase 5D |
| EVALUATE_POST | Evaluation | Post | Fase 3 |

### RAMA POST — pendientes

| Prompt | Versión objetivo | Status | Bloqueado por |
|--------|-----------------|--------|---------------|
| PROMPT_PLAN_POST | v1.0 | PENDING | — |
| PROMPT_WRITE_ARTICLE | v1.0 | PENDING | WORKFLOW_WRITING v2.0 |
| PROMPT_WRITE_THREAD | v1.0 | PENDING | WORKFLOW_WRITING v2.0 |

---

## 6. ARTEFACTOS Y NOMENCLATURA

### Artefactos de producción — RAMA BOOK

| Artefacto | Descripción | Versiones típicas |
|-----------|-------------|-------------------|
| `BOOK_INDEX` | Estructura completa del libro | v1.0 → vX.final |
| `STYLE_GUIDE_LIBRO` | Estilo derivado del capítulo de muestra | v1.0 (único) |
| `SAMPLE_CHAPTER` | Capítulo de muestra | v1.0, v2.0, FINAL, FINAL_EDITED |
| `CHAPTER_NN` | Capítulos centrales (01–12) | v1.0, v2.0, FINAL, FINAL_EDITED |
| `INTRODUCTION` | Introducción del libro | FINAL, FINAL_EDITED |
| `PROLOGUE` | Prólogo del libro | FINAL_EDITED |
| `TIMELINE` | Cronología | FINAL |
| `CAST` | Elenco de personajes | FINAL |
| `BIBLIOGRAPHY` | Referencias consolidadas | FINAL |
| `VERIFICATION_REPORT` | Reporte de verificación de citas | — |
| `CLEANUP_REPORT` | Reporte de limpieza bibliográfica | — |
| `BOOK_SHEET` | Ficha técnica del libro | FINAL |

### Artefactos de producción — RAMA POST

| Artefacto | Descripción |
|-----------|-------------|
| `POST_PLAN` | Estructura planificada del post |
| `POST_DRAFT` | Borrador del post / artículo / thread |
| `POST_FINAL` | Versión publicable |

### Artefactos de sistema (no producción)

| Artefacto | Origen | Uso |
|-----------|--------|-----|
| `NOTAS_DEL_EDITOR` | Editor (manual) | Input para PROMPT_WRITE_PROLOGUE e INTRO |
| `NARRATIVE_BRIDGE` | Research o proceso independiente | Input para CREATE_BOOK_INDEX |
| `EDITOR_PROFILE` | Editorial Profile subsystem | Input para todos los prompts de escritura |

### Jerarquía de versiones (orden de precedencia)

```
FINAL_EDITED > FINAL > v2.0 > v1.0
```

La versión más alta en la jerarquía es la fuente canónica para cualquier paso posterior.

---

## 7. MÉTRICAS DE CALIDAD

### RAMA BOOK

#### Por fase

| Fase | Métricas clave |
|------|----------------|
| Fase 1 (Índice) | Coherencia del arco narrativo; cobertura de fuentes |
| Fase 2 (Muestra) | STYLE_GUIDE_LIBRO aprobado por editor; longitud dentro de rango |
| Fase 3 (Capítulos) | Coherencia cap. a cap.; ausencia de repetición; citas presentes |
| Fase 4 (Especiales) | Intro: roadmap en prosa, ≤3,000 palabras; Prólogo: voz personal genuina |
| Fase 5 (Consolidación) | 100% citas mapeadas; 0 duplicados en bibliografía; evaluaciones aprobadas |

#### Libro completo

| Métrica | Valor objetivo |
|---------|----------------|
| Longitud total | Según tipo A–G (18k–38k palabras) |
| Capítulos centrales | 10–12 (o custom acordado en Fase 0) |
| Referencias totales | 30–100 |
| Formato bibliográfico | 100% consistente (IEEE / APA / Chicago) |
| Consistencia de estilo | Validada en todos los capítulos |
| Tiempo total | 86–207 horas (~150 horas promedio) |

#### Distribución temporal típica

| Intensidad | Duración estimada |
|------------|-------------------|
| Producción intensiva | 2–3 meses |
| Producción moderada | 3–6 meses |
| Producción pausada | 6–12 meses |

### RAMA POST

| Formato | Longitud objetivo | Tiempo estimado |
|---------|------------------|-----------------|
| Post estándar | 500–1,500 palabras | 2–3 horas |
| Artículo largo | 1,500–5,000 palabras | 3–5 horas |
| Thread | 10–25 unidades | 2–4 horas |

---

**FIN DEL DOCUMENTO**
