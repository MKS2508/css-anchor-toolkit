import React, { useState } from 'react';
import { createAnchorName } from '../lib/anchor-helpers';
import { demoAnchorStyles } from '../styles/anchor-styles';
import { POSITION_AREAS } from '../lib/anchor-core';
import type { PositionAreaValue, JustifyValue, AlignValue } from '../lib/anchor-types';

/**
 * Demo del Sistema de Grid 3×3 de position-area
 *
 * Visualización interactiva de las 36 combinaciones posibles
 * de position-area en el sistema grid de CSS Anchor Positioning
 */
export function GridDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Position-Area Grid System</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <GridVisualizationDemo />
        <GridSelectorDemo />
        <GridSpanningDemo />
        <Grid576ConfigurationsDemo />
      </div>
    </div>
  );
}

/**
 * Demo 1: Visualización del grid 3×3 completo
 * Muestra todas las posiciones cardinales
 */
function GridVisualizationDemo() {
  const anchorName = createAnchorName('grid-anchor');
  const [selectedPosition, setSelectedPosition] = useState<string | null>('top');

  // Grid 3×3: 9 posiciones base
  const positions = [
    ['top left', 'top', 'top right'],
    ['left', 'center', 'right'],
    ['bottom left', 'bottom', 'bottom right'],
  ];

  return (
    <section>
      <h2>1. Grid 3×3 - Posiciones Base</h2>
      <p>El sistema de position-area crea un grid implícito alrededor del anchor</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
          position: 'relative',
          minHeight: '400px',
        }}
      >
        {/* Anchor element en el centro */}
        <div
          style={{
            ...demoAnchorStyles.gridMain,
            anchorName: anchorName,
          }}
        >
          ⚓ ANCHOR
        </div>

        {/* Grid de botones para seleccionar posición */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gridTemplateRows: 'repeat(3, 100px)',
            gap: '60px',
            pointerEvents: 'none',
          }}
        >
          {positions.flat().map((position) => (
            <button
              key={position}
              onClick={() => setSelectedPosition(position)}
              style={{
                padding: '8px',
                fontSize: '11px',
                cursor: 'pointer',
                backgroundColor: selectedPosition === position ? '#10b981' : '#e5e7eb',
                color: selectedPosition === position ? 'white' : '#374151',
                border: 'none',
                borderRadius: '4px',
                pointerEvents: 'all',
                fontWeight: selectedPosition === position ? 'bold' : 'normal',
              }}
            >
              {position}
            </button>
          ))}
        </div>

        {/* Positioned element que sigue la selección */}
        {selectedPosition && (
          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: selectedPosition,
              padding: '12px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
            }}
          >
            {selectedPosition}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Demo 2: Selector interactivo de todas las combinaciones
 * Permite probar position-area con keywords físicos y lógicos
 */
