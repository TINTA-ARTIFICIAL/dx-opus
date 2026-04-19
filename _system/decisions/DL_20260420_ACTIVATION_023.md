---
dl_id:       DL_20260420_ACTIVATION_023
date:        2026-04-20
author:      JM
origin_chat: activation-dev
status:      OPEN
---

# DECISION LOG ENTRY: DL_20260420_ACTIVATION_023

## DECISION

Activation produce dos outputs simultáneos desde el mismo catálogo de seeds: **Ruta P** (contenido inmediato → Writing POST) y **Ruta L** (BOOK_BRIEF → Research → Writing BOOK) como tracks paralelos que se bifurcan en el CHECKPOINT DE ROUTING post-FASE 1. El editor clasifica cada seed con etiqueta [P], [L] o [P+L] en dicho checkpoint. La bifurcación [P+L] es posible: un mismo seed puede alimentar ambas rutas simultáneamente.

## RATIONALE

El proceso de activación identifica nichos narrativos cuyo potencial puede materializarse como post publicable (Ruta P) o como propuesta de nuevo libro (Ruta L). Hasta v1.5, BOOK_BRIEF era un apéndice implícito post-FASE 5 sin ruta estructurada. La arquitectura dual-output reconoce que ambos tracks son igualmente válidos, pueden ejecutarse en paralelo, y que el mismo seed puede tener potencial para ambos.

## AFFECTED ARTIFACTS

| Artifact | Action | Notes |
|---|---|---|
| `WORKFLOW_ACTIVATION.md` | MODIFY v1.5 → v1.6 | Arquitectura dual-output en diagrama. CHECKPOINT DE ROUTING post-FASE 1. FASE 2A/2B. |
| `CONTEXT_ACTIVATION.md` | MODIFY v1.3 → v1.4 | Sección 1 (rol), Sección 3 (inventario), Sección 5 (trabajo activo). |
| `activation/README.md` | MODIFY | Añadir Ruta P y Ruta L. |

## STATUS

OPEN

## INTEGRATION NOTES

2026-04-20 — Implementado en activation-dev:
- `WORKFLOW_ACTIVATION.md` actualizado a v1.6
- `CONTEXT_ACTIVATION.md` actualizado a v1.4
- `activation/README.md` actualizado
