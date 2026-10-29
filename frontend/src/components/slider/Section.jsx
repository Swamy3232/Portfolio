import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Stagger Container Animation Variants
 * Coordinates children to rise 24px with fade, 80-120ms apart.
 */
export const sectionStaggerContainer = {
  hidden: { opacity: 0 },
  visible: (prefersReducedMotion) => ({
    opacity: 1,
    transition: prefersReducedMotion
      ? { duration: 0.2 }
      : {
          staggerChildren: 0.1, // 100ms apart (within 80-120ms range)
          delayChildren: 0.12
        }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

/**
 * Stagger Item Animation Variants
 * Rises 24px with fade using cubic-bezier(0.22, 1, 0.36, 1)
 */
export const sectionStaggerItem = {
  hidden: (prefersReducedMotion) => ({
    opacity: 0,
    y: prefersReducedMotion ? 0 : 24
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * SectionItem Component
 * Animatable child unit inside a Section (for headings, paragraphs, cards, buttons)
 */
export function SectionItem({ children, className = '', as: Component = 'div', ...props }) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      custom={prefersReducedMotion}
      variants={sectionStaggerItem}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Section Component
 * Full-viewport 100dvh slide container with internal scrolling, accessibility focus,
 * and staggered child animations.
 */
export default function Section({
  id,
  title,
  ariaLabel,
  isActive = false,
  scrollRef,
  className = '',
  contentClassName = '',
  children,
  headerSpacing = true
}) {
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  // Reset scroll to top and focus management when section becomes active
  useEffect(() => {
    if (isActive) {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      const timer = setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.focus({ preventScroll: true });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <section
      id={id}
      aria-label={ariaLabel || title}
      className={`fullpage-section ${className}`}
      data-active={isActive ? 'true' : 'false'}
    >
      {/* Presentation viewport allowing safe top clearance below navbar */}
      <div
        ref={(el) => {
          containerRef.current = el;
          if (typeof scrollRef === 'function') {
            scrollRef(el);
          } else if (scrollRef) {
            scrollRef.current = el;
          }
        }}
        className={`fullpage-section-scroll ${headerSpacing ? 'pt-6 sm:pt-7 pb-4 sm:pb-5' : 'py-3 sm:py-4'} ${contentClassName}`}
        tabIndex={-1}
      >
        <motion.div
          custom={prefersReducedMotion}
          variants={sectionStaggerContainer}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full flex flex-col"
        >
          {typeof children === 'function' ? children({ isActive }) : children}
        </motion.div>
      </div>
    </section>
  );
}
