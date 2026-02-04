import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ErrorBoundary from '../index';

// Mock console.error to suppress error logs
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('ErrorBoundary', () => {
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render children when there is no error', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <div>Test Content</div>
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('should have a go home button in error state', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const { getByRole } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </BrowserRouter>
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
