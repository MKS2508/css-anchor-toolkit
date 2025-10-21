/**
 * @file anchortoolkit.core.scss.d.ts
 * @description TypeScript type definitions para SCSS imports
 *
 * Permite type-safe imports del SCSS en proyectos TypeScript
 *
 * @version 1.0.0
 * @author MKS2508
 */

/* === Module Declarations === */

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@/styles/anchortoolkit.core.scss' {
  export const classes: AnchorToolkitClasses;
  export default classes;
}

/* === Utility Classes Types === */

/**
 * Todas las utility classes generadas por el toolkit
 *
 * Organizado por secciones para mejor autocomplete
 */
export interface AnchorToolkitClasses {
  /* Base classes */
  positioned: string;
  anchor: string;

  /* Position-area classes (36+) - Physical */
  'anchor-top': string;
  'anchor-bottom': string;
  'anchor-left': string;
  'anchor-right': string;
  'anchor-center': string;
  'anchor-top-left': string;
  'anchor-top-right': string;
  'anchor-bottom-left': string;
  'anchor-bottom-right': string;

  /* Position-area - Logical */
  'anchor-block-start': string;
  'anchor-block-end': string;
  'anchor-inline-start': string;
  'anchor-inline-end': string;
  'anchor-block-start-inline-start': string;
  'anchor-block-start-inline-end': string;
  'anchor-block-end-inline-start': string;
  'anchor-block-end-inline-end': string;
  'anchor-center-inline-start': string;
  'anchor-center-inline-end': string;

  /* Position-area - Spanning (Top/Bottom) */
  'anchor-top-span-left': string;
  'anchor-top-span-right': string;
  'anchor-span-top-left': string;
  'anchor-span-top-center': string;
  'anchor-span-top-right': string;
  'anchor-bottom-span-left': string;
  'anchor-bottom-span-right': string;
  'anchor-span-bottom-left': string;
  'anchor-span-bottom-center': string;
  'anchor-span-bottom-right': string;

  /* Position-area - Spanning (Left/Right) */
  'anchor-left-span-top': string;
  'anchor-left-span-bottom': string;
  'anchor-span-left-top': string;
  'anchor-span-left-center': string;
  'anchor-span-left-bottom': string;
  'anchor-right-span-top': string;
  'anchor-right-span-bottom': string;
  'anchor-span-right-top': string;
  'anchor-span-right-center': string;
  'anchor-span-right-bottom': string;

  /* Position-area - All-spanning */
  'anchor-span-all': string;
  'anchor-center-span-all': string;

  /* Alignment classes (8) */
  'anchor-justify-start': string;
  'anchor-justify-end': string;
  'anchor-justify-center': string;
  'anchor-justify-stretch': string;
  'anchor-align-start': string;
  'anchor-align-end': string;
  'anchor-align-center': string;
  'anchor-align-stretch': string;

  /* Distance utilities (5) */
  'anchor-distance-sm': string;
  'anchor-distance-md': string;
  'anchor-distance-lg': string;
  'anchor-distance-xl': string;
  'anchor-distance-2xl': string;

  /* Fallback utilities (4) */
  'flip-block': string;
  'flip-inline': string;
  'flip-start': string;
  'flip-auto': string;

  /* Visibility utilities (3) */
  'visible-always': string;
  'visible-anchors': string;
  'visible-no-overflow': string;

  /* Helper utilities */
  'anchor-hidden': string;
  'anchor-z-tooltip': string;
  'anchor-z-popover': string;
  'anchor-z-dropdown': string;
}

/* === CSS Custom Properties Types === */

/**
 * CSS custom properties disponibles como CSS variables
 *
 * Uso en React:
 * ```tsx
 * <div style={{ margin: 'var(--anchor-distance-md)' }}>
 * ```
 */
export interface AnchorCSSVariables {
  /* Distance variables */
  '--anchor-distance-sm': string;
  '--anchor-distance-md': string;
  '--anchor-distance-lg': string;
  '--anchor-distance-xl': string;
  '--anchor-distance-2xl': string;

  /* Arrow size variables */
  '--anchor-arrow-sm': string;
  '--anchor-arrow-md': string;
  '--anchor-arrow-lg': string;
  '--anchor-arrow-xl': string;

  /* Corner magic constant */
  '--anchor-corner-magic': string;

  /* Animation timings */
  '--anchor-transition-fast': string;
  '--anchor-transition-base': string;
  '--anchor-transition-slow': string;
}

/* === Type Helpers === */

/**
 * Position-area value type completo
 *
 * Incluye todos los 36+ position-area values válidos
 */
export type PositionAreaValue =
  /* Basic 9 */
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  /* Logical 9 */
  | 'block-start'
  | 'block-end'
  | 'inline-start'
  | 'inline-end'
  | 'block-start inline-start'
  | 'block-start inline-end'
  | 'block-end inline-start'
  | 'block-end inline-end'
  | 'center inline-start'
  | 'center inline-end'
  /* Spanning Top/Bottom */
  | 'top span-left'
  | 'top span-right'
  | 'span-top left'
  | 'span-top center'
  | 'span-top right'
  | 'bottom span-left'
  | 'bottom span-right'
  | 'span-bottom left'
  | 'span-bottom center'
  | 'span-bottom right'
  /* Spanning Left/Right */
  | 'left span-top'
  | 'left span-bottom'
  | 'span-left top'
  | 'span-left center'
  | 'span-left bottom'
  | 'right span-top'
  | 'right span-bottom'
  | 'span-right top'
  | 'span-right center'
  | 'span-right bottom'
  /* All-spanning */
  | 'span-all'
  | 'center span-all';

/**
 * Justify-self values
 */
export type JustifyValue = 'start' | 'end' | 'center' | 'stretch';

/**
 * Align-self values
 */
export type AlignValue = 'start' | 'end' | 'center' | 'stretch';

/**
 * Distance size presets
 */
export type DistanceSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Arrow size presets
 */
export type ArrowSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Fallback tactics
 */
export type FallbackTactic = 'flip-block' | 'flip-inline' | 'flip-start';

/**
 * Position-visibility values
 */
export type PositionVisibility = 'always' | 'anchors-visible' | 'no-overflow';
