# Position-Try Fallbacks

## ¿Qué son Position-Try Fallbacks?

**Position-try fallbacks** es el sistema de **posicionamiento alternativo automático** de CSS Anchor Positioning. Cuando un positioned element no cabe en su posición primaria (ej: overflow del viewport), el navegador automáticamente **prueba posiciones alternativas** sin necesidad de JavaScript.

## El Problema del Overflow

### Sin Fallbacks

```css
.tooltip {
  position-anchor: --btn;
  position-area: bottom;  /* Siempre abajo */
}
```

**Problema**: Si el botón está cerca del bottom del viewport, el tooltip se sale de pantalla.

```
┌─────────────────────────────┐
│         Viewport            │
│                             │
│     ┌─────┐                 │
│     │ Btn │                 │
└─────┴─────┴─────────────────┘
      │
      ▼
  ┌─────────┐  ← Fuera del viewport!
  │ Tooltip │
  └─────────┘
```

### Con Fallbacks Automáticos

```css
.tooltip {
  position-anchor: --btn;
  position-area: bottom;

  /* Si bottom no cabe, prueba top */
  position-try-fallbacks: flip-block;
}
```

**Resultado**: El navegador automáticamente posiciona el tooltip **arriba** si abajo no cabe.

```
  ┌─────────┐  ← Tooltip flip automático
  │ Tooltip │
  └─────────┘
      ▲
┌─────┴─────┬─────────────────┐
│   ┌─────┐ │    Viewport     │
│   │ Btn │ │                 │
│   └─────┘ │                 │
└───────────┴─────────────────┘
```

## Flip Tactics Predefinidos

### 1. `flip-block`

Flip en el **eje block** (vertical en LTR):
- `top` ↔ `bottom`
- `block-start` ↔ `block-end`

```css
.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block;
  /* Si top no cabe → intenta bottom */
}
```

### 2. `flip-inline`

Flip en el **eje inline** (horizontal en LTR):
- `left` ↔ `right`
- `inline-start` ↔ `inline-end`

```css
.tooltip {
  position-area: right;
  position-try-fallbacks: flip-inline;
  /* Si right no cabe → intenta left */
}
```

### 3. `flip-start`

Flip al **inicio** de ambos ejes:
- `bottom` → `top`
- `right` → `left`

```css
.popover {
  position-area: bottom right;
  position-try-fallbacks: flip-start;
  /* Si bottom-right no cabe → intenta top-left */
}
```

## Combinación de Fallbacks

Puedes combinar múltiples tactics para **máxima flexibilidad**:

```css
.tooltip {
  position-area: bottom;

  /* Prueba en orden: flip vertical, flip horizontal, inicio */
  position-try-fallbacks: flip-block, flip-inline, flip-start;
}
```

**Orden de prueba**:
1. `bottom` (posición original)
2. `top` (flip-block)
3. `left` o `right` (flip-inline)
4. `top left` (flip-start)

El navegador **se detiene en la primera** que cabe completamente en viewport.

## Custom @position-try Rules

Puedes definir **posiciones fallback custom** con `@position-try`:

### Sintaxis

```css
@position-try --custom-fallback {
  position-area: <value>;
  /* Opcionalmente otras propiedades */
  margin: <value>;
  inset: <value>;
}
```

### Ejemplo: Fallback con Offset

```css
/* Define custom fallback con offset horizontal */
@position-try --offset-right {
  position-area: bottom;
  margin-left: 50px;  /* Offset a la derecha */
}

.tooltip {
  position-area: bottom;

  /* Usa custom fallback */
  position-try-fallbacks: --offset-right, flip-block;
}
```

**Orden de prueba**:
1. `bottom` (original)
2. `bottom` con offset de 50px (custom)
3. `top` (flip-block)

### Ejemplo: Corner Fallback

```css
/* Fallback para esquinas */
@position-try --flipped-corner {
  position-area: top left;
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-md)
  );
}

.tooltip-corner {
  position-area: bottom right;
  position-try-fallbacks: --flipped-corner;
  /* Si bottom-right no cabe → top-left con corner margin */
}
```

## Implementación en TypeScript

### buildFallbacks() Helper

```typescript
export type FallbackTactic =
  | 'flip-block'
  | 'flip-inline'
  | 'flip-start'
  | `--${string}`;  // Custom @position-try names

export function buildFallbacks(
  tactics: FallbackTactic[] | 'auto'
): string {
  if (tactics === 'auto') {
    // Default: flip block, inline, start
    return 'flip-block, flip-inline, flip-start';
  }

  return tactics.join(', ');
}

// Uso
buildFallbacks('auto');
// → "flip-block, flip-inline, flip-start"

buildFallbacks(['flip-block', '--custom-offset']);
// → "flip-block, --custom-offset"
```

### React Component con Fallbacks

```tsx
<Tooltip
  anchor="--btn"
  placement="bottom"
  fallbacks="auto"  // Usa defaults
>
  Tooltip con fallbacks automáticos
</Tooltip>

// O custom fallbacks
<Tooltip
  anchor="--btn"
  placement="bottom right"
  fallbacks={['--corner-flip', 'flip-block', 'flip-inline']}
>
  Tooltip con fallbacks custom
</Tooltip>
```

## Demo Completo: PositionTryDemo.tsx

El demo incluye **4 escenarios**:

### Scenario 1: Basic Flip

```tsx
function BasicFlipDemo() {
  return (
    <div className="container">
      {/* Botón cerca del bottom */}
      <button
        style={{ anchorName: '--btn-bottom', marginTop: '80vh' }}
      >
        Botón cerca del bottom
      </button>

      <Tooltip
        anchor="--btn-bottom"
        placement="bottom"
        fallbacks="auto"
      >
        Tooltip con flip automático
      </Tooltip>
    </div>
  );
}
```

