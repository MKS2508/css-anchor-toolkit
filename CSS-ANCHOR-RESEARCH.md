# 📚 CSS Anchor Positioning - Research Completo

## 🎯 Fuentes Investigadas (Triple Check Completado)

### css-tip.com (9 artículos - 3 métodos cada uno)
- ✅ https://css-tip.com/tooltip-anchor/ - Margin magic (2 positions)
- ✅ https://css-tip.com/tooltip-anchor-2/ - Four-position tooltips
- ✅ https://css-tip.com/tooltip-anchor-3/ - Corner positioning (diagonal)
- ✅ https://css-tip.com/position-area/ - Grid 3×3 system
- ✅ https://css-tip.com/hover-anchor-positionning/ - Menu hover effects
- ✅ https://css-tip.com/range-slider-tooltip/ - Range slider + scroll-driven
- ✅ https://css-tip.com/range-slider-tooltip-2/ - Adaptive shape tooltip
- ✅ https://css-tip.com/progress-with-tooltip/ - Progress element
- ✅ https://css-tip.com/bouncy-input/ - Radio buttons + :has()

### MDN Documentation
- ✅ https://developer.mozilla.org/en-US/docs/Web/CSS/anchor - `anchor()` function
- ✅ https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-size - `anchor-size()` function
- ✅ https://developer.mozilla.org/en-US/docs/Web/CSS/position-area - `position-area` property

**Métodos usados**: WebFetch (into.md), WebFetch directo, Firecrawl scrape

---

## 🔑 Conceptos Clave Descubiertos

### 1. `anchor()` Function

**Sintaxis**:
```css
anchor(<anchor-name>? <anchor-side>, <length-percentage>?)
```

**Sides disponibles**:
- **Physical**: `top`, `bottom`, `left`, `right`
- **Logical**: `start`, `end`, `self-start`, `self-end`, `inside`, `outside`
- **Special**: `center`, `<percentage>`

**Reglas de compatibilidad**:
- `top`/`bottom` solo con inset properties verticales
- `left`/`right` solo con inset properties horizontales
- Si no matchea, usa el fallback value

**Uso con calc()**:
```css
left: calc(anchor(right) + 10px);
top: calc(anchor(bottom) + var(--distance));
```

---

### 2. `anchor-size()` Function

**Sintaxis**:
```css
anchor-size([<anchor-name>] [<anchor-size>][, <length-percentage>])
```

**Dimensiones disponibles**:
- `width` - Ancho del anchor
- `height` - Alto del anchor
- `block` - Longitud del containing block en dirección block
- `inline` - Longitud del containing block en dirección inline
- `self-block` - Longitud propia del anchor en dirección block
- `self-inline` - Longitud propia del anchor en dirección inline

**Uso**:
```css
/* Igualar dimensiones */
width: anchor-size(width);
height: anchor-size(height);

/* Con calc() */
width: calc(anchor-size(width) * 2);
margin-left: calc(anchor-size(width) / 4);

/* Cross-axis válido */
width: anchor-size(height);
```

**Propiedades compatibles**:
- Sizing: `width`, `height`, `min-width`, `max-width`, etc.
- Inset: `top`, `left`, `bottom`, `right`, etc.
- Margins: Todas las margin properties

---

### 3. `position-area` - Grid 3×3

**Sistema de Grid**:
```
┌─────────────┬─────────────┬─────────────┐
│  top-left   │  top-center │  top-right  │
│ (start start│             │ end start)  │
├─────────────┼─────────────┼─────────────┤
│  mid-left   │   ANCHOR    │  mid-right  │
│ (start      │   (center)  │ end)        │
├─────────────┼─────────────┼─────────────┤
│  bot-left   │ bot-center  │  bot-right  │
│ (start end) │             │ (end end)   │
└─────────────┴─────────────┴─────────────┘
```

**Keywords**:
- **Physical rows**: `top`, `center`, `bottom`
- **Physical cols**: `left`, `center`, `right`
- **Logical rows**: `block-start`, `center`, `block-end`
- **Logical cols**: `inline-start`, `center`, `inline-end`

**Spanning**:
- **Single tile**: `top left`, `bottom right`, etc.
- **Span two**: `top span-left`, `center span-right`
- **Span all**: `top span-all` o simplemente `top`
- **Shorthand**: `top` = `top span-all`, `left` = `left span-all`

**Comportamiento de self-alignment**:
- Si especificas `center`: alignment por defecto = `anchor-center`
- Si especificas edge: alignment por defecto = opuesto al edge
- Inset properties en `auto` se comportan como `0`

