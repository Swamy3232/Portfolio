import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING_OUT } from '../../constants/motion';

/**
 * PageIntro Component
 * Renders an animated SVG initials logo stroke draw, followed by an elegant curtain reveal.
 * Respects prefers-reduced-motion and sessionStorage to run once per browsing session.
 */
export default function PageIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('portfolio-intro-seen');
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('portfolio-intro-seen', 'true');
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [showIntro, prefersReducedMotion]);

  if (prefersReducedMotion || !showIntro) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="curtain-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: EASING_OUT }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg select-none pointer-events-auto"
          aria-hidden="true"
        >
          {/* SVG Logo with Animated Stroke Drawing - Strictly Monochrome */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <svg
              width="96"
              height="96"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 sm:w-24 sm:h-24"
            >
              {/* Outer Hex / Rounded Square Frame */}
              <motion.rect
                x="8"
                y="8"
                width="84"
                height="84"
                rx="20"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASING_OUT }}
              />

              {/* Letter 'S' Path */}
              <motion.path
                d="M44 36 C44 30 32 30 32 38 C32 46 44 46 44 54 C44 62 32 62 32 56"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASING_OUT }}
              />

              {/* Letter 'R' Path */}
              <motion.path
                d="M56 62 V38 H64 C70 38 70 48 64 48 H56 M62 48 L70 62"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASING_OUT }}
              />
            </svg>

            {/* Subtitle Fade In */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4, ease: EASING_OUT }}
              className="flex items-center gap-2 font-heading text-xs tracking-widest uppercase text-muted font-semibold"
            >
              <span>Swamy R</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Portfolio</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
