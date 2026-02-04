import { render, screen } from '@testing-library/react';
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
  it('should render phone input', () => {
    const { container } = render(<TestWrapper />);
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should render country code selector', () => {
    const { container } = render(<TestWrapper />);
    const selects = container.querySelectorAll('select');
    expect(selects.length).toBeGreaterThan(0);
  });

  it('should render input field', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
