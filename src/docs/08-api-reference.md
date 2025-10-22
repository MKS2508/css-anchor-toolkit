# API Reference

Documentación completa de todas las funciones, types, componentes y mixins del **CSS Anchor Positioning Toolkit**.

---

## TypeScript API

### Core Types

#### `PositionAreaValue`

Type union de todas las position-area values soportadas (50+ valores).

```typescript
type PositionAreaValue =
  | 'top' | 'bottom' | 'left' | 'right' | 'center'
  | 'top left' | 'top right' | 'top center'
  | 'bottom left' | 'bottom right' | 'bottom center'
  | 'left center' | 'right center'
  | 'block-start' | 'block-end' | 'inline-start' | 'inline-end'
  | 'start' | 'end' | 'self-start' | 'self-end'
  | 'span-top' | 'span-bottom' | 'span-left' | 'span-right' | 'span-all'
  | 'top span-left' | 'top span-right'
  | 'bottom span-left' | 'bottom span-right'
  | 'left span-top' | 'left span-bottom'
  | 'right span-top' | 'right span-bottom'
  | 'block-start inline-start' | 'block-start inline-end'
  | 'block-end inline-start' | 'block-end inline-end'
  | /* ... más valores ... */;
```

**Ver**: `src/lib/anchor-types.ts` para la lista completa.

#### `DistanceSize`

Tamaños predefinidos de distance (margin).

```typescript
type DistanceSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
```

**Valores en píxeles**:
- `sm`: 4px (0.25rem)
- `md`: 8px (0.5rem) — **default**
- `lg`: 16px (1rem)
- `xl`: 24px (1.5rem)
- `2xl`: 32px (2rem)

#### `ArrowSize`

Tamaños de arrow para tooltips.

```typescript
type ArrowSize = 'sm' | 'md' | 'lg' | 'xl';
```

**Valores en píxeles**:
- `sm`: 6px
- `md`: 8px — **default**
- `lg`: 12px
- `xl`: 16px

#### `ArrowType`

Tipos de arrow basados en el research de css-tip.com.

```typescript
type ArrowType = '2-headed' | '4-headed' | 'diagonal';
```

- **2-headed**: Margin magic vertical (top/bottom arrows)
- **4-headed**: Polygon 12 puntos (arrows en 4 direcciones)
- **diagonal**: √2 formula para corner positioning

#### `JustifyValue`

Valores de justify-self.

```typescript
type JustifyValue = 'start' | 'end' | 'center' | 'stretch' | 'anchor-center';
```

#### `AlignValue`

Valores de align-self.

```typescript
type AlignValue = 'start' | 'end' | 'center' | 'stretch' | 'anchor-center';
```

#### `AnchorName`

Branded type para anchor names (strings con formato `--kebab-case`).

```typescript
type AnchorName = `--${string}`;
```

#### `PositionedOptions`

Interface para opciones de posicionamiento.

```typescript
interface PositionedOptions {
  anchor: AnchorName;
  area?: PositionAreaValue;
  distance?: DistanceSize;
  fallbacks?: FallbackTactic[] | 'auto';
  visibility?: PositionVisibility;
  justify?: JustifyValue;
  align?: AlignValue;
}
```

#### `ArrowOptions`

Interface para configuración de arrows.

```typescript
interface ArrowOptions {
  type: ArrowType;
  size?: ArrowSize;
  distance?: DistanceSize;
}
```

---

### Helper Functions

#### `createAnchorName()`

Genera un anchor name válido en formato `--kebab-case`.

```typescript
function createAnchorName(base: string): AnchorName
```

**Parámetros**:
- `base`: String base que se limpiará y formateará

**Retorna**: `AnchorName` (string con formato `--kebab-case`)

**Ejemplo**:
```typescript
createAnchorName('My Button')  // → '--my-button'
createAnchorName('user_123')   // → '--user-123'
```

#### `positionedStyles()`

Genera estilos inline de React para positioned elements.

```typescript
function positionedStyles(options: PositionedOptions): CSSProperties
```

**Parámetros**:
- `options`: Objeto `PositionedOptions` con configuración

**Retorna**: Objeto `CSSProperties` para React inline styles

