/**
 * @file anchor-css.ts
 * @description CSS string generators para CSS-in-JS
 *
 * Funciones para generar CSS strings para styled-components, emotion, etc.
 * Alternativa a inline styles cuando se necesita CSS completo.
 *
 * @version 2.0.0
 * @author MKS2508
 */

import { CSS_VARS } from './anchor-core';
import { buildFallbacks } from './anchor-helpers';
import type {
  AnchorName,
  PositionedOptions,
  ArrowType,
  ArrowSize,
  DistanceSize,
} from './anchor-types';

/* === Basic CSS Generators === */

/**
 * Genera CSS string para anchor element
 *
 * @param name - Nombre del anchor
 * @returns CSS string
 *
 * @example
 * ```ts
 * const Button = styled.button`
 *   ${anchorCSS('--my-btn')}
 * `;
 * ```
 */
export function anchorCSS(name: AnchorName): string {
  return `anchor-name: ${name};`;
}

/**
 * Genera CSS string para positioned element
 *
 * @param options - Opciones de posicionamiento
 * @returns CSS string completo
 *
 * @example
 * ```ts
 * const Tooltip = styled.div`
 *   ${positionedCSS({
 *     anchor: '--my-btn',
 *     area: 'top',
 *     distance: 'md',
 *     fallbacks: 'auto'
 *   })}
 *   background: black;
 *   color: white;
 * `;
 * ```
 */
export function positionedCSS(options: PositionedOptions): string {
  const rules: string[] = [
    'position: absolute;',
    `position-anchor: ${options.anchor};`,
  ];

  if (options.area) {
    rules.push(`position-area: ${options.area};`);
  }

  if (options.distance) {
    const distanceVar = CSS_VARS.distances[options.distance as keyof typeof CSS_VARS.distances];
    rules.push(`margin: ${distanceVar};`);
  }

  if (options.fallbacks) {
    const fallbacks = buildFallbacks(options.fallbacks);
    rules.push(`position-try-fallbacks: ${fallbacks};`);
  }

  if (options.visibility) {
    rules.push(`position-visibility: ${options.visibility};`);
  }

  if (options.justify) {
    rules.push(`justify-self: ${options.justify};`);
  }

  if (options.align) {
    rules.push(`align-self: ${options.align};`);
  }

  return rules.join('\n  ');
}

/* === Arrow CSS Generators === */

/**
 * Genera CSS string para tooltip arrow
 *
 * Implementa las técnicas correctas del SCSS core basadas en el research.
 *
 * @param type - Tipo de arrow
 * @param size - Tamaño del arrow
 * @param distance - Distancia opcional (default: 'md')
 * @returns CSS string para ::before pseudo-element
 *
 * @example
 * ```ts
 * const Tooltip = styled.div`
 *   ${positionedCSS({ anchor: '--btn', area: 'top' })}
 *   background: black;
 *
 *   &::before {
 *     ${arrowCSS('2-headed', 'md')}
 *   }
 * `;
 * ```
 */
export function arrowCSS(
  type: ArrowType,
  size?: ArrowSize,
  distance?: DistanceSize
): string {
  const arrowSizeVar = size ? CSS_VARS.arrowSizes[size] : CSS_VARS.arrowSizes.md;
  const distanceVar = distance
    ? CSS_VARS.distances[distance]
    : CSS_VARS.distances.md;

  switch (type) {
    case '2-headed':
      return arrow2HeadedCSS(arrowSizeVar, distanceVar);
    case '4-headed':
      return arrow4HeadedCSS(arrowSizeVar, distanceVar);
    case 'diagonal':
      return arrowDiagonalCSS(arrowSizeVar, distanceVar);
  }
}

/**
 * CSS para 2-headed arrow (margin magic vertical)
 *
 * Técnica: https://css-tip.com/tooltip-anchor/
 */
function arrow2HeadedCSS(arrowSize: string, distance: string): string {
  return `
  content: '';
  position: fixed;
  width: ${arrowSize};
  background: inherit;
  z-index: -1;
  top: calc(anchor(--tooltip top) - ${distance});
  bottom: calc(anchor(--tooltip bottom) - ${distance});
  left: calc(anchor(--anchor center) - ${arrowSize}/2);
  margin: inherit;
  clip-path: polygon(
    50% 0.2em,
    100% ${distance},
    100% calc(100% - ${distance}),
    50% calc(100% - 0.2em),
    0 calc(100% - ${distance}),
    0 ${distance}
  );
`;
}

/**
 * CSS para 4-headed arrow (polygon 12 puntos)
 *
 * Técnica: https://css-tip.com/tooltip-anchor-2/
 */
function arrow4HeadedCSS(arrowSize: string, distance: string): string {
  return `
  content: '';
  position: absolute;
  inset: calc(-1 * ${distance});
  background: inherit;
  z-index: -1;
  clip-path: polygon(
    calc(50% - ${arrowSize}) ${distance},
    50% 0.2em,
    calc(50% + ${arrowSize}) ${distance},
    calc(100% - ${distance}) calc(50% - ${arrowSize}),
    calc(100% - 0.2em) 50%,
    calc(100% - ${distance}) calc(50% + ${arrowSize}),
    calc(50% + ${arrowSize}) calc(100% - ${distance}),
    50% calc(100% - 0.2em),
    calc(50% - ${arrowSize}) calc(100% - ${distance}),
    ${distance} calc(50% + ${arrowSize}),
    0.2em 50%,
    ${distance} calc(50% - ${arrowSize})
  );
`;
}

/**
 * CSS para diagonal arrow (√2 formula para corners)
 *
 * Técnica: https://css-tip.com/tooltip-anchor-3/
 */
function arrowDiagonalCSS(arrowSize: string, distance: string): string {
  return `
  content: '';
  position: fixed;
  width: anchor-size(--tooltip width);
  height: anchor-size(--tooltip height);
  z-index: -1;
  background: inherit;
  position-anchor: --anchor;
  margin: inherit;
  position-try: flip-inline flip-block;
  clip-path: polygon(
    0 0,
    calc(100% - ${distance} - ${arrowSize}) 0,
    calc(100% - ${distance}) ${arrowSize},
    100% ${distance},
    calc(100% - ${arrowSize}) calc(${distance} + ${arrowSize}),
    0 0
  );
`;
}

/* === Scroll-Driven CSS Generators === */

/**
 * Genera CSS para view-timeline
 *
 * @param timelineName - Nombre del timeline
 * @param axis - Eje de scroll
 * @returns CSS string
 */
export function viewTimelineCSS(
  timelineName: string,
  axis: 'block' | 'inline' = 'block'
): string {
  return `view-timeline-name: ${timelineName};\n  view-timeline-axis: ${axis};`;
}

/**
 * Genera CSS para animation-timeline integration
 *
 * @param timelineName - Nombre del timeline
 * @param animationName - Nombre de la animación
 * @returns CSS string
 */
export function animationTimelineCSS(
  timelineName: string,
  animationName: string
): string {
  return `animation: ${animationName};\n  animation-timeline: ${timelineName};`;
}

/**
 * Genera CSS para @property custom property
 *
 * @param name - Nombre de la property
 * @param syntax - Syntax type
 * @param initial - Valor inicial
 * @param inherits - Si hereda
 * @returns CSS string con @property rule
 */
export function propertyRuleCSS(
  name: string,
  syntax: string,
  initial: string,
  inherits: boolean = false
): string {
  return `@property ${name} {
  syntax: "${syntax}";
  initial-value: ${initial};
  inherits: ${inherits};
}`;
}
