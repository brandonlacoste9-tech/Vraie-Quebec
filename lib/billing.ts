/** Membership / chat — Payment Link with both tiers (e.g. $9.99 + $24.99). If unset, UI may use Checkout API. */
export function getPublicStripePaymentLink(): string | null {
  const u = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL?.trim()
  if (u && (u.startsWith("https://") || u.startsWith("http://"))) return u
  return null
}

/** Membership — Élite tier only (e.g. $24.99). */
export function getMembershipPaymentLinkElite(): string | null {
  const u = process.env.NEXT_PUBLIC_STRIPE_MEMBERSHIP_PAYMENT_LINK_ELITE?.trim()
  if (u && (u.startsWith("https://") || u.startsWith("http://"))) return u
  return null
}

/** Publicité — lien Stripe où le client choisit entre 199 $ et 499 $. */
export function getAdsPaymentLinkCombined(): string | null {
  const u = process.env.NEXT_PUBLIC_STRIPE_ADS_PAYMENT_LINK?.trim()
  if (u && (u.startsWith("https://") || u.startsWith("http://"))) return u
  return null
}

/** Publicité — forfait Vedette uniquement (499 $). */
export function getAdsPaymentLinkVedette(): string | null {
  const u = process.env.NEXT_PUBLIC_STRIPE_ADS_PAYMENT_LINK_VEDETTE?.trim()
  if (u && (u.startsWith("https://") || u.startsWith("http://"))) return u
  return null
}

export function getAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "")
  if (explicit) return explicit
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`
  return "http://localhost:3000"
}

/** Best URL to show in API 403 payloads (payment link, or members anchor). */
export function getUpgradeUrlForResponse(): string {
  return getPublicStripePaymentLink() ?? `${getAppUrl()}/members#pricing`
}

export function isProbablyEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
