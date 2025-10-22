import React, { useState } from 'react';
import { Popover, usePopover } from '../components/Popover';
import { createAnchorName } from '../lib/anchor-helpers';
import { demoAnchorStyles } from '../styles/anchor-styles';

/**
 * Demo del Sistema de Fallbacks de CSS Anchor Positioning
 *
 * Muestra position-try-fallbacks en acción:
 * - flip-block: invierte en el eje block (vertical)
 * - flip-inline: invierte en el eje inline (horizontal)
 * - flip-start: invierte diagonalmente
 * - Custom @position-try rules
 */
export function FallbackDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Position-Try Fallbacks System</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <FlipTacticsDemo />
        <OverflowPreventionDemo />
        <TryOrderDemo />
      </div>
    </div>
  );
}

/**
 * Demo 1: Flip Tactics - flip-block, flip-inline, flip-start
 * Demuestra cómo funcionan las tácticas automáticas
 */
function FlipTacticsDemo() {
  const [tactic, setTactic] = useState<string>('flip-block');
  const [open, toggle, close] = usePopover(false);

  const anchorName = createAnchorName('flip-tactics');

  const tactics = [
    {
      value: 'flip-block',
      label: 'flip-block',
      description: 'Invierte en el eje vertical (top ↔ bottom)',
    },
    {
      value: 'flip-inline',
      label: 'flip-inline',
      description: 'Invierte en el eje horizontal (left ↔ right)',
    },
    {
      value: 'flip-start',
      label: 'flip-start',
      description: 'Invierte diagonalmente (top-left ↔ bottom-right)',
    },
    {
      value: 'flip-block, flip-inline',
      label: 'flip-block + flip-inline',
      description: 'Combina ambas tácticas (4 posiciones posibles)',
    },
    {
      value: 'flip-block, flip-inline, flip-start',
      label: 'Todas las tácticas',
      description: 'Máxima flexibilidad (múltiples fallbacks)',
    },
  ];

  return (
    <section>
      <h2>1. Flip Tactics - Fallbacks Automáticos</h2>
      <p>
        Las tácticas flip-* reposicionan automáticamente el elemento cuando hay overflow
      </p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Controles */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            minWidth: '350px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px' }}>Selecciona Táctica:</h3>

          {tactics.map((t) => (
            <label
              key={t.value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '12px',
                backgroundColor: tactic === t.value ? '#dbeafe' : 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                border: tactic === t.value ? '2px solid #3b82f6' : '2px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="tactic"
                  value={t.value}
                  checked={tactic === t.value}
                  onChange={(e) => setTactic(e.target.value)}
                />
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.label}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '24px' }}>
                {t.description}
              </span>
            </label>
          ))}

          <button
            onClick={toggle}
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: open ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {open ? 'Cerrar' : 'Abrir'} Popover
          </button>
        </div>

        {/* Demo área con anchor posicionable */}
        <DraggableAnchorArea
          anchorName={anchorName}
          open={open}
          onClose={close}
          fallbacks={tactic}
        />
      </div>
    </section>
  );
}

/**
 * Demo 2: Prevención de Overflow
 * Muestra cómo los fallbacks previenen que el elemento se salga de la pantalla
 */
