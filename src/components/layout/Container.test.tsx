import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container component', () => {
  it('renders children with default xl size', () => {
    render(<Container>Container Body</Container>);
    const elem = screen.getByText('Container Body');
    expect(elem).toHaveClass('max-w-7xl');
  });

  it('renders with other sizes', () => {
    const { rerender } = render(<Container size="sm">Small</Container>);
    expect(screen.getByText('Small')).toHaveClass('max-w-3xl');

    rerender(<Container size="md">Medium</Container>);
    expect(screen.getByText('Medium')).toHaveClass('max-w-5xl');

    rerender(<Container size="lg">Large</Container>);
    expect(screen.getByText('Large')).toHaveClass('max-w-6xl');

    rerender(<Container size="full">Full</Container>);
    expect(screen.getByText('Full')).toHaveClass('max-w-full');
  });
});
