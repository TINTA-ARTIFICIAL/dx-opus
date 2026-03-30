# CREATE_EDITOR_PROFILE_PROMPT v1.0

**Proyecto:** Tinta Artificial
**Tipo:** Prompt del Sistema
**Versión:** 1.0
**Fecha:** 26 enero 2026
**Función:** Generar perfiles completos de editores para el WORKFLOW_WRITING_BOOKS

---

## PROPÓSITO

Este prompt permite generar un PERFIL DE EDITOR completo y detallado para cualquier editor que trabaje con el sistema de escritura de libros de Tinta Artificial. El perfil resultante se usará como input de estilo en todas las fases del workflow de escritura.

---

## INSTRUCCIONES PARA LA IA

### OBJETIVO

Crear un documento EDITOR_PROFILE_[NOMBRE].md exhaustivo que capture:
- Voz y tono distintivos del editor
- Preferencias estilísticas específicas
- Arquitectura narrativa característica
- Temas y obsesiones recurrentes
- NO-GOs (elementos a evitar)
- Ejemplos representativos de su escritura
- Criterios de validación específicos

### METODOLOGÍA

**PASO 1: RECOPILACIÓN DE INFORMACIÓN**

Analiza TODAS las fuentes disponibles sobre el editor en el siguiente orden:

1. **Textos escritos por el editor:**
   - Posts de blog o Substack
   - Artículos publicados
   - Libros (si los hay)
   - Notas de trabajo o borradores
   - Cualquier otro texto escrito personalmente

2. **Documentos de contexto:**
   - Notas previas para creación de contenido
   - Planes de trabajo
   - Outlines o esquemas narrativos
   - Documentos de proceso creativo

3. **Herramientas de evaluación previas:**
   - Prompts de evaluación de estilo
   - Checklists de validación
   - Criterios de calidad establecidos
   - Feedback histórico sobre textos

4. **Información biográfica y profesional:**
   - Formación académica
   - Trayectoria profesional
   - Áreas de especialización
   - Intereses intelectuales
   - Búsqueda web si es necesario

**PASO 2: ANÁLISIS PROFUNDO**

Para cada sección del EDITOR_PROFILE_TEMPLATE.md, realiza:

**2.1 Análisis de Voz y Tono:**
- Identifica personas gramaticales dominantes (yo/nosotros/impersonal)
- Detecta nivel de formalidad y registro
- Caracteriza actitud (crítica/entusiasta/neutral/etc.)
- Identifica variaciones de tono según contexto
- Extrae ejemplos de cada tono identificado

**2.2 Análisis de Preferencias Estilísticas:**
- Mide longitud promedio de párrafos
- Identifica estructura típica de párrafos
- Analiza complejidad sintáctica (oraciones simples/compuestas/subordinadas)
- Lista conectores frecuentes y evitados
- Identifica amplitud léxica y registro
- Detecta uso de anglicismos y criterios
- Lista palabras y expresiones recurrentes

**2.3 Análisis de Arquitectura Narrativa:**
- Identifica patrones de inicio (anécdota/pregunta/dato/declaración)
- Analiza estructura de desarrollo (lineal/capas/arbóreo)
- Caracteriza tipos de cierre (síntesis/apertura/circular)
- Detecta uso de metáforas y su tipología
- Analiza frecuencia y tipo de ejemplos
- Evalúa integración de citas

**2.4 Análisis de Transparencia e Honestidad:**
- Identifica cómo expresa dudas e incertidumbre
- Detecta reconocimiento de limitaciones
- Analiza declaración de uso de IA (si aplica)
- Evalúa rigor en citación de fuentes
- Caracteriza postura crítica y autocrítica

**2.5 Análisis de Elementos Literarios:**
- Identifica recursos literarios usados
- Caracteriza tipo de humor (si lo hay)
- Analiza ritmo y musicalidad de la prosa
- Detecta uso expresivo de puntuación

**2.6 Análisis de Temas y Obsesiones:**
- Lista temas recurrentes en orden de frecuencia
- Identifica obsesiones intelectuales
- Mapea referencias culturales típicas
- Detecta conexiones conceptuales características

**2.7 Identificación de NO-GOs:**
- Lista elementos estilísticos ausentes o evitados
- Identifica tonos que nunca adopta
- Detecta prácticas argumentativas que rechaza
- Lista contenidos que excluye

**PASO 3: EXTRACCIÓN DE EJEMPLOS**

Extrae 5-6 párrafos representativos que ilustren:
- Inicio típico
- Desarrollo argumental
- Uso de metáforas (si aplica)
- Elementos distintivos (humor, deslenguamiento, tecnicismos, etc.)
- Cierre típico

Para cada ejemplo, explica POR QUÉ es representativo (3-4 razones concretas).

**PASO 4: SÍNTESIS Y COHERENCIA**

