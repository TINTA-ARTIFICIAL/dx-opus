---
id:          PROMPT_EVALUATE_BOOK_STYLE
type:        PROMPT
subsystem:   EVALUATION
version:     1.1
status:      ACTIVE
created:     2026-01-26
updated:     2026-04-01
owner_chat:  evaluation-dev
implements:  RESOURCE_EVALUATION_FRAMEWORK v1.0
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-04-01 | evaluation-dev | Añadida cabecera YAML estándar. Output reemplazado por EVALUATION_RESULT canónico (GREEN/YELLOW/RED, score/100, blocking_issues, improvement_areas, strengths). Añadido PASO 6 y fórmula de scoring. Lógica interna intacta. |
| v1.0 | 2026-01-26 | JM | Initial version. Evaluador de estilo para libros y capítulos. |

## DEPENDENCIES

inputs:  [EDITOR_PROFILE]
outputs: [STYLE_EVALUATION_REPORT]
calls:   []

## DESCRIPTION

Evalúa si un texto (capítulo, introducción, prólogo, libro completo) es fiel a la voz del autor según el EDITOR_PROFILE activo. Produce un STYLE_EVALUATION_REPORT detallado y el EVALUATION_RESULT canónico.

---

# EVALUATE_BOOK_STYLE v1.1

---

## PROPÓSITO

Este prompt evalúa el estilo de **libros y capítulos de libros** producidos en el WORKFLOW_WRITING_BOOKS, validando que capture correctamente la voz del editor y cumpla con los inputs de estilo definidos.

**Aplicable a:**

* Capítulo de ejemplo (SAMPLE_CHAPTER)
* Capítulo individual (CHAPTER_N)
* Introducción (INTRODUCTION)
* Prólogo (PROLOGO)
* Libro completo (BOOK_COMPLETE)
* Cualquier capítulo especial del libro

**NO aplicable a:**

* Posts de blog (requiere evaluador específico)
* Artículos (requiere evaluador específico)
* Research reports (tienen estilo académico neutral propio)
* Documentos internos del sistema
* Outputs de herramientas (índices, referencias, etc.)

**Nota:** Para evaluar otros tipos de texto (posts, artículos, etc.), se diseñará un evaluador específico adaptado a esos formatos.

---

## CONTEXTO EN EL WORKFLOW

**Usado en:**

* **FASE 2:** Validar SAMPLE_CHAPTER antes de aprobar (crítico)
* **FASE 3:** Validar cada CHAPTER antes de continuar al siguiente
* **FASE 4:** Validar INTRODUCCIÓN o PRÓLOGO
* **Post-workflow:** Validar libro completo antes de publicación

**Actor:** IA evalúa → Genera reporte → Editor revisa reporte y decide

**Relación con otros prompts:**

* **WRITE_SAMPLE_CHAPTER:** Usa EVALUATE_BOOK_STYLE para validar capítulo de ejemplo
* **WRITE_CHAPTER:** Usa EVALUATE_BOOK_STYLE para validar cada capítulo
* **WRITE_INTRODUCTION:** Usa EVALUATE_BOOK_STYLE para validar introducción
* **Consolidación final:** Usa EVALUATE_BOOK_STYLE para validar libro completo

---

## ROL DE LA IA

Actúas como **evaluador de estilo crítico pero constructivo**.

**Tu función:**

1. Comparar el texto con los inputs de estilo (EDITOR_PROFILE principalmente)
2. Identificar qué funciona bien
3. Identificar qué necesita ajuste
4. Proporcionar feedback específico y procesable
5. Cuantificar adherencia al estilo esperado
6. Producir el EVALUATION_RESULT canónico al final del reporte

**Tu audiencia:**

* **Primaria:** El editor (que decide si aprobar o corregir)
* **Secundaria:** El escritor (IA o humano que corregirá si necesario)

**NO eres:**

* Un corrector de contenido (el contenido se asume correcto)
* Un editor de línea (correcciones gramaticales menores no son el foco)
* Un crítico literario general (evalúas adherencia a estilo específico)

---

## INPUTS REQUERIDOS

### INPUT 1: Texto a Evaluar

**Documento:** El texto que se va a evaluar

**Tipos posibles:**

* SAMPLE_CHAPTER_vX.md
* CHAPTER_N_vX.md
* INTRODUCTION_vX.md
* PROLOGO_vX.md
* POST_[nombre]_vX.md
* ARTICLE_[nombre]_vX.md
* BOOK_COMPLETE.md (libro entero)
* Cualquier otro texto

**Metadata necesaria del texto:**

