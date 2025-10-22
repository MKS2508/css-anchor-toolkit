import React, { useState } from 'react';
import { createAnchorName } from '../lib/anchor-helpers';

/**
 * Demo de @position-try Custom Rules
 *
 * Demuestra el uso avanzado de @position-try para definir reglas
 * de fallback personalizadas más allá de flip-block, flip-inline, flip-start.
 *
 * Técnicas mostradas:
 * - @position-try custom rules
 * - position-try-fallbacks con reglas custom
 * - position-try-order para priorización inteligente
 * - Combinación de tactics built-in + custom rules
 */
export function PositionTryDemo() {
  return (
    <div className="demo-container" style={{ padding: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>@position-try Custom Rules</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <BasicPositionTryDemo />
        <CustomRulesDemo />
        <IntelligentFallbackDemo />
        <CombinedTacticsDemo />
      </div>
    </div>
  );
}

/**
 * Demo 1: @position-try Básico
 * Introducción a position-try rules y cómo se aplican
 */
function BasicPositionTryDemo() {
  const [currentRule, setCurrentRule] = useState<'default' | 'flipped' | 'shifted'>('default');
  const anchorName = createAnchorName('basic-try');

  const rules = {
    default: { area: 'bottom', description: 'Posición por defecto (bottom)' },
    flipped: { area: 'top', description: 'Fallback: Flipped to top' },
    shifted: { area: 'right', description: 'Fallback: Shifted to right' },
  };

  return (
    <section>
      <h2>1. @position-try Básico</h2>
      <p>Define posiciones alternativas cuando la posición primaria no funciona</p>

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
            minWidth: '280px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Simular Fallback:</h3>

          {(Object.keys(rules) as Array<keyof typeof rules>).map((rule) => (
            <label
              key={rule}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '12px',
                backgroundColor: currentRule === rule ? '#dbeafe' : 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                border: currentRule === rule ? '2px solid #3b82f6' : '2px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  checked={currentRule === rule}
                  onChange={() => setCurrentRule(rule)}
                />
                <span style={{ fontWeight: 'bold', fontSize: '14px', textTransform: 'capitalize' }}>
                  {rule}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '24px' }}>
                {rules[rule].description}
              </span>
            </label>
          ))}

          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#92400e' }}>
              CSS generado:
            </div>
            <code style={{ fontSize: '11px', color: '#78350f' }}>
              position-area: {rules[currentRule].area};
            </code>
          </div>
        </div>

        {/* Preview */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '400px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor Element
          </div>

          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: rules[currentRule].area as any,
              padding: '12px 16px',
              backgroundColor: 'white',
              border: '2px solid #10b981',
              borderRadius: '6px',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            Positioned Element
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
              position-area: {rules[currentRule].area}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @position-try --flipped-to-top {
          position-area: top;
        }

        @position-try --shifted-to-right {
          position-area: right;
        }
      `}</style>
    </section>
  );
}

/**
 * Demo 2: Custom Position-Try Rules
 * Define múltiples reglas custom para fallbacks complejos
 */
function CustomRulesDemo() {
  const [selectedRule, setSelectedRule] = useState('default');
  const anchorName = createAnchorName('custom-rules');

  const customRules = [
    { id: 'default', name: 'Default', area: 'bottom', justify: 'center', margin: '8px' },
    { id: 'top-start', name: 'Top Start', area: 'top left', justify: 'start', margin: '12px' },
    { id: 'right-center', name: 'Right Center', area: 'right', justify: 'center', margin: '16px' },
    { id: 'bottom-end', name: 'Bottom End', area: 'bottom right', justify: 'end', margin: '8px' },
    { id: 'left-stretch', name: 'Left Stretch', area: 'left', justify: 'stretch', margin: '4px' },
  ];

  const activeRule = customRules.find((r) => r.id === selectedRule) || customRules[0]!;

  return (
    <section>
      <h2>2. Custom @position-try Rules</h2>
      <p>Define reglas personalizadas que combinan múltiples propiedades</p>

      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', alignItems: 'flex-start' }}>
        {/* Selector de reglas */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            minWidth: '320px',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Available Custom Rules:</h3>

          {customRules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => setSelectedRule(rule.id)}
              style={{
                padding: '12px',
                backgroundColor: selectedRule === rule.id ? '#8b5cf6' : 'white',
                color: selectedRule === rule.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: selectedRule === rule.id ? 'bold' : 'normal',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              {rule.name}
            </button>
          ))}

          {/* Rule Details */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#ddd6fe',
              borderRadius: '6px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#5b21b6' }}>
              @position-try --{activeRule.id}
            </div>
            <code
              style={{
                display: 'block',
                fontSize: '11px',
                lineHeight: '1.6',
                color: '#6b21a8',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              position-area: {activeRule.area};
              <br />
              justify-self: {activeRule.justify};
              <br />
              margin: {activeRule.margin};
            </code>
          </div>
        </div>

        {/* Preview */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '500px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          <div
            style={{
              padding: '20px 32px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
          </div>

          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: activeRule.area as any,
              justifySelf: activeRule.justify as any,
              margin: activeRule.margin,
              padding: '16px 20px',
              backgroundColor: 'white',
              border: '3px solid #8b5cf6',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
              minWidth: '150px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#8b5cf6', marginBottom: '4px' }}>--{activeRule.id}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>
              area: {activeRule.area}
              <br />
              justify: {activeRule.justify}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 3: Intelligent Fallback con position-try-order
 * Usa most-width, most-height para seleccionar automáticamente la mejor posición
 */
function IntelligentFallbackDemo() {
  const [tryOrder, setTryOrder] = useState<'normal' | 'most-width' | 'most-height'>('normal');
  const [anchorPosition, setAnchorPosition] = useState<'center' | 'top-left' | 'bottom-right'>(
    'center'
  );

  const anchorName = createAnchorName('intelligent-fallback');

  const anchorPositions = {
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    'top-left': { top: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
  };

  return (
    <section>
      <h2>3. Intelligent Fallback Selection</h2>
      <p>
        position-try-order selecciona automáticamente la mejor posición según espacio disponible
      </p>

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
            minWidth: '300px',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Try Order Algorithm:
            </h3>
            {['normal', 'most-width', 'most-height'].map((order) => (
              <label
                key={order}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  backgroundColor: tryOrder === order ? '#dbeafe' : 'transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '4px',
                }}
              >
                <input
                  type="radio"
                  checked={tryOrder === order}
                  onChange={() => setTryOrder(order as any)}
                />
                <span style={{ fontSize: '13px' }}>{order}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Anchor Position:
            </h3>
            {(Object.keys(anchorPositions) as Array<keyof typeof anchorPositions>).map((pos) => (
              <label
                key={pos}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  backgroundColor: anchorPosition === pos ? '#fef3c7' : 'transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '4px',
                }}
              >
                <input
                  type="radio"
                  checked={anchorPosition === pos}
                  onChange={() => setAnchorPosition(pos)}
                />
                <span style={{ fontSize: '13px' }}>{pos}</span>
              </label>
            ))}
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: '#e0e7ff',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#3730a3' }}>
              CSS Applied:
            </div>
            <code style={{ fontSize: '11px', color: '#4338ca' }}>
              position-try-order: {tryOrder};
            </code>
          </div>
        </div>

        {/* Preview */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '500px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              ...anchorPositions[anchorPosition],
              padding: '16px 24px',
              backgroundColor: '#f59e0b',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              anchorName: anchorName,
            }}
          >
            ⚓ Anchor
          </div>

          <div
            style={{
              position: 'absolute',
              positionAnchor: anchorName,
              positionArea: 'bottom',
              positionTryFallbacks: 'flip-block, flip-inline, flip-start',
              positionTryOrder: tryOrder as any,
              padding: '16px 20px',
              backgroundColor: 'white',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              minWidth: '200px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#f59e0b', marginBottom: '4px' }}>Auto-Positioned</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>
              El sistema selecciona automáticamente la mejor posición usando try-order: {tryOrder}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Demo 4: Combined Tactics
 * Combina flip-* tactics con custom @position-try rules
 */
function CombinedTacticsDemo() {
  const [useCustom, setUseCustom] = useState(true);
  const anchorName = createAnchorName('combined-tactics');

  return (
    <section>
      <h2>4. Combined Tactics + Custom Rules</h2>
      <p>Combina flip-block, flip-inline con custom position-try rules para máxima flexibilidad</p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} />
          <span style={{ fontWeight: 'bold' }}>Include Custom Rules</span>
        </label>
      </div>

      <div
        style={{
          position: 'relative',
          height: '500px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        <div style={{ height: '200px', textAlign: 'center', color: '#9ca3af' }}>
          ⬇️ Scroll to see fallbacks in action ⬇️
        </div>

        <div
          style={{
            padding: '20px 32px',
            backgroundColor: '#ec4899',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 'bold',
            display: 'inline-block',
            margin: '100px auto',
            anchorName: anchorName,
          }}
        >
          ⚓ Scrollable Anchor
        </div>

        <div
          style={{
            position: 'absolute',
            positionAnchor: anchorName,
            positionArea: 'top',
            positionTryFallbacks: useCustom
              ? 'flip-block, flip-inline, --custom-offset, --custom-corner'
              : 'flip-block, flip-inline',
            padding: '16px 20px',
            backgroundColor: 'white',
            border: '2px solid #ec4899',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '250px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ color: '#ec4899', marginBottom: '4px' }}>Adaptive Position</div>
          <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.4 }}>
            {useCustom ? (
              <>
                Usando: flip-block, flip-inline +<br />
                custom rules (--custom-offset, --custom-corner)
              </>
            ) : (
              <>Usando solo: flip-block, flip-inline</>
            )}
          </div>
        </div>

        <div style={{ height: '300px' }} />
      </div>

      <style>{`
        @position-try --custom-offset {
          position-area: right;
          margin: 20px;
        }

        @position-try --custom-corner {
          position-area: bottom left;
          margin: 12px;
        }
      `}</style>
    </section>
  );
}
