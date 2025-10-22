# Scroll-Driven Animations con Anchors

## ¿Qué son Scroll-Driven Animations?

**Scroll-Driven Animations** es una especificación CSS del W3C que permite crear animaciones controladas por el **scroll del usuario** en lugar de tiempo. Combinada con **CSS Anchor Positioning**, permite crear efectos como:

- Position indicators que siguen elementos mientras scrolleas
- Progress bars anclados a secciones
- Tooltips que aparecen/desaparecen con scroll
- Efectos parallax anclados a elementos específicos

## Conceptos Clave

### view-timeline

`view-timeline` crea una **timeline basada en la visibilidad** de un elemento en el viewport.

```css
.card {
  /* Define una timeline llamada --card-timeline */
  view-timeline-name: --card-timeline;

  /* Eje del scroll (block = vertical, inline = horizontal) */
  view-timeline-axis: block;
}
```

**Valores de timeline**:
- `0%`: Elemento entra al viewport (bottom edge visible)
- `50%`: Elemento centrado en viewport
- `100%`: Elemento sale del viewport (top edge visible)

### animation-timeline

Vincula una animación CSS a una scroll timeline en lugar de tiempo:

```css
.animated-element {
  animation: fadeIn linear;

  /* Usa la timeline del scroll en lugar de duration */
  animation-timeline: --card-timeline;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Resultado**: La animación progresa con el scroll, no con tiempo.

## Integración con Anchor Positioning

### Caso de Uso: Position Indicator

Un indicator que se ancla a una card y aparece cuando la card está visible:

```css
/* El elemento card define el anchor Y la timeline */
.card {
  anchor-name: --card-1;
  view-timeline-name: --card-timeline;
  view-timeline-axis: block;
}

/* Indicator anclado que anima con scroll */
.position-indicator {
  position: absolute;
  position-anchor: --card-1;
  position-area: left;

  /* Animación controlada por scroll */
  animation: slideIn linear;
  animation-timeline: --card-timeline;

  /* Empieza invisible */
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes slideIn {
  /* Cuando card entra al viewport */
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }

  /* Cuando card está en viewport */
  50% {
    opacity: 1;
    transform: translateX(0);
  }

  /* Cuando card sale del viewport */
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
}
```

### Implementación en React

```tsx
export function ScrollDrivenCard({ id, title }: CardProps) {
  const anchorName = createAnchorName(`card-${id}`);
  const timelineName = `--card-${id}-timeline`;

  return (
    <>
      {/* Card con anchor + timeline */}
      <div
        style={{
          anchorName: anchorName,
          viewTimelineName: timelineName,
          viewTimelineAxis: 'block',
        }}
        className="scroll-card"
      >
        <h3>{title}</h3>
        <p>Scroll para ver el indicator...</p>
      </div>

      {/* Position indicator anclado */}
      <div
        style={{
          position: 'absolute',
          positionAnchor: anchorName,
          positionArea: 'left',
          animation: 'slideIn linear',
          animationTimeline: timelineName,
        }}
        className="position-indicator"
      >
        📍 {title}
      </div>
    </>
  );
}
```

## Casos de Uso Avanzados

### 1. Progress Bar Anclado

```tsx
function ProgressBar({ anchorName }: { anchorName: AnchorName }) {
  return (
    <div
      style={{
        position: 'absolute',
        positionAnchor: anchorName,
        positionArea: 'top',

        /* Progress bar crece con scroll */
        width: '0%',
        height: '4px',
        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',

        animation: 'growWidth linear',
        animationTimeline: '--section-timeline',
      }}
    />
  );
}

// CSS
@keyframes growWidth {
  from { width: 0%; }
  to { width: 100%; }
}
```

### 2. Tooltip que Aparece en Scroll

```tsx
function ScrollTooltip({ anchorName, content }: TooltipProps) {
  return (
    <div
      style={{
        position: 'absolute',
        positionAnchor: anchorName,
        positionArea: 'top',

        /* Tooltip invisible hasta scroll */
        opacity: 0,
        transform: 'translateY(-10px)',

        animation: 'fadeInUp linear',
        animationTimeline: '--element-timeline',
      }}
    >
      {content}
    </div>
  );
}

