// Mock fetch before importing the module
global.fetch = jest.fn();

// Mock console.error to suppress error logs in tests
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('locationService', () => {
  // Clear all mocks and reset modules before each test to clear cache
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('fetchCountries', () => {
    it('should fetch countries successfully', async () => {
      // Re-import to get fresh cache
      const { fetchCountries } = await import('../locationService');
      
      const mockResponse = {
        ok: true,
        json: async () => ({
          error: false,
          msg: 'countries retrieved',
          data: [
            { country: 'United States', iso2: 'US', iso3: 'USA' },
            { country: 'Canada', iso2: 'CA', iso3: 'CAN' },
          ]
        })
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchCountries();

      expect(result).toHaveLength(2);
      expect(result[0]?.country).toBe('United States');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://countriesnow.space/api/v0.1/countries'
      );
    });

    it('should return empty array on fetch failure', async () => {
      const { fetchCountries } = await import('../locationService');
      
      const mockResponse = {
        ok: false,
        statusText: 'Not Found',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchCountries();

      expect(result).toEqual([]);
    });
  });

  describe('fetchStates', () => {
    it('should fetch states for a country', async () => {
      const { fetchStates } = await import('../locationService');
      
      const mockResponse = {
        ok: true,
        json: async () => ({
          error: false,
          msg: 'states retrieved',
          data: {
            name: 'United States',
            iso3: 'USA',
            states: [
              { name: 'California', state_code: 'CA' },
              { name: 'Texas', state_code: 'TX' },
            ]
          }
        })
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchStates('US');

      expect(result).toHaveLength(2);
      expect(result[0]?.name).toBe('California');
    });

    it('should return empty array on fetch failure', async () => {
      const { fetchStates } = await import('../locationService');
      
      const mockResponse = {
        ok: false,
        statusText: 'Not Found',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchStates('INVALID');

      expect(result).toEqual([]);
    });
  });
});
