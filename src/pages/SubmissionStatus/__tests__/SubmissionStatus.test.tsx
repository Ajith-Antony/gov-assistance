import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import SubmissionStatus from '../index';

// Mock i18n module
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

describe('SubmissionStatus', () => {
  it('should render submission status page', () => {
    const { container } = render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    // Check that the component renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render success icon', () => {
    const { container } = render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    // Check for SVG icon
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have a go home button', () => {
    render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
