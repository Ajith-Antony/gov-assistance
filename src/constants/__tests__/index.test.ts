import { STORAGE_KEYS, ROUTES, STEPS, LANGUAGES, SUPPORTED_LANGUAGES, TIMEOUTS, AUTO_SAVE_STATUS, API_ENDPOINTS } from '../index';

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

  describe('LANGUAGES', () => {
    it('should have English and Arabic', () => {
      expect(LANGUAGES.ENGLISH).toBe('en');
      expect(LANGUAGES.ARABIC).toBe('ar');
    });

    it('should have supported languages array', () => {
      expect(SUPPORTED_LANGUAGES).toContain('en');
      expect(SUPPORTED_LANGUAGES).toContain('ar');
      expect(SUPPORTED_LANGUAGES.length).toBe(2);
    });
  });

  describe('TIMEOUTS', () => {
    it('should have AUTO_SAVE_DEBOUNCE timeout', () => {
      expect(TIMEOUTS.AUTO_SAVE_DEBOUNCE).toBeDefined();
      expect(typeof TIMEOUTS.AUTO_SAVE_DEBOUNCE).toBe('number');
    });
  });

  describe('AUTO_SAVE_STATUS', () => {
    it('should have all status values', () => {
      expect(AUTO_SAVE_STATUS.IDLE).toBe('idle');
      expect(AUTO_SAVE_STATUS.SAVING).toBe('saving');
      expect(AUTO_SAVE_STATUS.SAVED).toBe('saved');
      expect(AUTO_SAVE_STATUS.ERROR).toBe('error');
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have COUNTRIES endpoint', () => {
      expect(API_ENDPOINTS.COUNTRIES).toBeDefined();
      expect(typeof API_ENDPOINTS.COUNTRIES).toBe('string');
    });

    it('should have STATES endpoint', () => {
      expect(API_ENDPOINTS.STATES).toBeDefined();
      expect(typeof API_ENDPOINTS.STATES).toBe('string');
    });
  });
});
