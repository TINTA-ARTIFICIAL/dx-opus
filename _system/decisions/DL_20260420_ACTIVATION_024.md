---
dl_id:       DL_20260420_ACTIVATION_024
date:        2026-04-20
author:      JM
origin_chat: activation-dev
status:      OPEN
---

# DECISION LOG ENTRY: DL_20260420_ACTIVATION_024

## DECISION

`PROMPT_CREATE_BOOK_BRIEF` pasa de paso final implícito post-FASE 5 a herramienta explícita de la **Ruta L, FASE 2B**, ejecutable en paralelo a las FASES 2A–5 (Ruta P). El prompt no cambia su contenido, sus inputs ni sus outputs. Solo cambia su posición en el workflow y su formalización como paso de la Ruta L.

## RATIONALE

En v1.5, `PROMPT_CREATE_BOOK_BRIEF` aparecía como apéndice opcional al final del workflow, sin una ruta estructurada que lo integrase. Con la arquitectura dual-output (DL_20260420_ACTIVATION_023), la Ruta L necesita un punto de entrada explícito. FASE 2B es el lugar natural: el editor ya tiene los seeds clasificados [L] y puede lanzar la generación del BOOK_BRIEF en paralelo a la producción de contenido (Ruta P).

## AFFECTED ARTIFACTS

| Artifact | Action | Notes |
|---|---|---|
| `WORKFLOW_ACTIVATION.md` | MODIFY v1.5 → v1.6 | BOOK_BRIEF reposicionado como FASE 2B. Diagrama actualizado. |
| `CONTEXT_ACTIVATION.md` | MODIFY v1.3 → v1.4 | Sección 3: BOOK_BRIEF marcado como "Ruta L — FASE 2B, paralela a Ruta P". |
| `activation/README.md` | MODIFY | BOOK_BRIEF listado como Ruta L. |
| `PROMPT_CREATE_BOOK_BRIEF.md` | NO CHANGE | Contenido, inputs y outputs sin modificar. |

## STATUS

OPEN

## INTEGRATION NOTES

2026-04-20 — Implementado en activation-dev:
- `WORKFLOW_ACTIVATION.md` actualizado a v1.6: FASE 2B añadida con `PROMPT_CREATE_BOOK_BRIEF v1.0 ✅ ACTIVE`
- `CONTEXT_ACTIVATION.md` actualizado a v1.4: Sección 3 refleja reposicionamiento
