---
id:          WORKFLOW_ACTIVATION
type:        WORKFLOW
subsystem:   ACTIVATION
version:     1.5
status:      ACTIVE
created:     2026-02-10
updated:     2026-04-16
owner_chat:  activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.5 | 2026-04-16 | JM | Q&A de posicionamiento (PROMPT_QA_IDEAS) añadido en Fase 4 antes de escritura. POST_SEED como input canónico de PROMPT_WRITE_POST. Skip declarable por el editor. Referencias a CONTEXT_WRITING y TEMPLATE_POST_SEED. Cabecera YAML estándar añadida. PROMPT_WRITE_POST v2.0 confirmado como existente en /writing/shared/. WRITE_POST/WRITE_ARTICLE/WRITE_THREAD eliminados como pendientes. WRITING_CONTEXT añadido como artefacto de configuración requerido (writing/post/RESOURCE_WRITING_CONTEXT.md). Nota de scope R1: flujo completo /writing/post/ no compartido con Activation; generación POST_SEED propio de Activation pendiente Sprint 4. Implementa DL_20260411_ACTIVATION_022, DL_20260416_SYSTEM_025. |
| v1.4 | 2026-02-12 | JM | NICHOS LITERARIOS integrados en FASE 0. Objetivos de activación integrados en ANALYZE_COLLECTION v1.4. |
| v1.3 | 2026-02-10 | JM | Instrucciones de parada añadidas en cada SUBFASE de FASE 0. |
| v1.2 | 2026-02-10 | JM | FASE 0 dividida en 5 SUBFASES con checkpoints secuenciales. |
| v1.1 | 2026-02-10 | JM | ACTIVATION_CONTEXT se genera siempre, con o sin RESEARCH_REPORTs. |
| v1.0 | 2026-02-10 | JM | Workflow inicial completo con 5 fases definidas. |

## DEPENDENCIES

inputs:  [CONTEXT_WRITING, TEMPLATE_POST_SEED, EDITOR_PROFILE, libro(s) completo(s)]
outputs: [posts/artículos/threads publicables, BOOK_BRIEF]
calls:   [PROMPT_QA_IDEAS, PROMPT_WRITE_POST, PROMPT_CREATE_TIMELINE, PROMPT_CREATE_CAST]

---

# WORKFLOW: CONTENT ACTIVATION - SISTEMA TINTA ARTIFICIAL

**Proyecto:** Tinta Artificial
**Versión:** 1.5
**Fecha:** 12 febrero 2026
**Última actualización:** 16 abril 2026
**Alcance:** Desde libro(s) completo(s) hasta campaña de activación de contenido
**Tipo:** Workflow específico para ACTIVACIÓN DE CONTENIDO (posts, artículos, threads)

---

## CHANGELOG LEGADO (formato narrativo)

**v1.5 (16 abril 2026 — actualización DL_20260416_SYSTEM_025):**
- ✅ **PROMPT_WRITE_POST v2.0 CONFIRMADO:** ya existe en `/writing/shared/` — no es pendiente de diseño
- ✅ `WRITE_POST v1.0`, `WRITE_ARTICLE v1.0`, `WRITE_THREAD v1.0` eliminados como herramientas pendientes
- ✅ **PROMPT_WRITE_POST v2.0** maneja todos los formatos (post_estandar, post_largo, hilo)
- ✅ **`WRITING_CONTEXT`** añadido como artefacto de configuración requerido — definido en `writing/post/RESOURCE_WRITING_CONTEXT.md`
- ✅ **Nota de scope R1 (DL_20260416_SYSTEM_025):** flujo completo `/writing/post/` NO compartido con Activation en R1
- ✅ Mecanismo de generación del POST_SEED propio de Activation: **pendiente diseño Sprint 4**
- ✅ Fecha de actualización: 2026-04-16

**v1.5 (12 abril 2026 — DL_20260411_ACTIVATION_022):**
- ✅ **Q&A DE POSICIONAMIENTO:** `PROMPT_QA_IDEAS` (Writing/shared) añadido en FASE 4 antes de escritura
- ✅ **POST_SEED como input canónico:** combina contenido del libro + voz posicionada del editor
- ✅ Skip declarable por el editor con mismo mecanismo que en RAMA POST autónoma
- ✅ Añadidas referencias a `CONTEXT_WRITING` y `TEMPLATE_POST_SEED` (Writing/shared)
- ✅ Cabecera YAML estándar añadida
- ✅ Implementa `DL_20260411_ACTIVATION_022`

**v1.4 (12 febrero 2026):**
- ✅ **NICHOS LITERARIOS:** Identificación de recursos literarios integrada en FASE 0
- ✅ **OBJETIVOS INTEGRADOS:** Objetivos de activación integrados en ANALYZE_COLLECTION v1.4
- ✅ Actualizado PROMPT_ANALYZE_COLLECTION v1.3 → v1.4
- ✅ SUBFASE 0.1: Ahora captura recursos literarios (frases, metáforas, giros, humor)
- ✅ CHECKPOINT 0.1: Añadida verificación de recursos literarios capturados
- ✅ Compatibilidad total: CREATE_TIMELINE, CREATE_CAST, CREATE_PROFILE sin cambios

**v1.3 (10 febrero 2026):**
- ✅ **INSTRUCCIONES DE PARADA:** Añadidas en cada SUBFASE de FASE 0
- ✅ Puntos de parada obligatorios después de cada subfase
- ✅ Prohibición explícita de continuar sin validación del editor
- ✅ Nueva sección: "GUÍA DE EJECUCIÓN FASE 0"
- ✅ Actualizado PROMPT_ANALYZE_COLLECTION v1.2 → v1.3 (con instrucciones STOP)
- ✅ Documento auxiliar: GUIA_EJECUCION_FASE_0_v1_0.md
- ✅ Garantiza ejecución secuencial con validación paso a paso
- ✅ Compatibilidad preservada: CREATE_TIMELINE, CREATE_CAST, CREATE_PROFILE sin cambios

**v1.2 (10 febrero 2026):**
- ✅ **REESTRUCTURACIÓN CRÍTICA:** FASE 0 dividida en 5 SUBFASES con checkpoints secuenciales
- ✅ Validación paso a paso (corrección temprana, no regenerar todo)
- ✅ Instrucciones explícitas "CREATE FILE" en cada subfase
- ✅ Instrucciones contextuales exhaustivas para CREATE_TIMELINE y CREATE_CAST
- ✅ Detección y manejo de REVISTAS/PUBLICACIONES PERIÓDICAS
- ✅ TIMELINE exhaustivo: 30-1,000 eventos (vs 15-50 selectivo)
- ✅ CAST exhaustivo: 20-500 perfiles (vs 10-30 selectivo)
- ✅ Nuevo ESCENARIO E para revistas/publicaciones
- ✅ Actualizado PROMPT_ANALYZE_COLLECTION v1.1 → v1.2
- ✅ Tiempos actualizados por escenario
- ✅ Garantía de creación de archivos físicos

**v1.1 (10 febrero 2026):**
- ✅ **CORRECCIÓN CRÍTICA:** ACTIVATION_CONTEXT se genera SIEMPRE
- ✅ Actualizada lógica: ACTIVATION_CONTEXT con o sin RESEARCH_REPORT(s)
- ✅ RESEARCH_REPORT(s) pasan a ser input enriquecedor (no excluyente)
- ✅ Actualizado diagrama de flujo FASE 0
- ✅ Actualizados inputs de FASE 1, 2, 3, 4
- ✅ Actualizados escenarios de tiempo (Escenario A: 2-3h)
- ✅ Actualizado checklist de verificación FASE 0
- ✅ Actualizado PROMPT_ANALYZE_COLLECTION v1.0 → v1.1 con nueva lógica

**v1.0 (10 febrero 2026):**
- ✅ Workflow inicial completo con 5 fases definidas
- ✅ Sistema universal: funciona con libros de cualquier editorial
- ✅ Reutilización de prompts existentes: CREATE_TIMELINE, CREATE_CAST, CREATE_EDITOR_PROFILE
- ✅ Único prompt nuevo en FASE 0: ANALYZE_COLLECTION_FOR_ACTIVATION
- ✅ Lógica de EDITOR_PROFILE simplificada: solo 2 casos (mismo autor / misma colección)
- ✅ Integración con workflows RESEARCH y WRITING
- ✅ 8 prompts totales: 1 nuevo + 3 reutilizados + 4 de activación (pendientes de diseño)
- ✅ Arquitectura coherente con WORKFLOW_RESEARCH y WORKFLOW_WRITING
- ✅ Documentación de escenarios: libro único, múltiples libros, colección, Tinta Artificial
- ✅ Métricas de calidad y tiempos estimados por fase
- ✅ Sistema completo de checkpoints de validación
- ✅ Diagramas de flujo ASCII detallados

---

## CONTENIDO

