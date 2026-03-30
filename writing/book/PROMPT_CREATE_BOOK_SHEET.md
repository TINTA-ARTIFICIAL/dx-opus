# CREATE_BOOK_SHEET v1.1

**Proyecto:** Tinta Artificial  
**Tipo:** Prompt del Sistema  
**Versión:** 1.1  
**Fecha:** 26 enero 2026  
**Función:** Generar ficha técnica del libro con métricas estadísticas

---

## CHANGELOG v1.1

**Cambios desde v1.0:**
- ✓ Separado proceso de evaluación (ahora usa EVALUATE_BOOK_CONTENT como prerequisito)
- ✓ Texto narrativo de la ficha se escribe en ESTILO_EDITORIAL
- ✓ Evaluadores son prompts independientes que se invocan
- ✓ Simplificado proceso (ya no incluye evaluación, solo usa resultados)

---

## PROPÓSITO

Generar la **Ficha Técnica** del libro, que incluye:
1. **Metadata básico** (título, editor, IA, fechas)
2. **Resumen de evaluaciones** (de reportes ya generados)
3. **Métricas estadísticas** de autoría y generación
4. **Transparencia** sobre el proceso de creación

**Texto narrativo en ESTILO_EDITORIAL** (no estilo del libro).

**Este es el ÚLTIMO paso** - requiere que todo lo demás esté completado.

---

## PRE-REQUISITOS CRÍTICOS

**Antes de ejecutar este prompt, VERIFICAR:**

```
VERIFICACIÓN DE COMPLETITUD:

CAPÍTULOS:
[ ] Todos los capítulos finalizados (versiones FINAL o FINAL_EDITED)
[ ] Introducción: COMPLETADA
[ ] Prólogo: COMPLETADO (o N/A)
[ ] Anexos: COMPLETADOS (o N/A)

CONSOLIDACIÓN:
[ ] Referencias: CONSOLIDADAS
[ ] Cronología: GENERADA
[ ] Cast of Characters: GENERADO

EVALUACIONES:
[ ] EVALUATE_BOOK_STYLE ejecutado → Reporte disponible
[ ] EVALUATE_BOOK_CONTENT ejecutado → Reporte disponible

ESTADO: ✅ LISTO PARA GENERAR FICHA TÉCNICA
```

**Si faltan evaluaciones:**
```
⚠️ EVALUACIONES REQUERIDAS NO ENCONTRADAS

Este prompt REQUIERE que se hayan ejecutado previamente:
- EVALUATE_BOOK_STYLE v1.0
- EVALUATE_BOOK_CONTENT v1.0

Por favor ejecuta ambos evaluadores antes de continuar.

¿Quieres que los ejecute ahora? [S/N]
```

---

## INPUTS REQUERIDOS

### INPUT 1: Libro Completo

Todos los capítulos finalizados (versiones canónicas)

### INPUT 2: Referencias Consolidadas

REFERENCIAS_FINAL.md

### INPUT 3: Cronología y Cast

CRONOLOGIA_FINAL.md  
CAST_FINAL.md

### INPUT 4: Reportes de Evaluación

**STYLE_EVALUATION_REPORT_BOOK_COMPLETE.md**
- Generado por EVALUATE_BOOK_STYLE v1.0
- Contiene calificación de estilo del libro

**CONTENT_EVALUATION_REPORT_BOOK_COMPLETE.md**
- Generado por EVALUATE_BOOK_CONTENT v1.0
- Contiene calificación de contenido del libro

### INPUT 5: ESTILO_EDITORIAL

**ESTILO_EDITORIAL_TINTA_ARTIFICIAL.md**
- Define el estilo para texto narrativo de la ficha
- **IMPORTANTE:** NO usar estilo del libro, usar estilo editorial

---

## PROCESO DE GENERACIÓN (2 FASES)

### FASE 1: CÁLCULO DE MÉTRICAS ESTADÍSTICAS

**PASO 1A: Métricas de Generación**

Calcular porcentajes de generación IA vs Editor.

**Metodología:**

1. **Contar palabras totales del libro:**
   - Todos los capítulos finalizados
   - Introducción, Prólogo (si existe), Anexos

2. **Identificar texto generado por IA:**
   - Capítulos con versión FINAL (sin editar): 100% IA
   - Introducción FINAL (si IA la escribió): 100% IA
   - Anexos FINAL (si IA los escribió): 100% IA

