#!/bin/bash
#
# create-plugin-package.sh
# D-X-OPUS Plugin Package Creation Script v1.6
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
#     - commands/
#     - hooks/
#     - Contenido de producción del único subsistema que aún conserva
#       contenido a nivel de repo (writing/) excepto sus subcarpetas dev/ —
#       research/, activation/, evaluation/, knowledge-base/ y
#       editorial-profile/ ya no aparecen aquí: todo su contenido (exclusivo,
#       S9-01, o compartido entre skills, S9-02/S9-03) se movió dentro de
#       skills/research/, skills/activation/, skills/evaluation/,
#       skills/knowledge-base/ y skills/editorial-profile/, y lo único que
#       queda en esas cinco carpetas de nivel superior es, según el caso,
#       README.md y/o dev/, ambos excluidos de todas formas
#     - _system/resources/
#     - _system/templates/
#     - _system/PROMPT_PROJECT_DISCOVERY.md (prompt operativo real, no
#       documentación de desarrollo — ver nota S8-08 más abajo)
#
#   Excluido:
#     - Cualquier ruta que contenga /dev/
#     - El resto de _system/ (decisions/, audits/, test-records/,
#       SPEC_*.md, SCHEMA_*.md, MASTER_PLAN.md, etc. — todo lo que no sea
#       resources/, templates/ o PROMPT_PROJECT_DISCOVERY.md)
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
#   v1.1 - Añadido _system/PROMPT_PROJECT_DISCOVERY.md a INCLUDE_PATHS —
#          se había colado en la exclusión de "resto de _system/" por
#          error de diseño; es un prompt operativo real (usado por
#          project-setup en su checkpoint de cierre), no documentación de
#          desarrollo. Hallado durante la validación real de instalación
#          de Sprint 8, ver ticket S8-08.
#   v1.2 - OUTPUT_NAME cambiado de dx-opus.plugin a dxopus.plugin.
#          Evidencia real de instalación (Sprint 8): tras renombrar el
#          campo "name" del manifest a "dxopus", Cowork seguía instalando
#          la versión vieja (0.1.1) al subir un archivo que seguía
#          llamándose dx-opus.plugin — indicio de que el mecanismo de
#          "añadir desde archivo" identifica/cachea plugins por el nombre
#          del archivo subido, no solo por el contenido del manifest.
#   v1.3 - Añadido commands/ a INCLUDE_PATHS (S9-05, carpeta commands/*.md
#          para invocación explícita /comando, formato confirmado contra
#          la documentación oficial de Claude Code — "Plugins reference",
#          sección "Standard plugin layout"). Sin este cambio, los
#          archivos de commands/ quedarían fuera del .plugin instalable y
#          el comando tecleado seguiría sin funcionar tras instalar.
#   v1.4 - Quitadas "research" y "activation" de INCLUDE_PATHS (S9-01,
#          restructuración de contenido exclusivo de subsistema — ver
#          _system/SPEC_CLOUD_COMPATIBILITY.md §5.b). Todo el contenido
#          exclusivo de esas dos carpetas se movió (git mv) dentro de
#          skills/research/ y skills/activation/, que ya se empaquetan vía
#          la entrada "skills". Lo único que queda en research/ y
#          activation/ es README.md y dev/, ambos excluidos siempre — sin
#          este cambio esas dos entradas de INCLUDE_PATHS seguirían siendo
#          válidas (las carpetas existen) pero no aportarían nada al
#          paquete.
#   v1.5 - Quitadas "evaluation" y "knowledge-base" de INCLUDE_PATHS (S9-02,
#          delegación de contenido compartido por skill — ver
#          _system/SPEC_CLOUD_COMPATIBILITY.md §5.c). A diferencia de S9-01,
#          este contenido es compartido entre varias skills (`write-book`,
#          `write-post`, `activation`, `research`), no exclusivo de una —
#          pero el mecanismo de empaquetado es el mismo: se movió (git mv)
#          dentro de skills/evaluation/ y skills/knowledge-base/, que ya se
#          empaquetan vía la entrada "skills", y las skills que antes leían
#          estos archivos por ruta cruzada ahora invocan la skill dueña del
#          contenido en su lugar. Lo único que queda en evaluation/ y
#          knowledge-base/ es dev/, siempre excluido.
#   v1.6 - Quitada "editorial-profile" de INCLUDE_PATHS (S9-03, delegación
#          de contenido compartido — ver
#          _system/SPEC_CLOUD_COMPATIBILITY.md §5.c). Todo el contenido de
#          editorial-profile/ (antes leído por ruta directa también desde
#          write-book) se movió (git mv) dentro de skills/editorial-profile/,
#          que ya se empaqueta vía la entrada "skills". Lo único que queda
#          en editorial-profile/ es dev/, siempre excluido. También se
#          movieron writing/shared/* y tres archivos de writing/post/
#          (PROMPT_QA_IDEAS.md, TEMPLATE_POST_SEED.md,
#          TEMPLATE_POST_BRIEFING.md) a skills/shared-writing/ — la entrada
#          "writing" de INCLUDE_PATHS se mantiene porque writing/ conserva
#          contenido de producción no movido (WORKFLOW_WRITING.md,
#          writing/post/README.md, RESOURCE_WRITING_CONTEXT.md,
#          RESOURCE_PUBLICATION_PROFILE.md, SPEC_LEARNING_SIGNALS.md).

set -euo pipefail
IFS=$'\n\t'

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_NAME="dxopus.plugin"
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
    "commands"
    "hooks"
    "writing"
    "_system/resources"
    "_system/templates"
    "_system/PROMPT_PROJECT_DISCOVERY.md"
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
