import { NextResponse } from "next/server"
import { writeFileSync } from "fs"
import { join } from "path"

const CACHE_PATH = join(process.cwd(), "lib", "data", "cached-quebec.json")

/**
 * POST /api/quebec-refresh
 * Refreshes Vrai Quebec data via DeepSeek AI
 */
export async function POST(request: Request) {
  // Check secret if configured
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const { searchParams } = new URL(request.url)
    if (searchParams.get("secret") !== cronSecret) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "DEEPSEEK_API_KEY not configured" },
      { status: 500 }
    )
  }

  try {
    console.log("[Quebec Refresh] Generating fresh data...")
    
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Generate Vrai Quebec tourism/lifestyle data. Return ONLY valid JSON.

Generate diverse venues covering:
- Restaurants (Quebecois, French, International)
- Hotels (Luxury, Boutique, Historic)
- Bars & Cafés (Cocktail, Wine, Coffee)
- Churches & Cathedrals (Historic, Gothic)
- Tourist Attractions (Nature, Historic sites, Viewpoints)
- Museums (Art, History, Science)
- Shopping (Markets, Local artisans)

Include Montreal AND Quebec City venues.

JSON format:
{
  "venues": [{
    id: string,
    name: string,
    type: "restaurant" | "hotel" | "bar" | "cafe" | "church" | "attraction" | "museum" | "shopping" | "nature" | "historic",
    category: string,
    city: "Montreal" | "Quebec City",
    neighborhood: { fr: string, en: string },
    address: string,
    description: { fr: string, en: string },
    rating: number (3.5-5.0),
    reviewCount: number,
    price: 1-4,
    priceDisplay: "$" | "$$" | "$$$" | "$$$$",
    image: "unsplash URL",
    website?: string,
    hours?: { fr: string, en: string },
    features: string[],
    tags: { fr: string[], en: string[] },
    isFeatured: boolean,
    isOpen?: boolean,
    bookingType?: "reservation" | "ticket" | "none"
  }],
  "events": [{
    id: string,
    title: { fr: string, en: string },
    venueId: string,
    venueName: string,
    type: "food" | "culture" | "music" | "art" | "festival" | "tour",
    date: "YYYY-MM-DD",
    time?: string,
    description: { fr: string, en: string },
    price: { fr: string, en: string },
    image: "unsplash URL",
    isFeatured: boolean
  }]
}

Rules:
- 15+ diverse venues across all categories
- Mix of Montreal and Quebec City
- Authentic descriptions in Québécois French
- Real neighborhood names
- Unsplash image URLs
- Some featured venues`,
          },
          {
            role: "user",
            content: `Generate Vrai Quebec data for ${new Date().toISOString().split("T")[0]}`,
          },
        ],
        temperature: 0.8,
        max_tokens: 6000,
      }),
    })

    if (!response.ok) throw new Error(`DeepSeek error: ${response.status}`)

    const data = await response.json()
    const content = data.choices[0]?.message?.content
    if (!content) throw new Error("Empty response")

    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON found")

    const parsed = JSON.parse(jsonMatch[0])
    
    const cacheData = {
      ...parsed,
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    writeFileSync(CACHE_PATH, JSON.stringify(cacheData, null, 2))

    return NextResponse.json({
      success: true,
      venues: cacheData.venues.length,
      events: cacheData.events.length,
      lastUpdated: cacheData.lastUpdated,
    })
  } catch (error) {
    console.error("[Quebec Refresh] Error:", error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

/**
 * GET /api/quebec-refresh - Check cache status
 */
export async function GET() {
  try {
    const { existsSync, readFileSync } = require("fs")
    
    if (!existsSync(CACHE_PATH)) {
      return NextResponse.json({ exists: false, message: "No cache" })
    }
    
    const cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8"))
    const hoursOld = Math.floor((Date.now() - new Date(cache.lastUpdated).getTime()) / (1000 * 60 * 60))
    
    return NextResponse.json({
      exists: true,
      venues: cache.venues?.length || 0,
      events: cache.events?.length || 0,
      hoursOld,
      isStale: hoursOld > 24,
      lastUpdated: cache.lastUpdated,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to read" }, { status: 500 })
  }
}
