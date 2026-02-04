import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Home from '../index';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      dir: jest.fn(() => 'ltr'),
    },
  }),
}));

describe('Home', () => {
  it('should render home page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('home.title')).toBeInTheDocument();
  });

  it('should render apply button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /common.applyButton/i });
    expect(button).toBeInTheDocument();
  });

  it('should render welcome message', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('common.welcome')).toBeInTheDocument();
  });
});
