---
id:          TEMPLATE_POST_SEED
type:        TEMPLATE
subsystem:   WRITING
version:     1.0
status:      ACTIVE
created:     2026-04-11
updated:     2026-04-11
owner_chat:  writing-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-04-11 | writing-dev | Initial version. Canonical input artifact for PROMPT_WRITE_POST per DL_20260411_WRITING_016. |

## DEPENDENCIES

inputs:  [WRITING_CONTEXT, INVENTARIO_IDEAS]
outputs: []
calls:   []

## DESCRIPTION

Plantilla canónica del POST_SEED: artefacto de entrada unificado de PROMPT_WRITE_POST. Lo produce PROMPT_PLAN_POST al finalizar. Combina el contenido procesado con la voz posicionada del editor.

---

# TEMPLATE: POST_SEED

## Sistema D-X-OPUS — Artefacto de Entrada de PROMPT_WRITE_POST

---

## INSTRUCCIONES DE USO

Este template lo rellena **PROMPT_PLAN_POST** al finalizar su proceso. El editor no lo rellena manualmente — lo revisa y aprueba antes de invocar PROMPT_WRITE_POST.

**Campos obligatorios:** todos los marcados con `[REQUERIDO]`.
**Campos opcionales:** marcados con `[OPCIONAL]` — se rellenan si el material lo permite.
**Campos de estado:** marcados con `[ESTADO]` — los actualiza PROMPT_WRITE_POST al escribir cada sección.

Una vez aprobado por el editor, el POST_SEED es la fuente de verdad para PROMPT_WRITE_POST. No se modifica durante la escritura salvo en los campos de estado.

---

# POST_SEED: [TÍTULO PROVISIONAL DEL POST]

---

## SECCIÓN 1: CONTEXTO

```
writing_context:     [ID del WRITING_CONTEXT activo — REQUERIDO]
editor:              [Nombre del editor — solo para legibilidad]
publication:         [Nombre de la publicación — solo para legibilidad]
format:              [post_estandar | post_largo | hilo]
word_count_target:   [Rango en palabras]
created:             [Fecha de creación del POST_SEED]
```

**Serie:**
```
is_series:           [true | false]
series_name:         [Nombre de la serie — OPCIONAL]
series_position:     [Número del post en la serie — OPCIONAL, ej. "2 de 3"]
previous_post_id:    [ID o título del post anterior — OPCIONAL]
promises_to_fulfill: |
  [Si hay post anterior: compromisos hechos al lector que este post
  debe cumplir. Vacío si es el primer post de la serie.]
```

---

## SECCIÓN 2: NÚCLEO NARRATIVO

*Esta sección contiene los tres elementos que el editor debe confirmar antes de escribir.*

### 2.1 Pregunta o tensión central