1. [Visión General del Sistema](#1-visión-general-del-sistema)
2. [Diagrama de Flujo Completo](#2-diagrama-de-flujo-completo)
3. [Fase 0: Preparación y Generación de Contexto](#fase-0-preparación-y-generación-de-contexto)
4. [Fase 1: Análisis para Activación](#fase-1-análisis-para-activación)
5. [Fase 2: Estrategia de Contenido](#fase-2-estrategia-de-contenido)
6. [Fase 3: Plan de Posts](#fase-3-plan-de-posts)
7. [Fase 4: Producción de Contenido](#fase-4-producción-de-contenido)
8. [Fase 5: Validación y Publicación](#fase-5-validación-y-publicación)
9. [Artefactos del Sistema](#artefactos-del-sistema)
10. [Métricas de Calidad](#métricas-de-calidad)

---

## 1. VISIÓN GENERAL DEL SISTEMA

### 1.1 Filosofía del Método Centauro

El proceso de activación de contenido combina:
- **IA como content strategist y writer** (análisis, estrategia, redacción de posts)
- **Editor/Curator como decisor editorial** (selección de temas, aprobación de estrategia, validación)
- **Reutilización inteligente** (contenido del libro → múltiples formatos: posts, artículos, threads)
- **Coherencia de voz** (mantener estilo del autor o editorial en todo el contenido activado)

### 1.2 Cambio de Rol de la IA

**De WRITING ASSISTANT (Fase Writing) a CONTENT STRATEGIST + WRITER (Fase Activation):**

| ASPECTO | WRITING PHASE | ACTIVATION PHASE |
|---------|---------------|------------------|
| **Rol principal** | Escritor de libro | Estratega + Escritor de posts |
| **Output** | Capítulos de libro (largo) | Posts/artículos/threads (corto-medio) |
| **Enfoque** | Profundidad, exhaustividad | Engagement, accesibilidad, viralidad |
| **Estilo** | Libro cohesionado | Adaptado a plataforma (LinkedIn/Substack/Twitter) |
| **Fuentes** | Research Reports directos | Libro(s) + Activation Context |
| **Creatividad** | Media (narrativa del libro) | Alta (ángulos, hooks, formatos diversos) |
| **Audiencia** | Lector comprometido (horas) | Lector casual (minutos) |

### 1.3 Principios Operacionales

1. **Sistema universal**: Funciona con libros de cualquier editorial, no solo Tinta Artificial
2. **Fuentes mínimas**: Solo 2 obligatorias (libro + objetivos de activación)
3. **Reutilización inteligente**: Aprovecha prompts existentes del sistema D-X-OPUS
4. **Generación adaptativa**: Genera fuentes faltantes según necesidad
5. **Coherencia de voz**: Un perfil editorial activo por campaña
6. **Validación en checkpoints**: Editor aprueba antes de continuar a siguiente fase
7. **Flexibilidad de formatos**: Posts, artículos, threads según plataforma
8. **Métricas de activación**: Evalúa potencial de engagement de cada pieza

### 1.4 Tipos de Colecciones

**El sistema puede activar 4 tipos de colecciones:**

```
TIPO 1: LIBRO ÚNICO
├─ Input: 1 libro completo
├─ Caso: "Thinking, Fast and Slow" (Kahneman)
└─ Perfil: EDITOR_PROFILE_DANIEL_KAHNEMAN.md

TIPO 2: MÚLTIPLES LIBROS MISMO AUTOR
├─ Input: 2-5 libros del mismo autor
├─ Caso: "Black Swan" + "Antifragile" + "Skin in the Game" (Taleb)
└─ Perfil: EDITOR_PROFILE_NASSIM_TALEB.md

TIPO 3: COLECCIÓN EDITORIAL
├─ Input: 2-5 libros de misma colección
├─ Caso: 3 libros de "Oxford Very Short Introductions"
└─ Perfil: EDITOR_PROFILE_OXFORD_VSI.md

TIPO 4: SERIE TEMÁTICA
├─ Input: 2-5 libros sobre mismo tema (diferentes autores)
├─ Caso: 3 libros sobre IA de Tegmark, Russell, Christian
└─ Perfil: Puede ser híbrido o seleccionar uno
```

### 1.5 Integración con Workflows Existentes

**Relación con RESEARCH y WRITING workflows:**

```
WORKFLOW RESEARCH
├─ FASE 5: RESEARCH_REPORT(s) generados
│          │
│          ▼
│   WORKFLOW WRITING
│   ├─ FASE 0-5: Libro completo producido
│   │          │
│   │          ▼
│   │   WORKFLOW ACTIVATION (este)
│   │   └─ FASE 0-4: Posts/artículos generados
│
└─────────────────────────────────────────────┐
                                              │
         [TAMBIÉN FUNCIONA CON LIBROS         │
          EXTERNOS SIN RESEARCH REPORTS]      │
                                              │
                                              ▼
                                    WORKFLOW ACTIVATION
                                    └─ Genera fuentes faltantes en FASE 0
```

**Puntos de integración:**

1. **Con RESEARCH workflow:**
   - Si libro tiene RESEARCH_REPORT(s) → Usar como input enriquecido para ACTIVATION_CONTEXT
   - Si NO tiene → ACTIVATION_CONTEXT se genera igualmente solo desde libro
   - **CRÍTICO:** ACTIVATION_CONTEXT se genera SIEMPRE (con o sin RR)

2. **Con WRITING workflow:**
   - Libro completo es input principal
   - EDITOR_PROFILE puede reutilizarse si existe
   - TIMELINE y CAST pueden reutilizarse si existen
   - **FASE 4:** Activation invoca `PROMPT_QA_IDEAS` y `PROMPT_WRITE_POST` de Writing/shared
   - Ver `CONTEXT_WRITING` para documentación completa de estos prompts

3. **Independiente:**
   - Puede activar libros externos sin pasar por RESEARCH/WRITING
   - Genera ACTIVATION_CONTEXT desde libro final
   - Genera todo lo demás necesario (TIMELINE, CAST, PROFILE)

---

## 2. DIAGRAMA DE FLUJO COMPLETO

```
┌────────────────────────────────────────────────────────────────┐
│ FASE 0: PREPARACIÓN Y GENERACIÓN DE CONTEXTO                   │
│ Actor: Editor (input) + IA (generación)                        │
│ Tiempo: 30 min - 10 horas (según escenario)                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
         [Editor proporciona LIBRO(S) + OBJETIVOS_ACTIVACION]
         ├─ Escenario A: Libro Tinta Artificial (todo existe)
         ├─ Escenario B: Libro externo - autor individual
         ├─ Escenario C: Libro externo - colección editorial
         └─ Escenario D: Múltiples libros (cualquier combinación)
                            ↓
         [Sistema verifica fuentes disponibles]
                            ↓
              ¿Existen RESEARCH_REPORT(s)?
                    /           \
                  SÍ             NO
                  │              │
         [Usar como input]  [Usar solo libro]
         [enriquecedor]           │
                  │              │
                  └──────┬───────┘
                         │
                         ▼
         EJECUTAR SIEMPRE:
         ANALYZE_COLLECTION_FOR_ACTIVATION v1.4
         (1-4 horas)
                         │
                         ▼
         OUTPUT: ACTIVATION_CONTEXT_[PROYECTO].md
         (con o sin enriquecimiento de RR)
                         │
                         ▼
         ¿Existe TIMELINE? ¿Existe CAST? ¿Existe EDITOR_PROFILE?
                         │
            [Para cada faltante, EJECUTAR prompt existente:]
            ├─ CREATE_TIMELINE v1.0 (si falta) - 1-2h
            ├─ CREATE_CAST v1.0 (si falta) - 1-2h
            └─ CREATE_EDITOR_PROFILE v1.0 (si falta) - 2-4h
                         │
                         ▼
         [Sistema detecta número de perfiles disponibles]
                         │
            ¿Cuántos EDITOR_PROFILE disponibles?
                    /           \
              SOLO 1           MÚLTIPLES
                  │                │
         [Usar automático]   [PREGUNTAR al editor:]
                  │          - ¿Cuál usar?
                  │          - ¿Combinar?
                  │          - ¿Crear híbrido?
                  │                │
                  └────────┬───────┘
                           │
                           ▼
                  PERFIL ACTIVO definido
                           │
                           ▼
                    OUTPUT FASE 0:
                    ┌──────────────────────────────┐
                    │ ACTIVATION_CONTEXT           │ (si generado)
                    │ TIMELINE                     │ (si generado)
                    │ CAST_OF_CHARACTERS           │ (si generado)
                    │ EDITOR_PROFILE_[...]         │ (si generado)
                    │ PERFIL_ACTIVO_SELECCIONADO   │ (decisión)
                    └──────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 1: VERIFICACIÓN DE FUENTES                          │
│ Duración: 30-60 minutos                                        │
└────────────────────────────────────────────────────────────────┘
                           ↓
         [Editor verifica que todas las fuentes están completas]
         [Checklist de verificación marcado]
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ FASE 1: ANÁLISIS PARA ACTIVACIÓN                              │
│ Herramienta: ANALYZE_BOOK_FOR_ACTIVATION v1.0 [DISEÑAR]       │
│ Actor: IA analiza, Editor selecciona                           │
│ Tiempo: 2-3 horas (IA) + 1-2 horas (Editor)                   │
└────────────────────────────────────────────────────────────────┘
                           ↓
                    INPUT:
                    - ACTIVATION_CONTEXT (o RESEARCH_REPORT(s))
                    - LIBRO_COMPLETO
                    - OBJETIVOS_ACTIVACION
                    - TIMELINE
                    - CAST
                           ↓
         [IA identifica temas activables con potencial]
         Criterios:
         ├─ Engagement potencial (alto/medio/bajo)
         ├─ Complejidad (accesible/medio/técnico)
         ├─ Controversialidad (provoca debate?)
         ├─ Aplicabilidad (valor práctico?)
         └─ Novedad (perspectiva fresca?)
                           ↓
                    OUTPUT:
                    ┌──────────────────────────────┐
                    │ TEMAS_ACTIVABLES             │ (20-40 temas)
                    │ - Título del tema            │
                    │ - Potencial (score 1-10)     │
                    │ - Tipo de contenido sugerido │
                    │ - Ángulo propuesto           │
                    │ - Extensión sugerida         │
                    │ - Plataforma ideal           │
                    └──────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 2: SELECCIÓN DE TEMAS                              │
│ Duración: 1-2 horas                                            │
└────────────────────────────────────────────────────────────────┘
                           ↓
         [Editor selecciona 10-30 temas prioritarios]
         [Editor puede añadir temas no sugeridos]
         [Editor puede ajustar ángulos propuestos]
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ FASE 2: ESTRATEGIA DE CONTENIDO                               │
│ Herramienta: CREATE_CONTENT_STRATEGY v1.0 [DISEÑAR]           │
│ Actor: IA propone, Editor ajusta                               │
│ Tiempo: 1-2 horas (IA) + 1 hora (Editor)                      │
└────────────────────────────────────────────────────────────────┘
                           ↓
                    INPUT:
                    - TEMAS_SELECCIONADOS (10-30)
                    - OBJETIVOS_ACTIVACION
                    - PERFIL_ACTIVO
                           ↓
         [IA diseña estrategia de contenido]
         Componentes:
         ├─ Calendario editorial (timeline de publicación)
         ├─ Mix de formatos (posts/artículos/threads)
         ├─ Distribución por plataforma
         ├─ Secuenciación narrativa (qué va primero)
         ├─ Clusters temáticos (temas relacionados)
         └─ Métricas de éxito por pieza
                           ↓
                    OUTPUT:
                    ┌──────────────────────────────┐
                    │ CONTENT_STRATEGY             │
                    │ - Calendario (semanas 1-12)  │
                    │ - 15-30 piezas planificadas  │
                    │ - Mix de formatos            │
                    │ - Clusters temáticos         │
                    │ - KPIs por pieza             │
                    └──────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 3: APROBACIÓN DE ESTRATEGIA                        │
│ Duración: 30-60 minutos                                        │
└────────────────────────────────────────────────────────────────┘
                           ↓
         [Editor aprueba estrategia o solicita ajustes]
         ¿Estrategia aprobada?
                    /           \
                  NO             SÍ
                  │              │
         [Ajustar y re-generar]  │
         [Volver a FASE 2]       │
                                 ↓
┌────────────────────────────────────────────────────────────────┐
│ FASE 3: PLAN DE POSTS                                         │
│ Herramienta: DESIGN_POST_PLAN v1.0 [DISEÑAR]                  │
│ Actor: IA planifica, Editor revisa                             │
│ Tiempo: 2-4 horas (IA) + 1 hora (Editor)                      │
└────────────────────────────────────────────────────────────────┘
                           ↓
                    INPUT:
                    - CONTENT_STRATEGY (aprobada)
                    - ACTIVATION_CONTEXT
                    - LIBRO_COMPLETO
                    - PERFIL_ACTIVO
                           ↓
         [IA diseña plan detallado por cada pieza]

         [ITERACIÓN: Para cada pieza N = 1 hasta 15-30]
                           ↓
              Para PIEZA N crear:
              ├─ Título/Headline (3 opciones)
              ├─ Hook/Opening (cómo empezar)
              ├─ Estructura (outline de secciones)
              ├─ Key points (3-5 puntos principales)
              ├─ Fuentes a citar (del libro/context)
              ├─ CTA (call to action si aplica)
              └─ Formato específico (post/artículo/thread)
                           ↓
                    OUTPUT:
                    ┌──────────────────────────────┐
                    │ POST_PLAN_[N]                │ (por cada pieza)
                    │ - Título (3 opciones)        │
                    │ - Hook propuesto             │
                    │ - Outline (estructura)       │
                    │ - Key points                 │
                    │ - Fuentes a usar             │
                    │ - Extensión: [X palabras]    │
                    │ - Formato: [tipo]            │
                    └──────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 4: REVISIÓN DE PLANES                              │
│ Duración: 1-2 horas                                            │
└────────────────────────────────────────────────────────────────┘
                           ↓
         [Editor revisa planes de todas las piezas]
         [Puede ajustar títulos, ángulos, estructura]
         [Puede cambiar orden de publicación]
                           ↓
┌────────────────────────────────────────────────────────────────┐
│ FASE 4: PRODUCCIÓN DE CONTENIDO (SECUENCIAL)                  │
│ Herramientas: PROMPT_QA_IDEAS [Writing/shared] +              │
│               PROMPT_WRITE_POST v2.0 [Writing/shared]         │
│ Configuración: WRITING_CONTEXT (/writing/post/)               │
│ Actor: Editor + IA (Q&A) → IA escribe, Editor valida          │
│ Tiempo: 30-60 min Q&A + 1-3h escritura + 30-60 min rev.       │
└────────────────────────────────────────────────────────────────┘
                           ↓
         [ITERACIÓN SECUENCIAL: Pieza N = 1 hasta 15-30]
                           ↓
                    INPUT PIEZA N (al Q&A):
                    - POST_PLAN_[N] (aprobado)
                    - LIBRO_COMPLETO
                    - ACTIVATION_CONTEXT
                    - PERFIL_ACTIVO
                    - PIEZAS 1 a N-1 (ya escritas)
                           ↓
         ⭐ PASO 4.1: PROMPT_QA_IDEAS — Q&A de posicionamiento
         ¿Editor declara skip?
                    /           \
                  NO             SÍ (declarar razón)
                  │              │
         [Q&A ejecutado]  [Skip documentado]
                  │              │
                  └──────┬───────┘
                         │
                         ▼
         POST_SEED generado
         (combina contenido del libro + voz posicionada del editor)
         Template: TEMPLATE_POST_SEED — ver CONTEXT_WRITING
                         │
                         ▼
         [IA escribe pieza N según formato:]
                    /           |           \
              POST             ARTÍCULO        THREAD
              (600-1,500)      (1,500-3,000)   (8-15 tweets)
                    \           |           /
                           ↓
         [Aplicar estilo del PERFIL_ACTIVO]
         [Evitar repeticiones con piezas anteriores]
         [Citar fuentes apropiadamente]
         [Optimizar para plataforma objetivo]
                           ↓
                    OUTPUT:
                    CONTENT_[N]_v1.0
                           ↓
         [CHECKPOINT N: Editor revisa pieza N]
                           ↓
              ¿Necesita correcciones?
                    /           \
                  SÍ             NO
                  │              │
         [IA corrige]       [APROBADO]
         CONTENT_[N]_v2.0         │
                  │              │
                  └──────┬───────┘
                         │
         [Pieza N pasa a formar parte de contexto]
         [para escribir Pieza N+1]
                         │
                         ▼
         [Repetir para pieza N+1]
                         │
         [Hasta completar todas las piezas]
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ FASE 5: VALIDACIÓN Y PUBLICACIÓN                              │
│ Herramienta: EVALUATE_ACTIVATION_CONTENT v1.0 [DISEÑAR]       │
│ Actor: IA evalúa, Editor aprueba                               │
│ Tiempo: 2-4 horas                                              │
└────────────────────────────────────────────────────────────────┘
                         │
                         ▼
         PASO 5A: EVALUACIÓN DE COHERENCIA
         ├─ Verificar voz consistente
         ├─ Detectar repeticiones across piezas
         ├─ Validar citas y fuentes
         └─ Evaluar engagement potencial
                         │
                         ▼
         PASO 5B: PREPARACIÓN PARA PUBLICACIÓN
         ├─ Formatear para cada plataforma
         ├─ Generar metadata (tags, descripciones)
         ├─ Crear calendario de publicación
         └─ Exportar en formatos apropiados
                         │
                         ▼
                    OUTPUT FINAL:
                    ┌──────────────────────────────┐
                    │ CONTENT_PACKAGE              │
                    │ ├─ 15-30 piezas finales      │
                    │ ├─ Calendario publicación    │
                    │ ├─ Metadata por pieza        │
                    │ ├─ Formatos por plataforma   │
                    │ └─ Reporte de evaluación     │
                    └──────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│ CHECKPOINT 5: APROBACIÓN FINAL                                │
│ Duración: 1-2 horas                                            │
└────────────────────────────────────────────────────────────────┘
                         │
                         ▼
         [Editor aprueba package completo]
                         │
                         ▼
              CAMPAÑA DE ACTIVACIÓN LISTA
              PARA PUBLICACIÓN
```

---

## GUÍA DE EJECUCIÓN FASE 0

### ⚠️ Principio Fundamental

**FASE 0 NO se ejecuta de golpe.**
**FASE 0 se ejecuta en 5 SESIONES SEPARADAS con validación entre cada una.**

### Cómo Ejecutar Correctamente

**Template de invocación:**
```
Usuario: "Ejecuta SUBFASE 0.[N]: [NOMBRE]"
Claude: [ejecuta solo esa subfase]
        [crea archivo .md]
        [presenta archivo al usuario]
        [informa: "SUBFASE 0.N COMPLETA. Esperando validación."]
        [STOP - no continuar]
Usuario: [revisa archivo]
        [valida contenido]
        [decide: ¿Aprobado?]
Usuario: "Aprobado. Ejecuta SUBFASE 0.[N+1]"
```

### Sesiones de FASE 0

1. **SUBFASE 0.1:** Genera ACTIVATION_CONTEXT → Checkpoint 0.1 → Validar
2. **SUBFASE 0.2:** Genera TIMELINE → Checkpoint 0.2 → Validar
3. **SUBFASE 0.3:** Genera CAST → Checkpoint 0.3 → Validar
4. **SUBFASE 0.4:** Genera EDITOR_PROFILE → Checkpoint 0.4 → Validar
5. **SUBFASE 0.5:** Selecciona PERFIL_ACTIVO → Checkpoint 0.5 → Confirmar
6. **CHECKPOINT FINAL 0:** Verificación global

**Documentación completa:** Ver `GUIA_EJECUCION_FASE_0_v1_0.md`

### ⚠️ Errores Comunes

❌ **NO decir:** "Ejecuta FASE 0"
✅ **SÍ decir:** "Ejecuta SUBFASE 0.1"

❌ **NO esperar** que Claude pare solo
✅ **SÍ incluir** instrucciones de STOP en prompts

❌ **NO revisar** todo al final
✅ **SÍ validar** cada subfase antes de continuar

---

## FASE 0: PREPARACIÓN Y GENERACIÓN DE CONTEXTO

### Objetivo
Generar y validar **secuencialmente** todas las fuentes necesarias para iniciar el análisis de activación.

### Actor
IA genera, Editor valida paso a paso

### Duración Estimada
- **Escenario A** (Libro Tinta Artificial): 2-3 horas
- **Escenario B** (Libro externo mínimo): 6-10 horas
- **Escenario C** (Libro externo parcial): 4-7 horas
- **Escenario D** (Múltiples libros): 8-15 horas

### Filosofía de Validación Secuencial

**NUEVO en v1.2:** FASE 0 se divide en **subfases independientes** con **checkpoints intermedios**.

**Ventajas:**
- ✅ Corrección temprana (no regenerar todo si hay error)
- ✅ Iteración controlada (feedback específico por documento)
- ✅ Editor puede intervenir en cada paso
- ✅ No genera trabajo inútil
- ✅ Coherente con workflows RESEARCH y WRITING

---

## DIAGRAMA DE FLUJO FASE 0 (Secuencial)

```
┌────────────────────────────────────────────────────────────────┐
│ INPUTS MÍNIMOS (Editor proporciona)                           │
│ - LIBRO(S)_COMPLETO.md                                         │
│ - OBJETIVOS_ACTIVACION.md                                      │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ SUBFASE 0.1: ACTIVATION_CONTEXT                               │
│ Herramienta: ANALYZE_COLLECTION v1.4                          │
│ Tiempo: 1-4h                                                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
                    [IA genera contenido]
                    [CREAR ARCHIVO .md]
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ ⭐ CHECKPOINT 0.1: Validar ACTIVATION_CONTEXT                  │
│ Actor: Editor (30-45 min)                                      │
│ ¿Aprobado? → SÍ: Continuar 0.2 / NO: Regenerar 0.1            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ SUBFASE 0.2: TIMELINE (si no existe)                          │
│ Herramienta: CREATE_TIMELINE v1.0 + Instrucciones             │
│ Tiempo: 1-2h                                                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
                    [IA genera contenido EXHAUSTIVO]
                    [CREAR ARCHIVO .md]
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ ⭐ CHECKPOINT 0.2: Validar TIMELINE                            │
│ Actor: Editor (15-30 min)                                      │
│ ¿Aprobado? → SÍ: Continuar 0.3 / NO: Regenerar 0.2            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ SUBFASE 0.3: CAST OF CHARACTERS (si no existe)                │
│ Herramienta: CREATE_CAST v1.0 + Instrucciones                 │
│ Tiempo: 1-2h                                                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
                    [IA genera contenido EXHAUSTIVO]
                    [CREAR ARCHIVO .md]
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ ⭐ CHECKPOINT 0.3: Validar CAST                                │
│ Actor: Editor (15-30 min)                                      │
│ ¿Aprobado? → SÍ: Continuar 0.4 / NO: Regenerar 0.3            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ SUBFASE 0.4: EDITOR_PROFILE (si no existe)                    │
│ Herramienta: CREATE_EDITOR_PROFILE v1.0                       │
│ Tiempo: 2-4h                                                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
                    [IA genera perfil]
                    [CREAR ARCHIVO .md]
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ ⭐ CHECKPOINT 0.4: Validar EDITOR_PROFILE                      │
│ Actor: Editor (30-45 min)                                      │
│ ¿Aprobado? → SÍ: Continuar 0.5 / NO: Regenerar 0.4            │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ SUBFASE 0.5: SELECCIÓN PERFIL ACTIVO                          │
│ Actor: Editor o Automático                                     │
│ Tiempo: 0-30 min                                                │
└────────────────────────────────────────────────────────────────┘
                            ↓
         ¿Cuántos EDITOR_PROFILE disponibles?
                    /           \
              SOLO 1           MÚLTIPLES
                  │                │
         [Usar automático]   [PREGUNTAR al editor]
                  │                │
                  └────────┬───────┘
                           │
┌────────────────────────────────────────────────────────────────┐
│ ⭐ CHECKPOINT 0.5: Confirmar PERFIL_ACTIVO                     │
│ Actor: Editor (5-15 min)                                       │
│ ¿Confirmado? → SÍ: FASE 0 COMPLETA / NO: Revisar 0.5          │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ ✅ CHECKPOINT FINAL 0: VERIFICACIÓN GLOBAL                     │
│ Actor: Editor (15-30 min)                                      │
└────────────────────────────────────────────────────────────────┘
                            ↓
                    FASE 0 COMPLETA
                    → Continuar a FASE 1
```

---

## SUBFASE 0.1: ACTIVATION_CONTEXT

### Objetivo
Analizar libro(s) completo(s) y generar contexto estructurado para activación,
incluyendo identificación exhaustiva de nichos narrativos (eventos, personas,
conceptos, Y recursos literarios).

### Herramienta
**`ANALYZE_COLLECTION_FOR_ACTIVATION v1.4`** ✅ ACTUALIZADO

### Cuándo ejecutar
✅ SIEMPRE en workflow de activación
✅ Con o sin RESEARCH_REPORT(s) existentes
✅ Para libros de cualquier editorial (Tinta Artificial o externos)

### Input

**OBLIGATORIO:**
- LIBRO(S)_COMPLETO.md (1-5 libros)

**OPCIONAL (mejora resultado):**
- OBJETIVOS_ACTIVACION.md (si existe)
  └─ Si NO existe → Prompt preguntará por objetivos adicionales
- RESEARCH_REPORT(s) (si existen del workflow de investigación)
- Bibliografía(s) (si existe(n) como archivo separado)
- Materiales complementarios (working papers, artículos, guías de estilo)

### Proceso

**5 fases internas del prompt:**
1. Lectura y Comprensión (30%)
   - Comprensión holística de colección
   - Identificación de tipo (libro único / múltiples / REVISTA)
   - Doble perspectiva si es revista/publicación periódica

2. Síntesis Temática (25%) ⭐ ACTUALIZADO
   - Identificar 10-20 temas principales
   - Clasificación jerárquica (primarios/secundarios/terciarios)
   - **Identificar recursos literarios** (frases, metáforas, giros, humor)

3. Análisis de Fuentes (15%)
   - Clasificar fuentes citadas
   - Identificar autores clave

4. Argumentos y Debates (20%)
   - Mapear estructura argumentativa
   - Documentar debates (3-8)

5. Gaps y Oportunidades (10%)
   - Identificar qué NO está cubierto
   - Mapear 6 tipos de oportunidades de activación
   - **Documentar recursos literarios representativos**

### Output

**ARCHIVO OBLIGATORIO:** `ACTIVATION_CONTEXT_[PROYECTO].md`

**⚠️ INSTRUCCIÓN CRÍTICA:**
- El prompt DEBE crear un archivo físico markdown
- Verificar que archivo existe antes de continuar
- Editor necesita revisar este archivo en CHECKPOINT 0.1

**Contenido del archivo:**
- 3,000-5,000 palabras
- 9 secciones principales
- 10-20 temas identificados
- 20-100 fuentes clasificadas (si hay bibliografía)
- 5-10 debates documentados
- 8-15 gaps identificados
- 15-30 oportunidades de activación mapeadas
- **10-30 recursos literarios representativos** ⭐ NUEVO

**Tiempo:** 1-4 horas (según número de libros y si hay RR)

---

### ⛔ PUNTO DE PARADA OBLIGATORIO - SUBFASE 0.1

**EL TRABAJO DE SUBFASE 0.1 TERMINA AQUÍ.**

**Instrucciones para el ejecutor:**

**1. Has completado:**
```
✅ Generado contenido de ACTIVATION_CONTEXT
✅ Creado archivo ACTIVATION_CONTEXT_[PROYECTO].md
✅ Archivo existe físicamente en el sistema
```

**2. Debes hacer AHORA:**
```
✅ Presentar archivo al editor usando present_files
✅ Informar estado:
   "ACTIVATION_CONTEXT generado exitosamente
    Archivo: ACTIVATION_CONTEXT_[PROYECTO].md
    Temas identificados: [N]
    Oportunidades: [N]
    Recursos literarios capturados: [N] ⭐ NUEVO

    SUBFASE 0.1 COMPLETA.
    Esperando tu validación para continuar."
```

**3. NO debes hacer:**
```
❌ NO ejecutar SUBFASE 0.2
❌ NO generar TIMELINE
❌ NO continuar automáticamente
❌ NO mencionar próximos pasos
```

**4. ESPERAR validación:**
```
⏸️ El editor debe revisar el archivo
⏸️ El editor debe decidir: ¿Aprobado? o ¿Rechazado?
⏸️ SOLO cuando el editor diga "Aprobado" o "Continuar con SUBFASE 0.2"
   → Entonces proceder a SUBFASE 0.2
```

---

### ⭐ CHECKPOINT 0.1: Validación ACTIVATION_CONTEXT

**Duración:** 30-45 minutos

**Actor:** Editor

**Actividades:**

**1. Verificar existencia de archivo**
```
[ ] Archivo ACTIVATION_CONTEXT_[PROYECTO].md existe físicamente
[ ] Archivo se puede abrir correctamente
[ ] Tamaño apropiado (≥3,000 palabras)
```

**2. Revisar contenido**
- Leer documento completo
- ¿Temas identificados son relevantes? (verificar 10-20 temas)
- ¿Oportunidades mapeadas son realistas?
- ¿Debates documentados son precisos?
- ¿Recursos literarios capturados? ⭐ NUEVO (frases, metáforas, giros)
- Si es REVISTA: ¿Doble perspectiva está presente?

**3. Validar para caso específico**

**Si libro individual:**
- ¿Tesis principal bien identificada?
- ¿Temas principales capturan esencia del libro?

**Si múltiples libros:**
- ¿Relaciones entre libros bien documentadas?
- ¿Temas comunes identificados?

**Si revista/publicación:**
- ¿Meta-historia DE la revista está clara?
- ¿Análisis de contenidos EN la revista es exhaustivo?
- ¿Ambas perspectivas son valiosas?

**Decisión:**
```
¿ACTIVATION_CONTEXT aprobado?
├─ SÍ → Continuar a SUBFASE 0.2
│
└─ NO → Anotar problemas específicos:
        ├─ ¿Qué temas faltan?
        ├─ ¿Qué oportunidades no se identificaron?
        ├─ ¿Qué secciones están incompletas?
        └─ Regenerar SUBFASE 0.1 con feedback
```

---

## SUBFASE 0.2: TIMELINE (si no existe)

### Objetivo
Generar cronología EXHAUSTIVA de eventos relevantes para activación.

### Herramienta
**`CREATE_TIMELINE v1.0`** ✅ EXISTENTE (reutilizado)

**⚠️ IMPORTANTE:** Este prompt se usa también en RESEARCH y WRITING.
- NO modificamos el prompt base (mantener retrocompatibilidad)
- Usamos **instrucciones contextuales específicas** para activación

### Instrucciones Específicas para Activación

**Al ejecutar CREATE_TIMELINE para workflow de activación, aplicar criterios EXHAUSTIVOS:**

**CRITERIO DE INCLUSIÓN EXPANDIDO:**
- ✅ Incluir TODOS los eventos mencionados en las fuentes
- ✅ NO aplicar límite numérico (ignorar "15-50 eventos" del prompt base)
- ✅ Pregunta clave: **¿Este evento podría ser base para un post?** → Incluir
- ✅ En caso de duda sobre relevancia → Incluir (preferir exhaustividad)
- ✅ Incluir eventos marginales si tienen potencial de activación

**LONGITUD ESPERADA PARA ACTIVACIÓN:**
- Libro individual: 30-100 eventos
- Colección de libros: 100-500 eventos
- Revista/publicación periódica: 200-1,000 eventos (según números)

**Nota:** El resto del proceso de CREATE_TIMELINE se mantiene igual (formato narrativo, estructura temporal, etc.)

### Input

**OBLIGATORIO:**
- ACTIVATION_CONTEXT_[PROYECTO].md (aprobado en CHECKPOINT 0.1)
- LIBRO(S)_COMPLETO.md
- RESEARCH_REPORT(s) (si existen)

**OPCIONAL:**
- Materiales complementarios disponibles

### Instrucción de Ejecución

**Pasos obligatorios:**
1. **GENERAR** contenido completo del TIMELINE (criterios exhaustivos)
2. **CREAR ARCHIVO:** `TIMELINE_[PROYECTO].md`
   - Formato: Markdown (.md)
   - Ubicación: Directorio de trabajo
   - Nombre: Usar nombre del proyecto proporcionado
3. **GUARDAR** el archivo en el sistema de archivos
4. **VERIFICAR** que el archivo existe físicamente antes de continuar

**Sin archivo físico, CHECKPOINT 0.2 no puede ejecutarse.**

### Output

**ARCHIVO OBLIGATORIO:** `TIMELINE_[PROYECTO].md`

**Contenido esperado:**
- 30-1,000 eventos (según tipo de colección)
- Formato: Lista narrativa (NO tabla)
- Descripción por evento: 50-200 palabras
- Ordenado cronológicamente

**Tiempo:** 1-2 horas

---

### ⛔ PUNTO DE PARADA OBLIGATORIO - SUBFASE 0.2

**EL TRABAJO DE SUBFASE 0.2 TERMINA AQUÍ.**

**Instrucciones para el ejecutor:**

**1. Has completado:**
```
✅ Aplicado CREATE_TIMELINE con criterios exhaustivos
✅ Creado archivo TIMELINE_[PROYECTO].md
✅ Archivo existe físicamente en el sistema
```

**2. Debes hacer AHORA:**
```
✅ Presentar archivo al editor usando present_files
✅ Informar estado:
   "TIMELINE generado exitosamente
    Archivo: TIMELINE_[PROYECTO].md
    Eventos generados: [N]

    SUBFASE 0.2 COMPLETA.
    Esperando tu validación para continuar."
```

**3. NO debes hacer:**
```
❌ NO ejecutar SUBFASE 0.3
❌ NO generar CAST
❌ NO continuar automáticamente
❌ NO mencionar próximos pasos
```

**4. ESPERAR validación:**
```
⏸️ El editor debe revisar el archivo
⏸️ El editor debe decidir: ¿Aprobado? o ¿Rechazado?
⏸️ SOLO cuando el editor diga "Aprobado" o "Continuar con SUBFASE 0.3"
   → Entonces proceder a SUBFASE 0.3
```

---

### ⭐ CHECKPOINT 0.2: Validación TIMELINE

**Duración:** 15-30 minutos

**Actor:** Editor

**Actividades:**

**1. Verificar existencia de archivo**
```
[ ] Archivo TIMELINE_[PROYECTO].md existe físicamente
[ ] Archivo se puede abrir correctamente
```

**2. Revisar contenido**
- Leer lista completa de eventos
- ¿Eventos cronológicos son correctos?
- ¿Cantidad es suficiente para activación?

**3. Validar exhaustividad**
- ¿Faltan eventos relevantes obvios?
- Para **libros:** ¿30-100 eventos?
- Para **colecciones:** ¿100-500 eventos?
- Para **revistas:** ¿200-1,000 eventos?

**4. Verificar formato**
- ¿Está en orden cronológico?
- ¿Descripciones son adecuadas (50-200 palabras)?
- ¿Formato es narrativo (no tabla)?

**Decisión:**
```
¿TIMELINE aprobado?
├─ SÍ → Continuar a SUBFASE 0.3
│
└─ NO → Anotar eventos faltantes específicos:
        ├─ Lista de eventos que deben añadirse
        ├─ Períodos temporales subcubiertos
        └─ Regenerar SUBFASE 0.2 con eventos adicionales
```

---

## SUBFASE 0.3: CAST OF CHARACTERS (si no existe)

### Objetivo
Generar catálogo EXHAUSTIVO de actores relevantes para activación.

### Herramienta
**`CREATE_CAST v1.0`** ✅ EXISTENTE (reutilizado)

**⚠️ IMPORTANTE:** Este prompt se usa también en RESEARCH y WRITING.
- NO modificamos el prompt base (mantener retrocompatibilidad)
- Usamos **instrucciones contextuales específicas** para activación

### Instrucciones Específicas para Activación

**Al ejecutar CREATE_CAST para workflow de activación, aplicar criterios EXHAUSTIVOS:**

**CRITERIO DE INCLUSIÓN EXPANDIDO:**
- ✅ Incluir TODOS los actores mencionados en las fuentes
- ✅ NO aplicar límite numérico (ignorar "10-30 perfiles" del prompt base)
- ✅ Pregunta clave: **¿Este actor podría ser tema de un post?** → Incluir
- ✅ Incluir actores marginales si tienen potencial de activación
- ✅ Incluir tanto personas como instituciones/organizaciones

**LONGITUD ESPERADA PARA ACTIVACIÓN:**
- Libro individual: 20-50 perfiles
- Colección de libros: 50-200 perfiles
- Revista/publicación periódica: 100-500 perfiles (autores + mencionados)

**Nota:** El resto del proceso de CREATE_CAST se mantiene igual (formato híbrido narrativo + datos, estructura de perfiles, etc.)

### Input

**OBLIGATORIO:**
- ACTIVATION_CONTEXT_[PROYECTO].md (aprobado en CHECKPOINT 0.1)
- LIBRO(S)_COMPLETO.md
- Bibliografía(s) del libro (si existe)
- RESEARCH_REPORT(s) (si existen)

**OPCIONAL:**
- Materiales complementarios disponibles

### Instrucción de Ejecución

**Pasos obligatorios:**
1. **GENERAR** contenido completo del CAST (criterios exhaustivos)
2. **CREAR ARCHIVO:** `CAST_OF_CHARACTERS_[PROYECTO].md`
   - Formato: Markdown (.md)
   - Ubicación: Directorio de trabajo
   - Nombre: Usar nombre del proyecto proporcionado
3. **GUARDAR** el archivo en el sistema de archivos
4. **VERIFICAR** que el archivo existe físicamente antes de continuar

**Sin archivo físico, CHECKPOINT 0.3 no puede ejecutarse.**

### Output

**ARCHIVO OBLIGATORIO:** `CAST_OF_CHARACTERS_[PROYECTO].md`

**Contenido esperado:**
- 20-500 perfiles (según tipo de colección)
- Formato: Híbrido narrativo + datos estructurados
- Perfil por actor: 200-400 palabras
- Incluye personas e instituciones

**Tiempo:** 1-2 horas

---

### ⛔ PUNTO DE PARADA OBLIGATORIO - SUBFASE 0.3

**EL TRABAJO DE SUBFASE 0.3 TERMINA AQUÍ.**

**Instrucciones para el ejecutor:**

**1. Has completado:**
```
✅ Aplicado CREATE_CAST con criterios exhaustivos
✅ Creado archivo CAST_OF_CHARACTERS_[PROYECTO].md
✅ Archivo existe físicamente en el sistema
```

**2. Debes hacer AHORA:**
```
✅ Presentar archivo al editor usando present_files
✅ Informar estado:
   "CAST generado exitosamente
    Archivo: CAST_OF_CHARACTERS_[PROYECTO].md
    Perfiles generados: [N]

    SUBFASE 0.3 COMPLETA.
    Esperando tu validación para continuar."
```

**3. NO debes hacer:**
```
❌ NO ejecutar SUBFASE 0.4
❌ NO generar EDITOR_PROFILE
❌ NO continuar automáticamente
❌ NO mencionar próximos pasos
```

**4. ESPERAR validación:**
```
⏸️ El editor debe revisar el archivo
⏸️ El editor debe decidir: ¿Aprobado? o ¿Rechazado?
⏸️ SOLO cuando el editor diga "Aprobado" o "Continuar con SUBFASE 0.4"
   → Entonces proceder a SUBFASE 0.4
```

---

### ⭐ CHECKPOINT 0.3: Validación CAST

**Duración:** 15-30 minutos

**Actor:** Editor

**Actividades:**

**1. Verificar existencia de archivo**
```
[ ] Archivo CAST_OF_CHARACTERS_[PROYECTO].md existe físicamente
[ ] Archivo se puede abrir correctamente
```

**2. Revisar contenido**
- Leer lista completa de actores
- ¿Actores clave están bien identificados?
- ¿Cantidad es suficiente para activación?

**3. Validar exhaustividad**
- ¿Faltan actores relevantes obvios?
- Para **libros:** ¿20-50 perfiles?
- Para **colecciones:** ¿50-200 perfiles?
- Para **revistas:** ¿100-500 perfiles?

**4. Verificar calidad de perfiles**
- ¿Perfiles tienen información útil (200-400 palabras)?
- ¿Se distingue entre personas e instituciones?
- ¿Formato es apropiado (híbrido narrativo + datos)?

**Decisión:**
```
¿CAST aprobado?
├─ SÍ → Continuar a SUBFASE 0.4
│
└─ NO → Anotar actores faltantes específicos:
        ├─ Lista de actores que deben añadirse
        ├─ Categorías de actores subcubiertas
        └─ Regenerar SUBFASE 0.3 con actores adicionales
```

---

## SUBFASE 0.4: EDITOR_PROFILE (si no existe)

### Objetivo
Crear perfil editorial que captura voz y estilo del autor o colección.

### Herramienta
**`CREATE_EDITOR_PROFILE v1.0`** ✅ EXISTENTE (reutilizado)

**IMPORTANTE: Solo 2 casos posibles**

```
¿Textos son del mismo autor?
├─ SÍ → CASO 1: Crear EDITOR_PROFILE_[AUTOR].md
└─ NO → CASO 2: Crear EDITOR_PROFILE_[COLECCION].md
```

### CASO 1: Textos de un Único Autor

**Input:**
- LIBRO_COMPLETO.md (obligatorio)
- Otros libros del mismo autor (si disponibles)
- Otros textos del autor: blog posts, artículos, essays (si disponibles)
- Información biográfica del autor (opcional)

**Instrucción:**
> "Crea perfil del AUTOR [NOMBRE] del libro que se está activando. Analiza todos los textos disponibles del autor para extraer su voz distintiva, estilo personal, temas recurrentes y preferencias estilísticas."

**Output:** `EDITOR_PROFILE_[NOMBRE_AUTOR].md`
- Ejemplos: EDITOR_PROFILE_DANIEL_KAHNEMAN.md, EDITOR_PROFILE_YUVAL_NOAH_HARARI.md
- 5,000-12,000 palabras

### CASO 2: Textos de Misma Colección/Editorial

**Input:**
- LIBRO_1.md (autor A) - obligatorio
- LIBRO_2.md (autor B) - obligatorio
- LIBRO_3.md (autor C) - recomendado
- Mínimo 2 libros, ideal 3-5
- Guía de estilo de la editorial (si existe)
- Información sobre la colección

**Instrucción:**
> "Crea perfil de la COLECCIÓN EDITORIAL [NOMBRE] (NO de autores individuales). Analiza múltiples libros de la colección para identificar características COMUNES que definen el estilo editorial. Ignora idiosincrasias de autores individuales."

**Output:** `EDITOR_PROFILE_[NOMBRE_COLECCION].md`
- Ejemplos: EDITOR_PROFILE_OXFORD_VSI.md, EDITOR_PROFILE_MIT_PRESS_EK.md
- 5,000-12,000 palabras

### Instrucción de Ejecución

**Pasos obligatorios:**
1. **GENERAR** contenido completo del EDITOR_PROFILE
2. **CREAR ARCHIVO:** `EDITOR_PROFILE_[...].md`
   - Formato: Markdown (.md)
   - Ubicación: Directorio de trabajo
   - Nombre: EDITOR_PROFILE_[AUTOR].md o EDITOR_PROFILE_[COLECCION].md
3. **GUARDAR** el archivo en el sistema de archivos
4. **VERIFICAR** que el archivo existe físicamente antes de continuar

**Sin archivo físico, CHECKPOINT 0.4 no puede ejecutarse.**

**Tiempo:** 2-4 horas

---

### ⛔ PUNTO DE PARADA OBLIGATORIO - SUBFASE 0.4

**EL TRABAJO DE SUBFASE 0.4 TERMINA AQUÍ.**

**Instrucciones para el ejecutor:**

**1. Has completado:**
```
✅ Determinado caso (1: autor / 2: colección)
✅ Aplicado CREATE_EDITOR_PROFILE v1.0
✅ Creado archivo EDITOR_PROFILE_[...].md
✅ Archivo existe físicamente en el sistema
```

**2. Debes hacer AHORA:**
```
✅ Presentar archivo al editor usando present_files
✅ Informar estado:
   "EDITOR_PROFILE generado exitosamente
    Archivo: EDITOR_PROFILE_[...].md
    Caso ejecutado: [1 o 2]

    SUBFASE 0.4 COMPLETA.
    Esperando tu validación para continuar."
```

**3. NO debes hacer:**
```
❌ NO ejecutar SUBFASE 0.5
❌ NO seleccionar PERFIL_ACTIVO
❌ NO continuar automáticamente
❌ NO mencionar próximos pasos
```

**4. ESPERAR validación:**
```
⏸️ El editor debe revisar el archivo
⏸️ El editor debe decidir: ¿Aprobado? o ¿Rechazado?
⏸️ SOLO cuando el editor diga "Aprobado" o "Continuar con SUBFASE 0.5"
   → Entonces proceder a SUBFASE 0.5
```

---

### ⭐ CHECKPOINT 0.4: Validación EDITOR_PROFILE

**Duración:** 30-45 minutos

**Actor:** Editor

**Actividades:**

**1. Verificar existencia de archivo**
```
[ ] Archivo EDITOR_PROFILE_[...].md existe físicamente
[ ] Archivo se puede abrir correctamente
[ ] Tamaño apropiado (≥5,000 palabras)
```

**2. Revisar contenido**
- Leer perfil completo
- ¿Voz capturada es correcta?
- ¿Estilo refleja al autor/colección?

**3. Validar según caso**

**Si CASO 1 (autor individual):**
- ¿Voz personal del autor está bien capturada?
- ¿Temas recurrentes identificados son correctos?
- ¿Preferencias estilísticas son precisas?

**Si CASO 2 (colección editorial):**
- ¿Características COMUNES están identificadas?
- ¿Se ignoraron idiosincrasias de autores individuales?
- ¿Estilo editorial es coherente?

**Decisión:**
```
¿EDITOR_PROFILE aprobado?
├─ SÍ → Continuar a SUBFASE 0.5
│
└─ NO → Anotar problemas específicos:
        ├─ ¿Qué aspectos de voz no son correctos?
        ├─ ¿Qué elementos de estilo faltan?
        └─ Regenerar SUBFASE 0.4 con feedback
```

---

## SUBFASE 0.5: SELECCIÓN PERFIL ACTIVO

### Objetivo
Definir cuál perfil editorial se usará para generar todos los posts de la campaña.

### Actor
Editor (o automático si solo hay 1 perfil)

### Regla Fundamental
**UN SOLO perfil activo para la campaña de activación.**

### Lógica de Selección

```
¿Cuántos EDITOR_PROFILE disponibles después de SUBFASE 0.4?
├─ SOLO 1 → Usar automáticamente (no preguntar)
└─ MÚLTIPLES → Preguntar al editor
```

### Si SOLO 1 perfil disponible

**Decisión automática:**
- Usar ese perfil sin preguntarle al editor
- Documentar decisión
- Continuar a CHECKPOINT 0.5

### Si MÚLTIPLES perfiles disponibles

**Escenarios típicos:**
```
Escenario B1: Libro Tinta Artificial
├─ EDITOR_PROFILE_[AUTOR_LIBRO].md
└─ ESTILO_EDITORIAL_TINTA_ARTIFICIAL.md

Escenario B2: Libro de colección + Curator
├─ EDITOR_PROFILE_[COLECCION].md
└─ ESTILO_EDITORIAL_TINTA_ARTIFICIAL.md

Escenario B3: Varios libros
├─ EDITOR_PROFILE_AUTOR.md
└─ EDITOR_PROFILE_COLECCION.md
```

**Preguntar al editor:**

```
═══════════════════════════════════════════════════════════
SELECCIÓN DE ESTILO PARA PRODUCCIÓN DE CONTENIDO
═══════════════════════════════════════════════════════════

Perfiles disponibles:
[ ] EDITOR_PROFILE_[...].md
[ ] EDITOR_PROFILE_[...].md

¿Qué perfil usar para generar posts/artículos?

OPCIÓN A: Usar un solo perfil
├─ A1: EDITOR_PROFILE_[...].md
│     └─ Todos los posts con esta voz
│
└─ A2: EDITOR_PROFILE_[...].md
      └─ Todos los posts con esta voz

OPCIÓN B: Combinar perfiles
├─ Crear perfil híbrido combinando ambos
├─ Ejemplo: "70% Perfil A + 30% Perfil B"
└─ Tiempo adicional: 1-2 horas

═══════════════════════════════════════════════════════════
Selección: [A1 / A2 / B]

Si B (Combinar):
└─ Describir combinación deseada: [________]

═══════════════════════════════════════════════════════════
```

**Prioridad por defecto si usuario no especifica:**
> Mantener voz original (autor o colección) > voz curator

### Documentar Decisión

**Crear documento:** `PERFIL_ACTIVO_SELECCION_[PROYECTO].md`

```markdown
# DECISIÓN DE PERFIL - PROYECTO ACTIVACIÓN [NOMBRE]

Fecha: [Fecha]

Perfiles disponibles:
- [ ] EDITOR_PROFILE_[...].md
- [ ] EDITOR_PROFILE_[...].md

Decisión: [A: Único / B: Híbrido]

Perfil activo: [NOMBRE_ARCHIVO].md
Razón: [Por qué se eligió]

Validado por: [Editor]
```

---

### ⛔ PUNTO DE PARADA OBLIGATORIO - SUBFASE 0.5

**EL TRABAJO DE SUBFASE 0.5 TERMINA AQUÍ.**

**Instrucciones para el ejecutor:**

**1. Has completado:**
```
✅ Contado perfiles disponibles
✅ Aplicado lógica de selección (automática o preguntado al editor)
✅ Documentado decisión en PERFIL_ACTIVO_SELECCION_[PROYECTO].md
✅ Archivo existe físicamente en el sistema
```

**2. Debes hacer AHORA:**
```
✅ Presentar archivo al editor usando present_files (si creado)
✅ Informar estado:
   "PERFIL_ACTIVO seleccionado exitosamente
    Perfil activo: [NOMBRE]

    SUBFASE 0.5 COMPLETA.
    Esperando tu confirmación para continuar."
```

**3. NO debes hacer:**
```
❌ NO ejecutar CHECKPOINT FINAL 0
❌ NO continuar automáticamente
❌ NO mencionar próximos pasos
```

**4. ESPERAR confirmación:**
```
⏸️ El editor debe revisar la selección
⏸️ El editor debe decidir: ¿Confirmado? o ¿Cambiar?
⏸️ SOLO cuando el editor diga "Confirmado" o "Ejecuta CHECKPOINT FINAL 0"
   → Entonces proceder a CHECKPOINT FINAL 0
```

---

### ⭐ CHECKPOINT 0.5: Confirmar PERFIL_ACTIVO

**Duración:** 5-15 minutos

**Actor:** Editor

**Actividades:**

**1. Verificar selección**
```
[ ] Decisión de perfil está clara
[ ] PERFIL_ACTIVO identificado
[ ] Documento PERFIL_ACTIVO_SELECCION_[PROYECTO].md creado
```

**2. Validar coherencia**
- ¿Es el perfil correcto para la campaña?
- ¿Refleja la voz deseada?
- Si es híbrido: ¿Combinación tiene sentido?

**Decisión:**
```
¿PERFIL_ACTIVO confirmado?
├─ SÍ → Continuar a CHECKPOINT FINAL 0
│
└─ NO → Revisar selección:
        ├─ Elegir perfil diferente
        └─ Volver a SUBFASE 0.5
```

---

## ✅ CHECKPOINT FINAL 0: VERIFICACIÓN GLOBAL FASE 0

**Duración:** 15-30 minutos

**Actor:** Editor

**Objetivo:** Verificación completa de que FASE 0 está lista para continuar.

### Checklist Global

**FUENTES MÍNIMAS ABSOLUTAS:**
```
[ ] LIBRO_COMPLETO.md (o equivalente) - ≥15,000 palabras
[ ] OBJETIVOS_ACTIVACION.md
    ├─ Objetivo principal: ✅
    ├─ Audiencia objetivo: ✅
    ├─ Timeline: ✅
    └─ Plataformas: ✅
```

**MATERIALES DE INVESTIGACIÓN:**
```
[ ] ACTIVATION_CONTEXT_[PROYECTO].md
    Estado: [GENERADO Y VALIDADO EN CHECKPOINT 0.1]
    Archivo existe físicamente: ✅
    Input usado: [LIBRO + RR / LIBRO SOLO]
    Palabras: _______
    Temas identificados: _______

[ ] RESEARCH_REPORT(s) (si existen)
    Estado: [EXISTE / NO EXISTE]
    Si existe: [Usado como input enriquecedor]
```

**COMPONENTES ESTRUCTURALES:**
```
[ ] TIMELINE_[PROYECTO].md
    Estado: [GENERADO Y VALIDADO EN CHECKPOINT 0.2]
    Archivo existe físicamente: ✅
    Eventos: _______

[ ] CAST_OF_CHARACTERS_[PROYECTO].md
    Estado: [GENERADO Y VALIDADO EN CHECKPOINT 0.3]
    Archivo existe físicamente: ✅
    Perfiles: _______
```

**ESTILO Y VOZ:**
```
[ ] EDITOR_PROFILE del AUTOR/COLECCIÓN
    Tipo: [CASO 1: Autor / CASO 2: Colección]
    Estado: [GENERADO Y VALIDADO EN CHECKPOINT 0.4]
    Archivo existe físicamente: ✅
    Archivo: EDITOR_PROFILE_[...].md

[ ] SELECCIÓN DE PERFIL ACTIVO
    Estado: [CONFIRMADO EN CHECKPOINT 0.5]
    Perfiles disponibles: _____ (cantidad)
    Decisión: [Automática: 1 / Preguntado: múltiples]
    Opción: [A: Único / B: Híbrido]
    Perfil activo: _______________________________
    Documento PERFIL_ACTIVO_SELECCION: ✅
```

**RESUMEN:**
```
Fuentes originales: ____ / 6
Fuentes generadas: ____ / 6
Subfases ejecutadas: 5 / 5
Checkpoints aprobados: 5 / 5
Tiempo invertido FASE 0: ____ horas

ESTADO: [✅ READY / ⚠️ READY CON LIMITACIONES / ❌ NOT READY]
```

### Decisión Final

```
¿FASE 0 completa y aprobada?
├─ ✅ SÍ → FASE 0 COMPLETA
│         └─ Continuar a FASE 1
│
└─ ❌ NO → Identificar subfase problemática:
          └─ Volver a SUBFASE correspondiente (0.1, 0.2, 0.3, 0.4, o 0.5)
```

---

## Escenarios de Tiempo FASE 0

### ESCENARIO A: Libro Tinta Artificial (óptimo)

```
Fuentes existentes:
✅ LIBRO_COMPLETO.md
✅ RESEARCH_REPORT(s)
✅ TIMELINE
✅ CAST
✅ EDITOR_PROFILE

Acciones FASE 0:
├─ SUBFASE 0.1: ANALYZE_COLLECTION v1.4 con RR enriquecido (1-2h)
│   └─ CHECKPOINT 0.1: Validar (30-45 min)
├─ SUBFASE 0.2: Validar TIMELINE existente (15 min)
│   └─ CHECKPOINT 0.2: Aprobar (15 min)
├─ SUBFASE 0.3: Validar CAST existente (15 min)
│   └─ CHECKPOINT 0.3: Aprobar (15 min)
├─ SUBFASE 0.4: Validar EDITOR_PROFILE existente (15 min)
│   └─ CHECKPOINT 0.4: Aprobar (15 min)
├─ SUBFASE 0.5: Seleccionar PERFIL_ACTIVO (15-30 min)
│   └─ CHECKPOINT 0.5: Confirmar (5 min)
└─ CHECKPOINT FINAL 0: Verificación global (15-30 min)

Tiempo total: 2-3.5 horas
```

### ESCENARIO B: Libro Externo - Solo PDF (mínimo)

```
Fuentes existentes:
✅ LIBRO_COMPLETO.pdf

Acciones FASE 0:
├─ Convertir PDF a markdown (30 min)
├─ Crear OBJETIVOS_ACTIVACION.md (30 min)
├─ SUBFASE 0.1: ANALYZE_COLLECTION v1.4 desde libro (1-2h)
│   └─ CHECKPOINT 0.1: Validar (30-45 min)
├─ SUBFASE 0.2: CREATE_TIMELINE v1.0 exhaustivo (1-2h)
│   └─ CHECKPOINT 0.2: Validar (15-30 min)
├─ SUBFASE 0.3: CREATE_CAST v1.0 exhaustivo (1-2h)
│   └─ CHECKPOINT 0.3: Validar (15-30 min)
├─ SUBFASE 0.4: CREATE_EDITOR_PROFILE v1.0 - CASO 1 (2-4h)
│   └─ CHECKPOINT 0.4: Validar (30-45 min)
├─ SUBFASE 0.5: Seleccionar PERFIL_ACTIVO (automático) (0 min)
│   └─ CHECKPOINT 0.5: Confirmar (5 min)
└─ CHECKPOINT FINAL 0: Verificación global (15-30 min)

Tiempo total: 6-12 horas
```

### ESCENARIO C: Libro Externo - Con Algunos Materiales

```
Fuentes existentes:
✅ LIBRO_COMPLETO.md
✅ Working papers del autor
⚠️ TIMELINE parcial

Acciones FASE 0:
├─ Crear OBJETIVOS_ACTIVACION.md (30 min)
├─ SUBFASE 0.1: ANALYZE_COLLECTION v1.4 desde libro + papers (1-2h)
│   └─ CHECKPOINT 0.1: Validar (30-45 min)
├─ SUBFASE 0.2: Validar y completar TIMELINE parcial (30 min-1h)
│   └─ CHECKPOINT 0.2: Validar (15-30 min)
├─ SUBFASE 0.3: CREATE_CAST v1.0 exhaustivo (1-2h)
│   └─ CHECKPOINT 0.3: Validar (15-30 min)
├─ SUBFASE 0.4: CREATE_EDITOR_PROFILE v1.0 - CASO 1 (2-4h)
│   └─ CHECKPOINT 0.4: Validar (30-45 min)
├─ SUBFASE 0.5: Seleccionar PERFIL_ACTIVO (automático) (0 min)
│   └─ CHECKPOINT 0.5: Confirmar (5 min)
└─ CHECKPOINT FINAL 0: Verificación global (15-30 min)

Tiempo total: 5-9 horas
```

### ESCENARIO D: Múltiples Libros Colección Editorial

```
Fuentes existentes:
✅ LIBRO_1.md, LIBRO_2.md, LIBRO_3.md

Acciones FASE 0:
├─ Crear OBJETIVOS_ACTIVACION.md (30 min)
├─ SUBFASE 0.1: ANALYZE_COLLECTION v1.4 múltiples libros (3-4h)
│   └─ CHECKPOINT 0.1: Validar (45-60 min)
├─ SUBFASE 0.2: CREATE_TIMELINE v1.0 exhaustivo síntesis (2-3h)
│   └─ CHECKPOINT 0.2: Validar (20-40 min)
├─ SUBFASE 0.3: CREATE_CAST v1.0 exhaustivo síntesis (2-3h)
│   └─ CHECKPOINT 0.3: Validar (20-40 min)
├─ SUBFASE 0.4: CREATE_EDITOR_PROFILE v1.0 - CASO 2 (3-4h)
│   └─ CHECKPOINT 0.4: Validar (30-45 min)
├─ SUBFASE 0.5: Seleccionar PERFIL_ACTIVO (pregunta) (15-30 min)
│   └─ CHECKPOINT 0.5: Confirmar (5-15 min)
└─ CHECKPOINT FINAL 0: Verificación global (20-30 min)

Tiempo total: 10-17 horas
```

### ESCENARIO E: Revista/Publicación Periódica

```
Fuentes existentes:
✅ REVISTA_ABACO_NUMS_1-120.md

Acciones FASE 0:
├─ Crear OBJETIVOS_ACTIVACION.md (30 min)
├─ SUBFASE 0.1: ANALYZE_COLLECTION v1.4 (revista, doble perspectiva) (4-6h)
│   └─ CHECKPOINT 0.1: Validar (60-90 min)
├─ SUBFASE 0.2: CREATE_TIMELINE v1.0 exhaustivo (200-1000 eventos) (3-5h)
│   └─ CHECKPOINT 0.2: Validar (30-60 min)
├─ SUBFASE 0.3: CREATE_CAST v1.0 exhaustivo (100-500 perfiles) (3-5h)
│   └─ CHECKPOINT 0.3: Validar (30-60 min)
├─ SUBFASE 0.4: CREATE_EDITOR_PROFILE v1.0 - CASO 2 (revista) (3-4h)
│   └─ CHECKPOINT 0.4: Validar (30-45 min)
├─ SUBFASE 0.5: Seleccionar PERFIL_ACTIVO (automático) (0 min)
│   └─ CHECKPOINT 0.5: Confirmar (5 min)
└─ CHECKPOINT FINAL 0: Verificación global (20-30 min)

Tiempo total: 13-21 horas
```

---

**FIN DE FASE 0 - WORKFLOW ACTIVATION v1.5**

---

## FASE 1: ANÁLISIS PARA ACTIVACIÓN

### Objetivo
Identificar temas del libro(s) con mayor potencial de activación y generar lista priorizada.

### Actor
IA analiza, Editor selecciona

### Duración Estimada
- IA: 2-3 horas
- Editor: 1-2 horas
- **Total: 3-5 horas**

### Herramienta
**`ANALYZE_BOOK_FOR_ACTIVATION v1.0`** [PENDIENTE DISEÑO]

---

### Input

```
OBLIGATORIOS:
├─ ACTIVATION_CONTEXT_[PROYECTO].md (generado en FASE 0)
├─ LIBRO_COMPLETO.md (o múltiples si colección)
├─ OBJETIVOS_ACTIVACION.md
├─ TIMELINE_[PROYECTO].md
└─ CAST_OF_CHARACTERS_[PROYECTO].md

OPCIONALES:
├─ PERFIL_ACTIVO (para considerar estilo en evaluación)
└─ RESEARCH_REPORT(s) (si existen, para contexto adicional)
```

---

### Proceso

**PASO 1.1: Análisis de Potencial por Tema**

Para cada tema identificado en ACTIVATION_CONTEXT, evaluar:

**1. Engagement Potencial (score 1-10)**
- ¿Provoca curiosidad?
- ¿Tiene gancho emocional?
- ¿Es contraintuitivo?
- ¿Tiene relevancia actual?

**2. Complejidad (nivel: accesible / medio / técnico)**
- ¿Requiere conocimientos previos?
- ¿Se puede explicar en 800-2,000 palabras?
- ¿Necesita múltiples posts?

**3. Controversialidad (nivel: alta / media / baja)**
- ¿Provoca debate?
- ¿Hay posiciones opuestas?
- ¿Es tema sensible?

**4. Aplicabilidad (nivel: alta / media / baja)**
- ¿Tiene valor práctico?
- ¿Se puede aplicar inmediatamente?
- ¿Ofrece frameworks/herramientas?

**5. Novedad (nivel: alta / media / baja)**
- ¿Perspectiva fresca?
- ¿Ángulo no obvio?
- ¿Diferente a contenido existente?

**Score total:** Suma ponderada de los 5 criterios (máximo 10)

---

**PASO 1.2: Generación de Ángulos**

Para cada tema con score ≥ 5, proponer:

**1. Ángulo principal**
- ¿Desde qué perspectiva abordar?
- Ejemplos: Histórico / Práctico / Crítico / Comparativo / Provocativo

**2. Hook propuesto**
- Primera oración del post
- Debe capturar atención inmediatamente

**3. Tipo de contenido sugerido**
- Post corto (600-800 palabras)
- Post medio (1,000-1,500 palabras)
- Artículo largo (1,500-3,000 palabras)
- Thread (8-15 tweets)
- Serie (2-4 posts relacionados)

**4. Plataforma ideal**
- LinkedIn (profesional, casos de uso)
- Substack (profundidad, análisis)
- Twitter/X (debates, controversias)
- Medium (narrativa, storytelling)

**5. CTA (Call to Action) sugerido**
- Leer el libro
- Comentar opinión
- Compartir experiencia
- Aplicar framework

---

**PASO 1.3: Organización por Clusters**

Agrupar temas relacionados en **clusters temáticos**:

**Beneficios de clustering:**
- Permite series de posts relacionados
- Facilita secuenciación narrativa
- Crea momentum en audiencia

**Ejemplo de clusters:**
```
CLUSTER 1: "Fundamentos del Tema X"
├─ Tema 1.1: Historia del concepto
├─ Tema 1.2: Definición y alcance
└─ Tema 1.3: Por qué importa hoy

CLUSTER 2: "Aplicaciones Prácticas"
├─ Tema 2.1: Caso de uso en industria A
├─ Tema 2.2: Caso de uso en industria B
└─ Tema 2.3: Framework para implementar

CLUSTER 3: "Debates y Controversias"
├─ Tema 3.1: Críticas comunes
├─ Tema 3.2: Posiciones alternativas
└─ Tema 3.3: Síntesis y posición del autor
```

---

### Output

**`TEMAS_ACTIVABLES_[PROYECTO].md`**

**Estructura:**

```markdown
# TEMAS ACTIVABLES: [Nombre del Proyecto]

**Fecha de análisis:** [Fecha]
**Generado por:** ANALYZE_BOOK_FOR_ACTIVATION v1.0
**Libro(s) analizados:** [Lista]

---

## RESUMEN EJECUTIVO

**Total de temas identificados:** [N]
**Temas con score ≥ 7 (alta prioridad):** [N]
**Temas con score 5-6 (media prioridad):** [N]
**Clusters temáticos:** [N]

**Formatos recomendados:**
- Posts cortos: [N]
- Posts medianos: [N]
- Artículos largos: [N]
- Threads: [N]
- Series: [N]

**Plataformas ideales:**
- LinkedIn: [N] temas
- Substack: [N] temas
- Twitter/X: [N] temas
- Medium: [N] temas

---

## TEMAS DE ALTA PRIORIDAD (Score ≥ 7)

### TEMA 1: [Título del Tema]

**Score total:** [X/10]
- Engagement: [X/10]
- Complejidad: [Accesible / Medio / Técnico]
- Controversialidad: [Alta / Media / Baja]
- Aplicabilidad: [Alta / Media / Baja]
- Novedad: [Alta / Media / Baja]

**Ángulo propuesto:** [Descripción del ángulo]

**Hook sugerido:** "[Primera oración del post]"

**Tipo de contenido:** [Post corto / Post medio / Artículo / Thread / Serie]

**Extensión sugerida:** [X palabras] o [X tweets]

**Plataforma ideal:** [LinkedIn / Substack / Twitter / Medium]

**CTA sugerido:** [Call to action]

**Cluster temático:** [Nombre del cluster si aplica]

**Fuentes clave (del libro):**
- Capítulo X: [Referencia]
- Sección Y: [Referencia]
- Debate Z: [Referencia]

**Notas adicionales:** [Consideraciones especiales]

---

[Repetir estructura para cada tema de alta prioridad]

---

## TEMAS DE MEDIA PRIORIDAD (Score 5-6)

[Misma estructura pero más concisa]

---

## CLUSTERS TEMÁTICOS

### CLUSTER 1: [Nombre del Cluster]

**Descripción:** [Qué une a estos temas]

**Temas incluidos:**
1. Tema X: [Título]
2. Tema Y: [Título]
3. Tema Z: [Título]

**Secuenciación sugerida:**
- Publicar primero: Tema X (introducción)
- Seguir con: Tema Y (profundización)
- Cerrar con: Tema Z (aplicación)

**Timeline sugerido:** [Semana 1, 2, 3]

---

## OPORTUNIDADES ESPECIALES

### SERIE PROPUESTA 1: [Título de la Serie]

**Concepto:** [Descripción de la serie]

**Posts en la serie:**
1. [Título Post 1] - [Extensión]
2. [Título Post 2] - [Extensión]
3. [Título Post 3] - [Extensión]

**Frecuencia sugerida:** [Semanal / Quincenal]

**Plataforma:** [Plataforma ideal]

---

## RECOMENDACIONES ESTRATÉGICAS

**Temas para lanzamiento inicial (primeras 2 semanas):**
1. [Tema X] - Alta accesibilidad, engagement garantizado
2. [Tema Y] - Controversial, genera debate
3. [Tema Z] - Práctico, valor inmediato

**Temas para fase de consolidación (semanas 3-8):**
[Lista]

**Temas para cierre de campaña (últimas semanas):**
[Lista]

**Temas a evitar o posponer:**
[Lista con razones]

---

**FIN DEL DOCUMENTO**
```

---

### Métricas de Calidad

**Un buen análisis debe tener:**

```
[ ] 20-40 temas identificados
[ ] Al menos 10 temas con score ≥ 7
[ ] 3-6 clusters temáticos definidos
[ ] Diversidad de formatos (no solo un tipo)
[ ] Diversidad de plataformas
[ ] Al menos 2 series propuestas
[ ] Hooks específicos (no genéricos)
[ ] CTAs claros por tema
[ ] Secuenciación estratégica
```

---

### CHECKPOINT 2: SELECCIÓN DE TEMAS

**Duración:** 1-2 horas

**Actor:** Editor

**Actividades:**

1. **Revisar lista completa de temas activables**
   - Leer scores y justificaciones
   - Validar que análisis es correcto
   - Identificar temas omitidos

2. **Seleccionar temas prioritarios**
   - Marcar 10-30 temas para producir
   - Pueden ser de alta o media prioridad
   - Pueden añadir temas no sugeridos

3. **Ajustar ángulos si necesario**
   - Modificar hooks propuestos
   - Cambiar plataforma sugerida
   - Ajustar extensión/formato

4. **Aprobar clusters temáticos**
   - Validar agrupaciones
   - Modificar secuencias si necesario
   - Aprobar series propuestas

**Decisión:**
```
Temas seleccionados: [N] temas
├─ Alta prioridad: [N]
├─ Media prioridad: [N]
└─ Añadidos por editor: [N]

¿Selección completa y aprobada?
├─ SÍ → Continuar a FASE 2
└─ NO → Ajustar selección
```

---

## FASE 2: ESTRATEGIA DE CONTENIDO

### Objetivo
Diseñar estrategia completa de contenido con calendario, secuenciación y métricas.

### Actor
IA propone, Editor ajusta y aprueba

### Duración Estimada
- IA: 1-2 horas
- Editor: 1 hora
- **Total: 2-3 horas**

### Herramienta
**`CREATE_CONTENT_STRATEGY v1.0`** [PENDIENTE DISEÑO]

---

### Input

```
OBLIGATORIOS:
├─ TEMAS_SELECCIONADOS (del CHECKPOINT 2)
├─ OBJETIVOS_ACTIVACION.md
└─ PERFIL_ACTIVO

OPCIONALES:
├─ TEMAS_ACTIVABLES_[PROYECTO].md (completo, para referencia)
├─ ACTIVATION_CONTEXT (para consulta)
└─ Restricciones de calendario del editor
```

---

### Proceso

**PASO 2.1: Diseño de Calendario Editorial**

**Inputs del calendario:**
- Duración de campaña (de OBJETIVOS_ACTIVACION)
- Frecuencia de publicación (de OBJETIVOS_ACTIVACION)
- Cantidad objetivo (de OBJETIVOS_ACTIVACION)

**Output del calendario:**
```
Semana 1: [Temas X, Y]
Semana 2: [Temas Z, W]
...
Semana N: [Tema final]
```

**Principios de secuenciación:**
1. Empezar con temas de alta accesibilidad (enganchar audiencia)
2. Intercalar profundidad con ligereza
3. Agrupar temas relacionados (clusters) en semanas consecutivas
4. Reservar temas controversiales para fase de consolidación
5. Cerrar con temas de alto valor/síntesis

---

**PASO 2.2: Mix de Formatos**

**Distribución recomendada:**
- 40-50%: Posts medianos (1,000-1,500 palabras)
- 20-30%: Posts cortos (600-800 palabras)
- 15-25%: Artículos largos (1,500-3,000 palabras)
- 10-15%: Threads (8-15 tweets)

**Evitar:**
- Más de 3 artículos largos seguidos (fatiga de lectura)
- Más de 2 threads seguidos (plataforma específica)
- Monotonía de formato

---

**PASO 2.3: Distribución por Plataforma**

**Según plataformas prioritarias en OBJETIVOS_ACTIVACION:**

```
Si Substack es prioritaria:
├─ 50% contenido publicar ahí primero
├─ Resto en cross-posting adaptado

Si LinkedIn + Twitter son prioritarias:
├─ 40% LinkedIn (posts medianos)
├─ 30% Twitter (threads + promoción)
├─ 30% otras plataformas
```

**Estrategia de cross-posting:**
- Post completo en plataforma principal
- Versión adaptada en plataformas secundarias
- Promoción/teaser en redes sociales

---

**PASO 2.4: KPIs por Pieza**

**Definir métricas de éxito para cada pieza:**

**Engagement esperado:**
- Post corto: X reads, Y likes, Z shares
- Post mediano: X reads, Y likes, Z comments
- Artículo largo: X reads, Y bookmarks
- Thread: X impressions, Y retweets

**Conversión esperada:**
- % que lee el libro después
- % que suscribe a newsletter
- % que comparte con su red

---

### Output

**`CONTENT_STRATEGY_[PROYECTO].md`**

**Estructura:**

```markdown
# CONTENT STRATEGY: [Nombre del Proyecto]

**Fecha:** [Fecha]
**Generado por:** CREATE_CONTENT_STRATEGY v1.0
**Duración de campaña:** [X semanas/meses]
**Frecuencia:** [Publicaciones por semana]
**Total de piezas:** [N]

---

## RESUMEN EJECUTIVO

**Objetivo principal:** [Del OBJETIVOS_ACTIVACION]
**Audiencia:** [Del OBJETIVOS_ACTIVACION]
**Plataformas:** [Lista en orden de prioridad]

**Mix de formatos:**
- Posts cortos (600-800): [N] ([%])
- Posts medianos (1,000-1,500): [N] ([%])
- Artículos largos (1,500-3,000): [N] ([%])
- Threads (8-15 tweets): [N] ([%])

**Clusters temáticos activados:** [N]
**Series planificadas:** [N]

---

## CALENDARIO EDITORIAL

### SEMANA 1: [Fecha inicio] - [Fecha fin]

**Tema:** Lanzamiento y Enganche

**Publicaciones:**

**1. [Título del Post 1]**
- Tema: [Nombre del tema]
- Formato: [Post medio]
- Extensión: [1,200 palabras]
- Plataforma: [LinkedIn]
- Día sugerido: [Lunes]
- Objetivo: [Enganchar audiencia nueva]
- KPI: [500 reads, 50 likes, 20 shares]

[Repetir para cada semana]

---

## CLUSTERS TEMÁTICOS (Secuenciación)

### CLUSTER 1: [Nombre]

**Semanas:** [X-Y]

**Posts en el cluster:**
1. Semana X: [Título] - Introducción al cluster
2. Semana X+1: [Título] - Profundización
3. Semana X+2: [Título] - Aplicación práctica

**Narrativa del cluster:** [Cómo se conectan los posts]

---

## SERIES PLANIFICADAS

### SERIE 1: [Título de la Serie]

**Semanas:** [X-Y]

**Posts:**
1. [Título Parte 1] - Semana X - [Plataforma]
2. [Título Parte 2] - Semana X+1 - [Plataforma]
3. [Título Parte 3] - Semana X+2 - [Plataforma]

**Estrategia de serie:**
- Publicar en días fijos (ej: todos los miércoles)
- Referenciar partes anteriores
- Crear expectativa para siguiente parte

---

## DISTRIBUCIÓN POR PLATAFORMA

### SUBSTACK (50% del contenido)

**Piezas asignadas:** [N]

**Estrategia:**
- Publicación principal en Substack
- Newsletter a suscriptores
- Cross-posting adaptado en otras plataformas

---

## MÉTRICAS Y KPIS

### KPIs por Tipo de Contenido

| Formato | Reads | Likes | Shares | Comments |
|---------|-------|-------|--------|----------|
| Post corto | 300-500 | 30-50 | 10-20 | 5-10 |
| Post medio | 500-800 | 50-80 | 20-40 | 10-20 |
| Artículo largo | 300-600 | 40-70 | 15-30 | 15-30 |
| Thread | 2K-5K imp | 50-100 | 20-50 | 10-20 |

---

## CONTINGENCIAS

### Si engagement es bajo
- Aumentar frecuencia de posts cortos
- Experimentar con formatos diferentes
- Ajustar temas según feedback

### Si engagement es alto
- Acelerar calendario (publicar más frecuentemente)
- Expandir temas exitosos en series
- Crear contenido adicional (bonus)

---

**FIN DE LA ESTRATEGIA**
```

---

### Métricas de Calidad

**Una buena estrategia debe tener:**

```
[ ] Calendario completo (todas las semanas cubiertas)
[ ] Mix balanceado de formatos (no > 60% de un tipo)
[ ] Secuenciación lógica (clusters agrupados)
[ ] KPIs realistas por pieza
[ ] Estrategia de promoción clara
[ ] Plan de contingencia
[ ] Total de piezas alineado con OBJETIVOS_ACTIVACION
```

---

### CHECKPOINT 3: APROBACIÓN DE ESTRATEGIA

**Duración:** 30-60 minutos

**Actor:** Editor

**Actividades:**

1. **Revisar calendario completo**
   - ¿Secuenciación tiene sentido?
   - ¿Frecuencia es sostenible?
   - ¿Fecha de inicio es realista?

2. **Validar mix de formatos**
   - ¿Distribución es apropiada?
   - ¿Hay suficiente variedad?

3. **Aprobar distribución por plataforma**
   - ¿Alineado con prioridades?
   - ¿Aprovecha fortalezas de cada plataforma?

4. **Validar KPIs**
   - ¿Son realistas?
   - ¿Son medibles?

**Decisión:**
```
¿Estrategia aprobada?
├─ SÍ → Continuar a FASE 3
└─ NO → Solicitar ajustes específicos
   └─ Ajustar y re-presentar
   └─ Re-evaluar en CHECKPOINT 3
```

---

## FASE 3: PLAN DE POSTS

### Objetivo
Crear plan detallado (outline) para cada pieza de contenido a producir.

### Actor
IA planifica, Editor revisa y ajusta

### Duración Estimada
- IA: 2-4 horas (total para todas las piezas)
- Editor: 1-2 horas (revisión)
- **Total: 3-6 horas**

### Herramienta
**`DESIGN_POST_PLAN v1.0`** [PENDIENTE DISEÑO]

---

### Input

```
OBLIGATORIOS:
├─ CONTENT_STRATEGY_[PROYECTO].md (aprobada)
├─ ACTIVATION_CONTEXT_[PROYECTO].md
├─ LIBRO_COMPLETO.md
└─ PERFIL_ACTIVO

OPCIONALES:
├─ TEMAS_ACTIVABLES (para referencia completa)
└─ RESEARCH_REPORT(s) (si existen, para contexto adicional)
```

---

### Proceso

**Iteración: Para cada pieza N = 1 hasta 15-30**

**PASO 3.1: Generación de Títulos**

Por cada pieza, generar 3 opciones de título:

**Opción A: Directo** — claro y descriptivo
**Opción B: Intrigante** — genera curiosidad sin revelar todo
**Opción C: Provocativo** — desafía creencia común

---

**PASO 3.2: Diseño de Hook/Opening**

Primeros 2-3 párrafos del post. Tipos:
- **Anécdota:** Historia corta relacionada
- **Estadística sorprendente:** Dato contraintuitivo
- **Pregunta provocativa:** Pregunta que hace pensar
- **Escenario:** "Imagina que..."
- **Declaración audaz:** Claim fuerte que se desarrollará

---

**PASO 3.3: Estructura/Outline**

Diseñar estructura de 3-5 secciones:
- Sección 1: Introducción/Hook
- Sección 2: Contexto/Background (150-300 palabras)
- Sección 3: Contenido Principal (2-4 subsecciones, 200-400 palabras c/u)
- Sección 4: Aplicación/Implicaciones (150-250 palabras)
- Sección 5: Cierre/CTA (100-150 palabras)

---

**PASO 3.4: Key Points**

Identificar 3-5 key points principales. Cada uno:
- Sustantivo (no genérico)
- Sustentado en el libro
- Memorable
- Conecta con audiencia

---

**PASO 3.5: Fuentes a Citar**

Del libro/ACTIVATION_CONTEXT: 3-7 citas/referencias específicas. No inventar fuentes.

---

**PASO 3.6: CTA (Call to Action)**

Proponer CTA apropiado según objetivo: leer libro / engagement / construcción audiencia / aplicación.

---

### Output

**Por cada pieza N:** `POST_PLAN_[N]_[TITULO_ABREVIADO].md`

**Estructura del archivo:**

```markdown
---
title:       [Título elegido]
format:      [post_estandar | post_largo | hilo]
platform:    [LinkedIn / Substack / Twitter / Medium]
word_count:  [X palabras] o [X tweets]
publication: [Semana X, Día Y]
---

# POST PLAN [N]: [Título Abreviado]

## OPCIONES DE TÍTULO
### OPCIÓN A: Directo — [título]
### OPCIÓN B: Intrigante — [título]
### OPCIÓN C: Provocativo — [título]

**SELECCIÓN EDITOR:** [ A / B / C / Otro: _______ ]

## HOOK / OPENING
[Primeros 2-3 párrafos escritos completos]
**Tipo de hook:** [tipo]

## ESTRUCTURA / OUTLINE
[Secciones con objetivos y extensiones]

## KEY POINTS (3-5)
[Con fuente y evidencia del libro para cada uno]

## FUENTES A CITAR
[Referencias específicas del libro]

## CALL TO ACTION
[Texto del CTA, tipo, posicionamiento]

## CONSIDERACIONES ESPECIALES
[Tono, complejidad, sensibilidades, cross-references]
```

---

### Métricas de Calidad

**Un buen plan de post debe tener:**

```
[ ] 3 opciones de título (variedad)
[ ] Hook específico y atractivo (no genérico)
[ ] Estructura clara de 3-5 secciones
[ ] 3-5 key points sustantivos
[ ] Fuentes específicas del libro
[ ] CTA apropiado al objetivo
[ ] Extensión total alineada con formato
[ ] Consideraciones de tono/sensibilidad
```

---

### CHECKPOINT 4: REVISIÓN DE PLANES

**Duración:** 1-2 horas

**Actor:** Editor

**Actividades:**

1. **Revisar planes de todas las piezas**
   - ¿Títulos son atractivos?
   - ¿Hooks enganchan?
   - ¿Estructura tiene sentido?

2. **Validar key points**
   - ¿Son sustantivos?
   - ¿Están bien sustentados?

3. **Verificar fuentes**
   - ¿Citas son del libro?
   - ¿Referencias son precisas?

4. **Ajustar si necesario**
   - Cambiar títulos, modificar estructura, añadir/quitar secciones

**Decisión:**
```
¿Planes aprobados?
├─ SÍ → Continuar a FASE 4 (producción)
└─ NO → Ajustar planes específicos
   └─ Re-generar planes modificados
   └─ Re-evaluar en CHECKPOINT 4
```

---

## FASE 4: PRODUCCIÓN DE CONTENIDO

### Objetivo
Escribir todas las piezas de contenido según planes aprobados.

### Actor
Editor + IA (Q&A de posicionamiento) → IA escribe, Editor valida

### Duración Estimada
- Por pieza Q&A (Editor + IA): 30-60 minutos
- Por pieza escritura (IA): 1-3 horas
- Por pieza revisión (Editor): 30-60 minutos
- **Total para 15-30 piezas: 30-130 horas**

### Herramientas

**Q&A de posicionamiento (NUEVO en v1.5):**
- ✅ **`PROMPT_QA_IDEAS`** — Writing/shared, owner: Writing
  Ver documentación completa en `CONTEXT_WRITING`

**Escritura (todos los formatos):**
- ✅ **`PROMPT_WRITE_POST v2.0`** — EXISTENTE, Writing/shared (owner: Writing)
  Maneja todos los formatos: `post_estandar`, `post_largo`, `hilo`.
  Input canónico: POST_SEED. Documentación completa: `writing/shared/PROMPT_WRITE_POST.md`

**Artefacto de configuración:**
- ✅ **`WRITING_CONTEXT`** — Definido en `writing/post/RESOURCE_WRITING_CONTEXT.md`
  Combina EDITOR_PROFILE + publicación de destino + formato de texto.
  Activation lo prepara en el paso de Q&A de posicionamiento o manualmente.

> **Nota de scope R1 (DL_20260416_SYSTEM_025):** Solo `PROMPT_WRITE_POST` es shared con
> Activation. El flujo completo de `/writing/post/` (Q&A de ideas, planificación, división
> de posts) **no se comparte** con Activation en R1. Activation opera con material de un
> libro ya investigado — caso de uso distinto que no requiere el flujo completo en R1.
> El mecanismo exacto por el que Activation genera el POST_SEED propio (distinto al
> POST_SEED del flujo Writing autónomo) está **pendiente de diseño en Sprint 4**. Por ahora,
> Activation produce el POST_SEED manualmente o mediante los prompts propios del workflow
> de análisis de colección.

**Artefacto de interfaz:**
- ✅ **`TEMPLATE_POST_SEED`** — Writing/shared, owner: Writing
  Input canónico de PROMPT_WRITE_POST. Ver `CONTEXT_WRITING`.

---

### Principio Fundamental: Producción SECUENCIAL

Las piezas se escriben **una a la vez**, no todas simultáneamente.

**Razones:**
1. Evitar repeticiones across piezas
2. Mantener coherencia narrativa
3. Permitir ajustes según feedback del editor
4. Aprender del estilo aprobado en piezas anteriores

---

### Input por Pieza

```
INPUT AL Q&A (PASO 4.1):
├─ POST_PLAN_[N] (aprobado en CHECKPOINT 4)
├─ LIBRO_COMPLETO.md (o secciones relevantes)
├─ ACTIVATION_CONTEXT_[PROYECTO].md
├─ PERFIL_ACTIVO
└─ PIEZAS 1 a N-1 (ya escritas y aprobadas)

INPUT A LA ESCRITURA (PASOS 4.3-4.7):
└─ POST_SEED_[N] (output del Q&A — input canónico de WRITE_POST)
   Template: TEMPLATE_POST_SEED (Writing/shared)
```

---

### Iteración: Para cada pieza N = 1 hasta 15-30

---

**PASO 4.1: Q&A de Posicionamiento** ⭐ NUEVO EN v1.5

**Herramienta:** `PROMPT_QA_IDEAS` (Writing/shared — ver `CONTEXT_WRITING`)

**Objetivo:** Capturar la posición del editor sobre el contenido del POST_PLAN antes de escribir. El POST_PLAN contiene estructura y contenido del libro, pero no la posición del editor sobre ese contenido. Sin este paso, el post puede sonar correcto en forma pero carecer de la voz real del editor.

**Proceso:**
1. Cargar POST_PLAN_[N] como contexto
2. Ejecutar PROMPT_QA_IDEAS: el prompt hace preguntas de posicionamiento al editor
3. Editor responde con sus ideas, distinciones y posición real sobre el tema
4. El prompt captura el material y detecta señales de aprendizaje (`📘 SEÑAL DE APRENDIZAJE`)

**Mecanismo de skip:**
El editor puede declarar skip con el mismo mecanismo que en RAMA POST autónoma (declarar razón explícita). El skip se documenta en el POST_SEED.

```
¿Editor declara skip?
├─ NO → Ejecutar Q&A completo
│       └─ Capturar material citable literal + ideas desarrolladas
│
└─ SÍ → Documentar razón en POST_SEED
        └─ qa_executed: false
           qa_skipped_reason: [razón]
```

**Output:** Inventario de ideas del editor (material citable literal + ideas desarrolladas + ideas descartadas + señales de aprendizaje)

---

**PASO 4.2: Generación del POST_SEED**

**Herramienta:** `TEMPLATE_POST_SEED` (Writing/shared — ver `CONTEXT_WRITING`)

**Objetivo:** Construir el artefacto POST_SEED que combina:
- Contenido del libro (estructura y key points del POST_PLAN)
- Voz posicionada del editor (material del Q&A)

**El POST_SEED es el input canónico de PROMPT_WRITE_POST.** Sustituye al POST_PLAN como documento de referencia para la escritura.

**Campos obligatorios del POST_SEED:**
- Contexto (writing_context, format, word_count_target)
- Núcleo narrativo (pregunta central, movimiento narrativo, orden de argumentos)
- Estructura de secciones (tabla con secciones, palabras, estado)
- Inventario de ideas (del Q&A: material citable, ideas desarrolladas, descartadas)
- Fuentes verificadas
- Estado del post (qa_executed, qa_skipped_reason, hybrid_mode)

**El editor revisa y aprueba el POST_SEED antes de continuar a escritura.**

---

**PASO 4.3: Selección de Herramienta de Escritura**

`PROMPT_WRITE_POST v2.0` (Writing/shared) maneja todos los formatos. El formato se
especifica en el campo `format` del WRITING_CONTEXT:

```
format: post_estandar  → Post estándar (600–1.500 palabras)
format: post_largo     → Post largo / artículo (1.500–3.000 palabras)
format: hilo           → Hilo (8–15 unidades)
```

No se requiere seleccionar entre herramientas distintas: siempre se usa
`PROMPT_WRITE_POST v2.0` con el WRITING_CONTEXT apropiado.

---

**PASO 4.4: Escritura con PROMPT_WRITE_POST v2.0**

**Input obligatorio:** POST_SEED_[N] (aprobado por editor) + WRITING_CONTEXT

**Herramienta:** `PROMPT_WRITE_POST v2.0` (Writing/shared — ver `writing/shared/PROMPT_WRITE_POST.md`)

El prompt escribe el post sección a sección desde el POST_SEED como input canónico.
El WRITING_CONTEXT determina el formato, la extensión objetivo y la publicación de destino.
El EDITOR_PROFILE (referenciado en el WRITING_CONTEXT) define la voz.

**Comportamiento por formato (determinado por WRITING_CONTEXT.format):**

- **`post_estandar`** — Post estándar
  - Extensión: 600–800 (corto) o 1.000–1.500 (mediano) palabras
  - Proceso: sección a sección desde POST_SEED; material citable literal sin modificar; señalar afirmaciones sin verificar con `[⚠ VERIFICAR]`
  - Output: `CONTENT_[N]_POST_v1.0.md`

- **`post_largo`** — Artículo largo
  - Extensión: 1.500–3.000 palabras
  - Proceso: estructura 5-7 secciones; mayor profundidad; puede incluir subsecciones con headers
  - Output: `CONTENT_[N]_ARTICLE_v1.0.md`

- **`hilo`** — Hilo (Twitter/X u otras plataformas de microblogging)
  - Extensión: 8–15 unidades
  - Proceso: unidad 1 standalone (hook); unidades 2-3 contexto; unidades 4-10 key points (1 punto por 1-2 unidades); unidad final resumen + CTA; numerar [X/Y]
  - Output: `CONTENT_[N]_THREAD_v1.0.md`

---

**PASO 4.5: Aplicación de Estilo (PERFIL_ACTIVO)**

Todos los formatos deben:
- Reflejar voz del perfil activo
- Usar vocabulario característico
- Mantener tono consistente
- Respetar preferencias estilísticas

---

**PASO 4.6: Evitar Repeticiones**

Verificar contra piezas anteriores:
- ¿Key point ya mencionado en pieza X? → Mencionar brevemente + link / Si NO: desarrollar completamente
- ¿Cita ya usada en pieza Y? → Usar cita diferente o parafrasear
- ¿Ejemplo ya dado en pieza Z? → Dar ejemplo diferente

---

**PASO 4.7: Citación de Fuentes**

Formato por plataforma:

**LinkedIn/Substack/Medium:**
```
Según [Autor] en [Título del Libro], [claim/cita].
```

**Twitter:**
```
[Claim/cita] - [Autor], [Título Libro]
```

NO inventar citas o fuentes no presentes en el libro.

---

### Output por Pieza

**Archivo:** `CONTENT_[N]_[TIPO]_v1.0.md`

**Metadata del archivo:**
```markdown
---
title:              [Título elegido]
format:             [post | article | thread]
platform:           [LinkedIn / Substack / Twitter / Medium]
word_count:         [X palabras] o [X tweets]
planned_publication:[Semana X, Día Y]
status:             DRAFT v1.0
post_seed:          POST_SEED_[N]
qa_executed:        [true | false]
---
```

**Contenido:**
[Texto completo del post/artículo/thread]

**Notas de producción al final del archivo:**
```markdown
---
## NOTAS DE PRODUCCIÓN

**Fuentes del libro citadas:** [Lista]
**Key points cubiertos:** [Lista]
**Cross-references:** [Otras piezas mencionadas o linkeadas]
**Longitud final:** [X palabras] o [X tweets]
**Desviaciones del POST_SEED:** [Si hubo cambios justificados]
**Señales de aprendizaje del Q&A:** [IDs de señales pendientes de integrar en EDITOR_PROFILE]
---
```

---

### CHECKPOINT N: Validación de Pieza N

**Duración:** 30-60 minutos por pieza

**Actor:** Editor

**Actividades:**

1. **Leer pieza completa**
   - ¿Sigue el POST_SEED aprobado?
   - ¿Calidad de escritura es alta?
   - ¿Voz es consistente con perfil?

2. **Verificar material del Q&A**
   - ¿Material citable literal aparece sin modificar?
   - ¿Ideas desarrolladas están bien integradas?
   - ¿Ideas descartadas no reaparecen?

3. **Verificar key points y fuentes**
   - ¿Todos los key points están cubiertos?
   - ¿Citas son precisas y del libro?
   - ¿Afirmaciones marcadas `[⚠ VERIFICAR]` están resueltas o pendientes?

4. **Detectar errores**
   - Gramática/ortografía
   - Lógica/coherencia
   - Repeticiones con piezas anteriores

**Decisión por pieza:**
```
¿Pieza N necesita correcciones?
├─ NO → APROBAR como v1.0 FINAL
│       └─ Pieza pasa a contexto para escribir pieza N+1
│
└─ SÍ → ANOTAR correcciones:
        ├─ Correcciones menores → Editor edita directamente → v1.1 FINAL_EDITED
        └─ Correcciones mayores → IA reescribe → v2.0 → Editor valida → v2.0 FINAL
```

---

### Jerarquía de Versiones

```
v1.0: Primera versión de la IA (desde POST_SEED aprobado)
v1.1: Edición menor del editor sobre v1.0
v2.0: Reescritura completa de la IA
v2.1: Edición menor del editor sobre v2.0

FINAL:        Versión aprobada sin edición del editor
FINAL_EDITED: Versión aprobada CON edición del editor

Prioridad: FINAL_EDITED > FINAL > v2.1 > v2.0 > v1.1 > v1.0
```

---

### Métricas de Calidad por Formato

**POST (corto/medio):**
```
[ ] Extensión en rango objetivo
[ ] Hook atractivo (primeros 2 párrafos)
[ ] Estructura clara (3-5 secciones)
[ ] 3-5 key points desarrollados
[ ] Material citable literal del Q&A presente sin modificar
[ ] 3-7 citas/referencias del libro
[ ] CTA claro
[ ] Voz consistente con perfil
[ ] Sin repeticiones de piezas anteriores
[ ] Optimizado para plataforma
```

**ARTICLE (largo):**
```
[ ] Extensión 1,500-3,000 palabras
[ ] Estructura elaborada (5-7 secciones)
[ ] Profundidad en cada punto
[ ] Material del Q&A bien integrado
[ ] 5-10 citas/referencias
[ ] Subsecciones con headers
[ ] CTA elaborado
[ ] Voz consistente
```

**THREAD:**
```
[ ] 8-15 tweets
[ ] Tweet 1 standalone (hook fuerte)
[ ] Progresión lógica
[ ] 1 key point por 1-2 tweets
[ ] Citas breves y precisas
[ ] Numeración [X/Y]
[ ] Emojis estratégicos (no excesivo)
[ ] Tweet final con resumen + CTA
```

---

## FASE 5: VALIDACIÓN Y PUBLICACIÓN

### Objetivo
Evaluar conjunto completo de contenido, preparar para publicación y exportar en formatos apropiados.

### Actor
IA evalúa, Editor aprueba

### Duración Estimada
- IA: 2-3 horas
- Editor: 1-2 horas
- **Total: 3-5 horas**

### Herramienta
**`EVALUATE_ACTIVATION_CONTENT v1.0`** [PENDIENTE DISEÑO]

---

### Input

```
OBLIGATORIOS:
├─ CONTENT_[1-N]_FINAL (todas las piezas aprobadas)
├─ CONTENT_STRATEGY (para verificar cumplimiento)
├─ OBJETIVOS_ACTIVACION (para validar alineación)
└─ PERFIL_ACTIVO (para verificar coherencia de voz)

OPCIONALES:
└─ LIBRO_COMPLETO (para fact-checking final)
```

---

### Proceso

**PASO 5.1: Evaluación de Coherencia**

**A) Coherencia de Voz**
- ¿Todas las piezas tienen la misma voz?
- ¿Voz es consistente con PERFIL_ACTIVO?
- ¿Identificar piezas con desviaciones de estilo?

**B) Coherencia Narrativa**
- ¿Piezas se conectan lógicamente?
- ¿Clusters temáticos fluyen bien?
- ¿Series mantienen continuidad?

**C) Coherencia de Calidad**
- ¿Todas las piezas tienen calidad similar?
- ¿Identificar piezas significativamente más débiles?

---

**PASO 5.2: Detección de Repeticiones**

Across piezas, detectar key points, citas o ejemplos repetidos en 3+ piezas. Generar reporte con acciones recomendadas.

---

**PASO 5.3: Validación de Fuentes**

Verificar que:
- Todas las citas son del libro (no inventadas)
- Referencias a capítulos son precisas
- Atribuciones de autores/estudios son correctas

---

**PASO 5.4: Evaluación de Engagement Potencial**

Por cada pieza, calcular Engagement Score (1-10) combinando:
- Hook strength / Topic relevance / Clarity / Actionability / Shareability

Generar ranking completo con recomendación de publicar, revisar o reescribir.

---

**PASO 5.5: Preparación para Publicación**

**A) Formateo por Plataforma**

- **LinkedIn:** Párrafos cortos (2-3 oraciones), line breaks, hashtags (3-5), @ mentions
- **Substack:** Markdown/HTML, headers, CTA en footer
- **Twitter/X:** Verificar límite de caracteres, imágenes si aplica
- **Medium:** Tags (5 máximo), featured image

**B) Generación de Metadata**

Por cada pieza: title, description (150-160 chars), tags/keywords, social_share_text por plataforma.

**C) Calendario de Publicación**

| # | Título | Formato | Plataforma | Fecha | Hora | Status |
|---|--------|---------|------------|-------|------|--------|
| 1 | [...] | Post | LinkedIn | 2026-03-01 | 09:00 | Ready |
| [...] | [...] | [...] | [...] | [...] | [...] | [...] |

---

### Output

**`CONTENT_PACKAGE_[PROYECTO].zip`**

```
CONTENT_PACKAGE_[PROYECTO]/
├─ README.md
├─ EVALUATION_REPORT.md
├─ PUBLICATION_CALENDAR.csv
├─ POSTS/
│  ├─ LINKEDIN/
│  ├─ SUBSTACK/
│  ├─ TWITTER/
│  └─ MEDIUM/
└─ METADATA/
   ├─ post_001_metadata.json
   └─ [...]
```

---

### CHECKPOINT 5: APROBACIÓN FINAL

**Duración:** 1-2 horas

**Actor:** Editor

**Actividades:**

1. **Revisar EVALUATION_REPORT**
   - ¿Coherencia general es aceptable?
   - ¿Repeticiones son manejables?
   - ¿Fuentes están validadas?

2. **Validar CONTENT_PACKAGE**
   - ¿Todos los archivos están presentes?
   - ¿Formatos son correctos por plataforma?

3. **Revisar PUBLICATION_CALENDAR**
   - ¿Fechas son realistas?
   - ¿Secuenciación tiene sentido?

4. **Decisión sobre piezas con issues**
   - ¿Cuáles reescribir? ¿Cuáles eliminar? ¿Cuáles publicar con ajustes menores?

**Decisión Final:**
```
¿Package aprobado para publicación?
├─ SÍ → Campaña lista para lanzar
│       └─ Comenzar publicación según calendario
│
└─ NO → Solicitar correcciones específicas
        ├─ Reescribir piezas problemáticas
        ├─ Ajustar calendario
        └─ Re-generar package
```

---

## ARTEFACTOS DEL SISTEMA

### Inputs del Sistema

**Obligatorios:**
1. `LIBRO_COMPLETO.md` (o equivalente en PDF/DOCX/EPUB)
2. `OBJETIVOS_ACTIVACION.md` (creado por editor)

**Opcionales (se generan si no existen):**
3. `RESEARCH_REPORT(s)` (de workflow RESEARCH, si aplica)
4. `TIMELINE_[PROYECTO].md` (generado si no existe)
5. `CAST_OF_CHARACTERS_[PROYECTO].md` (generado si no existe)
6. `EDITOR_PROFILE_[AUTOR/COLECCION].md` (generado si no existe)

---

### Herramientas (Prompts)

**FASE 0: Preparación**
1. ✅ `ANALYZE_COLLECTION_FOR_ACTIVATION v1.4` — DISEÑADO (owner: Activation)
2. ✅ `CREATE_TIMELINE v1.0` — EXISTENTE, shared (owner: Writing)
3. ✅ `CREATE_CAST v1.0` — EXISTENTE, shared (owner: Writing)
4. ✅ `CREATE_EDITOR_PROFILE v1.0` — EXISTENTE (owner: Editorial Profile)

**FASE 1: Análisis**
5. ⚠️ `ANALYZE_BOOK_FOR_ACTIVATION v1.0` — PENDIENTE DISEÑO

**FASE 2: Estrategia**
6. ⚠️ `CREATE_CONTENT_STRATEGY v1.0` — PENDIENTE DISEÑO

**FASE 3: Plan**
7. ⚠️ `DESIGN_POST_PLAN v1.0` — PENDIENTE DISEÑO

**FASE 4: Producción**
8. ✅ `PROMPT_QA_IDEAS` — EXISTENTE, shared (owner: Writing) ⭐ NUEVO EN v1.5
   Ver: `CONTEXT_WRITING`
9. ✅ `PROMPT_WRITE_POST v2.0` — EXISTENTE, shared (owner: Writing) ⭐ ACTUALIZADO EN v1.5
   Ver: `writing/shared/PROMPT_WRITE_POST.md`. Maneja todos los formatos (post_estandar, post_largo, hilo).

**FASE 5: Validación**
12. ⚠️ `EVALUATE_ACTIVATION_CONTENT v1.0` — PENDIENTE DISEÑO (bloqueado por RESOURCE_EVALUATION_FRAMEWORK)

**Total de prompts:** 10 (6 existentes reutilizados + 4 nuevos pendientes de diseño)

---

### Artefactos de Interfaz con Writing (shared, owner: Writing)

| Artefacto | Tipo | Versión | Descripción |
|-----------|------|---------|-------------|
| `TEMPLATE_POST_SEED` | TEMPLATE | v1.0 | Input canónico de PROMPT_WRITE_POST. Combina estructura del POST_PLAN + voz posicionada del Q&A. ⭐ NUEVO EN v1.5 |
| `PROMPT_QA_IDEAS` | PROMPT | — | Q&A de posicionamiento. Captura la posición del editor sobre el contenido antes de escribir. ⭐ NUEVO EN v1.5 |
| `PROMPT_WRITE_POST` | PROMPT | v2.0 | Escritura del post. Input canónico: POST_SEED. Maneja todos los formatos. ⭐ ACTUALIZADO EN v1.5 |
| `WRITING_CONTEXT` | RESOURCE | v1.0 | Artefacto de configuración: EDITOR_PROFILE + publicación de destino + formato. Definido en `writing/post/RESOURCE_WRITING_CONTEXT.md`. ⭐ NUEVO EN v1.5 |
| `PROMPT_CREATE_TIMELINE` | PROMPT | v1.0 | Cronología exhaustiva. |
| `PROMPT_CREATE_CAST` | PROMPT | v1.0 | Catálogo de actores. |

**Nota:** Activation invoca estos artefactos pero no los desarrolla ni los versiona. Cambios necesarios se canalizan a writing-dev via DL entry.

**Documentación completa:** Ver `CONTEXT_WRITING`

---

### Outputs del Sistema

**FASE 0:**
- `ACTIVATION_CONTEXT_[PROYECTO].md`
- `TIMELINE_[PROYECTO].md`
- `CAST_OF_CHARACTERS_[PROYECTO].md`
- `EDITOR_PROFILE_[AUTOR/COLECCION].md`
- `PERFIL_ACTIVO_SELECCIONADO.md`

**FASE 1:**
- `TEMAS_ACTIVABLES_[PROYECTO].md`

**FASE 2:**
- `CONTENT_STRATEGY_[PROYECTO].md`

**FASE 3:**
- `POST_PLAN_[N]_[TITULO].md` (uno por cada pieza)

**FASE 4:**
- `POST_SEED_[N].md` (output del Q&A, input canónico de escritura) ⭐ NUEVO EN v1.5
- `CONTENT_[N]_[TIPO]_v1.0.md` (o v2.0, FINAL, FINAL_EDITED)

**FASE 5:**
- `EVALUATION_REPORT.md`
- `CONTENT_PACKAGE_[PROYECTO].zip`

---

## MÉTRICAS DE CALIDAD

### Métricas por Fase

**FASE 0: Preparación**
```
Tiempo objetivo:
- Escenario A (Tinta Artificial): 2-3.5 horas ✅
- Escenario B (Externo mínimo): 6-12 horas ✅
- Escenario C (Externo parcial): 5-9 horas ✅
- Escenario D (Múltiples libros): 10-17 horas ✅

Calidad:
- Todas las fuentes mínimas presentes: ✅
- ACTIVATION_CONTEXT: 3-5k palabras ✅
- TIMELINE: según tipo (30-1,000 eventos) ✅
- CAST: según tipo (20-500 perfiles) ✅
- EDITOR_PROFILE: 5-12k palabras ✅
- PERFIL_ACTIVO seleccionado: ✅
```

**FASE 1: Análisis**
```
Tiempo objetivo: 3-5 horas ✅

Calidad:
- Temas identificados: 20-40 ✅
- Temas con score ≥ 7: ≥10 ✅
- Clusters temáticos: 3-6 ✅
- Diversidad de formatos: ✅
- Hooks específicos (no genéricos): ✅
```

**FASE 2: Estrategia**
```
Tiempo objetivo: 2-3 horas ✅

Calidad:
- Calendario completo: ✅
- Mix balanceado de formatos: ✅
- Secuenciación lógica: ✅
- KPIs realistas: ✅
- Plan de promoción: ✅
```

**FASE 3: Plan de Posts**
```
Tiempo objetivo: 3-6 horas ✅

Calidad (por plan):
- 3 opciones de título: ✅
- Hook específico: ✅
- Estructura clara: ✅
- 3-5 key points sustantivos: ✅
- Fuentes específicas del libro: ✅
- CTA apropiado: ✅
```

**FASE 4: Producción** ⭐ ACTUALIZADO EN v1.5
```
Tiempo objetivo: 30-130 horas (15-30 piezas) ✅

Calidad del Q&A (por pieza):
- POST_SEED generado y aprobado: ✅
- Material citable literal capturado (si Q&A ejecutado): ✅
- Ideas desarrolladas documentadas: ✅
- Señales de aprendizaje registradas: ✅

Calidad de escritura (por pieza):
- Extensión en rango: ✅
- Estructura del POST_SEED seguida: ✅
- Material citable literal presente sin modificar: ✅
- Fuentes citadas correctamente: ✅
- Voz consistente con perfil: ✅
- Sin repeticiones de piezas anteriores: ✅
- Optimizado para plataforma: ✅
```

**FASE 5: Validación**
```
Tiempo objetivo: 3-5 horas ✅

Calidad:
- Coherencia de voz: ≥80% piezas ✅
- Fuentes verificadas: ≥95% ✅
- Engagement score promedio: ≥7/10 ✅
- Piezas listas sin revisión: ≥80% ✅
- Package completo: ✅
```

---

### Métricas Globales del Workflow

**Tiempo total estimado:**
```
Escenario óptimo (Tinta Artificial):
- FASE 0: 2-3.5h
- FASE 1: 4h
- FASE 2: 3h
- FASE 3: 5h
- FASE 4: 60h (promedio para 20 piezas, incluye Q&A)
- FASE 5: 4h
TOTAL: ~78-79.5 horas

Escenario mínimo (Libro externo):
- FASE 0: 8h
- FASE 1: 4h
- FASE 2: 3h
- FASE 3: 5h
- FASE 4: 60h
- FASE 5: 4h
TOTAL: ~84 horas
```

**Outputs totales:**
```
- POST_SEEDs: 15-30 (uno por pieza)
- Piezas de contenido: 15-30
- Formatos por plataforma: 2-4 plataformas
- Metadata generada: Por cada pieza
- Calendario: Completo para X semanas/meses
- Reporte de evaluación: 1
```

**Calidad esperada:**
```
- Coherencia de voz: ≥80%
- Validación de fuentes: ≥95%
- Engagement potencial promedio: ≥7/10
- Piezas listas sin revisión mayor: ≥80%
```

---

### Métricas de Éxito Post-Publicación

**Estas métricas se miden DESPUÉS de publicar:**

**Engagement real (vs predicho):**
- Reads reales vs esperados
- Likes/shares reales vs esperados
- Comments reales vs esperados

**Conversión:**
- % audiencia que compra/lee libro
- % audiencia que suscribe a newsletter
- % audiencia que comparte contenido

**Alcance:**
- Impresiones totales
- Nuevos seguidores/suscriptores
- Crecimiento de audiencia

**Feedback cualitativo:**
- Sentimiento en comentarios
- Temas que más resonaron
- Formatos más efectivos

---

## FIN DEL WORKFLOW

**Versión:** 1.5
**Estado:** Activo — Q&A de posicionamiento integrado en FASE 4
**DL implementada:** DL_20260411_ACTIVATION_022

---

**REFERENCIAS:**
- Ver: `CONTEXT_WRITING` (documentación de PROMPT_QA_IDEAS, TEMPLATE_POST_SEED, PROMPT_WRITE_POST)
- Ver: `CONTEXT_ACTIVATION` (contexto del subsistema)
- Ver: `SCHEMA_DECISION_LOG` (formato de DL entries)
