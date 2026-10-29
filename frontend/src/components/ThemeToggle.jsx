import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { EASING_OUT } from '../constants/motion';

/**
 * ThemeToggle Component
 * Features View Transitions API circular reveal animation originating from the button coordinates,
 * with animated rotation & scale icons via Framer Motion, and graceful fade fallback.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = (event) => {
    // If View Transitions API is not supported or reduced-motion is requested, toggle immediately
    if (
      !document.startViewTransition ||
      prefersReducedMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-surface text-secondary hover:text-primary hover:border-text/40 hover:bg-surface-muted transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-text overflow-hidden ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">Toggle theme (currently {theme})</span>

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun-icon"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASING_OUT }}
            className="flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASING_OUT }}
            className="flex items-center justify-center"
          >
            <Moon className="w-5 h-5 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
