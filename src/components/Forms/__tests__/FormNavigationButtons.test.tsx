import { render, screen, fireEvent } from '@testing-library/react';
import FormNavigationButtons from '../FormNavigationButtons';

// Mock useAppTranslation
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

describe('FormNavigationButtons', () => {
  const mockOnBack = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render next button', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={false}
      />
    );

    expect(screen.getByText('common.next')).toBeInTheDocument();
  });

  it('should render back button when showBackButton is true', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={true}
      />
    );

    expect(screen.getByText('common.back')).toBeInTheDocument();
  });

  it('should render custom button text', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={true}
        nextButtonText="custom.next"
        backButtonText="custom.back"
      />
    );

    expect(screen.getByText('custom.next')).toBeInTheDocument();
    expect(screen.getByText('custom.back')).toBeInTheDocument();
  });

  it('should call onNext when next button is clicked', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={false}
      />
    );

    fireEvent.click(screen.getByText('common.next'));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('should call onBack when back button is clicked', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={true}
      />
    );

    fireEvent.click(screen.getByText('common.back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('should not render back button when showBackButton is false', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={false}
      />
    );

    expect(screen.queryByText('common.back')).not.toBeInTheDocument();
  });
});
