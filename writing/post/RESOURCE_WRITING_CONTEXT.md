---
id:          RESOURCE_WRITING_CONTEXT
type:        RESOURCE
subsystem:   WRITING
version:     1.0
status:      ACTIVE
created:     2026-04-11
updated:     2026-04-11
owner_chat:  writing-dev
---

## CHANGELOG

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1.0 | 2026-04-11 | writing-dev | Initial version. Canonical configuration artifact for POST workflow. |

## DEPENDENCIES

inputs:  [EDITOR_PROFILE, RESOURCE_PUBLICATION_PROFILE]
outputs: []
calls:   []

## DESCRIPTION

Esquema canónico del WRITING_CONTEXT: unidad de configuración reutilizable del workflow POST. Combina EDITOR_PROFILE + PUBLICATION_PROFILE + tipo de texto. PROMPT_POST_BRIEF lo carga si existe y lo crea si no.

---

# RESOURCE: WRITING_CONTEXT

## Sistema D-X-OPUS — Esquema del Artefacto de Configuración POST

---

## PARTE 1: PROPÓSITO

El WRITING_CONTEXT es el artefacto de configuración reutilizable del workflow POST. Agrupa en una sola unidad los tres parámetros que definen cómo escribe un editor en un contexto concreto:

- **Quién escribe:** referencia al EDITOR_PROFILE activo
- **Dónde publica:** referencia al PUBLICATION_PROFILE de la publicación de destino
- **Qué formato produce:** tipo de texto (post estándar, post largo, hilo)

Su función principal es eliminar la fricción de reconfiguración entre posts. Un editor que publica habitualmente en el mismo medio con el mismo formato puede tener un WRITING_CONTEXT marcado como `default: true` que se carga automáticamente al inicio de cada sesión POST sin necesidad de declararlo.

**Quién lo crea:** PROMPT_POST_BRIEF, cuando no existe aún o el editor solicita crear uno nuevo.

**Quién lo consume:** PROMPT_POST_BRIEF, PROMPT_PLAN_POST, PROMPT_SPLIT_POST, PROMPT_EVALUATE_POST.

**Dónde vive:** Google Drive del proyecto, carpeta de configuración del editor.

---

## PARTE 2: ESQUEMA COMPLETO

```
---
id:                  WRITING_CONTEXT_[EDITOR_ID]_[PUBLICATION_ID]
version:             X.Y
default:             true | false
created:             YYYY-MM-DD
updated:             YYYY-MM-DD
---

## EDITOR

editor_profile:      [ID del EDITOR_PROFILE activo]
editor_name:         [Nombre del editor — solo para legibilidad]

## PUBLICACIÓN

publication_profile: [ID del PUBLICATION_PROFILE activo]
publication_name:    [Nombre de la publicación — solo para legibilidad]

## TIPO DE TEXTO

format:              post_estandar | post_largo | hilo
word_count_target:   [Rango en palabras, ej. 800–1200]
notes:               [Notas adicionales sobre el formato — opcional]

## ESTADO

last_used:           YYYY-MM-DD
post_count:          [Número de posts producidos con este contexto]
```

---

## PARTE 3: CAMPOS EXPLICADOS

### 3.1 `id`

Identificador único del WRITING_CONTEXT. Combina el identificador del editor y el de la publicación.

```
WRITING_CONTEXT_MARCO_SUBSTACK
WRITING_CONTEXT_MARCO_LINKEDIN
WRITING_CONTEXT_ANA_MEDIUM
```

Reglas:
- SCREAMING_SNAKE_CASE
- Siempre empieza con `WRITING_CONTEXT_`
- No incluye versión

---

### 3.2 `default`

Marca si este es el contexto habitual del editor.

| Valor | Comportamiento |
|-------|---------------|
| `true` | PROMPT_POST_BRIEF lo carga automáticamente sin que el editor lo declare |
| `false` | El editor debe declarar explícitamente qué contexto usar |

**Regla:** Solo puede haber un WRITING_CONTEXT con `default: true` por editor. Si se marca uno nuevo como default, el anterior pasa a `false`.

---

### 3.3 `editor_profile`

ID del EDITOR_PROFILE que define la voz, estilo y restricciones del editor. El WRITING_CONTEXT no duplica esa información — la referencia.

```
editor_profile: EDITOR_PROFILE_MARCO_LAUCELLI
```

---

### 3.4 `publication_profile`

