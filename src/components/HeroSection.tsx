import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { supportsAnchorPositioning } from '../lib/anchor-helpers';

/**
 * Hero Section principal para css-anchor-toolkit
 * Incluye demo interactiva y CTA de instalación
 */
export function HeroSection() {
  const [showTooltip, setShowTooltip] = useState(false);
  const supportsAnchor = supportsAnchorPositioning();

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden antialiased">
      {/* Background con efectos visuales */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-slate-950 dark:via-slate-900/90 dark:to-purple-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/20" />

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badges de estado */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="secondary" className="font-mono text-xs font-medium">
              Chrome 125+
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs font-medium">
              Safari 26+
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs font-medium">
              Edge 125+
            </Badge>
            <Badge variant="default" className="font-mono text-xs font-medium">
              0KB Bundle
            </Badge>
            <Badge variant="default" className="font-mono text-xs font-medium">
              100% CSS Nativo
            </Badge>
          </div>

          {/* Título principal con mejor jerarquía */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-grotesk-black tracking-tight">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-[1.1]">
                CSS Anchor Positioning
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent leading-[1.1] font-grotesk-bold">
                Simplificado
              </span>
            </h1>
          </div>

          {/* Subtítulo con mejor tipografía */}
          <div className="space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-grotesk-medium">
              30+ técnicas avanzadas en una biblioteca 100% tipada y amigable
            </p>
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-grotesk">
              Desde <strong className="text-foreground font-grotesk-semibold">margin magic arrows</strong> hasta <strong className="text-foreground font-grotesk-semibold">corner positioning</strong>
            </p>
          </div>

          {/* Demo Interactiva mejorada */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-background/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-grotesk-semibold text-foreground mb-2">
                    🎮 Prueba la Demo Interactiva
                  </h2>
                  <p className="text-sm text-muted-foreground font-grotesk">
                    Hover sobre el botón para ver CSS Anchor Positioning en acción
                  </p>
                </div>

                <div className="relative flex justify-center items-center min-h-[120px] bg-muted/30 rounded-lg border border-border/50">
                  {/* Anchor Element */}
                  <div
                    style={{
                      anchorName: showTooltip ? '--demo-anchor' : 'none',
                      position: 'relative'
                    }}
                    className="relative"
                  >
                    <button
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-grotesk-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
                    >
                      Hover me ⚓
                    </button>

                    {/* Tooltip con CSS Anchor Positioning */}
                    {showTooltip && supportsAnchor && (
                      <div
                        style={{
                          position: 'absolute',
                          positionAnchor: '--demo-anchor',
                          positionArea: 'top',
                          marginBottom: '10px',
                          positionTryFallbacks: 'flip-block',
                          zIndex: 50
                        }}
                        className="bg-slate-900 text-white px-5 py-3 rounded-xl text-sm shadow-2xl border border-slate-700 font-grotesk-medium"
                      >
                        ✨ Tooltip con CSS Anchor Positioning!

                        {/* Arrow usando pseudo-elemento */}
                        <div
                          style={{
                            position: 'fixed',
                            width: '10px',
                            height: '10px',
                            background: 'inherit',
                            top: 'calc(anchor(--demo-tooltip top) - 10px)',
                            bottom: 'calc(anchor(--demo-tooltip bottom) - 10px)',
                            left: 'calc(anchor(--demo-anchor center) - 5px)',
                            anchorName: '--demo-tooltip',
                            margin: 'inherit',
                            clipPath: 'polygon(50% 0.2em, 100% 10px, 100% calc(100% - 10px), 50% calc(100% - 0.2em), 0 calc(100% - 10px), 0 10px)',
                            zIndex: -1
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mensaje si no hay soporte */}
                  {!supportsAnchor && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-5 py-4 rounded-xl text-sm font-grotesk-medium">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">⚠️</span>
                        <div className="font-grotesk">
                          Tu navegador no soporta CSS Anchor Positioning.
                          <br />
                          Usa Chrome 125+, Safari 26+, o Edge 125+ para ver la demo.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Principal mejorado */}
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 px-8 py-4 rounded-xl font-mono text-lg shadow-2xl border border-slate-800 dark:border-slate-200">
                npm install css-anchor-toolkit
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="font-grotesk-semibold" asChild>
                  <a href="#quickstart">
                    🚀 Empezar Ahora
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="font-grotesk-medium" asChild>
                  <a href="#documentation">
                    📖 Ver Documentación
                  </a>
                </Button>
                <Button variant="ghost" size="lg" className="font-grotesk-medium" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    🔗 GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats rápidos mejorados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-grotesk-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                30+
              </div>
              <div className="text-sm font-grotesk-medium text-muted-foreground">Técnicas Avanzadas</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-grotesk-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                0KB
              </div>
              <div className="text-sm font-grotesk-medium text-muted-foreground">Bundle Size</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-grotesk-black bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm font-grotesk-medium text-muted-foreground">TypeScript</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-grotesk-black bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                4
              </div>
              <div className="text-sm font-grotesk-medium text-muted-foreground">Formas de Uso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}