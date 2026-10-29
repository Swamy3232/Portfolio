import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import PageIntro from '../animations/PageIntro';
import CustomCursor from '../animations/CustomCursor';

/**
 * Layout Component
 * Unified 100dvh full-screen presentation frame across all pages.
 * No window scrollbars; slide-by-slide transitions occur in place.
 */
export default function Layout() {
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col bg-transparent text-primary relative transition-colors duration-200">
      {/* 1. Page-Load Curtain & Animated SVG Logo */}
      <PageIntro />

      {/* 2. Custom Desktop Trailing Cursor */}
      <CustomCursor />

      {/* 3. Skip to Main Content Link for Keyboard / Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[var(--text)] focus:text-[var(--bg)] focus:rounded-lg focus:border focus:border-border font-semibold text-xs transition-all"
      >
        Skip to main content
      </a>

      {/* 4. Subtle Monochrome Noise Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* 5. Navigation Header */}
      <Navbar />

      {/* 6. Main Presentation Viewport */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 min-h-0 outline-none relative z-10 w-full overflow-hidden"
      >
        <Outlet />
      </main>
    </div>
  );
}
