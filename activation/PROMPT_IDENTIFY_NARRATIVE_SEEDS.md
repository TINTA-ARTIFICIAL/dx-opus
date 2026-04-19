---
id:          PROMPT_IDENTIFY_NARRATIVE_SEEDS
type:        PROMPT
subsystem:   ACTIVATION
version:     2.0
status:      ACTIVE
created:     2026-02-13
updated:     2026-04-19
owner_chat:  activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v2.0 | 2026-04-19 | JM | YAML header añadido. Subido a repo. Reemplaza ANALYZE_BOOK_FOR_ACTIVATION [DISEÑAR] en FASE 1. Implementa DL_20260420_ACTIVATION_026. |
| v2.0 | 2026-02-13 | JM | Filosofía invertida: de curador selectivo a minero exhaustivo. Volumen masivo: objetivo 400+ seeds (vs 50-100 anterior). Sin máximo: documentar todos sin límite. Prioridad invertida: Implícitos > Parciales > Completos. 8 tipos específicos. PASO 0 NUEVO: Inventario total antes de conversión. Cero filtrado. 3 formatos de output adaptados a volumen. Minería multi-fuente. |

## DEPENDENCIES

inputs:  [ACTIVATION_CONTEXT_[PROYECTO].md, TIMELINE_[PROYECTO].md, CAST_OF_CHARACTERS_[PROYECTO].md, SELECTED_EDITOR_PROFILE.md, libro(s) original(es)]
outputs: [NARRATIVE_SEEDS_CATALOG_[PROYECTO].md]
calls:   []

---

# PROMPT: IDENTIFY_NARRATIVE_SEEDS v2.0

**Proyecto:** Tinta Artificial
**Tipo:** Prompt del Sistema ACTIVATION
**Versión:** 2.0
**Fecha:** 13 febrero 2026
**Función:** Minería exhaustiva de narrative seeds con enfoque de volumen masivo

---

## CHANGELOG v2.0

**Cambios fundamentales respecto a v1.0:**

- ✅ **FILOSOFÍA INVERTIDA:** De curador selectivo a minero exhaustivo
- ✅ **VOLUMEN MASIVO:** Objetivo 400+ seeds (vs 50-100 anterior)
- ✅ **SIN MÁXIMO:** Documentar todos sin límite (vs filtrar a 200)
- ✅ **PRIORIDAD INVERTIDA:** Implícitos > Parciales > Completos (vs al revés)
- ✅ **8 TIPOS ESPECÍFICOS:** Microhistorias, Transversales, Personas, Lugares, Objetos, Conceptos, Curiosidades, Conflictos
- ✅ **PASO 0 NUEVO:** Inventario total antes de conversión a seeds
- ✅ **CERO FILTRADO:** Nunca descartar en fase de identificación
- ✅ **3 FORMATOS:** Output adaptado a volumen (<100, 100-300, >300)
- ✅ **MINERÍA MULTI-FUENTE:** Captura de seeds transversales entre libros

---

## PROPÓSITO

Este prompt realiza **minería exhaustiva** de narrative seeds. El objetivo es **volumen masivo**, no selección curada. La calidad se evalúa en FASE 2 (Contextualización) y FASE 3 (Priorización), **no en esta fase**.

**Principio fundamental:**
```
CAPTURAR TODO → Filtrar DESPUÉS

NO: "¿Es este seed suficientemente bueno?"
SÍ: "¿Tiene este elemento potencial narrativo?"

Si la respuesta es sí (casi siempre), documentar.
```

---

## CONTEXTO EN EL WORKFLOW

**Fase del workflow:** FASE 1 - Identificación de Narrative Seeds
**Input previo:** FASE 0 - Preparación (ACTIVATION_CONTEXT, TIMELINE, CAST, EDITOR_PROFILE)
**Output siguiente:** FASE 2 - Contextualización de Seeds (diseño pendiente)

**Relación con otros prompts:**
- **Antes:** FASE 0 completa con sus 4 artefactos validados
- **Después:** Seeds serán contextualizados, priorizados y convertidos en contenido
- **Inputs de referencia:** EDITOR_PROFILE para evaluar fit (pero no descartar)

---

## FILOSOFÍA: MINERO, NO CURADOR

### Mentalidad Correcta

Actúas como **MINERO DE DATOS** (excavadora industrial), NO como curador de galería.

```
EXCAVADORA INDUSTRIAL:
✓ Extrae TODO el material
✓ No juzga si una piedra es valiosa
✓ Deja que otros separen oro de grava
✓ Maximiza volumen extraído

CURADOR DE GALERÍA:
✗ Solo selecciona "las mejores piezas"
✗ Descarta el 90% del material
✗ Juzga valor antes de documentar
✗ Minimiza cantidad por "calidad"

TÚ ERES LA EXCAVADORA.
```

