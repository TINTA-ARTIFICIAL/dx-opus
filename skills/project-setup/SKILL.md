---
name: project-setup
description: >
  This skill should be used when the user wants to start a new writing
  project — trigger phrases like "crear un proyecto nuevo", "empezar un
  libro sobre X", "quiero escribir una serie de posts sobre Y", "arrancar
  un proyecto".
metadata:
  version: "0.1.0"
---

## PROPÓSITO

Crea la estructura inicial de un proyecto nuevo D-X-OPUS: carpeta raíz del
proyecto, las subcarpetas estándar y `PROJECT_CONFIG.md`. Sustituye, para
proyectos creados a través del plugin, al flujo antiguo de
`tools/TOOL_CREATE_PROJECT.gs` (Apps Script + Drive) — este skill trabaja
sobre el sistema de archivos local del entorno del plugin, no llama a la
API de Google Drive. La sincronización/colaboración vía Drive queda
diferida (no es responsabilidad de este skill).

Fuente única de verdad para cualquier ruta o naming que este skill
necesite: `_system/resources/AUTO_SAVE_CONFIG.yaml`. Este archivo no
reproduce ninguna tabla de rutas/naming — siempre lee ese YAML en el
momento de ejecutar, para no arriesgarse a quedar desincronizado si el
YAML cambia (la razón exacta por la que `TOOL_CREATE_PROJECT.gs` y
`ARQUITECTURA_AUTO_SAVE_GENERICA.md` tuvieron copias obsoletas — ver
`docs/DEV_STANDARDS.md` §3).

---

### PASO 1: Determinar `project_code` y `project_name`

Si el editor no los ha dado explícitamente en su mensaje, pregúntaselos
antes de continuar — no los inventes ni los infieras de contexto parcial.

- `project_code`: código corto en mayúsculas. Formato exacto —
  `NAMING_RULES.project_code` en `_system/resources/AUTO_SAVE_CONFIG.yaml`
  (máx. 10 caracteres, `A-Z0-9_`). Si el editor propone un código que no
  cumple el formato, pídele uno válido explicando por qué el suyo no vale.
- `project_name`: nombre descriptivo del proyecto, en texto libre (se usa
  tal cual para nombrar la carpeta raíz).

No avances al PASO 2 sin tener ambos valores confirmados por el editor.

### PASO 2: Crear la carpeta raíz del proyecto

Crea el directorio `projects/{project_code}_{project_name}/` en el
sistema de archivos local del plugin. No uses la API de Google Drive ni
ningún mecanismo de colaboración remota (decisión de Sprint 5: el
mecanismo de colaboración/Drive se revisa más adelante, fuera del alcance
de este skill).

### PASO 3: Crear las subcarpetas estándar del proyecto

Las subcarpetas de nivel superior de un proyecto son los valores del
campo `folder` que aparecen en `_system/resources/AUTO_SAVE_CONFIG.yaml`
para artefactos de proyecto:

- las secciones `SYSTEM.PROJECT_NOTES` y `SYSTEM.PROJECT_CONFIG`,
- la ruta por defecto/compartida (`folder`, no `folder_if_post_scoped`) de
  cualquier entrada de `RESEARCH`,
- el segmento de carpeta de nivel superior (antes de `/{post_folder}`) de
  cualquier entrada de `WRITING_POST`,
- cualquier entrada de `WRITING_BOOK`,
- cualquier entrada de `ACTIVATION`.

Lee el YAML y calcula el conjunto de valores **distintos** resultante —
no copies esa lista aquí como tabla fija, porque una futura actualización
de `AUTO_SAVE_CONFIG.yaml` dejaría este `SKILL.md` obsoleto (exactamente
el problema que causó la duplicación corregida en Sprint 5). Crea cada
una de esas carpetas, vacía, dentro de
`projects/{project_code}_{project_name}/`.

No crees ninguna otra subcarpeta en este paso — en particular, no crees
subcarpetas dinámicas de post (ver PASO 5).

### PASO 4: Generar `PROJECT_CONFIG.md`

Genera `PROJECT_CONFIG.md` dentro de la subcarpeta que corresponde a
`SYSTEM.PROJECT_CONFIG.folder` en `AUTO_SAVE_CONFIG.yaml` (la que creaste
en el PASO 3 a partir de esa entrada — usa la ruta real que hayas creado,
no un nombre fijo escrito aquí), con esta forma — equivalente en estructura a la que producía
`generateProjectConfig()` en `tools/TOOL_CREATE_PROJECT.gs`, pero **sin**
la tabla "CONFIGURACIÓN DE AUTO-SAVE" que tenía el original (esa tabla
hardcodeada es exactamente la duplicación que se corrigió en Sprint 5):

````markdown
# PROJECT_CONFIG :: {project_code} – {project_name}

**Generado:** {fecha_de_hoy}
**Sistema:** D-X-OPUS R1

## INFORMACIÓN DEL PROYECTO

```yaml
project_code: {project_code}
project_name: {project_name}
created_date: {fecha_de_hoy}
project_path: projects/{project_code}_{project_name}/
```

## AUTO-SAVE

