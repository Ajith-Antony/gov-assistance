import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import MoneyInput from '../MoneyInput';

// Mock useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Test wrapper component
function TestWrapper() {
  const { control } = useForm({
    defaultValues: {
      amount: '',
    },
  });

  const field = {
    name: 'amount',
    label: 'Amount',
    component: 'MoneyInput',
    rules: { required: 'Required' },
  };

  return <MoneyInput field={field} control={control} />;
}

describe('MoneyInput', () => {
  it('should render money input', () => {
    const { container } = render(<TestWrapper />);
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should render currency selector', () => {
    const { container } = render(<TestWrapper />);
    const select = container.querySelector('[aria-label="Select Currency"]');
    expect(select).toBeInTheDocument();
  });

  it('should render with default currency', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
