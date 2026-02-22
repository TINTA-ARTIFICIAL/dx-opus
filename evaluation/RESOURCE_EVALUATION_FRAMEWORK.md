---
id:          RESOURCE_EVALUATION_FRAMEWORK
type:        RESOURCE
subsystem:   EVALUATION
version:     1.0
status:      ACTIVE
created:     2026-02-22
updated:     2026-02-22
owner_chat:  evaluation-dev
implements:  DL-20260221-003
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-22 | evaluation-dev | Initial version. Define contrato de evaluación, protocolo de invocación y filosofía del subsistema. |

## DEPENDENCIES
inputs:  []
outputs: [PROMPT_EVALUATE_RESEARCH_REPORT, PROMPT_EVALUATE_BOOK_CONTENT, PROMPT_EVALUATE_POST, PROMPT_EVALUATE_ACTIVATION]
calls:   []

## DESCRIPCIÓN
Framework fundacional del subsistema EVALUATION. Define el contrato estable que todos los evaluadores deben cumplir: el formato de output canónico, el protocolo de invocación y la filosofía de evaluación. Los workflows que invocan evaluadores solo dependen de este contrato — no de la lógica interna de cada evaluador.

---

# RESOURCE: EVALUATION FRAMEWORK v1.0

---

## SECCIÓN 1: PROPÓSITO Y PRINCIPIO DE DISEÑO

### Propósito

Este documento define la **interfaz estable** entre el subsistema EVALUATION y el resto del sistema D-X-OPUS. Cualquier workflow que necesite evaluar un artefacto invoca un evaluador y lee su output. Este documento especifica exactamente cómo es ese output y qué garantías ofrece.

### Principio de diseño central

**Separación entre contrato y lógica.**

Los evaluadores pueden evolucionar — cambiar su método de scoring, añadir dimensiones, ajustar umbrales — sin afectar a los workflows que los invocan. Esto es posible porque:

- Los **workflows** solo leen `status` y `decision_guidance`.
- La **lógica interna** de cómo se llega a ese status es responsabilidad exclusiva de cada evaluador.
- El **contrato** (formato de output) es estable y versionado.

Cuando el contrato cambia de versión (v1.0 → v2.0), todos los evaluadores deben actualizarse para cumplirlo. Cuando un evaluador actualiza su lógica interna pero mantiene el contrato, los workflows no se tocan.

---

## SECCIÓN 2: INVENTARIO DE EVALUADORES

El subsistema EVALUATION gestiona los siguientes evaluadores:

| Evaluador | Versión | Artefacto evaluado | Status |
|---|---|---|---|
| EVALUATE_RESEARCH_REPORT | v1.1 | RESEARCH_REPORT / RESEARCH_DEEP_DIVE | ACTIVE |
| EVALUATE_BOOK_CONTENT | v1.1 | Capítulo o libro completo | ACTIVE |
| EVALUATE_POST | — | Post o artículo | PENDING |
| EVALUATE_ACTIVATION | — | Campaña de contenido | PENDING |

**Nota sobre EVALUATE_BOOK_STYLE:** Este evaluador pertenece al subsistema **Editorial Profile**, no a Evaluation. Evalúa adherencia a la voz del autor. Sin embargo, debe producir el mismo output canónico definido en la Sección 3 de este documento. Cuando el contrato de evaluación cambia de versión, evaluation-dev notifica a editorial-profile-dev para que EVALUATE_BOOK_STYLE se actualice.

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
| `YELLOW` | El artefacto tiene áreas de mejora pero no bloquea el avance. | Decide si iterar antes de continuar o continuar con los gaps identificados. |
| `RED` | El artefacto tiene problemas que bloquean el avance. | Debe corregir antes de continuar. No proceder. |

**`score`** — Puntuación numérica agregada de 0 a 100. Permite comparar versiones del mismo artefacto y hacer seguimiento de mejora. Cada evaluador define su fórmula de scoring interna. El score no determina por sí solo el status: el status puede resultar RED aunque el score sea moderado si existe un blocking issue concreto.

**`decision_guidance`** — Instrucción directa y accionable para el editor. No es una descripción del resultado; es una recomendación de acción. Ejemplos correctos:

- `"Procede a escritura. El report está listo."`
- `"Refuerza cobertura en Sección 4 antes de escribir. Estima 4-6h adicionales."`
- `"No procedas. Revisa los 2 blocking issues y re-evalúa."`

