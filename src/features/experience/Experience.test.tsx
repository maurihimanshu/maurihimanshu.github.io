import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience feature', () => {
  it('renders experience tenure, company, and key metrics', () => {
    render(<Experience />);

    expect(screen.getByText(/Associate \/ Software Engineer \/ Team SME/i)).toBeInTheDocument();
    expect(screen.getByText('Cognizant Technology Solutions')).toBeInTheDocument();
    expect(screen.getByText('20+ Teams')).toBeInTheDocument();
    expect(screen.getByText('5/5 (3 Yrs)')).toBeInTheDocument();
    expect(screen.getByText('>80%')).toBeInTheDocument();
  });

  it('renders highlights and technologies applied in production', () => {
    render(<Experience />);

    expect(
      screen.getByText(/Own full lifecycle analysis, architecture design/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Apache Kafka')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
  });
});
