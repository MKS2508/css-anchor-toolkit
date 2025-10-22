import { MarkdownContent, Callout } from '../components/MarkdownContent';
import { Card } from '../components/ui/card';

export function GridSystemDoc() {
  return (
    <Card className="p-8">
      <MarkdownContent>
        {`
# 📐 Sistema Grid 3×3: position-area

El corazón de CSS Anchor Positioning es el **sistema grid 3×3** que define cómo se posicionan los elementos alrededor de su anchor.

## Concepto del Grid

Imagina un grid de 9 celdas (3×3) donde el **anchor ocupa la celda central**:

\`\`\`
┌─────────┬─────────┬─────────┐
│ top     │  top    │ top     │
│  left   │         │  right  │
├─────────┼─────────┼─────────┤
│         │         │         │
│  left   │ ANCHOR  │  right  │
│         │         │         │
├─────────┼─────────┼─────────┤
│ bottom  │ bottom  │ bottom  │
│  left   │         │  right  │
└─────────┴─────────┴─────────┘
\`\`\`

## position-area: La Propiedad Clave

\`position-area\` acepta **1 o 2 keywords** para especificar la posición:

### 1 Keyword (Direcciones Cardinales)

\`\`\`css
.tooltip {
  position-area: top;    /* Arriba, centrado horizontalmente */
  position-area: bottom; /* Abajo, centrado horizontalmente */
  position-area: left;   /* Izquierda, centrado verticalmente */
  position-area: right;  /* Derecha, centrado verticalmente */
  position-area: center; /* Centrado sobre el anchor */
}
\`\`\`

### 2 Keywords (Esquinas y Posiciones Específicas)

\`\`\`css
.tooltip {
  position-area: top left;      /* Esquina superior izquierda */
  position-area: top right;     /* Esquina superior derecha */
  position-area: bottom left;   /* Esquina inferior izquierda */
  position-area: bottom right;  /* Esquina inferior derecha */
}
\`\`\`

## Keywords Físicos vs Lógicos

CSS Anchor Positioning soporta tanto keywords **físicos** como **lógicos**:

### Keywords Físicos (Direcciones Absolutas)

\`\`\`css
/* Siempre se refieren a direcciones fijas */
top, bottom, left, right, center
\`\`\`

**Ventaja**: Intuitivos, fáciles de entender

**Desventaja**: No se adaptan a diferentes writing modes (RTL, vertical, etc.)

### Keywords Lógicos (Direcciones Relativas)

\`\`\`css
/* Se adaptan al writing mode del documento */
block-start    /* Equivale a top en LTR horizontal */
block-end      /* Equivale a bottom en LTR horizontal */
inline-start   /* Equivale a left en LTR */
inline-end     /* Equivale a right en LTR */
\`\`\`

**Ventaja**: Internacionalización automática (soportan RTL, vertical-rl, etc.)

**Ejemplo con RTL**:
\`\`\`css
/* En documento LTR */
position-area: inline-end;  /* Se posiciona a la derecha */

/* En documento RTL (árabe, hebreo) */
position-area: inline-end;  /* Se posiciona a la izquierda automáticamente */
\`\`\`

## Spanning: Extender Múltiples Celdas

Usa \`span-*\` para hacer que el elemento **ocupe múltiples celdas**:

### span-top / span-bottom / span-left / span-right

\`\`\`css
.wide-tooltip {
  position-area: span-top;  /* Ocupa top-left + top + top-right */
}

.tall-menu {
  position-area: span-left; /* Ocupa top-left + left + bottom-left */
}
\`\`\`

### span-all

\`\`\`css
.overlay {
  position-area: span-all;  /* Ocupa todas las 9 celdas */
}
\`\`\`

### Combinaciones de Spanning

\`\`\`css
.banner {
  position-area: top span-left;  /* Top izquierda extendido */
  /* Equivale a: top-left + top */
}

.sidebar {
  position-area: left span-all;  /* Sidebar completo en left */
  /* Equivale a: top-left + left + bottom-left */
}
\`\`\`

## Las 36 Combinaciones Posibles

El sistema permite **36 combinaciones** diferentes de posicionamiento:

### 9 Posiciones Simples
\`\`\`
top-left, top, top-right,
left, center, right,
bottom-left, bottom, bottom-right
\`\`\`

### 12 Spanning Horizontal
\`\`\`
top span-left, top span-right,
center span-left, center span-right,
bottom span-left, bottom span-right,
span-top left, span-top center, span-top right,
span-bottom left, span-bottom center, span-bottom right
\`\`\`

### 12 Spanning Vertical
\`\`\`
left span-top, left span-bottom,
center span-top, center span-bottom,
right span-top, right span-bottom,
span-left top, span-left center, span-left bottom,
span-right top, span-right center, span-right bottom
\`\`\`

### 3 Spanning Completo
\`\`\`
span-all,
span-top span-all,
span-bottom span-all
\`\`\`

## Alineación por Defecto

Cuando usas \`position-area\`, las propiedades de alineación ajustan sus **defaults automáticamente**:

\`\`\`css
.tooltip {
  position-area: top;
  /* align-self: end (alinea al fondo, cerca del anchor) */
  /* justify-self: anchor-center (centra horizontalmente) */
}

.tooltip {
  position-area: top left;
  /* align-self: end */
  /* justify-self: end */
  /* Ambos empujan hacia el anchor */
}
\`\`\`

Puedes **sobreescribir** estos defaults:

\`\`\`css
.tooltip {
  position-area: top;
  align-self: start;    /* Alinear lejos del anchor */
  justify-self: start;  /* Alinear a la izquierda */
}
\`\`\`

## Tamaño Automático

Por defecto, positioned elements **se dimensionan** según su contenido:

\`\`\`css
.tooltip {
  position-area: top;
  /* width: max-content por defecto */
  /* Se ajusta al contenido */
}
\`\`\`

Si necesitas **tamaño específico**:

\`\`\`css
.popup {
  position-area: right;
  width: 300px;
  height: 200px;
}
\`\`\`

O usa **anchor-size()** para basar el tamaño en el anchor:

\`\`\`css
.panel {
  position-area: bottom;
  width: anchor-size(width);      /* Mismo ancho que el anchor */
  max-height: calc(anchor-size(height) * 2);  /* Máx 2x la altura */
}
\`\`\`

## Offset con inset

Puedes aplicar **offset** desde la position-area con inset properties:

\`\`\`css
.tooltip {
  position-area: top;
  bottom: 10px;  /* 10px de separación desde la position-area */
}

.menu {
  position-area: right;
  left: 5px;     /* 5px de gap respecto al anchor */
}
\`\`\`

## Ejemplo Completo

\`\`\`html
<button style="anchor-name: --demo-btn">Click me</button>

<div class="tooltip">
  Tooltip content
</div>
\`\`\`

\`\`\`css
.tooltip {
  /* Conexión al anchor */
  position: absolute;
  position-anchor: --demo-btn;

  /* Posicionamiento grid 3×3 */
  position-area: top;

  /* Separación del anchor */
  margin-bottom: 8px;

  /* Estilos visuales */
  padding: 8px 12px;
  background: black;
  color: white;
  border-radius: 4px;
}
\`\`\`

## Debugging

Para visualizar el grid y entender mejor las posiciones:

\`\`\`css
/* Debug mode: visualiza el anchor */
.anchor {
  outline: 2px dashed red;
  outline-offset: 2px;
}

/* Visualiza el positioned element */
.positioned {
  outline: 2px dashed blue;
  outline-offset: 2px;
}
\`\`\`

---

**Próximo paso**: Aprende cómo los **Fallbacks Automáticos** previenen que los elementos se salgan de la pantalla.
        `}
      </MarkdownContent>

      <Callout type="info">
        <p className="font-semibold mb-2">💡 Tip Importante</p>
        <p className="text-sm">
          Experimenta con el demo interactivo <strong>Grid System</strong> en la pestaña de Demos
          para visualizar todas las 36 combinaciones posibles.
        </p>
      </Callout>
    </Card>
  );
}
