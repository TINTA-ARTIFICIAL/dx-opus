---
id: S10-01
title: El hook de bienvenida debe buscar EDITOR_CONFIG en la carpeta de trabajo, no en la raíz del plugin
type: fix
subsystem: SYSTEM
sprint: 10
status: TODO
priority: P1
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S10-01 — El hook de bienvenida debe buscar `EDITOR_CONFIG` en la carpeta de trabajo

## Contexto

Bug detectado en uso real (editor Marco Laucelli, sesión 2026-10-03, plugin v0.4.0): al iniciar sesión, el hook `SessionStart` afirma que no hay configuración de editor y ofrece `/setup`, aunque `_editor/config/EDITOR_CONFIG.md` existe en su carpeta de trabajo desde el 10 de septiembre. **Verificado en el repo:** `hooks/scripts/session-welcome.sh:42` define `CONFIG_PATH="${CLAUDE_PLUGIN_ROOT}/_editor/config/EDITOR_CONFIG.md"` — la raíz del *plugin instalado*, donde nunca puede estar ese archivo (los datos del editor viven en la carpeta de trabajo; `_system/SPEC_CLOUD_COMPATIBILITY.md` §2.a/§2.b). El error viene de S8-05, escrito bajo el supuesto antiguo "raíz del plugin = raíz del repo = donde está todo".

Dato positivo colateral: confirma que el hook **sí se dispara** en una instalación real desde v0.4.0 (S9-10), algo que antes nunca se había visto.

## Interfaces

`hooks/scripts/session-welcome.sh`: resolver la carpeta de trabajo y buscar ahí `_editor/config/EDITOR_CONFIG.md`.

Documentado en la referencia oficial de hooks de Claude Code (`hooks.md`, verificado 2026-10-03): el comando del hook se ejecuta en el directorio actual de la sesión, recibe la variable de entorno `CLAUDE_PROJECT_DIR` ("la raíz del proyecto donde empezó la sesión") y un campo `cwd` en el JSON por stdin. Orden de resolución propuesto: `CLAUDE_PROJECT_DIR` → `cwd` de stdin → `$PWD`. Nunca `CLAUDE_PLUGIN_ROOT` para datos del editor.

Tres resultados posibles (hoy solo existen dos, y ninguno distingue "no encontrado aquí" de "no existe"):
1. Encontrado y con `editor_name` válido → mensaje actual de "editor ya configurado".
2. Encontrado pero con placeholders sin rellenar → mensaje actual de "primera vez" (lógica de S8-05, se conserva).
3. **No encontrado en la carpeta resuelta → mensaje neutro nuevo**: no afirma que sea la primera vez; indica a Claude que verifique con sus propias herramientas de archivo en la carpeta de trabajo (fiable en local y cloud, `_system/SPEC_CLOUD_COMPATIBILITY.md` §2.a) si existe `_editor/config/EDITOR_CONFIG.md`, y que solo ofrezca `/setup` si realmente no existe.

## Estructuras de datos

Ninguna nueva.

## Decisiones de diseño

- **Por qué el caso 3 es neutro y no "primera vez":** no está verificado que `CLAUDE_PROJECT_DIR`/`cwd` coincidan con la carpeta que el editor conectó en Cowork (puede ser otra). Un hook que afirma con seguridad algo que no puede comprobar es justo el bug que se corrige. Delegar la comprobación final en Claude (que sí lee la carpeta de trabajo) elimina el falso positivo sin depender de ese supuesto.
- El script mantiene exit 0 siempre (criterio de S8-05/S9-09) y conserva la nota de limitación cloud de S9-09.
- Actualizar el comentario de cabecera y el CHANGELOG del script (v1.2).

## Fuera de scope

- Detectar si la sesión es local o cloud (sin mecanismo documentado, ver `_system/SPEC_CLOUD_COMPATIBILITY.md` §4).
- Cambiar qué ofrece o cómo saluda el hook cuando la configuración sí existe.

## Casos de test obligatorios

1. Con `CLAUDE_PROJECT_DIR` apuntando a una carpeta temporal que contiene un `_editor/config/EDITOR_CONFIG.md` válido (`editor_name: Marco`) → salida "Editor ya configurado: Marco", exit 0.
2. Con `CLAUDE_PROJECT_DIR` a una carpeta con `EDITOR_CONFIG.md` con placeholder sin rellenar → mensaje de "primera vez", exit 0 (S8-05 intacto).
3. Con `CLAUDE_PROJECT_DIR` a una carpeta **sin** `EDITOR_CONFIG.md` → mensaje **neutro** (no contiene la afirmación "es la primera vez" ni ofrece `/setup` sin condición), exit 0.
4. Con `CLAUDE_PROJECT_DIR` sin definir y `CLAUDE_PLUGIN_ROOT` apuntando a una carpeta que contiene un `EDITOR_CONFIG.md` → **no** lo usa (regresión del bug original); resuelve por `$PWD`.
5. `grep CLAUDE_PLUGIN_ROOT hooks/scripts/session-welcome.sh` no aparece en ninguna ruta de datos del editor.
6. Confirmación real (humana, editor con configuración existente): al abrir sesión nueva ya no se le ofrece `/setup`.

## Estado de revisión

PENDIENTE — esperando confirmación del editor sobre el diseño del caso 3 (mensaje neutro delegando la comprobación en Claude).
