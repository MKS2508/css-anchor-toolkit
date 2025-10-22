import { AnchorFocusCards, type AnchorFocusCard } from '../components/AnchorFocusCards';
import type { ActiveTooltipInfo } from './TooltipDirectionsGrid';

interface FocusCardsDebugProps {
  onActiveChange?: (info: ActiveTooltipInfo | null) => void;
  debugMode?: boolean;
}

const DEBUG_CARDS: AnchorFocusCard[] = [
  {
    id: 'card-top-2headed',
    title: 'Top + 2-Headed',
    description: 'Classic top placement with 2-headed arrow using margin magic technique',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">⬆️</div>
        <div className="font-bold text-lg mb-1">Top Placement</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">2-headed arrow</div>
        <div className="text-xs text-gray-500 mt-2">md distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'top',
      arrow: { type: '2-headed', size: 'md' },
      distance: 'md',
    },
    variant: 'primary',
  },
  {
    id: 'card-top-left-diagonal',
    title: 'Top-Left + Diagonal',
    description: 'Corner positioning with diagonal arrow using √2 formula for perfect alignment',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">↖️</div>
        <div className="font-bold text-lg mb-1">Top-Left Corner</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">diagonal arrow</div>
        <div className="text-xs text-gray-500 mt-2">xl distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'top left',
      arrow: { type: 'diagonal', size: 'lg' },
      distance: 'xl',
    },
    variant: 'success',
  },
  {
    id: 'card-right-4headed',
    title: 'Right + 4-Headed',
    description: 'Right placement with 4-headed arrow using 12-point polygon clip-path',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">➡️</div>
        <div className="font-bold text-lg mb-1">Right Placement</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">4-headed arrow</div>
        <div className="text-xs text-gray-500 mt-2">lg distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'right',
      arrow: { type: '4-headed', size: 'md' },
      distance: 'lg',
    },
    variant: 'warning',
  },
  {
    id: 'card-bottom-2headed',
    title: 'Bottom + 2-Headed',
    description: 'Bottom placement with compact spacing and small arrow for dense layouts',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">⬇️</div>
        <div className="font-bold text-lg mb-1">Bottom Placement</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">2-headed arrow</div>
        <div className="text-xs text-gray-500 mt-2">sm distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'bottom',
      arrow: { type: '2-headed', size: 'sm' },
      distance: 'sm',
    },
    variant: 'info',
  },
  {
    id: 'card-bottom-right-diagonal',
    title: 'Bottom-Right + Diagonal',
    description: 'Bottom-right corner with maximum spacing and diagonal arrow',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">↘️</div>
        <div className="font-bold text-lg mb-1">Bottom-Right Corner</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">diagonal arrow</div>
        <div className="text-xs text-gray-500 mt-2">2xl distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'bottom right',
      arrow: { type: 'diagonal', size: 'md' },
      distance: '2xl',
    },
    variant: 'default',
  },
  {
    id: 'card-left-4headed',
    title: 'Left + 4-Headed',
    description: 'Left placement with large 4-headed arrow for maximum visibility',
    content: (
      <div className="text-center p-4">
        <div className="text-4xl mb-3">⬅️</div>
        <div className="font-bold text-lg mb-1">Left Placement</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">4-headed arrow</div>
        <div className="text-xs text-gray-500 mt-2">md distance</div>
      </div>
    ),
    anchorConfig: {
      placement: 'left',
      arrow: { type: '4-headed', size: 'lg' },
      distance: 'md',
    },
    variant: 'primary',
  },
];

export function FocusCardsDebug({ onActiveChange, debugMode = false }: FocusCardsDebugProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 overflow-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Interactive Focus Cards</h2>
        <p className="text-muted-foreground mb-4">
          Hover over cards to see different tooltip configurations with arrows
        </p>
      </div>

      <AnchorFocusCards cards={DEBUG_CARDS} columns={3} gap="md" />

      {debugMode && (
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 max-w-3xl">
          <div className="text-sm space-y-2">
            <div>
              <strong className="text-purple-900 dark:text-purple-100">
                Focus Cards Demo:
              </strong>{' '}
              <span className="text-purple-700 dark:text-purple-300">
                6 cards showcasing different combinations of placement, arrow type, and distance
              </span>
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Each card demonstrates a unique configuration. Hover to see the tooltip with full
              details about placement, arrow type, and distance values.
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground max-w-2xl mt-4">
        <p>
          <strong>Tip:</strong> Notice how each card uses a different combination of placement
          (top, top-left, right, etc.), arrow type (2-headed, 4-headed, diagonal), and distance (sm,
          md, lg, xl, 2xl). The blur effect helps focus attention on the active card.
        </p>
      </div>
    </div>
  );
}
