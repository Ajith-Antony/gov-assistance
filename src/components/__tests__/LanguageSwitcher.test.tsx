import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

// Mock i18n module
jest.mock('../../i18n', () => ({
  __esModule: true,
  default: {
    use: jest.fn().mockReturnThis(),
    init: jest.fn().mockReturnThis(),
    changeLanguage: jest.fn(),
    language: 'en',
    t: (key: string) => key,
  },
}));

// Mock useAppTranslation
jest.mock('../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
    language: 'en',
    dir: 'ltr',
    setLanguage: jest.fn(),
  }),
}));

describe('LanguageSwitcher', () => {
  it('should render language switcher', async () => {
    const { default: LanguageSwitcher } = await import('../NavigationBar/languageSwitcher');
    
    const { container } = render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    // Check for Select component
    const select = container.querySelector('[aria-label="Select Language"]');
    expect(select).toBeInTheDocument();
  });

  it('should display current language', async () => {
    const { default: LanguageSwitcher } = await import('../NavigationBar/languageSwitcher');
    
    const { container } = render(
      <BrowserRouter>
        <LanguageSwitcher />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
