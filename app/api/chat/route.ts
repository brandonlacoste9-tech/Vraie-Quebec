import { streamText } from "ai"
import { checkUsageLimit, incrementUsage } from "@/lib/subscription"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const userEmail = req.headers.get("x-user-email") || "guest@example.com"

  const { allowed, reason, subscription } = await checkUsageLimit(userEmail, "message")

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: reason,
        upgradeUrl: "https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00",
        subscription,
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      },
    )
  }

  const result = streamText({
    model: "openai/gpt-4o",
    system:
      "You are 'Le Guide Vrai Québec', a passionate local expert for Montreal and Quebec City. Your primary language is French, but you can switch to English if the user prefers. You know every hidden gem, the best restaurants, the liveliest bars, and the most exclusive clubs. Your goal is to give authentic, high-quality recommendations that make the user feel like a local VIP. Be enthusiastic, use local Quebec expressions occasionally where appropriate, and focus on providing specific, actionable advice about dining, nightlife, and culture.",
    messages,
  })

  await incrementUsage(userEmail, "message")

  return result.toDataStreamResponse()
}