function OverflowPreventionDemo() {
  const [enableFallbacks, setEnableFallbacks] = useState(true);
  const [open, toggle, close] = usePopover(false);
  const [anchorPosition, setAnchorPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top-left');

  const anchorName = createAnchorName('overflow-prevention');

  const positions = {
    'top-left': { top: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
  };

  return (
    <section>
      <h2>2. Prevención Automática de Overflow</h2>
      <p>Mueve el anchor a las esquinas para ver cómo el popover se reposiciona</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={enableFallbacks}
              onChange={(e) => setEnableFallbacks(e.target.checked)}
            />
            <span style={{ fontWeight: 'bold' }}>Habilitar Fallbacks</span>
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Posición del Anchor:</span>
            {(Object.keys(positions) as Array<keyof typeof positions>).map((pos) => (
              <label key={pos} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="position"
                  checked={anchorPosition === pos}
                  onChange={() => setAnchorPosition(pos)}
                />
                {pos}
              </label>
            ))}
          </div>

          <button
            onClick={toggle}
            style={{
              padding: '12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {open ? 'Cerrar' : 'Abrir'} Popover
          </button>
        </div>

        {/* Container con scroll */}
        <div
          style={{
            position: 'relative',
            width: '500px',
            height: '400px',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <button
            style={{
              ...demoAnchorStyles.overflowPrevention,
              position: 'absolute',
              ...positions[anchorPosition],
              cursor: 'pointer',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'bottom',
                positionTryFallbacks: enableFallbacks ? 'flip-block, flip-inline' : 'none',
                padding: '16px',
                backgroundColor: 'white',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxWidth: '250px',
              }}
            >
              <h4 style={{ margin: '0 0 8px 0', color: '#3b82f6' }}>
                {enableFallbacks ? '✅ Fallbacks ON' : '❌ Fallbacks OFF'}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                {enableFallbacks
                  ? 'El popover se reposiciona automáticamente para evitar salirse del contenedor'
                  : 'El popover puede salirse del contenedor sin fallbacks'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 3: position-try-order
 * Muestra cómo priorizar fallbacks según espacio disponible
 */
function TryOrderDemo() {
  const [order, setOrder] = useState<string>('normal');
  const [open, setOpen] = useState(false);

  const anchorName = createAnchorName('try-order');

  const orders = [
    { value: 'normal', label: 'normal', description: 'Orden de declaración' },
    { value: 'most-width', label: 'most-width', description: 'Mayor ancho disponible' },
    { value: 'most-height', label: 'most-height', description: 'Mayor altura disponible' },
    { value: 'most-block-size', label: 'most-block-size', description: 'Mayor tamaño en eje block' },
    { value: 'most-inline-size', label: 'most-inline-size', description: 'Mayor tamaño en eje inline' },
  ];

  return (
    <section>
      <h2>3. position-try-order - Priorización Inteligente</h2>
      <p>Ordena los fallbacks según el espacio disponible en cada dirección</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Try Order:</h3>

          {orders.map((o) => (
            <label
              key={o.value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '12px',
                backgroundColor: order === o.value ? '#fef3c7' : '#f9fafb',
                borderRadius: '6px',
                cursor: 'pointer',
                border: order === o.value ? '2px solid #f59e0b' : '2px solid #e5e7eb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="order"
                  value={o.value}
                  checked={order === o.value}
                  onChange={(e) => setOrder(e.target.value)}
                />
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{o.label}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '24px' }}>
                {o.description}
              </span>
            </label>
          ))}

          <button
            onClick={() => setOpen(!open)}
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {open ? 'Cerrar' : 'Abrir'} Popover
          </button>
        </div>

        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '300px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              ...demoAnchorStyles.tryOrder,
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                positionAnchor: anchorName,
                positionArea: 'top',
                positionTryFallbacks: 'flip-block, flip-inline, flip-start',
                positionTryOrder: order as React.CSSProperties['positionTryOrder'],
                padding: '16px',
                backgroundColor: 'white',
                border: '2px solid #f59e0b',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                minWidth: '200px',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
                Try Order: {order}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                El sistema elige automáticamente la mejor posición según el espacio disponible
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Componente helper: Área con anchor draggable
 */
function DraggableAnchorArea({
  anchorName,
  open,
  onClose,
  fallbacks,
}: {
  anchorName: string;
  open: boolean;
  onClose: () => void;
  fallbacks: string;
}) {
  const [position, setPosition] = useState({ x: 250, y: 150 });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      onMouseMove={(e) => {
        if (isDragging) {
          const rect = e.currentTarget.getBoundingClientRect();
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      }}
      onMouseUp={() => setIsDragging(false)}
      style={{
        position: 'relative',
        width: '500px',
        height: '400px',
        border: '2px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '12px',
          color: '#6b7280',
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '4px',
        }}
      >
        💡 Arrastra el botón para probar fallbacks en diferentes posiciones
      </div>

      <button
        onMouseDown={() => setIsDragging(true)}
        style={{
          ...demoAnchorStyles.draggableArea,
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          anchorName: anchorName,
        }}
      >
        ⚓ Drag me!
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            positionAnchor: anchorName,
            positionArea: 'bottom',
            positionTryFallbacks: fallbacks,
            padding: '16px',
            backgroundColor: 'white',
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '250px',
            pointerEvents: 'none',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#3b82f6' }}>
            Fallbacks Activos
          </h4>
          <code style={{ fontSize: '12px', color: '#6b7280' }}>{fallbacks}</code>
        </div>
      )}
    </div>
  );
}
