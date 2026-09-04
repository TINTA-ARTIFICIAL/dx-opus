---
id: S8-01
title: DL de deprecación y retiro de Apps Script
type: infra
subsystem: SYSTEM
sprint: 8
status: TODO
priority: P1
depends_on: []
blocks: [S8-03]
assignee: null
started: null
completed: null
branch: null
---

# S8-01 — DL de deprecación y retiro de Apps Script

## ⚠️ No despachar todavía

Este ticket **no se dispatcha** hasta que el editor confirme explícitamente que la validación de S8-04 se ejecutó con un editor real y salió bien — es la condición de corte que el propio roadmap de Sprint 8 exige (`_system/MASTER_PLAN.md` PARTE 10: "correr en paralelo... luego apagar Apps Script"). Retirar el sistema anterior antes de confirmar que el nuevo funciona en uso real dejaría a cualquier editor que siga en Apps Script sin alternativa. `D-dispatcher` no debe recoger este ticket del conjunto listo aunque su `status` sea `TODO` y no tenga `depends_on` — está fuera del flujo automático por decisión explícita, no por un bloqueo técnico.

## Contexto

Cierre formal del pivote a plugin — Sprints 6 y 7 ya construyeron el reemplazo completo (9 skills, 3 hooks). Este ticket retira lo que sustituyen.

## Interfaces

1. Crear `_system/decisions/DL_YYYYMMDD_SYSTEM_0NN.md` (número siguiente disponible en `_system/decisions/README.md` en el momento de ejecutar) documentando la deprecación: qué se retira, por qué, qué lo sustituye, referencia a `_system/SPEC_PLUGIN_ARCHITECTURE.md` y a los tickets de Sprint 6/7.
2. Retirar del repo (no simplemente borrar sin registro — mover a `_system/audits/deprecated/` o equivalente, con una nota de una línea por archivo indicando desde cuándo y por qué):
   - `tools/TOOL_CREATE_PROJECT.gs`
   - `tools/TOOL_SETUP_EDITOR_ENVIRONMENT.gs`
   - `tools/create-release-package.sh`
3. Actualizar `_system/decisions/README.md` con la nueva entrada.

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

- No se borran sin dejar rastro — el precedente de este repo (ver `_system/SPEC_PACKAGE_SYSTEM.md`, `_system/test-records/`) es que las decisiones de arquitectura quedan documentadas, no solo ejecutadas. Un `git log` no sustituye a una DL explícita para algo que un editor podría llegar a preguntarse "¿por qué ya no existe esto?".

## Fuera de scope

- Ejecutar o confirmar la validación con editor real (S8-04 lo prepara, un humano lo ejecuta).
- Actualizar READMEs — es S8-03.

## Casos de test obligatorios

1. La DL nueva existe, sigue el formato de `_system/SCHEMA_DECISION_LOG.md`, y referencia explícitamente los 3 archivos retirados y sus reemplazos (skill por skill).
2. Los 3 archivos ya no están en `tools/` y sí están en su ubicación de archivo histórico, con la nota de contexto.
3. `_system/decisions/README.md` refleja la nueva entrada (número, tabla de últimas decisiones).

## Estado de revisión

Aprobado: 2026-09-03 — condicionado a la confirmación de validación descrita arriba antes de despachar.