function GridSelectorDemo() {
  const anchorName = createAnchorName('selector-anchor');
  const [row, setRow] = useState('top');
  const [col, setCol] = useState('');
  const [useLogical, setUseLogical] = useState(false);

  // Keywords físicos
  const physicalRows = ['top', 'center', 'bottom'];
  const physicalCols = ['left', 'center', 'right'];

  // Keywords lógicos
  const logicalRows = ['block-start', 'center', 'block-end'];
  const logicalCols = ['inline-start', 'center', 'inline-end'];

  const rows = useLogical ? logicalRows : physicalRows;
  const cols = useLogical ? logicalCols : physicalCols;

  const positionAreaValue = col ? `${row} ${col}` : row;

  return (
    <section>
      <h2>2. Selector Interactivo de Position-Area</h2>
      <p>Explora todas las combinaciones posibles de keywords</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Controles */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            minWidth: '250px',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={useLogical}
              onChange={(e) => setUseLogical(e.target.checked)}
            />
            Usar keywords lógicos
          </label>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Row (eje vertical):
            </label>
            <select
              value={row}
              onChange={(e) => setRow(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            >
              {rows.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Column (eje horizontal):
            </label>
            <select
              value={col}
              onChange={(e) => setCol(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
            >
              <option value="">none (solo row)</option>
              {cols.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#dbeafe',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: 'bold' }}>
              position-area:
            </div>
            <code style={{ fontSize: '14px', color: '#1e40af' }}>{positionAreaValue}</code>
          </div>
        </div>

        {/* Preview */}
        <div style={{ position: 'relative', minWidth: '300px', minHeight: '300px' }}>
          <div
            style={{
              ...demoAnchorStyles.gridSelector,
              anchorName: anchorName,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            ⚓ ANCHOR
          </div>

          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: positionAreaValue,
              padding: '12px 16px',
              backgroundColor: '#f59e0b',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            Positioned Element
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 3: Spanning - extender a través de múltiples celdas
 * Muestra span-top, span-left, span-all, etc.
 */
function GridSpanningDemo() {
  const anchorName = createAnchorName('spanning-anchor');
  const [spanType, setSpanType] = useState('span-top');

  const spanOptions = [
    { value: 'span-top', label: 'span-top (3 celdas arriba)' },
    { value: 'span-bottom', label: 'span-bottom (3 celdas abajo)' },
    { value: 'span-left', label: 'span-left (3 celdas izquierda)' },
    { value: 'span-right', label: 'span-right (3 celdas derecha)' },
    { value: 'span-all', label: 'span-all (toda el área)' },
    { value: 'top span-left', label: 'top span-left (combinado)' },
    { value: 'bottom span-right', label: 'bottom span-right (combinado)' },
  ];

  return (
    <section>
      <h2>3. Spanning - Extender a Múltiples Celdas</h2>
      <p>Los keywords "span-*" permiten extender el positioned element a través del grid</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Controles */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            minWidth: '280px',
          }}
        >
          {spanOptions.map((option) => (
            <label
              key={option.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                backgroundColor: spanType === option.value ? '#dbeafe' : 'transparent',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="span"
                value={option.value}
                checked={spanType === option.value}
                onChange={(e) => setSpanType(e.target.value)}
              />
              <span style={{ fontSize: '14px' }}>{option.label}</span>
            </label>
          ))}
        </div>

        {/* Preview con grid visible */}
        <div
          style={{
            position: 'relative',
            minWidth: '400px',
            minHeight: '400px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Grid lines para visualización */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '1px',
              pointerEvents: 'none',
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i === 4 ? '#e0e7ff' : '#f9fafb',
                  border: '1px solid #e5e7eb',
                }}
              />
            ))}
          </div>

          {/* Anchor */}
          <div
            style={{
              ...demoAnchorStyles.gridSpanning,
              zIndex: 10,
              anchorName: anchorName,
            }}
          >
            ⚓ ANCHOR
          </div>

          {/* Positioned element con spanning */}
          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: spanType,
              padding: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '2px solid #dc2626',
            }}
          >
            {spanType}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 4: 576 Configuraciones Completas
 * 36 position-area × 4 justify-self × 4 align-self = 576 combinaciones
 */
function Grid576ConfigurationsDemo() {
  const anchorName = createAnchorName('config-576-anchor');

  // State para las 3 dimensiones de configuración
  const [positionIndex, setPositionIndex] = useState(0);
  const [justifyIndex, setJustifyIndex] = useState(0);
  const [alignIndex, setAlignIndex] = useState(0);

  // Las 36 position-area values (usando POSITION_AREAS del core)
  const positions: PositionAreaValue[] = [
    'top', 'bottom', 'left', 'right', 'center',
    'top left', 'top right', 'bottom left', 'bottom right',
    'top center', 'bottom center', 'left center', 'right center',
    'span-top', 'span-bottom', 'span-left', 'span-right', 'span-all',
    'block-start', 'block-end', 'inline-start', 'inline-end',
    'start', 'end', 'self-start', 'self-end',
    'top span-left', 'top span-right', 'bottom span-left', 'bottom span-right',
    'left span-top', 'left span-bottom', 'right span-top', 'right span-bottom',
    'block-start inline-start', 'block-start inline-end',
    'block-end inline-start', 'block-end inline-end',
  ];

  // 4 justify-self values
  const justifyValues: JustifyValue[] = ['start', 'center', 'end', 'anchor-center'];

  // 4 align-self values
  const alignValues: AlignValue[] = ['start', 'center', 'end', 'anchor-center'];

  const currentPosition = positions[positionIndex];
  const currentJustify = justifyValues[justifyIndex];
  const currentAlign = alignValues[alignIndex];

  // Calcular número de configuración actual (1-576)
  const configNumber = (positionIndex * 16) + (justifyIndex * 4) + alignIndex + 1;

  const handlePrevPosition = () => setPositionIndex((i) => (i - 1 + positions.length) % positions.length);
  const handleNextPosition = () => setPositionIndex((i) => (i + 1) % positions.length);

  const handlePrevJustify = () => setJustifyIndex((i) => (i - 1 + justifyValues.length) % justifyValues.length);
  const handleNextJustify = () => setJustifyIndex((i) => (i + 1) % justifyValues.length);

  const handlePrevAlign = () => setAlignIndex((i) => (i - 1 + alignValues.length) % alignValues.length);
  const handleNextAlign = () => setAlignIndex((i) => (i + 1) % alignValues.length);

  const handleRandom = () => {
    setPositionIndex(Math.floor(Math.random() * positions.length));
    setJustifyIndex(Math.floor(Math.random() * justifyValues.length));
    setAlignIndex(Math.floor(Math.random() * alignValues.length));
  };

  return (
    <section>
      <h2>4. 576 Configuraciones Completas 🎯</h2>
      <p>
        Test exhaustivo: {positions.length} position-area × {justifyValues.length} justify-self × {alignValues.length} align-self = <strong>576 combinaciones</strong>
      </p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Panel de controles */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '24px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            minWidth: '320px',
          }}
        >
          {/* Contador de configuración */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#dbeafe',
              borderRadius: '6px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: 'bold', marginBottom: '4px' }}>
              CONFIGURACIÓN
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af' }}>
              {configNumber} / 576
            </div>
          </div>

          {/* Position-area control */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Position-area ({positionIndex + 1}/{positions.length}):
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={handlePrevPosition} style={{ padding: '6px 12px', fontSize: '14px' }}>
                ←
              </button>
              <select
                value={currentPosition}
                onChange={(e) => setPositionIndex(positions.indexOf(e.target.value as PositionAreaValue))}
                style={{ flex: 1, padding: '8px', borderRadius: '4px', fontSize: '13px' }}
              >
                {positions.map((pos, i) => (
                  <option key={pos} value={pos}>
                    {i + 1}. {pos}
                  </option>
                ))}
              </select>
              <button onClick={handleNextPosition} style={{ padding: '6px 12px', fontSize: '14px' }}>
                →
              </button>
            </div>
            <code
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#059669',
              }}
            >
              position-area: {currentPosition}
            </code>
          </div>

          {/* Justify-self control */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Justify-self ({justifyIndex + 1}/{justifyValues.length}):
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={handlePrevJustify} style={{ padding: '6px 12px', fontSize: '14px' }}>
                ←
              </button>
              <select
                value={currentJustify}
                onChange={(e) => setJustifyIndex(justifyValues.indexOf(e.target.value as JustifyValue))}
                style={{ flex: 1, padding: '8px', borderRadius: '4px' }}
              >
                {justifyValues.map((jv) => (
                  <option key={jv} value={jv}>
                    {jv}
                  </option>
                ))}
              </select>
              <button onClick={handleNextJustify} style={{ padding: '6px 12px', fontSize: '14px' }}>
                →
              </button>
            </div>
            <code
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#7c3aed',
              }}
            >
              justify-self: {currentJustify}
            </code>
          </div>

          {/* Align-self control */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Align-self ({alignIndex + 1}/{alignValues.length}):
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button onClick={handlePrevAlign} style={{ padding: '6px 12px', fontSize: '14px' }}>
                ←
              </button>
              <select
                value={currentAlign}
                onChange={(e) => setAlignIndex(alignValues.indexOf(e.target.value as AlignValue))}
                style={{ flex: 1, padding: '8px', borderRadius: '4px' }}
              >
                {alignValues.map((av) => (
                  <option key={av} value={av}>
                    {av}
                  </option>
                ))}
              </select>
              <button onClick={handleNextAlign} style={{ padding: '6px 12px', fontSize: '14px' }}>
                →
              </button>
            </div>
            <code
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#dc2626',
              }}
            >
              align-self: {currentAlign}
            </code>
          </div>

          {/* Botón random */}
          <button
            onClick={handleRandom}
            style={{
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            🎲 Configuración aleatoria
          </button>
        </div>

        {/* Preview área */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            minHeight: '500px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          {/* Anchor element */}
          <div
            style={{
              ...demoAnchorStyles.gridMain,
              anchorName: anchorName,
            }}
          >
            ⚓ ANCHOR
          </div>

          {/* Positioned element con las 3 propiedades */}
          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: currentPosition,
              justifySelf: currentJustify,
              alignSelf: currentAlign,
              padding: '16px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              border: '2px solid #2563eb',
              textAlign: 'center',
              maxWidth: '200px',
            }}
          >
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>
              Config #{configNumber}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.8, lineHeight: 1.4 }}>
              {currentPosition}
              <br />
              j:{currentJustify} / a:{currentAlign}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
