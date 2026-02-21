# Subsistema 7: DOCS

Mantiene toda la documentación del sistema actualizada.
Consume DECISION_LOG entries de todos los subsistemas y produce
documentación estructurada por audiencia.

**Chat de desarrollo:** docs-dev

## Tipos de documentación

| Tipo | Audiencia | Mecanismo |
|---|---|---|
| System Design Docs | Arquitectos | Pull desde SYSTEM via DECISION_LOG |
| Subsystem Implementation Docs | Desarrolladores | Pull desde cada subsistema |
| Editor Manuals | Usuarios del sistema | Push desde DOCS |
| Developer Manuals | Nuevos desarrolladores | Push desde DOCS |

## Subcarpetas

- `system-design/` — Documentos de arquitectura
- `subsystem-docs/` — Documentación de implementación por subsistema
- `editor-manuals/` — Guías para el editor
- `developer-manuals/` — Guías para desarrolladores
