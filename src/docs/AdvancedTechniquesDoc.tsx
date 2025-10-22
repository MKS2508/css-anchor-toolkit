import { MarkdownContent, Callout } from '../components/MarkdownContent';
import { Card } from '../components/ui/card';

export function AdvancedTechniquesDoc() {
  return (
    <Card className="p-8">
      <MarkdownContent>
        {`
# ⚡ Técnicas Avanzadas

Domina estas técnicas avanzadas para aprovechar al máximo CSS Anchor Positioning.

## 1. Corner Positioning con Diagonal Arrows

Para tooltips en **esquinas** con arrows diagonales, necesitas ajustar el margin con la fórmula **√2**:

### La Fórmula

\`\`\`css
.corner-tooltip {
  position-area: top left;  /* Esquina */
  margin: calc(var(--distance) + (1.414 - 1) * var(--arrow-size));
}
\`\`\`

**¿Por qué √2?**
- En diagonal, la distancia es mayor que en línea recta
- √2 ≈ 1.414
- La diferencia (0.414) compensa el arrow diagonal

### Ejemplo Completo

\`\`\`css
.corner-tooltip {
  --distance: 10px;
  --arrow-size: 12px;

  position: absolute;
  position-anchor: --target;
  position-area: top left;

  /* Margin especial para esquinas */
  margin: calc(10px + 0.414 * 12px);  /* = 14.97px */

  padding: 8px 12px;
  background: black;
  color: white;
  border-radius: 6px;
}

/* Arrow diagonal con transform: rotate(45deg) */
.corner-tooltip::before {
  content: "";
  position: absolute;
  width: var(--arrow-size);
  height: var(--arrow-size);
  background: inherit;
  transform: rotate(45deg);
  margin: inherit;
  z-index: -1;
}
\`\`\`

## 2. Multiple Anchors: Un Element, Varios Anchors

Un positioned element puede **referenciar múltiples anchors** usando diferentes \`anchor()\` en cada inset property:

### Ejemplo: Box Conectado a 4 Anchors

\`\`\`html
<div style="anchor-name: --top-left">TL</div>
<div style="anchor-name: --top-right">TR</div>
<div style="anchor-name: --bottom-left">BL</div>
<div style="anchor-name: --bottom-right">BR</div>

<div class="connected-box"></div>
\`\`\`

\`\`\`css
.connected-box {
  position: absolute;

  /* Cada lado referencia un anchor diferente */
  top: anchor(--top-left bottom);
  right: anchor(--top-right left);
  bottom: anchor(--bottom-left top);
  left: anchor(--bottom-right right);

  background: rgba(100, 100, 255, 0.2);
  border: 2px dashed blue;
}
\`\`\`

**Resultado**: Un box que se estira conectando los 4 anchors.

### Caso de Uso: Líneas Conectoras

\`\`\`css
.connector-line {
  position: fixed;

  /* Conecta dos anchors */
  top: anchor(--start center);
  left: anchor(--start center);
  width: calc(anchor(--end center) - anchor(--start center));
  height: 2px;

  background: blue;
  transform-origin: left center;
  /* Calcula rotación con atan2 en JavaScript si necesario */
}
\`\`\`

## 3. anchor-size(): Sizing Dinámico

La función \`anchor-size()\` obtiene las **dimensiones del anchor** para calcular tamaños:

### Sintaxis

\`\`\`css
anchor-size([<anchor-name>] <anchor-size>, <length-percentage>?)
\`\`\`

**Parámetros**:
- \`<anchor-name>\` (opcional): Nombre del anchor
- \`<anchor-size>\`: \`width\` | \`height\` | \`block\` | \`inline\` | \`self-block\` | \`self-inline\`
- Fallback (opcional): Valor si anchor no existe

### Ejemplos

#### Mismo Ancho que Anchor

\`\`\`css
.dropdown {
  position-anchor: --trigger;
  position-area: bottom;
  width: anchor-size(width);  /* Mismo ancho que el trigger */
}
\`\`\`

#### Tamaño Relativo

\`\`\`css
.preview {
  position-anchor: --thumbnail;
  position-area: right;
  width: calc(anchor-size(width) * 3);    /* 3x el ancho */
  height: calc(anchor-size(height) * 3);  /* 3x la altura */
}
\`\`\`

#### Con Múltiples Anchors

\`\`\`css
.panel {
  width: calc(
    anchor-size(--anchor1 width) +
    anchor-size(--anchor2 width)
  );
}
\`\`\`

#### Dimensiones Lógicas

\`\`\`css
.adaptive {
  /* Se adapta al writing mode */
  inline-size: anchor-size(inline);
  block-size: calc(anchor-size(block) * 2);
}
\`\`\`

## 4. anchor-scope: Prevenir Conflictos

Cuando reutilizas componentes con anchor names, usa \`anchor-scope\` para evitar colisiones:

### El Problema

\`\`\`html
<!-- Componente 1 -->
<div class="card">
  <button style="anchor-name: --trigger">A</button>
  <div style="position-anchor: --trigger">Tooltip A</div>
</div>

<!-- Componente 2 -->
<div class="card">
  <button style="anchor-name: --trigger">B</button>  <!-- ⚠️ Mismo nombre! -->
  <div style="position-anchor: --trigger">Tooltip B</div>  <!-- ⚠️ Conflicto! -->
</div>
\`\`\`

### La Solución: anchor-scope

\`\`\`css
.card {
  anchor-scope: --trigger;  /* Limita el scope del nombre */
}
\`\`\`

O para **todos** los anchor names:

\`\`\`css
.card {
  anchor-scope: all;
}
\`\`\`

**Resultado**: Cada \`.card\` tiene su propio scope aislado.

### Ejemplo Completo

\`\`\`html
<div class="tooltip-container" style="anchor-scope: --info">
  <button style="anchor-name: --info">Info 1</button>
  <div style="position-anchor: --info">Tooltip 1</div>
</div>

<div class="tooltip-container" style="anchor-scope: --info">
  <button style="anchor-name: --info">Info 2</button>
  <div style="position-anchor: --info">Tooltip 2</div>  <!-- No colisiona -->
</div>
\`\`\`

## 5. Scroll Compensation: Automático

CSS Anchor Positioning **compensa automáticamente** el scroll - el positioned element sigue al anchor sin JavaScript.

### Cómo Funciona

\`\`\`html
<div class="scrollable">
  <div style="anchor-name: --item">Item</div>
  <!-- Contenido scrolleable... -->
</div>

<div style="position-anchor: --item; position-area: right;">
  Tooltip que sigue automáticamente al scroll
</div>
\`\`\`

**Magia**: El navegador guarda "offsets de scroll" y ajusta la posición automáticamente.

### position-visibility + Scroll

Combina con \`position-visibility\` para ocultar cuando no sea visible:

\`\`\`css
.auto-hide-tooltip {
  position-anchor: --scrolling-item;
  position-area: top;
  position-visibility: anchors-visible;
}
/* Se oculta automáticamente cuando el anchor sale del viewport */
\`\`\`

## 6. Animaciones y Transiciones

Los positioned elements pueden **animarse** normalmente:

### Transición de Posición

\`\`\`css
.smooth-tooltip {
  position-anchor: --button;
  position-area: top;

  transition: opacity 0.2s, transform 0.2s;
  transform-origin: bottom center;
}

.smooth-tooltip[data-visible="false"] {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
\`\`\`

### Animación de Entry

\`\`\`css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-popover {
  animation: slideIn 0.3s ease-out;
}
\`\`\`

## 7. Combinación con Popover API

CSS Anchor Positioning funciona **perfectamente** con Popover API nativo:

\`\`\`html
<button popovertarget="my-popover" style="anchor-name: --trigger">
  Open
</button>

<div id="my-popover" popover style="position-anchor: --trigger; position-area: bottom;">
  Popover content con anchor positioning!
</div>
\`\`\`

**Beneficios**:
- ✅ Top-layer automático (siempre visible encima)
- ✅ Light dismiss (cierra al hacer click fuera)
- ✅ Focus management
- ✅ Accessibility (ARIA) automático

### Reset de Estilos de Popover

\`\`\`css
[popover] {
  /* Reset estilos del user-agent */
  margin: 0;
  inset: auto;
  border: none;
  padding: 0;

  /* Aplica tus estilos */
  position-anchor: var(--anchor);
  position-area: bottom;
}
\`\`\`

## 8. Margin Magic: El Truco del Arrow Dinámico

Para arrows que cambian según la posición del tooltip:

\`\`\`css
.tooltip {
  --arrow-size: 8px;
  margin: 10px;

  position-anchor: --target;
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}

.tooltip::before {
  content: "";
  position: absolute;
  width: var(--arrow-size);
  height: var(--arrow-size);
  background: inherit;

  /* ¡La magia! */
  margin: inherit;

  /* Clip-path que define 4 arrows simultáneos */
  clip-path: polygon(
    /* Define múltiples triángulos superpuestos */
    ...
  );
}
\`\`\`

**Efecto**: El margin "oculta" los arrows que no corresponden a la posición actual.

## 9. Feature Detection en CSS

Detecta soporte y aplica estilos condicionales:

\`\`\`css
@supports (anchor-name: --test) {
  /* Usa anchor positioning */
  .tooltip {
    position-anchor: --trigger;
    position-area: top;
  }
}

@supports not (anchor-name: --test) {
  /* Fallback para navegadores sin soporte */
  .tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
\`\`\`

### En JavaScript

\`\`\`javascript
const supportsAnchors = CSS.supports('anchor-name', '--test');

if (!supportsAnchors) {
  // Cargar polyfill o usar alternativa
  import('@oddbird/css-anchor-positioning/fn');
}
\`\`\`

## 10. Performance Tips

### ✅ Do's

- Usa \`position-visibility: anchors-visible\` para evitar renders innecesarios
- Prefiere \`position-area\` sobre cálculos con \`anchor()\`
- Agrupa positioned elements con el mismo anchor
- Usa \`will-change\` solo cuando necesites animaciones

### ❌ Don'ts

- No uses JavaScript para calcular posiciones (deja que CSS lo haga)
- No crees demasiados anchors simultáneos (>100 puede afectar performance)
- No uses \`position: fixed\` a menos que necesites fijación al viewport
- Evita recalcular estilos en cada scroll/resize

### Ejemplo Optimizado

\`\`\`css
.performant-tooltip {
  /* Contenedor eficiente */
  contain: layout style;

  /* Positioning */
  position-anchor: --target;
  position-area: top;

  /* Fallbacks */
  position-try-fallbacks: flip-block;
  position-visibility: anchors-visible;

  /* Solo anima opacidad (GPU) */
  transition: opacity 0.2s;
  will-change: opacity;
}
\`\`\`

---

## Recursos Adicionales

- **Especificación W3C**: [drafts.csswg.org/css-anchor-position-1/](https://drafts.csswg.org/css-anchor-position-1/)
- **MDN Docs**: Documentación completa con ejemplos
- **Chrome DevTools**: Inspector de anchor positioning
- **Can I Use**: Estado de soporte en navegadores

**Próximo paso**: Experimenta con las **demos interactivas** para ver estas técnicas en acción.
        `}
      </MarkdownContent>

      <Callout type="success">
        <p className="font-semibold mb-2">🎉 ¡Listo!</p>
        <p className="text-sm">
          Has completado la guía de CSS Anchor Positioning. Ahora explora las demos interactivas y
          comienza a usar estas técnicas en tus proyectos.
        </p>
      </Callout>
    </Card>
  );
}
