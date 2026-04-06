"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const membershipPaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL?.trim()

type SubscribeCheckoutButtonProps = {
  /** Same identifier used for `x-user-email` / `subscriptions.user_email` (email or generated user id). */
  userKey: string
  className?: string
  children: React.ReactNode
  /** Override Payment Link URL (e.g. publicité). When set, ignores membership env link and skips Checkout API. */
  paymentUrl?: string | null
}

export function SubscribeCheckoutButton({ userKey, className, children, paymentUrl }: SubscribeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const resolvedLink = (paymentUrl?.trim() || membershipPaymentLink || "").trim()
  if (resolvedLink && (resolvedLink.startsWith("https://") || resolvedLink.startsWith("http://"))) {
    return (
      <a
        href={resolvedLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      disabled={loading || !userKey}
      className={cn(className, loading && "opacity-70 pointer-events-none")}
      onClick={async () => {
        setLoading(true)
        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userKey }),
          })
          const data = await res.json().catch(() => ({}))
          if (data.url && typeof data.url === "string") {
            window.location.href = data.url
            return
          }
          console.error("[subscribe]", data)
        } finally {
          setLoading(false)
        }
      }}
    >
      {loading ? "…" : children}
    </button>
  )
}