**4.1 Verifica coherencia interna:**
- Los ejemplos extraídos deben coincidir con las características descritas
- Los NO-GOs deben ser consistentes con lo que SÍ hace
- La evolución temporal (si existe) debe explicar cambios de estilo

**4.2 Completa secciones derivadas:**
- Checklist de validación basada en características identificadas
- Preguntas de auto-evaluación específicas del editor
- Aplicación al workflow (cómo influye el estilo en cada fase)

**4.3 Redacta notas finales:**
- Síntesis de evolución estilística (si hay información temporal)
- Contexto editorial específico
- Instrucciones de uso del perfil

### FORMATO DE OUTPUT

**Usa el EDITOR_PROFILE_TEMPLATE.md como estructura:**

1. Rellena TODAS las secciones con información específica
2. Elimina secciones que NO apliquen (marca como "N/A" y explica por qué)
3. Añade subsecciones si son necesarias para capturar matices
4. Usa ejemplos concretos, NO descripciones genéricas
5. Sé específico: "Párrafos de 3-5 líneas" en vez de "Párrafos cortos"

**Longitud esperada:** 8,000-12,000 palabras (similar al perfil de Marco Laucelli)

**Tono del perfil:** Descriptivo, preciso, operacional (NO académico ni abstracto)

### CRITERIOS DE CALIDAD

Un buen EDITOR_PROFILE debe:

**✓ Ser específico:**
- NO: "Usa metáforas frecuentemente"
- SÍ: "Usa metáforas científicas aplicadas a problemas sociales, frecuencia: 2-3 por cada 1,000 palabras. Ejemplo: 'deuda cognitiva', 'dopaje cognitivo'"

**✓ Incluir ejemplos concretos:**
- Cada característica importante debe tener al menos 1 ejemplo
- Ejemplos extraídos de textos reales del editor
- Ejemplos representativos, NO excepciones

**✓ Ser operacional:**
- Debe permitir a otra IA escribir "a la manera del editor"
- Debe facilitar validación objetiva de textos
- Debe incluir criterios medibles cuando sea posible

**✓ Capturar la voz única:**
- NO descripciones genéricas aplicables a cualquiera
- SÍ elementos distintivos que diferencian a este editor
- Debe ser reconocible: "esto suena a [Editor]"

**✓ Ser completo:**
- Todas las secciones del template cubiertas
- Suficiente detalle en cada sección
- Balance entre brevedad y exhaustividad

### NOTAS IMPORTANTES

**Sobre fuentes insuficientes:**
- Si faltan fuentes para alguna sección, márquela como "[INFORMACIÓN INSUFICIENTE]"
- Sugiere qué información adicional sería útil
- Completa lo que sea posible con información disponible

**Sobre contradicciones:**
- Si encuentras contradicciones entre fuentes, documéntalas
- Prioriza textos más recientes sobre antiguos
- Prioriza textos publicados sobre borradores
- Nota la contradicción en la sección "Evolución del Estilo"

**Sobre genericidad:**
- Evita descripciones que podrían aplicarse a cualquier escritor
- Busca lo DISTINTIVO del editor
- "Usa buena gramática" NO es útil; "Usa subordinadas de 3+ niveles regularmente" SÍ lo es

**Sobre ejemplos:**
- SIEMPRE extrae ejemplos de textos reales
- NUNCA inventes ejemplos
- Si no hay ejemplos disponibles, marca como "[PENDIENTE: necesita textos del editor]"

---

## INPUTS REQUERIDOS

Para ejecutar este prompt, proporciona:

### INPUTS MÍNIMOS (obligatorios):

1. **Nombre del editor**
2. **Al menos 2-3 textos escritos por el editor** (posts, artículos, capítulos)
3. **Información biográfica básica** (formación, trayectoria)

### INPUTS OPCIONALES (mejoran calidad):

4. **Blog o publicaciones históricas** (para ver evolución)
5. **Notas de trabajo o contexto** (proceso creativo)
6. **Herramientas de evaluación previas** (checklists, criterios)
7. **Libros editados** (si existen)
8. **URLs para búsqueda web** (blog, LinkedIn, publicaciones)

### INPUTS IDEALES (máxima calidad):

Todo lo anterior PLUS:
9. **Feedback del editor sobre textos** (anotaciones, correcciones)
10. **Conversaciones sobre estilo** (preferencias explícitas)
11. **Textos en diferentes contextos** (técnico, narrativo, etc.)
12. **Múltiples períodos temporales** (evolución)

---

## EJEMPLO DE USO

**INPUT:**
```
Editor: Jane Smith
Formación: MBA + Background en Marketing
Textos:
- 5 posts de blog sobre innovación empresarial
- 1 artículo académico sobre transformación digital
- Notas de trabajo para libro sobre liderazgo tech
URLs:
- Blog personal: www.janesmith.com/blog
- LinkedIn: linkedin.com/in/janesmith
```