Las rutas y el naming de cada tipo de artefacto de este proyecto se
definen en `_system/resources/AUTO_SAVE_CONFIG.yaml` — no se reproducen
en este archivo. Consulta ese YAML como fuente única de verdad antes de
guardar o buscar cualquier artefacto de este proyecto.

## SUBCARPETAS CREADAS

{lista de las subcarpetas efectivamente creadas en el PASO 3, una por
línea, con su ruta relativa dentro de la carpeta del proyecto — la lista
real, no una copia de AUTO_SAVE_CONFIG.yaml}

## ESTADO INICIAL

- [ ] PROMPT_PROJECT_DISCOVERY ejecutado (`_system/PROMPT_PROJECT_DISCOVERY.md`)
- [ ] Primer workflow iniciado

---

*Configuración generada automáticamente por la skill `project-setup`.*
````

### PASO 5: No pre-crear subcarpetas dinámicas de post

La subcarpeta correspondiente a las entradas de `WRITING_POST` en
`AUTO_SAVE_CONFIG.yaml` (la que creaste en el PASO 3 a partir de esas
entradas) se crea vacía. No crees dentro de ella ninguna subcarpeta
`Post{N}_{post_name}` en este momento. Esas subcarpetas se calculan y se
crean únicamente cuando se guarda el primer artefacto de un post nuevo
(`NAMING_RULES.post_folder` en `AUTO_SAVE_CONFIG.yaml`, comentario
"ESTRUCTURA POR POST") — no como parte de la creación del proyecto. Esto
aplica igual a la investigación específica de un post: el alcance dual de
investigación (compartida en la subcarpeta de research vs. propia de un
post, dentro de la carpeta de ese post) ya está resuelto en
`AUTO_SAVE_CONFIG.yaml` v1.2 y `_system/SPEC_PLUGIN_ARCHITECTURE.md`
§5.3 punto 2 — este skill no necesita ni debe reimplementar esa lógica,
solo evitar pre-crear estructura que le corresponde a otro momento del
flujo.

### Manejo de errores

Sigue exactamente `ERROR_HANDLING` de `_system/resources/AUTO_SAVE_CONFIG.yaml`
(v1.3) — no un criterio distinto:

- **Carpeta destino no encontrada:** créala antes de escribir. Nunca
  reutilices ni "adivines" una carpeta parecida por nombre — ese patrón
  fue exactamente la causa de las subcarpetas duplicadas del issue #49.
- **Fallo de permisos o cualquier otro fallo al crear una carpeta o
  escribir un archivo:** está prohibido continuar guardando en la carpeta
  raíz del proyecto ni en ninguna otra carpeta distinta a la que
  corresponde. Nunca hagas fallback silencioso a la carpeta raíz (issue
  #65). En su lugar: (1) reporta el error exacto — qué carpeta, qué tipo
  de fallo; (2) presenta en el chat el contenido completo de lo que no se
  pudo crear/escribir (estructura de carpetas pendiente o contenido de
  `PROJECT_CONFIG.md`); (3) da la ruta y nombre exactos para que el
  editor lo cree/guarde a mano.
- No sigas al siguiente paso de este skill si un paso anterior falló
  parcialmente — reporta el estado exacto (qué se creó, qué no) antes de
  continuar o de cerrar la sesión.

---

## CHECKPOINT OBLIGATORIO — NO AVANZAR SIN CONFIRMACIÓN

Al terminar el PASO 4 (estructura de carpetas creada y `PROJECT_CONFIG.md`
generado), **para aquí.**

1. Presenta al editor un resumen: `project_code`, `project_name`, ruta del
   proyecto y la lista real de subcarpetas creadas.
2. No ejecutes automáticamente `_system/PROMPT_PROJECT_DISCOVERY.md` ni
   ningún otro prompt o workflow (research, writing, activation) a
   continuación, aunque "sepas" que ese es el siguiente paso lógico del
   sistema. Saberlo no es lo mismo que estar autorizado a ejecutarlo sin
   que el editor lo pida.
3. Pregunta explícitamente cómo quiere continuar, por ejemplo:

   ```
   Proyecto {project_code} creado en projects/{project_code}_{project_name}/.

   ¿Cómo quieres continuar?
   a) Arrancar la primera sesión del proyecto (PROMPT_PROJECT_DISCOVERY)
   b) Configurar primero el editor (editor-onboarding), si aún no lo has hecho
   c) Nada más por ahora
   ```

4. Si el editor responde de forma ambigua ("sigue", "lo que tú veas"), no
   lo interpretes como autorización para avanzar de fase — pide que
   confirme una de las opciones.

---

## FUERA DE SCOPE DE ESTE SKILL

- Sincronización o colaboración vía Google Drive.
- Migrar proyectos ya existentes creados con `TOOL_CREATE_PROJECT.gs` al
  formato nuevo.
- Crear o validar `EDITOR_CONFIG` en profundidad — este skill puede
  asumir que existe según `_system/templates/TEMPLATE_EDITOR_CONFIG.md`,
  pero su creación es responsabilidad de `editor-onboarding`.
- Contenido de `knowledge-base` (SAH/CVC) — no lo copies ni lo
  referencies en detalle aquí.
