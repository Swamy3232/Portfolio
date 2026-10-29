import React, { useRef, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useFullPageNavigation } from '../../hooks/useFullPageNavigation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './FullPageSlider.css';

/**
 * Slide Transition Animation Variants
 * Current section moves up and fades slightly while next section slides up from bottom.
 * Timing: 800ms, cubic-bezier(0.22, 1, 0.36, 1)
 */
const slideVariants = {
  enter: ({ direction, prefersReducedMotion }) => ({
    y: prefersReducedMotion ? 0 : direction > 0 ? 60 : -60,
    opacity: 0,
    zIndex: 2
  }),
  center: {
    y: 0,
    opacity: 1,
    zIndex: 2,
    transition: {
      y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
    }
  },
  exit: ({ direction, prefersReducedMotion }) => ({
    y: prefersReducedMotion ? 0 : direction > 0 ? -60 : 60,
    opacity: 0.15,
    zIndex: 1,
    transition: {
      y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  })
};

/**
 * Slider Context for child sections and components
 */
export const FullPageSliderContext = createContext({
  activeIndex: 0,
  totalSections: 1,
  goToSection: () => {},
  goToNext: () => {},
  goToPrev: () => {},
  activeSectionId: '',
  sectionList: []
});

export const useSlider = () => useContext(FullPageSliderContext);

/**
 * FullPageSlider Component
 * Orchestrates full-screen 100dvh slide-up sections with progress bar,
 * trackpad momentum control, keyboard/touch navigation, and interactive scroll down cue.
 */
export default function FullPageSlider({
  children,
  sections = [],
  lockDuration = 850,
  wheelThreshold = 35,
  className = ''
}) {
  const prefersReducedMotion = useReducedMotion();
  const scrollContainersRef = useRef(new Map());

  // Extract section metadata
  const sectionList = useMemo(() => {
    return sections.length > 0
      ? sections
      : React.Children.map(children, (child, idx) => ({
        id: child?.props?.id || `section-${idx + 1}`,
        title: child?.props?.title || `Section ${idx + 1}`,
        ariaLabel: child?.props?.ariaLabel || child?.props?.title
      })) || [];
  }, [sections, children]);

  const sectionIds = useMemo(() => sectionList.map((s) => s.id), [sectionList]);
  const totalSections = sectionList.length;

  // Internal scroll container getter for active section
  const getScrollContainer = (idx) => {
    return scrollContainersRef.current.get(idx) || null;
  };

  const {
    activeIndex,
    direction,
    goToSection,
    goToNext,
    goToPrev,
    activeSectionId
  } = useFullPageNavigation({
    totalSections,
    sectionIds,
    lockDuration,
    wheelThreshold,
    getScrollContainer
  });

  const progressPercentage = ((activeIndex + 1) / totalSections) * 100;
  const formattedCounter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(totalSections).padStart(2, '0')}`;

  const childrenArray = React.Children.toArray(children);
  const activeChild = childrenArray[activeIndex];

  const sliderContextValue = useMemo(() => ({
    activeIndex,
    totalSections,
    goToSection,
    goToNext,
    goToPrev,
    activeSectionId,
    sectionList
  }), [activeIndex, totalSections, goToSection, goToNext, goToPrev, activeSectionId, sectionList]);

  return (
    <FullPageSliderContext.Provider value={sliderContextValue}>
      <div className={`fullpage-slider-root ${className}`}>
        {/* 1. Thin Gradient Progress Bar at Top */}
        <div className="fullpage-progress-track" aria-hidden="true">
          <div
            className="fullpage-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* 2. Slide Viewport Container (100dvh) */}
        <div className="fullpage-viewport">
          <AnimatePresence initial={false} custom={{ direction, prefersReducedMotion }} mode="popLayout">
            <motion.div
              key={activeSectionId || activeIndex}
              custom={{ direction, prefersReducedMotion }}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="fullpage-slide-frame"
            >
              {React.isValidElement(activeChild) &&
                React.cloneElement(activeChild, {
                  isActive: true,
                  scrollRef: (el) => {
                    if (el) {
                      scrollContainersRef.current.set(activeIndex, el);
                    }
                  }
                })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Interactive Floating Scroll Down Cue (Ultra-Clean & Professional) */}
        {totalSections > 1 && (
          <div className="fullpage-scroll-cue-wrapper" aria-label="Slide navigation helper">
            {activeIndex < totalSections - 1 ? (
              <button
                type="button"
                onClick={goToNext}
                className="fullpage-scroll-cue-pill group"
                aria-label={`Scroll to explore next section: ${sectionList[activeIndex + 1]?.title || 'Next'}`}
              >
                {/* Minimalist animated mouse */}
                <span className="fullpage-cue-mouse" aria-hidden="true">
                  <span className="fullpage-cue-wheel" />
                </span>

                {/* Primary prompt label */}
                <span className="fullpage-cue-label">Scroll to explore</span>

                {/* Gentle bouncing chevron */}
                <span className="fullpage-cue-arrow" aria-hidden="true">
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToSection(0, -1)}
                className="fullpage-scroll-cue-pill fullpage-scroll-cue-top group"
                aria-label="Back to top"
              >
                <span className="fullpage-cue-arrow-up" aria-hidden="true">
                  <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                </span>
                <span className="fullpage-cue-label">Back to top</span>
              </button>
            )}
          </div>
        )}
      </div>
    </FullPageSliderContext.Provider>
  );
}
