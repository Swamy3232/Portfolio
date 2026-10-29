import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import './SkillsSphere.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SPHERE_CONFIG, computeFibonacciPoints } from './sphereConfig';

/**
 * SkillsSphere Component
 * Interactive 3D tech-stack sphere built with React, CSS 3D transforms,
 * requestAnimationFrame, and hardware-accelerated transforms for 60/120fps performance.
 * Features a modern glass orb, glowing core, faint wireframe with orbit rings,
 * glassmorphism skill chips, and dynamic 3-tier depth cues.
 */
export default function SkillsSphere({ className = '', isActive = true }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const itemRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  // Active hover/focus index (-1 if none)
  const [activeHoverIndex, setActiveHoverIndex] = useState(-1);
  const activeHoverRef = useRef(-1);

  // Synchronize ref with state to read inside RAF without re-binding
  useEffect(() => {
    activeHoverRef.current = activeHoverIndex;
  }, [activeHoverIndex]);

  // Fibonacci coordinates for each skill
  const initialPoints = useMemo(() => computeFibonacciPoints(SPHERE_CONFIG.skills.length), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // -------------------------------------------------------------
    // Animation & Physics State (stored in local variables for RAF)
    // -------------------------------------------------------------
    let animationFrameId = null;
    let isVisible = true;
    let isIntersecting = true;
    let containerWidth = container.clientWidth || 400;
    let containerHeight = container.clientHeight || 400;

    // Sphere rotation angles
    let rotY = 0.35; // Initial Y angle
    let rotX = 0.14; // Slight downward pitch for top-three-quarters dimensional view

    // Angular velocities
    let vy = SPHERE_CONFIG.rotationSpeed;
    let vx = 0;

    // Pointer drag tracking
    let isDragging = false;
    let hasMoved = false; // Bug fix: properly declared state variable
    let lastPointerX = 0;
    let lastPointerY = 0;

    // Cursor tilt
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Entrance animation tracking (start immediately so chips render right away without top-left flash)
    let entranceStartTime = performance.now();
    let entranceCompleted = prefersReducedMotion;

    // Timestamp for frame-rate independence
    let lastTime = performance.now();

    // -------------------------------------------------------------
    // Dimension Calculator (guarantees perfect concentric alignment)
    // -------------------------------------------------------------
    const updateDimensions = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const side = Math.max(280, Math.min(440, rect.width || container.clientWidth || 400));
      containerWidth = side;
      containerHeight = side;
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);
    updateDimensions();

    // -------------------------------------------------------------
    // Main 60/120fps Animation Loop
    // -------------------------------------------------------------
    const tick = (now) => {
      if (!isVisible || !isIntersecting || !isActive) {
        return; // Pause execution when offscreen, backgrounded, or section is inactive
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const dtNorm = dt / 0.01667; // Normalized to 60fps unit

      // Calculate responsive radius based on container size
      // Desktop: ~180-190px (360-380px sphere), Mobile: ~120px (240px sphere)
      const side = Math.min(containerWidth, containerHeight);
      const currentRadius = Math.min(
        SPHERE_CONFIG.radius,
        Math.max(118, side * 0.42)
      );

      const cx = side / 2;
      const cy = side / 2;

      // Handle Entrance Animation
      let entranceProgress = 1.0;
      if (!entranceCompleted && entranceStartTime !== null) {
        const elapsed = now - entranceStartTime;
        entranceProgress = Math.min(1.0, elapsed / SPHERE_CONFIG.entranceDuration);
        if (entranceProgress >= 1.0) {
          entranceCompleted = true;
        }
      }

      // Cursor tilt interpolation (smooth lerp toward mouse)
      if (!prefersReducedMotion) {
        currentTiltX += (targetTiltX - currentTiltX) * 0.08 * dtNorm;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08 * dtNorm;
      } else {
        currentTiltX = 0;
        currentTiltY = 0;
      }

      // Physics and Rotation Update
      if (!prefersReducedMotion) {
        const hoveredIdx = activeHoverRef.current;

        if (isDragging) {
          // Dragging overrides auto-rotation
        } else if (hoveredIdx !== -1) {
          // Hovering slows/pauses rotation smoothly
          vy *= Math.pow(0.85, dtNorm);
          vx *= Math.pow(0.85, dtNorm);
        } else {
          // Apply drag inertia decay
          if (Math.abs(vx) > 0.0001 || Math.abs(vy - SPHERE_CONFIG.rotationSpeed) > 0.0001) {
            vx *= Math.pow(SPHERE_CONFIG.dragInertia, dtNorm);
            vy = vy * Math.pow(SPHERE_CONFIG.dragInertia, dtNorm) +
                 SPHERE_CONFIG.rotationSpeed * (1 - Math.pow(SPHERE_CONFIG.dragInertia, dtNorm));
          } else {
            vx = 0;
            vy = SPHERE_CONFIG.rotationSpeed;
          }

          rotX += vx * dtNorm;
          rotY += vy * dtNorm;
        }

        // Clamp rotX to prevent disorientation (between -55 deg and +55 deg)
        rotX = Math.max(-0.95, Math.min(0.95, rotX));
      }

      // Effective composite rotation angles including cursor tilt
      const effRotY = rotY + currentTiltY;
      const effRotX = rotX + currentTiltX;

      const cosY = Math.cos(effRotY);
      const sinY = Math.sin(effRotY);
      const cosX = Math.cos(effRotX);
      const sinX = Math.sin(effRotX);

      const count = initialPoints.length;
      const hoveredIdx = activeHoverRef.current;

      // -----------------------------------------------------------
      // Update each skill item's 3D transform directly in the DOM
      // -----------------------------------------------------------
      for (let i = 0; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const p = initialPoints[i];

        // 1. Rotation around Y-axis
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y;

        // 2. Rotation around X-axis
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        // Depth factor d in [0, 1] (0 = furthest back, 1 = nearest front)
        const d = (z2 + 1) / 2;

        // Staggered entrance factor per item
        let itemEntrance = 1.0;
        if (!entranceCompleted && entranceStartTime !== null) {
          const itemDelay = (i / count) * 220; // 0-220ms stagger
          const itemElapsed = Math.max(0, (now - entranceStartTime) - itemDelay);
          const rawT = Math.min(1.0, itemElapsed / (SPHERE_CONFIG.entranceDuration - 220));
          // Cubic ease-out
          itemEntrance = 1 - Math.pow(1 - rawT, 3);
        }

        // Projected 2D screen coordinates
        const px = cx + x2 * currentRadius * itemEntrance;
        const py = cy + y2 * currentRadius * itemEntrance;

        // Depth scale
        const baseScale = SPHERE_CONFIG.depthScaleRange[0] +
          d * (SPHERE_CONFIG.depthScaleRange[1] - SPHERE_CONFIG.depthScaleRange[0]);

        const isThisHovered = hoveredIdx === i;
        const finalScale = isThisHovered ? baseScale * SPHERE_CONFIG.hoverScale : baseScale;

        // Depth-mapped opacity: front is crisp, back is muted
        let opacity = 0.38 + d * 0.62;
        if (hoveredIdx !== -1 && !isThisHovered) {
          opacity *= 0.35; // Dim unhovered items for focus
        }
        opacity *= itemEntrance;

        // Stacking order: front items and hovered item on top
        const zIndex = isThisHovered ? 350 : Math.round(d * 100) + 10;

        // Direct hardware-accelerated style update (no CSS transitions on transform or opacity)
        el.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) translate(-50%, -50%) scale(${finalScale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = zIndex;

        // 3 Depth levels: front (d > 0.62), mid (0.38 <= d <= 0.62), back (d < 0.38)
        const depthAttr = d > 0.62 ? 'front' : d > 0.38 ? 'mid' : 'back';
        if (el.getAttribute('data-depth') !== depthAttr) {
          el.setAttribute('data-depth', depthAttr);
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // -------------------------------------------------------------
    // Pointer Drag & Tilt Event Listeners
    // -------------------------------------------------------------
    const stage = stageRef.current;
    if (!stage) return;

    const handlePointerDown = (e) => {
      if (prefersReducedMotion) return;
      isDragging = true;
      hasMoved = false; // Bug fix: previously undeclared variable
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for browsers that don't support pointer capture
      }
    };

    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;

      const rect = stage.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Cursor tilt target
      targetTiltY = Math.max(-1, Math.min(1, normX)) * SPHERE_CONFIG.tiltStrength;
      targetTiltX = -Math.max(-1, Math.min(1, normY)) * SPHERE_CONFIG.tiltStrength;

      if (!isDragging) return;

      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;

      if (Math.hypot(deltaX, deltaY) > 3) {
        hasMoved = true;
      }

      // Convert pixel delta into angular displacement
      const sensitivity = 0.0055;
      rotY += deltaX * sensitivity;
      rotX -= deltaY * sensitivity;

      // Update instantaneous drag velocity for inertia release
      vy = deltaX * sensitivity;
      vx = -deltaY * sensitivity;

      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        // Safe release fallback
      }
    };

    const handlePointerLeave = () => {
      // Reset tilt when cursor leaves the sphere
      targetTiltX = 0;
      targetTiltY = 0;
    };

    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('pointercancel', handlePointerUp);
    stage.addEventListener('pointerleave', handlePointerLeave);

    // -------------------------------------------------------------
    // Page Visibility & Viewport Intersection Management
    // -------------------------------------------------------------
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting) {
        lastTime = performance.now();
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(tick);
        }
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          if (entranceStartTime === null) {
            entranceStartTime = performance.now();
          }
          lastTime = performance.now();
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(tick);
          }
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // Initial trigger: render synchronously right now so items are positioned immediately before paint
    tick(performance.now());

    // -------------------------------------------------------------
    // Cleanup on unmount or hot-reload
    // -------------------------------------------------------------
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stage.removeEventListener('pointerdown', handlePointerDown);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerup', handlePointerUp);
      stage.removeEventListener('pointercancel', handlePointerUp);
      stage.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [initialPoints, prefersReducedMotion, isActive]);

  // Skill hover and keyboard focus handlers
  const handleItemHover = useCallback((idx) => {
    setActiveHoverIndex(idx);
  }, []);

  const handleItemLeave = useCallback(() => {
    setActiveHoverIndex(-1);
  }, []);

  return (
    <div className={`skills-sphere-wrapper ${className}`}>
      {/* Visual Interactive 3D Sphere (marked aria-hidden for clean assistive technology) */}
      <div
        ref={containerRef}
        className="skills-sphere-container"
        aria-hidden="true"
        data-has-active={activeHoverIndex !== -1 ? 'true' : 'false'}
      >
        {/* 3D Wireframe & Intersecting Orbital Rings with Glowing Nodes (Completely Transparent) */}
        {SPHERE_CONFIG.enableWireframe && (
          <div className="skills-sphere-wireframe-wrap">
            <svg
              className="skills-sphere-wireframe"
              viewBox="0 0 440 440"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#7c5cff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Faint Outer Boundary */}
              <circle cx="220" cy="220" r="185" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" strokeDasharray="3 4" />

              {/* Intersecting Orbit Rings tilted in 3D Space */}
              <ellipse cx="220" cy="220" rx="192" ry="62" fill="none" stroke="url(#orbitGrad1)" strokeWidth="1.2" transform="rotate(-22 220 220)" />
              <ellipse cx="220" cy="220" rx="188" ry="70" fill="none" stroke="url(#orbitGrad2)" strokeWidth="1.1" transform="rotate(38 220 220)" />
              <ellipse cx="220" cy="220" rx="184" ry="54" fill="none" stroke="rgba(34, 211, 238, 0.35)" strokeWidth="1" transform="rotate(-62 220 220)" />
              <ellipse cx="220" cy="220" rx="186" ry="76" fill="none" stroke="rgba(124, 92, 255, 0.3)" strokeWidth="1" transform="rotate(78 220 220)" />
              <ellipse cx="220" cy="220" rx="190" ry="46" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" />

              {/* Glowing Orbit Intersection Nodes */}
              <circle cx="95" cy="140" r="3" fill="#22d3ee" className="orbit-node-glow" />
              <circle cx="340" cy="155" r="2.5" fill="#22d3ee" />
              <circle cx="160" cy="360" r="2.5" fill="#7c5cff" />
              <circle cx="280" cy="355" r="3" fill="#22d3ee" className="orbit-node-glow" />
              <circle cx="220" cy="35" r="2.5" fill="#22d3ee" />
              <circle cx="48" cy="260" r="2" fill="#7c5cff" />
              <circle cx="392" cy="235" r="2.5" fill="#22d3ee" />
            </svg>
          </div>
        )}

        {/* Central Core Emblem with Glowing White Code Brackets </> */}
        {SPHERE_CONFIG.enableCenterLabel && (
          <div className="skills-sphere-center-emblem" aria-hidden="true">
            <div className="skills-sphere-center-aura" />
            <div className="skills-sphere-center-ring" />
            <div className="skills-sphere-center-plate">
              <span className="skills-sphere-center-brackets">&lt;/&gt;</span>
            </div>
          </div>
        )}

        {/* Hologram Pedestal Rings at bottom floor */}
        <div className="skills-sphere-pedestal" aria-hidden="true">
          <div className="pedestal-flare" />
          <div className="pedestal-ring pedestal-ring-outer" />
          <div className="pedestal-ring pedestal-ring-inner" />
        </div>

        {/* 3D Skills Stage hosting Circular Branded Skill Discs */}
        <div ref={stageRef} className="skills-sphere-stage">
          {SPHERE_CONFIG.skills.map((skill, index) => (
            <div
              key={skill.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="skills-sphere-item"
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={handleItemLeave}
              onFocus={() => handleItemHover(index)}
              onBlur={handleItemLeave}
              tabIndex={0}
              role="button"
              aria-label={skill.name}
            >
              <div className="skills-sphere-disc-surface">
                <SkillIcon id={skill.id} />
              </div>
              
              {/* Floating Tooltip */}
              <div className="skills-sphere-tooltip">
                <span className="skills-sphere-tooltip-title">{skill.name}</span>
                <span className="skills-sphere-tooltip-cat">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen-reader friendly semantic skill catalog outside aria-hidden container */}
      <div className="sr-only">
        <h3>Core Technical Skills & Stack</h3>
        <p>Interactive 3D representation of verified developer skills:</p>
        <ul>
          {SPHERE_CONFIG.skills.map((skill) => (
            <li key={skill.id}>{skill.name} ({skill.category})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * High-fidelity, authentic SVG brand logos for technical skills
 */
function SkillIcon({ id }) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-7 h-7" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'typescript':
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="32" height="32" rx="4" fill="#3178C6" />
          <text x="16" y="21" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="-0.5">TS</text>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5 rounded-[4px] overflow-hidden">
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <text x="16" y="21" textAnchor="middle" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="-0.5">JS</text>
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 110 110" className="w-6 h-6">
          <path fill="#387EB8" d="M54.2 2c-13.6 0-23.7 2.1-23.7 11.8v8.6h24.4v3.5H23.5C9.7 25.9 0 35.8 0 49.7c0 14.1 8.5 22.8 22.8 22.8h7.2v-10.7c0-12.7 10.7-23.3 23.5-23.3h24.3v-11C77.8 13.9 67.9 2 54.2 2zm-12.3 7.3a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6z"/>
          <path fill="#FFE873" d="M55.8 108c13.6 0 23.7-2.1 23.7-11.8v-8.6H55.1v-3.5h31.4c13.8 0 23.5-9.9 23.5-23.8 0-14.1-8.5-22.8-22.8-22.8h-7.2v10.7c0 12.7-10.7 23.3-23.5 23.3H32.2v11c0 13.6 9.9 25.5 23.6 25.5zm12.3-7.3a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z"/>
        </svg>
      );
    case 'fastapi':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#05998B] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
              <path d="M13 2L3 14h8l-1 8 11-12h-8l1-8z" />
            </svg>
          </div>
          <span className="text-[7.5px] font-mono font-bold text-white tracking-tight leading-none mt-0.5">FastAPI</span>
        </div>
      );
    case 'postgresql':
      return (
        <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
          <path d="M32 4C16.5 4 4 16.5 4 32c0 6.5 2.2 12.5 6 17.3l4-4.2C11.2 41.2 9.6 36.8 9.6 32c0-12.4 10-22.4 22.4-22.4 12.4 0 22.4 10 22.4 22.4 0 5-1.7 9.7-4.5 13.5l3.8 4C57.6 44.8 60 38.7 60 32 60 16.5 47.5 4 32 4z" fill="#336791" />
          <path d="M39 21c-2.2-1.8-5-2.8-8-2.7-4.4.2-8 3.2-9.1 7.5-.6 2.1-.4 4.3.4 6.2.8 1.8 2 3.2 3.7 4.2 1 .6 2.2 1 3.5 1.2v8.7c0 2 1.7 3.7 3.7 3.7h.9c2 0 3.7-1.7 3.7-3.7V37.8c2.3-1.3 4-3.4 4.9-5.9.9-2.7.6-5.6-.8-8-1-1.1-1.9-2-2.9-2.9zm-2.7 12.6c-.9 1.1-2.2 1.8-3.7 1.9-2 .1-3.7-.8-4.7-2.4-.7-1.2-.9-2.7-.6-4.1.5-2 2.1-3.4 4.1-3.6 1.9-.2 3.7.7 4.7 2.3.9 1.3 1 3 .2 4.5v1.4z" fill="#336791" />
          <circle cx="29" cy="27" r="1.5" fill="#FFFFFF" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m21.758.337c-.368-.242-.992-.354-1.85-.354-.258 0-.528.01-.806.03-.435-.904-1.127-1.638-2.03-2.116-.277-.147-.577-.266-.893-.354l-.454-.127-.27.397c-.822 1.205-1.22 2.656-1.15 4.195.04.887.23 1.745.565 2.548-.564.218-1.168.33-1.802.33H2.036c-.452 0-.82.368-.82.82 0 4.97 3.655 9.07 8.356 9.588 1.488.163 2.996.163 4.484 0 3.73-.41 6.883-2.97 8.01-6.495.912-.137 1.838-.456 2.695-.972.485-.292.836-.687 1.042-1.173.208-.488.204-1.047-.01-1.57" />
        </svg>
      );
    case 'nodejs':
      return (
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-5 h-5">
            <path fill="#5FA04E" d="M16 2l12 7v14l-12 7-12-7V9l12-7z" opacity="0.3" />
            <path stroke="#5FA04E" strokeWidth="1.8" fill="none" d="M16 2l12 7v14l-12 7-12-7V9l12-7z" />
            <text x="16" y="19" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="9">node</text>
          </svg>
        </div>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <g transform="rotate(45 12 12)">
            <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#F05032" />
            <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
            <circle cx="8" cy="16" r="2" fill="#FFFFFF" />
            <circle cx="16" cy="12" r="2" fill="#FFFFFF" />
            <path d="M8 8v8M8 12c2.5 0 5-.5 8-0" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case 'cicd':
      return (
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 28 28" className="w-4.5 h-4.5" fill="none">
            <circle cx="14" cy="14" r="11" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8"/>
            <circle cx="14" cy="14" r="7" stroke="#22d3ee" strokeWidth="1.5"/>
            <circle cx="14" cy="14" r="3" fill="#FFFFFF"/>
          </svg>
          <span className="text-[7.5px] font-mono font-bold text-white tracking-tight leading-none mt-0.5">CI/CD</span>
        </div>
      );
    case 'linux':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6">
          <ellipse cx="50" cy="56" rx="26" ry="32" fill="#222222" />
          <ellipse cx="50" cy="62" rx="17" ry="22" fill="#FFFFFF" />
          <ellipse cx="50" cy="30" rx="18" ry="19" fill="#222222" />
          <ellipse cx="44" cy="27" rx="4" ry="6" fill="#FFFFFF" />
          <ellipse cx="56" cy="27" rx="4" ry="6" fill="#FFFFFF" />
          <circle cx="45" cy="27" r="2" fill="#000000" />
          <circle cx="55" cy="27" r="2" fill="#000000" />
          <polygon points="43,32 57,32 50,42" fill="#FFA500" />
          <ellipse cx="36" cy="86" rx="12" ry="5" fill="#FFA500" />
          <ellipse cx="64" cy="86" rx="12" ry="5" fill="#FFA500" />
          <ellipse cx="23" cy="58" rx="6" ry="16" fill="#222222" transform="rotate(15 23 58)" />
          <ellipse cx="77" cy="58" rx="6" ry="16" fill="#222222" transform="rotate(-15 77 58)" />
        </svg>
      );
    case 'websockets':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
          <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
          <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
          <circle cx="12" cy="12" r="2" fill="#22d3ee" />
          <path d="M7.76 16.24a6 6 0 0 0 8.48 0" />
          <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
        </svg>
      );
    case 'restapi':
      return (
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="7" rx="2"/>
            <rect x="2" y="14" width="20" height="7" rx="2"/>
            <circle cx="6" cy="6.5" r="1" fill="#a855f7"/>
            <circle cx="6" cy="17.5" r="1" fill="#a855f7"/>
          </svg>
          <span className="text-[7.5px] font-mono font-bold text-[#a855f7] tracking-tight leading-none mt-0.5">REST</span>
        </div>
      );
    default:
      return null;
  }
}
