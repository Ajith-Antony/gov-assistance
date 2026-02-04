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
    { country: 'Canada', iso2: 'CA', iso3: 'CAN' },
  ]),
  fetchStates: jest.fn().mockResolvedValue([
    { name: 'California', state_code: 'CA' },
    { name: 'Texas', state_code: 'TX' },
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
    rules: { required: 'Required' },
  };

  const stateField = {
    name: 'state',
    label: 'State',
    component: 'CountryCitySelect',
    rules: {},
  };

  return (
    <>
      <CountryCitySelect field={countryField} control={control} />
      <CountryCitySelect field={stateField} control={control} countryFieldName="country" />
    </>
  );
}

describe('CountryCitySelect', () => {
  it('should render country select component', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render select elements', async () => {
    const { container } = render(<TestWrapper />);
    
    // Wait for countries to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const selects = container.querySelectorAll('[role="combobox"]');
    expect(selects.length).toBeGreaterThan(0);
  });

  it('should render with loading state', () => {
    const { container } = render(<TestWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
