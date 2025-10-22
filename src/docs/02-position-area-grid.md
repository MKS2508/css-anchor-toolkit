# Position-Area Grid System

## El Grid 3×3 Implícito

`position-area` crea un **grid implícito de 9 celdas (3×3)** alrededor de cualquier anchor element. Este grid permite posicionar elementos en **36+ posiciones diferentes**.

```
     Column →
Row  ┌──────────────┬──────────────┬──────────────┐
↓    │              │              │              │
     │  top-left    │  top-center  │  top-right   │
     │              │              │              │
     ├──────────────┼──────────────┼──────────────┤
     │              │              │              │
     │  left-center │  CENTER      │  right-center│
     │              │  (anchor)    │              │
     ├──────────────┼──────────────┼──────────────┤
     │              │              │              │
     │  bottom-left │ bottom-center│  bottom-right│
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
```

## Position-Area Values

### 1. Single Keyword (9 valores)

Posición en una sola celda del grid:

```css
position-area: top;          /* Celda superior central */
position-area: bottom;       /* Celda inferior central */
position-area: left;         /* Celda izquierda central */
position-area: right;        /* Celda derecha central */
position-area: center;       /* Celda central (sobre el anchor) */

position-area: block-start;  /* Equivalente lógico a 'top' */
position-area: block-end;    /* Equivalente lógico a 'bottom' */
position-area: inline-start; /* Equivalente lógico a 'left' */
position-area: inline-end;   /* Equivalente lógico a 'right' */
```

### 2. Two Keywords (Combinaciones - 16 valores)

Posición en esquinas o lados específicos:

```css
/* Esquinas */
position-area: top left;
position-area: top right;
position-area: bottom left;
position-area: bottom right;

/* Lados con alignment específico */
position-area: top center;
position-area: bottom center;
position-area: left center;
position-area: right center;

/* Logical properties equivalentes */
position-area: block-start inline-start;  /* top left */
position-area: block-start inline-end;    /* top right */
position-area: block-end inline-start;    /* bottom left */
position-area: block-end inline-end;      /* bottom right */
```

### 3. Spanning (Extender a múltiples celdas - 20+ valores)

Keywords `span-*` extienden el elemento a través de múltiples celdas:

```css
/* Spanning simple */
position-area: span-top;      /* 3 celdas superiores */
position-area: span-bottom;   /* 3 celdas inferiores */
position-area: span-left;     /* 3 celdas izquierdas */
position-area: span-right;    /* 3 celdas derechas */
position-area: span-all;      /* Todas las 9 celdas */

/* Combinaciones spanning */
position-area: top span-left;       /* Fila top, columnas left+center */
position-area: top span-right;      /* Fila top, columnas center+right */
position-area: bottom span-left;    /* Fila bottom, columnas left+center */
position-area: bottom span-right;   /* Fila bottom, columnas center+right */

position-area: left span-top;       /* Columna left, filas top+center */
position-area: left span-bottom;    /* Columna left, filas center+bottom */
position-area: right span-top;      /* Columna right, filas top+center */
position-area: right span-bottom;   /* Columna right, filas center+bottom */

/* Spanning con position específica */
position-area: span-top left;       /* Top row, left column solo */
position-area: span-bottom right;   /* Bottom row, right column solo */
```

## Las 576 Configuraciones

**Este toolkit soporta 576 combinaciones posibles**:
- **36 position-area values**
- **× 4 justify-self values** (start, center, end, anchor-center)
- **× 4 align-self values** (start, center, end, anchor-center)
- **= 576 configuraciones únicas**

### justify-self y align-self

Dentro de cada celda del grid, puedes controlar el alignment:

```css
.positioned {
  position-area: top;
  justify-self: start;   /* Alinea al inicio del eje inline */
  align-self: center;    /* Centra en el eje block */
}
```

#### justify-self Values

| Value | Descripción |
|-------|-------------|
| `start` | Inicio del eje inline (left en LTR) |
| `center` | Centrado en eje inline |
| `end` | Final del eje inline (right en LTR) |
| `anchor-center` | Centrado respecto al anchor center |

#### align-self Values

| Value | Descripción |
|-------|-------------|
| `start` | Inicio del eje block (top) |
| `center` | Centrado en eje block |
| `end` | Final del eje block (bottom) |
| `anchor-center` | Centrado respecto al anchor center |

### Ejemplo: 16 Configuraciones de una Posición

Para `position-area: top` hay **16 configuraciones** posibles:

```css
/* 1 */ position-area: top; justify-self: start; align-self: start;
/* 2 */ position-area: top; justify-self: start; align-self: center;
/* 3 */ position-area: top; justify-self: start; align-self: end;
/* 4 */ position-area: top; justify-self: start; align-self: anchor-center;

/* 5 */ position-area: top; justify-self: center; align-self: start;
/* 6 */ position-area: top; justify-self: center; align-self: center;
/* 7 */ position-area: top; justify-self: center; align-self: end;
/* 8 */ position-area: top; justify-self: center; align-self: anchor-center;

/* ... y así hasta 16 combinaciones */
```

