import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('triggers onClick callback when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders all variants and sizes', () => {
    const { rerender } = render(
      <Button variant="emerald" size="sm">
        Emerald Sm
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('from-emerald-500');

    rerender(
      <Button variant="secondary" size="lg">
        Secondary Lg
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-slate-800');

    rerender(
      <Button variant="outline" size="md">
        Outline Md
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('border-slate-700');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders icons on left and right positions', () => {
    const { rerender } = render(
      <Button icon={<span data-testid="left-icon">*</span>} iconPosition="left">
        With Left Icon
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();

    rerender(
      <Button icon={<span data-testid="right-icon">*</span>} iconPosition="right">
        With Right Icon
      </Button>
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('handles loading state with spinner and disables button', () => {
    render(
      <Button isLoading icon={<span>*</span>}>
        Loading Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('svg.animate-spin')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
