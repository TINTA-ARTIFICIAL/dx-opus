| id | GUIDE_ANNOTATION_PHASE3 |
| type | GUIDE |
| subsystem | RESEARCH |
| version | 1.0 |
| status | ACTIVE |
| created | 2026-03-31 |
| updated | 2026-03-31 |
| owner_chat | research-dev |

## CHANGELOG

| Versión | Fecha | Autor | Resumen |
|---------|-------|-------|---------|
| v1.0 | 2026-03-31 | JM | Versión inicial — guía de anotación para Fase 3 (resuelve GAP-R06) |

## DEPENDENCIAS

```
inputs: [WORKFLOW_RESEARCH_v3.2, PROMPT_SUMMARIZE_REFERENCES_v4.1]
outputs: [ANNOTATED_REFERENCE_SUMMARY, ANNOTATED_RESEARCH_PLAN]
calls: []
```

---

# GUÍA DE ANOTACIÓN — FASE 3

**Para:** Editor  
**Cuándo usarla:** Después de Checkpoint 1 (aprobación de los outputs de Fase 1) y antes de Fase 4 (investigación profunda)  
**Tiempo estimado:** 2–6 horas de trabajo concentrado  
**Sin asistencia de IA:** Esta fase es completamente manual

---

## 1. QUÉ ES LA FASE 3 Y POR QUÉ IMPORTA

La Fase 3 es el momento en que **el editor toma el control** del proceso de investigación. Los documentos producidos por la IA en Fase 1 reflejan lo que dicen las referencias iniciales; tus anotaciones comunican a la IA lo que *tú* necesitas saber, qué priorizar y cómo enfocar la investigación profunda.

Una anotación bien hecha es la diferencia entre una investigación genérica y una investigación que responde exactamente a tu proyecto editorial.

**Lo que aportas en esta fase:**
- Tu criterio sobre qué es central y qué es periférico
- Tus hipótesis y sospechas editoriales
- Las preguntas específicas que la bibliografía inicial no responde
- Tu visión sobre el arco narrativo del proyecto

**Lo que produce esta fase:**
- `ANNOTATED_REFERENCE_SUMMARY` — input para RAMA A (Research Deep Dive)
- `ANNOTATED_RESEARCH_PLAN` — input para RAMA A y RAMA B (Create Research Plan)

---

## 2. LOS TRES DOCUMENTOS DE ENTRADA

Antes de anotar, familiarízate con la estructura canónica de cada documento.

### REFERENCE_SUMMARY (5.000–7.000 palabras)

Análisis profundo de las referencias iniciales. Estructura:

| Sección | Título | Longitud |
|---------|--------|----------|
| 0 | Metadata + Tabla de referencias | — |
| 1 | Executive Synthesis | 400–600 palabras |
| 2 | Thematic Architecture | 1.200–1.800 palabras |
| 3 | Convergence and Divergence Analysis | 1.200–1.500 palabras |
| 4 | Historical Perspective | 800–1.000 palabras |
| 5 | Practical Applications | 800–1.200 palabras |
| 6 | Critical Assessment | 600–800 palabras |
| 7 | Key Actors | 400–600 palabras |
| 8 | Synthesis and Implications | 400–600 palabras |
| 9 | Complete Reference List | — |

**Secciones de mayor interés para anotar:** 2, 3, 5, 7 (las más ricas en contenido anotable). Las secciones 1 y 8 son síntesis —útiles para leer pero raras veces requieren anotaciones.

### RESEARCH_PLAN (3.000–4.000 palabras)

Hoja de ruta orientativa para la investigación. Estructura:

| Sección | Título | Longitud |
|---------|--------|----------|
| 0 | Metadata | — |
| 1 | Foundation Assessment | 600–800 palabras |
| 2 | Gap Analysis | 1.200–1.500 palabras |
| 3 | Field Context | 400–600 palabras |
| 4 | Proposed Research Directions / Lines of Investigation | 1.200–1.600 palabras |
| 5 | Supplementary Source Recommendations | 400–600 palabras |
| 6 | Strategic Recommendations | 200–400 palabras |

