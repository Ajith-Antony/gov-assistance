import { renderHook } from '@testing-library/react';
import useAppTranslation from '../useAppTranslation';
import { useParams } from 'react-router';

// Mock react-router
jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
      dir: jest.fn(() => 'ltr'),
    },
  }),
}));

describe('useAppTranslation', () => {
  it('should return translation function', () => {
    (useParams as jest.Mock).mockReturnValue({ lang: 'en' });

    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
  });

  it('should translate keys', () => {
    (useParams as jest.Mock).mockReturnValue({ lang: 'en' });

    const { result } = renderHook(() => useAppTranslation());

    const translation = result.current.t('common.home');
    expect(translation).toBe('common.home');
  });

  it('should work with different languages', () => {
    (useParams as jest.Mock).mockReturnValue({ lang: 'ar' });

    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.t).toBeDefined();
  });
});
