import { type ReactNode, type CSSProperties, useEffect, useRef, useState } from 'react';
import { CSS_VARS } from '../lib/anchor-core';
import { createAnchorName, buildFallbacks } from '../lib/anchor-helpers';
import type { AnchorName, PositionAreaValue, DistanceSize } from '../lib/anchor-types';

/**
 * Props para ContextMenu component
 *
 * @version 2.0.0 - BREAKING CHANGES
 */
export interface ContextMenuProps {
  /** Nombre del anchor al que se vincula */
  anchor: AnchorName;

  /** Posición preferida en el grid 3×3 */
  area?: PositionAreaValue;

  /** Distancia usando CSS custom properties */
  distance?: DistanceSize;

  /** Tipo de trigger */
  trigger?: 'click' | 'contextmenu';

  /** Callback al cerrar */
  onClose?: () => void;

  /** Contenido del menú */
  children: ReactNode;

  /** Estilos adicionales */
  style?: CSSProperties;

  /** Class name adicional */
  className?: string;
}

/**
 * ContextMenu component con CSS Anchor Positioning
 *
 * @example
 * ```tsx
 * const { isOpen, anchorName, openMenu, closeMenu } = useContextMenu();
 *
 * <div onContextMenu={(e) => {
 *   e.preventDefault();
 *   openMenu(e);
 * }}>
 *   Right click me
 * </div>
 *
 * {isOpen && (
 *   <ContextMenu anchor={anchorName} onClose={closeMenu}>
 *     <MenuItem>Action</MenuItem>
 *   </ContextMenu>
 * )}
 * ```
 */
export function ContextMenu({
  anchor,
  area = 'bottom right',
  distance = 'sm',
  trigger = 'contextmenu',
  onClose,
  children,
  style = {},
  className = '',
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
  }, [onClose]);

  useEffect(() => {
    if (!onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const menuStyles: CSSProperties = {
    position: 'fixed',
    positionAnchor: anchor,
    positionArea: area,
    positionTryFallbacks: buildFallbacks('auto'),
    margin: CSS_VARS.distances[distance],

    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    padding: '4px',
    minWidth: '180px',
    zIndex: 9999,

    animation: 'contextMenuFadeIn 0.15s ease-out',

    ...style,
  } as CSSProperties;

  return (
    <div
      ref={menuRef}
      className={`css-anchor-context-menu ${className}`}
      style={menuStyles}
      role="menu"
    >
      {children}
    </div>
  );
}

export interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  icon,
  style = {},
  className = '',
}: MenuItemProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const itemStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontSize: '14px',
    color: disabled ? '#999' : '#333',
    userSelect: 'none',
    transition: 'background-color 0.1s',

    ...style,
  };

  return (
    <div
      className={`context-menu-item ${className}`}
      style={itemStyles}
      onClick={handleClick}
      role="menuitem"
      aria-disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {icon && <span className="menu-item-icon">{icon}</span>}
      <span className="menu-item-label">{children}</span>
    </div>
  );
}

export function MenuSeparator() {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        margin: '4px 0',
      }}
      role="separator"
    />
  );
}

export function useContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorName] = useState(() => createAnchorName(`menu-${Math.random()}`));
  const anchorElementRef = useRef<HTMLDivElement | null>(null);

  const openMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!anchorElementRef.current) {
      const anchor = document.createElement('div');
      anchor.style.position = 'fixed';
      anchor.style.width = '1px';
      anchor.style.height = '1px';
      anchor.style.pointerEvents = 'none';
      anchor.style.anchorName = anchorName;
      document.body.appendChild(anchor);
      anchorElementRef.current = anchor;
    }

    anchorElementRef.current.style.left = `${event.clientX}px`;
    anchorElementRef.current.style.top = `${event.clientY}px`;

    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (anchorElementRef.current) {
        document.body.removeChild(anchorElementRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    anchorName,
    openMenu,
    closeMenu,
  };
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes contextMenuFadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}
