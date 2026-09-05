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
});
