import React from 'react';
import Badge from './Badge';

export default function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  as: HeadingComponent = 'h2',
  className = '',
  titleClassName = '',
  descriptionClassName = ''
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col space-y-3 max-w-3xl ${alignClasses[align] || alignClasses.left} ${className}`}>
      {badge && (
        <Badge variant="accent" size="md">
          {badge}
        </Badge>
      )}

      {title && (
        <HeadingComponent className={`text-3xl sm:text-4xl font-bold font-heading text-primary tracking-tight leading-tight ${titleClassName}`}>
          {title}
        </HeadingComponent>
      )}

      {description && (
        <p className={`text-base sm:text-lg text-secondary leading-relaxed ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
