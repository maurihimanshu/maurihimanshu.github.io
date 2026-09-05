import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  borderAccent?: 'default' | 'cyan' | 'emerald' | 'purple';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverEffect = true, glowOnHover = false, borderAccent = 'default', ...props }, ref) => {
    const accents = {
      default: 'border-slate-800 hover:border-slate-700 dark:border-slate-800/80 dark:hover:border-slate-700 light:border-slate-200 light:hover:border-slate-300',
      cyan: 'border-cyan-500/20 hover:border-cyan-500/50 light:border-cyan-200 light:hover:border-cyan-400',
      emerald: 'border-emerald-500/20 hover:border-emerald-500/50 light:border-emerald-200 light:hover:border-emerald-400',
      purple: 'border-purple-500/20 hover:border-purple-500/50 light:border-purple-200 light:hover:border-purple-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl bg-slate-900/60 dark:bg-slate-900/70 border backdrop-blur-md p-6 transition-all duration-300',
          'light:bg-white light:border-slate-200 light:shadow-sm',
          accents[borderAccent],
          hoverEffect && 'hover:-translate-y-1 hover:shadow-xl',
          glowOnHover && 'hover:shadow-cyan-500/10 hover:shadow-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