3. **Identificar texto escrito por editor:**
   - Prólogo: Típicamente 100% editor
   - Capítulos con versión FINAL_EDITED: Estimar según nivel de edición

4. **Estimación para FINAL_EDITED:**

Para cada capítulo FINAL_EDITED, el editor debe haber indicado nivel de edición:
- **Ediciones menores** (≤20%): 80% IA, 20% editor
- **Ediciones significativas** (20-50%): 60% IA, 40% editor
- **Ediciones mayores** (>50%): 30% IA, 70% editor
- **Reescritura completa**: 0% IA, 100% editor

Si no hay indicación, usar valor conservador: 70% IA, 30% editor

5. **Calcular totales:**

```
Total palabras del libro: N

Por método de generación:
- IA: M palabras (X%)
- Editor: P palabras (Y%)

Donde: M + P = N
```

**Output:**

```markdown
MÉTRICAS DE GENERACIÓN

Total de palabras en el libro: [N]

Por método de generación:
- Texto generado algorítmicamente (IA): [X%] ([M] palabras)
- Texto escrito directamente por editor: [Y%] ([P] palabras)

Por componente:
- Capítulos centrales: [X%] IA, [Y%] editor
- Introducción: [X%] IA, [Y%] editor  
- Prólogo: [X%] IA, [Y%] editor
- Anexos: [X%] IA, [Y%] editor

Intención y decisiones: 100% humanas
- Estructura narrativa: 100% editor
- Selección de contenido: 100% editor
- Decisiones editoriales: 100% editor
- Validación final: 100% editor
```

---

**PASO 1B: Atribución a Autores de Fuentes**

Calcular influencia estadística de cada autor citado.

**Metodología:**

1. De REFERENCIAS_FINAL.md, extraer todos los autores únicos

2. En todos los capítulos, contar cuántas veces se cita cada autor

3. Calcular porcentaje: (citas_autor / total_citas) × 100

4. Clasificar:
   - Alta influencia: >5% de citas
   - Media influencia: 2-5% de citas  
   - Baja influencia: <2% de citas

**IMPORTANTE:**  
Esta es una métrica estadística de **influencia** (qué fuentes se usaron más), NO es atribución legal de autoría. Todo el texto es original con citas apropiadas.

**Output:**

```markdown
ATRIBUCIÓN ESTADÍSTICA A AUTORES DE FUENTES

Metodología: Frecuencia de citas (proxy de influencia)

Total autores citados: [N]
Total citas en el libro: [M]

AUTORES CON ALTA INFLUENCIA (>5% de citas):

| Autor(es)          | Citas | % total | Obras citadas |
|--------------------|-------|---------|---------------|
| [Autor 1]          | [N]   | [X.X%]  | [N]           |
| [Autor 2]          | [N]   | [X.X%]  | [N]           |
[...]

AUTORES CON MEDIA INFLUENCIA (2-5% de citas):
[Lista]

AUTORES CON BAJA INFLUENCIA (<2% de citas):
[N] autores adicionales

DISTRIBUCIÓN POR DÉCADA:

| Década     | Autores | Citas | % |
|------------|---------|-------|---|
| 2020s      | [N]     | [M]   | [X%] |
| 2010s      | [N]     | [M]   | [X%] |
| [...]

Nota: Esta tabla representa influencia estadística basada en
frecuencia de citas, NO porcentaje de texto atribuible. Todo el
texto es original y sintetizado con citas apropiadas.
```

---

**PASO 1C: Métricas del Proceso**

```markdown
MÉTRICAS DEL PROCESO DE CREACIÓN

ESTRUCTURA:
- Capítulos centrales: [N]
- Capítulos especiales: [N]
- Total palabras: [M]
- Promedio palabras/capítulo: [X]

FUENTES:
- Referencias totales: [N]
- Autores únicos: [M]
- Papers peer-reviewed: [X] ([Y%])
- Libros académicos: [X] ([Y%])
- Otras fuentes: [X] ([Y%])

CRONOLOGÍA:
- Fecha inicio: [Fecha]
- Fecha finalización: [Fecha]
- Duración: [N días/semanas]

ITERACIONES:
- Capítulos con 1 iteración: [N]
- Capítulos con 2 iteraciones: [M]
- Capítulos con 3+ iteraciones: [P]
- Promedio iteraciones: [X]

EDICIONES MANUALES:
- Capítulos sin edición (FINAL): [N]
- Capítulos con edición (FINAL_EDITED): [M]
- Porcentaje editado manualmente: [X%]

EVALUACIONES:
- Calificación estilo: [X.X/5.0 ⭐]
- Calificación contenido: [X.X/5.0 ⭐]
- Calificación global: [X.X/5.0 ⭐]
```

