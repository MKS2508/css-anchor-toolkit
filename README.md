# ⚓ CSS Anchor Positioning Toolkit

> Type-safe CSS Anchor Positioning para React, TypeScript y SCSS

<div align="center">

![Version](https://img.shields.io/badge/version-0.1--beta-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Bun](https://img.shields.io/badge/Bun-1.3-black)
![CSS Anchor Positioning](https://img.shields.io/badge/CSS-Anchor%20Positioning-purple)
![Bundle Size](https://img.shields.io/badge/bundle-0KB-green)

</div>

---

## ¿Qué es esto?

**CSS Anchor Positioning Toolkit** es una biblioteca completa para trabajar con la especificación [CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-position-1/) del W3C. Provee **3 capas de integración**:

1. **SCSS Mixins** - Para usar directamente en tus estilos
2. **TypeScript Helpers** - Funciones type-safe para generar estilos
3. **React Components** - Componentes listos para usar (Tooltip, Popover, ContextMenu)

### ¿Por qué usar este toolkit?

✅ **Type-Safe** - 10+ types, 16+ functions, autocomplete completo
✅ **576 Configuraciones** - 36 position-area × 4 justify × 4 align
✅ **3 Arrow Types** - 2-headed (margin magic), 4-headed (polygon), diagonal (√2)
✅ **0KB Bundle** - CSS nativo, sin JavaScript para positioning
✅ **Performance** - El navegador maneja el positioning de forma nativa
✅ **Documentación Completa** - 7 docs markdown + demos interactivos

---

## 📦 Instalación

```bash
# Con Bun (recomendado)
bun install

# Con npm
npm install

# Con pnpm
pnpm install
```

### Polyfill para Navegadores sin Soporte

```bash
npm install @oddbird/css-anchor-positioning
```

Importa el polyfill en tu entrada principal:

```typescript
import '@oddbird/css-anchor-positioning/polyfill';
```

---

## 🚀 Quick Start

### React Component

```tsx
import { Tooltip } from 'css-anchor-toolkit';

function App() {
  return (
    <>
      <button style={{ anchorName: '--btn' }}>
        Hover me
      </button>

      <Tooltip
        anchor="--btn"
        placement="top"
        arrow
        distance="md"
      >
        Tooltip content
      </Tooltip>
    </>
  );
}
```

### TypeScript Helper

```typescript
import { positionedStyles, createAnchorName } from 'css-anchor-toolkit';

const anchorName = createAnchorName('my-button');

const styles = positionedStyles({
  anchor: anchorName,
  area: 'top',
  distance: 'md',
  fallbacks: 'auto',
});

// Usa styles en tus componentes
<div style={styles}>Positioned element</div>
```

### SCSS Mixin

```scss
@use 'anchortoolkit.core.scss';

.my-tooltip {
  @include positioned(
    $anchor: --my-btn,
    $area: top,
    $distance: md,
    $fallbacks: auto
  );

  background: black;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}
```

---

## 💡 Casos de Uso

### 1. Tooltips Básicos

Tooltips que siguen elementos hover/focus con fallbacks automáticos.

```tsx
import { Tooltip, useTooltipHover } from 'css-anchor-toolkit';

function TooltipExample() {
  const [show, handlers] = useTooltipHover(300); // 300ms delay

  return (
    <>
      <button
        {...handlers}
        style={{ anchorName: '--btn' }}
      >
        Hover me
      </button>

      {show && (
        <Tooltip
          anchor="--btn"
          placement="top"
          arrow={{ type: '2-headed', size: 'md' }}
          distance="md"
        >
          Tooltip con arrow vertical
        </Tooltip>
      )}
    </>
  );
}
```

**Features**:
- Delay configurable antes de mostrar
- Arrow con 3 tipos (2-headed, 4-headed, diagonal)
- 5 tamaños de distance (sm, md, lg, xl, 2xl)
- 50+ positions disponibles

### 2. Popovers con Fallbacks Automáticos

Paneles contextuales que se reposicionan automáticamente al hacer overflow.

```tsx
import { Popover, usePopover } from 'css-anchor-toolkit';

function PopoverExample() {
  const [open, toggle, close] = usePopover(false);

  return (
    <>
      <button
        onClick={toggle}
        style={{ anchorName: '--trigger' }}
      >
        Open Popover
      </button>

      {open && (
        <Popover
          anchor="--trigger"
          area="bottom"
          distance="md"
          fallbacks="auto"  // flip-block, flip-inline, flip-start
          open={open}
          onClose={close}
          closeOnOutsideClick
        >
          <div style={{ padding: '16px', minWidth: '200px' }}>
            <h3>Popover Content</h3>
            <p>Este popover se reposiciona automáticamente.</p>
            <button onClick={close}>Close</button>
          </div>
        </Popover>
      )}
    </>
  );
}
```

**Features**:
- Fallbacks automáticos (flip-block, flip-inline, flip-start)
- Close on outside click
- Close on Escape key
- Visibility control (no-overflow, anchors-visible)

### 3. Context Menus

Menús contextuales anclados a click derecho o elementos específicos.

```tsx
import { ContextMenu, MenuItem, MenuSeparator, useContextMenu } from 'css-anchor-toolkit';

function ContextMenuExample() {
  const { isOpen, anchorName, openMenu, closeMenu } = useContextMenu();

  return (
    <>
      <div
        onContextMenu={openMenu}
        style={{
          padding: '40px',
          background: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        Right click me
      </div>

      {isOpen && (
        <ContextMenu
          anchor={anchorName}
          area="bottom right"
          onClose={closeMenu}
        >
          <MenuItem onClick={() => console.log('Action 1')}>
            Action 1
          </MenuItem>
          <MenuItem onClick={() => console.log('Action 2')}>
            Action 2
          </MenuItem>
          <MenuSeparator />
          <MenuItem disabled>
            Disabled Action
          </MenuItem>
        </ContextMenu>
      )}
    </>
  );
}
```

**Features**:
- Right-click trigger
- Close on click outside
- Close on Escape
- Disabled items support
- Separators

### 4. Scroll-Driven Position Indicators

Indicators que aparecen/desaparecen con scroll usando view-timeline.

```tsx
import { createAnchorName } from 'css-anchor-toolkit';

function ScrollDrivenExample() {
  const cards = ['Card 1', 'Card 2', 'Card 3'];

  return (
    <div style={{ height: '200vh', overflowY: 'auto' }}>
      {cards.map((card, index) => {
        const anchorName = createAnchorName(`card-${index}`);
        const timelineName = `--timeline-${index}`;

        return (
          <div key={index} style={{ marginBottom: '100px' }}>
            {/* Card con anchor + timeline */}
            <div
              style={{
                anchorName,
                viewTimelineName: timelineName,
                viewTimelineAxis: 'block',
                padding: '40px',
                background: '#e0e0e0',
                borderRadius: '12px',
              }}
            >
              {card}
            </div>

            {/* Indicator anclado que anima con scroll */}
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'left',
                animation: 'slideIn linear',
                animationTimeline: timelineName,
              }}
            >
              📍 {card}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          50% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-20px); }
        }
      `}</style>
    </div>
  );
}
```

**Features**:
- view-timeline integration
- animation-timeline control
- Automatic scroll-based animations
- No JavaScript calculations

### 5. Custom @position-try Rules

Define tus propias reglas de fallback para casos específicos.

```tsx
function CustomFallbackExample() {
  return (
    <>
      <style>{`
        @position-try --shifted-right {
          position-area: bottom;
          margin-left: 80px;
        }

        @position-try --shifted-left {
          position-area: bottom;
          margin-right: 80px;
        }

        @position-try --flipped-to-top {
          position-area: top;
        }
      `}</style>

      <button style={{ anchorName: '--btn-edge' }}>
        Button near edge
      </button>

      <div
        style={{
          position: 'absolute',
          positionAnchor: '--btn-edge',
          positionArea: 'bottom',
          positionTryFallbacks: '--shifted-right, --shifted-left, --flipped-to-top',
        }}
      >
        Popover con custom fallbacks
      </div>
    </>
  );
}
```

**Features**:
- Custom position-try rules con @position-try
- Fallback sequences personalizadas
- Offset y margin custom por fallback
- Máximo control sobre reposicionamiento

---

## 🎯 Features Principales

### 576 Configuraciones Únicas

```typescript
// 36 position-area values
type PositionAreaValue =
  | 'top' | 'bottom' | 'left' | 'right' | 'center'
  | 'top left' | 'top right' | 'bottom left' | 'bottom right'
  | 'top center' | 'bottom center' | 'left center' | 'right center'
  | 'span-top' | 'span-bottom' | 'span-left' | 'span-right' | 'span-all'
  // ... 50+ valores total

