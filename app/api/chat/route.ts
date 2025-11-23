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
      "You are a helpful assistant for Vrai Québec, a luxury tourism guide for Montreal and Quebec. You help users find the best spots, restaurants, clubs, and activities. You are knowledgeable, polite, and enthusiastic about Quebec culture.",
    messages,
  })

  await incrementUsage(userEmail, "message")

  return result.toDataStreamResponse()
}
