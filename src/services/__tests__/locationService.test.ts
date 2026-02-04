import axios from 'axios';
import { fetchCountries, fetchStates } from '../locationService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        data: {
          error: false,
          msg: 'countries retrieved',
          data: [
            { country: 'United States', iso2: 'US', iso3: 'USA' },
            { country: 'Canada', iso2: 'CA', iso3: 'CAN' },
          ]
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchCountries();

      expect(result).toEqual(mockResponse.data.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://countriesnow.space/api/v0.1/countries/iso'
      );
    });

    it('should return empty array on error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchCountries();

      expect(result).toEqual([]);
    });
  });

  describe('fetchStates', () => {
    it('should fetch states for a country', async () => {
      const mockResponse = {
        data: {
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
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await fetchStates('United States');

      expect(result).toEqual(mockResponse.data.data.states);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://countriesnow.space/api/v0.1/countries/states',
        { country: 'United States' }
      );
    });

    it('should return empty array on error', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchStates('Invalid Country');

      expect(result).toEqual([]);
    });
  });
});