---

### 4. Arrow Technique de css-tip.com (CRÍTICO)

**Técnica "Margin Magic"**:
```css
#tooltip {
  --d: 1em;      /* distance */
  --s: 1.2em;    /* tail size */

  position: absolute;
  position-anchor: --anchor;
  position-area: top;
  bottom: var(--d);
  margin-top: var(--d);
  position-try: flip-block;
  anchor-name: --tooltip;  /* ⚠️ El tooltip también es anchor */
}

#tooltip::before {
  content: "";
  position: fixed;  /* ⚠️ NO absolute, es FIXED */
  z-index: -1;
  width: var(--s);
  background: inherit;

  /* Posicionamiento con anchor() function */
  top: calc(anchor(--tooltip top) - var(--d));
  bottom: calc(anchor(--tooltip bottom) - var(--d));
  left: calc(anchor(--anchor center) - var(--s)/2);

  /* ⚠️ MARGIN MAGIC: Oculta automáticamente un lado del arrow */
  margin: inherit;

  /* ⚠️ DOUBLE-HEADED ARROW con clip-path */
  clip-path: polygon(
    50% .2em,                        /* Top point */
    100% var(--d),                   /* Top-right */
    100% calc(100% - var(--d)),      /* Bottom-right */
    50% calc(100% - .2em),           /* Bottom point */
    0 calc(100% - var(--d)),         /* Bottom-left */
    0 var(--d)                       /* Top-left */
  );
}
```

**Por qué funciona**:
1. El tooltip tiene `anchor-name: --tooltip` para que el arrow pueda anclarse a él
2. El arrow usa `position: fixed` para posicionarse relativo al viewport
3. `anchor(--tooltip top)` y `anchor(--tooltip bottom)` posicionan verticalmente
4. `anchor(--anchor center)` centra horizontalmente sobre el anchor original
5. `margin: inherit` hereda el margin del tooltip
6. Cuando `position-try: flip-block` cambia la posición:
   - El tooltip flip de `top` a `bottom` (o viceversa)
   - El margin cambia de `margin-top` a `margin-bottom`
   - El pseudo-element **hereda** ese margin
   - El margin oculta automáticamente una punta del double-headed arrow
   - ¡NO necesitas recalcular el clip-path!

---

### 5. Four-Position Tooltips (Top/Bottom/Left/Right)

**Técnica para 4 direcciones**:
```css
.tooltip {
  position-anchor: --anchor;
  position-area: top;
  position-try: flip-block, flip-start, flip-start flip-inline;
}

.tooltip::before {
  /* Arrow con 4 puntas en clip-path */
  /* margin:inherit hace el magic de mostrar solo la punta correcta */
}
```

**position-try tactics**:
- `flip-block`: Invierte vertical (top ↔ bottom)
- `flip-inline`: Invierte horizontal (left ↔ right)
- `flip-start`: Invierte diagonal
- Combinaciones: `flip-start flip-inline` para más opciones

---

### 6. Corner Positioning con √2 Formula (COMPLETO)

**Fuente**: tooltip-anchor-3 de css-tip.com

**Fórmula Completa**:
```css
--_m: calc(var(--d) + (sqrt(2) - 1)*var(--s));
```

**Por qué √2**:
- En corner positioning (diagonal), el arrow está rotado 45°
- La proyección de un arrow diagonal sobre el eje es: `arrowSize × √2`
- Para calcular el margin correcto: `distance + (√2 - 1) × arrowSize`
- Simplifica a: `calc(distance + 0.414 * arrowSize)`

**Implementación Completa** (4 corners):
```css
#tooltip {
  --d: .5em;  /* distance */
  --s: .8em;  /* tail size */

  position: absolute;
  position-anchor: --anchor;
  position-area: top left;
  --_m: calc(var(--d) + (sqrt(2) - 1)*var(--s));
  margin: var(--_m) 0 0 var(--_m);
  inset: 0 var(--d) var(--d) 0;
  position-try: flip-inline, flip-block, flip-block flip-inline;
  anchor-name: --tooltip;
  clip-path: inset(calc(-1*var(--d))); /* ⚠️ Permite arrow fuera del tooltip */
}

#tooltip::before,
#tooltip::after {
  content:"";
  position: fixed;
  width: anchor-size(--tooltip width);  /* ⚠️ Usa anchor-size() */
  height: anchor-size(--tooltip height);
  z-index: -1;
  background: inherit;
  position-anchor: --anchor;
  margin: inherit;
  position-try: flip-inline flip-block;
}

/* Diagonal arrow top-left */
#tooltip::before {
  position-area: top left;
  clip-path: polygon(
    var(--d) calc(var(--s) + var(--d)), 0 0, calc(var(--s) + var(--d)) var(--d),
    calc(100% - var(--d)) calc(100% - var(--d) - var(--s)), 100% 100%, calc(100% - var(--d) - var(--s)) calc(100% - var(--d))
  );
}

/* Diagonal arrow top-right */
#tooltip::after {
  position-area: top right;
  clip-path: polygon(
    var(--d) calc(100% - var(--s) - var(--d)), 0 100%, calc(var(--s) + var(--d)) calc(100% - var(--d)),
    calc(100% - var(--d)) calc(var(--d) + var(--s)), 100% 0, calc(100% - var(--d) - var(--s)) var(--d)
  );
}
```