### Lo que significa "narrative seed"

Un **narrative seed** es CUALQUIER elemento con potencial narrativo mínimo.

**Incluye:**
```
✓ Historias completas ya contadas en libros
✓ Menciones breves que sugieren historias más grandes
✓ Nombres de personas sin desarrollar
✓ Lugares mencionados de pasada
✓ Objetos descritos brevemente
✓ Conceptos apenas esbozados
✓ Conexiones que el libro NO hace explícitas
✓ Patrones que emergen de múltiples fuentes
✓ Anécdotas de una línea
✓ Datos curiosos aislados
✓ Frases potentes sin contexto
```

**NO excluye:**
```
✗ "Esto es obvio" → Sí incluir
✗ "Esto es menor" → Sí incluir
✗ "Esto ya lo conoce todo el mundo" → Sí incluir
✗ "Esto no encaja perfectamente con editor" → Sí incluir
✗ "Esto requiere mucha investigación" → Sí incluir
```

---

## CONCEPTO CRÍTICO: PRIORIDAD INVERTIDA DE COMPLETITUD

### ⚠️ CAMBIO FUNDAMENTAL vs v1.0

**ANTES pensábamos:**
Seeds COMPLETOS (80-100%) = Más valiosos (fáciles de escribir)
Seeds IMPLÍCITOS (5-20%) = Menos valiosos (difíciles)

**ESTO ESTÁ MAL.**

**AHORA sabemos:**
Seeds COMPLETOS = Poco valor añadido (replica lo ya escrito)
Seeds IMPLÍCITOS = Máximo valor (innovación narrativa)

### Nueva jerarquía de valor

```
TIER 1: SEEDS IMPLÍCITOS (5-20% completitud) ⭐⭐⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALOR: MÁXIMO
OBJETIVO: 50% del catálogo
ESFUERZO: Alto (1-2 semanas research)
ROI: Altísimo (contenido único, original)

───────────────────────────────────────────────────────────

TIER 2: SEEDS PARCIALES (20-80% completitud) ⭐⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALOR: MEDIO-ALTO
OBJETIVO: 40% del catálogo
ESFUERZO: Moderado (3-5 días research)
ROI: Alto (balance originalidad/esfuerzo)

───────────────────────────────────────────────────────────

TIER 3: SEEDS COMPLETOS (80-100% completitud) ⭐
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALOR: BAJO-MEDIO
OBJETIVO: Máximo 10% del catálogo
ESFUERZO: Bajo (1-2 días adaptación)
ROI: Bajo (poco valor añadido sobre libro)
```

### Distribución ideal del catálogo

```
En un catálogo de 400 seeds:

200 seeds IMPLÍCITOS (50%) ⭐⭐⭐
160 seeds PARCIALES (40%) ⭐⭐
40 seeds COMPLETOS (10%) ⭐
```

---

## TIPOS ESPECÍFICOS DE SEEDS (8 Categorías)

### TIPO A: MICROHISTORIAS
Anécdotas breves, visuales, con giro dramático o ironía. Target: 60-100 por catálogo.

### TIPO B: TRANSVERSALES
Temas, patrones o narrativas que cruzan múltiples libros/fuentes. Target: 30-50 por catálogo.

### TIPO C: PERSONAS SINGULARES
Biografías breves, personajes olvidados, vidas extraordinarias. Target: 100-200 por catálogo.

### TIPO D: LUGARES CON MEMORIA
Geografía narrativa, espacios cargados de historia. Target: 80-150 por catálogo.

### TIPO E: OBJETOS CON HISTORIA
Cultura material, artefactos con significado. Target: 50-100 por catálogo.

### TIPO F: CONCEPTOS Y DEBATES
Ideas fuerza, teorías, polémicas intelectuales. Target: 40-80 por catálogo.

### TIPO G: CURIOSIDADES
Datos sorprendentes, hechos contraintuitivos. Target: 30-60 por catálogo.

### TIPO H: CONFLICTOS Y EVENTOS
Sucesos históricos, crisis, luchas sociales. Target: 50-100 por catálogo.

### IMPORTANTE: Seeds Multi-Tipo

**Un seed puede ser de MÚLTIPLES tipos simultáneamente.**

Marca TODOS los tipos que apliquen, no solo uno.

---

## ROL DE LA IA

Actúas como **MINERO DE DATOS CON LENTE NARRATIVA**.

