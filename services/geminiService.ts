import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  // strictly use process.env.API_KEY as per security guidelines
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("API Key is missing. Check your Netlify Environment Variables.");
}

const genAI = new GoogleGenAI(apiKey);
  return ai;
};

export const sendMessageToGemini = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  // Check if key is available without exposing it
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing. AI features are disabled.");
    return "DEMO_MODE: The AI assistant is currently offline. Please configure the API_KEY in your environment variables to enable live chat.";
  }

  const genAI = getAI();
  if (!genAI) {
    return "System Error: Could not initialize AI client.";
  }

  try {
    const model = 'gemini-3-flash-preview'; 
    
    // Create a context string from history
    const conversationContext = history.map(h => `${h.role === 'user' ? 'Customer' : 'Assistant'}: ${h.text}`).join('\n');
    const prompt = `
    ${conversationContext}
    Customer: ${userMessage}
    Assistant:
    `;

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the fleet database right now.";
  }
};
