---
id:          TEMPLATE_SUBSYSTEM_CONTEXT
type:        TEMPLATE
subsystem:   SYSTEM
version:     1.1
status:      ACTIVE
created:     2026-02-21
updated:     2026-03-31
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.1 | 2026-03-31 | JM | Added commit message as mandatory output at session close (item 4 in "Al finalizar cada sesión") |
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, SCHEMA_DECISION_LOG]
outputs: [CONTEXT_[SUBSYSTEM_NAME] — uno por chat de desarrollo]
calls:   []

## DESCRIPTION
Plantilla para crear el documento de contexto de cada chat de desarrollo. Garantiza que cualquier chat arranca con orientación completa del sistema sin depender de conversaciones anteriores.

---

# TEMPLATE: SUBSYSTEM DEVELOPMENT CONTEXT

*Instrucciones de uso: copia este template, reemplaza todos los campos entre [CORCHETES] y elimina este bloque de instrucciones. El documento resultante se carga al inicio de cada sesión del chat de desarrollo correspondiente.*

---

```yaml
---
id:          CONTEXT_[SUBSYSTEM_NAME_UPPER]
type:        TEMPLATE
subsystem:   [SUBSYSTEM_NAME_UPPER]
version:     1.0
status:      ACTIVE
created:     YYYY-MM-DD
updated:     YYYY-MM-DD
owner_chat:  [subsystem-chat-name]
---
```

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | YYYY-MM-DD | [iniciales] | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, MASTER_PLAN]
outputs: []
calls:   []

## DESCRIPTION
Documento de contexto para el chat de desarrollo del subsistema [SUBSYSTEM_NAME]. Se carga al inicio de cada sesión para garantizar orientación completa sin depender de conversaciones anteriores.

---

# CONTEXT: [SUBSYSTEM NAME] — DEVELOPMENT CHAT

---

## SECCIÓN 1: SISTEMA D-X-OPUS — VISIÓN GENERAL

D-X-OPUS es un sistema modular de escritura no-ficción asistida por IA. Cubre el proceso completo: investigación, planificación, escritura, evaluación y activación de contenido.

**8 subsistemas, cada uno con su chat de desarrollo independiente:**

| # | Subsistema | Rol |
|---|---|---|
| 0 | SYSTEM | Arquitectura, estándares, TOOLING |
| 1 | KNOWLEDGE BASE | Recursos globales acumulativos (SAH, CVC, Focus Types) |
| 2 | RESEARCH | Investigación profunda |
| 3 | EDITORIAL PROFILE | Perfil del autor, estilo editorial |
| 4 | WRITING | Escritura de libros y posts |
| 5 | EVALUATION | Evaluadores y contrato de evaluación |
| 6 | ACTIVATION | Campaña de contenido, BOOK_BRIEF |
| 7 | DOCS | Documentación del sistema |

**Dos espacios de trabajo:**
- **GitHub `dx-opus` (github.com/TINTA-ARTIFICIAL/dx-opus):** artefactos del sistema — reutilizables
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Cabecera YAML obligatoria en todos los artefactos (ver `RESOURCE_ARTIFACT_HEADER_STANDARD`)
- Naming convention: ver `NAMING_CONVENTION_ANALYSIS`
- Decision log: cada decisión relevante produce una entrada `DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
[Descripción del rol del subsistema en el sistema D-X-OPUS.]

### Límites — qué NO gestiona este subsistema
[Lista explícita de responsabilidades que pertenecen a otros subsistemas.]

### Interfaces de entrada

| Artefacto | Origen | Descripción |
|---|---|---|
| [ARTEFACTO] | [Subsistema origen] | [Descripción] |

### Interfaces de salida

| Artefacto | Destino | Descripción |
|---|---|---|
| [ARTEFACTO] | [Subsistema destino] | [Descripción] |

### Prompts compartidos que usa
[Lista de prompts de /writing/shared/ que invoca, o "Ninguno".]

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

### Artefactos activos

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| [NOMBRE] | v[X.Y] | ACTIVE / DRAFT / DEPRECATED | [Una línea] |

### Artefactos pendientes de crear

| Artefacto | Prioridad | Bloqueado por |
|---|---|---|
| [NOMBRE] | 🔴 Alta / 🟠 Media / 🟡 Baja | [dependencia o —] |

---

## SECCIÓN 4: TRABAJO ACTIVO

### Sprints pendientes
[Lista de tareas pendientes del MASTER_PLAN que corresponden a este subsistema.]

| Tarea MASTER_PLAN | Descripción | Prioridad |
|---|---|---|
| [F2-01] | [descripción] | 🔴 Alta |

### Gaps abiertos
[Gaps identificados en auditorías que afectan a este subsistema.]

| GAP ID | Descripción | Severidad |
|---|---|---|
| [GAP-R01] | [descripción corta] | 🔴 CRÍTICO |

### DECISION_LOG entries pendientes de integrar
[Decisiones ya tomadas que este chat debe implementar.]

| DL-ID | Decisión | Acción requerida |
|---|---|---|
| [DL_20260221_SYSTEM_001] | [descripción] | [qué debe hacer este chat] |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Verificar si hay nuevas DL entries pendientes que afecten a este subsistema
2. Revisar el MASTER_PLAN para confirmar prioridades activas
3. Confirmar con el editor el objetivo de la sesión

### Al finalizar cada sesión
1. Producir DL entries por cada decisión arquitectónica o funcional tomada
2. Listar los artefactos modificados con su nueva versión
3. Producir el mensaje de commit para cada artefacto subido a GitHub

### Formato de commits a GitHub
```
[SUBSISTEMA] tipo: descripción corta

Tipos: feat | fix | refactor | docs | chore

Ejemplos:
[RESEARCH] fix: corrected section references in UPDATE_VALIDATION_CHECKLIST v3.1
[WRITING] feat: added POST branch to WORKFLOW_WRITING v2.0
[SYSTEM] docs: updated SCHEMA_SYSTEM_ARCHITECTURE with Activation loop
[EVAL] feat: adopt evaluation contract in PROMPT_EVALUATE_BOOK_STYLE v1.1
```

### Cuándo crear una DL entry
- Cuando se toma una decisión que afecta a la interfaz con otro subsistema
- Cuando se añade, elimina o cambia el nombre de un artefacto
- Cuando cambia el formato de un output que otros subsistemas consumen
- Cuando se identifica un gap o problema que requiere acción fuera de este chat

### Formato de DL entries

```
DL_YYYYMMDD_[SUBSYSTEM]_[NNN].md
```

- `NNN` es numeración **global y secuencial** en todo el sistema — no se reinicia por subsistema ni por fecha
- Antes de crear una entrada, consultar el último número usado en `/_system/decisions/README.md`

El formato completo del contenido está en `SCHEMA_DECISION_LOG.md`.

---

**FIN DEL TEMPLATE**

*Para generar el documento de contexto de un subsistema concreto: reemplazar todos los [CORCHETES] con el contenido específico del subsistema y eliminar estas instrucciones finales.*
