import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

/**
 * Features Grid - Características principales de css-anchor-toolkit
 */
export function FeaturesGrid() {
  const features = [
    {
      id: 'scss',
      title: 'SCSS Utilities',
      description: 'Mixins y clases para posicionamiento avanzado con todas las técnicas complejas pre-implementadas',
      icon: '🎨',
      color: 'from-pink-500 to-purple-500',
      code: `@include anchor-tooltip(
  top,
  flip-block,
  md
);`,
      examples: [
        'Margin magic arrows',
        'Corner positioning (√2)',
        'Multi-direction fallbacks',
        'Scroll-driven animations'
      ]
    },
    {
      id: 'react',
      title: 'React Components',
      description: 'Componentes headless con shadcn/ui. Totalmente customizables y accessibility-first',
      icon: '⚛️',
      color: 'from-blue-500 to-cyan-500',
      code: `<Tooltip
  anchor={button}
  placement="top"
  arrow
  fallbacks="flip-block"
>
  Content
</Tooltip>`,
      examples: [
        'Tooltip con arrows',
        'Popover con fallbacks',
        'ContextMenu anclado',
        'Dropdown inteligente'
      ]
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: '100% tipado con autocomplete completo. Errores en tiempo de compilación, no en runtime',
      icon: '📘',
      color: 'from-green-500 to-emerald-500',
      code: `const styles = positionedStyles({
  anchor: 'my-anchor',
  area: 'top',
  fallbacks: 'flip-block',
  distance: 'md'
});`,
      examples: [
        'Autocomplete completo',
        'Tipos seguros para position-area',
        'Validación de fallbacks',
        'Integración con IDEs'
      ]
    },
    {
      id: 'tailwind',
      title: 'Tailwind Plugin',
      description: 'Plugin opcional para proyectos Tailwind. Usa todas las funcionalidades con clases utilitarias',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      code: `<div class="anchor-area-top
            anchor-flip-block
            anchor-distance-md
            anchor-arrow">
  Tooltip content
</div>`,
      examples: [
        'Clases para position-area',
        'Variants de fallbacks',
        'Distance utilities',
        'Arrow positioning'
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            4 Formas de Usar CSS Anchor Positioning
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige la forma que prefiera. Totalmente compatible entre ellas y con cualquier stack.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 overflow-hidden"
            >
              <CardHeader className="relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Code Example */}
                <div className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-all">
                    <code>{feature.code}</code>
                  </pre>
                </div>

                {/* Examples List */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                    Incluye:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm bg-background rounded-md px-3 py-2 border"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badge */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      Modern
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
                      Production Ready
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    v1.0.0
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-background px-6 py-3 rounded-full border shadow-lg">
            <span className="text-sm font-medium">
              🚀 Funciona con: React, Vue, Svelte, Angular, o Vanilla JS
            </span>
            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-600 rounded-full">
              Framework Agnostic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}