import { personalInfoFields } from '../helper';

describe('FormOne helper', () => {
  describe('personalInfoFields', () => {
    it('should have all required personal info fields', () => {
      const fieldNames = personalInfoFields.map((f: any) => f.name);
      
      expect(fieldNames).toContain('fullName');
      expect(fieldNames).toContain('nationalId');
      expect(fieldNames).toContain('dateOfBirth');
      expect(fieldNames).toContain('gender');
      expect(fieldNames).toContain('country');
      expect(fieldNames).toContain('state');
      expect(fieldNames).toContain('phone');
      expect(fieldNames).toContain('email');
    });

    it('should have required validation for fullName', () => {
      const fullNameField = personalInfoFields.find((f: any) => f.name === 'fullName');
      expect(fullNameField?.rules?.required).toBeDefined();
    });

    it('should have email type for email field', () => {
      const emailField = personalInfoFields.find((f: any) => f.name === 'email');
      expect(emailField?.type).toBe('email');
    });

    it('should have phone component for phone field', () => {
      const phoneField = personalInfoFields.find((f: any) => f.name === 'phone');
      expect(phoneField?.component).toBe('PhoneNumberInput');
    });

    it('should have CountryCitySelect component for country field', () => {
      const countryField = personalInfoFields.find((f: any) => f.name === 'country');
      expect(countryField?.component).toBe('CountryCitySelect');
    });
  });
});
