import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Home from '../index';

// Mock useAppTranslation
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

describe('Home', () => {
  it('should render home page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for any text content
    expect(screen.getByText('common.welcome')).toBeInTheDocument();
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
