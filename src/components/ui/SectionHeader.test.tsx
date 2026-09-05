import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader component', () => {
  it('renders title and subtitle with center alignment', () => {
    render(
      <SectionHeader
        badge="TEST BADGE"
        title="Main Section Title"
        subtitle="Detailed section subtitle"
        align="center"
      />
    );
    expect(screen.getByText('TEST BADGE')).toBeInTheDocument();
    expect(screen.getByText('Main Section Title')).toBeInTheDocument();
    expect(screen.getByText('Detailed section subtitle')).toBeInTheDocument();
  });

  it('renders with left alignment and badge', () => {
    const { container } = render(
      <SectionHeader badge="LEFT BADGE" title="Left Title" align="left" />
    );
    expect(screen.getByText('LEFT BADGE')).toBeInTheDocument();
    expect(screen.getByText('Left Title')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-left');
  });

  it('renders without badge', () => {
    render(<SectionHeader title="No Badge Title" />);
    expect(screen.getByText('No Badge Title')).toBeInTheDocument();
  });
});