**`blocking_issues`** — Lista de problemas que impiden el avance. Solo presente en RED. Cada item debe ser específico, ubicado en el artefacto y accionable. Formato:

```
blocking_issues:
  - issue: "Menos del 20% de fuentes son Tier 1 en Secciones 3 y 4 (claims centrales)"
    location: "Secciones 3.2, 4.1, 4.3"
    action: "Añadir mínimo 5 fuentes Tier 1 para los claims de X e Y"
  - issue: "..."
```

**`improvement_areas`** — Lista de áreas de mejora. Obligatorio en YELLOW, vacío en GREEN. No son errores bloqueantes: el editor puede decidir continuar asumiendo el gap. Formato:

```
improvement_areas:
  - area: "Perspectiva de gobernanza subrepresentada"
    impact: "Los claims sobre regulación quedan con soporte TENTATIVE en lugar de MODERATE"
    action: "Añadir 2-3 fuentes de perspectiva regulatoria. Estima 2-3h."
  - area: "..."
```

**`strengths`** — Lista de fortalezas del artefacto. Siempre presente, mínimo 2 items. No es cortesía: orienta al editor sobre qué partes puede usar con confianza. Formato:

```
strengths:
  - "Base de fuentes Tier 1 sólida para claims centrales (68% en secciones 2-4)"
  - "Cobertura disciplinar equilibrada: 5 disciplinas representadas"
  - "..."
```

### 3.3 Reglas de consistencia

El output debe ser internamente consistente:

| Si status es... | Entonces... |
|---|---|
| `GREEN` | `blocking_issues` está vacío. `improvement_areas` está vacío. `score` es típicamente ≥70. |
| `YELLOW` | `blocking_issues` está vacío. `improvement_areas` tiene al menos 1 item. |
| `RED` | `blocking_issues` tiene al menos 1 item. `improvement_areas` puede estar vacío (no es el foco). |

Un score alto (ej. 75/100) puede coexistir con status RED si existe un blocking issue concreto que el score agregado no captura. El status siempre prevalece sobre el score numérico.

---

## SECCIÓN 4: PROTOCOLO DE INVOCACIÓN ESTÁNDAR

### 4.1 Firma estándar

```
EVALUATE([artefacto_a_evaluar], [contexto_mínimo]) → EVALUATION_RESULT
```

El `contexto_mínimo` es el conjunto mínimo de inputs que el evaluador necesita para producir un resultado válido. Varía por evaluador.

### 4.2 Contexto mínimo por evaluador

| Evaluador | Artefacto principal | Contexto mínimo obligatorio | Contexto opcional |
|---|---|---|---|
| EVALUATE_RESEARCH_REPORT | RESEARCH_REPORT(s) | SOURCE_AUTHORITY_HIERARCHY, CLAIM_VALIDATION_CRITERIA | RESEARCH_PLAN_DETAILED, metadata del proceso |
| EVALUATE_BOOK_CONTENT | Capítulo(s) / libro completo | BOOK_INDEX | RESEARCH_REPORTS usados como base |
| EVALUATE_BOOK_STYLE* | Capítulo(s) / libro completo | EDITOR_PROFILE | ESTILO_EDITORIAL, TIPOS_LIBROS |
| EVALUATE_POST | Post / artículo | EDITOR_PROFILE | Brief del post |
| EVALUATE_ACTIVATION | Campaña de contenido | BOOK_BRIEF | — |

*Gestionado por Editorial Profile, no por Evaluation.

### 4.3 Cómo invocar desde un workflow

Los workflows invocan evaluadores con una instrucción explícita que incluye:

1. El nombre del evaluador y su versión.
2. El artefacto a evaluar.
3. El contexto mínimo requerido.
4. La instrucción de producir el EVALUATION_RESULT canónico.

Ejemplo de invocación desde un workflow:

```
Ejecuta EVALUATE_RESEARCH_REPORT v1.1 sobre [RESEARCH_REPORT_X].
Contexto:
  - SOURCE_AUTHORITY_HIERARCHY: [archivo]
  - CLAIM_VALIDATION_CRITERIA: [archivo]
Produce el EVALUATION_RESULT canónico según RESOURCE_EVALUATION_FRAMEWORK v1.0.
```

