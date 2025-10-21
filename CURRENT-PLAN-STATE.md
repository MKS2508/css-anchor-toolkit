# 🎯 Estado Actual del Plan - CSS Anchor Positioning Toolkit

## ✅ FASE 0 COMPLETADA: Research Exhaustivo

**STATUS**: Pre-Fase 0 completada con triple-check methodology exitoso.

### 📊 Resultados del Research

**Artículos Procesados**: 9 artículos de css-tip.com con triple verificación
- ✅ tooltip-anchor (margin magic, 2 positions)
- ✅ tooltip-anchor-2 (4 positions, @position-try)
- ✅ tooltip-anchor-3 (corner positioning, √2 formula)
- ✅ position-area (grid 3×3)
- ✅ hover-anchor-positionning (menu effects, :has())
- ✅ range-slider-tooltip (scroll-driven + anchor)
- ✅ range-slider-tooltip-2 (adaptive shape, border-image)
- ✅ progress-with-tooltip (progress element)
- ✅ bouncy-input (radio buttons, extreme cubic-bezier)

**Metodología Aplicada**: Triple-check por cada artículo
1. WebFetch via into.md (markdown parsing)
2. WebFetch directo (HTML original)
3. Firecrawl scrape (extracción estructurada)

**Técnicas Documentadas**: 30+ técnicas (vs ~11 originales)
- Corner positioning con √2 formula completa
- @position-try custom rules
- Scroll-driven animations + anchor integration
- @property best practices
- :has() selector + conditional anchors
- border-image fill technique
- 4-headed arrows con single polygon
- Diagonal arrows con dual pseudo-elements
- Margin magic inheritance
- Dynamic sizing con anchor-size()
- Clip-path inset extension
- View-timeline tracking
- Animation-timeline integration

**Documentos Actualizados**:
- ✅ `CSS-ANCHOR-RESEARCH.md` - 11 secciones completas con código
- ✅ `CSS-ANCHOR-ADVANCED-TECHNIQUES.md` - 7 implementaciones full (HTML + CSS)

### 🎯 Próxima Fase

**FASE 1**: Implementación SCSS Core con API cohesiva basada en research
- Usar TODAS las técnicas documentadas
- Diseñar API de uso coherente
- 0 errores TypeScript garantizados

---

## 📋 Tareas Pendientes

- [x] **FASE 0: Research Profundo CSS Anchor API** ✅ COMPLETADO
- [ ] Crear estructura SCSS core (_config, _functions, _mixins, _utilities)
- [ ] Compilar SCSS y crear declaration file (.scss.d.ts)
- [ ] Crear anchor-core.ts y anchor-types.ts
- [ ] Actualizar anchor-helpers.ts con CSS custom properties
- [ ] Crear anchor-css.ts y anchor-classnames.ts
- [ ] Verificar 0 errores TypeScript
- [ ] Refactorizar componentes React (Tooltip, Popover, ContextMenu)
- [ ] Actualizar README.md con 5 casos de uso
- [ ] Verificación final completa (TS + SCSS)

---

## 🏗️ Arquitectura Aprobada

### Concepto Central: CSS Custom Properties como Bridge

```
anchortoolkit.core.scss (Single Source of Truth - SCSS Regular)
    ↓ compila a anchortoolkit.css
    ├→ anchortoolkit.core.scss.d.ts (Types manuales para TS)
    │
    ├→ HTML/CSS: usa classes (.anchor-top, .flip-auto)
    ├→ React inline: anchorStyles() lee var(--anchor-distance-md)
    ├→ React classes: anchorClasses() genera 'anchor-top anchor-distance-md'
    ├→ CSS-in-JS: positionedCSS() genera strings para styled-components
    └→ SCSS projects: @use core + @include mixins
```

---

## 📁 Estructura de Archivos Aprobada

```
src/styles/
├── anchortoolkit.core.scss       # Main SCSS (NO .module.scss)
│   ├── _config.scss              # CSS custom props + SCSS vars
│   ├── _functions.scss           # cornerMargin(), anchorName()
│   ├── _mixins.scss              # @mixin anchor(), positioned()
│   └── _utilities.scss           # Auto-generated classes
├── anchortoolkit.core.scss.d.ts  # Types manuales para TypeScript
└── anchortoolkit.css             # Compiled CSS output

src/lib/
├── anchor-core.ts                # Constants, CSS_VARS, re-export types
├── anchor-helpers.ts             # React inline (ACTUALIZADO)
├── anchor-css.ts                 # NUEVO: CSS string generation
├── anchor-classnames.ts          # NUEVO: Class name builder
└── anchor-types.ts               # ACTUALIZADO: Tipos compartidos
```