**Sección de mayor importancia:** Sección 4 (Research Directions). Es donde defines qué investigar en profundidad y con qué prioridad. El trabajo editorial aquí tiene el mayor impacto downstream.

### NARRATIVE_BRIDGE (1.500–2.000 palabras)

Puente entre investigación y escritura. Estructura:

| Sección | Título | Longitud |
|---------|--------|----------|
| 0 | Metadata | — |
| 1 | Story Arcs Identified | 500–700 palabras |
| 2 | Editorial Angles | 400–600 palabras |
| 3 | Unexpected Connections | 300–400 palabras |

**No se anota directamente.** Se lee para informar las anotaciones en los otros dos documentos y para tomar la decisión editorial de Fase 4 (selección de narrative arc y research focus).

---

## 3. EL SISTEMA DE FLAGS

Usas tres tipos de flags para comunicar instrucciones a la IA. Siempre en mayúsculas seguidas de dos puntos.

---

### FLAG `TASK:` — Solicitar investigación específica

**Qué comunica:** "Necesito que la IA investigue esto en profundidad."

**Cuándo usarlo:**
- Para verificar un claim concreto con datos más recientes
- Para profundizar en un concepto que las referencias tratan superficialmente
- Para buscar casos de estudio o datos cuantitativos
- Para explorar una sub-pregunta específica que surge del análisis

**Formato:**

```
[Texto existente del documento]

TASK: [Instrucción específica y accionable]
```

**Ejemplos correctos:**
```
La adopción de edificios inteligentes aumentó un 45% entre 2019 y 2021 [3].

TASK: Verificar este dato con cifras de 2023–2024. ¿La tasa de crecimiento 
se mantiene, acelera o desacelera?
```

```
LINE 3: Impacto en consumo energético
TASK: Buscar estudios con datos cuantitativos antes/después de implementación
TASK: Identificar si el impacto varía entre retrofit y nueva construcción
```

**Qué hace que un TASK sea bueno:**
- Es específico y accionable (no vago)
- Tiene un objetivo claro: verificar, encontrar, cuantificar, comparar
- Puede responderse con investigación real
- ❌ Mal: `TASK: Investigar más sobre este tema`
- ✅ Bien: `TASK: Encontrar al menos 2 meta-análisis publicados entre 2021–2024 que evalúen el impacto energético de sistemas BMS`

---

### FLAG `LINE:` — Modificar líneas de investigación

**Qué comunica:** Directivas sobre cómo tratar cada línea de investigación del RESEARCH_PLAN.

**Solo se usa en el RESEARCH_PLAN** (Sección 4 principalmente).

**Tipos de directiva LINE:**

| Directiva | Efecto |
|-----------|--------|
| `LINE: PRIORITY HIGH` | Elevamos esta línea como central |
| `LINE: PRIORITY MEDIUM` | Línea relevante, no urgente |
| `LINE: PRIORITY LOW` | Línea interesante pero no prioritaria |
| `LINE: OMIT` | Excluir del scope del proyecto |
| `LINE: Focus on [contexto]` | Restringir el scope geográfico, temporal o temático |
| `LINE: Merge with LINE X` | Combinar con otra línea solapada |
| `LINE: [instrucción libre]` | Cualquier modificación de scope o enfoque |

**Ejemplos:**

```
LINE 2: Experiencia de usuario y satisfacción
LINE: PRIORITY HIGH — Central para mi argumento sobre autonomía
LINE: Focus on European context, exclude US studies
```

```
LINE 5: Marco regulatorio
LINE: OMIT — Fuera del scope de este libro
```

```
LINE 4: Barreras técnicas
LINE: Merge with LINE 6 — se solapan significativamente
LINE: PRIORITY MEDIUM
```

---

### FLAG `COMMENT:` — Proporcionar contexto editorial

**Qué comunica:** Tu perspectiva, hipótesis, experiencia personal o razón editorial para que la IA entienda *por qué* algo importa.

**Cuándo usarlo:**
- Para explicar tu posición en un debate
- Para compartir una hipótesis que quieres que la investigación compruebe
- Para advertir sobre posibles sesgos en las fuentes
- Para dar contexto sobre por qué una sección te parece importante
- Para conectar el tema con tu universo editorial

