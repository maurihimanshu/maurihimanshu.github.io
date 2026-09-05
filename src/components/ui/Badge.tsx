import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'purple' | 'slate' | 'amber' | 'blue';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  className,
}) => {
  const variants = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30 light:bg-cyan-50 light:text-cyan-800 light:border-cyan-300',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30 light:bg-emerald-50 light:text-emerald-800 light:border-emerald-300',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30 light:bg-purple-50 light:text-purple-800 light:border-purple-300',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30 light:bg-amber-50 light:text-amber-800 light:border-amber-300',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30 light:bg-blue-50 light:text-blue-800 light:border-blue-300',
    slate: 'bg-slate-800 text-slate-300 border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700 light:bg-slate-100 light:text-slate-800 light:border-slate-300',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-medium tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
