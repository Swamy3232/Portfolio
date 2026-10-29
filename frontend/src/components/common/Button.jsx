import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  magnetic = false,
  className = '',
  disabled = false,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!magnetic || prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (!magnetic || !buttonRef.current) return;
    buttonRef.current.style.transform = 'translate3d(0, 0, 0)';
  };

  const baseClasses =
    'group relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-text active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none';

  const variantClasses = {
    primary:
      'bg-[var(--button-bg)] text-[var(--button-text)] hover:opacity-90 shadow-none border border-transparent',
    secondary:
      'bg-transparent text-primary border border-border hover:border-text hover:bg-surface-muted/50',
    outline:
      'border border-border text-primary hover:border-text bg-transparent',
    ghost:
      'text-secondary hover:text-primary hover:bg-surface-muted bg-transparent',
    tertiary:
      'p-0 text-primary hover:text-primary bg-transparent underline-offset-4 link-draw-underline'
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 font-semibold'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  const interactionProps = {
    ref: buttonRef,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    className: combinedClasses,
    ...props
  };

  if (to) {
    return (
      <Link to={to} {...interactionProps}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...interactionProps}>
        {content}
      </a>
    );
  }

  return (
    <button disabled={disabled} {...interactionProps}>
      {content}
    </button>
  );
}
