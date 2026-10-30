import { type ReactNode, type CSSProperties, type FC } from 'react';
import { CSS_VARS } from '../lib/anchor-core';
import { buildFallbacks } from '../lib/anchor-helpers';
import type {
  AnchorName,
  PositionAreaValue,
  DistanceSize,
  ArrowSize,
  ArrowOptions,
} from '../lib/anchor-types';

/**
 * Props para Tooltip component
 *
 * @version 2.0.0 - BREAKING CHANGES
 */
export interface TooltipProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición del tooltip en el grid 3×3 (36 valores disponibles) */
  placement?: PositionAreaValue;

  /** Arrow configuration - boolean para arrow simple o ArrowOptions para control completo */
  arrow?: boolean | ArrowOptions;

  /** Distancia usando CSS custom properties (sm, md, lg, xl, 2xl) */
  distance?: DistanceSize;

  /** Contenido del tooltip */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}

/**
 * Tooltip component con CSS Anchor Positioning
 *
 * Implementa técnicas del SCSS core basadas en research de css-tip.com:
 * - Position-area para grid 3×3
 * - Auto-fallbacks con flip-block, flip-inline
 * - CSS custom properties para distances
 * - Arrow types del research (2-headed, 4-headed, diagonal)
 *
 * @example
 * ```tsx
 * <button style={{ anchorName: '--my-btn' }}>Hover</button>
 *
 * <Tooltip anchor="--my-btn" placement="top" distance="md" arrow>
 *   Tooltip content
 * </Tooltip>
 * ```
 *
 * @example Advanced arrow types
 * ```tsx
 * <Tooltip
 *   anchor="--btn"
 *   placement="top left"
 *   arrow={{ type: 'diagonal', size: 'lg' }}
 *   distance="xl"
 * >
 *   Corner tooltip con diagonal arrow
 * </Tooltip>
 * ```
 */
export const Tooltip: FC<TooltipProps> = ({
  anchor,
  placement = 'top',
  arrow = true,
  distance = 'md',
  children,
  style = {},
  className = '',
}) => {
  const arrowOptions = getArrowOptions(arrow);

  const tooltipStyles: CSSProperties = {
    position: 'absolute',
    positionAnchor: anchor,
    positionArea: placement,
    positionTryFallbacks: buildFallbacks('auto'),
    positionVisibility: 'anchors-visible',
    margin: CSS_VARS.distances[distance],

    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    maxWidth: '250px',
    zIndex: 1,
    pointerEvents: 'none',

    ...style,
  } as CSSProperties;

  return (
    <div
      className={`css-anchor-tooltip ${className}`}
      style={tooltipStyles}
      data-arrow={arrowOptions ? 'true' : 'false'}
      data-arrow-type={arrowOptions?.type}
    >
      {children}
      {arrowOptions && <TooltipArrow options={arrowOptions} distance={distance} />}
    </div>
  );
};

/**
 * Arrow component - Implementa técnicas del SCSS core
 */
const TooltipArrow: FC<{ options: ArrowOptions; distance: DistanceSize }> = ({
  options,
  distance,
}) => {
  const arrowSize = options.size || 'md';
  const arrowType = options.type;

  const baseStyles: CSSProperties = {
    position: 'absolute' as const,
    backgroundColor: 'inherit',
    zIndex: -1,
    margin: 'inherit',
  };

  const arrowStyles: CSSProperties = {
    ...baseStyles,
    ...getArrowTypeStyles(arrowType, arrowSize, distance),
  };

  return <div className="tooltip-arrow" style={arrowStyles} />;
};

/**
 * Helper: Normaliza arrow prop a ArrowOptions
 */
function getArrowOptions(arrow: boolean | ArrowOptions | undefined): ArrowOptions | null {
  if (!arrow) return null;

  if (typeof arrow === 'boolean') {
    return { type: '2-headed', size: 'md' };
  }

  return arrow;
}

/**
 * Helper: Genera estilos específicos por tipo de arrow
 *
 * Implementa las 3 técnicas del research:
 * - 2-headed: Margin magic vertical (https://css-tip.com/tooltip-anchor/)
 * - 4-headed: Polygon 12 puntos (https://css-tip.com/tooltip-anchor-2/)
 * - diagonal: √2 formula corners (https://css-tip.com/tooltip-anchor-3/)
 */
function getArrowTypeStyles(
  type: ArrowOptions['type'],
  size: ArrowSize,
  distance: DistanceSize
): CSSProperties {
  const sizeVar = CSS_VARS.arrowSizes[size];
  const distanceVar = CSS_VARS.distances[distance];

  switch (type) {
    case '2-headed':
      return {
        width: sizeVar,
        height: '100%',
        top: `calc(anchor(--tooltip top) - ${distanceVar})`,
        bottom: `calc(anchor(--tooltip bottom) - ${distanceVar})`,
        left: `calc(anchor(--anchor center) - ${sizeVar}/2)`,
        clipPath: `polygon(
          50% 0.2em,
          100% ${distanceVar},
          100% calc(100% - ${distanceVar}),
          50% calc(100% - 0.2em),
          0 calc(100% - ${distanceVar}),
          0 ${distanceVar}
        )`,
      } as CSSProperties;

    case '4-headed':
      return {
        inset: `calc(-1 * ${distanceVar})` as any,
        clipPath: `polygon(
          calc(50% - ${sizeVar}) ${distanceVar},
          50% 0.2em,
          calc(50% + ${sizeVar}) ${distanceVar},
          calc(100% - ${distanceVar}) calc(50% - ${sizeVar}),
          calc(100% - 0.2em) 50%,
          calc(100% - ${distanceVar}) calc(50% + ${sizeVar}),
          calc(50% + ${sizeVar}) calc(100% - ${distanceVar}),
          50% calc(100% - 0.2em),
          calc(50% - ${sizeVar}) calc(100% - ${distanceVar}),
          ${distanceVar} calc(50% + ${sizeVar}),
          0.2em 50%,
          ${distanceVar} calc(50% - ${sizeVar})
        )` as any,
      };

    case 'diagonal':
      return {
        width: 'anchor-size(--tooltip width)' as any,
        height: 'anchor-size(--tooltip height)' as any,
        clipPath: `polygon(
          0 0,
          calc(100% - ${distanceVar} - ${sizeVar}) 0,
          calc(100% - ${distanceVar}) ${sizeVar},
          100% ${distanceVar},
          calc(100% - ${sizeVar}) calc(${distanceVar} + ${sizeVar}),
          0 0
        )` as any,
      };
  }
}

/**
 * Hook para controlar visibilidad del tooltip con hover
 *
 * @param delay - Delay en ms antes de mostrar tooltip (default: 200ms)
 * @returns [show, handlers] - Estado y handlers para onMouseEnter/Leave
 *
 * @example
 * ```tsx
 * const [showTooltip, tooltipHandlers] = useTooltipHover();
 *
 * <button {...tooltipHandlers} style={{ anchorName: '--btn' }}>
 *   Hover me
 * </button>
 * {showTooltip && (
 *   <Tooltip anchor="--btn">Content</Tooltip>
 * )}
 * ```
 */
export function useTooltipHover(delay = 200) {
  const [show, setShow] = React.useState(false);
  const timeoutRef = React.useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShow(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShow(false);
  };

  return [
    show,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  ] as const;
}

import React from 'react';
