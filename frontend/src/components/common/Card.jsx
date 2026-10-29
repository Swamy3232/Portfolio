import React from 'react';

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'normal',
  as: Component = 'div',
  ...props
}) {
  const paddingMap = {
    none: 'p-0',
    tight: 'p-4',
    normal: 'p-6 sm:p-8',
    spacious: 'p-8 sm:p-10'
  };

  const hoverClasses = hover
    ? 'transition-all duration-200 hover:border-text/40 hover:-translate-y-1'
    : '';

  return (
    <Component
      className={`bg-surface rounded-xl border border-border transition-colors duration-200 ${paddingMap[padding] || paddingMap.normal} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