**Ejemplo**:
```typescript
const styles = positionedStyles({
  anchor: '--my-btn',
  area: 'top',
  distance: 'md',
  fallbacks: 'auto',
  justify: 'center'
});

<div style={styles}>Positioned content</div>
```

#### `anchorStyles()`

Genera estilos inline para anchor elements.

```typescript
function anchorStyles(anchorName: AnchorName): CSSProperties
```

**Ejemplo**:
```typescript
const styles = anchorStyles('--my-anchor');
<div style={styles}>Anchor element</div>
```

#### `buildFallbacks()`

Genera string CSS para `position-try-fallbacks`.

```typescript
function buildFallbacks(tactics: FallbackTactic[] | 'auto'): string
```

**Parámetros**:
- `tactics`: Array de tactics o `'auto'` para defaults

**Retorna**: String CSS (ej: `"flip-block, flip-inline"`)

**Ejemplo**:
```typescript
buildFallbacks('auto')
// → "flip-block, flip-inline, flip-start"

buildFallbacks(['flip-block', 'flip-inline'])
// → "flip-block, flip-inline"
```

#### `cornerMargin()`

Calcula margin para corner positioning con diagonal arrows (fórmula √2).

```typescript
function cornerMargin(distance: number, arrowSize: number): string
```

**Fórmula**: `distance + (√2 - 1) × arrowSize`

**Ejemplo**:
```typescript
cornerMargin(10, 12)
// → "calc(10px + 0.41421356237 * 12px)"
```

