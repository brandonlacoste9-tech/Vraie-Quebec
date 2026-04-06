import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe-server"
import {
  activateSubscriptionForAppUser,
  markSubscriptionExpiredByStripeSubId,
  updateSubscriptionStatusFromStripe,
} from "@/lib/stripe-sync"

export const runtime = "nodejs"

function appUserFromSession(session: Stripe.Checkout.Session): string | null {
  const meta = session.metadata?.app_user_id
  const ref = session.client_reference_id
  const key = (meta || ref || "").trim().toLowerCase()
  return key || null
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!secret) {
    console.error("[stripe webhook] STRIPE_WEBHOOK_SECRET is not set")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 })
  }

  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 })
  }

  const rawBody = await req.text()
  const sig = req.headers.get("stripe-signature")
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error("[stripe webhook] signature", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== "subscription") break

        const appUserKey = appUserFromSession(session)
        if (!appUserKey) {
          console.warn("[stripe webhook] checkout.session.completed missing app user key", session.id)
          break
        }

        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id || ""
        const subId =
          typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null

        if (!customerId) {
          console.warn("[stripe webhook] no customer on session", session.id)
          break
        }

        const billingEmail =
          session.customer_details?.email || session.customer_email || null

        const result = await activateSubscriptionForAppUser({
          appUserKey,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subId,
          billingEmail,
        })

        if (!result.ok) {
          console.error("[stripe webhook] activate failed", result.error)
        }
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription
        const id = sub.id
        if (sub.status === "active" || sub.status === "trialing") {
          await updateSubscriptionStatusFromStripe(id, "active")
        } else if (sub.status === "past_due" || sub.status === "unpaid") {
          await updateSubscriptionStatusFromStripe(id, "inactive")
        } else if (sub.status === "canceled") {
          await markSubscriptionExpiredByStripeSubId(id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        await markSubscriptionExpiredByStripeSubId(sub.id)
        break
      }

      default:
        break
    }
  } catch (e) {
    console.error("[stripe webhook] handler", e)
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