**Técnicas Clave**:
1. **Dos pseudo-elements** - `::before` y `::after` para corners opuestos
2. **anchor-size()** - Dimensiones dinámicas del tooltip
3. **clip-path: inset(calc(-1*var(--d)))** - Permite que arrows salgan del bounds
4. **position-try: flip-inline, flip-block, flip-block flip-inline** - 4 corners automáticos
5. **margin: inherit** - Hereda el margin diagonal

---

### 7. @position-try Custom Rules (NUEVO)

**Fuente**: tooltip-anchor-2 de css-tip.com

**Técnica para 4 posiciones con custom rules**:
```css
#tooltip {
  --d: 1em;
  --s: .8em;

  position: absolute;
  position-anchor: --anchor;
  position-area: top;
  bottom: var(--d);
  margin: var(--d);
  margin-bottom: 0;
  /* Cadena de fallbacks: top → bottom → left → right */
  position-try: flip-block, --left, --right;
}

/* Custom rule para posición left */
@position-try --left {
  position-area: left;
  right: var(--d);
  margin: var(--d);
  margin-right: 0;
}

/* Custom rule para posición right */
@position-try --right {
  position-area: right;
  left: var(--d);
  margin: var(--d);
  margin-left: 0;
}

/* Arrow 4-headed */
#tooltip::before {
  content: "";
  position: absolute;
  z-index: -1;
  background: inherit;
  inset: calc(-1*var(--d));
  margin: inherit; /* Magic para mostrar solo la punta correcta */
  clip-path: polygon(
    /* Top arrow */
    calc(50% - var(--s)) var(--d), 50% .2em, calc(50% + var(--s)) var(--d),
    /* Right arrow */
    calc(100% - var(--d)) calc(50% - var(--s)), calc(100% - .2em) 50%, calc(100% - var(--d)) calc(50% + var(--s)),
    /* Bottom arrow */
    calc(50% + var(--s)) calc(100% - var(--d)), 50% calc(100% - .2em), calc(50% - var(--s)) calc(100% - var(--d)),
    /* Left arrow */
    var(--d) calc(50% + var(--s)), .2em 50%, var(--d) calc(50% - var(--s))
  );
}
```

**Versión Simplificada** (sin min-width restriction):
```css
position-try: flip-block, flip-start, flip-start flip-inline;
```

**Ventajas**:
- Control total sobre cada posición
- Margins personalizados por dirección
- Inset properties específicos
- Combinable con margin:inherit magic

---

### 8. Scroll-Driven + Anchor Integration (NUEVO)

**Fuente**: range-slider-tooltip de css-tip.com

**Técnica para tooltips que siguen elementos scrolleables**:
```css
/* En el elemento que se mueve (thumb) */
input[type="range"]::-webkit-slider-thumb {
  anchor-name: --thumb;
  view-timeline: --thumb-view inline; /* ⚠️ Tracking del thumb */
}

/* En el tooltip */
output {
  position-anchor: --thumb;
  position: absolute;
  position-area: top;

  /* Scroll-driven animation para sync */
  animation: range linear both;
  animation-timeline: --thumb-view; /* ⚠️ Usa el timeline del thumb */
  animation-range: entry 100% exit 0%;
}

@keyframes range {
  0%   { background: #8A9B0F; --val: var(--max) }
  100% { background: #CC333F; --val: var(--min) }
}
```

**Con @property para value tracking**:
```css
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

output::before {
  content: counter(num);
  counter-reset: num var(--val); /* Muestra el valor actual */
}
```

**Técnicas Clave**:
1. `view-timeline` en el anchor para tracking
2. `animation-timeline` en positioned element para sync
3. `@property` para interpolar valores numéricos
4. `counter-reset` para display dinámico

