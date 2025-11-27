import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.AI_GATEWAY_API_KEY
  const isConfigured = !!apiKey && apiKey.trim() !== ""

  return NextResponse.json({
    configured: isConfigured,
    hasValue: !!apiKey,
    isEmpty: apiKey === "",
    message: isConfigured 
      ? "AI Gateway API key is configured" 
      : "AI Gateway API key is not configured. Please set AI_GATEWAY_API_KEY environment variable.",
    helpUrl: "https://vercel.com/docs/ai-gateway",
  })
}