**Formato:**

```
[Texto existente]

COMMENT: [Tu perspectiva o contexto — puede ser 1-3 frases]
```

**Ejemplos:**

```
El debate sobre automatización total vs. control humano es recurrente [4][7].

COMMENT: Esta tensión entre agencia humana y control algorítmico es el núcleo 
filosófico de mi argumento. Quiero defender que los edificios inteligentes 
deben aumentar, no sustituir, la toma de decisiones humana.
```

```
LINE 2: Factores de aceptación social
COMMENT: Soy escéptico de las afirmaciones optimistas. Mi hipótesis es que 
la satisfacción depende mucho del trade-off control/automatización, 
y que esto está infraestudiado.
```

---

### Regla de señal de criticidad máxima

Cuando un tema está anotado en **ambos documentos** (REFERENCE_SUMMARY y RESEARCH_PLAN), la IA lo interpreta como de máxima prioridad.

```
En REFERENCE_SUMMARY, Sección 3:
"El consumo medio se reduce un 25% con sistemas BMS [5]"
TASK: Verificar con datos 2024 por tipo de edificio

En RESEARCH_PLAN, LINE 3:
LINE: PRIORITY HIGH
TASK: Buscar estudios de caso con datos antes/después
COMMENT: Este es el claim empírico central de mi argumento
```
→ La IA reconoce: verificar este claim es CRÍTICO.

---

## 4. ANOTACIÓN DEL REFERENCE_SUMMARY

### Preparación

1. Crea una copia del REFERENCE_SUMMARY y renómbrala `ANNOTATED_REFERENCE_SUMMARY`
2. Lee el documento completo sin anotar (primera pasada)
3. Marca mentalmente las secciones que generan más preguntas

### Guía sección a sección

**Sección 1 — Executive Synthesis**  
*Lectura rápida, raramente anotas*  
Si el resumen ejecutivo malinterpreta el foco editorial del proyecto, añade:
```
COMMENT: El foco real del proyecto no es X sino Y — tenerlo en cuenta 
para toda la investigación posterior
```

---

**Sección 2 — Thematic Architecture**  
*Alta densidad de anotaciones — lectura activa*

Qué buscar:
- Conceptos clave que las referencias tratan demasiado superficialmente → `TASK: Profundizar en [concepto]`
- Jerarquías temáticas con las que no estás de acuerdo → `COMMENT: En mi marco teórico, [tema A] es más central que [tema B]`
- Conexiones entre subtemas que la IA no ha identificado → `COMMENT: [Tema A] y [Tema C] están relacionados a través de [mecanismo]`

---

**Sección 3 — Convergence and Divergence Analysis**  
*Alta densidad de anotaciones — aquí está la sustancia intelectual*

Qué buscar:
- Claims de consenso que quieres verificar → `TASK: Verificar si este consenso se mantiene en la literatura más reciente (2023–2024)`
- Debates en los que tienes posición → `COMMENT: En este debate me posiciono del lado de [X] por [razón]`
- Contradicciones que el análisis no resuelve → `TASK: Investigar en profundidad la contradicción entre [A] y [B]`
- Voces aisladas que te interesan → `TASK: Profundizar en el trabajo de [autor/institución]`

---

**Sección 4 — Historical Perspective**  
*Anotaciones moderadas*

Qué buscar:
- Períodos históricos con cobertura débil → `TASK: Reforzar información sobre [período] — las referencias actuales son escasas`
- Hitos que faltan en el timeline → `TASK: Verificar si existe documentación sobre [evento/publicación] y cuándo ocurrió exactamente`
- Interpretaciones históricas que cuestionas → `COMMENT: La narrativa de progreso lineal aquí puede estar simplificando — explorar contracorrientes`

---

**Sección 5 — Practical Applications**  
*Media densidad de anotaciones*

