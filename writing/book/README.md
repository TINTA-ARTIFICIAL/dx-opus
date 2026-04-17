# Writing — Rama Book

Prompts para la escritura completa de un libro de no ficción.

## Flujo

```
CREATE_BOOK_INDEX → WRITE_SAMPLE_CHAPTER → WRITE_CHAPTER (×N)
→ WRITE_INTRODUCTION → WRITE_PROLOGUE
→ CONSOLIDATE_REFERENCES → CREATE_BOOK_SHEET
```

## Artefactos

| Artefacto | Versión | Descripción |
|---|---|---|
| PROMPT_CREATE_BOOK_INDEX | v1.0 | Crea el índice estructurado del libro |
| PROMPT_WRITE_SAMPLE_CHAPTER | v1.0 | Escribe el capítulo de muestra para validar voz |
| PROMPT_WRITE_CHAPTER | v1.3 | Escribe cada capítulo del libro |
| PROMPT_WRITE_INTRODUCTION | v1.0 | Escribe la introducción |
| PROMPT_WRITE_PROLOGUE | v1.0 | Escribe el prólogo |
| PROMPT_CONSOLIDATE_REFERENCES | v1.1 | Consolida y formatea la bibliografía |
| PROMPT_CREATE_BOOK_SHEET | v1.1 | Genera la ficha técnica del libro |

## Notas

Los prompts `PROMPT_CREATE_TIMELINE` y `PROMPT_CREATE_CAST`, también invocados en la Fase 5 de este flujo, viven en `../shared/` (owned by Writing, invocados también por Activation).
