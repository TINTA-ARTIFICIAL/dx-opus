---
id:          SPEC_LEARNING_SIGNALS
type:        SCHEMA
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
| v1.0 | 2026-04-11 | writing-dev | Initial version. Prerequisite for Sprint 4 mechanism. Specifies three learning signal types captured in POST workflow. |

## DEPENDENCIES

inputs:  [INVENTARIO_IDEAS, POST_SEED]
outputs: [input para actualización futura de EDITOR_PROFILE]
calls:   []

## DESCRIPTION

Especificación de las tres señales de aprendizaje que el workflow POST captura para enriquecer el EDITOR_PROFILE. Define qué es cada señal, cómo se captura, dónde se almacena y cómo se usará en Sprint 4. Prerequisito para el mecanismo de actualización del EDITOR_PROFILE por aprendizaje.

---

# SPEC: LEARNING_SIGNALS

## Sistema D-X-OPUS — Señales de Aprendizaje del EDITOR_PROFILE

---

## PARTE 1: PROPÓSITO

El EDITOR_PROFILE es un artefacto vivo. Se enriquece con el uso: cada post producido con el workflow genera evidencia sobre cómo escribe realmente este editor — no solo cómo describe que escribe. Las señales de aprendizaje son el mecanismo que captura esa evidencia durante el workflow y la hace disponible para actualizar el EDITOR_PROFILE.

Esta especificación define tres tipos de señales, cómo se capturan en el workflow POST y cómo se procesarán en Sprint 4 para actualizar el EDITOR_PROFILE. El mecanismo de actualización en sí — cuándo, cómo y quién incorpora las señales al EDITOR_PROFILE — es trabajo de Sprint 4 (writing-dev + editorial-profile-dev + evaluation-dev). Esta spec es el prerequisito: sin ella, Sprint 4 no tiene qué procesar.

---

## PARTE 2: LAS TRES SEÑALES

### SEÑAL 1: Patrones estructurales del Q&A

**Qué es:**
Patrones generalizables que emergen durante PROMPT_QA_IDEAS sobre cómo este editor construye argumentos, conecta ideas o articula posiciones. No son posiciones sobre el tema del post — son constantes del editor que se manifiestan independientemente del tema.

**Qué NO es:**
- Una posición específica del editor sobre el tema de este post
- Una preferencia de estilo ya documentada en el EDITOR_PROFILE
- Una formulación que vale para este post pero no se generaliza

**Ejemplos de patrones que SÍ son Señal 1:**
- "El editor siempre ancla argumentos abstractos en un caso concreto antes de generalizar"
- "El editor usa la ironía para introducir el argumento que más le importa, no para el secundario"
- "El editor nunca cierra con certeza — siempre deja una pregunta abierta o un matiz"

**Ejemplos de lo que NO es Señal 1:**
- "El editor cree que la IA puede degradar capacidades cognitivas" → posición sobre un tema
- "El editor prefiere párrafos cortos" → ya está en el EDITOR_PROFILE

**Dónde se captura:** PROMPT_QA_IDEAS, marcado con `📘 SEÑAL DE APRENDIZAJE`

**Dónde se almacena:** INVENTARIO_IDEAS, Sección 6 (Señales de aprendizaje)

**Formato de registro:**
```
[SA-001]
Tipo:     patron_estructural
Señal:    [descripción del patrón en una frase]
Contexto: [en qué momento del Q&A emergió — qué pregunta, qué respuesta]
Post:     [ID o título del post donde se capturó]
```

---

### SEÑAL 2: Correcciones al borrador

**Qué es:**
Las correcciones que el editor hace al borrador producido por PROMPT_WRITE_POST revelan la distancia entre cómo el EDITOR_PROFILE describe el estilo y cómo el editor realmente escribe. Cada corrección es una señal de que hay algo en el EDITOR_PROFILE que está incompleto, impreciso o desactualizado.

**Tipos de correcciones relevantes:**

| Tipo | Descripción | Lo que revela |
|------|-------------|---------------|
| Corrección de tono | El editor cambia el registro de una sección | El EDITOR_PROFILE no captura bien el tono para este tipo de argumento |
| Corrección de estructura | El editor reorganiza el orden de párrafos o secciones | El movimiento narrativo habitual del editor es distinto del modelado |
| Corrección de voz | El editor reescribe una frase para que suene más a él | Hay un patrón de voz no documentado en el EDITOR_PROFILE |
| Corrección de no-go | El editor elimina algo que el sistema no había identificado como problema | Hay un no-go implícito no documentado |
| Sin corrección | El editor aprueba sin cambios | Confirma que el EDITOR_PROFILE es preciso para este tipo de contenido |

**Qué NO se captura como Señal 2:**
- Correcciones de hechos o datos (eso es verificación, no estilo)
- Correcciones de errores obvios de redacción
- Preferencias puntuales que el editor declara como excepciones

**Dónde se captura:** durante la validación sección a sección en PROMPT_WRITE_POST

**Dónde se almacena:** POST_SEED, Sección 7 (Estado del post) — campo `corrections_log` para Sprint 4

**Formato de registro:**
```
[CO-001]
Tipo:        tono | estructura | voz | no_go | sin_corrección
Sección:     [N]
Original:    "[fragmento del borrador corregido — máximo una frase representativa]"
Corregido:   "[versión del editor — máximo una frase representativa]"
Implicación: [qué sugiere sobre el EDITOR_PROFILE — a completar en Sprint 4]
```

**Nota de implementación para Sprint 4:** el `corrections_log` no existe todavía en el TEMPLATE_POST_SEED v1.0 — se añadirá en la actualización v1.1 como parte del mecanismo de Sprint 4. En Sprint 3, las correcciones se registran informalmente en las notas de sesión.