### 4.4 Lo que los workflows hacen con el resultado

Los workflows leen el EVALUATION_RESULT y actúan según el status:

```
si status == GREEN  → continuar al siguiente paso
si status == YELLOW → presentar improvement_areas al editor y esperar decisión
si status == RED    → detener workflow, presentar blocking_issues, no continuar
```

Los workflows NO interpretan el score, NO leen blocking_issues por su cuenta, NO toman decisiones basadas en dimensiones internas del evaluador. Solo leen `status` y `decision_guidance`.

---

## SECCIÓN 5: FILOSOFÍA DE EVALUACIÓN

Todos los evaluadores del sistema comparten estos principios, independientemente de su lógica interna específica.

### 5.1 Basado en evidencia

Los claims deben tener fuente. La evaluación verifica que cada assertion esté respaldada por evidencia apropiada para su tipo. No se evalúa si el evaluador "cree" que algo es verdad; se evalúa si el artefacto lo sustenta adecuadamente.

### 5.2 Coherencia

El artefacto debe ser coherente internamente (sus partes no se contradicen) y con sus inputs (el output refleja lo que los inputs prometían). La incoherencia entre secciones es un problema de calidad, no solo editorial.

### 5.3 Utilidad

El criterio de evaluación es funcional: ¿el artefacto es suficientemente bueno para su propósito? Un RESEARCH_REPORT que será base para un libro de divulgación tiene criterios distintos a uno que sustentará un artículo académico. Los evaluadores tienen en cuenta el uso declarado del artefacto.

### 5.4 Iterabilidad

El feedback debe ser accionable. Una evaluación que identifica problemas pero no orienta sobre cómo resolverlos no cumple su función. Cada `blocking_issue` y cada `improvement_area` deben incluir una acción concreta.

### 5.5 Separación de responsabilidades

Cada evaluador evalúa su dominio y solo su dominio:

- **EVALUATE_RESEARCH_REPORT:** Calidad de la investigación (fuentes, claims, cobertura, metodología).
- **EVALUATE_BOOK_CONTENT:** Rigor factual del texto del libro (fuentes usadas, claims en prosa).
- **EVALUATE_BOOK_STYLE:** Adherencia a la voz del autor. (→ Editorial Profile)
- **EVALUATE_POST:** Calidad del post como pieza de contenido.
- **EVALUATE_ACTIVATION:** Coherencia y viabilidad de la campaña.

Ningún evaluador se pronuncia sobre dominios ajenos. Si EVALUATE_BOOK_CONTENT detecta un problema de estilo, lo ignora. Si EVALUATE_BOOK_STYLE detecta un error factual, lo señala como fuera de su scope.

---

## SECCIÓN 6: CÓMO LOS EVALUADORES SE RELACIONAN CON ESTE FRAMEWORK

### 6.1 Obligaciones de cada evaluador

Todo evaluador que forme parte del sistema D-X-OPUS debe:

1. **Producir el EVALUATION_RESULT canónico** definido en la Sección 3 al finalizar su ejecución.
2. **Declarar la versión del framework** que implementa en su cabecera YAML (`implements: RESOURCE_EVALUATION_FRAMEWORK_vX.Y`).
3. **Documentar su lógica de scoring interno** — cómo pasa de sus dimensiones internas al score y al status.
4. **Respetar la semántica de status** definida en la Sección 3.2.

### 6.2 Lo que los evaluadores pueden hacer libremente

- Definir sus propias dimensiones de evaluación internas.
- Usar su propia escala de scoring por dimensión (porcentajes, estrellas, etc.) antes de mapear al score /100.
- Producir output adicional (reportes detallados, análisis por sección, tablas) además del EVALUATION_RESULT canónico.
- Actualizar umbrales, pesos o criterios sin modificar el contrato.

### 6.3 Lo que los evaluadores NO pueden hacer

- Producir un status sin producir también todos los campos obligatorios del contrato.
- Usar `decision_guidance` como descripción del resultado en lugar de instrucción de acción.
- Emitir un status RED sin al menos un `blocking_issue` específico.
- Omitir `strengths` aunque el resultado sea RED.

### 6.4 Mapeo de terminología legacy

Los evaluadores v1.0 usaban terminología propia que se mapea al contrato canónico:

| Terminología v1.0 | Campo canónico | Notas |
|---|---|---|
| "Green Light / Publication-Ready" | `status: GREEN` | |
| "Yellow Light / Needs Refinement" | `status: YELLOW` | |
| "Red Light / Requires Rework" | `status: RED` | |
| "Overall Score" | `score` | Misma escala /100 |
| "Recommendation" | `decision_guidance` | Reformular como instrucción, no descripción |
| "Critical Gaps" | `blocking_issues` (si bloquean) o `improvement_areas` (si no) | Según severidad |
| "Strengths" | `strengths` | Mismo concepto |

---

## SECCIÓN 7: VERSIONADO DEL FRAMEWORK

### 7.1 Cuándo versionar

**Cambio de versión MAYOR (v1.x → v2.0):** Cuando cambia el formato del EVALUATION_RESULT. Requiere actualizar todos los evaluadores y notificar a todos los subsistemas que los invocan.

**Cambio de versión MENOR (v1.0 → v1.1):** Cuando se añaden aclaraciones, ejemplos o se corrigen ambigüedades sin cambiar el formato. Los evaluadores existentes son compatibles sin modificación.

### 7.2 Proceso de cambio de versión mayor

1. evaluation-dev propone cambio y crea DL entry.
2. Se notifica a: research-dev, writing-dev, editorial-profile-dev, activation-dev.
3. Todos los evaluadores activos se actualizan antes de publicar la nueva versión del framework.
4. El campo `implements` en cada evaluador se actualiza.

---

## SECCIÓN 8: EJEMPLOS DE EVALUATION_RESULT

### Ejemplo GREEN

```
EVALUATION_RESULT:
  status: GREEN
  score: 81/100
  decision_guidance: "Procede a escritura. El report está listo. Las fuentes Tier 1 son sólidas en secciones centrales y la cobertura disciplinar es equilibrada."
  blocking_issues: []
  improvement_areas: []
  strengths:
    - "68% de fuentes Tier 1 en claims centrales (Secciones 3-5)"
    - "5 perspectivas disciplinares representadas, incluyendo perspectiva crítica"
    - "Metodología completamente documentada con limitaciones explicitadas"
```

### Ejemplo YELLOW

```
EVALUATION_RESULT:
  status: YELLOW
  score: 64/100
  decision_guidance: "El report es usable pero tiene 2 gaps relevantes. Puedes proceder a escritura si asumes esos gaps explícitamente, o invertir 4-6h en refuerzo. Decide según deadline del proyecto."
  blocking_issues: []
  improvement_areas:
    - area: "Perspectiva regulatoria ausente"
      impact: "Claims sobre adopción institucional quedan sin soporte sólido"
      action: "Añadir 3-4 fuentes de organismos reguladores (EU AI Act, NIST). Estima 2-3h."
    - area: "Cobertura geográfica centrada en EEUU y Europa"
      impact: "Si el libro afirma perspectiva global, este gap es visible"
      action: "Añadir 2-3 fuentes de Asia-Pacífico o declarar explícitamente el alcance geográfico"
  strengths:
    - "Fuentes Tier 1 sólidas para claims técnicos centrales (72%)"
    - "Timeline histórico bien documentado con fuentes primarias"
```

### Ejemplo RED

```
EVALUATION_RESULT:
  status: RED
  score: 41/100
  decision_guidance: "No procedas. Hay 2 problemas que bloquean el uso del report como base para publicación. Corrígelos y re-evalúa antes de continuar."
  blocking_issues:
    - issue: "Solo 18% de fuentes son Tier 1 en Secciones 3 y 4, donde están los claims centrales del argumento"
      location: "Secciones 3.1, 3.3, 4.2"
      action: "Añadir mínimo 8 fuentes Tier 1 para claims de X, Y y Z. Estima 8-10h de investigación adicional."
    - issue: "Claims causales en Sección 5 no tienen soporte experimental ni quasi-experimental; solo fuentes de opinión"
      location: "Sección 5.2, 5.4"
      action: "Reemplazar fuentes de opinión por estudios con metodología explícita, o degradar claims a SPECULATIVE"
  improvement_areas: []
  strengths:
    - "Estructura narrativa clara y coherente entre secciones"
    - "Cobertura temporal completa (2000-2025)"
```

---

**FIN DEL DOCUMENTO**
