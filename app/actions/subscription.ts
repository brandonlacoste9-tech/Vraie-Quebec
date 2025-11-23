"use server"

import { getOrCreateSubscription, type Subscription } from "@/lib/subscription"

export async function getSubscriptionStatus(email = "guest@example.com"): Promise<Subscription | null> {
  return await getOrCreateSubscription(email)
}
