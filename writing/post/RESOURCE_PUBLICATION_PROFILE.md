---
id:          RESOURCE_PUBLICATION_PROFILE
type:        RESOURCE
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
| v1.0 | 2026-04-11 | writing-dev | Initial version. Independent entity from EDITOR_PROFILE per DL_20260411_WRITING_018. |

## DEPENDENCIES

inputs:  []
outputs: []
calls:   []

## DESCRIPTION

Esquema canónico del PUBLICATION_PROFILE: entidad independiente del EDITOR_PROFILE que describe el medio de publicación de destino. La relación entre editor y publicación se establece en el WRITING_CONTEXT, no aquí.

---

# RESOURCE: PUBLICATION_PROFILE

## Sistema D-X-OPUS — Esquema del Perfil de Publicación

---

## PARTE 1: PROPÓSITO

El PUBLICATION_PROFILE describe el medio donde se publica el post: su audiencia, sus criterios editoriales, sus restricciones de formato y sus objetivos. Es una entidad independiente del EDITOR_PROFILE porque la relación entre editor y publicación es muchos a muchos: un editor puede publicar en varios medios con criterios distintos, y un medio puede tener varios editores colaboradores.

El PUBLICATION_PROFILE no hereda del EDITOR_PROFILE ni lo incluye. La combinación de ambos ocurre en el WRITING_CONTEXT.

**Quién lo crea:** El editor, con asistencia de PROMPT_POST_BRIEF si no existe aún.

**Quién lo consume:** WRITING_CONTEXT (referencia), PROMPT_PLAN_POST (criterios de formato), PROMPT_SPLIT_POST (longitud del medio), PROMPT_EVALUATE_POST (criterios de éxito del medio).

**Dónde vive:** Google Drive del editor, carpeta de configuración.

---

## PARTE 2: ESQUEMA COMPLETO

```
---
id:                  PUBLICATION_PROFILE_[MEDIO_ID]
version:             X.Y
created:             YYYY-MM-DD
updated:             YYYY-MM-DD
---

## IDENTIFICACIÓN

publication_name:    [Nombre de la publicación]
platform:            [Plataforma: Substack | LinkedIn | Medium | Blog propio | Otro]
url:                 [URL de la publicación — opcional]
language:            [Idioma principal]

## AUDIENCIA

audience_description: |
  [Descripción de la audiencia: perfil, nivel de conocimiento, intereses]

audience_size:        [Orden de magnitud: <500 | 500–5k | 5k–50k | >50k | desconocido]
audience_relation:    [Relación del editor con la audiencia: suscriptores, seguidores, comunidad, etc.]

## FORMATO

default_format:       post_estandar | post_largo | hilo
word_count_typical:   [Rango habitual de palabras para este medio]
post_frequency:       [Frecuencia de publicación: diaria | semanal | quincenal | mensual | irregular]
series:               true | false
series_notes:         [Si publica en series, describir lógica de continuidad — opcional]

## CRITERIOS EDITORIALES

tone_fit: |
  [Cómo encaja el tono del editor con este medio. Qué aspectos del EDITOR_PROFILE
  son más relevantes aquí y cuáles quedan en segundo plano.]

content_pillars: |
  [Temas centrales de la publicación. Lo que los lectores esperan encontrar.]

content_restrictions: |
  [Qué NO encaja en esta publicación. Temas, formatos o tonos que hay que evitar.]

## OBJETIVOS Y CRITERIOS DE ÉXITO

primary_goal:         [Objetivo principal: autoridad | comunidad | conversión | divulgación | otro]

success_criteria: |
  [Qué hace que un post funcione bien en este medio. Puede incluir métricas
  (aperturas, respuestas, comentarios) y criterios cualitativos (debate generado,
  reconocimiento de la audiencia).]

cta_style:            ninguno | sutil | explícito
cta_notes:            [Cómo se gestiona la llamada a la acción en este medio — opcional]

## TRANSPARENCIA IA

ai_disclosure_policy: post_a_post | seccion_dedicada | ninguna
ai_disclosure_notes:  [Cómo se gestiona la transparencia sobre uso de IA — opcional]

## NOTAS

notes: |
  [Cualquier información adicional relevante para la escritura en este medio]
```

---

## PARTE 3: CAMPOS EXPLICADOS

### 3.1 `id`

Identificador único de la publicación. No incluye el nombre del editor — la publicación existe con independencia de quién escribe en ella.

```
PUBLICATION_PROFILE_SUBSTACK_GALEO
PUBLICATION_PROFILE_LINKEDIN_PERSONAL
PUBLICATION_PROFILE_MEDIUM_TINTA
```

Reglas:
- SCREAMING_SNAKE_CASE
- Siempre empieza con `PUBLICATION_PROFILE_`
- No incluye versión en el nombre

---

### 3.2 `tone_fit`

Este campo es el puente entre el PUBLICATION_PROFILE y el EDITOR_PROFILE. No describe el tono del editor (eso vive en el EDITOR_PROFILE) sino cómo ese tono se calibra para este medio concreto.

Ejemplo:
```
tone_fit: |
  En este Substack el registro reflexivo-crítico es el dominante. El
  deslenguamiento calculado funciona bien con esta audiencia técnica.
  El tono literario-introspectivo (más presente en Bibliácora) queda
  en segundo plano salvo en posts de apertura de serie.
```

---

### 3.3 `content_pillars`

Los temas que definen editorialmente la publicación. No son los intereses del editor en general (eso está en el EDITOR_PROFILE) sino los temas por los que los lectores de este medio están suscritos.

---

### 3.4 `success_criteria`

El criterio de éxito varía por medio. En un Substack técnico puede ser el número de respuestas de lectores y el debate generado. En LinkedIn puede ser el alcance. En un blog propio puede ser simplemente que refleje fielmente la voz del editor independientemente de métricas.

