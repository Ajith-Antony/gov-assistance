import { API_ENDPOINTS, TIMEOUTS, ERROR_CODES } from "../constants";

interface AIResponse {
  text?: string;
}

export async function generateAIText(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.AI_REQUEST);

  try {
    const response = await fetch(API_ENDPOINTS.AI_GENERATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(ERROR_CODES.AI_REQUEST_FAILED);
    }

    const data: AIResponse = await response.json();
    return data?.text || "";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(ERROR_CODES.AI_TIMEOUT);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
