import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { App } from './App';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg data-testid="mermaid-svg"></svg>' }),
  },
}));

describe('App component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.location.hash = '';
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('switches to documentation view on #docs hash and returns back to portfolio', async () => {
    render(<App />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    vi.useRealTimers();

    // Navigate to #docs?topic=expenso-android
    act(() => {
      window.location.hash = '#docs?topic=expenso-android';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(
      await screen.findByText('Zero-Knowledge Security Architecture', {}, { timeout: 8000 })
    ).toBeInTheDocument();

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
      await screen.findByRole(
        'heading',
        {
          level: 1,
          name: /Expenso: 100% Offline Android Finance Architecture/i,
        },
        { timeout: 8000 }
      )
    ).toBeInTheDocument();

    // Navigate back to #
    act(() => {
      window.location.hash = '#hero';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(screen.getByLabelText('Himanshu Kumar Home')).toBeInTheDocument();
  }, 30000);

  it('opens and closes WebCLI terminal when Open CLI button is clicked', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Element.prototype.scrollIntoView = vi.fn();

    render(<App />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    vi.useRealTimers();

    const openCliBtn = screen.getByRole('button', { name: /open cli/i });
    act(() => {
      fireEvent.click(openCliBtn);
    });

    expect(
      await screen.findByRole('dialog', { name: 'Web CLI Terminal' }, { timeout: 8000 })
    ).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close terminal');
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByRole('dialog', { name: 'Web CLI Terminal' })).not.toBeInTheDocument();
  });
});
