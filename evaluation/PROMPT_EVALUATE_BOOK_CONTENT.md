---
id:          PROMPT_EVALUATE_BOOK_CONTENT
type:        PROMPT
subsystem:   EVALUATION
version:     1.1
status:      ACTIVE
created:     2026-01-26
updated:     2026-02-22
owner_chat:  evaluation-dev
implements:  RESOURCE_EVALUATION_FRAMEWORK_v1.0
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-02-22 | evaluation-dev | Full content creation. v1.0 was a stub. Adopt evaluation contract (RESOURCE_EVALUATION_FRAMEWORK v1.0). Two-dimension framework: Source Quality + Claim Quality applied to book prose. |
| v1.0 | 2026-01-26 | JM | Stub version. Propósito y estructura definidos, contenido pendiente. |

## DEPENDENCIES
inputs:  [RESOURCE_EVALUATION_FRAMEWORK, WRITING/BOOK_INDEX]
outputs: []
calls:   []

---

# PROMPT: EVALUATE_BOOK_CONTENT

**Propósito:** Evaluar la calidad del contenido de un libro completo o capítulos individuales — rigor de fuentes y solidez de claims en el texto final.
**Contexto:** Sistema D-X-OPUS — Tinta Artificial
**Momento de uso:** Post-escritura, pre-publicación. Puede ejecutarse por capítulo o sobre el libro completo.

---

## PART I: OVERVIEW

### Propósito y alcance

Este prompt evalúa el **contenido del texto escrito** — no la investigación previa (eso es EVALUATE_RESEARCH_REPORT) ni el estilo (eso es EVALUATE_BOOK_STYLE). Evalúa que el libro, tal como quedó redactado, cite bien sus fuentes y no haga afirmaciones que excedan la evidencia presentada.

**Dos dimensiones de evaluación:**

1. **SOURCE QUALITY:** ¿Las fuentes citadas en el texto son autoritativas y están bien usadas?
2. **CLAIM QUALITY:** ¿Los claims del texto están adecuadamente sustentados por las fuentes que los acompañan?

**Output:** EVALUATION_RESULT canónico (según RESOURCE_EVALUATION_FRAMEWORK v1.0) que permite al editor decidir si el libro está listo para publicación o qué secciones necesitan refuerzo.

### Diferencia con EVALUATE_RESEARCH_REPORT

| | EVALUATE_RESEARCH_REPORT | EVALUATE_BOOK_CONTENT |
|---|---|---|
| **Objeto evaluado** | El research report (documento de investigación) | El texto del libro (prosa final) |
| **Momento** | Pre-escritura | Pre-publicación |
| **Dimensiones** | 4 (fuentes, claims, cobertura, metodología) | 2 (fuentes y claims en prosa) |
| **Pregunta central** | ¿La investigación es sólida? | ¿El texto cita bien y no sobreafirma? |

### Cuándo usar este prompt

**Usar cuando:**
- Has completado uno o más capítulos y quieres validar rigor antes de continuar
- Has completado el libro completo y quieres validar antes de publicar
- Vas a generar la ficha técnica del libro (es pre-requisito recomendado)
- El editor sospecha que alguna sección sobreafirma o subcita

**No usar cuando:**
- Quieres evaluar estilo o voz → usa EVALUATE_BOOK_STYLE
- Quieres evaluar la investigación previa → usa EVALUATE_RESEARCH_REPORT
- El texto está en draft muy temprano (sin citas aún)

---

## PART II: INPUTS REQUERIDOS

### 1. Texto a evaluar

Uno de los siguientes:
- Capítulo individual: `CHAPTER_N_vX.md`
- Libro completo: `BOOK_COMPLETE_vX.md`
- Conjunto de capítulos específicos

### 2. BOOK_INDEX (obligatorio)

El índice del libro con estructura de capítulos. Permite:
- Contextualizar cada capítulo dentro del argumento del libro
- Identificar qué secciones son centrales vs. secundarias
- Calibrar el nivel de exigencia por sección

### 3. RESEARCH_REPORTS usados como base (opcional pero recomendado)

Si están disponibles los RESEARCH_REPORTs o RESEARCH_DEEP_DIVEs que sustentaron la escritura:
- Permiten verificar que las citas del texto provienen de fuentes validadas
- Facilitan detectar claims que el texto añadió sin respaldo en la investigación previa

---

## PART III: PROCESO DE EVALUACIÓN

### STEP 0: SETUP

1. Leer el BOOK_INDEX para entender la estructura y el argumento central del libro.
2. Identificar qué capítulos o secciones son **centrales** (donde viven los claims principales del argumento) y cuáles son **secundarios** (contexto, ejemplos, historias).
3. Definir el alcance: ¿se evalúa el libro completo o capítulos específicos?

```
Alcance de evaluación:
- Texto: [nombre del archivo]
- Capítulos evaluados: [todos / lista específica]
- Secciones centrales (alta exigencia): [lista]
- Secciones secundarias (menor exigencia): [lista]
```

---

### STEP 1: SOURCE QUALITY ANALYSIS