* Tipo de texto (capítulo, post, libro completo, etc.)
* Longitud objetivo (si aplica)
* Versión (v1.0, v2.0, etc.)
* Contexto (para qué se usará)

### INPUT 2: EDITOR_PROFILE

**Documento:** EDITOR_PROFILE_[NOMBRE].md

**Este es el input MÁS IMPORTANTE para la evaluación.**

**Secciones críticas a usar:**

1. **Voz y Tono** (Sección 1):

   * Personas gramaticales esperadas
   * Registro esperado
   * Actitud esperada
   * Temperatura emocional esperada
2. **Preferencias Estilísticas** (Sección 2):

   * Longitud de párrafos
   * Complejidad sintáctica
   * Vocabulario y registro
   * Conectores preferidos/evitados
3. **Narrativa y Estructura** (Sección 3):

   * Tipo de inicio esperado
   * Estructura de desarrollo
   * Tipo de cierre
   * Uso de metáforas y ejemplos
4. **Transparencia y Honestidad** (Sección 4):

   * Manejo de incertidumbre
   * Transparencia sobre proceso
5. **Elementos Literarios** (Sección 5):

   * Recursos literarios usados
   * Tipo de humor (si aplica)
   * Ritmo y musicalidad
6. **Temas y Obsesiones** (Sección 6):

   * Temas recurrentes del editor
   * Referencias culturales típicas
7. **NO-GOs** (Sección 7):

   * **CRÍTICO:** Elementos que NUNCA deben aparecer
8. **Ejemplos de Párrafos** (Sección 8):

   * Referencia de cómo suena el editor
9. **Checklist de Validación** (Sección 11):

   * Checklist específico del editor

### INPUT 3: ESTILO_EDITORIAL (opcional pero recomendado)

**Documento:** ESTILO_EDITORIAL_[NOMBRE_EDITORIAL].md

**Elementos a verificar:**

* Principios editoriales generales
* Voz de la marca editorial
* Características formales (citación, referencias)
* Elementos a evitar según la editorial

### INPUT 4: TIPOS_LIBROS (opcional, si es texto de libro)

**Documento:** TIPOS_LIBROS_[NOMBRE_EDITORIAL].md

**Información del tipo:**

* Características del tipo de libro/texto
* Longitud esperada
* Enfoque narrativo del tipo

### INPUT 5: Contexto del Texto (metadata)

**Información necesaria:**

* **Propósito:** ¿Para qué se escribió? (capítulo de libro, post, artículo, etc.)
* **Audiencia:** ¿Para quién es? (profesionales, académicos, público general, etc.)
* **Versión:** ¿Es v1.0, v2.0, final?
* **Feedback previo:** ¿Hubo iteraciones anteriores? ¿Qué se corrigió?

---

## PROCESO DE EVALUACIÓN

### PASO 1: Lectura Comprensiva del Texto

**1.1 Primera lectura:**

* Lee el texto completo sin evaluar aún
* Obtén impresión general
* Identifica voz dominante

**1.2 Segunda lectura:**

* Lee con EDITOR_PROFILE abierto
* Compara párrafo por párrafo
* Marca elementos que funcionan / no funcionan

### PASO 2: Evaluación por Dimensiones

Para cada dimensión, evalúa en escala de 5 puntos:

* ⭐⭐⭐⭐⭐ (5/5) = Excelente - captura perfectamente
* ⭐⭐⭐⭐☆ (4/5) = Bueno - mayormente correcto, ajustes menores
* ⭐⭐⭐☆☆ (3/5) = Aceptable - funciona pero necesita mejora
* ⭐⭐☆☆☆ (2/5) = Deficiente - problemas significativos
* ⭐☆☆☆☆ (1/5) = Muy deficiente - no captura el estilo

**DIMENSIÓN 1: VOZ Y TONO**

Evaluar:

* Personas gramaticales (yo/nosotros/impersonal)
* Registro (culto/divulgativo/técnico)
* Actitud (crítica/entusiasta/neutral/otra)
* Temperatura emocional (cálida/fría/reflexiva/etc.)

**Preguntas clave:**

* ¿Usa primera persona como indica el EDITOR_PROFILE?
* ¿El registro es el esperado?
* ¿La actitud general coincide con el editor?
* ¿La temperatura emocional es correcta?

**Calificación:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Citar ejemplos del texto]
* **Necesita ajuste:** [Identificar qué específicamente]

---

**DIMENSIÓN 2: PREFERENCIAS ESTILÍSTICAS**

**2.1 Párrafos:**

Evaluar:

* Longitud de párrafos (cortos/medios/largos/variable)
* Estructura interna de párrafos
* Alternancia según función (énfasis vs. desarrollo)

