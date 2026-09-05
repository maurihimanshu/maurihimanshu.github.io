import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './useClipboard';

describe('useClipboard hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('copies text successfully and resets copied state after timeout', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useClipboard(1500));

    expect(result.current.copied).toBe(false);

    let success: boolean = false;
    await act(async () => {
      success = await result.current.copy('test message');
    });

    expect(success).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test message');
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.copied).toBe(false);
  });

  it('handles missing navigator.clipboard gracefully', async () => {
    const originalClipboard = navigator.clipboard;
    // @ts-expect-error - simulating unsupported clipboard
    delete navigator.clipboard;

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useClipboard());

    let success: boolean = true;
    await act(async () => {
      success = await result.current.copy('test');
    });

    expect(success).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Clipboard not supported');

    // Restore
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  it('handles writeText rejection gracefully', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useClipboard());

    let success: boolean = true;
    await act(async () => {
      success = await result.current.copy('fail test');
    });

    expect(success).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Copy failed', expect.any(Error));
  });
});
