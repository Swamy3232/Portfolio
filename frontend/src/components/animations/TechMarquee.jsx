import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TECHNOLOGIES = [
  'React.js',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'TypeScript',
  'Docker',
  'WebSockets',
  'Tailwind CSS',
  'Vite',
  'SQLAlchemy',
  'Alembic',
  'MinIO',
  'Ollama',
  'Recharts',
  'Git'
];

/**
 * TechMarquee Component
 * Seamless, GPU-accelerated horizontal tech stack ticker.
 * Pauses on hover, provides screen-reader accessible listing, and stops on reduced-motion.
 */
export default function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full overflow-hidden py-6 border-y border-border/60 bg-surface-muted/30 relative select-none">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* Screen Reader Announcement */}
      <div className="sr-only">
        Core technologies: {TECHNOLOGIES.join(', ')}.
      </div>

      {prefersReducedMotion ? (
        <div className="flex flex-wrap justify-center gap-3 px-4 max-w-6xl mx-auto">
          {TECHNOLOGIES.map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-surface border border-border text-primary font-mono shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex animate-marquee" aria-hidden="true">
          {/* Primary Track */}
          <div className="flex items-center gap-3 px-2 shrink-0">
            {TECHNOLOGIES.map((tech, idx) => (
              <div
                key={`track-1-${idx}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-border text-xs sm:text-sm font-mono text-secondary hover:border-text hover:text-primary transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-muted/40" />
                <span>{tech}</span>
              </div>
            ))}
          </div>

          {/* Seamless Duplicate Track */}
          <div className="flex items-center gap-3 px-2 shrink-0">
            {TECHNOLOGIES.map((tech, idx) => (
              <div
                key={`track-2-${idx}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-border text-xs sm:text-sm font-mono text-secondary hover:border-text hover:text-primary transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-muted/40" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
