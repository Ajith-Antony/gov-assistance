import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import PageNotFound from '../index';

// Mock i18n module before importing PageNotFound
jest.mock('../../../i18n', () => ({
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
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

describe('PageNotFound', () => {
  it('should render 404 page', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('pageNotFound.code')).toBeInTheDocument();
    expect(screen.getByText('pageNotFound.title')).toBeInTheDocument();
  });

  it('should have a go home button', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('pageNotFound.goHome');
  });

  it('should render description', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('pageNotFound.description')).toBeInTheDocument();
  });
});
