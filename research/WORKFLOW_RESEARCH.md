# WORKFLOW: SISTEMA DE INVESTIGACIÓN TINTA ARTIFICIAL

**Proyecto:** Tinta Artificial  
**Versión:** 3.2  
**Fecha:** 22 febrero 2026  
**Alcance:** Desde referencias iniciales hasta RESEARCH_REPORTs validados

**Changelog v3.2:**
- ✅ Estructuras de output de REFERENCE_SUMMARY alineadas con PROMPT_SUMMARIZE_REFERENCES v4.0 (resuelve GAP-R01)
- ✅ Estructura de RESEARCH_PLAN alineada con PROMPT_SUMMARIZE_REFERENCES v4.0 (resuelve GAP-R02)
- ✅ Estructura de NARRATIVE_BRIDGE alineada con PROMPT_SUMMARIZE_REFERENCES v4.0 (resuelve GAP-R03 parcial — secciones 4-6 pendientes de decisión en Sprint 3)
- ✅ Referencias de sección en Checkpoint 1 corregidas para reflejar estructuras canónicas
- ✅ RESEARCH_PLAN añadido como input de Fase 2 (alineación con UPDATE_VALIDATION_CHECKLIST)
- ✅ BOOK_BRIEF de Activation añadido como input opcional en Fase 0 (DL-20260221-005)
- ✅ Diagrama de Fase 4 RAMA A corregido: [PENDIENTE DISEÑO] → RESEARCH_DEEP_DIVE_PROMPT v1.1
- ✅ Versión de CREATE_RESEARCH_PLAN corregida a v2.1.2 en sección Artefactos

**Changelog v3.1:**
- ✅ RAMA A actualizada: [PENDIENTE] → RESEARCH_DEEP_DIVE_PROMPT v1.1 implementado
- ✅ Añadida sección obligatoria: Timeline and Cast of Characters (400-600 palabras)
- ✅ Añadida lista explícita de los 7 tipos de Research Focus (A-G)
- ✅ Actualizada sección de Artefactos: añadidos RESEARCH_DEEP_DIVE_PROMPT v1.1 y output
- ✅ Añadidas métricas de calidad para RESEARCH_DEEP_DIVE (RAMA A)
- ✅ Aclarado que RAMA B puede producir múltiples RESEARCH_REPORTs con diferentes focos
- ✅ Aclarada relación WRITING_INSTRUCTIONS_RESEARCH_REPORT v2.1 (base) vs WRITING_INSTRUCTIONS_ADAPTED (customizada)

---

## CONTENIDO

