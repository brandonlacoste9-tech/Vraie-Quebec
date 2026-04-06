import { createServiceRoleClient } from "@/lib/supabase-admin"
import { createClient } from "@/lib/supabase"

function db() {
  return createServiceRoleClient() ?? createClient()
}

/** Upsert subscription row after successful Stripe Checkout (matches app user key in user_email). */
export async function activateSubscriptionForAppUser(input: {
  appUserKey: string
  stripeCustomerId: string
  stripeSubscriptionId: string | null
  billingEmail?: string | null
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = db()
  if (!supabase) {
    return { ok: false, error: "Database not configured" }
  }

  const email = input.appUserKey.trim().toLowerCase()
  const now = new Date().toISOString()

  const payload = {
    stripe_customer_id: input.stripeCustomerId,
    stripe_subscription_id: input.stripeSubscriptionId,
    subscription_status: "active" as const,
    subscription_start_date: now,
    updated_at: now,
  }

  const { data: existing } = await supabase.from("subscriptions").select("id").eq("user_email", email).maybeSingle()

  if (existing) {
    const { error } = await supabase.from("subscriptions").update(payload).eq("user_email", email)
    if (error) {
      console.error("[stripe-sync] activate update", error)
      return { ok: false, error: error.message }
    }
    return { ok: true }
  }

  const { error: insertError } = await supabase.from("subscriptions").insert({
    user_email: email,
    ...payload,
    trial_start_date: now,
    trial_end_date: now,
    messages_used: 0,
    images_used: 0,
    message_limit: 100,
    image_limit: 10,
  })

  if (insertError) {
    console.error("[stripe-sync] activate insert", insertError)
    return { ok: false, error: insertError.message }
  }

  return { ok: true }
}

export async function markSubscriptionExpiredByStripeSubId(stripeSubscriptionId: string): Promise<void> {
  const supabase = db()
  if (!supabase) return

  const { error } = await supabase
    .from("subscriptions")
    .update({
      subscription_status: "expired",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", stripeSubscriptionId)

  if (error) console.error("[stripe-sync] markSubscriptionExpiredByStripeSubId", error)
}

export async function updateSubscriptionStatusFromStripe(
  stripeSubscriptionId: string,
  status: "active" | "inactive" | "expired",
): Promise<void> {
  const supabase = db()
  if (!supabase) return

  const { error } = await supabase
    .from("subscriptions")
    .update({
      subscription_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", stripeSubscriptionId)

  if (error) console.error("[stripe-sync] updateSubscriptionStatusFromStripe", error)
}
