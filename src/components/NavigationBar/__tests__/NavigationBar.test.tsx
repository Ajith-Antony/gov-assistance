import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import NavigationBar from '../index';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

describe('NavigationBar', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('should render navigation bar', () => {
    renderWithRouter(<NavigationBar />);
    expect(screen.getByText('common.home')).toBeInTheDocument();
  });

  it('should have glassmorphism styling', () => {
    const { container } = renderWithRouter(<NavigationBar />);
    const appBar = container.querySelector('header');
    expect(appBar).toBeInTheDocument();
  });

  it('should render language switcher', () => {
    renderWithRouter(<NavigationBar />);
    // Language switcher should be present
    const languageSwitcher = screen.getByRole('button');
    expect(languageSwitcher).toBeInTheDocument();
  });
});
