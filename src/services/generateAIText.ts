import axiosInstance from "./api/interceptors";
import { API_ENDPOINTS, TIMEOUTS, ERROR_CODES } from "../constants";
import type { AxiosError } from "axios";

interface AIResponse {
  text?: string;
}

export async function generateAIText(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.AI_REQUEST);

  try {
    const response = await axiosInstance.post<AIResponse>(
      API_ENDPOINTS.AI_GENERATE,
      { prompt },
      {
        signal: controller.signal,
        timeout: TIMEOUTS.AI_REQUEST,
      }
    );

    return response.data?.text || "";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(ERROR_CODES.AI_TIMEOUT);
    }
    
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error(ERROR_CODES.AI_REQUEST_FAILED);
    }
    
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