---

## 🔧 Fase 2: TypeScript Core (APROBADO)

### anchor-types.ts
```typescript
export type AnchorName = \`--\${string}\`;
export type PositionAreaValue = 'top' | 'bottom' | 'left' | 'right' | ...;
export type FallbackTactic = 'flip-block' | 'flip-inline' | 'flip-start';
export type DistanceSize = 'sm' | 'md' | 'lg' | 'xl';
export type ArrowSize = 'sm' | 'md' | 'lg';

export interface PositionedOptions {
  anchor: AnchorName;
  area?: PositionAreaValue;
  distance?: DistanceSize;
  fallbacks?: FallbackTactic[] | 'auto';
  visibility?: 'always' | 'anchors-visible' | 'no-overflow';
}
```

### anchor-core.ts
```typescript
export const CSS_VARS = {
  distances: {
    sm: 'var(--anchor-distance-sm)',
    md: 'var(--anchor-distance-md)',
    lg: 'var(--anchor-distance-lg)',
    xl: 'var(--anchor-distance-xl)',
  },
  arrowSizes: {
    sm: 'var(--anchor-arrow-sm)',
    md: 'var(--anchor-arrow-md)',
    lg: 'var(--anchor-arrow-lg)',
  },
  cornerMagic: 'var(--anchor-corner-magic)',
} as const;

export const AREAS: readonly PositionAreaValue[] = [
  'top', 'bottom', 'left', 'right', 'center',
  'top-left', 'top-right', 'bottom-left', 'bottom-right',
  // ... todas
] as const;

export const FALLBACK_TACTICS: readonly FallbackTactic[] = [
  'flip-block', 'flip-inline', 'flip-start'
] as const;

export * from './anchor-types';
```

### anchor-helpers.ts (ACTUALIZADO)
```typescript
import { CSS_VARS } from './anchor-core';
import type { AnchorName, PositionedOptions } from './anchor-types';

/**
 * Genera estilos inline para anchor element
 */
export function anchorStyles(anchorName: AnchorName): React.CSSProperties {
  return { anchorName } as React.CSSProperties;
}

/**
 * Genera estilos inline para positioned element con CSS custom properties
 */
export function positionedStyles(options: PositionedOptions): React.CSSProperties {
  const styles: React.CSSProperties = {
    position: 'absolute',
    positionAnchor: options.anchor,
  } as React.CSSProperties;

  if (options.area) styles.positionArea = options.area;

  if (options.distance) {
    styles.margin = CSS_VARS.distances[options.distance];
  }

  if (options.fallbacks) {
    styles.positionTryFallbacks =
      options.fallbacks === 'auto'
        ? 'flip-block, flip-inline, flip-start'
        : options.fallbacks.join(', ');
  }

  if (options.visibility) {
    styles.positionVisibility = options.visibility;
  }

  return styles;
}

export function createAnchorName(base: string): AnchorName { /* ... */ }
export function cornerMargin(distance: number, arrowSize: number): string { /* ... */ }
export function supportsAnchorPositioning(): boolean { /* ... */ }
```

### anchor-css.ts (NUEVO)
```typescript
import type { AnchorName, PositionedOptions } from './anchor-types';

/**
 * Genera CSS string para anchor element
 */
export function anchorCSS(name: AnchorName): string {
  return \`anchor-name: \${name};\`;
}

/**
 * Genera CSS string para positioned element
 */
export function positionedCSS(options: PositionedOptions): string {
  let css = \`position: absolute; position-anchor: \${options.anchor};\`;

  if (options.area) css += \` position-area: \${options.area};\`;
  if (options.distance) css += \` margin: var(--anchor-distance-\${options.distance});\`;
  if (options.fallbacks) {
    const fallbacks = options.fallbacks === 'auto'
      ? 'flip-block, flip-inline, flip-start'
      : options.fallbacks.join(', ');
    css += \` position-try-fallbacks: \${fallbacks};\`;
  }

  return css;
}

/**
 * Genera CSS string para tooltip arrow
 */
export function tooltipArrowCSS(size: number, placement: PositionAreaValue): string {
  // ⚠️ REQUIERE RESEARCH: Técnica correcta de css-tip.com
  return \`/* arrow styles */\`;
}
```

