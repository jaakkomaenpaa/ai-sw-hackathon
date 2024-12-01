import OpenAI from "openai";
import { ActionFunctionArgs } from "react-router";
import { PredictDataPrompt } from "~/constants";

// Create an OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your `.env` file!!
});

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { prompt, model = "gpt-4o-mini", messages } = body;

    if (!prompt && !messages) {
      throw new Error("Either 'prompt' or 'messages' is required.");
    }

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages || [
        { role: "system", content: PredictDataPrompt },
        { role: "user", content: prompt },
      ],
    });

    // Return the OpenAI API response
    return new Response(JSON.stringify(completion))
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return new Response(JSON.stringify({
      error: "Failed to process the request. See server logs for details.",
      status: 500
    }));
  }
}