Qué buscar:
- Casos de uso relevantes para tu proyecto → `TASK: Buscar más casos documentados de [aplicación] en [contexto]`
- Casos que te parecen excepcionales o poco representativos → `COMMENT: El caso [X] puede ser outlier — verificar si es transferible`
- Aplicaciones que las referencias no cubren pero son relevantes para tu argumento → `TASK: Investigar implementaciones en [sector/región] no cubierto por las referencias actuales`

---

**Sección 6 — Critical Assessment**  
*Lectura importante, pocas anotaciones*

Qué buscar:
- Limitaciones metodológicas que afectan tu argumento → `COMMENT: Esta limitación es relevante para mi tesis — mencionarla explícitamente`
- Sesgos que la IA no ha detectado → `COMMENT: Hay un sesgo de publicación hacia resultados positivos — contrastar con literatura crítica`

---

**Sección 7 — Key Actors**  
*Anotaciones específicas*

Qué buscar:
- Autores o instituciones sobre los que quieres más contexto → `TASK: Investigar en profundidad la trayectoria de [autor] y sus críticos`
- Actores relevantes para tu proyecto que faltan → `TASK: Añadir perfil de [autor/institución] — relevante para mi argumento porque [razón]`
- Conexiones personales o contexto que conoces → `COMMENT: [Autor] tiene vínculos con [institución] que pueden sesgar sus conclusiones`

---

**Sección 8 — Synthesis and Implications**  
*Raramente anotas*  
Si la síntesis omite una implicación que consideras central:
```
COMMENT: Falta una implicación clave: [implicación]. Incluir en la investigación posterior.
```

---

### Densidad objetivo para REFERENCE_SUMMARY

| Tipo de flag | Mínimo | Óptimo |
|--------------|--------|--------|
| TASK: | 5 | 8–12 |
| COMMENT: | 3 | 5–8 |
| **Total anotaciones** | 8 | 13–20 |

---

## 5. ANOTACIÓN DEL RESEARCH_PLAN

### Preparación

1. Crea una copia del RESEARCH_PLAN y renómbrala `ANNOTATED_RESEARCH_PLAN`
2. Lee primero la Sección 4 completa (líneas de investigación propuestas)
3. Evalúa cada línea antes de anotar

### Guía sección a sección

**Sección 1 — Foundation Assessment**  
*Raramente anotas*

Si el assessment de calidad de referencias te parece incorrecto:
```
COMMENT: Las referencias en [área X] son más sólidas/débiles de lo que indica 
este análisis — ajustar prioridades de investigación en consecuencia
```

---

**Sección 2 — Gap Analysis**  
*Lectura crítica — anotaciones cuando detectas discrepancias*

Qué buscar:
- Gaps que el análisis no detectó → `COMMENT: Hay un gap adicional no identificado: [gap]. Es relevante porque [razón]`
- Gaps que te parecen menores pero la IA sobreestima → `COMMENT: Este gap es menos crítico para mi proyecto de lo que sugiere el análisis`
- Gaps que afectan directamente a tu argumento → `COMMENT: Este gap es el núcleo de mi propuesta editorial — máxima prioridad de resolución`

---

**Sección 3 — Field Context**  
*Raramente anotas, excepto si tienes contexto específico*

```
COMMENT: [Institución/autor/revista] tiene relevancia particular en el contexto 
español/europeo que no está reflejada aquí
```

---

**Sección 4 — Proposed Research Directions (SECCIÓN PRINCIPAL)**  
*Alta densidad de anotaciones — el trabajo editorial más importante*

Para CADA línea de investigación propuesta, decide y anota:

**Paso 1: Asignar prioridad**
```
LINE [N]: [Nombre de la línea]
LINE: PRIORITY [HIGH / MEDIUM / LOW / OMIT]
```

**Paso 2: Ajustar scope si es necesario**
```
LINE: Focus on [restricción contextual]
LINE: Exclude [ámbito a excluir]
LINE: Merge with LINE [X]
```

**Paso 3: Añadir TASKs específicos a las líneas prioritarias**

- Líneas HIGH: 2–4 TASKs cada una
- Líneas MEDIUM: 1–2 TASKs
- Líneas LOW: 0–1 TASK

