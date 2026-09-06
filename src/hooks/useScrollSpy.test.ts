import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from './useScrollSpy';

describe('useScrollSpy hook', () => {
  let sec1: HTMLDivElement;
  let sec2: HTMLDivElement;

  beforeEach(() => {
    sec1 = document.createElement('div');
    sec1.id = 'hero';
    Object.defineProperty(sec1, 'offsetTop', { value: 0, configurable: true });
    document.body.appendChild(sec1);

    sec2 = document.createElement('div');
    sec2.id = 'about';
    Object.defineProperty(sec2, 'offsetTop', { value: 500, configurable: true });
    document.body.appendChild(sec2);

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    if (document.body.contains(sec1)) document.body.removeChild(sec1);
    if (document.body.contains(sec2)) document.body.removeChild(sec2);
  });

  it('initializes with the first section', () => {
    const { result } = renderHook(() => useScrollSpy(['hero', 'about']));
    expect(result.current).toBe('hero');
  });

  it('updates active section on scroll and ignores identical updates', () => {
    const { result } = renderHook(() => useScrollSpy(['hero', 'about'], 100));

    // Scroll to about (updates from hero to about)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 450, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('about');

    // Scroll again while remaining in about (exercises currentActive === id branch)
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('about');

    // Scroll back before all elements (exercises currentActive !== sectionIds[0] branch)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: -200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('hero');
  });

  it('defaults to first section if scrolled before elements', () => {
    const { result } = renderHook(() => useScrollSpy(['hero', 'about'], 0));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: -50, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('hero');
  });

  it('handles empty section array', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });
});
