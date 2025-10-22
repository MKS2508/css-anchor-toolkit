/**
 * Extensiones de tipo para CSS Anchor Positioning
 * Agrega soporte TypeScript para propiedades de anchor positioning que aún no están en @types/react
 */

import 'react';

declare module 'react' {
  interface CSSProperties {
    /**
     * Define un anchor name para este elemento
     */
    anchorName?: string;

    /**
     * Referencia al anchor al que se vincula este positioned element
     */
    positionAnchor?: string;

    /**
     * Define la región del grid 3×3 donde se posiciona el element
     */
    positionArea?: string;

    /**
     * Lista de fallbacks para reposicionamiento automático
     */
    positionTryFallbacks?: string;

    /**
     * Orden de prioridad para los fallbacks
     */
    positionTryOrder?: 'normal' | 'most-width' | 'most-height' | 'most-block-size' | 'most-inline-size';

    /**
     * Shorthand para position-try-order y position-try-fallbacks
     */
    positionTry?: string;

    /**
     * Control de visibilidad basado en overflow y anchor visibility
     */
    positionVisibility?: 'always' | 'anchors-visible' | 'no-overflow';

    /**
     * Limita el scope de anchor names
     */
    anchorScope?: string | 'all';
  }
}

declare global {
  interface CSSStyleDeclaration {
    anchorName: string;
    positionAnchor: string;
    positionArea: string;
    positionTryFallbacks: string;
    positionTryOrder: string;
    positionTry: string;
    positionVisibility: string;
    anchorScope: string;
  }
}

export {};
