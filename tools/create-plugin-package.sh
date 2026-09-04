#!/bin/bash
#
# create-plugin-package.sh
# D-X-OPUS Plugin Package Creation Script v1.0
#
# Usage:   tools/create-plugin-package.sh
#          tools/create-plugin-package.sh --output /path/to/dx-opus.plugin
#
# Output:  dx-opus.plugin (zip) at the repo root by default.
#
# Qué hace:
#   Empaqueta el contenido INSTALABLE del plugin (root del plugin = root
#   del repo, ver _system/SPEC_PLUGIN_ARCHITECTURE.md §8) respetando el
#   límite instalable/desarrollo descrito en
#   _system/SCHEMA_SYSTEM_ARCHITECTURE.md PARTE 8 (v1.5):
#
#   Incluido:
#     - .claude-plugin/
#     - skills/
#     - hooks/
#     - Contenido de producción de cada subsistema (research/, writing/,
#       evaluation/, activation/, editorial-profile/, knowledge-base/)
#       excepto sus subcarpetas dev/
#     - _system/resources/
#     - _system/templates/
#
#   Excluido:
#     - Cualquier ruta que contenga /dev/
#     - El resto de _system/ (decisions/, audits/, SPEC_*.md, SCHEMA_*.md,
#       MASTER_PLAN.md, etc. — todo lo que no sea resources/ o templates/)
#     - docs/, tools/ completos
#     - Todos los README.md
#     - .git/, .DS_Store
#
#   El filtro es estructural (por carpeta/patrón), no una lista de archivos
#   mantenida a mano (docs/DEV_STANDARDS.md §3) — ver
#   docs/backlog/ISSUE_S8-02_packaging-mechanism.md "Decisiones de diseño".
#   Este script NO depende de tools/create-release-package.sh ni reutiliza
#   su lógica de FILE_MAPPINGS — es un mecanismo distinto para un modelo de
#   distribución distinto (paquete de plugin instalable, no release del
#   sistema completo).
#
# Requirements:
#   - Standard Unix tools: zip, unzip
#
# CHANGELOG:
#   v1.0 - Versión inicial (S8-02, issue #77)

set -euo pipefail
IFS=$'\n\t'

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_NAME="dx-opus.plugin"
OUTPUT_PATH="${REPO_ROOT}/${OUTPUT_NAME}"

# Rutas incluidas — el límite instalable/desarrollo, por carpeta.
# Todo lo que NO está en esta lista queda fuera automáticamente
# (docs/, tools/, README.md sueltos, el resto de _system/, etc.)
# Los subsistemas se listan una vez cada uno — si mañana se añade un
# séptimo subsistema o una skill nueva, no hace falta tocar este script
# salvo para añadir esa única línea de carpeta.
INCLUDE_PATHS=(
    ".claude-plugin"
    "skills"
    "hooks"
    "research"
    "writing"
    "evaluation"
    "activation"
    "editorial-profile"
    "knowledge-base"
    "_system/resources"
    "_system/templates"
)

# Patrones de exclusión estructurales (no archivos individuales):
#   - cualquier ruta con /dev/ (carpetas de desarrollo de subsistema)
#   - cualquier README.md, a cualquier profundidad
#   - .DS_Store, a cualquier profundidad
EXCLUDE_PATTERNS=(
    "*/dev/*"
    "*/README.md"
    "README.md"
    ".DS_Store"
    "*/.DS_Store"
)

# Patrones prohibidos que la verificación post-build debe confirmar que NO
# aparecen en el zip generado (docs/DEV_STANDARDS.md §8 exige documentar
# esta comprobación, no darla por hecha).
FORBIDDEN_GREP_PATTERNS=(
    "/dev/"
    "^docs/"
    "^tools/"
    "_system/decisions/"
    "_system/audits/"
    "(^|/)README\\.md\$"
)

# ═══════════════════════════════════════════════════════════════
# LOGGING UTILITIES
# ═══════════════════════════════════════════════════════════════