### anchor-classnames.ts (NUEVO)
```typescript
import type { PositionAreaValue, FallbackTactic, DistanceSize } from './anchor-types';

interface ClassNamesOptions {
  area?: PositionAreaValue;
  distance?: DistanceSize;
  fallbacks?: FallbackTactic[] | 'auto';
  base?: boolean;
}

/**
 * Genera string de class names para usar con className
 */
export function anchorClasses(options: ClassNamesOptions): string {
  const classes: string[] = [];

  if (options.base !== false) classes.push('positioned');
  if (options.area) classes.push(\`anchor-\${options.area}\`);
  if (options.distance) classes.push(\`anchor-distance-\${options.distance}\`);

  if (options.fallbacks === 'auto') {
    classes.push('flip-auto');
  } else if (options.fallbacks) {
    options.fallbacks.forEach(tactic => classes.push(\`flip-\${tactic}\`));
  }

  return classes.join(' ');
}
```

---

## 🔧 Fase 3: Actualizar Componentes

### Refactorizar Tooltip.tsx, Popover.tsx, ContextMenu.tsx

**Cambios internos**:
- Usar `positionedStyles()` con nuevas options
- Aprovechar CSS custom properties para distances
- Mantener API pública exactamente igual (0 breaking changes)

**Ejemplo Tooltip.tsx**:
```typescript
const tooltipStyles: CSSProperties = positionedStyles({
  anchor,
  area: placement,
  distance: 'md',
  fallbacks: 'auto',
});
```

---

## 🔧 Fase 4: Documentación

### Actualizar README.md con 5 casos de uso:

#### 1. HTML/CSS Puro
```html
<link rel="stylesheet" href="anchortoolkit.css">
<div class="positioned anchor-top anchor-distance-md flip-auto">
  Tooltip
</div>
```

#### 2. React Inline Styles
```tsx
import { anchorStyles, positionedStyles } from './lib/anchor-helpers';

<button style={anchorStyles('--btn')}>Click</button>
<div style={positionedStyles({
  anchor: '--btn',
  area: 'top',
  distance: 'md',
  fallbacks: 'auto'
})}>
  Tooltip
</div>
```

#### 3. React Class Names
```tsx
import { anchorClasses } from './lib/anchor-classnames';

<div className={anchorClasses({
  area: 'top',
  distance: 'md',
  fallbacks: 'auto'
})}>
  Tooltip
</div>
```

#### 4. CSS-in-JS (styled-components)
```tsx
import { anchorCSS, positionedCSS } from './lib/anchor-css';

const Anchor = styled.button\`
  \${anchorCSS('--btn')}
\`;

const Tooltip = styled.div\`
  \${positionedCSS({ anchor: '--btn', area: 'top', distance: 'md' })}
\`;
```

#### 5. SCSS Projects
```scss
@use 'anchortoolkit.core' as anchor;

.my-button {
  @include anchor.anchor('btn');
}

.my-tooltip {
  @include anchor.positioned('btn', 'top', 'flip-auto', 'md');
}
```

---

## ✅ API Final Propuesta

### Utilities TypeScript
- `anchorStyles(name)` → CSSProperties
- `positionedStyles(options)` → CSSProperties
- `anchorClasses(options)` → string
- `anchorCSS(name)` → string
- `positionedCSS(options)` → string
- `createAnchorName(base)` → AnchorName
- `cornerMargin(distance, arrowSize)` → string
- `supportsAnchorPositioning()` → boolean

### SCSS Mixins
- `@mixin anchor($name)`
- `@mixin positioned($anchor, $area, $fallbacks, $distance)`
- `@mixin tooltip-arrow($size, $placement)` ⚠️ REQUIERE RESEARCH

### CSS Classes (Predecibles)
- `.positioned`, `.anchor-top`, `.anchor-distance-md`, `.flip-auto`

---

## 🎯 Garantías de Implementación

