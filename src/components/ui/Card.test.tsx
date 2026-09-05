import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card component', () => {
  it('renders children with default styles', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('hover:-translate-y-1');
  });

  it('handles custom borderAccents and glowOnHover', () => {
    const { rerender } = render(
      <Card borderAccent="cyan" glowOnHover hoverEffect={false}>
        Cyan Card
      </Card>
    );
    const card = screen.getByText('Cyan Card');
    expect(card).toHaveClass('border-cyan-500/20');
    expect(card).toHaveClass('hover:shadow-cyan-500/10');
    expect(card).not.toHaveClass('hover:-translate-y-1');

    rerender(<Card borderAccent="emerald">Emerald Card</Card>);
    expect(screen.getByText('Emerald Card')).toHaveClass('border-emerald-500/20');

    rerender(<Card borderAccent="purple">Purple Card</Card>);
    expect(screen.getByText('Purple Card')).toHaveClass('border-purple-500/20');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
