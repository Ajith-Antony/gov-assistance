export async function generateAIText(prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("AI_REQUEST_FAILED");
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "";
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("AI_TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
