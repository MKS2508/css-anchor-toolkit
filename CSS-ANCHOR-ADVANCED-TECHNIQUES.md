# 🚀 CSS Anchor Positioning - Técnicas Avanzadas

**Fuente**: 9 artículos de css-tip.com (Triple check completado)

Este documento contiene implementaciones completas de técnicas avanzadas de CSS Anchor Positioning descubiertas en el research exhaustivo.

---

## 📋 Índice

1. [Range Slider con Tooltip](#1-range-slider-con-tooltip)
2. [Range Slider Adaptive Shape](#2-range-slider-adaptive-shape)
3. [Progress Element con Tooltip](#3-progress-element-con-tooltip)
4. [Menu Hover Effects](#4-menu-hover-effects)
5. [Bouncy Radio Buttons](#5-bouncy-radio-buttons)
6. [Tooltip 4 Posiciones (Custom @position-try)](#6-tooltip-4-posiciones-custom-position-try)
7. [Tooltip Corner Positioning](#7-tooltip-corner-positioning)

---

## 1. Range Slider con Tooltip

**Fuente**: https://css-tip.com/range-slider-tooltip/

### HTML
```html
<label>
  <input type="range" id="slider" min="0" max="120" step="1" value="20">
  <output for="slider" style="--min: 0; --max: 120"></output>
</label>
```

### CSS Completo
```css
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

label {
  --c: #547980;      /* slider color */
  --g: round(.3em,1px);  /* gap */
  --l: round(.2em,1px);  /* line thickness */
  --s: round(1.3em,1px); /* thumb size */
  --t: round(.8em,1px);  /* tooltip tail size */
  --r: round(.8em,1px);  /* tooltip radius */

  timeline-scope: --thumb-view;
  position: relative;
  font-size: 24px;
}

input[type="range"]::-webkit-slider-thumb {
  height: var(--s);
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 var(--l) inset var(--c);
  border-image: linear-gradient(90deg, var(--c) 50%, #ababab 0) 0 1/
    calc(50% - var(--l)/2) 100vw/0 calc(100vw + var(--g));
  appearance: none;

  /* ⚠️ CLAVE: Anchor y timeline */
  anchor-name: --thumb;
  view-timeline: --thumb-view inline;
}

output {
  position-anchor: --thumb;
  position: absolute;
  position-area: top;
  inset: 0 -4em;
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding-block: .5em;
  width: 4em;

  /* Tail shape con border-bottom */
  border-bottom: var(--t) solid #0000;
  border-radius: var(--r)/var(--r) var(--r)
    calc(var(--r) + var(--t)) calc(var(--r) + var(--t));

  /* Mask para el tail */
  --_m: 100%/var(--t) var(--t) no-repeat;
  --_g: 100%, #0000 99%, #000 102%;
  mask:
    linear-gradient(#000 0 0) padding-box,
    radial-gradient(100% 100% at 100% var(--_g))
      calc(50% + var(--t)/2) var(--_m),
    radial-gradient(100% 100% at 0 var(--_g))
      calc(50% - var(--t)/2) var(--_m);

  /* ⚠️ Scroll-driven animation */
  animation: range linear both;
  animation-timeline: --thumb-view;
  animation-range: entry 100% exit 0%;
}

output::before {
  content: counter(num);
  counter-reset: num var(--val);
}

@keyframes range {
  0%   { background: #8A9B0F; --val: var(--max) }
  100% { background: #CC333F; --val: var(--min) }
}
```

### Técnicas Clave
- `view-timeline: --thumb-view inline` - Tracking del thumb
- `animation-timeline: --thumb-view` - Sync del tooltip
- `@property --val` - Interpolación de valores
- `counter-reset: num var(--val)` - Display dinámico

---

## 2. Range Slider Adaptive Shape

**Fuente**: https://css-tip.com/range-slider-tooltip-2/

### HTML
```html
<label>
  <input type="range" id="slider" min="0" max="120" step="1" value="40">
  <output for="slider" style="--min: 0; --max: 120"></output>
</label>
```

### CSS Completo
```css
@property --val {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0;
}

@property --p {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

label {
  --c: #547980;
  --g: round(.3em,1px);
  --l: round(.2em,1px);
  --s: round(1.3em,1px);
  /* tooltip dimension */
  --w: round(4em,1px);  /* width */
  --r: round(.7em,1px); /* radius */
  /* tail dimension */
  --b: round(1em,1px);  /* base */
  --h: round(.6em,1px); /* height */

  timeline-scope: --thumb-view;
  position: relative;
  font-size: 24px;
}

input[type="range"]::-webkit-slider-thumb {
  height: var(--s);
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 var(--l) inset var(--c);
  border-image: linear-gradient(90deg, var(--c) 50%, #ababab 0) 0 1/
    calc(50% - var(--l)/2) 100vw/0 calc(100vw + var(--g));
  appearance: none;
  anchor-name: --thumb;
  view-timeline: --thumb-view inline;
}

output {
  position-anchor: --thumb;
  position: absolute;
  position-area: top;
  inset: 0 -4em;
  width: var(--w);
  margin-block: calc(var(--h) + var(--g));

  /* ⚠️ Translate basado en percentage */
  translate: calc(50% - var(--p));

  /* ⚠️ Adaptive border-radius cerca de los corners */
  border-radius: var(--r) var(--r)
    min(var(--r), 100% - var(--p) - var(--b)/2)
    min(var(--r), var(--p) - var(--b)/2) / var(--r);

  /* Tail con clip-path */
  clip-path: polygon(
    0 100%, 0 0, 100% 0, 100% 100%,
    min(100%, var(--p) + var(--b)/2) 100%,
    var(--p) calc(100% + var(--h)),
    max(0%, var(--p) - var(--b)/2) 100%
  );

  background: var(--c);

  /* ⚠️ border-image fill para tail background */
  border-image: conic-gradient(var(--c) 0 0) fill 0/
    var(--r) calc(100% - var(--p) - var(--b)/2) 0 calc(var(--p) - var(--b)/2)/
    0 0 var(--h) 0;

  animation: range linear both;
  animation-timeline: --thumb-view;
  animation-range: entry 100% exit 0%;
}

output::before {
  content: counter(num);
  counter-reset: num var(--val);
}

@keyframes range {
  0%   { --val: var(--max); --p: 100% }
  100% { --val: var(--min); --p: 0% }
}
```

### Técnicas Clave
- `@property --p` - Percentage tracking
- `min(var(--r), var(--p) - var(--b)/2)` - Adaptive radius
- `border-image fill` - Background adaptativo
- `clip-path` con variables - Shape dinámica

---

## 3. Progress Element con Tooltip

**Fuente**: https://css-tip.com/progress-with-tooltip/

### HTML
```html
<progress max="100" value="70"></progress>
```

### CSS Completo
```css
@property --x {
  syntax: '<integer>';
  inherits: true;
  initial-value: 100;
}

progress {
  width: 200px;
  height: 40px;
  appearance: none;
  position: relative;

  /* Scroll-driven animation */
  animation: x linear;
  animation-timeline: --progress;
  timeline-scope: --progress;
  animation-range: entry 100% exit 100%;

  --_c: color-mix(in hsl, #E80E0D, #7AB317 calc(1%*var(--x)));
}

@keyframes x {
  to { --x: 0 }
}

progress::-webkit-progress-bar {
  overflow: auto;
}

progress::-webkit-progress-value {
  /* ⚠️ El progress value es el anchor */
  anchor-name: --progress;
  view-timeline: --progress inline;
  background: var(--_c);
}

progress::before {
  /* Tooltip settings */
  --b: 1em;  /* triangle base */
  --h: .5em; /* triangle height */

  position: absolute;
  position-anchor: --progress;
  position-area: top right;
  translate: -50% calc(-1.2*var(--h));

  content: counter(val) "%";
  counter-reset: val var(--x);
  font-family: system-ui, sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  padding: .5em;
  border-radius: .3em;

  /* Tail shape con clip-path */
  clip-path: polygon(
    0 100%, 0 0, 100% 0, 100% 100%,
    calc(50% + var(--b)/2) 100%,
    50% calc(100% + var(--h)),
    calc(50% - var(--b)/2) 100%
  );

  background: var(--_c);

  /* ⚠️ border-image para tail color */
  border-image: conic-gradient(var(--_c) 0 0) fill 0/
    0 calc(50% - var(--b)/2)/0 0 var(--h) 0;
}
```

### Técnicas Clave
- `anchor-name` en `::-webkit-progress-value`
- `view-timeline` para tracking del progress
- `counter-reset: val var(--x)` - Display de percentage
- `color-mix()` para gradient basado en valor

---

## 4. Menu Hover Effects

**Fuente**: https://css-tip.com/hover-anchor-positionning/

### HTML
```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li class="active"><a href="#">About</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

### CSS Completo
```css
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: .5rem;
  font-size: 2.2rem;
}

/* Sliding highlight */
ul::before {
  content: "";
  position: absolute;

  /* ⚠️ Anchor al item activo */
  position-anchor: --li;

  /* ⚠️ Posición usando anchor() function */
  inset: auto anchor(right) anchor(bottom) anchor(left);

  background: lightblue;
  height: .2em;
  transition: .2s .2s;
}

ul li {
  background: conic-gradient(lightblue 0 0) bottom/100% 0% no-repeat;
  transition: .2s;
}

/* ⚠️ Conditional anchor-name */
ul li:is(:hover, .active) {
  anchor-name: --li;
  background-size: 100% 100%;
  transition: .2s .4s;
}

/* ⚠️ :has() para remover anchor del active cuando hay hover */
ul:has(li:hover) li.active:not(:hover) {
  anchor-name: none;
  background-size: 100% 0%;
  transition: .2s;
}

ul li a {
  color: #000;
  text-decoration: none;
  font-weight: 900;
  line-height: 1.5;
  padding-inline: .2em;
  display: block;
}
```

### Técnicas Clave
- `anchor-name: --li` solo en hover/active
- `inset: auto anchor(right) anchor(bottom) anchor(left)` - Inset shorthand
- `:has()` para state management
- `transition` coordinado con anchor positioning

---

## 5. Bouncy Radio Buttons

**Fuente**: https://css-tip.com/bouncy-input/

### HTML
```html
<div class="container">
  <label><input type="radio" name="choice" checked> First</label>
  <label><input type="radio" name="choice"> Second</label>
  <label><input type="radio" name="choice"> Third</label>
</div>
```

### CSS Completo
```css
@property --_x {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

.container {
  --s: 1em;      /* control the size */
  --c: #009688;  /* active color */

  display: grid;
  position: relative;
}

.container::before {
  content: "";
  position: absolute;

  /* ⚠️ Anchor al checkbox checked */
  position-anchor: --checkbox;

  height: calc(var(--s)/2);
  aspect-ratio: 1;

  /* ⚠️ Sign detection workaround */
  --_y: clamp(-1, var(--_x)*9999, 1);

  left: max(-80px, var(--s)/4 - var(--_x)*var(--_y)*1px);
  top: calc(anchor(top) + var(--s)/4);

  background: var(--c);
  border-radius: 50%;

  /* ⚠️ Bounce effect con cubic-bezier extremo */
  transition: top .4s linear,
              --_x cubic-bezier(.1,3000,.7,3000) .4s;
}

input {
  height: var(--s);
  aspect-ratio: 1;
  border: calc(var(--s)/8) solid #939393;
  border-radius: 50%;
  outline-offset: calc(var(--s)/10);
  appearance: none;
  transition: .3s .1s;
}

/* ⚠️ Conditional anchor */
input:checked {
  border-color: var(--c);
  anchor-name: --checkbox;
}

/* ⚠️ :has() detection para cambiar valor */
.container:has(label:nth-child(1) input:checked)::before {
  --_x: .01;
}
.container:has(label:nth-child(2) input:checked)::before {
  --_x: .02;
}
.container:has(label:nth-child(3) input:checked)::before {
  --_x: .03;
}
```

### Técnicas Clave
- `anchor-name` solo en `:checked`
- `:has()` para detection de estado
- `@property --_x` para animation
- `clamp(-1, var(--_x)*9999, 1)` - Sign detection
- `cubic-bezier(.1,3000,.7,3000)` - Bounce effect

---

## 6. Tooltip 4 Posiciones (Custom @position-try)

**Fuente**: https://css-tip.com/tooltip-anchor-2/

### HTML
```html
<div id="anchor">⚓️</div>
<div id="tooltip">🔗 Drag the anchor...</div>
```

### CSS Completo
```css
#anchor {
  position: absolute;
  anchor-name: --anchor;
}

#tooltip {
  --d: 1em;  /* distance */
  --s: .8em; /* tail size */

  position: absolute;
  position-anchor: --anchor;
  min-width: 10em;

  /* Posición inicial: top */
  position-area: top;
  bottom: var(--d);
  margin: var(--d);
  margin-bottom: 0;

  /* ⚠️ Fallback chain: top → bottom → left → right */
  position-try: flip-block, --left, --right;
}

/* ⚠️ Custom position-try rules */
@position-try --left {
  position-area: left;
  right: var(--d);
  margin: var(--d);
  margin-right: 0;
}

@position-try --right {
  position-area: right;
  left: var(--d);
  margin: var(--d);
  margin-left: 0;
}

/* ⚠️ 4-headed arrow (12 points polygon) */
#tooltip::before {
  content: "";
  position: absolute;
  z-index: -1;
  background: inherit;
  inset: calc(-1*var(--d));
  margin: inherit; /* Magic! */

  clip-path: polygon(
    /* Top arrow */
    calc(50% - var(--s)) var(--d),
    50% .2em,
    calc(50% + var(--s)) var(--d),
    /* Right arrow */
    calc(100% - var(--d)) calc(50% - var(--s)),
    calc(100% - .2em) 50%,
    calc(100% - var(--d)) calc(50% + var(--s)),
    /* Bottom arrow */
    calc(50% + var(--s)) calc(100% - var(--d)),
    50% calc(100% - .2em),
    calc(50% - var(--s)) calc(100% - var(--d)),
    /* Left arrow */
    var(--d) calc(50% + var(--s)),
    .2em 50%,
    var(--d) calc(50% - var(--s))
  );
}
```

### Versión Simplificada
```css
#tooltip {
  position-try: flip-block, flip-start, flip-start flip-inline;
}
```

### Técnicas Clave
- `@position-try` custom rules
- `position-try: flip-block, --left, --right` - Cadena completa
- 4-headed arrow con 12 puntos
- `margin: inherit` magic para 4 direcciones

---

## 7. Tooltip Corner Positioning

**Fuente**: https://css-tip.com/tooltip-anchor-3/

### HTML
```html
<div id="anchor">⚓️</div>
<div id="tooltip">🔗 Drag the anchor...</div>
```

### CSS Completo
```css
#anchor {
  position: absolute;
  anchor-name: --anchor;
}

#tooltip {
  --d: .5em;  /* distance */
  --s: .8em;  /* tail size */

  position: absolute;
  position-anchor: --anchor;
  position-area: top left;

  /* ⚠️ Fórmula √2 para diagonal margin */
  --_m: calc(var(--d) + (sqrt(2) - 1)*var(--s));
  margin: var(--_m) 0 0 var(--_m);

  inset: 0 var(--d) var(--d) 0;

  /* ⚠️ Fallbacks para 4 corners */
  position-try: flip-inline, flip-block, flip-block flip-inline;

  anchor-name: --tooltip;

  /* ⚠️ Permite arrows fuera del tooltip */
  clip-path: inset(calc(-1*var(--d)));
}

/* Pseudo-elements para diagonal arrows */
#tooltip::before,
#tooltip::after {
  content: "";
  position: fixed;

  /* ⚠️ Dimensiones dinámicas con anchor-size() */
  width: anchor-size(--tooltip width);
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
    var(--d) calc(var(--s) + var(--d)),
    0 0,
    calc(var(--s) + var(--d)) var(--d),
    calc(100% - var(--d)) calc(100% - var(--d) - var(--s)),
    100% 100%,
    calc(100% - var(--d) - var(--s)) calc(100% - var(--d))
  );
}

