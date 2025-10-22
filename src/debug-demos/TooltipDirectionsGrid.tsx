import { useState } from 'react';
import { Tooltip } from '../components/Tooltip';
import { createAnchorName } from '../lib/anchor-helpers';
import type { PositionAreaValue, DistanceSize, ArrowType, ArrowSize } from '../lib/anchor-types';

export interface ActiveTooltipInfo {
  anchorName: string;
  placement: PositionAreaValue;
  distance: DistanceSize;
  arrowType?: ArrowType;
  arrowSize?: ArrowSize;
  isVisible: boolean;
}

interface TooltipDirectionsGridProps {
  onActiveChange?: (info: ActiveTooltipInfo | null) => void;
  debugMode?: boolean;
  defaultDistance?: DistanceSize;
  defaultArrowType?: ArrowType;
  defaultArrowSize?: ArrowSize;
}

const DIRECTIONS: PositionAreaValue[] = [
  'top left',
  'top',
  'top right',
  'left',
  'center',
  'right',
  'bottom left',
  'bottom',
  'bottom right',
];

export function TooltipDirectionsGrid({
  onActiveChange,
  debugMode = false,
  defaultDistance = 'md',
  defaultArrowType = '2-headed',
  defaultArrowSize = 'md',
}: TooltipDirectionsGridProps) {
  const [activeDirection, setActiveDirection] = useState<PositionAreaValue | null>(null);

  const handleMouseEnter = (direction: PositionAreaValue) => {
    setActiveDirection(direction);

    if (onActiveChange) {
      onActiveChange({
        anchorName: createAnchorName(`dir-${direction.replace(/\s+/g, '-')}`),
        placement: direction,
        distance: defaultDistance,
        arrowType: defaultArrowType,
        arrowSize: defaultArrowSize,
        isVisible: true,
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveDirection(null);

    if (onActiveChange) {
      onActiveChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Tooltip Directions Grid</h2>
        <p className="text-muted-foreground">
          Hover over each button to see tooltips in different positions
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-2xl">
        {DIRECTIONS.map((direction) => {
          const anchorName = createAnchorName(`dir-${direction.replace(/\s+/g, '-')}`);
          const isActive = activeDirection === direction;

          return (
            <div key={direction} className="relative">
              <button
                onMouseEnter={() => handleMouseEnter(direction)}
                onMouseLeave={handleMouseLeave}
                style={{
                  anchorName: anchorName,
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: isActive ? '#3b82f6' : '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: isActive
                    ? '0 0 0 3px rgba(59, 130, 246, 0.3)'
                    : '0 2px 4px rgba(0, 0, 0, 0.1)',
                } as React.CSSProperties}
              >
                {direction === 'center' ? '⚓' : direction.replace(/\s+/g, '\n')}
              </button>

              {isActive && (
                <Tooltip
                  anchor={anchorName}
                  placement={direction}
                  arrow={{ type: defaultArrowType, size: defaultArrowSize }}
                  distance={defaultDistance}
                  className="z-50"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm">{direction}</div>
                    {debugMode && (
                      <div className="text-xs opacity-90 font-mono">
                        {defaultArrowType} • {defaultDistance}
                      </div>
                    )}
                  </div>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>

      {debugMode && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 max-w-2xl">
          <div className="text-sm">
            <strong className="text-blue-900 dark:text-blue-100">Debug Info:</strong>{' '}
            {activeDirection ? (
              <span className="font-mono text-blue-700 dark:text-blue-300">
                Active: {activeDirection} • Distance: {defaultDistance} • Arrow: {defaultArrowType}
              </span>
            ) : (
              <span className="text-blue-600 dark:text-blue-400">Hover over a button to activate</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
