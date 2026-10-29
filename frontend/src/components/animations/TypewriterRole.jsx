import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ROLES = ['Developer', 'Designer', 'Creator'];

/**
 * TypewriterRole Component
 * Loops through exact roles ('Developer', 'Designer', 'Creator') with a smooth type-and-delete effect.
 * Uses an accessible sr-only text node to prevent repetitive screen-reader announcements.
 */
export default function TypewriterRole({ className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      // Pause at end of word
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && text === '') {
      // Move to next word with a short pause
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    } else {
      // Typing or deleting next character
      const speed = isDeleting ? 45 : 85;
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="sr-only">Developer, Designer, and Creator</span>
        <span className="text-accent font-semibold">{ROLES[0]}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Screen Reader Announcement - Full text without character spam */}
      <span className="sr-only">Developer, Designer, and Creator</span>

      {/* Visual Animated Characters */}
      <span aria-hidden="true" className="text-accent font-semibold">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[1em] ml-1 bg-accent animate-pulse align-middle"
      />
    </span>
  );
}
