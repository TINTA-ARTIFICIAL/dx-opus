---
dl_id:       DL_20260420_ACTIVATION_026
date:        2026-04-20
author:      JM
origin_chat: activation-dev
status:      OPEN
---

# DECISION LOG ENTRY: DL_20260420_ACTIVATION_026

## DECISION

`PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION` (v1.5) e `IDENTIFY_NARRATIVE_SEEDS` (v2.0) se suben a `activation/` como archivos independientes con cabecera YAML estándar. `ANALYZE_COLLECTION` se actualiza a v1.5 corrigiendo la referencia stale `ANALYZE_BOOK_FOR_ACTIVATION v1.0` → `IDENTIFY_NARRATIVE_SEEDS v2.0`. `IDENTIFY_NARRATIVE_SEEDS` reemplaza `ANALYZE_BOOK_FOR_ACTIVATION v1.0 [DISEÑAR]` como prompt activo de FASE 1.

## RATIONALE

Ambos prompts existían en Drive pero no estaban versionados en el repositorio. La subida al repo los hace parte del sistema de control de versiones, alinea el inventario de `CONTEXT_ACTIVATION` con los artefactos reales, y formaliza `IDENTIFY_NARRATIVE_SEEDS v2.0` como reemplazo de `ANALYZE_BOOK_FOR_ACTIVATION` que nunca se diseñó.

## AFFECTED ARTIFACTS

| Artifact | Action | Notes |
|---|---|---|
| `activation/PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md` | CREATE v1.5 | Bump desde v1.4. Ref stale corregida. YAML header añadido. |
| `activation/PROMPT_IDENTIFY_NARRATIVE_SEEDS.md` | CREATE v2.0 | Subida desde Drive. YAML header añadido. |
| `WORKFLOW_ACTIVATION.md` | MODIFY v1.5 → v1.6 | FASE 1: `ANALYZE_BOOK_FOR_ACTIVATION [DISEÑAR]` → `IDENTIFY_NARRATIVE_SEEDS v2.0 ✅ ACTIVE`. Artefactos actualizados. |
| `CONTEXT_ACTIVATION.md` | MODIFY v1.3 → v1.4 | Sección 3: ambos prompts añadidos a inventario activo. |

## STATUS

OPEN

## INTEGRATION NOTES

2026-04-20 — Implementado en activation-dev:
- `PROMPT_ANALYZE_COLLECTION_FOR_ACTIVATION.md` v1.5 subido a `activation/`
- `PROMPT_IDENTIFY_NARRATIVE_SEEDS.md` v2.0 subido a `activation/`
- `WORKFLOW_ACTIVATION.md` actualizado a v1.6: FASE 1 refleja `IDENTIFY_NARRATIVE_SEEDS v2.0 ✅ ACTIVE`
- `CONTEXT_ACTIVATION.md` actualizado a v1.4: inventario actualizado
