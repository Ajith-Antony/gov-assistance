import { familyFinancialFields } from '../helper';

describe('FormTwo helper', () => {
  describe('familyFinancialFields', () => {
    it('should have all required financial fields', () => {
      const fieldNames = familyFinancialFields.map((f: any) => f.name);
      
      expect(fieldNames).toContain('maritalStatus');
      expect(fieldNames).toContain('dependents');
      expect(fieldNames).toContain('employmentStatus');
      expect(fieldNames).toContain('monthlyIncome');
      expect(fieldNames).toContain('housingStatus');
    });

    it('should have select component for maritalStatus', () => {
      const maritalField = familyFinancialFields.find((f: any) => f.name === 'maritalStatus');
      expect(maritalField?.component).toBe('Select');
    });

    it('should have MoneyInput component for monthlyIncome', () => {
      const incomeField = familyFinancialFields.find((f: any) => f.name === 'monthlyIncome');
      expect(incomeField?.component).toBe('MoneyInput');
    });

    it('should have required validation for key fields', () => {
      const maritalField = familyFinancialFields.find((f: any) => f.name === 'maritalStatus');
      expect(maritalField?.rules?.required).toBeDefined();
    });
  });
});
