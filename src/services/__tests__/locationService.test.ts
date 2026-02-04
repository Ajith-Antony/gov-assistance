import { fetchCountries, fetchStates } from '../locationService';

// Mock fetch
global.fetch = jest.fn();

// Mock console.error to suppress error logs in tests
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('locationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('fetchCountries', () => {
    it('should fetch countries successfully', async () => {
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
      expect(result[0].country).toBe('United States');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://countriesnow.space/api/v0.1/countries/iso'
      );
    });

    it('should return empty array on error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchCountries();

      expect(result).toEqual([]);
    });

    it('should return cached countries on second call', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({
          data: [{ country: 'Test', iso2: 'TS', iso3: 'TST' }]
        })
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await fetchCountries();
      const result = await fetchCountries();

      // Should only call fetch once due to caching
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
    });
  });

  describe('fetchStates', () => {
    it('should fetch states for a country', async () => {
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
      expect(result[0].name).toBe('California');
    });

    it('should return empty array on error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchStates('INVALID');

      expect(result).toEqual([]);
    });
  });
});
