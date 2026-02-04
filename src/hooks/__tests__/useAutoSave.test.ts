import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useAutoSave from '../useAutoSave';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useAutoSave', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockLocalStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should save data after debounce delay', async () => {
    const { result, rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, true),
      { initialProps: { data: { name: 'test' } } }
    );

    // Initial status should be idle
    expect(result.current).toBe('idle');

    // Trigger a change
    rerender({ data: { name: 'updated' } });

    // Should be saving
    expect(result.current).toBe('saving');

    // Fast-forward past debounce time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should be saved
    expect(result.current).toBe('saved');
    expect(mockLocalStorage.getItem('test-key')).toBe(JSON.stringify({ name: 'updated' }));
  });

  it('should not save when disabled', () => {
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, false),
      { initialProps: { data: { name: 'test' } } }
    );

    rerender({ data: { name: 'updated' } });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockLocalStorage.getItem('test-key')).toBeNull();
  });

  it('should debounce multiple updates', () => {
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, true),
      { initialProps: { data: { count: 0 } } }
    );

    // Update multiple times quickly
    rerender({ data: { count: 1 } });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    rerender({ data: { count: 2 } });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    rerender({ data: { count: 3 } });

    // Fast-forward past debounce time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should only save the latest value
    expect(mockLocalStorage.getItem('test-key')).toBe(JSON.stringify({ count: 3 }));
  });
});
