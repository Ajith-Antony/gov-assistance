interface AIResponse {
  text?: string;
}

export async function generateAIText(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(
      "https://ai-microservice-gamma.vercel.app/api/generate.js",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error("AI_REQUEST_FAILED");
    }

    const data: AIResponse = await response.json();
    return data?.text || "";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("AI_TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
