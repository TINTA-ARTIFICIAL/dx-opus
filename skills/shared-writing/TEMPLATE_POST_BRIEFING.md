---
id:          TEMPLATE_POST_BRIEFING
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
| v1.0 | 2026-04-11 | writing-dev | Initial version. Continuity artifact for multi-session writing and post split handoff. |

## DEPENDENCIES

inputs:  [POST_SEED]
outputs: []
calls:   []

## DESCRIPTION

Plantilla de continuación del post. Captura el estado al cierre de una sesión de escritura o al dividir un post en dos. Permite reanudar sin perder contexto y sin depender de la conversación anterior.

---

# TEMPLATE: POST_BRIEFING

## Sistema D-X-OPUS — Artefacto de Continuidad del Post

---

## INSTRUCCIONES DE USO

El POST_BRIEFING se produce en dos situaciones:

**Situación A — Cierre de sesión de escritura:**
PROMPT_WRITE_POST lo genera al finalizar una sesión en la que el post no ha quedado completo. El editor lo carga al inicio de la siguiente sesión junto con el POST_SEED y el borrador parcial.

**Situación B — División de post:**
PROMPT_SPLIT_POST lo genera para describir el post 2 resultante de la división. El editor lo usa como punto de partida de la siguiente sesión POST.

**Quién lo produce:** PROMPT_WRITE_POST (Situación A) o PROMPT_SPLIT_POST (Situación B).

**Quién lo consume:** PROMPT_WRITE_POST al inicio de la sesión siguiente.

La estructura es idéntica en ambas situaciones. El campo `briefing_type` indica el origen.

---

# POST_BRIEFING: [TÍTULO PROVISIONAL DEL POST]

---

## SECCIÓN 1: IDENTIFICACIÓN

```
post_seed_id:        [ID o título del POST_SEED de referencia]
briefing_type:       continuacion_sesion | post_2_tras_split
briefing_date:       [Fecha de generación]
session_number:      [Número de sesión que cierra este briefing — solo si continuacion_sesion]
produced_by:         PROMPT_WRITE_POST | PROMPT_SPLIT_POST
```

---

## SECCIÓN 2: ESTADO ACTUAL

*Resumen ejecutivo del estado del post en el momento de generar este briefing.*

### 2.1 Progreso de secciones

| # | Título de sección | Palabras escritas | Estado |
|---|-------------------|------------------:|--------|
| 1 | [título] | [N] | aprobada / borrador / pendiente |
| 2 | [título] | [N] | aprobada / borrador / pendiente |
| … | … | … | … |

**Palabras totales escritas:** [N]
**Palabras restantes hasta target:** [N]
**Porcentaje completado:** [N%]

---

### 2.2 Diagnóstico general

```
overall_status:      en_progreso | borrador_completo_pendiente_revision
qa_executed:         true | false
hybrid_mode_active:  true | false
```

---

## SECCIÓN 3: LO QUE ESTÁ FIJADO

*Decisiones tomadas que no deben revertirse en la siguiente sesión. El sistema las trata como hechos establecidos.*

### 3.1 Núcleo narrativo confirmado

> [Copiar de la Sección 2 del POST_SEED las confirmaciones del editor:
> pregunta central, movimiento narrativo y orden de argumentos en su
> versión definitiva. Si el editor ajustó alguno durante la escritura,
> reflejar aquí la versión ajustada, no la original.]

**Pregunta o tensión central:**
> [texto confirmado]

**Movimiento narrativo:**
> [texto confirmado]

**Orden de argumentos:**
> [lista confirmada]

---

### 3.2 Secciones aprobadas

> [Lista de secciones que el editor ha aprobado y que no deben modificarse.
> Incluir cualquier instrucción relevante sobre cómo conectar con ellas.]

- Sección [N]: aprobada. [Instrucción de conexión si aplica.]
- Sección [N]: aprobada. [Instrucción de conexión si aplica.]

---

### 3.3 Material citable usado

> [IDs del INVENTARIO_IDEAS ya integrados en el borrador. No repetir en
> las secciones pendientes.]

- [ML-001] — integrado en sección [N]
- [ID-002] — integrado en sección [N]

---

## SECCIÓN 4: LO QUE ESTÁ ABIERTO

*Decisiones pendientes que la siguiente sesión debe resolver antes o durante la escritura.*

### 4.1 Secciones pendientes de escribir

> [Lista de secciones que quedan por escribir, en orden. Para cada una,
> indicar cualquier instrucción específica que no esté ya en el POST_SEED.]

