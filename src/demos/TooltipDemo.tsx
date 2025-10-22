import React, { useState } from 'react';
import { Tooltip, useTooltipHover } from '../components/Tooltip';
import { createAnchorName } from '../lib/anchor-helpers';
import { demoAnchorStyles, anchorStyles } from '../styles/anchor-styles';
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
