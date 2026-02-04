import { generateAIText } from '../generateAIText';

// Mock fetch
global.fetch = jest.fn();

// Mock console.error
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('generateAIText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should generate AI text successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'Generated AI text response',
            },
          },
        ],
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await generateAIText('Test prompt');

    expect(result).toBe('Generated AI text response');
  });

  it('should throw error when API call fails', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Bad Request',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    await expect(generateAIText('Test prompt')).rejects.toThrow();
  });

  it('should throw error when network fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(generateAIText('Test prompt')).rejects.toThrow();
  });
});
