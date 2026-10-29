import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * CustomCursor Component
 * Desktop-only custom spotlight cursor system:
 * - 8px accent dot following the mouse instantly
 * - 190px soft radial spotlight following with 0.15 lerp easing
 * - 240px spotlight expansion over links, buttons & interactive cards
 * - Click shrink feedback, window leave/enter detection
 * - Zero interference on touch devices or mobile
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // References for DOM nodes
  const dotRef = useRef(null);
  const spotlightWrapRef = useRef(null);
  const spotlightElRef = useRef(null);

  // Animation and physics state
  const mousePos = useRef({ x: -200, y: -200 });
  const spotlightPos = useRef({ x: -200, y: -200 });
  const hasMovedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isPressedRef = useRef(false);
  const cursorModeRef = useRef('default'); // 'default' | 'interactive'
  const rafId = useRef(null);

  // Detect desktop environment with fine pointer and hover support
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsDesktop(finePointer);
    };

    checkDevice();
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    mediaQuery.addEventListener('change', checkDevice);

    return () => {
      mediaQuery.removeEventListener('change', checkDevice);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dotEl = dotRef.current;
    const spotlightWrapEl = spotlightWrapRef.current;
    const spotlightEl = spotlightElRef.current;

    // 1. Mouse Movement Listener (instant dot update & target mouse tracking)
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Hide default cursor only after the first mouse move
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        document.body.classList.add('custom-cursor-active');
        if (spotlightWrapEl) spotlightWrapEl.classList.remove('is-hidden');
        if (dotEl) dotEl.classList.remove('is-hidden');
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (spotlightWrapEl) spotlightWrapEl.classList.remove('is-hidden');
        if (dotEl) dotEl.classList.remove('is-hidden');
      }

      // Update 8px dot position instantly using translate3d (centered with 4px offset)
      if (dotEl) {
        dotEl.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }

      // If user prefers reduced motion, snap spotlight instantly without easing delay
      if (prefersReducedMotion) {
        spotlightPos.current.x = e.clientX;
        spotlightPos.current.y = e.clientY;
        if (spotlightWrapEl) {
          spotlightWrapEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      }
    };

    // 2. Window Boundary Listeners (hide when leaving, show when entering)
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (spotlightWrapEl) spotlightWrapEl.classList.add('is-hidden');
      if (dotEl) dotEl.classList.add('is-hidden');
    };

    const handleMouseEnter = () => {
      if (hasMovedRef.current) {
        isVisibleRef.current = true;
        if (spotlightWrapEl) spotlightWrapEl.classList.remove('is-hidden');
        if (dotEl) dotEl.classList.remove('is-hidden');
      }
    };

    // 3. Mouse Down / Up Listeners (held-down scale feedback)
    const handleMouseDown = () => {
      isPressedRef.current = true;
      if (spotlightEl) spotlightEl.classList.add('is-pressed');
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
      if (spotlightEl) spotlightEl.classList.remove('is-pressed');
    };

    // 4. Single Event Delegation Listener on Document
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Check for interactive links, buttons, and cards
      const interactiveEl = target.closest(
        'a, button, [role="button"], [data-hover], input[type="submit"], input[type="button"], .cursor-pointer, .project-card, [class*="project-card" i]'
      );

      if (interactiveEl) {
        cursorModeRef.current = 'interactive';

        if (spotlightEl) {
          spotlightEl.className = `custom-cursor-spotlight mode-interactive ${
            isPressedRef.current ? 'is-pressed' : ''
          } ${!isVisibleRef.current ? 'is-hidden' : ''}`;
        }
        if (dotEl && isVisibleRef.current) {
          dotEl.classList.remove('is-hidden');
        }
        return;
      }

      // Default State (190px soft spotlight)
      cursorModeRef.current = 'default';

      if (spotlightEl) {
        spotlightEl.className = `custom-cursor-spotlight mode-default ${
          isPressedRef.current ? 'is-pressed' : ''
        } ${!isVisibleRef.current ? 'is-hidden' : ''}`;
      }
      if (dotEl && isVisibleRef.current) {
        dotEl.classList.remove('is-hidden');
      }
    };

    // 5. High-Performance rAF Interpolation Loop for Spotlight (lerp factor 0.15)
    const tick = () => {
      if (!prefersReducedMotion && isVisibleRef.current) {
        // Smooth lerp: current + (target - current) * 0.15
        spotlightPos.current.x += (mousePos.current.x - spotlightPos.current.x) * 0.15;
        spotlightPos.current.y += (mousePos.current.y - spotlightPos.current.y) * 0.15;

        if (spotlightWrapEl) {
          spotlightWrapEl.style.transform = `translate3d(${spotlightPos.current.x.toFixed(2)}px, ${spotlightPos.current.y.toFixed(2)}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);

      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isDesktop, prefersReducedMotion]);

  if (!isDesktop) return null;

  return (
    <div className="custom-cursor-root" aria-hidden="true">
      {/* 1. Small 8px Dot (instant follow) */}
      <div ref={dotRef} className="custom-cursor-dot is-hidden" />

      {/* 2. Soft Spotlight (smooth 0.15 lerp follow) */}
      <div ref={spotlightWrapRef} className="custom-cursor-spotlight-wrap is-hidden">
        <div ref={spotlightElRef} className="custom-cursor-spotlight mode-default" />
      </div>
    </div>
  );
}
