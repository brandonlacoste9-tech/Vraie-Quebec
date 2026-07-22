/**
 * Google AdSense configuration for Vrai Québec.
 *
 * Setup:
 * 1. Confirm publisher ID in AdSense (Sites → your domain → Ready)
 * 2. Enable Auto ads for the site (or create Display units and set slots below)
 * 3. Set env vars on Vercel (see .env.example)
 * 4. Keep public/ads.txt in sync with the publisher ID
 */

export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4276130467303652"

/** Strip "ca-" prefix for ads.txt (pub-XXXXXXXX) */
export const ADSENSE_PUB_ID_FOR_ADS_TXT = ADSENSE_PUBLISHER_ID.replace(/^ca-/, "")

export const ADSENSE_ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "false" &&
  Boolean(ADSENSE_PUBLISHER_ID) &&
  ADSENSE_PUBLISHER_ID.startsWith("ca-pub-")

/** When true, AdSense serves test creatives (use only in development). */
export const ADSENSE_TEST_MODE =
  process.env.NEXT_PUBLIC_ADSENSE_TEST === "true" ||
  process.env.NODE_ENV === "development"

/**
 * Display unit slot IDs from AdSense → Ads → By ad unit.
 * Leave empty to skip manual units (Auto ads can still fill if enabled in console).
 */
export const ADSENSE_SLOTS = {
  /** Horizontal / in-feed after main content blocks */
  inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? "",
  /** Full-width banner between sections */
  display: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY ?? "",
  /** Sidebar on venue pages */
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
} as const

export type AdSenseSlotKey = keyof typeof ADSENSE_SLOTS

export function getAdSlot(key: AdSenseSlotKey): string | null {
  const slot = ADSENSE_SLOTS[key]
  return slot && /^\d+$/.test(slot) ? slot : null
}