**PROCESO:**
1. Analiza 5 posts de blog → identifica voz, tono, estructura
2. Analiza artículo académico → contrasta con blog (¿mismo estilo?)
3. Analiza notas de trabajo → proceso creativo, preferencias
4. Busca en web → información adicional, otros textos
5. Extrae ejemplos representativos de cada tipo de texto
6. Sintetiza en EDITOR_PROFILE_JANE_SMITH.md completo

**OUTPUT:**
- Archivo: EDITOR_PROFILE_JANE_SMITH.md
- Longitud: ~10,000 palabras
- Secciones: Todas del template completadas
- Ejemplos: 5-6 párrafos con análisis
- Checklist: Específica para Jane Smith

---

## PROCESO ITERATIVO

Si el editor revisa el perfil y proporciona feedback:

**ITERACIÓN 1:**
- Editor anota perfil: "Esto no me suena", "Falta X", "Nunca hago Y"
- IA ajusta perfil basándose en feedback
- Genera v1.1

**ITERACIÓN 2:**
- Editor prueba perfil en escritura de capítulo de ejemplo
- Identifica desajustes entre perfil y resultado deseado
- IA refina perfil
- Genera v1.2

**VERSIÓN FINAL:**
- Después de 1-2 iteraciones
- Editor aprueba perfil como representativo
- Se congela versión para uso en workflow

---

## VALIDACIÓN DEL PERFIL GENERADO

Antes de entregar el perfil, verifica:

**Completitud:**
- [ ] Todas las secciones del template están completas o marcadas como N/A
- [ ] Al menos 5 ejemplos de párrafos incluidos
- [ ] Checklist de validación específica creada
- [ ] Notas finales sobre uso del perfil incluidas

**Especificidad:**
- [ ] Características medibles cuando sea posible
- [ ] Ejemplos concretos, NO abstracciones
- [ ] NO descripciones genéricas
- [ ] Voz única claramente identificable

**Coherencia:**
- [ ] Ejemplos coinciden con características descritas
- [ ] NO-GOs consistentes con lo que SÍ hace
- [ ] Secciones se refuerzan mutuamente

**Usabilidad:**
- [ ] Otra IA podría escribir usando este perfil
- [ ] Editor podría validar textos con este perfil
- [ ] Criterios suficientemente claros para aplicar

---

## TROUBLESHOOTING

**Problema:** Fuentes insuficientes para completar perfil
**Solución:**
- Marca secciones como [INFORMACIÓN INSUFICIENTE]
- Lista qué información adicional necesitas
- Completa lo posible con información disponible
- Sugiere al usuario cómo obtener información faltante

**Problema:** Textos del editor muy diversos (sin patrón claro)
**Solución:**
- Documenta la diversidad en "Tonos por Contexto"
- Identifica criterios de cuándo usa cada estilo
- Crea subsecciones por tipo de texto si necesario
- Nota en "Evolución del Estilo" si hay cambio temporal

**Problema:** Editor tiene estilo muy genérico/sin rasgos distintivos
**Solución:**
- Busca matices sutiles que lo diferencien
- Compara con otros escritores del mismo campo
- Identifica al menos 3-5 elementos únicos
- Si realmente es genérico, documéntalo honestamente

**Problema:** Contradicciones entre fuentes
**Solución:**
- Prioriza: Reciente > Antiguo, Publicado > Borrador
- Documenta contradicción en "Evolución del Estilo"
- Pregunta al usuario si es posible
- Elige la versión más consistente con mayoría de evidencia

---

## OUTPUT FINAL

**Archivo generado:**
`EDITOR_PROFILE_[NOMBRE_EDITOR].md`

**Estructura:**
- Idéntica a EDITOR_PROFILE_TEMPLATE.md
- Todas las secciones completadas con información específica
- Mínimo 5 ejemplos de párrafos representativos
- Checklist de validación operacional
- Notas sobre uso en workflow

**Longitud típica:** 8,000-12,000 palabras

**Calidad:**
- Específico y operacional
- Con ejemplos concretos
- Captura voz única del editor
- Utilizable inmediatamente en WRITE_SAMPLE_CHAPTER

---

## EJEMPLO DE PROMPT DE EJECUCIÓN

**Para el usuario:**

```
Necesito crear un perfil de editor para [Nombre].

INFORMACIÓN DISPONIBLE:
- Formación: [...]
- Textos: [lista de textos o URLs]
- Contexto: [información adicional]

Por favor:
1. Analiza todos los materiales proporcionados
2. Genera EDITOR_PROFILE_[NOMBRE].md completo
3. Incluye ejemplos concretos de los textos
4. Crea checklist de validación específica

Usa CREATE_EDITOR_PROFILE_PROMPT v1.0 como guía.
```

---

**Versión:** 1.0
**Fecha:** 26 enero 2026
**Autor:** Sistema Tinta Artificial
**Uso:** Ejecutar cuando se necesite crear perfil de nuevo editor

**FIN DEL PROMPT**