/* Diagonal arrow top-right */
#tooltip::after {
  position-area: top right;
  clip-path: polygon(
    var(--d) calc(100% - var(--s) - var(--d)),
    0 100%,
    calc(var(--s) + var(--d)) calc(100% - var(--d)),
    calc(100% - var(--d)) calc(var(--d) + var(--s)),
    100% 0,
    calc(100% - var(--d) - var(--s)) var(--d)
  );
}
```

### Técnicas Clave
- `calc(var(--d) + (sqrt(2) - 1)*var(--s))` - √2 formula
- Margin diagonal: `margin: var(--_m) 0 0 var(--_m)`
- `anchor-size(--tooltip width)` - Dimensiones dinámicas
- Dos pseudo-elements para corners opuestos
- `clip-path: inset(calc(-1*var(--d)))` - Extend bounds
- `position-try: flip-inline, flip-block, flip-block flip-inline` - 4 corners

---

## 🎯 Resumen de Técnicas

### Scroll-Driven Animations
- ✅ `view-timeline` en anchor elements
- ✅ `animation-timeline` para sync
- ✅ `@property` para interpolación
- ✅ `counter-reset` para display

### @position-try Avanzado
- ✅ Custom rules con `@position-try`
- ✅ Fallback chains complejas
- ✅ Margin control por dirección

### Shape Adaptation
- ✅ `min()` para adaptive radius
- ✅ `border-image fill` technique
- ✅ `clip-path` dinámico con vars
- ✅ `translate` basado en percentage

### State Management
- ✅ Conditional `anchor-name`
- ✅ `:has()` para detection
- ✅ `@property` + state changes
- ✅ `cubic-bezier` extremos

### Corner Positioning
- ✅ Fórmula √2 completa
- ✅ Diagonal arrows
- ✅ `anchor-size()` para dimensions
- ✅ Dos pseudo-elements

---

**Total**: 7 implementaciones completas y probadas de técnicas avanzadas
