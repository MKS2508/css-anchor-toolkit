import { useState } from 'react';
import { Tooltip } from '../components/Tooltip';
import { createAnchorName } from '../lib/anchor-helpers';
import type { ArrowType, ArrowSize, DistanceSize } from '../lib/anchor-types';
import type { ActiveTooltipInfo } from './TooltipDirectionsGrid';

interface ArrowTypesComparisonProps {
  onActiveChange?: (info: ActiveTooltipInfo | null) => void;
  debugMode?: boolean;
  defaultDistance?: DistanceSize;
  defaultArrowSize?: ArrowSize;
}

const ARROW_TYPES: { type: ArrowType; title: string; description: string }[] = [
  {
    type: '2-headed',
    title: '2-Headed Arrow',
    description: 'Margin magic vertical - flips top/bottom',
  },
  {
    type: '4-headed',
    title: '4-Headed Arrow',
    description: 'Polygon 12 points - all directions',
  },
  {
    type: 'diagonal',
    title: 'Diagonal Arrow',
    description: '√2 formula - perfect for corners',
  },
];

export function ArrowTypesComparison({
  onActiveChange,
  debugMode = false,
  defaultDistance = 'md',
  defaultArrowSize = 'md',
}: ArrowTypesComparisonProps) {
  const [activeType, setActiveType] = useState<ArrowType | null>(null);

  const handleMouseEnter = (type: ArrowType) => {
    setActiveType(type);

    if (onActiveChange) {
      onActiveChange({
        anchorName: createAnchorName(`arrow-${type}`),
        placement: 'top',
        distance: defaultDistance,
        arrowType: type,
        arrowSize: defaultArrowSize,
        isVisible: true,
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveType(null);

    if (onActiveChange) {
      onActiveChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Arrow Types Comparison</h2>
        <p className="text-muted-foreground">
          Compare the 3 arrow techniques from css-tip.com research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {ARROW_TYPES.map(({ type, title, description }) => {
          const anchorName = createAnchorName(`arrow-${type}`);
          const isActive = activeType === type;

          return (
            <div key={type} className="flex flex-col items-center gap-4">
              {/* Card Info */}
              <div className="text-center space-y-2 px-4">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded">
                  {type}
                </div>
              </div>

              {/* Anchor Button */}
              <div className="relative flex items-center justify-center min-h-[200px]">
                <button
                  onMouseEnter={() => handleMouseEnter(type)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    anchorName: anchorName,
                    padding: '20px 28px',
                    backgroundColor: isActive ? '#10b981' : '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive
                      ? '0 0 0 4px rgba(16, 185, 129, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
                      : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  } as React.CSSProperties}
                >
                  Hover Me
                </button>

                {isActive && (
                  <Tooltip
                    anchor={anchorName}
                    placement="top"
                    arrow={{ type: type, size: defaultArrowSize }}
                    distance={defaultDistance}
                    className="z-50"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm">{title}</div>
                      <div className="text-xs opacity-90">{description}</div>
                      {debugMode && (
                        <div className="text-xs opacity-75 font-mono pt-1 border-t border-white/20">
                          size: {defaultArrowSize} • dist: {defaultDistance}
                        </div>
                      )}
                    </div>
                  </Tooltip>
                )}
              </div>

              {/* Technique Badge */}
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`px-3 py-1 rounded-full font-medium ${
                    type === '2-headed'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : type === '4-headed'
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                  }`}
                >
                  {type === '2-headed'
                    ? 'Vertical Flip'
                    : type === '4-headed'
                    ? 'All Directions'
                    : 'Corner Optimized'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {debugMode && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 max-w-3xl">
          <div className="text-sm">
            <strong className="text-green-900 dark:text-green-100">Arrow Type:</strong>{' '}
            {activeType ? (
              <span className="font-mono text-green-700 dark:text-green-300">
                {activeType} • {defaultArrowSize} size • {defaultDistance} distance
              </span>
            ) : (
              <span className="text-green-600 dark:text-green-400">
                Hover over any button to compare arrows
              </span>
            )}
          </div>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground max-w-2xl">
        <p>
          Each arrow type uses a different CSS technique. 2-headed uses margin magic, 4-headed uses
          a 12-point polygon clip-path, and diagonal uses the √2 formula for perfect corner
          alignment.
        </p>
      </div>
    </div>
  );
}