// × 4 justify-self values
type JustifyValue = 'start' | 'center' | 'end' | 'anchor-center';

// × 4 align-self values
type AlignValue = 'start' | 'center' | 'end' | 'anchor-center';

// = 576 combinaciones únicas
```

Ver **GridDemo.tsx** para un selector interactivo de las 576 configuraciones.

### 3 Arrow Types

Basados en el research de [css-tip.com](https://css-tip.com):

1. **2-headed** - Margin magic vertical (top/bottom arrows)
2. **4-headed** - Polygon de 12 puntos (arrows en 4 direcciones)
3. **diagonal** - Fórmula √2 para corner positioning

```tsx
<Tooltip arrow={{ type: 'diagonal', size: 'lg' }} />
```

### Type-Safe API

```typescript
// Autocomplete completo con TypeScript
const styles = positionedStyles({
  anchor: '--btn',
  area: 'top left',  // ✅ Autocomplete de 50+ valores
  distance: 'xl',    // ✅ Autocomplete de 5 tamaños
  fallbacks: 'auto', // ✅ Type-safe
});
```

---

## 📖 Documentación

### Guías Completas

Todas las guías están en `src/docs/`:

1. **[Introducción](./src/docs/01-introduction.md)** - ¿Qué es CSS Anchor Positioning?
2. **[Position-Area Grid](./src/docs/02-position-area-grid.md)** - Grid 3×3 y 576 configuraciones
3. **[Margin Magic](./src/docs/03-margin-magic.md)** - Distance control y CSS custom properties
4. **[Corner Positioning](./src/docs/04-corner-positioning.md)** - Diagonal arrows con √2
5. **[Scroll-Driven Animations](./src/docs/05-scroll-driven-animations.md)** - view-timeline integration
6. **[Position-Try Fallbacks](./src/docs/06-position-try-fallbacks.md)** - Sistema de fallbacks
7. **[Advanced Techniques](./src/docs/07-advanced-techniques.md)** - Multiple anchors, dynamic switching
8. **[API Reference](./src/docs/08-api-reference.md)** - Documentación completa de la API

### Demos Interactivos

Todas las demos están en `src/demos/`:

- **ShowcaseDemo.tsx** - Showcase principal con 9 cards interactivas
- **TooltipDemo.tsx** - 5 demos de tooltips (básico, arrows, direcciones, draggable, configs)
- **GridDemo.tsx** - Selector interactivo de 576 configuraciones
- **FallbackDemo.tsx** - Sistema de fallbacks automáticos
- **AdvancedDemo.tsx** - Corner positioning, multiple anchors, anchor-size()
- **ScrollDrivenDemo.tsx** - Scroll-driven animations con view-timeline
- **PositionTryDemo.tsx** - Custom @position-try rules

---

## 🌐 Browser Support

| Browser | CSS Anchor Positioning | View Timeline |
|---------|------------------------|---------------|
| **Chrome** | 125+ | ✅ Soportado |
| **Edge** | 125+ | ✅ Soportado |
| **Safari** | Technology Preview | ✅ Experimental |
| **Firefox** | ⏳ En desarrollo | ⏳ |

**Polyfill**: [@oddbird/css-anchor-positioning](https://github.com/oddbird/css-anchor-positioning)

```bash
npm install @oddbird/css-anchor-positioning
```

---

## 🛠️ Development

```bash
# Instalar dependencias
bun install

# Iniciar dev server
bun run dev

# Build
bun run build

# Type check
bun run type-check
```

---

## 📚 Recursos

- **W3C Spec**: [CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-position-1/)
- **Can I Use**: [Browser compatibility](https://caniuse.com/css-anchor-positioning)
- **Research Base**: [css-tip.com](https://css-tip.com) - 3 técnicas de arrows implementadas

---

## 🤝 Contribuir

Contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una branch para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📄 License

MIT License - Ver [LICENSE](./LICENSE) para detalles.

---

<div align="center">

**Hecho con ⚓ y TypeScript**

[Documentation](./src/docs/) • [Demos](./src/demos/) • [API Reference](./src/docs/08-api-reference.md)

</div>
