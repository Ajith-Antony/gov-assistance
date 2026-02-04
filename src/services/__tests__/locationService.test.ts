import axios from 'axios';
import { fetchCountries, fetchStates } from '../locationService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('locationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCountries', () => {
    it('should fetch countries successfully', async () => {
      const mockResponse = {
        data: {
          data: [
            { country: 'United States', iso2: 'US' },
            { country: 'Canada', iso2: 'CA' },
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
          data: {
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
