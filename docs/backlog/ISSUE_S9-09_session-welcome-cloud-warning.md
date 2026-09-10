---
id: S9-09
title: Nota de limitación conocida (primer mensaje) en el hook de bienvenida
type: content
subsystem: SYSTEM
sprint: 9
status: TODO
priority: P2
depends_on: []
blocks: []
assignee: null
started: null
completed: null
branch: null
---

# S9-09 — Nota de limitación conocida en el hook de bienvenida

## Contexto

Confirmado hoy (issue de GitHub #63028, verificado): en sesiones cloud, un plugin declarado puede no tener sus skills disponibles en el primer mensaje de la conversación, y sí en el segundo. No existe forma de forzar un refresco desde el plugin (`/reload-plugins` está deshabilitado en cloud; no hay hook de calentamiento documentado). No es arreglable desde este repo — es mitigación, no fix.

## Interfaces

Editar `hooks/scripts/session-welcome.sh`: si detecta señales de que esto podría ser una sesión recién sincronizada (heurística simple — no hay forma fiable de detectar "estoy en cloud" documentada, así que el aviso debe ser genérico, no condicional a un chequeo que no podemos hacer con fiabilidad), añadir una línea al mensaje de bienvenida indicando: si el primer intento de usar una skill de DXOPUS falla o no se reconoce, probar de nuevo con un segundo mensaje antes de asumir que algo está roto.

## Estructuras de datos

Ninguna.

## Decisiones de diseño

- Mensaje breve, no alarmante — es una nota informativa, no un error.
- No intentar detectar local vs. cloud mediante variables de entorno no documentadas — evitar la misma trampa de "asumir sin confirmar" que causó confusión hoy.

## Fuera de scope

- Cualquier lógica de detección real de entorno — no existe mecanismo fiable documentado.
- Resolver el bug en sí — eso depende de Anthropic (S9-06, fuera del backlog D-team).

## Casos de test obligatorios

1. `hooks/scripts/session-welcome.sh` sigue devolviendo exit 0 siempre (nunca falla la sesión).
2. El mensaje nuevo aparece en la salida del script cuando se ejecuta manualmente.
3. No rompe el comportamiento existente (detección de `EDITOR_CONFIG.md`, placeholders sin rellenar) documentado en S8-05.

## Estado de revisión

Aprobado: 2026-09-10 (diseñado en sesión conjunta con el editor, ver `_system/SPEC_CLOUD_COMPATIBILITY.md`)
