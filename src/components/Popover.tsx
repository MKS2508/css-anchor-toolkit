import { type ReactNode, type CSSProperties, useEffect, useRef } from 'react';
import { CSS_VARS } from '../lib/anchor-core';
import { buildFallbacks } from '../lib/anchor-helpers';
import type {
  AnchorName,
  PositionAreaValue,
  DistanceSize,
  PositionVisibility,
} from '../lib/anchor-types';

/**
 * Props para Popover component
 *
 * @version 2.0.0 - BREAKING CHANGES
 */
export interface PopoverProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia usando CSS custom properties */
  distance?: DistanceSize;

  /** Habilitar fallbacks automáticos */
  fallbacks?: boolean;

  /** Control de visibilidad según estado del anchor */
  visibility?: PositionVisibility;

  /** Mostrar el popover */
  open: boolean;

  /** Callback al cerrar */
  onClose?: () => void;

  /** Cerrar al hacer click fuera */
  closeOnOutsideClick?: boolean;

  /** Contenido */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}

/**
 * Popover component con CSS Anchor Positioning
 *
 * @example
 * ```tsx
 * <button style={{ anchorName: '--trigger' }} onClick={() => setOpen(true)}>
 *   Open
 * </button>
 *
 * <Popover
 *   anchor="--trigger"
 *   area="bottom"
 *   distance="md"
 *   open={open}
 *   onClose={() => setOpen(false)}
 * >
 *   Popover content
 * </Popover>
 * ```
 */
export function Popover({
  anchor,
  area = 'bottom',
  distance = 'sm',
  fallbacks = true,
  visibility = 'anchors-visible',
  open,
  onClose,
  closeOnOutsideClick = true,
  children,
  style = {},
  className = '',
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !closeOnOutsideClick || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, closeOnOutsideClick, onClose]);

  useEffect(() => {
    if (!open || !onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const popoverStyles: CSSProperties = {
    position: 'absolute',
    positionAnchor: anchor,
    positionArea: area,
    positionVisibility: visibility,
    margin: CSS_VARS.distances[distance],

    ...(fallbacks && {
      positionTryFallbacks: buildFallbacks('auto'),
    }),

    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px',
    minWidth: '200px',
    maxWidth: '400px',
    zIndex: 1000,

    ...style,
  } as CSSProperties;

  return (
    <div
      ref={popoverRef}
      className={`css-anchor-popover ${className}`}
      style={popoverStyles}
      role="dialog"
      aria-modal="false"
    >
      {children}
    </div>
  );
}

/**
 * Hook para manejar estado del popover
 */
export function usePopover(initialState = false) {
  const [open, setOpen] = React.useState(initialState);

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  const openPopover = React.useCallback(() => {
    setOpen(true);
  }, []);

  return [open, toggle, close, openPopover] as const;
}

import React from 'react';