- Sección [N]: [instrucción adicional o "sin cambios respecto al POST_SEED"]
- Sección [N]: [instrucción adicional o "sin cambios respecto al POST_SEED"]

---

### 4.2 Decisiones editoriales abiertas

> [Decisiones que no se han tomado aún y que el sistema debe resolver
> o proponer al editor al inicio de la siguiente sesión.]

| Decisión | Opciones | Impacto |
|---------|---------|---------|
| [qué hay que decidir] | [opción A / opción B] | [qué secciones afecta] |

*Si no hay decisiones abiertas, indicar: "Ninguna — continuar según POST_SEED."*

---

### 4.3 Gancho de apertura

> [Si el gancho no estaba fijado en el POST_SEED y tampoco se decidió
> durante la sesión, registrar aquí las opciones propuestas para que
> el editor elija al inicio de la siguiente sesión.]

- Opción A: [descripción]
- Opción B: [descripción]
- Opción C: [descripción]

*Si el gancho ya está fijado, indicar: "Gancho fijado — ver Sección 3."*

---

## SECCIÓN 5: LO QUE ESTÁ EN RIESGO

*Aspectos que requieren atención especial en la siguiente sesión.*

### 5.1 Afirmaciones pendientes de verificar

> [Afirmaciones marcadas con `[⚠ VERIFICAR]` en el borrador que el
> editor debe resolver antes de aprobar el post.]

| Sección | Afirmación | Acción recomendada |
|---------|-----------|-------------------|
| [N] | [texto de la afirmación] | omitir / reformular / buscar fuente |

*Si no hay afirmaciones en riesgo, indicar: "Sin afirmaciones pendientes de verificar."*

---

### 5.2 Tensiones narrativas detectadas

> [Problemas de coherencia, saltos de tono, o transiciones débiles
> detectados en el borrador actual que la siguiente sesión debe resolver.]

- [descripción del problema y sección afectada]

*Si no hay tensiones, indicar: "Borrador coherente hasta el punto actual."*

---

### 5.3 Riesgo de longitud

```
current_words:       [N]
target_range:        [rango del WRITING_CONTEXT]
remaining_sections:  [N]
estimated_remaining: [N palabras estimadas para completar]
projected_total:     [N — current + estimated]
length_status:       dentro_de_rango | riesgo_de_exceso | riesgo_de_cortedad
```

> [Si hay riesgo de exceso: secciones candidatas a comprimir o fusionar.
>  Si hay riesgo de cortedad: secciones candidatas a expandir.
>  Si está dentro del rango: vacío.]

---

## SECCIÓN 6: CONTEXTO PARA EL POST 2 *(solo si briefing_type = post_2_tras_split)*

*Esta sección solo existe cuando el POST_BRIEFING lo produce PROMPT_SPLIT_POST.*

---

### 6.1 Punto de corte

> [Descripción del punto donde se dividió el post. Por qué es el corte
> natural. Cómo queda el post 1 tras el ajuste.]

---

### 6.2 Promesa al lector

> [Qué prometió el post 1 al lector, explícita o implícitamente.
> El post 2 debe cumplirlo.]

---

### 6.3 Núcleo narrativo del post 2

**Pregunta o tensión central:**
> [La pregunta que el post 2 debe responder o desarrollar.]

**Movimiento narrativo propuesto:**
> [Cómo avanza el argumento del post 2.]

**Material disponible:**
> [Qué ideas, fuentes o formulaciones del INVENTARIO_IDEAS original
> quedan disponibles para el post 2 y no fueron usadas en el post 1.]

---

### 6.4 Instrucciones para la siguiente sesión

> [Qué debe hacer el editor antes de invocar PROMPT_POST_BRIEF para
> el post 2: actualizar WRITING_CONTEXT si aplica, cargar este
> POST_BRIEFING como input, confirmar el núcleo narrativo propuesto.]

---

## SECCIÓN 7: INSTRUCCIONES DE REANUDACIÓN

*Pasos concretos para retomar el trabajo en la siguiente sesión.*

```
1. Cargar: POST_SEED + borrador parcial (o post 1 ajustado si split) + este POST_BRIEFING
2. Revisar Sección 4 (decisiones abiertas) antes de continuar
3. Resolver Sección 5 (riesgos) si hay elementos críticos
4. Continuar escritura desde sección: [N]
5. Invocar: PROMPT_WRITE_POST
```

---

**FIN DEL TEMPLATE**
