---
id: S7-01
title: Skill research
type: skill
subsystem: SYSTEM
sprint: 7
status: IN_PROGRESS
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: null
branch: feat/s7-01-research-skill
---

# S7-01 — Skill `research`

## Contexto

Migra el subsistema RESEARCH completo al modelo de plugin. Es la skill más grande de Sprint 7 (8 artefactos de contenido) y la que más se apoya en el patrón de checkpoint obligatorio ya establecido — dos de los bugs más graves de Sprint 5 (#52, #66) vivían exactamente en este subsistema y ya se corrigieron a nivel de prompt (`research/PROMPT_SUMMARIZE_REFERENCES.md` v4.3). Esta skill no debe debilitar esa protección al envolver el prompt.

## Interfaces

Crear `skills/research/SKILL.md`.

Frontmatter:
```yaml
---
name: research
description: >
  This skill should be used when the user wants to research a topic for a
  book or post — trigger phrases like "quiero investigar sobre X", "necesito
  hacer research para mi libro", "procesa estas referencias", "profundiza en
  este tema".
metadata:
  version: "0.1.0"
---
```

El cuerpo debe orientar, sin duplicar contenido, hacia los artefactos reales del subsistema (todos en `research/`, léelos por su ruta real):

- `WORKFLOW_RESEARCH.md` — secuencia canónica de fases (Fase 0 a Fase 5, RAMA A vs RAMA B)
- `PROMPT_SUMMARIZE_REFERENCES.md` — Fase 1, entrada del workflow. **Ya incluye (v4.3) el checkpoint obligatorio que impide autoavanzar de fase — el `SKILL.md` debe señalar explícitamente que esa protección vive en el prompt y no debe repetirse ni debilitarse aquí**
- `PROMPT_UPDATE_VALIDATION_CHECKLIST.md` — Fase 2 (actualización de SAH/CVC; escrituras a esos dos archivos están protegidas por el hook de `skills/knowledge-base` — S6-04, ya en `main`)
- `GUIDE_ANNOTATION_PHASE3.md` — Fase 3 (guía de anotación del editor)
- `PROMPT_RESEARCH_DEEP_DIVE.md` — Fase 4A (RAMA A)
- `PROMPT_CREATE_RESEARCH_PLAN.md` + `PROMPT_EXECUTE_RESEARCH_PLAN.md` — Fase 4B (RAMA B)

Además, un hook nuevo (ver Decisiones de diseño) para el prerequisito de `PROMPT_EXECUTE_RESEARCH_PLAN` que hoy solo existe en prosa.

### Hook: aprobación editorial antes de `EXECUTE_RESEARCH_PLAN`

Añadir a `hooks/hooks.json` (el archivo ya existe desde S6-04 — añade una entrada nueva al array `PreToolUse`, no sobrescribas la entrada de `knowledge-base`):

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "prompt",
      "prompt": "Si esta escritura/edición ($TOOL_INPUT) no corresponde a la producción de un RESEARCH_REPORT via PROMPT_EXECUTE_RESEARCH_PLAN: responde approve inmediatamente. Si sí lo es: comprueba que en la conversación existe evidencia de que el editor ya revisó y aprobó explícitamente el RESEARCH_PLAN_DETAILED y las WRITING_INSTRUCTIONS_ADAPTED producidos por PROMPT_CREATE_RESEARCH_PLAN (no basta con que los archivos existan — deben estar aprobados). Si no hay esa aprobación explícita: responde ask_user. Si la hay: responde approve.",
      "timeout": 30
    }
  ]
}
```

Ajusta la redacción exacta si hace falta, pero conserva los dos comportamientos: no interferir con nada que no sea `EXECUTE_RESEARCH_PLAN`, y no aprobar automáticamente sin evidencia de aprobación editorial explícita — cierra `research/PROMPT_EXECUTE_RESEARCH_PLAN.md` sección "1.2 Prerequisites" ("Do not proceed without approved planning documents"), hoy solo prosa.

## Estructuras de datos

Ninguna nueva. Todos los artefactos que esta skill orquesta ya existen en `research/`. La única estructura nueva es la entrada de `hooks/hooks.json` de arriba.

## Decisiones de diseño

- No dupliques contenido de ningún `PROMPT_*.md`/`WORKFLOW_RESEARCH.md`/`GUIDE_ANNOTATION_PHASE3.md` — el `SKILL.md` orienta sobre cuándo usar cada uno y en qué orden, el contenido real se lee de `research/` en el momento.
- El hook de este ticket es una entrada **adicional** al `hooks/hooks.json` existente — no toques ni reordenes la entrada de `knowledge-base` (S6-04). Si tu entrega llega a mergear después de otro ticket que también añadió una entrada a `hooks.json`, resuelve el archivo combinando ambas entradas en el array, nunca sobrescribiendo.
- El checkpoint obligatorio de `PROMPT_SUMMARIZE_REFERENCES.md` v4.3 ya resuelve #52/#66 a nivel de prompt — este ticket no necesita (ni debe) añadir un hook redundante para eso.

## Fuera de scope

- Modificar el contenido de cualquier `PROMPT_*.md`/`WORKFLOW_RESEARCH.md` existente — este ticket solo crea el `SKILL.md` y la entrada de hook, no toca los artefactos que orquesta.
- La skill `knowledge-base` — ya construida (S6-04), solo se referencia.
- Cualquier lógica de `writing-post`/`writing-book` sobre cuándo exigir research previa — eso vive en esas skills (S7-04, S7-07), no aquí.

## Casos de test obligatorios

1. `skills/research/SKILL.md` existe, frontmatter válido, `description` con frases disparadoras concretas.
2. Confirmar por lectura que el `SKILL.md` no reproduce contenido de ningún prompt real — solo referencias por ruta.
3. Confirmar que el `SKILL.md` señala explícitamente que el checkpoint de `PROMPT_SUMMARIZE_REFERENCES.md` v4.3 ya existe y no debe repetirse.
4. `hooks/hooks.json` sigue siendo JSON válido tras añadir la nueva entrada, y la entrada de `knowledge-base` (S6-04) sigue intacta — pega el diff exacto.
5. Verificación manual (documentar pasos): simular una escritura de `RESEARCH_REPORT` sin aprobación editorial previa registrada en la conversación → `ask_user` esperado. Simular la misma escritura con aprobación explícita ya dada → `approve` esperado. Simular una escritura no relacionada (ej. a `writing/book/PROMPT_WRITE_CHAPTER.md`) → `approve` inmediato sin interferencia.

## Estado de revisión

Aprobado: 2026-09-03
