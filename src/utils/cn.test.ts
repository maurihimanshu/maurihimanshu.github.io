import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('handles conditional classes', () => {
    expect(cn('base-class', true && 'is-active', false && 'is-disabled')).toBe(
      'base-class is-active'
    );
  });

  it('handles Tailwind conflict resolution with twMerge', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles empty inputs or undefined', () => {
    expect(cn('', undefined, null)).toBe('');
  });
});
