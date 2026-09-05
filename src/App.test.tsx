import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.location.hash = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial loader, then completes and renders full portfolio application', () => {
    render(<App />);

    // Loader is active initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Advance timers for loader completion (1800ms duration + 400ms buffer + intervals)
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Main sections are visible
    expect(screen.getByLabelText('Himanshu Kumar Home')).toBeInTheDocument();
    expect(screen.getAllByText(/Architecting/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('TECHNICAL MASTERY')[0]).toBeInTheDocument();
    expect(screen.getAllByText('WORK EXPERIENCE')[0]).toBeInTheDocument();
    expect(screen.getAllByText('SME SYSTEM ARCHITECTURE')[0]).toBeInTheDocument();
    expect(screen.getAllByText('PRODUCTION PROJECTS & CASE STUDIES')[0]).toBeInTheDocument();
    expect(screen.getAllByText('INTELLECTUAL PROPERTY & PATENTS')[0]).toBeInTheDocument();
    expect(screen.getAllByText('CREDENTIALS & HONORS')[0]).toBeInTheDocument();
  }, 30000);

  it('switches to documentation view on #docs hash and returns back to portfolio', () => {
    render(<App />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Navigate to #docs?topic=expenso-android
    act(() => {
      window.location.hash = '#docs?topic=expenso-android';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(screen.getByText('Zero-Knowledge Security Architecture')).toBeInTheDocument();

    // Click Back to Portfolio
    const backBtn = screen.getByLabelText('Back to Portfolio');
    act(() => {
      fireEvent.click(backBtn);
    });

    expect(screen.getByLabelText('Himanshu Kumar Home')).toBeInTheDocument();

    // Navigate to #docs without topic param
    act(() => {
      window.location.hash = '#docs';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Expenso: 100% Offline Android Finance Architecture/i,
      })
    ).toBeInTheDocument();

    // Navigate back to #
    act(() => {
      window.location.hash = '#hero';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(screen.getByLabelText('Himanshu Kumar Home')).toBeInTheDocument();
  });
});