---

### FASE 2: REDACCIÓN DE LA FICHA TÉCNICA

**IMPORTANTE:** Todo el texto narrativo se escribe en **ESTILO_EDITORIAL**, NO en el estilo del libro.

**Características del ESTILO_EDITORIAL:**
- Profesional pero accesible
- Objetivo y factual
- Transparente sin ser defensivo
- Prosa clara y directa
- Puede usar listas/tablas donde apropiado

**PASO 2A: Documento Completo (FICHA_TECNICA_FINAL.md)**

```markdown
# FICHA TÉCNICA

## INFORMACIÓN BÁSICA

**Título:** [Título completo del libro]

**Editor:** [Nombre del editor]

**Inteligencia Artificial:**  
Claude Sonnet 4.5 (Anthropic)

**Versión:** v1.0

**Fecha de publicación:** [Fecha]

---

## ESTRUCTURA DEL LIBRO

El libro consta de [N] capítulos centrales que desarrollan [descripción
del tema], complementados por [descripción de capítulos especiales].
La estructura sigue [tipo de libro según TIPOS_LIBROS].

**Componentes:**
- Capítulos centrales: [N]
- Introducción
- [Prólogo - si existe]
- [Anexos - si existen]
- Cronología
- Cast of Characters
- Referencias

**Extensión total:** [N] palabras  
**Páginas estimadas:** [Estimación según formato]

---

## METODOLOGÍA DE CREACIÓN

### El Sistema Tinta Artificial

Este libro fue creado mediante el Sistema Tinta Artificial, una
metodología de colaboración humano-IA diseñada para producir libros
de alta calidad académica manteniendo el control editorial humano en
todas las decisiones críticas.

El proceso integra la capacidad de síntesis y escritura de sistemas
de IA de última generación con la visión editorial, el juicio crítico
y la expertise temática del editor humano.

### Fases del Proceso

**1. Investigación**

Se analizaron [N] fuentes académicas y técnicas, incluyendo papers
peer-reviewed, libros académicos, reportes técnicos y documentación
oficial. Las fuentes fueron seleccionadas según criterios de autoridad
académica y relevancia temática.

**2. Planificación**

El editor diseñó la estructura narrativa completa del libro, definiendo
el arco narrativo, la distribución de contenido, y las conexiones entre
capítulos. Este índice estructural guió todo el proceso de escritura
posterior.

**3. Escritura**

Cada capítulo fue generado mediante un proceso iterativo de escritura
por IA y validación editorial. La IA sintetizó el contenido de las
fuentes asignadas siguiendo el estilo editorial definido. El editor
revisó cada capítulo, solicitó correcciones cuando fue necesario, y en
algunos casos editó manualmente el texto final.

**4. Validación**

Cada capítulo fue evaluado sistemáticamente en dos dimensiones: estilo
(coherencia con la voz editorial) y contenido (calidad de fuentes y
sustentación de claims). Solo los capítulos que cumplieron los
estándares de calidad establecidos fueron aprobados.

**5. Consolidación**

Las referencias fueron consolidadas y verificadas, se generó la
cronología de eventos clave, y se compilaron los perfiles de
personas e instituciones relevantes.

### Distribución de Autoría

**Generación de texto:**
- Texto generado algorítmicamente: [X%]
- Texto escrito directamente por el editor: [Y%]

Esta distribución refleja quién escribió materialmente el texto, pero
no captura completamente el proceso de creación. Todas las decisiones
sobre qué escribir, cómo estructurarlo, qué fuentes usar, y qué
enfoque adoptar fueron 100% humanas.

**Decisiones editoriales:**
- Estructura narrativa: 100% humana
- Selección de contenido: 100% humana
- Enfoque y perspectiva: 100% humana
- Validación de calidad: 100% humana

**Edición manual:**

De los [N] capítulos centrales:
- [M] capítulos fueron aprobados sin edición manual
- [P] capítulos fueron editados manualmente por el editor antes de su
  aprobación final

Los capítulos editados manualmente incluyen correcciones de precisión,
ajustes de tono, mejoras de claridad y modificaciones de énfasis según
el juicio editorial.

### Transparencia del Proceso

**Iteraciones:**

El proceso iterativo permitió refinar cada capítulo hasta alcanzar el
estándar de calidad deseado:

- Capítulos escritos en primera iteración: [N]
- Capítulos que requirieron segunda iteración: [M]
- Capítulos con tres o más iteraciones: [P]

Promedio de iteraciones por capítulo: [X]

**Control de calidad:**

Todo el libro fue sometido a evaluación sistemática:

- **Evaluación de estilo:** Verificó la consistencia de la voz editorial,
  la calidad narrativa, y la coherencia del tono a lo largo del libro.
  Calificación obtenida: [X.X/5.0 ⭐]

- **Evaluación de contenido:** Validó la calidad de las fuentes citadas,
  la adecuada sustentación de afirmaciones factuales, la coherencia de
  datos y fechas, y el balance en la presentación de perspectivas.
  Calificación obtenida: [X.X/5.0 ⭐]

---

## FUENTES Y REFERENCIAS

### Distribución General

El libro se sustenta en [N] referencias provenientes de [M] autores
únicos. La selección de fuentes priorizó trabajos académicos de alta
calidad y fuentes primarias autoritativas.

**Por tipo de fuente:**
- Papers académicos peer-reviewed: [N] ([X%])
- Libros académicos: [N] ([X%])
- Reportes técnicos: [N] ([X%])
- Documentación oficial: [N] ([X%])
- Artículos periodísticos: [N] ([X%])
- Otras fuentes: [N] ([X%])

**Por período:**
- Últimos 5 años (2021-2026): [N] ([X%])
- 2015-2020: [N] ([X%])
- 2010-2014: [N] ([X%])
- Anteriores a 2010: [N] ([X%])

### Autores Más Citados

Los siguientes autores fueron particularmente influyentes en el
desarrollo del contenido del libro, según la frecuencia con que
sus trabajos fueron citados:

**Top 10 por frecuencia de citas:**

1. [Autor] - [N] citas ([X.X%] del total)
2. [Autor] - [N] citas ([X.X%] del total)
3. [Autor] - [N] citas ([X.X%] del total)
[...]

Esta métrica representa la influencia de cada fuente en el desarrollo
del contenido, no un porcentaje de texto atribuible. Todo el contenido
del libro es original y sintetizado, con las citas bibliográficas
apropiadas a cada afirmación factual.

[Ver tabla completa de atribución en Anexo Estadístico]

---

## EVALUACIÓN DE CALIDAD

### Estilo

El libro fue evaluado sistemáticamente en nueve dimensiones de estilo:

- Voz y tono
- Claridad y precisión
- Estructura y flujo narrativo
- Engagement del lector
- Técnica narrativa
- Equilibrio tonal
- Gestión de complejidad técnica
- Integración de referencias
- Consistencia entre capítulos

**Calificación general de estilo:** [X.X/5.0 ⭐]

**Estado:** [APROBADO / APROBADO CON NOTAS]

[Si hay notas importantes del reporte de estilo, incluirlas brevemente]

### Contenido

El libro fue evaluado en cuatro dimensiones de calidad de contenido:

**Calidad de fuentes:** [X/5.0 ⭐]  
[Breve comentario sobre distribución de fuentes por tier]

**Sustentación de claims:** [X/5.0 ⭐]  
[Breve comentario sobre porcentaje de claims citados]

**Coherencia factual:** [X/5.0 ⭐]  
[Breve comentario sobre verificación de fechas, nombres, datos]

**Balance y representación:** [X/5.0 ⭐]  
[Breve comentario sobre perspectivas múltiples]

**Calificación general de contenido:** [X.X/5.0 ⭐]

**Estado:** [APROBADO / APROBADO CON NOTAS]

[Si hay consideraciones importantes del reporte de contenido, incluirlas]

---

## LIMITACIONES Y CONSIDERACIONES

### Alcance Temporal

Este libro cubre el estado del conocimiento hasta [fecha de la fuente
más reciente]. Desarrollos en el campo posteriores a esta fecha no
están reflejados en el contenido.

### Perspectiva Editorial

[Descripción breve de la perspectiva adoptada, sesgos conocidos,
limitaciones de cobertura]

### Fuentes

[Nota sobre disponibilidad de fuentes, idiomas consultados,
restricciones de acceso si son relevantes]

---

## INFORMACIÓN ADICIONAL

**Contacto:** [Email del editor / Website]

**Licencia:** [Información de licencia]

**Cómo citar este libro:**

[Formato de citación sugerido en estilo apropiado]

**Repositorio:** [Si el proceso está documentado públicamente]

---

## ANEXO: ESTADÍSTICAS DETALLADAS

### Tabla Completa de Atribución por Autor

[Tabla completa de todos los autores con sus citas]

### Métricas por Capítulo

| Capítulo | Palabras | Citas | Iteraciones | % IA | % Editor |
|----------|----------|-------|-------------|------|----------|
| Intro    | [N]      | [M]   | [X]         | [Y%] | [Z%]     |
| Cap 1    | [N]      | [M]   | [X]         | [Y%] | [Z%]     |
[...]

### Distribución de Fuentes

[Tabla o descripción de qué fuentes se usaron en qué capítulos]

---

**Versión de la Ficha Técnica:** 1.0  
**Generado:** [Fecha]  
**Herramienta:** CREATE_FICHA_TECNICA v1.1

**FIN DE LA FICHA TÉCNICA**
```

