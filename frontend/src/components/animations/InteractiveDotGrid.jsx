import React, { useEffect, useRef, useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DOT_GRID_CONFIG } from '../../constants/motion';

/**
 * Helper to resolve CSS variables from the DOM to actual computed color strings
 */
function resolveColor(varOrColor, element, fallback) {
  if (!varOrColor) return fallback;
  if (!varOrColor.startsWith('var(')) return varOrColor;
  const match = varOrColor.match(/var\(([^)]+)\)/);
  if (!match) return fallback;
  const varName = match[1].trim();
  const computed = getComputedStyle(element || document.documentElement).getPropertyValue(varName).trim();
  return computed || fallback;
}

/**
 * InteractiveDotGrid Component
 * High-performance 2D canvas background with spring physics, cursor interaction
 * modes (attract, repel, distort), click ripples, and theme integration.
 */
export default function InteractiveDotGrid({
  config = {},
  className = '',
  isFullPage = false,
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Merge custom config with defaults
  const settings = useMemo(() => ({
    ...DOT_GRID_CONFIG,
    ...config,
  }), [config]);

  // Stable reference to latest settings so rAF loop always has current values
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isRunning = false;
    let isVisible = true;
    let isIntersecting = true;
    let dots = [];
    let ripples = [];
    let width = 0;
    let height = 0;
    let lastTime = performance.now();

    // Track pointer state (in canvas-local CSS coordinates)
    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      isTouch: false,
    };

    // Cached theme colors - Strictly monochrome
    const colors = {
      base: 'rgba(10, 10, 10, 0.15)',
      glow: 'rgba(10, 10, 10, 0.25)',
      accent: '#0A0A0A',
    };

    // Update resolved colors from CSS variables
    const updateThemeColors = () => {
      const targetEl = container || document.documentElement;
      const isDark = document.documentElement.classList.contains('dark');
      colors.base = resolveColor(settingsRef.current.baseColor, targetEl, isDark ? 'rgba(250, 250, 250, 0.15)' : 'rgba(10, 10, 10, 0.15)');
      colors.glow = resolveColor(settingsRef.current.glowColor, targetEl, isDark ? 'rgba(250, 250, 250, 0.25)' : 'rgba(10, 10, 10, 0.25)');
      colors.accent = resolveColor(settingsRef.current.accentColor, targetEl, isDark ? '#FAFAFA' : '#0A0A0A');
      
      // Wake up loop to draw with new colors
      wakeUp();
    };

    // Observer for theme changes via .dark or data-theme on html element
    const themeObserver = new MutationObserver(() => {
      updateThemeColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    // Generate grid dots based on current dimensions
    const buildGrid = (w, h) => {
      const spacing = settingsRef.current.spacing;
      const cols = Math.floor(w / spacing);
      const rows = Math.floor(h / spacing);
      const offsetX = (w - (cols - 1) * spacing) / 2;
      const offsetY = (h - (rows - 1) * spacing) / 2;

      const newDots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = offsetX + c * spacing;
          const y0 = offsetY + r * spacing;
          newDots.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
          });
        }
      }
      dots = newDots;
    };

    // Resize canvas with devicePixelRatio for Retina crispness
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = Math.max(1, Math.floor(rect.width));
      const newHeight = Math.max(1, Math.floor(rect.height));

      if (newWidth === width && newHeight === height) return;

      width = newWidth;
      height = newHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);

      buildGrid(width, height);
      updateThemeColors();

      // If reduced motion, draw once and don't animate
      if (prefersReducedMotion) {
        drawStatic();
      } else {
        wakeUp();
      }
    };

    // Static render for reduced-motion users
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colors.base;
      ctx.beginPath();
      const radius = settingsRef.current.dotRadius;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.moveTo(dot.x0 + radius, dot.y0);
        ctx.arc(dot.x0, dot.y0, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    // Start / wake up the animation loop
    const wakeUp = () => {
      if (prefersReducedMotion) {
        drawStatic();
        return;
      }
      if (!isRunning && isVisible && isIntersecting) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Main animation and physics loop
    const render = (currentTime) => {
      if (!isRunning) return;

      // Calculate delta time in seconds, clamped to avoid physics explosion
      const rawDelta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      const dt = Math.min(Math.max(rawDelta, 0.001), 0.033);

      const cfg = settingsRef.current;
      const influenceRadius = cfg.influenceRadius;
      const maxDisplacement = cfg.maxDisplacement;
      const mode = cfg.mode;
      const stiffness = cfg.stiffness;
      const damping = cfg.damping;
      const strength = cfg.strength;
      const dotRadius = cfg.dotRadius;

      // Update ripples
      if (ripples.length > 0) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.radius += rip.speed * dt;
          rip.life = 1 - rip.radius / rip.maxRadius;
          if (rip.life <= 0) {
            ripples.splice(i, 1);
          }
        }
      }

      let hasActiveMotion = ripples.length > 0 || pointer.active;
      const activeDots = []; // Dots with interaction or glow
      const baseBatch = [];  // Dots in resting state

      // Ambient wave calculation for touch/mobile
      const useAmbient = pointer.isTouch && cfg.ambientWaveOnTouch;
      const ambientTime = currentTime * 0.0015;

      // 1. Physics update & spatial partition
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetX = dot.x0;
        let targetY = dot.y0;
        let falloff = 0;
        let distance = 9999;

        // Pointer influence
        if (pointer.active) {
          const dx = pointer.x - dot.x0;
          const dy = pointer.y - dot.y0;
          distance = Math.hypot(dx, dy);

          if (distance < influenceRadius) {
            const normalizedDist = distance / influenceRadius;
            falloff = Math.pow(Math.max(0, 1 - normalizedDist), 2);

            const safeDist = Math.max(distance, 1.0);
            const dirX = dx / safeDist;
            const dirY = dy / safeDist;

            if (mode === 'attract') {
              // Mode A: Attract towards cursor
              const force = Math.min(falloff * strength, maxDisplacement);
              targetX = dot.x0 + dirX * force;
              targetY = dot.y0 + dirY * force;
            } else if (mode === 'repel') {
              // Mode B: Repel away from cursor
              const force = Math.min(falloff * strength, maxDisplacement);
              targetX = dot.x0 - dirX * force;
              targetY = dot.y0 - dirY * force;
            } else {
              // Mode C: Distort (Default: subtle directional shift + visual reaction)
              const force = Math.min(falloff * strength * 0.35, maxDisplacement * 0.4);
              targetX = dot.x0 + dirX * force;
              targetY = dot.y0 + dirY * force;
            }
          }
        }

        // Ripple influence
        if (ripples.length > 0) {
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rDx = dot.x0 - rip.x;
            const rDy = dot.y0 - rip.y;
            const rDist = Math.hypot(rDx, rDy);
            const distFromWave = Math.abs(rDist - rip.radius);
            const waveWidth = 35;

            if (distFromWave < waveWidth) {
              const waveFalloff = Math.cos((distFromWave / waveWidth) * (Math.PI / 2)) * rip.life;
              const push = waveFalloff * rip.amplitude;
              const safeRDist = Math.max(rDist, 1.0);
              targetX += (rDx / safeRDist) * push;
              targetY += (rDy / safeRDist) * push;
            }
          }
        }

        // Ambient wave on touch
        if (useAmbient) {
          const wave = Math.sin(ambientTime + dot.y0 * 0.02) * 2;
          targetY += wave;
        }

        // Spring integration: acceleration = -stiffness * (pos - target) - damping * velocity
        const ax = -stiffness * (dot.x - targetX) - damping * dot.vx;
        const ay = -stiffness * (dot.y - targetY) - damping * dot.vy;

        dot.vx += ax * dt;
        dot.vy += ay * dt;

        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        // Settling threshold to avoid micro-jitter
        const dispX = dot.x - dot.x0;
        const dispY = dot.y - dot.y0;
        if (
          !pointer.active &&
          ripples.length === 0 &&
          Math.abs(dispX) < 0.05 &&
          Math.abs(dispY) < 0.05 &&
          Math.abs(dot.vx) < 0.05 &&
          Math.abs(dot.vy) < 0.05
        ) {
          dot.x = dot.x0;
          dot.y = dot.y0;
          dot.vx = 0;
          dot.vy = 0;
        } else {
          hasActiveMotion = true;
        }

        // Segregate active/affected dots from base rest dots for batching
        if (falloff > 0.01) {
          activeDots.push({ dot, falloff });
        } else {
          baseBatch.push(dot);
        }
      }

      // 2. Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 3. Batch render resting dots with single path
      if (baseBatch.length > 0) {
        ctx.fillStyle = colors.base;
        ctx.beginPath();
        for (let i = 0; i < baseBatch.length; i++) {
          const b = baseBatch[i];
          ctx.moveTo(b.x + dotRadius, b.y);
          ctx.arc(b.x, b.y, dotRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 4. Render active dots with glow and accent colors
      if (activeDots.length > 0) {
        for (let i = 0; i < activeDots.length; i++) {
          const { dot, falloff } = activeDots[i];
          const dynamicRadius = dotRadius * (1 + falloff * 1.4);

          // Subtle glow ring around intensely influenced dots
          if (falloff > 0.35 && cfg.glowStrength > 0) {
            ctx.save();
            ctx.fillStyle = colors.glow;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dynamicRadius * 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Dot center with blended accent color
          ctx.save();
          ctx.fillStyle = falloff > 0.2 ? colors.accent : colors.base;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dynamicRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 5. Draw subtle ripple wavefront rings
      if (ripples.length > 0) {
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          ctx.save();
          ctx.strokeStyle = colors.glow;
          ctx.globalAlpha = Math.max(0, rip.life * 0.4);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Continue or settle loop
      if (hasActiveMotion) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    // Pointer Event Listeners
    const onPointerMove = (e) => {
      if (prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX == null || clientY == null) return;

      // Check if pointer is within container or slightly outside
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      const margin = settingsRef.current.influenceRadius;
      if (
        localX >= -margin &&
        localX <= rect.width + margin &&
        localY >= -margin &&
        localY <= rect.height + margin
      ) {
        pointer.x = localX;
        pointer.y = localY;
        pointer.active = true;
        pointer.isTouch = e.pointerType === 'touch' || Boolean(e.touches);
        wakeUp();
      } else if (pointer.active) {
        pointer.active = false;
        wakeUp();
      }
    };

    const onPointerLeave = () => {
      if (pointer.active) {
        pointer.active = false;
        wakeUp();
      }
    };

    // Click Ripple Handler
    const onPointerDown = (e) => {
      if (prefersReducedMotion || !settingsRef.current.enableClickRipple) return;

      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height) {
        // Limit active ripples to max 3
        if (ripples.length >= 3) ripples.shift();

        ripples.push({
          x: localX,
          y: localY,
          radius: 0,
          maxRadius: Math.min(rect.width, rect.height) * 0.45,
          speed: 380, // px/s
          amplitude: 18,
          life: 1.0,
        });

        wakeUp();
      }
    };

    // Window and document listeners
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    // Touch support
    if (settingsRef.current.enableTouchInteraction) {
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerLeave, { passive: true });
    }

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause loop when container is scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          wakeUp();
        } else if (isRunning) {
          isRunning = false;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Page Visibility API
    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        wakeUp();
      } else if (isRunning) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial setup
    handleResize();

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`${
        isFullPage ? 'fixed inset-0 pointer-events-none z-0' : 'absolute inset-0 pointer-events-none -z-10'
      } overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        maskImage: isFullPage ? 'none' : 'radial-gradient(ellipse 75% 65% at 50% 45%, black 40%, transparent 95%)',
        WebkitMaskImage: isFullPage ? 'none' : 'radial-gradient(ellipse 75% 65% at 50% 45%, black 40%, transparent 95%)',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
