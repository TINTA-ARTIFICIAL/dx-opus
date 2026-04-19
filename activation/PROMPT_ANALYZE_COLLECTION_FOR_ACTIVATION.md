---
id:          PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION
type:        PROMPT
subsystem:   ACTIVATION
version:     1.5
status:      ACTIVE
created:     2026-02-10
updated:     2026-04-19
owner_chat:  activation-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.5 | 2026-04-19 | JM | Ref stale corregida: ANALYZE_BOOK_FOR_ACTIVATION → IDENTIFY_NARRATIVE_SEEDS v2.0. YAML header añadido. Subido a repo. Implementa DL_20260420_ACTIVATION_026. |
| v1.4 | 2026-02-12 | JM | NICHOS LITERARIOS: Añadida identificación de recursos literarios (frases, metáforas, giros, humor). OBJETIVOS INTEGRADOS: Objetivos de activación integrados en el prompt (con fallback a pregunta). Añadida FASE 2.4. Añadida sección 6.4 en OUTPUT. Actualizado PROPÓSITO con definición expandida de "nicho narrativo". Actualizados criterios de calidad. |
| v1.3 | 2026-02-10 | JM | INSTRUCCIONES DE PARADA: Añadida sección final "PUNTO DE PARADA OBLIGATORIO". Instrucciones explícitas de STOP al completar prompt. Prohibición de continuar automáticamente a SUBFASE 0.2. |
| v1.2 | 2026-02-10 | JM | INSTRUCCIÓN CRÍTICA: Crear archivo físico ACTIVATION_CONTEXT_[PROYECTO].md. Añadida detección de REVISTAS/PUBLICACIONES PERIÓDICAS. |
| v1.1 | 2026-02-10 | JM | CORRECCIÓN CRÍTICA: Prompt se ejecuta SIEMPRE (con o sin RESEARCH_REPORTs). |
| v1.0 | 2026-02-10 | JM | Versión inicial del prompt. 5 fases de ejecución. Output de 9 secciones. |

## DEPENDENCIES

inputs:  [libro(s) completo(s), OBJETIVOS_ACTIVACION (opcional), RESEARCH_REPORT(s) (opcional)]
outputs: [ACTIVATION_CONTEXT_[PROYECTO].md]
calls:   []

---

# PROMPT: ANALYZE_COLLECTION_FOR_ACTIVATION v1.5

**Proyecto:** D-X-OPUS - Content Activation
**Tipo:** Prompt del Sistema
**Versión:** 1.5
**Fecha:** 10 febrero 2026
**Última actualización:** 19 abril 2026
**Función:** Analizar colección de libros para generar contexto de activación

---

## PROPÓSITO

Este prompt analiza **uno o más libros completos** para generar un **ACTIVATION_CONTEXT** que facilite la activación de contenido en forma de posts, artículos y threads.

**Objetivo de FASE 0**: Crear mapa exhaustivo de **nichos narrativos**.

**Definición - Nicho Narrativo**:
Todo elemento con potencial para desarrollar contenido narrativo. Incluye:
- Eventos históricos, hitos temporales
- Personas, instituciones, organizaciones
- Conceptos, ideas, teorías, debates
- **Recursos literarios**: frases memorables, metáforas, giros narrativos, humor, paralelismos
- Tensiones conceptuales, silencios, patrones estructurales

**Criterio de inclusión**: ¿Esto podría ser punto de partida de un post/artículo interesante?

---

### ⚙️ OBJETIVOS DE ACTIVACIÓN

**Objetivos por defecto** (SIEMPRE activos):
- Identificar temas para posts de Substack/blogs (1,000-2,000 palabras)
- Identificar elementos para threads/hilos (10-15 tweets)
- Identificar anécdotas con potencial viral
- Identificar conexiones NO obvias entre elementos
- Identificar recursos literarios (frases, metáforas, giros) con potencial narrativo

**Objetivos adicionales del usuario**:

**Si el usuario NO ha proporcionado un documento OBJETIVOS_ACTIVACION.md**, PREGUNTAR al inicio:

> "¿Tienes objetivos adicionales para la activación de contenido? Por ejemplo:
> - Enfoque en audiencia específica (académica, general, técnica)
> - Plataforma prioritaria (LinkedIn, Twitter, Medium, Substack)
> - Tipo de contenido (educativo, entretenimiento, thought leadership)
>
> [Si no especificas, usaré los objetivos por defecto]"

**Si el usuario SÍ proporcionó OBJETIVOS_ACTIVACION.md** → Usar ese documento e integrar con objetivos por defecto.

---

