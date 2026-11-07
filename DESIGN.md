# DESIGN.md — synx build

> **Fuentes:**
>
> - Anexo A.2. Define la dirección: sans geométrica, editorial minimalista, grilla precisa, contraste fuerte, énfasis en "synx" y la X como cruce.
> - Identidad real, leída el 2026-10-27 de `D:\Laureano\Desktop\1. Synx Build`:
>   - `Sistema Operativo/app/css/default.css`, `dark.css`;
>   - `components/auth/login.css`;
>   - `lib/email/marca.ts`;
>   - `public/brand/`.
>
> Las variables están en `tokens.css` y llevan los mismos nombres en todas las marcas.

## Concepto visual

**Precisión eléctrica.** La pantalla es un vacío negro azulado sobre el que una grilla precisa ordena todo. Un azul eléctrico ilumina lo que se está construyendo. Se ve como la sala de máquinas de un lanzamiento: técnico, limpio y con impacto.

## Escritura del nombre

- **"synx build", siempre en minúscula.** Así figura en la app, en los textos alternativos de los logos y en "© synx build".
- **En URLs y usuarios:** `synxbuild` (synxbuild.com).
- **Nunca** en mayúsculas ("SYNX BUILD") ni en formato título ("Synx Build").

## Paleta

| Rol | Token | Valor | Origen |
|---|---|---|---|
| Fondo (void) | `--color-bg` | `#010511` | `login.css` |
| Superficie | `--color-surface` | `#090D1D` | `login.css` |
| Superficie 2 | `--color-surface-2` | `#0F1530` | PROPUESTA (entre superficie y borde) |
| Borde | `--color-border` | `#1C2542` | `login.css` |
| Texto | `--color-text` | `#EEF0FF` | escala primary-50 |
| Texto secundario | `--color-text-muted` | `#8A93B8` | PROPUESTA (gris azulado, 6,7:1) |
| **Acento de texto** | `--color-accent` | `#5073FF` | primary-400: "texto sobre negro" en la app (5,08:1) |
| Texto sobre acento | `--color-accent-contrast` | `#010511` | El blanco sobre `#5073FF` da 4,01:1, no alcanza |
| **Azul de marca** | `--color-glow` / `--shadow-glow` | `#0000FF` | primary-500: logo, botones de la app, mails |
| Éxito / error / aviso | | `#3DD68C` / `#FF5A5F` / `#F5B841` | PROPUESTA |

**Escala completa del azul** (`default.css`):

| Paso | Hex | Paso | Hex |
|---|---|---|---|
| 50 | `#EEF0FF` | 600 | `#0000DB` |
| 100 | `#DDE2FF` | 700 | `#0000B5` |
| 200 | `#BCC6FF` | 800 | `#00009C` |
| 300 | `#8FA2FF` | **900** | **`#000083`** |
| **400** | **`#5073FF`** | 950 | `#00004D` |
| **500** | **`#0000FF`** | | |

**Degradado del logotipo:** `#000083` → `#0000FF` → `#5073FF`, de navy a azul eléctrico. Es la firma visual. Se usa en el halo de fondo y en la palabra clave grande, nunca como fondo plano.

**Uso del azul `#0000FF`:**

- **Nunca como color de texto** sobre el fondo oscuro, porque da 2,37:1.
- **Va en:** logo, halos, brillos y degradados.
- **Botones:** las escenas usan `--color-accent` con `--color-accent-contrast`. El botón relleno `#0000FF` con texto blanco (8,59:1) solo aparece dentro de capturas reales.
- **Regla de acento:** una sola palabra o elemento por pantalla.

> **Marca personal.** Comparte la familia negro, azul y blanco; Laureano lo confirmó el 2026-10-27. Las dos no se confunden por el formato: synx build es motion B2B y la marca personal es lifestyle, grabada.

## Tipografía

| Rol | Familia | Pesos | Token |
|---|---|---|---|
| Títulos | **Geist** | 600 (300 para la bajada) | `--font-display` |
| Texto | **Geist** | 400, 600 | `--font-body` |
| Etiquetas y fases | **Geist Mono** | 400, 500 | `--font-mono` |

**Origen:** Geist es la tipografía de la app (`next/font`, `--font-geist`). Geist Mono es de la misma familia.

**Escala (1080×1920):**

| Uso | Tamaño |
|---|---|
| Hero | 148 px |
| Título | 106 px |
| h2 | 78 px |
| Cuerpo | 46 px |
| Subtítulo | 58 px |
| Etiqueta | 28 px |
| Número | 250 px |

**Títulos:** muy apretados, con tracking de −0,05 em e interlineado de 0,96.

**Etiquetas:** en mono, en mayúsculas, con tracking de +0,16 em.

**Logotipo en pantalla:**

- Se usan los archivos de `logos/`; no se recompone con texto.
- En títulos que imitan la marca: "synx" en 600 y "build" en 300, como en el wordmark.

## Espaciado y grilla

- **Base:** 8 px.
- **Grilla:** de 12 columnas, visible en el fondo (`--grid-color`, azul al 7 %).
- **Alineación:** todo va alineado a la grilla.
- **Márgenes:** 80 px.

## Radios

| Elemento | Radio |
|---|---|
| Elementos chicos | 5 px |
| Tarjetas | 14 px |
| Contenedores | 22 px |
| Botones | pastilla (999 px), como en la app y en los mails |

## Sombras y texturas

- **Tarjetas:** sombra profunda azul-negra (`--shadow-card`) y borde de 1,5 px `#1C2542`.
- **Halo:** azul `#0000FF` difuso detrás del elemento clave, como el resplandor de las piezas de "Resultados".
- **Grilla:** fina, más marcas de cruce (la X).
- **Fases numeradas:** `01 CONTEXTO`, `02 ARQUITECTURA`… (las del Sistema Landing de Autoridad).
- **Grano:** bajo (6 %).

## Iconografía

- **Ícono de la marca:** la gema de vidrio azul neón (`logos/icono-*.png`).
- **Resto de los íconos:** lineales de 1,5 a 2 px y geométricos.
- **Recurso recurrente:** la X como cruce, en intersecciones de la grilla.

## Mockups y capturas

Las piezas de `assets/synx/imagenes/resultados/` muestran la landing en un mockup de navegador o laptop sobre un fondo navy con halo. Ese es el formato de "prueba" de la marca.

> ⚠️ Ver `pruebas-reales.md`: los permisos están pendientes y algunas landings muestran precios del cliente.

## Tratamiento 3D

- **Materiales:** vidrio azul neón (como el ícono), metal oscuro y wireframe azul.
- **Luz:** azul eléctrico de contorno sobre negro.
- **Cámara:** movimientos cortos y precisos. Los bloques de landing encastran en la grilla.

## Motion

| Movimiento | Curva |
|---|---|
| Entradas | `power4.out` |
| Salidas | `power3.in` |
| Barridos | `power4.inOut` |

- **Blur:** bajo (8 px).
- **Trayectorias:** los elementos entran por columnas de la grilla. Nada flota.

## Lo que SÍ hacemos

- fondo negro azulado con grilla visible;
- fases numeradas;
- landings reales en mockup con halo azul;
- antes y después;
- tiempos concretos (3–7 días, 24–48 h);
- la X como cruce;
- el degradado del logo en la palabra clave.

## Lo que NUNCA hacemos

- el nombre en mayúsculas ("SYNX BUILD");
- `#0000FF` como color de texto sobre oscuro;
- plantillas con el logo arriba;
- estética de agencia de publicidad;
- "ventas garantizadas" en pantalla;
- degradados azul → violeta;
- precios (ni nuestros ni del cliente).
