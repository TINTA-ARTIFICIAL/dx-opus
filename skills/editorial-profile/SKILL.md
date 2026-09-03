---
name: editorial-profile
description: >
  This skill should be used when an editor wants to define or update their
  editorial voice and style — trigger phrases like "quiero definir mi perfil
  editorial", "crear mi EDITOR_PROFILE", "actualizar mi estilo editorial".
metadata:
  version: "0.1.0"
---

# Skill: editorial-profile

Crea o actualiza el `EDITOR_PROFILE` de un editor: el documento que modela su voz, registro, estilo y restricciones como comunicador, y que luego se usa como input de contexto en Writing, Activation y Evaluation.

No es lo mismo que `editor-onboarding` (S6-03): esa skill configura el `EDITOR_CONFIG` (datos técnicos y de proyectos del editor) y, si no encuentra un `EDITOR_PROFILE`, orienta hacia esta skill para crearlo — pero no depende de que `editor-onboarding` se haya ejecutado antes en la misma sesión.

## Decisión de diseño: ubicación de EDITOR_PROFILE

`_system/resources/AUTO_SAVE_CONFIG.yaml` (sección `EDITOR.EDITOR_PROFILE`) ya declara `folder: "_editor/profiles"`, `template: "EDITOR_PROFILE_{editor_name}.md"`, `scope: "global"` para este artefacto — es la fuente única de verdad para su naming, no la reproduzcas aquí.

Igual que `editor-onboarding` (S6-03) resolvió `_editor/config` como relativo a la raíz del plugin (`_system/SPEC_PLUGIN_ARCHITECTURE.md` §8: la raíz del plugin es la raíz de este repositorio), aplica el mismo criterio aquí: `folder: "_editor/profiles"` se resuelve **relativo a la raíz del repo/plugin**, no relativo a ninguna carpeta de Drive del modelo anterior.

**Ruta resultante y vinculante para esta skill: `_editor/profiles/EDITOR_PROFILE_{editor_name}.md`** (ruta relativa a la raíz del repo, con `{editor_name}` sustituido por el nombre del editor). Es un dato global del editor, no de un proyecto — no vive dentro de `projects/`.

## PASO 1: Identificar al editor

Necesitas `editor_name` para resolver la ruta del archivo.

1. Si existe `_editor/config/EDITOR_CONFIG.md` (creado por `editor-onboarding`), léelo y toma `editor_name` de ahí.
2. Si no existe, o el campo no está presente, pregunta directamente al editor su nombre.

## PASO 2: Detectar si ya existe un EDITOR_PROFILE para este editor

1. Comprueba si existe `_editor/profiles/EDITOR_PROFILE_{editor_name}.md`.
2. Si existe, léelo.

### CHECKPOINT OBLIGATORIO — NO SOBRESCRIBIR SIN CONFIRMACIÓN

Si el `EDITOR_PROFILE` ya existe, **no lo regeneres ni lo sobrescribas en silencio** — es un documento extenso (8,000-12,000 palabras) que ya puede estar en uso por Writing, Activation o Evaluation.

1. Informa al editor de que ya existe un perfil editorial para su nombre.
2. Pregunta explícitamente si quiere actualizarlo (todo o partes concretas) o dejarlo como está. No asumas que quiere regenerarlo solo porque invocó esta skill de nuevo.
3. Si el editor confirma que quiere actualizar, aplica solo los cambios que indique, conservando el resto del documento.
4. Si el editor no da una respuesta clara, no continúes — vuelve a preguntar en vez de interpretar silencio o una respuesta ambigua como autorización para sobrescribir.

Si no existe, continúa con el PASO 3.

## PASO 3: Generar el EDITOR_PROFILE

Lee `editorial-profile/PROMPT_CREATE_EDITOR_PROFILE.md` completo y sigue su metodología tal cual — ese prompt define el proceso completo (recopilación de fuentes, análisis por sección, extracción de ejemplos, síntesis, validación) y los inputs mínimos/opcionales/ideales que debes recoger del editor antes de generar nada. No reproduzcas aquí esa metodología, ni la resumas de forma que sustituya la lectura del prompt.

La estructura del documento resultante es la de `editorial-profile/TEMPLATE_EDITOR_PROFILE.md` — léelo antes de generar nada y respétalo íntegro: todas sus secciones, en el mismo orden, sin añadir ni inventar campos que el template no contempla. Si alguna sección no aplica por falta de información, márcala como corresponde según las instrucciones del propio `PROMPT_CREATE_EDITOR_PROFILE.md` (p. ej. "[INFORMACIÓN INSUFICIENTE]"), no la omitas ni la rellenes con contenido inventado.

Recursos adicionales que pueden informar el perfil, si el editor los menciona o resultan relevantes:

- `editorial-profile/RESOURCE_EDITORIAL_STYLE.md` — estilos editoriales ya definidos en el sistema (útil para situar la voz del editor respecto al estilo de casa de Tinta Artificial).
- `editorial-profile/RESOURCE_BOOK_TYPES.md` — tipos de libro que el sistema soporta (útil al completar la sección de "Aplicación al Workflow de Escritura" del template).

Léelos por su ruta real cuando los necesites — no copies su contenido en este archivo ni en el `EDITOR_PROFILE` generado.

Guarda el resultado en `_editor/profiles/EDITOR_PROFILE_{editor_name}.md` (crea la carpeta `_editor/profiles/` si no existe).

Si falla la escritura (permisos, ruta no accesible), no guardes en ninguna otra carpeta como alternativa — presenta el contenido completo del archivo en el chat junto con la ruta exacta para que el editor lo guarde manualmente. Mismo criterio que `ERROR_HANDLING` en `_system/resources/AUTO_SAVE_CONFIG.yaml`.

## PASO 4: Mencionar el mecanismo de notas del editor

Informa al editor de que, durante la producción de un libro, puede usar `editorial-profile/TEMPLATE_EDITOR_NOTES.md` (con la guía `editorial-profile/GUIDE_EDITOR_NOTES.md`) para capturar reflexiones y decisiones editoriales a medida que avanza — material que luego alimenta el prólogo y la introducción del libro. Esto es independiente del `EDITOR_PROFILE`: no lo actives ni lo crees en esta skill, solo menciónalo.

## PASO 5: Cierre

### CHECKPOINT — no avances de forma autónoma al siguiente paso

Al terminar (perfil creado o actualizado), **para aquí**. No inicies tú mismo `project-setup` ni ningún otro workflow.

Presenta un resumen breve:

```
✅ EDITOR_PROFILE configurado en _editor/profiles/EDITOR_PROFILE_{editor_name}.md
[Nota breve: recuerda a TEMPLATE_EDITOR_NOTES.md/GUIDE_EDITOR_NOTES.md como mecanismo de notas durante producción]
```

Espera a que el editor decida cómo quiere continuar — no asumas ni ejecutes ningún otro paso del workflow en su nombre.
