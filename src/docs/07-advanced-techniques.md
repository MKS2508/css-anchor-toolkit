# Advanced Techniques

## Multiple Anchors

Un positioned element puede referenciar **múltiples anchors** para diferentes propósitos.

### Anchor para Position, Otro para Size

```css
.tooltip {
  /* Position relativa a botón */
  position-anchor: --btn;
  position-area: top;

  /* Width igual al container */
  width: anchor-size(--container width);
}
```

### Uso en React

```tsx
<div style={{ anchorName: '--container', width: '400px' }}>
  <button style={{ anchorName: '--btn' }}>
    Trigger
  </button>
</div>

<Tooltip
  anchor="--btn"
  placement="top"
  style={{
    width: anchorSizeFunction('--container', 'width'),
  }}
>
  Tooltip del ancho del container
</Tooltip>
```

## Dynamic Anchor Switching

Cambia el anchor dinámicamente con JavaScript:

### React Implementation

```tsx
function DynamicAnchorDemo() {
  const [activeAnchor, setActiveAnchor] = useState<AnchorName>('--btn-1');

  return (
    <>
      {[1, 2, 3].map((num) => {
        const anchorName = createAnchorName(`btn-${num}`);

        return (
          <button
            key={num}
            style={{ anchorName }}
            onClick={() => setActiveAnchor(anchorName)}
            className={activeAnchor === anchorName ? 'active' : ''}
          >
            Button {num}
          </button>
        );
      })}

      <Tooltip
        anchor={activeAnchor}
        placement="top"
        style={{
          /* Anima la transición entre anchors */
          transition: 'inset 0.3s ease',
        }}
      >
        Tooltip siguiendo button activo
      </Tooltip>
    </>
  );
}
```

**Resultado**: El tooltip "salta" suavemente entre botones al hacer click.

## anchor-size() Function

La función `anchor-size()` permite **igualar dimensiones** del anchor:

### Sintaxis

```css
width: anchor-size(--anchor-name width);
height: anchor-size(--anchor-name height);

/* Con fallback */
width: anchor-size(--anchor-name width, 200px);
```

### Casos de Uso

#### 1. Tooltip del Mismo Ancho que Anchor

```css
.tooltip {
  position-anchor: --input;
  position-area: bottom;

  /* Width igual al input */
  width: anchor-size(--input width);
  min-width: 200px;  /* Ancho mínimo */
}
```

#### 2. Popover Proporcional

```css
.popover {
  position-anchor: --card;
  position-area: top;

  /* Width = 80% del anchor width */
  width: calc(anchor-size(--card width) * 0.8);
}
```

#### 3. Height Matching

```css
.sidebar-tooltip {
  position-anchor: --sidebar;
  position-area: right;

  /* Altura igual al sidebar */
  height: anchor-size(--sidebar height);
}
```

### TypeScript Helper

```typescript
export function anchorSizeFunction(
  anchorName: AnchorName | undefined,
  dimension: 'width' | 'height',
  fallback?: string
): string {
  const name = anchorName || 'implicit';

  if (fallback) {
    return `anchor-size(${name} ${dimension}, ${fallback})`;
  }

  return `anchor-size(${name} ${dimension})`;
}

// Uso
anchorSizeFunction('--btn', 'width');
// → "anchor-size(--btn width)"

anchorSizeFunction('--btn', 'width', '100px');
// → "anchor-size(--btn width, 100px)"
```

## anchor() Function para Custom Positioning

Para positioning más complejo que `position-area`, usa `anchor()`:

### Sintaxis

```css
top: anchor(--anchor-name bottom);
left: anchor(--anchor-name left);
right: anchor(--anchor-name right, 0px);
```

### Ejemplo: Offset Custom

```css
.custom-tooltip {
  position: absolute;

  /* Top alineado con bottom del anchor + 20px */
  top: calc(anchor(--btn bottom) + 20px);

  /* Left alineado con center horizontal del anchor */
  left: calc(
    anchor(--btn left) +
    (anchor-size(--btn width) / 2) -
    (100px / 2)  /* Centra tooltip de 100px */
  );
}
```

### React con Helpers

```typescript
import { anchorFunction, anchorSizeFunction } from 'css-anchor-toolkit';

const customStyles: CSSProperties = {
  position: 'absolute',

  // Top = bottom del anchor + distance
  top: `calc(${anchorFunction('--btn', 'bottom')} + var(--anchor-distance-md))`,

  // Centrado horizontal
  left: `calc(
    ${anchorFunction('--btn', 'left')} +
    (${anchorSizeFunction('--btn', 'width')} / 2) -
    (${tooltipWidth}px / 2)
  )`,
} as CSSProperties;

<div style={customStyles}>Custom positioned tooltip</div>
```

## Anchor con Pseudo-Elements

Los pseudo-elements pueden ser anchors:

