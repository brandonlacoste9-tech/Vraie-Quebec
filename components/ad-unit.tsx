"use client"

import { useEffect, useRef } from "react"
import {
  ADSENSE_ENABLED,
  ADSENSE_PUBLISHER_ID,
  ADSENSE_TEST_MODE,
  getAdSlot,
  type AdSenseSlotKey,
} from "@/lib/adsense"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

type AdFormat = "auto" | "fluid" | "rectangle" | "horizontal" | "vertical"

interface AdUnitProps {
  /** Named slot from lib/adsense (reads NEXT_PUBLIC_ADSENSE_SLOT_*) */
  slotKey: AdSenseSlotKey
  /** Override slot ID if you create a one-off unit */
  slot?: string
  format?: AdFormat
  fullWidthResponsive?: boolean
  className?: string
  /** Accessible / layout label (not sent to Google) */
  label?: string
}

/**
 * Manual AdSense display unit.
 * Renders nothing if AdSense is disabled or the slot ID is missing —
 * so production stays clean until you paste slot IDs from the AdSense UI.
 */
export function AdUnit({
  slotKey,
  slot: slotOverride,
  format = "auto",
  fullWidthResponsive = true,
  className,
  label = "Publicité",
}: AdUnitProps) {
  const pushed = useRef(false)
  const slot = slotOverride || getAdSlot(slotKey)

  useEffect(() => {
    if (!ADSENSE_ENABLED || !slot || pushed.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Ad blockers / missing script — fail silently
    }
  }, [slot])

  if (!ADSENSE_ENABLED || !slot) return null

  return (
    <aside
      className={cn(
        "ad-unit w-full overflow-hidden rounded-sm ring-1 ring-border/60 bg-surface/40",
        className
      )}
      aria-label={label}
      data-ad-slot-key={slotKey}
    >
      <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70 font-sans text-center pt-2 pb-1">
        {label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        {...(ADSENSE_TEST_MODE ? { "data-adtest": "on" } : {})}
      />
    </aside>
  )
}

/** Convenience wrappers for common placements */
export function AdBanner({ className }: { className?: string }) {
  return (
    <AdUnit
      slotKey="display"
      format="horizontal"
      className={cn("my-8 md:my-10", className)}
      label="Publicité"
    />
  )
}

export function AdInArticle({ className }: { className?: string }) {
  return (
    <AdUnit
      slotKey="inArticle"
      format="fluid"
      className={cn("my-8", className)}
      label="Publicité"
    />
  )
}

export function AdSidebar({ className }: { className?: string }) {
  return (
    <AdUnit
      slotKey="sidebar"
      format="rectangle"
      fullWidthResponsive={false}
      className={cn("w-full", className)}
      label="Publicité"
    />
  )
}