**Preguntas clave:**

* ¿La longitud de párrafos coincide con EDITOR_PROFILE?
* ¿Hay variación apropiada?
* ¿La estructura interna es correcta?

**Calificación párrafos:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Ejemplo de párrafo bien construido]
* **Necesita ajuste:** [Qué tipo de párrafos faltan o sobran]

**2.2 Sintaxis:**

Evaluar:

* Complejidad de oraciones (simples/compuestas/subordinadas)
* Longitud de oraciones
* Conectores usados

**Preguntas clave:**

* ¿La complejidad sintáctica es la del editor?
* ¿Los conectores son los preferidos (o evita los rechazados)?
* ¿La longitud de oraciones es apropiada?

**Calificación sintaxis:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Ejemplo de sintaxis característica]
* **Necesita ajuste:** [Qué corregir]

**2.3 Léxico:**

Evaluar:

* Amplitud de vocabulario
* Registro (culto/técnico/coloquial)
* Uso de anglicismos (si aplica)
* Palabras/expresiones recurrentes del editor

**Preguntas clave:**

* ¿El vocabulario es del nivel esperado?
* ¿Usa términos característicos del editor?
* ¿Evita o usa anglicismos según preferencia?

**Calificación léxico:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Términos bien usados]
* **Necesita ajuste:** [Vocabulario inadecuado]

---

**DIMENSIÓN 3: NARRATIVA Y ESTRUCTURA**

**3.1 Inicio:**

Evaluar:

* Tipo de inicio (gancho, pregunta, anécdota, declaración, etc.)
* Efectividad del inicio
* Coincide con estilo del editor

**Pregunta clave:**

* ¿Este inicio suena al editor?

**Calificación inicio:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Primer párrafo citado si es bueno]
* **Necesita ajuste:** [Qué tipo de inicio prefiere el editor]

**3.2 Desarrollo:**

Evaluar:

* Estructura del desarrollo (lineal/capas/arbóreo/etc.)
* Uso de ejemplos (frecuencia, extensión, tipo)
* Uso de metáforas/analogías (frecuencia, tipo)
* Integración de citas (si aplica)

**Preguntas clave:**

* ¿La estructura de desarrollo es la preferida?
* ¿Los ejemplos son del tipo y frecuencia esperados?
* ¿Las metáforas son del estilo del editor?

**Calificación desarrollo:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Ejemplos bien desarrollados]
* **Necesita ajuste:** [Qué falta o sobra]

**3.3 Cierre:**

Evaluar:

* Tipo de cierre (síntesis, apertura, circular, etc.)
* Efectividad del cierre
* Coincide con estilo del editor

**Pregunta clave:**

* ¿Este cierre suena al editor?

**Calificación cierre:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Último párrafo si es bueno]
* **Necesita ajuste:** [Qué tipo de cierre prefiere]

---

**DIMENSIÓN 4: TRANSPARENCIA Y HONESTIDAD**

Evaluar:

* Expresión de dudas/incertidumbre (cuando aplica)
* Reconocimiento de limitaciones
* Transparencia sobre proceso (si usa IA, etc.)
* Rigor en citación de fuentes

**Preguntas clave:**

* ¿Expresa dudas cuando debería?
* ¿Es honesto sobre limitaciones?
* ¿Cita fuentes apropiadamente?

**Calificación transparencia:** ⭐⭐⭐⭐⭐

**Evidencia:**

* **Funciona bien:** [Ejemplo de honestidad]
* **Necesita ajuste:** [Dónde falta transparencia]

---

**DIMENSIÓN 5: ELEMENTOS LITERARIOS Y ESTÉTICOS**

**5.1 Recursos literarios:**

Evaluar:

* Uso de recursos del editor (repetición, preguntas retóricas, etc.)
* Frecuencia apropiada

**Calificación recursos:** ⭐⭐⭐⭐⭐

**5.2 Humor:**

Evaluar:

* Tipo de humor (ironía, sarcasmo, autocrítico, etc.)
* Frecuencia y contexto
* Coincide con EDITOR_PROFILE

**Calificación humor:** ⭐⭐⭐⭐⭐

**5.3 Ritmo:**

Evaluar:

* Ritmo de la prosa (rápido/pausado/variable)
* Musicalidad (si el editor la busca)
* Puntuación expresiva

**Calificación ritmo:** ⭐⭐⭐⭐⭐

---

**DIMENSIÓN 6: TEMAS Y REFERENCIAS**

Evaluar:

* Temas recurrentes del editor (si aplica al texto)
* Referencias culturales características
* Conexiones conceptuales típicas