- ✅ 0 errores TypeScript (`bunx tsc --noEmit`)
- ✅ 0 errores SCSS (validación con `sass --check`)
- ✅ `#region`/`#endregion` para secciones de código
- ✅ JSDoc en castellano con ejemplos
- ✅ Comments inline mínimos (solo donde absolutamente necesario)
- ✅ Código profesional para librería reusable
- ✅ Mantener componentes funcionando (0 breaking changes)
- ✅ Clases predecibles (NO hasheadas)
- ✅ Types en TypeScript (manual .scss.d.ts)
- ✅ Agnóstico total (HTML, React, SCSS, CSS-in-JS)

---

## 📋 Orden de Ejecución

1. **FASE 0: Research profundo CSS Anchor Positioning API** ⚠️ CRÍTICO
2. Crear estructura SCSS (config, functions, mixins, utilities) - CON técnicas correctas
3. Compilar y verificar CSS output
4. Crear declaration file (.scss.d.ts)
5. Crear anchor-core.ts y anchor-types.ts
6. Actualizar anchor-helpers.ts
7. Crear anchor-css.ts y anchor-classnames.ts
8. Verificar 0 errores TS
9. Refactorizar componentes React
10. Actualizar README.md
11. Verificación final completa

---

## 🚨 Errores Detectados en Implementación Actual

### ❌ INCORRECTO en _mixins.scss:
```scss
// Usando transform (CSS tradicional)
transform: translateX(-50%) rotate(45deg);

// Usando clip-path sin anchor() function
clip-path: polygon(0 0, 100% 0, 100% 100%);
```

### ✅ DEBE SER (después de research):
```scss
// Usar anchor() function
// Margin magic con √2 para corners
// Técnicas específicas de css-tip.com
```

---

## 📚 Fuentes Críticas para Research

### Obligatorias:
1. https://css-tip.com/tooltip-anchor/ - **Arrow positioning con margin magic**
2. https://css-tip.com/position-area/ - **Grid 3×3 system**
3. W3C CSS Anchor Positioning Level 1
4. MDN: `anchor()` function
5. MDN: `position-area` property
6. MDN: `position-try-fallbacks`
7. Chrome Developers: Anchor Positioning API

### Conceptos Clave a Investigar:
- **Margin Magic**: Fórmula √2 para corner positioning
- **`anchor()` function**: Posicionar relativo a edges del anchor
- **`anchor-size()` function**: Sizing basado en dimensiones del anchor
- **position-area grid**: Sistema 3×3 de 9 regiones
- **Corner positioning**: Técnica diagonal de Temani Afif
- **Arrow techniques**: SIN transform, usando anchor API nativa

---

## 🎯 Próximos Pasos

1. ✅ ~~**Hacer research exhaustivo** de todas las fuentes~~ - COMPLETADO
2. ✅ ~~**Documentar técnicas correctas** en nuevo plan~~ - COMPLETADO
3. ⏸️ **Re-implementar SCSS core** con CSS Anchor API real - PENDIENTE (esperando aprobación)
4. ⏸️ **Continuar con fases 2-4** siguiendo arquitectura aprobada - PENDIENTE

---

## 📚 Documentación de Research

### CSS-ANCHOR-RESEARCH.md
**11 Secciones Documentadas**:
1. Introducción a CSS Anchor Positioning
2. Función anchor() - Positioning Functions
3. Grid System 3×3 con position-area
4. position-try-fallbacks - Sistema de Reposicionamiento
5. anchor-size() - Sizing Functions
6. Corner Positioning con √2 Formula
7. @position-try Custom Rules
8. Scroll-Driven + Anchor Integration
9. @property Best Practices
10. :has() Selector + Anchor Positioning
11. border-image Fill Technique

### CSS-ANCHOR-ADVANCED-TECHNIQUES.md
**7 Implementaciones Completas**:
1. Range Slider con Tooltip (scroll-driven + anchor)
2. Range Slider Adaptive Shape (border-image fill)
3. Progress Element con Tooltip
4. Menu Hover Effects (:has() + conditional anchors)
5. Bouncy Radio Buttons (extreme cubic-bezier)
6. Tooltip 4 Posiciones (@position-try custom rules)
7. Tooltip Corner Positioning (√2 formula, diagonal arrows)

Cada implementación incluye:
- HTML completo
- CSS completo con explicaciones
- Técnicas específicas utilizadas
- Código listo para usar

---

**Estado**: ✅ FASE 0 COMPLETADA - Documentación exhaustiva lista para implementación SCSS Core
