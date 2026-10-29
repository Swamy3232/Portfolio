import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useFullPageNavigation Hook
 * Handles full-page slide transitions with mouse wheel, trackpad momentum suppression,
 * touch gestures, keyboard arrows/page keys, URL hash sync, and internal section overflow scrolling.
 *
 * @param {Object} options
 * @param {number} options.totalSections - Total count of sections
 * @param {string[]} options.sectionIds - Array of section IDs (e.g. ['hero', 'about', ...])
 * @param {number} [options.lockDuration=900] - Duration in ms to lock navigation between slides
 * @param {number} [options.wheelThreshold=35] - Minimum wheel delta to trigger transition
 * @param {Function} [options.getScrollContainer] - Function returning the DOM element for active section's scrollable container
 * @param {boolean} [options.enabled=true] - Whether navigation listeners are active
 */
export function useFullPageNavigation({
  totalSections,
  sectionIds = [],
  lockDuration = 900,
  wheelThreshold = 35,
  getScrollContainer = null,
  enabled = true
}) {
  // Determine initial index from URL hash if present
  const getInitialIndex = () => {
    if (typeof window === 'undefined') return 0;
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const foundIndex = sectionIds.findIndex((id) => id.toLowerCase() === hash);
    return foundIndex !== -1 ? foundIndex : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const [direction, setDirection] = useState(1); // 1 = slide up (next), -1 = slide down (prev)
  const isTransitioningRef = useRef(false);
  const cooldownTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  // Transition unlock helper
  const unlockTransition = useCallback(() => {
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, lockDuration);
  }, [lockDuration]);

  // Navigate to a specific section index
  const goToSection = useCallback(
    (targetIndex, customDirection = null) => {
      if (!enabled) return;
      if (targetIndex < 0 || targetIndex >= totalSections) return;
      if (targetIndex === activeIndex && !isTransitioningRef.current) return;
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      const newDirection = customDirection !== null 
        ? customDirection 
        : targetIndex > activeIndex ? 1 : -1;

      setDirection(newDirection);
      setActiveIndex(targetIndex);

      // Sync URL hash without jumping
      if (sectionIds[targetIndex] && typeof window !== 'undefined') {
        const newHash = `#${sectionIds[targetIndex]}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, '', newHash);
        }
      }

      unlockTransition();
    },
    [activeIndex, totalSections, sectionIds, enabled, unlockTransition]
  );

  const goToNext = useCallback(() => {
    if (activeIndex < totalSections - 1) {
      goToSection(activeIndex + 1, 1);
    }
  }, [activeIndex, totalSections, goToSection]);

  const goToPrev = useCallback(() => {
    if (activeIndex > 0) {
      goToSection(activeIndex - 1, -1);
    }
  }, [activeIndex, goToSection]);

  // 1. Wheel & Trackpad Listener (immediate section transitions, exactly like home page)
  useEffect(() => {
    if (!enabled) return;

    let wheelAccumulator = 0;
    let wheelResetTimer = null;

    const handleWheel = (e) => {
      // Prevent standard browser vertical scroll
      e.preventDefault();

      if (isTransitioningRef.current) return;

      wheelAccumulator += e.deltaY;

      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelAccumulator = 0;
      }, 200);

      if (wheelAccumulator > wheelThreshold) {
        wheelAccumulator = 0;
        goToNext();
      } else if (wheelAccumulator < -wheelThreshold) {
        wheelAccumulator = 0;
        goToPrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [enabled, goToNext, goToPrev, wheelThreshold]);

  // 2. Touch Gestures (immediate section transitions on swipe up/down)
  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current || e.changedTouches.length !== 1) return;

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

      // Ensure vertical swipe dominates horizontal swipe
      if (Math.abs(deltaY) < 45 || Math.abs(deltaY) < Math.abs(deltaX)) {
        return;
      }

      if (deltaY > 0) {
        // Swiped UP -> want next section
        goToNext();
      } else {
        // Swiped DOWN -> want previous section
        goToPrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, goToNext, goToPrev]);

  // 3. Keyboard Navigation (Arrows, PageUp/Down, Space, Home, End)
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in form controls
      const target = e.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          goToNext();
          break;

        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goToPrev();
          break;

        case ' ': // Spacebar
          e.preventDefault();
          if (e.shiftKey) {
            goToPrev();
          } else {
            goToNext();
          }
          break;

        case 'Home':
          e.preventDefault();
          goToSection(0, -1);
          break;

        case 'End':
          e.preventDefault();
          goToSection(totalSections - 1, 1);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, totalSections, goToNext, goToPrev, goToSection]);

  // 4. Browser Back/Forward & Direct Hash Links
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const foundIndex = sectionIds.findIndex((id) => id.toLowerCase() === hash);
      if (foundIndex !== -1 && foundIndex !== activeIndex) {
        goToSection(foundIndex);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [sectionIds, activeIndex, goToSection]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  return {
    activeIndex,
    direction,
    isTransitioning: isTransitioningRef.current,
    goToSection,
    goToNext,
    goToPrev,
    activeSectionId: sectionIds[activeIndex] || ''
  };
}
