import OpenAI from "openai";

const apiKey = "";

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export const getTieLearn OllamaResponse = async (prompt) => {
  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "You are an expert on TieLearn  platform and online learning. Be concise and helpful." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });
    const response = completion.choices[0].message.content.trim();
    return response;
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    throw error;
  }
};
