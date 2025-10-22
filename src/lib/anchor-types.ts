/**
 * @file anchor-types.ts
 * @description Type definitions para CSS Anchor Positioning Toolkit
 *
 * Define types fundamentales para type-safe anchor positioning.
 * Estos types están sincronizados con el SCSS core.
 *
 * @version 2.0.0
 * @author MKS2508
 */

/* === Core Types from SCSS === */

/**
 * Position-area values (50+ positions)
 */
export type PositionAreaValue =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'top center'
  | 'bottom left'
  | 'bottom right'
  | 'bottom center'
  | 'left center'
  | 'right center'
  | 'block-start'
  | 'block-end'
  | 'inline-start'
  | 'inline-end'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'block-start inline-start'
  | 'block-start inline-end'
  | 'block-end inline-start'
  | 'block-end inline-end'
  | 'center inline-start'
  | 'center inline-end'
  | 'span-top'
  | 'span-bottom'
  | 'span-left'
  | 'span-right'
  | 'span-all'
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
  | 'center span-all';

/**
 * Justify-self values
 */
export type JustifyValue = 'start' | 'end' | 'center' | 'stretch' | 'anchor-center';

/**
 * Align-self values
 */
export type AlignValue = 'start' | 'end' | 'center' | 'stretch' | 'anchor-center';

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

/* === Additional TypeScript-only Types === */

/**
 * Anchor name type - Debe empezar con --
 *
 * @example
 * ```ts
 * const myAnchor: AnchorName = '--my-button';
 * ```
 */
export type AnchorName = `--${string}`;

/**
 * Arrow types disponibles en el toolkit
 *
 * - 2-headed: Margin magic vertical (top/bottom flip)
 * - 4-headed: Polygon 12 puntos (top/bottom/left/right)
 * - diagonal: √2 formula para corner positioning
 */
export type ArrowType = '2-headed' | '4-headed' | 'diagonal';

/**
 * Opciones para positioned elements
 *
 * Configura el posicionamiento completo de un elemento relativo a su anchor.
 */
export interface PositionedOptions {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición del elemento en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia entre anchor y positioned element usando CSS custom properties */
  distance?: DistanceSize;

  /** Fallback tactics para reposicionamiento automático */
  fallbacks?: FallbackTactic[] | 'auto';

  /** Control de visibilidad según estado del anchor */
  visibility?: PositionVisibility;

  /** Justify-self dentro del position-area */
  justify?: JustifyValue;

  /** Align-self dentro del position-area */
  align?: AlignValue;
}

/**
 * Opciones para arrows de tooltips
 *
 * Configura el tipo y tamaño del arrow usando técnicas del SCSS core.
 */
export interface ArrowOptions {
  /** Tipo de arrow a renderizar */
  type: ArrowType;

  /** Tamaño del arrow usando CSS custom properties */
  size?: ArrowSize;

  /** Distancia del arrow (si difiere del tooltip) */
  distance?: DistanceSize;
}

/**
 * Opciones para generación de class names
 *
 * Usado por anchorClasses() para componer utility classes.
 */
export interface ClassNamesOptions {
  /** Posición en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia usando utility class */
  distance?: DistanceSize;

  /** Fallback tactics a aplicar */
  fallbacks?: FallbackTactic[] | 'auto';

  /** Justify-self */
  justify?: JustifyValue;

  /** Align-self */
  align?: AlignValue;

  /** Incluir .positioned base class (default: true) */
  base?: boolean;
}

/**
 * Opciones para scroll-driven animations
 *
 * Integra view-timeline con anchor positioning.
 */
export interface ScrollDrivenOptions {
  /** Nombre del view-timeline */
  timelineName: string;

  /** Eje de scroll (block o inline) */
  axis?: 'block' | 'inline';

  /** Nombre del anchor para tracking */
  anchor: AnchorName;

  /** Posición durante scroll */
  area?: PositionAreaValue;
}

/**
 * Side values para anchor() function
 */
export type AnchorSide =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'center'
  | `${number}%`;

/**
 * Dimension values para anchor-size() function
 */
export type AnchorDimension =
  | 'width'
  | 'height'
  | 'block'
  | 'inline'
  | 'self-block'
  | 'self-inline';

/**
 * Try order values para position-try-order
 */
export type TryOrder =
  | 'normal'
  | 'most-width'
  | 'most-height'
  | 'most-block-size'
  | 'most-inline-size';