log()     { echo "$(date '+%H:%M:%S') [INFO] $1"; }
success() { echo "$(date '+%H:%M:%S') [OK]   $1"; }
error()   { echo "$(date '+%H:%M:%S') [ERROR] $1" >&2; exit 1; }

# ═══════════════════════════════════════════════════════════════
# ARGUMENT PARSING
# ═══════════════════════════════════════════════════════════════

while [[ $# -gt 0 ]]; do
    case "$1" in
        --output)
            OUTPUT_PATH="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [--output /path/to/dx-opus.plugin]"
            exit 0
            ;;
        *)
            error "Argumento desconocido: $1"
            ;;
    esac
done

command -v zip   >/dev/null 2>&1 || error "'zip' no está disponible en este sistema."
command -v unzip >/dev/null 2>&1 || error "'unzip' no está disponible en este sistema."

# ═══════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════

cd "${REPO_ROOT}"

log "Root del plugin (= root del repo): ${REPO_ROOT}"

# Confirma que todas las rutas incluidas existen antes de empaquetar.
for path in "${INCLUDE_PATHS[@]}"; do
    if [ ! -e "${path}" ]; then
        error "Ruta esperada no encontrada: ${path} (¿cambió la estructura del repo?)"
    fi
done

if [ -f "${OUTPUT_PATH}" ]; then
    log "Eliminando ${OUTPUT_PATH} preexistente para reconstruir desde cero."
    rm -f "${OUTPUT_PATH}"
fi

# Construye el array de flags -x para zip.
ZIP_EXCLUDES=()
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    ZIP_EXCLUDES+=("${pattern}")
done

log "Empaquetando: ${INCLUDE_PATHS[*]}"
log "Excluyendo patrón: ${EXCLUDE_PATTERNS[*]}"

zip -r -X -q "${OUTPUT_PATH}" "${INCLUDE_PATHS[@]}" -x "${ZIP_EXCLUDES[@]}"

if [ ! -f "${OUTPUT_PATH}" ]; then
    error "No se generó ${OUTPUT_PATH} — falló zip."
fi

success "Generado ${OUTPUT_PATH} ($(du -h "${OUTPUT_PATH}" | cut -f1))"

# ═══════════════════════════════════════════════════════════════
# VERIFICACIÓN POST-BUILD (obligatoria — no solo "funciona en este intento")
# ═══════════════════════════════════════════════════════════════
#
# Ver docs/backlog/ISSUE_S8-02_packaging-mechanism.md, "Decisiones de
# diseño": "Verificar, tras generar el .plugin, que ningún archivo bajo
# /dev/ ni de las rutas excluidas quedó dentro del zip". Se hace en cada
# ejecución del script, no solo manualmente una vez.

log "Verificando que el paquete no contiene rutas excluidas..."

ZIP_CONTENTS="$(unzip -Z1 "${OUTPUT_PATH}")"

LEAK_FOUND=false
for pattern in "${FORBIDDEN_GREP_PATTERNS[@]}"; do
    MATCHES="$(echo "${ZIP_CONTENTS}" | grep -E "${pattern}" || true)"
    if [ -n "${MATCHES}" ]; then
        echo "$(date '+%H:%M:%S') [ERROR] Patrón prohibido '${pattern}' encontrado en el paquete:" >&2
        echo "${MATCHES}" | sed 's/^/    /' >&2
        LEAK_FOUND=true
    fi
done

if [ "${LEAK_FOUND}" = true ]; then
    rm -f "${OUTPUT_PATH}"
    error "Verificación fallida — ${OUTPUT_PATH} contenía rutas excluidas y fue eliminado. Revisa INCLUDE_PATHS/EXCLUDE_PATTERNS."
fi

success "Verificación OK — ningún archivo bajo /dev/, docs/, tools/, _system/decisions/, _system/audits/, ni ningún README.md quedó dentro del paquete."

FILE_COUNT="$(echo "${ZIP_CONTENTS}" | grep -vc '/$' || true)"
success "Paquete listo: ${OUTPUT_PATH} (${FILE_COUNT} archivos)"
