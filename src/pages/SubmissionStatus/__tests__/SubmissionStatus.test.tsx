import { render } from '@testing-library/react';
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

// Mock crypto.randomUUID
global.crypto = {
  randomUUID: () => 'test-uuid-1234',
} as any;

describe('SubmissionStatus', () => {
  it('should render submission status page', () => {
    const { container } = render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render success icon', () => {
    const { container } = render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render button', () => {
    const { container } = render(
      <BrowserRouter>
        <SubmissionStatus />
      </BrowserRouter>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });
});