---

**PASO 2B: Versión Abreviada para el Libro (SOBRE_ESTE_LIBRO.md)**

**Características:**
- 400-600 palabras
- ESTILO_EDITORIAL (profesional, accesible, transparente)
- Prosa narrativa (no listas/bullets)
- Para incluir al final del libro publicado

```markdown
# SOBRE ESTE LIBRO

Este libro fue creado utilizando el Sistema Tinta Artificial, una
metodología de colaboración humano-IA desarrollada específicamente
para la producción de libros académicos y de divulgación de alta calidad.

El proceso comenzó con el análisis exhaustivo de [N] fuentes académicas
y técnicas, incluyendo papers peer-reviewed, libros especializados y
documentación oficial. A partir de esta base documental, el editor diseñó
la estructura narrativa completa del libro, definiendo el arco argumental,
la distribución de contenidos y las conexiones entre capítulos.

La escritura se realizó mediante un proceso iterativo: el sistema de
inteligencia artificial (Claude Sonnet 4.5, de Anthropic) sintetizó el
contenido de las fuentes siguiendo el estilo editorial definido, y el
editor humano revisó cada capítulo, solicitando correcciones cuando fue
necesario. [M de N] capítulos fueron editados manualmente antes de su
aprobación final.

En términos de autoría material del texto, aproximadamente el [X%] fue
generado algorítmicamente y el [Y%] fue escrito directamente por el editor.
Sin embargo, todas las decisiones críticas—qué incluir, cómo estructurarlo,
qué perspectiva adoptar, qué fuentes usar—fueron 100% humanas. La
inteligencia artificial funcionó como una herramienta de síntesis y
escritura bajo supervisión editorial constante.

El libro fue sometido a evaluación sistemática de calidad antes de su
publicación. Se verificó la consistencia del estilo editorial, la calidad
de las fuentes citadas, la adecuada sustentación de afirmaciones factuales,
y la coherencia de fechas, nombres y datos a lo largo de todo el texto.
La evaluación de estilo obtuvo una calificación de [X.X/5.0] y la
evaluación de contenido una calificación de [X.X/5.0].

Las [N] referencias que sustentan el libro fueron cuidadosamente
seleccionadas priorizando fuentes académicas de alta calidad: [X%]
corresponden a papers peer-reviewed y libros académicos. Los trabajos
más frecuentemente citados incluyen [mencionar 2-3 autores top].

[Opcional: Párrafo sobre limitaciones reconocidas del alcance o
perspectiva del libro]

Para información técnica completa sobre el proceso de creación,
incluyendo métricas detalladas y evaluaciones de calidad, consultar
la Ficha Técnica incluida en este volumen.

---

**Inteligencia Artificial:** Claude Sonnet 4.5 (Anthropic)  
**Editor:** [Nombre del editor]  
**Versión:** v1.0  
**Fecha:** [Fecha de publicación]

**FIN**
```

