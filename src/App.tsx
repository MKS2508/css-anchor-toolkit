import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { ScrollArea } from './components/ui/scroll-area';
import { BackgroundBeams } from './components/ui/background-beams';

// Componentes de la landing page
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { QuickStartSection } from './components/QuickStartSection';
import { AdvancedDemoShowcase } from './components/AdvancedDemoShowcase';

// Componentes existentes (documentación técnica)
import { supportsAnchorPositioning } from './lib/anchor-helpers';

// Demos
import { TooltipDemo } from './demos/TooltipDemo';
import { GridDemo } from './demos/GridDemo';
import { FallbackDemo } from './demos/FallbackDemo';
import { AdvancedDemo } from './demos/AdvancedDemo';

// Documentación
import { IntroductionDoc } from './docs/IntroductionDoc';
import { GridSystemDoc } from './docs/GridSystemDoc';
import { FallbacksDoc } from './docs/FallbacksDoc';
import { AdvancedTechniquesDoc } from './docs/AdvancedTechniquesDoc';

import './index.css';
import './styles/anchor-base.css';

/**
 * App principal - CSS Anchor Positioning Toolkit Landing Page
 * Presentación profesional de la biblioteca npm con demostraciones interactivas
 */
export function App() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const supportsAnchor = supportsAnchorPositioning();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Background animated */}
      <BackgroundBeams
        variant="ocean"
        opacity={0.2}
        className="absolute inset-0 -z-10"
      />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  css-anchor-toolkit
                </h1>
                <p className="text-xs text-muted-foreground">
                  CSS Anchor Positioning Simplified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={supportsAnchor ? 'default' : 'destructive'} className="text-xs">
                {supportsAnchor ? '✓ Browser Support' : '✗ Update Browser'}
              </Badge>

              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#quickstart" className="text-sm font-medium hover:text-primary transition-colors">
                  Quick Start
                </a>
                <a href="#advanced" className="text-sm font-medium hover:text-primary transition-colors">
                  Advanced
                </a>
                <a href="#documentation" className="text-sm font-medium hover:text-primary transition-colors">
                  Documentation
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 GitHub
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="#quickstart">
                    🚀 Get Started
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Alert si no hay soporte */}
      {!supportsAnchor && (
        <div className="bg-yellow-50 dark:bg-yellow-950 border-b border-yellow-200 dark:border-yellow-800">
          <div className="container mx-auto px-6 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ Tu navegador no soporta CSS Anchor Positioning.
              <strong>Usa Chrome 125+, Safari 26+, o Edge 125+</strong> para ver todas las demos en acción.
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Landing Page Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <section id="features">
          <FeaturesGrid />
        </section>

        {/* Quick Start */}
        <section id="quickstart">
          <QuickStartSection />
        </section>

        {/* Advanced Demos */}
        <section id="advanced">
          <AdvancedDemoShowcase />
        </section>

        {/* Technical Documentation */}
        <section id="documentation" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            {/* Header de Documentación Técnica */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Documentación Técnica Completa
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explora en profundidad todas las capacidades de CSS Anchor Positioning con ejemplos detallados.
              </p>
            </div>

            <Tabs defaultValue="docs" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="docs">📖 Documentación</TabsTrigger>
                <TabsTrigger value="demos">🎮 Demos Interactivas</TabsTrigger>
              </TabsList>

              {/* Tab: Documentación */}
              <TabsContent value="docs" className="space-y-6 mt-12">
                <DocsNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

                <div className="grid lg:grid-cols-[250px_1fr] gap-6">
                  {/* Sidebar de navegación */}
                  <aside className="hidden lg:block space-y-2">
                    <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />
                  </aside>

                  {/* Contenido de documentación */}
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-8 pr-4">
                      {activeSection === 'intro' && <IntroductionDoc />}
                      {activeSection === 'grid' && <GridSystemDoc />}
                      {activeSection === 'fallbacks' && <FallbacksDoc />}
                      {activeSection === 'advanced' && <AdvancedTechniquesDoc />}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* Tab: Demos */}
              <TabsContent value="demos" className="space-y-6 mt-12">
                <DemosGallery />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Footer - Biblioteca npm */}
      <footer className="border-t bg-white/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Columna 1: About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">css-anchor-toolkit</h3>
                  <p className="text-xs text-muted-foreground">v1.0.0</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                CSS Anchor Positioning simplified. 30+ advanced techniques in one typed, developer-friendly toolkit.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">MIT License</Badge>
                <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                <Badge variant="secondary" className="text-xs">100% CSS</Badge>
              </div>
            </div>

            {/* Columna 2: Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="#quickstart" className="text-muted-foreground hover:text-foreground transition-colors">
                    📖 Getting Started
                  </a>
                </div>
                <div>
                  <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    🎨 Features
                  </a>
                </div>
                <div>
                  <a href="#advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                    ⚡ Advanced Techniques
                  </a>
                </div>
                <div>
                  <a href="#documentation" className="text-muted-foreground hover:text-foreground transition-colors">
                    📚 API Documentation
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 3: Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    🔗 GitHub Repository
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.npmjs.com/package/css-anchor-toolkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    📦 npm Package
                  </a>
                </div>
                <div>
                  <a
                    href="https://drafts.csswg.org/css-anchor-position-1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    📋 W3C Specification
                  </a>
                </div>
                <div>
                  <a
                    href="https://css-tip.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    💡 CSS-Tip Techniques
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 4: Browser Support */}
            <div>
              <h4 className="font-semibold mb-4">Browser Support</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Chrome</span>
                  <Badge variant="default" className="text-xs">125+ ✅</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Edge</span>
                  <Badge variant="default" className="text-xs">125+ ✅</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Safari</span>
                  <Badge variant="default" className="text-xs">26+ ✅</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Firefox</span>
                  <Badge variant="secondary" className="text-xs">Soon 🔄</Badge>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://caniuse.com/css-anchor-positioning" target="_blank" rel="noopener noreferrer">
                    📊 Detailed Support
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  Built with ❤️ by <strong>MKS2508</strong> using React, TypeScript, Tailwind CSS & shadcn/ui
                </p>
                <p className="mt-1">
                  Based on W3C CSS Anchor Positioning Level 1 specification and research from 17+ official sources
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  Performance: <strong className="text-foreground">0KB Bundle</strong>
                </div>
                <div className="text-xs text-muted-foreground">
                  Positioning: <strong className="text-foreground">100% CSS Native</strong>
                </div>
                <div className="text-xs text-muted-foreground">
                  Type Safety: <strong className="text-foreground">100% TypeScript</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Navegación de documentación (cards clickeables)
 */
function DocsNavigation({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const sections = [
    {
      id: 'intro',
      title: 'Introducción',
      description: 'Qué es CSS Anchor Positioning y por qué es revolucionario',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'grid',
      title: 'Sistema Grid 3×3',
      description: 'Entender position-area y el sistema de posicionamiento',
      icon: '📐',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'fallbacks',
      title: 'Fallbacks Automáticos',
      description: 'position-try-fallbacks y prevención de overflow',
      icon: '🔄',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'advanced',
      title: 'Técnicas Avanzadas',
      description: 'Corner positioning, multiple anchors, y anchor-size()',
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sections.map((section) => (
        <Card
          key={section.id}
          className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
            activeSection === section.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onSectionChange(section.id)}
        >
          <CardHeader className="space-y-1">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl mb-2`}
            >
              {section.icon}
            </div>
            <CardTitle className="text-lg">{section.title}</CardTitle>
            <CardDescription className="text-xs">{section.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

/**
 * Sidebar de navegación (desktop)
 */
function SidebarNav({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const sections = [
    { id: 'intro', label: '🚀 Introducción' },
    { id: 'grid', label: '📐 Sistema Grid' },
    { id: 'fallbacks', label: '🔄 Fallbacks' },
    { id: 'advanced', label: '⚡ Avanzado' },
  ];

  return (
    <nav className="space-y-1 sticky top-24">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
            activeSection === section.id
              ? 'bg-primary text-primary-foreground font-medium'
              : 'hover:bg-muted'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

/**
 * Gallery de demos interactivas
 */
function DemosGallery() {
  const [activeDemo, setActiveDemo] = useState<string>('tooltips');

  const demos = [
    {
      id: 'tooltips',
      title: 'Tooltips',
      description: 'Tooltips con arrows dinámicos y margin magic',
      icon: '💬',
      component: <TooltipDemo />,
    },
    {
      id: 'grid',
      title: 'Grid System',
      description: 'Visualización del sistema grid 3×3 y position-area',
      icon: '📐',
      component: <GridDemo />,
    },
    {
      id: 'fallbacks',
      title: 'Fallbacks',
      description: 'Sistema de fallbacks automáticos con flip tactics',
      icon: '🔄',
      component: <FallbackDemo />,
    },
    {
      id: 'advanced',
      title: 'Técnicas Avanzadas',
      description: 'Corner positioning, multiple anchors, sizing dinámico',
      icon: '⚡',
      component: <AdvancedDemo />,
    },
  ];

  const currentDemo = demos.find((d) => d.id === activeDemo);

  return (
    <div className="space-y-6">
      {/* Demo selector */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demos.map((demo) => (
          <Card
            key={demo.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeDemo === demo.id ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => setActiveDemo(demo.id)}
          >
            <CardHeader>
              <div className="text-3xl mb-2">{demo.icon}</div>
              <CardTitle className="text-base">{demo.title}</CardTitle>
              <CardDescription className="text-xs">{demo.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Demo actual */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentDemo?.icon}</span>
            <div>
              <CardTitle>{currentDemo?.title}</CardTitle>
              <CardDescription>{currentDemo?.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-400px)]">
            {currentDemo?.component}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
