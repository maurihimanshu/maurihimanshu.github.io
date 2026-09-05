import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects feature', () => {
  it('renders all enterprise and personal projects initially', () => {
    render(<Projects />);

    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
    expect(screen.getByText('Optimized Kafka Event Processing Hub')).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Shared Platform Libraries & Reusable SDKs')
    ).toBeInTheDocument();
    expect(screen.getByText('Expenso — Offline Android Finance Manager')).toBeInTheDocument();
    expect(screen.getByText('AI Work Assistant')).toBeInTheDocument();
    expect(screen.getByText('Reliable Air-Gapped QR File Transfer')).toBeInTheDocument();
  });

  it('filters projects by every category including Personal Projects', () => {
    render(<Projects />);

    // Filter Banking Platform
    fireEvent.click(screen.getByRole('button', { name: 'Banking Platform' }));
    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
    expect(screen.queryByText('Optimized Kafka Event Processing Hub')).not.toBeInTheDocument();
    expect(screen.queryByText('Expenso — Offline Android Finance Manager')).not.toBeInTheDocument();

    // Filter Enterprise SDK
    fireEvent.click(screen.getByRole('button', { name: 'Enterprise SDK' }));
    expect(
      screen.getByText('Enterprise Shared Platform Libraries & Reusable SDKs')
    ).toBeInTheDocument();
    expect(screen.queryByText('Scalable Digital Banking Backend Platform')).not.toBeInTheDocument();

    // Filter Event Streaming
    fireEvent.click(screen.getByRole('button', { name: 'Event Streaming' }));
    expect(screen.getByText('Optimized Kafka Event Processing Hub')).toBeInTheDocument();

    // Filter Personal Projects
    fireEvent.click(screen.getByRole('button', { name: 'Personal Projects' }));
    expect(screen.getByText('Expenso — Offline Android Finance Manager')).toBeInTheDocument();
    expect(screen.getByText('AI Work Assistant')).toBeInTheDocument();
    expect(screen.getByText('Reliable Air-Gapped QR File Transfer')).toBeInTheDocument();
    expect(screen.queryByText('Scalable Digital Banking Backend Platform')).not.toBeInTheDocument();

    // Reset to All
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Scalable Digital Banking Backend Platform')).toBeInTheDocument();
    expect(screen.getByText('Expenso — Offline Android Finance Manager')).toBeInTheDocument();
  });

  it('opens and closes modal for each project to verify all details and docs links', () => {
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
      expect(screen.getByText('View Technical Documentation')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Close modal'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }
  });

  it('closes modal when clicking View Technical Documentation link', () => {
    render(<Projects />);

    const deepDiveButtons = screen.getAllByRole('button', {
      name: /architecture deep dive/i,
    });
    fireEvent.click(deepDiveButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const docsLink = screen.getByRole('link', { name: /View Technical Documentation/i });
    fireEvent.click(docsLink);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
