import React, { useState } from 'react';
import { Tooltip, useTooltipHover } from '../components/Tooltip';
import { createAnchorName } from '../lib/anchor-helpers';
import { demoAnchorStyles, anchorStyles } from '../styles/anchor-styles';
import { AnchorFocusCards, type AnchorFocusCard } from '../components/AnchorFocusCards';
import type { DistanceSize, ArrowSize, ArrowType } from '../lib/anchor-types';

/**
 * Demo de Tooltips con CSS Anchor Positioning
 *
 * Muestra las 3 variantes principales de tooltips:
 * 1. Tooltip básico con hover
 * 2. Tooltip con arrow dinámico (margin magic)
 * 3. Tooltip en esquinas con corner positioning
 */
export function TooltipDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Tooltip Demos</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <TooltipBasicDemo />
        <TooltipArrowDemo />
        <TooltipDirectionsDemo />
        <TooltipDraggableDemo />
        <TooltipConfigShowcase />
      </div>
    </div>
  );
}

/**
 * Demo 1: Tooltip básico con hover
 */
function TooltipBasicDemo() {
  const [show, handlers] = useTooltipHover(300);
  const anchorName = createAnchorName('basic-button');

  return (
    <section>
      <h2>1. Tooltip Básico con Hover</h2>
      <p>Hover sobre el botón para ver el tooltip</p>

      <div style={{ marginTop: '20px' }}>
        <button
          {...handlers}
          style={{
            ...demoAnchorStyles.tooltipBasic,
            cursor: 'pointer',
            anchorName: anchorName,
          }}
        >
          ⚓ Hover me
        </button>

        {show && (
          <Tooltip anchor={anchorName} placement="top" arrow={false}>
            This is a basic tooltip without arrow
          </Tooltip>
        )}
      </div>
    </section>
  );
}

/**
 * Demo 2: Tooltips con arrows dinámicos
 * Implementa las 3 técnicas del research: 2-headed, 4-headed, diagonal
 */
