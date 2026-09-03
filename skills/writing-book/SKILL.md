---
name: writing-book
description: >
  This skill should be used when the user wants to write a non-fiction
  book — trigger phrases like "quiero escribir un libro sobre X", "crear
  el índice de mi libro", "escribir el capítulo N", "necesito un capítulo
  de muestra".
metadata:
  version: "0.1.0"
---

## PROPÓSITO

Orienta la producción completa de un libro de no ficción — RAMA BOOK del
subsistema `writing` (ver `writing/WORKFLOW_WRITING.md` §2, bifurcación
Book/Post). Esta skill no contiene la lógica de escritura ni de workflow:
solo indica, para cada fase de la RAMA BOOK, qué prompt real leer y
ejecutar, en qué orden, y cuándo parar a esperar confirmación del editor.

Fuente única de verdad de la secuencia completa (incluida la RAMA POST,
que esta skill no cubre): `writing/WORKFLOW_WRITING.md`. Este `SKILL.md`
no duplica su contenido — si necesitas el detalle de una fase (tiempos
estimados, métricas de calidad, checklist de preparación de Fase 0), lee
ese documento directamente. Aquí solo se orienta hacia qué prompt
corresponde a cada fase y en qué orden se ejecutan.

## SUPUESTO DE ENTRADA — EDITOR_PROFILE

Todos los prompts de esta rama requieren un `EDITOR_PROFILE` (voz y
estilo del editor) con el formato de
`editorial-profile/TEMPLATE_EDITOR_PROFILE.md`. Esta skill asume que ya
existe — no lo crea ni lo valida. Si el editor no tiene uno, redirige a
la skill `editorial-profile` (o al prompt
`editorial-profile/PROMPT_CREATE_EDITOR_PROFILE.md`) antes de continuar
con cualquier fase de RAMA BOOK.

## SECUENCIA DE FASES — RAMA BOOK

Sigue siempre este orden (`writing/WORKFLOW_WRITING.md` §3):

1. **Índice** — trigger: "crear el índice de mi libro", "quiero escribir
   un libro sobre X". Prompt: `writing/book/PROMPT_CREATE_BOOK_INDEX.md`.
   Output: `BOOK_INDEX`.

2. **Capítulo de muestra y fijación de estilo** — trigger: "necesito un
   capítulo de muestra". Prompt:
   `writing/book/PROMPT_WRITE_SAMPLE_CHAPTER.md`. Requiere `BOOK_INDEX`
   aprobado en la fase anterior. Output: `SAMPLE_CHAPTER` +
   `STYLE_GUIDE_LIBRO` — este último se convierte en la referencia de
   estilo para todas las fases siguientes de escritura de capítulos.

3. **Capítulos centrales** — trigger: "escribir el capítulo N", "Write
   Book Chapters", "Write Book Chapter N". Prompt:
   `writing/book/PROMPT_WRITE_CHAPTER.md`. Requiere `STYLE_GUIDE_LIBRO`
   fijado en la fase anterior. El propio prompt define sus dos modos de
   invocación, el proceso secuencial (un capítulo a la vez) y el manejo
   de capítulos ya existentes — no los reproduzcas aquí, léelo cuando
   corresponda.

4. **Capítulos especiales** — una vez escritos los capítulos centrales:
   - Introducción: `writing/book/PROMPT_WRITE_INTRODUCTION.md`.
   - Prólogo: `writing/book/PROMPT_WRITE_PROLOGUE.md` (voz personal del
     editor — el propio prompt explica por qué difiere del
     `STYLE_GUIDE_LIBRO`, no lo reproduzcas aquí).
   Ambos requieren los capítulos centrales ya validados; pueden
   invocarse en cualquier orden entre sí.

5. **Cierre del libro** — consolidación final:
   - `writing/book/PROMPT_CONSOLIDATE_REFERENCES.md` — bibliografía.
   - `writing/book/PROMPT_CREATE_BOOK_SHEET.md` — ficha técnica.

## CHECKPOINT OBLIGATORIO — NO AVANZAR SIN CONFIRMACIÓN

Al completar el output de cualquiera de las fases anteriores (`BOOK_INDEX`,
`SAMPLE_CHAPTER` + `STYLE_GUIDE_LIBRO`, cada `CHAPTER_N`, `INTRODUCTION`,
`PROLOGUE`, la consolidación de referencias, `BOOK_SHEET`), **para aquí.**

1. Presenta al editor el output generado por el prompt que acabas de
   ejecutar.
2. No invoques automáticamente el prompt de la fase siguiente de esta
   secuencia, aunque "sepas" cuál es el siguiente paso lógico del
   workflow. Saberlo no es lo mismo que estar autorizado a ejecutarlo sin
   que el editor lo pida.
3. Pregunta explícitamente cómo quiere continuar — por ejemplo, aprobar y
   avanzar a la fase siguiente, iterar sobre la fase actual, o parar
   aquí.
4. Si el editor responde de forma ambigua ("sigue", "lo que tú veas"), no
   lo interpretes como autorización para avanzar de fase — pide que
   confirme.

## EVALUACIÓN — invocación soft, no bloqueante

`writing/book/PROMPT_WRITE_CHAPTER.md` invoca auto-evaluación de estilo
en su PASO 5, referenciando `evaluation/PROMPT_EVALUATE_BOOK_STYLE.md`.
El cierre del libro contempla además una evaluación de contenido vía
`evaluation/PROMPT_EVALUATE_BOOK_CONTENT.md` (ver
`writing/WORKFLOW_WRITING.md` §3, PASO 5D). Ambas referencias apuntan a
la skill `evaluation` (S7-06).

Esta invocación es una **instrucción soft, no un gate bloqueante** —
según `_system/SPEC_PLUGIN_ARCHITECTURE.md` §4, un resultado RED de
`RESOURCE_EVALUATION_FRAMEWORK` no bloquea físicamente continuar; la
obligatoriedad es de confianza editorial, no técnica. El editor puede
declinar la evaluación o decidir avanzar igualmente aunque el resultado
no sea positivo. No conviertas esta invocación en un hook ni la trates
como un paso que impide continuar si el editor no la ejecuta o no la
aprueba. Esto sigue siendo válido aunque la skill `evaluation` (S7-06) no
esté `DONE` todavía — los prompts de esta rama ya referencian el archivo
real (`PROMPT_EVALUATE_BOOK_STYLE.md`).

## FUERA DE SCOPE DE ESTE SKILL

- Modificar el contenido de cualquier prompt de `writing/book/` o de
  `writing/WORKFLOW_WRITING.md`.
- La skill `evaluation` (S7-06) — solo se referencia, no se construye
  aquí.
- La skill `editorial-profile` (S7-02) — esta skill asume que existe un
  `EDITOR_PROFILE` según `editorial-profile/TEMPLATE_EDITOR_PROFILE.md`,
  pero no lo crea ni lo valida.
- Rutas y naming de los artefactos que produce esta rama (`BOOK_INDEX`,
  `SAMPLE_CHAPTER`, `CHAPTER_DRAFT`, etc.) — ya están definidos en
  `_system/resources/AUTO_SAVE_CONFIG.yaml`, sección `WRITING_BOOK`; lee
  ese archivo en el momento de guardar o buscar cualquier artefacto de
  esta rama, no reproduzcas esa tabla aquí.