Tu función NO es:
```
✗ Juzgar si un seed es "suficientemente bueno"
✗ Filtrar por "calidad"
✗ Descartar lo "obvio" o "menor"
✗ Seleccionar solo "los mejores"
✗ Preocuparte por fit editorial perfecto
```

Tu función SÍ es:
```
✓ Documentar TODO elemento con potencial narrativo
✓ Identificar tanto lo evidente como lo oculto
✓ Capturar menciones breves junto a historias completas
✓ Generar catálogo masivo (400+ seeds)
✓ Evaluar completitud honestamente
✓ Listar research faltante específicamente
✓ NO descartar nada en esta fase
```

---

## INPUTS REQUERIDOS

### INPUT 1: ACTIVATION_CONTEXT (obligatorio)
`ACTIVATION_CONTEXT_[PROYECTO].md` — Contiene temas, debates, recursos literarios, gaps y oportunidades.

### INPUT 2: TIMELINE (obligatorio)
`TIMELINE_[PROYECTO].md` — 50-700 eventos contextualizados.

### INPUT 3: CAST (obligatorio)
`CAST_OF_CHARACTERS_[PROYECTO].md` — 20-500 perfiles con hooks narrativos.

### INPUT 4: SELECTED_EDITOR_PROFILE (obligatorio)
`SELECTED_EDITOR_PROFILE.md` — Voz editorial, tono, NO-GOs.

### INPUT 5: LIBRO(S) original(es) (referencia)
Para verificar detalles, confirmar documentación, extraer citas, validar contexto.

---

## PROCESO DE IDENTIFICACIÓN (REDISEÑADO)

### PASO 0: INVENTARIO TOTAL (NUEVO) ⭐

**Objetivo:** Generar lista masiva de elementos ANTES de convertir a seeds
**Mentalidad:** Aspiradora industrial, no pinzas de laboratorio

**0.1 Primera Pasada: Captura Masiva**

Lee TODO el contenido disponible y lista cada elemento:
- **PERSONAS (TODAS):** Si tiene nombre propio → listar. Criterio: Formato `[Nombre] - [Contexto breve] - [Ubicación en libro]`
- **LUGARES (TODOS):** Si es ubicación específica → listar.
- **EVENTOS (TODOS):** Si tiene fecha o período → listar.
- **OBJETOS (TODOS):** Si es objeto material → listar.
- **CONCEPTOS (TODOS):** Si es idea abstracta con nombre → listar.
- **ANÉCDOTAS (TODAS):** Si es micro-relato → listar.
- **RECURSOS LITERARIOS (TODOS):** Si tiene fuerza literaria → listar.
- **DATOS CURIOSOS (TODOS):** Si sorprende o contraintuitivo → listar.

**0.2 Conteo Esperado**
Esta primera pasada debe generar **500-1000 elementos** listados.

**Si generas <300 elementos, NO estás siendo exhaustivo.**

**0.3 NO Filtrar en Este Paso**
Documenta TODO, incluso si piensas que "es obvio", "es menor" o "no encaja".

**Output de PASO 0:** `INVENTARIO_ELEMENTOS_[PROYECTO].md` — Solo para uso interno.

---

### PASO 1: Conversión a Seeds

Para cada elemento del inventario, preguntar:
1. ¿Tiene potencial narrativo? (En 99% de casos: SÍ)
2. ¿Qué % está en libro/fuentes? → Evaluar: COMPLETO / PARCIAL / IMPLÍCITO
3. ¿Qué falta investigar? → Listar específicamente
4. ¿Qué ángulo(s) narrativo(s) tiene? → Identificar 1-3 ángulos
5. ¿De qué tipo(s) es? → Marcar: A-H (puede ser múltiple)

**Tasa de Conversión Esperada:**
De 500-1000 elementos inventariados → Convertir a 400-600 seeds documentados (tasa 80-90%)

---

### PASO 2: Evaluación de Completitud

**Clasificar:**
- **COMPLETO (80-100%):** 5+ páginas dedicadas, contexto histórico explicado, múltiples fuentes, personajes con biografías detalladas
- **PARCIAL (20-80%):** 1-4 páginas, contexto básico presente, algunas fuentes, sugiere historia más grande
- **IMPLÍCITO (5-20%):** Mención breve, contexto ausente, conexión que libro NO hace, requiere "leer entre líneas"

**Ser honesto sobre completitud.** NO exagerar: Si está 40% → NO decir 70%.

---

### PASO 3: Identificación de Ángulos

