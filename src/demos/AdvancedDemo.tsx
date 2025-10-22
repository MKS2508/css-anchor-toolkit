import React, { useState } from 'react';
import { createAnchorName, cornerMargin, anchorSizeFunction } from '../lib/anchor-helpers';
import { demoAnchorStyles } from '../styles/anchor-styles';

/**
 * Demo de Técnicas Avanzadas de CSS Anchor Positioning
 *
 * Muestra casos de uso complejos y técnicas especializadas:
 * - Corner positioning con diagonal arrows
 * - Multiple anchors en un solo elemento
 * - anchor-size() para sizing dinámico
 * - Scroll compensation
 */
export function AdvancedDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Técnicas Avanzadas</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <CornerPositioningDemo />
        <MultipleAnchorsDemo />
        <AnchorSizingDemo />
        <ScrollCompensationDemo />
      </div>
    </div>
  );
}

/**
 * Demo 1: Corner Positioning
 * Tooltip variant 3 de css-tip.com - posicionamiento en esquinas con diagonal arrow
 */
function CornerPositioningDemo() {
  const [show, setShow] = useState(true);
  const [distance, setDistance] = useState(10);
  const [arrowSize, setArrowSize] = useState(12);

  const anchorName = createAnchorName('corner-anchor');

  // Cálculo del margin con fórmula sqrt(2) para diagonal
  const calculatedMargin = cornerMargin(distance, arrowSize);

  return (
    <section>
      <h2>1. Corner Positioning (Diagonal Arrow)</h2>
      <p>
        Técnica avanzada de css-tip.com para tooltips en esquinas con arrows diagonales
      </p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Controles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            Show Tooltip
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Distance: {distance}px</span>
            <input
              type="range"
              min="5"
              max="30"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Arrow Size: {arrowSize}px</span>
            <input
              type="range"
              min="8"
              max="20"
              value={arrowSize}
              onChange={(e) => setArrowSize(Number(e.target.value))}
            />
          </label>

          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Fórmula Diagonal:</div>
            <code style={{ fontSize: '11px' }}>
              margin = {distance}px + (√2 - 1) × {arrowSize}px
            </code>
            <div style={{ marginTop: '8px', color: '#6b7280' }}>
              Resultado: <strong>{calculatedMargin}</strong>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ position: 'relative', minWidth: '400px', minHeight: '300px' }}>
          <div
            style={{
              ...demoAnchorStyles.cornerAnchor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
          </div>

          {show && (
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'top left',
                positionTryFallbacks: 'flip-inline, flip-block, flip-start',
                margin: calculatedMargin,
                padding: '12px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '14px',
                maxWidth: '200px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              Corner positioned tooltip with diagonal arrow
              <div
                style={{
                  position: 'absolute',
                  width: `${arrowSize}px`,
                  height: `${arrowSize}px`,
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'rotate(45deg)',
                  zIndex: -1,
                  margin: 'inherit',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 2: Multiple Anchors
 * Un positioned element puede usar diferentes anchors en diferentes inset properties
 */
function MultipleAnchorsDemo() {
  const anchor1 = createAnchorName('multi-anchor-1');
  const anchor2 = createAnchorName('multi-anchor-2');
  const anchor3 = createAnchorName('multi-anchor-3');
  const anchor4 = createAnchorName('multi-anchor-4');

  const [show, setShow] = useState(true);

  return (
    <section>
      <h2>2. Multiple Anchors</h2>
      <p>
        Un elemento puede posicionarse relativo a múltiples anchors simultáneamente
        usando diferentes anchor() en cada inset property
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'flex-start' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
          Show Connected Box
        </label>
      </div>

      <div
        style={{
          position: 'relative',
          width: '600px',
          height: '400px',
          border: '2px solid #d1d5db',
          borderRadius: '8px',
          marginTop: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        {/* 4 Anchors en las esquinas */}
        <div
          style={{
            ...demoAnchorStyles.multipleAnchors,
            position: 'absolute',
            top: '20px',
            left: '20px',
            anchorName: anchor1,
          }}
        >
          ⚓ 1 (TL)
        </div>

        <div
          style={{
            ...demoAnchorStyles.multipleAnchors,
            position: 'absolute',
            top: '20px',
            right: '20px',
            anchorName: anchor2,
          }}
        >
          ⚓ 2 (TR)
        </div>

        <div
          style={{
            ...demoAnchorStyles.multipleAnchors,
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            anchorName: anchor3,
          }}
        >
          ⚓ 3 (BL)
        </div>

        <div
          style={{
            ...demoAnchorStyles.multipleAnchors,
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            anchorName: anchor4,
          }}
        >
          ⚓ 4 (BR)
        </div>

        {/* Elemento conectado a los 4 anchors */}
        {show && (
          <div
            style={{
              position: 'absolute',
              // Cada lado se ancla a un anchor diferente
              top: `anchor(${anchor1} bottom)`,
              right: `anchor(${anchor2} left)`,
              bottom: `anchor(${anchor3} top)`,
              left: `anchor(${anchor4} right)`,
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '2px dashed #8b5cf6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: '#8b5cf6',
                fontWeight: 'bold',
              }}
            >
              📍 Connected to 4 Anchors
              <div style={{ fontSize: '12px', marginTop: '8px', fontWeight: 'normal' }}>
                top → Anchor 1 | right → Anchor 2
                <br />
                bottom → Anchor 3 | left → Anchor 4
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Demo 3: anchor-size() Function
 * Sizing dinámico basado en las dimensiones del anchor
 */
function AnchorSizingDemo() {
  const [widthMultiplier, setWidthMultiplier] = useState(2);
  const [heightMultiplier, setHeightMultiplier] = useState(1);
  const [show, setShow] = useState(true);

  const anchorName = createAnchorName('sizing-anchor');

  return (
    <section>
      <h2>3. anchor-size() - Sizing Dinámico</h2>
      <p>Usar las dimensiones del anchor para calcular el tamaño del positioned element</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Controles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            Show Sized Element
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Width Multiplier: {widthMultiplier}x</span>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={widthMultiplier}
              onChange={(e) => setWidthMultiplier(Number(e.target.value))}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Height Multiplier: {heightMultiplier}x</span>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={heightMultiplier}
              onChange={(e) => setHeightMultiplier(Number(e.target.value))}
            />
          </label>

          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#dbeafe',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>CSS Generado:</div>
            <code style={{ fontSize: '11px', lineHeight: '1.6' }}>
              width: calc(anchor-size(width) * {widthMultiplier});
              <br />
              height: calc(anchor-size(height) * {heightMultiplier});
            </code>
          </div>
        </div>

        {/* Preview */}
        <div style={{ position: 'relative', minWidth: '400px', minHeight: '400px' }}>
          <div
            style={{
              ...demoAnchorStyles.sizingAnchor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
            <br />
            120×80
          </div>

          {show && (
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'bottom',
                width: `calc(${anchorSizeFunction(anchorName, 'width')} * ${widthMultiplier})`,
                height: `calc(${anchorSizeFunction(anchorName, 'height')} * ${heightMultiplier})`,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b82f6',
                fontWeight: 'bold',
                fontSize: '14px',
                textAlign: 'center',
                padding: '8px',
              }}
            >
              Sized Element
              <br />
              {120 * widthMultiplier}×{80 * heightMultiplier}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 4: Scroll Compensation
 * Demuestra cómo anchor positioning compensa automáticamente el scroll
 */
function ScrollCompensationDemo() {
  const [show, setShow] = useState(true);
  const anchorName = createAnchorName('scroll-anchor');

  return (
    <section>
      <h2>4. Scroll Compensation</h2>
      <p>
        CSS Anchor Positioning compensa automáticamente el scroll - el positioned element
        se mantiene anclado mientras scrolleas
      </p>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
          Show Anchored Element
        </label>

        <div
          style={{
            width: '100%',
            height: '400px',
            overflow: 'auto',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            padding: '20px',
          }}
        >
          <div style={{ height: '200px' }}>
            <p style={{ color: '#6b7280' }}>⬇️ Scroll down to see the anchor ⬇️</p>
          </div>

          <div
            style={{
              ...demoAnchorStyles.scrollAnchor,
              display: 'inline-block',
              margin: '40px 0',
              anchorName: anchorName,
            }}
          >
            ⚓ Scroll Anchor
          </div>

          <div style={{ height: '400px', color: '#6b7280' }}>
            <p>⬇️ Keep scrolling ⬇️</p>
            <p style={{ marginTop: '100px' }}>Almost there...</p>
            <p style={{ marginTop: '100px' }}>⬆️ Scroll back up ⬆️</p>
          </div>

          {show && (
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'right',
                positionTryFallbacks: 'flip-inline, flip-block',
                positionVisibility: 'anchors-visible',
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '2px solid #ec4899',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxWidth: '200px',
                fontSize: '14px',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#ec4899', marginBottom: '4px' }}>
                📌 Always Anchored
              </div>
              <div style={{ color: '#6b7280' }}>
                I follow the anchor during scroll automatically!
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
