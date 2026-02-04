import { situationFields } from '../helper';

describe('FormThree helper', () => {
  describe('situationFields', () => {
    it('should have all situation description fields', () => {
      const fieldNames = situationFields.map((f: any) => f.name);
      
      expect(fieldNames).toContain('financialSituation');
      expect(fieldNames).toContain('employmentCircumstances');
      expect(fieldNames).toContain('reasonForApplying');
    });

    it('should use TextAreaWithAI component', () => {
      situationFields.forEach((field: any) => {
        expect(field.component).toBe('TextAreaWithAI');
      });
    });

    it('should have required validation', () => {
      situationFields.forEach((field: any) => {
        expect(field.rules?.required).toBeDefined();
      });
    });

    it('should have minLength validation', () => {
      situationFields.forEach((field: any) => {
        expect(field.rules?.minLength).toBeDefined();
      });
    });
  });
});
