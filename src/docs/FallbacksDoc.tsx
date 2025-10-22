import { MarkdownContent, Callout } from '../components/MarkdownContent';
import { Card } from '../components/ui/card';

export function FallbacksDoc() {
  return (
    <Card className="p-8">
      <MarkdownContent>
        {`
# 🔄 Fallbacks Automáticos: position-try-fallbacks

Uno de los **superpoderes** de CSS Anchor Positioning es la capacidad de **reposicionar automáticamente** elementos cuando no caben en su posición inicial.

## El Problema del Overflow

Sin fallbacks, un tooltip podría salirse de la pantalla:

\`\`\`css
.tooltip {
  position-area: top;  /* ¿Qué pasa si el anchor está en el top de la pantalla? */
}
/* El tooltip se cortaría o saldría fuera del viewport ❌ */
\`\`\`

Con fallbacks, el navegador **intenta automáticamente** posiciones alternativas:

\`\`\`css
.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block;
}
/* Si no cabe arriba, intenta abajo automáticamente ✅ */
\`\`\`

## position-try-fallbacks: La Propiedad

Define una **lista de opciones** que el navegador prueba secuencialmente:

\`\`\`css
.element {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline, flip-start;
}
\`\`\`

El navegador:
1. **Intenta** la posición principal (\`top\`)
2. Si hay overflow, **prueba** \`flip-block\` (bottom)
3. Si aún hay overflow, **prueba** \`flip-inline\`
4. Y así sucesivamente...

## Flip Tactics: Transformaciones Automáticas

### flip-block

Invierte en el **eje vertical** (block):

\`\`\`css
position-area: top;
position-try-fallbacks: flip-block;
/* top → bottom */
/* bottom → top */
\`\`\`

**Casos de uso**:
- Tooltips que pueden estar arriba o abajo
- Dropdowns que se adaptan al scroll

### flip-inline

Invierte en el **eje horizontal** (inline):

\`\`\`css
position-area: right;
position-try-fallbacks: flip-inline;
/* right → left */
/* left → right */
\`\`\`

**Casos de uso**:
- Menús laterales
- Popovers de información

### flip-start

Invierte **diagonalmente** (ambos ejes):

\`\`\`css
position-area: top left;
position-try-fallbacks: flip-start;
/* top-left → bottom-right */
/* bottom-right → top-left */
\`\`\`

**Casos de uso**:
- Context menus en esquinas
- Tooltips de esquina

## Combinando Flip Tactics

Puedes combinar múltiples tácticas para máxima flexibilidad:

### Patrón Común: Flip Block + Inline

\`\`\`css
.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
}
\`\`\`

**Secuencia de fallback**:
1. \`top\` (posición original)
2. \`bottom\` (flip-block)
3. \`left\` (flip-inline)
4. \`right\` (flip-inline)

### Patrón Exhaustivo: Todas las Tácticas

\`\`\`css
.popover {
  position-area: top right;
  position-try-fallbacks: flip-block, flip-inline, flip-start;
}
\`\`\`

**Secuencia de fallback**:
1. \`top right\` (original)
2. \`bottom right\` (flip-block)
3. \`top left\` (flip-inline)
4. \`bottom left\` (flip-start - diagonal)

## @position-try: Fallbacks Personalizados

Para control total, define **reglas personalizadas**:

\`\`\`css
@position-try --custom-fallback {
  position-area: left;
  width: 250px;
  margin: 5px;
}

.element {
  position-area: top;
  width: 300px;
  margin: 10px;

  position-try-fallbacks: --custom-fallback, flip-block;
}
\`\`\`

**Qué se puede cambiar en @position-try**:
- \`position-area\`
- \`position-anchor\` (cambiar a otro anchor!)
- \`inset\` properties (\`top\`, \`left\`, etc.)
- \`margin\` properties
- \`width\`, \`height\`, \`min-*\`, \`max-*\`
- \`align-self\`, \`justify-self\`

**⚠️ Restricción**: Solo propiedades de posicionamiento y tamaño, NO color, font, etc.

### Ejemplo Avanzado: Cambiar Anchor

\`\`\`css
@position-try --use-alternative-anchor {
  position-anchor: --alternative-btn;  /* Cambiar de anchor! */
  position-area: bottom;
}

.tooltip {
  position-anchor: --main-btn;
  position-area: top;
  position-try-fallbacks: --use-alternative-anchor;
}
\`\`\`

## position-try-order: Priorización Inteligente

En lugar de **orden declarativo**, elige fallbacks por **espacio disponible**:

\`\`\`css
.element {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline, flip-start;
  position-try-order: most-width;
}
\`\`\`

**Valores disponibles**:

| Valor | Prioriza |
|-------|----------|
| \`normal\` | Orden de declaración (default) |
| \`most-width\` | Posición con mayor ancho disponible |
| \`most-height\` | Posición con mayor altura disponible |
| \`most-block-size\` | Mayor espacio en eje block |
| \`most-inline-size\` | Mayor espacio en eje inline |

**Ejemplo**:
\`\`\`css
.smart-popover {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
  position-try-order: most-height;
}
/* El navegador elige top o bottom según dónde haya más espacio vertical */
\`\`\`

## position-try: Shorthand

Combina \`position-try-order\` y \`position-try-fallbacks\`:

\`\`\`css
/* Longhand */
position-try-order: most-width;
position-try-fallbacks: flip-block, flip-inline;

/* Shorthand */
position-try: most-width flip-block, flip-inline;
\`\`\`

## position-visibility: Control de Visibilidad

Decide **qué hacer** cuando el elemento no cabe en ninguna posición:

\`\`\`css
.tooltip {
  position-visibility: anchors-visible;  /* Default */
}
\`\`\`

**Valores**:

| Valor | Comportamiento |
|-------|----------------|
| \`always\` | Siempre visible, incluso si se sale |
| \`anchors-visible\` | Ocultar si anchor está fuera de pantalla |
| \`no-overflow\` | Ocultar si element hace overflow después de fallbacks |

**Ejemplo con no-overflow**:
\`\`\`css
.strict-popover {
  position-area: right;
  position-try-fallbacks: flip-inline, flip-block;
  position-visibility: no-overflow;
}
/* Si ningún fallback funciona, se oculta completamente */
\`\`\`

## Patrón Recomendado

Para la mayoría de casos, este es el setup ideal:

\`\`\`css
.tooltip {
  /* Posicionamiento base */
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;

  /* Fallbacks automáticos */
  position-try-fallbacks: flip-block, flip-inline;

  /* Ocultar si anchor no está visible */
  position-visibility: anchors-visible;

  /* Estilos */
  padding: 8px 12px;
  background: black;
  color: white;
}
\`\`\`

## Debugging Fallbacks

Para ver qué fallback se está aplicando:

\`\`\`javascript
// En DevTools Console
const element = document.querySelector('.tooltip');
const computed = getComputedStyle(element);

// Ver posición aplicada
console.log(computed.positionArea);

// Observar cambios
const observer = new MutationObserver(() => {
  console.log('Posición cambió:', computed.positionArea);
});
observer.observe(element, { attributes: true });
\`\`\`

## Casos de Uso Reales

### Tooltip Adaptativo

\`\`\`css
.adaptive-tooltip {
  position-anchor: --trigger;
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline, flip-start;
  position-visibility: anchors-visible;
}
/* Funciona en cualquier posición de la pantalla */
\`\`\`

### Dropdown que Respeta Scroll

\`\`\`css
.smart-dropdown {
  position-anchor: --dropdown-btn;
  position-area: bottom;
  position-try-fallbacks: flip-block;
  position-try-order: most-height;
}
/* Se abre arriba si hay más espacio */
\`\`\`

### Context Menu Flexible

\`\`\`css
.context-menu {
  position-anchor: --target;
  position-area: bottom right;
  position-try-fallbacks: flip-inline, flip-block, flip-start;
}
/* Siempre encuentra espacio en la pantalla */
\`\`\`

---

**Próximo paso**: Explora **Técnicas Avanzadas** como corner positioning y multiple anchors.
        `}
      </MarkdownContent>

      <Callout type="warning">
        <p className="font-semibold mb-2">⚠️ Nota Importante</p>
        <p className="text-sm">
          Los fallbacks se evalúan en **tiempo real** - si el usuario hace scroll o resize, el
          navegador re-evalúa automáticamente. ¡No necesitas JavaScript!
        </p>
      </Callout>
    </Card>
  );
}
