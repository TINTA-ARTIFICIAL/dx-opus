---
dl_id:       DL_20260411_ACTIVATION_022
date:        2026-04-11
author:      JM
origin_chat: system-architecture
status:      INTEGRATED
---

# DECISION LOG ENTRY: DL_20260411_ACTIVATION_022

## DECISION
Cuando un POST_PLAN procedente de Activation entra en el workflow de escritura, el Q&A de posicionamiento del editor (PROMPT_QA_IDEAS) se ejecuta siempre antes de escribir. El editor puede declarar skip con el mismo mecanismo que en RAMA POST autónomo. El POST_SEED resultante — que combina el contenido del libro analizado con la voz posicionada del editor — es el input canónico de PROMPT_WRITE_POST en ambos caminos. WORKFLOW_ACTIVATION se actualiza a v1.5 para reflejar este paso y las referencias a CONTEXT_WRITING y TEMPLATE_POST_SEED.

## RATIONALE
El POST_PLAN de Activation contiene estructura y contenido del libro pero no la posición del editor sobre ese contenido. Sin el Q&A, el post resultante puede sonar al editor en forma pero carecer de su posición real sobre el argumento — reduciendo el valor diferencial del formato. El Q&A es el mecanismo que garantiza que ambos ingredientes — contenido de la colección y voz del editor — estén presentes en el post final.

## AFFECTED SUBSYSTEMS
- ACTIVATION: WORKFLOW_ACTIVATION v1.5 incorpora paso de Q&A antes de escritura
- WRITING: PROMPT_QA_IDEAS y PROMPT_WRITE_POST deben gestionar el input procedente de Activation sin cambios de interfaz gracias al POST_SEED canónico

## ARTIFACTS AFFECTED

| Artifact | Action | Notes |
|----------|--------|-------|
| WORKFLOW_ACTIVATION | MODIFY v1.4 → v1.5 | Añadir paso Q&A de posicionamiento antes de Fase 4 (producción). Añadir referencias a CONTEXT_WRITING y TEMPLATE_POST_SEED. |
| CONTEXT_ACTIVATION | MODIFY v1.2 → v1.3 | Documentar PROMPT_QA_IDEAS en tabla de shared prompts. Añadir tabla de artefactos de interfaz con Writing. Marcar DL_022 como integrada. |

## DOCS IMPACT

| Doc Type | Document | Section | Action |
|----------|----------|---------|--------|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte 3: Activation | Actualizar flujo para incluir Q&A antes de WRITE_POST |
| Subsystem Doc | CONTEXT_ACTIVATION | Sección 2, Sección 5 | ✅ Completado en esta sesión |

## OPEN QUESTIONS
None

## INTEGRATION NOTES
2026-04-12 — Implementado en activation-dev:
- WORKFLOW_ACTIVATION actualizado v1.4 → v1.5: Fase 4 incorpora PROMPT_QA_IDEAS como paso obligatorio antes de escritura (skip declarable); POST_SEED definido como input canónico de PROMPT_WRITE_POST; referencias a CONTEXT_WRITING y TEMPLATE_POST_SEED añadidas; cabecera YAML estándar añadida.
- CONTEXT_ACTIVATION actualizado v1.2 → v1.3: PROMPT_QA_IDEAS añadido a tabla de shared prompts; TEMPLATE_POST_SEED documentado como artefacto de interfaz con Writing; DL_022 marcada como integrada.

Pendiente: SCHEMA_SYSTEM_ARCHITECTURE, Parte 3 (Activation) — actualizar flujo para incluir Q&A antes de WRITE_POST. Acción de DOCS.
