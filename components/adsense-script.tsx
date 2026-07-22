import Script from "next/script"
import { ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID } from "@/lib/adsense"

/**
 * Loads the AdSense library once per app.
 * Auto ads (configured in AdSense console) inject placements automatically.
 * Manual units use components/ad-unit.tsx.
 */
export function AdSenseScript() {
  if (!ADSENSE_ENABLED) return null

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