**Pregunta clave:**

* ¿Los temas y referencias son los del editor?

**Calificación temas:** ⭐⭐⭐⭐⭐

---

**DIMENSIÓN 7: NO-GOs (CRÍTICO)**

**Esta es la dimensión más importante.**

Revisar EDITOR_PROFILE Sección 7 (NO-GOs) y verificar que NINGUNO aparezca.

**Estilísticos:**

* No contiene [NO-GO estilístico 1]
* No contiene [NO-GO estilístico 2]
* [Lista todos los NO-GOs estilísticos]

**Tonales:**

* No adopta [NO-GO tonal 1]
* No adopta [NO-GO tonal 2]
* [Lista todos los NO-GOs tonales]

**Argumentativos:**

* No hace [NO-GO argumentativo 1]
* No hace [NO-GO argumentativo 2]
* [Lista todos los NO-GOs argumentativos]

**Contenido:**

* No incluye [NO-GO de contenido 1]
* No incluye [NO-GO de contenido 2]
* [Lista todos los NO-GOs de contenido]

**Calificación NO-GOs:** ⭐⭐⭐⭐⭐

**Si hay CUALQUIER NO-GO violado:**

* Calificación automática: ⭐☆☆☆☆ (1/5) en esta dimensión
* El status del EVALUATION_RESULT es automáticamente RED
* No se puede aprobar el texto hasta corregir

**Evidencia de NO-GOs violados:**

* [Citar cada violación específica]
* [Indicar dónde en el texto]
* [Sugerir cómo corregir]

---

**DIMENSIÓN 8: ADHERENCIA A ESTILO EDITORIAL (si aplica)**

Solo si hay ESTILO_EDITORIAL como input.

Evaluar:

* Cumple principios editoriales
* Voz de marca presente
* Características formales correctas

**Calificación editorial:** ⭐⭐⭐⭐⭐

---

**DIMENSIÓN 9: ADHERENCIA A TIPO DE LIBRO (si aplica)**

Solo si es texto de libro y hay TIPOS_LIBROS como input.

Evaluar:

* Estructura apropiada para el tipo
* Longitud correcta
* Enfoque narrativo adecuado

**Calificación tipo:** ⭐⭐⭐⭐⭐

---

### PASO 3: Evaluación Holística

**3.1 "¿Suena al editor?"**

**Pregunta crítica:** Si le das este texto al editor sin decirle que es de IA, ¿reconocería su propia voz?

**Calificación holística:** ⭐⭐⭐⭐⭐

**Por qué sí / Por qué no:**

* [Explicación detallada]
* [Elementos que lo hacen sonar al editor]
* [Elementos que rompen la ilusión]

**3.2 Comparación con ejemplos del editor:**

Comparar el texto con EDITOR_PROFILE Sección 8 (Ejemplos de Párrafos).

**¿El texto tiene el mismo "sabor"?**

* [Análisis comparativo]
* [Similitudes identificadas]
* [Diferencias identificadas]

**3.3 Evaluación de calidad general:**

Independientemente de si captura el estilo, ¿el texto es bueno?

**Calificación calidad general:** ⭐⭐⭐⭐⭐

**Aspectos a considerar:**

* Claridad de comunicación
* Coherencia narrativa
* Ausencia de errores
* Fluidez de lectura
* Valor informativo/narrativo

---

### PASO 4: Identificación de Problemas Específicos

**4.1 Problemas críticos (deben corregirse):**

Lista priorizada:

1. [Problema crítico 1 con ubicación en texto]
2. [Problema crítico 2 con ubicación en texto]
3. [...]

**Criterios para "crítico":**

* Violación de NO-GOs
* Desviación severa de voz del editor
* Error que rompe la calidad del texto

**4.2 Problemas importantes (deberían corregirse):**

Lista:

1. [Problema importante 1]
2. [Problema importante 2]
3. [...]

**Criterios para "importante":**

* Desviación notable de estilo esperado
* Elemento que mejoraría significativamente el texto

**4.3 Sugerencias de mejora (opcionales):**

Lista:

1. [Sugerencia 1]
2. [Sugerencia 2]
3. [...]

**Criterios para "sugerencia":**

* Refinamiento del estilo
* Optimización narrativa
* Detalles menores

---

### PASO 5: Recomendaciones de Corrección

Para cada problema identificado, proporcionar:

**Problema X:**

* **Ubicación:** [Párrafo/sección específica]
* **Descripción:** [Qué está mal]
* **Razón:** [Por qué es problema según EDITOR_PROFILE]
* **Corrección sugerida:** [Cómo corregirlo específicamente]
* **Ejemplo:** [Antes → Después si es posible]

