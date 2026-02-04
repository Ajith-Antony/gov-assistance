import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import NavigationBar from '../index';

// Mock useAppTranslation
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
    language: 'en',
    dir: 'ltr',
    setLanguage: jest.fn(),
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

  it('should render AppBar component', () => {
    const { container } = renderWithRouter(<NavigationBar />);
    const appBar = container.querySelector('[class*="MuiAppBar"]');
    expect(appBar).toBeTruthy();
  });

  it('should render navigation element', () => {
    const { container } = renderWithRouter(<NavigationBar />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
