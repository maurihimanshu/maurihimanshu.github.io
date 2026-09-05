import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About feature', () => {
  it('renders narrative and company name', () => {
    render(<About />);

    expect(screen.getByText(/Engineering Resilient Platforms with Proven SME Ownership/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cognizant Technology Solutions/i)[0]).toBeInTheDocument();
    expect(screen.getByText('5/5 Manager Rating (3 Consecutive Years)')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Expenso' })).toHaveAttribute(
      'href',
      '#docs?topic=expenso-android'
    );
    expect(screen.getByRole('link', { name: 'AI Work Assistant' })).toHaveAttribute(
      'href',
      '#docs?topic=ai-work-assistant'
    );
    expect(screen.getByRole('link', { name: 'Reliable QR File Transfer' })).toHaveAttribute(
      'href',
      '#docs?topic=qr-file-transfer'
    );
  });

  it('renders 4 architectural pillars', () => {
    render(<About />);

    expect(screen.getByText('Secure Banking Microservices')).toBeInTheDocument();
    expect(screen.getByText('Kafka Event Streaming & Optimization')).toBeInTheDocument();
    expect(screen.getByText('Team SME & Cross-Functional Mentorship')).toBeInTheDocument();
    expect(screen.getByText('Enterprise SDKs & Shared Libraries')).toBeInTheDocument();
  });
});
