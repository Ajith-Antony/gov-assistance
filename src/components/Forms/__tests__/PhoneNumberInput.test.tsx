import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import PhoneNumberInput from '../PhoneNumberInput';

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
      phone: '',
    },
  });

  const field = {
    name: 'phone',
    label: 'Phone Number',
    component: 'PhoneNumberInput',
    rules: { required: 'Required' },
  };

  return <PhoneNumberInput field={field} control={control} />;
}

describe('PhoneNumberInput', () => {
  it('should render phone input component', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render country code selector', () => {
    const { container } = render(<TestWrapper />);
    // Check for MUI Select component
    const select = container.querySelector('[role="combobox"]');
    expect(select).toBeTruthy();
  });

  it('should render input field', () => {
    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });
});
