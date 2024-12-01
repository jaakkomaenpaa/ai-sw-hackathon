import { type OpenAI } from "openai";
import { useState } from "react";
import { DataPredictionPromptSettings } from "~/types/AI";


const useOpenAI = (openAI?: OpenAI) => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!openAI) {
    throw new Error("OpenAI instance is required.");
  }

  const fetchCompletion = async (configuration: DataPredictionPromptSettings) => {
    setLoading(true);
    setError(null);
    try {
      const completion = await openAI.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: configuration.model },
          { role: "user", content: configuration.prompt },
        ],
      });

      setResult(completion.choices[0]?.message?.content || "No response");
    } catch (err) {
      setError("An error occurred while fetching the completion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, fetchCompletion };
};

export default useOpenAI;
