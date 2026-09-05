import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SystemArchitecture } from './SystemArchitecture';

describe('SystemArchitecture feature', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all 5 topology nodes and safeguards', () => {
    render(<SystemArchitecture />);

    expect(screen.getAllByText('Kafka Event Streaming Broker')[0]).toBeInTheDocument();
    expect(screen.getByText('API Gateway & WebClient')).toBeInTheDocument();
    expect(screen.getByText('Account & KYC Microservices')).toBeInTheDocument();
    expect(screen.getByText('Persistence & Polyglot DBs')).toBeInTheDocument();
    expect(screen.getByText('Observability & SRE Telemetry')).toBeInTheDocument();
    expect(screen.getByText('Header-Based Routing')).toBeInTheDocument();
  });

  it('allows clicking different architecture nodes to view details', () => {
    render(<SystemArchitecture />);

    // Click API Gateway node
    fireEvent.click(screen.getByText('API Gateway & WebClient'));
    expect(screen.getAllByText('Spring Cloud Gateway / Spring WebClient')[0]).toBeInTheDocument();

    // Click Persistence node
    fireEvent.click(screen.getByText('Persistence & Polyglot DBs'));
    expect(screen.getAllByText('Oracle SQL / MongoDB / JPA Hibernate')[0]).toBeInTheDocument();
  });

  it('runs the full simulation and allows reset', () => {
    render(<SystemArchitecture />);

    const simBtn = screen.getByRole('button', {
      name: /simulate account opening event/i,
    });
    fireEvent.click(simBtn);

    // Processing state
    expect(screen.getByText('Processing Event Stream...')).toBeInTheDocument();

    // Step through the 5 interval ticks (900ms * 6 = 5400ms)
    act(() => {
      vi.advanceTimersByTime(5500);
    });

    // Completed state
    expect(screen.getByText(/200 OK — Processed in 14ms/i)).toBeInTheDocument();

    // Reset button
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetBtn);

    // Back to idle state
    expect(
      screen.getByRole('button', { name: /simulate account opening event/i })
    ).toBeInTheDocument();
  });
});
