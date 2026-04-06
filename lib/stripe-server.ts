import Stripe from "stripe"

let stripeSingleton: Stripe | null = null

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) return null
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key, { typescript: true })
  }
  return stripeSingleton
}

export function isCheckoutConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim() && process.env.STRIPE_PRICE_ID?.trim())
}
