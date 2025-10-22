import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

/**
 * Quick Start Section - Ejemplos de uso rápido
 */
export function QuickStartSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CodeBlock = ({ code, language = 'tsx', id }: { code: string; language?: string; id: string }) => (
    <div className="relative">
      <div className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap">
          <code className={language}>{code}</code>
        </pre>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-70 hover:opacity-100"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? '✅ Copiado!' : '📋 Copiar'}
      </Button>
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quick Start
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige tu forma preferida de usar CSS Anchor Positioning. Todas son 100% compatibles.
          </p>
        </div>

        {/* Installation */}
        <Card className="max-w-2xl mx-auto mb-16 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              Instalación
            </CardTitle>
            <CardDescription>
              Instala css-anchor-toolkit en tu proyecto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code="npm install css-anchor-toolkit"
              language="bash"
              id="install"
            />
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Tabs defaultValue="scss" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scss" className="flex items-center gap-2">
              🎨 SCSS
            </TabsTrigger>
            <TabsTrigger value="react" className="flex items-center gap-2">
              ⚛️ React
            </TabsTrigger>
            <TabsTrigger value="inline" className="flex items-center gap-2">
              📘 TypeScript
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="flex items-center gap-2">
              🎯 Tailwind
            </TabsTrigger>
          </TabsList>

          {/* SCSS Tab */}
          <TabsContent value="scss" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span>🎨</span>
                  SCSS Mixins & Utilities
                </CardTitle>
                <CardDescription>
                  Usa mixins predefinidos para todas las técnicas avanzadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Tooltip simple con fallbacks
                    <Badge variant="secondary">Más usado</Badge>
                  </h4>
                  <CodeBlock
                    code={`.tooltip {
  @include anchor-tooltip(
    $area: top,
    $fallbacks: flip-block,
    $distance: md,
    $arrow: true
  );
}`}
                    id="scss-tooltip"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Corner positioning (diagonal)</h4>
                  <CodeBlock
                    code={`.corner-tooltip {
  @include anchor-corner-tooltip(
    $area: top-left,
    $distance: lg,
    $arrow-size: md
  );
}`}
                    id="scss-corner"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Popover con tamaño dinámico</h4>
                  <CodeBlock
                    code={`.popover {
  @include anchor-popover(
    $area: right,
    $width: anchor-size(width),
    $max-width: 300px
  );
}`}
                    id="scss-popover"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* React Tab */}
          <TabsContent value="react" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span>⚛️</span>
                  React Components (Headless)
                </CardTitle>
                <CardDescription>
                  Componentes listos con shadcn/ui styling. Totalmente customizables.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Tooltip Component
                    <Badge variant="secondary">Recomendado</Badge>
                  </h4>
                  <CodeBlock
                    code={`import { Tooltip } from 'css-anchor-toolkit/react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        ref={anchorRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Hover me
      </Button>

      <Tooltip
        anchor={anchorRef}
        open={isOpen}
        placement="top"
        arrow
        fallbacks="flip-block"
      >
        This is a tooltip with CSS Anchor Positioning!
      </Tooltip>
    </>
  );
}`}
                    id="react-tooltip"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Popover Component</h4>
                  <CodeBlock
                    code={`import { Popover } from 'css-anchor-toolkit/react';

function Example() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>

      <Popover.Content
        placement="bottom"
        fallbacks="flip-block flip-inline"
        className="w-80"
      >
        <Popover.Header>Title</Popover.Header>
        <Popover.Body>
          Content with advanced positioning
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}`}
                    id="react-popover"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TypeScript Tab */}
          <TabsContent value="inline" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span>📘</span>
                  TypeScript Utilities
                </CardTitle>
                <CardDescription>
                  Estilos inline con 100% type safety y autocomplete
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Posicionamiento básico
                    <Badge variant="secondary">Type Safe</Badge>
                  </h4>
                  <CodeBlock
                    code={`import {
  createAnchorName,
  positionedStyles,
  AnchorArea,
  AnchorFallbacks
} from 'css-anchor-toolkit';

function TooltipExample() {
  const anchorName = createAnchorName('tooltip');

  return (
    <>
      <button style={{ anchorName: anchorName }}>
        Hover me
      </button>

      <div style={positionedStyles({
        anchor: anchorName,
        area: 'top' as AnchorArea,
        fallbacks: 'flip-block' as AnchorFallbacks,
        distance: 'md'
      })}>
        Tooltip content
      </div>
    </>
  );
}`}
                    id="ts-basic"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Corner positioning con types</h4>
                  <CodeBlock
                    code={`import {
  cornerPositionedStyles,
  CornerArea,
  DistanceSize
} from 'css-anchor-toolkit';

const styles = cornerPositionedStyles({
  anchor: 'my-anchor',
  area: 'top-left' as CornerArea,
  distance: 'lg' as DistanceSize,
  arrowSize: 'md'
});

// Aplicar styles:
// <div style={styles}>Corner tooltip</div>`}
                    id="ts-corner"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tailwind Tab */}
          <TabsContent value="tailwind" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span>🎯</span>
                  Tailwind CSS Plugin
                </CardTitle>
                <CardDescription>
                  Usa CSS Anchor Positioning con clases utilitarias. Plugin opcional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Configuración del plugin</h4>
                  <CodeBlock
                    code={`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('css-anchor-toolkit/tailwind')
  ],
}`}
                    id="tailwind-config"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Clases utilitarias
                    <Badge variant="secondary">Zero JS</Badge>
                  </h4>
                  <CodeBlock
                    code={`<!-- HTML Element con Anchor -->
<button class="anchor-name--my-button">
  Button
</button>

<!-- Tooltip posicionado -->
<div class="
  absolute
  anchor-anchor--my-button
  anchor-area-top
  anchor-flip-block
  anchor-distance-md
  anchor-arrow
  bg-slate-900
  text-white
  px-3 py-2
  rounded
">
  Tooltip content

  <!-- Arrow automático -->
  <div class="anchor-arrow absolute"></div>
</div>`}
                    id="tailwind-classes"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Componentes con Tailwind</h4>
                  <CodeBlock
                    code={`// React component con Tailwind
function Tooltip({ children, content }) {
  const anchorId = useId();

  return (
    <>
      <div className={\`anchor-name--\${anchorId}\`}>
        {children}
      </div>

      {showTooltip && (
        <div className={\`
          absolute
          anchor-anchor--\${anchorId}
          anchor-area-top
          anchor-flip-block
          anchor-distance-md
          bg-slate-900 text-white px-3 py-2 rounded
          shadow-lg
        \`}>
          {content}

          <div className="anchor-arrow absolute" />
        </div>
      )}
    </>
  );
}`}
                    id="tailwind-react"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <Card className="max-w-4xl mx-auto mt-16 border-2 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span>💡</span>
              Tips Rápidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold mb-1">Mejor Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    CSS nativo = 0KB bundle, sin JavaScript para posicionamiento
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold mb-1">Browser Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Chrome 125+, Safari 26+, Edge 125+. Firefox en desarrollo.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold mb-1">Fallbacks Automáticos</h4>
                  <p className="text-sm text-muted-foreground">
                    Los tooltips reposicionan automáticamente si no hay espacio.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold mb-1">Type Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    Errores de configuración en tiempo de compilación, no runtime.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}