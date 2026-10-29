import React from 'react';

export default function SkillTag({ name, category, className = '', highlight = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors select-none ${
        highlight
          ? 'bg-surface text-primary border border-text/60 font-semibold'
          : 'bg-surface text-secondary hover:text-primary hover:border-text/50 border border-border'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-muted/40" />
      <span>{name}</span>
      {category && (
        <span className="text-[10px] text-muted opacity-70 uppercase tracking-wider ml-1">
          {category}
        </span>
      )}
    </span>
  );
}
