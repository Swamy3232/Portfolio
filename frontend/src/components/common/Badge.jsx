import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const variantClasses = {
    default: 'bg-surface-muted text-secondary border border-border',
    accent: 'bg-text/5 text-primary border border-border font-medium',
    outline: 'bg-transparent text-secondary border border-border',
    success: 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs sm:text-sm px-2.5 py-1 rounded-md font-medium',
    lg: 'text-sm px-3.5 py-1.5 rounded-md font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
