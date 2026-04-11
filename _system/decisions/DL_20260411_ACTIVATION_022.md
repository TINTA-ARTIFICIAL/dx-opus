---
dl_id:       DL_20260411_ACTIVATION_022
date:        2026-04-11
author:      JM
origin_chat: system-architecture
status:      OPEN
---

# DECISION LOG ENTRY: DL_20260411_ACTIVATION_022

## DECISION

Cuando un POST_PLAN procedente de Activation entra en el workflow de escritura, el Q&A de posicionamiento del editor (PROMPT_QA_IDEAS) se ejecuta siempre antes de escribir. El editor puede declarar skip con el mismo mecanismo que en RAMA POST autónomo. El POST_SEED resultante — que combina el contenido del libro analizado con la voz posicionada del editor — es el input canónico de PROMPT_WRITE_POST en ambos caminos. WORKFLOW_ACTIVATION se actualiza a v1.5 para reflejar este paso y las referencias a WRITING_CONTEXT y POST_SEED.

## RATIONALE

El POST_PLAN de Activation contiene estructura y contenido del libro pero no la posición del editor sobre ese contenido. Sin el Q&A, el post resultante puede sonar al editor en forma pero carecer de su posición real sobre el argumento — reduciendo el valor diferencial del formato. El Q&A es el mecanismo que garantiza que ambos ingredientes — contenido de la colección y voz del editor — estén presentes en el post final.

## AFFECTED SUBSYSTEMS

- ACTIVATION: WORKFLOW_ACTIVATION v1.5 incorpora paso de Q&A antes de escritura
- WRITING: PROMPT_QA_IDEAS y PROMPT_WRITE_POST deben gestionar el input procedente de Activation sin cambios de interfaz gracias al POST_SEED canónico

## ARTIFACTS AFFECTED

| Artifact | Action | Notes |
|---|---|---|
| WORKFLOW_ACTIVATION | MODIFY v1.4 → v1.5 | Añadir paso Q&A de posicionamiento antes de Fase 4 (producción). Añadir referencias a WRITING_CONTEXT y POST_SEED. |

## DOCS IMPACT

| Doc Type | Document | Section | Action |
|---|---|---|---|
| System Design | SCHEMA_SYSTEM_ARCHITECTURE | Parte 3: Activation | Actualizar flujo para incluir Q&A antes de WRITE_POST |
| Subsystem Doc | CONTEXT_ACTIVATION | Sección workflow | Documentar nuevo paso Q&A en Fase 4 |

## OPEN QUESTIONS

- None

## INTEGRATION NOTES

[pendiente]
