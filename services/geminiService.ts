import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// 1. Initialize once to save resources
let genAIInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (genAIInstance) return genAIInstance;

  // 2. Vite uses import.meta.env to access variables.
  // We check for the VITE_ version first.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("CRITICAL: Gemini API Key is missing! Check Netlify Env Vars.");
    return null;
  }

  genAIInstance = new GoogleGenAI(apiKey);
  return genAIInstance;
};

export const sendMessageToGemini = async (
  userMessage: string, 
  history: {role: 'user' | 'model', text: string}[]
): Promise<string> => {
  
  const genAI = getAI();
  
  // 3. Graceful fallback if the key is missing
  if (!genAI) {
    return "The AI assistant is currently offline. (API Key missing in environment)";
  }

  try {
    // Use the latest stable model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION 
    });

    // 4. Correct way to send history to the SDK
    const chat = model.startChat({
      history: history.map(item => ({
        role: item.role,
        parts: [{ text: item.text }],
      })),
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the fleet database right now. Please try again later.";
  }
};