**Paso 4: Añadir contexto editorial (COMMENT)**
```
COMMENT: [Por qué esta línea importa para tu proyecto editorial]
COMMENT: [Tu hipótesis sobre lo que encontrará la investigación]
```

**Ejemplo de anotación completa de una línea:**

```
LINE 3: Impact on energy consumption

LINE: PRIORITY HIGH — Este es el claim empírico central de mi argumento
LINE: Focus on Spanish and EU context — exclude US case studies

TASK: Buscar estudios con datos cuantitativos antes/después (pre/post implementación)
TASK: Identificar si el impacto varía entre retrofit y nueva construcción
TASK: Verificar si existen diferencias significativas por tipo de sistema BMS

COMMENT: Mi hipótesis es que las cifras optimistas (25-35% reducción) corresponden 
a instalaciones nuevas premium, no a retrofit de edificios existentes. 
Esto cambia el argumento de costes/beneficios significativamente.
```

---

**Sección 5 — Supplementary Source Recommendations**  
*Anotaciones rápidas*

- Fuentes recomendadas que conoces y confirmas → `COMMENT: Confirmar — esta fuente es muy relevante`
- Fuentes que ya tienes → `COMMENT: Ya disponible — incorporar como referencia adicional`
- Fuentes adicionales que la IA no ha sugerido → `TASK: Incluir también: [fuente específica o tipo de fuente]`

---

**Sección 6 — Strategic Recommendations**  
*Raramente anotas*

Si la secuencia recomendada no te parece adecuada:
```
COMMENT: Cambiar el orden de investigación — empezar por [línea] porque [razón]
```

---

### Densidad objetivo para RESEARCH_PLAN

| Tipo de flag | Mínimo | Óptimo |
|--------------|--------|--------|
| LINE: (modificaciones) | Todas las líneas evaluadas | — |
| TASK: | 5 | 8–12 |
| COMMENT: | 3 | 5–8 |
| **Total anotaciones** | 8 | 13–18 |

---

## 6. QUÉ HACER CON EL NARRATIVE_BRIDGE

**No creas una copia ni lo anotas directamente.**

El NARRATIVE_BRIDGE te sirve para dos cosas:

**1. Informar tus anotaciones en los otros documentos**

Lee la Sección 1 (Story Arcs) y la Sección 3 (Unexpected Connections) antes de anotar.

- Si un arc resuena fuertemente con tu visión editorial → añade `COMMENT:` en secciones relevantes del REFERENCE_SUMMARY reflejando esa perspectiva narrativa
- Si una conexión inesperada te parece valiosa → crea un `TASK:` en el RESEARCH_PLAN para explorarla

**2. Preparar la decisión de Fase 4**

Después de anotar, usa el NARRATIVE_BRIDGE para decidir:
- ¿Qué narrative arc vas a usar? (una de las opciones de Sección 1, o NEUTRAL)
- ¿Vas a producir un POST o un LIBRO? → esto determina si ejecutas RAMA A, RAMA B, o ambas

**No necesitas formalizar esta decisión ahora** — se toma al inicio de Fase 4.

---

## 7. PROCESO RECOMENDADO

### Bloque 1: Preparación (15 minutos)

1. Crea copias renombradas de los tres documentos
2. Lee el NARRATIVE_BRIDGE completo — sólo lectura, sin anotar
3. Repasa tus notas preliminares del proyecto (si existen)
4. Ten a mano el BOOK_BRIEF si lo tienes

### Bloque 2: Anotación del REFERENCE_SUMMARY (1–2 horas)

1. Primera lectura completa sin anotar (25–30 min)
2. Segunda lectura con anotaciones (45–90 min):
   - Empieza por Sección 2 y Sección 3 (mayor valor)
   - Continúa con Secciones 5 y 7
   - Revisa el resto si tienes observaciones adicionales
3. Revisión rápida de consistencia (10 min)

### Bloque 3: Anotación del RESEARCH_PLAN (1–2 horas)

1. Lee todas las líneas de la Sección 4 de una vez (20 min)
2. Asigna prioridades a todas las líneas (LINE: PRIORITY) (15 min)
3. Añade TASKs y COMMENTs a las líneas HIGH y MEDIUM (45–90 min)
4. Revisa Secciones 2 y 5 (15 min)

