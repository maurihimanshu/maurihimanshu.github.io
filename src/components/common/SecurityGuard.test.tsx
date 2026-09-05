import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SecurityGuard } from './SecurityGuard';
import { ThemeProvider } from '../../context/ThemeContext';

const renderGuard = (props = {}) => {
  return render(
    <ThemeProvider>
      <SecurityGuard {...props} />
    </ThemeProvider>
  );
};

describe('SecurityGuard component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('blocks right click and displays portfolio security toast with auto-hide', () => {
    renderGuard();

    const event = new MouseEvent('contextmenu', { cancelable: true, bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    act(() => {
      window.dispatchEvent(event);
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(screen.getByTestId('security-toast')).toBeInTheDocument();
    expect(screen.getByText('Right-click context menu is restricted on this portfolio.')).toBeInTheDocument();

    // Auto-hides after 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId('security-toast')).not.toBeInTheDocument();
  });

  it('allows dismissing security toast manually via button', () => {
    renderGuard();

    const event = new MouseEvent('contextmenu', { cancelable: true, bubbles: true });
    act(() => {
      window.dispatchEvent(event);
    });

    const dismissBtn = screen.getByLabelText('Dismiss security notice');
    expect(dismissBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(dismissBtn);
    });

    expect(screen.queryByTestId('security-toast')).not.toBeInTheDocument();
  });

  it('does not block right click when enableContextMenuBlock is false', () => {
    renderGuard({ enableContextMenuBlock: false });

    const event = new MouseEvent('contextmenu', { cancelable: true, bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    act(() => {
      window.dispatchEvent(event);
    });

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(screen.queryByTestId('security-toast')).not.toBeInTheDocument();
  });

  it('blocks developer tools keyboard shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)', () => {
    renderGuard();

    // F12
    const f12Event = new KeyboardEvent('keydown', { key: 'F12', cancelable: true });
    const f12Spy = vi.spyOn(f12Event, 'preventDefault');
    act(() => {
      window.dispatchEvent(f12Event);
    });
    expect(f12Spy).toHaveBeenCalled();
    expect(screen.getByText(/Source inspection and developer console shortcuts are restricted/i)).toBeInTheDocument();

    // Ctrl+Shift+I
    const inspectEvent = new KeyboardEvent('keydown', { key: 'I', ctrlKey: true, shiftKey: true, cancelable: true });
    const inspectSpy = vi.spyOn(inspectEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(inspectEvent);
    });
    expect(inspectSpy).toHaveBeenCalled();

    // Meta+Shift+J (Mac)
    const macInspectEvent = new KeyboardEvent('keydown', { key: 'j', metaKey: true, shiftKey: true, cancelable: true });
    const macInspectSpy = vi.spyOn(macInspectEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(macInspectEvent);
    });
    expect(macInspectSpy).toHaveBeenCalled();

    // Ctrl+Shift+C
    const elementInspectEvent = new KeyboardEvent('keydown', { key: 'C', ctrlKey: true, shiftKey: true, cancelable: true });
    const elementInspectSpy = vi.spyOn(elementInspectEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(elementInspectEvent);
    });
    expect(elementInspectSpy).toHaveBeenCalled();

    // Ctrl+U (View Source)
    const viewSourceEvent = new KeyboardEvent('keydown', { key: 'u', ctrlKey: true, cancelable: true });
    const viewSourceSpy = vi.spyOn(viewSourceEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(viewSourceEvent);
    });
    expect(viewSourceSpy).toHaveBeenCalled();

    // Meta+U (Mac View Source)
    const macViewSourceEvent = new KeyboardEvent('keydown', { key: 'U', metaKey: true, cancelable: true });
    const macViewSourceSpy = vi.spyOn(macViewSourceEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(macViewSourceEvent);
    });
    expect(macViewSourceSpy).toHaveBeenCalled();

    // Normal key (e.g. key 'A') should not be blocked
    const normalEvent = new KeyboardEvent('keydown', { key: 'A', cancelable: true });
    const normalSpy = vi.spyOn(normalEvent, 'preventDefault');
    act(() => {
      window.dispatchEvent(normalEvent);
    });
    expect(normalSpy).not.toHaveBeenCalled();
  });

  it('does not block shortcuts when enableDevToolsBlock is false', () => {
    renderGuard({ enableDevToolsBlock: false });

    const f12Event = new KeyboardEvent('keydown', { key: 'F12', cancelable: true });
    const f12Spy = vi.spyOn(f12Event, 'preventDefault');
    act(() => {
      window.dispatchEvent(f12Event);
    });

    expect(f12Spy).not.toHaveBeenCalled();
  });

  it('triggers browser beforeunload confirmation when enableBeforeUnload is true', () => {
    renderGuard();

    const beforeUnloadEvent = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    const preventDefaultSpy = vi.spyOn(beforeUnloadEvent, 'preventDefault');

    act(() => {
      window.dispatchEvent(beforeUnloadEvent);
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(beforeUnloadEvent.defaultPrevented).toBe(true);
  });

  it('does not trigger beforeunload confirmation when enableBeforeUnload is false', () => {
    renderGuard({ enableBeforeUnload: false });

    const beforeUnloadEvent = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    const preventDefaultSpy = vi.spyOn(beforeUnloadEvent, 'preventDefault');

    act(() => {
      window.dispatchEvent(beforeUnloadEvent);
    });

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const windowRemoveSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderGuard();
    unmount();

    expect(windowRemoveSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function));
    expect(windowRemoveSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(windowRemoveSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
});