1. [Visión General del Sistema](#1-visión-general-del-sistema)
2. [Diagrama de Flujo Completo](#2-diagrama-de-flujo-completo)
3. [Fase 0: Preparación](#fase-0-preparación)
4. [Fase 1: Análisis de Referencias](#fase-1-análisis-de-referencias-iniciales)
5. [Fase 2: Actualización Validation Checklist](#fase-2-actualización-de-validation-checklist)
6. [Fase 3: Anotación del Editor](#fase-3-anotación-del-editor)
7. [Fase 4: Investigación Profunda](#fase-4-investigación-profunda)
8. [Fase 5: Evaluación de Research Reports](#fase-5-evaluación-de-research-reports)
9. [Artefactos del Sistema](#artefactos-del-sistema)
10. [Métricas de Calidad](#métricas-de-calidad)

---

## 1. VISIÓN GENERAL DEL SISTEMA

### 1.1 Filosofía del Método Centauro

El proceso de investigación combina:
- **IA como investigador y sintetizador** (fases analíticas, búsqueda, estructuración)
- **Editor humano como curator y decisor** (anotación, revisión, refinamiento, evaluación)
- **Transparencia total** (todo el proceso documentado y potencialmente publicable)

### 1.2 Dos Rutas de Investigación Profunda

El sistema ofrece dos rutas en **FASE 4** según el objetivo editorial:

```
FASE 3: Anotación del Editor
         ↓
         DECISIÓN: ¿Objetivo editorial?
         ↓
    ┌────┴────┐
    │         │
   POST      LIBRO
    │         │
    ↓         ↓
 RAMA A    RAMA B
```

**RAMA A: Investigación Profunda Orientada a Post**
- **Objetivo:** Investigación neutra profundizando en TASKS, LINEs y COMMENTs del editor
- **Uso:** Base para posts (y también útil para libros)
- **Prompt:** RESEARCH_DEEP_DIVE_PROMPT v1.1
- **Output:** RESEARCH_DEEP_DIVE (formato flexible, 5,000-10,000 palabras)
- **Incluye:** Timeline and Cast of Characters (400-600 palabras)

**RAMA B: Research Profundo para Libro**
- **Objetivo:** Investigación estructurada con focus específico y narrative arc
- **Uso:** Base directa para libros de Tinta Artificial
- **Prompts:** 
  - CREATE_RESEARCH_PLAN v2.1.2 (planificación detallada)
  - EXECUTE_RESEARCH_PLAN v1.0 (ejecución)
- **Output:** RESEARCH_REPORT(s) - uno o múltiples según necesidad
  - 8,000-15,000 palabras por report
  - 7 tipos posibles (Research Focus A-G)
- **Incluye:** Timeline and Cast of Characters (400-600 palabras)
- **Múltiples reports:** Cuando un libro requiere varios ángulos, RAMA B puede ejecutarse varias veces con diferentes focos (ej: Focus A + Focus D + Focus F = 3 reports para 1 libro)

**IMPORTANTE:** RAMA A es útil en ambos casos (post Y libro) porque profundiza neutralmente en las preocupaciones del editor, por lo que se ejecuta en cualquier caso cuando hay anotaciones significativas.

### 1.3 Principios Operacionales

1. **Separación de fases**: Análisis → Validación → Investigación → Evaluación → Escritura
2. **Acumulación de conocimiento**: El sistema mejora con cada proyecto
3. **Revisión humana en puntos críticos**: No automatización ciega
4. **Iteración sobre outputs**: Los documentos se refinan, no se descartan
5. **Documentación exhaustiva**: Cada decisión tiene trazabilidad
6. **Evaluación antes de escritura**: Validar calidad de investigación antes de invertir en redacción

### 1.4 Los 7 Tipos de Research Focus (RAMA B)

Cada RESEARCH_REPORT en RAMA B se estructura según uno de estos 7 tipos:

**A - REVISIÓN HISTÓRICA**
- Enfoque: Evolución temporal del tema
- Pregunta clave: ¿Cómo llegamos aquí?
- Estructura narrativa: Cronológica progresiva
- Timeline: Especialmente extenso en este tipo

**B - ESTADO DEL ARTE**
- Enfoque: Panorama actual completo
- Pregunta clave: ¿Qué sabemos hoy?
- Estructura narrativa: Temática comprehensiva
- Cobertura: Máxima exhaustividad

**C - ANÁLISIS DE ESCUELA**
- Enfoque: Tradición de pensamiento específica
- Pregunta clave: ¿Qué dice esta corriente?
- Estructura narrativa: Analítica profunda
- Cast of Characters: Énfasis en proponentes de la escuela

**D - DESARROLLOS RECIENTES**
- Enfoque: Innovaciones últimos 3-5 años
- Pregunta clave: ¿Qué ha cambiado recientemente?
- Estructura narrativa: Evolutiva comparativa
- Timeline: Enfocado en período reciente

**E - ANÁLISIS COMPARATIVO**
- Enfoque: Contraste de enfoques
- Pregunta clave: ¿Cuál es mejor/más apropiado?
- Estructura narrativa: Comparativa estructurada
- Énfasis: Evaluación sistemática de alternativas

**F - IMPLEMENTACIÓN PRÁCTICA**
- Enfoque: Aplicaciones y casos reales
- Pregunta clave: ¿Cómo se usa en la práctica?
- Estructura narrativa: Aplicativa progresiva
- Contenido: Herramientas, técnicas, casos de estudio

**G - CONCEPTO SEMINAL**
- Enfoque: Idea influyente reciente y debate
- Pregunta clave: ¿Qué significa este concepto?
- Estructura narrativa: Artículo→Concepto→Impacto
- Foco: Un artículo/paper específico como anchor

**Longitud de RESEARCH_REPORTS:** 8,000-15,000 palabras (todos los tipos)

**Nota sobre agrupación comercial:** Estos 7 tipos se agrupan en 3 líneas para los libros finales (📚 Crónicas Panorámicas: A,B,C | 🧭 Debate sin Cerrar: D,E | ⚡ Informes desde la Frontera: F,G), pero esta agrupación es relevante para la fase de escritura y marketing, no afecta la fase de research.

---

## 2. DIAGRAMA DE FLUJO COMPLETO

```
┌──────────────────────────────────────────────────────────────────┐
│ FASE 0: PREPARACIÓN                                              │
│ Actor: Editor                                                    │
│ Tiempo: Variable (horas a semanas)                              │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                [Editor recopila referencias iniciales]
                [PDFs, URLs, artículos, papers]
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│ FASE 1: ANÁLISIS DE REFERENCIAS INICIALES                        │
│ Herramienta: SUMMARIZE_REFERENCES v4.0                           │
│ Actor: IA (Claude)                                               │
│ Tiempo: 30-60 minutos                                            │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    INPUT: Referencias iniciales
                               ↓
                    [IA ejecuta análisis en 4 fases]
                    - Deep Analysis (35%)
                    - Cross-Synthesis (25%)
                    - Gap Mapping (30%)
                    - Structuring (10%)
                               ↓
                    OUTPUT (3 documentos):
                    ┌────────────────────────┐
                    │ REFERENCE_SUMMARY      │ 5,000-7,000 palabras
                    │ RESEARCH_PLAN          │ 3,000-4,000 palabras
                    │ NARRATIVE_BRIDGE       │ 1,500-2,000 palabras
                    └────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 1: REVISIÓN EDITOR                                    │
│ Duración: 2-4 horas lectura crítica                             │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    Decisión: ¿Base suficiente?
                    ┌─────────┴──────────┐
                   NO                   SÍ
                    │                    │
        [Buscar más referencias]        │
        [Volver a Fase 1]               │
                                         ↓
┌──────────────────────────────────────────────────────────────────┐
│ FASE 2: ACTUALIZACIÓN DE VALIDATION CHECKLIST                    │
│ Herramienta: UPDATE_VALIDATION_CHECKLIST v3.0                    │
│ Actor: IA (Claude)                                               │
│ Tiempo: 15-30 minutos                                            │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    INPUT:
                    - REFERENCE_SUMMARY
                    - SOURCE_AUTHORITY_HIERARCHY
                    - CLAIM_VALIDATION_CRITERIA
                               ↓
                    [IA actualiza checklists globales]
                               ↓
                    OUTPUT:
                    ┌────────────────────────────────┐
                    │ SOURCE_AUTHORITY_HIERARCHY     │ (actualizado)
                    │ CLAIM_VALIDATION_CRITERIA      │ (actualizado)
                    │ VALIDATION_REPORT              │ (nuevo)
                    └────────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 2: REVISIÓN RÁPIDA                                    │
│ Duración: 15-30 minutos                                          │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    [Editor revisa VALIDATION_REPORT]
                    [Aprueba actualizaciones o ajusta]
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│ FASE 3: ANOTACIÓN DEL EDITOR                                     │
│ Herramienta: Manual (Google Docs)                                │
│ Actor: Editor                                                    │
│ Tiempo: 2-6 horas de trabajo concentrado                        │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    [Editor anota REFERENCE_SUMMARY]
                    Usando flags:
                    - TASK: Investigación específica
                    - COMMENT: Contexto editorial
                               ↓
                    [Editor anota RESEARCH_PLAN]
                    Usando flags:
                    - LINE: Modificar líneas de investigación
                    - TASK: Preguntas asociadas a líneas
                    - COMMENT: Contexto de prioridades
                               ↓
                    OUTPUT:
                    ┌────────────────────────────────┐
                    │ ANNOTATED_REFERENCE_SUMMARY    │
                    │ ANNOTATED_RESEARCH_PLAN        │
                    └────────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────────┐
│ DECISIÓN CRÍTICA: OBJETIVO EDITORIAL                             │
│ Actor: Editor                                                    │
└──────────────────────────────────────────────────────────────────┘
                               ↓
                    ¿Qué se va a producir?
                               ↓
                ┌──────────────┴──────────────┐
                │                             │
              POST                         LIBRO
                │                             │
                ↓                             ↓
        ┌───────────────┐           ┌───────────────┐
        │ EJECUTAR      │           │ EJECUTAR      │
        │ RAMA A        │           │ RAMA B        │
        │ (siempre)     │           │ (también)     │
        └───────────────┘           └───────────────┘
                │                             │
                │                    ┌────────┴────────┐
                │                    │                 │
                │                    ↓                 ↓
                │            (Seleccionar)    (Seleccionar)
                │            Research Focus   Narrative Arc
                │            [1-7 tipos]      [o NEUTRAL]
                │                    │                 │
                │                    └────────┬────────┘
                │                             │
                └─────────────┬───────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ FASE 4: INVESTIGACIÓN PROFUNDA                                   │
│ Tiempo total: 10-40 horas (según scope)                         │
└──────────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ↓                                           ↓
┌──────────────────────┐              ┌──────────────────────────┐
│ RAMA A:              │              │ RAMA B:                  │
│ Research Orientado   │              │ Research Profundo        │
│ a Post               │              │ para Libro               │
│                      │              │                          │
│ PROMPT:              │              │ PROMPTS:                 │
│ RESEARCH_DEEP_DIVE   │              │ CREATE_RESEARCH_PLAN     │
│ PROMPT v1.1          │              │    v2.1.2                │
│ INPUT:               │              │ EXECUTE_RESEARCH_PLAN    │
│ - ANNOTATED_REF_SUM  │              │    v1.0                  │
│ - ANNOTATED_RES_PLAN │              │                          │
│ - SOURCE_AUTH_HIER   │              │ INPUT:                   │
│ - CLAIM_VALID_CRIT   │              │ - ANNOTATED_REF_SUM      │
│                      │              │ - ANNOTATED_RES_PLAN     │
│ OUTPUT:              │              │ - NARRATIVE_BRIDGE       │
│ RESEARCH_DEEP_DIVE   │              │ - SOURCE_AUTH_HIER       │
│ (formato flexible)   │              │ - CLAIM_VALID_CRIT       │
│                      │              │ - WRITING_INSTRUCTIONS   │
│ Tiempo: 5-15 horas   │              │                          │
└──────────────────────┘              │ PASO 1:                  │
                                      │ CREATE_RESEARCH_PLAN     │
                                      │ - Research Focus elegido │
                                      │ - Narrative Arc elegido  │
                                      │ - 10-20 research jobs    │
                                      │   estructurados          │
                                      │                          │
                                      │ OUTPUT:                  │
                                      │ - RESEARCH_PLAN_DETAILED │
                                      │ - WRITING_INSTR_ADAPTED  │
                                      │                          │
                                      │ CHECKPOINT:              │
                                      │ [Editor revisa plan]     │
                                      │ [Ajusta si necesario]    │
                                      │                          │
                                      │ PASO 2:                  │
                                      │ EXECUTE_RESEARCH_PLAN    │
                                      │ - Ejecuta research jobs  │
                                      │ - Valida con checklist   │
                                      │ - Escribe según template │
                                      │                          │
                                      │ OUTPUT:                  │
                                      │ RESEARCH_REPORT          │
                                      │ (8,000-15,000 palabras)  │
                                      │                          │
                                      │ Tiempo: 15-30 horas      │
                                      └──────────────────────────┘
                                                 ↓
┌──────────────────────────────────────────────────────────────────┐
│ FASE 5: EVALUACIÓN DE RESEARCH REPORTS                           │
│ Herramienta: EVALUATE_RESEARCH_REPORT v1.0                       │
│ Actor: IA (Claude) → Editor revisa                              │
│ Tiempo: 1-3 horas (evaluación) + 1-2 horas (revisión editor)    │
└──────────────────────────────────────────────────────────────────┘
                                                 ↓
                    INPUT:
                    - RESEARCH_REPORT(s) (uno o múltiples)
                    - SOURCE_AUTHORITY_HIERARCHY
                    - CLAIM_VALIDATION_CRITERIA
                    - [Opcional] RESEARCH_PLAN_DETAILED
                                                 ↓
                    [IA evalúa en 4 dimensiones]
                    - Source Quality
                    - Claim Quality
                    - Coverage Quality
                    - Methodological Quality
                                                 ↓
                    OUTPUT:
                    ┌────────────────────────────────────┐
                    │ RESEARCH_EVALUATION_REPORT         │
                    │                                    │
                    │ - Overall score (0-100%)           │
                    │ - Publication readiness:           │
                    │   • PUBLICATION-READY (Green)      │
                    │   • NEEDS REFINEMENT (Yellow)      │
                    │   • REQUIRES REWORK (Red)          │
                    │ - Strengths (top 5)                │
                    │ - Weaknesses (top 5)               │
                    │ - Critical gaps & risks            │
                    │ - Actionable recommendations       │
                    │   (con effort estimates)           │
                    │                                    │
                    │ Si múltiples reports:              │
                    │ - Collective score                 │
                    │ - Complementarity analysis         │
                    │ - Cross-report consistency         │
                    │ - Collective gaps                  │
                    └────────────────────────────────────┘
                                                 ↓
┌──────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 3: DECISIÓN GO/NO-GO                                  │
│ Actor: Editor                                                    │
│ Duración: 1-2 horas análisis                                     │
└──────────────────────────────────────────────────────────────────┘
                                                 ↓
                    [Editor lee EVALUATION_REPORT]
                    [Revisa scores y recomendaciones]
                                                 ↓
                    Decisión basada en semáforo:
                                                 ↓
              ┌──────────────┬─────────────────┬──────────────┐
              │              │                 │              │
           GREEN          YELLOW             RED           CRÍTICO
              │              │                 │              │
    PUBLICATION-READY  NEEDS REFINEMENT  REQUIRES REWORK  ABANDONAR
              │              │                 │              │
              ↓              ↓                 ↓              ↓
    [Aprobar para    [Ejecutar         [Iterar          [Problema
     escritura]       reforzamiento     investigación     fundamental
                      específico]        profunda]        del tema]
     │                │                  │                     │
     │                │ (10-20h)         │ (20-40h)            │
     │                │                  │                     │
     │                └──────┬───────────┘                     │
     │                       ↓                                 │
     │              [Re-evaluar después                        │
     │               de refinamiento]                          │
     │                       │                                 │
     └───────────────────────┴─────────────────────────────────┘
                             ↓
                   [FIN DEL WORKFLOW DE RESEARCH]
                             ↓
         ┌───────────────────┴────────────────────┐
         │                                        │
         ↓                                        ↓
  ┌──────────────┐                      ┌─────────────────┐
  │ SIGUIENTE:   │                      │ SIGUIENTE:      │
  │ Writing Post │                      │ Writing Libro   │
  │ (workflow    │                      │ (workflow       │
  │  separado)   │                      │  separado)      │
  └──────────────┘                      └─────────────────┘
```

---

## FASE 0: PREPARACIÓN

### Objetivo
Recopilar referencias iniciales que servirán como base para el análisis.

### Actor
Editor (humano)

### Duración Estimada
Variable: horas a semanas

### Proceso

1. **Identificación de tema**
   - Editor decide tema/pregunta a investigar
   - Define scope preliminar

2. **Recopilación de referencias iniciales**
   - Búsqueda en Google Scholar, bases académicas
   - Artículos periodísticos relevantes
   - Papers, libros, informes
   - Recomendaciones de expertos
   - Contenido previo propio

3. **Organización de referencias**
   - Guardar PDFs en carpeta del proyecto
   - Crear lista de URLs
   - Incluir metadatos básicos si relevante

### Criterios de Suficiencia

**Mínimo recomendado:**
- 8-15 referencias para tema acotado
- 15-30 referencias para tema amplio

**Calidad sobre cantidad:**
- Priorizar fuentes autoritativas (papers, informes institucionales)
- Incluir múltiples perspectivas si hay debate
- Balance temporal: fuentes fundacionales + recientes

### Input Opcional

**BOOK_BRIEF** (de Activation, si existe)
- Orientación editorial sobre el proyecto
- Puede condicionar el scope de las referencias a recopilar
- Si existe, debe cargarse junto con las referencias en Fase 1

### Output
- Carpeta con PDFs
- Lista de URLs
- [Opcional] Notas preliminares del editor
- [Opcional] BOOK_BRIEF si se ha recibido de Activation

### Señales de estar listo para Fase 1
✓ Tiene al menos 8 referencias relevantes  
✓ Incluye al menos 2-3 fuentes autoritativas  
✓ Cubre las perspectivas principales del debate (si aplica)  
✓ Editor siente que tiene "masa crítica" para empezar análisis

---

## FASE 1: ANÁLISIS DE REFERENCIAS INICIALES

### Objetivo
Generar comprensión profunda del tema mediante análisis sistemático de referencias iniciales.

### Herramienta
**SUMMARIZE_REFERENCES v4.0**

### Actor
IA (Claude)

### Duración Estimada
30-60 minutos de ejecución

### Inputs Requeridos

**Archivos:**
- Referencias iniciales (PDFs, URLs, documentos)
- [Si existen] Notas preliminares del editor
- [Si existe] BOOK_BRIEF de Activation — orienta el análisis hacia el objetivo editorial

**Recursos globales:**
- SOURCE_AUTHORITY_HIERARCHY (para consulta)
- CLAIM_VALIDATION_CRITERIA (para consulta)

### Proceso de Ejecución

El prompt SUMMARIZE_REFERENCES ejecuta 4 fases internas:

**FASE 1: DEEP ANALYSIS (35%)**
- Análisis profundo de cada referencia
- Extracción de tesis centrales, metodología, hallazgos
- Identificación de autor, credenciales, año
- Evaluación preliminar de autoridad

**FASE 2: CROSS-SYNTHESIS (25%)**
- Identificación de convergencias (consensos)
- Identificación de divergencias (debates)
- Mapeo de conceptos clave
- Construcción de arquitectura temática

**FASE 3: GAP MAPPING (30%)**
- Identificación de gaps en conocimiento
- Detección de preguntas sin responder
- Reconocimiento de sesgos en cobertura
- Sugerencias de líneas de investigación

**FASE 4: STRUCTURING (10%)**
- Organización de hallazgos en documentos finales
- Generación de narrativa coherente
- Producción de outputs estructurados

### Outputs Generados

**1. REFERENCE_SUMMARY** (5,000-7,000 palabras)

Estructura canónica (basada en PROMPT_SUMMARIZE_REFERENCES v4.0):
```
0. METADATA + Reference Table
1. Executive Synthesis (400-600 palabras)
2. Thematic Architecture (1,200-1,800 palabras)
3. Convergence and Divergence Analysis (1,200-1,500 palabras)
4. Historical Perspective (800-1,000 palabras)
5. Practical Applications (800-1,200 palabras)
6. Critical Assessment (600-800 palabras)
7. Key Actors (400-600 palabras)
8. Synthesis and Implications (400-600 palabras)
9. Complete Reference List
```

**2. RESEARCH_PLAN** (3,000-4,000 palabras)

Estructura canónica (basada en PROMPT_SUMMARIZE_REFERENCES v4.0):
```
0. METADATA
1. Foundation Assessment (600-800 palabras)
2. Gap Analysis (1,200-1,500 palabras)
3. Field Context (400-600 palabras)
4. Proposed Research Directions / Lines of Investigation (1,200-1,600 palabras)
5. Supplementary Source Recommendations (400-600 palabras)
6. Strategic Recommendations (200-400 palabras)
```

**3. NARRATIVE_BRIDGE** (1,500-2,000 palabras)

Estructura canónica (basada en PROMPT_SUMMARIZE_REFERENCES v4.0):
```
0. METADATA
1. Story Arcs Identified (500-700 palabras)        ← consumida por CREATE_RESEARCH_PLAN
2. Editorial Angles (400-600 palabras)
3. Unexpected Connections (300-400 palabras)        ← consumida por CREATE_RESEARCH_PLAN
4. Audience Engagement Hooks (300-400 palabras)     [decisión pendiente: mantener o eliminar — Sprint 3]
5. Structural Considerations (200-300 palabras)     [decisión pendiente: mantener o eliminar — Sprint 3]
6. Risks and Opportunities (200-300 palabras)       [decisión pendiente: mantener o eliminar — Sprint 3]
```

**Nota:** Las secciones 4-6 existen en el prompt pero no tienen consumidor definido en los prompts downstream. Se mantienen en este workflow pendientes de decisión editorial en Sprint 3 (ver GAP-R09).

### Calidad Esperada

**Source Coverage:**
- Cada referencia analizada profundamente
- Conceptos clave extraídos y sintetizados
- Debates principales identificados

**Gap Analysis:**
- Gaps identificados en 3-5 categorías
- Cada gap con explicación y severidad
- Líneas de investigación propuestas (5-8 típicamente)

**Narrative Options:**
- 4-5 narrative arcs propuestos
- Cada arc con ángulo distinto
- Conexiones interdisciplinarias sugeridas

---

## CHECKPOINT 1: REVISIÓN EDITOR

### Objetivo
Validar que la base de conocimiento es suficiente antes de continuar.

### Actor
Editor (humano)

### Duración Estimada
2-4 horas de lectura crítica

### Proceso

1. **Lectura de REFERENCE_SUMMARY**
   - Revisar Sección 2 (Thematic Architecture): ¿Está completo el mapa conceptual?
   - Revisar Sección 3 (Convergence and Divergence Analysis): ¿Debates bien capturados?
   - Revisar Sección 6 (Critical Assessment): ¿Análisis crítico profundo?

2. **Revisión de RESEARCH_PLAN**
   - Revisar Sección 2 (Gap Analysis): ¿Gaps son reales y significativos?
   - Revisar Sección 4 (Proposed Research Directions): ¿Líneas propuestas son relevantes?
   - Revisar Sección 5 (Supplementary Source Recommendations): ¿Sugerencias útiles?

3. **Lectura de NARRATIVE_BRIDGE**
   - Revisar Sección 1 (Story Arcs Identified): ¿Algún arc resuena con la visión editorial?
   - Revisar Sección 3 (Unexpected Connections): ¿Conexiones inesperadas valiosas?

### Decisión Crítica

**¿Es suficiente la base de referencias?**

**SÍ** → Continuar a Fase 2
- Los conceptos principales están cubiertos
- Los debates clave están representados
- Los gaps identificados son abordables con investigación adicional
- Hay al menos un narrative arc atractivo

**NO** → Volver a Fase 0
- Faltan perspectivas importantes
- Debates principales no representados
- Gaps son tan grandes que invalidan análisis
- Editor no encuentra ángulo editorial satisfactorio

**Acciones si NO:**
1. Identificar qué referencias adicionales necesita
2. Buscar y agregar esas referencias
3. Re-ejecutar SUMMARIZE_REFERENCES v4.0 con referencias ampliadas
4. Repetir este checkpoint

### Criterios de Aprobación

✓ **Conceptual coverage:** ≥80% de temas esperados cubiertos  
✓ **Debate representation:** Perspectivas principales presentes  
✓ **Gap severity:** Gaps son MODERATE o LOW, no CRITICAL  
✓ **Narrative potential:** Al menos 1 arc editorial atractivo  
✓ **Source quality:** Mix razonable de Tier 1-2-3 fuentes

---

## FASE 2: ACTUALIZACIÓN DE VALIDATION CHECKLIST

### Objetivo
Actualizar checklists globales con conocimiento específico del tema actual.

### Herramienta
**UPDATE_VALIDATION_CHECKLIST v3.0**

### Actor
IA (Claude)

### Duración Estimada
15-30 minutos

### Inputs Requeridos

**Documentos del proyecto:**
- REFERENCE_SUMMARY (secciones 0, 2, 3, 7 — Metadata, Thematic Architecture, Convergence and Divergence Analysis, Key Actors)
- RESEARCH_PLAN (secciones 0, 2 — Metadata, Gap Analysis)

**Recursos globales:**
- SOURCE_AUTHORITY_HIERARCHY (versión actual)
- CLAIM_VALIDATION_CRITERIA (versión actual)

### Proceso de Ejecución

**STEP 1: Análisis de Referencias**
- Extrae fuentes del REFERENCE_SUMMARY
- Clasifica por tipo (journal, informe, libro, etc.)
- Identifica instituciones y autores clave

**STEP 2: Clasificación de Fuentes**
- Asigna Tier (1, 2, 3) a cada fuente
- Documenta rationale para clasificación
- Identifica fuentes ya en SOURCE_AUTHORITY_HIERARCHY

**STEP 3: Actualización de SOURCE_AUTHORITY_HIERARCHY**
- Añade nuevas fuentes al hierarchy
- Actualiza metadata (disciplina, keywords, scope)
- Preserva estructura existente
- Versiona (v X.Y → X.Y+1)

**STEP 4: Actualización de CLAIM_VALIDATION_CRITERIA**
- Identifica checks de validación específicos del tema
- Añade red flags particulares
- Documenta peculiaridades metodológicas del campo
- Versiona

**STEP 5: Generación de VALIDATION_REPORT**
- Resume cambios realizados
- Explica rationale para nuevas adiciones
- Flags potenciales preocupaciones

### Outputs Generados

**1. SOURCE_AUTHORITY_HIERARCHY** (actualizado)
- Nuevas fuentes añadidas bajo topic-specific section
- Metadata completo
- Tier classification documentada
- Versión incrementada

**2. CLAIM_VALIDATION_CRITERIA** (actualizado)
- Nuevos validation checks para este tema
- Red flags específicos añadidos
- Versión incrementada

**3. VALIDATION_REPORT** (nuevo)

Estructura típica:
```markdown
## CHANGES SUMMARY

### SOURCE_AUTHORITY_HIERARCHY
- Added [N] new sources
- [N] Tier 1, [N] Tier 2, [N] Tier 3
- Topic: [Topic name]

### Key Additions:
1. [Source name] (Tier X) - [Rationale]
2. [...]

### CLAIM_VALIDATION_CRITERIA

### New Validation Checks:
1. [Check name] - [Why needed for this topic]
2. [...]

### New Red Flags:
1. [Red flag] - [Context]
2. [...]

## CONCERNS AND NOTES
[Any issues or special considerations]
```

### Calidad Esperada

**Tier Classification Accuracy:**
- Clasificación consistente con criterios establecidos
- Rationale claro para cada Tier assignment
- No sobre-clasificación (ser conservador)

**Topic Coverage:**
- Fuentes clave del tema añadidas
- Validation checks específicos identificados
- Red flags relevantes documentados

---

## CHECKPOINT 2: REVISIÓN RÁPIDA

### Objetivo
Validar que actualizaciones de checklists son apropiadas.

### Actor
Editor (humano)

### Duración Estimada
15-30 minutos

### Proceso

1. **Revisar VALIDATION_REPORT**
   - ¿Fuentes añadidas son apropiadas?
   - ¿Tier classifications son razonables?
   - ¿Validation checks son útiles?

2. **Spot-check SOURCE_AUTHORITY_HIERARCHY**
   - Abrir archivo actualizado
   - Verificar que nuevas entradas tienen formato correcto
   - Confirmar que metadata es preciso

3. **Spot-check CLAIM_VALIDATION_CRITERIA**
   - Verificar que nuevos checks son aplicables
   - Confirmar que red flags son relevantes

### Decisión

**APROBAR** → Continuar a Fase 3
- Actualizaciones son razonables
- Sin errores significativos detectados
- Tier classifications parecen apropiadas

**AJUSTAR** → Corregir y re-ejecutar
- Reclasificar algunas fuentes manualmente
- Añadir validation checks adicionales
- Corregir metadata
- Re-versionar documentos

### Nota Importante
Este checkpoint es rápido porque UPDATE_VALIDATION_CHECKLIST es altamente confiable y conservador en sus decisiones. Errores son raros. Si editor confía en el sistema, puede aprobar sin revisión exhaustiva.

---

## FASE 3: ANOTACIÓN DEL EDITOR

### Objetivo
Incorporar conocimiento, prioridades e hipótesis del editor al proceso de investigación.

### Herramienta
Manual (Google Docs u otro editor)

### Actor
Editor (humano)

### Duración Estimada
2-6 horas de trabajo concentrado

### Inputs

- REFERENCE_SUMMARY (versión limpia)
- RESEARCH_PLAN (versión limpia)

### Sistema de Flags

El editor usa **tres tipos de flags** para comunicar instrucciones a la IA:

#### FLAG "TASK:" - Solicitar investigación específica

**Uso en REFERENCE_SUMMARY:**
```markdown
La eficiencia energética promedio es del 25%. TASK: Verify this statistic 
with 2024 data and check if it varies by building type.
```

**Uso en RESEARCH_PLAN:**
```markdown
LINE 3: Impact on energy consumption
TASK: Find case studies with quantitative before/after data
TASK: Check if benefits vary between retrofit vs new construction
```

**Cuándo usar TASK:**
- Necesitas verificar un claim específico
- Quieres profundizar en un concepto
- Buscas datos cuantitativos actualizados
- Necesitas casos de estudio específicos
- Quieres explorar una sub-pregunta

#### FLAG "LINE:" - Modificar líneas de investigación

**Uso en RESEARCH_PLAN:**
```markdown
LINE 3: Impact on energy consumption
LINE: PRIORITY HIGH - This is central to my argument

LINE 5: Social acceptance factors
LINE: Focus on European context, exclude US studies

LINE 7: Regulatory frameworks
LINE: OMIT - Out of scope for this post

LINE 4: Technical barriers
LINE: Merge with LINE 6 - they overlap significantly
```

**Cuándo usar LINE:**
- Cambiar prioridad de una línea (HIGH, MEDIUM, LOW)
- Modificar scope de una línea
- Combinar líneas redundantes
- Excluir líneas irrelevantes
- Añadir restricciones geográficas o temporales

#### FLAG "COMMENT:" - Proporcionar contexto editorial

**Uso en REFERENCE_SUMMARY:**
```markdown
El debate sobre autonomía vs automatización es central.
COMMENT: This tension between human agency and algorithmic control 
is the philosophical core of my argument. I want to argue that 
smart buildings should augment, not replace, human decision-making.
```

**Uso en RESEARCH_PLAN:**
```markdown
LINE 2: User experience and satisfaction
COMMENT: I'm skeptical of the optimistic claims here. My hypothesis 
is that user satisfaction depends heavily on control vs automation 
trade-offs, which is under-studied.
```

**Cuándo usar COMMENT:**
- Explicar tu perspectiva o hipótesis
- Dar contexto sobre por qué algo te importa
- Advertir sobre posibles sesgos en fuentes
- Compartir intuiciones o sospechas
- Clarificar intención editorial

### Proceso de Anotación

**1. Preparación (15 minutos)**
- Crear copia de REFERENCE_SUMMARY → ANNOTATED_REFERENCE_SUMMARY
- Crear copia de RESEARCH_PLAN → ANNOTATED_RESEARCH_PLAN
- Tener a mano notas preliminares si existen

**2. Anotación de REFERENCE_SUMMARY (1-2 horas)**

Estrategia recomendada:
1. **Primera lectura completa** (sin anotar)
   - Familiarizarse con el contenido
   - Marcar secciones que llaman atención

2. **Segunda lectura** (anotando)
   - Sección 2 (Thematic Architecture):
     - TASK: Profundizar conceptos poco claros
     - COMMENT: Explicar por qué ciertos conceptos importan más
   
   - Sección 3 (Convergence and Divergence Analysis):
     - TASK: Verificar claims controversiales
     - COMMENT: Posicionarte en debates
   
   - Sección 5 (Practical Applications):
     - TASK: Explorar casos de uso relevantes para el libro
     - COMMENT: Indicar qué aplicaciones conectan con tu argumento
   
   - Sección 7 (Key Actors):
     - TASK: Profundizar en autores relevantes
     - COMMENT: Indicar si conoces autores personalmente o tienes contexto

3. **Revisión final**
   - ¿Hay al menos 5-10 TASKs significativos?
   - ¿COMMENTs dan suficiente contexto?
   - ¿Secciones críticas para tu argumento bien anotadas?

**3. Anotación de RESEARCH_PLAN (1-2 horas)**

Estrategia recomendada:
1. **Revisar Sección 4 (Research Directions)**
   - Cada línea de investigación (LINE):
     - Evaluar relevancia → LINE: PRIORITY
     - Modificar scope → LINE: Focus on X, exclude Y
     - Combinar redundantes → LINE: Merge with LINE X
     - Eliminar irrelevantes → LINE: OMIT

2. **Añadir TASKs a líneas prioritarias**
   - Líneas HIGH priority: 2-4 TASKs cada una
   - Líneas MEDIUM: 1-2 TASKs
   - Líneas LOW: 0-1 TASK

3. **Añadir COMMENTs explicativos**
   - Por qué ciertas líneas son prioritarias
   - Hipótesis sobre qué encontrarás
   - Conexiones con tu experiencia personal

4. **Revisar Sección 5 (Supplementary Sources)**
   - TASK: "Find and review [specific source]" si alguna es crítica
   - COMMENT: Indicar si conoces fuentes adicionales relevantes

**4. Finalización (30 minutos)**
- Revisar ambos documentos anotados
- Asegurar consistencia (lo prioritario en uno es prioritario en otro)
- Verificar que flags están bien formateados
- Guardar versiones finales

### Criterios de Buena Anotación

**Cantidad:**
- REFERENCE_SUMMARY: 10-20 anotaciones (TASK + COMMENT)
- RESEARCH_PLAN: 8-15 anotaciones (LINE modificaciones + TASKs)

**Calidad:**
- TASKs son específicos y accionables (no vagos)
- COMMENTs dan contexto real (no obviedades)
- LINE modificaciones tienen rationale claro
- Anotaciones distribuidas en secciones relevantes (no concentradas en una)

**Señal de Criticidad Máxima:**
Cuando un tema está anotado en **AMBOS documentos**, la IA lo interpreta como de máxima prioridad.

Ejemplo:
```
REFERENCE_SUMMARY - Sección 3:
"La reducción de consumo promedio es 25%"
TASK: Verify with 2024 data, check variation by building type

RESEARCH_PLAN - LINE 3:
"Impact on energy consumption"
LINE: PRIORITY HIGH
TASK: Find quantitative case studies with before/after data
COMMENT: This is the core empirical claim of my post
```

→ IA reconoce: Verificación de claim de eficiencia energética es CRÍTICA.

### Outputs

- ANNOTATED_REFERENCE_SUMMARY
- ANNOTATED_RESEARCH_PLAN

### Decisión Post-Anotación

Después de anotar, el editor decide el **objetivo editorial**:

**¿POST o LIBRO?**

Esta decisión determina qué rama de investigación profunda ejecutar:
- **POST** → Ejecutar RAMA A (siempre útil)
- **LIBRO** → Ejecutar RAMA B (+ opcionalmente RAMA A si hay muchas anotaciones)

---

## DECISIÓN CRÍTICA: OBJETIVO EDITORIAL

### Momento
Inmediatamente después de completar anotación (Fase 3)

### Actor
Editor

### Opciones

#### OPCIÓN 1: POST

**Características:**
- Publicación relativamente rápida (días a 2 semanas)
- Formato flexible (2,000-8,000 palabras)
- Un solo foco narrativo
- Puede ser más opinático/personal

**Investigación requerida:**
- RAMA A: Research Profundo Orientado a Post
- Profundiza neutralmente en TASKs, LINEs, COMMENTs
- Output flexible adaptado a necesidades específicas

**Próximo paso:**
→ Ejecutar RAMA A (Fase 4A)

#### OPCIÓN 2: LIBRO

**Características:**
- Publicación más larga (semanas a meses)
- Formato estructurado (6,000-15,000 palabras)
- Múltiples secciones organizadas
- Rigor académico más alto
- Puede requerir múltiples iteraciones/focuses

**Investigación requerida:**
- RAMA B: Research Profundo para Libro
- Requiere selección de Research Focus (Tipo A-G)
- Requiere selección de Narrative Arc
- Output altamente estructurado (RESEARCH_REPORT)

**Decisiones adicionales antes de ejecutar RAMA B:**
1. **Seleccionar Research Focus** (tipo de libro):
   - A: Historical Review
   - B: State of the Art
   - C: School of Thought Analysis
   - D: Recent Developments
   - E: Comparative Analysis
   - F: Practical Implementation
   - G: Seminal Concept Analysis

2. **Seleccionar Narrative Arc:**
   - Una de las 4-5 opciones del NARRATIVE_BRIDGE
   - O NEUTRAL si el tema no se presta a narrativa

**Opcional:**
- Ejecutar RAMA A primero si hay muchas anotaciones
- Usar RESEARCH_DEEP_DIVE como input adicional para RAMA B

**Próximo paso:**
→ Ejecutar RAMA B (Fase 4B)

#### OPCIÓN 3: AMBOS (Post primero, Libro después)

**Flujo:**
1. Ejecutar RAMA A → Escribir POST → Publicar
2. Posteriormente, ejecutar RAMA B → Escribir LIBRO → Publicar

**Ventaja:**
- POST sirve como "prueba de concepto"
- Feedback de audiencia informa el libro
- Investigación de RAMA A reutilizable para RAMA B

---

## FASE 4: INVESTIGACIÓN PROFUNDA

### Objetivo
Ejecutar investigación exhaustiva basada en anotaciones del editor.

### Duración Total Estimada
10-40 horas (varía significativamente según scope y rama)

### Dos Rutas Disponibles

---

### FASE 4A: RAMA A - RESEARCH PROFUNDO ORIENTADO A POST

#### Objetivo
Investigación neutra profundizando en TASKs, LINEs y COMMENTs del editor, sin estructura predefinida.

#### Características
- **Flexibilidad:** Output adaptado a necesidades específicas del editor
- **Neutralidad:** No asume estructura de post final
- **Profundidad:** Responde exhaustivamente a anotaciones (100% TASKs, LINEs, COMMENTs)
- **Utilidad dual:** Útil tanto para post como para libro

#### Herramienta
**RESEARCH_DEEP_DIVE_PROMPT v1.1**

El prompt:
- Lee ANNOTATED_REFERENCE_SUMMARY y ANNOTATED_RESEARCH_PLAN
- Procesa todos los TASKs (investigación específica), LINEs (prioridades), COMMENTs (contexto)
- Ejecuta investigación adicional según necesidades identificadas
- Valida contra SOURCE_AUTHORITY_HIERARCHY y CLAIM_VALIDATION_CRITERIA
- Asigna confidence levels (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
- Produce documento de investigación profunda estructurado

#### Inputs Requeridos
- ANNOTATED_REFERENCE_SUMMARY
- ANNOTATED_RESEARCH_PLAN
- SOURCE_AUTHORITY_HIERARCHY
- CLAIM_VALIDATION_CRITERIA

#### Output
**RESEARCH_DEEP_DIVE** (5,000-10,000 palabras)

Estructura:
```markdown
# [TITLE]

## METADATA
- Topic, Date, Research Focus: Neutral Deep Investigation, Editor, Basis: RAMA A

## EXECUTIVE SUMMARY (400-600 palabras)
[High-level synthesis, key takeaways]

## 1. INTRODUCTION (600-1,000 palabras)
1.1 Research Context
1.2 Scope and Objectives
1.3 Approach

## 2-N. BODY SECTIONS (organizadas por tema)
[Flexible - según anotaciones del editor]
[Cada sección incluye: Context, Findings, Implications, Remaining Questions]

## N. SYNTHESIS AND CROSS-CUTTING INSIGHTS (800-1,200 palabras)
[Integración de hallazgos, conexiones, contradicciones, meta-assessment]

## N+1. TIMELINE AND CAST OF CHARACTERS (400-600 palabras)
N+1.1 Historical Timeline (tabla o narrativo según cantidad de eventos)
N+1.2 Key Actors (autores, instituciones, escuelas de pensamiento)

## N+2. METHODOLOGY (400-600 palabras)
N+2.1 Sources and Search Strategy
N+2.2 Validation Approach
N+2.3 Limitations
N+2.4 Quality Metrics

## N+3. IMPLICATIONS FOR [POST/LIBRO] (300-500 palabras)
[Cómo estos hallazgos informan la escritura]

## REFERENCES
[IEEE format, completo]
```

Longitud: 5,000-10,000 palabras (mínimo 5,000 para profundidad suficiente)

#### Duración Estimada
5-15 horas de investigación y writing (IA)

#### Cuándo usar RAMA A
- ✓ Objetivo es escribir POST
- ✓ Hay muchas anotaciones (≥15 TASKs/LINEs/COMMENTs)
- ✓ Editor quiere exploración profunda antes de decidir estructura
- ✓ Como complemento a RAMA B (ejecutar ambas para libros complejos)

---

### FASE 4B: RAMA B - RESEARCH PROFUNDO PARA LIBRO

#### Objetivo
Investigación estructurada con focus específico y narrative arc para producir RESEARCH_REPORT publication-ready.

#### Características
- **Estructurada:** Output sigue template específico según Research Focus
- **Comprehensiva:** 8,000-15,000 palabras
- **Rigurosa:** Validación sistemática de claims
- **Publication-ready:** Puede ser base directa para libro

#### Herramientas
1. **CREATE_RESEARCH_PLAN v2.1.2** (planificación)
2. **EXECUTE_RESEARCH_PLAN v1.0** (ejecución)

#### Proceso en 2 Pasos

##### PASO 1: CREATE_RESEARCH_PLAN

**Objetivo:** Crear plan detallado de investigación

**Inputs:**
- ANNOTATED_REFERENCE_SUMMARY
- ANNOTATED_RESEARCH_PLAN
- NARRATIVE_BRIDGE
- SOURCE_AUTHORITY_HIERARCHY
- CLAIM_VALIDATION_CRITERIA
- WRITING_INSTRUCTIONS_RESEARCH_REPORT v2.1

**Decisiones previas del editor:**
1. **Research Focus seleccionado** (1 de 7):
   - A: Historical Review
   - B: State of the Art
   - C: School of Thought Analysis
   - D: Recent Developments
   - E: Comparative Analysis
   - F: Practical Implementation
   - G: Seminal Concept Analysis

2. **Narrative Arc seleccionado:**
   - Una de las 4-5 opciones del NARRATIVE_BRIDGE
   - O NEUTRAL

**Proceso del prompt:**
- STEP 0: Verificar inputs y confirmar focus/arc
- STEP 1: Crear plan general de investigación
  - Integrar anotaciones de editor
  - Definir 10-20 research jobs estructurados
  - Especificar source strategies por job
  - Mapear jobs a secciones del report final
- STEP 2: Procesar TASKs específicos del editor
- STEP 3: Refinamiento interactivo con editor
- STEP 4: Generar WRITING_INSTRUCTIONS adaptadas

**Outputs:**
- **RESEARCH_PLAN_DETAILED** (3,000-5,000 palabras)
  - 10-20 research jobs específicos
  - Source strategy por job
  - Validation approach por job
  - Effort estimates

- **WRITING_INSTRUCTIONS_ADAPTED**
  - Template específico del Research Focus seleccionado
  - Secciones mapeadas a research jobs
  - Length targets ajustados
  - **Nota:** Basado en WRITING_INSTRUCTIONS_RESEARCH_REPORT v2.1 (template base) + customizaciones específicas del proyecto

**Duración:** 1-2 horas (ejecución del prompt)

**CHECKPOINT INTERMEDIO:**
Editor revisa RESEARCH_PLAN_DETAILED:
- ¿Research jobs cubren todo lo necesario?
- ¿Prioridades son correctas?
- ¿Source strategies apropiadas?

Editor puede ajustar:
- Añadir/eliminar research jobs
- Cambiar prioridades
- Modificar scope de jobs

Cuando editor aprueba → Continuar a PASO 2

##### PASO 2: EXECUTE_RESEARCH_PLAN

**Objetivo:** Ejecutar research jobs y producir RESEARCH_REPORT

**Inputs:**
- RESEARCH_PLAN_DETAILED (aprobado por editor)
- WRITING_INSTRUCTIONS_ADAPTED
- SOURCE_AUTHORITY_HIERARCHY
- CLAIM_VALIDATION_CRITERIA
- REFERENCE_SUMMARY (para contexto)

**Proceso del prompt:**

**STEP 0: Setup**
- Verificar todos los inputs
- Cargar template de writing
- Confirmar con editor antes de empezar

**STEP 1-N: Ejecutar Research Jobs**
Para cada research job:
1. Ejecutar búsqueda según source strategy
2. Analizar fuentes encontradas
3. Validar claims contra CLAIM_VALIDATION_CRITERIA
4. Sintetizar hallazgos
5. Asignar confidence levels (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
6. Documentar fuentes y rationale

**STEP FINAL: Writing**
1. Seguir estructura de WRITING_INSTRUCTIONS_ADAPTED
2. Integrar findings de research jobs
3. Escribir en estilo narrativo (no lista de hechos)
4. Citar apropiadamente (formato [N])
5. Incluir sección de metodología
6. Generar lista de referencias completa

**Output:**
**RESEARCH_REPORT** (8,000-15,000 palabras)

Estructura depende del Research Focus (A-G), pero siempre incluye:
```markdown
# TITLE

## METADATA

## EXECUTIVE SUMMARY (400-600 words)

## 1. INTRODUCTION (1,000-1,500 words)

## 2-N. BODY SECTIONS (5,000-9,000 words)
[Estructura específica según Template A-G]

## N. METHODOLOGY (400-600 words)
- Sources and Search Strategy
- Validation Approach
- Limitations
- Quality Metrics

## N+1. SYNTHESIS, CONCLUSIONS, IMPLICATIONS (600-800 words)

## N+2. HISTORICAL TIMELINE / KEY ACTORS (400-600 words)

## REFERENCES
```

**Duración:** 15-30 horas (investigación + writing)

#### Duración Total RAMA B
- PASO 1 (CREATE_RESEARCH_PLAN): 1-2 horas
- Checkpoint: 30-60 minutos
- PASO 2 (EXECUTE_RESEARCH_PLAN): 15-30 horas
- **Total: 17-33 horas**

#### Cuándo usar RAMA B
- ✓ Objetivo es escribir LIBRO
- ✓ Se necesita investigación comprehensiva estructurada
- ✓ Research Focus está claro (uno de los 7 tipos)
- ✓ Editor tiene tiempo para proyecto sustancial

#### Posibles Iteraciones

**Múltiples Research Reports para un libro:**

Si el libro requiere cubrir múltiples ángulos:
1. Ejecutar RAMA B con Focus A (ej. Historical Review)
2. Ejecutar RAMA B con Focus D (ej. Recent Developments)
3. Ejecutar RAMA B con Focus F (ej. Practical Implementation)

Resultado: 3 RESEARCH_REPORTs que juntos forman el libro completo

Después: Ejecutar EVALUATE_RESEARCH_REPORT en modo multi-report (Fase 5)

---

## FASE 5: EVALUACIÓN DE RESEARCH REPORTS

### Objetivo
Validar calidad de research report(s) antes de invertir tiempo en escritura editorial.

### Herramienta
**EVALUATE_RESEARCH_REPORT v1.0**

### Actor
IA (Claude) ejecuta evaluación → Editor revisa y decide

### Duración Estimada
- Evaluación: 1-3 horas (IA)
- Revisión: 1-2 horas (Editor)

### Cuándo Ejecutar

**Obligatorio:**
- ✓ Después de completar RAMA B (uno o múltiples reports)

**Opcional:**
- Después de RAMA A si se quiere validación formal del RESEARCH_DEEP_DIVE
- (Típicamente no necesario para RAMA A, que es más flexible)

### Modalidades

#### Modalidad 1: Evaluación Individual

**Usar cuando:**
- Se tiene un solo RESEARCH_REPORT
- Se quiere validar cada report independientemente antes de combinarlos

**Inputs:**
- RESEARCH_REPORT (uno)
- SOURCE_AUTHORITY_HIERARCHY
- CLAIM_VALIDATION_CRITERIA
- [Opcional] RESEARCH_PLAN_DETAILED

**Proceso:**

**STEP 1: SOURCE QUALITY ANALYSIS**
- Extraer todas las fuentes de sección REFERENCES
- Clasificar por Tier usando SOURCE_AUTHORITY_HIERARCHY
- Analizar distribución (% Tier 1, 2, 3)
- Evaluar diversidad (disciplinas, perspectivas, geografías)
- Verificar alignment con hierarchy

**STEP 2: CLAIM QUALITY ANALYSIS**
- Extraer todos los claims del report
- Evaluar evidencia para cada claim
  - Número de fuentes
  - Tier distribution
  - Tipo de evidencia vs tipo de claim
- Verificar confidence levels (STRONG/MODERATE/TENTATIVE/SPECULATIVE)
- Identificar overclaiming o underclaiming
- Aplicar CLAIM_VALIDATION_CRITERIA

**STEP 3: COVERAGE QUALITY ANALYSIS**
- Identificar disciplinas relevantes para el tema
- Evaluar representación de cada disciplina
- Identificar escuelas de pensamiento/perspectivas
- Evaluar balance de perspectivas
- Detectar gaps geográficos o temporales

**STEP 4: METHODOLOGICAL QUALITY ANALYSIS**
- Revisar sección METHODOLOGY del report
- Evaluar transparencia (research design, source strategy, validation)
- Verificar acknowledgment de limitaciones
- Analizar gaps identificados y su severidad

**STEP 5: SYNTHESIS AND OVERALL ASSESSMENT**
- Calcular scores por dimensión (0-100%):
  - Source Quality Score
  - Claim Quality Score
  - Coverage Quality Score
  - Methodological Quality Score
- Calcular Overall Quality Score (promedio)
- Determinar Publication Readiness:
  - **PUBLICATION-READY** (Green): ≥70% overall, no dimension <50%
  - **NEEDS REFINEMENT** (Yellow): 50-69% overall
  - **REQUIRES REWORK** (Red): <50% overall
- Identificar top 5 strengths
- Identificar top 5 weaknesses
- Listar critical gaps & risks
- Generar actionable recommendations con effort estimates

**Output:**
**RESEARCH_EVALUATION_REPORT_[TOPIC]_[DATE].md**

Estructura:
```markdown
## METADATA
- Report evaluated
- Date
- Framework version
- Intended use

## EXECUTIVE SUMMARY (2-3 paragraphs)
- Overall rating
- Key strengths
- Key weaknesses
- Recommendation

## 1. SOURCE QUALITY ANALYSIS
### 1.1 Source Distribution
### 1.2 Source Diversity
### 1.3 Alignment with Hierarchy
### 1.4 Key Authors Assessment
**SCORE: X/100**

## 2. CLAIM QUALITY ANALYSIS
### 2.1 Evidence Strength Distribution
### 2.2 Claim-Evidence Alignment
### 2.3 Confidence Level Accuracy
**SCORE: X/100**

## 3. COVERAGE QUALITY ANALYSIS
### 3.1 Disciplinary Representation
### 3.2 Perspective Balance
### 3.3 Geographic and Temporal Coverage
**SCORE: X/100**

## 4. METHODOLOGICAL QUALITY ANALYSIS
### 4.1 Transparency Assessment
### 4.2 Gaps Identification
**SCORE: X/100**

## 5. OVERALL ASSESSMENT
### 5.1 Scores Summary
| Dimension | Score | Status |
|-----------|-------|--------|
| Source Quality | X% | [Good/Adequate/Weak] |
| Claim Quality | Y% | [...] |
| Coverage Quality | Z% | [...] |
| Methodological Quality | W% | [...] |
| **OVERALL** | **N%** | **[Rating]** |

### 5.2 Publication Readiness
**STATUS: [GREEN/YELLOW/RED]**
**RECOMMENDATION:** [...]
**ESTIMATED EFFORT TO GREEN:** [X-Y hours]

### 5.3 Top 5 Strengths
1. [...]
2. [...]

### 5.4 Top 5 Weaknesses
1. [...]
2. [...]

### 5.5 Critical Gaps and Risks
[Table with severity, impact, recommendation, effort]

## 6. RECOMMENDATIONS
### 6.1 Required Actions (before publication)
### 6.2 Suggested Improvements (valuable but optional)
### 6.3 Section-Specific Notes

## APPENDICES
- Detailed Source Inventory
- Claim-by-Claim Analysis (sample)
- Methodology Section Review
```

#### Modalidad 2: Evaluación Multi-Report (Collection)

**Usar cuando:**
- Se tienen múltiples RESEARCH_REPORTs para un libro
- Se quiere evaluar cómo se complementan
- Se busca detectar redundancias o gaps colectivos

**Inputs:**
- RESEARCH_REPORT_1, RESEARCH_REPORT_2, RESEARCH_REPORT_3, ...
- SOURCE_AUTHORITY_HIERARCHY
- CLAIM_VALIDATION_CRITERIA

**Proceso:**

**PHASE 1: Individual Evaluation**
- Evaluar cada report independientemente (como Modalidad 1)
- Generar evaluation report individual para cada uno

**PHASE 2: Cross-Report Analysis (STEP 6)**

**6.1 Coverage Integration**
- Crear matriz: Topics × Reports
- Identificar complementarity (topics cubiertos por diferentes reports)
- Detectar gaps colectivos (topics no cubiertos por ningún report)
- Detectar redundancia (topics PRIMARY en múltiples reports)

**6.2 Disciplinary and Perspective Integration**
- Agregar disciplinas across all reports
- Agregar perspectivas across all reports
- Identificar fortalezas colectivas (disciplinas bien cubiertas en conjunto)
- Identificar gaps persistentes (disciplinas ausentes en todos)

**6.3 Source Integration and Deduplication**
- Total citations vs unique sources
- Calcular duplication rate
- Clasificar duplication:
  - High duplication (mismo source en 3+ reports) → Foundational
  - Moderate (2 reports) → Important
  - Unique per report → Specialized
- Calcular collective Tier distribution

**6.4 Claim Consistency and Contradictions**
- Comparar claims sobre mismo tema across reports
- Identificar:
  - Direct contradictions (incompatible claims)
  - Apparent contradictions (resolvable con contexto)
  - Different emphasis (no contradictorio)
- Analizar cada conflict y recomendar resolución

**6.5 Temporal and Narrative Coherence**
- Evaluar timeline coverage (gaps, overlaps)
- Evaluar conceptual flow (¿reports build on each other?)
- Sugerir natural reading order
- Detectar terminology inconsistencies

**6.6 Collective Gaps Analysis**
- Topics sin PRIMARY coverage en ningún report
- Disciplinas ausentes de ALL reports
- Perspectivas ausentes de ALL reports
- Geographic gaps across ALL reports

**PHASE 3: Collective Synthesis (STEP 7)**

**7.1 Calculate Collective Scores**
- Collective Source Quality (con bonus por diversidad)
- Collective Claim Quality (con bonus por consistencia)
- Collective Coverage Quality (con bonus por complementarity)
- Collective Methodological Quality (promedio)
- Overall Collective Score

**7.2 Multi-Report Publication Readiness**
- Status: PUBLICATION-READY / NEEDS MINOR / NEEDS MAJOR / REQUIRES REWORK
- Rationale considerando:
  - Individual report quality
  - Complementarity
  - Consistency (no contradictions)
  - Collective gaps
  - Narrative coherence

**7.3 Collection-Specific Strengths**
- Excellent complementarity
- Strong collective source base
- Comprehensive coverage
- etc.

**7.4 Collection-Specific Weaknesses**
- Persistent gaps
- Geographic imbalance
- Terminology inconsistency
- etc.

**7.5 Collection Recommendations**
- Required actions (con effort estimates)
- Suggested improvements
- Reading order recommendation

**Outputs:**

Individual reports:
- RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS1]_[DATE].md
- RESEARCH_EVALUATION_REPORT_[TOPIC]_[FOCUS2]_[DATE].md
- [...]

Collective report:
- RESEARCH_EVALUATION_REPORT_[TOPIC]_COLLECTION_[DATE].md

Estructura collective report:
```markdown
## EXECUTIVE SUMMARY
[Individual + collective ratings table]

## 1. INDIVIDUAL REPORTS SUMMARY
Brief summary of each report's evaluation

## 2. CROSS-REPORT INTEGRATION ANALYSIS
### 2.1 Coverage Integration
### 2.2 Disciplinary/Perspective Integration
### 2.3 Source Deduplication
### 2.4 Claim Consistency
### 2.5 Narrative Coherence
### 2.6 Collective Gaps

## 3. COLLECTIVE ASSESSMENT
### 3.1 Collective Scores
### 3.2 Multi-Report Publication Readiness
### 3.3 Collection Strengths
### 3.4 Collection Weaknesses

## 4. RECOMMENDATIONS FOR COLLECTION
### 4.1 Required Actions
### 4.2 Suggested Improvements
### 4.3 Recommended Reading Order

## APPENDICES
- Complete Deduplicated Source List
- Coverage Matrix
- Terminology Standardization Guide
```

### Valor de la Evaluación

**Previene trabajo perdido:**
- Detecta problemas ANTES de escribir libro/post editorial
- Evita invertir 20-40 horas writing en base débil

**Decisión clara:**
- Semáforo simple (GREEN/YELLOW/RED)
- Effort estimates para cada acción

**Guía accionable:**
- No solo "qué está mal"
- Sino "cómo arreglarlo" + "cuánto tiempo"

**Cuantificable:**
- Scores trackeable proyecto a proyecto
- Métricas comparables

---

## CHECKPOINT 3: DECISIÓN GO/NO-GO

### Objetivo
Decidir si research report(s) están listos para fase de escritura editorial.

### Actor
Editor (humano)

### Duración Estimada
1-2 horas de análisis

### Inputs

- RESEARCH_EVALUATION_REPORT (individual o collective)
- RESEARCH_REPORT(s) (el/los documentos evaluados)

### Proceso

**1. Leer Executive Summary del Evaluation Report**
- ¿Overall score?
- ¿Publication readiness status?
- ¿Top strengths y weaknesses?

**2. Revisar Section 5: Overall Assessment**
- Analizar scores por dimensión
- Identificar dimensiones débiles
- Leer critical gaps y risks

**3. Revisar Section 6: Recommendations**
- ¿Qué acciones son REQUIRED?
- ¿Cuánto esfuerzo estimado?
- ¿Son abordables?

**4. [Si multi-report] Revisar Cross-Report Analysis**
- ¿Reports se complementan bien?
- ¿Hay contradicciones significativas?
- ¿Gaps colectivos son manejables?

### Decisión por Semáforo

#### 🟢 GREEN: PUBLICATION-READY

**Criterios:**
- Overall score ≥70%
- Ninguna dimensión <50%
- Required actions son mínimas (<5 horas effort)
- Critical gaps son pocos o manejables

**Decisión:**
✅ **APROBAR PARA ESCRITURA**

**Próximos pasos:**
1. Archivar evaluation report
2. Proceder a fase de escritura (workflow separado)
3. Usar RESEARCH_REPORT(s) como base principal

**Nota:**
Aunque sea GREEN, editor puede optar por ejecutar "Suggested Improvements" si tiene tiempo y quiere excelencia máxima.

#### 🟡 YELLOW: NEEDS REFINEMENT

**Criterios:**
- Overall score 50-69%
- Algunas dimensiones débiles (40-60%)
- Required actions son significativas (5-20 horas effort)
- Critical gaps presentes pero abordables

**Decisión:**
⚠️ **REFORZAR ANTES DE ESCRIBIR**

**Opciones:**

**Opción A: Ejecutar refinamiento específico**
1. Revisar recommendations
2. Identificar acciones de mayor impacto
3. Ejecutar esas acciones (research adicional, fortalecer claims, etc.)
4. Re-evaluar después del refinamiento
5. Si pasa a GREEN → Aprobar
6. Si sigue YELLOW → Decidir si aceptable o iterar más

**Esfuerzo típico:** 10-20 horas

**Opción B: Aceptar como está**
- Si time constraints son críticos
- Si weaknesses son en áreas no-críticas para el objetivo
- Editor conscientemente acepta limitaciones

**Decisión del editor:**
- ¿Vale la pena 10-20h para pasar a GREEN?
- ¿O las limitaciones son aceptables?

#### 🔴 RED: REQUIRES REWORK

**Criterios:**
- Overall score <50%
- Múltiples dimensiones débiles (<40%)
- Required actions son extensas (20-40+ horas)
- Critical gaps son severos

**Decisión:**
❌ **NO APROBAR - REQUIERE TRABAJO MAYOR**

**Opciones:**

**Opción A: Iterar investigación profunda**
1. Analizar qué falló:
   - ¿Scope mal definido?
   - ¿Research Focus equivocado?
   - ¿Fuentes insuficientes?
   - ¿Anotaciones del editor poco claras?
2. Ajustar approach:
   - Modificar RESEARCH_PLAN_DETAILED
   - Buscar fuentes adicionales
   - Cambiar Research Focus si es necesario
3. Re-ejecutar RAMA B (EXECUTE_RESEARCH_PLAN)
4. Re-evaluar

**Esfuerzo típico:** 20-40 horas adicionales

**Opción B: Cambiar objetivo editorial**
- De LIBRO a POST (scope más manejable)
- Reducir ambición del proyecto
- Enfocarse en sub-tema mejor cubierto

**Opción C: Abandonar (caso extremo)**
- Si problema es fundamental del tema
- Si no hay fuentes suficientes disponibles
- Si complejidad excede capacidades

#### ⚫ CRÍTICO: PROBLEMA FUNDAMENTAL

**No es un semáforo formal, pero puede surgir:**

**Señales:**
- Score <30%
- Múltiples dimensiones <20%
- Evaluation report señala problemas estructurales
- Contradicciones irresolubles en multi-report

**Decisión:**
🛑 **STOP - REEVALUAR PROYECTO COMPLETO**

**Acciones:**
1. Volver a FASE 0-1
2. Buscar referencias completamente diferentes
3. Reconsiderar si el tema es viable
4. Consultar con expertos externos
5. Potencialmente abandonar

### Documentación de Decisión

Editor debe documentar decisión en:
- EVALUATION_REPORT (añadir sección "EDITOR DECISION")
- Notas de proyecto

Ejemplo:
```markdown
## EDITOR DECISION (25 Jan 2026)

**Status after evaluation:** YELLOW (64% overall)

**Decision:** Execute refinement

**Actions to take:**
1. Strengthen Tier 1 source coverage for Section 4 (5 hours)
2. Add case studies for Section 5 (8 hours)
3. Address terminology inconsistency (2 hours)

**Total effort:** ~15 hours

**Expected outcome:** Move to GREEN status

**Timeline:** Complete by 30 Jan 2026, re-evaluate 31 Jan
```

---

## ARTEFACTOS DEL SISTEMA

### Artefactos Globales (Transversales a Proyectos)

**1. SOURCE_AUTHORITY_HIERARCHY**
- **Propósito:** Jerarquía acumulativa de fuentes confiables por tema/disciplina
- **Formato:** Markdown estructurado
- **Versionado:** Incremental (v1.0, v1.1, v1.2, ...)
- **Actualización:** Fase 2 de cada proyecto
- **Ubicación:** Repositorio global (reutilizable)

**2. CLAIM_VALIDATION_CRITERIA**
- **Propósito:** Criterios conceptuales para validar afirmaciones
- **Formato:** Markdown estructurado
- **Versionado:** Incremental
- **Actualización:** Fase 2 de cada proyecto
- **Ubicación:** Repositorio global

**3. Prompts del Sistema**
- SUMMARIZE_REFERENCES v4.0
- UPDATE_VALIDATION_CHECKLIST v3.0
- RESEARCH_DEEP_DIVE_PROMPT v1.1 (RAMA A)
- CREATE_RESEARCH_PLAN v2.1.2 (RAMA B)
- EXECUTE_RESEARCH_PLAN v1.0 (RAMA B)
- EVALUATE_RESEARCH_REPORT v1.0
- WRITING_INSTRUCTIONS_RESEARCH_REPORT v2.1 (template base)

### Artefactos por Proyecto

**Fase 0-1:**
- Referencias iniciales (PDFs, URLs)
- REFERENCE_SUMMARY
- RESEARCH_PLAN
- NARRATIVE_BRIDGE

**Fase 2:**
- VALIDATION_REPORT
- SOURCE_AUTHORITY_HIERARCHY (versión actualizada)
- CLAIM_VALIDATION_CRITERIA (versión actualizada)

**Fase 3:**
- ANNOTATED_REFERENCE_SUMMARY
- ANNOTATED_RESEARCH_PLAN

**Fase 4A (si se ejecuta RAMA A):**
- RESEARCH_DEEP_DIVE
  - Longitud: 5,000-10,000 palabras
  - Estructura: Flexible según anotaciones del editor
  - Incluye: Timeline and Cast of Characters (400-600 palabras)
  - Incluye: Executive Summary, Body Sections, Synthesis, Methodology, Implications, References

**Fase 4B (si se ejecuta RAMA B):**
- RESEARCH_PLAN_DETAILED (3,000-5,000 palabras)
- WRITING_INSTRUCTIONS_ADAPTED (customizado del template base v2.1)
- RESEARCH_REPORT (uno o múltiples según necesidad del libro)
  - Longitud: 8,000-15,000 palabras por report
  - Estructura: Según Research Focus seleccionado (A-G)
  - Incluye: Timeline and Cast of Characters (400-600 palabras)
  - Incluye: Executive Summary, Introduction, Body (según focus), Methodology, Conclusions, References

**Fase 5:**
- RESEARCH_EVALUATION_REPORT (individual)
- RESEARCH_EVALUATION_REPORT_COLLECTION (si múltiples reports)

### Nomenclatura de Archivos

**Convención:**
```
[FASE]_[TIPO]_[PROYECTO]_[VERSION].md

Ejemplos:
- PHASE1_REFERENCE_SUMMARY_SmartBuildings_v1.0.md
- PHASE1_RESEARCH_PLAN_SmartBuildings_v1.0.md
- PHASE3_ANNOTATED_REFERENCE_SUMMARY_SmartBuildings.md
- PHASE4_RESEARCH_REPORT_SmartBuildings_StateOfArt_v1.0.md
- PHASE5_EVALUATION_REPORT_SmartBuildings_20260125.md
```

---

## MÉTRICAS DE CALIDAD

### Métricas por Fase

#### FASE 1: SUMMARIZE_REFERENCES

**Input quality:**
- Número de referencias: Mín 8, Recomendado 15-30
- Mix de tipos: Papers, informes, artículos
- Mix de Tiers: Al menos 2-3 Tier 1

**Output quality:**
- REFERENCE_SUMMARY: 5,000-7,000 palabras
- Secciones completas: 9/9
- Conceptos principales identificados: 5-10
- Debates capturados: 3-7

**Time to completion:**
- Ejecución IA: 30-60 min
- Revisión editor (Checkpoint 1): 2-4 horas

#### FASE 2: UPDATE_VALIDATION_CHECKLIST

**Changes made:**
- Fuentes añadidas: 5-20 típicamente
- Validation checks añadidos: 2-5
- Red flags añadidos: 1-3

**Accuracy:**
- Tier classifications correctas: >90%
- Validation checks útiles: >80%

**Time to completion:**
- Ejecución IA: 15-30 min
- Revisión editor (Checkpoint 2): 15-30 min

#### FASE 3: ANOTACIÓN

**Annotation density:**
- REFERENCE_SUMMARY: 10-20 annotations
- RESEARCH_PLAN: 8-15 annotations
- Total TASKs: 8-15
- Total LINEs modified: 5-10
- Total COMMENTs: 5-10

**Time invested:**
- Editor time: 2-6 horas

#### FASE 4A: RAMA A - RESEARCH_DEEP_DIVE

**Completitud de contenido:**
- TASK annotations addressed: 100%
- COMMENT contexts considered: 100%
- LINE priorities reflected: 100%
- LINE: OMIT topics excluded: 100%

**Secciones obligatorias:**
- Timeline included: Sí
- Cast of Characters included: Sí
- Timeline format appropriate: Sí (tabla si 10+ eventos, narrativo si <10)
- Key actors profiled: ≥5 autores, ≥3 instituciones

**Calidad de fuentes:**
- Tier 1 sources: ≥30% (ideal ≥40%)
- Total sources: Variable según anotaciones (20-60 típico)
- Citation completeness: 100%
- Source distribution documented: Sí

**Confidence distribution:**
- STRONG confidence: ≥40% de claims
- MODERATE confidence: 20-40%
- TENTATIVE + SPECULATIVE: ≤30%
- Confidence signaled in text: Sí

**Longitud:**
- Target: 5,000-10,000 palabras
- Minimum: 5,000 palabras (profundidad suficiente)
- Maximum recommended: 12,000 palabras
- Timeline & Cast: 400-600 palabras

**Estructura:**
- All required sections present: Sí
- Executive Summary: 400-600 palabras
- Introduction: 600-1,000 palabras
- Body sections: Flexible según anotaciones
- Synthesis: 800-1,200 palabras
- Methodology: 400-600 palabras
- Implications: 300-500 palabras

**Time to completion:**
- Ejecución IA: 5-15 horas (según densidad de anotaciones)
- Revisión editor opcional: 1-2 horas

#### FASE 4B: RAMA B

**PASO 1: CREATE_RESEARCH_PLAN**

**Plan quality:**
- Research jobs definidos: 10-20
- Jobs prioritarios (CRITICAL/HIGH): 6-12
- Source strategies especificadas: 100% de jobs
- Validation approach definido: 100% de jobs

**Time to completion:**
- Ejecución IA: 1-2 horas
- Revisión editor: 30-60 min

**PASO 2: EXECUTE_RESEARCH_PLAN**

**Research execution:**
- Research jobs completados: 100%
- Sources per job: 3-8 typical
- Tier 1 sources %: ≥30% target

**Report quality:**
- Length: 8,000-15,000 palabras
- Sections complete: 100%
- References: 30-80 typical
- Claims with citations: ≥95%

**Time to completion:**
- Ejecución IA: 15-30 horas

#### FASE 5: EVALUATE_RESEARCH_REPORT

**Evaluation metrics:**

**Source Quality:**
- Target: ≥70% para GREEN
- Tier 1 sources %: ≥50% ideal
- Diversity (disciplines): ≥3 fields típicamente

**Claim Quality:**
- Target: ≥70% para GREEN
- STRONG + MODERATE confidence: ≥60% ideal
- Overclaiming rate: <10% ideal

**Coverage Quality:**
- Target: ≥70% para GREEN
- Main perspectives represented: ≥80%
- Critical gaps: None para GREEN

**Methodological Quality:**
- Target: ≥70% para GREEN
- Transparency: High
- Limitations acknowledged: Yes
- Gaps identified: Yes

**Overall Score:**
- Publication-ready: ≥70%
- Needs refinement: 50-69%
- Requires rework: <50%

**Time to completion:**
- Evaluation (IA): 1-3 horas
- Review (Editor): 1-2 horas

### Métricas de Proyecto Completo

**Time investment (estimado):**
```
FASE 0: Variable (no tracked)
FASE 1: 3-5 horas (30-60min IA + 2-4h editor)
FASE 2: 1 hora (15-30min IA + 15-30min editor)
FASE 3: 2-6 horas (editor)
FASE 4A: 5-15 horas (IA) [si se ejecuta]
FASE 4B: 17-33 horas (1-2h + 30-60min + 15-30h IA) [si se ejecuta]
FASE 5: 2-5 horas (1-3h IA + 1-2h editor)

TOTAL POST (con RAMA A):
~18-36 horas

TOTAL LIBRO (con RAMA B):
~27-53 horas

TOTAL LIBRO (con RAMA A + RAMA B):
~32-68 horas
```

**Quality gates passed:**
- Checkpoint 1: References sufficient
- Checkpoint 2: Validations correct
- Checkpoint 3 (Fase 5): Publication-ready status

**Outputs produced:**
- Post project: 5-7 artefactos principales
- Libro project: 7-10 artefactos principales

---

## FIN DEL WORKFLOW DE INVESTIGACIÓN

Este workflow termina con RESEARCH_REPORT(s) validados y aprobados para escritura.

**Próximos pasos (workflows separados):**

**Para POST:**
- Workflow de Writing Post (pendiente diseño)
- Input principal: RESEARCH_DEEP_DIVE (de RAMA A)
- Output: Post editorial publicable

**Para LIBRO:**
- Workflow de Writing Libro (pendiente diseño)
- Input principal: RESEARCH_REPORT(s) validados
- Adaptación estilística según ESTILO_EDITORIAL_TINTA_ARTIFICIAL
- Output: Libro publicable Tinta Artificial

---

**VERSIÓN:** 3.0  
**ÚLTIMA ACTUALIZACIÓN:** 25 enero 2026  
**SIGUIENTE ACTUALIZACIÓN:** Diseño de RAMA A + Workflows de escritura
