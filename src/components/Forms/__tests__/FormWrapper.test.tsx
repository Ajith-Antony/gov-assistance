import { render, screen } from '@testing-library/react';
import FormWrapper from '../FormWrapper';

// Mock useAppTranslation
jest.mock('../../../hooks/useAppTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => key,
  }),
}));

describe('FormWrapper', () => {
  const mockOnBack = jest.fn();
  const mockOnNext = jest.fn();

  it('should render form wrapper with children', () => {
    render(
      <FormWrapper
        title="Test Form"
        step={1}
        totalSteps={3}
        onBack={mockOnBack}
        onNext={mockOnNext}
      >
        <div>Form Content</div>
      </FormWrapper>
    );

    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  it('should render title', () => {
    render(
      <FormWrapper
        title="Test Form"
        step={1}
        totalSteps={3}
        onBack={mockOnBack}
        onNext={mockOnNext}
      >
        <div>Content</div>
      </FormWrapper>
    );

    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });
});
