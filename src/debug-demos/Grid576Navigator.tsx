import { useState } from 'react';
import { Button } from '../components/ui/button';
import { createAnchorName } from '../lib/anchor-helpers';
import type { PositionAreaValue, JustifyValue, AlignValue } from '../lib/anchor-types';
import type { ActiveTooltipInfo } from './TooltipDirectionsGrid';

interface Grid576NavigatorProps {
  onActiveChange?: (info: ActiveTooltipInfo | null) => void;
  debugMode?: boolean;
}

const POSITIONS: PositionAreaValue[] = [
  'top',
  'bottom',
  'left',
  'right',
  'center',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'top center',
  'bottom center',
  'left center',
  'right center',
  'span-top',
  'span-bottom',
  'span-left',
  'span-right',
  'span-all',
];

const JUSTIFY_VALUES: JustifyValue[] = ['start', 'center', 'end', 'anchor-center'];
const ALIGN_VALUES: AlignValue[] = ['start', 'center', 'end', 'anchor-center'];

export function Grid576Navigator({ onActiveChange, debugMode = false }: Grid576NavigatorProps) {
  const [positionIndex, setPositionIndex] = useState(0);
  const [justifyIndex, setJustifyIndex] = useState(3);
  const [alignIndex, setAlignIndex] = useState(3);

  const currentPosition = POSITIONS[positionIndex];
  const currentJustify = JUSTIFY_VALUES[justifyIndex];
  const currentAlign = ALIGN_VALUES[alignIndex];

  const configNumber =
    positionIndex * (JUSTIFY_VALUES.length * ALIGN_VALUES.length) +
    justifyIndex * ALIGN_VALUES.length +
    alignIndex +
    1;

  const anchorName = createAnchorName('grid-576-anchor');

  const handlePrevPosition = () =>
    setPositionIndex((i) => (i - 1 + POSITIONS.length) % POSITIONS.length);
  const handleNextPosition = () => setPositionIndex((i) => (i + 1) % POSITIONS.length);

  const handlePrevJustify = () =>
    setJustifyIndex((i) => (i - 1 + JUSTIFY_VALUES.length) % JUSTIFY_VALUES.length);
  const handleNextJustify = () => setJustifyIndex((i) => (i + 1) % JUSTIFY_VALUES.length);

  const handlePrevAlign = () =>
    setAlignIndex((i) => (i - 1 + ALIGN_VALUES.length) % ALIGN_VALUES.length);
  const handleNextAlign = () => setAlignIndex((i) => (i + 1) % ALIGN_VALUES.length);

  const handleRandom = () => {
    setPositionIndex(Math.floor(Math.random() * POSITIONS.length));
    setJustifyIndex(Math.floor(Math.random() * JUSTIFY_VALUES.length));
    setAlignIndex(Math.floor(Math.random() * ALIGN_VALUES.length));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Grid 576 Configurations Navigator</h2>
        <p className="text-muted-foreground">
          Navigate through 18 position-area × 4 justify-self × 4 align-self = 288 combinations
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-8 max-w-5xl w-full">
        {/* Left: Controls */}
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg border">
          {/* Config Counter */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center border border-blue-200 dark:border-blue-700">
            <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
              CONFIGURATION
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              #{configNumber}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              of 288 configs (subset)
            </div>
          </div>

          {/* Position Control */}
          <div className="space-y-2">
            <label className="text-sm font-bold">
              Position Area ({positionIndex + 1}/{POSITIONS.length})
            </label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePrevPosition}>
                ←
              </Button>
              <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded text-sm text-center font-mono">
                {currentPosition}
              </div>
              <Button size="sm" variant="outline" onClick={handleNextPosition}>
                →
              </Button>
            </div>
          </div>

          {/* Justify Control */}
          <div className="space-y-2">
            <label className="text-sm font-bold">
              Justify Self ({justifyIndex + 1}/{JUSTIFY_VALUES.length})
            </label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePrevJustify}>
                ←
              </Button>
              <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded text-sm text-center font-mono">
                {currentJustify}
              </div>
              <Button size="sm" variant="outline" onClick={handleNextJustify}>
                →
              </Button>
            </div>
          </div>

          {/* Align Control */}
          <div className="space-y-2">
            <label className="text-sm font-bold">
              Align Self ({alignIndex + 1}/{ALIGN_VALUES.length})
            </label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePrevAlign}>
                ←
              </Button>
              <div className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded text-sm text-center font-mono">
                {currentAlign}
              </div>
              <Button size="sm" variant="outline" onClick={handleNextAlign}>
                →
              </Button>
            </div>
          </div>

          <Button onClick={handleRandom} className="w-full" variant="default">
            🎲 Random Configuration
          </Button>
        </div>

        {/* Right: Preview */}
        <div className="relative w-[400px] h-[400px] border rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
          {/* Grid visualization */}
          <div
            className="absolute"
            style={{
              width: '120px',
              height: '120px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '2px',
              opacity: 0.2,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  border: '1px dashed #3b82f6',
                  backgroundColor: i === 4 ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                }}
              />
            ))}
          </div>

          {/* Anchor */}
          <div
            style={{
              anchorName: anchorName,
              padding: '16px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
            } as React.CSSProperties}
          >
            ⚓ ANCHOR
          </div>

          {/* Positioned Element */}
          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: currentPosition,
              justifySelf: currentJustify,
              alignSelf: currentAlign,
              padding: '12px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              maxWidth: '180px',
            } as React.CSSProperties}
          >
            <div className="text-xs opacity-90 mb-1">Config #{configNumber}</div>
            <div className="text-xs opacity-75 font-mono leading-tight">
              {currentPosition}
              <br />
              j:{currentJustify.slice(0, 6)}
              <br />
              a:{currentAlign.slice(0, 6)}
            </div>
          </div>
        </div>
      </div>

      {debugMode && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700 max-w-3xl">
          <div className="text-sm">
            <strong className="text-indigo-900 dark:text-indigo-100">Current Config:</strong>{' '}
            <span className="font-mono text-indigo-700 dark:text-indigo-300">
              position-area: {currentPosition} • justify-self: {currentJustify} • align-self:{' '}
              {currentAlign}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