**Cuándo usar este prompt:**
- ✅ SIEMPRE en workflow de activación (independiente de si hay Research Reports)
- ✅ Libros de cualquier editorial (Tinta Artificial o externos)
- ✅ Uno o múltiples libros que queremos activar
- ✅ Necesitamos contexto estructurado para identificar temas activables

**Si existen RESEARCH_REPORT(s):**
- Usar como **input adicional enriquecido**
- Genera ACTIVATION_CONTEXT más rico combinando libro + research reports

**Si NO existen RESEARCH_REPORT(s):**
- Usar solo libro(s) completo(s)
- Genera ACTIVATION_CONTEXT desde contenido del libro
- Resultado igualmente válido y completo

**Diferencia con SUMMARIZE_REFERENCES v4.0:**
- SUMMARIZE: Referencias dispersas → Guiar investigación futura (prospectivo)
- ANALYZE_COLLECTION: Libros completos → Preparar activación (retrospectivo)

---

## ⚠️ INSTRUCCIÓN CRÍTICA DE EJECUCIÓN

**Este prompt DEBE crear un archivo físico markdown:**

1. **GENERAR** el contenido completo del ACTIVATION_CONTEXT
2. **CREAR EL ARCHIVO:** `ACTIVATION_CONTEXT_[PROYECTO].md`
   - Formato: Markdown (.md)
   - Ubicación: Directorio de trabajo
   - Nombre: Usar nombre del proyecto proporcionado
3. **GUARDAR** el archivo en el sistema de archivos
4. **VERIFICAR** que el archivo existe físicamente antes de finalizar

**El editor necesita revisar este archivo en CHECKPOINT 0.1**

Sin archivo físico, el workflow no puede continuar.

---

## FILOSOFÍA

Este prompt comparte la filosofía de análisis de SUMMARIZE_REFERENCES v4.0 pero aplicada a un propósito diferente:

**Principios compartidos:**
1. **Synthesis over Summary:** Integrar across fuentes, no solo describir
2. **Gap Awareness:** Identificar qué falta o está subcubierto
3. **Historical Consciousness:** Perspectiva temporal
4. **Debate Mapping:** Capturar tensiones y controversias
5. **Quality Assessment:** Evaluar rigor y sustentación

**Diferencia clave:**
- SUMMARIZE: "¿Qué debemos investigar?" → Research Plan
- ANALYZE_COLLECTION: "¿Qué podemos activar?" → Activation Context

---

## INPUTS REQUERIDOS

### INPUTS OBLIGATORIOS

**1. Uno o más libros completos**

**Formatos aceptables:**
- LIBRO_COMPLETO.md (markdown - IDEAL)
- PDF con texto extraíble
- DOCX (Word)
- EPUB
- TXT (texto plano)

**Cantidad:**
- Mínimo: 1 libro
- Máximo recomendado: 5 libros
- Caso típico: 1-3 libros

**Contenido mínimo por libro:**
- 15,000+ palabras
- Estructura identificable (capítulos/secciones)
- Bibliografía (ideal pero no crítico)

### INPUTS OPCIONALES (mejoran calidad)

**2. OBJETIVOS_ACTIVACION.md** (si existe)
- Define objetivos específicos del usuario
- Si NO existe → Prompt preguntará al inicio

**3. RESEARCH_REPORT(s)** (si existen del workflow de investigación)
- Enriquecen el análisis con contexto de investigación previa
- IMPORTANTE: ACTIVATION_CONTEXT se genera IGUALMENTE sin estos

**4. Bibliografías separadas** (si existen como archivos independientes)

**5. Materiales complementarios:**
- Working papers de autores
- Artículos previos relacionados
- Guías de estilo de editorial (si colección)

**6. Información sobre autores:**
- Background académico/profesional
- Línea de investigación habitual

---

## PROCESO DE EJECUCIÓN

### FASE 1: LECTURA Y COMPRENSIÓN (30% del esfuerzo)

**Objetivo:** Comprensión holística de la colección

**1.1 Lectura completa de todos los libros**
- Leer cada libro de principio a fin
- Identificar tesis principal de cada libro
- Mapear estructura argumentativa de cada uno
- Notar introducción y conclusiones (sintetizan argumentos)

**1.2 Identificación de tipo de colección**

Si es **un solo libro:**
- Tipo de libro (Estado del Arte / Revisión Histórica / Análisis / Ensayo)
- Audiencia objetivo
- Metodología del autor

Si son **múltiples libros:**
- ¿Mismo autor? → Evolución de ideas
- ¿Misma colección editorial? → Estilo común
- ¿Serie temática? → Perspectivas sobre mismo tema
- ¿Sin patrón común? → Documentar heterogeneidad

Si es **REVISTA o PUBLICACIÓN PERIÓDICA:**