**Resultado**: Tooltip se muestra arriba automáticamente.

### Scenario 2: Custom Position Rules

```tsx
<style>{`
  @position-try --shifted-right {
    position-area: bottom;
    margin-left: 80px;
  }

  @position-try --shifted-left {
    position-area: bottom;
    margin-right: 80px;
  }
`}</style>

<Tooltip
  anchor="--btn-edge"
  placement="bottom"
  fallbacks={['--shifted-right', '--shifted-left', 'flip-block']}
>
  Tooltip con custom offsets
</Tooltip>
```

### Scenario 3: Corner Fallbacks

```tsx
<style>{`
  @position-try --flipped-to-top-left {
    position-area: top left;
    margin: calc(
      var(--anchor-distance-md) +
      var(--anchor-corner-magic) * var(--anchor-arrow-md)
    );
  }
`}</style>

<Tooltip
  anchor="--btn-corner"
  placement="bottom right"
  arrow={{ type: 'diagonal', size: 'md' }}
  fallbacks={['--flipped-to-top-left']}
>
  Corner tooltip con flip diagonal
</Tooltip>
```

### Scenario 4: Multiple Anchors con Fallbacks

```tsx
{anchors.map((anchor, index) => {
  const anchorName = createAnchorName(`anchor-${index}`);

  return (
    <div key={index}>
      <div
        style={{
          anchorName,
          position: randomPosition(),  // Posición aleatoria
        }}
      >
        Anchor #{index + 1}
      </div>

      <Popover
        anchor={anchorName}
        area="bottom"
        fallbacks="auto"
        open={openIndex === index}
      >
        Popover #{index + 1} con fallbacks
      </Popover>
    </div>
  );
})}
```

## Position-Visibility Integration

Combina fallbacks con **position-visibility** para ocultar elementos que no caben:

```css
.tooltip {
  position-area: bottom;
  position-try-fallbacks: flip-block, flip-inline;

  /* Ocultar si ningún fallback cabe */
  position-visibility: no-overflow;
}
```

**Valores**:
- `always`: Siempre visible (default)
- `no-overflow`: Ocultar si overflow
- `anchors-visible`: Ocultar si anchor no visible

### React Implementation

```tsx
<Tooltip
  anchor="--btn"
  placement="bottom"
  fallbacks="auto"
  visibility="no-overflow"  // Ocultar si no cabe
>
  Tooltip que se oculta si overflow
</Tooltip>
```

## Advanced: Fallback con Animations

Puedes animar la transición entre posiciones:

```css
.tooltip {
  position-area: bottom;
  position-try-fallbacks: flip-block;

  /* Anima el cambio de posición */
  transition: position-area 0.2s ease,
              inset 0.2s ease;
}
```

**Resultado**: Smooth transition cuando el tooltip hace flip.

## Best Practices

### ✅ Do

```css
/* Usa auto para comportamiento predecible */
position-try-fallbacks: flip-block, flip-inline, flip-start;

/* Define custom rules para casos específicos */
@position-try --my-fallback {
  position-area: top;
  margin-left: 20px;
}

/* Combina position-visibility para UX */
position-visibility: no-overflow;
```

### ❌ Don't

```css
/* No dejes tooltips sin fallbacks */
.tooltip {
  position-area: bottom;
  /* ❌ Sin fallbacks puede overflow */
}

/* No uses demasiados fallbacks custom */
position-try-fallbacks: --f1, --f2, --f3, --f4, --f5, --f6;
/* ❌ Complejo de mantener */

/* No olvides coordinar con arrow positioning */
position-area: bottom;
position-try-fallbacks: flip-block;
/* ❌ Arrow puede no match la posición final */
```

## Helper: Auto Fallbacks en React

```typescript
export function getAutoFallbacks(
  placement: PositionAreaValue
): FallbackTactic[] {
  // Detecta si es corner
  const isCorner = ['top left', 'top right', 'bottom left', 'bottom right']
    .includes(placement);

  if (isCorner) {
    // Corners necesitan flip especial
    return ['flip-start', 'flip-block', 'flip-inline'];
  }

  // Lados normales
  return ['flip-block', 'flip-inline', 'flip-start'];
}

// Uso en Tooltip
function Tooltip({ placement, fallbacks = 'auto', ...props }) {
  const fallbacksList = fallbacks === 'auto'
    ? getAutoFallbacks(placement)
    : fallbacks;

  return (
    <div
      style={{
        positionArea: placement,
        positionTryFallbacks: buildFallbacks(fallbacksList),
      }}
    >
      {/* ... */}
    </div>
  );
}
```

## Browser Support

| Browser | position-try-fallbacks | @position-try |
|---------|------------------------|---------------|
| Chrome | 125+ | ✅ Soportado |
| Edge | 125+ | ✅ Soportado |
| Safari | Technology Preview | ✅ Experimental |
| Firefox | ⏳ En desarrollo | ⏳ |

## Recursos Relacionados

- **Demo**: `PositionTryDemo.tsx` → 4 scenarios con custom rules
- **W3C Spec**: [position-try-fallbacks](https://drafts.csswg.org/css-anchor-position-1/#fallback-rule)
- **Siguiente**: [Advanced Techniques →](./07-advanced-techniques.md)

---

**Anterior**: [← Scroll-Driven Animations](./05-scroll-driven-animations.md)
**Siguiente**: [Advanced Techniques →](./07-advanced-techniques.md)