```css
.card::before {
  content: '';
  anchor-name: --card-indicator;
  position: absolute;
  /* ... */
}

.tooltip {
  position-anchor: --card-indicator;
  position-area: right;
}
```

**Uso**: Anclar tooltips a iconos, badges, o elementos decorativos.

## Scroll Containers con Anchors

Anchors **funcionan dentro de scroll containers**:

```tsx
function ScrollableList() {
  return (
    <div className="overflow-auto h-96">
      {items.map((item) => {
        const anchorName = createAnchorName(`item-${item.id}`);

        return (
          <div key={item.id}>
            <div
              style={{ anchorName }}
              className="list-item"
            >
              {item.name}
            </div>

            {item.showTooltip && (
              <Tooltip anchor={anchorName} placement="right">
                Details: {item.description}
              </Tooltip>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

**Resultado**: Tooltips se mueven automáticamente con el scroll.

## Position Anchor Inheritance

Usa `anchor(implicit)` para referenciar el anchor más cercano:

```css
.parent {
  anchor-name: --parent-anchor;
}

.child {
  /* No especifica position-anchor */
  position-area: top;

  /* Usa implicit anchor (heredado del contexto) */
  top: anchor(implicit bottom);
}
```

**Útil para**: Componentes reutilizables que no conocen el anchor name.

## Coordinating Multiple Positioned Elements

Múltiples elementos anclados al mismo anchor:

```tsx
function MultiPositionedDemo() {
  const anchorName = createAnchorName('main-element');

  return (
    <>
      <div style={{ anchorName }} className="main">
        Main Element
      </div>

      {/* Badge en top-right */}
      <div
        style={{
          positionAnchor: anchorName,
          positionArea: 'top right',
        }}
        className="badge"
      >
        🔴 1
      </div>

      {/* Tooltip en bottom */}
      <Tooltip anchor={anchorName} placement="bottom">
        Main tooltip
      </Tooltip>

      {/* Secondary info en left */}
      <div
        style={{
          positionAnchor: anchorName,
          positionArea: 'left',
        }}
        className="info"
      >
        ℹ️ Info
      </div>
    </>
  );
}
```

## Z-Index Management

Gestiona el stacking order de anchored elements:

```css
.anchor-element {
  anchor-name: --btn;
  z-index: 1;
}

.tooltip {
  position-anchor: --btn;
  position-area: top;
  z-index: 1000;  /* Encima de otros elementos */
}

.tooltip-overlay {
  position-anchor: --btn;
  position-area: center;
  z-index: 999;  /* Detrás del tooltip, sobre el anchor */
}
```

## Performance Tips

### ✅ Do

```typescript
// Reutiliza anchor names
const anchorName = useMemo(() => createAnchorName('my-element'), []);

// Usa CSS custom properties para values dinámicos
style={{
  '--dynamic-distance': `${distance}px`,
  margin: 'var(--dynamic-distance)',
}}

// Evita re-renders innecesarios
const MemoizedTooltip = memo(Tooltip);
```

### ❌ Don't

```typescript
// No crees anchor names en cada render
const anchorName = createAnchorName('my-element');  // ❌

// No uses inline objects en style
style={{ margin: '8px' }}  // ❌ Re-crea objeto cada render

// No olvides memoization en computed styles
const styles = positionedStyles({ ... });  // ❌ Recalcula cada render
```

## Accessibility Considerations

### aria-describedby con Anchors

```tsx
function AccessibleTooltip({ anchor, children, id }: Props) {
  return (
    <>
      <button
        aria-describedby={id}
        style={{ anchorName: anchor }}
      >
        Hover me
      </button>

      <Tooltip
        anchor={anchor}
        placement="top"
        role="tooltip"
        id={id}
      >
        {children}
      </Tooltip>
    </>
  );
}
```

### Keyboard Navigation

```tsx
function KeyboardAwarePopover() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();  // Return focus
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ anchorName: '--trigger' }}
      >
        Open Popover
      </button>

      {open && (
        <Popover
          anchor="--trigger"
          area="bottom"
          onClose={() => setOpen(false)}
        >
          Popover content
        </Popover>
      )}
    </>
  );
}
```

## CSS Grid + Anchors

Combina CSS Grid con anchor positioning:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  anchor-name: --grid-item;
}

.grid-tooltip {
  position-anchor: --grid-item;
  position-area: top;

  /* Width adaptado al grid cell */
  width: anchor-size(--grid-item width);
}
```

## Recursos Relacionados

- **Demo**: `AdvancedDemo.tsx` → Multiple anchors, dynamic switching, anchor-size()
- **W3C Spec**: [CSS Anchor Positioning](https://drafts.csswg.org/css-anchor-position-1/)
- **API Reference**: [Complete API →](./08-api-reference.md)

---

**Anterior**: [← Position-Try Fallbacks](./06-position-try-fallbacks.md)
**Siguiente**: [API Reference →](./08-api-reference.md)
