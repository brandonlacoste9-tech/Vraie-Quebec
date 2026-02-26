import { NextResponse } from "next/server"
import { getQuebecDataWithMinCounts } from "@/lib/data/cached-quebec-loader"

/**
 * GET /api/quebec-cached
 * 
 * Returns cached Vrai Quebec data with guaranteed minimum counts.
 * Never fails - always returns data from cache or fallback.
 */
export async function GET() {
  try {
    const data = getQuebecDataWithMinCounts(12, 6)
    
    // Group venues by type for easier consumption
    const byType = data.venues.reduce((acc, venue) => {
      if (!acc[venue.type]) acc[venue.type] = []
      acc[venue.type].push(venue)
      return acc
    }, {} as Record<string, typeof data.venues>)

    return NextResponse.json({
      success: true,
      venues: data.venues,
      events: data.events,
      byType,
      featured: data.venues.filter(v => v.isFeatured),
      meta: {
        lastUpdated: data.lastUpdated,
        nextUpdate: data.nextUpdate,
        venueCount: data.venues.length,
        eventCount: data.events.length,
      },
    })
  } catch (error) {
    console.error("[API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load data",
        venues: [],
        events: [],
      },
      { status: 500 }
    )
  }
}
