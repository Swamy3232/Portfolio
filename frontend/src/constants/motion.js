/**
 * Centralized Motion Tokens & Curves
 * Maps directly to --ease-out, --ease-in-out, and CSS timing variables
 */

export const EASING_OUT = [0.22, 1, 0.36, 1];
export const EASING_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION_FAST = 0.15;
export const DURATION_BASE = 0.3;
export const DURATION_SLOW = 0.6;

export const STAGGER_DELAY = 0.08;
export const REVEAL_DISTANCE = 24;
export const HOVER_LIFT = 6;
export const PARALLAX_STRENGTH = 12;

export const transitionFast = {
  duration: DURATION_FAST,
  ease: EASING_OUT
};

export const transitionBase = {
  duration: DURATION_BASE,
  ease: EASING_OUT
};

export const transitionSlow = {
  duration: DURATION_SLOW,
  ease: EASING_OUT
};

export const transitionSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 30
};

/**
 * Interactive Dot Grid Canvas Default Configuration
 */
export const DOT_GRID_CONFIG = {
  spacing: 28,
  dotRadius: 1.5,
  influenceRadius: 150,
  strength: 28,
  mode: 'distort', // 'attract', 'repel', or 'distort'
  stiffness: 180,
  damping: 22,
  baseColor: 'var(--dot-color)',
  glowColor: 'var(--dot-glow)',
  accentColor: 'var(--accent)',
  maxDisplacement: 35,
  glowStrength: 0.65,
  enableClickRipple: true,
  enableTouchInteraction: true,
  ambientWaveOnTouch: true,
};
