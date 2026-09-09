---
id: S8-05
title: Hook de bienvenida SessionStart + ampliar trigger phrases de editor-onboarding
type: infra
subsystem: SYSTEM
sprint: 8
status: DONE
priority: P1
depends_on: []
blocks: []
assignee: D-developer
started: 2026-09-09
completed: 2026-09-09
branch: feat/s8-05-session-welcome-hook
---

# S8-05 — Hook de bienvenida `SessionStart` + ampliar trigger phrases de `editor-onboarding`

## Contexto

Al repasar la experiencia de un editor que instala el plugin desde cero, se detectó que nada se dispara automáticamente al abrir una sesión nueva — el editor tiene que saber decir una frase concreta ("configurar mi entorno") para que `editor-onboarding` se active. Un "hola" o "¿qué puedo hacer con esto?" no lleva a ningún sitio. Este ticket cierra ese hueco con un hook `SessionStart` que da a Claude el contexto correcto desde el primer mensaje, sin depender de que el editor adivine la frase mágica.

## Interfaces

### 1. `hooks/scripts/session-welcome.sh` (nuevo, ejecutable)

Script `command`-type (el evento `SessionStart` solo soporta hooks de tipo `command`, no `prompt` — ver `_system/SPEC_PLUGIN_ARCHITECTURE.md` y el schema de componentes de Cowork). Comprueba si `${CLAUDE_PLUGIN_ROOT}/_editor/config/EDITOR_CONFIG.md` existe:

- **No existe:** imprime a stdout un bloque de contexto que instruye a Claude a presentarse brevemente como DX-OPUS, explicar en una frase qué hace el sistema, y ofrecer iniciar la skill `editor-onboarding` — sin ejecutarla automáticamente ni asumir que el editor quiere hacerlo ya. Si el editor pide otra cosa directamente en su primer mensaje, responder a eso primero.
- **Existe:** imprime un contexto mínimo, no repetitivo — algo como "Editor ya configurado: {editor_name}. No hace falta repetir bienvenida ni onboarding salvo que el editor lo pida explícitamente." El campo `editor_name` se lee del propio `EDITOR_CONFIG.md` (formato `editor_name:             [valor]`, ver `_system/templates/TEMPLATE_EDITOR_CONFIG.md` para el formato exacto real).

### 2. Nueva entrada en `hooks/hooks.json`

```json
"SessionStart": [
  {
    "matcher": "",
    "hooks": [
      {
        "type": "command",
        "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/session-welcome.sh",
        "timeout": 10
      }
    ]
  }
]
```

Es una clave nueva (`SessionStart`) en el JSON raíz, hermana de `PreToolUse` que ya existe — no toca ni reordena las 3 entradas de `PreToolUse` ya presentes.

### 3. Ampliar `skills/editor-onboarding/SKILL.md`

Ampliar la `description` del frontmatter para cubrir también saludos/preguntas genéricas de un editor nuevo perdido — ej. "hola", "¿qué es esto?", "¿cómo funciona esto?" — además de las frases ya existentes. Es una capa de defensa adicional, barata, complementaria al hook (no sustituye al hook, lo refuerza).

## Estructuras de datos

Ninguna nueva. Lee el `EDITOR_CONFIG.md` real según `_system/templates/TEMPLATE_EDITOR_CONFIG.md` — no inventar un formato de campo distinto.

## Decisiones de diseño

- `SessionStart` es `command`-type, determinista — no `prompt`-type. No intentes usar `type: "prompt"` para este evento.
- El script no debe fallar ni bloquear el arranque de sesión si `EDITOR_CONFIG.md` no es parseable por algún motivo — en ese caso, cae al mensaje de "no existe" (tratarlo como si fuera la primera vez es más seguro que asumir que existe y fallar silenciosamente).
- Usa `${CLAUDE_PLUGIN_ROOT}` siempre — nunca una ruta absoluta hardcodeada (`docs/DEV_STANDARDS.md` §7).
- No generes una skill nueva para esto — es exclusivamente un hook + un ajuste de `description` de una skill ya existente.

## Fuera de scope

- Cualquier lógica de checkpoint dentro de `project-setup` (comprobar `EDITOR_CONFIG` antes de crear un proyecto) — es S8-06, ticket separado.
- Publicar el plugin en el catálogo de la organización — fuera de scope de todo Sprint 8, es una acción de administración, no de este ticket.
- Modificar el contenido funcional de `editor-onboarding` más allá de su `description` — sus 5 pasos ya están bien, no los toques.

## Casos de test obligatorios

1. `hooks/scripts/session-welcome.sh` existe, es ejecutable, y `bash -n` no reporta error de sintaxis.
2. `hooks/hooks.json` sigue siendo JSON válido tras añadir la clave `SessionStart` — pega el comando de verificación y su salida — y las 3 entradas de `PreToolUse` existentes siguen intactas.
3. Ejecución manual del script en un entorno simulado sin `EDITOR_CONFIG.md` → confirma que la salida por stdout instruye a presentarse y ofrecer `editor-onboarding`, no a ejecutarlo automáticamente.
4. Ejecución manual del script con un `EDITOR_CONFIG.md` de prueba (con `editor_name` real) → confirma que la salida es mínima y no repetitiva, y que extrae el nombre correctamente.
5. Confirmar que la `description` ampliada de `editor-onboarding` sigue siendo tercera persona con frases disparadoras concretas entre comillas — no una descripción vaga.

## Estado de revisión

Aprobado: 2026-09-09
