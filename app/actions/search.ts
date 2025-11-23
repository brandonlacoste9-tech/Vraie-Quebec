"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function searchVenuesAction(query: string, language: "FR" | "EN" = "FR") {
  if (!query || query.trim().length === 0) {
    return { venues: [], summary: "" }
  }

  const { data: venues } = await supabase
    .from("venues")
    .select("id, name, category, description, tags, location, price")

  if (!venues) {
    return { venues: [], summary: "Erreur de base de données." }
  }

  // Use AI to filter and rank venues based on the slang/natural language query
  const prompt = `
    You are a local expert guide for Montreal Nightlife called "Vrai Québec".
    You speak strict Quebecois French slang if the user asks in French, or English with some local flavor if in English.
    
    User Query: "${query}"
    Language: ${language}

    Available Venues:
    ${JSON.stringify(venues)}

    Task:
    1. Analyze the user's query (which may be in Quebecois slang like "chiller", "prendre un verre", "spot malade").
    2. Select the top 3-5 venues that best match the vibe, location, price, and time.
    3. Return a JSON object with:
       - "matches": array of venue IDs
       - "summary": a brief, edgy, localized explanation of why these spots are the best choice (max 2 sentences).

    Output strictly JSON.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    // Extract JSON from potential markdown code blocks
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
    const result = JSON.parse(cleanedText)

    return {
      venueIds: result.matches || [],
      summary: result.summary || "",
    }
  } catch (error) {
    console.error("AI Search Error:", error)
    return { venueIds: [], summary: "Désolé, le système est down. Réessaye plus tard." }
  }
}
