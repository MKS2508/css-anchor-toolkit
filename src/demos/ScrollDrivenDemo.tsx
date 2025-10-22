import React, { useState } from 'react';
import { createAnchorName } from '../lib/anchor-helpers';

/**
 * Demo de Scroll-Driven Animations con CSS Anchor Positioning
 *
 * Demuestra la integración de view-timeline con anchor positioning
 * para crear experiencias scroll-driven avanzadas.
 *
 * Técnicas mostradas:
 * - view-timeline-name + anchor positioning
 * - Progress indicator anchored a scroll containers
 * - Reveal effects con anchors
 * - Animation timeline con positioned elements
 */
export function ScrollDrivenDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Scroll-Driven Animations + Anchors</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <ViewTimelineDemo />
        <ProgressIndicatorDemo />
        <RevealOnScrollDemo />
        <ParallaxAnchorDemo />
      </div>
    </div>
  );
}

/**
 * Demo 1: View Timeline Básico
 * Elemento animado según su posición en el viewport, anclado a un contenedor
 */
function ViewTimelineDemo() {
  const [showIndicator, setShowIndicator] = useState(true);
  const anchorName = createAnchorName('view-timeline-anchor');

  return (
    <section>
      <h2>1. View Timeline + Anchor Positioning</h2>
      <p>La card se anima según su scroll position y el indicator se mantiene anclado</p>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showIndicator}
            onChange={(e) => setShowIndicator(e.target.checked)}
          />
          Show Position Indicator
        </label>
      </div>

      <div
        style={{
          height: '500px',
          overflow: 'auto',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        <div style={{ height: '200px', textAlign: 'center', color: '#9ca3af' }}>
          ⬇️ Scroll down ⬇️
        </div>

        {/* Animated Card con view-timeline */}
        <div
          style={{
            padding: '32px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            margin: '100px auto',
            maxWidth: '400px',
            viewTimelineName: '--card-timeline',
            viewTimelineAxis: 'block',
            animation: 'scaleOnScroll linear',
            animationTimeline: '--card-timeline',
            anchorName: anchorName,
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', color: '#3b82f6' }}>Scroll-Driven Card</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Esta card tiene una view-timeline que controla su escala. El indicator
            azul se mantiene anclado a la card mientras scrolleas.
          </p>
        </div>

        {/* Anchored Position Indicator */}
        {showIndicator && (
          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: 'left',
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              pointerEvents: 'none',
            }}
          >
            📍 Position Indicator
          </div>
        )}

        <div style={{ height: '400px', textAlign: 'center', color: '#9ca3af' }}>
          <p>⬇️ Keep scrolling ⬇️</p>
          <p style={{ marginTop: '100px' }}>Almost there...</p>
          <p style={{ marginTop: '100px' }}>⬆️ Scroll back up ⬆️</p>
        </div>
      </div>

      <style>{`
        @keyframes scaleOnScroll {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Demo 2: Progress Indicator Anclado
 * Barra de progreso que sigue el scroll de un contenedor
 */
function ProgressIndicatorDemo() {
  const [progressStyle, setProgressStyle] = useState<'bar' | 'circle'>('bar');
  const containerAnchor = createAnchorName('progress-container');

  return (
    <section>
      <h2>2. Scroll Progress Indicator</h2>
      <p>Barra de progreso anclada que refleja el scroll position</p>

      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="radio"
            checked={progressStyle === 'bar'}
            onChange={() => setProgressStyle('bar')}
          />
          Bar Style
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="radio"
            checked={progressStyle === 'circle'}
            onChange={() => setProgressStyle('circle')}
          />
          Circle Style
        </label>
      </div>

      <div
        style={{
          position: 'relative',
          height: '400px',
          overflow: 'auto',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fafafa',
          anchorName: containerAnchor,
        }}
      >
        <div style={{ height: '1000px' }}>
          <h3>Scroll Container Content</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '20px', color: '#6b7280' }}>
              Paragraph {i + 1}: Scroll down to see the progress indicator update in real-time.
              The indicator is anchored to the container and follows the scroll position.
            </p>
          ))}
        </div>

        {/* Scroll Progress Bar (anchored to top) */}
        {progressStyle === 'bar' && (
          <div
            style={{
              position: 'absolute',
              positionAnchor: containerAnchor,
              top: 'anchor(top)',
              left: 'anchor(left)',
              right: 'anchor(right)',
              height: '4px',
              backgroundColor: '#e5e7eb',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div
              id="progress-bar"
              style={{
                height: '100%',
                backgroundColor: '#10b981',
                width: '0%',
                transition: 'width 0.1s ease-out',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
              }}
            />
          </div>
        )}

        {/* Scroll Progress Circle (anchored to top-right) */}
        {progressStyle === 'circle' && (
          <div
            style={{
              position: 'absolute',
              positionAnchor: containerAnchor,
              positionArea: 'top right',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '3px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#10b981',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
              margin: '12px',
              zIndex: 10,
            }}
          >
            <span id="progress-percent">0%</span>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Demo 3: Reveal on Scroll
 * Elementos que se revelan con animación cuando entran al viewport
 */
function RevealOnScrollDemo() {
  const items = [
    { title: 'Feature 1', desc: 'Amazing feature description', color: '#3b82f6' },
    { title: 'Feature 2', desc: 'Another great capability', color: '#8b5cf6' },
    { title: 'Feature 3', desc: 'Powerful functionality', color: '#ec4899' },
    { title: 'Feature 4', desc: 'Advanced integration', color: '#10b981' },
    { title: 'Feature 5', desc: 'Enterprise ready', color: '#f59e0b' },
  ];

  return (
    <section>
      <h2>3. Reveal on Scroll con Anchors</h2>
      <p>Elementos que se revelan progresivamente con labels anclados</p>

      <div
        style={{
          height: '500px',
          overflow: 'auto',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        <div style={{ height: '100px', color: '#9ca3af', textAlign: 'center' }}>
          ⬇️ Scroll to reveal items ⬇️
        </div>

        {items.map((item, index) => {
          const anchorName = createAnchorName(`reveal-item-${index}`);

          return (
            <div key={index} style={{ marginBottom: '80px', position: 'relative' }}>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  viewTimelineName: `--item-${index}`,
                  animation: 'revealItem linear',
                  animationTimeline: `--item-${index}`,
                  anchorName: anchorName,
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', color: item.color }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#6b7280' }}>{item.desc}</p>
              </div>

              {/* Anchored Label */}
              <div
                style={{
                  position: 'absolute',
                  positionAnchor: anchorName,
                  positionArea: 'left',
                  padding: '4px 8px',
                  backgroundColor: item.color,
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  pointerEvents: 'none',
                }}
              >
                #{index + 1}
              </div>
            </div>
          );
        })}

        <div style={{ height: '100px' }} />
      </div>

      <style>{`
        @keyframes revealItem {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Demo 4: Parallax Anchor
 * Efecto parallax con elementos anclados a diferentes scroll speeds
 */
function ParallaxAnchorDemo() {
  const [showLabels, setShowLabels] = useState(true);

  const layers = [
    { id: 'back', speed: 0.5, color: '#dbeafe', label: 'Background (0.5x)' },
    { id: 'mid', speed: 0.75, color: '#bfdbfe', label: 'Midground (0.75x)' },
    { id: 'front', speed: 1, color: '#93c5fd', label: 'Foreground (1x)' },
  ];

  return (
    <section>
      <h2>4. Parallax Effect con Anchors</h2>
      <p>Capas con diferentes scroll speeds y labels anclados</p>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
          />
          Show Layer Labels
        </label>
      </div>

      <div
        style={{
          position: 'relative',
          height: '400px',
          overflow: 'auto',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f0f9ff',
        }}
      >
        <div style={{ height: '1200px', position: 'relative' }}>
          {layers.map((layer) => {
            const anchorName = createAnchorName(`parallax-${layer.id}`);

            return (
              <div key={layer.id}>
                <div
                  style={{
                    position: 'sticky',
                    top: '50%',
                    width: '200px',
                    height: '200px',
                    margin: '200px auto',
                    backgroundColor: layer.color,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: `translateY(calc(var(--scroll, 0) * ${layer.speed - 1} * 100px))`,
                    anchorName: anchorName,
                  }}
                >
                  Layer {layer.id}
                </div>

                {/* Anchored Speed Label */}
                {showLabels && (
                  <div
                    style={{
                      position: 'absolute',
                      positionAnchor: anchorName,
                      positionArea: 'right',
                      padding: '6px 10px',
                      backgroundColor: '#1e40af',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(30, 64, 175, 0.3)',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {layer.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
