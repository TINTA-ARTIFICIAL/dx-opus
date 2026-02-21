---
id:          TEMPLATE_SUBSYSTEM_CONTEXT
type:        TEMPLATE
subsystem:   SYSTEM
version:     1.0
status:      ACTIVE
created:     2026-02-21
updated:     2026-02-21
owner_chat:  system-architecture
---

## CHANGELOG
| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-02-21 | JM | Initial version |

## DEPENDENCIES
inputs:  [SCHEMA_SYSTEM_ARCHITECTURE, SCHEMA_DECISION_LOG]
outputs: [CONTEXT_[SUBSYSTEM_NAME]_v1.0.md — uno por chat de desarrollo]
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
- **GitHub `dx-opus`:** artefactos del sistema (prompts, workflows, recursos) — reutilizables
- **Google Drive `[COD]_[Proyecto]`:** artefactos de producción — específicos por libro

**Estándares activos:**
- Naming convention: `RESOURCE_ARTIFACT_HEADER_STANDARD_v1.0`
- Cabecera YAML: obligatoria en todos los artefactos desde su creación
- Decision log: cada decisión relevante produce una entrada `DL-YYYYMMDD-NNN`
- Versiones: siempre `vX.Y` (dos niveles), nunca más ni menos

---

## SECCIÓN 2: ESTE SUBSISTEMA

### Rol
[Descripción en 2-3 frases de qué hace este subsistema y cuál es su valor en el sistema.]

### Límites — qué NO gestiona este subsistema
[Lista de responsabilidades que podrían confundirse como propias pero no lo son.]
- [Límite 1]
- [Límite 2]

### Interfaces de entrada
[Qué recibe este subsistema de otros, y de quién.]

| Artefacto | Origen | Descripción |
|---|---|---|
| [ARTEFACTO] | [Subsistema origen] | [Para qué se usa] |

### Interfaces de salida
[Qué entrega este subsistema a otros, y a quién.]

| Artefacto | Destino | Descripción |
|---|---|---|
| [ARTEFACTO] | [Subsistema destino] | [Qué aporta] |

### Prompts compartidos que usa
[Prompts de /shared/ que este subsistema invoca pero no es owner.]

| Prompt | Owner | Acción si necesita cambio |
|---|---|---|
| [PROMPT_X] | [writing-dev] | Notificar a [owner-chat] |

---

## SECCIÓN 3: INVENTARIO DE ARTEFACTOS

Lista completa de artefactos que este subsistema posee y desarrolla.

| Artefacto | Versión | Status | Descripción |
|---|---|---|---|
| [NOMBRE] | v[X.Y] | ACTIVE / DRAFT / DEPRECATED | [Una línea] |

**Artefactos pendientes de crear:**

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
| [DL-20260221-001] | [descripción] | [qué debe hacer este chat] |

---

## SECCIÓN 5: PROTOCOLO DE TRABAJO

### Al inicio de cada sesión
1. Verificar si hay nuevas DL entries pendientes que afecten a este subsistema
2. Revisar el MASTER_PLAN para confirmar prioridades activas
3. Confirmar con el editor el objetivo de la sesión

### Al finalizar cada sesión
1. Producir DL entries por cada decisión arquitectónica o funcional tomada
2. Actualizar el status de las tareas completadas en el MASTER_PLAN
3. Listar los artefactos modificados con su nueva versión

### Formato de commits a GitHub
```
[SUBSISTEMA] tipo: descripción corta

Ejemplos:
[RESEARCH] fix: corrected section references in UPDATE_VALIDATION_CHECKLIST v3.1
[WRITING] feat: added POST branch to WORKFLOW_WRITING v2.0
[SYSTEM] docs: updated SCHEMA_SYSTEM_ARCHITECTURE with Activation loop
```

### Cuándo crear una DL entry
- Cuando se toma una decisión que afecta a la interfaz con otro subsistema
- Cuando se añade, elimina o cambia el nombre de un artefacto
- Cuando cambia el formato de un output que otros subsistemas consumen
- Cuando se identifica un gap o problema que requiere acción fuera de este chat

---

**FIN DEL TEMPLATE**

*Para generar el documento de contexto de un subsistema concreto: reemplazar todos los [CORCHETES] con el contenido específico del subsistema y eliminar estas instrucciones finales.*
