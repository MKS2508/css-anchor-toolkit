# Distance Control & Margin Magic

## ¿Qué es Distance Control?

En CSS Anchor Positioning, el **distance** (distancia o separación) entre el positioned element y su anchor se controla mediante **margin**. Este toolkit provee **5 tamaños predefinidos** via CSS custom properties para un control consistente y type-safe.

## Los 5 Tamaños de Distance

### Definición en CSS

```css
:root {
  --anchor-distance-sm: 0.25rem;   /* 4px */
  --anchor-distance-md: 0.5rem;    /* 8px - default */
  --anchor-distance-lg: 1rem;      /* 16px */
  --anchor-distance-xl: 1.5rem;    /* 24px */
  --anchor-distance-2xl: 2rem;     /* 32px */
}
```

### Type-Safe en TypeScript

```typescript
type DistanceSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const CSS_VARS = {
  distances: {
    sm: 'var(--anchor-distance-sm)',
    md: 'var(--anchor-distance-md)',
    lg: 'var(--anchor-distance-lg)',
    xl: 'var(--anchor-distance-xl)',
    '2xl': 'var(--anchor-distance-2xl)',
  },
} as const;
```

## Uso Básico

### CSS Puro

```css
.tooltip {
  position: absolute;
  position-anchor: --my-button;
  position-area: top;

  /* Margin determina la distancia */
  margin: var(--anchor-distance-md);  /* 8px de separación */
}
```

### SCSS Mixin

```scss
@use 'anchortoolkit.core.scss';

.tooltip {
  @include positioned(
    $anchor: --my-button,
    $area: top,
    $distance: md  // Type-safe: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  );
}
```

### TypeScript/React

```typescript
import { positionedStyles } from 'css-anchor-toolkit';

const tooltipStyles = positionedStyles({
  anchor: '--my-button',
  area: 'top',
  distance: 'lg'  // Autocomplete habilitado
});

// Genera:
{
  position: 'absolute',
  positionAnchor: '--my-button',
  positionArea: 'top',
  margin: 'var(--anchor-distance-lg)'  // 16px
}
```

## Margin Magic Vertical

