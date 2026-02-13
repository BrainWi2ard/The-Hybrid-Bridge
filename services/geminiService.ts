
import { GoogleGenAI, Type } from "@google/genai";
import { SystemConfig, RuleSet } from "../types";

export const generateSystemRules = async (config: SystemConfig): Promise<RuleSet> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a comprehensive "Model Rules" ruleset for a Windows 11 Agentic Layer. 
    The rules will be stored in a file called GEMINI.md in the project root to provide persistent memory for AI agents.

    ENVIRONMENT:
    - Primary OS: Windows 11
    - WSL2: ${config.wslEnabled ? 'Enabled' : 'Disabled'}
    - Package Manager: ${config.packageManager}
    - Shell: ${config.defaultShell}
    - Persona: ${config.aiPersona}
    - Security Level: ${config.securityStrictness}

    SPECIFIC REQUIREMENTS:
    1. Windows Path Rules: Detail how to handle $env:USERPROFILE, $env:APPDATA, and $env:LOCALAPPDATA. Emphasize using environment variables over hardcoded C:\Users\ paths.
    2. Shell Command Rules: Define preferred aliases for ${config.defaultShell}. For PowerShell, suggest 'gci' over 'ls', 'select' over 'awk' equivalent, etc. Include execution policy safety.
    3. WSL Path Rules: ${config.wslEnabled ? 'Define mapping rules between /mnt/c/ (Linux) and C:\\ (Windows). Explain how to use "wslpath" to translate paths on the fly.' : 'N/A'}
    4. Package Manager Rules: Provide standard command patterns for ${config.packageManager} (e.g., non-interactive flags like '-y' or '--silent').
    5. Refined Logging: Create a specific O-T-A (Observation, Thought, Action) markdown template for GEMINI.md entries.
    6. Key Improvements: Add rules for "Context Window Stewardship" (summarizing logs when they exceed 100 entries).

    The output MUST be a JSON object adhering to the specified schema.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are a Principal DevOps Engineer and AI Architect. You specialize in Windows 11 automation and LLM-integrated workflows. 
      Your tone should be ${config.aiPersona === 'hacker' ? 'concise and technical' : config.aiPersona === 'architect' ? 'structured and authoritative' : 'helpful and clear'}.
      Generate rules that are machine-readable and highly effective for an AI agent to follow.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          logTemplate: { type: Type.STRING, description: "A markdown template for logging tasks." },
          initScript: { type: Type.STRING, description: "A shell script to initialize the environment." },
          rules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                rule: { type: Type.STRING },
                commandSnippet: { type: Type.STRING },
                importance: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
                contextTip: { type: Type.STRING }
              },
              required: ["category", "rule", "importance"]
            }
          }
        },
        required: ["title", "description", "rules", "logTemplate", "initScript"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from Gemini");
  return JSON.parse(text) as RuleSet;
};
