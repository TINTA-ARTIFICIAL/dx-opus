# Subsistema 7: DOCS

Responsable de toda la documentación oficial del sistema D-X-OPUS. Produce documentación estructurada por audiencia, mantenida coherente con el estado real del sistema a través de cada release.

**Chat de desarrollo:** docs-dev  
**Release:** R1 — estructura + estándares visuales. Contenido documental completo → R2.

---

## Estado en Release 1

| Componente | Estado |
|---|---|
| Estándar visual (`BRAND_DOC_SYSTEM`) | ✅ v1.0 — ACTIVE |
| Paquete documental R1 (16 docs) | ⏳ Definido — producción en curso |
| `system-design/` | ⏳ R2 |
| `subsystem-docs/` | ⏳ R2 |
| `editor-manuals/` | ⏳ R2 |
| `developer-manuals/` | ⏳ R2 |

> **Nota estructural:** `developer-manuals/README.md` quedó anidado en `editor-manuals/developer-manuals/` durante el Sprint 1. Debe moverse a `docs/developer-manuals/README.md`. Registrado como issue en auditoría R1.

---

## Estándar visual — BRAND_DOC_SYSTEM

Todo documento producido en este subsistema sigue el estándar definido en:

```
docs/BRAND_DOC_SYSTEM.html
```

### Identidad visual Tinta Artificial

| Token | Valor | Uso |
|---|---|---|
| Tinta | `#0A0A0A` | Texto principal, portadas |
| Carbón | `#434343` | Subtítulos, H2 |
| Grafito | `#595959` | Metadata, captions |
| Papel | `#E8E4D9` | Fondos cálidos, superficies |
| Blanco | `#FFFFFF` | Fondo de cuerpo |
| **Cian ★** | `#00D4D4` | Acento primario — reglas H1, callouts, badges |
| **Rojo ★** | `#FF2D2C` | Acento secundario — alertas, estado CRITICAL |
| Ámbar | `#FFAB40` | Estado WARNING |
| Pizarra | `#78909C` | Estado PENDING, hint text |

### Tipografía

| Fuente | Rol | Tamaños |
|---|---|---|
| **Bebas Neue** | Display / H1 / H2 / Portadas | 36px (H1), 22px (H2), 48–72px (cover) |
| **Gentium Plus** | Cuerpo editorial / H3 / Citas | 17px (lead), 15px (body), 13px (caption) |
| **JetBrains Mono** | IDs, metadata, código, versiones | 10–13px |

### Estructura canónica de documento

```
Cover
  ├── Eyebrow (JetBrains Mono, cian) — "Sistema D-X-OPUS · Subsistema N — Nombre"
  ├── Título (Bebas Neue, blanco sobre negro)
  ├── Subtítulo (Gentium Plus itálica, papel)
  └── Metadata — Versión · Release · Subsistema · Audiencia · Estado

Body
  ├── H1 + regla cian 2px (Bebas Neue 36px)
  ├── Lead paragraph (Gentium Plus 17px, carbón)
  ├── H2 (Bebas Neue 22px, carbón)
  ├── H3 (Gentium Plus bold 16px)
  ├── Body text (Gentium Plus 15px, 1.8 line-height)
  ├── Callouts (cian / ámbar / rojo según variante)
  ├── Code blocks (JetBrains Mono, cian sobre negro)
  └── Tablas (headers mono uppercase + regla cian 1.5px)
```

---

## Paquete documental Release 1

16 documentos en 4 bloques. Audiencias: arquitectos, desarrolladores, editores, todos.

### Bloque A — Diseño del sistema

| ID | Documento | Audiencia | Estado |
|---|---|---|---|
| A-01 | System Design Overview | Arquitectos | ⏳ Pendiente |
| A-02 | Architecture Reference | Arquitectos / Devs | ⏳ Pendiente |
| A-03 | Design Decisions Log (public) | Todos | ⏳ Pendiente |

### Bloque B — Desarrolladores

| ID | Documento | Audiencia | Estado |
|---|---|---|---|
| B-01 | Developer Guide | Devs | ⏳ Pendiente |
| B-02 | Prompt Engineering Guide | Devs | ⏳ Pendiente |
| B-03 | Subsystem Specs (×7) | Devs | ⏳ Pendiente |
| B-04 | Contribution Protocol | Devs | ⏳ Pendiente |

### Bloque C — Usuarios / Editores

| ID | Documento | Audiencia | Estado |
|---|---|---|---|
| C-01 | Editor Quickstart | Editores | ⏳ Pendiente |
| C-02 | Research Workflow Guide | Editores | ⏳ Pendiente |
| C-03 | Book Writing Guide | Editores | ⏳ Pendiente |
| C-04 | Post Writing Guide | Editores | ⏳ Pendiente |
| C-05 | Activation Guide | Editores | ⏳ Pendiente |
| C-06 | Editor Profile Setup | Editores | ⏳ Pendiente |

### Bloque D — Operacional

| ID | Documento | Audiencia | Estado |
|---|---|---|---|
| D-01 | Release Notes R1 | Todos | ⏳ Pendiente |
| D-02 | Technical Debt Register | Devs / Arquitectos | ⏳ Pendiente |
| D-03 | Roadmap R2+ | Todos | ⏳ Pendiente |

---

## Subcarpetas

```
docs/
├── BRAND_DOC_SYSTEM.html       ← Estándar visual oficial (v1.0)
├── system-design/              ← Docs de arquitectura (R2)
├── subsystem-docs/             ← Docs de implementación por subsistema (R2)
├── editor-manuals/             ← Guías para el editor (R2)
└── developer-manuals/          ← Guías para desarrolladores (R2)
```

---

## Tipos de documentación

| Tipo | Audiencia | Mecanismo |
|---|---|---|
| System Design Docs | Arquitectos, decisores | Pull desde SYSTEM via DECISION_LOG |
| Subsystem Implementation Docs | Desarrolladores | Pull desde cada subsistema |
| Editor Manuals | Usuarios del sistema | Push desde DOCS |
| Developer Manuals | Nuevos desarrolladores | Push desde DOCS |

---

## Metadata YAML obligatoria en artefactos `.md`

```yaml
---
id:          NOMBRE_DOCUMENTO
type:        GUIDE | SCHEMA | RESOURCE | TEMPLATE
subsystem:   DOCS
version:     1.0
status:      ACTIVE | DRAFT | DEPRECATED
created:     YYYY-MM-DD
updated:     YYYY-MM-DD
audience:    developer | editor | architect | all
---
```
