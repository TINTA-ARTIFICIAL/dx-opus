---
id:          RESOURCE_EVALUATION_FRAMEWORK
type:        RESOURCE
subsystem:   EVALUATION
version:     1.1
status:      ACTIVE
created:     2026-02-22
updated:     2026-04-16
owner_chat:  evaluation-dev
implements:  DL-20260221-003
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-04-16 | JM | Updated evaluator inventory: EVALUATE_POST marked ACTIVE (created 2026-04-12). EVALUATE_BOOK_STYLE ownership corrected — now lives in evaluation/ not editorial-profile/ (DL_20260330_SYSTEM_004). |
| v1.0 | 2026-02-22 | evaluation-dev | Initial version. Define contrato de evaluación, protocolo de invocación y filosofía del subsistema. |

## DEPENDENCIES

```
inputs:  []
outputs: [PROMPT_EVALUATE_RESEARCH_REPORT, PROMPT_EVALUATE_BOOK_CONTENT,
          PROMPT_EVALUATE_BOOK_STYLE, PROMPT_EVALUATE_POST,
          PROMPT_EVALUATE_ACTIVATION]
calls:   []
```

## DESCRIPTION

Framework fundacional del subsistema EVALUATION. Define el contrato estable que todos los evaluadores deben cumplir: el formato de output canónico, el protocolo de invocación y la filosofía de evaluación. Los workflows que invocan evaluadores solo dependen de este contrato — no de la lógica interna de cada evaluador.

---

# RESOURCE: EVALUATION FRAMEWORK v1.1

---

## SECCIÓN 1: PROPÓSITO Y PRINCIPIO DE DISEÑO

### Propósito

Este documento define la **interfaz estable** entre el subsistema EVALUATION y el resto del sistema D-X-OPUS. Cualquier workflow que necesite evaluar un artefacto invoca un evaluador y lee su output. Este documento especifica exactamente cómo es ese output y qué garantías ofrece.

### Principio de diseño central

**Separación entre contrato y lógica.**

Los evaluadores pueden evolucionar — cambiar su método de scoring, añadir dimensiones, ajustar umbrales — sin afectar a los workflows que los invocan. Esto es posible porque:

* Los **workflows** solo leen `status` y `decision_guidance`.
* La **lógica interna** de cómo se llega a ese status es responsabilidad exclusiva de cada evaluador.
* El **contrato** (formato de output) es estable y versionado.

Cuando el contrato cambia de versión (v1.0 → v2.0), todos los evaluadores deben actualizarse para cumplirlo. Cuando un evaluador actualiza su lógica interna pero mantiene el contrato, los workflows no se tocan.

---

## SECCIÓN 2: INVENTARIO DE EVALUADORES

El subsistema EVALUATION gestiona los siguientes evaluadores:

| Evaluador | Versión | Artefacto evaluado | Status |
|---|---|---|---|
| EVALUATE_RESEARCH_REPORT | v1.1 | RESEARCH_REPORT / RESEARCH_DEEP_DIVE | ACTIVE |
| EVALUATE_BOOK_CONTENT | v1.1 | Capítulo o libro completo | ACTIVE |
| EVALUATE_BOOK_STYLE | v1.1 | Adherencia al perfil editorial del autor | ACTIVE |
| EVALUATE_POST | v1.0 | Post o artículo | ACTIVE |
| EVALUATE_ACTIVATION | — | Campaña de contenido | PENDING |

**Nota sobre EVALUATE_BOOK_STYLE:** Pertenece al subsistema **EVALUATION**. Aunque necesita EDITOR_PROFILE como input, el ownership lo determina su función (evaluar), no sus inputs. El archivo vive en `evaluation/PROMPT_EVALUATE_BOOK_STYLE.md`. Ver DL_20260330_SYSTEM_004.

---

## SECCIÓN 3: CONTRATO DE EVALUACIÓN — OUTPUT CANÓNICO

Todo evaluador del sistema D-X-OPUS debe producir exactamente este output al finalizar su ejecución.

### 3.1 Formato del EVALUATION_RESULT

```
EVALUATION_RESULT:
  status:            GREEN | YELLOW | RED
  score:             X/100
  decision_guidance: [instrucción concreta para el editor]
  blocking_issues:   [...] (obligatorio en RED; vacío en GREEN y YELLOW)
  improvement_areas: [...] (obligatorio en YELLOW; vacío en GREEN)
  strengths:         [...] (siempre presente, mínimo 2 items)
```

### 3.2 Semántica de cada campo

**`status`** — El único campo que los workflows leen de forma automática.

