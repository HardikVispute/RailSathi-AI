import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API Key is not configured." }, { status: 500 });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const systemPrompt = `
      You are RailSathi AI, an intelligent Indian Railway travel assistant.
      Answer railway travel questions professionally with a government-tech, helpful tone.
      
      You MUST return your response ONLY as a valid JSON object matching the exact structure below. 
      Do not include markdown blocks like \`\`\`json or any other text outside the JSON.
      
      {
        "journeySummary": "A brief, encouraging summary of the trip or answer.",
        "suggestedTrains": ["Train Name 1 (Train Number)", "Train Name 2 (Train Number)"],
        "estimatedDuration": "X hours Y minutes",
        "travelTips": ["Tip 1", "Tip 2", "Tip 3"],
        "alternativeRoutes": ["Alternative 1", "Alternative 2"],
        "passengerGuidance": "Specific advice regarding the user's situation (e.g., traveling with seniors, delays)."
      }

      User Query: "${prompt}"
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    // Parse to ensure it's valid JSON before sending to client
    const parsedData = JSON.parse(responseText);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request. Please try again." },
      { status: 500 }
    );
  }
}