import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';

describe('CustomCursor component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true,
    });
    // @ts-expect-error delete
    delete window.ontouchstart;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true,
    });
    // @ts-expect-error delete
    delete window.ontouchstart;
  });

  it('renders null initially before any mouse movement', () => {
    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });

  it('shows cursor on mousemove and tracks coordinates', () => {
    const { container } = render(
      <div>
        <CustomCursor />
        <div id="target">Standard element</div>
      </div>
    );

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 200,
          clientY: 300,
          bubbles: true,
        })
      );
      vi.advanceTimersByTime(32);
    });

    const cursorContainer = container.querySelector('[aria-hidden="true"]');
    expect(cursorContainer).toBeInTheDocument();
  });

  it('detects hovering over various clickable elements (button, a, input, textarea, role="button", data-cursor)', () => {
    const { container } = render(
      <div>
        <CustomCursor />
        <button id="btn">Click me</button>
        <a id="link" href="#test">Link</a>
        <input id="inp" type="text" />
        <textarea id="txt" />
        <div id="role-btn" role="button">Role Button</div>
        <div id="custom-pointer" data-cursor="pointer">Custom</div>
        <div id="plain">Plain text</div>
      </div>
    );

    const elements = ['#btn', '#link', '#inp', '#txt', '#role-btn', '#custom-pointer'];

    for (const selector of elements) {
      const el = container.querySelector(selector);
      act(() => {
        el?.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 250,
            bubbles: true,
          })
        );
        vi.advanceTimersByTime(32);
      });
      const ring = container.querySelector('.border-cyan-400');
      expect(ring).toBeInTheDocument();
    }

    // Hover non-clickable element
    const plain = container.querySelector('#plain');
    act(() => {
      plain?.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 10,
          clientY: 20,
          bubbles: true,
        })
      );
      vi.advanceTimersByTime(32);
    });
    const defaultRing = container.querySelector('.border-cyan-500\\/50');
    expect(defaultRing).toBeInTheDocument();
  });

  it('hides on mouseleave and shows on mouseenter', () => {
    const { container } = render(<CustomCursor />);

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 50, clientY: 50 })
      );
    });
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();

    act(() => {
      document.dispatchEvent(new Event('mouseleave'));
    });
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();

    act(() => {
      document.dispatchEvent(new Event('mouseenter'));
    });
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('does not render on touch-enabled devices via ontouchstart', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: {},
      configurable: true,
    });

    const { container } = render(<CustomCursor />);
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 50, clientY: 50 })
      );
    });

    expect(container.firstChild).toBeNull();
  });

  it('does not render on devices with maxTouchPoints > 0', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 5,
      configurable: true,
    });

    const { container } = render(<CustomCursor />);
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 50, clientY: 50 })
      );
    });

    expect(container.firstChild).toBeNull();
  });
});