El **"margin magic"** es una técnica para crear **arrows verticales (top/bottom)** sin pseudo-elements. Descubierta por Temani Afif en [css-tip.com](https://css-tip.com/tooltip-anchor-1/).

### Cómo Funciona

```css
.tooltip-with-arrow-vertical {
  position: absolute;
  position-anchor: --btn;
  position-area: top;

  /* Magic: margin negativo + inset crea espacio para el arrow */
  margin: calc(-1 * var(--anchor-distance-md));
  inset: auto;

  /* Pseudo-element para el contenido */
  &::before {
    content: '';
    position: absolute;
    inset: var(--anchor-distance-md);
    background: black;
    /* Resto de estilos del tooltip */
  }
}
```

**Resultado**: El margin negativo "empuja" el positioned element hacia el anchor, creando espacio visual que se llena con el pseudo-element, generando un efecto de arrow.

### Implementación en el Toolkit

```typescript
// Arrow 2-headed usa margin magic
export function arrow2HeadedStyles(
  size: ArrowSize,
  distance: DistanceSize
): CSSProperties {
  const sizeVar = CSS_VARS.arrowSizes[size];
  const distanceVar = CSS_VARS.distances[distance];

  return {
    margin: `calc(-1 * ${distanceVar})` as any,
    inset: 'auto' as any,
    // Pseudo-element configurado via ::before
  } as CSSProperties;
}
```

## Corner Positioning con √2

Para **diagonal arrows** en esquinas (top-left, top-right, bottom-left, bottom-right), se requiere un cálculo especial usando la **fórmula √2**.

### La Fórmula

```
cornerMargin = distance + (√2 - 1) × arrowSize
```

**Dónde**:
- `distance`: Separación base (ej: 8px para 'md')
- `√2 - 1 ≈ 0.41421356237`: Constante matemática
- `arrowSize`: Tamaño del arrow (ej: 12px para 'lg')

### Explicación Visual

```
        ┌──────────────┐
        │              │
        │    Anchor    │
        │              │
        └──────────────┘
             ╱
       Arrow (diagonal)
      ╱
┌────────────┐
│  Tooltip   │
└────────────┘

Distance diagonal = √2 × distance normal
```

### Implementación

```css
:root {
  --anchor-corner-magic: 0.41421356237;  /* √2 - 1 */
}

.tooltip-corner {
  position-area: top left;

  /* Corner margin usa la fórmula √2 */
  margin: calc(
    var(--anchor-distance-md) +
    var(--anchor-corner-magic) * var(--anchor-arrow-lg)
  );
}
```

### TypeScript Helper

```typescript
export function cornerMargin(
  distance: number,
  arrowSize: number
): string {
  const SQRT2_MINUS_1 = 0.41421356237;
  return `calc(${distance}px + ${SQRT2_MINUS_1} * ${arrowSize}px)`;
}

// Uso
cornerMargin(10, 12);
// → "calc(10px + 0.41421356237 * 12px)"
// → ~14.97px (10 + 4.97)
```

## Comparación Visual de Distances

### Demo Interactivo

El `TooltipDemo.tsx` incluye un selector de distance:

```tsx
const distances: DistanceSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];
const [distance, setDistance] = useState<DistanceSize>('md');

<Tooltip
  anchor="--btn"
  placement="top"
  distance={distance}
>
  Tooltip con {distance} distance
</Tooltip>

<select onChange={(e) => setDistance(e.target.value as DistanceSize)}>
  {distances.map(d => (
    <option key={d} value={d}>
      {d} - {getDistancePixels(d)}px
    </option>
  ))}
</select>
```

### Tabla de Valores

| DistanceSize | CSS Var | Píxeles | Rem | Uso Recomendado |
|--------------|---------|---------|-----|-----------------|
| `sm` | `--anchor-distance-sm` | 4px | 0.25rem | Tooltips compactos |
| `md` | `--anchor-distance-md` | 8px | 0.5rem | **Default** - uso general |
| `lg` | `--anchor-distance-lg` | 16px | 1rem | Popovers, cards |
| `xl` | `--anchor-distance-xl` | 24px | 1.5rem | Menús, panels grandes |
| `2xl` | `--anchor-distance-2xl` | 32px | 2rem | Máxima separación |

## Best Practices

### ✅ Do

```css
/* Usa CSS custom properties */
margin: var(--anchor-distance-md);

/* Coordina distance con arrow size */
.tooltip {
  margin: var(--anchor-distance-lg);  /* 16px */
}
.tooltip::before {
  width: var(--anchor-arrow-lg);      /* 12px */
  height: var(--anchor-arrow-lg);
}
```

### ❌ Don't

```css
/* No uses valores hardcoded */
margin: 8px;  /* ❌ Inconsistente */

/* No mezcles units */
margin-top: 1rem;
margin-left: 12px;  /* ❌ Mezcla rem y px */

/* No olvides corner positioning especial */
position-area: top left;
margin: var(--anchor-distance-md);  /* ❌ Debería usar cornerMargin() */
```

## Customización

### Override de Distances

Puedes sobrescribir las CSS custom properties:

```css
:root {
  /* Custom distances para tu diseño */
  --anchor-distance-sm: 0.5rem;    /* 8px en lugar de 4px */
  --anchor-distance-md: 1rem;      /* 16px en lugar de 8px */
  --anchor-distance-lg: 1.5rem;    /* 24px en lugar de 16px */
  --anchor-distance-xl: 2.5rem;    /* 40px en lugar de 24px */
  --anchor-distance-2xl: 3rem;     /* 48px en lugar de 32px */
}
```

**Ventaja**: Todos los componentes del toolkit usan estas variables, así que el override aplica globalmente.

## Recursos Relacionados

- **Demo**: `TooltipDemo.tsx` → Distance selector interactivo
- **Research Base**: [css-tip.com/tooltip-anchor-1/](https://css-tip.com/tooltip-anchor-1/) - Margin magic technique
- **Research Base**: [css-tip.com/tooltip-anchor-3/](https://css-tip.com/tooltip-anchor-3/) - Corner positioning √2
- **Siguiente**: [Corner Positioning →](./04-corner-positioning.md)

---

**Anterior**: [← Position-Area Grid](./02-position-area-grid.md)
**Siguiente**: [Corner Positioning →](./04-corner-positioning.md)
