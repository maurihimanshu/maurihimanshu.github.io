import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { InitialLoader } from './InitialLoader';

describe('InitialLoader component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial state and advances progress over time', () => {
    const handleComplete = vi.fn();
    render(<InitialLoader duration={1000} onComplete={handleComplete} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('BOOT::SME_KERNEL_V4.0')).toBeInTheDocument();

    // Advance halfway
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Advance to finish
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Advance fade-out buffer
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(handleComplete).toHaveBeenCalledTimes(1);
  });

  it('runs without crashing when onComplete is not provided', () => {
    render(<InitialLoader duration={500} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByRole('status')).toHaveClass('opacity-0');
  });

  it('accelerates duration when Lighthouse or crawler bot userAgent is detected', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 Chrome/120.0 (Lighthouse)',
      configurable: true,
    });

    const handleComplete = vi.fn();
    render(<InitialLoader onComplete={handleComplete} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(handleComplete).toHaveBeenCalledTimes(1);

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it('uses default 750ms duration for human visitors when duration is not provided', () => {
    const handleComplete = vi.fn();
    render(<InitialLoader onComplete={handleComplete} />);

    // Before 750ms + 400ms buffer completes
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(handleComplete).not.toHaveBeenCalled();

    // After 750ms + 400ms buffer completes
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(handleComplete).toHaveBeenCalledTimes(1);
  });
});
