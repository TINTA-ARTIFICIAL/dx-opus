---
name: setup
description: >
  This skill should be used the first time an editor sets up D-X-OPUS, or
  when they explicitly want to review/update their personal configuration —
  trigger phrases like "configurar mi entorno", "primera vez que uso esto",
  "quiero cambiar mi configuración de editor", "no sé por dónde empezar con
  esto", "esto es nuevo para mí". It should also be used when a new,
  disoriented editor greets Claude or asks a generic question about the
  system without knowing the exact setup phrase — trigger phrases like
  "hola", "buenas", "¿qué es esto?", "¿cómo funciona esto?", "¿qué puedes
  hacer por mí?".
metadata:
  version: "0.1.0"
---

# Skill: setup

Configura por única vez el `EDITOR_CONFIG` de un editor en el modelo de plugin. No es una skill por proyecto — eso lo cubre `new-project`.

## Decisión de diseño: ubicación de EDITOR_CONFIG.md

`_system/resources/AUTO_SAVE_CONFIG.yaml` (sección `EDITOR.EDITOR_CONFIG`) ya declara `folder: "_editor/config"`, `unique: true`, `scope: "global"` para este artefacto — es la fuente única de verdad para su naming y unicidad, no la reproduzcas aquí. (Ruta relativa a la carpeta de trabajo — ver PASO 2 sobre cómo llega ahí una copia local de ese YAML.)

Esa entrada se escribió para el modelo anterior (Apps Script/Drive), donde la ruta completa era `D-X-OPUS/_editor/config/EDITOR_CONFIG.md` con `D-X-OPUS/` como raíz de Drive (ver "Ubicación" en `_system/templates/TEMPLATE_EDITOR_CONFIG.md`). En el modelo de plugin, `_system/SPEC_PLUGIN_ARCHITECTURE.md` §8 fija que **la raíz del plugin es la raíz de este repositorio**. Aplicando ese mismo criterio aquí — igual que `new-project` (S6-02) crea `projects/{project_code}_{project_name}/` directamente en la raíz del repo — el `folder: "_editor/config"` de `AUTO_SAVE_CONFIG.yaml` se resuelve **relativo a la raíz del repo/plugin**, no relativo a ninguna carpeta de Drive.

**Ruta resultante y vinculante para esta skill: `_editor/config/EDITOR_CONFIG.md`** (ruta relativa a la raíz del repo). Es un dato global del editor, no de un proyecto — no vive dentro de `projects/`.

## PASO 1: Detectar si ya existe EDITOR_CONFIG

1. Comprueba si existe el archivo en `_editor/config/EDITOR_CONFIG.md`.
2. Si existe, léelo.

### CHECKPOINT OBLIGATORIO — NO SOBRESCRIBIR SIN CONFIRMACIÓN

Si `EDITOR_CONFIG.md` ya existe, **no lo regeneres ni lo sobrescribas en silencio** — es un artefacto `unique: true` por editor, y regenerarlo sin más borraría configuración, proyectos activos y estadísticas ya registradas.

1. Informa al editor de que ya existe una configuración (resume brevemente `editor_name` y `last_config_update` si están presentes).
2. Pregunta explícitamente si quiere revisar/actualizar campos concretos o dejarlo como está. No asumas que quiere regenerarlo solo porque invocó esta skill de nuevo.
3. Si el editor confirma que quiere actualizar, edita únicamente los campos que indique, conservando el resto del archivo (incluidas tablas ya pobladas por otras skills, como la lista de proyectos activos).
4. Si el editor no da una respuesta clara, no continúes — vuelve a preguntar en vez de interpretar silencio o una respuesta ambigua como autorización para sobrescribir.

Continúa con el PASO 2 en cualquier caso (exista ya `EDITOR_CONFIG.md` o no) — sembrar `_system/resources/`/`_system/templates/` es independiente de si hace falta generar o actualizar `EDITOR_CONFIG.md`.