**Objetivo:** Evaluar si las fuentes citadas en el texto son apropiadas y están bien usadas.

#### 1.1 Extraer todas las citas del texto

Recorrer el texto e identificar todas las referencias a fuentes:
- Citas explícitas con autor/año: `(García, 2023)`, `[1]`, notas al pie
- Referencias implícitas: "según estudios recientes", "los investigadores señalan"
- Afirmaciones sin cita aparente que deberían tenerla

Crear inventario:
```
## Inventario de Citas

### Capítulo N: [Título]

[C1] (Autor, Año) — p. X — contexto: [para qué claim se usa]
[C2] (Autor, Año) — p. X — contexto: [para qué claim se usa]
[REF-IMPL-1] "según investigadores..." — p. X — sin cita explícita
```

#### 1.2 Clasificar fuentes por Tier

Para cada fuente citada, asignar Tier usando los mismos criterios que EVALUATE_RESEARCH_REPORT:

- **Tier 1:** Peer-reviewed en top quartile, libros académicos con revisión, instituciones de máxima autoridad
- **Tier 2:** Peer-reviewed reputable, industry reports establecidos, actas de conferencias mayores
- **Tier 3:** Periodismo de calidad, blogs de expertos reconocidos, literatura gris de organizaciones creíbles

#### 1.3 Analizar distribución por sección

Calcular distribución de Tiers por sección, diferenciando secciones centrales de secundarias:

```
## Distribución de Fuentes

### Secciones centrales (alta exigencia — umbral: ≥50% Tier 1)
- Sección X: Tier 1: X%, Tier 2: X%, Tier 3: X% → [✓ / ⚠ / ❌]
- Sección Y: ...

### Secciones secundarias (menor exigencia — umbral: ≥30% Tier 1)
- Sección Z: ...

### Overall
- Total fuentes únicas: N
- Tier 1: N (X%)
- Tier 2: N (X%)
- Tier 3: N (X%)
```

#### 1.4 Detectar referencias implícitas sin cita

Identificar afirmaciones que deberían tener cita pero no la tienen:

```
## Referencias implícitas sin citar

[RI-1] "p. X: 'Los estudios muestran que X tiene un impacto del 40%...'"
       → Claim empírico específico sin fuente. Requiere cita.

[RI-2] "p. Y: 'Es ampliamente aceptado que...'"
       → Puede ser legítimo si es consenso obvio. Evaluar caso a caso.
```

**Criterio:** Un dato numérico específico, un estudio concreto o un claim técnico sin cita es siempre un problema. Una afirmación de consenso amplio sin cita puede ser aceptable.

---

### STEP 2: CLAIM QUALITY ANALYSIS

**Objetivo:** Evaluar si los claims del texto están adecuadamente sustentados por las fuentes que los acompañan.

#### 2.1 Identificar y tipificar claims

Recorrer el texto e identificar claims evaluables. Priorizar:
- Todos los claims en capítulos centrales
- Claims del argumento principal (los que el libro "defiende")
- Claims numéricos o estadísticos
- Claims causales ("X causa Y", "gracias a A, ocurrió B")

Tipos de claim:
- **Empírico:** Dato, estadística, resultado de estudio
- **Conceptual:** Definición, caracterización de un fenómeno
- **Causal:** Relación causa-efecto
- **Evaluativo:** Juicio comparativo o de valor sobre enfoques/resultados

```
## Inventario de Claims

### Capítulo N

[CL-1] "La adopción de X creció un 45% entre 2020 y 2023." (p. X)
        Tipo: Empírico | Fuentes: [C1, C3] | Tiers: T1, T2

[CL-2] "Este enfoque es superior al tradicional porque..." (p. Y)
        Tipo: Evaluativo | Fuentes: [C5] | Tiers: T3
```

#### 2.2 Evaluar cada claim

Para cada claim, evaluar tres aspectos:

**A. Suficiencia de evidencia**

| Situación | Evaluación |
|---|---|
| 0 fuentes | ❌ Crítico |
| 1 fuente Tier 1, reciente, específica | ✓ Aceptable |
| 1 fuente Tier 3 sola | ⚠ Débil |
| 2-3 fuentes convergentes, mix Tier 1-2 | ✓ Bueno |
| 3+ fuentes convergentes con Tier 1 | ✓✓ Sólido |

**B. Alineación fuente-claim**

¿La fuente realmente sustenta lo que el texto afirma? Detectar:
- **Sobreafirmación:** El texto afirma más de lo que la fuente dice
- **Descontextualización:** La fuente dice X en un contexto específico, el texto lo generaliza
- **Inversión:** El texto atribuye a la fuente una posición que no tiene

**C. Nivel de confianza apropiado**

¿El texto presenta el claim con el nivel de certeza correcto dada la evidencia?

| Evidencia disponible | Formulación apropiada |
|---|---|
| Múltiples fuentes Tier 1, convergentes | "Los estudios demuestran que..." |
| Mix Tier 1-2, convergentes | "La evidencia sugiere que..." |
| Pocas fuentes o Tier 3 | "Algunos autores apuntan que..." |
| Sin fuentes / opinión | "En mi opinión..." / requiere cita |

