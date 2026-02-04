import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useAutoSave from '../useAutoSave';

// Mock useLocalStorage
const mockSetValue = jest.fn();
jest.mock('../useLocalStorage', () => ({
  __esModule: true,
  default: jest.fn(() => [{}, mockSetValue, jest.fn()]),
}));

describe('useAutoSave', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should save data after debounce delay', async () => {
    const { rerender } = renderHook(
      ({ data }) => useAutoSave('test-key', data, true),
      { initialProps: { data: { name: 'test' } } }
    );

    expect(mockSetValue).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSetValue).toHaveBeenCalledWith({ name: 'test' });
  });

  it('should not save when disabled', () => {
    renderHook(() => useAutoSave('test-key', { name: 'test' }, false));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSetValue).not.toHaveBeenCalled();
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

    // Should not save yet
    expect(mockSetValue).not.toHaveBeenCalled();

    // Fast-forward past debounce time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should only save once with the latest value
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith({ count: 3 });
  });
});
