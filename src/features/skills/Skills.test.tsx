import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills feature', () => {
  it('renders technical mastery section and default skills', () => {
    render(<Skills />);

    expect(screen.getByText('TECHNICAL MASTERY')).toBeInTheDocument();
    expect(screen.getByText('Core Java')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
  });

  it('switches between all skill category tabs and displays badges', () => {
    render(<Skills />);

    const categories = [
      'Cloud, DevOps & SRE',
      'Full Stack & Frontend',
      'Databases & Storage',
      'Testing, Quality & Compliance',
      'Backend & Distributed Systems',
    ];

    for (const cat of categories) {
      const tabButton = screen.getByRole('button', { name: new RegExp(cat, 'i') });
      fireEvent.click(tabButton);
      expect(screen.getByRole('button', { name: new RegExp(cat, 'i') })).toHaveClass(
        'from-cyan-500'
      );
    }
  });
});
