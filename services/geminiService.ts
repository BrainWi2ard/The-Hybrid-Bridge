
import { GoogleGenAI, Type } from "@google/genai";
import { SystemConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSystemRules = async (config: SystemConfig) => {
  const prompt = `
    Act as a World-Class Windows Systems Architect. Generate a set of "Model Rules" for a GEMINI.md persistent memory file on Windows 11.
    
    Environment Context:
    - WSL2 Status: ${config.wslEnabled ? 'Enabled (Ubuntu/Debian usually)' : 'Disabled'}
    - Package Manager: ${config.packageManager}
    - Root Directory: ${config.customProjectPath || '$HOME/Projects'}
    - Primary Shell: ${config.defaultShell}

    Requirements for Rule Generation:
    ${config.includePathRules ? '1. Add Windows Path Rules: Handling of AppData, LocalAppData, System32, and User Profile paths.' : ''}
    ${config.includeCommandRules ? '2. Add Shell Command Rules: Preferred PowerShell aliases (e.g., using "gci" instead of "ls") and script execution policies.' : ''}
    ${config.includeWSLRules && config.wslEnabled ? '3. Add WSL Path Rules: Specific mapping instructions for /mnt/c/ to C:\\ and vice versa.' : ''}
    ${config.refineLogging ? '4. Refine Logging Instructions: Strict templates for the Observation -> Thought -> Action loop in GEMINI.md.' : ''}
    5. Add Package Manager Rules: Specific flags for ${config.packageManager} to ensure non-interactive, automated installs.

    Ensure output is a valid JSON object matching the requested schema.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are an expert at configuring Windows 11 developer environments and AI agent workflows. Your rules should be technical, precise, and optimized for LLM consumption in a markdown file.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          logTemplate: { type: Type.STRING, description: "A markdown template for logging tasks in GEMINI.md" },
          rules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                rule: { type: Type.STRING },
                commandSnippet: { type: Type.STRING },
                importance: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
              },
              required: ["category", "rule", "importance"]
            }
          }
        },
        required: ["title", "description", "rules", "logTemplate"]
      }
    }
  });

  return JSON.parse(response.text);
};