---

### 9. @property Best Practices (NUEVO)

**Uso con Anchor Positioning**:

```css
/* Valores numéricos para interpolación */
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

/* Percentages para cálculos */
@property --p {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

/* Numbers para sign detection */
@property --_x {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
```

**Combinado con anchor positioning**:
```css
/* Adaptive shape basado en percentage */
.tooltip {
  translate: calc(50% - var(--p));
  border-radius: min(var(--r), var(--p) - var(--b)/2); /* Adaptive corners */
}

/* Sign detection workaround */
--_y: clamp(-1, var(--_x)*9999, 1);  /* Simula sign() function */
```

---

### 10. :has() Selector + Anchor Positioning (NUEVO)

**Fuente**: bouncy-input de css-tip.com

**Técnica para dynamic anchor basado en estado**:
```css
/* Anchor name solo en checked state */
input:checked {
  border-color: var(--c);
  anchor-name: --checkbox;
}

/* Container detecta qué está checked y ajusta */
.container::before {
  position: absolute;
  position-anchor: --checkbox;
  /* ... bouncy ball styles */
}

/* Cambio de valor basado en cuál está checked */
.container:has(label:nth-child(1) input:checked)::before {
  --_x: .01;
}
.container:has(label:nth-child(2) input:checked)::before {
  --_x: .02;
}
/* etc. */
```

**Técnicas Clave**:
1. **Conditional anchor-name** - Solo aplica en ciertos estados
2. **:has() detection** - Container sabe qué hijo está activo
3. **@property + :has()** - Cambio de valores para animations
4. **cubic-bezier extremos** - `cubic-bezier(.1,3000,.7,3000)` para bounce

---

### 11. border-image Fill Technique (NUEVO)

**Fuente**: range-slider-tooltip-2 de css-tip.com

**Para tooltips con shape adaptativa**:
```css
.tooltip {
  /* Base shape con border-radius adaptativo */
  border-radius: var(--r) var(--r)
    min(var(--r), 100% - var(--p) - var(--b)/2)
    min(var(--r), var(--p) - var(--b)/2) / var(--r);

  /* clip-path para el tail */
  clip-path: polygon(
    0 100%, 0 0, 100% 0, 100% 100%,
    min(100%, var(--p) + var(--b)/2) 100%,
    var(--p) calc(100% + var(--h)), /* Tail point */
    max(0%, var(--p) - var(--b)/2) 100%
  );

  /* border-image fill para el tail background */
  border-image: conic-gradient(var(--c) 0 0) fill 0/
    var(--r) calc(100% - var(--p) - var(--b)/2) 0 calc(var(--p) - var(--b)/2)/
    0 0 var(--h) 0;
}
```

**Técnicas Clave**:
1. **min() para adaptive radius** - Ajusta corners cerca del tail
2. **clip-path con percentage vars** - Shape dinámica basada en posición
3. **border-image fill** - Background que se adapta al shape
4. **conic-gradient** - Fill uniforme con border-image

---

## 🚫 Técnicas INCORRECTAS a Evitar

### ❌ NO usar `transform`
```css
/* INCORRECTO */
.arrow::before {
  transform: translateX(-50%) rotate(45deg);
}

/* CORRECTO */
.arrow::before {
  left: calc(anchor(--anchor center) - var(--s)/2);
  /* Sin transform */
}
```

### ❌ NO usar `position: absolute` en arrows
```css
/* INCORRECTO */
.tooltip::before {
  position: absolute;
}

/* CORRECTO */
.tooltip::before {
  position: fixed;  /* Para usar anchor() function */
}
```

### ❌ NO calcular clip-path por dirección
```css
/* INCORRECTO - cambiando clip-path según posición */
.tooltip[data-position="top"]::before {
  clip-path: polygon(50% 0, 0 100%, 100% 100%);
}
.tooltip[data-position="bottom"]::before {
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* CORRECTO - double-headed arrow + margin:inherit */
.tooltip::before {
  clip-path: polygon(
    50% .2em, 100% var(--d), 100% calc(100% - var(--d)),
    50% calc(100% - .2em), 0 calc(100% - var(--d)), 0 var(--d)
  );
  margin: inherit;  /* Magic! */
}
```

---

## ✅ Patrones Correctos para Implementar

### Pattern 1: Simple Positioned Element
```css
.positioned {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
}
```

### Pattern 2: Positioned con Distance
```css
.positioned {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  margin-bottom: var(--anchor-distance-md);
}
```

### Pattern 3: Con Fallbacks
```css
.positioned {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}
```

