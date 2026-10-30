import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Tooltip } from './components/Tooltip';
import { Popover } from './components/Popover';
import { ContextMenu, MenuItem, MenuSeparator } from './components/ContextMenu';
import { supportsAnchorPositioning, createAnchorName } from './lib/anchor-helpers';
import { CSS_VARS, POSITION_AREAS, DISTANCES, ARROW_SIZES } from './lib/anchor-core';
import type {
  PositionAreaValue,
  DistanceSize,
  ArrowSize,
  ArrowType,
  JustifyValue,
  AlignValue,
} from './lib/anchor-types';

import { TooltipDirectionsGrid, type ActiveTooltipInfo } from './debug-demos/TooltipDirectionsGrid';
import { ArrowTypesComparison } from './debug-demos/ArrowTypesComparison';
import { FocusCardsDebug } from './debug-demos/FocusCardsDebug';
import { Grid576Navigator } from './debug-demos/Grid576Navigator';
import { DraggableDemo } from './debug-demos/DraggableDemo';

import './index.css';
import './styles/anchor-base.css';

type DemoScenario =
  | 'simple'
  | 'tooltip-directions'
  | 'arrow-types'
  | 'draggable'
  | 'focus-cards'
  | 'grid-576';

type ComponentType = 'tooltip' | 'popover' | 'contextmenu' | 'grid';

interface DebugConfig {
  scenario: DemoScenario;
  component: ComponentType;
  positionArea: PositionAreaValue;
  distance: DistanceSize;
  arrowEnabled: boolean;
  arrowType: ArrowType;
  arrowSize: ArrowSize;
  fallbacksEnabled: boolean;
  justifySelf: JustifyValue;
  alignSelf: AlignValue;
  showGrid: boolean;
  showMeasurements: boolean;
  highlightAnchor: boolean;
}

const DEFAULT_CONFIG: DebugConfig = {
  scenario: 'simple',
  component: 'tooltip',
  positionArea: 'top',
  distance: 'md',
  arrowEnabled: true,
  arrowType: '2-headed',
  arrowSize: 'md',
  fallbacksEnabled: true,
  justifySelf: 'anchor-center',
  alignSelf: 'anchor-center',
  showGrid: false,
  showMeasurements: false,
  highlightAnchor: false,
};

const DEMO_SCENARIOS: { value: DemoScenario; label: string; description: string }[] = [
  {
    value: 'tooltip-directions',
    label: 'Tooltip Directions',
    description: 'Grid of tooltips in all 9 directions',
  },
  {
    value: 'arrow-types',
    label: 'Arrow Types',
    description: 'Compare 2-headed, 4-headed, and diagonal arrows',
  },
  {
    value: 'draggable',
    label: 'Draggable Anchor',
    description: 'Drag anchor with following tooltip',
  },
  {
    value: 'focus-cards',
    label: 'Focus Cards',
    description: 'Interactive cards with hover tooltips',
  },
  {
    value: 'grid-576',
    label: 'Grid 576 Configs',
    description: 'Navigate through 288 positioning combinations',
  },
  {
    value: 'simple',
    label: 'Simple Debug',
    description: 'Basic anchor with manual controls',
  },
];

