---
id: S6-04
title: Skill knowledge-base + hook de gobernanza
type: skill
subsystem: SYSTEM
sprint: 6
status: IN_PROGRESS
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-03
completed: null
branch: feat/s6-04-knowledge-base-skill-hook
---

# S6-04 — Skill `knowledge-base` + hook de gobernanza

## Contexto

`_system/SPEC_PLUGIN_ARCHITECTURE.md` §5.1 decidió promover Knowledge Base a skill propia (no contenido embebido dentro de `research`) precisamente por su relación de gobernanza cruzada: KB define el esquema canónico de `RESOURCE_SOURCE_AUTHORITY` (SAH) y `RESOURCE_CLAIM_VALIDATION` (CVC), pero es Research quien escribe actualizaciones de vuelta a esos documentos. Ambos recursos ya declaran explícitamente en su `CANONICAL UPDATE SCHEMA` secciones que "Research must NOT modify... autonomously" — sin una frontera técnica, esa regla es solo prosa, la misma clase de riesgo que causó el bug #66 (ver `research/PROMPT_SUMMARIZE_REFERENCES.md` v4.3 para el fix ya aplicado del lado del prompt; este ticket es la protección estructural equivalente del lado del recurso).

`DL_20260903_KB_004` (gobernanza de propagación SAH/CVC) referencia este mecanismo como su vía de implementación futura — este ticket no implementa esa propagación (sigue fuera de scope, ver abajo), solo la protección de escritura sobre las secciones del framework universal.

## Interfaces

### 1. `skills/knowledge-base/SKILL.md`

Frontmatter:
```yaml
---
name: knowledge-base
description: >
  This skill should be used when a research or evaluation task needs the
  system's authoritative source hierarchy or claim validation criteria —
  trigger phrases like "verificar la autoridad de esta fuente", "validar
  esta afirmación", or invoked internally by the research and evaluation
  skills rather than requested directly by the editor.
metadata:
  version: "0.1.0"
---
```

Cuerpo: instruir a Claude a leer directamente (sin copiar):
- `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md`
- `knowledge-base/RESOURCE_CLAIM_VALIDATION.md`
- `knowledge-base/RESOURCE_RESEARCH_FOCUS_TYPES.md`

Esta skill no tiene un flujo propio que el editor dispare típicamente de forma directa — documentar en el `SKILL.md` que su función principal es servir de referencia consumida por otras skills (`research`, `evaluation`, en Sprint 7).

### 2. `hooks/hooks.json`

En la raíz del repo (o ruta declarada explícitamente en `plugin.json` si S6-01 decidió una ruta custom — comprobar antes de asumir la ruta por defecto).

Hook `PreToolUse`, tipo `prompt`, matcher `Write|Edit`:

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Si la escritura/edición ($TOOL_INPUT) NO tiene como archivo objetivo knowledge-base/RESOURCE_SOURCE_AUTHORITY.md ni knowledge-base/RESOURCE_CLAIM_VALIDATION.md: responde approve inmediatamente, sin más análisis. Si SÍ es uno de esos dos archivos: lee la sección CANONICAL UPDATE SCHEMA de ese archivo para identificar qué partes están marcadas como protegidas/universales (no modificables autónomamente por Research) frente a las secciones de contenido por tema (donde los procedimientos A-D de actualización sí aplican). Si el cambio propuesto toca contenido protegido, o no es evidente que siga los procedimientos documentados: responde ask_user con una explicación breve de qué sección parece protegida y por qué. Si el cambio es una actualización de contenido por tema siguiendo el esquema canónico: responde approve.",
          "timeout": 30
        }
      ]
    }
  ]
}
```

El texto exacto del prompt puede ajustarse en redacción durante la implementación, pero debe conservar los dos comportamientos obligatorios: (a) aprobar de inmediato cualquier escritura que no sea sobre esos dos archivos — este hook no debe interferir con el resto del sistema; (b) nunca devolver `approve` automático sobre esos dos archivos sin haber comprobado la sección protegida.

## Estructuras de datos

- El esquema de `CANONICAL UPDATE SCHEMA` ya existe en `knowledge-base/RESOURCE_SOURCE_AUTHORITY.md` (sección "CANONICAL UPDATE SCHEMA", cerca de la línea 1389) y su equivalente en `RESOURCE_CLAIM_VALIDATION.md`. No redefinir qué es "protegido" en el hook — leerlo de esos documentos.
- Formato de `hooks.json`: ver `hooks` en el schema de componentes de Cowork (eventos soportados, tipos `prompt`/`command`, decisiones `approve`/`block`/`ask_user`).

## Decisiones de diseño

- Hook **prompt-based**, no command-based — determinar si una edición toca una sección "protegida" requiere leer e interpretar el documento, no es un check determinista de texto.
- El hook debe estar acotado a los dos archivos de KB explícitamente — un matcher genérico de `Write|Edit` sin ese filtro por ruta bloquearía o interrogaría al editor en cada escritura del sistema, lo cual sería un regresión de UX inaceptable.
- Este hook es la forma general del principio ya aplicado en `writing/post/PROMPT_POST_BRIEF.md` (aprobación explícita antes de saltarse un prerequisito) y en `research/PROMPT_SUMMARIZE_REFERENCES.md` (checkpoint obligatorio) — aquí se traslada de "instrucción en el prompt" a "hook estructural", que es justamente el paso que el pivote a plugin permite dar y que un prompt por sí solo no puede garantizar.

## Fuera de scope

- La propagación de SAH/CVC desde copias por-proyecto de vuelta a la base de conocimiento del editor (`DL_20260903_KB_004`) — sigue bloqueada por el estado de S5-03/#49 tal como esa DL documenta; no se resuelve en este ticket.
- Contenido nuevo de SAH/CVC — este ticket no añade fuentes ni criterios, solo protege los existentes.
- Las skills `research` y `evaluation` que consumirán esta skill — Sprint 7.

## Casos de test obligatorios

1. `skills/knowledge-base/SKILL.md` existe, frontmatter válido.
2. `hooks/hooks.json` es JSON válido — pega el comando usado para comprobarlo y su salida.
3. Verificación manual (documentar los pasos seguidos, no solo el resultado): simular una escritura sobre una sección de contenido por tema de `RESOURCE_SOURCE_AUTHORITY.md` (ej. añadir una fuente nueva siguiendo el Procedimiento A) y confirmar, leyendo el prompt del hook, que el resultado esperado es `approve`.
4. Verificación manual: simular una escritura sobre una sección marcada como protegida/universal en el `CANONICAL UPDATE SCHEMA` y confirmar que el resultado esperado es `ask_user` o `block`, no `approve`.
5. Verificación manual: simular una escritura sobre un archivo cualquiera que NO sea SAH ni CVC (ej. `research/PROMPT_CREATE_RESEARCH_PLAN.md`) y confirmar que el hook no interfiere — `approve` inmediato sin necesidad de leer nada del CANONICAL UPDATE SCHEMA.

## Estado de revisión

Aprobado: 2026-09-03
