/**
 * Enhanced Anchor Styles with Background Image
 *
 * Provides styled configurations for anchor elements across all demos
 * incorporating the anchor.avif image for better visual representation
 */

export const anchorStyles = {
  // Base anchor style with background image
  base: {
    backgroundImage: 'url(/src/anchor.avif)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease-in-out',
  },

  // Small anchor (for compact demos)
  small: {
    width: '60px',
    height: '60px',
    fontSize: '10px',
    padding: '4px',
  },

  // Medium anchor (standard size)
  medium: {
    width: '80px',
    height: '80px',
    fontSize: '12px',
    padding: '8px',
  },

  // Large anchor (for featured demos)
  large: {
    width: '120px',
    height: '120px',
    fontSize: '14px',
    padding: '12px',
  },

  // Extra large anchor (for hero sections)
  extraLarge: {
    width: '160px',
    height: '160px',
    fontSize: '16px',
    padding: '16px',
  },

  // Color variants
  colors: {
    blue: {
      backgroundColor: '#3b82f6',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
    green: {
      backgroundColor: '#10b981',
      borderColor: 'rgba(16, 185, 129, 0.5)',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    purple: {
      backgroundColor: '#8b5cf6',
      borderColor: 'rgba(139, 92, 246, 0.5)',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    orange: {
      backgroundColor: '#f59e0b',
      borderColor: 'rgba(245, 158, 11, 0.5)',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    },
    red: {
      backgroundColor: '#ef4444',
      borderColor: 'rgba(239, 68, 68, 0.5)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    pink: {
      backgroundColor: '#ec4899',
      borderColor: 'rgba(236, 72, 153, 0.5)',
      boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
    },
    indigo: {
      backgroundColor: '#6366f1',
      borderColor: 'rgba(99, 102, 241, 0.5)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    },
  },

  // Interactive states
  hover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    filter: 'brightness(1.1)',
  },
  active: {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    filter: 'brightness(0.95)',
  },
  dragging: {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    cursor: 'grabbing',
    filter: 'brightness(1.2)',
  },
};

/**
 * Helper function to create complete anchor styles
 */
export function createAnchorStyle(
  size: 'small' | 'medium' | 'large' | 'extraLarge' = 'medium',
  color: keyof typeof anchorStyles.colors = 'blue',
  state?: 'hover' | 'active' | 'dragging'
) {
  const baseStyle = anchorStyles.base;
  const sizeStyle = anchorStyles[size];
  const colorStyle = anchorStyles.colors[color];
  const stateStyle = state ? anchorStyles[state] : {};

  return {
    ...baseStyle,
    ...sizeStyle,
    ...colorStyle,
    ...stateStyle,
  };
}

/**
 * Pre-configured anchor styles for different demo contexts
 */
export const demoAnchorStyles = {
  // GridDemo styles
  gridMain: createAnchorStyle('large', 'blue'),
  gridSelector: createAnchorStyle('medium', 'purple'),
  gridSpanning: createAnchorStyle('medium', 'indigo'),

  // TooltipDemo styles
  tooltipBasic: createAnchorStyle('medium', 'blue'),
  tooltipArrow: createAnchorStyle('medium', 'green'),
  tooltipDirections: createAnchorStyle('small', 'purple'),
  tooltipDraggable: createAnchorStyle('medium', 'red'),

  // AdvancedDemo styles
  cornerAnchor: createAnchorStyle('medium', 'purple'),
  multipleAnchors: createAnchorStyle('small', 'red'), // For the 4 corner anchors
  sizingAnchor: createAnchorStyle('large', 'green'),
  scrollAnchor: createAnchorStyle('medium', 'pink'),

  // FallbackDemo styles
  flipTactics: createAnchorStyle('medium', 'blue'),
  overflowPrevention: createAnchorStyle('medium', 'purple'),
  tryOrder: createAnchorStyle('medium', 'orange'),
  draggableArea: createAnchorStyle('medium', 'blue'),
};