import { STORAGE_KEYS, ROUTES, STEPS } from '../index';

describe('constants', () => {
  describe('STORAGE_KEYS', () => {
    it('should have APPLICATION_DATA key', () => {
      expect(STORAGE_KEYS.APPLICATION_DATA).toBe('gov-support-application-data');
    });

    it('should have AUTH_TOKEN key', () => {
      expect(STORAGE_KEYS.AUTH_TOKEN).toBe('gov-support-auth-token');
    });

    it('should have REFRESH_TOKEN key', () => {
      expect(STORAGE_KEYS.REFRESH_TOKEN).toBe('gov-support-refresh-token');
    });
  });

  describe('ROUTES', () => {
    it('should have HOME route', () => {
      expect(ROUTES.HOME).toBe('/:lang/home');
    });

    it('should have APPLY routes', () => {
      expect(ROUTES.APPLY_STEP).toBe('/:lang/apply/:step');
      expect(ROUTES.APPLY_DONE).toBe('/:lang/apply/done');
    });

    it('should have ROOT route', () => {
      expect(ROUTES.ROOT).toBe('/');
    });
  });

  describe('STEPS', () => {
    it('should have step identifiers', () => {
      expect(STEPS.FIRST).toBe('first');
      expect(STEPS.SECOND).toBe('second');
      expect(STEPS.THIRD).toBe('third');
    });
  });
});
