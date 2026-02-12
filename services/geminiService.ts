
import { GoogleGenAI, Type } from "@google/genai";
import { SystemConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSystemRules = async (config: SystemConfig) => {
  const prompt = `
    Generate a set of "Model Rules" for a GEMINI.md persistent memory file on Windows 11.
    These rules help an AI agent (Gemini/Llama) better understand the user's specific Windows file system and environment.
    
    Environment Details:
    - WSL2 Enabled: ${config.wslEnabled ? 'Yes' : 'No'}
    - Primary Package Manager: ${config.packageManager}
    - Project Root: ${config.customProjectPath || 'Standard ($HOME/Projects)'}
    - Preferred Shell: ${config.defaultShell}

    The rules should focus on:
    1. Pathing conventions (Windows vs. Unix).
    2. Shell-specific command preferences (PowerShell vs. CMD).
    3. Package management guidance.
    4. Persistent memory logging instructions for the 'g' wrapper.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          rules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                rule: { type: Type.STRING },
                commandSnippet: { type: Type.STRING }
              },
              required: ["category", "rule"]
            }
          }
        },
        required: ["title", "description", "rules"]
      }
    }
  });

  return JSON.parse(response.text);
};
