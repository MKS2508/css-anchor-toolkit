/**
 * @file anchor-core.ts
 * @description Constants y CSS Variables del CSS Anchor Positioning Toolkit
 *
 * Mapea las CSS custom properties del SCSS core a constants TypeScript.
 * Single source of truth para valores que conectan SCSS ↔ TypeScript.
 *
 * @version 2.0.0
 * @author MKS2508
 */

import type {
  PositionAreaValue,
  FallbackTactic,
  DistanceSize,
  ArrowSize,
} from './anchor-types';

/* === CSS Custom Properties (Runtime Values) === */

/**
 * CSS Variables del toolkit que mapean a CSS custom properties del core
 *
 * Usar estos valores en lugar de hardcoded strings para type safety.
 *
 * @example
 * ```tsx
 * <div style={{ margin: CSS_VARS.distances.md }}>
 *   Espaciado usando --anchor-distance-md
 * </div>
 * ```
 */
export const CSS_VARS = {
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

/* === Position Area Values (36+ positions) === */

/**
 * Todas las position-area values disponibles en el core
 *
 * 36 positions × 4 justify × 4 align = 576 configuraciones
 */
export const POSITION_AREAS: readonly PositionAreaValue[] = [
  // Physical Keywords: Basic 9
  'top',
  'bottom',
  'left',
  'right',
  'center',
  'top left',
  'top right',
  'bottom left',
  'bottom right',

  // Logical Keywords: Basic 9
  'block-start',
  'block-end',
  'inline-start',
  'inline-end',
  'block-start inline-start',
  'block-start inline-end',
  'block-end inline-start',
  'block-end inline-end',
  'center inline-start',
  'center inline-end',

  // Spanning Variants: Top/Bottom
  'top span-left',
  'top span-right',
  'span-top left',
  'span-top center',
  'span-top right',
  'bottom span-left',
  'bottom span-right',
  'span-bottom left',
  'span-bottom center',
  'span-bottom right',

  // Spanning Variants: Left/Right
  'left span-top',
  'left span-bottom',
  'span-left top',
  'span-left center',
  'span-left bottom',
  'right span-top',
  'right span-bottom',
  'span-right top',
  'span-right center',
  'span-right bottom',

  // All-spanning
  'span-all',
  'center span-all',
] as const;

/* === Fallback Tactics === */

/**
 * Tácticas de fallback disponibles para position-try-fallbacks
 */
export const FALLBACK_TACTICS: readonly FallbackTactic[] = [
  'flip-block',
  'flip-inline',
  'flip-start',
] as const;

/* === Distance Sizes === */

/**
 * Sizes de distancia disponibles
 *
 * Corresponden a las CSS custom properties --anchor-distance-*
 */
export const DISTANCES: readonly DistanceSize[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const;

/* === Arrow Sizes === */

/**
 * Sizes de arrow disponibles
 *
 * Corresponden a las CSS custom properties --anchor-arrow-*
 */
export const ARROW_SIZES: readonly ArrowSize[] = ['sm', 'md', 'lg', 'xl'] as const;

/* === Utility Functions === */

/**
 * Obtiene el CSS variable string para una distance size
 */
export function getDistanceVar(size: DistanceSize): string {
  return CSS_VARS.distances[size];
}

/**
 * Obtiene el CSS variable string para un arrow size
 */
export function getArrowSizeVar(size: ArrowSize): string {
  return CSS_VARS.arrowSizes[size];
}

/**
 * Obtiene el CSS variable string para una transition
 */
export function getTransitionVar(speed: 'fast' | 'base' | 'slow'): string {
  return CSS_VARS.transitions[speed];
}

/**
 * Verifica si una position area es válida
 */
export function isValidPositionArea(area: string): area is PositionAreaValue {
  return POSITION_AREAS.includes(area as PositionAreaValue);
}

/**
 * Verifica si un fallback tactic es válido
 */
export function isValidFallbackTactic(tactic: string): tactic is FallbackTactic {
  return FALLBACK_TACTICS.includes(tactic as FallbackTactic);
}

/* === Re-export All Types === */

export * from './anchor-types';
