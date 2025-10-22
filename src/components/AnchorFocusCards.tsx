import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';
import { createAnchorName } from '@/lib/anchor-helpers';
import type {
  AnchorName,
  PositionAreaValue,
  ArrowOptions,
  DistanceSize,
} from '@/lib/anchor-types';

export interface AnchorFocusCard {
  id: string;
  title: string;
  description?: string;
  anchorConfig: {
    placement: PositionAreaValue;
    arrow?: boolean | ArrowOptions;
    distance?: DistanceSize;
  };
  content: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
}

interface AnchorFocusCardsProps {
  cards: AnchorFocusCard[];
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: AnchorFocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const anchorName: AnchorName = createAnchorName(card.id);
    const isHovered = hovered === index;
    const isBlurred = hovered !== null && !isHovered;

    const variantClasses = {
      default: 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700',
      primary: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
      success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
      info: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700',
    };

    const variantHover = {
      default: 'hover:border-gray-400 hover:shadow-xl',
      primary: 'hover:border-blue-400 hover:shadow-blue-100 dark:hover:shadow-blue-900/50',
      success: 'hover:border-green-400 hover:shadow-green-100 dark:hover:shadow-green-900/50',
      warning: 'hover:border-yellow-400 hover:shadow-yellow-100 dark:hover:shadow-yellow-900/50',
      info: 'hover:border-purple-400 hover:shadow-purple-100 dark:hover:shadow-purple-900/50',
    };

    const variant = card.variant || 'default';

    return (
      <>
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            'rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer',
            'relative overflow-hidden',
            variantClasses[variant],
            variantHover[variant],
            isHovered && 'scale-105 shadow-2xl z-10',
            isBlurred && 'blur-sm scale-95 opacity-50'
          )}
          style={{
            anchorName: anchorName,
          }}
        >
          <div className="relative z-10">{card.content}</div>

          {/* Hover indicator */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
          )}
        </div>

        {/* Tooltip anclado */}
        {isHovered && (
          <Tooltip
            anchor={anchorName}
            placement={card.anchorConfig.placement}
            arrow={card.anchorConfig.arrow}
            distance={card.anchorConfig.distance || 'md'}
            className="z-50"
          >
            <div className="max-w-xs">
              <div className="font-bold text-sm mb-1">{card.title}</div>
              {card.description && (
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  {card.description}
                </div>
              )}
              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                <div>placement: {card.anchorConfig.placement}</div>
                {card.anchorConfig.arrow && (
                  <div>
                    arrow:{' '}
                    {typeof card.anchorConfig.arrow === 'object'
                      ? card.anchorConfig.arrow.type
                      : 'true'}
                  </div>
                )}
                <div>distance: {card.anchorConfig.distance || 'md'}</div>
              </div>
            </div>
          </Tooltip>
        )}
      </>
    );
  }
);

Card.displayName = 'AnchorFocusCard';

export function AnchorFocusCards({
  cards,
  columns = 3,
  gap = 'md',
  className = '',
}: AnchorFocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid w-full',
        gridColsClass[columns],
        gapClass[gap],
        className
      )}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

// Export types para uso externo
export type { AnchorFocusCardsProps };
