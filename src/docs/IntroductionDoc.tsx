import { MarkdownContent, Callout, CodeExample } from '../components/MarkdownContent';
import { Card } from '../components/ui/card';

/**
 * Documento de introducción a CSS Anchor Positioning
 * Contenido markdown interactivo estilo blog
 */
export function IntroductionDoc() {
  return (
    <Card className="p-8">
      <MarkdownContent>
        {`
# 🚀 Introducción a CSS Anchor Positioning

CSS Anchor Positioning es una **especificación revolucionaria** de W3C que permite posicionar elementos relativos a otros elementos de forma nativa en CSS, eliminando la necesidad de JavaScript para casos como tooltips, popovers, dropdowns y menús contextuales.

## ¿Por qué es importante?

Hasta ahora, crear un tooltip que siga a un botón requería:
- ❌ JavaScript para calcular posiciones
- ❌ Librerías third-party (Popper.js, Floating UI, etc.)
- ❌ Re-cálculos en cada scroll/resize
- ❌ Problemas de performance y complejidad

Con CSS Anchor Positioning:
- ✅ **100% CSS** - Sin JavaScript necesario
- ✅ **Performance nativo** del navegador
- ✅ **Fallbacks automáticos** para evitar overflow
- ✅ **Scroll compensation** automático
- ✅ **Código más simple** y mantenible

## Conceptos Fundamentales

### 1. Anchor Element (⚓ Ancla)

Un elemento que actúa como **punto de referencia** para posicionar otros elementos:

\`\`\`css
.button {
  anchor-name: --my-button;
}
\`\`\`

### 2. Positioned Element (📍 Element Posicionado)

Un elemento que se posiciona **relativo al anchor**:

\`\`\`css
.tooltip {
  position: absolute;
  position-anchor: --my-button;
  position-area: top;
}
\`\`\`

### 3. Position-Area (Sistema Grid 3×3)

Define **dónde colocar** el elemento posicionado respecto al anchor:

\`\`\`css
.tooltip {
  position-area: top;        /* Arriba del anchor */
  position-area: bottom right; /* Abajo-derecha del anchor */
  position-area: left;       /* Izquierda del anchor */
}
\`\`\`

### 4. Fallbacks Automáticos

El navegador **reposiciona automáticamente** si no hay espacio:

\`\`\`css
.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}
/* Si no cabe arriba, intenta abajo automáticamente */
\`\`\`

## Soporte de Navegadores

| Navegador | Versión | Soporte |
|-----------|---------|---------|
| **Chrome** | 125+ | ✅ Completo |
| **Edge** | 125+ | ✅ Completo |
| **Safari** | 26+ (macOS/iOS) | ✅ Completo |
| **Firefox** | En desarrollo | 🔄 Próximamente |

> **Nota**: Safari 26 fue lanzado en septiembre de 2024, Chrome 125 en mayo de 2024.

## Comparación con Alternativas

### Antes: Floating UI / Popper.js

\`\`\`typescript
import { computePosition, flip, shift } from '@floating-ui/dom';

async function updateTooltipPosition() {
  const { x, y } = await computePosition(button, tooltip, {
    placement: 'top',
    middleware: [flip(), shift()],
  });

  Object.assign(tooltip.style, {
    left: \`\${x}px\`,
    top: \`\${y}px\`,
  });
}

// Re-calcular en scroll, resize, etc.
button.addEventListener('mouseover', updateTooltipPosition);
window.addEventListener('scroll', updateTooltipPosition);
window.addEventListener('resize', updateTooltipPosition);
\`\`\`

**Problemas**:
- 📦 +7KB de librería
- 🔄 Cálculos continuos en JS
- 🐌 Performance overhead
- 🔧 Complejidad de setup

### Ahora: CSS Anchor Positioning

\`\`\`css
.button {
  anchor-name: --tooltip-anchor;
}

.tooltip {
  position: absolute;
  position-anchor: --tooltip-anchor;
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}
\`\`\`

**Ventajas**:
- ⚡ 0KB - Nativo del navegador
- 🚀 Performance óptimo
- 🎯 Fallbacks automáticos
- ✨ Código minimalista

## Casos de Uso Reales

### 1. Tooltips

El caso de uso más común - información contextual al hover:

\`\`\`html
<button style="anchor-name: --btn">Hover me</button>
<div class="tooltip" style="position-anchor: --btn; position-area: top;">
  Tooltip content
</div>
\`\`\`

### 2. Dropdowns & Menus

Menús desplegables que se ajustan automáticamente:

\`\`\`html
<button style="anchor-name: --menu-trigger">Menu ▼</button>
<ul class="dropdown" style="position-anchor: --menu-trigger; position-area: bottom;">
  <li>Option 1</li>
  <li>Option 2</li>
</ul>
\`\`\`

### 3. Popovers

Contenido emergente con más información:

\`\`\`html
<span style="anchor-name: --info-anchor">ℹ️</span>
<div class="popover" style="position-anchor: --info-anchor; position-area: right;">
  <h3>More Info</h3>
  <p>Detailed content here...</p>
</div>
\`\`\`

### 4. Context Menus

Menús que aparecen al right-click:

\`\`\`html
<div style="anchor-name: --context-target">Right-click me</div>
<menu style="position-anchor: --context-target; position-area: bottom right;">
  <li>Cut</li>
  <li>Copy</li>
  <li>Paste</li>
</menu>
\`\`\`

## Next Steps

Explora las siguientes secciones para dominar CSS Anchor Positioning:

1. **📐 Sistema Grid 3×3** - Entender todas las posiciones posibles
2. **🔄 Fallbacks Automáticos** - Prevenir overflow y mejorar UX
3. **⚡ Técnicas Avanzadas** - Corner positioning, multiple anchors, sizing dinámico

---

**Fuentes y Referencias**:
- [W3C CSS Anchor Positioning Spec](https://drafts.csswg.org/css-anchor-position-1/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- [Chrome Developers Blog](https://developer.chrome.com/blog/anchor-positioning-api)
- [CSS-Tricks Guide](https://css-tricks.com/css-anchor-positioning-guide/)
        `}
      </MarkdownContent>

      <Callout type="success">
        <p className="font-semibold mb-2">✨ Listo para empezar</p>
        <p className="text-sm">
          Explora las demos interactivas en la pestaña <strong>🎮 Demos</strong> para ver CSS Anchor
          Positioning en acción.
        </p>
      </Callout>
    </Card>
  );
}
