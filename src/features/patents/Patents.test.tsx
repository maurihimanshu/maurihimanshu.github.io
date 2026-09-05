import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Patents } from './Patents';

describe('Patents feature', () => {
  it('renders both patents with patent numbers and innovations', () => {
    render(<Patents />);

    expect(screen.getByText('Fall Prevention System')).toBeInTheDocument();
    expect(screen.getByText('Patent No. 202011012664')).toBeInTheDocument();
    expect(screen.getByText('Surveillance and Alert System')).toBeInTheDocument();
    expect(screen.getByText('Patent No. 202111014541')).toBeInTheDocument();
    expect(
      screen.getByText(/Real-time sensor fusion analyzing multi-axis acceleration/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText('Verify on IP India').length).toBe(2);
  });
});