**Detectar por:**
- Múltiples números/ediciones
- Periodicidad identificable (mensual, trimestral, anual)
- Editorial consistente
- Formato repetitivo por número
- Diferentes autores por edición

**1.3 Comprensión de relaciones (si múltiples libros)**
- ¿Cómo se relacionan entre sí?
- ¿Hay evolución temporal de ideas?
- ¿Perspectivas complementarias o contradictorias?

**1.4 Doble perspectiva (si REVISTA)**

Si tipo = REVISTA/PUBLICACIÓN PERIÓDICA:

**PERSPECTIVA 1: Meta-análisis (Historia DE la publicación)**
Analizar la revista COMO ENTIDAD:
- Fundación y origen de la publicación
- Evolución de la revista a lo largo del tiempo
- Cambios en línea editorial por períodos
- Autores frecuentes y su evolución

**PERSPECTIVA 2: Análisis de contenidos (Historias EN la revista)**
Analizar artículos y contenidos:
- Temas tratados en artículos
- Debates documentados en diferentes números
- Actores/personajes mencionados
- Evolución de temas a lo largo de los números

---

### FASE 2: SÍNTESIS TEMÁTICA (25% del esfuerzo)

**Objetivo:** Identificar 10-20 temas principales organizados jerárquicamente

**2.1 Identificación de temas**

**2.2 Clasificación jerárquica**

**Temas PRIMARIOS (3-7):**
- Criterio: Ocupan ≥1 capítulo O aparecen en múltiples libros
- Son esenciales a la(s) tesis principal(es)

**Temas SECUNDARIOS (5-10):**
- Criterio: Mencionados recurrentemente pero no centrales

**Temas TERCIARIOS (3-5):**
- Criterio: Mencionados ocasionalmente

**2.3 Para cada tema, documentar:**
- Nombre del tema (unificado si aparece en múltiples libros)
- Libros donde se trata (si múltiples)
- Profundidad de tratamiento
- Conexión con tesis central

**2.4 Identificación de Recursos Literarios**

Mientras analizas los textos, documenta:

**Frases memorables:**
- Definiciones brillantes de conceptos
- Citas textuales con gancho
- Aforismos o frases que "pegan"
- Criterio: ¿Podría ser titular o hook de post?

**Metáforas y analogías potentes:**
- Comparaciones que iluminan conceptos
- Analogías entre dominios diferentes

**Giros narrativos y paradojas:**
- "Plot twists" conceptuales
- Contradicciones fértiles
- Ironías documentadas

**Momentos de humor:**
- Anécdotas graciosas
- Sarcasmo bien empleado

**Paralelismos históricos:**
- Conexiones NO obvias entre épocas
- Patrones que se repiten

**IMPORTANTE:** No crear sección separada masiva. Estos recursos se documentan en contexto donde aparecen.

---

### FASE 3: ANÁLISIS DE FUENTES (15% del esfuerzo)

**Objetivo:** Organizar y clasificar todas las fuentes citadas en la colección

**3.1 Extracción de fuentes**
**3.2 Clasificación de fuentes** (Papers académicos, Libros, Reports, Artículos, Blogs/essays, Datos, Otros)
**3.3 Identificación de autores clave** (top 10-20)
**3.4 Organización por tema**

---

### FASE 4: ARGUMENTOS Y DEBATES (20% del esfuerzo)

**Objetivo:** Mapear estructura argumentativa y controversias

**4.1 Tesis principal(es)**
**4.2 Argumentos de soporte** (5-10 argumentos principales)
**4.3 Claims principales** (15-25 claims)
**4.4 Metodología argumentativa**
**4.5 Debates identificados** (explícitos, implícitos, entre libros)

---

### FASE 5: GAPS Y OPORTUNIDADES (10% del esfuerzo)

**Objetivo:** Identificar qué NO está cubierto y mapear oportunidades de activación

**5.1 Gaps explícitos** (reconocidos por autor(es))
**5.2 Gaps implícitos** (perspectivas ausentes, contraejemplos no considerados)
**5.3 Oportunidades de activación mapeadas** (6 tipos: profundización, exploración de gaps, debates, aplicaciones, síntesis, comparaciones)

---

## FORMATO DE OUTPUT

### ESTRUCTURA DEL DOCUMENTO

El documento **ACTIVATION_CONTEXT_[NOMBRE_PROYECTO].md** debe incluir:

1. VISIÓN GENERAL DE LA COLECCIÓN
2. TEMAS PRINCIPALES (primarios, secundarios, terciarios)
3. FUENTES Y AUTORES CLAVE
4. ARGUMENTOS Y ESTRUCTURA
5. DEBATES Y CONTROVERSIAS
6. GAPS Y OPORTUNIDADES DE ACTIVACIÓN (incluye recursos literarios representativos)
7. EVALUACIÓN PARA ACTIVACIÓN
8. NOTAS PARA VALIDACIÓN POSTERIOR
9. METADATA TÉCNICA

