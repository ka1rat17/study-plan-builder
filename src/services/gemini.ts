/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStudyPlan(topic: string, goal: string, duration: string): Promise<StudyPlan> {
  const prompt = `Create a professional study plan for the topic: "${topic}". 
  The goal is: "${goal}". 
  The preferred duration is: "${duration}".
  
  The response must be in Kyrgyz language (labeling, titles, tips), but the structure must be technical and clear.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          targetGoal: { type: Type.STRING },
          overallDuration: { type: Type.STRING },
          modules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                duration: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["id", "title", "topics", "duration"]
            }
          },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "targetGoal", "overallDuration", "modules", "tips"]
      }
    }
  });

  return JSON.parse(response.text);
}