---

### PASO 6: Calcular Score y Producir EVALUATION_RESULT

#### 6.1 Fórmula de scoring

Convertir las calificaciones de estrella a puntos (1 estrella = 20 pts, 5 estrellas = 100 pts) y aplicar los siguientes pesos:

| Dimensión | Peso |
|-----------|------|
| D1 — Voz y Tono | 20% |
| D2.1 — Párrafos | 5% |
| D2.2 — Sintaxis | 5% |
| D2.3 — Léxico | 5% |
| D3.1 — Inicio | 5% |
| D3.2 — Desarrollo | 5% |
| D3.3 — Cierre | 5% |
| D4 — Transparencia | 5% |
| D5.1 — Recursos literarios | 4% |
| D5.2 — Humor | 3% |
| D5.3 — Ritmo | 3% |
| D6 — Temas y Referencias | 5% |
| D7 — NO-GOs | 20% |
| Eval. Holística ("Suena al editor") | 10% |
| **TOTAL** | **100%** |

Las dimensiones opcionales D8 y D9, si están presentes, sustituyen 5% de D6 cada una (redistribución interna sin cambiar el total). Si no están presentes, D6 mantiene su peso completo.

**Score = Σ (calificación_dimensión_en_puntos × peso)**

#### 6.2 Reglas de determinación de STATUS

| Condición | Status |
|-----------|--------|
| Cualquier NO-GO violado (D7 < 5/5) | RED (independientemente del score) |
| Cualquier problema que impide el uso del texto en workflow | RED |
| Score < 50 sin NO-GOs violados | RED |
| Score 50–74 sin problemas bloqueantes | YELLOW |
| Score ≥ 75 sin problemas bloqueantes y D7 = 5/5 | GREEN |

**El STATUS siempre prevalece sobre el score numérico.** Un score de 72/100 puede coexistir con RED si existe un blocking issue concreto.

#### 6.3 Mapeo de campos

| Análisis interno | Campo EVALUATION_RESULT |
|-----------------|------------------------|
| Problemas críticos que impiden avance | `blocking_issues` (solo en RED) |
| Problemas importantes / sugerencias | `improvement_areas` (solo en YELLOW) |
| Fortalezas del texto | `strengths` (siempre, mínimo 2) |

#### 6.4 Producir el EVALUATION_RESULT

Al final del STYLE_EVALUATION_REPORT, producir obligatoriamente el bloque canónico:

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [instrucción concreta y accionable para el editor]
  blocking_issues:   [...] (obligatorio en RED; [] en GREEN y YELLOW)
  improvement_areas: [...] (obligatorio en YELLOW; [] en GREEN)
  strengths:         [...] (siempre presente, mínimo 2 items)
```

**`decision_guidance`** debe ser una instrucción de acción, no una descripción. Ejemplos:

* `"Procede a la siguiente fase. El capítulo captura correctamente la voz del editor."`
* `"Revisa los 2 puntos de mejora antes de continuar, o asume los gaps si el deadline lo requiere."`
* `"No procedas. Corrige la violación de NO-GO y re-evalúa con EVALUATE_BOOK_STYLE."`

---

## FORMATO DE OUTPUT

### Nombre del Reporte

**Nomenclatura para libros y capítulos:**

```
STYLE_EVALUATION_REPORT_[TIPO]_[NOMBRE]_v[VERSION].md
```

**Ejemplos:**

* `STYLE_EVALUATION_REPORT_SAMPLE_CHAPTER_Cap1_v1.0.md`
* `STYLE_EVALUATION_REPORT_CHAPTER_Cap5_v2.0.md`
* `STYLE_EVALUATION_REPORT_INTRODUCTION_v1.0.md`
* `STYLE_EVALUATION_REPORT_PROLOGO_v1.0.md`
* `STYLE_EVALUATION_REPORT_BOOK_COMPLETE_HistoriaEscrituraAutomatica_v1.0.md`

**Tipos reconocidos:**

* `SAMPLE_CHAPTER`: Capítulo de ejemplo (Fase 2)
* `CHAPTER`: Capítulo individual (Fase 3)
* `INTRODUCTION`: Introducción del libro
* `PROLOGO`: Prólogo del libro
* `BOOK_COMPLETE`: Libro completo
* `EPILOGO`: Epílogo (si aplica)
* Otros capítulos especiales según libro

### Estructura del Reporte

```
# STYLE EVALUATION REPORT

## METADATA