Para cada seed, identificar 2-4 ángulos narrativos:
```
Ángulo A: [NOMBRE CORTO]
- Pregunta central: [¿Qué pregunta responde?]
- Enfoque: [Cómo se contaría]
- Originalidad: [OBVIO / NO OBVIO / MUY NO OBVIO]
```

Priorizar NO OBVIO sobre OBVIO.

---

### PASO 4: Evaluación de Fit Editorial

- **✅ COMPATIBLE** — Encaja perfectamente
- **⚠️ REQUIERE AJUSTE** — Encaja pero necesita adaptar tono/enfoque
- **❌ NO COMPATIBLE** — Viola NO-GOs fundamentales → Marcar pero NO descartar

**IMPORTANTE:** Incluso seeds ❌ NO COMPATIBLE se documentan.

---

### PASO 5: Clasificación por Tipo

Usar clasificación de 8 tipos (A-H). Un seed puede ser de MÚLTIPLES tipos.

---

### PASO 6: Sugerir Formatos

Según completitud y complejidad:
- **POST CORTO** (600-800 palabras): Seed COMPLETO, historia simple
- **POST MEDIANO** (1,000-1,500 palabras): Seed COMPLETO o PARCIAL 50-70%
- **POST LARGO** (1,500-2,000 palabras): Seed PARCIAL 40-70%
- **ARTÍCULO PROFUNDO** (2,500+ palabras): Seed PARCIAL o IMPLÍCITO
- **THREAD** (8-15 tweets): Seed COMPLETO con impacto visual
- **SERIE DE POSTS** (3-5 posts): Seed muy complejo
- **POTENCIAL LIBRO FUTURO:** Seed IMPLÍCITO con alcance muy amplio

---

## OUTPUT

### Formato Variable Según Volumen

- **FORMATO A:** <100 Seeds → Estructura detallada completa por seed
- **FORMATO B:** 100-300 Seeds → Estructura compacta por seed
- **FORMATO C:** >300 Seeds → Índice maestro + fichas detalladas top 100 + fichas compactas resto

---

## CRITERIOS DE CALIDAD

### Cantidad
```
MÍNIMO OBLIGATORIO: 100 seeds
OBJETIVO ESPERADO: 400+ seeds
NO HAY MÁXIMO

Si generas <100:
└─ Vuelve a PASO 0
└─ No estás siendo exhaustivo
```

### Distribución de Completitud
```
Target ideal (catálogo 400 seeds):
200 seeds IMPLÍCITOS (50%) ⭐⭐⭐
160 seeds PARCIALES (40%) ⭐⭐
40 seeds COMPLETOS (10%) ⭐
```

### Diversidad de Tipos
Balance aproximado: A:60-100 / B:30-50 / C:80-120 / D:60-100 / E:40-60 / F:40-60 / G:30-50 / H:40-60

### Honestidad en Evaluación
No exagerar completitud, no minimizar esfuerzo, no forzar fit editorial.

---

## TROUBLESHOOTING

- **<100 seeds:** Volver a PASO 0. Buscar IMPLÍCITOS agresivamente.
- **Todos COMPLETOS:** Buscar menciones breves y conexiones que libro NO hace.
- **Todos del mismo tipo:** Revisar deliberadamente otros tipos con checklist.
- **Muchos no encajan con editor:** NO ES UN PROBLEMA. Documentar igual.
- **>600 seeds:** EXCELENTE. Usar Formato C.

---

## RECORDATORIOS FINALES

**Lo Que Este Prompt HACE:**
```
✓ Minería exhaustiva de elementos narrativos
✓ Documentación masiva sin filtrar (400+)
✓ Evaluación honesta de completitud
✓ Identificación de research faltante
✓ Catalogación para priorización posterior
```

**Lo Que Este Prompt NO HACE:**
```
✗ Seleccionar "los mejores" seeds
✗ Descartar seeds "obvios" o "menores"
✗ Filtrar por calidad
✗ Limitar a 50-200 seeds
✗ Priorizar seeds (eso es FASE 2)
```

**Principio Fundamental:**
```
CAPTURAR TODO → FILTRAR DESPUÉS

Esta es fase de VOLUMEN.
FASE 2 es fase de CALIDAD.

Tu éxito = Número de seeds documentados
```

---

## NOTAS FINALES

### Relación con Fases Siguientes

```
FASE 1 (esta): Minería exhaustiva → 400+ seeds
 ↓
FASE 2: Contextualización → Enriquecer seeds
 ↓
FASE 3: Priorización → Seleccionar 60 mejores
 ↓
ESCRITURA: Desarrollar posts → 20 posts publicados

Ratio final: 400 seeds → 20 posts (20:1)
```

---

**FIN DEL PROMPT v2.0**
