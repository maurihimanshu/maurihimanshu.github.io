import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero feature', () => {
  it('renders headline, name, title, and CTA buttons', () => {
    render(<Hero />);

    expect(screen.getAllByText(/Himanshu Kumar/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Architecting/i)).toBeInTheDocument();
    expect(screen.getByText('View Banking Projects')).toBeInTheDocument();
    expect(screen.getByText('Architecture Visualizer')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('renders metrics cards and terminal status preview', () => {
    render(<Hero />);

    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('ONLINE (PROD)')).toBeInTheDocument();
    expect(screen.getByText('sme-platform-runtime.sh')).toBeInTheDocument();
  });
});
