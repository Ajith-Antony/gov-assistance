import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should set and get value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new value'));
  });

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('stored');
    });

    expect(localStorage.getItem('test-key')).toBeTruthy();

    act(() => {
      result.current[2]();
    });

    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle objects', () => {
    const { result } = renderHook(() => 
      useLocalStorage<{ name: string; age?: number }>('test-key', { name: 'test' })
    );

    act(() => {
      result.current[1]({ name: 'updated', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'updated', age: 25 });
  });
});