**Fuente**: [css-tip.com/tooltip-anchor-3/](https://css-tip.com/tooltip-anchor-3/)

#### `anchorFunction()`

Construye un `anchor()` function string.

```typescript
function anchorFunction(
  anchorName: AnchorName | undefined,
  side: AnchorSide,
  fallback?: string
): string
```

**Ejemplo**:
```typescript
anchorFunction('--btn', 'bottom', '100%')
// → "anchor(--btn bottom, 100%)"
```

#### `anchorSizeFunction()`

Construye un `anchor-size()` function string.

```typescript
function anchorSizeFunction(
  anchorName: AnchorName | undefined,
  dimension: AnchorDimension,
  fallback?: string
): string
```

**Ejemplo**:
```typescript
anchorSizeFunction('--btn', 'width')
// → "anchor-size(--btn width)"
```

#### `supportsAnchorPositioning()`

Detecta si el navegador soporta CSS Anchor Positioning.

```typescript
function supportsAnchorPositioning(): boolean
```

**Retorna**: `true` si soportado, `false` si no

**Ejemplo**:
```typescript
if (supportsAnchorPositioning()) {
  // Usar anchor positioning nativo
} else {
  // Cargar polyfill o usar fallback
}
```

---

### CSS-in-JS Functions

#### `anchorCSS()`

Genera CSS string para styled-components/emotion.

```typescript
function anchorCSS(name: AnchorName): string
```

**Ejemplo**:
```typescript
const Button = styled.button`
  ${anchorCSS('--my-btn')}
  padding: 12px;
`;
```

#### `positionedCSS()`

Genera CSS string completo para positioned elements.

```typescript
function positionedCSS(options: PositionedOptions): string
```

**Ejemplo**:
```typescript
const Tooltip = styled.div`
  ${positionedCSS({
    anchor: '--btn',
    area: 'top',
    distance: 'md',
    fallbacks: 'auto'
  })}
  background: black;
  color: white;
`;
```

#### `arrowCSS()`

Genera CSS para tooltip arrows (pseudo-element).

```typescript
function arrowCSS(
  type: ArrowType,
  size?: ArrowSize,
  distance?: DistanceSize
): string
```

**Ejemplo**:
```typescript
const Tooltip = styled.div`
  /* ... otros estilos ... */

  &::before {
    ${arrowCSS('2-headed', 'md', 'sm')}
  }
`;
```

---

## React Components

### `<Tooltip>`

Tooltip component con CSS Anchor Positioning y 3 tipos de arrows.

#### Props

```typescript
interface TooltipProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición del tooltip en el grid 3×3 (50+ valores disponibles) */
  placement?: PositionAreaValue;

  /** Arrow configuration - boolean para arrow simple o ArrowOptions para control completo */
  arrow?: boolean | ArrowOptions;

  /** Distancia usando CSS custom properties (sm, md, lg, xl, 2xl) */
  distance?: DistanceSize;

  /** Contenido del tooltip */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}
```

#### Uso

```tsx
// Tooltip básico
<Tooltip anchor="--btn" placement="top">
  Basic tooltip
</Tooltip>

// Tooltip con arrow
<Tooltip anchor="--btn" placement="top" arrow distance="md">
  Tooltip con arrow default (2-headed)
</Tooltip>

// Tooltip con arrow customizado
<Tooltip
  anchor="--btn"
  placement="top left"
  arrow={{ type: 'diagonal', size: 'lg' }}
  distance="xl"
>
  Corner tooltip con diagonal arrow
</Tooltip>
```

#### Hook: `useTooltipHover()`

Hook para controlar visibilidad del tooltip con hover.

```typescript
function useTooltipHover(delay?: number): [boolean, { onMouseEnter, onMouseLeave }]
```

**Parámetros**:
- `delay`: Delay en ms antes de mostrar tooltip (default: 200ms)

**Retorna**: `[show, handlers]`

**Ejemplo**:
```tsx
const [show, tooltipHandlers] = useTooltipHover(300);

<button {...tooltipHandlers} style={{ anchorName: '--btn' }}>
  Hover me
</button>

{show && (
  <Tooltip anchor="--btn">Content</Tooltip>
)}
```

---

### `<Popover>`

Popover component con fallbacks automáticos.

#### Props

```typescript
interface PopoverProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia usando CSS custom properties */
  distance?: DistanceSize;

  /** Habilitar fallbacks automáticos */
  fallbacks?: boolean;

  /** Control de visibilidad según estado del anchor */
  visibility?: PositionVisibility;

  /** Mostrar el popover */
  open: boolean;

  /** Callback al cerrar */
  onClose?: () => void;

  /** Cerrar al hacer click fuera */
  closeOnOutsideClick?: boolean;

  /** Contenido */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}
```

#### Uso

```tsx
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)} style={{ anchorName: '--trigger' }}>
  Open Popover
</button>

<Popover
  anchor="--trigger"
  area="bottom"
  distance="md"
  open={open}
  onClose={() => setOpen(false)}
>
  Popover content
</Popover>
```

#### Hook: `usePopover()`

Hook para manejar estado del popover.

```typescript
function usePopover(initialState?: boolean): [
  boolean,           // open
  () => void,        // toggle
  () => void,        // close
  () => void         // openPopover
]
```

**Ejemplo**:
```tsx
const [open, toggle, close, openPopover] = usePopover(false);

<button onClick={toggle}>Toggle</button>
<Popover anchor="--btn" open={open} onClose={close}>
  Content
</Popover>
```

---

### `<ContextMenu>`

Context menu component con right-click support.

#### Props

```typescript
interface ContextMenuProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición preferida en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia usando CSS custom properties */
  distance?: DistanceSize;

  /** Tipo de trigger */
  trigger?: 'click' | 'contextmenu';

  /** Callback al cerrar */
  onClose?: () => void;

  /** Contenido del menú */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}
```

#### Componentes Auxiliares

```typescript
// MenuItem
interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

// MenuSeparator
function MenuSeparator(): JSX.Element
```

#### Uso

```tsx
const { isOpen, anchorName, openMenu, closeMenu } = useContextMenu();

<div onContextMenu={openMenu}>
  Right click me
</div>

{isOpen && (
  <ContextMenu anchor={anchorName} onClose={closeMenu}>
    <MenuItem onClick={() => console.log('Action 1')}>
      Action 1
    </MenuItem>
    <MenuSeparator />
    <MenuItem icon={<Icon />} disabled>
      Action 2
    </MenuItem>
  </ContextMenu>
)}
```

#### Hook: `useContextMenu()`

Hook para manejar estado del context menu.

```typescript
function useContextMenu(): {
  isOpen: boolean;
  anchorName: AnchorName;
  openMenu: (event: React.MouseEvent) => void;
  closeMenu: () => void;
}
```

---

## SCSS API

### Mixins

#### `@mixin positioned()`

Genera estilos para positioned elements.

```scss
@include positioned(
  $anchor: AnchorName,
  $area: PositionAreaValue,
  $distance: DistanceSize,
  $fallbacks: 'auto' | FallbackTactic[],
  $visibility: PositionVisibility,
  $justify: JustifyValue,
  $align: AlignValue
)
```

**Ejemplo**:
```scss
.tooltip {
  @include positioned(
    $anchor: --my-btn,
    $area: top,
    $distance: md,
    $fallbacks: auto
  );
  background: black;
  color: white;
}
```

#### `@mixin arrow-2headed()`

Arrow con margin magic vertical.

```scss
@include arrow-2headed($size, $distance)
```

#### `@mixin arrow-4headed()`

Arrow con polygon de 12 puntos (4 direcciones).

```scss
@include arrow-4headed($size, $distance)
```

#### `@mixin arrow-diagonal()`

Arrow diagonal con fórmula √2.

```scss
@include arrow-diagonal($size, $distance)
```

### Variables CSS

```scss
// Distances
--anchor-distance-sm: 0.25rem;   // 4px
--anchor-distance-md: 0.5rem;    // 8px
--anchor-distance-lg: 1rem;      // 16px
--anchor-distance-xl: 1.5rem;    // 24px
--anchor-distance-2xl: 2rem;     // 32px

// Arrow Sizes
--anchor-arrow-sm: 6px;
--anchor-arrow-md: 8px;
--anchor-arrow-lg: 12px;
--anchor-arrow-xl: 16px;

// Corner Magic (√2 - 1 constant)
--anchor-corner-magic: 0.41421356237;

// Transitions
--anchor-transition-fast: 150ms ease;
--anchor-transition-base: 200ms ease;
--anchor-transition-slow: 300ms ease;
```

### Utility Classes

```scss
// Position-area classes
.positioned { position: absolute; }
.anchor-top { position-area: top; }
.anchor-bottom { position-area: bottom; }
.anchor-left { position-area: left; }
.anchor-right { position-area: right; }
// ... 50+ utility classes ...

// Distance classes
.anchor-distance-sm { margin: var(--anchor-distance-sm); }
.anchor-distance-md { margin: var(--anchor-distance-md); }
.anchor-distance-lg { margin: var(--anchor-distance-lg); }
.anchor-distance-xl { margin: var(--anchor-distance-xl); }
.anchor-distance-2xl { margin: var(--anchor-distance-2xl); }

// Fallback classes
.flip-auto { position-try-fallbacks: flip-block, flip-inline, flip-start; }
.flip-block { position-try-fallbacks: flip-block; }
.flip-inline { position-try-fallbacks: flip-inline; }
```

---

## Constants

### `CSS_VARS`

Objeto con todas las CSS custom properties.

```typescript
const CSS_VARS = {
  distances: {
    sm: 'var(--anchor-distance-sm)',
    md: 'var(--anchor-distance-md)',
    lg: 'var(--anchor-distance-lg)',
    xl: 'var(--anchor-distance-xl)',
    '2xl': 'var(--anchor-distance-2xl)',
  },
  arrowSizes: {
    sm: 'var(--anchor-arrow-sm)',
    md: 'var(--anchor-arrow-md)',
    lg: 'var(--anchor-arrow-lg)',
    xl: 'var(--anchor-arrow-xl)',
  },
  cornerMagic: 'var(--anchor-corner-magic)',
  transitions: {
    fast: 'var(--anchor-transition-fast)',
    base: 'var(--anchor-transition-base)',
    slow: 'var(--anchor-transition-slow)',
  },
} as const;
```

### `POSITION_AREAS`

Array readonly de todos los position-area values.

```typescript
const POSITION_AREAS: readonly PositionAreaValue[] = [
  'top', 'bottom', 'left', 'right', 'center',
  'top left', 'top right', 'bottom left', 'bottom right',
  // ... 50+ valores
] as const;
```

### `FALLBACK_TACTICS`

Array de fallback tactics por defecto.

```typescript
const FALLBACK_TACTICS: readonly FallbackTactic[] = [
  'flip-block',
  'flip-inline',
  'flip-start',
] as const;
```

---

**Anterior**: [← Position-Area Grid](./02-position-area-grid.md)
