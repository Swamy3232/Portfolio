import React from 'react';
import InteractiveDotGrid from './InteractiveDotGrid';

/**
 * GlobalDotGrid Component
 * Full-viewport interactive 2D canvas dot grid background.
 * Active across all pages and full-page slider sections.
 * Features spring physics, cursor attract/distort, click ripple wavefronts,
 * and automatic pause when idle for 60/120fps performance.
 */
export default function GlobalDotGrid({ className = '', style = {}, config = {} }) {
  return (
    <InteractiveDotGrid
      isFullPage={true}
      className={`opacity-75 ${className}`}
      style={style}
      config={config}
    />
  );
}