---

### SEÑAL 3: Delta borrador / publicado

**Qué es:**
La diferencia entre el borrador que PROMPT_WRITE_POST produce y el texto que el editor finalmente publica. Este delta es la señal más valiosa y también la más difícil de capturar: requiere que el editor comparta el texto publicado después de la sesión.

El delta revela patrones de edición post-workflow: qué hace el editor sistemáticamente cuando revisa el borrador fuera de sesión, antes de publicar. A diferencia de las correcciones en sesión (Señal 2), el delta captura las decisiones editoriales que el editor toma con calma, sin la IA presente.

**Tipos de delta relevantes:**

| Tipo | Descripción |
|------|-------------|
| Expansión | El editor desarrolla más una sección que el borrador dejó corta |
| Compresión | El editor acorta o elimina secciones del borrador |
| Reformulación sistemática | El editor reescribe ciertos tipos de frases de forma consistente |
| Reorganización | El editor cambia el orden de argumentos o secciones |
| Adición de voz | El editor añade elementos de su voz personal que el borrador no captó |
| Publicación sin cambios | El editor publica el borrador tal como está |

**Qué NO se captura como Señal 3:**
- Cambios de último momento por contexto externo (noticias, eventos)
- Correcciones de errores tipográficos
- Adaptaciones de formato específicas de la plataforma

**Dónde se captura:** fuera del workflow — el editor comparte el texto publicado después de publicar

**Dónde se almacena:** archivo de delta por post, referenciado desde el POST_SEED

**Formato de registro:**
```
[DE-001]
Post:        [ID o título del post]
Fecha:       [fecha de publicación]
Delta_tipo:  expansión | compresión | reformulación | reorganización | adición_voz | sin_cambios
Descripción: [qué cambió y en qué sección]
Patrón:      [si el editor hace este tipo de cambio consistentemente — a evaluar en Sprint 4]
```

**Nota sobre la captura:** la Señal 3 no puede automatizarse en Sprint 3 porque requiere acceso al texto publicado después del workflow. En Sprint 4, el mecanismo de captura se diseñará con editorial-profile-dev. En Sprint 3, el workflow simplemente hace visible al editor que esta señal existe y que compartir el texto publicado enriquece el EDITOR_PROFILE.

---

## PARTE 3: FLUJO DE CAPTURA EN EL WORKFLOW

```
PROMPT_QA_IDEAS
    │
    ├── Captura Señal 1 (patrones estructurales)
    │   Marca: 📘 SEÑAL DE APRENDIZAJE
    │   Almacena: INVENTARIO_IDEAS Sección 6
    │
    ▼
PROMPT_WRITE_POST
    │
    ├── Captura Señal 2 (correcciones al borrador)
    │   Registra en: notas de sesión (Sprint 3)
    │                corrections_log del POST_SEED (Sprint 4)
    │
    ▼
[Post publicado — fuera del workflow]
    │
    └── Captura Señal 3 (delta borrador/publicado)
        Requiere: editor comparte texto publicado
        Almacena: archivo de delta referenciado desde POST_SEED
```

---

## PARTE 4: USO EN SPRINT 4

Las tres señales son inputs para el mecanismo de actualización del EDITOR_PROFILE que se diseñará en Sprint 4. Esta spec define qué hay que procesar — Sprint 4 define cómo procesarlo.

**Lo que Sprint 4 debe resolver:**

| Pregunta | Responsable |
|---------|-------------|
| ¿Con qué frecuencia se revisan las señales para actualizar el EDITOR_PROFILE? | writing-dev + editorial-profile-dev |
| ¿Qué umbral de señales acumuladas justifica una actualización? | editorial-profile-dev |
| ¿Quién valida que el patrón detectado es real y no un artefacto de un post concreto? | editor + editorial-profile-dev |
| ¿Cómo se integran las señales en la estructura del EDITOR_PROFILE? | editorial-profile-dev |
| ¿Cómo se captura el delta borrador/publicado de forma que no añada fricción al editor? | writing-dev + evaluation-dev |

**Lo que esta spec garantiza para Sprint 4:**
- Las señales están definidas con precisión suficiente para diseñar el mecanismo
- El punto de captura de cada señal está localizado en el workflow
- El formato de registro es consistente entre posts y sessions

---

## PARTE 5: RELACIÓN CON ARTEFACTOS EXISTENTES

| Artefacto | Relación con las señales |
|-----------|-------------------------|
| EDITOR_PROFILE | Destino final — se enriquece con las señales procesadas |
| INVENTARIO_IDEAS | Almacena Señal 1 en Sección 6 |
| TEMPLATE_POST_SEED | Almacenará Señal 2 en v1.1 (campo corrections_log) |
| PROMPT_QA_IDEAS | Punto de captura de Señal 1 |
| PROMPT_WRITE_POST | Punto de captura de Señal 2 |
| SPEC_LEARNING_SIGNALS | Este documento — define el mecanismo de captura |

---

## PARTE 6: LO QUE NO CUBRE ESTA SPEC

Esta spec cubre la captura y el formato de las señales. No cubre:

- El mecanismo de actualización del EDITOR_PROFILE (Sprint 4)
- La frecuencia de revisión de señales acumuladas (Sprint 4)
- La interfaz con editorial-profile-dev para la actualización (Sprint 4)
- La captura automatizada del delta borrador/publicado (Sprint 4)

Cualquier desarrollo de estos puntos en Sprint 3 sería prematuro — requiere coordinación con editorial-profile-dev y evaluation-dev que aún no ha ocurrido.

---

**FIN DEL DOCUMENTO**