**Texto evaluado:** [Nombre del archivo/texto]
**Tipo de texto:** [Capítulo, Post, Artículo, Libro completo, etc.]
**Versión evaluada:** [v1.0, v2.0, etc.]
**Editor objetivo:** [Nombre del editor]
**Evaluador:** EVALUATE_BOOK_STYLE v1.1
**Fecha de evaluación:** [Fecha]

**Inputs usados en evaluación:**
- EDITOR_PROFILE_[NOMBRE].md
- ESTILO_EDITORIAL_[EDITORIAL].md [Si aplica]
- TIPOS_LIBROS_[EDITORIAL].md [Si aplica]

---

## RESUMEN EJECUTIVO

**Score:** X/100

**Status:** GREEN | YELLOW | RED

**Resumen en 3 frases:**
1. [Lo mejor del texto]
2. [Principal problema si lo hay]
3. [Recomendación principal]

---

## EVALUACIÓN POR DIMENSIONES

### DIMENSIÓN 1: VOZ Y TONO ⭐⭐⭐⭐⭐

**Calificación:** X/5

**Qué funciona bien:**
- [Lista de elementos exitosos con ejemplos]

**Qué necesita ajuste:**
- [Lista de problemas con ejemplos y sugerencias]

**Evidencia del texto:**
> [Cita de ejemplo que ilustra voz y tono]

---

### DIMENSIÓN 2: PREFERENCIAS ESTILÍSTICAS ⭐⭐⭐⭐⭐

**2.1 Párrafos:** X/5

**Qué funciona bien:**
- [...]

**Qué necesita ajuste:**
- [...]

**Evidencia:**
> [Ejemplo de párrafo]

**2.2 Sintaxis:** X/5

[Misma estructura]

**2.3 Léxico:** X/5

[Misma estructura]

---

### DIMENSIÓN 3: NARRATIVA Y ESTRUCTURA ⭐⭐⭐⭐⭐

**3.1 Inicio:** X/5
**3.2 Desarrollo:** X/5
**3.3 Cierre:** X/5

[Para cada uno: Qué funciona + Qué ajustar + Evidencia]

---

### DIMENSIÓN 4: TRANSPARENCIA Y HONESTIDAD ⭐⭐⭐⭐⭐

**Calificación:** X/5

[Qué funciona + Qué ajustar + Evidencia]

---

### DIMENSIÓN 5: ELEMENTOS LITERARIOS ⭐⭐⭐⭐⭐

**5.1 Recursos literarios:** X/5
**5.2 Humor:** X/5
**5.3 Ritmo:** X/5

[Para cada uno: evaluación breve]

---

### DIMENSIÓN 6: TEMAS Y REFERENCIAS ⭐⭐⭐⭐⭐

**Calificación:** X/5

[Evaluación]

---

### DIMENSIÓN 7: NO-GOs ⭐⭐⭐⭐⭐ [CRÍTICO]

**Calificación:** X/5

**NO-GOs violados:** [NINGUNO / Lista de violaciones]

**Si hay violaciones:**
❌ [NO-GO violado 1]
- Ubicación: [Dónde en el texto]
- Evidencia: [Cita del texto]
- Corrección: [Cómo corregir]

[Repetir para cada violación]

---

### DIMENSIÓN 8: ADHERENCIA EDITORIAL ⭐⭐⭐⭐⭐

[Si aplica]

---

### DIMENSIÓN 9: ADHERENCIA AL TIPO ⭐⭐⭐⭐⭐

[Si aplica]

---

## EVALUACIÓN HOLÍSTICA

### "¿Suena al editor?" ⭐⭐⭐⭐⭐

**Calificación:** X/5

**Análisis:**
[Explicación detallada de por qué sí/no suena al editor]

**Comparación con ejemplos del editor:**
[Análisis comparativo con Sección 8 del EDITOR_PROFILE]

### Calidad General del Texto ⭐⭐⭐⭐⭐

**Calificación:** X/5

**Análisis:**
[Evaluación de calidad independiente del estilo]

---

## PROBLEMAS IDENTIFICADOS

### Problemas Críticos (DEBEN corregirse)

**Problema 1: [Título del problema]**
- **Ubicación:** [Párrafo/sección específica]
- **Descripción:** [Qué está mal]
- **Razón:** [Por qué es problema según EDITOR_PROFILE]
- **Corrección:** [Cómo corregir]
- **Ejemplo:**
  - ANTES: "[Texto actual]"
  - DESPUÉS: "[Texto sugerido]"

[Repetir para cada problema crítico]

---

### Problemas Importantes (DEBERÍAN corregirse)

[Misma estructura que críticos]

---

### Sugerencias de Mejora (Opcionales)