> [REQUERIDO — Una frase. La pregunta o tensión que el post resuelve, desarrolla
> o sostiene. No es el título — es la fuerza que mueve el texto.
>
> Ejemplo: "¿Puede la IA mejorar nuestra productividad sin degradar las capacidades
> cognitivas que hacen que esa productividad valga algo?"]

**Estado de confirmación:** `pendiente | confirmado | ajustado por editor`

---

### 2.2 Movimiento narrativo

> [REQUERIDO — Una o dos frases. Cómo avanza el argumento desde el inicio
> hasta el cierre. No es la estructura de secciones — es el arco lógico o
> retórico del texto.
>
> Ejemplos:
> - "Del diagnóstico del problema a la distinción que lo resuelve."
> - "De la aparente contradicción a la síntesis que la disuelve."
> - "De la anécdota concreta al principio general y de vuelta a lo concreto."
> - "De la pregunta sin respuesta clara al mapa de lo que sí sabemos."]

**Estado de confirmación:** `pendiente | confirmado | ajustado por editor`

---

### 2.3 Orden de llegada de los argumentos

> [REQUERIDO — Lista ordenada de los argumentos, ideas o bloques temáticos
> principales en el orden en que aparecerán en el post. No es el índice de
> secciones — es la secuencia argumental que construye el movimiento narrativo.
>
> Ejemplo:
> 1. El estudio del MIT como punto de entrada (evidencia concreta)
> 2. La distinción capacidades aumentadas vs. dopaje cognitivo
> 3. El mecanismo de la deuda cognitiva (por qué ocurre)
> 4. Casos donde la IA ayuda sin degradar
> 5. La pregunta abierta: ¿cuánto es suficiente?]

**Estado de confirmación:** `pendiente | confirmado | ajustado por editor`

---

### 2.4 Gancho de apertura

> [OPCIONAL — Propuesta de apertura si ya está decidida. Puede quedar vacío
> sin bloquear la escritura — PROMPT_WRITE_POST puede proponer opciones.
>
> Si se rellena, indicar tipo: anécdota | dato sorprendente | pregunta |
> cita | declaración provocadora]

**Tipo:** `[tipo | pendiente de decisión]`

---

## SECCIÓN 3: ESTRUCTURA DE SECCIONES

*Una fila por sección del post. PROMPT_WRITE_POST escribe sección a sección.*

| # | Título provisional | Contenido principal | Palabras | Estado |
|---|-------------------|--------------------|---------:|--------|
| 1 | [título] | [qué desarrolla esta sección] | [N] | pendiente |
| 2 | [título] | [qué desarrolla esta sección] | [N] | pendiente |
| 3 | [título] | [qué desarrolla esta sección] | [N] | pendiente |
| … | … | … | … | … |
| N | [título — cierre] | [cómo cierra el post] | [N] | pendiente |

**Total palabras presupuestadas:** [suma — debe estar dentro del rango de `word_count_target`]

**Notas sobre la estructura:**
> [OPCIONAL — Cualquier indicación sobre secciones que requieren tratamiento
> especial: sección que puede omitirse si falta espacio, sección que debe
> aparecer sí o sí, transición delicada entre dos secciones, etc.]

**Valores válidos para Estado:**
- `pendiente` — no escrita
- `en_progreso` — PROMPT_WRITE_POST la está escribiendo en esta sesión
- `borrador` — escrita, pendiente de revisión del editor
- `aprobada` — revisada y aprobada por el editor

---

## SECCIÓN 4: INVENTARIO DE IDEAS

*Material capturado durante PROMPT_QA_IDEAS. PROMPT_WRITE_POST usa este inventario como fuente de voz posicionada.*

### 4.1 Material citable literal

> Formulaciones del editor capturadas durante el Q&A que deben aparecer en el
> post sin modificación. Solo se puede añadir una frase de transición.

| ID | Formulación | Sección asignada | Uso |
|----|-------------|-----------------|-----|
| ML-001 | "[formulación exacta del editor]" | [# sección] | apertura / desarrollo / cierre |
| ML-002 | "[formulación exacta del editor]" | [# sección] | apertura / desarrollo / cierre |
| … | … | … | … |

*Si no hay material citable literal, indicar: "Sin material citable literal en este post."*

---

### 4.2 Ideas desarrolladas en Q&A

> Ideas, distinciones o conexiones conceptuales que emergieron en el Q&A y
> que PROMPT_WRITE_POST debe integrar. No son citas literales — son posiciones
> del editor que hay que reflejar con precisión pero con libertad de forma.

| ID | Idea | Sección asignada | Notas |
|----|------|-----------------|-------|
| ID-001 | [descripción de la idea] | [# sección] | [instrucción de uso — opcional] |
| ID-002 | [descripción de la idea] | [# sección] | [instrucción de uso — opcional] |
| … | … | … | … |

*Si no hay ideas desarrolladas, indicar: "Sin ideas adicionales del Q&A."*

---

### 4.3 Ideas descartadas

> Ideas que surgieron en el Q&A pero que el editor descartó para este post.
> Se registran para no reintroducirlas.

- [idea descartada 1]
- [idea descartada 2]

*Si no hay ideas descartadas, indicar: "Ninguna."*

---

## SECCIÓN 5: FUENTES

*Mapa de fuentes disponibles verificadas por PROMPT_VERIFY_RESEARCH.*

### 5.1 Fuentes verificadas

| ID | Referencia | Tipo | Uso previsto | Estado verificación |
|----|-----------|------|-------------|-------------------|
| F-001 | [autor, título, año/url] | ejemplo / argumento / datos | [sección(es)] | ✓ verificada |
| F-002 | [autor, título, año/url] | ejemplo / argumento / datos | [sección(es)] | ✓ verificada |
| … | … | … | … | … |

**Tipos de fuente:**
- `ejemplo` — aparecerá citada en el texto como ilustración
- `argumento` — background del editor, informa el análisis pero no se cita directamente
- `datos` — cifras, estadísticas o hechos verificables que se citan explícitamente

---

### 5.2 Afirmaciones sin verificar

> Afirmaciones del editor que PROMPT_VERIFY_RESEARCH marcó como no verificadas
> o dudosas. PROMPT_WRITE_POST las señalará con `[⚠ VERIFICAR]` en el borrador.

| Afirmación | Motivo | Acción recomendada |
|-----------|--------|-------------------|
| [afirmación] | [por qué no verificada] | omitir / reformular / buscar fuente |

*Si no hay afirmaciones sin verificar, indicar: "Todas las afirmaciones verificadas."*

---

## SECCIÓN 6: SEÑALES DE APRENDIZAJE

*Patrones estructurales generalizables capturados durante el Q&A con `📘 SEÑAL DE APRENDIZAJE`. No afectan a la escritura de este post — son input para la futura actualización del EDITOR_PROFILE.*

| ID | Señal | Contexto |
|----|-------|---------|
| SA-001 | [descripción del patrón detectado] | [en qué momento emergió] |
| SA-002 | [descripción del patrón detectado] | [en qué momento emergió] |

*Si no hay señales de aprendizaje, indicar: "Ninguna señal registrada."*

---

## SECCIÓN 7: ESTADO DEL POST

*Lo actualiza PROMPT_WRITE_POST al inicio y al final de cada sesión de escritura.*

```
session_count:       [número de sesiones de escritura usadas]
last_session:        [fecha de última sesión]
overall_status:      sin_empezar | en_progreso | borrador_completo | aprobado
qa_executed:         true | false
qa_skipped_reason:   [razón del skip si qa_executed = false — vacío si se ejecutó]
hybrid_mode:         true | false
hybrid_mode_notes:   [descripción del texto aportado por el editor si hybrid_mode = true]
```

---

**FIN DEL TEMPLATE**