---

## FORMATO DE OUTPUT

**La IA genera DOS documentos:**

1. **FICHA_TECNICA_FINAL.md**
   - Documento técnico completo
   - Todas las métricas y tablas
   - Estilo: EDITORIAL (profesional, objetivo, factual)
   - Para: Referencia completa

2. **SOBRE_ESTE_LIBRO.md**
   - Versión abreviada (400-600 palabras)
   - Estilo: EDITORIAL (accesible, transparente)
   - Prosa narrativa fluida
   - Para: Incluir al final del libro publicado

**Ambos en ESTILO_EDITORIAL, NO en estilo del libro.**

---

## VALIDACIÓN DEL EDITOR

**Editor revisa:**

1. **Exactitud de métricas:**
   - ¿Porcentajes de generación correctos?
   - ¿Conteos de palabras/citas exactos?
   - ¿Datos verificados?

2. **Resúmenes de evaluaciones:**
   - ¿Refleja bien los reportes?
   - ¿Calificaciones correctas?

3. **Texto narrativo:**
   - ¿Estilo editorial apropiado?
   - ¿Tono profesional pero accesible?
   - ¿Transparente sin ser defensivo?
   - ¿Información clara y precisa?

**Decisión:**

✅ **APROBAR:** Ficha técnica exacta y bien escrita  
⚠️ **CORREGIR:** Ajustar métricas o texto  
❌ **RECHAZAR:** Problemas fundamentales

