import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects feature', () => {
  it('renders all projects initially', () => {
    render(<Projects />);

    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
    expect(screen.getByText('Optimized Kafka Event Processing Hub')).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Shared Platform Libraries & Reusable SDKs')
    ).toBeInTheDocument();
  });

  it('filters projects by every category', () => {
    render(<Projects />);

    // Filter Banking Platform
    fireEvent.click(screen.getByRole('button', { name: 'Banking Platform' }));
    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
    expect(screen.queryByText('Optimized Kafka Event Processing Hub')).not.toBeInTheDocument();

    // Filter Enterprise SDK
    fireEvent.click(screen.getByRole('button', { name: 'Enterprise SDK' }));
    expect(
      screen.getByText('Enterprise Shared Platform Libraries & Reusable SDKs')
    ).toBeInTheDocument();
    expect(screen.queryByText('Scalable Digital Banking Backend Platform')).not.toBeInTheDocument();

    // Filter Event Streaming
    fireEvent.click(screen.getByRole('button', { name: 'Event Streaming' }));
    expect(screen.getByText('Optimized Kafka Event Processing Hub')).toBeInTheDocument();

    // Reset to All
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
  });

  it('opens and closes modal for each project to verify all details', () => {
    render(<Projects />);

    const deepDiveButtons = screen.getAllByRole('button', {
      name: /architecture deep dive/i,
    });

    for (const btn of deepDiveButtons) {
      fireEvent.click(btn);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Key Performance Metrics')).toBeInTheDocument();
      expect(screen.getByText('Production Impact & Business Outcomes')).toBeInTheDocument();
      expect(screen.getByText('Complete Technology Stack')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Close modal'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }
  });
});
