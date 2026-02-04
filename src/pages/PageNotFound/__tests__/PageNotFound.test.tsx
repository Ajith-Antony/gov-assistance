import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import PageNotFound from '../index';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
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
