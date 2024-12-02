import { useState } from "react";
import { DataPredictionPromptSettings } from "~/types/AI";

const useOpenAI = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletion = async (configuration: DataPredictionPromptSettings) => {
    setLoading(true);
    setError(null);
    try {
      // Call the internal Remix API endpoint
      const response = await fetch("/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: configuration.prompt,
          model: "gpt-4o-mini", // Fallback to default model if not provided
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      //TODO this needs to be refactored, just something quick to get it working
      const choice = data.choices[0].message.content ?? "There wasn't a response from the AI.";
      setResult(choice);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching the completion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, fetchCompletion };
};

export default useOpenAI;

