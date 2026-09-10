# Subsistema 3: EDITORIAL PROFILE

Captura y representa la identidad del autor como comunicador.
Es el único subsistema que modela al humano, no al proceso.

**Chat de desarrollo:** editorial-profile-dev

---

## Descripción

Editorial Profile modela quién es el autor como comunicador — su voz, registro, estilo, recursos literarios y restricciones — y proporciona ese conocimiento como contexto activo a Writing, Activation y Evaluation. Sin un EDITOR_PROFILE activo, los textos producidos por el sistema carecen de identidad autoral.

---

## Artefactos activos

| Artefacto | Versión | Status | Descripción |
| --- | --- | --- | --- |
| PROMPT\_CREATE\_EDITOR\_PROFILE | v1.1 | ACTIVE | Crea el perfil editorial completo del autor |
| RESOURCE\_EDITORIAL\_STYLE | v1.0 | ACTIVE | Estilos editoriales disponibles en el sistema |
| RESOURCE\_BOOK\_TYPES | v1.3 | ACTIVE | Tipos de libros que el sistema soporta |
| TEMPLATE\_EDITOR\_PROFILE | v1.0 | ACTIVE | Template para crear perfiles de editor |
| TEMPLATE\_EDITOR\_NOTES | v1.0 | ACTIVE | Template para notas del editor durante un proyecto |
| GUIDE\_EDITOR\_NOTES | v1.0 | ACTIVE | Guía de uso para las notas del editor |

---

## Límites

Este subsistema modela al autor — no evalúa textos. La evaluación de adherencia al perfil editorial (EVALUATE\_BOOK\_STYLE, EVALUATE\_POST) pertenece al subsistema EVALUATION. El ownership de un evaluador lo determina su función (evaluar), no sus inputs. Ver DL\_20260330\_SYSTEM\_004.

El EDITOR\_PROFILE sigue siendo input necesario de EVALUATE\_BOOK\_STYLE y EVALUATE\_POST, pero esos evaluadores son responsabilidad de evaluation-dev.

---

## Relación con Evaluation

`PROMPT_EVALUATE_BOOK_STYLE` perteneció históricamente a este subsistema pero desde `DL_20260330_SYSTEM_004` vive en `evaluation/`. El ownership lo determina la función (evaluar), no los inputs. El EDITOR\_PROFILE sigue siendo input de ese evaluador pero ya no es responsabilidad de este subsistema.

---

## Interfaces

**Entradas desde:**
- Editor (información del autor: voz, textos de referencia, preferencias)
- RESOURCE\_BOOK\_TYPES y RESOURCE\_EDITORIAL\_STYLE (referencia interna al subsistema)

**Entrega a:**
- Writing — EDITOR\_PROFILE como input de contexto de voz y estilo
- Activation — EDITOR\_PROFILE como input de contexto de voz y estilo
- Evaluation — EDITOR\_PROFILE como input de EVALUATE\_BOOK\_STYLE y EVALUATE\_POST