## PASO 2: Sembrar `_system/resources/` y `_system/templates/` en la carpeta de trabajo

Ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §5.d, opción 2. `${CLAUDE_PLUGIN_ROOT}/_system/resources/AUTO_SAVE_CONFIG.yaml` y `${CLAUDE_PLUGIN_ROOT}/_system/templates/*` son datos de referencia puros que casi todas las skills necesitan leer, pero `${CLAUDE_PLUGIN_ROOT}` no es fiable en sesiones cloud (ver esa misma SPEC, §2.b y §4). La carpeta de trabajo del editor sí lo es (§2.a) — por eso esta skill, que ya es el punto de primer arranque, deja una copia local ahí, una única vez. Se hace en este PASO (no en el cierre) porque el propio PASO 3 de esta skill necesita leer `_system/templates/TEMPLATE_EDITOR_CONFIG.md` de la carpeta de trabajo — sembrarlo antes evita que esta skill dependa de `${CLAUDE_PLUGIN_ROOT}` para su propia lectura.

Esto es una copia de arranque, no una sincronización continua: si `AUTO_SAVE_CONFIG.yaml` cambia de versión en el plugin, la copia local no se actualiza sola (deuda pendiente — falta diseñar un mecanismo de "detectar versión desactualizada y ofrecer actualizar", fuera del alcance de esta skill). Cada skill del sistema sigue tratando `AUTO_SAVE_CONFIG.yaml` como fuente única de verdad — solo cambia su ubicación física, no su rol.

Comprueba, de forma independiente para cada uno (uno puede existir sin el otro si un arranque anterior falló a medias):

1. **`_system/resources/AUTO_SAVE_CONFIG.yaml`** (relativo a la carpeta de trabajo, es decir, a la raíz del repo — mismo criterio de resolución que `_editor/config`):
   - Si **ya existe**: no lo sobrescribas en silencio. No lo toques ni compares versión — eso es la deuda anotada arriba. Simplemente anótalo para el resumen final.
   - Si **no existe**: crea la carpeta `_system/resources/` si hace falta y copia ahí el contenido íntegro y sin modificar de `${CLAUDE_PLUGIN_ROOT}/_system/resources/AUTO_SAVE_CONFIG.yaml`.
2. **`_system/templates/*`** (relativo a la carpeta de trabajo):
   - Si la carpeta **ya existe** con contenido: no la sobrescribas en silencio — anótalo para el resumen final, igual que en el caso anterior.
   - Si **no existe**: crea `_system/templates/` y copia ahí, sin modificar, cada archivo de `${CLAUDE_PLUGIN_ROOT}/_system/templates/` (incluye `README.md` y los tres `TEMPLATE_*.md` — todo el contenido de esa carpeta, tal cual).

**Manejo de errores:** si la copia falla (permisos, carpeta no accesible), no hagas fallback silencioso a ninguna otra carpeta. Mismo criterio que `ERROR_HANDLING` en `_system/resources/AUTO_SAVE_CONFIG.yaml` y que el resto de esta skill: reporta el error exacto (qué archivo, qué tipo de fallo) y presenta en el chat el contenido completo y la ruta exacta de lo que no se pudo copiar, para que el editor lo guarde manualmente. Si falla la copia de `_system/templates/TEMPLATE_EDITOR_CONFIG.md` en particular, no continúes al PASO 3 sin resolverlo — esta skill no puede generar `EDITOR_CONFIG.md` sin esa estructura.

## PASO 3: Recoger información personal mínima

Aplica solo si `EDITOR_CONFIG.md` no existía todavía (PASO 1). Si ya existía y el editor no pidió regenerarlo, salta directamente al PASO 5.

Lee `_system/templates/TEMPLATE_EDITOR_CONFIG.md` completo (carpeta de trabajo, sembrado en el PASO 2) antes de generar nada — la estructura de `EDITOR_CONFIG.md` es exactamente la de ese template, no un formato nuevo ni una versión abreviada.

Pregunta al editor solo los datos mínimos que el propio template requiere para la sección "INFORMACIÓN PERSONAL":

- `editor_name` (nombre completo del editor)
- `system_version` (ej. `R1`)
- fecha de setup (usa la fecha actual salvo que el editor indique otra)

No inventes ni pidas campos que no estén en el template.

## PASO 4: Generar EDITOR_CONFIG.md

El template tiene dos partes claramente distintas — no las confundas:

- **Envoltura del template como artefacto** (cabecera YAML `id/type/subsystem/...`, `CHANGELOG`, `DEPENDENCIES`, `DESCRIPTION`, el título "# TEMPLATE: EDITOR_CONFIG", la sección "INSTRUCCIONES DE USO" y la nota "**Ubicación:** ..."). Esto describe el template en sí dentro de `_system/templates/` — **no se copia** al `EDITOR_CONFIG.md` generado.
- **Estructura real a copiar**: desde el encabezado `# EDITOR_CONFIG :: [NOMBRE_EDITOR]` hasta `**FIN DEL TEMPLATE EDITOR_CONFIG**` inclusive, con todas las secciones intermedias en el mismo orden (Información Personal, Configuración Técnica, Configuración Editorial, Biblioteca Personal, Proyectos Activos, Estadísticas de Uso, Configuración Avanzada, Troubleshooting Log, Notas Personales, Metadatos de Configuración, Acciones Automáticas, Próximos Pasos).

Genera el `EDITOR_CONFIG.md` copiando esa segunda parte íntegra, con estas reglas:

1. Sustituye `[NOMBRE_EDITOR]` en el encabezado por el nombre real del editor.
2. Rellena la sección "INFORMACIÓN PERSONAL" con los datos recogidos en el PASO 3 (`editor_name`, `setup_completed`, `system_version`, `last_config_update` = fecha/hora actual, `config_version: 1.0`).
3. Deja el resto de secciones (Configuración Técnica, Configuración Editorial, Biblioteca Personal, Proyectos Activos, Estadísticas de Uso, etc.) con los placeholders del template tal cual — esta skill no tiene la información para rellenarlas todavía; se completan progresivamente con el uso real (otras skills, ej. `new-project`, actualizan la tabla de proyectos).
4. No añadas, quites ni reordenes secciones o campos que no estén ya en ese rango del template.

Crea la carpeta `_editor/config/` si no existe, y guarda el archivo en `_editor/config/EDITOR_CONFIG.md`.

Si falla la escritura (permisos, ruta no accesible), no guardes en ninguna otra carpeta como alternativa — presenta el contenido completo del archivo en el chat junto con la ruta exacta (`_editor/config/EDITOR_CONFIG.md`) para que el editor lo guarde manualmente. Mismo criterio que `ERROR_HANDLING` en `_system/resources/AUTO_SAVE_CONFIG.yaml`.

## PASO 5: Comprobar EDITOR_PROFILE (sin crearlo)

Comprueba si existe ya un `EDITOR_PROFILE` para este editor en `_editor/profiles/EDITOR_PROFILE_{editor_name}.md` (ruta y naming según `_system/resources/AUTO_SAVE_CONFIG.yaml`, sección `EDITOR.EDITOR_PROFILE`).

- **Si existe:** menciónalo al editor, sin leerlo en profundidad ni modificarlo — no es responsabilidad de esta skill.
- **Si no existe:** esta skill **no lo crea**. Informa al editor de que puede definir su perfil editorial (voz, estilo) cuando quiera, invocando la skill `editorial-profile` — aclara que esa skill todavía no está construida (Sprint 7) si el editor pregunta cuándo estará disponible. No bloquees el resto del setup por su ausencia.

## PASO 6: Cierre

### CHECKPOINT — no avances de forma autónoma al siguiente paso

Al terminar el setup (`EDITOR_CONFIG.md` creado o actualizado, `EDITOR_PROFILE` comprobado, `_system/resources/`/`_system/templates/` sembrados o confirmados ya presentes desde el PASO 2), **para aquí**. No inicies tú mismo la skill `new-project` ni ningún otro workflow.

Presenta un resumen breve:

```
✅ EDITOR_CONFIG configurado en _editor/config/EDITOR_CONFIG.md
[Si no había EDITOR_PROFILE: nota de que puede crearlo con la skill `editorial-profile` cuando quiera]
✅ _system/resources/AUTO_SAVE_CONFIG.yaml [creado ahora | ya existía, no modificado]
✅ _system/templates/ [creado ahora | ya existía, no modificado]

Siguiente paso natural: crear tu primer proyecto con la skill `new-project`.
```

Espera a que el editor decida si quiere continuar ahora o más adelante — no asumas ni ejecutes `new-project` en su nombre.