### Bloque 4: Verificación y coherencia (30 minutos)

1. ¿Los temas anotados como críticos en REFERENCE_SUMMARY son HIGH en RESEARCH_PLAN?
2. ¿Las hipótesis expresadas en COMMENTs del REFERENCE_SUMMARY tienen TASKs correspondientes?
3. ¿Hay al menos 5 TASKs distribuidos entre los dos documentos?
4. ¿Las líneas OMIT tienen sentido frente a las prioridades editoriales?

---

## 8. CRITERIOS DE CALIDAD

### TASKs bien escritos

| ✅ Correcto | ❌ Incorrecto |
|------------|--------------|
| `TASK: Buscar estudios con datos cuantitativos sobre reducción de consumo energético en retrofit de oficinas, periodo 2020–2024` | `TASK: Investigar más sobre eficiencia energética` |
| `TASK: Verificar si el claim "45% de crecimiento" de [3] se sostiene con datos de 2023` | `TASK: Actualizar estadísticas` |
| `TASK: Encontrar al menos 3 casos documentados de implementación en contexto español o europeo` | `TASK: Añadir ejemplos prácticos` |

### Distribución saludable de flags

- Los TASKs deben estar distribuidos en múltiples secciones, no concentrados todos en una
- Los COMMENTs deben aportar contexto real (hipótesis, posicionamiento, experiencia) — no obviedades
- Las modificaciones LINE deben tener rationale cuando no son evidentes

### Coherencia entre documentos

- Los temas que más TASKs reciben en REFERENCE_SUMMARY deben tener líneas HIGH en RESEARCH_PLAN
- Las hipótesis expresadas en COMMENTs del REFERENCE_SUMMARY deben reflejarse en la orientación de las líneas de investigación

---

## 9. CHECKLIST DE FINALIZACIÓN

Antes de declarar la Fase 3 completa:

**Documentos creados:**
- [ ] ANNOTATED_REFERENCE_SUMMARY creado como copia independiente
- [ ] ANNOTATED_RESEARCH_PLAN creado como copia independiente
- [ ] NARRATIVE_BRIDGE leído (sin anotar)

**ANNOTATED_REFERENCE_SUMMARY:**
- [ ] Sección 2 (Thematic Architecture) anotada
- [ ] Sección 3 (Convergence and Divergence Analysis) anotada
- [ ] Al menos 5 anotaciones totales
- [ ] Al menos 3 TASKs específicos y accionables
- [ ] Los COMMENTs expresan perspectiva real, no obviedades

**ANNOTATED_RESEARCH_PLAN:**
- [ ] Todas las líneas de Sección 4 evaluadas con LINE: PRIORITY
- [ ] Al menos 3 líneas tienen TASKs adicionales
- [ ] Al menos 2 COMMENTs con contexto editorial
- [ ] Las líneas OMIT (si las hay) están claramente justificadas

**Coherencia:**
- [ ] Los temas críticos aparecen en ambos documentos
- [ ] No hay contradicciones entre las directivas de los dos documentos
- [ ] La distribución de prioridades es coherente con el objetivo editorial

**Preparación para Fase 4:**
- [ ] Tengo una idea del narrative arc a usar (o NEUTRAL)
- [ ] Sé si voy hacia POST (RAMA A) o LIBRO (RAMA B)

---

## 10. OUTPUTS DE ESTA FASE

| Artefacto | Descripción | Destino |
|-----------|-------------|---------|
| ANNOTATED_REFERENCE_SUMMARY | REFERENCE_SUMMARY con flags TASK: y COMMENT: del editor | RAMA A (Research Deep Dive) y RAMA B (Create Research Plan) |
| ANNOTATED_RESEARCH_PLAN | RESEARCH_PLAN con flags LINE:, TASK: y COMMENT: del editor | RAMA A y RAMA B |

**Nota:** Estos documentos son artefactos de producción (Google Drive del proyecto), no artefactos del sistema (GitHub). No se versionan en el repositorio.

---

**FIN DE LA GUÍA**
