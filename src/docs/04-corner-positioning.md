# Corner Positioning & Diagonal Arrows

## ¿Qué es Corner Positioning?

**Corner positioning** permite posicionar elementos en las **4 esquinas** de un anchor con **diagonal arrows** perfectamente alineados. Requiere una técnica especial basada en la **fórmula √2** descubierta por Temani Afif en [css-tip.com](https://css-tip.com/tooltip-anchor-3/).

## Las 4 Esquinas

```
     Column →
Row  ┌──────────────┬──────────────┬──────────────┐
↓    │              │              │              │
     │  top-left ↖  │     top      │  top-right ↗ │
     │              │              │              │
     ├──────────────┼──────────────┼──────────────┤
     │              │              │              │
     │     left     │   CENTER     │    right     │
     │              │   (anchor)   │              │
     ├──────────────┼──────────────┼──────────────┤
     │              │              │              │
     │ bottom-left↙ │   bottom     │bottom-right↘ │
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
```

**Esquinas**:
- `position-area: top left` → ↖ Arrow diagonal
- `position-area: top right` → ↗ Arrow diagonal
- `position-area: bottom left` → ↙ Arrow diagonal
- `position-area: bottom right` → ↘ Arrow diagonal

## El Problema de las Esquinas

### Arrows Normales (2-headed, 4-headed)

Los arrows **verticales/horizontales** funcionan bien en lados:

```css
/* Top arrow - funciona perfecto */
.tooltip-top {
  position-area: top;
  margin: var(--anchor-distance-md);  /* 8px */
}
```

**Resultado**: ✅ 8px de separación exacta

### Arrows Diagonales - Problema

Si usas el mismo margin en esquinas:

```css
/* Corner arrow - problema! */
.tooltip-corner {
  position-area: top left;
  margin: var(--anchor-distance-md);  /* 8px - ¡INCORRECTO! */
}
```

**Resultado**: ❌ El arrow diagonal NO toca el anchor porque la distancia diagonal es mayor.

## La Solución: Fórmula √2

### Geometría del Problema

```
Distance normal = 8px

  ┌─────────┐
  │ Anchor  │
  └─────────┘
      │
      │ 8px (vertical)
      ▼
  Tooltip


Distance diagonal ≠ 8px

  ┌─────────┐
  │ Anchor  │
  └─────────┘
        ╲
         ╲ ? px (diagonal)
          ▼
       Tooltip
```

**Teorema de Pitágoras**:
```
diagonal² = 8² + 8²
diagonal = √(64 + 64) = √128 = 8√2 ≈ 11.31px
```

### La Fórmula

Para que el arrow diagonal **toque exactamente** el anchor:

```
cornerMargin = distance + (√2 - 1) × arrowSize
```

**Dónde**:
- `distance`: Separación base deseada (ej: 8px)
- `√2 - 1 ≈ 0.41421356237`: Constante "magic number"
- `arrowSize`: Tamaño del arrow (ej: 12px)

**Ejemplo de cálculo**:
```
distance = 8px
arrowSize = 12px
√2 - 1 = 0.41421356237

cornerMargin = 8 + (0.41421356237 × 12)
             = 8 + 4.97
             ≈ 13px
```

## Implementación

### CSS Custom Property

```css
:root {
  --anchor-corner-magic: 0.41421356237;  /* √2 - 1 */
}

.tooltip-corner {
  position-area: top left;

  /* Margin con fórmula √2 */
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-lg)
  );
  /* ≈ 8px + 0.414 * 12px = 13px */
}
```

### SCSS Mixin

```scss
@mixin arrow-diagonal($size: md, $distance: md) {
  $size-var: var(--anchor-arrow-#{$size});
  $distance-var: var(--anchor-distance-#{$distance});

  // Fórmula √2
  margin: calc(
    #{$distance-var} +
    var(--anchor-corner-magic) * #{$size-var}
  );

  // Diagonal arrow con pseudo-element
  &::before {
    content: '';
    position: absolute;
    width: $size-var;
    height: $size-var;
    background: inherit;
    transform: rotate(45deg);
    // Posicionamiento según esquina
  }
}
```

### TypeScript Helper

```typescript
export function cornerMargin(
  distance: number,
  arrowSize: number
): string {
  const SQRT2_MINUS_1 = 0.41421356237;
  const adjustment = SQRT2_MINUS_1 * arrowSize;

  return `calc(${distance}px + ${SQRT2_MINUS_1} * ${arrowSize}px)`;
}

// Uso con CSS custom properties
export function cornerMarginWithVars(
  distance: DistanceSize,
  arrowSize: ArrowSize
): string {
  return `calc(
    ${CSS_VARS.distances[distance]} +
    ${CSS_VARS.cornerMagic} * ${CSS_VARS.arrowSizes[arrowSize]}
  )`;
}
```

## Diagonal Arrows en React

### Tooltip Component

```tsx
<Tooltip
  anchor="--btn"
  placement="top left"           // Corner position
  arrow={{ type: 'diagonal', size: 'lg' }}  // Diagonal arrow
  distance="md"                  // Base distance
>
  Corner tooltip con diagonal arrow
</Tooltip>
```

### Implementación Interna

```typescript
function TooltipArrow({ options, distance }: ArrowProps) {
  if (options.type === 'diagonal') {
    const cornerMarginValue = cornerMarginWithVars(
      distance,
      options.size || 'md'
    );

    return (
      <div
        className="tooltip-arrow-diagonal"
        style={{
          margin: cornerMarginValue,
          // Resto de estilos...
        }}
      />
    );
  }
  // ...
}
```

## Las 4 Esquinas - Implementación Completa

### Top Left (↖)

```css
.tooltip-top-left {
  position-area: top left;
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-md)
  );

  &::before {
    /* Diagonal arrow en bottom-right del tooltip */
    bottom: calc(-1 * var(--anchor-arrow-md) / 2);
    right: calc(-1 * var(--anchor-arrow-md) / 2);
    transform: rotate(45deg);
  }
}
```

### Top Right (↗)

```css
.tooltip-top-right {
  position-area: top right;
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-md)
  );

  &::before {
    /* Diagonal arrow en bottom-left del tooltip */
    bottom: calc(-1 * var(--anchor-arrow-md) / 2);
    left: calc(-1 * var(--anchor-arrow-md) / 2);
    transform: rotate(45deg);
  }
}
```

### Bottom Left (↙)

```css
.tooltip-bottom-left {
  position-area: bottom left;
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-md)
  );

  &::before {
    /* Diagonal arrow en top-right del tooltip */
    top: calc(-1 * var(--anchor-arrow-md) / 2);
    right: calc(-1 * var(--anchor-arrow-md) / 2);
    transform: rotate(45deg);
  }
}
```

### Bottom Right (↘)

```css
.tooltip-bottom-right {
  position-area: bottom right;
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-md)
  );

  &::before {
    /* Diagonal arrow en top-left del tooltip */
    top: calc(-1 * var(--anchor-arrow-md) / 2);
    left: calc(-1 * var(--anchor-arrow-md) / 2);
    transform: rotate(45deg);
  }
}
```

## Comparación Visual

### Arrow Normal vs Diagonal

```
Top Position (vertical arrow)
┌─────────┐
│ Tooltip │
│    ▼    │  ← 2-headed arrow
└─────────┘
     │ distance = 8px
┌─────────┐
│ Anchor  │
└─────────┘


Top-Left Position (diagonal arrow)
┌─────────┐
│ Tooltip │
│       ╲ │  ← Diagonal arrow
└─────────┘
         ╲ distance = 13px (con √2 formula)
    ┌─────────┐
    │ Anchor  │
    └─────────┘
```

## Demo Interactivo

El `TooltipDemo.tsx` incluye un selector de arrow types:

```tsx
const arrowTypes: ArrowType[] = ['2-headed', '4-headed', 'diagonal'];
const [arrowType, setArrowType] = useState<ArrowType>('2-headed');
const [placement, setPlacement] = useState<PositionAreaValue>('top');

// Auto-switch a diagonal cuando se selecciona esquina
useEffect(() => {
  const isCorner = ['top left', 'top right', 'bottom left', 'bottom right']
    .includes(placement);

  if (isCorner) {
    setArrowType('diagonal');
  }
}, [placement]);

<Tooltip
  anchor="--btn"
  placement={placement}
  arrow={{ type: arrowType, size: 'md' }}
>
  {arrowType} arrow en {placement}
</Tooltip>
```

## Best Practices

### ✅ Do

```tsx
// Usa diagonal arrow para esquinas
<Tooltip
  placement="top left"
  arrow={{ type: 'diagonal' }}  // ✅ Correcto
/>

// Usa 2-headed o 4-headed para lados
<Tooltip
  placement="top"
  arrow={{ type: '2-headed' }}  // ✅ Correcto
/>
```

### ❌ Don't

```tsx
// No uses arrows normales en esquinas
<Tooltip
  placement="top left"
  arrow={{ type: '2-headed' }}  // ❌ No se verá bien
/>

// No uses diagonal arrow en lados normales
<Tooltip
  placement="top"
  arrow={{ type: 'diagonal' }}  // ❌ Innecesario
/>

// No olvides la fórmula √2 en esquinas
<Tooltip
  placement="top left"
  arrow={{ type: 'diagonal' }}
  // ❌ Sin cornerMargin puede verse desalineado
/>
```

## Recursos Relacionados

- **Demo**: `TooltipDemo.tsx` → Arrow type selector con preview
- **Research**: [css-tip.com/tooltip-anchor-3/](https://css-tip.com/tooltip-anchor-3/) - Corner positioning technique
- **Matemáticas**: Teorema de Pitágoras aplicado a CSS
- **Siguiente**: [Scroll-Driven Animations →](./05-scroll-driven-animations.md)

---

**Anterior**: [← Margin Magic](./03-margin-magic.md)
**Siguiente**: [Scroll-Driven Animations →](./05-scroll-driven-animations.md)
