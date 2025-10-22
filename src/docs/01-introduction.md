# Introducción a CSS Anchor Positioning

## ¿Qué es CSS Anchor Positioning?

CSS Anchor Positioning es una especificación CSS nativa del W3C que permite **posicionar elementos de forma relativa a otros elementos** (llamados "anchors") sin necesidad de JavaScript ni cálculos manuales de posición.

### El Problema que Resuelve

Tradicionalmente, crear tooltips, popovers, menús contextuales y elementos flotantes requería:

1. **JavaScript manual** para calcular posiciones
2. **Librerías pesadas** como Popper.js (11KB minified)
3. **Event listeners** para scroll, resize, etc.
4. **Cálculos complejos** para prevenir overflow
5. **Performance issues** por recalcular constantemente

**Con CSS Anchor Positioning**, todo esto se hace de forma **nativa, declarativa y performante** con CSS puro.

### Ventajas Clave

✅ **Performance**: Los cálculos los hace el navegador de forma nativa y optimizada
✅ **Declarativo**: No necesitas JavaScript para posicionamiento
✅ **Scroll-aware**: Automáticamente compensa scroll
✅ **Fallbacks automáticos**: Sistema de flip automático cuando no hay espacio
✅ **Type-safe**: Con este toolkit, todo es type-safe en TypeScript
✅ **SSR-friendly**: Funciona en Server-Side Rendering

## Conceptos Fundamentales

### 1. Anchor Element

El **anchor** es el elemento de referencia. Cualquier elemento puede ser un anchor usando la propiedad `anchor-name`:

```css
.my-button {
  anchor-name: --my-anchor;
}
```

### 2. Positioned Element

El **positioned element** es el que se posiciona relativo al anchor usando `position-anchor`:

```css
.my-tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
}
```

### 3. Position-Area (Grid 3×3)

`position-area` define **dónde** se posiciona el elemento respecto al anchor usando un **grid implícito 3×3**:

```
┌─────────┬─────────┬─────────┐
│ top     │ top     │ top     │
│ left    │ center  │ right   │
├─────────┼─────────┼─────────┤
│ left    │ center  │ right   │
│         │         │         │
├─────────┼─────────┼─────────┤
│ bottom  │ bottom  │ bottom  │
│ left    │ center  │ right   │
└─────────┴─────────┴─────────┘
```

**Ejemplos**:
- `position-area: top` → Arriba del anchor
- `position-area: bottom right` → Esquina inferior derecha
- `position-area: left center` → Centro del lado izquierdo

**Este toolkit soporta 50+ position-area values** incluyendo spanning, logical properties, etc.

### 4. Fallbacks Automáticos

Cuando no hay espacio en la posición primaria, el navegador automáticamente prueba **posiciones alternativas**:

```css
.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}
```

Si `top` no cabe, prueba:
1. `flip-block` → `bottom`
2. `flip-inline` → `left` o `right`

## Comparación con Alternativas

### Antes: JavaScript + Cálculos Manuales

```javascript
// ❌ 50+ líneas de JavaScript
function positionTooltip(button, tooltip) {
  const rect = button.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  let top = rect.top - tooltipRect.height - 8;
  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

  // Prevenir overflow
  if (top < 0) {
    top = rect.bottom + 8;
  }
  if (left < 0) {
    left = 8;
  }
  // ... más código ...

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';
}

window.addEventListener('scroll', () => positionTooltip(button, tooltip));
window.addEventListener('resize', () => positionTooltip(button, tooltip));
```

### Con CSS Anchor Positioning

```css
/* ✅ 4 líneas de CSS */
.tooltip {
  position: absolute;
  position-anchor: --my-button;
  position-area: top;
  position-try-fallbacks: flip-block;
}
```

**Resultado**: Mismo comportamiento con **95% menos código** y **mejor performance**.

## CSS Anchor Positioning vs Popper.js

| Feature | Popper.js | CSS Anchor | Ventaja |
|---------|-----------|------------|---------|
| **Bundle size** | 11KB | 0KB (nativo) | ✅ CSS Anchor |
| **JavaScript** | Requerido | Opcional | ✅ CSS Anchor |
| **Performance** | Good | Excelente | ✅ CSS Anchor |
| **Fallbacks** | Manual | Automático | ✅ CSS Anchor |
| **Scroll awareness** | Event listeners | Nativo | ✅ CSS Anchor |
| **SSR** | Hydration required | Works immediately | ✅ CSS Anchor |
| **Browser support** | Todos | Chrome 125+, Safari TP | ⚠️ Popper.js |

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| **Chrome** | 125+ | ✅ Soportado |
| **Edge** | 125+ | ✅ Soportado |
| **Safari** | Technology Preview | ✅ Experimental |
| **Firefox** | En desarrollo | ⏳ Próximamente |

### Polyfill

Para navegadores sin soporte nativo, existe un polyfill:
```bash
npm install @oddbird/css-anchor-positioning
```

**Nota**: Este toolkit está diseñado para usarse con el polyfill o navegadores compatibles.

## Casos de Uso Principales

### 1. Tooltips
Tooltips que siguen elementos hover/focus con fallbacks automáticos.

**Demo**: `TooltipDemo.tsx`

### 2. Popovers
Paneles contextuales anclados a botones o elementos de UI.

**Demo**: `Popover.tsx`

### 3. Menús Contextuales
Menús que aparecen al hacer click derecho, anclados a la posición del mouse.

**Demo**: `ContextMenu.tsx`

### 4. Dropdowns
Menús dropdown que se ajustan automáticamente según espacio disponible.

### 5. Position Indicators
Labels o badges anclados a elementos en scroll.

**Demo**: `ScrollDrivenDemo.tsx`

## Arquitectura de Este Toolkit

Este toolkit provee **3 capas** de integración:

### 1. SCSS Core Layer
```scss
@use 'anchortoolkit.core.scss';

.my-tooltip {
  @include positioned(
    $anchor: --btn,
    $area: top,
    $distance: md
  );
}
```

### 2. TypeScript Helpers
```typescript
import { positionedStyles, createAnchorName } from 'css-anchor-toolkit';

const anchorName = createAnchorName('my-button');

const styles = positionedStyles({
  anchor: anchorName,
  area: 'top',
  distance: 'md',
  fallbacks: 'auto'
});
```

### 3. React Components
```tsx
import { Tooltip } from 'css-anchor-toolkit';

<button style={{ anchorName: '--btn' }}>Hover me</button>
<Tooltip anchor="--btn" placement="top" arrow>
  Tooltip content
</Tooltip>
```

## Próximos Pasos

1. **Aprende el Grid 3×3**: Lee `02-position-area-grid.md` para dominar todas las posiciones disponibles
2. **Explora Fallbacks**: `06-position-try-fallbacks.md` cubre el sistema completo de fallbacks
3. **Técnicas Avanzadas**: `07-advanced-techniques.md` muestra corner positioning, multiple anchors, etc.
4. **API Reference**: `08-api-reference.md` documenta cada función y mixin disponible

## Recursos Externos

- **W3C Specification**: [CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-position-1/)
- **Can I Use**: [Browser compatibility](https://caniuse.com/css-anchor-positioning)
- **Research Base**: [css-tip.com](https://css-tip.com) (3 técnicas de arrows implementadas en este toolkit)

---

**Siguiente**: [Position-Area Grid System →](./02-position-area-grid.md)
