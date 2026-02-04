import { render, screen } from '@testing-library/react';
import AutoSaveIndicator from '../AutoSaveIndicator';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AutoSaveIndicator', () => {
  it('should show saving status', () => {
    render(<AutoSaveIndicator status="saving" />);
    expect(screen.getByText('autoSave.saving')).toBeInTheDocument();
  });

  it('should show saved status', () => {
    render(<AutoSaveIndicator status="saved" />);
    expect(screen.getByText('autoSave.saved')).toBeInTheDocument();
  });

  it('should show error status', () => {
    render(<AutoSaveIndicator status="error" />);
    expect(screen.getByText('autoSave.error')).toBeInTheDocument();
  });

  it('should not render when status is idle', () => {
    const { container } = render(<AutoSaveIndicator status="idle" />);
    expect(container.firstChild).toBeNull();
  });
});