export function AppDebug() {
  const [config, setConfig] = useState<DebugConfig>(DEFAULT_CONFIG);
  const [activeElement, setActiveElement] = useState<ActiveTooltipInfo | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ x: 300, y: 200 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const anchorRef = useRef<HTMLDivElement>(null);
  const supportsAnchor = supportsAnchorPositioning();

  const anchorName = createAnchorName('debug-anchor');

  const updateConfig = (updates: Partial<DebugConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleContextMenuOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  useEffect(() => {
    if (config.scenario === 'simple' && (showTooltip || showPopover || showContextMenu)) {
      setActiveElement({
        anchorName: anchorName,
        placement: config.positionArea,
        distance: config.distance,
        arrowType: config.arrowEnabled ? config.arrowType : undefined,
        arrowSize: config.arrowEnabled ? config.arrowSize : undefined,
        isVisible: true,
      });
    } else if (config.scenario === 'simple') {
      setActiveElement(null);
    }
  }, [
    config.scenario,
    config.positionArea,
    config.distance,
    config.arrowEnabled,
    config.arrowType,
    config.arrowSize,
    config.component,
    showTooltip,
    showPopover,
    showContextMenu,
    anchorName,
  ]);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐛</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  CSS Anchor Toolkit Debugger
                </h1>
                <p className="text-xs text-muted-foreground">
                  Interactive testing environment
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Scenario Selector */}
              <div className="hidden md:block">
                <Select
                  value={config.scenario}
                  onValueChange={(value) => updateConfig({ scenario: value as DemoScenario })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_SCENARIOS.map((scenario) => (
                      <SelectItem key={scenario.value} value={scenario.value}>
                        {scenario.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Badge variant={supportsAnchor ? 'default' : 'destructive'} className="text-xs">
                {supportsAnchor ? '✓ Support' : '✗ No Support'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="w-9 px-0"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </Button>
              <Button variant="outline" size="sm" onClick={resetConfig}>
                🔄 Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {!supportsAnchor && (
        <div className="bg-yellow-50 dark:bg-yellow-950 border-b border-yellow-200 dark:border-yellow-800">
          <div className="container mx-auto px-6 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ Tu navegador no soporta CSS Anchor Positioning. Usa Chrome 125+, Safari 26+, o Edge 125+
            </p>
          </div>
        </div>
      )}

      {/* Main Layout: 3 columnas */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-[300px_1fr_350px] gap-6 h-[calc(100vh-120px)] items-start">
          {/* Left Panel: Controls */}
          <div className="overflow-y-auto overflow-x-hidden relative z-10 will-change-scroll h-full">
            <DebugControlPanel config={config} onConfigChange={updateConfig} />
          </div>

          {/* Center: Canvas */}
          <div className="border rounded-lg bg-white dark:bg-slate-900 relative overflow-hidden isolate h-full">
            <DebugCanvas
              config={config}
              anchorName={anchorName}
              anchorRef={anchorRef}
              anchorPosition={anchorPosition}
              onAnchorMove={setAnchorPosition}
              showTooltip={showTooltip}
              showPopover={showPopover}
              showContextMenu={showContextMenu}
              onShowTooltipChange={setShowTooltip}
              onShowPopoverChange={setShowPopover}
              onContextMenuOpen={handleContextMenuOpen}
              onContextMenuClose={() => setShowContextMenu(false)}
              onActiveElementChange={setActiveElement}
            />
          </div>

          {/* Right Panel: Inspector */}
          <div className="overflow-y-auto overflow-x-hidden relative z-10 will-change-scroll h-full">
            <DebugInspector
              config={config}
              anchorName={anchorName}
              anchorRef={anchorRef}
              activeElement={activeElement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DebugControlPanel({
  config,
  onConfigChange,
}: {
  config: DebugConfig;
  onConfigChange: (updates: Partial<DebugConfig>) => void;
}) {
  const arrowTypes: ArrowType[] = ['2-headed', '4-headed', 'diagonal'];
  const justifyValues: JustifyValue[] = ['start', 'center', 'end', 'anchor-center'];
  const alignValues: AlignValue[] = ['start', 'center', 'end', 'anchor-center'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">⚙️ Control Panel</CardTitle>
        <CardDescription>Configure positioning properties</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Component Type */}
        <div className="space-y-2">
          <Label>Component Type</Label>
          <Select
            value={config.component}
            onValueChange={(value) => onConfigChange({ component: value as ComponentType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tooltip">Tooltip</SelectItem>
              <SelectItem value="popover">Popover</SelectItem>
              <SelectItem value="contextmenu">Context Menu</SelectItem>
              <SelectItem value="grid">Grid Positioning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Position Area */}
        <div className="space-y-2">
          <Label>Position Area</Label>
          <Select
            value={config.positionArea}
            onValueChange={(value) => onConfigChange({ positionArea: value as PositionAreaValue })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {POSITION_AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Distance */}
        <div className="space-y-2">
          <Label>Distance: {config.distance}</Label>
          <Select
            value={config.distance}
            onValueChange={(value) => onConfigChange({ distance: value as DistanceSize })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DISTANCES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Arrow Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Arrow</Label>
            <input
              type="checkbox"
              checked={config.arrowEnabled}
              onChange={(e) => onConfigChange({ arrowEnabled: e.target.checked })}
              className="w-4 h-4"
            />
          </div>

          {config.arrowEnabled && (
            <>
              <div className="space-y-2">
                <Label className="text-xs">Arrow Type</Label>
                <Select
                  value={config.arrowType}
                  onValueChange={(value) => onConfigChange({ arrowType: value as ArrowType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {arrowTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Arrow Size</Label>
                <Select
                  value={config.arrowSize}
                  onValueChange={(value) => onConfigChange({ arrowSize: value as ArrowSize })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ARROW_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <Separator />

        {/* Alignment */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs">Justify Self</Label>
            <Select
              value={config.justifySelf}
              onValueChange={(value) => onConfigChange({ justifySelf: value as JustifyValue })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {justifyValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Align Self</Label>
            <Select
              value={config.alignSelf}
              onValueChange={(value) => onConfigChange({ alignSelf: value as AlignValue })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alignValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Visual Options */}
        <div className="space-y-3">
          <Label>Visual Helpers</Label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={config.fallbacksEnabled}
                onChange={(e) => onConfigChange({ fallbacksEnabled: e.target.checked })}
                className="w-4 h-4"
              />
              Fallbacks Enabled
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={config.showGrid}
                onChange={(e) => onConfigChange({ showGrid: e.target.checked })}
                className="w-4 h-4"
              />
              Show Grid Overlay
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={config.showMeasurements}
                onChange={(e) => onConfigChange({ showMeasurements: e.target.checked })}
                className="w-4 h-4"
              />
              Show Measurements
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={config.highlightAnchor}
                onChange={(e) => onConfigChange({ highlightAnchor: e.target.checked })}
                className="w-4 h-4"
              />
              Highlight Anchor
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DebugCanvas({
  config,
  anchorName,
  anchorRef,
  anchorPosition,
  onAnchorMove,
  showTooltip,
  showPopover,
  showContextMenu,
  onShowTooltipChange,
  onShowPopoverChange,
  onContextMenuOpen,
  onContextMenuClose,
  onActiveElementChange,
}: {
  config: DebugConfig;
  anchorName: string;
  anchorRef: React.RefObject<HTMLDivElement>;
  anchorPosition: { x: number; y: number };
  onAnchorMove: (pos: { x: number; y: number }) => void;
  showTooltip: boolean;
  showPopover: boolean;
  showContextMenu: boolean;
  onShowTooltipChange: (show: boolean) => void;
  onShowPopoverChange: (show: boolean) => void;
  onContextMenuOpen: (e: React.MouseEvent) => void;
  onContextMenuClose: () => void;
  onActiveElementChange?: (info: ActiveTooltipInfo | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      onAnchorMove({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Render different demos based on scenario
  if (config.scenario === 'tooltip-directions') {
    return (
      <TooltipDirectionsGrid
        onActiveChange={onActiveElementChange}
        debugMode={true}
        defaultDistance={config.distance}
        defaultArrowType={config.arrowType}
        defaultArrowSize={config.arrowSize}
      />
    );
  }

  if (config.scenario === 'arrow-types') {
    return (
      <ArrowTypesComparison
        onActiveChange={onActiveElementChange}
        debugMode={true}
        defaultDistance={config.distance}
        defaultArrowSize={config.arrowSize}
      />
    );
  }

  if (config.scenario === 'draggable') {
    return (
      <DraggableDemo
        debugMode={true}
        defaultDistance={config.distance}
        defaultArrowType={config.arrowType}
      />
    );
  }

  if (config.scenario === 'focus-cards') {
    return <FocusCardsDebug onActiveChange={onActiveElementChange} debugMode={true} />;
  }

  if (config.scenario === 'grid-576') {
    return <Grid576Navigator onActiveChange={onActiveElementChange} debugMode={true} />;
  }

  // Simple mode (default original canvas)

  return (
    <div
      className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={onContextMenuOpen}
    >
      {/* Grid Overlay */}
      {config.showGrid && <GridOverlay anchorRef={anchorRef} />}

      {/* Measurements Overlay */}
      {config.showMeasurements && anchorRef.current && (
        <MeasurementsOverlay anchorRef={anchorRef} distance={config.distance} />
      )}

      {/* Anchor Element */}
      <div
        ref={anchorRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => config.component === 'tooltip' && onShowTooltipChange(true)}
        onMouseLeave={() => config.component === 'tooltip' && onShowTooltipChange(false)}
        onClick={() => config.component === 'popover' && onShowPopoverChange(!showPopover)}
        style={{
          position: 'absolute',
          left: `${anchorPosition.x}px`,
          top: `${anchorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          anchorName: anchorName,
          cursor: isDragging ? 'grabbing' : 'grab',
          padding: '16px 24px',
          backgroundColor: config.highlightAnchor ? '#3b82f6' : '#6b7280',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          userSelect: 'none',
          boxShadow: config.highlightAnchor
            ? '0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s',
          zIndex: 10,
        } as CSSProperties}
      >
        ⚓ ANCHOR
        <div className="text-xs opacity-75 mt-1">
          {config.component === 'tooltip' ? 'Hover me' : config.component === 'popover' ? 'Click me' : 'Right-click'}
        </div>
      </div>

      {/* Tooltip */}
      {config.component === 'tooltip' && showTooltip && (
        <Tooltip
          anchor={anchorName}
          placement={config.positionArea}
          arrow={config.arrowEnabled ? { type: config.arrowType, size: config.arrowSize } : false}
          distance={config.distance}
          style={
            {
              justifySelf: config.justifySelf,
              alignSelf: config.alignSelf,
            } as CSSProperties
          }
        >
          <div className="space-y-1">
            <div className="font-bold text-sm">Tooltip Debug</div>
            <div className="text-xs opacity-90">
              {config.positionArea} • {config.arrowType} • {config.distance}
            </div>
          </div>
        </Tooltip>
      )}

      {/* Popover */}
      {config.component === 'popover' && (
        <Popover
          anchor={anchorName}
          area={config.positionArea}
          distance={config.distance}
          fallbacks={config.fallbacksEnabled}
          open={showPopover}
          onClose={() => onShowPopoverChange(false)}
          style={
            {
              justifySelf: config.justifySelf,
              alignSelf: config.alignSelf,
            } as CSSProperties
          }
        >
          <div className="space-y-3">
            <div className="font-bold">Popover Debug</div>
            <div className="text-sm text-muted-foreground">
              Position: {config.positionArea}
            </div>
            <Button size="sm" onClick={() => onShowPopoverChange(false)}>
              Close
            </Button>
          </div>
        </Popover>
      )}

      {/* Context Menu */}
      {config.component === 'contextmenu' && showContextMenu && (
        <ContextMenu
          anchor={anchorName}
          area={config.positionArea}
          distance={config.distance}
          onClose={onContextMenuClose}
          style={
            {
              justifySelf: config.justifySelf,
              alignSelf: config.alignSelf,
            } as CSSProperties
          }
        >
          <MenuItem icon="📋" onClick={() => console.log('Copy')}>
            Copy
          </MenuItem>
          <MenuItem icon="✂️" onClick={() => console.log('Cut')}>
            Cut
          </MenuItem>
          <MenuItem icon="📄" onClick={() => console.log('Paste')}>
            Paste
          </MenuItem>
          <MenuSeparator />
          <MenuItem icon="🗑️" onClick={() => console.log('Delete')}>
            Delete
          </MenuItem>
        </ContextMenu>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">🎮 Controls:</div>
          <div>• Drag anchor to move</div>
          <div>• {config.component === 'tooltip' ? 'Hover' : config.component === 'popover' ? 'Click' : 'Right-click'} anchor to trigger</div>
          <div>• Use left panel to configure</div>
          <div>• Check right panel for details</div>
        </div>
      </div>
    </div>
  );
}

function GridOverlay({ anchorRef }: { anchorRef: React.RefObject<HTMLDivElement> }) {
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const updateRect = () => {
        if (anchorRef.current) {
          setAnchorRect(anchorRef.current.getBoundingClientRect());
        }
      };

      updateRect();
      const interval = setInterval(updateRect, 100);

      return () => clearInterval(interval);
    }
  }, [anchorRef]);

  if (!anchorRect) return null;

  const cellWidth = anchorRect.width;
  const cellHeight = anchorRect.height;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${anchorRect.left}px`,
        top: `${anchorRect.top}px`,
        width: `${cellWidth * 3}px`,
        height: `${cellHeight * 3}px`,
        transform: 'translate(-100%, -100%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '2px',
        opacity: 0.3,
        zIndex: 1,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          style={{
            border: '1px dashed #3b82f6',
            backgroundColor: i === 4 ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
          }}
        />
      ))}
    </div>
  );
}

function MeasurementsOverlay({
  anchorRef,
  distance,
}: {
  anchorRef: React.RefObject<HTMLDivElement>;
  distance: DistanceSize;
}) {
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (anchorRef.current) {
      const updateRect = () => {
        if (anchorRef.current) {
          setAnchorRect(anchorRef.current.getBoundingClientRect());
        }
      };

      updateRect();
      const interval = setInterval(updateRect, 100);

      return () => clearInterval(interval);
    }
  }, [anchorRef]);

  if (!anchorRect) return null;

  const distanceValue = CSS_VARS.distances[distance];
  const distancePx = parseFloat(distanceValue.replace('var(--anchor-distance-', '').replace(')', '')) || 8;

  return (
    <div className="absolute pointer-events-none inset-0 z-[5]">
      {/* Top measurement line */}
      <div
        style={{
          position: 'absolute',
          left: `${anchorRect.left + anchorRect.width / 2}px`,
          top: `${anchorRect.top - distancePx}px`,
          width: '2px',
          height: `${distancePx}px`,
          backgroundColor: '#f59e0b',
        }}
      >
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap"
        >
          {distance} ({distancePx}px)
        </div>
      </div>

      {/* Anchor size indicator */}
      <div
        style={{
          position: 'absolute',
          left: `${anchorRect.left}px`,
          top: `${anchorRect.bottom + 4}px`,
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-mono"
      >
        {Math.round(anchorRect.width)}×{Math.round(anchorRect.height)}px
      </div>

      {/* Anchor position */}
      <div
        style={{
          position: 'absolute',
          left: `${anchorRect.left - 60}px`,
          top: `${anchorRect.top}px`,
        }}
        className="bg-purple-500 text-white px-2 py-1 rounded text-[10px] font-mono"
      >
        x:{Math.round(anchorRect.left)} y:{Math.round(anchorRect.top)}
      </div>
    </div>
  );
}

function DebugInspector({
  config,
  anchorName,
  anchorRef,
  activeElement,
}: {
  config: DebugConfig;
  anchorName: string;
  anchorRef: React.RefObject<HTMLDivElement>;
  activeElement: ActiveTooltipInfo | null;
}) {
  const [computedStyles, setComputedStyles] = useState<CSSStyleDeclaration | null>(null);

  useEffect(() => {
    if (anchorRef.current) {
      setComputedStyles(window.getComputedStyle(anchorRef.current));
    }
  }, [anchorRef, config]);

  // Use active element if available, otherwise use config
  const displayInfo = activeElement || {
    anchorName: anchorName,
    placement: config.positionArea,
    distance: config.distance,
    arrowType: config.arrowEnabled ? config.arrowType : undefined,
    arrowSize: config.arrowEnabled ? config.arrowSize : undefined,
    isVisible: false,
  };

  const generatedStyles: CSSProperties = {
    position: 'absolute',
    positionAnchor: displayInfo.anchorName,
    positionArea: displayInfo.placement,
    margin: CSS_VARS.distances[displayInfo.distance],
    justifySelf: config.justifySelf,
    alignSelf: config.alignSelf,
  };

  if (config.fallbacksEnabled) {
    generatedStyles.positionTryFallbacks = 'flip-block, flip-inline, flip-start';
  }

  const codeSnippet = `<Tooltip
  anchor="${displayInfo.anchorName}"
  placement="${displayInfo.placement}"
  ${displayInfo.arrowType ? `arrow={{ type: '${displayInfo.arrowType}', size: '${displayInfo.arrowSize || 'md'}' }}` : 'arrow={false}'}
  distance="${displayInfo.distance}"
  ${config.justifySelf !== 'anchor-center' || config.alignSelf !== 'anchor-center' ? `style={{
    justifySelf: '${config.justifySelf}',
    alignSelf: '${config.alignSelf}',
  }}` : ''}
>
  Tooltip content
</Tooltip>`;

  return (
    <div className="space-y-4">
      {/* Active Element Card - Always visible to prevent layout shifts */}
      <Card
        className={`transition-all duration-200 ${
          activeElement
            ? 'border-blue-500 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 opacity-100'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60'
        }`}
        style={{ height: '180px', overflow: 'hidden' }}
      >
        <CardHeader>
          <CardTitle className={`text-sm ${activeElement ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
            ⚡ Active Element
          </CardTitle>
          <CardDescription className="text-xs">
            {activeElement ? `Currently inspecting: ${activeElement.placement}` : 'Hover over an element to inspect'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeElement ? (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Placement:</span>
                <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                  {activeElement.placement}
                </code>
              </div>
              {activeElement.arrowType && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Arrow:</span>
                  <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                    {activeElement.arrowType} ({activeElement.arrowSize || 'md'})
                  </code>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance:</span>
                <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                  {activeElement.distance}
                </code>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs text-slate-400 dark:text-slate-500 italic">
              <div>No active element</div>
              <div className="text-[10px] mt-2">
                Hover over tooltips in the canvas to see their properties here
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Anchor Definition Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">🎯 Anchor Definition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Anchor Name:</span>
              <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {displayInfo.anchorName}
              </code>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Computed:</span>
              <Badge variant={computedStyles?.anchorName ? 'default' : 'secondary'} className="text-xs">
                {computedStyles?.anchorName || 'Dynamic'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated CSS Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">📝 Generated CSS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono space-y-1 overflow-auto max-h-[200px]">
            {Object.entries(generatedStyles).map(([key, value]) => (
              <div key={key}>
                <span className="text-blue-400">{key}:</span>{' '}
                <span className="text-green-300">{String(value)}</span>;
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CSS Variables Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">🎨 CSS Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance:</span>
              <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {CSS_VARS.distances[config.distance]}
              </code>
            </div>
            {config.arrowEnabled && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Arrow Size:</span>
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {CSS_VARS.arrowSizes[config.arrowSize]}
                </code>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Code Export Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">💻 Code Export</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono overflow-auto max-h-[300px]">
            {codeSnippet}
          </pre>
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-3"
            onClick={() => {
              navigator.clipboard.writeText(codeSnippet);
              alert('Code copied to clipboard!');
            }}
          >
            📋 Copy Code
          </Button>
        </CardContent>
      </Card>

      {/* Position Grid Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">📐 Position Area Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <PositionAreaGrid currentPosition={config.positionArea} />
        </CardContent>
      </Card>
    </div>
  );
}

function PositionAreaGrid({ currentPosition }: { currentPosition: PositionAreaValue }) {
  const basicPositions = [
    ['top left', 'top', 'top right'],
    ['left', 'center', 'right'],
    ['bottom left', 'bottom', 'bottom right'],
  ];

  return (
    <div className="grid grid-cols-3 gap-1">
      {basicPositions.flat().map((pos) => (
        <div
          key={pos}
          className={`
            p-2 text-center text-xs rounded border
            ${currentPosition === pos
              ? 'bg-blue-500 text-white border-blue-600 font-bold'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }
          `}
        >
          {pos}
        </div>
      ))}
    </div>
  );
}

export default AppDebug;