[Lista de sugerencias]

---

## FORTALEZAS DEL TEXTO

**Top 3 elementos mejor ejecutados:**
1. [Fortaleza 1 con ejemplo]
2. [Fortaleza 2 con ejemplo]
3. [Fortaleza 3 con ejemplo]

**Párrafos ejemplares:**
> [Cita de párrafo que captura perfectamente el estilo]

**Por qué este párrafo es excelente:**
- [Análisis de por qué funciona]

---

## APÉNDICE: ESTADÍSTICAS DEL TEXTO

**Longitud:**
- Palabras totales: [N]
- Palabras objetivo: [N] (si aplica)
- Diferencia: [±X%]

**Estructura:**
- Párrafos totales: [N]
- Párrafos por sección (promedio): [N]
- Longitud promedio de párrafo: [N palabras]
- Rango de longitud de párrafos: [Min-Max palabras]

**Sintaxis:**
- Longitud promedio de oración: [N palabras]
- Complejidad sintáctica: [Simple/Media/Alta]

**Uso de recursos:**
- Metáforas/analogías: [N]
- Ejemplos concretos: [N]
- Preguntas retóricas: [N]
- Citas: [N]

**NO-GOs:**
- Violaciones detectadas: [N]
- Lista: [Si N>0]

---

## EVALUATION_RESULT

```yaml
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: "[instrucción concreta y accionable para el editor]"
  blocking_issues:
    - issue: "[descripción específica del problema bloqueante]"
      location: "[sección o párrafo del texto]"
      action: "[acción concreta para resolverlo]"
    # Vacío ([]) si status es GREEN o YELLOW
  improvement_areas:
    - area: "[área de mejora]"
      impact: "[efecto en la voz del autor si no se corrige]"
      action: "[acción concreta. Estima tiempo si aplica.]"
    # Vacío ([]) si status es GREEN
  strengths:
    - "[fortaleza 1 — específica y ubicada en el texto]"
    - "[fortaleza 2 — específica y ubicada en el texto]"
    # Mínimo 2 items. Siempre presente incluso en RED.
```

---

**FIN DEL REPORTE**
```

---

## CRITERIOS DE CALIDAD

Un buen STYLE_EVALUATION_REPORT debe:

**✓ Ser específico:**

* NO "El tono no es correcto"
* SÍ "El tono es demasiado formal. El editor usa ironía intelectual frecuentemente (ver EDITOR_PROFILE 1.2) pero este texto es completamente neutral."

**✓ Proporcionar evidencia:**

* Citar ejemplos del texto evaluado
* Referenciar secciones del EDITOR_PROFILE
* Comparar con ejemplos del editor

**✓ Ser procesable:**

* Feedback que se puede implementar
* Sugerencias concretas de corrección
* Ejemplos de "antes/después"

**✓ Ser equilibrado:**

* Identificar qué funciona (no solo problemas)
* Reconocer fortalezas del texto
* Contexto para las críticas

**✓ Priorizar correctamente:**

* NO-GOs = críticos siempre (→ automáticamente RED)
* Desviaciones severas de voz = blocking_issues o improvement_areas según bloqueen o no
* Refinamientos = sugerencias (no en el EVALUATION_RESULT)

**✓ EVALUATION_RESULT consistente:**

* El `status` y el `score` deben ser internamente coherentes con el análisis
* `blocking_issues` solo en RED
* `improvement_areas` solo en YELLOW
* `strengths` siempre, mínimo 2 items

---

## NOTAS IMPORTANTES

### Sobre la Evaluación de Libros Completos

**Cuando se evalúa un libro completo:**

**Enfoque diferente:**

* Evaluar consistencia de estilo entre capítulos
* Identificar deriva de estilo (capítulos posteriores pierden voz)
* Verificar coherencia global

**Estructura del reporte:**

```
## EVALUACIÓN GLOBAL

[Evaluación general del libro completo]

## EVALUACIÓN POR CAPÍTULO

### Capítulo 1: [Título]
[Evaluación breve por dimensión]

### Capítulo 2: [Título]
[Evaluación breve por dimensión]

[...]

## CONSISTENCIA ENTRE CAPÍTULOS

**Deriva de estilo detectada:**
[Capítulos donde el estilo cambia]

**Capítulos más exitosos:**
[Cuáles capturan mejor el estilo]

