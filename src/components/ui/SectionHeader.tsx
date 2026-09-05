import React from 'react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {badge && (
        <div className={cn('mb-3 flex', align === 'center' ? 'justify-center' : 'justify-start')}>
          <Badge variant="cyan" size="md" className="font-mono">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
