import { createClient } from "@/lib/supabase"

export type SubscriptionStatus = "trial" | "active" | "inactive" | "expired"

export interface Subscription {
  id: string
  user_email: string
  stripe_customer_id?: string
  subscription_status: SubscriptionStatus
  trial_start_date: string
  trial_end_date: string
  subscription_start_date?: string
  messages_used: number
  images_used: number
  message_limit: number
  image_limit: number
  created_at: string
  updated_at: string
}

function createMockSubscription(email: string): Subscription {
  const now = new Date()
  return {
    id: `mock-${Date.now()}`,
    user_email: email,
    subscription_status: "trial",
    trial_start_date: now.toISOString(),
    trial_end_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    messages_used: 0,
    images_used: 0,
    message_limit: 100,
    image_limit: 10,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  }
}

export async function getOrCreateSubscription(email: string): Promise<Subscription | null> {
  const supabase = createClient()

  if (!supabase) {
    console.log("[v0] Supabase not available, using mock subscription")
    return createMockSubscription(email)
  }

  // Try to get existing subscription
  const { data: existing, error: fetchError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_email", email)
    .maybeSingle()

  if (existing) {
    return existing as Subscription
  }

  // Create new subscription with free trial
  const { data: newSub, error: createError } = await supabase
    .from("subscriptions")
    .insert({
      user_email: email,
      subscription_status: "trial",
      trial_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      message_limit: 100,
      image_limit: 10,
      messages_used: 0,
      images_used: 0,
    })
    .select()
    .maybeSingle()

  if (createError) {
    console.error("Error creating subscription:", createError)
    return createMockSubscription(email)
  }

  return newSub as Subscription
}

export async function checkUsageLimit(
  email: string,
  type: "message" | "image",
): Promise<{ allowed: boolean; subscription: Subscription | null; reason?: string }> {
  const subscription = await getOrCreateSubscription(email)

  if (!subscription) {
    // This should never happen now, but just in case
    return { allowed: true, subscription: createMockSubscription(email) }
  }

  // Check if trial has expired
  const now = new Date()
  const trialEnd = new Date(subscription.trial_end_date)

  if (subscription.subscription_status === "trial" && now > trialEnd) {
    return {
      allowed: false,
      subscription,
      reason: "Free trial expired. Subscribe for $6/month to continue.",
    }
  }

  // Check if subscription is inactive
  if (subscription.subscription_status === "inactive" || subscription.subscription_status === "expired") {
    return {
      allowed: false,
      subscription,
      reason: "Subscription inactive. Subscribe for $6/month to continue.",
    }
  }

  // Check usage limits for trial users
  if (subscription.subscription_status === "trial") {
    if (type === "message" && subscription.messages_used >= subscription.message_limit) {
      return {
        allowed: false,
        subscription,
        reason: `Trial limit reached (${subscription.message_limit} messages). Subscribe for unlimited access.`,
      }
    }

    if (type === "image" && subscription.images_used >= subscription.image_limit) {
      return {
        allowed: false,
        subscription,
        reason: `Trial limit reached (${subscription.image_limit} images). Subscribe for unlimited access.`,
      }
    }
  }

  return { allowed: true, subscription }
}

export async function incrementUsage(email: string, type: "message" | "image"): Promise<boolean> {
  const supabase = createClient()

  if (!supabase) {
    console.log("[v0] Supabase not available, skipping usage increment")
    return true
  }

  const field = type === "message" ? "messages_used" : "images_used"

  const { error } = await supabase.rpc("increment_usage", {
    p_email: email,
    p_field: field,
  })

  if (error) {
    // Fallback to manual increment if function doesn't exist
    const { data: sub } = await supabase.from("subscriptions").select("*").eq("user_email", email).maybeSingle()

    if (sub) {
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          [field]: sub[field] + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("user_email", email)

      return !updateError
    }
  }

  return !error
}
