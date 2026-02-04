import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import TextAreaWithAI from '../TextAreaWithAI';

// Mock useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock generateAIText
jest.mock('../../../services/generateAIText', () => ({
  generateAIText: jest.fn().mockResolvedValue('AI generated text response'),
}));

// Test wrapper component
function TestWrapper() {
  const { control } = useForm({
    defaultValues: {
      description: '',
    },
  });

  const field = {
    name: 'description',
    label: 'Description',
    component: 'TextAreaWithAI',
    rules: { required: 'Required' },
  };

  return <TextAreaWithAI field={field} control={control} />;
}

describe('TextAreaWithAI', () => {
  it('should render textarea component', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render textarea input', () => {
    const { container } = render(<TestWrapper />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('should render with proper structure', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeTruthy();
  });
});
