import { useState } from 'react';
import { Tooltip } from '../components/Tooltip';
import { createAnchorName } from '../lib/anchor-helpers';
import type { DistanceSize, ArrowType } from '../lib/anchor-types';

interface DraggableDemoProps {
  debugMode?: boolean;
  defaultDistance?: DistanceSize;
  defaultArrowType?: ArrowType;
}

export function DraggableDemo({
  debugMode = false,
  defaultDistance = 'md',
  defaultArrowType = '2-headed',
}: DraggableDemoProps) {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const anchorName = createAnchorName('draggable-anchor');

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Draggable Anchor with Following Tooltip</h2>
        <p className="text-muted-foreground">
          Drag the anchor around - the tooltip follows automatically with CSS anchoring
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div
          className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
          style={{ height: '500px' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Instructions */}
          <div className="absolute top-4 left-4 right-4 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border max-w-md">
            <div className="text-sm space-y-2">
              <div className="font-bold">🎮 Controls:</div>
              <div className="text-xs space-y-1">
                <div>• Click and drag the anchor element</div>
                <div>• Notice how the tooltip stays perfectly positioned</div>
                <div>• No JavaScript calculations needed - pure CSS!</div>
                <div>
                  • Toggle tooltip visibility with the button below
                </div>
              </div>
            </div>
          </div>

          {/* Draggable Anchor */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
              anchorName: anchorName,
              cursor: isDragging ? 'grabbing' : 'grab',
              padding: '20px 28px',
              backgroundColor: isDragging ? '#f59e0b' : '#3b82f6',
              color: 'white',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              userSelect: 'none',
              boxShadow: isDragging
                ? '0 0 0 5px rgba(245, 158, 11, 0.3), 0 8px 16px rgba(0, 0, 0, 0.3)'
                : '0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
              transition: isDragging ? 'none' : 'all 0.2s',
              zIndex: 10,
            } as React.CSSProperties}
          >
            <div className="text-center">
              <div className="text-lg mb-1">⚓</div>
              <div>DRAG ME!</div>
              <div className="text-xs opacity-75 mt-1">
                {isDragging ? 'Dragging...' : 'Click & Drag'}
              </div>
            </div>
          </div>

          {/* Tooltip that follows */}
          {showTooltip && (
            <Tooltip
              anchor={anchorName}
              placement="top"
              arrow={{ type: defaultArrowType, size: 'md' }}
              distance={defaultDistance}
              style={{ pointerEvents: 'none' } as React.CSSProperties}
            >
              <div className="space-y-1">
                <div className="font-bold text-sm">I Follow Automatically! 🎯</div>
                <div className="text-xs opacity-90">
                  No JS position calculations needed
                </div>
                {debugMode && (
                  <div className="text-xs opacity-75 font-mono pt-1 border-t border-white/20">
                    position: ({Math.round(position.x)}, {Math.round(position.y)})
                  </div>
                )}
              </div>
            </Tooltip>
          )}

          {/* Position indicator */}
          {debugMode && (
            <div className="absolute bottom-4 right-4 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg border">
              <div className="text-xs font-mono">
                <div className="font-bold mb-1">Position:</div>
                <div>X: {Math.round(position.x)}px</div>
                <div>Y: {Math.round(position.y)}px</div>
                <div className="mt-2 pt-2 border-t">
                  <div className="font-bold mb-1">State:</div>
                  <div>Dragging: {isDragging ? '✓' : '✗'}</div>
                  <div>Tooltip: {showTooltip ? '✓' : '✗'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {showTooltip ? 'Hide' : 'Show'} Tooltip
          </button>
          <button
            onClick={() => setPosition({ x: 200, y: 200 })}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Reset Position
          </button>
        </div>
      </div>

      {debugMode && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700 max-w-3xl">
          <div className="text-sm">
            <strong className="text-amber-900 dark:text-amber-100">Draggable Demo:</strong>{' '}
            <span className="text-amber-700 dark:text-amber-300">
              The tooltip uses <code className="font-mono">position-anchor</code> to stay perfectly
              aligned with the dragging element. No manual position calculations required!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