ID del PUBLICATION_PROFILE que define el medio de destino. Entidad independiente del EDITOR_PROFILE (ver RESOURCE_PUBLICATION_PROFILE).

```
publication_profile: PUBLICATION_PROFILE_SUBSTACK_GALEO
```

---

### 3.5 `format`

Tipo de texto que produce este contexto.

| Valor | Descripción | Rango típico |
|-------|-------------|--------------|
| `post_estandar` | Post de longitud habitual para la publicación | 500–1.500 palabras |
| `post_largo` | Artículo de fondo, ensayo largo | 1.500–5.000 palabras |
| `hilo` | Secuencia de posts cortos encadenados | 8–25 unidades |

El valor de `format` es la referencia para PROMPT_PLAN_POST (presupuesto de palabras por sección) y para PROMPT_SPLIT_POST (punto de corte natural).

---

### 3.6 `word_count_target`

Rango de palabras objetivo para este contexto específico. Puede diferir del rango genérico del tipo — el editor puede tener una longitud habitual más acotada.

```
word_count_target: 900–1.100
```

Si no se especifica, se usa el rango genérico del `format`.

---

### 3.7 `notes`

Campo libre para indicaciones adicionales no cubiertas por los otros campos. Opcional.

```
notes: "Posts de la serie 'Hacia la literatura open source' — mantener continuidad narrativa con post anterior."
```

---

### 3.8 `last_used` y `post_count`

Campos de estado para seguimiento del uso. Los actualiza PROMPT_POST_BRIEF al inicio de cada sesión.

---

## PARTE 4: PROCESO DE CREACIÓN

PROMPT_POST_BRIEF crea el WRITING_CONTEXT cuando no existe. El proceso es inferencia con declaración de suposiciones — no un cuestionario.

**Lo que el sistema infiere automáticamente:**
- Editor: del EDITOR_PROFILE cargado en sesión
- Formato y longitud objetivo: del historial de posts si existen, o del tipo de texto declarado por el editor

**Lo que el sistema pregunta siempre** (único bloqueo real):
- ¿Dónde se publica? (medio de destino → selecciona o crea PUBLICATION_PROFILE)
- ¿Formato habitual? (si no puede inferirlo)

**Declaración de suposiciones:** antes de crear el WRITING_CONTEXT, el sistema presenta en una sola línea lo que ha inferido y espera confirmación o corrección del editor.

```
Contexto inferido: Substack de Galeo Tech / post estándar / 900–1.100 palabras.
¿Correcto? [S/N o corrección directa]
```

---

## PARTE 5: RELACIÓN CON OTROS ARTEFACTOS

```
EDITOR_PROFILE ──────┐
                     ├──► WRITING_CONTEXT ──► PROMPT_POST_BRIEF
PUBLICATION_PROFILE ─┘         │              PROMPT_PLAN_POST
                                │              PROMPT_SPLIT_POST
                                │              PROMPT_EVALUATE_POST
                                │
                                └──► campo en POST_SEED
                                     (referencia, no copia)
```

El POST_SEED incluye una referencia al WRITING_CONTEXT activo — no duplica su contenido. Si el WRITING_CONTEXT cambia entre sesiones, el POST_SEED archivado mantiene la referencia a la versión que estaba activa cuando se creó.

---

## PARTE 6: EJEMPLO COMPLETO

```
---
id:                  WRITING_CONTEXT_MARCO_SUBSTACK
version:             1.0
default:             true
created:             2026-04-11
updated:             2026-04-11
---

## EDITOR

editor_profile:      EDITOR_PROFILE_MARCO_LAUCELLI
editor_name:         Marco Laucelli

## PUBLICACIÓN

publication_profile: PUBLICATION_PROFILE_SUBSTACK_GALEO
publication_name:    Substack — Galeo Tech

## TIPO DE TEXTO

format:              post_estandar
word_count_target:   900–1.200
notes:               ""

## ESTADO

last_used:           2026-04-11
post_count:          0
```

---

## PARTE 7: VERSIONADO

El WRITING_CONTEXT se versiona cuando cambia alguno de sus campos estructurales: cambio de publicación de destino, cambio de formato habitual, o actualización del EDITOR_PROFILE o PUBLICATION_PROFILE referenciados.

Cambios menores de `notes` o actualizaciones de `last_used` y `post_count` no requieren nueva versión — se editan directamente en el archivo.

---

**FIN DEL DOCUMENTO**
