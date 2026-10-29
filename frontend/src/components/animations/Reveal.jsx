import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING_OUT, REVEAL_DISTANCE } from '../../constants/motion';

const variantsMap = {
  'fade-up': {
    hidden: { opacity: 0, y: REVEAL_DISTANCE },
    visible: { opacity: 1, y: 0 }
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'fade-left': {
    hidden: { opacity: 0, x: -REVEAL_DISTANCE },
    visible: { opacity: 1, x: 0 }
  },
  'fade-right': {
    hidden: { opacity: 0, x: REVEAL_DISTANCE },
    visible: { opacity: 1, x: 0 }
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

/**
 * Reveal Component
 * Reusable scroll-triggered viewport reveal with configurable directions, delays, and staggering.
 * Gracefully degrades to immediate visibility when reduced motion is preferred.
 */
export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const selectedVariant = variantsMap[variant] || variantsMap['fade-up'];

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: EASING_OUT
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealGroup Component
 * Staggers children reveal animations sequentially
 */
export function RevealGroup({
  children,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
