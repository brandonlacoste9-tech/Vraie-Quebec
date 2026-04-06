import { NextResponse } from "next/server"
import { z } from "zod"
import { getAppUrl, isProbablyEmail } from "@/lib/billing"
import { getStripe, isCheckoutConfigured } from "@/lib/stripe-server"

export const runtime = "nodejs"

const bodySchema = z.object({
  email: z.string().min(1).max(512),
})

export async function POST(req: Request) {
  try {
    if (!isCheckoutConfigured()) {
      return NextResponse.json(
        {
          error: "Checkout is not configured",
          hint: "Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID (and NEXT_PUBLIC_APP_URL for redirects).",
        },
        { status: 503 },
      )
    }

    const stripe = getStripe()!
    const json = await req.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    const { email: rawKey } = parsed.data
    const appUserKey = rawKey.trim().toLowerCase()
    const appUrl = getAppUrl()
    const priceId = process.env.STRIPE_PRICE_ID!.trim()

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/members?checkout=success`,
      cancel_url: `${appUrl}/members?checkout=cancel`,
      client_reference_id: appUserKey,
      metadata: { app_user_id: appUserKey },
      subscription_data: {
        metadata: { app_user_id: appUserKey },
      },
      ...(isProbablyEmail(appUserKey) ? { customer_email: appUserKey } : {}),
      allow_promotion_codes: true,
    })

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error("[checkout]", e)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
