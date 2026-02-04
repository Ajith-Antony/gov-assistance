import { render } from '@testing-library/react';
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
  it('should render money input component', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render currency selector', () => {
    const { container } = render(<TestWrapper />);
    // Check for Select component by looking for the currency label
    const label = container.querySelector('#currency-label');
    expect(label).toBeTruthy();
  });

  it('should render input field', () => {
    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });
});
