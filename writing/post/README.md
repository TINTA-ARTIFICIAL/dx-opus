# Writing — RAMA POST

Prompts, recursos y templates para la escritura de posts en el sistema D-X-OPUS.

**Status:** ACTIVE — Sprint 3 completado (2026-04-11)

---

## Flujo del workflow

```
PROMPT_POST_BRIEF
      ↓
PROMPT_POST_EXPLORE     ← solo cuando el input es escaso
      ↓
PROMPT_SUMMARIZE_REF
      ↓
PROMPT_VERIFY_RESEARCH
      ↓
PROMPT_QA_IDEAS         ← siempre activo salvo skip explícito
      ↓
PROMPT_POST_ANGLES
      ↓
PROMPT_PLAN_POST        → produce POST_SEED
      ↓
PROMPT_WRITE_POST       ← en /writing/shared/
      ↓
PROMPT_EVALUATE_POST    ← owner: evaluation-dev

PROMPT_SPLIT_POST       ← invocable en cualquier fase
```

---

## Inventario de artefactos

### Recursos

| Artefacto | Versión | Descripción |
|-----------|---------|-------------|
| `RESOURCE_WRITING_CONTEXT.md` | v1.0 | Esquema canónico del artefacto de configuración del workflow POST. Combina EDITOR_PROFILE + PUBLICATION_PROFILE + tipo de texto. |
| `RESOURCE_PUBLICATION_PROFILE.md` | v1.0 | Esquema del perfil de publicación como entidad independiente del EDITOR_PROFILE. |

### Templates

| Artefacto | Versión | Descripción |
|-----------|---------|-------------|
| `TEMPLATE_POST_SEED.md` | v1.0 | Estructura canónica del POST_SEED — artefacto de entrada unificado de PROMPT_WRITE_POST. |
| `TEMPLATE_POST_BRIEFING.md` | v1.0 | Plantilla de continuación del post entre sesiones o tras split. |

### Prompts

| Artefacto | Versión | Descripción |
|-----------|---------|-------------|
| `PROMPT_POST_BRIEF.md` | v1.0 | Punto de entrada del workflow. Carga o crea WRITING_CONTEXT. Gestiona skip de Q&A y modo híbrido. |
| `PROMPT_POST_EXPLORE.md` | v1.0 | Exploración cuando el input es escaso. Propone ángulos y genera material de partida. |
| `PROMPT_SUMMARIZE_REF.md` | v1.0 | Procesa fuentes. Distingue fuente-de-ejemplo vs fuente-de-argumento. Protege material personal del editor. |
| `PROMPT_VERIFY_RESEARCH.md` | v1.0 | Verifica afirmaciones, datos y atribuciones marcados en el SOURCE_MAP. |
| `PROMPT_QA_IDEAS.md` | v1.0 | Q&A secuencial siempre activo. Extrae voz posicionada del editor. Produce INVENTARIO_IDEAS. |
| `PROMPT_POST_ANGLES.md` | v1.0 | Propone enfoques, ángulos y narrative seeds sobre el material completo post-Q&A. |
| `PROMPT_PLAN_POST.md` | v1.0 | Fija arquitectura del post. Produce POST_SEED como input canónico de PROMPT_WRITE_POST. |
| `PROMPT_SPLIT_POST.md` | v1.0 | Divide post en dos unidades autónomas. Invocable en cualquier fase del workflow. |

### Spec

| Artefacto | Versión | Descripción |
|-----------|---------|-------------|
| `SPEC_LEARNING_SIGNALS.md` | v1.0 | Especificación de las tres señales de aprendizaje del EDITOR_PROFILE. Prerequisito para Sprint 4. |

### Shared (en `/writing/shared/`)

| Artefacto | Versión | Descripción |
|-----------|---------|-------------|
| `PROMPT_WRITE_POST.md` | v2.0 | Escribe el post desde POST_SEED. Invocado por Writing (RAMA POST) y por Activation. |

---

## Artefactos canónicos de producción

Los artefactos de producción viven en Google Drive del proyecto, no en este repositorio.

| Artefacto | Producido por | Consumido por |
|-----------|--------------|--------------|
| `WRITING_CONTEXT` | `PROMPT_POST_BRIEF` | Todos los prompts del workflow |
| `SESSION_BRIEF` | `PROMPT_POST_BRIEF` | Editor (orientación de sesión) |
| `EXPLORE_REPORT` | `PROMPT_POST_EXPLORE` | `PROMPT_SUMMARIZE_REF` |
| `SOURCE_MAP` | `PROMPT_SUMMARIZE_REF` | `PROMPT_VERIFY_RESEARCH` |
| `VERIFICATION_MAP` | `PROMPT_VERIFY_RESEARCH` | `PROMPT_QA_IDEAS`, `PROMPT_PLAN_POST` |
| `INVENTARIO_IDEAS` | `PROMPT_QA_IDEAS` | `PROMPT_POST_ANGLES`, `PROMPT_PLAN_POST` |
| `ANGLES_REPORT` | `PROMPT_POST_ANGLES` | `PROMPT_PLAN_POST` |
| `POST_SEED` | `PROMPT_PLAN_POST` | `PROMPT_WRITE_POST` |
| `POST_DRAFT` | `PROMPT_WRITE_POST` | Editor, `PROMPT_EVALUATE_POST` |
| `POST_BRIEFING` | `PROMPT_WRITE_POST` / `PROMPT_SPLIT_POST` | Sesión siguiente |

---

## Pendiente — Sprint 4

- Mecanismo de actualización del EDITOR_PROFILE por aprendizaje (coordinación con editorial-profile-dev y evaluation-dev)
- Campo `corrections_log` en TEMPLATE_POST_SEED v1.1
- Captura automatizada del delta borrador/publicado (Señal 3 de SPEC_LEARNING_SIGNALS)
