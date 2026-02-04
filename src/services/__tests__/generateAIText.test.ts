import { generateAIText } from '../generateAIText';

// Mock fetch
global.fetch = jest.fn();

describe('generateAIText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
  });

  it('should throw error when API call fails', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Bad Request',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    await expect(generateAIText('Test prompt')).rejects.toThrow('Failed to generate text: Bad Request');
  });

  it('should throw error when network fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(generateAIText('Test prompt')).rejects.toThrow('Network error');
  });

  it('should include prompt in request body', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Response' } }],
      }),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    await generateAIText('Custom prompt');

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(callArgs[1].body);
    
    expect(requestBody.messages[0].content).toContain('Custom prompt');
  });
});