### Pattern 4: Tooltip con Arrow (Margin Magic)
```css
.tooltip {
  --d: 8px;
  --s: 10px;

  position: absolute;
  position-anchor: --anchor;
  position-area: top;
  margin-bottom: var(--d);
  position-try-fallbacks: flip-block;
  anchor-name: --tooltip;
}

.tooltip::before {
  content: "";
  position: fixed;
  width: var(--s);
  background: inherit;
  top: calc(anchor(--tooltip top) - var(--d));
  bottom: calc(anchor(--tooltip bottom) - var(--d));
  left: calc(anchor(--anchor center) - var(--s)/2);
  margin: inherit;
  clip-path: polygon(/* double-headed arrow */);
}
```

### Pattern 5: Using anchor-size()
```css
.sized {
  position: absolute;
  position-anchor: --my-anchor;
  width: anchor-size(width);
  min-width: anchor-size(--my-anchor width, 100px);
}
```

### Pattern 6: Corner Positioning
```css
.corner-tooltip {
  position: absolute;
  position-anchor: --anchor;
  position-area: top-left;
  margin: var(--corner-margin);  /* calc(distance + 0.414 * arrowSize) */
}
```

---

## 🎯 Implementación en SCSS Core

### Config Variables
```scss
:root {
  --anchor-distance-sm: 4px;
  --anchor-distance-md: 8px;
  --anchor-distance-lg: 12px;
  --anchor-distance-xl: 16px;
  --anchor-arrow-sm: 6px;
  --anchor-arrow-md: 8px;
  --anchor-arrow-lg: 10px;
  --anchor-corner-magic: 0.41421356237;  /* √2 - 1 */
}
```

### Mixins Correctos
```scss
@mixin positioned($anchor, $area, $fallbacks: null, $distance: null) {
  position: absolute;
  position-anchor: --#{$anchor};
  position-area: $area;

  @if $fallbacks {
    position-try-fallbacks: $fallbacks;
  }

  @if $distance {
    margin: var(--anchor-distance-#{$distance});
  }
}

@mixin tooltip-arrow($distance, $arrow-size) {
  anchor-name: --tooltip;

  &::before {
    content: "";
    position: fixed;
    width: $arrow-size;
    background: inherit;
    top: calc(anchor(--tooltip top) - #{$distance});
    bottom: calc(anchor(--tooltip bottom) - #{$distance});
    left: calc(anchor(--anchor center) - #{$arrow-size}/2);
    margin: inherit;
    clip-path: polygon(
      50% .2em,
      100% #{$distance},
      100% calc(100% - #{$distance}),
      50% calc(100% - .2em),
      0 calc(100% - #{$distance}),
      0 #{$distance}
    );
  }
}
```

---

## 📋 Checklist de Técnicas Descubiertas

### Básicas (MDN)
- ✅ `anchor()` function con calc()
- ✅ `anchor-size()` function para dimensiones
- ✅ `position-area` con grid 3×3 (36 combinaciones)
- ✅ Spanning (span-all, span-left, span-right, etc.)
- ✅ `position-try-fallbacks` automáticos

### Tooltips (css-tip.com)
- ✅ Margin Magic technique (2 positions)
- ✅ Double-headed arrow con clip-path
- ✅ `position: fixed` en pseudo-elements
- ✅ `anchor-name` en tooltips para arrow anchoring
- ✅ Four-position tooltips (top/bottom/left/right)
- ✅ 4-headed arrow con polygon de 12 puntos
- ✅ Corner positioning con √2 formula (4 corners)
- ✅ Diagonal arrows con dos pseudo-elements
- ✅ `clip-path: inset()` para extend bounds

### Avanzadas (css-tip.com)
- ✅ `@position-try` custom rules (--left, --right)
- ✅ Scroll-Driven + Anchor integration
- ✅ `view-timeline` para tracking
- ✅ `animation-timeline` para sync
- ✅ `@property` con anchor positioning
- ✅ `:has()` selector para conditional anchors
- ✅ `border-image fill` technique
- ✅ Adaptive shapes con `min()` y percentages
- ✅ `cubic-bezier` extremos para bounce effects
- ✅ Sign detection workaround con `clamp()`

### Especializadas
- ✅ Range slider tooltips con scroll-driven
- ✅ Progress element tooltips
- ✅ Menu hover effects con anchors
- ✅ Bouncy radio buttons
- ✅ `counter-reset` para display dinámico

---

**Total**: 30+ técnicas documentadas y probadas

**Siguiente paso**: Implementar SCSS core con TODAS estas técnicas
