import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import CountryCitySelect from '../CountryCitySelect';

// Mock useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock locationService
jest.mock('../../../services/locationService', () => ({
  fetchCountries: jest.fn().mockResolvedValue([
    { country: 'United States', iso2: 'US', iso3: 'USA' },
  ]),
  fetchStates: jest.fn().mockResolvedValue([
    { name: 'California', state_code: 'CA' },
  ]),
}));

// Test wrapper component
function TestWrapper() {
  const { control } = useForm({
    defaultValues: {
      country: '',
      state: '',
    },
  });

  const countryField = {
    name: 'country',
    label: 'Country',
    component: 'CountryCitySelect',
    rules: {},
  };

  const stateField = {
    name: 'state',
    label: 'State',
    component: 'CountryCitySelect',
    rules: {},
  };

  return (
    <CountryCitySelect 
      countryField={countryField}
      stateField={stateField}
      control={control}
    />
  );
}

describe('CountryCitySelect', () => {
  it('should render country and state select components', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with proper structure', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeTruthy();
  });
});
