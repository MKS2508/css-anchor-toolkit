import React from 'react';
import { AnchorFocusCards, type AnchorFocusCard } from '@/components/AnchorFocusCards';

export function ShowcaseDemo() {
  const showcaseCards: AnchorFocusCard[] = [
    {
      id: 'position-grid',
      title: 'Position Grid 3×3',
      description: '50+ position-area values disponibles. 36 base positions × 4 justify × 4 align = 576 configuraciones únicas.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">⚓</div>
          <h3 className="font-bold text-lg mb-2">Position Grid</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            36 base positions
            <br />
            + justify/align
            <br />= <strong>576 configs</strong>
          </p>
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
      id: 'arrow-types',
      title: '3 Arrow Types',
      description: 'Implementación de 3 técnicas del research de css-tip.com: 2-headed (margin magic), 4-headed (polygon 12 puntos), diagonal (√2 formula).',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">➜</div>
          <h3 className="font-bold text-lg mb-2">3 Arrow Types</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            2-headed
            <br />
            4-headed
            <br />
            diagonal
          </p>
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
      id: 'fallbacks-auto',
      title: 'Fallbacks Automáticos',
      description: 'Sistema position-try-fallbacks con flip-block, flip-inline, flip-start. El navegador prueba posiciones alternativas cuando hay overflow.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">🔄</div>
          <h3 className="font-bold text-lg mb-2">Auto Fallbacks</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            flip-block
            <br />
            flip-inline
            <br />
            flip-start
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'bottom',
        arrow: { type: '4-headed', size: 'md' },
        distance: 'md',
      },
      variant: 'warning',
    },
    {
      id: 'distance-control',
      title: 'Distance Control',
      description: '5 tamaños predefinidos (sm, md, lg, xl, 2xl) usando CSS custom properties. Type-safe en TypeScript con enum DistanceSize.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">📏</div>
          <h3 className="font-bold text-lg mb-2">Distance Control</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            sm • md • lg
            <br />
            xl • 2xl
            <br />
            <strong>Type-safe</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'right',
        arrow: { type: '2-headed', size: 'sm' },
        distance: 'xl',
      },
      variant: 'info',
    },
    {
      id: 'scroll-aware',
      title: 'Scroll-Driven Animations',
      description: 'Integración con view-timeline. Anchors que animan con scroll usando animation-timeline property.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">📜</div>
          <h3 className="font-bold text-lg mb-2">Scroll Aware</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            view-timeline
            <br />
            animation-timeline
            <br />
            <strong>CSS nativo</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'left',
        arrow: { type: '4-headed', size: 'md' },
        distance: 'lg',
      },
      variant: 'success',
    },
    {
      id: 'position-try',
      title: '@position-try Rules',
      description: 'Custom fallback positions con @position-try. Define reglas personalizadas para overflow handling.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="font-bold text-lg mb-2">@position-try</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Custom rules
            <br />
            Fallback positions
            <br />
            <strong>Máximo control</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'bottom right',
        arrow: { type: 'diagonal', size: 'md' },
        distance: 'md',
      },
      variant: 'warning',
    },
    {
      id: 'type-safe',
      title: 'Type-Safe TypeScript',
      description: 'API completamente type-safe con 10+ types, 16+ functions. Autocomplete para PositionAreaValue, DistanceSize, ArrowType, etc.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Type-Safe TS</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            10+ types
            <br />
            16+ functions
            <br />
            <strong>Full autocomplete</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'top right',
        arrow: { type: 'diagonal', size: 'lg' },
        distance: '2xl',
      },
      variant: 'primary',
    },
    {
      id: 'three-layers',
      title: '3 Integration Layers',
      description: 'SCSS mixins, TypeScript helpers, y React components. Usa el toolkit en cualquier capa de tu stack.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">🏗️</div>
          <h3 className="font-bold text-lg mb-2">3 Layers</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            SCSS mixins
            <br />
            TypeScript helpers
            <br />
            <strong>React components</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'bottom left',
        arrow: { type: 'diagonal', size: 'md' },
        distance: 'lg',
      },
      variant: 'info',
    },
    {
      id: 'zero-js',
      title: 'Zero JavaScript Positioning',
      description: 'Todo el positioning lo hace el navegador de forma nativa. Sin cálculos manuales, sin event listeners, sin performance issues.',
      content: (
        <div className="text-center">
          <div className="text-5xl mb-3">⚡</div>
          <h3 className="font-bold text-lg mb-2">Zero JS</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            CSS nativo
            <br />
            Sin cálculos
            <br />
            <strong>Performante</strong>
          </p>
        </div>
      ),
      anchorConfig: {
        placement: 'top',
        arrow: { type: '2-headed', size: 'xl' },
        distance: 'lg',
      },
      variant: 'default',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          CSS Anchor Positioning Toolkit
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
          Type-safe CSS Anchor Positioning para React, TypeScript y SCSS.
          <br />
          W3C spec nativa, 0KB bundle, performance excelente.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <span className="font-bold text-blue-700 dark:text-blue-300">576</span> configuraciones
          </div>
          <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <span className="font-bold text-green-700 dark:text-green-300">3</span> arrow types
          </div>
          <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <span className="font-bold text-purple-700 dark:text-purple-300">0KB</span> bundle
          </div>
          <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <span className="font-bold text-yellow-700 dark:text-yellow-300">100%</span> type-safe
          </div>
        </div>
      </header>

      {/* Instructions */}
      <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          ✨ Hover sobre las cards para ver tooltips anclados
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cada card demuestra una capability del toolkit. Al hacer hover, la card enfoca y el
          resto se blurrean, mostrando un tooltip anclado con la configuración de positioning.
        </p>
      </div>

      {/* Showcase Cards */}
      <AnchorFocusCards cards={showcaseCards} columns={3} gap="lg" />

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-4">
          Basado en la especificación{' '}
          <a
            href="https://drafts.csswg.org/css-anchor-position-1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            CSS Anchor Positioning
          </a>{' '}
          del W3C
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="/docs/01-introduction.md"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            📖 Documentación
          </a>
          <a
            href="/demos/grid"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            🎯 GridDemo (576 configs)
          </a>
          <a
            href="/demos/tooltip"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            💬 TooltipDemo
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            🐙 GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ShowcaseDemo;