**Ver GridDemo.tsx** para un selector interactivo de las 576 configuraciones.

## Uso en el Toolkit

### SCSS

```scss
@use 'anchortoolkit.core.scss';

.tooltip {
  @include positioned(
    $anchor: --btn,
    $area: top left,        // Position-area value
    $justify: center,       // justify-self
    $align: start,          // align-self
    $distance: md
  );
}
```

### TypeScript/React

```typescript
import { positionedStyles } from 'css-anchor-toolkit';

const styles = positionedStyles({
  anchor: '--btn',
  area: 'top left',    // PositionAreaValue (type-safe)
  justify: 'center',   // JustifyValue (type-safe)
  align: 'start',      // AlignValue (type-safe)
  distance: 'md'
});
```

### React Components

```tsx
import { Tooltip } from 'css-anchor-toolkit';

// Simple (defaults: placement="top", distance="md")
<Tooltip anchor="--btn">Content</Tooltip>

// Con todas las options
<Tooltip
  anchor="--btn"
  placement="top left"    // Cualquier PositionAreaValue
  distance="xl"
  arrow={{ type: '2-headed', size: 'lg' }}
>
  Corner tooltip con arrow
</Tooltip>
```

## Logical vs Physical Properties

### Physical Properties (Físicas)
Basadas en dirección física de pantalla:
- `top`, `bottom`, `left`, `right`
- Siempre iguales independientemente de writing-mode o direction

### Logical Properties (Lógicas)
Se adaptan a writing-mode y direction:
- `block-start`, `block-end` (vertical axis)
- `inline-start`, `inline-end` (horizontal axis)

**Ejemplo**:
```css
/* En LTR (Left-To-Right): */
position-area: inline-start;  /* = left */
position-area: inline-end;    /* = right */

/* En RTL (Right-To-Left): */
position-area: inline-start;  /* = right */
position-area: inline-end;    /* = left */
```

**Recomendación**: Usa logical properties para internacionalización (i18n).

## Distance (Margin) Control

El toolkit provee **5 tamaños predefinidos** de distance vía CSS custom properties:

```scss
// En _config.scss
--anchor-distance-sm: 0.25rem;   // 4px
--anchor-distance-md: 0.5rem;    // 8px
--anchor-distance-lg: 1rem;      // 16px
--anchor-distance-xl: 1.5rem;    // 24px
--anchor-distance-2xl: 2rem;     // 32px
```

**Uso**:
```css
.tooltip {
  position-anchor: --btn;
  position-area: top;
  margin: var(--anchor-distance-md);  /* 8px separation */
}
```

**En TypeScript/React**, usa el type `DistanceSize`:
```typescript
type DistanceSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

distance: 'xl'  // Type-safe, auto-complete habilitado
```

## Visualización Interactiva

### GridDemo.tsx

El demo `GridDemo.tsx` incluye un **visualizador de 576 configuraciones** con:

1. **Selector de position-area** (36 opciones)
2. **Selector de justify-self** (4 opciones)
3. **Selector de align-self** (4 opciones)
4. **Preview en tiempo real**
5. **Contador de configuración** (ej: "123 / 576")
6. **Botón "Random"** para explorar aleatoriamente

**Navegación**:
- Flechas ← → para cambiar valores
- Selectores dropdown para saltos rápidos
- Visualización de CSS generado en tiempo real

## Best Practices

### ✅ Do

```css
/* Use logical properties para i18n */
position-area: block-start;

/* Combina position-area con justify/align para control preciso */
position-area: top;
justify-self: center;
align-self: start;

/* Usa CSS custom properties para distances */
margin: var(--anchor-distance-md);
```

### ❌ Don't

```css
/* No combines position-area con inset manual */
position-area: top;
top: 0;  /* ❌ Conflicto - position-area ya define top */

/* No uses valores hardcoded de margin */
margin: 8px;  /* ❌ Usa CSS custom properties */

/* No olvides fallbacks para overflow */
position-area: bottom;
/* ❌ Sin position-try-fallbacks puede salirse de viewport */
```

## Recursos Relacionados

- **Demo Interactivo**: `GridDemo.tsx` → Selector de 576 configuraciones
- **W3C Spec**: [position-area definition](https://drafts.csswg.org/css-anchor-position-1/#position-area)
- **Fallbacks**: `06-position-try-fallbacks.md` → Cómo manejar overflow

---

**Anterior**: [← Introducción](./01-introduction.md)
**Siguiente**: [API Reference →](./08-api-reference.md)
