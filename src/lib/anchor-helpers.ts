/**
 * @file anchor-helpers.ts
 * @description React helpers para CSS Anchor Positioning
 *
 * Funciones utilitarias para trabajar con anchor positioning en React.
 * Integradas con CSS custom properties del SCSS core.
 *
 * @version 2.0.0
 * @author MKS2508
 */

import type { CSSProperties } from 'react';
import { CSS_VARS, FALLBACK_TACTICS } from './anchor-core';
import type {
  AnchorName,
  PositionedOptions,
  AnchorSide,
  AnchorDimension,
} from './anchor-types';

export type { AnchorName, PositionedOptions, AnchorSide, AnchorDimension } from './anchor-types';

/* === Anchor Name Helpers === */

/**
 * Genera un nombre de anchor válido a partir de un string base
 *
 * @param base - String base para el nombre (se limpiará y formateará)
 * @returns Nombre de anchor en formato --kebab-case
 */
export function createAnchorName(base: string): AnchorName {
  const cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `--${cleaned}` as AnchorName;
}

/* === Position Area Helpers === */

/**
 * Construye un valor position-area combinando keywords
 */
export function positionArea(row: string, col?: string): string {
  return col ? `${row} ${col}` : row;
}

/* === Fallback Helpers === */

/**
 * Genera lista de fallbacks para position-try-fallbacks
 *
 * @param tactics - Array de tactics o 'auto' para defaults
 * @returns String CSS para position-try-fallbacks
 */
export function buildFallbacks(tactics: string[] | 'auto'): string {
  if (tactics === 'auto') {
    return FALLBACK_TACTICS.join(', ');
  }
  return tactics.join(', ');
}

/* === Corner Positioning Helpers === */

/**
 * Calcula el margin para corner positioning con diagonal arrows
 *
 * Fórmula: distance + (√2 - 1) × arrowSize
 * Fuente: https://css-tip.com/tooltip-anchor-3/
 *
 * @param distance - Distancia base en píxeles
 * @param arrowSize - Tamaño del arrow en píxeles
 * @returns String con calc() CSS
 */
export function cornerMargin(distance: number, arrowSize: number): string {
  const sqrt2Minus1 = 0.41421356237;
  return `calc(${distance}px + ${sqrt2Minus1} * ${arrowSize}px)`;
}

/* === Anchor Function Helpers === */

/**
 * Construye un valor para anchor() function con fallback opcional
 *
 * @param anchorName - Nombre del anchor (opcional si hay position-anchor)
 * @param side - Lado del anchor a referenciar
 * @param fallback - Valor de fallback si anchor no disponible
 * @returns String con anchor() function
 */
export function anchorFunction(
  anchorName: AnchorName | undefined,
  side: AnchorSide,
  fallback?: string
): string {
  const nameStr = anchorName ? `${anchorName} ` : '';
  const fallbackStr = fallback ? `, ${fallback}` : '';
  return `anchor(${nameStr}${side}${fallbackStr})`;
}

/**
 * Construye un valor para anchor-size() function
 *
 * @param anchorName - Nombre del anchor (opcional si hay position-anchor)
 * @param dimension - Dimensión a obtener
 * @param fallback - Valor de fallback si anchor no disponible
 * @returns String con anchor-size() function
 */
export function anchorSizeFunction(
  anchorName: AnchorName | undefined,
  dimension: AnchorDimension,
  fallback?: string
): string {
  const nameStr = anchorName ? `${anchorName} ` : '';
  const fallbackStr = fallback ? `, ${fallback}` : '';
  return `anchor-size(${nameStr}${dimension}${fallbackStr})`;
}

/* === Feature Detection === */

/**
 * Detecta si el navegador soporta CSS Anchor Positioning
 *
 * @returns true si soporta anchor positioning
 */
export function supportsAnchorPositioning(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined') {
    return false;
  }

  return CSS.supports?.('anchor-name', '--test') ?? false;
}

/* === React Inline Styles Helpers === */

/**
 * Genera estilos inline para un anchor element
 *
 * @param anchorName - Nombre único del anchor
 * @returns CSSProperties para React inline styles
 */
export function anchorStyles(anchorName: AnchorName): CSSProperties {
  return {
    anchorName,
  } as CSSProperties;
}

/**
 * Genera estilos inline para un positioned element
 *
 * Usa CSS custom properties del core para distances.
 * Integrado con el SCSS core del toolkit.
 *
 * @param options - Opciones de posicionamiento
 * @returns CSSProperties para React inline styles
 */
export function positionedStyles(options: PositionedOptions): CSSProperties {
  const styles: CSSProperties = {
    position: 'absolute',
    positionAnchor: options.anchor,
  } as CSSProperties;

  if (options.area) {
    styles.positionArea = options.area;
  }

  if (options.distance) {
    const distanceVar = CSS_VARS.distances[options.distance as keyof typeof CSS_VARS.distances];
    styles.margin = distanceVar;
  }

  if (options.fallbacks) {
    styles.positionTryFallbacks = buildFallbacks(options.fallbacks);
  }

  if (options.visibility) {
    styles.positionVisibility = options.visibility;
  }

  if (options.justify) {
    styles.justifySelf = options.justify;
  }

  if (options.align) {
    styles.alignSelf = options.align;
  }

  return styles;
}
