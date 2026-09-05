import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('provides dark theme by default when no preference saved', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('loads saved theme from localStorage', () => {
    localStorage.setItem('hk_portfolio_theme', 'light');

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('loads theme from matchMedia when light is preferred and no localStorage saved', () => {
    // @ts-expect-error mockImplementation
    window.matchMedia.mockImplementationOnce((query: string) => ({
      matches: query.includes('light'),
      media: query,
    }));

    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>Current theme: {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('toggles theme and sets theme directly', () => {
    const TestComponent = () => {
      const { theme, toggleTheme, setTheme } = useTheme();
      return (
        <div>
          <span>Current: {theme}</span>
          <button onClick={toggleTheme}>Toggle</button>
          <button onClick={() => setTheme('light')}>Set Light</button>
          <button onClick={() => setTheme('dark')}>Set Dark</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current: dark')).toBeInTheDocument();

    act(() => {
      screen.getByText('Toggle').click();
    });

    expect(screen.getByText('Current: light')).toBeInTheDocument();
    expect(localStorage.getItem('hk_portfolio_theme')).toBe('light');

    act(() => {
      screen.getByText('Toggle').click();
    });

    expect(screen.getByText('Current: dark')).toBeInTheDocument();
    expect(localStorage.getItem('hk_portfolio_theme')).toBe('dark');

    act(() => {
      screen.getByText('Set Light').click();
    });

    expect(screen.getByText('Current: light')).toBeInTheDocument();

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(screen.getByText('Current: dark')).toBeInTheDocument();
  });

  it('throws an error if useTheme is used outside ThemeProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleErrorSpy.mockRestore();
  });
});