PROMPT_EVALUATE_POST usa este campo para contextualizar su evaluación al medio específico, no a un estándar genérico.

---

### 3.5 `ai_disclosure_policy`

| Valor | Descripción |
|-------|-------------|
| `post_a_post` | Cada post declara explícitamente si fue escrito con asistencia de IA |
| `seccion_dedicada` | La publicación tiene una sección fija donde se explica la política. Los posts individuales no necesitan declararlo. |
| `ninguna` | La publicación no gestiona activamente la transparencia sobre IA |

---

## PARTE 4: RELACIÓN CON EDITOR_PROFILE Y WRITING_CONTEXT

```
EDITOR_PROFILE_MARCO ──────┐
                            ├──► WRITING_CONTEXT_MARCO_SUBSTACK
PUBLICATION_PROFILE_SUBSTACK┘

EDITOR_PROFILE_MARCO ──────┐
                            ├──► WRITING_CONTEXT_MARCO_LINKEDIN
PUBLICATION_PROFILE_LINKEDIN┘
```

El mismo PUBLICATION_PROFILE puede aparecer en WRITING_CONTEXTs de distintos editores si varios colaboran en la misma publicación:

```
EDITOR_PROFILE_MARCO ──────┐
                            ├──► WRITING_CONTEXT_MARCO_TINTA
PUBLICATION_PROFILE_TINTA ─┤
                            ├──► WRITING_CONTEXT_ANA_TINTA
EDITOR_PROFILE_ANA ────────┘
```

---

## PARTE 5: PROCESO DE CREACIÓN

PROMPT_POST_BRIEF crea el PUBLICATION_PROFILE cuando no existe. El proceso es mínimo: el sistema pregunta solo lo que no puede inferir.

**Lo que el sistema infiere:**
- Plataforma: del nombre o URL que declara el editor
- Idioma: del EDITOR_PROFILE
- Formato por defecto: de la plataforma (Substack → post_estandar por defecto)

**Lo que el sistema pregunta** (si no puede inferirlo):
- Nombre y URL de la publicación
- Descripción de la audiencia en 2–3 líneas
- Temas centrales (content pillars)
- Objetivo principal

Los campos de `success_criteria`, `tone_fit` y `ai_disclosure_policy` se rellenan con valores por defecto razonables y el editor puede ajustarlos después.

---

## PARTE 6: VERSIONADO

El PUBLICATION_PROFILE se versiona cuando cambian sus criterios editoriales de forma significativa: cambio de audiencia objetivo, cambio de tono, cambio de política de IA, o redefinición de los content pillars.

Cambios menores en `notes` se editan directamente sin nueva versión.

---

## PARTE 7: EJEMPLO COMPLETO

```
---
id:                  PUBLICATION_PROFILE_SUBSTACK_GALEO
version:             1.0
created:             2026-04-11
updated:             2026-04-11
---

## IDENTIFICACIÓN

publication_name:    Galeo Tech — Substack
platform:            Substack
url:                 galeo.substack.com
language:            Español

## AUDIENCIA

audience_description: |
  Profesionales técnicos, consultores y directivos con interés en IA,
  sistemas complejos y tecnología aplicada. Perfil: formación técnica o
  experiencia en innovación. Nivel: capaz de seguir argumentos con
  referencias científicas sin necesitar definiciones básicas.

audience_size:        500–5k
audience_relation:    suscriptores

## FORMATO

default_format:       post_estandar
word_count_typical:   900–1.200
post_frequency:       quincenal
series:               true
series_notes:         |
  Publica en series temáticas. Cada post debe ser autónomo pero
  puede cerrar con promesa explícita de continuación. El primer
  post de una serie establece el marco; los siguientes lo desarrollan.

## CRITERIOS EDITORIALES

tone_fit: |
  El registro técnico-reflexivo es el dominante. La ironía crítica
  frente a consensos fáciles funciona bien con esta audiencia.
  El deslenguamiento calculado es aceptable en dosis puntuales.
  El tono confesional o autobiográfico queda fuera de lugar aquí.

content_pillars: |
  - Inteligencia Artificial: impacto cognitivo, social y productivo
  - Sistemas complejos: pensamiento sistémico aplicado a organizaciones y sociedad
  - Tecnología e innovación: análisis crítico sin tecno-optimismo ingenuo
  - Intersección ciencia-humanidades

content_restrictions: |
  - Sin contenido de marketing o promocional
  - Sin posicionamiento político explícito
  - Sin simplificaciones excesivas de temas técnicos complejos
  - Sin listas de consejos o frameworks sin fundamento analítico

## OBJETIVOS Y CRITERIOS DE ÉXITO

primary_goal:         autoridad

success_criteria: |
  Un post funciona bien cuando genera respuestas de lectores que
  desarrollan o discuten el argumento. Las métricas secundarias son
  tasa de apertura y compartidos. El criterio cualitativo principal
  es que el lector salga con un marco analítico nuevo o con una
  pregunta que antes no tenía.

cta_style:            sutil
cta_notes:            |
  La llamada a la acción preferida es la promesa de continuidad:
  el argumento inconcluso actúa como invitación a seguir leyendo.
  No se pide explícitamente que se comparta o suscriba.

## TRANSPARENCIA IA

ai_disclosure_policy: seccion_dedicada
ai_disclosure_notes:  |
  La publicación tiene una sección dedicada donde se explica el
  proceso de escritura con IA. Los posts individuales no necesitan
  declararlo post a post.

## NOTAS

notes: |
  Publicación de Marco Laucelli para Galeo Tech. Contexto de uso
  habitual para posts técnico-reflexivos sobre IA y sistemas.
```

---

**FIN DEL DOCUMENTO**
