import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect scroll direction (up / down) with threshold and rAF throttling
 */
export function useScrollDirection({ threshold = 12 } = {}) {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const prevScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - prevScrollY.current;

      if (Math.abs(diff) >= threshold) {
        setScrollDirection(diff > 0 ? 'down' : 'up');
        prevScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
      }

      setScrollY(currentScrollY);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDirection, scrollY };
}