function TooltipArrowDemo() {
  const [show, handlers] = useTooltipHover();
  const [arrowEnabled, setArrowEnabled] = useState(true);
  const [distance, setDistance] = useState<DistanceSize>('md');
  const [arrowSize, setArrowSize] = useState<ArrowSize>('md');
  const [arrowType, setArrowType] = useState<ArrowType>('2-headed');

  const anchorName = createAnchorName('arrow-button');

  const distanceSizes: DistanceSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  const arrowSizes: ArrowSize[] = ['sm', 'md', 'lg', 'xl'];
  const arrowTypes: ArrowType[] = ['2-headed', '4-headed', 'diagonal'];

  return (
    <section>
      <h2>2. Tooltip con Arrow Dinámico (3 Técnicas del Research)</h2>
      <p>2-headed: margin magic vertical | 4-headed: polygon 12 puntos | diagonal: √2 formula corners</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        <div>
          <button
            {...handlers}
            style={{
              ...demoAnchorStyles.tooltipArrow,
              cursor: 'pointer',
              anchorName: anchorName,
            }}
          >
            ⚓ Hover with arrow
          </button>

          {show && (
            <Tooltip
              anchor={anchorName}
              placement="top"
              arrow={arrowEnabled ? { type: arrowType, size: arrowSize } : false}
              distance={distance}
            >
              Tooltip with dynamic arrow ({arrowType})
            </Tooltip>
          )}
        </div>

        {/* Controles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={arrowEnabled}
              onChange={(e) => setArrowEnabled(e.target.checked)}
            />
            Show Arrow
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Arrow Type: {arrowType}</span>
            <select value={arrowType} onChange={(e) => setArrowType(e.target.value as ArrowType)}>
              {arrowTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Distance: {distance}</span>
            <select value={distance} onChange={(e) => setDistance(e.target.value as DistanceSize)}>
              {distanceSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Arrow Size: {arrowSize}</span>
            <select value={arrowSize} onChange={(e) => setArrowSize(e.target.value as ArrowSize)}>
              {arrowSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 3: Tooltips en diferentes direcciones
 * Muestra el position-area grid 3×3 completo (36+ positions)
 */
function TooltipDirectionsDemo() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Ahora soportamos las 36+ positions del grid 3×3
  const basicDirections = ['top', 'bottom', 'left', 'right'] as const;
  const cornerDirections = ['top left', 'top right', 'bottom left', 'bottom right'] as const;
  const allDirections = [...basicDirections, ...cornerDirections];

  return (
    <section>
      <h2>3. Tooltips en Todas las Direcciones (Grid 3×3)</h2>
      <p>Position-area completo: básicas + esquinas | Con fallbacks automáticos</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginTop: '20px',
          maxWidth: '600px',
        }}
      >
        {allDirections.map((direction) => {
          const anchorName = createAnchorName(`dir-${direction.replace(' ', '-')}`);

          return (
            <div key={direction}>
              <button
                onMouseEnter={() => setActiveTooltip(direction)}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{
                  ...demoAnchorStyles.tooltipDirections,
                  cursor: 'pointer',
                  width: '100%',
                  anchorName: anchorName,
                }}
              >
                ⚓ {direction.toUpperCase()}
              </button>

              {activeTooltip === direction && (
                <Tooltip anchor={anchorName} placement={direction} arrow distance="sm">
                  {direction}
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Demo 4: Draggable anchor con tooltip que sigue
 * Demuestra el poder de anchor positioning - el tooltip sigue automáticamente
 */
function TooltipDraggableDemo() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [show, setShow] = useState(true);

  const anchorName = createAnchorName('draggable');

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section>
      <h2>4. Draggable Anchor - Tooltip Sigue Automáticamente</h2>
      <p>Arrastra el elemento y observa cómo el tooltip se mantiene anclado</p>

      <div
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: 'relative',
          height: '300px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            ...demoAnchorStyles.tooltipDraggable,
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            anchorName: anchorName,
          }}
        >
          ⚓ Drag me!
        </div>

        {show && (
          <Tooltip
            anchor={anchorName}
            placement="top"
            arrow
            distance="md"
            style={{
              pointerEvents: 'none', // No interfiere con el drag
            }}
          >
            I follow the anchor automatically! 🎯
          </Tooltip>
        )}
      </div>

      <button
        onClick={() => setShow(!show)}
        style={{
          marginTop: '12px',
          padding: '8px 16px',
          fontSize: '14px',
        }}
      >
        {show ? 'Hide' : 'Show'} Tooltip
      </button>
    </section>
  );
}

/**
 * Demo 5: Tooltip Configurations Showcase
 *
 * Usa AnchorFocusCards para demostrar diferentes configuraciones de tooltips:
 * - Diferentes placements (top, top-left, bottom-right, etc.)
 * - Diferentes arrow types (2-headed, 4-headed, diagonal)
 * - Diferentes distances (sm, md, lg, xl)
 */
function TooltipConfigShowcase() {
  const configCards: AnchorFocusCard[] = [
    {
      id: 'config-top-2headed',
      title: 'Top + 2-Headed Arrow',
      description: 'Placement top con arrow 2-headed (margin magic vertical). Distance md (8px).',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⬆️</div>
          <div className="font-bold text-sm">Top</div>
          <div className="text-xs text-gray-500">2-headed • md</div>
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
      id: 'config-top-left-diagonal',
      title: 'Top-Left + Diagonal Arrow',
      description: 'Placement top-left con arrow diagonal (√2 formula). Distance xl (24px) para esquina.',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">↖️</div>
          <div className="font-bold text-sm">Top Left</div>
          <div className="text-xs text-gray-500">diagonal • xl</div>
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
      id: 'config-right-4headed',
      title: 'Right + 4-Headed Arrow',
      description: 'Placement right con arrow 4-headed (polygon 12 puntos). Distance lg (16px).',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">➡️</div>
          <div className="font-bold text-sm">Right</div>
          <div className="text-xs text-gray-500">4-headed • lg</div>
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
      id: 'config-bottom-2headed',
      title: 'Bottom + 2-Headed Arrow',
      description: 'Placement bottom con arrow 2-headed (margin magic). Distance sm (4px) compacta.',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⬇️</div>
          <div className="font-bold text-sm">Bottom</div>
          <div className="text-xs text-gray-500">2-headed • sm</div>
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
      id: 'config-bottom-right-diagonal',
      title: 'Bottom-Right + Diagonal',
      description: 'Placement bottom-right con arrow diagonal. Distance 2xl (32px) máxima separación.',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">↘️</div>
          <div className="font-bold text-sm">Bottom Right</div>
          <div className="text-xs text-gray-500">diagonal • 2xl</div>
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
      id: 'config-left-4headed',
      title: 'Left + 4-Headed Arrow',
      description: 'Placement left con arrow 4-headed. Distance md (8px) balance perfecto.',
      content: (
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⬅️</div>
          <div className="font-bold text-sm">Left</div>
          <div className="text-xs text-gray-500">4-headed • md</div>
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

  return (
    <section>
      <h2>5. Tooltip Configurations Showcase</h2>
      <p style={{ marginBottom: '20px' }}>
        Hover sobre las cards para ver diferentes configuraciones de tooltips en acción.
        Cada card demuestra una combinación de <strong>placement</strong>, <strong>arrow type</strong> y <strong>distance</strong>.
      </p>

      <AnchorFocusCards cards={configCards} columns={3} gap="md" />

      <div style={{ marginTop: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px', fontSize: '14px' }}>
        <strong>💡 Tip:</strong> El tooltip muestra la configuración exacta usada (placement, arrow type, distance).
        Compara las diferentes combinaciones para entender cómo interactúan estas propiedades.
      </div>
    </section>
  );
}