---

## INTEGRACIÓN EN EL LIBRO FINAL

```
LIBRO_[TITULO]_FINAL/
  ├─ 00_PROLOGO.md
  ├─ 01_INTRODUCCION.md
  ├─ 02_CAPITULO_01.md
  ├─ ...
  ├─ 13_CAPITULO_12.md
  ├─ 14_REFERENCIAS.md
  ├─ 15_CRONOLOGIA.md
  ├─ 16_PERSONAJES.md
  ├─ 17_SOBRE_ESTE_LIBRO.md      ← SIEMPRE incluir
  ├─ 18_FICHA_TECNICA.md          ← OPCIONAL (ed. académicas)
  └─ [Anexos]
```

**Recomendación:**
- **SOBRE_ESTE_LIBRO.md:** SIEMPRE (transparencia básica)
- **FICHA_TECNICA.md:** OPCIONAL (ediciones técnicas/académicas)

---

## CRITERIOS DE CALIDAD

Una buena ficha técnica debe:

**✓ Ser exacta:** Todos los números verificados
**✓ Ser transparente:** Información clara sobre uso de IA
**✓ Ser completa:** Todas las métricas relevantes
**✓ Estar bien escrita:** ESTILO_EDITORIAL apropiado
**✓ Ser útil:** Información que el lector quiere saber
**✓ Ser honesta:** Reconocer limitaciones apropiadamente

---

## NOTAS IMPORTANTES

### Sobre Evaluadores Independientes

**EVALUATE_BOOK_STYLE** y **EVALUATE_BOOK_CONTENT** son prompts independientes.

**Se pueden usar sin crear ficha técnica:**
- Evaluación pre-publicación de calidad
- Auditoría de contenido
- Identificación de problemas

**Este prompt los REQUIERE:**
- No se puede crear ficha sin evaluaciones previas
- Usa los reportes ya generados
- No duplica el proceso de evaluación

### Sobre el Estilo Editorial

**CRÍTICO:** Todo el texto narrativo de la ficha usa **ESTILO_EDITORIAL**.

**NO usar:**
- Estilo del libro (voz del editor del libro)
- Estilo académico formal
- Estilo demasiado técnico

**SÍ usar:**
- Prosa profesional pero accesible
- Tono objetivo y factual
- Transparencia sin defensividad
- Claridad y precisión

**Ejemplo de tono correcto:**

✓ "Este libro fue creado mediante un proceso de colaboración humano-IA..."
✗ "En este fascinante viaje exploratorio que emprendimos juntos..."
✗ "El sistema implementó un framework metodológico riguroso..."

### Sobre la Atribución Estadística

**NO es atribución legal, ES indicador de influencia:**

✓ "El 12% de las citas provienen de trabajos de Goodfellow et al."
✗ "El 12% del texto es de Goodfellow et al."

---

## TROUBLESHOOTING

**Problema:** No encuentro los reportes de evaluación
**Solución:** Ejecutar EVALUATE_BOOK_STYLE y EVALUATE_BOOK_CONTENT primero

**Problema:** ¿Qué porcentaje poner en capítulo FINAL_EDITED?
**Solución:** Pedir al editor que estime nivel de edición, usar tabla de estimación

**Problema:** Texto suena demasiado al estilo del libro
**Solución:** Releer ESTILO_EDITORIAL, adoptar tono profesional/objetivo

---

**Versión:** 1.1  
**Fecha:** 26 enero 2026  
**Uso:** FASE 5 del WORKFLOW (Último paso)  
**Requiere:** EVALUATE_BOOK_STYLE, EVALUATE_BOOK_CONTENT

**FIN DEL PROMPT**