// CSS
@keyframes fadeInUp {
  0%, 30% {
    opacity: 0;
    transform: translateY(-10px);
  }
  40%, 80% {
    opacity: 1;
    transform: translateY(0);
  }
  90%, 100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
```

### 3. Scale Effect con Anchor

```tsx
function ScalingCard({ id }: CardProps) {
  const anchorName = createAnchorName(`card-${id}`);

  return (
    <>
      <div
        style={{
          anchorName: anchorName,
          viewTimelineName: `--card-${id}-timeline`,
          viewTimelineAxis: 'block',

          /* Scale controlado por scroll */
          animation: 'scaleOnScroll linear',
          animationTimeline: `--card-${id}-timeline`,
        }}
      >
        Card content
      </div>

      {/* Badge anclado que escala con la card */}
      <div
        style={{
          positionAnchor: anchorName,
          positionArea: 'top right',
          animation: 'scaleOnScroll linear',
          animationTimeline: `--card-${id}-timeline`,
        }}
      >
        🏷️
      </div>
    </>
  );
}

// CSS
@keyframes scaleOnScroll {
  0% { transform: scale(0.8); }
  50% { transform: scale(1); }
  100% { transform: scale(0.8); }
}
```

## Demo Completo: ScrollDrivenDemo.tsx

El demo incluye **3 secciones**:

### Section 1: Basic Position Indicators

Cards con indicators que aparecen al scrollear:

```tsx
{cards.map((card, index) => {
  const anchorName = createAnchorName(`card-${index}`);
  const timelineName = `--timeline-${index}`;

  return (
    <div key={index}>
      <div
        style={{
          anchorName,
          viewTimelineName: timelineName,
          viewTimelineAxis: 'block',
        }}
        className="card"
      >
        {card.content}
      </div>

      {showIndicators && (
        <div
          style={{
            positionAnchor: anchorName,
            positionArea: 'left',
            animationTimeline: timelineName,
          }}
          className="indicator"
        >
          📍 Card #{index + 1}
        </div>
      )}
    </div>
  );
})}
```

### Section 2: Progress Tracking

Progress bars que se llenan con el scroll:

```tsx
<div
  style={{
    anchorName: '--section',
    viewTimelineName: '--section-timeline',
  }}
  className="section"
>
  <h2>Section with Progress</h2>
  <p>Scroll to see progress bar fill...</p>
</div>

<div
  style={{
    positionAnchor: '--section',
    positionArea: 'top',
    animation: 'fillProgress linear',
    animationTimeline: '--section-timeline',
  }}
  className="progress-bar"
/>
```

### Section 3: Multiple Anchors en Scroll

Varios indicators siguiendo diferentes elementos:

```tsx
{['header', 'content', 'footer'].map((section) => {
  const anchorName = createAnchorName(section);
  const timelineName = `--${section}-timeline`;

  return (
    <div key={section}>
      <section
        style={{
          anchorName,
          viewTimelineName: timelineName,
        }}
      >
        {section.toUpperCase()}
      </section>

      <Tooltip
        anchor={anchorName}
        placement="right"
        style={{
          animationTimeline: timelineName,
        }}
      >
        Viewing: {section}
      </Tooltip>
    </div>
  );
})}
```

## Animation Timeline Ranges

Puedes controlar **cuándo** en el scroll progresa la animación:

```css
.indicator {
  animation: fadeIn linear;
  animation-timeline: --card-timeline;

  /* Solo anima cuando card está entre 25% y 75% del viewport */
  animation-range: entry 25% entry 75%;
}
```

**Rangos disponibles**:
- `entry`: Elemento entrando al viewport
- `exit`: Elemento saliendo del viewport
- `contain`: Elemento completamente visible
- `cover`: Todo el recorrido (default)

### Ejemplo con Ranges

```tsx
<div
  style={{
    positionAnchor: anchorName,
    positionArea: 'left',
    animation: 'slideIn linear',
    animationTimeline: timelineName,

    /* Anima solo en la entrada al viewport */
    animationRange: 'entry 0% entry 100%',
  }}
>
  Indicator (solo entrada)
</div>
```

## Browser Support

| Browser | Scroll-Driven Animations | View Timeline |
|---------|--------------------------|---------------|
| Chrome | 115+ | ✅ Soportado |
| Edge | 115+ | ✅ Soportado |
| Safari | ⏳ En desarrollo | ⏳ |
| Firefox | ⏳ En desarrollo | ⏳ |

**Polyfill**: Actualmente no hay polyfill robusto para scroll-driven animations. Considera usar progressive enhancement:

```typescript
const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()');

if (supportsScrollTimeline) {
  // Usar scroll-driven animations
} else {
  // Fallback a intersection observer + JS
}
```

## Best Practices

### ✅ Do

```css
/* Define timeline en el elemento visible */
.scroll-card {
  view-timeline-name: --card-timeline;
  view-timeline-axis: block;
}

/* Usa la timeline en anchored elements */
.indicator {
  animation-timeline: --card-timeline;
}

/* Usa animation-range para control fino */
.tooltip {
  animation-range: entry 25% exit 75%;
}
```

### ❌ Don't

```css
/* No combines animation-timeline con animation-duration */
.indicator {
  animation: fadeIn 1s;  /* ❌ duration se ignora con timeline */
  animation-timeline: --card-timeline;
}

/* No olvides fallback para navegadores sin soporte */
/* ❌ Sin feature detection */

/* No uses timelines en elementos fuera del viewport inicial */
/* ❌ Puede no funcionar como esperas */
```

## Recursos Relacionados

- **Demo**: `ScrollDrivenDemo.tsx` → 3 sections con ejemplos completos
- **W3C Spec**: [Scroll-driven Animations](https://drafts.csswg.org/scroll-animations-1/)
- **MDN**: [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- **Siguiente**: [Position-Try Fallbacks →](./06-position-try-fallbacks.md)

---

**Anterior**: [← Corner Positioning](./04-corner-positioning.md)
**Siguiente**: [Position-Try Fallbacks →](./06-position-try-fallbacks.md)