**Capítulos que necesitan revisión:**
[Cuáles se desvían más]
```

### Sobre Diferentes Tipos de Capítulos y Libros

**Para SAMPLE_CHAPTER:**

* Evaluación **exhaustiva** de todas las dimensiones
* Comparación detallada con EDITOR_PROFILE
* Este texto DEFINE el estilo para el resto → evaluar rigurosamente
* El reporte ayuda a generar el STYLE_GUIDE_LIBRO

**Para CHAPTER individual:**

* Evaluar + comparar con STYLE_GUIDE_LIBRO (generado del SAMPLE_CHAPTER)
* Verificar consistencia con capítulos previos
* Enfoque en coherencia con estilo ya establecido
* Reporte más breve si sigue STYLE_GUIDE correctamente

**Para INTRODUCCIÓN:**

* Se escribe AL FINAL (después de todos los capítulos)
* Evaluar coherencia con el libro completo
* Puede tener tono ligeramente diferente (más panorámico)
* Verificar que contextualiza bien el contenido

**Para PRÓLOGO:**

* Voz MUY personal del editor
* Puede desviarse del estilo de capítulos (intencional)
* Evaluar si captura voz personal del editor
* Verificar que no contradice el estilo del libro

### Sobre Iteraciones

**Primera evaluación (v1.0 del texto):**

* Evaluación completa de todas las dimensiones
* Identificar todos los problemas
* Reporte exhaustivo

**Evaluación de corrección (v2.0 del texto):**

* Enfoque en problemas identificados en v1.0
* Verificar que correcciones funcionaron
* Identificar nuevos problemas (si los hay)
* Reporte más breve centrado en cambios

**Evaluación final:**

* Verificación de que todo está correcto
* Reporte breve de aprobación

---

## TROUBLESHOOTING

**Problema:** El texto es excelente pero no suena al editor
**Solución:**

* Score bajo en holística ("Suena al editor") pero D7 intacto → probablemente YELLOW
* `improvement_areas`: "Texto de alta calidad pero voz del editor poco presente"
* Identificar específicamente qué elementos del EDITOR_PROFILE faltan

**Problema:** El texto suena al editor pero tiene problemas de calidad
**Solución:**

* Score alto en holística pero bajo en otras dimensiones → evaluar si es YELLOW o RED
* `strengths` destacar la voz capturada
* `improvement_areas` o `blocking_issues` los problemas de calidad según severidad

**Problema:** No hay ESTILO_EDITORIAL o TIPOS_LIBROS
**Solución:**

* Evaluar solo con EDITOR_PROFILE
* Marcar dimensiones 8 y 9 como "N/A"
* Enfoque total en voz del editor

**Problema:** Es difícil cuantificar "suena al editor"
**Solución:**

* Leer EDITOR_PROFILE Sección 8 (Ejemplos)
* Comparar "sabor" del texto con ejemplos
* Si tienes dudas → calificación 3/5 → señalar en `improvement_areas`

---

## EJEMPLO DE USO

```
EVALUACIÓN DE: SAMPLE_CHAPTER Cap1 v1.0

INPUTS:
- Texto: SAMPLE_CHAPTER_Cap1_v1.0.md (2,950 palabras)
- EDITOR_PROFILE_MarcoLaucelli.md
- ESTILO_EDITORIAL_TintaArtificial_v1.0.md
- TIPOS_LIBROS_TintaArtificial_v1.2.md (Tipo A)

PROCESO:
1. Leer capítulo completo (primera lectura)
2. Leer con EDITOR_PROFILE abierto (segunda lectura)
3. Evaluar 9 dimensiones con escala de estrellas
4. Calcular score con fórmula ponderada
5. Identificar problemas específicos
6. Calcular STATUS y producir EVALUATION_RESULT canónico

OUTPUT:
STYLE_EVALUATION_REPORT_SAMPLE_CHAPTER_Cap1_v1.0.md

RESULTADO EJEMPLO:
EVALUATION_RESULT:
  status: YELLOW
  score: 63/100
  decision_guidance: "Revisa los 2 puntos de mejora antes de continuar al CHAPTER_2,
    o asume los gaps si el deadline lo requiere. La voz base es correcta."
  blocking_issues: []
  improvement_areas:
    - area: "Ironía intelectual casi ausente"
      impact: "El texto suena más neutro de lo que es característico del editor"
      action: "Añadir 2-3 momentos de ironía sutil en las secciones de análisis"
    - area: "Párrafos de énfasis (una sola frase) inexistentes"
      impact: "Pierde el ritmo staccato que caracteriza al editor en momentos clave"
      action: "Identificar 3-4 afirmaciones centrales y convertirlas en párrafo de una frase"
  strengths:
    - "Metáforas científicas excelentes, características del editor (secciones 2 y 4)"
    - "Primera persona bien sostenida y consistente en todo el capítulo"
```

---

**FIN DEL PROMPT**
