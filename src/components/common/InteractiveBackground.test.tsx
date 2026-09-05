import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { InteractiveBackground } from './InteractiveBackground';
import { ThemeProvider } from '../../context/ThemeContext';

const renderWithTheme = (theme: 'dark' | 'light' = 'dark') => {
  localStorage.setItem('hk_portfolio_theme', theme);
  return render(
    <ThemeProvider>
      <InteractiveBackground />
    </ThemeProvider>
  );
};

describe('InteractiveBackground component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders background container and elements in dark mode', () => {
    renderWithTheme('dark');

    const container = screen.getByTestId('interactive-background');
    expect(container).toBeInTheDocument();

    const spotlight = screen.getByTestId('cursor-spotlight');
    expect(spotlight).toBeInTheDocument();
    expect(spotlight.style.background).toContain('rgba(6, 182, 212, 0.09)');

    const orb1 = screen.getByTestId('ambient-orb-1');
    expect(orb1).toBeInTheDocument();
    expect(orb1.style.background).toContain('rgba(6, 182, 212, 0.12)');

    const orb2 = screen.getByTestId('ambient-orb-2');
    expect(orb2).toBeInTheDocument();
    expect(orb2.style.background).toContain('rgba(59, 130, 246, 0.09)');

    const grid = screen.getByTestId('interactive-grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders background elements with light mode styling', () => {
    renderWithTheme('light');

    const spotlight = screen.getByTestId('cursor-spotlight');
    expect(spotlight.style.background).toContain('rgba(14, 165, 233, 0.1)');

    const orb1 = screen.getByTestId('ambient-orb-1');
    expect(orb1.style.background).toContain('rgba(14, 165, 233, 0.12)');

    const orb2 = screen.getByTestId('ambient-orb-2');
    expect(orb2.style.background).toContain('rgba(99, 102, 241, 0.08)');
  });

  it('responds to mouse movements by updating spotlight and parallax', () => {
    renderWithTheme('dark');

    const spotlight = screen.getByTestId('cursor-spotlight');
    expect(spotlight.style.opacity).toBe('0.65');

    // Simulate mouse move across the viewport
    act(() => {
      fireEvent.mouseMove(window, { clientX: 450, clientY: 300 });
    });

    // Opacity becomes active
    expect(spotlight.style.opacity).toBe('1');

    // Advance animation frame to interpolate smooth coordinates
    act(() => {
      vi.advanceTimersByTime(100);
    });

    const orb1 = screen.getByTestId('ambient-orb-1');
    expect(orb1.style.transform).toContain('translate3d');

    // Simulate mouse leave
    act(() => {
      fireEvent.mouseLeave(document);
    });

    expect(spotlight.style.opacity).toBe('0.65');
  });

  it('cleans up event listeners and animation frame on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const docRemoveEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderWithTheme('dark');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(docRemoveEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
  });

  it('handles fallback when window dimensions are zero or undefined', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 0 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 0 });

    renderWithTheme('dark');

    const orb1 = screen.getByTestId('ambient-orb-1');
    expect(orb1).toBeInTheDocument();

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: originalInnerHeight });
  });
});
