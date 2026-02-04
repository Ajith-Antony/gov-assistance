import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormTwo from '../index';

// Mock i18n
jest.mock('../../../i18n', () => ({
  __esModule: true,
  default: {
    use: jest.fn().mockReturnThis(),
    init: jest.fn().mockReturnThis(),
    changeLanguage: jest.fn(),
    language: 'en',
  },
}));

// Mock useAppTranslation
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

// Mock useLocalStorage
jest.mock('../../../hooks/useLocalStorage', () => ({
  __esModule: true,
  default: () => ['', jest.fn()],
}));

describe('FormTwo', () => {
  it('should render form two page', () => {
    const { container } = render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormTwo />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render form elements', () => {
    const { container } = render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormTwo />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(container.firstChild).toBeTruthy();
  });
});