| Valor | Significado | Consecuencia para el editor |
|---|---|---|
| `GREEN` | El artefacto cumple los estándares de calidad. | Puede continuar al siguiente paso del workflow. |
| `YELLOW` | El artefacto tiene áreas de mejora pero no bloquea el avance. | Decide si iterar antes de continuar. |
| `RED` | El artefacto tiene problemas que bloquean el avance. | Debe corregir antes de continuar. |

**`score`** — Puntuación numérica 0–100. Cada evaluador define su propio método de cálculo internamente. El score es orientativo para el editor — el campo determinante para los workflows es `status`.

**`decision_guidance`** — Instrucción concreta y accionable para el editor. No es una descripción del resultado — es una instrucción de qué hacer a continuación.

**`blocking_issues`** — Solo en RED. Lista de los problemas específicos que impiden avanzar. Debe ser lo suficientemente concreto para que el editor sepa exactamente qué corregir.

**`improvement_areas`** — Solo en YELLOW. Lista de áreas que mejorarían el artefacto. Su corrección es recomendada pero no obligatoria para avanzar.

**`strengths`** — Siempre presente, mínimo 2 items. Los puntos fuertes del artefacto evaluado. Su presencia evita que el feedback sea puramente negativo y orienta qué mantener en correcciones.

### 3.3 Reglas de integridad del output

* `blocking_issues` debe estar vacío (lista vacía `[]`) en GREEN y YELLOW.
* `improvement_areas` debe estar vacío en GREEN y RED.
* `strengths` debe tener al menos 2 items en cualquier status.
* `decision_guidance` debe ser una instrucción accionable, no una descripción.

---

## SECCIÓN 4: PROTOCOLO DE INVOCACIÓN

### Cómo invocan los workflows a un evaluador

Los workflows no controlan la lógica interna de evaluación. Solo invocan el evaluador con los inputs requeridos y leen el EVALUATION_RESULT.

**Patrón estándar en un workflow:**

```
[Paso N] Invocar EVALUATE_[TIPO]
  → Inputs: [lista de inputs requeridos por ese evaluador]
  → Leer: EVALUATION_RESULT.status y EVALUATION_RESULT.decision_guidance
  → Si GREEN: continuar al siguiente paso
  → Si YELLOW: mostrar decision_guidance al editor → editor decide
  → Si RED: mostrar decision_guidance + blocking_issues → detener hasta corrección
```

### Lo que los workflows NO hacen

* No interpretan el score directamente (solo el status).
* No leen blocking_issues, improvement_areas ni strengths de forma automática — esos campos son para el editor.
* No conocen las dimensiones internas de evaluación de cada evaluador.

---

## SECCIÓN 5: FILOSOFÍA DE EVALUACIÓN

### Evaluación como servicio al editor

Los evaluadores no toman decisiones — las informan. El editor siempre tiene la última palabra. El EVALUATION_RESULT proporciona información estructurada para que esa decisión sea informada, no para sustituirla.

En particular: un RED no impide físicamente continuar. Significa que el sistema recomienda no continuar. El editor puede decidir avanzar de todas formas — el workflow lo muestra claramente y registra la decisión.

### Consistencia entre evaluadores

Todos los evaluadores del sistema comparten el mismo contrato de output. Esto significa que un workflow puede invocar cualquier evaluador sin saber nada de su lógica interna. Si en el futuro se añade un nuevo tipo de evaluación, el contrato garantiza que los workflows existentes no necesitan cambiar.

### Evolución del contrato

Cuando se necesite cambiar el formato del EVALUATION_RESULT (añadir campos, cambiar semántica), se incrementa la versión del contrato (v1.0 → v2.0) y todos los evaluadores actualizan su campo `implements`. Los workflows leen `implements` para saber qué versión del contrato pueden esperar.

---

## SECCIÓN 6: REFERENCIA RÁPIDA — IMPLEMENTS

Todos los evaluadores deben declarar en su YAML header:

```yaml
implements: RESOURCE_EVALUATION_FRAMEWORK_v1.0
```

Cuando se actualice el contrato a v1.1 o v2.0, actualizar este campo en todos los evaluadores.

**Estado actual de implementación (v1.0):**

| Evaluador | implements | Status |
|---|---|---|
| PROMPT_EVALUATE_RESEARCH_REPORT | RESOURCE_EVALUATION_FRAMEWORK_v1.0 | ✅ |
| PROMPT_EVALUATE_BOOK_CONTENT | RESOURCE_EVALUATION_FRAMEWORK_v1.0 | ✅ |
| PROMPT_EVALUATE_BOOK_STYLE | RESOURCE_EVALUATION_FRAMEWORK_v1.0 | ✅ |
| PROMPT_EVALUATE_POST | RESOURCE_EVALUATION_FRAMEWORK_v1.0 | ✅ |
| PROMPT_EVALUATE_ACTIVATION | — | PENDING |

---

**FIN DEL DOCUMENTO**