#### 2.3 Calcular distribución de calidad de claims

```
## Distribución de Claims

Total claims evaluados: N

Por suficiencia de evidencia:
- Bien sustentados (✓✓ o ✓): N (X%)
- Débiles pero no críticos (⚠): N (X%)
- Sin sustento suficiente (❌): N (X%)

Por alineación fuente-claim:
- Correctamente alineados: N (X%)
- Sobreafirmación detectada: N (X%)
- Descontextualización: N (X%)

Por sección:
- [Sección central A]: X% bien sustentados
- [Sección central B]: X% bien sustentados
- [Sección secundaria C]: X% bien sustentados
```

---

### STEP 3: SÍNTESIS Y SCORING

#### 3.1 Source Quality Score (0-100)

Fórmula:
```
Source Quality Score =
  (% Tier 1 en secciones centrales) × 0.5
  + (% fuentes con cita explícita vs. implícitas) × 0.3
  + (ausencia de fuentes problemáticas o no verificables) × 0.2
```

Interpretación:
- ≥70: BUENO
- 50-69: ADECUADO
- <50: DÉBIL

#### 3.2 Claim Quality Score (0-100)

Fórmula:
```
Claim Quality Score =
  (% claims bien sustentados) × 0.5
  + (% claims correctamente alineados con fuentes) × 0.3
  + (% claims con nivel de confianza apropiado) × 0.2
```

Interpretación: misma escala que Source Quality.

#### 3.3 Overall Score

```
Overall Score = (Source Quality Score × 0.5) + (Claim Quality Score × 0.5)
```

Las dos dimensiones pesan igual porque un texto con buenas fuentes pero claims sobreafirmados es tan problemático como uno con claims moderados pero fuentes débiles.

#### 3.4 Determinar status

| Condición | Status |
|---|---|
| Overall ≥70 y ningún blocking issue | GREEN |
| Overall 50-69 y ningún blocking issue | YELLOW |
| Overall <50 | RED |
| Cualquier overall + blocking issue presente | RED |

**Blocking issues que fuerzan RED:**
- Claims centrales del argumento del libro sin ninguna fuente
- Sobreafirmación sistemática (>20% de claims centrales)
- Fuentes Tier 1 ausentes en secciones que sostienen el argumento principal
- Uso de una fuente que contradice el claim que supuestamente sustenta

---

## PART IV: EVALUATION_RESULT CANÓNICO

Al finalizar los Steps 0-3, producir el EVALUATION_RESULT según RESOURCE_EVALUATION_FRAMEWORK v1.0:

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             [Overall Score]/100
  decision_guidance: [instrucción directa para el editor]
  blocking_issues:   [vacío si GREEN o YELLOW]
  improvement_areas: [vacío si GREEN]
  strengths:         [mínimo 2 items, siempre]
```

**Guía para `decision_guidance`:**

- GREEN: "El libro está listo en términos de rigor de contenido. Procede a publicación."
- YELLOW: "El libro tiene [N] áreas de mejora en [secciones X, Y]. Puedes publicar asumiendo esos gaps o invertir [estimación] en refuerzo. Decide según deadline."
- RED: "No procedas. Hay [N] problema(s) que afectan la credibilidad del argumento central. Corrígelos y re-evalúa."

---

## PART V: EVALUACIÓN DE LIBRO COMPLETO VS. CAPÍTULO INDIVIDUAL

### Capítulo individual

- Evaluar Steps 1-3 sobre el capítulo.
- Contextualizar en el argumento del libro usando BOOK_INDEX.
- Indicar en el EVALUATION_RESULT si el capítulo es central o secundario en el argumento global.

### Libro completo

- Evaluar Steps 1-3 por capítulo.
- Agregar scores: Overall Score = promedio ponderado (secciones centrales × 0.6 + secundarias × 0.4).
- Producir un EVALUATION_RESULT único para el libro.
- En `improvement_areas`, indicar capítulo y ubicación específica.

### Evaluación incremental (capítulo a capítulo durante escritura)

Si se evalúa cada capítulo al terminarlo:
- Mantener un registro acumulativo de claims débiles y fuentes problemáticas.
- Al evaluar el libro completo, reutilizar evaluaciones anteriores y enfocarse en secciones modificadas.

---

## PART VI: LIMITACIONES DE ESTE EVALUADOR

**Evalúa:**
- ✓ Presencia y calidad de fuentes citadas en el texto
- ✓ Suficiencia de evidencia para cada claim
- ✓ Alineación entre lo que dice la fuente y lo que afirma el texto
- ✓ Nivel de certeza apropiado dado la evidencia

**No evalúa:**
- ✗ Exactitud de las citas (asume que las citas son correctas)
- ✗ Calidad de escritura o narrativa → EVALUATE_BOOK_STYLE
- ✗ Solidez de la investigación previa → EVALUATE_RESEARCH_REPORT
- ✗ Alineación con la voz del autor → EVALUATE_BOOK_STYLE

---

**FIN DEL PROMPT**
