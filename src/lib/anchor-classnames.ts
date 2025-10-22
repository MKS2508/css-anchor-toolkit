/**
 * @file anchor-classnames.ts
 * @description Class name builders para utility classes
 *
 * Funciones para componer class names del SCSS core.
 * Genera strings para usar con className en React o class en HTML.
 *
 * @version 2.0.0
 * @author MKS2508
 */

import type { ClassNamesOptions } from './anchor-types';

/**
 * Convierte position-area value a class name
 *
 * Mapea valores como "top left" → "anchor-top-left"
 */
function areaToClassName(area: string): string {
  return `anchor-${area.replace(/\s+/g, '-')}`;
}

/**
 * Genera string de class names para positioned element
 *
 * Compone utility classes del SCSS core en un string listo para className.
 *
 * @param options - Opciones de class names
 * @returns String de classes separadas por espacios
 *
 * @example
 * ```tsx
 * <div className={anchorClasses({
 *   area: 'top',
 *   distance: 'md',
 *   fallbacks: 'auto',
 *   justify: 'center'
 * })}>
 *   // Output: "positioned anchor-top anchor-distance-md flip-auto anchor-justify-center"
 * </div>
 * ```
 *
 * @example
 * ```tsx
 * // 576 configuraciones posibles: 36 positions × 4 justify × 4 align
 * <div className={anchorClasses({
 *   area: 'top left',
 *   justify: 'start',
 *   align: 'center',
 *   distance: 'lg'
 * })}>
 *   // Output: "positioned anchor-top-left anchor-justify-start anchor-align-center anchor-distance-lg"
 * </div>
 * ```
 */
export function anchorClasses(options: ClassNamesOptions): string {
  const classes: string[] = [];

  if (options.base !== false) {
    classes.push('positioned');
  }

  if (options.area) {
    classes.push(areaToClassName(options.area));
  }

  if (options.distance) {
    classes.push(`anchor-distance-${options.distance}`);
  }

  if (options.justify) {
    classes.push(`anchor-justify-${options.justify}`);
  }

  if (options.align) {
    classes.push(`anchor-align-${options.align}`);
  }

  if (options.fallbacks === 'auto') {
    classes.push('flip-auto');
  } else if (options.fallbacks) {
    options.fallbacks.forEach((tactic) => classes.push(`flip-${tactic}`));
  }

  return classes.join(' ');
}

/**
 * Genera class name para anchor element (opcional)
 *
 * El anchor solo necesita anchor-name CSS, pero esta utility
 * puede agregar .anchor base class si se desea.
 *
 * @returns Base class 'anchor' o string vacío
 *
 * @example
 * ```tsx
 * <button className={anchorBaseClass()}>
 *   // Output: "anchor"
 * </button>
 * ```
 */
export function anchorBaseClass(): string {
  return 'anchor';
}

/**
 * Genera class name para visibility utilities
 *
 * @param visibility - Tipo de visibility
 * @returns Class name para position-visibility
 *
 * @example
 * ```tsx
 * <div className={visibilityClass('anchors-visible')}>
 *   // Output: "visible-anchors"
 * </div>
 * ```
 */
export function visibilityClass(
  visibility: 'always' | 'anchors-visible' | 'no-overflow'
): string {
  const map = {
    always: 'visible-always',
    'anchors-visible': 'visible-anchors',
    'no-overflow': 'visible-no-overflow',
  };

  return map[visibility];
}

/**
 * Genera class names para z-index utilities
 *
 * @param level - Nivel de z-index
 * @returns Class name para z-index
 *
 * @example
 * ```tsx
 * <div className={zIndexClass('tooltip')}>
 *   // Output: "anchor-z-tooltip"
 * </div>
 * ```
 */
export function zIndexClass(level: 'tooltip' | 'popover' | 'dropdown'): string {
  return `anchor-z-${level}`;
}

/**
 * Combina múltiples class names en un string
 *
 * Filtra valores falsy y elimina duplicados.
 *
 * @param classNames - Array de class names
 * @returns String de classes combinadas
 *
 * @example
 * ```tsx
 * const classes = combineClasses([
 *   'positioned',
 *   anchorClasses({ area: 'top' }),
 *   visibilityClass('always'),
 *   condition && 'extra-class',
 *   null
 * ]);
 * // Output: "positioned anchor-top visible-always extra-class"
 * ```
 */
export function combineClasses(
  classNames: (string | false | null | undefined)[]
): string {
  const filtered = classNames.filter(Boolean) as string[];
  const unique = Array.from(new Set(filtered));
  return unique.join(' ');
}
