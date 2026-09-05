import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge component', () => {
  it('renders children with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-800');
  });

  it('renders all color variants', () => {
    const { rerender } = render(<Badge variant="cyan">Cyan</Badge>);
    expect(screen.getByText('Cyan')).toHaveClass('text-cyan-400');

    rerender(<Badge variant="emerald">Emerald</Badge>);
    expect(screen.getByText('Emerald')).toHaveClass('text-emerald-400');

    rerender(<Badge variant="purple">Purple</Badge>);
    expect(screen.getByText('Purple')).toHaveClass('text-purple-400');

    rerender(<Badge variant="amber">Amber</Badge>);
    expect(screen.getByText('Amber')).toHaveClass('text-amber-400');

    rerender(<Badge variant="blue">Blue</Badge>);
    expect(screen.getByText('Blue')).toHaveClass('text-blue-400');
  });

  it('renders different sizes and custom classes', () => {
    const { rerender } = render(
      <Badge size="sm" className="custom-test">
        Small
      </Badge>
    );
    expect(screen.getByText('Small')).toHaveClass('text-[11px]');
    expect(screen.getByText('Small')).toHaveClass('custom-test');

    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('text-xs');
  });
});
