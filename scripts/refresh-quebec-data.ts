#!/usr/bin/env tsx
/**
 * Vrai Quebec - Data Refresh Script
 * Run manually to refresh all venue and event data
 * 
 * Usage: npx tsx scripts/refresh-quebec-data.ts
 */

const API_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/quebec-refresh`
  : "http://localhost:3000/api/quebec-refresh"

async function refresh() {
  console.log("🍁 Vrai Quebec - Refreshing Data")
  console.log("==================================")
  
  try {
    const response = await fetch(API_URL, { method: "POST" })
    const result = await response.json()
    
    if (result.success) {
      console.log("✅ Success!")
      console.log(`📊 Venues: ${result.venues}`)
      console.log(`📊 Events: ${result.events}`)
      console.log(`🕐 Updated: ${result.lastUpdated}`)
    } else {
      console.error("❌ Failed:", result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

refresh()