---

## CRITERIOS DE CALIDAD

### ✅ Completitud
- [ ] 10-20 temas identificados y organizados jerárquicamente
- [ ] Fuentes extraídas y clasificadas (mínimo 20)
- [ ] 5-10 debates documentados
- [ ] 8-15 gaps identificados
- [ ] 15-30 oportunidades de activación concretas
- [ ] 10-30 recursos literarios representativos capturados

### ✅ Precisión
- [ ] Información extraída fielmente de los libros (no inventada)
- [ ] Citas y referencias correctas
- [ ] Clasificaciones justificadas

### ✅ Utilidad para Activación
- [ ] Oportunidades concretas de posts (no genéricas)
- [ ] Recursos literarios identificados con potencial claro

---

## LONGITUD Y TIEMPOS

**Longitud objetivo:** 3,000-5,000 palabras

**Tiempo estimado de ejecución:**
- Un solo libro: 1-2 horas
- 2-3 libros: 2-3 horas
- 4-5 libros: 3-4 horas

**Tiempo de validación (editor):** 30-60 minutos

---

## USO POSTERIOR DEL ACTIVATION_CONTEXT

Este documento se usará como input en:

**FASE 0 (continuación):**
- CREATE_TIMELINE v1.0 (si no hay research reports)
- CREATE_CAST v1.0 (si no hay research reports)

**FASE 1:**
- **IDENTIFY_NARRATIVE_SEEDS v2.0** (siguiente prompt)
  - Temas → Selección de candidatos para seeds narrativos
  - Debates → Ángulos controversiales específicos
  - Gaps → Seeds de tipo implícito
  - Oportunidades → Base para catálogo de seeds
  - Recursos literarios → Hooks y elementos narrativos

**FASE 5 (Evaluación):**
- EVALUATE_POST_CONTENT v1.0
  - Validar que posts no inventen información
  - Verificar que claims estén sustentados en libro(s)

---

## ⛔ INSTRUCCIONES FINALES - PUNTO DE PARADA OBLIGATORIO

**TU TRABAJO CON ESTE PROMPT TERMINA AQUÍ.**

### Pasos Finales Obligatorios

**1. Verificar Archivo Creado**

Confirma que el archivo existe físicamente:
```
✓ Archivo creado: ACTIVATION_CONTEXT_[PROYECTO].md
✓ Ubicación: Directorio de trabajo
✓ Formato: Markdown (.md)
✓ Tamaño: 3,000-5,000 palabras aproximadamente
```

**2. Presentar Archivo al Editor**
Usa la herramienta `present_files` para mostrar el archivo.

**3. Informar Estado al Editor**
```
"ACTIVATION_CONTEXT generado exitosamente.

📄 Archivo: ACTIVATION_CONTEXT_[PROYECTO].md
📊 Longitud: [N] palabras
🎯 Temas identificados: [N] temas (X primarios, Y secundarios, Z terciarios)
📚 Fuentes analizadas: [N] fuentes
🔍 Debates documentados: [N] debates
💡 Oportunidades de activación: [N] oportunidades mapeadas
✨ Recursos literarios capturados: [N] elementos

✅ SUBFASE 0.1 COMPLETA

⏸️ Esperando tu validación para continuar con SUBFASE 0.2."
```

**4. NO Continuar Automáticamente**

❌ **PROHIBIDO hacer lo siguiente:**
- NO ejecutar CREATE_TIMELINE
- NO ejecutar CREATE_CAST
- NO continuar con SUBFASE 0.2
- NO mencionar próximos pasos del workflow
- NO asumir que el editor aprueba automáticamente

**5. ESPERAR Validación del Editor**

⏸️ El editor debe revisar el archivo y decidir explícitamente:
- **"Aprobado"** o **"Continuar con SUBFASE 0.2"** → Entonces podrás continuar
- **"Rechazado"** o **"Problemas: [detalles]"** → Deberás regenerar con feedback

---

## NOTAS FINALES

**Este prompt se ejecuta SIEMPRE en workflow de activación:**
- ✅ Con libros externos (con o sin Research Reports)
- ✅ Con libros de Tinta Artificial (enriquecido con Research Reports)
- ✅ Con uno o múltiples libros que queremos activar juntos

**Relación con otros prompts:**
- **Inspirado en:** SUMMARIZE_REFERENCES v4.0 (filosofía de síntesis)
- **Input para:** IDENTIFY_NARRATIVE_SEEDS v2.0 (FASE 1)
- **Hermano conceptual de:** SUMMARIZE_REFERENCES v4.0

---

**FIN DEL PROMPT v1.5**
