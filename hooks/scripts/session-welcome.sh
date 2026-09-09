#!/bin/bash
#
# session-welcome.sh
# D-X-OPUS SessionStart hook v1.0
#
# Usage: bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/session-welcome.sh
#
# Qué hace:
#   Hook `command`-type para el evento SessionStart (ver
#   docs/backlog/ISSUE_S8-05_session-welcome-hook.md — el evento
#   SessionStart solo soporta hooks `command`, no `prompt`). Comprueba si
#   ${CLAUDE_PLUGIN_ROOT}/_editor/config/EDITOR_CONFIG.md existe y, según el
#   caso, imprime a stdout un bloque de contexto distinto:
#
#     - No existe (o no es parseable): instruye a Claude a presentarse como
#       DX-OPUS, explicar en una frase qué hace el sistema, y ofrecer — sin
#       ejecutarla automáticamente — iniciar la skill `editor-onboarding`.
#     - Existe: contexto mínimo, no repetitivo, con el `editor_name` leído
#       del propio archivo (formato real: ver
#       _system/templates/TEMPLATE_EDITOR_CONFIG.md, sección
#       "INFORMACIÓN PERSONAL", campo `editor_name:             [valor]`).
#
#   No debe fallar ni bloquear el arranque de sesión bajo ninguna
#   circunstancia (ISSUE_S8-05, "Decisiones de diseño") — cualquier error de
#   parseo del EDITOR_CONFIG.md cae al mensaje de "no existe" en vez de
#   asumir que el archivo es válido.
#
# CHANGELOG:
#   v1.0 - Versión inicial (S8-05)

set -uo pipefail

CONFIG_PATH="${CLAUDE_PLUGIN_ROOT}/_editor/config/EDITOR_CONFIG.md"

print_no_config() {
    cat <<'EOF'
Contexto de sesión — D-X-OPUS (SessionStart hook, session-welcome.sh):

No se encontró configuración de editor (_editor/config/EDITOR_CONFIG.md no existe todavía, o no se pudo leer). Esto sugiere que es la primera vez que este editor usa el plugin.

Instrucciones para Claude en este primer mensaje:
1. Preséntate brevemente como DX-OPUS.
2. Explica en una sola frase qué hace el sistema.
3. Ofrece iniciar la skill `editor-onboarding` para configurar su entorno — NO la ejecutes automáticamente, ni asumas que el editor ya quiere hacerlo.
4. Si el editor pide otra cosa directamente en su primer mensaje, responde a eso primero — esta bienvenida no tiene prioridad sobre una petición explícita del editor.
EOF
}

print_existing_config() {
    local editor_name="$1"
    cat <<EOF
Contexto de sesión — D-X-OPUS (SessionStart hook, session-welcome.sh):

Editor ya configurado: ${editor_name}. No hace falta repetir bienvenida ni onboarding salvo que el editor lo pida explícitamente.
EOF
}

if [ ! -f "${CONFIG_PATH}" ]; then
    print_no_config
    exit 0
fi

# Extrae editor_name de la línea `editor_name:             [valor]`. Si no
# hay coincidencia (archivo corrupto, sección reordenada, etc.), cae al
# mensaje de "no existe" — más seguro que asumir que la config es válida.
RAW_LINE="$(grep -m1 '^editor_name:' "${CONFIG_PATH}" 2>/dev/null || true)"

if [ -z "${RAW_LINE}" ]; then
    print_no_config
    exit 0
fi

EDITOR_NAME="$(echo "${RAW_LINE}" | sed 's/^editor_name:[[:space:]]*//' | sed 's/[[:space:]]*$//')"

# Si el valor sigue siendo el placeholder del template (entre corchetes) o
# quedó vacío, el EDITOR_CONFIG.md no está realmente rellenado todavía —
# trátalo igual que si no existiera.
if [ -z "${EDITOR_NAME}" ] || [[ "${EDITOR_NAME}" == \[*\] ]]; then
    print_no_config
    exit 0
fi

print_existing_config "${EDITOR_NAME}"
exit 0
