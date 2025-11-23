"use server"

import { getOrCreateSubscription, type Subscription } from "@/lib/subscription"

export async function getSubscriptionStatus(email?: string): Promise<Subscription | null> {
  return await getOrCreateSubscription(email || "guest@example.com")
}
