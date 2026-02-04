import { render, screen, fireEvent } from '@testing-library/react';
import FormNavigationButtons from '../FormNavigationButtons';

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
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
        isLastStep={false}
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
        isLastStep={false}
      />
    );

    expect(screen.getByText('common.back')).toBeInTheDocument();
  });

  it('should render submit button on last step', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={true}
        isLastStep={true}
      />
    );

    expect(screen.getByText('common.submit')).toBeInTheDocument();
  });

  it('should call onNext when next button is clicked', () => {
    render(
      <FormNavigationButtons
        onBack={mockOnBack}
        onNext={mockOnNext}
        showBackButton={false}
        isLastStep={false}
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
        isLastStep={false}
      />
    );

    fireEvent.click(screen.getByText('common.back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
