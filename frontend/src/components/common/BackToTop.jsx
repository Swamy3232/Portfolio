import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING_OUT } from '../../constants/motion';

/**
 * BackToTop Component
 * Fades and scales in smoothly after 400px scroll threshold.
 * Respects prefers-reduced-motion for scroll behavior and entrance animations.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 380);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: EASING_OUT }}
          aria-label="Scroll back to top of page"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-surface/90 hover:bg-surface-elevated text-primary border border-border shadow-md hover:border-accent/40 hover:shadow-lg transition-colors duration-200 backdrop-blur-md cursor-pointer group focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowUp className="w-4 h-4 text-secondary group-hover:text-accent group-hover:-translate-y-0.5 transition-all duration-200" />
          <span className="sr-only">Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
